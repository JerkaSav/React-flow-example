export const evaluateOperations = (
  allValuesFromNodes,
  valueToCompare,
  andOr
) => {
  let resultArray = [];
  allValuesFromNodes.forEach(({ operation, value }) => {
    switch (operation) {
      case "equal":
        return resultArray.push(value === valueToCompare);
      case "not equal":
        return resultArray.push(value !== valueToCompare);
      case "contains":
        return resultArray.push(valueToCompare.includes(value));
      case "not contains":
        return resultArray.push(!valueToCompare.includes(value));
      case "ends with":
        return resultArray.push(valueToCompare.endsWith(value));
      case "not ends with":
        return resultArray.push(!valueToCompare.endsWith(value));
      case "starts with":
        return resultArray.push(valueToCompare.startsWith(value));
      case "not starts with":
        return resultArray.push(!valueToCompare.startsWith(value));
      case "":
        return resultArray.push(false);
      default:
        return console.error(`ERR: operation ${operation} not implemented`);
    }
  });
  if (!andOr) {
    return resultArray.includes(false) ? false : true;
  } else {
    return resultArray.includes(true) ? true : false;
  }
};
