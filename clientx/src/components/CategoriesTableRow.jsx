import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

function CategoriesTableRow({category}) {
  const navigate = useNavigate();

  const goToEdit = () => {
    navigate(`/edit-category/${category.id}`)
  }

  const goToDetail = () => {
    navigate(`/detail-category/${category.id}`)
  }

  const handleDelete = async(event) => {
    try {
      event.preventDefault()
      await axios({
        method: "DELETE",
        url: `http://localhost:3000/categories/${category.id}`,
        headers: {
          Authorization: localStorage.getItem("Authorization")
        }
      })
      Swal.fire({
        title: "Delete category Successful",
        text: "You have deleted a menu",
        icon: "success"
      });

    } catch(err) {
      Swal.fire({
        title: 'Error!',
        text: err.response.data.message,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  }

  return (
        <tr >
            <td>{category.id}</td>
            <td>{category.name}</td>
            <td>
              <div className='table-row-buttons' style={{display: "flow"}}>
                <Button variant="danger" style={{height: "5%"}} onClick={handleDelete}>Delete</Button>{' '}
                <Button variant="warning" style={{height: "5%"}} onClick={goToEdit}>Edit</Button>{' '}
                <Button variant="primary" style={{height: "5%"}} onClick={goToDetail}>Details</Button>{' '}
              </div>
            </td>
         </tr>
  );
}

export default CategoriesTableRow;