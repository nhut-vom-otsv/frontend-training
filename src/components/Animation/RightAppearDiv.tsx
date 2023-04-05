import React from "react";
import { motion } from "framer-motion";

type RightAppearDivType = {
  children: React.ReactElement[] | React.ReactElement;
  className?: string;
  loop?: boolean;
};

const rightAppearDivVariants = {
  initial: {
    opacity: 0,
    x: 100,
    transition: { duration: 0.4 },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 2, staggerChildren: 0.1 },
  },
  onScreen: {
    opacity: 1,
    x: 0,
    transition: { duration: 2, staggerChildren: 0.1 },
  },
};

const RightAppearDiv = ({
  children,
  className,
  loop = false,
}: RightAppearDivType): React.ReactElement => {
  return (
    <motion.div
      className={className}
      variants={rightAppearDivVariants}
      initial="initial"
      animate={loop ? "" : "visible"}
      whileInView={loop ? "onScreen" : ""}
    >
      {children}
    </motion.div>
  );
};

export default RightAppearDiv;
