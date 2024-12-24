import { NextResponse } from "next/server";
import { firestore } from "firebase-admin";

import { adminDB } from "@/lib/firebaseAdmin";
import { xai } from "@/lib/xai";
import { Message } from "@/types";

export async function POST(req: Request) {
    const {input, chatId, user} = await req.json();

    const res = await xai.chat.completions.create({
        "messages": [
            {
            "role": "system",
            "content": "Eres un asistente útil."
            },
            {
            "role": "user",
            "content": input
            }
        ],
        "model": "grok-beta",
        "stream": false,
        "temperature": 1.0
    });

    const response = res.choices[0].message.content;

    const message:Message = {
        text: response || "AskGPT no pudo encontrar una respuesta a tu pregunta",
        createAt: firestore.Timestamp.now(),
        user: {
            _id: "ask-gpt",
            name: "AskGPT",
            avatar: "https://cdn-icons-png.flaticon.com/512/1787/1787077.png"
        }
    };

    await adminDB
        .collection("users")
        .doc(user.email)
        .collection("chats")
        .doc(chatId)
        .collection("messages")
        .add(message);

    return NextResponse.json({answer: message.text}, {status: 200});
}