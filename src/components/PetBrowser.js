import React from "react";

import Pet from "./Pet";

function PetBrowser({pets, onAdoptPet}) {
  const petCards = pets.map(pet => <Pet pet={pet} onAdoptPet={onAdoptPet} key={pet.id}/>)
  return <div className="ui cards">{petCards}</div>;
}

export default PetBrowser;
