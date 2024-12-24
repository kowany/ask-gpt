"use client"
import { User } from "next-auth";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import { db } from "@/lib/firebase";

import { Button } from "./ui/button";
import { SidebarMenuButton } from "./ui/sidebar";

export const NewChat = ({user}:{user:User}) => {
  const router = useRouter();

  const createNewChat = async () => {
    const doc = await addDoc(collection(db, "users", user.email!, "chats"), {
      userId: user.email,
      createdAt: serverTimestamp()
    });
    router.push(`/chat/${doc.id}`);
  }
  return (
    <SidebarMenuButton asChild>
        <Button onClick={createNewChat} className="w-full" variant="outline">
            <PlusIcon className="mr-2 size-4"/> Nuevo Chat
        </Button>
    </SidebarMenuButton>

  )
}