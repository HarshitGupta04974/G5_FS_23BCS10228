const obj={
    Fname:'Abhay',
    Lnmae:'Kr',
    checkattendance:function(){
        console.log('Present')
    },
    obj1:{
        uid:1,
        Course:'Btech'
    }
}
console.log(obj.checkattendance())
delete obj.Fname
console.log(obj.Fname)
// Synchronus to call stack(All are executed) and a synchronus to web api(where execution is done)
// after waiting web api will send it to the queue
// event loop will check if the stack is empty or not and if empty it will send to the stack
// event loop will also check the queue how many fucntions are there.
// call stack->sync function
// queue->async
//web api->dom api ,asyc fucntion


// Function
// parameter in the func signature
// arguments when func call
function display(num=20){
    
    console.log(num);
    return 30;
}
console.log(display(10));

// priority to the data passing

// Anyonmus function no name
var fun=function(num){
    console.log(num);
    return 30;
}
// Arrow function
var fun=(num)=>console.log(num)