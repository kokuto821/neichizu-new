import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export const PopupCard = () => {
  return (
    <Card sx={{ display: 'flex',position:"absolute" ,top:"0",left:"0", }}>
          <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="" // 画像のURLを入れる
        alt="" // 山の名前を入れる
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            Live From Space
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: 'text.secondary' }}
          >
            Mac Miller
          </Typography>
        </CardContent>

      </Box>

    </Card>
  );
}