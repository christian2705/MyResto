import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

function CuisineCard({ cuisine }) {
  const navigate = useNavigate();

  // const goToEdit = () => {
  //   navigate(`/edit-cuisine/:${cuisine.id}`);
  // };

  const goToDetail = () => {
    console.log('TEST');
    navigate(`/detail-cuisine/${cuisine.id}`);
  };
  return (
    <Card onClick={goToDetail} className="zoom-card" background="dark" style={{ width: '17rem' }}>
      <Card.Img className="card-image" variant="top" src={cuisine.imgUrl} />
      <Card.Body>
        <Card.Title>{cuisine.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Rp{cuisine.price}</Card.Subtitle>
        <Card.Text>{cuisine.description}</Card.Text>
        <br />
      </Card.Body>
    </Card>
  );
}

export default CuisineCard;
