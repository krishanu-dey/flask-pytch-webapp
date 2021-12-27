import React from "react";
import { withinSite } from "../utils";
import { Link } from "./LinkWithinApp";

const versionTag = process.env.REACT_APP_VERSION_TAG;

const NavBanner = () => {
  return (
    <div className="NavBar">
      <div className="title-and-version">
        <Link to="/">
          <h1>Flask From Scratch</h1>
        </Link>
        <p className="version-tag">
          <a href={withinSite("/doc/releases/changelog.html")}>{versionTag}</a>
        </p>
      </div>
      <ul>
        <a href={withinSite("/doc/index.html")}>
          <li>Help</li>
        </a>
        <Link to="/tutorials/">
          <li>Tutorials</li>
        </Link>
        <Link to="/my-projects/">
          <li>My projects</li>
        </Link>
      </ul>
    </div>
  );
};

export default NavBanner;
