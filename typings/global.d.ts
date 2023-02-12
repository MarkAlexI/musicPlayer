type Tracks = FileList | null;

type TrackInfo = {
  name: string;
  size: number;
  index: number;
};

interface State {
  player: Audio | null;
  volume: number | null;
  balance: number;
  gains: number[];
  showEqualizer: boolean;
  trackList: FileList | [];
  trackListInfo: TrackInfo[];
  currentTrack: number;
};

type NewGain = {
  newValue: number;
  index: number;
};