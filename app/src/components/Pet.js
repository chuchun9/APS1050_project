import React, { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
export const Pet = ({pet}) => {
  return (
    <Col>
       <Card id={pet.id}>
        <Card.Img variant="top" src={pet.img_hash} />
        <Card.Body>
          <Card.Title>{pet.name}</Card.Title>
          <Card.Text>
            <h6><strong>Breed</strong>: {pet.breed}</h6>
            <h6><strong>Age</strong>: {pet.age}</h6>
            <h6><strong>Location</strong>: {pet.location}</h6>
            {pet.adopter == 0 ? <Button variant="outline-primary">Adopt</Button> : <Button variant="outline-primary" disabled>Adopted</Button>}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
}
