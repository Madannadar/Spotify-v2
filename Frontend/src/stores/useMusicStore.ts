import { axiosInstance } from '@/lib/axios';
import {create} from 'zustand';

interface MusicStore{
    songs: any[];
    albums: any[];
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
        // data fetching logic here 
        set({
            isLoading: true,
            error: null
        })
        try {
            const response = await axiosInstance.get('/album');
            set({
                albums: response.data,
            })
        } catch (error:any) {
            set({error: error.response.data.message});
        } finally {
            set({ isLoading: false });
        }
    }
}))