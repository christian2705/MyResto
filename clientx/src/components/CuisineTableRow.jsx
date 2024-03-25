import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function CuisineTableRow({ cuisine }) {
  const navigate = useNavigate();

  const goToEdit = () => {
    navigate(`/edit-cuisine/:${cuisine.id}`);
  };

  const goToDetail = () => {
    navigate(`/detail-cuisine/${cuisine.id}`);
  };

  const handleDelete = async (event) => {
    try {
      event.preventDefault();
      await axios({
        method: 'DELETE',
        url: `http://localhost:3000/cuisines/${cuisine.id}`,
        headers: {
          Authorization: localStorage.getItem('Authorization'),
        },
      });
      Swal.fire({
        title: 'Delete Cuisine Successful',
        text: 'You have deleted a menu',
        icon: 'success',
      });
    } catch (err) {
      Swal.fire({
        title: 'Error!',
        text: err.response.data.message,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };

  return (
    <tr>
      <td>{cuisine.id}</td>
      <td>{cuisine.name}</td>
      <td>{cuisine.description}</td>
      <td>{cuisine.price}</td>
      <td>
        <img src={cuisine.imgUrl} style={{ width: '12vw', height: '20vh' }} />
      </td>
      {/* <td>{cuisine.category.name}</td> */}
      {/* <td>{cuisine.User.id}</td> */}
      <td>
        <div className="table-row-buttons" style={{ display: 'flow' }}>
          <Button variant="danger" style={{ height: '5%' }} onClick={handleDelete}>
            Delete
          </Button>{' '}
          <Button variant="warning" style={{ height: '5%' }} onClick={goToEdit}>
            Edit
          </Button>{' '}
          <Button variant="primary" style={{ height: '5%' }} onClick={goToDetail}>
            Details
          </Button>{' '}
        </div>
      </td>
    </tr>
  );
}

export default CuisineTableRow;
