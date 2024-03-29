import { useState } from 'react';
import { Link } from 'react-router-dom';
import "./burger.css"


interface MenuItem {
  label: string;
  link: string;
}

interface HamburgerMenuProps {
  menuItems: MenuItem[];
}

function HamburgerMenu({ menuItems }: HamburgerMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div>
      <button className='burger-button' onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      {isMenuOpen && (
        <ul className='items'>
          {menuItems.map((item) => (
            <li className='list-item' key={item.label}>
              <Link to = {item.link} className="link">{item.label}</Link>
              {/* <a className="link" href={item.link}>{item.label}</a> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HamburgerMenu;
