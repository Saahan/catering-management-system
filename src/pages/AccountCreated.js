import React from 'react';
import "../styles/main.css";

export default function AccountCreated() {
  return (
    <div className='text-center'>
        <h2 style={{marginTop:"50px"}}>Account created successfully, <a className='return-link' href='/'>click here</a> to return to login page</h2>
    </div>
  )
}