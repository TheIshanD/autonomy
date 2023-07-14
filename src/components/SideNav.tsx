import { Flex, Icon, Link, Text, background } from "@chakra-ui/react";

import { FaRobot, FaRegCalendarAlt, FaListAlt, FaUserAlt } from "react-icons/fa";

import NextLink from 'next/link'


export default function SideNav(props: any) {
    const {pageIndex, setPageIndex} = props;
    return (
    <Flex bg="brand.200" direction="column" minH="100%" minW="100px" gap="30px" py="30px">
        <Flex direction="column" align="center" justify="center" p="5px" bg={pageIndex==0?"whitesmoke":""} _hover={{background: "brand.300"}} onClick={()=>{setPageIndex(0)}}>
            <Icon as={FaUserAlt} boxSize="50%"/>
            <Text>Profile</Text>
        </Flex>

        <Flex direction="column" align="center" justify="center" p="5px" bg={pageIndex==1?"whitesmoke":""} _hover={{background: "brand.300"}} onClick={()=>{setPageIndex(1)}}>
            <Icon as={FaRegCalendarAlt} boxSize="50%"/>
            <Text>Calendar</Text>
        </Flex>

        <Flex direction="column" align="center" justify="center" p="5px" bg={pageIndex==2?"whitesmoke":""} _hover={{background: "brand.300"}} onClick={()=>{setPageIndex(2)}}>
            <Icon as={FaListAlt} boxSize="50%"/>
            <Text>Tasks</Text>
        </Flex>

        <Flex direction="column" align="center" justify="center" p="5px" bg={pageIndex==3?"whitesmoke":""}  _hover={{background: "brand.300"}} onClick={()=>{setPageIndex(3)}}>
            <Icon as={FaListAlt} boxSize="50%"/>
            <Text>Settings</Text>
        </Flex>
    </Flex>
    )
}
