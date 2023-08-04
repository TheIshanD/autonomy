import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect } from 'react' 
import "react-color-palette/lib/css/styles.css";


import { 
  Button,
  Flex, FormControl, FormLabel, Heading, Input, Text, Box, Select, chakra, FormHelperText, Spacer, Divider, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, IconButton, Icon, FormErrorMessage, BreadcrumbLink, Radio, RadioGroup, Tooltip, ScaleFade
} from '@chakra-ui/react'
import SideNav from '@/components/SideNav'
import Header from '@/components/Header'
import { ColorPicker, useColor } from 'react-color-palette'

import { FaWindowClose, FaPlusSquare } from "react-icons/fa";

export default function CalenderTab(props : any) {
    const {schedule, setSchedule, sleepTime, wakeTime, timeList, unscheduledTasks, setUnscheduledTasks, goals , scheduledTasks, setScheduledTasks, recomputeSchedule} = props;

    const [taskInput, setTaskInput] = React.useState("");

    const [hasManualTaskAddTitleError, setHasManualTaskAddTitleError] = React.useState(false)
    const [hasManualTaskAddTimeError, setHasManualTaskAddTimeError] = React.useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [modalTaskIndex, setModalTaskIndex] = React.useState(-1);
    const [modalTaskIndexEnd, setModalTaskIndexEnd] = React.useState(-1);
    const [modalTaskInput, setModalTaskInput] = React.useState("");

    const [modalStartOutOfBoundsError, setModalStartOutOfBoundsError] = React.useState(false);
    const [modalEndOutOfBoundsError, setModalEndOutOfBoundsError] = React.useState(false);

    const [modalTaskBetweenError, setModalTaskBetweenError] = React.useState("");

    const [color, setColor] = React.useState("#FF6969");


    const addTasksAI = async () => {
        const fetchConfig = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                schedule: awakeSchedule(),
                tasks: unscheduledTasks,
                goals: goals,
            }), 
        }

        const response = await fetch("/api/schedule/add-tasks", fetchConfig);
        const data = await response.json();
  
        const aiString : string = data.response;

        const responseTimes = aiString.split("\n")

        const tmpSchedule = [...schedule]

        var valid = true

        responseTimes.map((row : string, index : number)=>{
            if(index!=0) {
                const firstDashIndex = row.indexOf("-")
                const secondDashIndex = row.indexOf("-" , firstDashIndex + 1)

                const startTime = row.substring(0, firstDashIndex)
                const endTime = row.substring(firstDashIndex + 1, secondDashIndex)

                const startIndex = timeList.indexOf(startTime)
                const endIndex = timeList.indexOf(endTime)
                
                if(wakeTime < sleepTime) {
                    if(startIndex < wakeTime || endIndex > sleepTime) {
                        valid = false
                    }
                }

                if(wakeTime > sleepTime) {
                    if(startIndex >= sleepTime && startIndex < wakeTime) {
                        valid = false
                    }
                    if(endTime > sleepTime && endTime <= wakeTime) {
                        valid = false
                    }
                }

                var currIndex = startIndex
                while(currIndex != endIndex) {
                    if(schedule[currIndex].activity != "[EMPTY]") {
                        valid = false
                    }

                    currIndex++;
                    currIndex%=48
                }
            }
        })

        if(valid) {
            responseTimes.map((row : string, index : number)=>{
                if(index!=0) {
                    const firstDashIndex = row.indexOf("-")
                    const secondDashIndex = row.indexOf("-" , firstDashIndex + 1)
    
                    const startTime = row.substring(0, firstDashIndex)
                    const endTime = row.substring(firstDashIndex + 1, secondDashIndex)
                    const activity = row.substring(secondDashIndex + 2)
    
                    const startIndex = timeList.indexOf(startTime)
                    const endIndex = timeList.indexOf(endTime)
                    
                    var currIndex = startIndex
                    var isFirstIteration = true
                    while(currIndex != endIndex) {
                        tmpSchedule[currIndex].activity = activity
                        tmpSchedule[currIndex].isContinuation = !isFirstIteration
    
                        currIndex++;
                        currIndex%=48
                    }
                }
            })
    
            setSchedule(tmpSchedule)
        }
    }

    const awakeSchedule = ()=>{
        var tmpArr = [];
    
        var tmpWake = wakeTime;
    
        while(tmpWake != sleepTime) {
          tmpArr.push(schedule[tmpWake]);

          tmpWake = tmpWake + 1;
          tmpWake = tmpWake % 48;
        }
    
        tmpArr.push(schedule[sleepTime]);

        return tmpArr;
    }

    const toAbsoluteTime =(time : number)=>{
        var curr = time;
        curr += wakeTime
        curr %= 48;
        return curr;
    }

    const removeAITask = (key : number)=>{
        const tmpTasks = [...unscheduledTasks];
        tmpTasks.splice(key, 1);
        setUnscheduledTasks(tmpTasks)
    }

    const addTaskManually = ()=>{
        if(wakeTime < sleepTime && (toAbsoluteTime(modalTaskIndex) < wakeTime || toAbsoluteTime(modalTaskIndex) > sleepTime)) {
            setModalStartOutOfBoundsError(true)
        } else if (wakeTime > sleepTime && toAbsoluteTime(modalTaskIndex) > sleepTime && toAbsoluteTime(modalTaskIndex) < wakeTime) {
            setModalStartOutOfBoundsError(true)

            setModalEndOutOfBoundsError(false)
            setHasManualTaskAddTitleError(false)
            setHasManualTaskAddTimeError(false)
            setModalTaskBetweenError("")
        } else if(wakeTime < sleepTime && (toAbsoluteTime(modalTaskIndexEnd) < wakeTime || toAbsoluteTime(modalTaskIndexEnd) > sleepTime)) {
            setModalEndOutOfBoundsError(true)

            setModalStartOutOfBoundsError(false)
            setHasManualTaskAddTitleError(false)
            setHasManualTaskAddTimeError(false)
            setModalTaskBetweenError("")
        } else if (wakeTime > sleepTime && toAbsoluteTime(modalTaskIndexEnd) > sleepTime && toAbsoluteTime(modalTaskIndexEnd) < wakeTime) {
            setModalEndOutOfBoundsError(true)

            setModalStartOutOfBoundsError(false)
            setHasManualTaskAddTitleError(false)
            setHasManualTaskAddTimeError(false)
            setModalTaskBetweenError("")
        } else if(modalTaskInput=="") {
            setHasManualTaskAddTitleError(true);

            setModalStartOutOfBoundsError(false)
            setModalEndOutOfBoundsError(false)
            setHasManualTaskAddTimeError(false);
            setModalTaskBetweenError("")
        } else if (modalTaskIndex >= modalTaskIndexEnd) {
            setHasManualTaskAddTimeError(true);

            setModalStartOutOfBoundsError(false)
            setModalEndOutOfBoundsError(false)
            setHasManualTaskAddTitleError(false)
            setModalTaskBetweenError("")
        } else {
            var start = modalTaskIndex;
            var hasTaskInBetween = false;
            while(start != modalTaskIndexEnd) {
                if(schedule[toAbsoluteTime(start)].activity != "[EMPTY]") {
                    hasTaskInBetween = true;
                    setModalTaskBetweenError(schedule[toAbsoluteTime(start)].activity)
                    setHasManualTaskAddTimeError(false);
                    setModalStartOutOfBoundsError(false)
                    setModalEndOutOfBoundsError(false)
                    setHasManualTaskAddTitleError(false)
                    break;
                }

                start += 1;
                start %= 48;
            }
            if(!hasTaskInBetween) {
                const tempScheduledTasks = [...scheduledTasks]
                tempScheduledTasks.push({
                    start: toAbsoluteTime(modalTaskIndex),
                    end: toAbsoluteTime(modalTaskIndexEnd),
                    title: modalTaskInput,
                    color: color,
                })

                setScheduledTasks(tempScheduledTasks)
                recomputeSchedule()

                
                setModalTaskInput("");
                setModalTaskBetweenError("");

                setHasManualTaskAddTitleError(false)
                setHasManualTaskAddTimeError(false)

                setModalStartOutOfBoundsError(false)
                setModalEndOutOfBoundsError(false)

                onClose();
            }
        }
    }


    const removeActivity = (key : number)=>{
        var tempScheduledTasks = [...scheduledTasks];
        tempScheduledTasks = tempScheduledTasks.filter((task)=>{task.start != toAbsoluteTime(key)})
        setScheduledTasks(tempScheduledTasks)

        const tempSchedule = [...schedule];

        const activityName = tempSchedule[toAbsoluteTime(key)].activity;

        var increment = 0;
        while(tempSchedule[toAbsoluteTime(key+increment)].activity == activityName) {
            tempSchedule[toAbsoluteTime(key+increment)].activity = "[EMPTY]"
            increment++;
        }

        setSchedule(tempSchedule)
    }

    const onChangeStartTask = (e : any)=>{
        const index = parseInt(e.target.value);
        setModalTaskIndex((index - wakeTime + 48)%48);
    }

    const onChangeEndTask = (e : any)=>{
        const index = parseInt(e.target.value);
        setModalTaskIndexEnd((index - wakeTime + 48) % 48)
    }

    const closeModal = ()=>{
        setHasManualTaskAddTimeError(false)
        setHasManualTaskAddTitleError(false)
        setModalStartOutOfBoundsError(false)
        setModalEndOutOfBoundsError(false)
        setModalTaskBetweenError("")
        onClose()
    }

    const aiTaskColorChange = (e : any, taskIndex : number)=>{
        const tmpTasks = [...unscheduledTasks]
        tmpTasks[taskIndex].color = e
        setUnscheduledTasks(tmpTasks)
    }

    const aiTaskTimeChange = (e : any, taskIndex : number)=>{
        const tmpTasks = [...unscheduledTasks]
        tmpTasks[taskIndex].duration = e.target.value
        setUnscheduledTasks(tmpTasks)
    }
    
    return (
    <Flex direction="column" p="30px" gap=" 30px" width="100%">
        <Heading size="2xl" fontWeight="900">Calendar</Heading>

        <Flex direction={["column","column","column","row"]}>
            <Flex direction="column" bg="#F9F5EB" width={["100%","100%","100%","70%"]} p="20px" border="4px solid" borderColor="black">
                {awakeSchedule().map((slot, key)=>{              
                    return (
                        <Flex key={key} direction="row" width="100%" height={["60px","50px","40px","35px"]} justify="start" align="start" bg="#F9F5EB">
                            {key%2==0 && <Heading fontSize="lg" fontWeight="800" mr={["10px","0px","0px","0px"]}>{slot.start}</Heading>}
                            <Spacer />
                            {slot.activity=="[EMPTY]" &&
                                <Flex direction="column" width="90%" height="100%" align="center">
                                    <Divider m={0} width={["100%","100%","100%","100%"]} border="1px solid" borderColor="gray" />

                                    <Tooltip hasArrow fontWeight="900" label={"Add Task (" + slot.start + ")"} bg="#00ab66" placement='top'>
                                        <Flex onClick={()=>{setModalTaskIndex(key);setModalTaskIndexEnd((key + 1)%48);onOpen()}} opacity="0" width="90%" height="100%" justify="center" align="center" _hover={{background: "#00ab66", opacity: "1"}}>
                                            <Icon as={FaPlusSquare} color="white" boxSize="50%"/>
                                        </Flex>
                                    </Tooltip>
                                </Flex>
                            }
                            {slot.activity!="[EMPTY]" &&
                                <Flex direction="row" width="90%" height="100%">
                                    <Divider width={["0","5%","5%","5%"]} m={0} border="1px solid" borderColor="gray" />
                                    
                                    <Flex direction="row" bg={slot.color} width="90%" justify="center" align="center" px={["10px","10px","10px","20px"]} borderTop={slot.isContinuation?"":"3px solid"} borderColor="black">
                                        <Box width="100%">
                                            <ScaleFade initialScale={0.7} in={true}>
                                                <Flex direction="row" justify="center" align="center" px={["10px","10px","10px","20px"]} width="100%">
                                                    <Flex direction={["column","row","row","row"]} width="100%" justify="left" align="baseline" hidden={slot.isContinuation}>
                                                        <Heading fontWeight="800" size={["xs","xs","sm","md"]} maxW={["120px","100000px","100000px","100000px","100000px"]} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">{slot.activity}</Heading>
                                                        <Text fontSize={["2xs","2xs","xs","sm"]} ml="5px" mr="30px">{slot.start}</Text>
                                                    </Flex>
                                                    <Spacer />
                                                    {!slot.isContinuation &&
                                                        <Tooltip hasArrow fontWeight="900" label='Delete Task' bg='red.600' placement='top'>
                                                            <IconButton
                                                                colorScheme='red'
                                                                aria-label='delete'
                                                                size="xs"
                                                                onClick={()=>{removeActivity(key)}}
                                                                icon={<Icon as={FaWindowClose} boxSize={["10px","10px","15px"]}/>}
                                                            />
                                                        </Tooltip>
                                                    }
                                                </Flex>
                                            </ScaleFade>
                                        </Box>
                                    </Flex>

                                    <Divider width={["0","5%","5%","5%"]} m={0} border="1px solid" borderColor="gray" />
                                </Flex>
                            }
                        </Flex>
                    )
                })
                }
            </Flex>

            <Flex direction="column" width={["100%","100%","100%","30%"]} pl={["0","0","0","20px"]} pt={["20px","20px","20px","0px"]} pr={["0","0","0","20px"]}>
                <FormControl border="4px solid" borderColor="black" p="10px" bg="#F9F5EB">
                    <Heading mb="10px" size="lg" fontWeight="900">Task List</Heading>
                    <FormLabel>Add any unscheduled tasks that you want to accomplish today</FormLabel>
                    <Flex direction="row">
                        <Input 
                        bg="white" 
                        value={taskInput} 
                        onKeyDown={(e)=>{
                            if(e.key=='Enter'){
                                const tmpTasks = [...unscheduledTasks];
                                tmpTasks.push({title: taskInput, color: "#FF6969", duration: ""});
                                setUnscheduledTasks(tmpTasks)
                                setTaskInput("")
                            }
                        }} 
                        onChange={(e)=>{setTaskInput(e.target.value)}}
                        placeholder='Do Something' type="text"/>

                        <Button colorScheme='blue' bg="#002B5B" onClick={()=>{
                            const tmpTasks = [...unscheduledTasks];
                            tmpTasks.push({title: taskInput, color: "#FF6969", duration: ""});
                            setUnscheduledTasks(tmpTasks)
                            setTaskInput("")
                        }}>Add</Button>
                    </Flex>

                    <FormHelperText>Example: Call John about house repairs</FormHelperText>
                    <FormHelperText>Example: Shower</FormHelperText>
                </FormControl>

                {unscheduledTasks.length >= 1 &&
                    <Flex direction="column" mt="40px" gap="20px">
                        {/* <Heading>Task List</Heading> */}
                        {
                        unscheduledTasks.map((task : any, taskIndex : number)=>{
                            return (
                                <Box key={taskIndex}>
                                    <ScaleFade initialScale={0.7} in={true}>
                                        <Flex direction="column" bg="#F9F5EB" p="10px" border="4px solid" borderColor="black" align="right">
                                            <Flex direction="row" mb="3px">
                                                <Text width="50%">Task Title:</Text>
                                                <Flex direction="row" width="50%" justify="space-between">
                                                    <Text>Duration:</Text>
                                                    <Tooltip label="Delete Task" bg="red.600" hasArrow placement="top">
                                                        <IconButton
                                                            colorScheme='red'
                                                            aria-label='delete'
                                                            size="xs"
                                                            onClick={()=>{removeAITask(taskIndex)}}
                                                            icon={<Icon as={FaWindowClose} boxSize={["10px","10px","15px"]}/>}
                                                        />
                                                    </Tooltip>
                                                </Flex>
                                            </Flex>
                                            <Flex direction="row" align="start">
                                                <Heading size="md" fontWeight="900">{task.title}</Heading>
                                                <Spacer />
                                                <Select bg={task.color} color="black" minW="50%" maxW="50%" onChange={(e)=>{aiTaskTimeChange(e, taskIndex)}} value={task.duration}>
                                                    <chakra.option value="">AI Guess</chakra.option>
                                                    <chakra.option value="0.5 hours">0.5 hours</chakra.option>
                                                    <chakra.option value="1 hour">1 hour</chakra.option>
                                                    <chakra.option value="1.5 hour">1.5 hours</chakra.option>
                                                    <chakra.option value="2 hours">2 hours</chakra.option>
                                                    <chakra.option value="2.5 hours">2.5 hours</chakra.option>
                                                    <chakra.option value="3 hours">3 hours</chakra.option>
                                                    <chakra.option value="3.5 hours">3.5 hours</chakra.option>
                                                    <chakra.option value="4 hours">4 hours</chakra.option>
                                                    <chakra.option value="4.5 hours">4.5 hours</chakra.option>
                                                    <chakra.option value="5 hours">5 hours</chakra.option>
                                                    <chakra.option value="5.5 hours">5.5 hours</chakra.option>
                                                    <chakra.option value="6 hours">6 hours</chakra.option>
                                                    <chakra.option value="6.5 hours">6.5 hours</chakra.option>
                                                    <chakra.option value="7 hours">7 hours</chakra.option>
                                                    <chakra.option value="7.5 hours">7.5 hours</chakra.option>
                                                    <chakra.option value="8 hours">82 hours</chakra.option>
                                                </Select>
                                            </Flex>

                                            <RadioGroup mt="5px" onChange={(e)=>{aiTaskColorChange(e, taskIndex)}} value={task.color}>
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
                                    </ScaleFade>
                                </Box>
                            )
                        })
                        }
                        <Button colorScheme='blue' bg="#002B5B"  mt="10px" onClick={()=>{addTasksAI()}}>
                            Schedule Tasks With AI
                        </Button>
                    </Flex>
                }
            </Flex>
        </Flex>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader background={color}>
                <Heading fontWeight="800" fontSize="xl">Add Task</Heading>
            </ModalHeader>
            <ModalCloseButton onClick={closeModal}/>
            <ModalBody>
                <Flex direction="column" width="100%" gap="20px">
                    <FormControl isInvalid={hasManualTaskAddTitleError} isRequired>
                        <FormLabel>Task Title</FormLabel>
                        <Input bg="white" value={modalTaskInput} onChange={(e)=>{setModalTaskInput(e.target.value)}} placeholder='Do Something' type="text"/>
                        <FormErrorMessage>Must Include Some Text</FormErrorMessage>
                        <FormHelperText>Describe The Task</FormHelperText>
                    </FormControl>

                    {modalTaskBetweenError &&
                        <Text fontWeight="900" color="red.600">This task cannot be placed because its timing conflicts with {modalTaskBetweenError}</Text>
                    }

                    <Flex direction="row" gap="20px">
                        <FormControl isRequired isInvalid={(hasManualTaskAddTimeError || modalTaskBetweenError!="" || modalStartOutOfBoundsError)}>
                            <FormLabel>Task Start Time</FormLabel>
                            <Select value={(modalTaskIndex + wakeTime)%48} onChange={(e)=>{onChangeStartTask(e)}} bg="white">
                                {timeList.map((timeString : string, index : number)=>{
                                    if(wakeTime < sleepTime) {
                                        if(index < wakeTime) return null;
                                        if(index >= sleepTime) return null;
                                    } else {
                                        if(index < wakeTime && index >= sleepTime) return null;
                                    }

                                    return <chakra.option value={index} key={index}>{timeString}</chakra.option>
                                })}
                            </Select>
                            {hasManualTaskAddTimeError && <FormErrorMessage>Start Time Must Be Before End Time</FormErrorMessage>}
                            {modalStartOutOfBoundsError && <FormErrorMessage>Start Time Must Be After Wake Up</FormErrorMessage>}
                        </FormControl>

                        <FormControl isRequired isInvalid={hasManualTaskAddTimeError || modalTaskBetweenError!="" || modalEndOutOfBoundsError}>
                            <FormLabel>Task End Time</FormLabel>
                            <Select value={(modalTaskIndexEnd + wakeTime)%48} onChange={(e)=>{onChangeEndTask(e)}} bg="white">
                                {timeList.map((timeString : string, index : number)=>{
                                    if(wakeTime < sleepTime) {
                                        if(index < wakeTime) return null;
                                        if(index > sleepTime) return null;
                                    } else {
                                        if(index < wakeTime && index > sleepTime) return null;
                                    }

                                    return <chakra.option value={index} key={index}>{timeString}</chakra.option>
                                })}
                            </Select>
                            <FormHelperText>Must Be After The Start Time In Your Day (Your Sleep and Wake times)</FormHelperText>
                            {modalEndOutOfBoundsError && <FormErrorMessage>End Time Must Be Before Sleep Time</FormErrorMessage>}
                        </FormControl>
                    </Flex>
                    <Flex direction="column">
                        <FormControl>
                            <FormLabel>Choose a Background Color for the Task</FormLabel>
                            <RadioGroup onChange={(e : any)=>{setColor(e)}} value={color} mt="5px">
                            <Flex direction='row' gap="10px">
                                <Radio size="lg" value="#FF6969" bgColor="#FF6969" _checked={{background:"#FF6969", border: "3px solid", borderColor: "black"}}></Radio>
                                <Radio size="lg" value="#FFD580" bgColor="#FFD580" _checked={{background:"#FFD580", border: "3px solid", borderColor: "black"}}></Radio>
                                <Radio size="lg" value="#ffffe0" bgColor="#ffffe0" _checked={{background:"#ffffe0", border: "3px solid", borderColor: "black"}}></Radio>
                                <Radio size="lg" value="#90EE90" bgColor="#90EE90" _checked={{background:"#90EE90", border: "3px solid", borderColor: "black"}}></Radio>
                                <Radio size="lg" value="#ADD8E6" bgColor="#ADD8E6" _checked={{background:"#ADD8E6", border: "3px solid", borderColor: "black"}}></Radio>
                                <Radio size="lg" value="#D6B4FC" bgColor="#D6B4FC" _checked={{background:"#D6B4FC", border: "3px solid", borderColor: "black"}}></Radio>
                            </Flex>
                        </RadioGroup>
                        </FormControl>
                    </Flex>
                </Flex>
            </ModalBody>
            <ModalFooter gap="20px">
                <Button colorScheme='red' onClick={closeModal}>
                    Cancel
                </Button>
                <Button colorScheme='blue' onClick={()=>{addTaskManually()}}>
                    Submit
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>

    </Flex>
  )
}
