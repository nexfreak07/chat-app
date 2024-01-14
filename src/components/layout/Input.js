import React from "react";
import classes from "./Input.module.css";

// -- Forward Ref is used if we are doing in Component of Input, but for <input> tag no need of Forward Ref
export const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes["input-field"]}>
      
      <input ref={ref}  required value={true ? props.value : null} onChange={props.onChange? props.onChange : null} ></input>
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
});
