import GroupCard from "@/components/homepage/GroupCard";

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
        </div>
    )
}