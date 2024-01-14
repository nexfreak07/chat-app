import classes from "./interactonbutton.module.css";

export const InteractionButton = (props) => {

  return <button className={classes.btn} onClick={props.onClick}>{props.children}</button>;
};
