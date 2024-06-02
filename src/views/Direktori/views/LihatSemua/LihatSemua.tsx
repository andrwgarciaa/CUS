import { useState, useEffect } from "react";
import {useParams} from "react-router-dom"
import { IPlace } from "../../../../interfaces";
import { getAllPlacesByCategoryId } from "../../../../utilities";

const LihatSemua = () => {
    const [allPlaces, setAllPlaces] = useState<IPlace[]>([]);
    const { id } = useParams<{ id: string }>();

const fetchData = async () => {
    const data = await getAllPlacesByCategoryId(id);
    setAllPlaces(data.data)
}

useEffect(()=>{
    fetchData()
    console.log(allPlaces);
}, [])

    return(

        <div style={{ padding: '20px', backgroundColor: '#f8f9fa' }}>
        <header style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>Restoran-restoran</h1>
                <p style={{ fontSize: '16px', color: '#666', marginBottom: '20px' }}>
                    Lorem ipsum dolor sit amet consectetur. Volutpat aenean pretium quam orci id semper viverra.
                    Laoreet porta ut porta pulvinar. Volutpat morbi tortor neque pellentesque quis. Vel purus
                    bibendum purus feugiat eu.
                </p>
            </div>
            <img
                src="https://via.placeholder.com/150"
                alt="Direktori Tempat"
                style={{ width: '35%', height: '40%', objectFit: 'cover' }}
            />
        </header>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {allPlaces.map((place) => (
                <DirektoriCard
                    key={place.id}
                    image={place.image}
                    title={place.title}
                    price={place.price}
                    address={place.address}
                    tags={place.tags}
                    rating={place.rating}
                />
            ))}
        </div>
    </div>
    )
}

export default LihatSemua