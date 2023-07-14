import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect } from 'react' 

import { 
  Button,
  Flex, FormControl, FormLabel, Heading, Input, Text, Box, Select, chakra, FormHelperText, Divider, RadioGroup, Radio
} from '@chakra-ui/react'
import SideNav from '@/components/SideNav'
import Header from '@/components/Header'


export default function ProfileTab(props : any) {
    const {schedule, setSchedule, sleepTime, setSleepTime, wakeTime, setWakeTime, goals, setGoals, timeList, routineList, setRoutineList, applyRoutinesToSchedule} = props;

    const [goalInput, setGoalInput] = React.useState("");
    
    const OnChangeSleepSelect = (e : any)=>{
        setSleepTime(parseInt(e.target.value))
    }
    
    const OnChangeWakeUpSelect = (e : any)=>{
        setWakeTime(parseInt(e.target.value));
    }

    const OnChangeRoutineStartTime = (e : any, routineInd : number) => {
        const newVal = parseInt(e.target.value);
        const tmpRoutineList = [...routineList];

        tmpRoutineList[routineInd].start = newVal;
        setRoutineList(tmpRoutineList)
    }

    const OnChangeRoutineEndTime = (e : any, routineInd : number) => {
        const newVal = parseInt(e.target.value);
        const tmpRoutineList = [...routineList];

        tmpRoutineList[routineInd].end = newVal;
        setRoutineList(tmpRoutineList)
    }

    const toggleRoutine = (routineInd : number)=>{
        const tmpRoutineList = [...routineList];
        tmpRoutineList[routineInd].active = !tmpRoutineList[routineInd].active;
        setRoutineList(tmpRoutineList)
        
    }

    const deleteRoutine = (routineInd : number)=>{
        const tmpRoutineList = [...routineList];
        tmpRoutineList.splice(routineInd, 1);
        setRoutineList(tmpRoutineList)
    }

    const addRoutine = ()=>{
        const tmpRoutineList = [...routineList];
        tmpRoutineList.push({title: "Routine #" + (tmpRoutineList.length + 1), start: 0, end: 46, active: true, isConflicting: "", color: "#FFD580"})
        setRoutineList(tmpRoutineList)
    }

    const OnRoutineTitleChange = (e : any, routineInd : number)=>{
        const tmpRoutineList = [...routineList];
        tmpRoutineList[routineInd].title = e.target.value;
        setRoutineList(tmpRoutineList)
    }

    const OnRoutineColorChange = (e : any, routineInd : number)=>{
        const tmpRoutineList = [...routineList];
        tmpRoutineList[routineInd].color = e;
        setRoutineList(tmpRoutineList)
    }

    return (
    <Flex bg="whitesmoke" direction="column" p="30px" gap=" 30px" width="80%">
        <Flex direction="column">
            <Heading size="2xl">Profile</Heading>
            <Text>Changing your profile will automatically reset your existing tasks</Text>
        </Flex>

        <Heading size="lg">Wake and Sleep Times</Heading>
        <FormControl isRequired>
            <FormLabel>When do you wake up?</FormLabel>
            <Select value={wakeTime} onChange={(e)=>{OnChangeWakeUpSelect(e)}} bg="white">
                {timeList.map((timeString : string, index : number)=>{
                    return <chakra.option value={index} key={index}>{timeString}</chakra.option>
                })}
            </Select>
        </FormControl>

        <FormControl isRequired>
            <FormLabel>When do you go to sleep?</FormLabel>
            <Select value={sleepTime} onChange={(e)=>{OnChangeSleepSelect(e)}} bg="white">
                {timeList.map((timeString : string, index : number)=>{
                    return <chakra.option value={index} key={index}>{timeString}</chakra.option>
                })}
            </Select>
        </FormControl>

        <Divider />

        <Flex direction="column" gap="30px" mt="10px">
            <Flex direction="row" align="end" gap="30px">
                <Flex direction="column">
                    <Heading size="lg">Routines</Heading>
                    <Text>Schedule Reoccurring Events</Text>
                </Flex>
                <Button colorScheme='yellow' onClick={addRoutine}>
                    Add New Routine
                </Button>
            </Flex>
            <Flex direction="column" gap="60px"> 
            {routineList.map((routine : any, routineInd : number)=>{
                return (
                    <Flex key={routineInd} direction="column">
                        {routine.isConflicting &&
                            <Text fontWeight="900">This routine cannot be active because it conflicts with {routine.isConflicting}</Text>
                        }
                        <Flex key={routineInd} direction="row" gap="3px" align="end">
                            <FormControl isRequired>
                                <FormLabel>What do you want to call this Routine?</FormLabel>
                                <Input bg={routine.active?"white":"whitesmoke"} placeholder={"Routine Title"} value={routine.title} onChange={(e)=>{OnRoutineTitleChange(e, routineInd)}}/>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>When do you want to start this Routine?</FormLabel>
                                <Select bg={routine.active?"white":"whitesmoke"} value={routine.start} onChange={(e)=>{OnChangeRoutineStartTime(e, routineInd)}}>
                                {timeList.map((timeString : string, index : number)=>{
                                    if(wakeTime < sleepTime) {
                                        if(index >= wakeTime && index <= sleepTime && index < routine.end) {
                                            return <chakra.option value={index} key={index}>{timeString}</chakra.option>
                                        } else {
                                            return null
                                        }
                                    } else if (wakeTime > sleepTime) {
                                        if(index < wakeTime && index > sleepTime) {
                                            return null
                                        } else {
                                            return <chakra.option value={index} key={index}>{timeString}</chakra.option>
                                        }
                                    }
                                })}
                                </Select>
                            </FormControl>  
                            <FormControl isRequired>
                                <FormLabel>When do you want to end this Routine?</FormLabel>
                                <Select bg={routine.active?"white":"whitesmoke"} value={routine.end} onChange={(e)=>{OnChangeRoutineEndTime(e, routineInd)}}>
                                {timeList.map((timeString : string, index : number)=>{
                                    if(wakeTime < sleepTime) {
                                        if(index >= wakeTime && index <= sleepTime && index > routine.start) {
                                            return <chakra.option value={index} key={index}>{timeString}</chakra.option>
                                        } else {
                                            return null
                                        }
                                    } else if (wakeTime > sleepTime) {
                                        if((index < wakeTime && index > sleepTime)) {
                                            return null
                                        } else {
                                            return <chakra.option value={index} key={index}>{timeString}</chakra.option>
                                        }
                                    }
                                })}
                                </Select>
                            </FormControl>
                            {routine.active && <Button colorScheme='red' minW="100px" onClick={()=>{toggleRoutine(routineInd)}}>Turn Off</Button>}
                            {!routine.active && <Button colorScheme='green' minW="100px" onClick={()=>{toggleRoutine(routineInd)}}>Turn On</Button>}
                            <Button colorScheme='red' minW="150px" onClick={()=>{deleteRoutine(routineInd)}}>Delete Routine</Button>
                        </Flex>
                        <RadioGroup onChange={(e)=>{OnRoutineColorChange(e, routineInd)}} value={routine.color} mt="5px">
                            <Flex direction='row' gap="10px">
                                <Radio size="lg" value="#FF6969" bgColor="#FF6969" _checked={{background:"#FF6969", border: "3px solid", borderColor: "black"}}></Radio>
                                <Radio size="lg" value="#FFD580" bgColor="#FFD580" _checked={{background:"#FFD580", border: "3px solid", borderColor: "black"}}></Radio>
                                <Radio size="lg" value="#ffffe0" bgColor="#ffffe0" _checked={{background:"#ffffe0", border: "3px solid", borderColor: "black"}}></Radio>
                                <Radio size="lg" value="#90EE90" bgColor="#90EE90" _checked={{background:"#90EE90", border: "3px solid", borderColor: "black"}}></Radio>
                                <Radio size="lg" value="#ADD8E6" bgColor="#ADD8E6" _checked={{background:"#ADD8E6", border: "3px solid", borderColor: "black"}}></Radio>
                                <Radio size="lg" value="#D6B4FC" bgColor="#D6B4FC" _checked={{background:"#D6B4FC", border: "3px solid", borderColor: "black"}}></Radio>
                            </Flex>
                        </RadioGroup>
                    </Flex>
                );
            })
            }
            </Flex>
        </Flex>

        <Divider />

        <Flex direction="column" gap="30px" mt="10px">
            <Flex direction="row" align="center" gap="30px">
                <Heading size="lg">Goals</Heading>
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
            </Flex>
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
