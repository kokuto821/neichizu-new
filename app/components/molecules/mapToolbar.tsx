import { Box, Button, IconButton, styled } from '@mui/material';
import LayersRoundedIcon from '@mui/icons-material/LayersRounded';
import { color } from '@/app/css/color';
import { useChangeVisible } from '@/app/feature/map/hyakumeizan/hooks/useChangeVisible';

type Props = {
  changeOSMLayer: () => void;
  changeGSILayer: () => void;
  changePHOTOLayer: () => void;
  changeRELIEFLayer: () => void;
  changeTOPOLayer: () => void;
};

export const MapToolbar = ({
  changeOSMLayer,
  changeGSILayer,
  changePHOTOLayer,
  changeRELIEFLayer,
  changeTOPOLayer,
}: Props) => {
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
    position: 'absolute',
    top: '0',
    left: '0',
    padding: '15px',
  });

  return (
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
            padding: '7.5px 0px 0px 0px',
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
            地理院地図
          </Button>
          <Button
            variant="contained"
            onClick={() => setTimeout(() => changePHOTOLayer(), 300)}
            sx={{
              backgroundColor: color.SemiDarkGreen,
              color: color.EcruWhite,
            }}
          >
            空中写真
          </Button>
          <Button
            variant="contained"
            onClick={() => setTimeout(() => changeRELIEFLayer(), 300)}
            sx={{
              backgroundColor: color.SemiDarkGreen,
              color: color.EcruWhite,
            }}
          >
            色別標高
          </Button>
          <Button
            variant="contained"
            onClick={() => setTimeout(() => changeOSMLayer(), 300)}
            sx={{
              backgroundColor: color.SemiDarkGreen,
              color: color.EcruWhite,
            }}
          >
            osm
          </Button>
          <Button
            variant="contained"
            onClick={() => setTimeout(() => changeTOPOLayer(), 300)}
            sx={{
              backgroundColor: color.SemiDarkGreen,
              color: color.EcruWhite,
            }}
          >
            osmTopo
          </Button>
        </Box>
      ) : null}
    </MapToolbarInner>
  );
};
