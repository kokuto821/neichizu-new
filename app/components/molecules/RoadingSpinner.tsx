import { CircularProgress } from '@mui/material';

export const RoadingSpinner = () => {
  const style = {
    roadingSpinnerWrapper:
      'absolute bottom-[155px] left-0 w-screen flex justify-center items-center px-[20%] visible text-semiDarkGreen',
  };
  return (
    <div className={style.roadingSpinnerWrapper}>
      <CircularProgress color="inherit" />
    </div>
  );
};
