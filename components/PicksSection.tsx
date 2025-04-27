import React from "react";
import RectangleCard from "./RectangleCard";
import { productData } from "@/data/products";

const PicksSection = () => {
  return (
    <div className="flex flex-col gap-5 lg:max-w">
      <h1 className="text-2xl font-medium">Picks inspired by your shopping</h1>

      <div className="md:flex gap-4.5 grid grid-cols-2">
        {productData.slice(6, 11).map((item, index) => (
          <RectangleCard
            key={index}{...item} 
            hideVideo
          />
        ))}
      </div>
    </div>
  );
};

export default PicksSection;
