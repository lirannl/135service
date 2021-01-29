//@ts-nocheck
export function capitalise(input){
    if (RegExp("[a-zA-Z]").test(input[0]))
    return input[0].toUpperCase() + input.substring(1, input.length);
    else return input;
}