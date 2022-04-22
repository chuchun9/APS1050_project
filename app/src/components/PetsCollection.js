import React, { useEffect, useState } from 'react'
import data from '../data/pets.json'
import Row from 'react-bootstrap/Row';
import { Pet } from './Pet';
import { Filter } from './Filter';
import Container from 'react-bootstrap/esm/Container';
export const PetsCollection = (props) => {
    const columnsPerRow = 4;
    const [PetsArr, setPets] = useState([])
    const [likes, setLikes] = useState([])

    useEffect(() => {
        props.contracts.Pets.deployed().then((instance) => {
            var PetInstance = instance;
            return PetInstance.getPets();
        }).then((result) => {
            result.map((x) => {
                x.likes = new Set(x.likes)
            })
            console.log(result)
            setPets(result)
        })
    },[]);


    const getColumnsForRow=() => {
        let items = PetsArr.map((p, idx) => {
            // console.log(PetsArr[idx], props.user.liked.has(p.id))
            return (
                <Pet user={props.user} contracts={props.contracts} account={props.account} PetsArr={PetsArr} setPets={setPets} setUser={props.setUser} idx={idx}> </Pet>
                
            )
        })
        return items;
    };

    return (
        
        <div>
            {!props.showModal || Object.keys(props.user).length == 0?
            
            <div>
                <Container>
                    <Filter contracts={props.contracts} account={props.account} PetsArr={PetsArr} setPets={setPets}></Filter>

                    <Row xs={1} md={columnsPerRow}>
                        {getColumnsForRow()}
                    </Row>  
                </Container>
                  
            </div>
            : null
            }
        </div>
    )
}
