export function intoPairs (arr) {
  const newArr = [];

  for (let i = 0; i < arr.length; i = i + 2) {
    const smallArr = [];

    smallArr.push(arr[i]);

    if (typeof arr[i + 1] !== 'undefined') {
      smallArr.push(arr[i + 1]);
    }

    newArr.push(smallArr)
  }

  return newArr;

}
