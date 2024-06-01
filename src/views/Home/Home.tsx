import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import SearchBar from "./components/SearchBar";
import { useEffect, useState } from "react";
import { getMarkersByCategoryId } from "./utilities";
import { IPlace } from "../../interfaces";
import { getAllPlaces } from "../../utilities";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [allPlaces, setAllPlaces] = useState<IPlace[] | null>([]);
  const [markers, setMarkers] = useState<IPlace[] | null>([]);

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
            <Popup>{marker.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
