import { Box, IconButton, styled } from '@mui/material';
import LayersRoundedIcon from '@mui/icons-material/LayersRounded';
import { color } from '@/app/css/color';
import { useChangeVisible } from '@/app/feature/map/hyakumeizan/hooks/useChangeVisible';

type Props = {
  changeOSMLayer: () => void;
  changeGSILayer: () => void;
};

export const MapToolbar = ({ changeOSMLayer, changeGSILayer }: Props) => {
  const { isVisible: isLayerVisible, changeVisible: changeLayerVisible } =
    useChangeVisible();
  const IconButtonBox = styled('div')({
    backgroundColor: color.EcruWhite,
    borderRadius: '20px',
    width: '40px',
    height: '40px',
  });
  const MapToolbarInner = styled('div')({
    display: 'flex',
    flexDirection: 'column',
  });

  return (
    <div
      className="map_toolbar"
      style={{ position: 'absolute', top: '0', left: '0', padding: '15px' }}
    >
      <MapToolbarInner>
        <IconButtonBox
          onClick={() => {
            setTimeout(() => changeLayerVisible(), 300);
          }}
        >
          <IconButton aria-label="layers" sx={{ color: 'rgb(75, 139, 138)' }}>
            <LayersRoundedIcon />
          </IconButton>
        </IconButtonBox>
        {isLayerVisible ? (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <IconButton onClick={() => setTimeout(() => changeGSILayer(), 300)}>
              gsi
            </IconButton>
            <IconButton onClick={() => setTimeout(() => changeOSMLayer(), 300)}>
              osm
            </IconButton>
          </Box>
        ) : null}
      </MapToolbarInner>
    </div>
  );
};
