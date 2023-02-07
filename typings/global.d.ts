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
  gainSixtyHz: number;
  showEqualizer: boolean;
  trackList: FileList | [];
  trackListInfo: TrackInfo[];
  currentTrack: number;
};
