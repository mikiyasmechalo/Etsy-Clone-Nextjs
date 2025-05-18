"use client";

import React, { useState, useEffect } from "react";
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
import useCart from "@/hooks/useCart";
import { CartItem } from "@/data/types";
import { getImageUrl } from "@/utils/image";

const updateCartItem = async (
  productId: number,
  quantity: number
): Promise<{ success: boolean; message?: string }> => {
  console.log(
    `Mock API: Updating product ${productId} quantity to ${quantity}`
  );

  await new Promise((resolve) => setTimeout(resolve, 300));

  return { success: true, message: "Cart item updated successfully (mock)." };
};

const deleteCartItem = async (
  productId: number
): Promise<{ success: boolean; message?: string }> => {
  console.log(`Mock API: Deleting product ${productId}`);

  await new Promise((resolve) => setTimeout(resolve, 300));

  return { success: true, message: "Cart item deleted successfully (mock)." };
};

const CartItemCard = ({
  item,
  onUpdateQuantity,
  onDelete,
}: {
  item: CartItem;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onDelete: (productId: number) => void;
}) => {
  const [quantity, setQuantity] = useState(item.cart_quantity);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setQuantity(item.cart_quantity);
  }, [item.cart_quantity]);

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    if (newQuantity > item.product_stock) {
      alert(`Cannot add more than available stock (${item.product_stock})`);
      return;
    }

    setIsUpdating(true);

    const result = await updateCartItem(item.product_id, newQuantity);
    setIsUpdating(false);

    if (result.success) {
      setQuantity(newQuantity);
      onUpdateQuantity(item.product_id, newQuantity);
    } else {
      alert(`Failed to update quantity: ${result.message}`);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    const result = await deleteCartItem(item.product_id);
    setIsDeleting(false);

    if (result.success) {
      onDelete(item.product_id);
    } else {
      alert(`Failed to delete item: ${result.message}`);
    }
  };

  return (
    <div className="p-6 rounded-2xl border border-gray-200">
      <div className="flex items-start gap-4">
        <div className="w-24 h-24 flex-shrink-0 relative">
          <Image
            src={getImageUrl(item.product_image_url) || "/placeholder.svg"}
            alt={item.product_name}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-md"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-normal mb-2 line-clamp-2">
            {item.product_name}
          </h3>

          <div className="text-sm text-gray-700 mb-2">
            Seller: [Seller Name]
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative">
              <select
                value={quantity}
                onChange={(e) => handleQuantityChange(Number(e.target.value))}
                className="appearance-none cursor-pointer bg-white border border-gray-300 rounded-md py-1 pl-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                disabled={isUpdating || isDeleting}
              >
                {[
                  ...Array(item.product_stock > 5 ? 5 : item.product_stock),
                ].map((_, index) => (
                  <option
                    key={index + 1}
                    value={index + 1}
                    className="cursor-pointer"
                  >
                    {index + 1}
                  </option>
                ))}
                {item.product_stock > 5 && (
                  <option value={item.product_stock}>
                    {item.product_stock} (Max)
                  </option>
                )}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
            <ButtonLink
              small
              btnClassName="text-sm border-none"
              className="group-hover:bg-gray-200"
              onClick={handleDelete}
              disabled={isUpdating || isDeleting}
            >
              {isDeleting ? "Removing..." : "Remove"}
            </ButtonLink>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 px-4">
          <span className="font-medium">
            USD {(parseFloat(item.price) * quantity).toFixed(2)}
          </span>
          <span className="text-gray-600 text-sm">
            (USD {parseFloat(item.price).toFixed(2)} each)
          </span>
        </div>
      </div>

      {/* <div className="mt-4 flex items-center">
        <div className="text-sm text-gray-700 flex items-center">
          <span>
            Shipping: [Shipping Cost] (Standard)
          </span>
          <ChevronDown className="w-4 h-4 ml-1" />
        </div>
      </div> */}
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
  const {
    cartItems,
    cartItemsAmount,
    isLoadingCart,
    error,
    fetchCart,
    addItemToCart,
  } = useCart();

  const [selectedPayment, setSelectedPayment] = useState("visa");
  const [isGift, setIsGift] = useState(false);
  const shipTo = "Ethiopia";

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    //   setCartItems((prevItems) =>
    //     prevItems.map((item) =>
    //       item.product_id === productId
    //         ? { ...item, cart_quantity: newQuantity }
    //         : item
    //     )
    //   );
  };

  const handleDeleteItem = (productId: number) => {
    //   setCartItems((prevItems) =>
    //     prevItems.filter((item) => item.product_id !== productId)
    //   );
  };

  const itemsTotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.cart_quantity,
    0
  );

  const subtotal = itemsTotal;

  const shipping = 0;

  const total = subtotal + shipping;

  const canCompletePayment = cartItems.length > 0;

  return (
    <div className="max-w mx-auto px-4 py-8">
      <h1 className="text-2xl font-medium mb-6">Your cart</h1>
      <div className="flex items-start gap-3 mb-6 py-4 bg-white rounded-md">
        <div className="flex-shrink-0 mt-1">
          <LuHeartHandshake size={40} className="fill-[#d7e6f5]" />
        </div>
        <div>
          <p className="font-light">
            <span className="font-medium">Buy confidently</span> with
            Etsy&apos;s Purchase Protection program for buyers, get a full
            refund in the rare case your item doesn&apos;t arrive, arrives
            damaged, or isn&apos;t as described.
            <Link href="/purchase-protection" className="underline!">
              See eligibility
            </Link>
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 flex flex-col gap-8">
          {cartItems.map((item) => (
            <CartItemCard
              key={item.product_id}
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
              onDelete={handleDeleteItem}
            />
          ))}

          <div className="flex items-center gap-2 mt-6 text-sm">
            <FaLeaf size={16} />
            <span>Etsy offsets carbon emissions from every delivery</span>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div
            className={clsx(
              "border border-gray-200 rounded-md p-6",
              !canCompletePayment && "opacity-70 pointer-events-none"
            )}
          >
            <h2 className="text-lg font-medium mb-4">How you&apos;ll pay</h2>

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

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Item(s) total</span>
                <span>USD {itemsTotal.toFixed(2)}</span>
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
              <ButtonLink
                btnClassName={`w-full pointer-events-auto ${
                  !canCompletePayment && "cursor-not-allowed"
                }`}
                className="bg-gray-500 hover:bg-gray-600"
                disabled={!canCompletePayment}
              >
                Proceed to checkout
              </ButtonLink>

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
