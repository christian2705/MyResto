import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function CuisineForm() {
  const [cuisine, setCuisine] = useState({ name: '', description: '', price: 0, imgUrl: '', categoryId: 0 });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const formHandler = (event) => {
    const { name, value } = event.target;
    const data = { ...cuisine, [name]: value };
    setCuisine(data);
  };

  const addCuisine = async (event) => {
    try {
      console.log(cuisine);
      event.preventDefault();
      const form = await axios({
        method: 'POST',
        url: 'http://localhost:3000/cuisines',
        headers: {
          Authorization: localStorage.getItem('Authorization'),
        },
        data: cuisine,
      });
      navigate('/cuisines');
      Swal.fire({
        title: 'Add Cuisine Successful',
        text: 'You have added a new menu',
        icon: 'success',
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: 'Error!',
        text: err.response.data.message,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'http://localhost:3000/categories',
      headers: {
        Authorization: localStorage.getItem('Authorization'),
      },
    })
      .then((result) => {
        setCategories(result.data);
      })
      .catch(console.log);
  }, []);
  return (
    <Form className="cuisine-form" onSubmit={addCuisine}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="name" value={cuisine.name} onChange={formHandler} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" name="description" value={cuisine.description} onChange={formHandler} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Price</Form.Label>
        <Form.Control type="text" name="price" value={cuisine.price} onChange={formHandler} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Image URL</Form.Label>
        <Form.Control type="text" name="imgUrl" value={cuisine.imgUrl} onChange={formHandler} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Category</Form.Label>
        <Form.Select aria-label="Default select example" name="categoryId" value={cuisine.categoryId} onChange={formHandler}>
          <option>--Select Category--</option>
          {categories.length ? (
            categories.map((category) => {
              return <option value={category.id}>{category.name}</option>;
            })
          ) : (
            <span>Empty Data</span>
          )}
        </Form.Select>
      </Form.Group>
      <br />
      <Button variant="primary" type="submit" style={{ width: '25%' }}>
        Submit
      </Button>{' '}
    </Form>
  );
}

export default CuisineForm;
