import { useState } from "react";

export function capitalise(input: string) {
    if (RegExp("[a-zA-Z]").test(input[0]))
        return input[0].toUpperCase() + input.substring(1, input.length);
    else return input;
}

export interface stateObj<T> {
    value: T;
    set: React.Dispatch<React.SetStateAction<T>>;
}

export const useStateObj = function <T>(def: T): stateObj<T> {
    const [val, setVal] = useState(def);
    return { value: val, set: setVal };
}