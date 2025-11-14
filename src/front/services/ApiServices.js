export const login = async (userData) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
    const data = await response.json()
    if (!response.ok){
        alert(data.msg)
        return
    }
    localStorage.setItem("token", data.token)
    return data
}

export const signup = async (userData) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })

    const data = await response.json()

    if (!response.ok) {
        alert(data.msg)
        return
    }

    // Si tu backend devuelve token después de crear el usuario:
    localStorage.setItem("token", data.token)

    return data
}


// export const token = async () => {
//     const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             "Autorization": `Bearer ${localStorage.getItem("token")}`
//         },
//     })
//     const data = response.json()
//     console.log(data);
    
// }