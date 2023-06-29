import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AddressCard } from "../constants";

type AddressCardProps = {
  details: AddressCard;
};

const AddressCard = ({ details }: AddressCardProps) => {
  const { address: fullAddress, name, phoneNumber: phone, id } = details;

  const [city, setCity] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    if (fullAddress) {
      const addressParts = fullAddress?.split(",");

      const houseAddressPart = addressParts.slice(0, -2);
      const cityPart = addressParts.slice(-2);

      setAddress(houseAddressPart.join(",").trim());
      setCity(cityPart.join(",").trim());
    }
  }, [fullAddress]);

  return (
    <div className="flex h-24 w-full flex-col rounded-lg border-2 p-3">
      <Link to={`/address/${id}`}>
        <div className="flex w-full items-center gap-1">
          <p className="min-w-[5rem] truncate font-semibold">
            {name || <Skeleton />}
          </p>
          <p>|</p>
          <p className="min-w-[5rem] truncate text-right text-gray-500">
            {phone || <Skeleton />}
          </p>
        </div>
        <p className="w-full truncate text-sm text-gray-500 md:text-base lg:w-1/2">
          {address || <Skeleton count={1} />}
        </p>

        <p className="w-1/2 truncate text-sm text-gray-500 md:text-base lg:w-1/4">
          {city || <Skeleton count={1} />}
        </p>
      </Link>
    </div>
  );
};

export default AddressCard;
