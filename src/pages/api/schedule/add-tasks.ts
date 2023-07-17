import type { NextApiRequest, NextApiResponse } from 'next'

import { Configuration, OpenAIApi } from "openai";

const addTasks = async (scheduleString : string, tasksString : string, goalsString : string) => {
  const configuration = new Configuration({
    apiKey: process.env.PAWAN_API_KEY,
    basePath: "https://api.pawan.krd/unfiltered/v1",
  });

  const openai = new OpenAIApi(configuration)


  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {"role": "system", "content": "You are a professional schedule maker. Your goal is to make schedules that match the goals and requirements of the user. Only suggest the goals and tasks given to you to schedule. Only schedule in times that are [EMPTY]. Use the exact goal and task wording given to you by the user when scheduling. Schedule every task and goal if there is space."},
      {role: "user"
      , content: `Base Schedule:

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
      
      1. I want to start learning Spanish
  
      Fill in a few of the [EMPTY] slots to accommodate the following tasks.
      1. Taking Out The Trash
      2. Study
      3. Workout
      4. Shower

      You cannot delete or change already non-[EMPTY] slots. ONLY PROPOSE TIMES THAT ARE CURRENTLY [EMPTY] IN THE BASE SCHEDULE. THESE ARE THE ONLY TIMES THAT CAN BE CHANGED!`},
      {role: "assistant", content: `
      New Goals And Tasks Additions Proposal:
      6:00pm-7:00pm- Workout
      7:00pm-7:30pm- Shower
      7:30pm-8:30pm- Taking Out The Trash 
      8:00pm-9:00pm- Study
      9:00pm-9:30pm- Learn Spanish
      `},
      {role: "user" , content: `Base Schedule:`

      + "\n" + scheduleString + "\n" +
      
      `
      Fill in a few of the [EMPTY] slots to accommodate the following goals.`
      
      + "\n" + goalsString + "\n" +
      
      `Fill in a few of the [EMPTY] slots to accommodate the following tasks.`
      
      + "\n" + tasksString + "\n" + 
      
      `Use reasoning for why the [EMPTY] slots you choose in the proposal are the best times in the day to work towards the tasks and the goals. You cannot delete or change already non-[EMPTY] slots. ONLY PROPOSE TIMES THAT ARE CURRENTLY [EMPTY] IN THE BASE SCHEDULE. THESE ARE THE ONLY TIMES THAT CAN BE CHANGED!
      `},
    ],
  });

  console.log("im here")

  console.log(completion.data)

  return completion.data.choices[0].message!.content?.trim()
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

  var answer = await addTasks(getScheduleString(schedule), getTasksString(tasks), getGoalsString(goals))

  // var answer = getScheduleString(schedule) + getTasksString(tasks) + getGoalsString(goals);

  res.status(200).json({ response: answer })
}