"use client";

import React, { SVGProps, useEffect, useState } from "react";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { cn } from "@/lib/utils";

interface ServerEvent {
  event: string;
  duration: number;
  time: string;
}

const eventData: ServerEvent[] = [
  {
    event: "event_1",
    time: "10 mins",
    duration: 3,
  },
  {
    event: "event_2",
    time: "1 hour",
    duration: 3,
  },
  {
    event: "event_3",
    time: "1 day",
    duration: 3,
  },
];

const AnimatedSchedifyComponent = () => {
  const [userServerEvents, setUserServerEvents] = useState<ServerEvent[]>([]);
  const [sentEvents, setSentEvents] = useState<ServerEvent[]>([]);
  const [schedifyServerEvents, setSchedifyServerEvents] = useState<
    ServerEvent[]
  >([]);
  const [receivedEvents, setReceivedEvents] = useState<ServerEvent[]>([]);

  function resetEvents() {
    setUserServerEvents([]);
    setSentEvents([]);
    setSchedifyServerEvents([]);
    setReceivedEvents([]);
  }

  useEffect(() => {
    // Setting default events in the user server - limit to 6 events to prevent memory leaks
    setUserServerEvents(eventData);

    const processSchedifyEvent = async (event: ServerEvent) => {
      // Remove from schedify and add to received events
      setSchedifyServerEvents((prev) =>
        prev.filter((e) => e.event !== event.event)
      );
      setReceivedEvents((prev) => [...prev, event]);

      // Wait 3 seconds for receiving animation
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Remove from received and add back to user server
      setReceivedEvents((prev) => prev.filter((e) => e.event !== event.event));
      setUserServerEvents((prev) => [...prev, event]);
    };

    const startEventLoop = async () => {
      while (true) {
        // Clear all states to start fresh
        resetEvents();
        setUserServerEvents(eventData);

        // Wait for a moment before starting the batch send
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Send all events with 0.8 second delay between each
        for (let i = 0; i < eventData.length; i++) {
          const event = eventData[i];
          setTimeout(() => {
            setUserServerEvents((prev) =>
              prev.filter((e) => e.event !== event.event)
            );
            setSentEvents((prev) => [...prev, event]);
          }, i * 600);
        }

        // Wait for all events to be sent (3 seconds animation + 0.5 second delay between each)
        await new Promise((resolve) =>
          setTimeout(resolve, eventData.length * 800 + 3000)
        );

        // Move all events to schedify with 0.8 second delay between each
        setSentEvents([]);

        for (let i = 0; i < eventData.length; i++) {
          const event = eventData[i];
          setTimeout(() => {
            setSchedifyServerEvents((prev) => [...prev, event]);
          }, i * 100);
        }

        // Process each event through schedify one by one
        for (const event of eventData) {
          // Wait for event duration
          await new Promise((resolve) =>
            setTimeout(resolve, event.duration * 1000)
          );
          await processSchedifyEvent(event);
        }

        // Wait a bit before starting the next cycle
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    };

    startEventLoop();

    // Cleanup function to prevent memory leaks
    return () => {
      resetEvents();
    };
  }, []);

  return (
    <div className="sm:h-92 w-[900px] flex flex-col sm:flex-row items-center sm:items-stretch">
      {/* User Server */}
      <div className="shrink-0 h-92 w-64 border rounded-lg flex flex-col relative z-30 bg-white">
        <div className="p-2 border-b text-sm font-medium flex flex-row items-center gap-2">
          <CloudServerIcon />
          <span>User Server</span>
        </div>
        <div className="h-full w-full overflow-hidden p-2 space-y-3 relative">
          <LayoutGroup>
            <AnimatePresence>
              {userServerEvents.map((event, index) => (
                <ServerRequestCard
                  key={`${event.event}-user`}
                  event={event}
                  type="user"
                  index={index}
                />
              ))}
            </AnimatePresence>
            <AnimatePresence>
              {userServerEvents.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.2,
                    delay: 0.2,
                  }}
                  key={`no-events`}
                  className="w-full h-full flex justify-center items-center absolute top-0 left-0"
                >
                  <div className="flex flex-col gap-2 items-center justify-center text-[10px] text-muted-foreground">
                    <div className="p-2 rounded-md bg-muted">
                      <StopwatchIcon />
                    </div>
                    <span>Sent All Events</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </LayoutGroup>
        </div>
      </div>
      {/* Sending / Received Events */}
      <div className="w-[164px] sm:w-full h-full relative flex flex-col justify-center items-center gap-40 sm:gap-52 z-20 rotate-90 sm:rotate-0">
        {/* Sent Events */}
        <div className="w-full flex flex-col items-center relative">
          <div className="left-0 absolute bg-border w-1 h-5 -translate-y-1/2 rounded-r z-30" />
          <div className="right-0 absolute bg-border w-1 h-5 -translate-y-1/2 rounded-l z-30" />
          <hr className="w-full border-dashed border-t border-gray-300" />
          {/* Animation */}
          <AnimatePresence>
            {sentEvents.map((event) => (
              <motion.div
                className="absolute -translate-y-1/2 z-20"
                key={`${event.event}-sent`}
                animate={{
                  left: ["0%", "100%"],
                }}
                transition={{
                  duration: 3,
                  ease: "linear",
                }}
              >
                <div className="px-2 py-1 border-dashed bg-white border rounded-md text-[10px]">
                  {event.event}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {/* Received Events */}
        <div className="w-full flex flex-col items-center relative">
          <div className="left-0 absolute bg-border w-1 h-5 -translate-y-1/2 rounded-r z-30" />
          <div className="right-0 absolute bg-border w-1 h-5 -translate-y-1/2 rounded-l z-30" />
          <hr className="w-full border-dashed border-t border-gray-300" />
          {/* Animation */}
          <AnimatePresence>
            {receivedEvents.map((event) => (
              <motion.div
                className="absolute -translate-y-1/2 z-20"
                key={`${event.event}-received`}
                animate={{
                  right: ["0%", "100%"],
                }}
                transition={{
                  duration: 3,
                  ease: "linear",
                }}
              >
                <div className="px-2 py-1 border-dashed bg-white border rounded-md text-[10px]">
                  {event.event}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      {/* Schedify Server */}
      <div className="shrink-0 h-92 w-64 border rounded-lg flex flex-col relative z-30 bg-white">
        <div className="p-2 border-b text-sm font-medium flex flex-row items-center gap-2">
          <CloudServerIcon />
          <span>Schedify Server</span>
        </div>
        <div className="h-full w-full overflow-hidden p-2 space-y-3 relative">
          <LayoutGroup>
            <AnimatePresence>
              {schedifyServerEvents.map((event, index) => (
                <ServerRequestCard
                  key={`${event.event}-schedify`}
                  event={event}
                  type="schedify"
                  index={index}
                />
              ))}
            </AnimatePresence>
            <AnimatePresence>
              {schedifyServerEvents.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key={`no-events`}
                  className="w-full h-full flex justify-center items-center absolute top-0 left-0"
                >
                  <div className="flex flex-col gap-2 items-center justify-center text-[10px] text-muted-foreground">
                    <div className="p-2 rounded-md bg-muted">
                      <StopwatchIcon />
                    </div>
                    <span>Receiving Events</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </LayoutGroup>
        </div>
      </div>
    </div>
  );
};

export default AnimatedSchedifyComponent;

/*===============================================
                    Components
===============================================*/

const ServerRequestCard = ({
  event,
  type,
  index,
}: {
  event: ServerEvent;
  type: "user" | "schedify";
  index: number;
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 1 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, x: type === "user" ? "80%" : "-80%" }}
      transition={{
        layout: {
          type: "spring",
          bounce: 0.2,
          duration: 0.2,
        },
        delay: index * 0.2,
      }}
      className={cn(
        "h-24 w-full rounded flex flex-col justify-between p-2 relative",
        type === "user" && "bg-rose-500/15",
        type === "schedify" && "bg-blue-500/15"
      )}
    >
      <div className="flex flex-row text-[10px] items-center justify-between">
        <div className="flex flex-row items-center gap-1">
          <div
            className={cn(
              "h-2 w-2 rounded-full",
              type === "user" && "bg-rose-500",
              type === "schedify" && "bg-blue-500"
            )}
          ></div>
          <span
            className={cn(
              "text-rose-500",
              type === "user" && "text-rose-500",
              type === "schedify" && "text-blue-500"
            )}
          >
            {event.event}
          </span>
        </div>
        <span className="text-muted-foreground">~ {event.time}</span>
      </div>
      <div className="text-[8px] overflow-hidden">
        <code
          className={cn("whitespace-pre", type === "schedify" && "blur-[1px]")}
        >
          {getEventCodeString(event.event)}
        </code>
      </div>
      {/* if event is schedify, show the icon */}
      {type === "schedify" && (
        <div className="absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 px-1.5 py-1 rounded-full shadow bg-[#ffffff] flex items-center justify-center">
          <div className="flex flex-row gap-1 items-center justify-center">
            <StopwatchIcon height={12} width={12} />
            <span className="text-muted-foreground text-[8px]">
              Waiting {event.time}
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

/*===============================================
                Helper Functions
===============================================*/

const getEventCodeString = (event: string) => {
  return `{
 "event": "${event}",
 "payload": "payload",
 "schedule_for": "2025-06-03T00:00:00Z", 
}`;
};

/*===============================================
                    Icons
===============================================*/
type CloudServerIconProps = SVGProps<SVGSVGElement> & {
  secondaryfill?: string;
  strokewidth?: number;
  title?: string;
};

const CloudServerIcon = ({
  title = "badge 13",
  ...props
}: CloudServerIconProps) => {
  return (
    <svg
      height="18"
      width="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>{title}</title>
      <g fill="#828282">
        <path
          d="M13.464 6.891C13.278 4.577 11.362 2.75 9 2.75C6.515 2.75 4.5 4.765 4.5 7.25C4.5 7.6 4.549 7.936 4.624 8.263C3.027 8.33 1.75 9.637 1.75 11.25C1.75 12.907 3.093 14.25 4.75 14.25H12.5C14.571 14.25 16.25 12.571 16.25 10.5C16.25 8.764 15.065 7.318 13.464 6.891Z"
          fill="#828282"
          fillOpacity="0.3"
          stroke="none"
        />
        <path
          d="M13.464 6.891C13.278 4.577 11.362 2.75 9 2.75C6.515 2.75 4.5 4.765 4.5 7.25C4.5 7.6 4.549 7.936 4.624 8.263C3.027 8.33 1.75 9.637 1.75 11.25C1.75 12.907 3.093 14.25 4.75 14.25H12.5C14.571 14.25 16.25 12.571 16.25 10.5C16.25 8.764 15.065 7.318 13.464 6.891Z"
          fill="none"
          stroke="#828282"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        />
        <path
          d="M9.705 8C10.392 7.233 11.389 6.75 12.5 6.75C12.833 6.75 13.157 6.809 13.464 6.891"
          fill="none"
          stroke="#828282"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        />
      </g>
    </svg>
  );
};

type StopWatchIconProps = SVGProps<SVGSVGElement> & {
  secondaryfill?: string;
  strokewidth?: number;
  title?: string;
  height?: number;
  width?: number;
};

function StopwatchIcon({
  title = "badge 13",
  height = 18,
  width = 18,
  ...props
}: StopWatchIconProps) {
  return (
    <svg
      height={height}
      width={width}
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>{title}</title>
      <g fill="#828282">
        <line
          fill="none"
          stroke="#828282"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          x1="6.75"
          x2="11.25"
          y1="1.25"
          y2="1.25"
        />
        <line
          fill="none"
          stroke="#828282"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          x1="9"
          x2="9"
          y1="1.25"
          y2="3.75"
        />
        <line
          fill="none"
          stroke="#828282"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          x1="6.702"
          x2="9"
          y1="7.702"
          y2="10"
        ></line>
        <line
          fill="none"
          stroke="#828282"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          x1="14.25"
          x2="16.25"
          y1="2.75"
          y2="4.75"
        />
        <circle
          cx="9"
          cy="10"
          fill="none"
          r="6.25"
          stroke="#828282"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        />
      </g>
    </svg>
  );
}
