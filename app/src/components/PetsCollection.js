import React, { useEffect, useState } from 'react'
import data from '../data/pets.json'
import Row from 'react-bootstrap/Row';
import { Pet } from './Pet';

export const PetsCollection = ({webstate, showModal}) => {
    const columnsPerRow = 4;
    const [PetsArr, setPets] = useState([])

    useEffect(() => {
        webstate.contracts.Pets.deployed().then((instance) => {
            var PetInstance = instance;
            return PetInstance.getPets();
        }).then((result) => {
            setPets(result)
        })
    },[]);

    const getColumnsForRow=() => {
        let items = PetsArr.map((p) => {
            return (
                <Pet pet={p}></Pet>
            )
        })
        return items;
    };
    console.log(PetsArr)

    return (
        <div>
            {!showModal?<Row xs={1} md={columnsPerRow}>
                {getColumnsForRow()}
            </Row>: null
            }
        </div>  
    )
}
