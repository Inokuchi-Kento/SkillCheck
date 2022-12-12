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
      <Link to={'/SkillCheck/menu'}>メニュー</Link>
        <li>管理者</li>
      <LogOut/>
      <Link to={'/SkillCheck'}>ログアウト</Link>
      </ul>
    </nav>
  );
};
