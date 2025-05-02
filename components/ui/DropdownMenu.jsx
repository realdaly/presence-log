import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

export default function DropdownMenu({button, menuStyle, panelStyle, children}){
    return(
    <div className={menuStyle}>
        <Popover className="relative">
            <PopoverButton className="outline-0 relative">
                {button}
            </PopoverButton>
            <PopoverPanel 
                anchor="bottom"
                transition
                className={`origin-top z-20 transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 ${panelStyle}`}
            >
                {children}
            </PopoverPanel>
        </Popover>
    </div>
    )
}