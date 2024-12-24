import Link from "next/link"
import { User } from "next-auth"
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation"
import { db } from "@/lib/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc } from "@firebase/firestore";

import { MessageSquareIcon, Trash2Icon } from "lucide-react";

export const ChatRow = ({chatId, user}: {chatId: string, user: User}) => {
    const pathname = usePathname();
    const router = useRouter();
    const [isActive, setIsActive] = useState(false);

    const handleDeletedChat = async() => {
        await deleteDoc(doc(db, "users", user.email!, "chats", chatId))
        router.replace("/chat");
    }
    const [messages] = useCollection(
        collection(db, "users", user.email!, "chats", chatId, "messages")
    );
    useEffect(() => {
        if (!pathname) return;
        setIsActive(pathname.includes(chatId))
    },[pathname, chatId]);
    return (
    <Link href={`/chat/${chatId}`}
        className={`flex items-center justify-between w-full p-2 rounded-lg
            hover: bg-sidebar-accent hover: text-sidebar-accent-foreground ${
                isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
        }`}
    >
        <MessageSquareIcon className="mr-2 size-4"/>
        <p className="flex-1 truncate">
            {messages?.docs[0]?.data()?.text || "Nuevo Chat"}
        </p>

        <Trash2Icon onClick={handleDeletedChat} className="size-4
        text-muted-foreground hover: text-red-500"/>
    </Link>
  )
}
