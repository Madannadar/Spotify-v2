import { axiosInstance } from '@/lib/axios';
import { create } from 'zustand';

interface Album {
  _id: string;
  title: string;
  artist: string;
  imageUrl: string;
  releaseYear: number;
  songs: string[];
  createdAt: string;
  updatedAt: string;
}

interface MusicStore {
  songs: any[];
  albums: Album[];
  isLoading: boolean;
  error: string | null;
  fetchAlbums: () => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,

  fetchAlbums: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get('/album');

      const albumsRaw = response.data?.albums?.albums;

      const albums: Album[] = Array.isArray(albumsRaw)
        ? albumsRaw.map((album: any) => ({
            _id: album._id?.$oid || album._id,
            title: album.title,
            artist: album.artist,
            imageUrl: album.imageUrl,
            releaseYear: album.releaseYear?.$numberInt
              ? parseInt(album.releaseYear.$numberInt)
              : album.releaseYear,
            songs: album.songs?.map((s: any) => s.$oid || s) || [],
            createdAt: album.createdAt?.$date?.$numberLong
              ? new Date(parseInt(album.createdAt.$date.$numberLong)).toISOString()
              : album.createdAt,
            updatedAt: album.updatedAt?.$date?.$numberLong
              ? new Date(parseInt(album.updatedAt.$date.$numberLong)).toISOString()
              : album.updatedAt,
          }))
        : [];

      set({ albums });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to fetch albums',
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
