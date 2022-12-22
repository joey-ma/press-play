import { createStore, action } from 'easy-peasy';
import { shuffle } from '../lib/mutations';

export const store = createStore({
  shuffledPlaylistSongs: [],
  changeShuffledPlaylistSongs: action((state: any, payload) => {
    state.shuffledPlaylistSongs = payload;
    console.log(
      `setting shuffled playlist songs:`,
      state.shuffledPlaylistSongs
    );
  }),
  activeSong: null,
  changeActiveSong: action((state: any, payload) => {
    state.activeSong = payload;
    console.log(
      `in store, state.activeSong:
    `,
      state.activeSong
    );
  }),
  activeSongs: [],
  changeActiveSongs: action((state: any, payload) => {
    // if shuffling clicked,
    // - shuffle playlist starting from(excluding current) next index, OR
    // - shuffle entire playlist and restart playing
    // else
    state.activeSongs = payload;
    console.log(`in store, state.activeSongs: `, state.activeSongs);
  }),
  isShuffling: false,
  changeIsShuffling: action((state: any, payload) => {
    state.isShuffling = !state.isShuffling;
  }),
});
