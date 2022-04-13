import React, { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'
import { FcLike } from 'react-icons/fc';
import { FcLikePlaceholder } from 'react-icons/fc';

const LikedButton = styled(FcLike)`
    cursor: pointer;
`;


const LikedPlaceholderButton = styled(FcLikePlaceholder)`
    cursor: pointer;
`;


export const Pet = (props) => {

  const [liked_state, setlike ]= useState(props.liked)
  const [likeNum, setlikeNum] = useState(props.pet.likes.length)


  function ContractLikePet() {
    props.contracts.Pets.deployed().then((instance) => {
      let PetsInstance = instance
      return PetsInstance.likePet(props.pet.id, {from: props.account})
    }).then((result) => {
      
    })
  }
  
  function ContractDislikePet() {
    props.contracts.Pets.deployed().then((instance) => {
      let PetsInstance = instance
      return PetsInstance.dislikePet(props.pet.id, {from: props.account})
    }).then((result) => {
      
    })
  }


  const likePet = e => {
    console.log("Like!")
    setlike(true)
    setlikeNum(likeNum+1)
    ContractLikePet()
  }

  const dislikePet = e => {
    console.log("Cancel Like!")
    setlike(false)
    setlikeNum(likeNum-1)
    ContractDislikePet()
  }

  return (
    <Col>
       <Card id={props.pet.id} style={{ "box-shadow": "0 5px 16px rgba(0, 0, 0, 0.2)"}}>
        <Card.Img variant="top" src={props.pet.img_hash} />
        <Card.Body>
          <Card.Title>{props.pet.name}</Card.Title>

          <Card.Title>
          {liked_state?
          <LikedButton onClick={dislikePet}></LikedButton>
          :<LikedPlaceholderButton onClick={likePet}></LikedPlaceholderButton>
          }
          <span style={{"margin-left":"10px", "font-size": "15px"}}>{likeNum}</span>
          </Card.Title>

          <Card.Text>
            <h6><strong>Breed</strong>: {props.pet.breed}</h6>
            <h6><strong>Age</strong>: {props.pet.age}</h6>
            <h6><strong>Location</strong>: {props.pet.location}</h6>
            {props.pet.adopter == 0 ? <Button variant="outline-primary">Adopt</Button> : <Button variant="outline-primary" disabled>Adopted</Button>}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
}
