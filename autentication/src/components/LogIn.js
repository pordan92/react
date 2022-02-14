import { useContext } from "react";
import { useRef } from "react/cjs/react.development";
import Card from "./Card";
import AccountContext from "../storage/dataBase";
import Input from "./Input";
import classes from "./Login.module.css";

const LogIn = (props) => {
    const ctx = useContext(AccountContext)
    const mailRef = useRef("")
    const passRef = useRef("")

    const filteredAccountList = (mail, password) => {
        const result = ctx.dataBase.filter(elementObject =>
            elementObject.mail === mail && elementObject.password === password
        )
        return (result)
    }

    const submitHandler = (event) => {
        event.preventDefault()
        if (filteredAccountList(mailRef.current.value, passRef.current.value).length > 0) {
            ctx.currentAccountHandler(mailRef.current.value, passRef.current.value)
            props.onChange()
        }
        else {
            alert("Wrong e-mail address or password")
        }
    }

    return (
        <Card login={true}>
            <form onSubmit={submitHandler}>
                <Input ref={mailRef} input={{ type: "email", id: "mail", placeholder: "E-mail" }}>E-mail:</Input>
                <Input ref={passRef} input={{ type: "password", id: "pass", placeholder: "Password" }}>Password:</Input>
                <div className={classes.buttonContainer}>
                    <button className={classes.button} type="submit">Log In</button>
                    <button className={classes.button} type="reset" onClick={props.onSignIn}>Register</button>
                </div>
            </form>
        </Card>
    )
}

export default LogIn;