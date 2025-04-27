import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { MdOutlineStar } from "react-icons/md";
import { HeartButton } from "./RectangleCard";

interface DetailCardProps {
  image: string;
  originalPrice: string | number;
  discountPrice: string | number;
  tagline: string;
  rating: number;
  name: string;
}

const DetailCard = ({
  image,
  originalPrice,
  discountPrice,
  tagline,
  rating,
  name,
}: DetailCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <Link href={"#"}>
      <div className="relative border Z-0 border-[#0e0e0e2e] group max-w-[266px] rounded-xl overflow-hidden hover:shadow-[0_2px_5px_rgb(0_0_0_/_30%)]">
        <HeartButton
          className="group-hover:top-2 group-hover:right-2 top-0"
          isLiked={isLiked}
          handleLike={() => setIsLiked(!isLiked)}
        />
        <Image src={image} alt={name} width={266} height={266} />
        <div className="flex flex-col gap-1 px-2 pb-10 pt-2">
          <div className="flex justify-between">
            <p className="truncate pr-12 text-sm text-gray-600">{name}</p>
            <div className="flex items-center gap-1 justify-center text-xsm">
              <span className="text-xsm -mb-1">{rating}</span>
              <MdOutlineStar size={15} />
            </div>
          </div>
          <div className="flex justify-between pr-5 items-center">
            <p className="text-green-700 font-medium text-lg">
              USD {originalPrice}
            </p>
            <p className="text-xsm text-gray-600 line-through">
              USD {discountPrice}
            </p>
            <p className="bg-green-400 text-xs font-medium rounded-full flex items-center px-1 h-fit">
              {((parseInt(originalPrice.toString()) -
                parseInt(discountPrice.toString())) /
                parseInt(originalPrice.toString())) *
                100}
              % off
            </p>
          </div>
          <p className="text-xsm">{tagline}</p>
        </div>
      </div>
    </Link>
  );
};

export default DetailCard;
