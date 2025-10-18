import Typography from '@mui/material/Typography';

type Props = {
  children: React.ReactNode;
};

export const FeatureTitle = ({ children }: Props) => {
  return (
    <Typography component="div" variant="h5">
      {children}
    </Typography>
  );
};
