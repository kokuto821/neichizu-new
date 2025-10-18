import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import { FeatureTitle } from '../atoms/FeatureTitle';
import { FeatureSubtitle } from '../atoms/FeatureSubtitle';
import { LinkIcon } from '../atoms/LinkIcon';

type Props = {
  name: string;
  area: string;
  height?: string;
  googlemaplink: string;
  YAMAP?: string;
};

export const MountainFeatureContent = ({
  name,
  area,
  height,
  googlemaplink,
  YAMAP,
}: Props) => {
  return (
    <CardContent style={{ padding: '0px 0px 0px 10px' }}>
      <FeatureTitle>{name}</FeatureTitle>
      <FeatureSubtitle>
        {area} {height}
      </FeatureSubtitle>

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
          src="/img/g_map_logo.png"
          alt="Google Map"
        />
        {YAMAP && (
          <LinkIcon href={YAMAP} src="/img/yamap-logo.png" alt="YAMAP" />
        )}
      </Box>
    </CardContent>
  );
};
