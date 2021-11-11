import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });
  const url = "http://localhost:3001/pets"

  function onChangeType(e) {
    console.log(e.target.value)
    setFilters({type: e.target.value})
  }

  function onFindPetsClick() {
    if (filters.type === "all"){
      fetch(url)
        .then(r => r.json())
        .catch(error => console.error(error))
        .then(data => setPets([...data]))
    } else{
      fetch(url + `?type=${filters.type}`)
      .then(r => r.json())
      .catch(error => console.error(error))
      .then(data => setPets([... data]))
    }
  }

  function onAdoptPet(id) {
    const oneAdopted = pets.map(pet =>{
      if (pet.id === id){
        const adopted = {...pet, isAdopted: true}
        return adopted
      } else{
        return pet
      }
    })
    setPets([...oneAdopted])

    // const configObj = {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json"
    //   }, 
    //   body: JSON.stringify({isAdopted: true})
    // }

    // fetch(url + `/${id}`, configObj)
    // .then(r => r.json())
    // .catch(error => console.error(error))
    // .then(data => {
    //   const oneAdopted = pets.map(pet =>{
    //     if (pet.id === data.id){
    //       return data;
    //     } else{
    //       return pet;
    //     }
    //   })
    //   setPets([...oneAdopted])
    // })
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={onChangeType} onFindPetsClick={onFindPetsClick}/>
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={onAdoptPet}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
