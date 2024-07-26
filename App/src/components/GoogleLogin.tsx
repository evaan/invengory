import { useEffect, useRef } from "react";
import { mutate } from "swr";
import "../styles.css";

function GoogleLogin() {
    const googleButton = useRef(null);

    const handleGoogleToken = (token_obj: unknown) => {
        console.log(token_obj);
        fetch("/api/auth/google_token", {
            method: "POST",
            body: JSON.stringify(token_obj)
        }).then(() => {
            mutate("/api/login/whoami");
            window.location.replace("/browse")
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
                { theme: "filled_black", size: "large" }
            );
        }
        document.body.appendChild(script);
    }, []);

    return (
        <div style={{ overflow: "hidden", borderRadius: 5 }}>
            <div ref={googleButton}/>
        </div>
    )
}

export default GoogleLogin