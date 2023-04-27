import { motion } from "framer-motion";
import React, { useState } from "react";

type HamburgerButtonType = {
  open: boolean;
  onClick?: () => void;
};

const HamburgerButton = ({ onClick, open }: HamburgerButtonType) => {
  const handleClick = () => {
    onClick?.();
  };

  return (
    <button
      className="z-50 flex items-center justify-center rounded-md p-2 focus:outline-none"
      onClick={handleClick}
    >
      <motion.div animate={open ? "open" : "closed"}>
        <svg viewBox="0 0 23 23" className="h-5 w-5">
          <motion.path
            fill="transparent"
            strokeWidth="3"
            stroke="hsl(0, 0%, 18%)"
            strokeLinecap="round"
            variants={{
              closed: { d: "M 2 2.5 L 20 2.5" },
              open: { d: "M 3 16.5 L 17 2.5" },
            }}
          />
          <motion.path
            fill="transparent"
            strokeWidth="3"
            stroke="hsl(0, 0%, 18%)"
            strokeLinecap="round"
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 },
            }}
            transition={{ duration: 0.1 }}
            d="M 2 9.423 L 20 9.423"
          />
          <motion.path
            fill="transparent"
            strokeWidth="3"
            stroke="hsl(0, 0%, 18%)"
            strokeLinecap="round"
            variants={{
              closed: { d: "M 2 16.346 L 20 16.346" },
              open: { d: "M 3 2.5 L 17 16.346" },
            }}
          />
        </svg>
      </motion.div>
    </button>
  );
};

export default HamburgerButton;
