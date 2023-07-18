import type { NextApiRequest, NextApiResponse } from 'next'
import { HfInference } from '@huggingface/inference'

const addTasksTextGen = async (scheduleString : string, tasksString : string, goalsString : string) => {
  const hf = new HfInference(process.env.HF_ACCESS_TOKEN)


  const prompt = `You are a professional schedule maker. Your goal is to make schedules for me that are efficient and match my goals and requirements. I will give you 2 examples of how to create a schedule.

  Base Schedule:
  
  7:30am-8:00am- Wake up
  8:00am-8:30am- [EMPTY]
  8:30am-9:00am- [EMPTY]
  9:00am-9:30am- Work
  9:30am-10:00am- Work
  10:00am-10:30am- Work
  10:30am-11:00am- Work
  11:00am-11:30am- Work
  11:30am-12:00pm- Work
  12:00pm-12:30pm- Work
  12:30pm-1:00pm- Work
  1:00pm-1:30pm- Work
  1:30pm-2:00pm- Work
  2:00pm-2:30pm- Work
  2:30pm-3:00pm- Work
  3:00pm-3:30pm- Work
  3:30pm-4:00pm- Work
  4:00pm-4:30pm- Work
  4:30pm-5:00pm- Work
  5:00pm-5:30pm- [EMPTY]
  5:30pm-6:00pm- [EMPTY]
  6:00pm-6:30pm- [EMPTY]
  6:30pm-7:00pm- [EMPTY]
  7:00pm-7:30pm- [EMPTY]
  7:30pm-8:00pm- [EMPTY]
  8:00pm-8:30pm- [EMPTY]
  8:30pm-9:00pm- [EMPTY]
  9:00pm-9:30pm- [EMPTY]
  9:30pm-10:00pm- [EMPTY]
  10:00pm-10:30pm- [EMPTY]
  10:30pm-11:00pm- [EMPTY]
  11:00pm-11:30pm- [EMPTY]
  11:30pm-12:00am- [EMPTY]
  12:00am-12:30am- [EMPTY]
  12:30am-1:00am- [EMPTY]
  1:00am-1:30am- Sleep
  
  Fill in a few of the [EMPTY] slots to accommodate the following goals. ONLY schedule the below tasks, nothing more: 
  
  1. I want to start learning Spanish
  
  Fill in a few of the [EMPTY] slots to accommodate the following tasks. ONLY schedule the below tasks, nothing more: 
  
  1. Taking Out The Trash
  2. Study
  3. Workout
  4. Shower
  
  Schedule Change Proposal:
  6:00pm-7:00pm- Workout
  7:00pm-7:30pm- Shower
  7:30pm-8:30pm- Taking Out The Trash
  8:00pm-9:00pm- Study
  9:00pm-9:30pm- Learn Spanish
  
  ---Example 1 Over---
  
  Base Schedule:`
  
  +"\n"+ scheduleString +"\n"+ 
  
  `Fill in a few of the [EMPTY] slots to accommodate the following goals. ONLY schedule the below tasks, nothing more:` 
  
  +"\n"+ goalsString +"\n"+ 
  
  `Fill in a few of the [EMPTY] slots to accommodate the following tasks. ONLY schedule the below tasks, nothing more: `
  
  +"\n"+ tasksString +"\n"+ 
  
  `Schedule Change Proposal:
  `

  console.log(prompt)
  const result = await hf.textGeneration({
    model: 'tiiuae/falcon-7b-instruct',
    inputs: prompt,
    parameters: {
      temperature: 1,
      max_new_tokens: 250,
    }
  })

  console.log(result.generated_text)

  return result.generated_text
}

const addTasksConversationGen = async (scheduleString : string, tasksString : string, goalsString : string) => {
  const hf = new HfInference(process.env.HF_ACCESS_TOKEN)


  const result = await hf.conversational({
    model: 'microsoft/DialoGPT-large',
    inputs: {
      past_user_inputs: [`Base Schedule:

    7:30am-8:00am- Wake up
    8:00am-8:30am- [EMPTY]
    8:30am-9:00am- [EMPTY]
    9:00am-9:30am- Work
    9:30am-10:00am- Work
    10:00am-10:30am- Work
    10:30am-11:00am- Work
    11:00am-11:30am- Work
    11:30am-12:00pm- Work
    12:00pm-12:30pm- Work
    12:30pm-1:00pm- Work
    1:00pm-1:30pm- Work
    1:30pm-2:00pm- Work
    2:00pm-2:30pm- Work
    2:30pm-3:00pm- Work
    3:00pm-3:30pm- Work
    3:30pm-4:00pm- Work
    4:00pm-4:30pm- Work
    4:30pm-5:00pm- Work
    5:00pm-5:30pm- [EMPTY]
    5:30pm-6:00pm- [EMPTY]
    6:00pm-6:30pm- [EMPTY]
    6:30pm-7:00pm- [EMPTY]
    7:00pm-7:30pm- [EMPTY]
    7:30pm-8:00pm- [EMPTY]
    8:00pm-8:30pm- [EMPTY]
    8:30pm-9:00pm- [EMPTY]
    9:00pm-9:30pm- [EMPTY]
    9:30pm-10:00pm- [EMPTY]
    10:00pm-10:30pm- [EMPTY]
    10:30pm-11:00pm- [EMPTY]
    11:00pm-11:30pm- [EMPTY]
    11:30pm-12:00am- [EMPTY]
    12:00am-12:30am- [EMPTY]
    12:30am-1:00am- [EMPTY]
    1:00am-1:30am- Sleep
     
    Fill in a few of the [EMPTY] slots to accommodate the following goals.
          
    1. Practice Spanish
      
    Fill in a few of the [EMPTY] slots to accommodate the following tasks.
    1. Taking Out The Trash
    2. Study
    3. Workout
    4. Shower`],
      generated_responses: [`New Goals And Tasks Additions Proposal:
      6:00pm-7:00pm- Workout
      7:00pm-7:30pm- Shower
      7:30pm-8:30pm- Taking Out The Trash 
      8:00pm-9:00pm- Study
      9:00pm-9:30pm- Practice Spanish
      `],
      text: `Base Schedule:`

      + "\n" + scheduleString + "\n" +
      
      `Fill in a few of the [EMPTY] slots to accommodate the following goals.`
      
      + "\n" + goalsString + "\n" +
      
      `Fill in a few of the [EMPTY] slots to accommodate the following tasks`
      
      + "\n" + tasksString + "\n" ,
    }
  })

  console.log(result.generated_text)

  return result 
}

const getScheduleString = (schedule : any[])=>{
  var finalString : string = ""

  schedule.map((slot, ind)=>{
    finalString += slot.start + "-" + slot.end + "- " + slot.activity + "\n"
  })

  return finalString
}

const getTasksString = (tasks : any[])=>{
  var finalString : string = ""

  tasks.map((task, ind : number)=>{
    if(task.duration) {
      finalString += (ind + 1) + ". " + task.title + " (" + task.duration + ")" + "\n"
    } else {
      finalString += (ind + 1) + ". " + task.title + "\n"
    }
  })

  return finalString
}

const getGoalsString = (goals : any[])=>{
  var finalString : string = ""

  goals.map((goal, ind : number)=>{
    finalString += (ind + 1) + ". " + goal + "\n"
  })

  return finalString
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const inputs = req.body;

  const schedule = inputs.schedule
  const tasks = inputs.tasks
  const goals = inputs.goals

  var answer = await addTasksTextGen(getScheduleString(schedule), getTasksString(tasks), getGoalsString(goals))

  // var answer = getScheduleString(schedule) + getTasksString(tasks) + getGoalsString(goals);

  res.status(200).json({ response: answer })
}