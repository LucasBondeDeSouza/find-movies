import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { toast } from "react-toastify";
import { useUserContext } from "../../contexts/UserContext";

export default () => {
    const navigate = useNavigate();
    const { setUser } = useUserContext()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const { data: userDoc } = await axios.post("/users/login", {
                email,
                password
            })

            setUser(userDoc)
            navigate("/")
        } catch (err) {
            toast.error(err.response.data, {
                position: "top-right",
                autoClose: 3000,
                theme: "dark"
            })
            setEmail('')
            setPassword('')
        }
    }

    return (
        <div className="bg-[#111] text-white">
            <section className="h-screen w-full flex flex-col justify-center items-center">
                <div className="max-w-96 flex flex-col items-center gap-4 w-full">
                    <h1 className="text-3xl font-bold text-red-600">Faça seu login</h1>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
                        <input 
                            type="email"
                            className="w-full rounded-lg border px-4 py-2"
                            placeholder="Digite seu e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <input 
                            type="password"
                            className="w-full rounded-lg border px-4 py-2"
                            placeholder="Digite sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <button className="w-full rounded-lg bg-blue-600 font-bold px-4 py-2 cursor-pointer">
                            Entrar
                        </button>
                    </form>

                    <p>Ainda não tem uma conta? <Link to={'/register'} className="underline font-semibold">Registre-se aqui!</Link></p>
                </div>
            </section>
        </div>
    )
}