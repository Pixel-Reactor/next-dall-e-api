import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export async function POST(req: Request) {

  const data = await req.json();
  const inputString = data.prompt
  if(!inputString){
    return NextResponse.json({ message: 'You need a prompt to generate an image' }, { status: 403 });
  }
  const response = await openai.images.generate({
    prompt:inputString,
    n: 1,
    size: "1024x1024",
  });
  
  return NextResponse.json({ url: response.data[0].url }, { status: 200 });
}
