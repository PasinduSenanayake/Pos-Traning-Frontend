const isPNum = (input)=>{
    if(input.substring(0,1)==="0"){
        input = input.substring(1);
    }
    let n = Math.floor(Number(input));
    return String(n) === input && n > 0;

};
export {isPNum}