import { useState } from "react";
import { ToggleButton } from "./ToggleButton";
import { Navigation } from "./Navigation";

export function Header(){
    const [open, setOpen] = useState(false);

    const toggleFunction = ()=> {
        setOpen((prevState) => !prevState);
    }

    return(
        <header className="header">
            <ToggleButton open={open}
                controls="navigation"
                label="メニューを開きます"
                onClick={toggleFunction}
            />
            <Navigation id="navigation" open={open} />
        </header>
    )
}
