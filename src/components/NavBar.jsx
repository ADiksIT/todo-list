import React from "react";

export const NavBar = () => {
  return (
      <nav>
        <div className="nav-wrapper pl-pr-3">
          <a href="/" className="brand-logo">TO-DO APP</a>
          <ul id="nav-mobile" className="right">
            <li><a href="https://github.com/ADiksIT">GitHub</a></li>
          </ul>
        </div>
      </nav>
  )
}
