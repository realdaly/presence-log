import DropdownMenu from "@/components/ui/DropdownMenu";
import OptionsBtn from "@/components/ui/OptionsBtn";
import DeleteDayBtn from "@/components/profilepage/DeleteDayBtn";
import ShowNoteBtn from "@/components/profilepage/ShowNoteBtn";

export default function DayRow({data, year, getDays, timeOff}){
    return(
        <div className="flex flex-col justify-center md:flex-row border-b border-r border-l last:rounded-b-xl bg-white odd:bg-domI relative">
            <div className="p-3 my-auto text-center md:w-[14.28%] font-medium">
                <div>{data.title}</div>
                <div className="text-sm text-gray-500">
                    {data.date_day}/{data.date_month}/{year}
                </div>
            </div>
            <div className="p-3 my-auto text-center md:w-[14.28%]">
                {timeOff != 1 && <>
                الساعة 
                <span className="font-bold px-1">{data.attend_hour}</span>
                و
                <span className="font-bold px-1">{data.attend_minute}</span>
                دقيقة
                </>}
                {timeOff == 1 && <>
                <span className="font-semibold bg-orange-200 bg-opacity-50 rounded-full px-3">
                    يوم إجازة
                </span>
                </>}
            </div>
            <div className="p-3 my-auto text-center md:w-[14.28%]">
                {timeOff != 1 && <>
                الساعة 
                <span className="font-bold px-1">{data.leave_hour}</span>
                و
                <span className="font-bold px-1">{data.leave_minute}</span>
                دقيقة
                </>}
            </div>
            <div className="p-3 my-auto text-center md:w-[14.28%]">
                {timeOff != 1 && <>
                <span className="font-bold px-1">{data.total_hours}</span>
                ساعة و
                <span className="font-bold px-1">{data.total_minutes}</span>
                دقيقة
                </>}
            </div>
            <div className="p-3 my-auto text-center md:w-[14.28%]">
                {timeOff != 1 && <>
                <span className="px-3 py-1 rounded-full bg-green-100">
                    <span className="font-bold px-1">{data.more_hours}</span>
                    ساعة و
                    <span className="font-bold px-1">{data.more_minutes}</span>
                    دقيقة
                </span>
                </>}
            </div>
            <div className="p-3 my-auto text-center md:w-[14.28%]">
                {timeOff != 1 && <>
                <span className="px-3 py-1 rounded-full bg-red-100">
                    <span className="font-bold px-1">{data.less_hours}</span>
                    ساعة و
                    <span className="font-bold px-1">{data.less_minutes}</span>
                    دقيقة
                </span>
                </>}
            </div>
            <div className="p-3 pr-9 my-auto text-center md:w-[14.28%]">
                {data.note ? 
                    <ShowNoteBtn note={data.note} /> 
                : "......."}
            </div>
            <DropdownMenu
                button={<OptionsBtn />}
                menuStyle="absolute left-2 top-5"
                panelStyle="pl-5"
            >
                <div className="bg-domI border rounded-lg overflow-hidden">
                    <DeleteDayBtn 
                        currentDay={data}
                        getDays={getDays}
                    />
                </div>
            </DropdownMenu>
        </div>
    )
}