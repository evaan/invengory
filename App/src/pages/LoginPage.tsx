import { Card, Center, Text } from "@chakra-ui/react";
import ParticlesBG from "../components/Particles";
import { useUser } from "../api/api";
import { Navigate } from "react-router-dom";
import GoogleLogin from "../components/GoogleLogin";

export default function LoginPage() {
    const { loading, loggedIn } = useUser();
    if (loading) return<></>
    if (loggedIn) return <Navigate to="/browse" replace />

    return (
        <>
            <ParticlesBG />
            <Center h="100vh">
                <Card h="50%" w={{base: "80%", md: "65%", lg: "50%"}} bgColor="rgba(45, 55, 72, 0.8)" backdropFilter="auto" backdropBlur="4px">
                    <Center h="100%">
                        <span>
                            <Center>
                                <img src="/invengory.png" width="25%" height="25%" />
                            </Center>
                            <Text fontSize="6xl" align="center">Invengory</Text>
                            <Text fontSize="xl" align="center">Welcome to Invengory! Please login with Google below to get started.</Text>
                            <Center mt="16px">
                                <GoogleLogin />
                            </Center>
                        </span>
                    </Center>
                </Card>
            </Center>
        </>
    )
}