import GroupCard from "@/components/homepage/GroupCard";
import NoData from "@/components/ui/NoData";

export default function Groups({groups, getGroups}){
    return(
        <div className="flex flex-wrap items-center justify-center gap-5 pt-10">
            {groups.map(item => (
                <GroupCard
                    key={item.id} 
                    currentGroup={item}
                    getGroups={getGroups}
                />
            ))}
            {groups.length == 0 &&
                <NoData />
            }
        </div>
    )
}