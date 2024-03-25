import { useEffect, useState } from "react";
import CategoriesTableRow from "../components/CategoriesTableRow";
import CustomNavbar from "../components/CustomNavbar";
import Table from 'react-bootstrap/Table';
import axios from "axios"

function CategoriesPage() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:3000/categories",
            headers: {
                Authorization: localStorage.getItem("Authorization")
            }
        })
        .then((result) => {
            setCategories(result.data)
        })
        .catch(console.log)
    }, []);

    return (
        <>
        <div>
            <div className="home-content-container">
                <h1 className='home-content-title'>All Categories</h1>
                <Table striped bordered hover className='cuisine-table'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                {categories.length ? (categories.map(category => {
                    return <CategoriesTableRow
                        key = {category.id}
                        category = {category}
                    />
                })) : <span>Empty Data</span>}
                </tbody>

                </Table>
            </div>
        </div>
        </>
    )
}

export default CategoriesPage