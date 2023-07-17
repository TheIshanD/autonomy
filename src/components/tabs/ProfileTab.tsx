import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect } from 'react' 

import { 
  Button,
  Flex, FormControl, FormLabel, Heading, Input, Text, Box, Select, chakra, FormHelperText, Divider, RadioGroup, Radio, ScaleFade, Tooltip, Icon, IconButton, FormErrorMessage
} from '@chakra-ui/react'
import SideNav from '@/components/SideNav'
import Header from '@/components/Header'
import { FaWindowClose } from 'react-icons/fa'


export default function ProfileTab(props : any) {
    const {schedule, setSchedule, sleepTime, setSleepTime, wakeTime, setWakeTime, goals, setGoals, timeList, routineList, setRoutineList, recomputeSchedule} = props;

    const [goalInput, setGoalInput] = React.useState("");
    const [goalInputError, setGoalInputError] = React.useState(false);
    
    const OnChangeSleepSelect = (e : any)=>{
        setSleepTime(parseInt(e.target.value))
        recomputeSchedule()
    }
    
    const OnChangeWakeUpSelect = (e : any)=>{
        setWakeTime(parseInt(e.target.value));
        recomputeSchedule()
    }

    const OnChangeRoutineStartTime = (e : any, routineInd : number) => {
        const newVal = parseInt(e.target.value);
        const tmpRoutineList = [...routineList];

        tmpRoutineList[routineInd].start = newVal;
        setRoutineList(tmpRoutineList)
        recomputeSchedule()
    }

    const OnChangeRoutineEndTime = (e : any, routineInd : number) => {
        const newVal = parseInt(e.target.value);
        const tmpRoutineList = [...routineList];

        tmpRoutineList[routineInd].end = newVal;
        setRoutineList(tmpRoutineList)
        recomputeSchedule()
    }

    const toggleRoutine = (routineInd : number)=>{
        const tmpRoutineList = [...routineList];
        tmpRoutineList[routineInd].active = !tmpRoutineList[routineInd].active;
        setRoutineList(tmpRoutineList)
        recomputeSchedule()
    }

    const deleteRoutine = (routineInd : number)=>{
        const tmpRoutineList = [...routineList];
        tmpRoutineList.splice(routineInd, 1);
        setRoutineList(tmpRoutineList)
        recomputeSchedule()
    }

    const addRoutine = ()=>{
        const tmpRoutineList = [...routineList];
        tmpRoutineList.push({title: "Routine #" + (tmpRoutineList.length + 1), start: wakeTime + 1, end: sleepTime, active: true, isConflicting: "", color: "#FFD580"})
        setRoutineList(tmpRoutineList)
        recomputeSchedule()
    }

    const OnRoutineTitleChange = (e : any, routineInd : number)=>{
        const tmpRoutineList = [...routineList];
        tmpRoutineList[routineInd].title = e.target.value;
        setRoutineList(tmpRoutineList)
        recomputeSchedule()
    }

    const OnRoutineColorChange = (e : any, routineInd : number)=>{
        const tmpRoutineList = [...routineList];
        tmpRoutineList[routineInd].color = e;
        setRoutineList(tmpRoutineList)
        recomputeSchedule()
    }

    const removeGoal = (goalInd : number) => {
        const tmpGoalList = [...goals]
        tmpGoalList.splice(goalInd, 1);
        setGoals(tmpGoalList);
    }

    return (
    <Flex direction="column" p="30px" gap="10px" width="100%">
        <Flex direction="column" mb="20px">
            <Heading size="2xl" fontWeight="900">Profile</Heading>
            <Text>Changing your profile will automatically reset your existing tasks</Text>
        </Flex>

        <Heading size="lg" fontWeight="900">Wake and Sleep Times</Heading>
        <Flex direction="column" gap="20px" border="4px solid" borderColor="black" p="20px" bg="#F9F5EB" mb="30px" px="40px">
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
        </Flex>

        <Flex direction={["column","column","column","row"]} align={["start","start","start","end"]} gap="30px">
                <Flex direction="column">
                    <Heading size="lg" fontWeight="900">Routines</Heading>
                    <Text>Schedule Reoccurring Daily Events (Same Time Each Day)</Text>
                </Flex>
        </Flex>
        <Flex direction="column" gap="30px" mt="10px" border="4px solid" borderColor="black" p="20px" bg="#F9F5EB" mb="30px" px="40px">
            <Button colorScheme='blue' bg="#002B5B" onClick={addRoutine}>
                Add New Routine
            </Button>
            <Flex direction="column" gap="30px"> 
            {routineList.map((routine : any, routineInd : number)=>{
                return (
                    <Box key={routineInd}>
                        <ScaleFade initialScale={0.7} in={true}>
                            <Flex direction="column" border="4px solid" borderColor="black" p="20px" bg="#E4DCCF" align="end">
                                <Flex direction="row" width="100%">
                                    <Flex direction="row" width="50%" justify="start">
                                    {routine.isConflicting &&
                                        <Text fontWeight="900" color="red.600">This routine cannot be active because it conflicts with {routine.isConflicting}</Text>
                                    }
                                    </Flex>
                                    <Flex direction="row" width="50%" justify="end">
                                        <Tooltip hasArrow fontWeight="900" label='Delete Routine' bg='red.600' placement='top'>
                                            <IconButton
                                                colorScheme='red'
                                                aria-label='delete'
                                                maxW="10px"
                                                size="xs"
                                                onClick={()=>{deleteRoutine(routineInd)}}
                                                icon={<Icon as={FaWindowClose} boxSize={["10px","10px","15px"]}/>}
                                            />
                                        </Tooltip>
                                    </Flex>
                                </Flex>
                                <Flex direction="column" align="start" minW="100%">
                                    <Flex direction={["column","column","column","row"]} gap="3px" align={["start","start","start","end"]} width="100%">
                                        <FormControl isRequired>
                                            <FormLabel>Routine Title?</FormLabel>
                                            <Input bg={routine.active?routine.color:"lightgray"} fontWeight="700" placeholder={"Routine Title"} value={routine.title} onChange={(e)=>{OnRoutineTitleChange(e, routineInd)}}/>
                                        </FormControl>
                                        <FormControl isRequired>
                                            <FormLabel>Routine Start Time?</FormLabel>
                                            <Select bg={routine.active?routine.color:"lightgray"} fontWeight="700" value={routine.start} onChange={(e)=>{OnChangeRoutineStartTime(e, routineInd)}}>
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
                                            <FormLabel>Routine End Time?</FormLabel>
                                            <Select bg={routine.active?routine.color:"lightgray"} fontWeight="700" value={routine.end} onChange={(e)=>{OnChangeRoutineEndTime(e, routineInd)}}>
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
                                        {routine.active && <Button colorScheme='red' minW="100px" onClick={()=>{toggleRoutine(routineInd)}}><Text>Deactivate</Text></Button>}
                                        {!routine.active && <Button colorScheme='green' minW="100px" onClick={()=>{toggleRoutine(routineInd)}}><Text>Activate</Text></Button>}
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
                            </Flex>
                        </ScaleFade>
                    </Box>
                );
            })
            }
            </Flex>
        </Flex>

        <Flex direction="column">
            <Heading size="lg" fontWeight="900">Goals</Heading>
            <Text>Create Reoccuring AI-scheduled tasks (Different Times Each Day)</Text>
        </Flex>
        <Flex direction="column" gap="30px" mt="10px" border="4px solid" borderColor="black" p="20px" bg="#F9F5EB" mb="30px" px="40px">
            <Flex direction={["column","column","column","row"]} align={["start","start","start","center"]} gap="30px">
                <FormControl isInvalid={goalInputError}>
                    <FormLabel>Add any goals you have that you can set time apart each day to acheive</FormLabel>
                    <FormErrorMessage>Please Use a Valid Goal Name</FormErrorMessage>
                    <Flex direction="row">
                        <Input bg="white" value={goalInput} 
                        onKeyDown={(e)=>{
                            if(e.key=='Enter'){
                                setGoals([...goals, goalInput])
                                setGoalInput("")
                            }
                        }} 
                        onChange={(e)=>{setGoalInput(e.target.value)}} placeholder='I want to learn to...' type="text"/>
                        <Button colorScheme='blue' bg="#002B5B" onClick={()=>{
                        setGoals([...goals, goalInput])
                        setGoalInput("")
                        }}>Add</Button>
                    </Flex>
                    <FormHelperText>Example: I want to learn Spanish</FormHelperText>
                </FormControl>
            </Flex>
            <Flex direction="column" gap="20px"> 
                {
                    goals.map((goal : string, index : number)=>{
                        return (
                            <Box key={index}>
                                <ScaleFade initialScale={0.1} in={true}>
                                    <Flex direction="row" border="4px solid" borderColor="black" p="20px" bg="#E4DCCF" justify="space-between" align="start" px="50px">
                                        <Flex direction="column">
                                            <Heading size="sm">Lifestyle Goal #{index + 1}</Heading>
                                            <Text fontSize="2xl">{goal}</Text>
                                        </Flex>

                                        <Tooltip hasArrow fontWeight="900" label='Delete Goal' bg='red.600' placement='top'>
                                            <IconButton
                                                colorScheme='red'
                                                aria-label='delete'
                                                size="xs"
                                                onClick={()=>{removeGoal(index)}}
                                                icon={<Icon as={FaWindowClose} boxSize={["10px","10px","15px"]}/>}
                                            />
                                        </Tooltip>
                                    </Flex>
                                </ScaleFade>
                            </Box>
                        )
                    })
                }
            </Flex>
        </Flex>

    </Flex>
  )
}
