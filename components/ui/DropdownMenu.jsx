import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

export default function DropdownMenu({button, menuStyle, children}){
    return(
    <div className={menuStyle}>
        <Popover className="relative">
            <PopoverButton className="outline-0">
                {button}
            </PopoverButton>
            <PopoverPanel 
                anchor="bottom"
                transition
                className="pr-5 origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
            >
                {children}
            </PopoverPanel>
        </Popover>
    </div>
    )
}