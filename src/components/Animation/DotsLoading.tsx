import { motion } from "framer-motion";
import React from "react";

const ContainerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const DotVariants = {
  initial: {
    y: "0%",
  },
  animate: {
    y: "100%",
  },
};

const DotTransition = {
  duration: 0.5,
  yoyo: Infinity,
  ease: "easeInOut",
};

export default function DotsLoading() {
  return (
    <motion.div
      variants={ContainerVariants}
      initial="initial"
      animate="animate"
      className="flex h-5 w-20 justify-around"
    >
      <motion.span
        variants={DotVariants}
        transition={DotTransition}
        className="block h-5 w-5 rounded-full bg-black"
      />
      <motion.span
        variants={DotVariants}
        transition={DotTransition}
        className="block h-5 w-5 rounded-full bg-black"
      />
      <motion.span
        variants={DotVariants}
        transition={DotTransition}
        className="block h-5 w-5 rounded-full bg-black"
      />
    </motion.div>
  );
}
