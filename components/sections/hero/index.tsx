import Box from "@/components/ui/Box";
import React from "react";

const HeroSection = () => {
  return (
    <div className="h-[100svh] w-full flex items-center justify-center">
      {/* Main */}
      <div className="h-[700px] shrink-0 items-center min-w-[1200px] w-[1200px] flex flex-row justify-between relative">
        <AnimatedConnectionsSVG />
        <LeftBoxes />
        <MiddleCircle />
        <RightBoxes />
      </div>
    </div>
  );
};

export default HeroSection;

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
      {/* First Paths */}
      <g className="text-muted" fill="none" stroke="currentColor">
        {firstPaths.map((path, index) => {
          const seconds = getAnimationDelay(index);

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
                dur="2s"
                fill="freeze"
                calcMode="spline"
                keySplines="0, -1.59, 1, 3.67"
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
      <g className="text-muted" fill="none" stroke="currentColor">
        {secondPaths.map((path, index) => {
          const seconds = getAnimationDelay(index);

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
                dur="2s"
                fill="freeze"
                calcMode="spline"
                keySplines="0, -1.59, 1, 3.67"
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
                offsetPath: `path("${path} h 180")`,
                animationDelay: `${getAnimationDelay(index)}s`,
              }}
              className="cross-chain"
              cx="0"
              cy="0"
              r="100"
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
                offsetPath: `path("${path} h 180")`,
                animationDelay: `${getAnimationDelay(index, 2.6)}s`,
              }}
              className="cross-chain"
              cx="0"
              cy="0"
              r="100"
              fill="url(#white-grad)"
            />
          </g>
        );
      })}
    </svg>
  );
};

const MiddleCircle = () => {
  return (
    <div className="h-54 w-54 bg-transparent rounded-full border-4 border-white relative">
      {/* Connections Div */}
      <div className="absolute left-[100%] translate-x-2 items-center flex flex-col justify-evenly top-1/2 -translate-y-1/2 w-3 bg-[#212121] rounded h-[54px]">
        <div className="h-1.5 w-1.5 bg-white/15 rounded-full"></div>
        <div className="h-1.5 w-1.5 bg-white/15 rounded-full"></div>
        <div className="h-1.5 w-1.5 bg-white/15 rounded-full"></div>
        <div className="h-1.5 w-1.5 bg-white/15 rounded-full"></div>
        <div className="h-1.5 w-1.5 bg-white/15 rounded-full"></div>
      </div>
      <div className="absolute right-[100%] -translate-x-2 items-center flex flex-col justify-evenly top-1/2 -translate-y-1/2 w-3 bg-[#212121] rounded h-[54px]">
        <div className="h-1.5 w-1.5 bg-white/15 rounded-full"></div>
        <div className="h-1.5 w-1.5 bg-white/15 rounded-full"></div>
        <div className="h-1.5 w-1.5 bg-white/15 rounded-full"></div>
        <div className="h-1.5 w-1.5 bg-white/15 rounded-full"></div>
        <div className="h-1.5 w-1.5 bg-white/15 rounded-full"></div>
      </div>
    </div>
  );
};

const RightBoxes = () => {
  return (
    <div className="flex h-full flex-col justify-evenly">
      <Box text="Wallet 1" connectionPosition="left">
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
      <Box text="Wallet 2" connectionPosition="left">
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
      <Box text="Wallet 3" connectionPosition="left">
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
      <Box text="Wallet 4" connectionPosition="left">
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
      <Box borderColor="border-orange-500/10" bgColor="bg-orange-500">
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
      <Box bgColor="bg-[#627EEA]" borderColor="border-[#627EEA]/10">
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
      <Box bgColor="bg-[#EF0027]" borderColor="border-[#EF0027]/10">
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
      <Box bgColor="bg-[#BFBBBB]" borderColor="border-[#BFBBBB]/10">
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
