import Header from "@/components/Header";

export default function Settings() {
   const userSettings = {
      username: "Cozzytree",
      email: "email@email.com",
      teamName: "DevelopMent",
      roleName: "Developer",
   };

   const labelStyles = "block text-zinc-800 dark:text-zinc-200";
   const textStyles =
      "text-md text-lg text-zinc-800 dark:text-zinc-200 shadow-md dark:shadow-zinc-700/10 rounded-md py-2 px-4 font-semiBold";

   return (
      <div className="px-6 py-1">
         <Header name="Settings" isSmallText={false} />
         <div className="space-y-4">
            <div>
               <label className={labelStyles}>Username</label>
               <div className={textStyles}>{userSettings.username}</div>
            </div>
            <div>
               <label className={labelStyles}>Email</label>
               <div className={textStyles}>{userSettings.email}</div>
            </div>
            <div>
               <label className={labelStyles}>Team</label>
               <div className={textStyles}>{userSettings.teamName}</div>
            </div>
            <div>
               <label className={labelStyles}>Role</label>
               <div className={textStyles}>{userSettings.roleName}</div>
            </div>
         </div>
      </div>
   );
}
