import React, { useState } from "react";
import "./register.css";
import { upload } from "../../utils/uploadImage";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    email: "",
    username: "",
    password: "",
    image: "",
    isAdmin: false,
  });

  const [imageLoading, setImageLoading] = useState(false);

  const [registerLoading, setRegisterLoading] = useState(false);

  const navigate = useNavigate();

  const [image, setImage] = useState(null);

  const handleClick = (e) => {
    setRegisterData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleUploading = async (e) => {
    e.preventDefault();
    setImageLoading(true);
    const url = await upload(image);
    setRegisterData((prev) => {
      return {
        ...prev,
        image: url,
      };
    });
    setImageLoading(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterLoading(true);
    try {
      const { data } = await axios.post(
        import.meta.env.VITE_BASE_URL + "api/auth/register",
        registerData
      );
      toast("Registered Successfully", {
        type: "success",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setRegisterLoading(false);
      navigate("/login?message=You've successfuuly signed up, now login");
    } catch (err) {
      console.log(err);
      registerLoading(false);
    }
  };

  console.log(registerData);

  console.log(image);
  return (
    <div className="register">
      <form className="rForm">
        <div className="rWrapper">
          <div className="rLeft">
            <label htmlFor="" className="rLabel">
              Email
            </label>
            <input
              type="email"
              className="rInput"
              name="email"
              value={registerData.email}
              onChange={(e) => {
                handleClick(e);
              }}
              placeholder="bob@gmail.com"
            />
            <label htmlFor="" className="rLabel">
              Username
            </label>
            <input
              type="text"
              className="rInput"
              name="username"
              value={registerData.username}
              onChange={(e) => {
                handleClick(e);
              }}
            />
            <label htmlFor="" className="rLabel">
              password
            </label>
            <input
              type="password"
              className="rInput"
              name="password"
              value={registerData.password}
              onChange={(e) => {
                handleClick(e);
              }}
            />
          </div>
          <div className="rRight">
            <div className="pp">
              <label htmlFor="profilePicture" className="rLabel">
                <img
                  src={
                    registerData.image.length === 0
                      ? "/avatar.png"
                      : registerData.image
                  }
                  className="pImage"
                />
              </label>
              <input
                type="file"
                className="rInput"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
                id="profilePicture"
                style={{ display: "none" }}
              />
              <button
                disabled={imageLoading}
                className="uploadpp"
                onClick={(e) => {
                  handleUploading(e);
                }}
              >
                {imageLoading === true ? "Uploading..." : "Upload Image"}
              </button>
            </div>
            <div className="adminOrNot">
              <label className="rLabel">Become an Agent</label>
              <input
                type="checkbox"
                id="isAdmin"
                className="checkInput"
                value={registerData.isAdmin}
                name="isAdmin"
                onClick={(e) => {
                  setRegisterData((prev) => {
                    return { ...prev, [e.target.name]: e.target.checked };
                  });
                }}
                style={{ display: "none" }}
              />
              <label htmlFor="isAdmin" className="toggleBtn"></label>
            </div>
          </div>
        </div>
        <button
          disabled={registerLoading}
          className="registerBtn"
          onClick={(e) => {
            handleRegister(e);
          }}
        >
          {registerLoading === true ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
