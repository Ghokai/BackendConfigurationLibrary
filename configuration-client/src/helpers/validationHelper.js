export const isInteger = str => {
  //  console.log(str);
  var n = Math.floor(Number(str));
  return n !== Infinity && String(n) === str;
};

export const isDouble = str => {
  var floatRegex = /^-?\d+(?:[.,]\d*?)?$/;
  if (!floatRegex.test(str)) return false;

  let val = parseFloat(str);
  if (isNaN(val)) return false;
  return true;
};

export const isBoolean = str => {
  if (str === "True" || str === "False") {
    return true;
  }
  return false;
};
