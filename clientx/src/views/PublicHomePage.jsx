import axios from "axios"
import { useEffect, useState } from "react"
import CuisineCard from "../components/CuisineCard"

function PublicHomePage() {
    const [cuisines, setCuisines] = useState([])
    // console.log(cuisines)
    useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:3000/public/cuisines"
        })
        .then((result) => {
            console.log(result)
            setCuisines(result.data)
        })
        .catch(console.log)
    }, [])

    if(!cuisines.length) {
        <span>Empty Data</span>
    }

    return (
        <>
            <div className="detail-content">
                <h1>Grand Cuisine's Public Page</h1>
                <div className="public-deck">
                    {cuisines.length ? (cuisines.map(cuisine => {
                        return <CuisineCard
                            key = {cuisine.id}
                            cuisine = {cuisine}
                        />
                    })) : <span>Empty Data</span>}
                </div>
                
            </div>
        </>
    )
}

export default PublicHomePage