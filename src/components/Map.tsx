import { useEffect, useState } from "react";
import { useMap, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";
import { Link } from "react-router-dom";
import { IHomeMap } from "../views/Home/interfaces";
import { getMarkersByCategoryId } from "../views/Home/utilities";
import { getHeatmapData } from "../utilities";

const Map = ({ selectedCategory }: { selectedCategory: number }) => {
  const map = useMap();
  const [markers, setMarkers] = useState<IHomeMap[] | null>([]);
  const [heatmapData, setHeatmapData] = useState<any[] | null>([]);

  const fetchHeatmapData = async () => {
    const data = await getHeatmapData();
    if (data.data) setHeatmapData(data.data);
    console.log(heatmapData);
  };

  useEffect(() => {
    getMarkersByCategoryId(selectedCategory).then((data) => {
      setMarkers(data.data);
    });
  }, [selectedCategory]);

  useEffect(() => {
    fetchHeatmapData();
  }, []);

  useEffect(() => {
    const points: L.HeatLatLngTuple[] = heatmapData
      ? heatmapData.map((p) => {
          return [p.pos_x, p.pos_y, p.member_count];
        })
      : [];

    L.heatLayer(points, {
      minOpacity: 0,
      max: 200,
      radius: 40,
      blur: 10,
      gradient: {
        0.0: "green",
        0.5: "orange",
        1.0: "red",
      },
    }).addTo(map);
  }, [heatmapData]);

  return (
    <>
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
      ))}{" "}
    </>
  );
};

export default Map;
