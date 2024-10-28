import React from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
import { X } from "lucide-react";

type props = {
   children: React.ReactNode;
   isOpen: boolean;
   onClose: () => void;
   name: string;
};

export default function Modal({ children, isOpen, onClose, name }: props) {
   if (!isOpen) return null;

   return ReactDOM.createPortal(
      <div className="fixed top-0 left-0 inset-0 flex justify-center items-center z-50 h-full w-full overflow-y-auto bg-zinc-800 bg-opacity-70 transition-background duration-150">
         <div className="w-full h-fit px-4 py-6 min-w-36 max-w-2xl rounded-lg bg-zinc-300 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
            <Header
               name={name}
               isSmallText={true}
               buttonComponent={
                  <button
                     className="p-2 flex items-center gap-1 bg-blue-800  text-blue-200 hover:bg-blue-300 rounded-md hover:text-blue-800 transition-background duration-100"
                     onClick={onClose}
                  >
                     <X size={15} />
                  </button>
               }
            />
            {children}
         </div>
      </div>,
      document.body,
   );
}
