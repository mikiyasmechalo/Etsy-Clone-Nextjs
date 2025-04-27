import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CategoriesCardProps {
  image: string;
  href: string;
  title: string;
}

const CategoriesCard = ({ image, href, title }: CategoriesCardProps) => {
  return (
    <Link href={href}>
      <div className="flex flex-col gap-2 rounded-2xl group size-full">
        <div className="aspect-[4/5] group-hover:shadow-[0_2px_10px_rgb(0_0_0_/_20%)] rounded-2xl transition-all duration-150 size-full">
          <Image
            src={image}
            alt={title}
            width={300}
            height={350}
            className="rounded-2xl object-cover size-full"
          />
        </div>
        <p>{title}</p>
      </div>
    </Link>
  );
};

export default CategoriesCard;
