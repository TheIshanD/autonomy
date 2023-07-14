import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect } from 'react' 
import "react-color-palette/lib/css/styles.css";


import { 
  Button,
  Flex, FormControl, FormLabel, Heading, Input, Text, Box, Select, chakra, FormHelperText, Spacer, Divider, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, IconButton, Icon, FormErrorMessage, BreadcrumbLink, Radio, RadioGroup, Tooltip
} from '@chakra-ui/react'
import SideNav from '@/components/SideNav'
import Header from '@/components/Header'
import { ColorPicker, useColor } from 'react-color-palette'

import { FaWindowClose, FaPlusSquare, FaCalendarPlus } from "react-icons/fa";

export default function CalenderTab(props : any) {
    const {schedule, setSchedule, sleepTime, wakeTime} = props;

    const [taskInput, setTaskInput] = React.useState("");
    const [tasks, setTasks] = React.useState([""]);

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

    const addTaskManually = ()=>{
        if(wakeTime < sleepTime && (toAbsoluteTime(modalTaskIndex) < wakeTime || toAbsoluteTime(modalTaskIndex) > sleepTime)) {
            setModalStartOutOfBoundsError(true)
        } else if (wakeTime > sleepTime && toAbsoluteTime(modalTaskIndex) > sleepTime && toAbsoluteTime(modalTaskIndex) < wakeTime) {
            setModalStartOutOfBoundsError(true)
        } else if(wakeTime < sleepTime && (toAbsoluteTime(modalTaskIndexEnd) < wakeTime || toAbsoluteTime(modalTaskIndexEnd) > sleepTime)) {
            setModalEndOutOfBoundsError(true)
        } else if (wakeTime > sleepTime && toAbsoluteTime(modalTaskIndexEnd) > sleepTime && toAbsoluteTime(modalTaskIndexEnd) < wakeTime) {
            setModalEndOutOfBoundsError(true)
        } else if(modalTaskInput=="") {
            setHasManualTaskAddTitleError(true);
        } else if (modalTaskIndex >= modalTaskIndexEnd) {
            setHasManualTaskAddTimeError(true);
        } else {
            var start = modalTaskIndex;
            var hasTaskInBetween = false;
            while(start != modalTaskIndexEnd) {
                if(schedule[toAbsoluteTime(start)].activity != "[EMPTY]") {
                    hasTaskInBetween = true;
                    setModalTaskBetweenError(schedule[toAbsoluteTime(start)].activity)
                    break;
                }

                start += 1;
                start %= 48;
            }
            if(!hasTaskInBetween) {
                const tempSchedule = [...schedule];
                var curr = modalTaskIndex;
                var isFirstIteration = true;
                while(curr != modalTaskIndexEnd) {
                    tempSchedule[(curr + wakeTime)%48].activity = modalTaskInput;
                    tempSchedule[(curr + wakeTime)%48].color = color;
                    tempSchedule[(curr + wakeTime)%48].isContinuation = !isFirstIteration;
        
                    curr += 1;
                    curr %= 48;
        
                    isFirstIteration = false;
                }
    
                setSchedule(tempSchedule)
                setModalTaskInput("");
                setModalTaskBetweenError("");
                setHasManualTaskAddTitleError(false)
                setHasManualTaskAddTimeError(false)
                setModalStartOutOfBoundsError(false)
                setModalEndOutOfBoundsError(false)
                setModalStartOutOfBoundsError(false)
                setModalEndOutOfBoundsError(false)
                onClose();
            }
        }
    }


    const removeActivity = (key : number)=>{
        const tempSchedule = [...schedule];

        const activityName = tempSchedule[(key + wakeTime)%48].activity;

        var increment = 0;
        while(tempSchedule[(key + wakeTime + increment)%48].activity == activityName) {
            tempSchedule[(key + wakeTime + increment)%48].activity = "[EMPTY]"
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

    return (
    <Flex direction="column" p="30px" gap=" 30px" width="100%">
        <Heading size="2xl">Calendar</Heading>

        <Flex direction="row">
            <Flex direction="column" bg="white" width="70%" p="20px" >
                {awakeSchedule().map((slot, key)=>{              
                    return (
                        <Flex key={key} direction="row" width="100%" height="50px" justify="start" align="start" bg="white">
                            <Text>{slot.start}</Text>
                            <Spacer />
                            {slot.activity=="[EMPTY]" &&
                                <Flex direction="column" width="90%" height="100%" align="center">
                                    <Divider m={0}/>

                                    <Tooltip hasArrow label='Add Task' bg="#00ab66" placement='top'>
                                        <Flex onClick={()=>{setModalTaskIndex(key);setModalTaskIndexEnd((key + 1)%48);onOpen()}} opacity="0" width="80%" height="100%" justify="center" align="center" _hover={{background: "#00ab66", opacity: "1"}}>
                                            <Icon as={FaPlusSquare} color="white" boxSize="50%"/>
                                        </Flex>
                                    </Tooltip>
                                </Flex>
                            }
                            {slot.activity!="[EMPTY]" &&
                                <Flex direction="row" width="90%" height="100%">
                                    <Divider width="10%" m={0}/>

                                    <Flex direction="row" bg={slot.color} width="80%" justify="center" align="center" px="20px" borderTop={slot.isContinuation?"":"4px solid"} borderColor="black">
                                        <Flex direction="row" width="100%" justify="center" align="baseline" hidden={slot.isContinuation}>
                                            <Heading size="md" mr="5px">{slot.activity}</Heading>
                                            <Text fontSize="sm">{slot.start}</Text>
                                            <Spacer />
                                            <Tooltip hasArrow label='Delete Task' bg='red.600' placement='top'>
                                                <IconButton
                                                    colorScheme='red'
                                                    aria-label='Search database'
                                                    boxSize="32px"
                                                    icon={<Icon as={FaWindowClose} boxSize={"20px"}/>}
                                                    onClick={()=>{removeActivity(key)}}
                                                />
                                            </Tooltip>
                                        </Flex>
                                    </Flex>

                                    <Divider width="10%" m={0}/>
                                </Flex>
                            }
                        </Flex>
                    )
                })
                }
            </Flex>

            <Flex direction="column" width="30%" p="20px" gap="60px">
                <FormControl>
                    <FormLabel>Add any one-off tasks that you want to accomplish today</FormLabel>
                    <Flex direction="row">
                    <Input bg="white" value={taskInput} onChange={(e)=>{setTaskInput(e.target.value)}} placeholder='Do Something' type="text"/>
                    <Button colorScheme='blue' onClick={()=>{
                        setTasks([...tasks, taskInput])
                        setTaskInput("")
                    }}>Add</Button>
                    </Flex>
                </FormControl>

                <Flex direction="column" mt="20px">
                    <Heading>Today&apos;s Tasks</Heading>
                    {
                    tasks.map((task, key)=>{
                        return (key==0?null:<Text key={key}>{key+". "+task}</Text>)
                    })
                    }
                </Flex>

                <Button colorScheme='yellow'>
                    Send to AI
                </Button>
            </Flex>
        </Flex>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader background={color}>Add Task To Time</ModalHeader>
            <ModalCloseButton onClick={closeModal}/>
            <ModalBody>
                <Flex direction="column" width="100%" gap="20px">
                    <FormControl isInvalid={hasManualTaskAddTitleError}>
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
                            {hasManualTaskAddTimeError && <FormErrorMessage>Start Time Must Be Before End Time</FormErrorMessage>}
                            {modalStartOutOfBoundsError && <FormErrorMessage>Start Time Must Be After Wake Up</FormErrorMessage>}
                        </FormControl>

                        <FormControl isRequired isInvalid={hasManualTaskAddTimeError || modalTaskBetweenError!="" || modalEndOutOfBoundsError}>
                            <FormLabel>Task End Time</FormLabel>
                            <Select value={(modalTaskIndexEnd + wakeTime)%48} onChange={(e)=>{onChangeEndTask(e)}} bg="white">
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
