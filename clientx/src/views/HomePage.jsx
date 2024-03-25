import CustomNavbar from '../components/CustomNavbar';
import CuisineTableRow from '../components/CuisineTableRow';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { Button } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom';
import CuisineCard from '../components/CuisineCard';

function HomePage() {
  const [cuisine, setCuisine] = useState([]);
  const navigate = useNavigate();

  const goToAdd = (event) => {
    event.preventDefault();
    navigate('/add-cuisine');
  };

  useEffect(() => {
    // console.log("TEST")
    axios({
      method: 'GET',
      url: 'http://localhost:3000/cuisines',
      headers: {
        Authorization: localStorage.getItem('Authorization'),
      },
    })
      .then((result) => {
        console.log(result);
        setCuisine(result.data);
      })
      .catch(console.log);
  }, []);

  return (
    <>
      <div className="page-bg">
        <div background="dark" className="cards-layout">
          {cuisine.map((cuisine) => {
            return (
              <div className="single-card">
                <CuisineCard key={cuisine.id} cuisine={cuisine} page="cuisine" />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default HomePage;
