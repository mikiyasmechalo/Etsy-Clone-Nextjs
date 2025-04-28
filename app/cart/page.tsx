"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Info, MoreHorizontal } from "lucide-react";
import ButtonLink from "@/components/ui/ButtonLink";
import { LuHeartHandshake } from "react-icons/lu";
import { AiFillTag } from "react-icons/ai";
import clsx from "clsx";
import { FaLeaf } from "react-icons/fa";
import {
  GooglePayIcon,
  MastercardIcon,
  PaypalIcon,
  VisaIcon,
} from "@/components/Icons";

// Cart item type
interface CartItem {
  id: string;
  image: string;
  title: string;
  seller: string;
  sellerImage: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  options?: {
    name: string;
    value: string;
  }[];
  saleEndsIn?: string;
  quantity: number;
  shipping?: number;
  shippingMethod?: string;
  hasOptions: boolean;
}

// Sample cart data
const cartItems: CartItem[] = [
  {
    id: "1",
    image: "/placeholder.svg?height=200&width=200",
    title: "Hexagon Moss Agate Gemstone 925 Silver 14K Rose Gold Plated Ring",
    seller: "BloozieBluJewelry",
    sellerImage: "/placeholder.svg?height=200&width=200",
    price: 64.99,
    originalPrice: 99.99,
    discount: "35% off",
    options: [
      { name: "Ring size", value: "4 US" },
      { name: "Metal Type", value: "925 Yellow" },
    ],
    saleEndsIn: "8:08:20",
    quantity: 1,
    shipping: 18.08,
    shippingMethod: "(Standard International)",
    hasOptions: true,
  },
  {
    id: "2",
    image: "/placeholder.svg?height=200&width=200",
    title: "Hexagon Moss Agate 925 Silver 14K Rose Gold Plated Ring",
    seller: "STFOLIVERJEWELRY",
    sellerImage: "/placeholder.svg?height=200&width=200",
    price: 159.4,
    quantity: 1,
    hasOptions: false,
  },
];

// CartItemCard component
const CartItemCard = ({ item }: { item: CartItem }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  // const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="p-6 rounded-2xl border border-gray-200">
      <div className="flex items-start gap-2">
        {/* Seller info */}
        <div className="flex-1">
          <div className="flex items-center gap-5 mb-4">
            <Link
              href={`/shop/${item.seller}`}
              className="hover:underline! flex gap-4 items-center"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={40}
                height={40}
                className="rounded-lg"
              />
              {item.seller}
            </Link>
            <button className="text-gray-500">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          <div className="flex gap-4">
            {/* Product image */}
            <div className="w-32 h-32 flex-shrink-0">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                width={128}
                height={128}
                className="w-full h-full object-cover rounded-md"
              />
            </div>

            {/* Product details */}
            <div className="flex-1">
              <h3 className="text-base font-normal mb-2 line-clamp-2">
                {item.title}
              </h3>

              {/* Selected options */}
              {item.hasOptions && item.options && (
                <div className="mb-3">
                  {item.options.map((option, index) => (
                    <div key={index} className="text-sm text-gray-700">
                      <span className="font-medium">{option.name}: </span>
                      <span>{option.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Missing options warning */}
              {!item.hasOptions && (
                <Link
                  href={"#"}
                  className="bg-[#ffdde6] p-3 rounded-md mb-3 flex items-center gap-2 group"
                >
                  <Info className="w-5 h-5 fill-white text-black flex-shrink-0" />
                  <span className="text-sm underline">Choose Options</span>
                </Link>
              )}

              {/* Sale countdown */}
              {item.saleEndsIn && (
                <div className="text-sm text-green-700 mb-3">
                  Sale ends in {item.saleEndsIn}
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3">
                {item.hasOptions ? (
                  <>
                    <div className="relative">
                      <select
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="appearance-none cursor-pointer bg-white border border-gray-300 rounded-md py-1 pl-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option
                            key={num}
                            value={num}
                            className="cursor-pointer"
                          >
                            {num}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-4 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>
                    {/* <Dropdown
                      buttonContent={1}
                      options={["1", "2", "3", "4", "5"]}
                      selectedOption={"1"}
                      onSelect={(s)=>{}}
                    ></Dropdown> */}
                    <ButtonLink
                      small
                      btnClassName="text-sm border-none"
                      className="group-hover:bg-gray-200"
                    >
                      Edit
                    </ButtonLink>
                    <ButtonLink
                      small
                      btnClassName="text-sm border-none"
                      className="group-hover:bg-gray-200"
                    >
                      Save for later
                    </ButtonLink>
                    <ButtonLink
                      small
                      btnClassName="text-sm border-none"
                      className="group-hover:bg-gray-200"
                    >
                      Remove
                    </ButtonLink>
                  </>
                ) : (
                  <>
                    <ButtonLink
                      small
                      btnClassName="text-sm border-none"
                      className="group-hover:bg-gray-200"
                    >
                      Save for later
                    </ButtonLink>
                    <ButtonLink
                      small
                      btnClassName="text-sm border-none"
                      className="group-hover:bg-gray-200"
                    >
                      Remove
                    </ButtonLink>
                  </>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="flex items-end flex-col gap-2 mb-3 px-10">
              {item.discount && (
                <span className="bg-green-400 text-[11px] px-2 py-0.5 rounded-full">
                  {item.discount}
                </span>
              )}
              <span
                className={`font-medium ${item.discount && "text-green-700 "}`}
              >
                USD {item.price.toFixed(2)}
              </span>
              {item.originalPrice && (
                <span className="text-gray-500 line-through text-sm">
                  USD {item.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Shipping info */}
      {item.hasOptions && item.shipping && (
        <div className="mt-4 flex items-center">
          <div className="text-sm text-gray-700 flex items-center">
            <span>
              Shipping: USD {item.shipping.toFixed(2)} {item.shippingMethod}
            </span>
            <ChevronDown className="w-4 h-4 ml-1" />
          </div>
        </div>
      )}
    </div>
  );
};

const PaymentOption = ({
  id,
  name,
  logo,
  selected,
  onSelect,
}: {
  id: string;
  name: string;
  logo: React.ReactNode;
  selected: boolean;
  onSelect: (id: string) => void;
}) => {
  return (
    <div className="flex items-center mb-2">
      <div
        className={`size-7 rounded-full border flex items-center justify-center cursor-pointer ${
          selected ? "bg-gray-500" : "bg-white"
        }`}
        aria-label={name}
        onClick={() => onSelect(id)}
      >
        {selected && <div className="size-3 bg-white rounded-full"></div>}
      </div>
      <div className="ml-2 h-full">{logo}</div>
    </div>
  );
};

const paymentIcons = {
  visa: (
    <div className="space-x-2 h-full  flex items-center">
      <VisaIcon />
      <MastercardIcon />
    </div>
  ),
  paypal: (
    <div className="flex items-center">
      <PaypalIcon />
    </div>
  ),
  googlePay: (
    <div className="flex items-center">
      <GooglePayIcon />
    </div>
  ),
};

export default function CartPage() {
  const [selectedPayment, setSelectedPayment] = useState("visa");
  const [isGift, setIsGift] = useState(false);
  const shipTo = "Ethiopia";
  // Calculate totals
  const itemsTotal = cartItems.reduce(
    (sum, item) => sum + (item.originalPrice || item.price),
    0
  );
  const discount =
    cartItems.reduce(
      (sum, item) => sum + ((item.originalPrice || 0) - item.price),
      0
    ) * -1;
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const shipping = cartItems.reduce(
    (sum, item) => sum + (item.shipping || 0),
    0
  );
  const total = subtotal + shipping;

  const canCompletePayment = false;
  //   const canCompletePayment = cartItems.some((item) => !item.hasOptions);

  return (
    <div className="max-wsm mx-auto px-4 py-8">
      <h1 className="text-2xl font-medium mb-6">Your cart</h1>

      {/* Purchase protection */}
      <div className="flex items-start gap-3 mb-6 py-4 bg-white rounded-md">
        <div className="flex-shrink-0 mt-1">
          <LuHeartHandshake size={40} className="fill-[#d7e6f5]" />
        </div>
        <div>
          <p className="font-light">
            <span className="font-medium">Buy confidently</span> with Etsy&apos;s
            Purchase Protection program for buyers, get a full refund in the
            rare case your item doesn&apos;t arrive, arrives damaged, or isn&apos;t as
            described.{" "}
            <Link href="/purchase-protection" className="underline!">
              See eligibility
            </Link>
          </p>
        </div>
      </div>

      {/* Cart items */}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 flex flex-col gap-8">
          {cartItems.map((item) => (
            <CartItemCard key={item.id} item={item} />
          ))}

          {/* Carbon offset message */}
          <div className="flex items-center gap-2 mt-6 text-sm">
            <FaLeaf size={16} />
            <span>Etsy offsets carbon emissions from every delivery</span>
          </div>
        </div>

        {/* Order summary */}
        <div className="lg:w-1/3">
          <div
            className={clsx(
              "border border-gray-200 rounded-md p-6",
              !canCompletePayment && "opacity-70 pointer-events-none"
            )}
          >
            <h2 className="text-lg font-medium mb-4">How you&apos;ll pay</h2>

            {/* Payment methods */}
            <div className="mb-6">
              <PaymentOption
                id="visa"
                name="Visa"
                logo={paymentIcons.visa}
                selected={selectedPayment === "visa"}
                onSelect={setSelectedPayment}
              />
              <PaymentOption
                id="paypal"
                name="PayPal"
                logo={paymentIcons.paypal}
                selected={selectedPayment === "paypal"}
                onSelect={setSelectedPayment}
              />
              <PaymentOption
                id="googlePay"
                name="Google Pay"
                logo={paymentIcons.googlePay}
                selected={selectedPayment === "googlePay"}
                onSelect={setSelectedPayment}
              />
            </div>

            {/* Order totals */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Item(s) total</span>
                <span>USD {itemsTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shop discount</span>
                <span>-USD {discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>USD {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <div>
                  <span className="text-gray-600">Shipping</span>
                  <div className="text-xs text-gray-500">
                    (To <span className="underline">{shipTo}</span>)
                  </div>
                </div>
                <span>USD {shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-200 font-medium">
                <span>Total ({cartItems.length} items)</span>
                <span>USD {total.toFixed(2)}</span>
              </div>
            </div>

            {/* Gift option */}
            <div className="flex items-center mb-6">
              <div
                className={`w-5 h-5 border ${
                  isGift ? "bg-white" : "bg-white"
                } rounded flex items-center justify-center cursor-pointer`}
                onClick={() => setIsGift(!isGift)}
              >
                {isGift && <div className="w-3 h-3 bg-black rounded-sm"></div>}
              </div>
              <label
                className="ml-2 text-sm cursor-pointer"
                onClick={() => setIsGift(!isGift)}
              >
                Mark order as a gift
              </label>
              <Link
                href="/gift-info"
                className="ml-4 text-sm decoration-dashed! underline-offset-3 underline!"
              >
                Learn more
              </Link>
            </div>

            <div className="flex flex-col gap-4 pb-5">
              {/* Checkout button */}
              <ButtonLink
                btnClassName={`w-full pointer-events-auto ${
                  !canCompletePayment && "cursor-not-allowed"
                }`}
                className="bg-gray-500 hover:bg-gray-600"
              >
                Proceed to checkout
              </ButtonLink>
              {/* Apply coupon */}
              <span>
                <ButtonLink
                  btnClassName={clsx("border-none", "text-black", "gap-5")}
                  className={clsx("bg-gray-200")}
                >
                  <AiFillTag className="text-green-800 size-6" />
                  <span className="text-sm font-medium">Apply coupon code</span>
                </ButtonLink>
              </span>
            </div>

            {/* Tax info */}
            <div className="text-sm text-gray-600">
              <p>Local taxes included (where applicable)</p>
              <p className="mt-2">
                *{" "}
                <Link href="/tax-info" className="underline">
                  Learn more
                </Link>{" "}
                about additional taxes, duties, and fees that may apply
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
