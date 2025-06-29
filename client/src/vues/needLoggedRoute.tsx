import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

import Connexion from "./connexion";

type Iprops = {
    children: ReactNode;
}

const NeedLogginRoute = ({ children }: Iprops) => {

    const navigate = useNavigate()
    useState(() => {
        fetch('http://localhost:3000/api/auth/isConnected', { method: "GET", headers: { "Content-type": "application/json" }, credentials: "include" })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then(state => {
                if (!state.isConnected) {
                    navigate('/')
                }
            })
            .catch(error => {
                console.log(error);
            })
    }, [])


    return <>{children}</>
}

export default NeedLogginRoute