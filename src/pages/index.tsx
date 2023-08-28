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
import LoggedOut from '@/components/LoggedOutComponents/LoggedOut'
import { User } from '@/utils/types'

export default function Home() {

  const [loggedIn, setLoggedIn ] = React.useState(true);

  const authenticate = ( username : string, password : string): void =>{
    setLoggedIn(true)
  }

  const user: User = {
    sleepTime: 46,
    wakeTime: 14,
    goals: [],
    routines: [],
    unscheduledTasks:[],
    scheduledTasks: [],
  }

  return (
    <Flex direction="column" bgColor="brand.100" minH="100vh" align="center">
      {!loggedIn && 
        <LoggedOut authenticate={authenticate} />
      }

      {loggedIn && <LoggedIn user={user} />}
    </Flex>
  )
}
