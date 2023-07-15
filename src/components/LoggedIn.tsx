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
        {start:"1:00am", end:"1:30am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"1:30am", end:"2:00am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"2:00am", end:"2:30am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"2:30am", end:"3:00am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"3:00am", end:"3:30am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"3:30am", end:"4:00am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"4:00am", end:"4:30am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"4:30am", end:"5:00am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"5:00am", end:"5:30am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"5:30am", end:"6:00am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"6:00am", end:"6:30am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"6:30am", end:"7:00am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"7:00am", end:"7:30am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"7:30am", end:"8:00am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"8:00am", end:"8:30am", activity: "Wake Up", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"8:30am", end:"9:00am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"9:00am", end:"9:30am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"9:30am", end:"10:00am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"10:00am", end:"10:30am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"10:30am", end:"11:00am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"11:00am", end:"11:30am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"11:30am", end:"12:00pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"12:00pm", end:"12:30pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"12:30pm", end:"1:00pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"1:00pm", end:"1:30pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"1:30pm", end:"2:00pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"2:00pm", end:"2:30pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"2:30pm", end:"3:00pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"3:00pm", end:"3:30pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"3:30pm", end:"4:00pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"4:00pm", end:"4:30pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"4:30pm", end:"5:00pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"5:00pm", end:"5:30pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"5:30pm", end:"6:00pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"6:00pm", end:"6:30pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"6:30pm", end:"7:00pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"7:00pm", end:"7:30pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"7:30pm", end:"8:00pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"8:00pm", end:"8:30pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"8:30pm", end:"9:00pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"9:00pm", end:"9:30pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"9:30pm", end:"10:00pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"10:00pm", end:"10:30pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"10:30pm", end:"11:00pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"11:00pm", end:"11:30pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"11:30pm", end:"12:00am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"12:00am", end:"12:30am", activity: "Sleep", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        {start:"12:30am", end:"1:00am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
    ]);
    const [sleepTime, setSleepTime] = React.useState(46);
    const [wakeTime, setWakeTime] = React.useState(14);
    const [goals, setGoals] = React.useState<string[]>([]);
    const [routineList, setRoutineList] = React.useState([
        // {title: "Work", start: 16, end: 32, active: true, isConflicting: "", color: "#FFD580"}
    ]);

    const [scheduleRegenTrigger,setScheduleRegenTrigger] = React.useState(false)

    const recomputeSchedule = ()=>{
        setScheduleRegenTrigger(!scheduleRegenTrigger)
    }

    const timeList = [
    "1:00am",
    "1:30am",
    "2:00am",
    "2:30am",
    "3:00am",
    "3:30am",
    "4:00am",
    "4:30am",
    "5:00am",
    "5:30am",
    "6:00am",
    "6:30am",
    "7:00am",
    "7:30am",
    "8:00am",
    "8:30am",
    "9:00am",
    "9:30am",
    "10:00am",
    "10:30am",
    "11:00am",
    "11:30am",
    "12:00pm",
    "12:30pm",
    "1:00pm",
    "1:30pm",
    "2:00pm",
    "2:30pm",
    "3:00pm",
    "3:30pm",
    "4:00pm",
    "4:30pm",
    "5:00pm",
    "5:30pm",
    "6:00pm",
    "6:30pm",
    "7:00pm",
    "7:30pm",
    "8:00pm",
    "8:30pm",
    "9:00pm",
    "9:30pm",
    "10:00pm",
    "10:30pm",
    "11:00pm",
    "11:30pm",
    "12:00am",
    "12:30am",
    ]

    useEffect(()=>{
        const tmpSchedule = [
            {start:"1:00am", end:"1:30am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"1:30am", end:"2:00am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"2:00am", end:"2:30am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"2:30am", end:"3:00am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"3:00am", end:"3:30am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"3:30am", end:"4:00am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"4:00am", end:"4:30am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"4:30am", end:"5:00am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"5:00am", end:"5:30am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"5:30am", end:"6:00am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"6:00am", end:"6:30am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"6:30am", end:"7:00am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"7:00am", end:"7:30am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"7:30am", end:"8:00am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"8:00am", end:"8:30am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"8:30am", end:"9:00am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"9:00am", end:"9:30am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"9:30am", end:"10:00am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"10:00am", end:"10:30am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"10:30am", end:"11:00am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"11:00am", end:"11:30am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"11:30am", end:"12:00pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"12:00pm", end:"12:30pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"12:30pm", end:"1:00pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"1:00pm", end:"1:30pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"1:30pm", end:"2:00pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"2:00pm", end:"2:30pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"2:30pm", end:"3:00pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"3:00pm", end:"3:30pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"3:30pm", end:"4:00pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"4:00pm", end:"4:30pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"4:30pm", end:"5:00pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"5:00pm", end:"5:30pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"5:30pm", end:"6:00pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"6:00pm", end:"6:30pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"6:30pm", end:"7:00pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"7:00pm", end:"7:30pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"7:30pm", end:"8:00pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"8:00pm", end:"8:30pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"8:30pm", end:"9:00pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"9:00pm", end:"9:30pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"9:30pm", end:"10:00pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"10:00pm", end:"10:30pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"10:30pm", end:"11:00pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"11:00pm", end:"11:30pm", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"11:30pm", end:"12:00am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"12:00am", end:"12:30am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
            {start:"12:30am", end:"1:00am", activity: "[EMPTY]", color: "#ADD8E6", isContinuation: false, isAILocked: true},
        ];
        tmpSchedule[wakeTime].activity = "Wake Up"

        tmpSchedule[sleepTime].activity = "Sleep"

        routineList.map((routine : any, routineInd : number)=>{
            var tmpStart = routine.start;
            const tmpEnd = routine.end;

            var routineConflicts = false;

            while(tmpStart != tmpEnd) {
                if(tmpSchedule[tmpStart].activity != "[EMPTY]") {
                    routine.isConflicting = tmpSchedule[tmpStart].activity
                    routine.active = false;
                    routineConflicts = true;
                    break;
                }

                tmpStart++;
                tmpStart %= 48;
            }

            if(!routineConflicts) {
                routine.isConflicting = "";

                if(routine.active) {
                    var start = routine.start;
                    const end = routine.end;
    
                    var isFirstIteration = true;
                    while(start != end) {
                        tmpSchedule[start].activity = routine.title
                        tmpSchedule[start].isContinuation = !isFirstIteration;
                        tmpSchedule[start].color = routine.color;
    
                        start++;
                        start %= 48;
                        isFirstIteration = false;
                    }
                }
            }
        })

        setSchedule(tmpSchedule)
    },[scheduleRegenTrigger])

    return (
        <Box width="100%" height="100%" bg="#E4DCCF">
            <Header/>

            <Flex direction={["column","column","row","row"]} width="100%" minH="100vh">
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
                        timeList={timeList}
                        routineList={routineList}
                        setRoutineList={setRoutineList}
                        recomputeSchedule={recomputeSchedule}
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
                        timeList={timeList}
                        recomputeSchedule={recomputeSchedule}
                    />
                }
                
            </Flex>
        </Box>
    )
}
