import useSWR, { mutate } from "swr"
import { User } from "./types";

export const fetcher = (url: string) => fetch(url).then(res => res.json())

export const logout = () => {
    fetch(
        "/api/auth/logout", { method: "POST" }
    ).then(() => {
        mutate("/api/auth/whoami");
        window.location.replace("/");
    })
}

export function useUser() {
    const {data, mutate, isLoading} = useSWR("/api/auth/whoami", fetcher);

    return {
        loading: isLoading,
        loggedIn: data?.error !== "Not Authenticated.",
        user: data as User,
        mutate
    }
}