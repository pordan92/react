// import React, { useContext, useEffect } from "react";
// import SignIn from "./components/SignIn";
// import {AccountContextProvider} from "./storage/dataBase";
import { useState } from "react";
// import LogIn from "./components/LogIn";
// import AccountContext from "./storage/dataBase";
import AutenticationPage from "./components/AutenticationPage";
import IntroducingPage from "./components/IntroducingPage";

function App() {
  // const [signInAppear, setSignInAppear] = useState(false)
  // const [logInCompleted, setLogInCompleted] = useState(false)
  // const [userName, setUserName] = useState("")
  // const ctx = useContext(AccountContext)
  const [logInCompleted, setLogInCompleted] = useState(false)

  // const closingHandler = () => {
  //   setSignInAppear(false)
  // }

  // const signInApperaHandler = () => {
  //   setSignInAppear(true)
  // }

  // const changeHandler = () => {
  //   setLogInCompleted(true)
  // }

  // useEffect(() => {
  //   console.log(ctx.currentAccount)
  //   setUserName(ctx.currentAccount.name)
  // })
  const completionHandler = () => {
    setLogInCompleted(true)
  }

  return (
    // <>
    //   {!logInCompleted && <LogIn onChange={changeHandler} onSignIn={signInApperaHandler}/>}
    //   {signInAppear && <SignIn onClose={closingHandler}/>}
    //   {logInCompleted && <h1>Hello {userName}</h1>}
    // </>
    <>
    {!logInCompleted && <AutenticationPage onComp={completionHandler}/>}
    {logInCompleted && <IntroducingPage/>}
    </>
  );
}

export default App;
