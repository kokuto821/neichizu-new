import Image from 'next/image';
import Link from 'next/link';

type Props = {
  href: string;
  src: string;
  alt: string;
};

export const LinkIcon = ({ href, src, alt }: Props) => {
  return (
    <Link href={href} target="_blank">
      <Image className="link-img-logo" src={src} alt={alt} width={110} height={110} />
    </Link>
  );
};
