export default function DayRow({data, year}){
    return(
        <div className="flex flex-col justify-center md:flex-row border-b border-r border-l last:rounded-b-xl bg-white">
            <div className="p-3 my-auto text-center md:w-[14.28%] font-medium">
                <div>{data.title}</div>
                <div className="text-sm text-gray-500">
                    {data.date_day}/{data.date_month}/{year}
                </div>
            </div>
            <div className="p-3 my-auto text-center md:w-[14.28%]">
                الساعة 
                <span className="font-bold px-1">{data.attend_hour}</span>
                و
                <span className="font-bold px-1">{data.attend_minute}</span>
                دقيقة
            </div>
            <div className="p-3 my-auto text-center md:w-[14.28%]">
                الساعة 
                <span className="font-bold px-1">{data.leave_hour}</span>
                و
                <span className="font-bold px-1">{data.leave_minute}</span>
                دقيقة
            </div>
            <div className="p-3 my-auto text-center md:w-[14.28%]">
                <span className="font-bold px-1">{data.total_hours}</span>
                ساعة و
                <span className="font-bold px-1">{data.total_minutes}</span>
                دقيقة
            </div>
            <div className="p-3 my-auto text-center md:w-[14.28%]">
                <span className="px-3 py-1 rounded-full bg-green-100">
                    <span className="font-bold px-1">{data.more_hours}</span>
                    ساعة و
                    <span className="font-bold px-1">{data.more_minutes}</span>
                    دقيقة
                </span>
            </div>
            <div className="p-3 my-auto text-center md:w-[14.28%]">
                <span className="px-3 py-1 rounded-full bg-red-100">
                    <span className="font-bold px-1">{data.less_hours}</span>
                    ساعة و
                    <span className="font-bold px-1">{data.less_minutes}</span>
                    دقيقة
                </span>
            </div>
            <div className="p-3 my-auto text-center md:w-[14.28%]">
                {data.note != "" ? data.note : "......."}
            </div>
        </div>
    )
}