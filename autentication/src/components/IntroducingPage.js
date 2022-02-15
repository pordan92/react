import { useContext, useState, useEffect } from "react"
import AccountContext from "../storage/dataBase"
import classes from "./IntroducingPage.module.css"

const IntroducingPage = (props) => {
    const ctx = useContext(AccountContext)

    return <div className={classes.background}>
        <h1 className={classes.introducing}>Welcome {ctx.currentAccount.name}</h1>
        </div>
}

export default IntroducingPage;