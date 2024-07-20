import { useEffect, useRef } from "react"
import { API_BASE } from "./api";
import { redirect } from "react-router-dom";
import { mutate } from "swr";

function LoginPage() {
    const googleButton = useRef(null);


    const handleGoogleToken = (token_obj: any) => {
        console.log(token_obj)

        fetch(
            API_BASE + "/api/auth/google_token",
            {
                method: "POST",
                body: JSON.stringify(token_obj)
            }
        ).then(() => {
            mutate("/api/auth/whoami")
            redirect("/")
        })

    }

    useEffect(() => {
        const script_src = "https://accounts.google.com/gsi/client";
        const app_id = "704337629590-gtncj62j5tpnkn9mg8h6amsn84al14lc.apps.googleusercontent.com";

        const script = document.createElement("script");
        script.src = script_src;
        script.async = true;
        script.onload = () => {
            google.accounts.id.initialize({
                client_id: app_id,
                callback: handleGoogleToken
            });
            google.accounts.id.renderButton(
                googleButton.current,
                { theme: "outline", size: "large" }
            );
        }
        document.body.appendChild(script);

        return () => {
            const scriptTag = document.querySelector(`script[src="${script_src}"]`);
            if (scriptTag) document.body.removeChild(scriptTag);
        }
    }, []);

    return (
        <>
            <div ref={googleButton}></div>
        </>
    )
}

export default LoginPage