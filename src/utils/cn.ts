/**
 * A utility function for merging Tailwind CSS classes.
 * 
 * This function combines clsx and tailwind-merge to:
 * 1. Accept multiple class names, including conditional ones (via clsx)
 * 2. Properly merge Tailwind CSS classes, resolving conflicts (via tailwind-merge)
 * 
 * @param inputs - Array of class names, which can be strings, undefined, null, or boolean
 * @returns A string of merged and deduped Tailwind CSS classes
 */
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: (string | undefined | null | boolean)[]) {
  return twMerge(clsx(inputs));
}
