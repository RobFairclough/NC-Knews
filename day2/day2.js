const petTally = arr =>
  arr.reduce((all, one) => {
    one in all ? all[one]++ : (all[one] = 1);
    return all;
  }, {});

const arr = ["dog", "dog", "cat", "cat", "rabbit"];

console.log(petTally(arr));
