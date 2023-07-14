import { Button, Flex, Heading, Icon, Spacer, Text, background } from "@chakra-ui/react";

import { FaRobot, FaRegCalendarAlt, FaListAlt, FaSmile } from "react-icons/fa";

export default function Header(props : any) {

    return (
    <Flex bg="lightgray" direction="row" minW="100%" gap="30px">
        <Flex direction="row" align="center" justify="center" p="5px" gap="10px">
            <Icon as={FaRobot} boxSize="30px"/>
            <Heading fontWeight="900" fontSize="xl">Autonomy AI</Heading>
        </Flex>

        <Spacer />

        <Button colorScheme="orange" m="10px">
            Log Out
        </Button>
    
    </Flex>
    )
}
