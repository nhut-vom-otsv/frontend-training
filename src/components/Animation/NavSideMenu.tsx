import { FiClipboard, FiHeart, FiShoppingCart } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import React from "react";
import { navList } from "../../constants/data";

export const NavSideMenu = React.forwardRef<HTMLUListElement>((props, ref) => {
  const navIcons = [<FiShoppingCart />, <FiHeart />, <FiClipboard />];

  return (
    <nav
      className={`absolute top-[100%] z-50 my-5 rounded-xl border bg-gray-100 shadow-xl md:hidden`}
    >
      <ul className="flex flex-col gap-10 p-5" ref={ref}>
        {navList.map((item: string, index: number) => (
          <motion.li
            key={index}
            className="flex flex-col items-center gap-3 text-xl no-underline first-letter:capitalize"
          >
            <Link to={`/${item}`}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{
                  scale: [0.8, 1.2],
                  background: "gray",
                  transition: { duration: 0.5 },
                }}
                className="rounded-full bg-white p-2 shadow-lg"
              >
                {navIcons[index]}
              </motion.div>
            </Link>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
});
