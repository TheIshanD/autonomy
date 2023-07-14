import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect } from 'react' 

import { 
  Button,
  Flex, FormControl, FormLabel, Heading, Input, Text, Box, Select, chakra
} from '@chakra-ui/react'
import SideNav from '@/components/SideNav'
import Header from '@/components/Header'
import ProfileTab from './tabs/ProfileTab'
import CalenderTab from './tabs/CalenderTab'

export default function LoggedIn() {
    const [pageIndex, setPageIndex] = React.useState(0);
    const [schedule, setSchedule] = React.useState([
        {start:"12:00am", end:"12:30am", activity: "Sleep", color: "#FF6969", isContinuation: false},
        {start:"12:30am", end:"1:00am", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"1:00am", end:"1:30am", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"1:30am", end:"2:00am", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"2:00am", end:"2:30am", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"2:30am", end:"3:00am", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"3:00am", end:"3:30am", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"3:30am", end:"4:00am", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"4:00am", end:"4:30am", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"4:30am", end:"5:00am", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"5:00am", end:"5:30am", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"5:30am", end:"6:00am", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"6:00am", end:"6:30am", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"6:30am", end:"7:00am", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"7:00am", end:"7:30am", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"7:30am", end:"8:00am", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"8:00am", end:"8:30am", activity: "Wake Up", color: "#FF6969", isContinuation: false},
        {start:"8:30am", end:"9:00am", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"9:00am", end:"9:30am", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"9:30am", end:"10:00am", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"10:00am", end:"10:30am", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"10:30am", end:"11:00am", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"11:00am", end:"11:30am", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"11:30am", end:"12:00pm", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"12:00pm", end:"12:30pm", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"12:30pm", end:"1:00pm", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"1:00pm", end:"1:30pm", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"1:30pm", end:"2:00pm", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"2:00pm", end:"2:30pm", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"2:30pm", end:"3:00pm", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"3:00pm", end:"3:30pm", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"3:30pm", end:"4:00pm", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"4:00pm", end:"4:30pm", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"4:30pm", end:"5:00pm", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"5:00pm", end:"5:30pm", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"5:30pm", end:"6:00pm", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"6:00pm", end:"6:30pm", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"6:30pm", end:"7:00pm", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"7:00pm", end:"7:30pm", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"7:30pm", end:"8:00pm", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"8:00pm", end:"8:30pm", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"8:30pm", end:"9:00pm", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"9:00pm", end:"9:30pm", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"9:30pm", end:"10:00pm", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"10:00pm", end:"10:30pm", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"10:30pm", end:"11:00pm", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"11:00pm", end:"11:30pm", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
        {start:"11:30pm", end:"12:00am", activity: "[EMPTY]", color: "#FF6969", isContinuation: false},
    ]);
    const [sleepTime, setSleepTime] = React.useState(0);
    const [wakeTime, setWakeTime] = React.useState(16);
    const [goals, setGoals] = React.useState([""]);

    return (
        <Box width="100%" height="100%" bg="whitesmoke">
            <Header/>

            <Flex direction="row" width="100%" minH="100vh">
                <SideNav pageIndex={pageIndex} setPageIndex={setPageIndex}/> 

                {pageIndex==0 &&
                    <ProfileTab 
                        schedule={schedule} 
                        setSchedule={setSchedule}
                        sleepTime={sleepTime}
                        setSleepTime={setSleepTime}
                        wakeTime={wakeTime}
                        setWakeTime={setWakeTime}
                        goals={goals}
                        setGoals={setGoals}
                    />
                }

                {pageIndex==1 &&
                    <CalenderTab
                        schedule={schedule} 
                        setSchedule={setSchedule}
                        sleepTime={sleepTime}
                        setSleepTime={setSleepTime}
                        wakeTime={wakeTime}
                        setWakeTime={setWakeTime}
                        goals={goals}
                        setGoals={setGoals}
                    />
                }
                
            </Flex>
        </Box>
    )
}
