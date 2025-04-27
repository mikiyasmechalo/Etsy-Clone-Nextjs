"use client";
import React, { useRef, useEffect, useState } from "react";
import DetailCard from "./DetailCard";
import ScrollButtons from "./ScrollButtons";

const data = [
  {
    image: "/detail-1.jpg",
    originalPrice: 100,
    discountPrice: 90,
    tagline: "Biggest discount in 90 days",
    rating: 4.9,
    name: "Personalized Crochet Baby Rattle Toy for Girls and Boys, Animal Crochet Baby Rattle, Baby Shower Gift, Baby Rattle Grasping Toy,Newborn Gift",
  },
  {
    image: "/detail-2.jpg",
    originalPrice: 16.63,
    discountPrice: 4.99,
    tagline: "Buy one get one free",
    rating: 4.8,
    name: "Personalized 20oz Vacation Tumbler, Custom Travel Mug, Beach Tumbler, Stainless Steel Mug, Girls Weekend Gift, Laser Engraved Tumbler",
  },
  {
    image: "/detail-1.jpg",
    originalPrice: 100,
    discountPrice: 90,
    tagline: "Biggest discount in 90 days",
    rating: 4.9,
    name: "Personalized Crochet Baby Rattle Toy for Girls and Boys, Animal Crochet Baby Rattle, Baby Shower Gift, Baby Rattle Grasping Toy,Newborn Gift",
  },
  {
    image: "/detail-2.jpg",
    originalPrice: 16.63,
    discountPrice: 4.99,
    tagline: "Buy one get one free",
    rating: 4.8,
    name: "Personalized 20oz Vacation Tumbler, Custom Travel Mug, Beach Tumbler, Stainless Steel Mug, Girls Weekend Gift, Laser Engraved Tumbler",
  },
  {
    image: "/detail-1.jpg",
    originalPrice: 100,
    discountPrice: 90,
    tagline: "Biggest discount in 90 days",
    rating: 4.9,
    name: "Personalized Crochet Baby Rattle Toy for Girls and Boys, Animal Crochet Baby Rattle, Baby Shower Gift, Baby Rattle Grasping Toy,Newborn Gift",
  },
  {
    image: "/detail-1.jpg",
    originalPrice: 100,
    discountPrice: 90,
    tagline: "Biggest discount in 90 days",
    rating: 4.9,
    name: "Personalized Crochet Baby Rattle Toy for Girls and Boys, Animal Crochet Baby Rattle, Baby Shower Gift, Baby Rattle Grasping Toy,Newborn Gift",
  },
  {
    image: "/detail-1.jpg",
    originalPrice: 100,
    discountPrice: 90,
    tagline: "Biggest discount in 90 days",
    rating: 4.9,
    name: "Personalized Crochet Baby Rattle Toy for Girls and Boys, Animal Crochet Baby Rattle, Baby Shower Gift, Baby Rattle Grasping Toy,Newborn Gift",
  },
  {
    image: "/detail-1.jpg",
    originalPrice: 100,
    discountPrice: 90,
    tagline: "Biggest discount in 90 days",
    rating: 4.9,
    name: "Personalized Crochet Baby Rattle Toy for Girls and Boys, Animal Crochet Baby Rattle, Baby Shower Gift, Baby Rattle Grasping Toy,Newborn Gift",
  },
  {
    image: "/detail-1.jpg",
    originalPrice: 100,
    discountPrice: 90,
    tagline: "Biggest discount in 90 days",
    rating: 4.9,
    name: "Personalized Crochet Baby Rattle Toy for Girls and Boys, Animal Crochet Baby Rattle, Baby Shower Gift, Baby Rattle Grasping Toy,Newborn Gift",
  },
  {
    image: "/detail-1.jpg",
    originalPrice: 100,
    discountPrice: 90,
    tagline: "Biggest discount in 90 days",
    rating: 4.9,
    name: "Personalized Crochet Baby Rattle Toy for Girls and Boys, Animal Crochet Baby Rattle, Baby Shower Gift, Baby Rattle Grasping Toy,Newborn Gift",
  },
  {
    image: "/detail-1.jpg",
    originalPrice: 100,
    discountPrice: 90,
    tagline: "Biggest discount in 90 days",
    rating: 4.9,
    name: "Personalized Crochet Baby Rattle Toy for Girls and Boys, Animal Crochet Baby Rattle, Baby Shower Gift, Baby Rattle Grasping Toy,Newborn Gift",
  },
  {
    image: "/detail-1.jpg",
    originalPrice: 100,
    discountPrice: 90,
    tagline: "Biggest discount in 90 days",
    rating: 4.9,
    name: "Personalized Crochet Baby Rattle Toy for Girls and Boys, Animal Crochet Baby Rattle, Baby Shower Gift, Baby Rattle Grasping Toy,Newborn Gift",
  },
  {
    image: "/detail-1.jpg",
    originalPrice: 100,
    discountPrice: 90,
    tagline: "Biggest discount in 90 days",
    rating: 4.9,
    name: "Personalized Crochet Baby Rattle Toy for Girls and Boys, Animal Crochet Baby Rattle, Baby Shower Gift, Baby Rattle Grasping Toy,Newborn Gift",
  },
];

const DealsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [disableLeft, setDisableLeft] = useState(true);
  const [disableRight, setDisableRight] = useState(false);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 500;
      updateButtonState();
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 500;
      updateButtonState();
    }
  };

  const updateButtonState = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setDisableLeft(scrollLeft === 0);
      setDisableRight(scrollLeft + clientWidth >= scrollWidth - 1);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", updateButtonState);
      updateButtonState();

      return () => {
        containerRef.current?.removeEventListener("scroll", updateButtonState);
      };
    }
  }, []);

  return (
    <div className="hidden md:block">
      <div className="flex justify-between items-center mb-4 ">
        <h3 className="text-2xl font-medium">Today's big deals</h3>
        <ScrollButtons
          className="gap-2 flex"
          scrollLeft={scrollLeft}
          scrollRight={scrollRight}
          disableLeft={disableLeft}
          disableRight={disableRight}
        />
      </div>
      <div
        ref={containerRef}
        className="flex gap-5 overflow-x-auto scroll-smooth p-2"
        style={{ scrollbarWidth: "none" }}
      >
        {data.map((item, index) => (
          <DetailCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DealsSection;
