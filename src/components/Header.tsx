import { Button, Flex, Heading, Icon, Spacer, Text, background, Link } from "@chakra-ui/react";
import NextLink from 'next/link'

import { FaRobot, FaRegCalendarAlt, FaListAlt, FaSmile } from "react-icons/fa";

export default function Header(props : { loggedIn: boolean }) {

    const { loggedIn } = props;

    return (
    <Flex bg="#002B5B" direction="row" minW="100%" gap="30px" color="white" minH="60px" align="center">

        <Link as={NextLink} href='/'>
            <Flex direction="row" align="center" justify="center" gap="10px" pl="25px">
                <Icon as={FaRobot} boxSize="30px"/>
                <Heading fontWeight="900" fontSize="xl">Autonomy AI</Heading>
            </Flex>
        </Link>


        <Spacer />

        {loggedIn &&
            <Button colorScheme="orange" m="10px">
                Log Out
            </Button>
        }
    </Flex>
    )
}
