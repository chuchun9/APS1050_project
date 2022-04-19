import React, { useEffect, useState, useMemo } from 'react'
import Button from 'react-bootstrap/Button'
import { Modal } from './Modal';
import { PetsCollection } from './PetsCollection';
import styled from 'styled-components'
import { Header } from './Header';
import { DonationHistory } from './DonationHistory';
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
`;

export const History = (props) => {
  let navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({})

  function getUserInfo() {
    props.contracts.Pets.deployed().then((instance) => {
      let PetsInstance = instance
      return PetsInstance.getUser(props.account, {from: props.account})
    }).then((result) => {
      console.log(result)
      var user_liked = new Set();
      result.liked.map((k) => {
        user_liked.add(k)
      })
      result.liked = user_liked
      setUser(result)
    })
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
            <Header account={props.account} contracts={props.contracts} setShowModal={setShowModal} showModal={showModal}></Header>
            <Modal ipfs={props.ipfs} account={props.account} contracts={props.contracts} showModal={showModal} setShowModal={setShowModal}></Modal>
            <br/>
            <DonationHistory account={props.account} contracts={props.contracts}></DonationHistory>
      </Background>
    ) : null}
    </>
  )
}
