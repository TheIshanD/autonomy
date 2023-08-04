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
import CalenderTab from './tabs/CalendarTab'
import { FaLess } from 'react-icons/fa'
import { ScheduleSlot, User } from '@/utils/types'


export default function LoggedIn(props : {user:User}) {
    const { user } = props;
    
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

    const startingSchedule = () : ScheduleSlot[] =>{
        return (
            timeList.map((time:string, index:number)=>(
                {
                    start: time,
                    end: timeList[index + 1],
                    activity: "[EMPTY]",
                    color: "#ADD8E6",
                    isContinuation: false,
                    isAILocked: true,
            }))
        )
    }

    const [pageIndex, setPageIndex] = React.useState(1);
    const [schedule, setSchedule] = React.useState(startingSchedule());

    const [sleepTime, setSleepTime] = React.useState(user.sleepTime);
    const [wakeTime, setWakeTime] = React.useState(user.wakeTime);
    const [goals, setGoals] = React.useState(user.goals);
    const [routineList, setRoutineList] = React.useState(user.routines);
    const [unscheduledTasks, setUnscheduledTasks] = React.useState(user.unscheduledTasks);
    const [scheduledTasks, setScheduledTasks] = React.useState(user.scheduledTasks);

    const [scheduleRegenTrigger,setScheduleRegenTrigger] = React.useState(false)



    const recomputeSchedule = () : void =>{
        setScheduleRegenTrigger(!scheduleRegenTrigger)
    }

    // useEffect has to be used to delay the regeneration of the schedule until the states are updated. Otherwise, it will happen too early
    useEffect(()=>{
        const tmpSchedule = startingSchedule()

        tmpSchedule[wakeTime].activity = "Wake Up"

        tmpSchedule[sleepTime].activity = "Sleep"

        routineList.map((routine, routineInd : number)=>{
            var tmpStart = routine.start;
            const tmpEnd = routine.end;

            var routineConflicts = false;

            while(tmpStart != tmpEnd) {
                if(tmpSchedule[tmpStart].activity != "[EMPTY]") {
                    routine.isConflicting = (tmpSchedule[tmpStart].activity + "!")
                    routine.active = false;
                    routineConflicts = true;
                    break;
                }

                tmpStart++;
                tmpStart %= 48;
            }

            if(!routine.isConflicting && wakeTime < sleepTime && routine.start < wakeTime) {
                routine.isConflicting = "Sleep!"
                routine.active = false;
                routineConflicts = true;
            } else if (!routine.isConflicting && sleepTime < wakeTime && routine.start < wakeTime && routine.start >= sleepTime) {
                routine.isConflicting = "Sleep!"
                routine.active = false;
                routineConflicts = true;
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
        
        scheduledTasks.map((task)=>{
            var tmpStart = task.start
            var taskConflicts = false

            while(tmpStart != task.end) {
                if(tmpSchedule[tmpStart].activity != "[EMPTY]") {
                    taskConflicts = true
                    break
                }

                tmpStart++;
                tmpStart %= 48
            }

            if(!taskConflicts) {
                var start = task.start;
    
                var isFirstIteration = true;
                while(start != task.end) {
                    tmpSchedule[start].activity = task.title
                    tmpSchedule[start].isContinuation = !isFirstIteration;
                    tmpSchedule[start].color = task.color;
    
                    start++;
                    start %= 48;
                    isFirstIteration = false;
                }
            } else {
                //Basically the current task conflicts with sleep or a routine or a previous task, I will make the task disappear in that case
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
                        unscheduledTasks={unscheduledTasks}
                        setUnscheduledTasks={setUnscheduledTasks}
                        scheduledTasks={scheduledTasks}
                        setScheduledTasks={setScheduledTasks}
                    />
                }
                
            </Flex>
        </Box>
    )
}
