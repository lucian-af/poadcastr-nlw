import '../styles/global.scss';

import { useState } from 'react';

import { PlayerContext } from '../../contexts/playerContext';
import styles from '../styles/app.module.scss';
import Header from './../components/Header';
import Player from './../components/Player';

function MyApp({ Component, pageProps }) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlayng] = useState(false);

  function play(episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlayng(true);
  }

  function togglePlay() {
    setIsPlayng(!isPlaying);
  }

  function setPlayingState(state: boolean) {
    setIsPlayng(state);
  }

  return (
    <PlayerContext.Provider value={{ episodeList, currentEpisodeIndex, play, isPlaying, togglePlay, setPlayingState }}>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContext.Provider>
  );
}

export default MyApp;
