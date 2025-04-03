import EmployeeCard from "@/components/grouppage/EmployeeCard";

export default function Employees({employeesData}){    
    return(
        <div className="flex items-center justify-center gap-x-5 pt-10">
            {employeesData.map(item => (
                <EmployeeCard 
                    key={item.id}
                    name={item.name}
                    path="#"
                />
            ))}
        </div>
    )
}