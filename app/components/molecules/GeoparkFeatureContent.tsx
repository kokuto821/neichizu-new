import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { FeatureTitle } from '../atoms/FeatureTitle';
import { FeatureSubtitle } from '../atoms/FeatureSubtitle';
import { LinkIcon } from '../atoms/LinkIcon';

type Props = {
  id: string;
  name: string;
  area: string;
  category?: string;
  comment?: string;
  googlemaplink: string;
  website?: string;
};

export const GeoparkFeatureContent = ({
  id,
  name,
  area,
  comment,
  googlemaplink,
  website,
}: Props) => {
  return (
    <CardContent style={{ padding: '0px 0px 0px 10px' }}>
      <FeatureTitle>{name}</FeatureTitle>
      <FeatureSubtitle>{area}</FeatureSubtitle>

      {comment && (
        <Typography variant="body2" sx={{ mt: 0.5, fontSize: '0.875rem' }}>
          {comment}
        </Typography>
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          gap: 0.5,
          alignItems: 'flex-start',
        }}
      >
        <LinkIcon
          href={googlemaplink}
          src="/img/g_map_logo.svg"
          alt="Google Map"
        />

        {website && (
          <Link href={website} target="_blank">
            <Typography
              variant="body2"
              sx={{
                color: 'primary.main',
                textDecoration: 'underline',
                fontSize: '0.75rem',
              }}
            >
              公式サイト →
            </Typography>
          </Link>
        )}
      </Box>
    </CardContent>
  );
};
