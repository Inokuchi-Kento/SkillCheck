import { FC, useState } from "react";
import { ToggleButton } from "./ToggleButton";
import { Navigation } from "./Navigation";
import "./styles.css";
import logo from "../icons/smallLogo.png"

export function Header(){
  const [open, setOpen] = useState(false);
  const toggleFunction = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <header className = "header">
      <ToggleButton
        open={open}
        controls="navigation"
        label="メニューを開きます"
        onClick={toggleFunction}
      />
      <Navigation id="navigation" open={open} />
      {/* <img src={logo} className="logo"></img> */}
    </header>
  );
};


