import { useState } from "react";
import AutenticationPage from "./components/AutenticationPage";
import IntroducingPage from "./components/IntroducingPage";

function App() {

  const [logInCompleted, setLogInCompleted] = useState(false)

  const completionHandler = () => {
    setLogInCompleted(true)
  }

  return (
    <>
    {!logInCompleted && <AutenticationPage onComp={completionHandler}/>}
    {logInCompleted && <IntroducingPage/>}
    </>
  );
}

export default App;
