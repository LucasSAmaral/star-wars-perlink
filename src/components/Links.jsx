import React from "react";
import { Link } from "react-router-dom";

const Links = props => {
  return (
    <Link
      onMouseEnter={props.selectIndex}
      className="result__links"
      to={props.path}
    >
      {props.text}
    </Link>
  );
};

export default Links;
