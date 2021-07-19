import React, { useState, useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import Pagination from './components/pagination';
const axios = require('axios');

const url = 'http://universities.hipolabs.com/search?country='

function App() {
  const [value, setValue] = useState('')
  const [resp, setResp] = useState([]);
  const options = useMemo(() => countryList().getData(), []) 

  const changeHandler = value => { 
    console.log(`Option selected:`, value.label) ;  
    resp.splice(0, resp.length)    
    var x = '' ;

    for (var i = 0; i < value.label.length; i++) 
    if(value.label[i] === ' ') x += '+' ; 
    else x += value.label[i] ;

    const uri = url + x

    axios.get(uri)
    .then(function (response) { 
      var temp = resp.concat(response.data) 
      setResp(temp) ; 
    })
    .catch(function (error) {
      console.log(error);
    }) ;
    setValue(value) 
  }

  return (
    <div>  
      <div> 
        <h2 style={{textAlign:'center'}}> Countrywise Universities list with its domains </h2>
      </div>
     {value === '' ? (<h1 style={{textAlign:'center'}}> Select a Country </h1>) : ''}
      <Select options={options} value={value} onChange={changeHandler} />
      {value !== '' ? (<h1 style={{textAlign:'center'}}> Country : {value.label} </h1>) : ''} 
      {value !== '' && resp.length === 0 && <h2 style={{textAlign:'center'}}> No Results Found </h2>}
      {resp.length !== 0 &&  <Pagination data = {resp} /> }
    </div>
  )
  
}

export default App