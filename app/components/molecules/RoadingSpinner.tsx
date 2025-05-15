import { color } from '@/app/css/color';
import { CircularProgress } from '@mui/material';

export const RoadingSpinner = () => {
  return (
    <div
      style={{
        position: 'absolute',
        color: color.SemiDarkGreen,
        bottom: '155px',
        left: '0vw',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0px 20% 0 20%',
        visibility: 'visible', // isVisibleステートで制御
      }}
    >
      <CircularProgress color="inherit" />
    </div>
  );
};
