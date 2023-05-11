const arrayShift = (arr, itemValue, newPosition) => {
  const item = arr.splice(arr.indexOf(itemValue), 1)[0];
  switch (newPosition) {
    case 'start':
    case 0:
      arr.unshift(item);
      break;
    case 'end':
      arr.push(item);
      break;
    default:
      arr.splice(newPosition, 0, item);
      break;
  }

  return arr;
};

export default arrayShift;
