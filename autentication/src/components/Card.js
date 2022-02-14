import classes from "./Card.module.css";

const Card = props => {

    return props.login ? <div className={classes.card + " " + classes.login}>{props.children}</div> : <div className={classes.card}>{props.children}</div>
}

export default Card;