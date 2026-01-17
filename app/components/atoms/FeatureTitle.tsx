import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  layoutId?: string;
};

export const FeatureTitle = ({ children, layoutId }: Props) => {
  return (
    <motion.div layoutId={layoutId}>
      <Typography component="div" variant="h5">
        {children}
      </Typography>
    </motion.div>
  );
};
