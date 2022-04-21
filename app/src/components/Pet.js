import React, { useEffect, useState } from 'react'
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


export const Pet = ({user, contracts, account, PetsArr, setPets, setUser, idx}) => {
  // props.user.liked.has(props.petArr[props.pet].id)
  // liked={props.user.liked.has(p.id)}
  // const [liked_state, setlike ]= useState(props.liked)
  // const [likeNum, setlikeNum] = useState(props.pet.likes.length)
  // console.log(props.liked, props.pet.likes.length)
  // const [p, setP] = useState(props.PetsArr[props.pet])

  // useEffect(() => {
  //   console.log(props.pet)
  //   console.log(props.liked)
  //   setlike(props.liked)
  //   setlikeNum(props.pet.likes.length) 
  // },[]);



  function ContractLikePet() {
    contracts.Pets.deployed().then((instance) => {
      let PetsInstance = instance
      return PetsInstance.likePet(PetsArr[idx].id, {from: account})
    }).then((result) => {
      // console.log(result.return_value)
      // var user_liked, pet_likes = result
      // props.setUser({...props.user, liked: new Set(user_liked)})

      // var old_Pets = props.PetsArr
      // old_Pets[props.pet].likes = pet_likes
      // props.setPets(old_Pets)
    }).catch((error) => {
      let newPets = [...PetsArr]
      newPets[idx].likes.delete(user.id)
      setPets(newPets)

      let newUser = {...user}
      newUser.liked.delete(PetsArr[idx].id)
      setUser(newUser)
      // console.log("nini")
    })
  }
  
  function ContractDislikePet() {
    contracts.Pets.deployed().then((instance) => {
      let PetsInstance = instance
      return PetsInstance.dislikePet(PetsArr[idx].id, {from: account})
    }).then((result) => {
      // console.log(result.return_value)
      // var user_liked, pet_likes = result
      // props.setUser({...props.user, liked: new Set(user_liked)})

      // var old_Pets = props.PetsArr
      // old_Pets[props.pet].likes = pet_likes
      // props.setPets(old_Pets)
    }).catch((error) => {
      let newPets = [...PetsArr]
      newPets[idx].likes.add(user.id)
      setPets(newPets)

      let newUser = {...user}
      newUser.liked.add(PetsArr[idx].id)
      setUser(newUser)
    })
  }


  const likePet = e => {
    console.log("Like!")
    let newPets = [...PetsArr]
    newPets[idx].likes.add(user.id)
    setPets(newPets)

    let newUser = {...user}
    newUser.liked.add(PetsArr[idx].id)
    setUser(newUser)
    ContractLikePet()
  }

  const dislikePet = e => {
    console.log("Cancel Like!")
    let newPets = [...PetsArr]
    newPets[idx].likes.delete(user.id)
    setPets(newPets)

    let newUser = {...user}
    newUser.liked.delete(PetsArr[idx].id)
    setUser(newUser)

    ContractDislikePet()
  }
  
  const Adopt = e => {
    console.log("Adopt")
    contracts.Pets.deployed().then((instance) => {
      let PetsInstance = instance
      return PetsInstance.adopt(PetsArr[idx].id, {from: account})
    }).then((result) => {
      let newPets = [...PetsArr]
      newPets[idx].adopter = true
      setPets(newPets)
    })
  }


  return (
    <Col>
       <Card id={PetsArr[idx].id} style={{ "boxShadow": "0 5px 16px rgba(0, 0, 0, 0.2)", "marginLeft": "10px"}}>
        <Card.Img variant="top" src={PetsArr[idx].img_hash} />
        <Card.Body>
          <Card.Title>{PetsArr[idx].name}</Card.Title>
          <Card.Title>
          {user.liked.has(PetsArr[idx].id)?
          <LikedButton onClick={dislikePet}></LikedButton>
          :<LikedPlaceholderButton onClick={likePet}></LikedPlaceholderButton>
          }
          <span style={{"marginLeft":"10px", "fontSize": "15px"}}>{PetsArr[idx].likes.size}</span>
          </Card.Title>

          <Card.Text>
            <h6><strong>Breed</strong>: {PetsArr[idx].breed}</h6>
            <h6><strong>Age</strong>: {PetsArr[idx].age}</h6>
            <h6><strong>Location</strong>: {PetsArr[idx].location}</h6>
            {PetsArr[idx].adopter == 0 ? <Button onClick={Adopt} variant="outline-primary">Adopt</Button> : <Button variant="outline-primary" disabled>Adopted</Button>}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
}
