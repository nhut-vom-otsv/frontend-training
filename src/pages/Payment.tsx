import { times } from "lodash";
import { useEffect, useState } from "react";
import { useNavigatePage } from "../hooks";
import SmallButton from "../components/SmallButton";
import PaymentCard from "../components/PaymentCard";
import { PaymentType, getPaymentList } from "../services";
import { useCycle } from "framer-motion";

const NUMBER_OF_SKELETONS = 5;

const emptyCreditCard = {
  id: "",
  cardNumber: "",
  cardOwner: "",
  cvc: "",
  expiry: "",
};

const Payment = () => {
  const [paymentList, setPaymentList] = useState<PaymentType[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isRemove, setIsRemove] = useCycle(false, true);

  const { redirect } = useNavigatePage();

  const fetchPaymentList = async () => {
    setLoading(true);
    const data = await getPaymentList();

    setLoading(false);
    setPaymentList(data);
  };

  useEffect(() => {
    fetchPaymentList();
  }, [isRemove]);

  const renderPaymentList = () => {
    if (isLoading)
      return times(NUMBER_OF_SKELETONS, (index) => (
        <PaymentCard key={index} details={emptyCreditCard} />
      ));

    return paymentList.map((address) => (
      <PaymentCard details={address} key={address.id} trigger={setIsRemove} />
    ));
  };
  return (
    <div className="mx-auto my-5 w-4/5">
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold">Manage your cards</p>
        <SmallButton content="Add" onClick={() => redirect("/payment/add")} />
      </div>
      <hr className="my-2 h-px border-0 bg-gray-200" />
      <div className="mx-auto mt-5 grid w-auto grid-cols-1 justify-items-center gap-x-5 gap-y-10 md:w-4/5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-fluid">
        {renderPaymentList()}
      </div>
    </div>
  );
};

export default Payment;
