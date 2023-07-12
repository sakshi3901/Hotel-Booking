import { useEffect, useState } from "react";
import PhotosUploader from "../photosUploader";
import Perks from "../Perks";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhoto, setAddedPhoto] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, SetMaxGuests] = useState("1");
  const [price, SetPrice] = useState("1000");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhoto(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      SetMaxGuests(data.maxGuests);
      SetPrice(data.price);
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-xl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500">{text}</p>;
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      addedPhoto,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (id) {
      // Update
      await axios.put("/places", {
        id,
        ...placeData,
      });
      setRedirect(true);
    } else {
      // New Place
      await axios.post("/places", placeData);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput(
          "Title",
          "Title for your place should be short & catchy as in advertisement"
        )}
        <input
          type="text"
          placeholder="title: for eg:- My Lovely Apt"
          value={title}
          onChange={(ev) => {
            setTitle(ev.target.value);
          }}
        />
        {preInput("Address", "Address to this place")}
        <input
          type="text"
          placeholder="address"
          value={address}
          onChange={(ev) => {
            setAddress(ev.target.value);
          }}
        />
        {preInput("Photo", "More is better")}
        <PhotosUploader addedPhoto={addedPhoto} onChange={setAddedPhoto} />

        {preInput("Description", "Description of the place")}
        <textarea
          value={description}
          onChange={(ev) => {
            setDescription(ev.target.value);
          }}
        />

        {preInput("Perks", "Select all the perks to your place")}
        <Perks selected={perks} onChange={setPerks} />

        {preInput("Extra Info", "House Rules etc")}
        <textarea
          value={extraInfo}
          onChange={(ev) => {
            setExtraInfo(ev.target.value);
          }}
        />

        {preInput(
          "Check In & Out Time",
          "Add check in & out times, remember to have some window time for cleaning between guests"
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div>
            <h3 className="mt-4 -mb-1">Check In Time</h3>
            <input
              type="text"
              placeholder="14"
              value={checkIn}
              onChange={(ev) => {
                setCheckIn(ev.target.value);
              }}
            />
          </div>
          <div>
            <h3 className="mt-4 -mb-1">Check Out Time</h3>
            <input
              type="text"
              placeholder="11"
              value={checkOut}
              onChange={(ev) => {
                setCheckOut(ev.target.value);
              }}
            />
          </div>
          <div>
            <h3 className="mt-4 -mb-1">Max Number of Guests</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(ev) => {
                SetMaxGuests(ev.target.value);
              }}
            />
          </div>
          <div>
            <h3 className="mt-4 -mb-1">Price Per Night</h3>
            <input
              type="number"
              value={price}
              onChange={(ev) => {
                SetPrice(ev.target.value);
              }}
            />
          </div>
        </div>

        <div>
          <button className="primary my-4">Save</button>
        </div>
      </form>
    </div>
  );
}
