import React from "react";
import { Link } from "react-router-dom";
import {
  footerContact,
  footerContents,
  FooterContentType,
} from "../constants/data";
import { LogoTransparent } from "../assets/images";

const Footer = (): React.ReactElement => {
  return (
    <div className=" relative mt-5 flex  w-full flex-col items-center justify-center rounded-t-xl bg-black md:h-60">
      <div className="my-10 flex w-2/3 flex-col items-center justify-center gap-y-3 text-white md:flex-row md:items-start md:justify-around md:gap-5">
        <div className=" flex w-44 flex-col items-center justify-center gap-1 md:items-start">
          <img
            src={LogoTransparent}
            alt="logo"
            className="object-fit mb-3 h-10"
          />
          {footerContact.map((info: string, index) => (
            <p className="text-[0.625rem] text-slate-300" key={index}>
              {info}
            </p>
          ))}
        </div>

        {footerContents.map((info: FooterContentType, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center gap-1 md:items-start"
          >
            <p className="text-lg font-semibold">{info.name}</p>
            {info.content.map((data: string, index) => (
              <Link
                key={index}
                to={`/${data}`}
                className="text-sm text-slate-300 first-letter:capitalize hover:text-white hover:underline"
              >
                {data}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <p className="absolute bottom-1  w-full text-center text-sm font-semibold text-white">
        Fake Store Copyright 2023. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
