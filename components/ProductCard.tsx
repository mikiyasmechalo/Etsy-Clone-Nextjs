"use client";

import { ProductDetails } from "@/data/products";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HeartButton } from "./RectangleCard";
import clsx from "clsx";

interface ProductCardProps {
  product: ProductDetails;
  starVisible?: boolean;
  ratingHidden?: boolean;
  small?: boolean;
  extraSmall?: boolean;
  hideStarSeller?: boolean;
  hideSeller?: boolean;
}

const ProductCard = ({
  product,
  starVisible,
  ratingHidden,
  small,
  extraSmall,
  hideStarSeller,
  hideSeller,
}: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const Rating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} className="w-3.5 h-3.5 fill-black text-black" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative w-3.5 h-3.5">
          <Star
            className="absolute w-3.5 h-3.5 fill-black text-black"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
          <Star className="absolute w-3.5 h-3.5 fill-none text-black" />
        </div>
      );
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-3.5 h-3.5 fill-none text-black" />
      );
    }

    return stars;
  };

  return (
    <Link
      href={`/listing/${product.id}`}
      className={`relative group flex-grow max-w-[320] h-full`}
    >
      <div className="relative mb-2">
        <Image
          src={product.images[0]}
          alt={product.title}
          width={extraSmall ? 203 : small ? 250 : 320}
          height={extraSmall ? 160 : small ? 200 : 260}
          className={clsx(
            `aspect-[1.23/1] hover:shadow-full transition-all duration-300 object-cover`,
            extraSmall ? "rounded w-full" : small ? "" : "rounded-sm"
          )}
        />
        <div
          className={`absolute ${
            extraSmall
              ? "top-1 right-1"
              : small
              ? "top-1 right-2"
              : "top-2 right-5"
          } z-10 group-hover:opacity-100 transition-opacity duration-200 ${
            starVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <HeartButton
            isLiked={isLiked}
            handleLike={() => setIsLiked(!isLiked)}
            visible={true}
          />
        </div>
      </div>
      <div
        className={` ${
          extraSmall
            ? "max-w-[203px]"
            : small
            ? "max-w-[250px]"
            : "max-w-[320px] px-2"
        } flex flex-col`}
      >
        <h3 className="text-sm line-clamp-1">{product.title}</h3>
        {(small || extraSmall) && !hideSeller && (
          <div className={`text-xs text-gray-600`}>
            {product.sellerInfo.name}
          </div>
        )}
        {!product.shippingInfo.freeShipping && !ratingHidden && (
          <div className="flex sm:items-center mb-1 flex-col sm:flex-row justify-start">
            <div className="flex mr-1">{Rating(product.ratings.average)}</div>
            <span className="flex justify-between gap-1">
              <span className="text-xs text-gray-600">
                ({product.reviews?.length.toLocaleString()})
              </span>

              {!hideStarSeller && product.bestseller && (
                <div className="flex items-center ml-1">
                  <span className="w-3.5 h-3.5 bg-purple-500 rounded-full flex items-center justify-center mr-0.5">
                    <Star className="w-2 h-2 fill-white text-white" />
                  </span>
                  <span className="text-xs">Star Seller</span>
                </div>
              )}
            </span>
          </div>
        )}
        <div className="flex gap-1 mt-1 items-center flex-wrap">
          <span className="font-medium text-sm">
            USD {product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <div className="text-xs text-[#63a47f]">
              <span className="line-through">
                USD {product.originalPrice.toFixed(2)}
              </span>
              <span className="ml-1">
                ({(product.price - product.originalPrice) / 100}%)
              </span>
            </div>
          )}
        </div>
        {!(small || extraSmall) && (
          <div className={`text-xs text-gray-600`}>
            {product.sellerInfo.name}
          </div>
        )}
        {product.shippingInfo.freeShipping && (
          <div className="text-[10px] bg-green-400 flex rounded-full w-fit px-2 mt-1">
            FREE Shipping
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;