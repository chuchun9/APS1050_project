import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table'
import Web3 from 'web3';
import styled from 'styled-components'


const Title = styled.div`
    color: #7DC4E1;
    font-size:48px;
    text-align: center;
`

export const DonationHistory = (props) => {
    const [DonationsArr, setDonations] = useState([])
    useEffect(() => {
        props.contracts.Donation.deployed().then((instance) => {
            var DonationInstance = instance;
            return DonationInstance.getalldonations();
        }).then((result) => {
            console.log(result)
            setDonations(result)
        })
    },[]);
    
    const getColumns=() => {
        let items = DonationsArr.map((d, index) => {
            var utcSeconds = d.timestamp;
            console.log(utcSeconds)
            var date = new Date(0);
            date.setUTCSeconds(utcSeconds);
            console.log(date)
            return (
                <tr>
                    <td>{index+1}</td>
                    <td>{d.sender}</td>
                    <td>{Web3.utils.fromWei(d.value, 'ether')}</td>
                    <td>{date.toString()}</td>
                </tr>
            )
        })
        return items;
    };

    return (
        <>
            <Title>Thank everyone for their support!</Title>
            <Table striped bordered hover size="lg">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Amount (ETH)</th>
                    <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {getColumns()}
                </tbody>
            </Table>
        </>
    )
}
