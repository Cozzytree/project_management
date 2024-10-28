import { User } from "@/state/api";
import Image from "next/image";

type props = {
   user: User;
};

export default function UserCard({ user }: props) {
   return (
      <div className="rounded p-4 shadow-sm text-zinc-800 dark:text-zinc-200 flex flex-col items-center">
         {user.profilePictureUrl && (
            <Image
               src={"/logo.png"}
               width={50}
               alt={user.username}
               height={50}
               className="w-fit h-full rounded-t-md"
            />
         )}
         <h3>{user.username}</h3>
      </div>
   );
}
