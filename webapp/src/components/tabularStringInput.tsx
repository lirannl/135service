import { makeStyles, TextField } from "@material-ui/core";
import React from "react";
import { stateObj } from "../utils";

const useStyles = makeStyles({
    form: { display: 'contents' },
    charInput: { textAlign: 'center', width: '2ch' },
    charField: { width: '1ch', borderInline: 'solid 1px #afafaf', display: 'table-cell' },
})

export const TabularStringInput = (props:
    {
        readonly maxLength: number, readonly autoFocus?: true | number,
        readonly value: stateObj<string>, readonly label?: JSX.Element
    }
) => {
    const classes = useStyles();
    const { value, maxLength } = props;
    const arr = Array.from(Array(maxLength).keys());
    return <form className={classes.form} onSubmit={(event) => event.preventDefault()}>
        {arr.map((i: number) => <TextField key={i}
            className={classes.charField}
            inputProps={{ className: classes.charInput }}
            defaultValue={value.value[i]}
            onFocus={event => { event.target.select() }}
            onBlur={event => {
                const elems =
                    Object.values((event.target as unknown as { form: HTMLFormElement }).form)
                        .slice(0, maxLength) as HTMLInputElement[];
                value.value = elems.map(elem => elem.value).join('');
            }}
            onChange={(event) => {
                const target = event.target as HTMLInputElement & { form: HTMLFormElement & HTMLInputElement[] };
                if (event.target.value === '') {
                    if (i > 0) { target.form[i - 1].focus(); target.form[i - 1].select(); }
                }
                else {
                    const allVals = [] as string[];
                    // Unicode-compatible split
                    for (const char of target.value) {
                        allVals.push(char);
                    }
                    const vals = allVals.slice(0, maxLength - 1);
                    vals.forEach((char, charIdx) => {
                        if (target.form[i + charIdx])
                            target.form[i + charIdx].value = char;
                    });
                    if (target.form[i + vals.length])
                        target.form[i + vals.length].focus();
                }
            }} />)}
        <button type="submit" style={{ visibility: "collapse" }} />
    </form>
}