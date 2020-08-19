function test(){
    console.log("Hello World");
}

test();


var numbers = [-1, 3, 56, 2, -2, 48, 5];

// function double (x){
//     return x * 2;
// }

// const newNumbers = numbers.map(double);
// const newNumbers = numbers.map( (x) =>
//     (x * 2)
// );


// const newNumbers = numbers.filter( (x) =>
//     (x > 48)
// );


// console.log (newNumbers);

// var numbers = [];

// newNumbers.forEach(function(x){
//     if (x > 48){
//      numbers.push(x);
//     }
// });

// console.log(numbers);

// const newNumbers = numbers.reduce( (acc, curretnNumber) =>
//     (acc + curretnNumber)
// );

// var newNumbers = 0;
// numbers.forEach(function (currentNum) {
//     newNumbers += currentNum;
// })

// var max = 0;
// numbers.forEach(function (currentNum) {
//     if (currentNum > max){
//         max = currentNum;
//     } else {
//         currentNum = max;    }
// })

// console.log (max);


var min = numbers[0];
numbers.forEach(function (currentNum) {
    if (currentNum < min){
        min = currentNum;
    } else {
        currentNum = min;    }
})

console.log (min);


// let x = 2;

// var add = (function () {
//     var counter = 0;
//     return function () {counter += 1; return counter}
//   })();
  
//   add();
//   add();
//   add();

//   console.log(add());

var add = {
    counter: 1,
    inc: function (num){
     return this.counter + num;
    }
    
}
  

  console.log(add.inc(4));