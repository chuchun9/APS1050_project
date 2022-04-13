import React, { useEffect, useState, useMemo } from 'react'
import Button from 'react-bootstrap/Button'
import { Modal } from './Modal';
import { PetsCollection } from './PetsCollection';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";


export const Home = ({webstate}) => {
  let navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const ModalText = "Ask for adoption?"
  
  function checkUser() {
    webstate.web3.eth.getAccounts(function(error, accounts) {
      if (error) {
          console.log(error)
      }
      var account = accounts[0]
      webstate.contracts.Pets.deployed().then((instance) => {
        let PetsInstance = instance
        return PetsInstance.checkUser({from: account})
      }).then((result) => {
        console.log(result)
        if (!result) {
          navigate('/login')
        }
      })
    })
  }

  const ToggleModal = () => {
    setShowModal(prev => !prev);
  }

  useEffect(() => {
    if (Object.keys(webstate).length != 0) {
      console.log(Object.keys(webstate).length)
      checkUser()
    }
  }, [])


  return (
    <>
    {Object.keys(webstate).length ? (
      <div>
          <h1 className="text-center">Pete's Pet Shop  <Button variant="outline-primary" onClick={ToggleModal}>{ModalText}</Button></h1>
          <Modal webstate={webstate} showModal={showModal} setShowModal={setShowModal}></Modal>
          <hr/>
          <br/>
          <PetsCollection webstate={webstate} showModal={showModal}/>
      </div>
    ) : null}
    </>
  )
}
