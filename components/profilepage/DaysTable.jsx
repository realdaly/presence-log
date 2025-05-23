import DayRow from "@/components/profilepage/DayRow";
import TableHeader from "@/components/profilepage/TableHeader";
import NoData from "@/components/ui/NoData";

export default function DaysTable({
    daysData, 
    monthsData, 
    yearsData, 
    currentYear,
    currentMonth, 
    groupInfo, 
    getDays, 
    updateCurrentDateInfo, 
    getTotalMoreLess, 
    remainingLeaveDays, 
    getRemainingLeaveDays, 
    getEmployeeStatistics
}){
    return(
        <div className="flex justify-center">
            <div className="h-[calc(100vh-333px)] overflow-y-auto xl:rounded-t-xl">
            <TableHeader />
            {daysData.map(item => (
                yearsData.length > 0 && monthsData.length > 0 && daysData.length > 0 &&
                <DayRow 
                    key={item.id} 
                    data={item}
                    year={currentYear}
                    month={currentMonth}
                    groupInfo={groupInfo}
                    getDays={getDays}
                    timeOff={item.time_off}
                    isLwop={item.is_lwop}
                    isAbsent={item.is_absent}
                    updateCurrentDateInfo={updateCurrentDateInfo}
                    getTotalMoreLess={getTotalMoreLess}
                    remainingLeaveDays={remainingLeaveDays}
                    getRemainingLeaveDays={getRemainingLeaveDays}
                    getEmployeeStatistics={getEmployeeStatistics}
                />
            ))}
            {(yearsData.length == 0 || monthsData.length == 0 || daysData.length == 0) && (
                <div className="pt-7">
                    <NoData />
                </div>
            )}
            </div>
        </div>
    );
}