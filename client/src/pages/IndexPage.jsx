import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function IndexPage() {
  const [places, setPlaces] = useState("");
  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 md:gap-x-6 gap-y-8 mt-8">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={"/places/" + place._id}>
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
              {place.photos.length > 0 && (
                <img
                  className="rounded-2xl object-cover aspect-square"
                  src={"http://localhost:4000/uploads/" + place.photos[0]}
                  alt="img"
                />
              )}
            </div>
            <h2 className="font-bold">{place.address}</h2>
            <h2 className="text-sm text-gray-500">{place.title}</h2>
            <h2 className="flex font-medium mt-1">
              {"\u20B9"}
              {place.price} <text className="font-normal ml-1"> night</text>
            </h2>
          </Link>
        ))}
    </div>
  );
}
