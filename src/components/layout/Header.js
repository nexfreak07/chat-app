import classes from './Header.module.css'
import { InteractionButton } from "./InteractionButton";
export const Header = (props) => {
  return (<>
      <header className={classes.header}>
        
        <h1>Sky Chat</h1>

        { !props.isAuth &&  <InteractionButton onClick={props.onClick}>Sign in</InteractionButton>}
        {props.isAuth && <InteractionButton onClick={props.onClick}>Sign Out</InteractionButton>}
      </header>
  </>);
};
