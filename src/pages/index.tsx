import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect } from 'react' 

import { 
  Button,
  Flex, FormControl, FormLabel, Heading, Input, Text, Box, Select, chakra
} from '@chakra-ui/react'

const timeIndex = ()=>{
  return 0;
}

export default function Home() {
  const [goalInput, setGoalInput] = React.useState("");
  const [goals, setGoals] = React.useState([""]);
  const [pageIndex, setPageIndex] = React.useState(0);
  const [schedule, setSchedule] = React.useState([
      {time:"12:00am-12:30am", activity: "Sleep"},
      {time:"12:30am-1:00am", activity: "[EMPTY]"},
      {time:"1:00am-1:30am", activity: "[EMPTY]"},
      {time:"1:30am-2:00am", activity: "[EMPTY]"},
      {time:"2:00am-2:30am", activity: "[EMPTY]"},
      {time:"2:30am-3:00am", activity: "[EMPTY]"},
      {time:"3:00am-3:30am", activity: "[EMPTY]"},
      {time:"3:30am-3:00am", activity: "[EMPTY]"},
      {time:"4:00am-4:30am", activity: "[EMPTY]"},
      {time:"4:30am-4:00am", activity: "[EMPTY]"},
      {time:"5:00am-5:30am", activity: "[EMPTY]"},
      {time:"5:30am-5:00am", activity: "[EMPTY]"},
      {time:"6:00am-6:30am", activity: "[EMPTY]"},
      {time:"6:30am-6:00am", activity: "[EMPTY]"},
      {time:"7:00am-7:30am", activity: "[EMPTY]"},
      {time:"7:30am-7:00am", activity: "[EMPTY]"},
      {time:"8:00am-8:30am", activity: "Wake Up"},
      {time:"8:30am-8:00am", activity: "[EMPTY]"},
      {time:"9:00am-9:30am", activity: "[EMPTY]"},
      {time:"9:30am-9:00am", activity: "[EMPTY]"},
      {time:"10:00am-10:30am", activity: "[EMPTY]"},
      {time:"10:30am-10:00am", activity: "[EMPTY]"},
      {time:"11:00am-11:30pm", activity: "[EMPTY]"},
      {time:"11:30am-11:00pm", activity: "[EMPTY]"},
      {time:"12:00pm-12:30pm", activity: "[EMPTY]"},
      {time:"12:30pm-12:00pm", activity: "[EMPTY]"},
      {time:"1:00pm-1:30pm", activity: "[EMPTY]"},
      {time:"1:30pm-1:00pm", activity: "[EMPTY]"},
      {time:"2:00pm-2:30pm", activity: "[EMPTY]"},
      {time:"2:30pm-2:00pm", activity: "[EMPTY]"},
      {time:"3:00pm-3:30pm", activity: "[EMPTY]"},
      {time:"3:30pm-3:00pm", activity: "[EMPTY]"},
      {time:"4:00pm-4:30pm", activity: "[EMPTY]"},
      {time:"4:30pm-4:00pm", activity: "[EMPTY]"},
      {time:"5:00pm-5:30pm", activity: "[EMPTY]"},
      {time:"5:30pm-5:00pm", activity: "[EMPTY]"},
      {time:"6:00pm-6:30pm", activity: "[EMPTY]"},
      {time:"6:30pm-6:00pm", activity: "[EMPTY]"},
      {time:"7:00pm-7:30pm", activity: "[EMPTY]"},
      {time:"7:30pm-7:00pm", activity: "[EMPTY]"},
      {time:"8:00pm-8:30pm", activity: "[EMPTY]"},
      {time:"8:30pm-8:00pm", activity: "[EMPTY]"},
      {time:"9:00pm-9:30pm", activity: "[EMPTY]"},
      {time:"9:30pm-9:00pm", activity: "[EMPTY]"},
      {time:"10:00pm-10:30pm", activity: "[EMPTY]"},
      {time:"10:30pm-10:00pm", activity: "[EMPTY]"},
      {time:"11:00pm-11:30am", activity: "[EMPTY]"},
      {time:"11:30pm-11:00am", activity: "[EMPTY]"},
  ]);
  const [taskInput, setTaskInput] = React.useState("");
  const [tasks, setTasks] = React.useState([""]);

  const [sleepTime, setSleepTime] = React.useState(0);
  const [wakeTime, setWakeTime] = React.useState(16);

  const [response, setResponse] = React.useState("");

  const RequestGPTTaskListToSchedule = async ()=>{
    const fetchConfig = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({schedule: awakeSchedule(), taskList: tasks, goalList: goals}), 
    }

    const response = await fetch("/api/schedule/add-tasks", fetchConfig);
    const data = await response.json();

    const aiResponse: string = data.response;

    setResponse(aiResponse)
  }

  const OnChangeSleepSelect = (e : any)=>{
    const tempSchedule = [...schedule];
    tempSchedule[sleepTime].activity = "[EMPTY]"
    tempSchedule[e.target.value].activity = "Sleep"
    setSchedule(tempSchedule)
    setSleepTime(e.target.value)
  }

  const OnChangeWakeUpSelect = (e : any)=>{
    const tempSchedule = [...schedule];
    tempSchedule[wakeTime].activity = "[EMPTY]"
    tempSchedule[e.target.value].activity = "Wake Up"
    setSchedule(tempSchedule)
    setWakeTime(e.target.value)
  }

  const scheduleString = ()=>{
    var finalString = "";

    awakeSchedule().map((slot, key)=>{
      finalString+=slot.activity+"- "+slot.time+"\n";
    })

    return finalString;
  }  

  const awakeSchedule = ()=>{
    var tmpArr = [];

    var tmpWake = wakeTime;

    while(tmpWake != sleepTime) {
      tmpArr.push(schedule[tmpWake]);

      tmpWake += 1;
      tmpWake = tmpWake % 48;
    }

    tmpArr.push(schedule[sleepTime]);
    return tmpArr;
  }

  useEffect(()=>{
    console.log(scheduleString());
  },[schedule])

  return (
    <Flex direction="column" bgColor="lightgray" minH="100vh" align="center">
      <Flex direction="row" justify="center" bg="#ECCDB4" minH="100px" align="center" mb="70px" width="100%">
        <Heading size="4xl">Autonomy</Heading>
      </Flex>

      <Box hidden={pageIndex!=0}>
        <Flex direction="column" bg="white" width="80vw" minH="200px" borderRadius="25px" p="20px" gap="40px">
          <Heading>Profile Form</Heading>
          <FormControl isRequired>
            <FormLabel>When do you go to sleep?</FormLabel>
            <Select value={sleepTime} onChange={(e)=>{OnChangeSleepSelect(e)}}>
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
            <FormLabel>When do you wake up?</FormLabel>
            <Select value={wakeTime} onChange={(e)=>{OnChangeWakeUpSelect(e)}}>
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
          <FormControl>
            <FormLabel>Add any long term habits you want to form or goals that you have</FormLabel>
            <Flex direction="row">
              <Input value={goalInput} onChange={(e)=>{setGoalInput(e.target.value)}} placeholder='I want to learn to...' type="text"/>
              <Button colorScheme='blue' onClick={()=>{
                setGoals([...goals, goalInput])
                setGoalInput("")
              }}>Add</Button>
            </Flex>
          </FormControl>
          <Flex direction="column">
            <Heading>Long-Term Goals</Heading>
            {
              goals.map((goal, key)=>{
                return (<Text key={key}>{goal}</Text>)
              })
            }
          </Flex>

          <Flex direction="row" minW="100%" gap="30px">
            <Button colorScheme='yellow' width="50%" onClick={(e)=>{setPageIndex(pageIndex - 1)}}>Back</Button>
            <Button colorScheme='yellow' width="50%" onClick={(e)=>{setPageIndex(pageIndex + 1)}}>Next</Button>
          </Flex>
        </Flex>
      </Box>

      <Box hidden={pageIndex!=1}>
        <Flex direction="column" bg="white" width="80vw" minH="200px" borderRadius="25px" p="20px" gap="30px">
          <Heading>Your Schedule</Heading>
          <Flex direction="column">
            {awakeSchedule().map((slot , key)=>{              
              return (<Text key={key}>{slot.time+"- " + slot.activity}</Text>)
            })
            }
          </Flex>

          <FormControl>
            <FormLabel>Add any one off tasks that you want to accomplish today?</FormLabel>
            <Flex direction="row">
              <Input value={taskInput} onChange={(e)=>{setTaskInput(e.target.value)}} placeholder='Do Something' type="text"/>
              <Button colorScheme='blue' onClick={()=>{
                setTasks([...tasks, taskInput])
                setTaskInput("")
              }}>Add</Button>
            </Flex>
          </FormControl>
          <Flex direction="column">
            <Heading>Today's Tasks</Heading>
            {
              tasks.map((task, key)=>{
                return (<Text key={key}>{task}</Text>)
              })
            }
          </Flex>

          <Button colorScheme='yellow' onClick={()=>{RequestGPTTaskListToSchedule()}}>Generate</Button>

          <Flex direction="column">
            <Heading>AI Response</Heading>
            <Text>{response}</Text>
          </Flex>

          <Flex direction="row" minW="100%" gap="30px">
            <Button colorScheme='green' width="50%" onClick={(e)=>{setPageIndex(pageIndex - 1)}}>Back</Button>
            <Button colorScheme='green' width="50%" onClick={(e)=>{setPageIndex(pageIndex + 1)}}>Next</Button>
          </Flex>
        </Flex>
      </Box>

    </Flex>
  )
}
