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


export default function LoggedIn(props : any) {

    const { authenticate } = props

    return (
        <Flex direction="column" width="100%" height="100%" bg="#E4DCCF">
            <Header loggedIn={false}/>

            <Flex minH="50vh" bg="purple.100" direction="row" align="center" p="50px">
                <Flex direction="column" justify="center" align="left" width="60%">
                    <Heading size="4xl" fontWeight="700">Turn Your Life Around With Autonomy</Heading>

                    <Flex direction="row" mt="30px" gap="30px">
                        <Link as={NextLink} href='/sign-up'>
                            <Button colorScheme='teal' size="lg">
                                Get Started!
                            </Button>
                        </Link>

                        <Link as={NextLink} href='/sign-in'>
                            <Button colorScheme='yellow' size="lg">
                                Log In
                            </Button>
                        </Link>
                    </Flex>
                </Flex>
                <Flex direction="column" justify="center" align="center" width="40%">
                    <Image
                        objectFit='cover'
                        src='https://cdn.discordapp.com/attachments/1131229417105018940/1137159279548309595/Screen_Shot_2023-07-20_at_12.20.03_PM.png'
                        alt='Dan Abramov'
                    />
                </Flex>
            </Flex>

            <svg id="visual" viewBox="0 0 3200 225" xmlns="http://www.w3.org/2000/svg" version="1.1"><rect x="0" y="0" width="100%" height="100vh" fill="#E9D8FD"></rect><path d="M0 66L26.7 66.2C53.3 66.3 106.7 66.7 160 84.2C213.3 101.7 266.7 136.3 320 150.7C373.3 165 426.7 159 480 157.7C533.3 156.3 586.7 159.7 640 149.2C693.3 138.7 746.7 114.3 800 112.5C853.3 110.7 906.7 131.3 960 145.5C1013.3 159.7 1066.7 167.3 1120 159.7C1173.3 152 1226.7 129 1280 125C1333.3 121 1386.7 136 1440 127.5C1493.3 119 1546.7 87 1600 87.5C1653.3 88 1706.7 121 1760 137.8C1813.3 154.7 1866.7 155.3 1920 160.2C1973.3 165 2026.7 174 2080 164.3C2133.3 154.7 2186.7 126.3 2240 120.7C2293.3 115 2346.7 132 2400 124.8C2453.3 117.7 2506.7 86.3 2560 74.3C2613.3 62.3 2666.7 69.7 2720 78.2C2773.3 86.7 2826.7 96.3 2880 95.7C2933.3 95 2986.7 84 3040 75.2C3093.3 66.3 3146.7 59.7 3173.3 56.3L3200 53L3200 226L3173.3 226C3146.7 226 3093.3 226 3040 226C2986.7 226 2933.3 226 2880 226C2826.7 226 2773.3 226 2720 226C2666.7 226 2613.3 226 2560 226C2506.7 226 2453.3 226 2400 226C2346.7 226 2293.3 226 2240 226C2186.7 226 2133.3 226 2080 226C2026.7 226 1973.3 226 1920 226C1866.7 226 1813.3 226 1760 226C1706.7 226 1653.3 226 1600 226C1546.7 226 1493.3 226 1440 226C1386.7 226 1333.3 226 1280 226C1226.7 226 1173.3 226 1120 226C1066.7 226 1013.3 226 960 226C906.7 226 853.3 226 800 226C746.7 226 693.3 226 640 226C586.7 226 533.3 226 480 226C426.7 226 373.3 226 320 226C266.7 226 213.3 226 160 226C106.7 226 53.3 226 26.7 226L0 226Z" fill="white" stroke-linecap="round" stroke-linejoin="miter"></path></svg>
            <Flex direction="column" bg="white" p="50px" align="center" textAlign="center">
                <Heading size="3xl">A Pathway To <chakra.span color="yellow.500">⚡Supercharge⚡</chakra.span> Your Productivity</Heading>
            </Flex>
            <svg id="visual" viewBox="0 0 3200 225" xmlns="http://www.w3.org/2000/svg" version="1.1"><rect x="0" y="0" width="100%" height="100vh" fill="white"></rect><path d="M0 66L26.7 66.2C53.3 66.3 106.7 66.7 160 84.2C213.3 101.7 266.7 136.3 320 150.7C373.3 165 426.7 159 480 157.7C533.3 156.3 586.7 159.7 640 149.2C693.3 138.7 746.7 114.3 800 112.5C853.3 110.7 906.7 131.3 960 145.5C1013.3 159.7 1066.7 167.3 1120 159.7C1173.3 152 1226.7 129 1280 125C1333.3 121 1386.7 136 1440 127.5C1493.3 119 1546.7 87 1600 87.5C1653.3 88 1706.7 121 1760 137.8C1813.3 154.7 1866.7 155.3 1920 160.2C1973.3 165 2026.7 174 2080 164.3C2133.3 154.7 2186.7 126.3 2240 120.7C2293.3 115 2346.7 132 2400 124.8C2453.3 117.7 2506.7 86.3 2560 74.3C2613.3 62.3 2666.7 69.7 2720 78.2C2773.3 86.7 2826.7 96.3 2880 95.7C2933.3 95 2986.7 84 3040 75.2C3093.3 66.3 3146.7 59.7 3173.3 56.3L3200 53L3200 226L3173.3 226C3146.7 226 3093.3 226 3040 226C2986.7 226 2933.3 226 2880 226C2826.7 226 2773.3 226 2720 226C2666.7 226 2613.3 226 2560 226C2506.7 226 2453.3 226 2400 226C2346.7 226 2293.3 226 2240 226C2186.7 226 2133.3 226 2080 226C2026.7 226 1973.3 226 1920 226C1866.7 226 1813.3 226 1760 226C1706.7 226 1653.3 226 1600 226C1546.7 226 1493.3 226 1440 226C1386.7 226 1333.3 226 1280 226C1226.7 226 1173.3 226 1120 226C1066.7 226 1013.3 226 960 226C906.7 226 853.3 226 800 226C746.7 226 693.3 226 640 226C586.7 226 533.3 226 480 226C426.7 226 373.3 226 320 226C266.7 226 213.3 226 160 226C106.7 226 53.3 226 26.7 226L0 226Z" fill="#E9D8FD" stroke-linecap="round" stroke-linejoin="miter"></path></svg>


            <Flex direction="column" bg="purple.100" p="50px" align="center">
                <Heading size="3xl" mb="40px">How It Works</Heading>

                <Flex direction="column" bg="white" p="50px" width="70%" border="3px solid black">
                    <Heading size="2xl"><chakra.span color="red.500">💥Instant</chakra.span> Productivity in just 3️ Clicks</Heading>
                    <Text fontSize="2xl" mt="20px" >A bunch of random text and diagrams blah blah blah</Text>
                    <Text fontSize="2xl" mt="20px" >A bunch of random text and diagrams blah blah blah</Text>
                    <Text fontSize="2xl" mt="20px" >A bunch of random text and diagrams blah blah blah</Text>
                    <Text fontSize="2xl" mt="20px" >A bunch of random text and diagrams blah blah blah</Text>
                </Flex>
            </Flex>
        </Flex>
    )
}
