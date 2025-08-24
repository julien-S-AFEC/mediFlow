import { useEffect, useState } from "react"
import { User } from "../../types"
import { snakeCaseToPretty } from '../../utils.tsx'

const UserAccount = () => {
    const [currentUser, setCurrentUser] = useState<User>()

    useEffect(() => {
        fetch("http://localhost:3000/api/auth/getCurrentUser", {
            method: "GET",
            headers: { "Content-type": "application/json" },
            credentials: 'include',
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then(data => setCurrentUser(data.user))
            .catch(error => console.log(error))
    }, [])

    return (
        <div className="d-flex justify-content-center align-items-center rounded-5 shadow p-5 main-font">
            {currentUser &&
                <form action="#">
                    <div key={currentUser.user_id} className="d-flex flex-column justify-content-center align-items-center gap-2">
                        <label htmlFor="">name</label>
                        <input type="text" value={currentUser.username} className="form-control"/>
                    </div>

                </form>}
        </div>
    )
}

export default UserAccount