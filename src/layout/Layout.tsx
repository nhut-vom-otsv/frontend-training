import React, { ReactElement } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import MailSubscription from "../components/MailSubscription";
import NavBar from "../components/NavBar";
import CartButton from "../components/Cart/CartButton";
import ValidateLoginModal from "../components/ValidateLoginModal";
import { notDisplayCartButton } from "../constants";

type ChildrenType = {
  children: React.ReactElement | React.ReactElement[] | undefined;
};

const Layout = ({ children }: ChildrenType): ReactElement => {
  const location = useLocation();
  const isNotDisplayCartButton = notDisplayCartButton.includes(
    location.pathname
  );

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <ValidateLoginModal />
      <NavBar />
      {/* children component of layout here */}
      <main className="min-h-[20vh]">{children}</main>
      {!isNotDisplayCartButton && <CartButton />}
      <MailSubscription />
      <Footer />
    </div>
  );
};

export default Layout;
