"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  IoMenu,
} from "react-icons/io5";
import { HiOutlineMenuAlt1 } from "react-icons/hi";

import AnimatedButton, { AnimatedLink } from "../ui/AnimatedButton";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ButtonLink from "../ui/ButtonLink";
import clsx from "clsx";

import SearchInput from "../ui/SearchInput";
import HoverTipLink from "../HoverTipLink";

const Header = () => {
  const pathname = usePathname();
  pathname.includes("singin");
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const categoriesButtonRef = useRef<HTMLButtonElement>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [inputActive, setInputActive] = useState(false);
  const [cartItems] = useState(1);
  

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        categoriesButtonRef.current &&
        !categoriesButtonRef.current.contains(event.target as Node)
      ) {
        setCategoriesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [categoriesOpen]);

  useEffect(() => {
    if (categoriesOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth; // Calculate scrollbar width
      document.body.style.overflow = "hidden"; // Disable scrolling
      document.body.style.paddingRight = `${scrollbarWidth}px`; // Add padding to compensate for scrollbar
    } else {
      document.body.style.overflow = ""; // Restore scrolling
      document.body.style.paddingRight = ""; // Reset padding
    }
    if (!inputActive) setSearchTerm("");
  }, [categoriesOpen, inputActive]);

  return (
    <>
      <div className="max-wsm pt-3 flex flex-col sm:gap-1">
        {!pathname.includes("signin") && !pathname.includes("register") ? (
          <>
            <span
              className={`absolute z-20 inset-0 transition-colors duration-200 ${
                categoriesOpen || inputActive
                  ? "bg-black opacity-60 md:top-26"
                  : "opacity-0 pointer-events-none -z-100"
              }`}
            ></span>

            <div className="md:relative flex sm:gap-3 flex-wrap md:flex-nowrap items-center justify-between">
              <Link href={"/"} className="sm:min-w-20 w-15 fill-orange-500">
                <EtsyLogo />
              </Link>
              <AnimatedButton
                ref={categoriesButtonRef}
                className="md:flex gap-2 text-xsm w-40 hidden"
                onClick={() => setCategoriesOpen(!categoriesOpen)}
              >
                <IoMenu className="size-5" />
                Categories
              </AnimatedButton>
              <div
                ref={menuRef}
                className={clsx(
                  `absolute z-20 md:top-15 top-0 left-0 md:left-25 rounded-l-xl`,
                  categoriesOpen
                    ? "md:max-h-150 shadow-all-round opacity-100"
                    : "max-h-0 -translate-x-100 md:-translate-x-0 opacity-0",
                  "transition-all duration-200"
                )}
              >
                {categoriesOpen && (
                  <div className="absolute bottom-full translate-x-10 translate-y-1.5 -z-1 size-3 bg-white rotate-45 shadow-full"></div>
                )}
                <EtsyCategoryMenu
                  open={categoriesOpen}
                  onClose={() => setCategoriesOpen(false)}
                />
              </div>
              <div className="w-full order-last md:order-none flex items-center">
                <AnimatedButton
                  className="flex md:hidden"
                  onClick={() => setCategoriesOpen(!categoriesOpen)}
                >
                  <HiOutlineMenuAlt1 className="size-6" />
                </AnimatedButton>
                <div className="w-full relative z-20">
                  <SearchInput
                    value={searchTerm}
                    onChange={setSearchTerm}
                    active={inputActive}
                    setActive={setInputActive}
                  />
                  {/* Search results */}
                  <div
                    className={clsx(
                      "absolute top-full z-10 mt-2 w-full transition-all duration-200 overflow-hidden rounded-xl",
                      inputActive ? "shadow-all-round max-h-85 max-w-200" : " max-h-0 max-w-100 pointer-events-none"
                    )}
                  >
                    <SearchResults
                      open={inputActive}
                      filteredCategories={filteredCategories}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <AnimatedLink href="/signin" className="text-xsm text-nowrap">
                  Sign in
                </AnimatedLink>
                <HoverTipLink
                  href="/favorites"
                  tip="Favorites"
                  hoverColor="#ccebff"
                >
                  <HeartIcon className="size-6 hover:fill-[#122868]" />
                </HoverTipLink>
                <HoverTipLink href="/gifts" tip="Gifts" hoverColor="#ccebff">
                  <GiftIcon className="size-6 hover:fill-[#122868]" />
                </HoverTipLink>
                <HoverTipLink
                  href="/cart"
                  tip="Cart"
                  hoverColor="#ccebff"
                  badge={cartItems}
                >
                  <CartIcon className="size-6 hover:fill-[#122868]" />
                </HoverTipLink>
              </div>
            </div>
            <div className="md:flex gap-3 mx-auto hidden">
              <AnimatedLink href="/gifts" className="flex gap-2 text-xsm">
                <GiftIcon className="size-4.5" /> Gifts
              </AnimatedLink>
              <AnimatedLink href="#" className="text-xsm">
                Easter
              </AnimatedLink>
              <AnimatedLink href="#" className="text-xsm">
                HomeFavorites
              </AnimatedLink>
              <AnimatedLink href="#" className="text-xsm">
                Fasion Finds
              </AnimatedLink>
              <AnimatedLink href="/registry" className="text-xsm">
                Registry
              </AnimatedLink>
            </div>
          </>
        ) : (
          <>
            <div className="relative flex sm:gap-3 flex-wrap md:flex-nowrap items-center justify-between py-2 ">
              <Link href={"/"} className="sm:min-w-20 w-15 fill-orange-500">
                <EtsyLogo />
              </Link>
              <ButtonLink
                href="/register"
                btnClassName="text-xsm text-nowrap text-black py-2 hover:scale-101"
                className="bg-white border"
                small
              >
                Register
              </ButtonLink>
            </div>
          </>
        )}
      </div>
      <hr className="border-t-2 border-gray-300 mt-1" />
    </>
  );
};

export default Header;

export const SearchResults = ({
  filteredCategories,
}: {
  filteredCategories: Category[];
  open: boolean;
}) => {
  if (!filteredCategories.length)
    return filteredCategories.push({ name: "No results", href: "#" });
  return (
    <div
      className="menu-scroll-container w-full bg-white shadow-full rounded-xl max-h-screen 
      pl-1 pr-1.5 overflow-y-auto overflow-x-hidden 
    transition-all duration-200 flex flex-col py-"
    >
      {filteredCategories.slice(0, 6).map((category, i) => (
        <Link
          key={category.href}
          href={category.href}
          className={`${i === 0 && "mt-1"}
          focus-visible:outline-none! focus-visible:ring-2! focus-visible:ring-blue-500! focus-visible:bg-gray-100
          flex justify-between pr-7 items-ecnter text-truncate w-full pl-4 py-3 
          text-gray-700 hover:bg-gray-100 transition-colors duration-150 hover:underline!`}
          role="menuitem"
          tabIndex={0}
        >
          {category.name}
          <FaChevronRight className="block md:hidden" />
        </Link>
      ))}
    </div>
  );
};

interface Category {
  name: string;
  href: string;
}

const categories: Category[] = [
  { name: "Accessories", href: "/c/accessories?ref=catnav-1" },
  { name: "Art & Collectibles", href: "/c/art-and-collectibles?ref=catnav-66" },
  { name: "Baby", href: "/c/baby?ref=catnav-12545" },
  { name: "Bags & Purses", href: "/c/bags-and-purses?ref=catnav-132" },
  { name: "Bath & Beauty", href: "/c/bath-and-beauty?ref=catnav-199" },
  {
    name: "Books, Movies & Music",
    href: "/c/books-movies-and-music?ref=catnav-323",
  },
  { name: "Clothing", href: "/c/clothing?ref=catnav-374" },
  {
    name: "Craft Supplies & Tools",
    href: "/c/craft-supplies-and-tools?ref=catnav-562",
  },
  {
    name: "Electronics & Accessories",
    href: "/c/electronics-and-accessories?ref=catnav-825",
  },
  { name: "Gifts", href: "/c/gifts?ref=catnav-12584" },
  { name: "Home & Living", href: "/c/home-and-living?ref=catnav-891" },
  { name: "Jewelry", href: "/c/jewelry?ref=catnav-1179" },
  {
    name: "Paper & Party Supplies",
    href: "/c/paper-and-party-supplies?ref=catnav-1250",
  },
  { name: "Pet Supplies", href: "/c/pet-supplies?ref=catnav-1351" },
  { name: "Shoes", href: "/c/shoes?ref=catnav-1429" },
  { name: "Toys & Games", href: "/c/toys-and-games?ref=catnav-1552" },
  { name: "Weddings", href: "/c/weddings?ref=catnav-1633" },
];
import { MdOutlineClose } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import { CartIcon, EtsyLogo, GiftIcon, HeartIcon } from "../Icons";

const EtsyCategoryMenu = ({
  onClose,
  open,
}: {
  onClose: () => void;
  open: boolean;
}) => {
  const refs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (refs.current[0]) {
      refs.current[0].focus(); // Focus the first item when menu opens
      refs.current[0].classList.add("focus-visible");
    }
    if (open) {
      const menuElement = document.querySelector(".menu-scroll-container"); // Select your scrollable container
      if (menuElement) {
        menuElement.scrollTop = 0; // Reset scroll to the top
      }
    }
  }, [open]);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLAnchorElement>,
    index: number
  ) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (index + 1) % categories.length; // Go to the next item, loop to the start
      refs.current[nextIndex]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = (index - 1 + categories.length) % categories.length; // Go to the previous item, loop to the end
      refs.current[prevIndex]?.focus();
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <div className={`bg-white ${open ? "py-2" : ""} rounded-md`} role="menu">
      <div className="p-4 flex flex-col gap-4 md:hidden">
        <div className="flex justify-between">
          <div className="w-15 fill-orange-500">
            <EtsyLogo />
          </div>
          <button onClick={onClose} className="cursor-pointer">
            <MdOutlineClose className="size-7 mr-2" />
          </button>
        </div>
        <h4 className="text-xl font-medium text-center"> Browse Categories </h4>
      </div>
      <div
        className={`menu-scroll-container max-h-screen pl-1 pr-1.5 overflow-y-auto overflow-x-hidden transition-all duration-200 flex flex-col py-1 sm:w-[330px] ${
          open ? "md:max-h-150" : "md:max-h-0 pointer-events-none"
        }`}
      >
        {categories.map((category, i) => (
          <Link
            ref={(el) => {
              refs.current[i] = el;
            }}
            key={category.href}
            onClick={onClose}
            href={category.href}
            className={`${i === 0 && "mt-1"}
            focus-visible:outline-none! focus-visible:ring-2! focus-visible:ring-blue-500! focus-visible:bg-gray-100
            flex justify-between pr-7 items-ecnter text-truncate w-full pl-4 py-3 
            text-gray-700 hover:bg-gray-100 transition-colors duration-150 hover:underline!`}
            role="menuitem"
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, i)}
          >
            {category.name}
            <FaChevronRight className="block md:hidden" />
          </Link>
        ))}
      </div>
    </div>
  );
};
