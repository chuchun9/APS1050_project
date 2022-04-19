import { Home } from './components/Home';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract'  
import Pets from './contracts/Pets.json'
import Donation from './contracts/Donation.json'
import { create } from 'ipfs-http-client'
import { Sidebar } from './components/Sidebar';
import { Login } from './components/Login';
import { History } from './components/History';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";


export const App = () => {

  let navigate = useNavigate();

  const [web3, setweb3] = useState(null)

  const [web3Provider, setweb3Provider] = useState(null)

  const [contracts, setContracts] = useState({})

  const [account, setAccount] = useState(null)

  const [ipfs, setipfs] = useState(null)

  function importContracts() {
    var PetsArtifact = Pets;
    var DonationArtifact = Donation;
    setContracts({
      Pets: TruffleContract(PetsArtifact),
      Donation: TruffleContract(DonationArtifact)
    })
  
  }


  async function requestAccounts() {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.error("User denied account access")
    }

  }

  useEffect(() => {
    if (web3Provider != null) {
      for (const k in contracts) {
        contracts[k].setProvider(web3Provider)
      }
    }
  }, [contracts])
  
  useEffect(() => {
    if (web3Provider != null) {
      requestAccounts()
      setweb3(new Web3(web3Provider));
    }
  }, [web3Provider])

  useEffect(() => {
    if (web3 != null) {
      web3.eth.getAccounts((error, accounts) => {
        if (error) {
          console.log(error)
        }
        var account = accounts[0]
        setAccount(account)
      })
    }
  }, [web3])

  useEffect(() => { 
    if (contracts.hasOwnProperty("Pets") && account != null) {
      console.log(account)
      contracts.Pets.deployed().then((instance) => {
        let PetsInstance = instance
        return PetsInstance.checkUser({from: account})
      }).then((result) => {
        if (!result) {
          navigate('/login')
        }
      }) 
    }
  }, [account])

  useEffect(() => {
    Init()
    importContracts()
  }, [])


  async function Init() {
    
    if (window.ethereum) {
      setweb3Provider(window.ethereum)
    }
    else if (window.web3) {
      setweb3Provider(window.web3.currentProvider)
    }
    else {
      setweb3Provider(new Web3.providers.HttpProvider('http://localhost:7545'))
    }

    const client = create('https://ipfs.infura.io:5001/api/v0')
    setipfs(client)

  }


  return (
    <>
    <Routes>
      <Route exact path="/" element={<Home ipfs={ipfs} contracts={contracts} account={account}/>}/>
      <Route exact path="/login" element={<Login contracts={contracts} account={account}/>}/>
      <Route exact path="/history" element={<History ipfs={ipfs} contracts={contracts} account={account}/>}/>
    </Routes>
    </>

  )
}
export default App;
