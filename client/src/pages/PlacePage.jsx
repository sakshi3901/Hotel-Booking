import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) {
    return "";
  }

  if (showAllPhotos) {
    return (
      <div className="absolute bg-white min-h-screen">
        <div>
          <button className="mt-5" onClick={() => setShowAllPhotos(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="lg:mr-96 lg:ml-52 mr-8 mt-10 grid gap-4">
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div>
                <img src={"http://localhost:4000/uploads/" + photo} />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h1 className="text-3xl font-medium mb-1"> {place.title} </h1>
      <a
        className="text-sm font-semibold underline flex gap-1"
        target="_blank"
        href={"http://maps.google.com/?q=" + place.address}
      >
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

        {place.address}
      </a>

      <div className="relative">
        <div className="grid grid-cols-[2fr_1fr_1fr] gap-2 mt-5 rounded-2xl overflow-hidden">
          <div>
            {place.photos?.[0] && (
              <img
                onClick={() => setShowAllPhotos(true)}
                className="object-cover cursor-pointer aspect-video"
                src={"http://localhost:4000/uploads/" + place.photos[0]}
              />
            )}
          </div>
          <div className="grid">
            {place.photos?.[1] && (
              <img
                onClick={() => setShowAllPhotos(true)}
                className="aspect-video cursor-pointer object-cover"
                src={"http://localhost:4000/uploads/" + place.photos[1]}
              />
            )}
            <div className="overflow-hidden">
              {place.photos?.[2] && (
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className="aspect-video cursor-pointer object-cover relative top-2"
                  src={"http://localhost:4000/uploads/" + place.photos[2]}
                />
              )}
            </div>
          </div>

          <div className="grid">
            {place.photos?.[3] && (
              <img
                onClick={() => setShowAllPhotos(true)}
                className="aspect-video cursor-pointer object-cover"
                src={"http://localhost:4000/uploads/" + place.photos[3]}
              />
            )}
            <div className="overflow-hidden">
              {place.photos?.[4] && (
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className="aspect-video cursor-pointer object-cover relative top-2"
                  src={"http://localhost:4000/uploads/" + place.photos[4]}
                />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowAllPhotos(true)}
          className="absolute bottom-5 right-6 bg-white flex text-sm font-semibold p-2 gap-2 rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
              clipRule="evenodd"
            />
          </svg>
          Show All Photos
        </button>
      </div>
      <hr className="m-6" />
      <div>
        <h2 className="text-2xl font-medium mb-2">Description</h2>
        {place.description}
      </div>
      <hr className="m-6" />
      <h2 className="text-2xl font-medium mb-4">Things To Know</h2>
      <div className="lg:grid lg:grid-cols-2">
        <div>
          <div className="flex text-md">
            <h2>Check-in after {place.checkIn} </h2>
          </div>
          <div className="flex text-md">
            <h2>Check-out before {place.checkOut} </h2>
          </div>
          <div className="flex text-md">
            <h2>{place.maxGuests} Maximum Guests </h2>
          </div>
          <hr className="m-6" />
          <div>
            <h2 className="text-2xl font-medium mb-2">Extra Info</h2>
            {place.extraInfo}
          </div>
          <hr className="m-6" />
          <div>
            <h2 className="text-2xl font-medium mb-2">
              What this place offers
            </h2>
            <span className="capitalize">{place.perks.join(", ")}</span>
          </div>
        </div>
        <BookingWidget place={place} />
      </div>
    </div>
  );
}
