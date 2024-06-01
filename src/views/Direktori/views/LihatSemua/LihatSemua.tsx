import { useState, useEffect } from "react";
import {useParams} from "react-router-dom"
import { IPlace } from "../../../../interfaces";
import { getAllPlacesByCategoryId } from "../../../../utilities";

const LihatSemua = () => {
const [allPlaces, setAllPlaces] = useState<IPlace[] | null>([]);
const id = useParams().id;

const fetchData = async () => {
    const data = await getAllPlacesByCategoryId(id);
    setAllPlaces(data.data)
}

useEffect(()=>{
    fetchData()
    console.log(allPlaces);
}, [])

    return(

        <div></div>
    )
}

export default LihatSemua