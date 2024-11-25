import { Input } from "@/components/ui/input";
import React from "react";

export default function SearchBar() {
  return (
    <Input
      type="text"
      placeholder="Search Ctrl + K"
      className="bg-[#1F9E7F] border-0 placeholder:text-white text-white min-w-80"
    />
  );
}
