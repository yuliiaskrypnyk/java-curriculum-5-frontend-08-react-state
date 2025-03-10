import {NavLink} from "react-router";
import "./Header.css"

export default function Header () {
    return (
        <header>
            <nav>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/characters">Characters</NavLink></li>
                    <li><NavLink to="/characters/add">Add Character</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}