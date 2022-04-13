import React, { useEffect, useState } from 'react'
import data from '../data/pets.json'
import Row from 'react-bootstrap/Row';
import { Pet } from './Pet';


export const PetsCollection = (props) => {
    const columnsPerRow = 4;
    const [PetsArr, setPets] = useState([])
    useEffect(() => {
        props.contracts.Pets.deployed().then((instance) => {
            var PetInstance = instance;
            return PetInstance.getPets();
        }).then((result) => {
            setPets(result)
        })
    },[]);

    const getColumnsForRow=() => {
        let items = PetsArr.map((p) => {
            return (
                <Pet contracts={props.contracts} account={props.account} pet={p} liked={props.user.liked.has(p.id)}> </Pet>
            )
        })
        return items;
    };

    return (
        <div>
            {!props.showModal || Object.keys(props.user).length == 0?
            <Row xs={1} md={columnsPerRow}>
                {getColumnsForRow()}
            </Row>
            : null
            }
        </div>  
    )
}
