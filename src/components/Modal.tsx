import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import PortalWrapper from "./PortalWrapper";

type ModalType = {
  open: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
  title?: string;
  children: React.ReactElement | React.ReactElement[];
};

const Modal = ({ open, onClose, onSubmit, title, children }: ModalType) => {
  const [visibility, setVisibility] = useState<boolean>(open);
  const modalVariants = {
    hidden: {
      y: "100vh",
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
      },
    },
  };

  const handleSubmit = () => {
    setVisibility(false);
    onSubmit?.();
    onClose?.();
  };
  const handleClose = () => {
    setVisibility(false);
    onClose?.();
  };

  useEffect(() => {
    if (open) setVisibility(true);
  }, [open]);

  return (
    <PortalWrapper>
      <AnimatePresence>
        {visibility && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <motion.div
              className="mx-3 rounded-lg bg-white p-6 shadow-lg"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <h2 className="mb-4 text-lg font-medium">{title}</h2>
              <div className="mb-4 max-h-[30rem] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-full">
                {children}
              </div>
              <div className="flex justify-end">
                {onClose && (
                  <button
                    className="mr-2 rounded-md bg-gray-200 px-4 py-2 text-gray-800"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                )}
                <button
                  className="rounded-md bg-black px-4 py-2 text-white"
                  onClick={handleSubmit}
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PortalWrapper>
  );
};

export default Modal;
