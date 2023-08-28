import Head from 'next/head'
import React, { useEffect } from 'react' 

import { 
  Button,
  Flex, FormControl, FormLabel, Heading, Input, Text, Box, Select, chakra, Image, Link
} from '@chakra-ui/react'
import SideNav from '@/components/SideNav'
import Header from '@/components/Header'
import { FaLess } from 'react-icons/fa'
import { ScheduleSlot, User } from '@/utils/types'

import NextLink from 'next/link'


export default function SignIn() {

    return (
        <Flex direction="column" width="100%" minH="100vh" bg="#E4DCCF" align="center">
            <Header loggedIn={false}/>

            <Flex direction="column" bg="white" p="50px" width="70%" border="3px solid black" mt="50px">
                <Heading size="2xl">Sign In</Heading>
                <Text fontSize="2xl" mt="20px">Gmail</Text>
                <Input type='email'/>
                <Text fontSize="2xl" mt="20px">Password</Text>
                <Input type='password'/>
                <Button colorScheme='teal' mt="20px">
                    Start Automating 🤖
                </Button>
                <Link as={NextLink} href='/sign-up'>
                    <Text fontSize="md" mt="10px" color="blue.600">New To Autonomy? Sign Up --&gt;</Text>
                </Link>
            </Flex>
        </Flex>
    )
}
