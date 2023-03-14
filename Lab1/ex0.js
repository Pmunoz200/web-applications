'use strict';

function ReduceString (str1){
    this.str1 = str1;

    if(str1.length <= 1){
        console.log('');
    }else{
        let string1 = str1.slice(0,2);
        let string2 = str1.slice(-2);
        console.log(string1.concat(string2));
    }
}


const try1 = new ReduceString('it');
const try2 = new ReduceString('cat');
const try3 = new ReduceString('spring')
