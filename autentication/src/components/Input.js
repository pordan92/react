import React from "react"
import classes from "./Input.module.css"

const Input = React.forwardRef((props, ref) => {
    return (
        <div className={classes.inputContainer}>
            <label className={classes.label} htmlFor={props.input.id}>{props.children}</label>
            {props.input.changeEvent ? <input className={`${classes.inputBar} ${props.input.validity===false ? classes.error : ""}`} ref={ref} {...props.input} onChange={props.onChange}></input> : <input className={`${classes.inputBar} ${props.input.validity && classes.error}`} ref={ref} {...props.input}></input>}
        </div>
    )
})

export default Input;
