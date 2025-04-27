"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { Rating } from "./ImagesView";
import { TickIcon } from "../Icons";
interface Review {
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewsSectionProps {
  reviews?: Review[];
  sellerInfo: {
    name: string;
    shopLink: string;
    location?: string;
    rating: number;
  };
}

const ReviewsSection = ({ reviews = [], sellerInfo }: ReviewsSectionProps) => {
  const [activePage, setActivePage] = useState(1);
  const relatedSearches = [
    { name: "Easter Sticker", image: "/placeholder.svg?height=60&width=60" },
    { name: "Printable Easter", image: "/placeholder.svg?height=60&width=60" },
    { name: "Sticker Sheets", image: "/placeholder.svg?height=60&width=60" },
    { name: "Happy Spring", image: "/placeholder.svg?height=60&width=60" },
    { name: "Easter Stickers", image: "/placeholder.svg?height=60&width=60" },
    { name: "Easter Planner", image: "/placeholder.svg?height=60&width=60" },
    { name: "Easter Stickers", image: "/placeholder.svg?height=60&width=60" },
    {
      name: "Easter Stickers for",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Easter Stickers Bulk",
      image: "/placeholder.svg?height=60&width=60",
    },
  ];

  const buyerHighlights = [
    "Beautiful",
    "Love it",
    "Cute",
    "Fast shipping",
    "Great quality",
    "Love the shop",
    "Stunning",
    "Very well made",
  ];

  return (
    <div className="max-w-4xl mt-12 px-4">
      {/* Related Searches */}
      <div className="mb-8">
        <h3 className="text-xl font-medium mb-4">Related searches</h3>
        <div className="flex flex-wrap gap-4">
          {relatedSearches.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden mb-2">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={60}
                  height={60}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs text-center max-w-[70px] line-clamp-2">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Shop Reviews Summary */}
      <div className="mb-6">
        <h2 className="text-2xl font-medium">
          {sellerInfo.name} has {reviews.length.toLocaleString()} reviews
          <span className="inline-flex ml-2">
            <Rating rating={sellerInfo.rating} large />
          </span>
        </h2>
      </div>

      {/* Review Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex">
          <button className="px-4 py-2 border-b-2 border-black font-medium">
            This item{" "}
            <span className="ml-1 bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full text-sm">
              {reviews.length}
            </span>
          </button>
          <button className="px-4 py-2 text-gray-600">Other items</button>
          <button className="px-4 py-2 text-gray-600">
            <span className="bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full text-sm">
              {reviews.length.toLocaleString()}
            </span>
          </button>
        </div>
      </div>

      {/* Buyer Highlights */}
      <div className="bg-gray-50 p-4 rounded-lg mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5" />
          <h3 className="font-medium">Buyer highlights, summarized by AI</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {buyerHighlights.map((highlight, index) => (
            <span
              key={index}
              className="bg-white px-3 py-1 rounded-full text-sm border border-gray-200"
            >
              {highlight}
            </span>
          ))}
        </div>
      </div>

      {/* Sort Dropdown */}
      <div className="flex justify-end mb-6">
        <div className="relative">
          <select className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-gray-500">
            <option>Sort by: Suggested</option>
            <option>Newest</option>
            <option>Oldest</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-8">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="border-b border-gray-200 pb-8">
              <div className="flex flex-col md:flex-row gap-3">
                {/* Left side - Review content */}
                <div className="flex-1">
                  <div className="flex mb-2">
                    <Rating rating={review.rating} large />
                  </div>

                  <p className="mb-3">{review.comment}</p>

                  <div className="flex items-center mb-4">
                    <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium mr-2">
                      {review.reviewerName.charAt(0)}
                    </div>
                    <Link
                      href="#"
                      className="text-sm font-medium hover:underline"
                    >
                      {review.reviewerName}
                    </Link>
                    <span className="text-gray-500 text-sm ml-2">
                      {review.date}
                    </span>
                  </div>
                </div>

                {/* Right side - Quality ratings */}
                <div className="mt-4 md:mt-0 space-y-2">
                  <div className="flex items-center justify-between text-green-600 text-sm mb-4">
                    <TickIcon />
                    <span>Recommends this item</span>
                  </div>

                  <div className="flex justify-end gap-2">
                    <span className="text-sm">Item quality</span>
                    <div className="flex">
                      <Star className="w-4 h-4 fill-black" />
                      <span className="ml-1 text-xsm">5</span>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <span className="text-sm">Shipping</span>
                    <div className="flex">
                      <Star className="w-4 h-4 fill-black" />
                      <span className="ml-1 text-xsm">5</span>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <span className="text-xsm">Customer service</span>
                    <div className="flex">
                      <Star className="w-4 h-4 fill-black" />
                      <span className="ml-1 text-sm">5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-8 text-gray-500">
            No reviews yet for this item.
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 gap-2">
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-300 hover:bg-gray-100"
          onClick={() => setActivePage(Math.max(1, activePage - 1))}
          disabled={activePage === 1}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {[1, 2, 3, 4, 5].map((page) => (
          <button
            key={page}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              activePage === page
                ? "bg-black text-white"
                : "border border-gray-300 hover:bg-gray-100"
            }`}
            onClick={() => setActivePage(page)}
          >
            {page}
          </button>
        ))}

        <button
          className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-300 hover:bg-gray-100"
          onClick={() => setActivePage(Math.min(5, activePage + 1))}
          disabled={activePage === 5}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ReviewsSection;
