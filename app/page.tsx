import { redirect } from "next/navigation";
import { GitBranchIcon } from "lucide-react";

import { auth, signIn } from "@/auth"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";


export default async function Home() {
  const session = await auth();

  return (
    <>
      {session && session.user ? (
        redirect("/chat")
      ): (
        <Dialog open>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                Inicia sesión para acceder a tu cuenta y comenzar a chatear con nuestro asistente
              </DialogTitle>
            </DialogHeader>
            <form 
              action={async () => {
                "use server"
                await signIn("github")
              }}
              className="flex items-center justify-center py-4">
              <Button type="submit" className="w-full max-w-screen-sm" variant="outline">
                <GitBranchIcon className="mt-2 mr-2 size-4"/>Sign in with Github
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
    
  );
}
