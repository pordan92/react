import { useContext, useReducer, useRef, useState } from "react";
import AccountContext from "../storage/dataBase";
import Modal from "./Modal";
import classes from "./SignIn.module.css"
import Input from "./Input";
import buttonClasses from "./Login.module.css"

const ErrorMessage = (props) => {
    let message = ""
    if(!props.validity && props.id === "name"){
        message = "Chosen name is already taken!"
    }
    if(!props.validity && props.id === "mail"){
        message = "Chosen e-mail is already taken!"
    }
    if(!props.validity && props.id === "pass"){
        message = "Chosen password does not have at least 6 characters!"
    }
    if(!props.validity && props.id === "passConf"){
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
            validMail: action.data.filter(acc => acc.mail === action.value).length === 0 && action.value.includes("@")
        };
    }
    if (action.type === "PASSWORD_&_VALIDATE") {
        //TODO: regex for validPass
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

            ctx.addAccount({
                name: loginParams.enteredName,
                mail: loginParams.enteredMail,
                password: loginParams.enteredPassword
            })
            props.onClose()
        }
        else {
            nameRef.current.value = ""
            mailRef.current.value = ""
            passRef.current.value = ""
            confRef.current.value = ""

            alert("Name: at least 1 character\nE-mail: contains '@' character\nPassword: minimum 6 character\n")
            //ha talál egyező mail címet akkor validMail = false (+1 if a reducer-be type: MODIFY_"valid(megfelelő változó név)")
            //ha pass+mail páros már létezik
            // ha nincs mail && ha nincs mail+pass páros ? feltöltés : 
            //ULTIMATE: reducerbe beleírni a dataBase-ben keresést is (mail check in dataBase + new typeIf: mail+pass check in submit)

            //useEffect minden eshetőségre új változókkal + refek használata hiba kiírásra, input validity = új változók
        }
    }



    return (
        <Modal onClose={props.onClose}>
            <form onSubmit={submitHandler}>
                <ErrorMessage validity={loginParams.validName} id="name"/>
                <Input ref={nameRef} input={{ type: "text", id: "name", placeholder: "Account name", changeEvent: true, validity: loginParams.validName }} onChange={nameHandler}>Name:</Input>
                <ErrorMessage validity={loginParams.validMail} id="mail"/>
                <Input ref={mailRef} input={{ type: "email", id: "mail", placeholder: "E-mail", changeEvent: true, validity: loginParams.validMail }} onChange={mailHandler}>E-mail:</Input>
                <ErrorMessage validity={loginParams.validPass} id="pass"/>
                <Input ref={passRef} input={{ type: "password", id: "pass", placeholder: "Password", changeEvent: true, validity: loginParams.validPass }} onChange={passwordHandler}>Password:</Input>
                <ErrorMessage validity={loginParams.validConfPass} id="passConf"/>
                <Input ref={confRef} input={{ type: "password", id: "passConf", placeholder: "Confirm Password", changeEvent: true, validity: loginParams.validConfPass }} onChange={passwordConfHandler}>Confirm Password:</Input>
                
                <div className={buttonClasses.buttonContainer}><button className={buttonClasses.button} type="submit">Register</button></div>
            </form>
        </Modal>
    )
}

export default SignIn;