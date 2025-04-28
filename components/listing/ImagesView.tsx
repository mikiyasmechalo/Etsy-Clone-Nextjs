"use client";

import { useState } from "react";
import Image from "next/image";

import {
  Award,
} from "lucide-react";
import clsx from "clsx";

import { HeartButton } from "../RectangleCard";
import ScrollButtons from "../ScrollButtons";

import { ProductDetails } from "@/data/products";

import { IoStar } from "react-icons/io5";
interface RatingProps {
  rating: number;
  large?: boolean;
}

export const Rating = ({ rating, large }: RatingProps) => {
  return (
    <div className={`flex items-center ${large ? " gap-2" : " gap-0.5"} `}>
      {[...Array(5)].map((_, index) => (
        <IoStar
          key={index}
          className={`${index < rating ? "text-black" : "text-gray-400"} ${
            large ? " size-4.5 " : " size-3 "
          }`}
        />
      ))}
    </div>
  );
};

export default function ImagesGallery({data}: {data: ProductDetails}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
        <div className="flex gap-6 flex-1 justify-start">
          {/* Thumbnail Gallery */}
          <div className="flex flex-col gap-2">
            {data.images.map((thumb, index) => (
              <button
                key={index}
                className={clsx(
                  "w-16 h-16 border-2 overflow-hidden rounded-sm",
                  selectedImage === index ? "border-black" : "border-gray-200"
                )}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={thumb || "/placeholder.svg"}
                  alt={`Product thumbnail ${index + 1}`}
                  width={60}
                  height={60}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main Product Image */}
          <div className="relative pt-5 w-full h-fit">
            <Image
              src={data.images[selectedImage] || "/placeholder.svg"}
              alt="Easter greeting card with cute illustrations including bunny, chick, carrots, and Easter eggs"
              width={600}
              height={800}
              className="object-cover rounded-lg w-full"
              priority
            />
            <ScrollButtons
              className="absolute left-2 top-1/2 flex justify-between z-10 w-full pr-4"
              scrollLeft={() =>
                setSelectedImage(Math.max(selectedImage - 1, 0))
              }
              scrollRight={() =>
                setSelectedImage(
                  Math.min(selectedImage + 1, data.images.length - 1)
                )
              }
              disableLeft={selectedImage === 0}
              disableRight={selectedImage === data.images.length - 1}
            />
            <div className="absolute top-2 right-2 z-10 shadow-all-round rounded-full">
              <HeartButton
                large
                visible
                isLiked={isFavorite}
                handleLike={() => setIsFavorite(!isFavorite)}
              />
            </div>
            {data.bestseller && (
              <div className="absolute top-2 left-2 z-10">
                <div className="bg-[#ffd7ba] text-[#7d3c00] text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  Bestseller
                </div>
              </div>
            )}
          </div>
        </div>
  );
}
