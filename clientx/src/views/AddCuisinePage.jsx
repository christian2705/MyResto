import CuisineForm from "../components/CuisineForm"
import CustomNavbar from "../components/CustomNavbar"

function AddCuisinePage() {
    return (
        <div>
        <div className='edit-content-container'>
            <h1 className='edit-content-title' style={{paddingTop: "3%", textAlign: "center"}}>Add New Cuisine</h1>
            <CuisineForm/>
        </div>
    </div>
    )
}

export default AddCuisinePage