import { Card, Grid, GridItem } from "@chakra-ui/react";
import { useUser } from "../api/api";
import Navbar from "../components/Navbar";

export default function ManagePage() {
    const { loading, user } = useUser();
    
    if (loading) return <></>;
    return (
        <>
            <Navbar />
            <Grid templateColumns="repeat(4, 1fr)">
                <GridItem colSpan={1}>
                    <Card width="100%" height="100%" borderRadius={0}>
                        navbar
                    </Card>
                </GridItem>
                <GridItem colSpan={3}>
                    manage
                </GridItem>
            </Grid>
        </>
    );
}