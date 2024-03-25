import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function PublicDetailsPage() {
    const [cuisine, setCuisine] = useState({})
    const params = useParams()
    const cuisineId = params.id

    useEffect(() => {
        axios({
            method: "GET",
            url: `http://localhost:3000/pub/cuisines/${cuisineId}`
        })
        .then((result) => {
            setCuisine(result.data)
        })
        .catch(console.log)
    }, [])

    if (!Object.keys(cuisine).length) {
        return <span>Empty Data</span>;
    }

    return (
        <>
            <div className="detail-content">
                <h1>Cuisine Details</h1>
                <div style={{display: "flex", flex: "row", gap: "5%"}}>
                <img src={cuisine.imgUrl} alt="" />
                <div>
                    <h5>NAME</h5>
                    <h5>{cuisine.name}</h5>
                    <br />
                    <h5>PRICE</h5>
                    <h5>{cuisine.price}</h5>
                    <br />
                    <h5>DESCRIPTION</h5>
                    <h5>{cuisine.description}</h5>
                </div>
            </div>
            </div>
        </>
    )
}

export default PublicDetailsPage