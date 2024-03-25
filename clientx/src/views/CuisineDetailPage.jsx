import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"

function CuisineDetailPage() {
    const [cuisine, setCuisine] = useState({})
    const params = useParams()
    const cuisineId = params.id
    console.log(cuisine)

    useEffect(() => {
        axios({
            method: "GET",
            url: `http://localhost:3000/cuisines/${cuisineId}`,
            headers: {
                Authorization: localStorage.getItem("Authorization")
            }
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
            <h1>CUISINE DETAIL PAGE</h1>
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

export default CuisineDetailPage