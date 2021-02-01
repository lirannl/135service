import React, { forwardRef, RefObject, useEffect, useRef } from "react";

type refType = React.MutableRefObject<HTMLElement> | RefObject<HTMLElement>;

export function focusable<T>(
    PassedElemCreator: (props: T, ref: refType) => JSX.Element
) {
    return function Component(props: T & { focus: boolean }) {
        const ref = useRef({} as HTMLElement);
        const Elem = forwardRef((props, ref) =>
            PassedElemCreator(props as T, ref as refType));
        const { focus, ...otherProps } = props;
        useEffect(() => {
            if (focus)
                try {
                    ref.current.focus();
                } catch { }
        }, [focus]);
        return <Elem ref={ref} {...otherProps as unknown as T} />;
    };
} 