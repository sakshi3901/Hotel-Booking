import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookingDates from "../BookingDates";
import PlaceImg from "../PlaceImg";
import { differenceInCalendarDays } from "date-fns";

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("/bookings").then((response) => {
      const foundBooking = response.data.find(({ _id }) => _id === id);
      if (foundBooking) {
        setBooking(foundBooking);
      }
    });
  }, [id]);

  if (!booking) {
    return "";
  }

  return (
    <div>
      <div className="flex gap-4 mt-14">
        <button onClick={() => navigate(-1)} className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <h1 className="text-3xl font-medium">Request to book</h1>
      </div>
      <div className="lg:grid lg:grid-cols-2 mt-10 lg:px-10">
        <div>
          <h2 className="text-2xl font-semibold">Your Trip</h2>
          <div className="mt-5">
            <h2 className="text-lg font-semibold mb-2">Name</h2>
            {booking.name}
          </div>
          <div className="mt-5">
            <h2 className="text-lg font-semibold mb-2">Dates</h2>
            <BookingDates booking={booking} />
          </div>
          <div className="mt-5">
            <h2 className="text-lg font-semibold mb-2">Guests</h2>
            {booking.noOfGuests} Guests
          </div>
          <hr className="my-8 bg-gray-500" />
        </div>
        <div className="border mb-10 lg:ml-14 p-5 rounded-2xl shadow">
          <div className="flex flex-col gap-4">
            <PlaceImg
              place={booking.place}
              className={"lg:w-28 aspect-square object-cover rounded-2xl"}
            />
            <div className="text-sm">
              <span className="text-gray-500">Room in farm stay</span>
              <h2>{booking.place.title}</h2>
              <h2 className="mt-12 font-medium flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                {booking.place.address}
              </h2>
            </div>
          </div>
          <hr className="my-5 bg-gray-500" />
          <div className="text-lg">
            <div>
              <h1 className="mb-4 text-2xl font-semibold">Price details</h1>
            </div>
            <span className="justify-between flex">
              {"\u20B9"}
              {booking.place.price} x{" "}
              {differenceInCalendarDays(
                new Date(booking.checkOut),
                new Date(booking.checkIn)
              )}{" "}
              nights
              <span className="text-right">
                {"\u20B9"}
                {booking.price}
              </span>
            </span>
          </div>
          <hr className="my-5 bg-gray-500" />
          <div>
            <span className="font-semibold text-lg justify-between flex">
              Total Price (INR)
              <text className="text-right">
                {"\u20B9"}
                {booking.price}
              </text>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
