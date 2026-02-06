import { CircularProgress } from '@mui/material';

export const LoadingSpinner = () => {
  const style = {
    loadingSpinnerWrapper:
      'absolute bottom-[155px] left-0 w-screen flex justify-center items-center px-[20%] visible text-semiDarkGreen',
  };
  return (
    <div className={style.loadingSpinnerWrapper}>
      <CircularProgress color="inherit" />
    </div>
  );
};
