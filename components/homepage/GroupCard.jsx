import Link from "next/link";
import { FcConferenceCall } from "react-icons/fc";
import DropdownMenu from "@/components/ui/DropdownMenu";
import OptionsBtn from "@/components/ui/OptionsBtn";
import DeleteGroupBtn from "@/components/homepage/DeleteGroupBtn";
import UpdateGroupBtn from "@/components/homepage/UpdateGroupBtn";

export default function GroupCard({currentGroup, getGroups}){
    return(
        <div className="flex flex-col gap-y-3 w-fit bg-white items-center justify-center p-10 px-16 relative rounded-2xl shadow-md border border-opacity-10">
            <DropdownMenu
                button={<OptionsBtn />}
                menuStyle="absolute left-2 top-2"
            >
                <div className="bg-domI border rounded-lg overflow-hidden">
                    <UpdateGroupBtn 
                        currentGroup={currentGroup}
                        getGroups={getGroups}
                    />
                    <DeleteGroupBtn 
                        currentGroup={currentGroup}
                        getGroups={getGroups}
                    />
                </div>
            </DropdownMenu>
            <p className="font-bold text-lg">
                {currentGroup.title}
            </p>
            <FcConferenceCall className="size-16" />
            <Link
                className="flex items-center gap-x-2 w-fit bg-accent1 text-white font-bold px-3 py-1 rounded-full transition-all hover:text-accent1 hover:bg-white border border-accent1" 
                href={`/group?gid=${currentGroup.id}&gtitle=${currentGroup.title}`}
            >   
                دخــــول
            </Link>
        </div>
    )
}