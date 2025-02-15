import * as React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { FeatureProperties } from "@/app/feature/map/hyakumeizan/types/types";
import Link from "next/link";

type Props = {
  selectedFeature: FeatureProperties | null;
};

export const PopupCard = ({ selectedFeature }: Props) => {
  return (
    <div
      className="popup-card"
      style={{
        position: "absolute",
        transform: "translateY(-22.5%)",
        bottom: "0",
        left: "0",
        width: "100%",
      }}
    >
      <Card sx={{ display: "flex", alignItems: "center" }}>
        <CardMedia
          component="img"
          sx={{ width: 151, height: 130 }}
          image={selectedFeature?.image} // 画像のURLを入れる
          alt={selectedFeature?.name} // 山の名前を入れる
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent style={{ padding: "0px 0px 0px 10px" }}>
            <Typography component="div" variant="h5">
              {selectedFeature?.name}
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ color: "text.secondary" }}
            >
              {selectedFeature?.area} {selectedFeature?.height}
            </Typography>
            <Link href={selectedFeature?.googlemaplink || "#"} target="_blank">
              <Image
                className="link-img-logo"
                src={"/img/g_map_logo.jpg"}
                alt={"googleMap"}
                width={110}
                height={110}
              />
            </Link>
            <Link href={selectedFeature?.YAMAP || "#"} target="_blank">
              <Image
                className="link-img-logo"
                src={"/img/yamap-logo.png"}
                alt={"Yamap"}
                width={110}
                height={110}
              />
            </Link>
          </CardContent>
        </Box>
      </Card>
    </div>
  );
};
