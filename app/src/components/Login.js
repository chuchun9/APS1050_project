import styled from 'styled-components'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import React, { useState, useEffect} from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
  } from "react-router-dom";
  

  
const Background = styled.div`
    width: 100%;
    height: 90%;
    background: #e9ecef;
    position: fixed;
    display: flex;
    font-family: 'Plus Jakarta Sans', sans-serif;
`;

const MessageBox = styled.div`
    width: 50%;
    height: 100%;
    position: relative;
    text-align: center;
`
const Message = styled.div`
    top: 25%;
    left: 20%;
    width: 70%;
    height: 40%;
    position: relative;
`


const FormBox = styled.div`
    width: 50%;
    height: 100%;
    position: relative;
`

const FormWrapper = styled.div`
    top: 25%;
    left: 15%;
    width: 50%;
    height: 50%;
    padding-top: 15px;
    padding-left: 15px;
    padding-right: 15px;
    position: relative;
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
    background: white;
    border-radius: 25px;

`

const Title = styled.div`
    color: #7DC4E1;
    font-size:64px;

`

const Description = styled.div`
    font-size: 32px;
`

export const Login = (props) => {
    let navigate = useNavigate();
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        console.log(form)
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else {
            let email = form[0].value
            let username = form[1].value
            props.contracts.Pets.deployed().then((instance) => {
                let PetsInstance = instance
                return PetsInstance.registerUser(username, email, {from: props.account})
            }).then((result) => {
                navigate("/")
            }).catch((err) => {
                console.log(err)
            })
        }
        setValidated(true);

    }

    return (
        <>
        {props.account != null && props.contracts.hasOwnProperty('Pets') ? (
        <Background>
            <MessageBox>
                <Message>
                    <Title>Pete's PetShop</Title>
                    <Description>First time using Pete's Petshop? Register a nickname and email! We will not share your information without your consent!</Description>
                </Message>
            </MessageBox>
            <FormBox>
                <FormWrapper>

                
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control required type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Username</Form.Label>
                        <Form.Control required placeholder="Enter username/nickname" />
                        <Form.Text className="text-muted">
                        This will be your alias in our platform
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check required type="checkbox" label="Confirm" />
                    </Form.Group>
                    <Button variant="primary" type="submit" size='lg'>
                        Submit
                    </Button>
                </Form>
                </FormWrapper>
            </FormBox>
        </Background>
        ) : null}
        </>
        
    )
}