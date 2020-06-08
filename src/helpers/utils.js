export const objectWithoutKey = (myObj, deleteKey) => {
  deleteKey = String(deleteKey);
  return Object.keys(myObj)
    .filter(key => key !== deleteKey)
    .reduce((result, current) => {
      result[current] = myObj[current];
      return result;
    }, {});
};

export const addKeyToObject = (obj, key, addKey) => {
  return {
    ...obj,
    [key]: addKey,
  };
};

export const arrayWithoutElement = (arr, element) => {
  return arr.filter(elem => elem !== element);
};

export const addElementToArray = (arr, element) => {
  return arr.indexOf(element) === -1 ? [...arr, element] : arr;
}; 