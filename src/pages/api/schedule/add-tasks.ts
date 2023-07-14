import type { NextApiRequest, NextApiResponse } from 'next'

import { Configuration, OpenAIApi } from "openai";

interface addTasksProps {
    tasks : string[],
    goals : string[],
    schedule: string,
}

const addTasks = async (input : addTasksProps) => {
  const configuration = new Configuration({
    apiKey: "", //process.env.PAWAN_API_KEY
    basePath: "https://api.pawan.krd/v1",
  });
  

  const openai = new OpenAIApi(configuration)

  const prompt = 
    ""

  
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 1, // low: consistency + high: creativity
    max_tokens: 4096,
    top_p: 1, 
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: ["Customer:","Head Chef:"],
  });

  console.log(response.data)
  return response.data.choices[0].text?.trim()
}



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const inputs = req.body;

  var answer = await addTasks(inputs)

  console.log(answer)

  res.status(200).json({ response: answer })
}