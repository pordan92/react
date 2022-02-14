import React from "react"
import classes from "./Input.module.css"

const ErrorMessage = (props) => {
    let message = ""
    if(!props.validity && props.id === "name"){
        message = "Chosen name is already taken!"
    }
    if(!props.validity && props.id === "mail"){
        message = "Chosen e-mail is already taken!"
    }
    if(!props.validity && props.id === "pass"){
        message = "Chosen password does not have at least 6 characters"
    }
    if(!props.validity && props.id === "passConf"){
        message = "Passwords are not identical"
    }

    return <div className={classes.ErrorMessage}>
        <p>{message}</p>
    </div>
}

const Input = React.forwardRef((props, ref) => {
//TODO: berakni az error classt
    return (
        <div className={classes.inputContainer}>
            <label className={classes.label} htmlFor={props.input.id}>{props.children}</label>
            {props.input.changeEvent ? <input className={`${classes.inputBar} ${props.input.validity===false ? classes.error : ""}`} ref={ref} {...props.input} onChange={props.onChange}></input> : <input className={`${classes.inputBar} ${props.input.validity && classes.error}`} ref={ref} {...props.input}></input>}
            {/* <ErrorMessage id={props.input.id} validity={props.input.validity}/> */}
        </div>
    )
})

export default Input;
