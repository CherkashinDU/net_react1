import React, {useState} from 'react';
import './App.css';
import {userData} from './userData.js';


const data = userData.map(item => {
  return {
    name: item.name,
    age: item.age,
    gender: item.gender,
    balance: item.balance,
    picture: item.picture,    
    id: item._id
  }
})

const UserCard = (props) => {  
  console.log(props)
  return (
    <li>Name: {props.userData.name}<br /> 
      Age: {props.userData.age}&nbsp;
     Gender: {props.userData.gender}&nbsp;
     Balance: {props.userData.balance}&nbsp;
     <picture>
      <source srcSet={props.userData.picture} media="(min-width: 600px)"/>
      <img src={props.userData.picture} alt={props.userData.name}/>
      </picture>
      <hr />
    </li>
  )
}

function App() {
  const [state, setState] = useState([...data])

  const handleChange = (event) => {
    const result = [];
    data.forEach(user => {
       if(user.name.toLowerCase().includes(event.target.value.toLowerCase())){
         result.push(user)
       }
    });
    setState(result)
  }

  const handleSort = (event) => {
    const sortType = event.target.value;
    if (sortType){    
    const newState = [...state]
      .sort((a,b) => sortType === 'asc' ? a.age - b.age : b.age - a.age)
     setState(newState)
    }
    else
    {      
      const sortedList = [...state]
        .sort((a, b) => data.findIndex(i => i.id === a.id) - data.findIndex(i => i.id === b.id))
      setState(sortedList)
    }
  }

 const handleClearFilter = (event) => {
  setState([...data])
 }

  return (
    <div className="App">
      <form action="">
      <input type="text" placeholder="Enter text..." onChange={handleChange}/>
      <select onChange={handleSort}>        
        <option value="">None</option>
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>&nbsp;      
      <button type='reset' onClick={handleClearFilter}>Clear Filter</button>
      </form>
          <ul>
          {state.map(user => <UserCard key={user.id} userData={user}/> )}
        </ul>
    </div>
  );
}

export default App;
