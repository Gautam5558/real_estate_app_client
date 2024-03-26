import React, { useContext, useState } from "react";
import "./bookings.css";
import SearchBar from "../../components/searchBar/SearchBar";
import { useFetch } from "../../hooks/useFetch";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResidencyCard from "../../components/residencycard/ResidencyCard";
import { AuthContext } from "../../context/AuthContext";
import { InfinitySpin } from "react-loader-spinner";

const Bookings = () => {
  const { data, isLoading, error, refetch } = useFetch(
    import.meta.env.VITE_BASE_URL + "api/residencies"
  );

  const [search, setSearch] = useState("");

  const { state } = useContext(AuthContext);

  if (isLoading) {
    return (
      <div
        className="spinner"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <InfinitySpin
          visible={true}
          width="200"
          color="#4fa94d"
          ariaLabel="infinity-spin-loading"
        />
      </div>
    );
  }

  if (error) {
    toast("Something went wrong", {
      type: "error",
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return;
  }

  const filteredResidencies = data
    .filter((residency) => {
      return state.user?.bookedVisits
        ?.map((visit) => {
          return visit.residencyId;
        })
        .includes(residency._id);
    })
    .filter((residency) => {
      return (
        residency.title.toLowerCase().includes(search.toLowerCase()) ||
        residency.city.toLowerCase().includes(search.toLowerCase()) ||
        residency.country.toLowerCase().includes(search.toLowerCase())
      );
    });

  return (
    <div className="residencies">
      <div className="rSearch">
        <SearchBar search={search} setSearch={setSearch} />
      </div>
      <div className="cards">
        {filteredResidencies?.map((residency) => {
          return <ResidencyCard item={residency} key={residency._id} />;
        })}
      </div>
    </div>
  );
};

export default Bookings;
