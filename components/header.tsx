import Link from "next/link";
import { SidebarTrigger } from "./ui/sidebar";
import { ModeToggle } from "./mode-toggle";

export default function Header() {
  return (
    <header className="bg-background border-b p-4 flex items-center justify-between">
        <SidebarTrigger className="block md:hidden mr-4"/>
        <Link href="/chat">
            <h1 className="text-xl font-bold text-orange-500">
                Ask<span className="text-stone-400">-</span><span className="text-slate-400">GPT</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-base
                          dark:text-gray-400">
              Ask-GPT es un chatbot que puede responder cualquier pregunta que tengas.
              Sólo escribe tu pregunta y Ask-GPT responderá con una respuesta.
            </p>
        </Link>
        <ModeToggle/>
    </header>
  )
}
