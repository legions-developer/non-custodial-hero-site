"use client";

import { motion } from "framer-motion";
import Box from "@/components/ui/Box";
import React, { useState } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { cn } from "@/lib/utils";
import Particles from "@/components/ui/particles";

const headerOptions = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Docs",
    href: "/docs",
  },
  {
    label: "Blog",
    href: "/blog",
  },
];

const easeBezier = [0.175, 0.885, 0.32, 1.1];

const heroSectionMotionConfig = {
  initial: { opacity: 0, scale: 0, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  transition: { duration: 1, ease: easeBezier },
};

const titleSectionMotionConfig = {
  initial: { opacity: 0, scale: 0.8, y: 40 },
  animate: { opacity: 1, scale: 1, y: 0 },
  transition: { duration: 1.5, ease: easeBezier },
};

const HeroSection = () => {
  return (
    <AuroraBackground>
      <div className="h-[100svh] w-full flex items-center justify-center overflow-hidden relative">
        {/* Header */}
        <Header />
        {/* Particles */}
        <Particles
          className="pointer-events-none absolute inset-0 z-20 opacity-50"
          quantity={100}
          ease={80}
          color="#ffffff"
          refresh
        />
        {/* Main */}
        <div className="h-[700px] shrink-0 items-center min-w-[1200px] w-[1200px] flex flex-row justify-between relative get-skewed scale-110">
          <AnimatedConnectionsSVG />
          <LeftBoxes />
          <MiddleCircle />
          <RightBoxes />
        </div>
      </div>
      {/* Bottom Title and description */}
      <div className="absolute bottom-4 justify-center items-center left-0 right-0 p-4 gap-3 flex flex-col text-center">
        <div className="flex flex-row items-center gap-4">
          <motion.div
            {...heroSectionMotionConfig}
            className="iceberg text-xl bg-gradient-to-r from-gray-500 to-white text-transparent bg-clip-text"
          >
            L E G I O N
          </motion.div>
          <motion.div
            {...heroSectionMotionConfig}
            className="h-1 w-1 bg-white/80 rounded-full"
          ></motion.div>
          <motion.div
            {...heroSectionMotionConfig}
            transition={{
              duration: 1,
              delay: 0.4,
              ease: easeBezier,
            }}
            className="bg-gradient-to-br from-emerald-500 via-emerald-400 to-emerald-500 px-2 py-1 rounded text-xs font-semibold text-black"
          >
            A Non-Custodial Option Protocol
          </motion.div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-5xl flex flex-row items-center gap-2">
            <motion.div
              {...titleSectionMotionConfig}
              transition={{
                ...titleSectionMotionConfig.transition,
                delay: 0.2,
              }}
            >
              Web3
            </motion.div>
            <motion.div
              {...titleSectionMotionConfig}
              transition={{
                ...titleSectionMotionConfig.transition,
                delay: 0.4,
              }}
            >
              Native
            </motion.div>
          </h1>
          <h2 className="text-5xl flex flex-row items-center gap-2">
            <motion.div
              {...titleSectionMotionConfig}
              transition={{
                ...titleSectionMotionConfig.transition,
                delay: 0.6,
              }}
            >
              Decentralized
            </motion.div>
            <motion.div
              {...titleSectionMotionConfig}
              transition={{
                ...titleSectionMotionConfig.transition,
                delay: 0.8,
              }}
            >
              Platform
            </motion.div>
          </h2>
          <div className="text-muted-foreground text-sm max-w-[500px] px-4">
            <motion.div
              {...titleSectionMotionConfig}
              transition={{
                ...titleSectionMotionConfig.transition,
                delay: 1,
              }}
            >
              Building the next generation of decentralized applications powered
              by
            </motion.div>
            <motion.div
              {...titleSectionMotionConfig}
              transition={{
                ...titleSectionMotionConfig.transition,
                delay: 1.2,
              }}
            >
              blockchain technology and trustless infrastructure.
            </motion.div>
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
};

export default HeroSection;

const Header = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    headerOptions[0].label
  );
  const [dimensions, setDimensions] = useState({ width: 0, left: 0 });
  const navRefs = React.useRef<{ [key: string]: HTMLParagraphElement }>({});

  React.useEffect(() => {
    if (selectedOption && navRefs.current[selectedOption]) {
      const element = navRefs.current[selectedOption];
      const { width, left } = element.getBoundingClientRect();
      const parentLeft =
        element.parentElement?.getBoundingClientRect().left || 0;
      setDimensions({ width, left: left - parentLeft });
    }
  }, [selectedOption]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -100 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="h-[60px] px-1.5 absolute top-8 bg-white/[0.02] border border-white/[0.02] rounded-xl backdrop-blur-3xl flex items-center gap-8 z-50 overflow-hidden"
    >
      <div className="h-12 w-12 shrink-0 rounded-lg bg-background flex items-center justify-center">
        <span className="text-white font-mono text-xl font-bold">L</span>
      </div>
      <div className="flex flex-row items-start gap-8 relative">
        {headerOptions.map((option) => (
          <p
            ref={(el) => {
              if (el) navRefs.current[option.label] = el;
            }}
            key={option.label}
            className={cn(
              "font-mono font-medium text-xs cursor-pointer duration-200 hover:text-white pt-2 pb-1",
              selectedOption === option.label
                ? "text-white"
                : "text-muted-foreground"
            )}
            onClick={() => setSelectedOption(option.label)}
          >
            {option.label}
          </p>
        ))}
        <motion.div
          className="absolute -bottom-[16px] h-[2px] bg-gradient-to-r from-[#22262E] via-white/70 to-[#22262E] rounded-full shadow-[0_0_20px_1px_rgba(255,255,255,1)]"
          initial={false}
          animate={{
            width: dimensions.width,
            left: dimensions.left,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />
      </div>
      <div className="flex flex-row items-start gap-4">
        <button className="cursor-pointer h-12 shrink-0 rounded-xl hover:contrast-125 duration-200 pl-4 pr-3 bg-gradient-to-br from-emerald-700 to-emerald-400 flex items-center justify-center border border-emerald-700 shadow-[inset_0px_0px_4px_rgba(0,0,0,0.4)]">
          <span className="text-white font-bold font-mono text-xs">
            Launch App
          </span>
          <span className="ml-1">
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            >
              <path d="M5.75 12.25 10.25 8l-4.5-4.25" />
            </svg>
          </span>
        </button>
      </div>
    </motion.div>
  );
};

const firstPaths = [
  // Bitcoin Paths
  "M 95 96 c 340 -10, 40 245, 375 234",
  "M 95 106 c 330 -10, 30 245, 375 234",
  "M 95 116 c 320 -10, 20 245, 375 234",
  "M 95 126 c 310 -10, 10 245, 375 234",
  "M 95 136 c 300 -10, 0 245, 375 234",
  // Ethereum Paths
  "M 95 252 c 200 -10, 50 80, 375 78",
  "M 95 262 c 190 -10, 50 80, 375 78",
  "M 95 272 c 180 -10, 50 80, 375 78",
  "M 95 282 c 170 -10, 50 80, 375 78",
  "M 95 292 c 160 -10, 50 80, 375 78",
  // TRX Paths
  "M 95 448 c 200 10, 50 -80, 375 -78",
  "M 95 438 c 190 10, 50 -80, 375 -78",
  "M 95 428 c 180 10, 50 -80, 375 -78",
  "M 95 418 c 170 10, 50 -80, 375 -78",
  "M 95 408 c 160 10, 50 -80, 375 -78",
  // Litecoin Paths
  "M 95 604 c 340 10, 50 -245, 375 -234",
  "M 95 594 c 330 10, 40 -245, 375 -234",
  "M 95 584 c 320 10, 30 -245, 375 -234",
  "M 95 574 c 310 10, 22 -245, 375 -234",
  "M 95 564 c 300 10, 10 -245, 375 -234",
];

const secondPaths = [
  // 1st Box
  "M 730 330 c 300 10, 0 -245, 375 -234",
  "M 730 340 c 310 10, 10 -245, 375 -234",
  "M 730 350 c 320 10, 20 -245, 375 -234",
  "M 730 360 c 330 10, 30 -245, 375 -234",
  "M 730 370 c 340 10, 40 -245, 375 -234",
  // 2nd Box
  "M 730 330 c 260 0, 150 -80, 375 -78",
  "M 730 340 c 270 0, 155 -80, 375 -78",
  "M 730 350 c 280 0, 160 -80, 375 -78",
  "M 730 360 c 290 0, 165 -80, 375 -78",
  "M 730 370 c 300 0, 170 -80, 375 -78",
  // 3rd Box
  "M 730 370 c 300 20, 140 80, 375 78",
  "M 730 360 c 290 15, 150 80, 375 78",
  "M 730 350 c 280 10, 160 80, 375 78",
  "M 730 340 c 270 5, 170 80, 375 78",
  "M 730 330 c 260 0, 180 80, 375 78",
  // 4th Box
  "M 730 370 c 300 10, 0 245, 375 234",
  "M 730 360 c 310 10, 10 245, 375 234",
  "M 730 350 c 320 10, 20 245, 375 234",
  "M 730 340 c 330 10, 30 245, 375 234",
  "M 730 330 c 340 10, 40 245, 375 234",
];

const AnimatedConnectionsSVG = () => {
  const getAnimationDelay = (index: number, extraDelay: number = 0) => {
    // First 5 paths (Bitcoin, index 0-4)
    if (index < 5) {
      return index * 0.2 + extraDelay;
    }
    // Second 5 paths (Ethereum, index 5-9)
    if (index >= 5 && index < 10) {
      return (index - 5) * 0.2 + extraDelay;
    }
    // Third 5 paths (TRX, index 10-14)
    if (index >= 10 && index < 15) {
      return (index - 10) * 0.2 + extraDelay;
    }
    // Last 5 paths (Litecoin, index 15-19)
    if (index >= 15) {
      return (index - 15) * 0.2 + extraDelay;
    }

    // Remaining paths get default delay
    return index * 0.1 + extraDelay;
  };

  return (
    <svg className="h-full w-full absolute top-0 left-0" viewBox="0 0 1200 700">
      {/* Radial Gradient */}
      <defs>
        <mask id="white-mask">
          <ellipse
            cx="600"
            cy="350"
            rx="1000"
            ry="800"
            fill="url(#white-grad)"
          />
        </mask>
        <radialGradient id="white-grad" fx="0.5">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      {/* Background Grid */}
      <g mask="url(#white-mask)" className="text-muted" fill="none">
        {/* Vertical Lines */}
        {Array.from({ length: 24 }).map((_, i) => {
          const spacing = 54;

          return (
            <line
              key={`v-${i}`}
              x1={i * spacing}
              y1="0"
              x2={i * spacing}
              y2="700"
              stroke="white"
              strokeOpacity={i % 4 === 0 ? 0.04 : 0.01}
            />
          );
        })}
        {/* Horizontal Lines */}
        {Array.from({ length: 24 }).map((_, i) => {
          const spacing = 54;

          return (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * spacing}
              x2="1200"
              y2={i * spacing}
              stroke="white"
              strokeOpacity={i % 4 === 0 ? 0.04 : 0.01}
            />
          );
        })}
      </g>
      {/* First Paths */}
      <g className="text-muted/40" fill="none" stroke="currentColor">
        {firstPaths.map((path, index) => {
          const seconds = getAnimationDelay(index, 0.8);

          return (
            <path
              key={index}
              d={path}
              fill="none"
              strokeDasharray="100 100"
              pathLength="100"
              strokeOpacity="0"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="100"
                to="0"
                dur="0.5s"
                fill="freeze"
                calcMode="spline"
                keySplines="0, 0, 0.2, 1"
                keyTimes="0; 1"
                begin={`${seconds}s`}
              />
              <animate
                attributeName="stroke-opacity"
                dur="0.2s"
                from="0"
                to="1"
                fill="freeze"
                begin={`${seconds}s`}
              />
            </path>
          );
        })}
      </g>
      {/* Second Paths */}
      <g className="text-muted/40" fill="none" stroke="currentColor">
        {secondPaths.map((path, index) => {
          const seconds = getAnimationDelay(index, 1.5);

          return (
            <path
              key={index}
              d={path}
              fill="none"
              strokeDasharray="1000 1000"
              pathLength="1000"
              strokeOpacity="0"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="1000"
                to="0"
                dur="0.5s"
                fill="freeze"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0, 0, 0.2, 1"
                begin={`${seconds}s`}
              />
              <animate
                attributeName="stroke-opacity"
                dur="0.2s"
                from="0"
                to="1"
                fill="freeze"
                begin={`${seconds}s`}
              />
            </path>
          );
        })}
      </g>

      <defs>
        <radialGradient id="white-grad" fx="0.5">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        {firstPaths.map((path, index) => {
          return (
            <mask key={index} id={`first-mask-${index}`}>
              <path d={path} stroke="white" fill="none" />
            </mask>
          );
        })}
        {secondPaths.map((path, index) => {
          return (
            <mask key={index} id={`second-mask-${index}`}>
              <path d={path} stroke="white" fill="none" />
            </mask>
          );
        })}
      </defs>
      {firstPaths.map((path, index) => {
        return (
          <g key={index} mask={`url(#first-mask-${index})`}>
            <circle
              style={{
                offsetPath: `path("${path} h 350")`,
                animationDelay: `${getAnimationDelay(index, 1)}s`,
              }}
              className="cross-chain"
              cx="0"
              cy="0"
              r="200"
              fill="url(#white-grad)"
            />
          </g>
        );
      })}
      {secondPaths.map((path, index) => {
        return (
          <g key={index} mask={`url(#second-mask-${index})`}>
            <circle
              style={{
                offsetPath: `path("${path} h 350")`,
                animationDelay: `${getAnimationDelay(index, 3.1)}s`,
              }}
              className="cross-chain"
              cx="0"
              cy="0"
              r="200"
              fill="url(#white-grad)"
            />
          </g>
        );
      })}
    </svg>
  );
};

const middleCircleTextMotionProps = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

const MiddleCircle = () => {
  return (
    <div className="relative">
      {/* Middle circle text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xl font-medium">
        <div className="flex flex-col items-center">
          <div className="flex flex-row">
            <motion.div
              {...middleCircleTextMotionProps}
              transition={{
                duration: 0.4,
                delay: 2.2,
              }}
            >
              Cross
            </motion.div>
            <motion.div
              {...middleCircleTextMotionProps}
              transition={{
                duration: 0.4,
                delay: 2.4,
              }}
            >
              -
            </motion.div>
            <motion.div
              {...middleCircleTextMotionProps}
              transition={{
                duration: 0.4,
                delay: 2.6,
              }}
            >
              Chain
            </motion.div>
          </div>
          <div className="flex flex-row gap-1.5">
            <motion.div
              {...middleCircleTextMotionProps}
              transition={{
                duration: 0.4,
                delay: 2.8,
              }}
            >
              Gateway
            </motion.div>
            <motion.div
              {...middleCircleTextMotionProps}
              transition={{
                duration: 0.4,
                delay: 3,
              }}
            >
              Protocol
            </motion.div>
          </div>
        </div>
      </div>
      {/* Connections Div */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.4,
          delay: 0.6,
        }}
        className="absolute right-[100%] -translate-x-2 items-center flex flex-col justify-evenly top-1/2 -translate-y-1/2 w-3 bg-[#212121] rounded h-[54px]"
      >
        <div className="h-1.5 w-1.5 bg-white/15 rounded-full"></div>
        <div className="h-1.5 w-1.5 bg-white/15 rounded-full"></div>
        <div className="h-1.5 w-1.5 bg-white/15 rounded-full"></div>
        <div className="h-1.5 w-1.5 bg-white/15 rounded-full"></div>
        <div className="h-1.5 w-1.5 bg-white/15 rounded-full"></div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.4,
          delay: 1.2,
        }}
        className="absolute left-[100%] translate-x-2 items-center flex flex-col justify-evenly top-1/2 -translate-y-1/2 w-3 bg-[#212121] rounded h-[54px]"
      >
        <div className="h-1.5 w-1.5 bg-white/15 rounded-full"></div>
        <div className="h-1.5 w-1.5 bg-white/15 rounded-full"></div>
        <div className="h-1.5 w-1.5 bg-white/15 rounded-full"></div>
        <div className="h-1.5 w-1.5 bg-white/15 rounded-full"></div>
        <div className="h-1.5 w-1.5 bg-white/15 rounded-full"></div>
      </motion.div>

      <svg className="h-54 w-54" viewBox="0 0 104 104" overflow="visible">
        {/* White Path Shadow */}
        <circle
          className="blur-[4px]"
          cx="52"
          cy="52"
          r="50"
          fill="none"
          stroke="white"
          strokeWidth="2"
          opacity="0.6"
          strokeLinecap="round"
          pathLength="100"
          strokeDasharray="100 100"
          strokeDashoffset="100"
          strokeOpacity="0"
          transform="rotate(-90)"
          style={{ transformOrigin: "center" }}
        >
          <animate
            attributeName="stroke-dashoffset"
            from="100"
            to="25"
            dur="2s"
            fill="freeze"
            keySplines="0,0.95,1,1"
            calcMode="spline"
            keyTimes="0; 1"
            begin="1.2s"
          />
          <animate
            attributeName="stroke-opacity"
            from="0"
            to="1"
            dur="0.2s"
            fill="freeze"
            begin="1.2s"
          />
        </circle>
        {/* White Path */}
        <circle
          cx="52"
          cy="52"
          r="50"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          pathLength="100"
          strokeDasharray="100 100"
          strokeDashoffset="100"
          strokeOpacity="0"
          transform="rotate(-90)"
          style={{ transformOrigin: "center" }}
        >
          <animate
            attributeName="stroke-dashoffset"
            from="100"
            to="26.5"
            dur="2s"
            fill="freeze"
            keySplines="0,0.95,1,1"
            calcMode="spline"
            keyTimes="0; 1"
            begin="1.2s"
          />
          <animate
            attributeName="stroke-opacity"
            from="0"
            to="1"
            dur="0.2s"
            fill="freeze"
            begin="1.2s"
          />
        </circle>
        {/* Green Path Shadow */}
        <circle
          className="blur-[4px]"
          cx="52"
          cy="52"
          r="50"
          fill="none"
          stroke="#00BC7E"
          strokeWidth="2"
          opacity="0.6"
          strokeLinecap="round"
          pathLength="100"
          strokeDasharray="100 100"
          strokeDashoffset="100"
          strokeOpacity="0"
          transform="rotate(-180)"
          style={{ transformOrigin: "center" }}
        >
          <animate
            attributeName="stroke-dashoffset"
            from="100"
            to="76.5"
            dur="1.5s"
            fill="freeze"
            keySplines="0,0.95,1,1"
            calcMode="spline"
            keyTimes="0; 1"
            begin="2.6s"
          />
          <animate
            attributeName="stroke-opacity"
            from="0"
            to="1"
            dur="0.2s"
            fill="freeze"
            begin="2.6s"
          />
        </circle>
        {/* Green Path */}
        <circle
          cx="52"
          cy="52"
          r="50"
          fill="none"
          stroke="#00BC7E"
          strokeWidth="2"
          strokeLinecap="round"
          pathLength="100"
          strokeDasharray="100 100"
          strokeDashoffset="100"
          strokeOpacity="0"
          transform="rotate(-180)"
          style={{ transformOrigin: "center" }}
        >
          <animate
            attributeName="stroke-dashoffset"
            from="100"
            to="76.5"
            dur="1.5s"
            fill="freeze"
            keySplines="0,0.95,1,1"
            calcMode="spline"
            keyTimes="0; 1"
            begin="2.6s"
          />
          <animate
            attributeName="stroke-opacity"
            from="0"
            to="1"
            dur="0.2s"
            fill="freeze"
            begin="2.6s"
          />
        </circle>
        {/* Dashed middle circle */}
        <circle
          mask="url(#dashed-mask)"
          cx="52"
          cy="52"
          r="45"
          strokeWidth="1"
          fill="none"
          stroke="white"
          strokeDasharray="10 5 5 2 2 5 5 10"
          strokeDashoffset="100"
          className="animate-spin"
          style={{ transformOrigin: "center", animationDuration: "16s" }}
          opacity="0"
        >
          <animate
            attributeName="opacity"
            from="0"
            to="1"
            dur="0.5s"
            fill="freeze"
            begin="2s"
          />
        </circle>
        {/* back grid */}
        <g mask="url(#grid-mask)" opacity="0">
          <animate
            attributeName="opacity"
            from="0"
            to="1"
            dur="0.5s"
            fill="freeze"
            begin="3.2s"
          />
          {/* Vertical lines */}
          {Array.from({ length: 11 }).map((_, i) => {
            const spacing = 10;
            const delay = 4 + i * 0.1;

            return (
              <line
                key={`v-${i}`}
                x1={2 + i * spacing}
                y1="0"
                x2={2 + i * spacing}
                y2="104"
                stroke="white"
                strokeWidth="0.5"
                opacity="0.08"
                strokeLinecap="round"
                strokeDasharray="100 100"
                strokeDashoffset="100"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="100"
                  to="0"
                  dur="1s"
                  fill="freeze"
                  calcMode="spline"
                  keySplines="0,0.95,1,1"
                  keyTimes="0; 1"
                  begin={`${delay}s`}
                />
              </line>
            );
          })}
          {/* Horizontal lines */}
          {Array.from({ length: 11 }).map((_, i) => {
            const spacing = 10;
            const delay = 4 + i * 0.1;

            return (
              <line
                key={`h-${i}`}
                x1="0"
                y1={2 + i * spacing}
                x2="104"
                y2={2 + i * spacing}
                stroke="white"
                strokeWidth="0.5"
                opacity="0.08"
                strokeLinecap="round"
                strokeDasharray="100 100"
                strokeDashoffset="100"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="100"
                  to="0"
                  dur="1s"
                  fill="freeze"
                  calcMode="spline"
                  keySplines="0,0.95,1,1"
                  keyTimes="0; 1"
                  begin={`${delay}s`}
                />
              </line>
            );
          })}
        </g>

        {/* Animated stroke that reveals the dashed circle */}
        <defs>
          <mask id="grid-mask">
            <circle cx="52" cy="52" r="50" fill="white" stroke="none" />
          </mask>
          <mask id="dashed-mask">
            <circle
              cx="52"
              cy="52"
              r="45"
              stroke="white"
              strokeWidth="1"
              fill="none"
              strokeDasharray="283"
              strokeDashoffset="283"
              strokeLinecap="round"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="283"
                to="0"
                dur="2s"
                fill="freeze"
                calcMode="spline"
                keySplines="0,0.95,1,1"
                keyTimes="0; 1"
                begin="3.2s"
              />
            </circle>
          </mask>
        </defs>
      </svg>
    </div>
  );
};

const RightBoxes = () => {
  return (
    <div className="flex h-full flex-col justify-evenly">
      <Box
        text="Wallet 1"
        connectionPosition="left"
        animation={{
          delay: 1.5,
        }}
      >
        <svg
          className="h-6 w-6"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#fff"
            opacity="0.7"
            d="M14.5 4H2.38a1 1 0 0 1-1.19-.982v-.019L14 2.5V1.31q.008-.063.008-.138A1.18 1.18 0 0 0 12.684.001L1.31 1.85A2 2 0 0 0 0 3.727v10.772a1.5 1.5 0 0 0 1.5 1.5h13a1.5 1.5 0 0 0 1.5-1.5v-9.01l.001-.041a1.45 1.45 0 0 0-1.45-1.45l-.053.001zM13 11a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 13 11"
          />
        </svg>
      </Box>
      <Box
        text="Wallet 2"
        connectionPosition="left"
        animation={{
          delay: 1.6,
        }}
      >
        <svg
          className="h-6 w-6"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#fff"
            opacity="0.7"
            d="M14.5 4H2.38a1 1 0 0 1-1.19-.982v-.019L14 2.5V1.31q.008-.063.008-.138A1.18 1.18 0 0 0 12.684.001L1.31 1.85A2 2 0 0 0 0 3.727v10.772a1.5 1.5 0 0 0 1.5 1.5h13a1.5 1.5 0 0 0 1.5-1.5v-9.01l.001-.041a1.45 1.45 0 0 0-1.45-1.45l-.053.001zM13 11a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 13 11"
          />
        </svg>
      </Box>
      <Box
        text="Wallet 3"
        connectionPosition="left"
        animation={{
          delay: 1.7,
        }}
      >
        <svg
          className="h-6 w-6"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#fff"
            opacity="0.7"
            d="M14.5 4H2.38a1 1 0 0 1-1.19-.982v-.019L14 2.5V1.31q.008-.063.008-.138A1.18 1.18 0 0 0 12.684.001L1.31 1.85A2 2 0 0 0 0 3.727v10.772a1.5 1.5 0 0 0 1.5 1.5h13a1.5 1.5 0 0 0 1.5-1.5v-9.01l.001-.041a1.45 1.45 0 0 0-1.45-1.45l-.053.001zM13 11a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 13 11"
          />
        </svg>
      </Box>
      <Box
        text="Wallet 4"
        connectionPosition="left"
        animation={{
          delay: 1.8,
        }}
      >
        <svg
          className="h-6 w-6"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#fff"
            opacity="0.7"
            d="M14.5 4H2.38a1 1 0 0 1-1.19-.982v-.019L14 2.5V1.31q.008-.063.008-.138A1.18 1.18 0 0 0 12.684.001L1.31 1.85A2 2 0 0 0 0 3.727v10.772a1.5 1.5 0 0 0 1.5 1.5h13a1.5 1.5 0 0 0 1.5-1.5v-9.01l.001-.041a1.45 1.45 0 0 0-1.45-1.45l-.053.001zM13 11a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 13 11"
          />
        </svg>
      </Box>
    </div>
  );
};

const LeftBoxes = () => {
  return (
    <div className="flex h-full flex-col justify-evenly">
      <Box
        borderColor="border-orange-500/10"
        bgColor="bg-orange-500"
        animation={{
          delay: 0.1,
        }}
      >
        <svg
          className="h-11 w-11"
          viewBox="0 -0.5 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M33.254 16.13c0 8.907-7.221 16.128-16.128 16.128S.996 25.038.996 16.13C.997 7.221 8.218 0 17.125 0s16.129 7.221 16.129 16.13M21 10.136c2.244.77 3.885 1.924 3.563 4.07-.234 1.573-1.109 2.333-2.27 2.6 1.594.827 2.137 2.396 1.632 4.294-.959 2.73-3.238 2.96-6.269 2.39l-.736 2.935-1.777-.442.726-2.896q-.69-.171-1.416-.366l-.729 2.91-1.775-.441.735-2.942-3.579-.9.883-2.026s1.31.346 1.292.32c.503.124.727-.202.815-.42l1.994-7.967c.023-.376-.108-.85-.828-1.03.028-.019-1.29-.32-1.29-.32l.472-1.89 3.584.884.73-2.908 1.775.442-.714 2.85c.478.108.958.218 1.425.334l.708-2.832 1.777.441zm-4.251 4.851c1.21.321 3.844 1.02 4.303-.811.468-1.874-2.09-2.44-3.343-2.716q-.215-.048-.37-.085l-.884 3.536q.127.031.294.076m-1.371 5.693c1.45.382 4.62 1.217 5.124-.8.517-2.064-2.557-2.75-4.057-3.086q-.254-.055-.437-.1l-.976 3.896q.15.037.345.09"
            fill="#F7931A"
          />
        </svg>
      </Box>
      <Box
        bgColor="bg-[#627EEA]"
        borderColor="border-[#627EEA]/10"
        animation={{
          delay: 0.2,
        }}
      >
        <svg
          className="h-11 w-11"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fillRule="evenodd">
            <circle cx="16" cy="16" r="16" fill="#627EEA" />
            <g fill="#FFF" fillRule="nonzero">
              <path fillOpacity=".602" d="M16.498 4v8.87l7.497 3.35z" />
              <path d="M16.498 4 9 16.22l7.498-3.35z" />
              <path fillOpacity=".602" d="M16.498 21.968v6.027L24 17.616z" />
              <path d="M16.498 27.995v-6.028L9 17.616z" />
              <path
                fillOpacity=".2"
                d="m16.498 20.573 7.497-4.353-7.497-3.348z"
              />
              <path fillOpacity=".602" d="m9 16.22 7.498 4.353v-7.701z" />
            </g>
          </g>
        </svg>
      </Box>
      <Box
        bgColor="bg-[#EF0027]"
        borderColor="border-[#EF0027]/10"
        animation={{
          delay: 0.3,
        }}
      >
        <svg
          className="h-11 w-11"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none">
            <circle fill="#EF0027" cx="16" cy="16" r="16" />
            <path
              d="M21.932 9.913 7.5 7.257l7.595 19.112 10.583-12.894zm-.232 1.17 2.208 2.099-6.038 1.093zm-5.142 2.973-6.364-5.278 10.402 1.914zm-.453.934-1.038 8.58L9.472 9.487zm.96.455 6.687-1.21-7.67 9.343z"
              fill="#FFF"
            />
          </g>
        </svg>
      </Box>
      <Box
        bgColor="bg-[#BFBBBB]"
        borderColor="border-[#BFBBBB]/10"
        animation={{
          delay: 0.4,
        }}
      >
        <svg
          className="h-11 w-11"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fillRule="evenodd">
            <circle cx="16" cy="16" r="16" fill="#BFBBBB" />
            <path
              fill="#FFF"
              d="M10.427 19.214 9 19.768l.688-2.759 1.444-.58L13.213 8h5.129l-1.519 6.196 1.41-.571-.68 2.75-1.427.571-.848 3.483H23L22.127 24H9.252z"
            />
          </g>
        </svg>
      </Box>
    </div>
  );
};
