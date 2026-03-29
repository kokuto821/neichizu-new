import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { text } from 'stream/consumers';

type Props = {
  href: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
  children?: ReactNode;
};

const styles = {
  linkIconContainer: 'flex items-center justify-center gap-1 text-md',
};

export const LinkIcon = ({ href, src, alt, width, height, children }: Props) => {
  return (
    <Link href={href} target="_blank" className={styles.linkIconContainer}>
      <Image src={src} alt={alt} width={width || 110} height={height || 110} />
      {children}
    </Link>
  );
};
