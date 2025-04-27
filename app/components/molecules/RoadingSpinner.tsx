import { color } from '@/app/css/color';
import { CircularProgress } from '@mui/material';

export const RoadingSpinner = () => {
  return (
    <div
      className="flex justify-center items-center mt-[10vh]"
      style={{
        color: color.SemiDarkGreen,
      }}
    >
      <CircularProgress color="inherit" />
    </div>
  );
};
