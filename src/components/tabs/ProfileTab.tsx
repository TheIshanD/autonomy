import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect } from 'react' 

import { 
  Button,
  Flex, FormControl, FormLabel, Heading, Input, Text, Box, Select, chakra, FormHelperText, Divider
} from '@chakra-ui/react'
import SideNav from '@/components/SideNav'
import Header from '@/components/Header'



export default function ProfileTab(props : any) {
    const {schedule, setSchedule, sleepTime, setSleepTime, wakeTime, setWakeTime, goals, setGoals} = props;

    const [goalInput, setGoalInput] = React.useState("");

    const OnChangeSleepSelect = (e : any)=>{
        const tempSchedule = [...schedule];
        tempSchedule[sleepTime].activity = "[EMPTY]"
        tempSchedule[e.target.value].activity = "Sleep"
        setSchedule(tempSchedule)
        setSleepTime(parseInt(e.target.value))
    }
    
    const OnChangeWakeUpSelect = (e : any)=>{
        const tempSchedule = [...schedule];
        tempSchedule[wakeTime].activity = "[EMPTY]"
        tempSchedule[e.target.value].activity = "Wake Up"
        setSchedule(tempSchedule)
        setWakeTime(parseInt(e.target.value))
    }

    return (
    <Flex bg="whitesmoke" direction="column" p="30px" gap=" 30px" width="70%">
        <Heading size="2xl">Profile</Heading>


        <FormControl isRequired>
            <FormLabel>When do you wake up?</FormLabel>
            <Select value={wakeTime} onChange={(e)=>{OnChangeWakeUpSelect(e)}} bg="white">
                <chakra.option value={0}>12:00 AM</chakra.option>
                <chakra.option value={1}>12:30 AM</chakra.option>
                <chakra.option value={2}>1:00 AM</chakra.option>
                <chakra.option value={3}>1:30 AM</chakra.option>
                <chakra.option value={4}>2:00 AM</chakra.option>
                <chakra.option value={5}>2:30 AM</chakra.option>
                <chakra.option value={6}>3:00 AM</chakra.option>
                <chakra.option value={7}>3:30 AM</chakra.option>
                <chakra.option value={8}>4:00 AM</chakra.option>
                <chakra.option value={9}>4:30 AM</chakra.option>
                <chakra.option value={10}>5:00 AM</chakra.option>
                <chakra.option value={11}>5:30 AM</chakra.option>
                <chakra.option value={12}>6:00 AM</chakra.option>
                <chakra.option value={13}>6:30 AM</chakra.option>
                <chakra.option value={14}>7:00 AM</chakra.option>
                <chakra.option value={15}>7:30 AM</chakra.option>
                <chakra.option value={16}>8:00 AM</chakra.option>
                <chakra.option value={17}>8:30 AM</chakra.option>
                <chakra.option value={18}>9:00 AM</chakra.option>
                <chakra.option value={19}>9:30 AM</chakra.option>
                <chakra.option value={20}>10:00 AM</chakra.option>
                <chakra.option value={21}>10:30 AM</chakra.option>
                <chakra.option value={22}>11:00 AM</chakra.option>
                <chakra.option value={23}>11:30 AM</chakra.option>
                <chakra.option value={24}>12:00 PM</chakra.option>
                <chakra.option value={25}>12:30 PM</chakra.option>
                <chakra.option value={26}>1:00 PM</chakra.option>
                <chakra.option value={27}>1:30 PM</chakra.option>
                <chakra.option value={28}>2:00 PM</chakra.option>
                <chakra.option value={29}>2:30 PM</chakra.option>
                <chakra.option value={30}>3:00 PM</chakra.option>
                <chakra.option value={31}>3:30 PM</chakra.option>
                <chakra.option value={32}>4:00 PM</chakra.option>
                <chakra.option value={33}>4:30 PM</chakra.option>
                <chakra.option value={34}>5:00 PM</chakra.option>
                <chakra.option value={35}>5:30 PM</chakra.option>
                <chakra.option value={36}>6:00 PM</chakra.option>
                <chakra.option value={37}>6:30 PM</chakra.option>
                <chakra.option value={38}>7:00 PM</chakra.option>
                <chakra.option value={39}>7:30 PM</chakra.option>
                <chakra.option value={40}>8:00 PM</chakra.option>
                <chakra.option value={41}>8:30 PM</chakra.option>
                <chakra.option value={42}>9:00 PM</chakra.option>
                <chakra.option value={43}>9:30 PM</chakra.option>
                <chakra.option value={44}>10:00 PM</chakra.option>
                <chakra.option value={45}>10:30 PM</chakra.option>
                <chakra.option value={46}>11:00 PM</chakra.option>
                <chakra.option value={47}>11:30 PM</chakra.option>
            </Select>
        </FormControl>

        <FormControl isRequired>
            <FormLabel>When do you go to sleep?</FormLabel>
            <Select value={sleepTime} onChange={(e)=>{OnChangeSleepSelect(e)}} bg="white">
                <chakra.option value={0}>12:00 AM</chakra.option>
                <chakra.option value={1}>12:30 AM</chakra.option>
                <chakra.option value={2}>1:00 AM</chakra.option>
                <chakra.option value={3}>1:30 AM</chakra.option>
                <chakra.option value={4}>2:00 AM</chakra.option>
                <chakra.option value={5}>2:30 AM</chakra.option>
                <chakra.option value={6}>3:00 AM</chakra.option>
                <chakra.option value={7}>3:30 AM</chakra.option>
                <chakra.option value={8}>4:00 AM</chakra.option>
                <chakra.option value={9}>4:30 AM</chakra.option>
                <chakra.option value={10}>5:00 AM</chakra.option>
                <chakra.option value={11}>5:30 AM</chakra.option>
                <chakra.option value={12}>6:00 AM</chakra.option>
                <chakra.option value={13}>6:30 AM</chakra.option>
                <chakra.option value={14}>7:00 AM</chakra.option>
                <chakra.option value={15}>7:30 AM</chakra.option>
                <chakra.option value={16}>8:00 AM</chakra.option>
                <chakra.option value={17}>8:30 AM</chakra.option>
                <chakra.option value={18}>9:00 AM</chakra.option>
                <chakra.option value={19}>9:30 AM</chakra.option>
                <chakra.option value={20}>10:00 AM</chakra.option>
                <chakra.option value={21}>10:30 AM</chakra.option>
                <chakra.option value={22}>11:00 AM</chakra.option>
                <chakra.option value={23}>11:30 AM</chakra.option>
                <chakra.option value={24}>12:00 PM</chakra.option>
                <chakra.option value={25}>12:30 PM</chakra.option>
                <chakra.option value={26}>1:00 PM</chakra.option>
                <chakra.option value={27}>1:30 PM</chakra.option>
                <chakra.option value={28}>2:00 PM</chakra.option>
                <chakra.option value={29}>2:30 PM</chakra.option>
                <chakra.option value={30}>3:00 PM</chakra.option>
                <chakra.option value={31}>3:30 PM</chakra.option>
                <chakra.option value={32}>4:00 PM</chakra.option>
                <chakra.option value={33}>4:30 PM</chakra.option>
                <chakra.option value={34}>5:00 PM</chakra.option>
                <chakra.option value={35}>5:30 PM</chakra.option>
                <chakra.option value={36}>6:00 PM</chakra.option>
                <chakra.option value={37}>6:30 PM</chakra.option>
                <chakra.option value={38}>7:00 PM</chakra.option>
                <chakra.option value={39}>7:30 PM</chakra.option>
                <chakra.option value={40}>8:00 PM</chakra.option>
                <chakra.option value={41}>8:30 PM</chakra.option>
                <chakra.option value={42}>9:00 PM</chakra.option>
                <chakra.option value={43}>9:30 PM</chakra.option>
                <chakra.option value={44}>10:00 PM</chakra.option>
                <chakra.option value={45}>10:30 PM</chakra.option>
                <chakra.option value={46}>11:00 PM</chakra.option>
                <chakra.option value={47}>11:30 PM</chakra.option>
            </Select>
        </FormControl>

        <Divider />

        <Flex direction="column" gap="30px" mt="10px">
            <Flex direction="column">
                <Heading size="lg">Routines</Heading>
                <Text>Schedule Reoccurring Events</Text>
            </Flex>
            <Flex direction="column" gap="10px"> 
                <Flex direction="row" gap="3px">
                    <Input bg="white" placeholder={"Routine Title"}/>
                    <Input bg="white" type="time"/>
                    <Input bg="white" type="time"/>
                </Flex>
            </Flex>
            <Button colorScheme='yellow'>
                Add New Routine
            </Button>
        </Flex>

        <Divider />

        <Flex direction="column" gap="30px" mt="10px">
            <FormControl>
                <FormLabel>Add any long term habits you want to form or goals that you have</FormLabel>
                <Flex direction="row">
                    <Input bg="white" value={goalInput} onChange={(e)=>{setGoalInput(e.target.value)}} placeholder='I want to learn to...' type="text"/>
                    <Button colorScheme='blue' onClick={()=>{
                    setGoals([...goals, goalInput])
                    setGoalInput("")
                    }}>Add</Button>
                </Flex>
                <FormHelperText>Example: I want to learn Spanish</FormHelperText>
            </FormControl>
            <Heading size="lg">Long-Term Goals</Heading>
            <Flex direction="column" gap="3px"> 
                {
                    goals.map((goal : string, index : number)=>{
                    return (index==0?null:<Text key={index}>{index+". "+goal}</Text>)
                    })
                }
            </Flex>
        </Flex>

    </Flex>
  )
}
