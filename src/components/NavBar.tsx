import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import Modal from "./Modal";
import SmallButton from "./SmallButton";
import { NavSideMenu } from "./Animation/NavSideMenu";
import HamburgerButton from "./Animation/HamburgerButton";
import { LogoTransparent } from "../assets/images";
import { navList } from "../constants/data";
import { AuthContext } from "../context/AuthContext";
import { useNavigatePage } from "../hooks/useNavigatePage";
import { getLocalStorageValue } from "../utils/LocalStorage";
import { getUserInfo } from "../services/auth.api";
import { useMenuAnimation } from "../hooks/useMenuAnimation";
import DecodeEmailFromJWT from "../utils/DecodeJWT";

const NavBar = (): React.ReactElement => {
  const [openUserBox, setOpenUserBox] = useState<boolean>(false);
  const [sticky, setSticky] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openMobileNav, setOpenMobileNav] = useState<boolean>(false);

  const { authState, removeUserData } = useContext(AuthContext);

  const { redirect } = useNavigatePage();
  const scope = useMenuAnimation(openMobileNav);

  const navRef = useRef<HTMLDivElement>(null);
  const navMobileMenuRef = useRef<HTMLUListElement>(null);
  const navHamburgerButtonRef = useRef<HTMLDivElement>(null);

  const avatarVariants = useMemo(() => {
    return {
      initial: {
        opacity: 0,
        y: -20,
      },
      visible: {
        opacity: 1,
        y: 0,
      },
    };
  }, []);

  const avatarMenuVariants = useMemo(() => {
    return {
      open: {
        clipPath: "inset(0% 0% 0% 0%)",
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 24,
          bounce: 0,
          duration: 0.7,
          delayChildren: 0.3,
          staggerChildren: 0.05,
        },
      },
      closed: {
        clipPath: "inset(0% 0% 100% 100%)",
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 24,
          bounce: 0,
          duration: 0.3,
        },
      },
    };
  }, []);

  const itemVariants = useMemo(() => {
    return {
      open: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 },
      },
      closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
    };
  }, []);

  const isLogin = useMemo(() => {
    return !!Object.keys(getLocalStorageValue({ key: "key" })).length;
  }, [authState]);

  const { userInfo, isLoading } = getUserInfo({
    email: getLocalStorageValue({ key: "key" }).email
      ? getLocalStorageValue({ key: "key" }).email
      : DecodeEmailFromJWT(getLocalStorageValue({ key: "key" })?.accessToken),
  });

  const handleScroll = () => {
    const navPositions = navRef.current?.getBoundingClientRect().top;
    const scrollPositions = window.scrollY;
    if (navPositions !== undefined)
      navPositions < scrollPositions ? setSticky(true) : setSticky(false);
  };

  const handleSubmitModal = () => {
    setOpenModal(false);
    handleLogout();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    removeUserData();
    localStorage.removeItem("key");
    window.location.reload();
  };

  const handleLogout = () => {
    removeUserData();
    localStorage.removeItem("key");
    redirect("/login");
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  useEffect(() => {
    if (isLoading || !isLogin) return;

    if (!userInfo) {
      setOpenModal(true);
    }
  }, [isLoading]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navHamburgerButtonRef.current &&
        navHamburgerButtonRef.current.contains(event.target as Node)
      )
        return;

      if (
        navMobileMenuRef.current &&
        !navMobileMenuRef.current.contains(event.target as Node)
      ) {
        setOpenMobileNav(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpenMobileNav]);

  return (
    <div
      ref={navRef}
      className={`${
        sticky ? "fixed" : "relative"
      } z-50 flex w-full justify-center bg-white pb-2 shadow-sm`}
    >
      <Modal
        open={openModal}
        title="Warning"
        onSubmit={handleSubmitModal}
        onClose={handleCloseModal}
      >
        <p>Session expired, please login again!</p>
      </Modal>

      <div ref={scope}>
        <NavSideMenu ref={navMobileMenuRef} />
      </div>

      <nav className="mt-3 flex w-[90%] items-center justify-between md:mx-auto">
        {/* Login for big screen and hamburger button */}
        <div className="flex items-center justify-center">
          <div className="md:hidden" ref={navHamburgerButtonRef}>
            <HamburgerButton
              onClick={() => {
                setOpenMobileNav(!openMobileNav);
              }}
              open={openMobileNav}
            />
          </div>

          <Link to="/">
            <img
              src={LogoTransparent}
              alt="logo"
              className="hidden h-10 invert md:block"
            />
          </Link>
        </div>

        {/* Logo for mobile screen */}
        <Link to="/">
          <img
            src={LogoTransparent}
            alt="logo"
            className="h-10 invert md:hidden"
          />
        </Link>

        {/* Nav items */}
        <div className="z-30 hidden w-full items-center justify-center px-5 md:static md:flex md:min-h-fit md:w-auto md:bg-white">
          <ul className="flex items-center gap-8 md:flex-row md:gap-[4vw]">
            {navList.map((item: string, index: number) => (
              <motion.li
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                key={index}
                className="text-xl no-underline first-letter:capitalize hover:text-slate-700 hover:underline"
              >
                <Link to={`/${item}`}>{item}</Link>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Avatar and User Dialog */}
        <div className="flex items-center gap-6">
          {isLogin ? (
            <>
              {!isLoading && (
                <motion.div className="relative">
                  {userInfo ? (
                    <motion.img
                      variants={avatarVariants}
                      initial="initial"
                      animate="visible"
                      src={userInfo?.picture}
                      alt="user-avatar"
                      className="object-fit aspect-square h-8 rounded-full border border-purple-500 shadow-lg"
                      onClick={() => setOpenUserBox(!openUserBox)}
                    />
                  ) : (
                    <div className="aspect-square h-8 rounded-full border border-purple-500 bg-gray-300 shadow-lg" />
                  )}

                  <motion.div
                    className="absolute right-3 -bottom-12 z-50 min-w-max rounded-md border-2 bg-white shadow-2xl"
                    variants={avatarMenuVariants}
                    initial="closed"
                    animate={openUserBox ? "open" : "closed"}
                    style={{ pointerEvents: openUserBox ? "auto" : "none" }}
                  >
                    <motion.div
                      className="w-full cursor-pointer rounded-md py-2 px-5 text-gray-900 hover:bg-gray-100"
                      variants={itemVariants}
                      onClick={handleLogout}
                    >
                      <p>Log out</p>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </>
          ) : (
            <SmallButton name="sign in" onClick={() => redirect("/login")} />
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
