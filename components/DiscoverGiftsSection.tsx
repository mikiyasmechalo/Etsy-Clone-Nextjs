import React from "react";
import CircularItem from "@/components/ui/CircularCard"; 
import { productData } from "@/data/products";

const DiscoverGiftsSection = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 w-full overflow-x-hidden">
      <h3 className="text-3xl font-medium">
        Discover gifts for every occasion
      </h3>
      <div
        className="flex gap-10 overflow-x-auto w-full sm:justify-center py-5"
        style={{ scrollbarWidth: "none" }}
      >
        {productData.slice(0, 6).map((item, index) => (
          <CircularItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DiscoverGiftsSection;
