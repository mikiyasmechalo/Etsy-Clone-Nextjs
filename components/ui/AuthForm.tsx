"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";
import ButtonLink from "./ButtonLink";

interface AuthFormProps {
  type: "signin" | "register";
}

export default function AuthForm({ type }: AuthFormProps) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [staySignedIn, setStaySignedIn] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === "signin") {
      console.log("Signing in:", { email, password, staySignedIn });
    } else {
      console.log("Registering:", { firstName, email, password, staySignedIn });
    }
  };

  const headerText =
    type === "signin" ? "Sign in to continue" : "Create Your Account";
  const buttonText = type === "signin" ? "Sign in" : "Register";

  return (
    <div className="max-w-md mx-auto py-8 px-4">
      <h1 className="text-2xl font-medium ">{headerText}</h1>
      {type === "register" && (
        <p className="text-gray-600 text-sm">Registration is easy.</p>
      )}

      <form onSubmit={handleSubmit} className="mt-6">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
            required
          />
        </div>

        {type === "register" && (
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
            required
          />
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div
              className={`w-5 h-5 border ${
                staySignedIn ? "bg-black border-black" : "border-gray-500"
              } rounded flex items-center justify-center cursor-pointer`}
              onClick={() => setStaySignedIn(!staySignedIn)}
            >
              {staySignedIn && <Check className="w-4 h-4 text-white" />}
            </div>
            <label
              htmlFor="stay-signed-in"
              className="ml-2 text-sm cursor-pointer"
              onClick={() => setStaySignedIn(!staySignedIn)}
            >
              Stay signed in
            </label>
          </div>

          {type === "signin" && (
            <Link
              href="/forgot-password"
              className="text-xsm text-gray-700 underline! font-light underline-offset-2"
            >
              Forgot your password?
            </Link>
          )}
        </div>
        {type === "register" && (
          <p className="text-sm text-gray-700 mb-4">
            By clicking {buttonText}, Continue with Google, Facebook, or Apple,
            you agree to Etsy's{" "}
            <Link href="/terms" className="text-[#4d6bc6] underline!">
              Terms of Use
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-[#4d6bc6] underline!">
              Privacy Policy
            </Link>
            .
          </p>
        )}

        <ButtonLink type="submit" btnClassName="w-full">
          {buttonText}
        </ButtonLink>
      </form>

      {/* Trouble Signing In Link (common to both, or could be specific to signin) */}
      {type === "signin" && (
        <div className="mt-4 text-center">
          <Link
            href="/trouble-signing-in"
            className="text-xsm text-gray-700 underline! font-light underline-offset-2"
          >
            Trouble signing in?
          </Link>
        </div>
      )}

      {/* OR Divider (common to both) */}
      <div className="flex items-center my-6">
        <div className="flex-grow h-px bg-gray-300"></div>
        <span className="px-4 text-sm text-gray-500">OR</span>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>

      {/* Social Sign-in Buttons (common to both) */}
      <div className="space-y-3">
        <ButtonLink btnClassName="w-full gap-3 border-gray-300" outline>
          <FcGoogle size={24} />
          Continue with Google
        </ButtonLink>

        <ButtonLink btnClassName="w-full gap-3 border-gray-300" outline>
          <FaFacebook fill="#1877F2" size={24} />
          Continue with Facebook
        </ButtonLink>

        <ButtonLink btnClassName="w-full gap-3 border-gray-300" outline>
          <FaApple size={24} />
          Continue with Apple
        </ButtonLink>
      </div>

      {/* Terms and Privacy Text (common to both) */}
      <div className="mt-6 text-sm text-gray-700">
        {type === "signin" && (
          <p>
            By clicking {buttonText}, Continue with Google, Facebook, or Apple,
            you agree to Etsy's{" "}
            <Link href="/terms" className="text-black hover:underline">
              Terms of Use
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-black hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        )}
        <p className="mt-2">
          Etsy may send you communications; you may change your preferences in
          your account settings. We'll never post without your permission.
        </p>
      </div>
    </div>
  );
}
