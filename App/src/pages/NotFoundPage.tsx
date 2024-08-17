import { Center, Card, Text } from "@chakra-ui/react";
import ParticlesBG from "../components/Particles";

export default function NotFoundPage() {
    return (
        <>
            <ParticlesBG />
            <Center h="100vh">
                <Card h="50%" w={{base: "80%", md: "65%", lg: "50%"}} bgColor="rgba(45, 55, 72, 0.8)" backdropFilter="auto" backdropBlur="4px">
                    <Center h="100%">
                        <span>
                            <Center>
                                <img src="/openchest.png" width="50%" height="50%" />
                            </Center>
                            <Text fontSize="6xl" align="center">404</Text>
                            <Text fontSize="xl" align="center">The requested page could not be found.</Text>
                        </span>
                    </Center>
                </Card>
            </Center>
        </>
    )
}