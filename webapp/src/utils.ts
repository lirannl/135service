import { useState } from "react";

export function capitalise(input: string) {
    if (RegExp("[a-zA-Z]").test(input[0]))
        return input[0].toUpperCase() + input.substring(1, input.length);
    else return input;
}

export interface stateObj<T> {
    value: T;
    readonly set: React.Dispatch<React.SetStateAction<T>>;
}

export const useStateObj = function <T>(def: T): stateObj<T> {
    const [val, setVal] = useState(def);
    const tgt = {
        set: setVal,
        set value(v: T) {
            setVal(v);
        },
        get value(): T {
            // Reassign modified object
            if (typeof val === "object") {
                const valObj = val as unknown as T & object;
                return new Proxy(valObj, {
                    set: (_, p, value) => {
                        setVal(Object.assign({}, valObj, { [p]: value }));
                        return true;
                    }
                })
            }
            return val;
        }
    };
    return tgt;
}