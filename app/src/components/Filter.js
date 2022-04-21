import React, { useEffect, useState } from 'react'
import data from '../data/pets.json'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import { Pet } from './Pet';
import styled from 'styled-components'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
const FilterBox = styled.div`
    width: 60%;
    min-height: 60px;
    margin-left: 10px;
    margin-bottom: 10px;
    background: #fff;
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding-top: 10px;
    padding-left: 5px;
    padding-right: 5px;
`

export const Filter = (props) => {

    const handleSearch = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        let breed = form[0].value
        let age = form[1].value
        if (age == "") {
            age = -1
        }
        else {
            age = parseInt(age)
        }

        props.contracts.Pets.deployed().then((instance) => {
            var PetInstance = instance;
            return PetInstance.getSelectedPets(breed, age);
        }).then((result) => {
            result.map((x) => {
                x.likes = new Set(x.likes)
            })
            console.log(result)
            props.setPets(result)
        })


    }

    return (
        <>
        <FilterBox>
        <Form onSubmit={handleSearch}>
        <Row className="align-items-center">
            <Col xs="auto">
            <InputGroup className="mb-2">
                <InputGroup.Text>Breed</InputGroup.Text>
                <FormControl id="inlineFormInputGroup" placeholder="french bulldog" />
            </InputGroup>
            </Col>
            <Col xs="auto">

            <InputGroup className="mb-2">
                <InputGroup.Text>Age</InputGroup.Text>
                <FormControl id="inlineFormInputGroup" placeholder="1" />
            </InputGroup>
            </Col>
            <Col xs="auto">
            </Col>
            <Col xs="auto">
            <Button type="submit" className="mb-2">
                Search
            </Button>
            </Col>
        </Row>
        </Form>


        </FilterBox>
        </>
    )

}