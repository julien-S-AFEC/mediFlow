import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Iprops = {
    children: ReactNode;
}

const NeedLogginRoute: React.FC<Iprops> = ({ children }) => {

    const navigate = useNavigate()
    useEffect(() => {
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