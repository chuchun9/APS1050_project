import React, { useEffect, useState, useMemo } from 'react'
import Button from 'react-bootstrap/Button'
import { Modal } from './Modal';
import { PetsCollection } from './PetsCollection';
import styled from 'styled-components'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";


const Title = styled.div`
    color: #7DC4E1;
    font-size:48px;
    text-align: center;
`
const Background = styled.div`
    width: 100%;
    height: 100%;
    background: #e9ecef;
    font-family: 'Plus Jakarta Sans', sans-serif;
    position: fixed;
    padding-left: 10px;
`;

export const Home = (props) => {
  let navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({})

  const ModalText = "Need Adoption?"

  function getUserInfo() {
    props.contracts.Pets.deployed().then((instance) => {
      let PetsInstance = instance
      return PetsInstance.getUser({from: props.account})
    }).then((result) => {
      var user_liked = new Set();
      result.liked.map((k) => {
        user_liked.add(k)
      })
      result.liked = user_liked
      setUser(result)
    })
  }

  const ToggleModal = () => {
    setShowModal(prev => !prev);
  }

  useEffect(() => {
    if (props.account != null && props.contracts.hasOwnProperty('Pets')) {
      getUserInfo()
    }
  }, [props.account])


  return (
    <>
    {Object.keys(user).length != 0 ? (
      <Background>
          {/* <h1 className="text-center">Pete's Pet Shop  <Button variant="outline-primary" onClick={ToggleModal}>{ModalText}</Button></h1> */}
          <Title>Pete's Pet Shop <Button variant="outline-primary" onClick={ToggleModal}>{ModalText}</Button></Title>
          <Modal ipfs={props.ipfs} account={props.account} contracts={props.contracts} showModal={showModal} setShowModal={setShowModal}></Modal>
          {/* <hr/> */}
          <br/>
          <PetsCollection contracts={props.contracts} account={props.account} user={user} setUser={setUser} showModal={showModal}/>
      </Background>
    ) : null}
    </>
  )
}
