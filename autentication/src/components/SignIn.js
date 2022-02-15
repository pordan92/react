import { useContext, useEffect, useReducer, useRef, useState } from "react";
import AccountContext from "../storage/dataBase";
import Modal from "./Modal";
import classes from "./SignIn.module.css"
import Input from "./Input";
import buttonClasses from "./Login.module.css"

const ErrorMessage = (props) => {
    let message = ""
    if(props.id === "name"){
        props.sintact.trim().length === 0 ? 
        message = "Name has to be at least 1 character!" :
        message = "Chosen name is already taken!"
    }
    if(props.id === "mail"){
        !props.sintact.includes("@", ".") ?
        message = "E-mail address has to contain '@' and '.' characters!" :
        message = "Chosen e-mail is already taken!"
    }
    if(props.id === "pass"){
        message = "Chosen password does not have at least 6 characters!"
    }
    if(props.id === "passConf"){
        message = "Passwords are not identical!"
    }

    return <div className={classes.ErrorMessage}>
        <p className={classes.message}>{message}</p>
    </div>
}

const paramReducer = (state, action) => {
    if (action.type === "MAIL_&_VALIDATE") {
        return {
            ...state,
            enteredMail: action.value,
            validMail: action.data.filter(acc => acc.mail === action.value).length === 0 && action.value.includes("@") && action.value.trim().length > 0
        };
    }
    if (action.type === "PASSWORD_&_VALIDATE") {
        return {
            ...state,
            enteredPassword: action.value,
            validPass: action.value.trim().length > 6 
        }
    }
    if (action.type === "ACCNAME_&_VALIDATE") {
        return {
            ...state,
            enteredName: action.value,
            validName: action.data.filter(acc => acc.name === action.value).length === 0 && action.value.trim().length > 0
        }
    }
    if (action.type === "CONFPASS_&_VALIDATE") {
        return {
            ...state,
            enteredConfPassword: action.value,
            validConfPass: action.value === state.enteredPassword
        }
    }

    if (action.type === "MAIL_X_PASS") {
        return {
            ...state,
            validMail: false,
            validPass: false
        }
    }
}

const SignIn = (props) => {
    const ctx = useContext(AccountContext)
    const [inputRefresh, setInputRefresh] = useState(false)

    const nameRef = useRef()
    const mailRef = useRef()
    const passRef = useRef()
    const confRef = useRef()

    const [loginParams, dispatchLoginParams] = useReducer(paramReducer, {
        enteredName: "",
        enteredMail: "",
        enteredPassword: "",
        enteredConfPassword: "",
        validMail: null,
        validPass: null,
        validConfPass: null,
        validName: null,
    })

    const mailHandler = (event) => {
        dispatchLoginParams({ value: event.target.value, data: ctx.dataBase, type: "MAIL_&_VALIDATE" })
    }

    const passwordHandler = (event) => {
        dispatchLoginParams({ value: event.target.value, data: ctx.dataBase, type: "PASSWORD_&_VALIDATE" })
    }

    const nameHandler = (event) => {
        dispatchLoginParams({ value: event.target.value, data: ctx.dataBase, type: "ACCNAME_&_VALIDATE" })
    }

    const passwordConfHandler = (event) => {
        dispatchLoginParams({ value: event.target.value, type: "CONFPASS_&_VALIDATE" })
    }

    const submitHandler = (event) => {
        event.preventDefault()

        console.log(loginParams.validMail, loginParams.validPass, loginParams.validName, loginParams.validConfPass)

        if (loginParams.validMail && loginParams.validPass && loginParams.validName && loginParams.validConfPass) {
            //TODO: loginParams.enetered változók ellenőrzése (üres v nem)
            ctx.addAccount({
                name: loginParams.enteredName,
                mail: loginParams.enteredMail,
                password: loginParams.enteredPassword
            })
            props.onClose()
        }
        else {
            console.log(loginParams.validMail, loginParams.validPass, loginParams.validName, loginParams.validConfPass)
            setInputRefresh(true)
            }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setInputRefresh(false)
        }, 4000)
        return () => clearTimeout(timer)
    },[inputRefresh])

    return (
        <Modal onClose={props.onClose}>
            <form onSubmit={submitHandler}>
                {inputRefresh && !loginParams.validName ? <ErrorMessage id="name" sintact={nameRef.current.value}/> : ""}
                <Input ref={nameRef} input={{ type: "text", id: "name", placeholder: "Account name", changeEvent: true, validity: loginParams.validName }} onChange={nameHandler}>Name:</Input>
                {inputRefresh && !loginParams.validMail ? <ErrorMessage id="mail" sintact={mailRef.current.value}/> : ""}
                <Input ref={mailRef} input={{ type: "email", id: "mail", placeholder: "E-mail", changeEvent: true, validity: loginParams.validMail }} onChange={mailHandler}>E-mail:</Input>
                {inputRefresh && !loginParams.validPass ? <ErrorMessage id="pass" sintact={passRef.current.value}/> : ""}
                <Input ref={passRef} input={{ type: "password", id: "pass", placeholder: "Password", changeEvent: true, validity: loginParams.validPass }} onChange={passwordHandler}>Password:</Input>
                {inputRefresh && !loginParams.validConfPass ? <ErrorMessage id="passConf" sintact={confRef.current.value}/> : ""}
                <Input ref={confRef} input={{ type: "password", id: "passConf", placeholder: "Confirm Password", changeEvent: true, validity: loginParams.validConfPass }} onChange={passwordConfHandler}>Confirm Password:</Input>
                
                <div className={buttonClasses.buttonContainer}><button className={buttonClasses.button} type="submit">Register</button></div>
            </form>
        </Modal>
    )
}

export default SignIn;