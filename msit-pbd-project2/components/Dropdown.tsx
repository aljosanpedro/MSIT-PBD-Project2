"use client";

import type { ReactNode } from "react";
import { useState } from "react";

type DropdownProps = {
  label: string;
  children: ReactNode;
};

export default function Dropdown({ label, children }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-md">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="flex w-full cursor-pointer items-center justify-between rounded-lg bg-[#315b46] px-4 py-3 text-left text-white transition-transform duration-100 active:translate-y-0.5"
      >
        <span>{label}</span>
        <span
          aria-hidden="true"
          className={`h-3 w-3 rotate-45 border-b-2 border-r-2 border-white transition-transform duration-200 ${
            isOpen ? "translate-y-1 -rotate-[135deg]" : "-translate-y-1"
          }`}
        />
      </button>
      <div
        className={`grid overflow-hidden rounded-b-lg bg-[#b9c99b] transition-[grid-template-rows,opacity] duration-300 ease-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100"
            : "pointer-events-none grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">{children}</div>
      </div>
    </div>
  );
}
