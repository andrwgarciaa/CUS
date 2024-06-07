import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IPlace } from "../../../../interfaces";
import { getDirektoriDetailById } from "./utilities";

const DirektoriDetail = () => {
  const [placeData, setPlaceData] = useState<IPlace | null>();
  const { id } = useParams();

  const getPlaceData = async (id: string | undefined) => {
    const data = await getDirektoriDetailById(id);
    console.log("Fetched place data:", data);
    setPlaceData(data);
  };

  useEffect(() => {
    getPlaceData(id);
  }, []);
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
    <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '20px' }}>
      <div style={{ flex: 1 }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '10px' }}>{placeData?.name}</h1>
        <p><strong>Lokasi:</strong> {placeData?.address}</p>
        {placeData?.price_min && placeData?.price_max && (
          <p><strong>Price range:</strong> Rp {placeData.price_min} - Rp {placeData.price_max} /orang</p>
        )}
        <p><strong>Rating:</strong> {placeData?.rating}</p>
        {placeData?.tags && (
          <p>
            <strong>Tags:</strong> {placeData.tags.map((tag, index) => (
              <span key={index} style={{ backgroundColor: '#e0e0e0', padding: '5px 10px', borderRadius: '5px', marginRight: '5px' }}>{tag}</span>
            ))}
          </p>
        )}
        {placeData?.phone && <p><strong>Phone:</strong> {placeData.phone}</p>}
        <p><strong>Jam Buka:</strong> Senin - Jumat (10:00 - 22:00), Sabtu - Minggu (10:00 - 20:00)</p>
        <button style={{ backgroundColor: '#f87171', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px' }}>Arsip</button>
      </div>
      {placeData?.has_photo && (
        <img
          src="https://via.placeholder.com/400x300"
          alt="Placeholder"
          style={{ width: '400px', height: '300px', objectFit: 'cover', borderRadius: '10px', marginLeft: '20px' }}
        />
      )}
    </div>

    <h2><strong>Foto-foto</strong></h2>
    <div style={{ display: 'flex', gap: '10px', overflowX: 'scroll', marginBottom: '20px' }}>
      {[1, 2, 3, 4, 5].map((photo, index) => (
        <img key={index} src={`https://via.placeholder.com/150`} alt={`Foto ${index + 1}`} style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
      ))}
    </div>

    <h2><strong>Menu</strong></h2>
    <p>Update 3 bulan yang lalu (29-02-2024)</p>
    <div style={{ display: 'flex', gap: '10px', overflowX: 'scroll' }}>
      {[1, 2, 3, 4, 5].map((menuItem, index) => (
        <img key={index} src={`https://via.placeholder.com/150`} alt={`Menu ${index + 1}`} style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
      ))}
    </div>
  </div>
  );
};

export default DirektoriDetail;
