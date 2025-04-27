import ImagesGallery from "@/components/listing/ImagesView";
import ReviewsSection from "@/components/listing/ReviewsSection";
import SideDetails from "@/components/listing/SideDetails";
import { productData } from "@/data/products";
import React from "react";

const page = () => {
  return (
    <div className="min-h-fit p-4 md:p-8 max-w-[1360px] mx-auto flex gap-10 flex-col">
      <div className="flex w-full gap-10 flex-col md:flex-row">
        <span className="md:w-2/3 flex flex-col">
          <ImagesGallery data={productData[0]} />
          <span className="md:flex hidden justify-start w-full ">
            <ReviewsSection
              reviews={productData[0].reviews}
              sellerInfo={productData[0].sellerInfo}
            />
          </span>
        </span>

        <span className="md:w-1/3">
          <SideDetails data={productData[0]} />
        </span>
      </div>
      <span className="md:hidden flex justify-start md:max-w-2/3 w-full">
        <ReviewsSection
          reviews={productData[0].reviews}
          sellerInfo={productData[0].sellerInfo}
        />
      </span>
    </div>
  );
};

export default page;
