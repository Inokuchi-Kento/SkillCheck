import { FC, MouseEventHandler, useState } from "react";
import "./styles.css";

type Props = {
    open: boolean;
    onClick: MouseEventHandler;
    controls: string;
    label: string;
};

export const ToggleButton = (props: Props) => {
    const {open, controls, label, onClick} = props;

    return(
        <button type="button"
            aria-controls={controls}
            aria-expanded={open}
            aria-label={label}
            onClick={onClick}
            className="toggleButon"
        >
            <span className="line-1"></span>
            <span className="line-2"></span>
        </button>
    )
}