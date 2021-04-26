import { createContext, ReactNode, useContext, useState } from 'react';

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  isLooping: boolean;
  isShuffling: boolean;
  hasPrevious: boolean;
  hasNext: boolean;
  play: (episode: Episode) => void;
  playList: (list: Episode[], index: number) => void;
  playNext: () => void;
  clearPlayerState: () => void;
  playPrevious: () => void;
  togglePlay: () => void;
  setPlayingState: (state: boolean) => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
};

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
  children: ReactNode;
};

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlayng] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  function play(episode: Episode): void {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlayng(true);
  }

  function playList(list: Episode[], index: number): void {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlayng(true);
  }

  function togglePlay(): void {
    setIsPlayng(!isPlaying);
  }

  function toggleLoop(): void {
    setIsLooping(!isLooping);
  }

  function toggleShuffle(): void {
    setIsShuffling(!isShuffling);
  }

  function setPlayingState(state: boolean): void {
    setIsPlayng(state);
  }

  function clearPlayerState(): void {
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }

  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = isShuffling || currentEpisodeIndex + 1 < episodeList.length;

  function randomEpisode(): number {
    return Math.floor(Math.random() * episodeList.length);
  }

  function playNext(): void {
    if (isShuffling) {
      setCurrentEpisodeIndex(randomEpisode());
    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  }

  function playPrevious(): void {
    if (isShuffling) {
      setCurrentEpisodeIndex(randomEpisode());
    } else if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        play,
        playNext,
        playPrevious,
        isPlaying,
        togglePlay,
        setPlayingState,
        playList,
        hasPrevious,
        hasNext,
        isLooping,
        toggleLoop,
        toggleShuffle,
        isShuffling,
        clearPlayerState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
