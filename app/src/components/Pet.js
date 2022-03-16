import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
export const Pet = ({pet}) => {
  return (
    <Col>
       <Card>
        <Card.Img variant="top" src={pet.picture} />
        <Card.Body>
          <Card.Title>{pet.name}</Card.Title>
          <Card.Text>
            <h6><strong>Breed</strong>: {pet.breed}</h6>
            <h6><strong>Age</strong>: {pet.age}</h6>
            <h6><strong>Location</strong>: {pet.location}</h6>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
}
