import React from 'react'
import Header from '../../components/Header'
import ProductList from '../../components/ProductList'
import UncontrolledExample from '../../components/UncontrolledExample';



const HomePage = () => {

  return (
    <div>
      <Header/>
      <UncontrolledExample />
      <h3>HomePage</h3>
      <ProductList />
    </div>
  )
}

export default HomePage