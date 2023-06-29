import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useGetOrderFormFields, useNavigatePage } from "../hooks";
import GifLoading from "./GifLoading";
import OutlineInput from "./CheckoutForm/OutlineInput";
import SmallButton from "./SmallButton";
import Modal from "./Modal";
import { AddressType, InformationType } from "../context/FormContext";
import { NotificationContext } from "../context/NotificationContext";
import { AddressCard, combinedInformationAndAddressSchema } from "../constants";
import { addAddress, updateAddress } from "../services";
import "react-loading-skeleton/dist/skeleton.css";

type AddressModalProps = {
  details?: AddressCard;
};

type LocationType = {
  lat: number;
  lng: number;
};

const containerStyle = {
  width: "100%",
  height: "300px",
};

const DEBOUNCE_TIME = 500;
const defaultLocation = {
  lat: 16.060957158551425,
  lng: 108.21611451111367,
};

const AddressForm = ({ details }: AddressModalProps) => {
  const center = {
    lat: details?.lat || defaultLocation.lat,
    lng: details?.lng || defaultLocation.lng,
  };

  const [location, setLocation] = useState<LocationType>(center);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const mapRef = useRef<google.maps.Map>();

  const { notify } = useContext(NotificationContext);

  const { informationFormArray, addressFormArray } = useGetOrderFormFields();
  const { redirect } = useNavigatePage();

  const { isLoaded } = useJsApiLoader({
    libraries: ["places"],
    googleMapsApiKey: "AIzaSyDESf7sOgQFtVxSPPWpHmZVf0AkR9DDuEU", // MOVE TO ENV LATER
  });

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: DEBOUNCE_TIME,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InformationType & AddressType>({
    resolver: yupResolver(combinedInformationAndAddressSchema),
    defaultValues: details && {
      name: details?.name,
      email: details?.email,
      phoneNumber: details?.phoneNumber,
      address: details?.address,
    },
  });

  const update = async (id: string, data: InformationType & AddressType) => {
    try {
      await updateAddress(id, {
        ...data,
        ...location,
        address: selectedAddress,
      });

      setIsError(false);
      setIsLoading(false);
      redirect("/address");
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const add = async (data: InformationType & AddressType) => {
    try {
      await addAddress({ ...data, ...location, address: selectedAddress });

      setIsError(false);
      setIsLoading(false);
      redirect("/address");
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const onSubmitForm = async (data: InformationType & AddressType) => {
    setIsLoading(true);
    details?.id ? update(details.id, data) : add(data);

    notify({
      id: crypto.randomUUID(),
      content: isError ? "Failed" : "Successfully",
      open: true,
      type: isError ? "error" : "success",
    });
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }: { description: string }) =>
    () => {
      setValue(description, false);
      clearSuggestions();

      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        const { formatted_address } = results[0];
        setLocation({ lat, lng });
        setSelectedAddress(formatted_address);
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion, index) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <React.Fragment key={place_id}>
          <li onClick={handleSelect(suggestion)}>
            <strong>{main_text}</strong> <small>{secondary_text}</small>
          </li>
          {index !== data.length - 1 && <hr className="my-2" />}
        </React.Fragment>
      );
    });

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    mapRef.current = map;
    map.setZoom(10);
  }, []);

  useEffect(() => {
    if (details?.address) setValue(details.address);
  }, [details]);

  return (
    <div className="h-full w-full">
      {isLoading && <GifLoading />}
      <form>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex w-full flex-col justify-center gap-5 lg:flex-row"
        >
          <div className="lg:w-1/2">
            {informationFormArray.map((field, index) => (
              <OutlineInput
                label={field.label}
                name={field.name}
                register={register}
                error={errors}
                key={index}
              />
            ))}
          </div>
          <div className="relative lg:w-1/2">
            {addressFormArray.map((field) => (
              <OutlineInput
                label={field.label}
                name={field.name}
                register={register}
                error={errors}
                key={field.name}
                value={value ?? details?.address}
                onChange={handleInput}
                disabled={!ready}
              />
            ))}
            {status === "OK" && (
              <ul className="absolute z-50 max-h-52 w-full overflow-auto rounded-md border-2 border-gray-500 bg-white p-1 shadow-lg scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-full">
                {renderSuggestions()}
              </ul>
            )}
          </div>

          <div className="mb-2 w-full rounded-lg pt-2">
            {isLoaded && (
              <GoogleMap
                mapContainerStyle={containerStyle}
                onLoad={onLoad}
                center={location}
                onCenterChanged={() => mapRef.current?.setZoom(15)}
              >
                {location && <Marker position={location} />}
              </GoogleMap>
            )}
          </div>
        </motion.div>
      </form>
      <div className="flex w-full items-center justify-between">
        <SmallButton content="Back" onClick={() => redirect("/address")} />
        <SmallButton content="Confirm" onClick={() => setOpenModal(true)} />
      </div>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit(onSubmitForm)}
      >
        <p>Do you want to confirm your changes?</p>
      </Modal>
    </div>
  );
};

export default AddressForm;
