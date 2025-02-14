import Link from "next/link";

export const MapFooter = () => {
  <footer className="foot_nav">
    <p className="foot_nav_p">
      <Link
        href="https://www.google.com/maps/d/viewer?mid=1OjXFg_mjG2QeZTXK1enyj0957jiP9Og&ll=38.66483464924118%2C140.62674284694677&z=7"
        target="_blank"
        rel="noopener noreferrer"
        className="foot_nav_link"
      >
        Googlemapで見る
      </Link>
    </p>
  </footer>;
};
