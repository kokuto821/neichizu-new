import { color } from '@/app/css/color';
import { CircularProgress } from '@mui/material';

export const RoadingSpinner = () => {
  return (
    <div
      className="flex justify-center items-center"
      style={{
        color: color.SemiDarkGreen,
        bottom: '6.5vh',
        left: '0vw',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0px 20% 11vh 20%',
        visibility: 'visible', // isVisibleステートで制御
      }}
    >
      <CircularProgress color="inherit" />
    </div>
  );
};
