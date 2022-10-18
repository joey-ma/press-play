import { createStore, action } from 'easy-peasy';

export const store = createStore({
  activeSongs: [],
  changeActiveSongs: action((state: any, payload) => {
    state.activeSongs = payload;
  }),
  activeSong: null,
  changeActiveSong: action((state: any, payload) => {
    state.activeSong = payload;
  }),
});
