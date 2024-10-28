type props = {
   name: string;
   buttonComponent: any;
   isSmallText: boolean;
};

export default function Header({ name, buttonComponent, isSmallText }: props) {
   return (
      <div className="mb-5 flex w-full items-center justify-between">
         <h1
            className={`${isSmallText ? "text-lg" : "text-2xl"} font-semibold dark:text-zinc-200 text-zinc-800`}
         >
            {name}
         </h1>
         {buttonComponent}
      </div>
   );
}
