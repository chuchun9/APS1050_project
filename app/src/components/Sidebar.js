import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
  
export const Sidebar = ({webstate}) => {

  return (
    <div>
        <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/top10">Top10</Link>
            </li>
            <li>
              <Link to="/donation">Donation</Link>
            </li>
            <li>
              <Link to='/adopted'>Your Adopted Pets</Link>
            </li>
    
        </ul>

        
    </div>
  )
}
