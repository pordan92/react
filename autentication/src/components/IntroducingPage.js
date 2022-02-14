import { useContext, useState, useEffect } from "react"
import AccountContext from "../storage/dataBase"
import classes from "./IntroducingPage.module.css"

const IntroducingPage = (props) => {
    const [userName, setUserName] = useState("")
    const ctx = useContext(AccountContext)

    // useEffect(() => {
    //     setUserName(ctx.currentAccount.name)
    // })
    return <div className={classes.background}>
        <h1 className={classes.introducing}>Welcome {ctx.currentAccount.name}</h1>
        </div>
}

export default IntroducingPage;