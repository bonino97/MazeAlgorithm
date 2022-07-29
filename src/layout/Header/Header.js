import React from "react";
import "src/layout/Header/Header.css";

const image = require("src/assets/images/cookunity.png");

const Header = () => (
  <img className="image" src={image} alt="Cook Unity Logo" />
);

export default Header;
