import CuisineForm from '../components/CuisineForm';
import CustomNavbar from '../components/CustomNavbar';

function EditCuisinePage() {
  return (
    <div>
        <div className='edit-content-container'>
            <h1 className='edit-content-title' style={{paddingTop: "3%", textAlign: "center"}}>Edit Cuisine</h1>
            <CuisineForm/>
        </div>
    </div>
    
  );
}

export default EditCuisinePage;