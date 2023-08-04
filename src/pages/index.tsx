import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect } from 'react' 

import { 
  Button,
  Flex, FormControl, FormLabel, Heading, Input, Text, Box, Select, chakra
} from '@chakra-ui/react'
import SideNav from '@/components/SideNav'
import Header from '@/components/Header'
import LoggedIn from '@/components/LoggedIn'

export default function Home() {

  const [loggedIn, setLoggedIn ] = React.useState(true);

  const user = {
    sleepTime: 46,
    wakeTime: 14,
    goals: [],
    routines: [],
    unscheduledTasks:[],
    scheduledTasks: [], // Not fully integrated yet
  }

  return (
    <Flex direction="column" bgColor="brand.100" minH="100vh" align="center">
      {!loggedIn && 
        <Box width="100%">

          <Heading>Please Log In</Heading>
        </Box>
      }

      {loggedIn && <LoggedIn user={user} />}
    </Flex>
  )
}
