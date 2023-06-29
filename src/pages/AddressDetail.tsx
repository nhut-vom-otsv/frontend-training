import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useNavigatePage } from "../hooks";
import AddressForm from "../components/AddressForm";
import GifLoading from "../components/GifLoading";
import SmallButton from "../components/SmallButton";
import Modal from "../components/Modal";
import { AddressType, deleteAddress, getAddress } from "../services";
import { NotificationContext } from "../context/NotificationContext";

const AddressDetail = () => {
  const [address, setAddress] = useState<AddressType>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const { notify } = useContext(NotificationContext);

  const { id } = useParams();

  const { redirect } = useNavigatePage();

  const fetchAddress = async () => {
    setLoading(true);
    if (!id) return setLoading(false);

    const data = await getAddress(id);

    setLoading(false);
    setAddress(data);
  };

  const removeAddress = async () => {
    if (id) {
      try {
        await deleteAddress(id);

        setIsError(false);
      } catch (error) {
        setIsError(true);
      }
    }

    return notify({
      id: crypto.randomUUID(),
      content: isError ? "Failed" : "Successfully",
      open: true,
      type: isError ? "error" : "success",
    });
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  return (
    <div className="mx-auto my-5 w-4/5">
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold">Manage your addresses</p>
        <SmallButton content={"delete"} onClick={() => setOpenModal(true)} />
      </div>
      <hr className="my-2 h-px border-0 bg-gray-200" />
      <div className="mx-auto flex min-h-[20rem] w-full flex-col items-center gap-4 md:w-4/5">
        {isLoading ? <GifLoading /> : <AddressForm details={address} />}
      </div>
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          redirect("/address");
        }}
        onSubmit={removeAddress}
      >
        <p>Do you want to delete?</p>
      </Modal>
    </div>
  );
};

export default AddressDetail;
