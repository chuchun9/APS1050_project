import { Home } from './components/Home';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract'  
import Pets from './contracts/Pets.json'
import { create } from 'ipfs-http-client'
import { Sidebar } from './components/Sidebar';
import { Login } from './components/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";


export const App = () => {

  let navigate = useNavigate();

  const [webstate, setwebstate] = useState({})

  function importContracts() {
    var PetsArtifact = Pets;
    webstate.contracts = {}
    webstate.contracts.Pets = TruffleContract(PetsArtifact)
    for (const k in webstate.contracts) {
      webstate.contracts[k].setProvider(webstate.web3Provider)
    }
  }

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
        if (result) {
          navigate('/home')
        }
        else{
          navigate('/login')
        }
      })
    })
  }

  async function Init() {
    
    if (window.ethereum) {
      webstate.web3Provider = window.ethereum
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
      } catch (error) {
        console.error("User denied account access")
      }
    }
    else if (window.web3) {
      webstate.web3Provider = window.web3.currentProvider
    }
    else {
      webstate.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
    }
    webstate.web3 = new Web3(webstate.web3Provider);
    console.log(webstate)
    importContracts()

    const client = create('https://ipfs.infura.io:5001/api/v0')
    webstate.ipfs = client
    checkUser(webstate.contracts.Pets)

  }

  useEffect(() => {
    Init()
  }, [])


  return (
    <>
    <Routes>
      <Route exact path="/home" element={<Home  webstate={webstate}/>}/>
      <Route exact path="/login" element={<Login  webstate={webstate}/>}/>
    </Routes>
    </>

  )
}


// class App extends React.Component {  
  
  



//   constructor(props) {
//     super(props)
//     this.state = {
//       web3Provider: null,
//       web3: null,
//       contracts: {},
//       ipfs: null
//     }

//     this.Init()
//   }

//   render() {
//     return (
//       <>
        
//         <Sidebar></Sidebar>
//         <Routes>
//           <Route exact path="/" element={<Home  webstate={this.state}/>}/>
//           <Route exact path="/login" element={<Login  webstate={this.state}/>}/>
//         </Routes>
//       </>
//     )
//   }
// }

export default App;
