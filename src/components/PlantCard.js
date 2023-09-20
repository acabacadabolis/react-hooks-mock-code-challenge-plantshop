import React, {  useState } from "react";

function PlantCard({ id, name, image, price, setPlants }) {

  const [isStock, setIsStock] = useState(true)
  const [edit, setEdit] = useState(false)

  function handleClick(event){
    setIsStock(prev => !prev)
  }

  function handleEdit(){
    setEdit(prev => !prev)
  }

  function handleSubmit(event){
    event.preventDefault()
    const newPrice = event.target.price.value
    fetch(`http://localhost:6001/plants/${id}`,{
      method:'PATCH',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({['price']:parseInt(newPrice)})
    })
    .then(resp => resp.json())
    .then(upData => setPlants(prev => 
      prev.map(plant => {
        return id === plant.id ? upData : plant})
    ))
  }

  function handleDelete (event){
    fetch(`http://localhost:6001/plants/${id}`,{
      method:'DELETE'
    })
    .then(resp => resp.json())
    .then(data => setPlants(prev => 
      prev.filter(plant => {
        return id !== plant.id
      })))
  }

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {isStock ? (
        <button className="primary" onClick={handleClick} >In Stock</button>
      ) : (
        <button onClick={handleClick} >Out of Stock</button>
      )}
      {edit? (
        <form onSubmit={handleSubmit}>
          <input type="text" name="price" placeholder={price} onBlur={handleEdit} ></input>
        </form>
      ) : (
        <button onClick={handleEdit}>Edit</button>
      )}
      <button onClick={handleDelete}>Remove</button>
    </li>
  );
}

export default PlantCard;
