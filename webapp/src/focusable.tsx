import React, { ForwardRefExoticComponent, useEffect, useRef } from "react";

export function focusable<T>(PassedElem: (props: T) => JSX.Element | (ForwardRefExoticComponent<any> & { type: string, props: Object, key: any })) {
    return function Component(props: T & { focus: boolean }) {
        const ref = useRef({} as HTMLElement);
        const { focus, ...otherProps } = props;
        useEffect(() => {
            if (focus)
                try {
                    ref.current.focus();
                } catch { }
        }, [focus]);
        return <PassedElem ref={ref} {...((otherProps as unknown) as T)} />;
    };
} 