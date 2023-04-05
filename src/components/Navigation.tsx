import { FC } from "react";
import { Link } from "react-router-dom"
import {LogOut} from "./LogOut"
import "./styles.css";

type Props = {
  open: boolean;
  id: string;
};

export const Navigation: FC<Props> = ({ open, id }) => {
  return (
    <nav id={id} aria-hidden={!open} className="navigation">
      <ul>
        <li> <Link to={'/SkillCheck'}>メニュー</Link></li>
        <li><Link to={'/SkillCheck/Edit'}>技能評価</Link></li>
        {/* <li><LogOut/></li> */}
      </ul>
    </nav>
  );
};
