"use client";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import { FormEvent, useState } from "react";

import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import { db } from "@/lib/firebase";

import { SendIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import { Message } from "@/types";
import { ChatMessages } from "./chat-messages";

export const Chatbox = ({session}: {session: Session}) => {
  const user = session.user!;
  const chatId = usePathname().split("/").pop()!;
  
  const [prompt, setPrompt] = useState('');


  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!prompt) return;

    const input = prompt.trim();
    setPrompt("");

    const message: Message = {
        text: input,
        createAt: serverTimestamp(),
        user: {
            _id: user.email!,
            name: user.name!,
            avatar: user.image!,

        }
    }

    await addDoc(
        collection(db, "users", user.email!, "chats", chatId, "messages"),
        message
    );

    await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            input,
            chatId,
            user
        })
    })
  }


  return (
    <>
        <ChatMessages chatId={chatId} session={session}/>

        <div className="p-4 border-t">
            <form onSubmit={sendMessage} className="flex space-x-3">
                <Input
                    type="text"
                    name="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Message AskGPT"
                    className="flex-grow"
                />
                <Button className="bg-orange-500" type="submit" size='icon'>
                    <SendIcon className=" text-stone-800 font-bold size-4"/>

                </Button>
            </form>
        </div>
    </>
  )
}
