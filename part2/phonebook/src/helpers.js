export const isAdded = (newName, persons) => {
  // TODO: Use a Map instead for O(1)
  for (let i = 0; i < persons.length; i++) {
    if (persons[i].name === newName) {
      return true;
    }
  }

  return false;
};

export const getPersonByName = (name, persons) => {
  // TODO: Use a Map instead for O(1)
  return persons.filter((p) => p.name === name)[0];
};
