import useSWR from 'swr';
import fetcher from './fetcher';

export function useMe() {
  const { data, error } = useSWR('/me', fetcher);

  return {
    user: data,
    isLoading: !data && !error,
    isError: error,
  };
}

interface playlistMenu {}

export function usePlaylist() {
  const { data, error } = useSWR('/playlist', fetcher);

  return {
    playlistMenu: (data as any) || [],
    isLoading: !data && !error,
    isError: error,
  };
}
