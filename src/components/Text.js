import classes from './text.module.css';

export const Text = (props) => {
    return (
        <div key={props.message.id} className={classes.text}>
          <div className={classes["text-font"]}>
            <span>
              <h4 className={classes.user}>{props.message.user + " :"}</h4>
            </span>
            <div className={classes.message}>
            {props.message.text}
            </div>
          </div>
          <div></div>
        </div>
      )
};