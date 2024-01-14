import classes from './UserButton.module.css';

export const UserButton = (props) => {
  return (
    <div className={classes.align}>
      <button className={classes.button} onClick={props.enterRoom ? props.enterRoom : null} type={"submit" ? "submit" : null}>
        {props.children}
      </button>
    </div>
  );
};
