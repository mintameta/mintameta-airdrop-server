const {BigNumber} = require('bignumber.js');


function BigNumberStr(num1, num2, col) {
  return new BigNumber(num1).dividedBy(Math.pow(10, num2)).toFixed(col, 1);
}
function BigNumberMul(num1, num2, col) {
  return new BigNumber(num1).multipliedBy(num2).toFixed(col,1);
}
function BigNumberDiv(num1, num2, col) {
  return new BigNumber(num1).dividedBy(num2).toFixed(col,1);
}
function BigNumberAdd(num1, num2, col) {
  return new BigNumber(num1).plus(num2).toFixed(col,1);
}
function BigNumberSub(num1, num2, col) {
  return new BigNumber(num1).minus(num2).toFixed(col,1);
}



module.exports = {
  BigNumberStr,
  BigNumberMul,
  BigNumberDiv,
  BigNumberAdd,
  BigNumberSub,
};
