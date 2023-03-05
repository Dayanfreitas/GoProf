import React, { createContext, useContext, useState, useEffect} from "react";
import AuthActions from "../actions/Auth";

const AccessContext = createContext();

export default function AccessProvider({ children }) {
    const [currentUser, setCurrentUser] = useState({})

    const loadCurrentUser = async () => {
        const authActions = AuthActions();
        const user = await authActions.getUser();
        setCurrentUser(user)
    }

    useEffect(() => {
        loadCurrentUser();
    }, [])

    return <AccessContext.Provider value={
        {
            setCurrentUser,
            currentUser,
        }
    }>{ children }</AccessContext.Provider>;
}

export function useAccess() {
    const context =  useContext(AccessContext);
    const { currentUser, setCurrentUser } = context

    return { currentUser, setCurrentUser }
}

export const FormAdminControl = (props) => {
    const context = useContext(AccessContext);
    const isAdmin = context?.currentUser?.permission

    return (
        isAdmin ?
            (props && props.children) ?
                props.children 
            : ""
        : ''
    ) 
}

export const FormNotAdminControl = (props) => {
    const context = useContext(AccessContext);
    const isAdmin = context?.currentUser?.permission

    return (
        !isAdmin ?
            (props && props.children) ?
                props.children 
            : ""
        : ''
    )
} 



export const FormAuthControl = (props) => {
    const context = useContext(AccessContext);
    const auth = context?.currentUser?.id || false

    return (
        auth ?
            (props && props.children) ?
                props.children 
            : ""
        : ''
    ) 
}

export const FormNotAuthControl = (props) => {
    const context = useContext(AccessContext);
    const auth = context?.currentUser?.id || false

    return (
        !auth ?
            (props && props.children) ?
                props.children 
            : ""
        : ''
    ) 
}