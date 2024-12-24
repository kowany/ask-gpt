import { User } from "next-auth"
import { signOut } from "@/auth"

import { SidebarMenuButton } from "./ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export const ProfileButton = ({user}: {user:User}) => {
  return (
    <form
        action={async () => {
            "use server"
            await signOut({ redirectTo: "/" })
        }}
    >
        <SidebarMenuButton size='lg' type="submit">
            <Avatar className="size-8">
                <AvatarImage src={"https://github.com/shadcn.png"}/>
                <AvatarFallback>
                    { user.name
                        ?.split(" ")
                        .map((name) =>name[0])
                        .join("")
                    }
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-ts">{user.email}</span>
            </div>
        </SidebarMenuButton>   
        {/* <button className="w-full mt-2 mb-2" type="submit">Sign Out</button>  */}
    </form>
  )
}
