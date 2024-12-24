import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuItem } from "./ui/sidebar";

import { NewChat } from "./new-chat";
import { ProfileButton } from "./profile-button";
import { ChatRows } from "./chat-rows";

export const AppSidebar = async() => {
  const session = await auth();

  if (!session) {
    redirect('/')
  }

  if (!session.user) {
    redirect('/')
  }

  const user = session.user;

  return (
    <Sidebar>
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <NewChat user={user}/>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>

    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <ChatRows session={session} />
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
    <SidebarMenu>
      <SidebarMenuItem>
        <ProfileButton user={user}/>
      </SidebarMenuItem>
    </SidebarMenu>
    </SidebarFooter>
  </Sidebar>

  )
}

// export default async function AppSidebar() {
//   const session = await auth();
//   return (
//     <Sidebar>
//       <SidebarHeader>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <NewChat/>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarHeader>

//       <SidebarContent>
//         <SidebarMenu>
//           {/* Chat List */}
//         </SidebarMenu>
//       </SidebarContent>
//       <SidebarFooter>
//       <SidebarMenu>
//         <SidebarMenuItem>
//           <ProfileButton/>
//         </SidebarMenuItem>
//       </SidebarMenu>
//       </SidebarFooter>
//     </Sidebar>
//   )
// }
