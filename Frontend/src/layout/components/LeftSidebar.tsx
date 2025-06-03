import PlaylistSkeleton from '@/components/skeletons/playlistSkeleton'
import { buttonVariants } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { useMusicStore } from '@/stores/useMusicStore'
import { SignedIn } from '@clerk/clerk-react'
import { HomeIcon, Library } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const LeftSidebar = () => {

    const { albums, fetchAlbums, isLoading } = useMusicStore();

    useEffect(() => {
        fetchAlbums();
    }, [fetchAlbums]);

    console.log({ albums })
    // for data fetching we will use zustand because it will help me fetch data univarsally that means it will work on many page without the need to fetch data again and again
    // this is what i understand 

    return (
        <div className='h-full flex flex-col gap-2'>
            <div className='rouded-lg bg-zinc-900 p-4'>
                <div className='space-y-2'>
                    <Link to={'/'} className={cn(buttonVariants(
                        {
                            variant: 'ghost',
                            // size: 'icon',
                            className: 'w-full justify-start text-zinc-400 hover:bg-zinc-800 hover:text-white'
                        }
                    ))}>
                        <HomeIcon className='mr-2 size-5' />
                        <span className='hidden md:inline'>Home</span>
                    </Link>
                    <SignedIn>
                        <Link to={'/chat'} className={cn(buttonVariants(
                            {
                                variant: 'ghost',
                                // size: 'icon',
                                className: 'w-full justify-start text-zinc-400 hover:bg-zinc-800 hover:text-white'
                            }
                        ))}>
                            <HomeIcon className='mr-2 size-5' />
                            <span className='hidden md:inline'>Messages</span>
                        </Link>
                    </SignedIn>
                </div>
            </div>
            <div className='flex-1 bg-zinc-900 p-4 rounded-lg'>
                <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center text-white px-2'>
                        <Library className='size-5 mr-2' />
                        <span className='hidden md:inline'>Playlists</span>
                    </div>
                </div>
                <ScrollArea className='h-[calc(100vh-300px)]'>
                    <div className='space-y-2'>
                        {isLoading ? (
                            <PlaylistSkeleton />
                        ) : (
                            albums.map((album) => (
                                <Link to={`/album/${album._id}`}
                                    key={album.id}
                                    className={cn(buttonVariants())}
                                >
                                    <img src={album.imageUrl} alt="playlist image" className='size-12 rounded-md flex-shrink-0 object-cover' />
                                    <div className='flex-1 min-w-0 hidden md:block'>
                                        <p className='font-medium truncate'>
                                            {album.title}
                                        </p>
                                        <p className='text-sm text-zinc-400 truncate'>
                                            Album {album.artist}
                                        </p>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}

export default LeftSidebar
