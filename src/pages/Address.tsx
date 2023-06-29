import { times } from "lodash";
import { useEffect, useState } from "react";
import { useNavigatePage } from "../hooks";
import SmallButton from "../components/SmallButton";
import AddressCard from "../components/AddressCard";
import { AddressType, getAddresses } from "../services";

const NUMBER_OF_SKELETONS = 5;

const Address = () => {
  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const { redirect } = useNavigatePage();

  const fetchAddresses = async () => {
    setLoading(true);
    const data = await getAddresses();

    setLoading(false);
    setAddresses(data);
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const renderAddressList = () => {
    if (isLoading)
      return times(NUMBER_OF_SKELETONS, (index) => (
        <AddressCard key={index} details={{}} />
      ));

    return addresses.map((address) => (
      <AddressCard details={address} key={address.id} />
    ));
  };

  return (
    <div className="mx-auto my-5 w-4/5">
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold">Manage your addresses</p>
        <SmallButton content="Add" onClick={() => redirect("/address/add")} />
      </div>
      <hr className="my-2 h-px border-0 bg-gray-200" />
      <div className="mx-auto flex min-h-[20rem] flex-col items-center gap-4 md:w-4/5">
        {renderAddressList()}
      </div>
    </div>
  );
};

export default Address;
