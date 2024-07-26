import { Card, Flex, Button, Popover, PopoverTrigger, Center, PopoverContent, PopoverArrow, PopoverBody, Image, Text, Divider, Link } from "@chakra-ui/react";
import { logout, useUser } from "../api/api";
import { Navigate } from "react-router-dom";

export default function Navbar() {
    const { loading, loggedIn, user } = useUser();
    if (loading) return <></>
    if (!loggedIn) return <Navigate to="/" replace />

    return (
        <Card w="100vw" h="64px" p="4px" borderRadius="0" zIndex="100" mb="4px">
        <Flex justifyContent="space-between" alignItems="center">
            <Button h="56px">
                <a href="/">
                    <Center>
                        <Image src="/invengory.png" height="48px" mr="8px" />
                        <Text fontSize="3xl" decoration="none">Invengory</Text>
                    </Center>
                </a>
            </Button>
            <Popover trigger="hover">
                <PopoverTrigger>
                    <Button h="56px">
                        <Center>
                            <Image src={user?.google_profile_photo_url} borderRadius="50%" h="32px" w="32px" mr="6px" referrerPolicy="no-referrer" />
                            <Text>{user?.full_name}</Text>
                        </Center>
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverBody>
                        <Flex alignItems="center" justifyContent="center">
                            <Image src={user?.google_profile_photo_url} borderRadius="50%" h="40px" w="40px" mr="6px" />
                            <Flex direction="column" w="100%">
                                <Text fontSize="lg">{user?.full_name}</Text>
                                <Text fontSize="lg" fontWeight="200">{user?.email}</Text>
                            </Flex>
                        </Flex>
                        <Divider my="4px" />
                        <Link href="/account"><Button w="100%" my="3px">Account Settings</Button></Link>
                        <Link href="/manage"><Button w="100%" my="3px">Manage Invengory</Button></Link>
                        <Button colorScheme="red" w="100%" my="3px" onClick={logout}>Logout</Button>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </Flex>
    </Card>
    )
}