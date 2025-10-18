import Typography from '@mui/material/Typography';

type Props = {
  children: React.ReactNode;
};

export const FeatureSubtitle = ({ children }: Props) => {
  return (
    <Typography variant="subtitle1" component="div" sx={{ color: 'text.secondary' }}>
      {children}
    </Typography>
  );
};
