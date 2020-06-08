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

export const getTimeBeforeString = timestamp => {
  const current = Date.now();
  let diff = Math.floor(current / 1000) - timestamp; // seconds

  const getPluralString = number => (number === 1 ? '' : 's');

  if (diff < 60) {
    return `${diff} second${getPluralString(diff)} ago`;
  }

  diff = Math.floor(diff / 60);

  if (diff < 60) {
    return `${diff} minute${getPluralString(diff)} ago`;
  }

  diff = Math.floor(diff / 60);

  if (diff < 24) {
    return `${diff} hour${getPluralString(diff)} ago`;
  }

  diff = Math.floor(diff / 24);

  if (diff < 30) {
    return `${diff} day${getPluralString(diff)} ago`;
  }

  diff = Math.floor(diff / 30);

  if (diff < 12) {
    return `${diff} month${getPluralString(diff)} ago`;
  }

  diff = Math.floor(diff / 12);

  return `${diff} year${getPluralString(diff)} ago`;
};
