import React, { useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import styled from 'styled-components'

const FormWrapper = styled.div`
    margin-top: 15px;
    margin-right: 80px;
    margin-left: 80px;

`

export const AdoptionForm = (props) => {
    const [validated, setValidated] = useState(false);
    const [img_url, setImgurl] = useState(null)
    const [loadfile, setLoad] = useState(false)

    async function captureFile (event) {
        event.preventDefault()
        setLoad(true)
        const file = event.target.files[0]
        const added = await props.ipfs.add(file)
        const img_url = `https://ipfs.infura.io/ipfs/${added.path}`
        setImgurl(img_url)
    }

    useEffect(() => {
      setLoad(false)
      console.log(img_url)
    }, [img_url])
    


    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false || img_url == null || loadfile) {
            event.stopPropagation();
            
        }
        else {
            let petName = form[0].value
            let petAge = form[1].value
            let petBreed = form[2].value
            let petAddress = form[3].value
            let city = form[4].value
            let province = form[5].value
            let zip = form[6].value
            let full_address = petAddress + ";" + city + ";" + province + ";" + zip

            props.contracts.Pets.deployed().then((instance) => {
                let PetsInstance = instance
                return PetsInstance.addPet(petAge, petName, img_url, petBreed, full_address, {from: props.account})
            }).then((result) => {
                window.location.reload();
            }).catch((err) => {
                console.log(err)
            })

        }
        setValidated(true);
    };
    
    
    return (
        <div>
            <h3 className="text-center">Welcom to our platform!</h3>
        <FormWrapper>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="PetName">
            <Form.Label column sm={2}>
            Your Pet's Name
            </Form.Label>
            <Col>
            <Form.Control required size="lg" type="text" placeholder="Please Enter your pet's name" />
            </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="PetAge">
            <Form.Label column sm={2}>
            Age
            </Form.Label>
            <Col>
            <Form.Control required type="text" placeholder="Please Enter your pet's age" />
            </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="PetBreed">
            <Form.Label column sm={2}>
            Breed
            </Form.Label>
            <Col>
            <Form.Control required type="text" placeholder="Please Enter your pet's breed" />
            </Col>
        </Form.Group>
        
        <Form.Group as={Row} className="mb-3" controlId="PetAddress">
            <Form.Label column sm={2}>
            Address
            </Form.Label>
            <Col>
            <Form.Control required type="text" placeholder="1234 Main St" />
            </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="Location">
            <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control required />
                </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Province</Form.Label>
                <Form.Select>
                    <option>Ontario</option>
                    <option>British Columnbia</option>
                </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control required />
            </Form.Group>
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload a picture of your pet</Form.Label>
            
            <Form.Control required type="file" onChange={captureFile}/>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
            <Col>
            <Button type='submit'>Submit</Button>
            </Col>
        </Form.Group>

        </Form>
        </FormWrapper>
        </div>
        
    )
}
