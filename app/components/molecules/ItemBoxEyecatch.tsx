type Props = {
  title: string;
  url: string;
  img: string;
  reference: string;
};
export const ItemBoxEyecatch: React.FC<Props> = ({
  title,
  url,
  img,
  children,
  reference,
}) => {
  return (
    <div className="white_back_inner_eyecatch">
      <Link href={url}>
        <Image src={img} alt={title} width={500} height={300} />
      </Link>
      <p className="white_inner_map-title">
        <Link href={url} className="link_url">
          -{title}-
        </Link>
      </p>
      <div className="white_back_inner_info">
        <p>{children}</p>
        <p>
          <Link
            className="link_url"
            href={reference}
            target="_blank"
            rel="noopener noreferrer"
          >
            参考になったサイト
          </Link>
        </p>
      </div>
    </div>
  );
};
