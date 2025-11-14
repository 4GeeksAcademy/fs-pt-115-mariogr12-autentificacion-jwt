import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Login = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({ email: "", password: "" })

    const handleChange = (e) => setUserData({ ...userData, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!userData.email || !userData.password) {
            alert("Todos los campos son obligatorios")
            return
        }
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        })
        const data = await response.json()
        if (!response.ok) {
            alert(data.msg)
            return
        }
        sessionStorage.setItem("token", data.token)
        navigate("/private")
    }

    return (
        <div className="container mt-5">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Email address</label>
                    <input type="email" className="form-control" name="email" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}
