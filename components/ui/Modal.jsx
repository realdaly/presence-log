import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";

export default function Modal({isOpen, setIsOpen, title, desc, sumbitLabel, submitFunc, isDanger, close, children}){
    const closeFunc = () => {
        setIsOpen(false);
        if(close){
            close();
        }
    }

    return(
        <Dialog 
            open={isOpen} 
            onClose={() => setIsOpen(false)} 
            className="relative z-50 transition duration-150 ease-out data-[closed]:opacity-0 dialog-panel"
            transition
        >
            <DialogBackdrop className="fixed inset-0 bg-black/70" />
            <div className="fixed inset-0 flex w-screen h-screen items-center justify-center p-4">
                <DialogPanel className="space-y-4 border bg-white p-7 rounded-2xl">
                    <DialogTitle className="font-bold text-2xl text-center">
                        {title}
                    </DialogTitle>
                    <Description className="text-center">{desc}</Description>
                    {children}
                    <div className="flex gap-4">
                        <button
                            className="text-white bg-zinc-400 py-0.5 px-3 rounded-full block mx-auto transition-all hover:opacity-75" 
                            onClick={() => closeFunc()}
                        >
                            إلغاء
                        </button>
                        <button
                            className={`text-white py-0.5 px-3 rounded-full block mx-auto transition-all hover:opacity-75 ${isDanger ? "bg-danger" : "bg-success"}`}
                            onClick={submitFunc}
                            data-autofocus
                        >
                            {sumbitLabel}
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}