import { Menu, MenuButton, MenuItems, Transition } from "@headlessui/react"

export default function DropdownMenu({button, menuStyle, children}){
    return(
    <div className={menuStyle}>
        <Menu>
            <MenuButton>{button}</MenuButton>
            <Transition
                enter="transition duration-100"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition duration-75"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <MenuItems 
                    transition
                    className="absolute z-10 origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
                >
                    {children}
                </MenuItems>
            </Transition>
        </Menu>
    </div>
    )
}