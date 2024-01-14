import { Input } from "./Input";
import { UserButton } from "./UserButton";
import classes from "./form.module.css";

export const Form = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      {/* <label>Type your message</label>
      <input
        onChange={props.onChange}
        value={props.value}
      ></input> */}

      <div className={classes["form-container"]}>
        <div className={classes["input-field"]}>
          <Input
            onChange={props.onChange}
            value={props.value}
            label="Enter your text"
            id={Math.random()}
          ></Input>
        </div>
        <div className={classes["button-field"]}>
          <UserButton type="submit">Send Message</UserButton>
        </div>
      </div>
    </form>
  );
};
