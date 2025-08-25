// var fun=(num)=>console.log(num)

// var add=(a,b)=>{ return a+b;}

// var greet=(name)=>{ return "Hello, "+ name;}

// var square=(a)=>{ return a*a;}

// console.log(add(2,3));

// console.log(greet("Harshit"));

// console.log(square(8));

// Javascript functions is first calss citizens
// we can store function into a variable 
//// we can pass finction as  a parameter
///// we can pass it as return value
// hoisting access before declare
// function are hoisted

// function add(a,b){
//     return a+b
// }
// let sum=add;
// function avg(a,b,fn){
//     return fn(a,b)/2
// }
// console.log(avg(30,20,sum))
// var add=(a,b)=>{return a+b}
// let ad=add
// var sub=(a,b)=>{return a-b}
// let s=sub
// var mul=(a,b)=>{return a*b}
// let m=mul
// var div=(a,b)=>{return a/b}
// let d=div

// function cal(a,b,ad,s,m,d){
//     console.log(ad(a,b));
//     console.log(s(a,b));
//     console.log(m(a,b));
//     console.log(d(a,b));
// }
// cal(4,2,ad,s,m,d)
function powerfunction(exponent){
    console.log(exponent)
    return function expo(a)
    { console.log(a)
        return a**exponent;
    }
}

let sq=powerfunction(4)
console.log(sq(2))