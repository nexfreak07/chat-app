import { Text } from "./Text";
import classes from "./Texts.module.css";
import { Card } from "./layout/Card";
export const Texts = (props) => {
  return (
    <>
    <Card>
      <div className={classes["text-body"]}>
        <div className={classes["text-heading"]}>
          <h1>You're Enrolled in : {props.room}</h1>
        </div>
        <div>
          {props.texts.map((message) => (
            <Text message={message}></Text>
          ))}
        </div>
      </div>
      </Card>
    </>
  );
};
