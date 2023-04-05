import React from "react";
import { motion } from "framer-motion";

type OpacityMotionDivType = {
  children: React.ReactElement[] | React.ReactElement;
  className?: string;
  loop?: boolean;
};

const opacityDivVariants = {
  initial: {
    opacity: 0,
    transition: { duration: 0.4 },
  },
  visible: {
    opacity: 1,
    transition: { duration: 1, staggerChildren: 0.1 },
  },
  onScreen: {
    opacity: 1,
    transition: { duration: 1, staggerChildren: 0.1 },
  },
};

const OpacityMotionDiv = ({
  children,
  className,
  loop = false,
}: OpacityMotionDivType): React.ReactElement => {
  return (
    <motion.div
      className={className}
      variants={opacityDivVariants}
      initial="initial"
      animate={loop ? "" : "visible"}
      whileInView={loop ? "onScreen" : ""}
      layout
    >
      {children}
    </motion.div>
  );
};

export default OpacityMotionDiv;
