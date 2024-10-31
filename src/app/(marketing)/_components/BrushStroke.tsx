"use client";

import Image from "next/image";
import React from "react";
import stroke from "/public/stroke.svg";

const BrushText = ({ text = "Ease", className = "" }) => {
  return (
    <div className="relative inline-block">
      <Image
        src={stroke}
        alt="brush paint image"
        className="absolute top-0 left-0 w-full h-full -z-10"
      />
      <p className={`relative -z-10 ${className}`}>{text}</p>
      <style jsx>{`
        @keyframes draw {
          0% {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        .animate-draw {
          animation: draw 1s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default BrushText;
