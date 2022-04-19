import React, { useEffect, useState, useMemo } from 'react'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container  from 'react-bootstrap/esm/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Modal } from './Modal';
import { PetsCollection } from './PetsCollection';
import styled from 'styled-components'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Web3 from 'web3';

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



export const Header = (props) => {

    const[donation_amount, setDonation] = useState(0)


    const Donate = () => {

        props.contracts.Donation.deployed().then((instance) => {
            let DonationInstance = instance
            let wei = Web3.utils.toWei(donation_amount, 'ether')
            return DonationInstance.donate({from:props.account, value:wei})
            // return DonationInstance.donate({from:props.account, value:parseFloat(donation_amount)})
            // return DonationInstance.deposit(parseFloat(donation_amount), {from:props.account, value:parseFloat(donation_amount)})
        })

    }

    const popover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">Thank you for supporting us!</Popover.Header>
          <Popover.Body>
            <InputGroup size="sm" className="mb-3">
                <InputGroup.Text>ETH</InputGroup.Text>
                <FormControl onChange={e => setDonation(e.target.value)} aria-label="Dollar amount (with dot and two decimal places)" />
            </InputGroup>
            <Button variant="primary" size="sm" onClick={Donate}>
                Donate
            </Button>
          </Popover.Body>
        </Popover>
    );


    const ToggleModal = () => {
        props.setShowModal(prev => !prev);
    }

    return (
        <>
        <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="/">Pete's PetShop</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link onClick={ToggleModal}>Need Adoption?</Nav.Link>
                <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                    <Nav.Link >Donation</Nav.Link>
                </OverlayTrigger>
                <Nav.Link href="/history">Donation History</Nav.Link>
                
                {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown> */}
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        </>
    )
};