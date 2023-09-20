import React, {  useState } from "react";

function PlantCard({ name, image, price }) {

  const [isStock, setIsStock] = useState(true)

  function handleClick(event){
    setIsStock(prev => !prev)
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
    </li>
  );
}

export default PlantCard;
