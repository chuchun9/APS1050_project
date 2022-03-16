import React from 'react'
import data from '../data/pets.json'
import Row from 'react-bootstrap/Row';
import { Pet } from './Pet';
export const PetsCollection = () => {
    const columnsPerRow = 4;

    const getColumnsForRow =()=>{
        let items = data.map((pet) => {
            return ( 
                <Pet pet={pet}/>
            );
   
      });
      return items;
    };


    return (
        <div>
            <Row xs={1} md={columnsPerRow}>
                {getColumnsForRow()}
            </Row>
        </div>  
    )
}
