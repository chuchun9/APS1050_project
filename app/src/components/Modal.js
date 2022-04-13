import React, {useRef, useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import { MdClose } from 'react-icons/md';
import { useSpring, animated } from 'react-spring';
import { AdoptionForm } from './AdoptionForm';
const Background = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
`;
  
const ModalWrapper = styled.div`
    width: 800px;
    height: 500px;
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
    background: #fff;
    color: #000;
    display: grid;
    position: relative;
    z-index: 10;
    border-radius: 10px;
`;
  
  
const CloseModalButton = styled(MdClose)`
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    width: 32px;
    height: 32px;
    padding: 0;
    z-index: 10;
`;

export const Modal = (props) => {
    const modalRef = useRef();

    const animation = useSpring({
        config: {
            duration: 250
        },
        opacity: props.showModal ? 1 : 0,
        transform: props.showModal ? `translateY(0%)` : `translateY(-100%)`
    });

    const closeModal = e => {
        if (modalRef.current === e.target) {
            props.setShowModal(false);
        }
    };

    return (
        <>
        {props.showModal ? (
            <Background onClick={closeModal} ref={modalRef}>
            <animated.div style={animation}>
                <ModalWrapper showModal={props.showModal}>
                    <AdoptionForm ipfs={props.ipfs} contracts={props.contracts} account={props.account}></AdoptionForm>
                    <CloseModalButton
                        aria-label='Close modal'
                        onClick={() => props.setShowModal(prev => !prev)}
                    />
                </ModalWrapper>
            </animated.div>
            </Background>
        ) : null}
        </>
    );
}
  