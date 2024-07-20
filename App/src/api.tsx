import { mutate } from "swr";

export const API_BASE = "";

export const fetcher = (...args) => fetch(...args).then(res => res.json())

export const logout = () => {
    fetch(
        API_BASE + "/api/auth/logout",
        {
            method: "POST"
        }
    ).then(() => {
        mutate("/api/auth/whoami")
    })

}