import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Private = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            const token = sessionStorage.getItem("token")
            if (!token) {
                navigate("/login")
                return
            }
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile`, {
                headers: { 
                    "Content-Type": "application/json", 
                    "Authorization": `Bearer ${token}` 
                }
            })
            const data = await res.json()
            if (!res.ok) {
                sessionStorage.removeItem("token")
                navigate("/login")
                return
            }
            setUser(data)
        }
        fetchUser()
    }, [])

    const handleLogout = () => {
        sessionStorage.removeItem("token")
        navigate("/login")
    }

    if (!user) return <p>Loading user info...</p>

    return (
        <div className="container mt-5">
            <h1>Usuario loggeado</h1>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Nombre:</strong> {user.name}</p>
            <button className="btn btn-danger mt-3" onClick={handleLogout}>Logout</button>
        </div>
    )
}
