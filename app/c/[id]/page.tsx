"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import ButtonLink from "@/components/ui/ButtonLink";
import clsx from "clsx"; // Import clsx for conditional classes
import { HeartButton } from "@/components/RectangleCard";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Dropdown from "@/components/ui/Dropdown";

interface Category {
  id: string;
  name: string;
  image: string;
  link: string;
}

// Define product types
interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  rating: number;
  reviewCount: number;
  seller: string;
  isStarSeller?: boolean;
  href: string;
  freeShipping?: boolean;
}

// Sample categories data
export const categoryData: Record<
  string,
  {
    title: string;
    subtitle: string;
    categories: Category[];
    featuredProducts: Product[];
  }
> = {
  accessories: {
    title: "Accessories",
    subtitle: "Scarves, hats, and hair accessories that tie it all together",
    categories: [
      {
        id: "hair-accessories",
        name: "Hair Accessories",
        image: "/earings.jpg",
        link: "/category/hair-accessories",
      },
      {
        id: "scarves-wraps",
        name: "Scarves & Wraps",
        image: "/earings.jpg",
        link: "/category/scarves-wraps",
      },
      {
        id: "hats-caps",
        name: "Hats & Caps",
        image: "/earings.jpg",
        link: "/category/hats-caps",
      },
      {
        id: "keychains-lanyards",
        name: "Keychains & Lanyards",
        image: "/earings.jpg",
        link: "/category/keychains-lanyards",
      },
      {
        id: "sunglasses-eyewear",
        name: "Sunglasses & Eyewear",
        image: "/earings.jpg",
        link: "/category/sunglasses-eyewear",
      },
      {
        id: "patches-pins",
        name: "Patches & Pins",
        image: "/earings.jpg",
        link: "/category/patches-pins",
      },
      {
        id: "belts-suspenders",
        name: "Belts & Suspenders",
        image: "/earings.jpg",
        link: "/category/belts-suspenders",
      },
      {
        id: "gloves-mittens",
        name: "Gloves & Mittens",
        image: "/earings.jpg",
        link: "/category/gloves-mittens",
      },
      {
        id: "wallets-money-clips",
        name: "Wallets & Money Clips",
        image: "/earings.jpg",
        link: "/category/wallets-money-clips",
      },
      {
        id: "umbrellas-rain-accessories",
        name: "Umbrellas & Rain Accessories",
        image: "/earings.jpg",
        link: "/category/umbrellas-rain-accessories",
      },
      {
        id: "tech-accessories",
        name: "Tech Accessories",
        image: "/earings.jpg",
        link: "/category/tech-accessories",
      },
      {
        id: "ties-bow-ties",
        name: "Ties & Bow Ties",
        image: "/earings.jpg",
        link: "/category/ties-bow-ties",
      },
      {
        id: "keyrings-lanyards",
        name: "Keyrings & Lanyards",
        image: "/earings.jpg",
        link: "/category/keyrings-lanyards",
      },
      {
        id: "face-masks-coverings",
        name: "Face Masks & Coverings",
        image: "/earings.jpg",
        link: "/category/face-masks-coverings",
      },
      {
        id: "other-accessories",
        name: "Other Accessories",
        image: "/earings.jpg",
        link: "/category/other-accessories",
      },
    ],
    featuredProducts: [
      {
        id: 1,
        title:
          "Personalized Initial Heart Keychain Set, Initials Couple Keychain",
        image: "/hat.jpg",
        price: 9.08,
        originalPrice: 18.17,
        discount: "50% off",
        rating: 4.5,
        reviewCount: 4226,
        seller: "CROSSBODYCASE",
        isStarSeller: true,
        href: "/product/1",
        freeShipping: true,
      },
      {
        id: 2,
        title:
          "Custom Name Keychain, Personalized Keychain, Gift for Her, Gift for Him",
        image: "/hat.jpg",
        price: 12.99,
        originalPrice: 19.99,
        discount: "35% off",
        rating: 4.8,
        reviewCount: 2187,
        seller: "CustomGiftShop",
        isStarSeller: true,
        href: "/product/2",
      },
      {
        id: 3,
        title:
          "Leather Keychain with Initial, Monogram Keyring, Personalized Gift",
        image: "/earings.jpg",
        price: 15.5,
        rating: 4.7,
        reviewCount: 1856,
        seller: "LeatherCraftCo",
        isStarSeller: true,
        href: "/product/3",
      },
      {
        id: 4,
        title: "Mini Macrame Keychain, Boho Bag Charm, Car Accessory",
        image: "/earings.jpg",
        price: 8.25,
        originalPrice: 11.0,
        discount: "25% off",
        rating: 4.3,
        reviewCount: 942,
        seller: "BohoMacrameCrafts",
        href: "/product/4",
      },
      {
        id: 5,
        title: "Resin Keychain with Dried Flowers, Nature Inspired Gift",
        image: "/hat.jpg",
        price: 14.95,
        rating: 4.9,
        reviewCount: 3105,
        seller: "NatureResinArt",
        isStarSeller: true,
        href: "/product/5",
      },
      {
        id: 6,
        title: "Wooden Name Keychain, Custom Engraved Keyring",
        image: "/hat.jpg",
        price: 10.5,
        originalPrice: 15.0,
        discount: "30% off",
        rating: 4.6,
        reviewCount: 1278,
        seller: "WoodenCraftHouse",
        href: "/product/6",
      },
    ],
  },
  jewelry: {
    title: "Jewelry",
    subtitle: "Unique handcrafted jewelry for every style and occasion",
    categories: [
      {
        id: "necklaces",
        name: "Necklaces",
        image: "/placeholder.svg?height=200&width=200",
        link: "/category/necklaces",
      },
      {
        id: "earrings",
        name: "Earrings",
        image: "/placeholder.svg?height=200&width=200",
        link: "/category/earrings",
      },
      {
        id: "bracelets",
        name: "Bracelets",
        image: "/placeholder.svg?height=200&width=200",
        link: "/category/bracelets",
      },
      {
        id: "rings",
        name: "Rings",
        image: "/placeholder.svg?height=200&width=200",
        link: "/category/rings",
      },
      {
        id: "body-jewelry",
        name: "Body Jewelry",
        image: "/placeholder.svg?height=200&width=200",
        link: "/category/body-jewelry",
      },
      {
        id: "jewelry-sets",
        name: "Jewelry Sets",
        image: "/placeholder.svg?height=200&width=200",
        link: "/category/jewelry-sets",
      },
    ],
    featuredProducts: [
      {
        id: 7,
        title: "Minimalist Gold Necklace, Dainty Chain Necklace",
        image: "/placeholder.svg?height=200&width=200",
        price: 24.99,
        originalPrice: 39.99,
        discount: "38% off",
        rating: 4.8,
        reviewCount: 3562,
        seller: "MinimalistJewelryCo",
        isStarSeller: true,
        href: "/product/7",
      },
      {
        id: 8,
        title: "Birthstone Bracelet, Personalized Gift for Her",
        image: "/placeholder.svg?height=200&width=200",
        price: 18.75,
        originalPrice: 25.0,
        discount: "25% off",
        rating: 4.7,
        reviewCount: 2841,
        seller: "GemstoneJewelry",
        isStarSeller: true,
        href: "/product/8",
      },
    ],
  },
};

// Product Card Component
export const ProductCard = ({
  product,
  starVisible,
  ratingHidden,
  small,
  extraSmall, // New prop
  hideStarSeller,
  hideSeller,
}: { product: Product } & {
  starVisible?: boolean;
  ratingHidden?: boolean;
  hideStarSeller?: boolean;
  hideSeller?: boolean;
  small?: boolean;
  extraSmall?: boolean; // New prop type
}) => {
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
      href={product.href}
      className={`relative group flex-grow max-w-[320] h-full`}
    >
      <div className="relative mb-2">
        <Image
          src={product.image}
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
          <div className={`text-xs text-gray-600`}>{product.seller}</div>
        )}
        {!product.freeShipping && !ratingHidden && (
          <div className="flex sm:items-center mb-1 flex-col sm:flex-row justify-start">
            <div className="flex mr-1">{Rating(product.rating)}</div>
            <span className="flex justify-between gap-1">
              <span className="text-xs text-gray-600">
                ({product.reviewCount.toLocaleString()})
              </span>

              {!hideStarSeller && product.isStarSeller && (
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
              <span className="ml-1">({product.discount})</span>
            </div>
          )}
        </div>
        {!(small || extraSmall) && (
          <div className={`text-xs text-gray-600`}>{product.seller}</div>
        )}
        {product.freeShipping && (
          <div className="text-[10px] bg-green-400 flex rounded-full w-fit px-2 mt-1">
            FREE Shipping
          </div>
        )}
      </div>
    </Link>
  );
};

export default function CategoryPage() {
  const [activePage, setActivePage] = useState(1);
  const params = useParams();
  const categoryId = params.id as string;
  const [showAll, setShowAll] = useState(false);

  const categoryInfo = categoryData[categoryId] || {
    title: "Category Not Found",
    subtitle: "Please check the URL and try again",
    categories: [],
  };

  const initialDisplayCount = 6;

  const hiddenCount = categoryInfo.categories.length - initialDisplayCount;
  const sortOptions = ["newest", "price-low-to-high", "price-high-to-low"];
  const [sortOption, setSortOption] = useState("newest");
  const onSelect = (option: string) => {
    setSortOption(option);
  };

  return (
    <div className={` max-w`}>
      <div className="flex mx-auto sm:px-4 py-8 flex-col w-fit justify-center max-w-[1104px]">
        <div className="text-center mb-8">
          <h1 className={`text-3xl font-light mb-2 font-g`}>
            {categoryInfo.title}
          </h1>
          <p className="text-gray-600 text-sm">{categoryInfo.subtitle}</p>
        </div>

        <div className="sm:flex grid grid-cols-2 grid-rows-3 flex-wrap sm:gap-8 gap-4 justify-items-center sm:justify-between">
          {categoryInfo.categories.map((category, index) => (
            <Link
              key={category.id}
              href={category.link}
              className={clsx(
                "flex flex-col items-center group w-fit",
                "transition-all duration-500 ease-out",
                {
                  "opacity-0 translate-y-2 pointer-events-none max-h-0":
                    !showAll && index >= initialDisplayCount,
                  "opacity-100 translate-y-0":
                    showAll || index < initialDisplayCount,
                }
              )}
            >
              <div className="rounded-lg overflow-hidden mb-2 ">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  height={210}
                  width={140}
                  className="object-cover group-hover:scale-105 h-[210px] w-[140px] transition-transform duration-300"
                />
              </div>
              <span className="text-sm text-center">{category.name}</span>
            </Link>
          ))}
        </div>

        {categoryInfo.categories.length > initialDisplayCount && (
          <div className="flex justify-center">
            <ButtonLink
              onClick={() => setShowAll((f) => !f)}
              btnClassName="text-black"
              className="bg-gray-200 hover:bg-gray-300 transition-background-color duration-200 hover:shadow-full"
            >
              {showAll ? "Show less" : "Show more"}{" "}
              {!showAll && hiddenCount > 0 ? ` (${hiddenCount})` : ""}
            </ButtonLink>
          </div>
        )}
      </div>

      {categoryInfo.featuredProducts.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="w-full flex justify-end">
            <div className="relative mt-1 flex">
              <Dropdown
                buttonContent={"Sort By"}
                options={sortOptions}
                selectedOption={sortOption}
                onSelect={onSelect}
              ></Dropdown>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {categoryInfo.featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
      <div className="flex w-full flex-col gap-2 mt-10">
        <p>There's so much more for you to discover</p>
        <div className="flex items-center gap-2">
          <button
            className="size-9 rounded-full flex items-center justify-center border border-gray-300 hover:bg-gray-100"
            onClick={() => setActivePage(Math.max(1, activePage - 1))}
            disabled={activePage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`size-9 rounded-full focus-blue text-xsm flex items-center justify-center ${
                activePage === page
                  ? "border-2"
                  : "bg-gray-100 hover:bg-gray-100"
              }`}
              onClick={() => setActivePage(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="size-9 rounded-full flex items-center justify-center border border-gray-300 hover:bg-gray-100"
            onClick={() => setActivePage(Math.min(5, activePage + 1))}
            disabled={activePage === 5}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="mt-10">
        <h3 className="text-2xl font-medium">Shop by Interest</h3>
        <p className="text-sm text-gray-600">{categoryInfo.title}</p>
        {(() => {
          const data = [
            {
              image: "/hat.jpg",
              title: "Minimalist",
            },
            {
              image: "/hat.jpg",
              title: "Minimalist",
            },
            {
              image: "/hat.jpg",
              title: "Minimalist",
            },
          ];
          return (
            <div className="flex gap-4 flex-wrap justify-center">
              {data.map((d) => (
                <Link
                  href={"#"}
                  className="flex flex-col border-gray-300 border rounded-lg hover:shadow-all-round transition-shadow duration-200 hover:underline!"
                >
                  <Image src={d.image} alt={d.title} width={215} height={170} />
                  <span className="p-3 pb-5">{d.title}</span>
                </Link>
              ))}
            </div>
          );
        })()}
      </div>
    </div>
  );
}
