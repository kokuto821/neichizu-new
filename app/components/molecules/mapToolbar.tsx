import { Box, Button, IconButton, styled } from '@mui/material';
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
          <IconButton
            aria-label="layers"
            sx={{
              color: color.SemiDarkGreen,
            }}
          >
            <LayersRoundedIcon />
          </IconButton>
        </IconButtonBox>
        {isLayerVisible ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              padding: '5px',
            }}
          >
            <Button
              variant="contained"
              onClick={() => setTimeout(() => changeGSILayer(), 300)}
              sx={{
                backgroundColor: color.SemiDarkGreen,
                color: color.EcruWhite,
              }}
            >
              gsi
            </Button>
            <Button
              variant="contained"
              onClick={() => setTimeout(() => changeOSMLayer(), 300)}
              sx={{
                backgroundColor: color.MiddleGreen,
                color: color.EcruWhite,
              }}
            >
              osm
            </Button>
          </Box>
        ) : null}
      </MapToolbarInner>
    </div>
  );
};
