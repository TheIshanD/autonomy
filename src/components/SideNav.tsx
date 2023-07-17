import { Flex, Icon, Link, Text, background, Heading,  } from "@chakra-ui/react";

import { FaRobot, FaRegCalendarAlt, FaListAlt, FaUserAlt } from "react-icons/fa";

import NextLink from 'next/link'


export default function SideNav(props: any) {
    const {pageIndex, setPageIndex} = props;
    return (
    <Flex bg="#EA5455" direction={["row","row","column","column"]} minH="100%" minW="100px" gap="30px" py={["0px","0px","30px","30px"]} justify={["center","center","start","start"]}>
        <Flex direction="column" align="center" justify="center" color={pageIndex==0?"black":"white"} p="5px" bg={pageIndex==0?"#E4DCCF":""} _hover={{background: "#F9F5EB", color: "black"}} onClick={()=>{setPageIndex(0)}} gap="10px">
            <Icon as={FaUserAlt} boxSize="50%"/>
            <Heading size="md" fontWeight="900">Profile</Heading>
        </Flex>

        <Flex direction="column" align="center" justify="center" p="5px" color={pageIndex==1?"black":"white"}  bg={pageIndex==1?"#E4DCCF":""} _hover={{background: "#F9F5EB", color: "black"}} onClick={()=>{setPageIndex(1)}} gap="10px">
            <Icon as={FaRegCalendarAlt} boxSize="50%"/>
            <Heading size="md" fontWeight="900">Calendar</Heading>
        </Flex>

        {/* <Flex direction="column" align="center" justify="center" p="5px" color={pageIndex==2?"black":"white"}  bg={pageIndex==2?"#E4DCCF":""} _hover={{background: "#F9F5EB", color: "black"}} onClick={()=>{setPageIndex(2)}}>
            <Icon as={FaListAlt} boxSize="50%"/>
            <Text>Tasks</Text>
        </Flex>

        <Flex direction="column" align="center" justify="center" p="5px" color={pageIndex==3?"black":"white"}  bg={pageIndex==3?"#E4DCCF":""}  _hover={{background: "#F9F5EB", color: "black"}} onClick={()=>{setPageIndex(3)}}>
            <Icon as={FaListAlt} boxSize="50%"/>
            <Text>Settings</Text>
        </Flex> */}
    </Flex>
    )
}
