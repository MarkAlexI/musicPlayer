export const refreshPlayer = (state: State, newValue: typeof Audio): void => {
  state.player = newValue;
};

export const refreshVolume = (state: State, newValue: number): void => {
  state.volume = newValue;
};

export const refreshBalance = (state: State, newValue: number): void => {
  state.balance = newValue;
};

export const refreshGainSixtyHz = (state: State, newValue: number): void => {
  state.gainSixtyHz = newValue;
};

export const refreshShowEqualizer = (state: State): void => {
  state.showEqualizer = !state.showEqualizer;
};

export const refreshTrackList = (state: State, newValue: FileList): void => {
  state.trackList = newValue;
};

export const refreshTrackListInfo = (state: State): void => {
  let tracksInfo: Array < TrackInfo > = [];
  const len = state.trackList.length;
  const files = state.trackList;

  for (let i = 0; i < len; i++) {
    tracksInfo.push({
      name: files[i].name,
      size: files[i].size,
      index: i
    });
  }
  state.trackListInfo = tracksInfo;
};

export const refreshCurrentTrack = (state: State, newValue: number): void => {
  state.currentTrack = newValue;
};