import { MapContainer } from "react-leaflet";
import SearchBar from "./components/SearchBar";
import { useEffect, useState } from "react";
import { IPlace } from "../../interfaces";
import { getAllPlaces } from "../Direktori/utilities";
import Map from "../../components/Map";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [allPlaces, setAllPlaces] = useState<IPlace[] | null>([]);

  useEffect(() => {
    getAllPlaces().then((data) => {
      setAllPlaces(data.data);
    });
  }, []);

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
        <Map selectedCategory={selectedCategory} />
      </MapContainer>
    </div>
  );
}
