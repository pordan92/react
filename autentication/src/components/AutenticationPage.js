import React, { useContext, useEffect } from "react";

import classes from "./AutenticationPage.module.css";
import { useState } from "react";
import LogIn from "./LogIn";
import SignIn from "./SignIn";
import AccountContext from "../storage/dataBase";


const AutenticationPage = (props) => {
    const [signInAppear, setSignInAppear] = useState(false)

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

    return(
    <div className={classes.background}>
      {<LogIn onChange={changeHandler} onSignIn={signInApperaHandler}/>}
      {signInAppear && <SignIn onClose={closingHandler}/>}
    </div>
  );
}

export default AutenticationPage;