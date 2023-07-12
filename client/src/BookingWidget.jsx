import { useContext, useEffect, useState } from "react";
import { differenceInDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./userContext";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [noOfGuests, setNoOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInDays(new Date(checkOut), new Date(checkIn));
  }
  async function bookThisPlace() {
    const response = await axios.post("/bookings", {
      checkIn,
      checkOut,
      noOfGuests,
      name,
      phone,
      place: place._id,
      price: numberOfNights * place.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="border shadow-lg lg:ml-40 p-5 lg:-mt-12 mt-10">
      <div className="flex items-baseline gap-1">
        <h2 className="text-2xl font-semibold">Rs {place.price}</h2>
        <span>Per night</span>
      </div>
      <div className="grid grid-cols-2 mt-5 border border-gray-400 rounded-2xl">
        <div className="p-2">
          <label className="text-xs font-semibold">CHECK-IN</label>
          <input
            type="date"
            value={checkIn}
            onChange={(ev) => setCheckIn(ev.target.value)}
          />
        </div>
        <div className="border-l border-gray-400 p-2">
          <label className="text-xs font-semibold">CHECK-OUT</label>
          <input
            type="date"
            value={checkOut}
            onChange={(ev) => setCheckOut(ev.target.value)}
          />
        </div>
        <div className="col-span-2 border border-gray-400 p-2 rounded-2xl">
          <label className="text-xs font-semibold">GUESTS</label>
          <br />
          <input
            className="border-gray-400"
            type="number"
            value={noOfGuests}
            onChange={(ev) => setNoOfGuests(ev.target.value)}
          />
        </div>
      </div>
      {numberOfNights > 0 && (
        <div className="grid grid-cols-2 ">
          <div className="border border-gray-400 p-2 rounded-2xl">
            <label className="text-xs font-semibold">Name</label>
            <br />
            <input
              className="border-gray-400"
              placeholder="Your Full Name"
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
          </div>
          <div className="border border-gray-400 p-2 rounded-2xl">
            <label className="text-xs font-semibold">Phone No</label>
            <br />
            <input
              className="border-gray-400"
              placeholder="Your Phone No"
              type="tel"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />
          </div>
        </div>
      )}
      <button
        onClick={bookThisPlace}
        className="primary mt-5 py-4 font-semibold text-lg"
      >
        Reserve
      </button>
      <div>
        <h2 className="text-sm text-center mt-2">You won't be charged yet</h2>
        <div className="mt-5 text-lg">
          {numberOfNights > 0 && (
            <span className="justify-between flex">
              {"\u20B9"}
              {place.price} x {numberOfNights} Days
              <text className="text-right">
                {"\u20B9"}
                {numberOfNights * place.price}
              </text>
            </span>
          )}
        </div>
        <hr className="m-6" />
        <div>
          {numberOfNights > 0 && (
            <span className="font-bold text-lg justify-between flex">
              Total Price
              <text className="text-right">
                {"\u20B9"}
                {numberOfNights * place.price}
              </text>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
