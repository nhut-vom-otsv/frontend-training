import PaymentForm from "../components/PaymentForm";

const AddPayment = () => {
  return (
    <div className="mx-auto my-5 w-4/5">
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold">Add new card</p>
      </div>
      <hr className="my-2 h-px border-0 bg-gray-200" />
      <div className="mx-auto flex min-h-[20rem] flex-col items-center gap-4 md:w-4/5">
        <PaymentForm />
      </div>
    </div>
  );
};

export default AddPayment;
