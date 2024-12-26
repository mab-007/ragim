import React from 'react'
import { Route, Routes } from "react-router-dom";
import ChatInterface from '../pages/chatinterface.page';


export default function Mainroutes() {


  return (
    <div >
      <div>
        <Routes>
          <Route path="/" element={<ChatInterface username={'Amar nath'} />} />
        </Routes>
      </div>
    </div>
  )
}
