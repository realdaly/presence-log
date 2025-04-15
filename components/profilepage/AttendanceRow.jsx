export default function AttendanceRow({data}){
    return(
        <div className="flex flex-col justify-center md:flex-row border-b border-r border-l last:rounded-b-xl bg-white">
            <div className="p-3 my-auto text-center md:w-[14.28%] font-medium">
                <div>{data.day}</div>
                <div className="text-sm text-gray-500">{data.date}</div>
            </div>
            <div className="p-3 my-auto text-center md:w-[14.28%]">{data.attendanceTime}</div>
            <div className="p-3 my-auto text-center md:w-[14.28%]">{data.departureTime}</div>
            <div className="p-3 my-auto text-center md:w-[14.28%]">{data.totalTime}</div>
            <div className="p-3 my-auto text-center md:w-[14.28%]">
                <span className="px-3 py-1 rounded-full bg-green-100">
                    {data.increaseAmount}
                </span>
            </div>
            <div className="p-3 my-auto text-center md:w-[14.28%]">
                <span className="px-3 py-1 rounded-full bg-red-100">
                    {data.decreaseAmount}
                </span>
            </div>
            <div className="p-3 my-auto text-center md:w-[14.28%]">
                {data.notes != "" ? data.notes : "......."}
            </div>
        </div>
    )
}