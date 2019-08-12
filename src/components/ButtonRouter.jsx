import React from "react";
import { Link } from "react-router-dom";

const ButtonRouter = props => {
  return (
    <Link className="button" to={props.path}>
      {props.text}
    </Link>
  );
};

export default ButtonRouter;
