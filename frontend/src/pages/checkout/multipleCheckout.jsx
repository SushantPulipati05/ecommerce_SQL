import React from 'react'
import Navbar from '../../components/Navbar'
import Footer  from '../../components/Footer'

function MultipleCheckout() {
  return (
    <div className='flex flex-col min-h-screen'>
        <Navbar />
        <h1 className='flex-grow'>
            multiple checkout page through cart
        </h1>
        <Footer />
    </div>
  )
}

export default MultipleCheckout