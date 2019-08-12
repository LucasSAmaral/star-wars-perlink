import React from "react";

const InputText = props => {
  return (
    <input
      onKeyUp={props.searchText}
      type="text"
      placeholder={props.placeholderText}
      name="search"
      id="search"
    />
  );
};

export default InputText;
