import AddressForm from "../components/AddressForm";

const AddAddress = () => {
  return (
    <div className="mx-auto my-5 w-4/5">
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold">Manage your addresses</p>
      </div>
      <hr className="my-2 h-px border-0 bg-gray-200" />
      <div className="mx-auto flex min-h-[20rem] flex-col items-center gap-4 md:w-4/5">
        <AddressForm />
      </div>
    </div>
  );
};

export default AddAddress;
