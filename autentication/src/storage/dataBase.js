import React from "react"
import { useState } from "react"

const AccountContext = React.createContext({
    dataBase: [],
    currentAccount: {},
    addAccount: () => {},
    currentAccountHandler: () => {}
})

export const AccountContextProvider = props => {
    const [dataBase, setDataBase] = useState([])
    const [currentAccount, setCurrentAccount] = useState({})

    const AddCurrentAccount = (accMail, accPassword) => {
        setCurrentAccount(dataBase.find(accData => accData.mail === accMail && accData.password === accPassword))
        console.log(dataBase.find(accData => accData.mail === accMail && accData.password === accPassword))
    }
    console.log(currentAccount)
    const addAccountHandler = (item) => {
        setDataBase((prevData) => {
            return [
                ...prevData, item
            ]
        })
    }

    return <AccountContext.Provider value={{dataBase: dataBase, currentAccount: currentAccount, addAccount: addAccountHandler, currentAccountHandler: AddCurrentAccount}}>
        {props.children}
    </AccountContext.Provider>
}

export default AccountContext