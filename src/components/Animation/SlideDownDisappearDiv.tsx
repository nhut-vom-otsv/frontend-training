import React from "react";
import { AnimatePresence, motion } from "framer-motion";

type SlideDownDisappearDivType = {
  children: React.ReactElement[] | React.ReactElement;
  className?: string;
};

const childVariants = {
  initial: { y: 0, opacity: 1 },
  exit: { y: 50, opacity: 0, transition: { duration: 0.3 } },
};

const SlideDownDisappearDiv = ({
  children,
  className,
}: SlideDownDisappearDivType): React.ReactElement => {
  return (
    <motion.div
      className={className}
      variants={childVariants}
      initial="initial"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};

export default SlideDownDisappearDiv;
