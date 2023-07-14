import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect } from 'react' 
import "react-color-palette/lib/css/styles.css";


import { 
  Button,
  Flex, FormControl, FormLabel, Heading, Input, Text, Box, Select, chakra, FormHelperText, Spacer, Divider, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, IconButton, Icon, FormErrorMessage, BreadcrumbLink
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

    const [color, setColor] = useColor("hex", "#FF6969");

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
            console.log("start time is out of bounds")
        } else if (wakeTime > sleepTime && toAbsoluteTime(modalTaskIndex) > sleepTime && toAbsoluteTime(modalTaskIndex) < wakeTime) {
            console.log("start time is out of bounds")
        } else if(wakeTime < sleepTime && (toAbsoluteTime(modalTaskIndexEnd) < wakeTime || toAbsoluteTime(modalTaskIndexEnd) > sleepTime)) {
            console.log("end time is out of bounds")
        } else if (wakeTime > sleepTime && toAbsoluteTime(modalTaskIndexEnd) > sleepTime && toAbsoluteTime(modalTaskIndexEnd) < wakeTime) {
            console.log("end time is out of bounds")
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
                    break;
                }

                start += 1;
                start %= 48;
            }
            if(hasTaskInBetween) {
                console.log("There is already a task where you want to schedule your task")
            } else {
                const tempSchedule = [...schedule];
                var curr = modalTaskIndex;
                var isFirstIteration = true;
                while(curr != modalTaskIndexEnd) {
                    tempSchedule[(curr + wakeTime)%48].activity = modalTaskInput;
                    tempSchedule[(curr + wakeTime)%48].color = color.hex;
                    tempSchedule[(curr + wakeTime)%48].isContinuation = !isFirstIteration;
        
                    curr += 1;
                    curr %= 48;
        
                    isFirstIteration = false;
                }
    
                setSchedule(tempSchedule)
                setModalTaskInput("");
                setHasManualTaskAddTitleError(false)
                setHasManualTaskAddTimeError(false);
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

                                    <Flex onClick={()=>{setModalTaskIndex(key);setModalTaskIndexEnd((key + 1)%48);onOpen()}} opacity="0" width="80%" height="100%" justify="center" align="center" _hover={{background: "brand.400", opacity: "1"}}>
                                        <Icon as={FaPlusSquare} boxSize="50%"/>
                                    </Flex>

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
                                            <IconButton
                                                colorScheme='red'
                                                aria-label='Search database'
                                                icon={<Icon as={FaWindowClose}/>}
                                                onClick={()=>{removeActivity(key)}}
                                            />
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
            <ModalHeader background={color.hex}>Add Task To Time</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Flex direction="column" width="100%" gap="30px">
                    <FormControl isInvalid={hasManualTaskAddTitleError}>
                        <FormLabel>Task Title</FormLabel>
                        <Input bg="white" value={modalTaskInput} onChange={(e)=>{setModalTaskInput(e.target.value)}} placeholder='Do Something' type="text"/>
                        <FormErrorMessage>Must Include Some Text</FormErrorMessage>
                        <FormHelperText>Describe The Task</FormHelperText>
                    </FormControl>

                    <Flex direction="row" gap="20px">
                        <FormControl isRequired isInvalid={hasManualTaskAddTimeError}>
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
                            <FormErrorMessage>Start Time Must Be Before End Time</FormErrorMessage>
                        </FormControl>

                        <FormControl isRequired isInvalid={hasManualTaskAddTimeError}>
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
                        </FormControl>
                    </Flex>

                    <Flex direction="column">
                        <Heading size="md">Pick a Color</Heading>
                        <ColorPicker width={228} height={114} color={color} onChange={setColor} hideHSV hideHEX />
                    </Flex>
                </Flex>
            </ModalBody>
            <ModalFooter gap="20px">
                <Button colorScheme='red' onClick={onClose}>
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
