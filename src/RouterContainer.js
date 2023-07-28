import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import { Signup } from './Signup'
import Signup from './Signup'
import Table from './Table'
export default function RouterContainer() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Signup />} />
                    <Route path='/Signup' element={<Signup />} />
                    <Route path='/Table' element={<Table />} />

                </Routes>
            </BrowserRouter>
        </>

    )
}
