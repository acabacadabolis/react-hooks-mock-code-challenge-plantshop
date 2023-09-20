import React, { useState } from "react";

function NewPlantForm({ setPlants }) {

  const [formData, setFormData] = useState({
    "name": "",
    "image": "",
    "price": 0
  })

  function handleChange(event){
    setFormData(prev => {
      return {...prev, [event.target.name]:event.target.value}
    })
  }

  function handleSubmit(event){
    event.preventDefault()

    fetch('http://localhost:6001/plants',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData)
    })
    .then(resp => resp.json())
    .then(newData => setPlants(prev => [newData, ...prev]))

    
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Plant name" value={formData.name} onChange={handleChange} />
        <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} />
        <input type="number" name="price" step="0.01" placeholder="Price" value={formData.price} onChange={handleChange} />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
