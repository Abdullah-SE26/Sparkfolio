"use client";

import * as React from "react";
import * as RadixToast from "@radix-ui/react-toast";
import { X } from "lucide-react"; // optional close icon

// Export these types for your toast hook to use
export type ToastActionElement = React.ReactNode;
export type ToastProps = React.ComponentPropsWithoutRef<typeof RadixToast.Root> & {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

export const ToastProvider = RadixToast.Provider;

export const ToastViewport = () => (
  <RadixToast.Viewport
    className="fixed bottom-0 right-0 flex flex-col p-4 gap-2 w-[320px] max-w-full z-[9999]"
  />
);

export function Toast({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadixToast.Root>) {
  return (
    <RadixToast.Root
      {...props}
      className={`bg-white dark:bg-gray-800 rounded-md shadow-md p-4 grid grid-cols-[1fr_auto] gap-4 ${className}`}
    >
      {children}
    </RadixToast.Root>
  );
}

export function ToastTitle({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadixToast.Title>) {
  return (
    <RadixToast.Title
      {...props}
      className={`text-sm font-semibold text-gray-900 dark:text-gray-100 ${className}`}
    />
  );
}

export function ToastDescription({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadixToast.Description>) {
  return (
    <RadixToast.Description
      {...props}
      className={`text-sm text-gray-700 dark:text-gray-300 ${className}`}
    />
  );
}

export function ToastClose({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadixToast.Close>) {
  return (
    <RadixToast.Close
      {...props}
      className={`text-gray-500 hover:text-gray-900 dark:hover:text-white ${className}`}
      aria-label="Close"
    >
      <X />
    </RadixToast.Close>
  );
}
