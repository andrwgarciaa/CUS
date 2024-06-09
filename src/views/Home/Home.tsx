import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import SearchBar from "./components/SearchBar";
import { useEffect, useState } from "react";
import { getMarkersByCategoryId } from "./utilities";
import { IPlace } from "../../interfaces";
import { getAllPlaces } from "../Direktori/utilities";
import { IHomeMap } from "./interfaces";
import { Link } from "react-router-dom";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [allPlaces, setAllPlaces] = useState<IPlace[] | null>([]);
  const [markers, setMarkers] = useState<IHomeMap[] | null>([]);

  useEffect(() => {
    getAllPlaces().then((data) => {
      setAllPlaces(data.data);
    });
  }, []);

  useEffect(() => {
    getMarkersByCategoryId(selectedCategory).then((data) => {
      setMarkers(data.data);
    });
  }, [selectedCategory]);

  return (
    <div className="relative">
      <SearchBar
        setSelectedCategory={setSelectedCategory}
        allPlaces={allPlaces}
      />
      <MapContainer
        center={[-6.2246, 106.6484]}
        zoom={17}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers?.map((marker) => (
          <Marker key={marker.id} position={[marker.pos_x, marker.pos_y]}>
            <Popup>
              {marker.name}
              <br />
              <Link
                to={`/direktori/detail/${marker.id}`}
                className="underline underline-offset-2"
              >
                see detail
              </Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
