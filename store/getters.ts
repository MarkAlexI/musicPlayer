export const player = (state: State): typeof Audio => {
  return state.player;
};

export const volume = (state: State): number => {
  return state.volume;
};

export const balance = (state: State): number => {
  return state.balance;
};

export const gain = (state: State) => (index: number): number => {
  return state.gains[index];
};

export const showEqualizer = (state: State): boolean => {
  return state.showEqualizer;
};

export const trackListLength = (state: State): number => {
  return state.trackList.length;
};

export const track = (state: State) => (index: number): File => {
  return state.trackList[index];
};

export const trackListInfo = (state: State): TrackInfo[] => {
  return state.trackListInfo;
};

export const currentTrack = (state: State): number => {
  return state.currentTrack;
};