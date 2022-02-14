import React, { useContext, useEffect } from "react";

import classes from "./AutenticationPage.module.css";
import { useState } from "react";
import LogIn from "./LogIn";
import SignIn from "./SignIn";
import AccountContext from "../storage/dataBase";


const AutenticationPage = (props) => {
    const [signInAppear, setSignInAppear] = useState(false)
    
    // const [userName, setUserName] = useState("")

    const ctx = useContext(AccountContext)
    const closingHandler = () => {
        setSignInAppear(false)
    }

    const signInApperaHandler = () => {
        setSignInAppear(true)
    }

    const changeHandler = () => {
        props.onComp()
    }

    // useEffect(() => {
    //     setUserName(ctx.currentAccount.name)
    // })

    return(
    <div className={classes.background}>
      {<LogIn onChange={changeHandler} onSignIn={signInApperaHandler}/>}
      {signInAppear && <SignIn onClose={closingHandler}/>}
      {/* {logInCompleted && <h1>Hello {userName}</h1>} */}
    </div>
  );
}

export default AutenticationPage;