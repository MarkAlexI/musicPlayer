const addZero = (t: number): string => {
  return `${t < 10 ? '0' : ''}${t}`;
};

const formatTime = (time: number): string => {
  const minutes: number = Math.floor(time/60);
  const seconds: number = time % 60;
  
  return `${addZero(minutes)}:${addZero(seconds)}`;
};

export default formatTime;