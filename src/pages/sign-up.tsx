import Head from 'next/head'
import React, { useEffect } from 'react' 

import NextLink from 'next/link'

import { 
  Button,
  Flex, FormControl, FormLabel, Heading, Input, Text, Box, Select, chakra, Image, Link
} from '@chakra-ui/react'
import SideNav from '@/components/SideNav'
import Header from '@/components/Header'
import { FaLess } from 'react-icons/fa'
import { ScheduleSlot, User } from '@/utils/types'


export default function SignUp() {

    return (
        <Flex direction="column" width="100%" minH="100vh" bg="#E4DCCF" align="center">
            <Header loggedIn={false}/>

            <Flex direction="column" bg="white" p="50px" width="70%" border="3px solid black" mt="50px">
                <Heading size="2xl">Sign Up</Heading>
                <Text fontSize="2xl" mt="20px">Gmail</Text>
                <Input type='email'/>
                <Text fontSize="2xl" mt="20px">Password</Text>
                <Input type='password'/>
                <Text fontSize="2xl" mt="20px">Confirm Password</Text>
                <Input type='password'/>
                <Button colorScheme='teal' mt="20px">
                    Start Automating 🤖
                </Button>
                <Link as={NextLink} href='/sign-in'>
                    <Text fontSize="md" mt="10px" color="blue.600">Already have an account? Sign In Here --&gt;</Text>
                </Link>
            </Flex>
        </Flex>
    )
}
