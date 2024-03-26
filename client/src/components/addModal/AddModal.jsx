import React, { useState } from "react";
import "./addModal.css";
import { Stepper } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/core/styles/global.css";
import "@mantine/core/styles/Stepper.css";
import AddLocation from "../addLocation/AddLocation";
import UploadImage from "../uploadImage/UploadImage";
import Details from "../details/Details";
import Facilities from "../facilities/Facilities";
import axios from "axios";
import { toast } from "react-toastify";

const AddModal = ({ setAdd }) => {
  const [active, setActive] = useState(0);

  const [residencyData, setResidencyData] = useState({
    title: "",
    desc: "",
    address: "",
    city: "",
    country: "",
    price: 0,
    bathrooms: 0,
    rooms: 0,
    parking: false,
    images: [],
  });

  const nextStep = () => {
    setActive((prev) => {
      return prev < 4 ? prev + 1 : prev;
    });
  };

  const prevStep = () => {
    setActive((prev) => {
      return prev === 0 ? prev : prev - 1;
    });
  };

  console.log(residencyData);

  const handleClick = async () => {
    try {
      const { data } = await axios.post(
        import.meta.env.VITE_BASE_URL + "api/residencies",
        residencyData,
        { withCredentials: true }
      );
      toast("Residency Created Successfully", {
        type: "success",
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setAdd(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="addModal">
      <div className="mWrapper">
        <div
          className="closeAdd"
          onClick={() => {
            setAdd(false);
          }}
        >
          x
        </div>
        <Stepper
          active={active}
          onStepClick={setActive}
          allowNextStepsSelect={false}
        >
          <Stepper.Step label="location" description="address">
            <AddLocation
              nextStep={nextStep}
              residencyData={residencyData}
              setResidencyData={setResidencyData}
            />
          </Stepper.Step>
          <Stepper.Step label="image" description="upload images">
            <UploadImage
              nextStep={nextStep}
              prevStep={prevStep}
              residencyData={residencyData}
              setResidencyData={setResidencyData}
            />
          </Stepper.Step>
          <Stepper.Step label="details" description="about the property">
            <Details
              nextStep={nextStep}
              prevStep={prevStep}
              residencyData={residencyData}
              setResidencyData={setResidencyData}
            />
          </Stepper.Step>
          <Stepper.Step label="facilities" description="specs of property">
            <Facilities
              nextStep={nextStep}
              prevStep={prevStep}
              residencyData={residencyData}
              setResidencyData={setResidencyData}
            />
          </Stepper.Step>
          <Stepper.Completed>
            <div className="completedWrapper">
              <h2 className="steeperHeading">
                Click on the button below to create the residency
              </h2>
              <button className="createResidency" onClick={handleClick}>
                Create Residency
              </button>
            </div>
          </Stepper.Completed>
        </Stepper>
      </div>
    </div>
  );
};

export default AddModal;
