import { cn } from "@/lib/utils";
import React from "react";

interface BoxProps {
  className?: string;
  bgColor?: string;
  borderColor?: string;
  height?: number;
  width?: number;
  children?: React.ReactNode;
  connectionPosition?: "left" | "right";
  text?: string;
}

const Box = ({
  className,
  bgColor,
  borderColor,
  height = 80,
  width = 80,
  connectionPosition = "right",
  children,
  text,
}: BoxProps) => {
  return (
    <div
      style={{ height: `${height}px`, width: `${width}px` }}
      className={cn(
        bgColor ? bgColor : "bg-white",
        "rounded-lg shrink-0 relative",
        className
      )}
    >
      {/* Connections Div */}
      <div
        className={cn(
          connectionPosition === "right"
            ? "left-[100%] translate-x-1/3"
            : "right-[100%] -translate-x-1/3",
          "absolute items-center flex flex-col justify-evenly top-1/2 -translate-y-1/2 h-2/3 w-3 bg-[#212121] rounded"
        )}
      >
        <div className="h-1.5 w-1.5 bg-white/15 rounded-full"></div>
        <div className="h-1.5 w-1.5 bg-white/15 rounded-full"></div>
        <div className="h-1.5 w-1.5 bg-white/15 rounded-full"></div>
        <div className="h-1.5 w-1.5 bg-white/15 rounded-full"></div>
        <div className="h-1.5 w-1.5 bg-white/15 rounded-full"></div>
      </div>
      {/* Logo Div */}
      <div
        className={cn(
          borderColor ? borderColor : "border-white/10",
          "bg-background flex items-center gap-2 justify-center flex-col p-2 h-full w-full rounded-2xl border"
        )}
      >
        {children}
        {text && <p className="text-xs text-white font-semibold font-mono">{text}</p>}
      </div>
    </div>
  );
};

export default Box;
