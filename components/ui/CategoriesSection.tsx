import React from "react";
import CategoriesCard from "./CategoriesCard";

const data = [
  {
    image: "/womens.jpg",
    href: "/",
    title: "Women's",
  },
  {
    image: "/dog-c.jpg",
    href: "/",
    title: "Mugs",
  },
  {
    image: "/prints.jpg",
    href: "/",
    title: "Drawings and Sketches",
  },
  {
    image: "/dog-c.jpg",
    href: "/",
    title: "Crochet Patterns",
  },
  {
    image: "/womens.jpg",
    href: "/",
    title: "Drawings and Sketches",
  },
  {
    image: "/prints.jpg",
    href: "/",
    title: "Crochet Patterns",
  },
];

const CategoriesSection = () => {
  return (
    <div className="flex flex-col gap-5">
        <h4 className="text-2xl font-medium">Shop our most popular categories</h4>
      <div className="md:flex gap-6 grid grid-cols-3">
        {data.map((item, index) => (
          <CategoriesCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
