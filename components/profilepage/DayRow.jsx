import DropdownMenu from "@/components/ui/DropdownMenu";
import OptionsBtn from "@/components/ui/OptionsBtn";
import DeleteDayBtn from "@/components/profilepage/DeleteDayBtn";
import UpdateDayBtn from "@/components/profilepage/UpdateDayBtn";
import ShowNoteBtn from "@/components/profilepage/ShowNoteBtn";

export default function DayRow({data, year, month, getDays, groupInfo, timeOff}){
    return(
        <div className="border-b border-r border-l last:rounded-b-xl bg-white odd:bg-domI w-fit">
            <div className="flex relative">
                <div className="p-3 my-auto text-center w-40 font-medium">
                    <div>{data.title}</div>
                    <div className="text-sm text-gray-500">
                        {data.date_day}/{data.date_month}/{year.title}
                    </div>
                </div>
                <div className="p-3 my-auto text-center w-56">
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
                <div className="p-3 my-auto text-center w-56">
                    {timeOff != 1 && <>
                    الساعة 
                    <span className="font-bold px-1">{data.leave_hour}</span>
                    و
                    <span className="font-bold px-1">{data.leave_minute}</span>
                    دقيقة
                    </>}
                </div>
                <div className="p-3 my-auto text-center w-56">
                    {timeOff != 1 && <>
                    <span className="font-bold px-1">{data.total_hours}</span>
                    ساعة و
                    <span className="font-bold px-1">{data.total_minutes}</span>
                    دقيقة
                    </>}
                </div>
                <div className="p-3 my-auto text-center w-56">
                    {timeOff != 1 && <>
                    <span className="px-3 py-1 rounded-full bg-green-100">
                        <span className="font-bold px-1">{data.more_hours}</span>
                        ساعة و
                        <span className="font-bold px-1">{data.more_minutes}</span>
                        دقيقة
                    </span>
                    </>}
                </div>
                <div className="p-3 my-auto text-center w-56">
                    {timeOff != 1 && <>
                    <span className="px-3 py-1 rounded-full bg-red-100">
                        <span className="font-bold px-1">{data.less_hours}</span>
                        ساعة و
                        <span className="font-bold px-1">{data.less_minutes}</span>
                        دقيقة
                    </span>
                    </>}
                </div>
                <div className="p-3 my-auto text-center w-44">
                    {data.note ? 
                        <ShowNoteBtn note={data.note} /> 
                    : "......."}
                </div>
                <DropdownMenu
                    button={<OptionsBtn />}
                    menuStyle="absolute left-2 top-5"
                    panelStyle="pl-7"
                >
                    <div className="bg-domI border rounded-lg overflow-hidden">
                        <UpdateDayBtn 
                            year={year}
                            month={month}
                            groupInfo={groupInfo}
                            getDays={getDays}
                            currentDay={data}
                        />
                        <DeleteDayBtn 
                            currentDay={data}
                            getDays={getDays}
                        />
                    </div>
                </DropdownMenu>
            </div>
            {(data?.exit_hour != 0 && data?.exit_hour != undefined && data?.exit_hour != null && data?.exit_hour != "") &&
            <div className="pb-3 pr-5 flex items-center gap-x-3">
                <span className="font-semibold bg-orange-200 bg-opacity-50 rounded-full px-3">
                    وقت الخروج الضمني:
                </span>
                <span className="px-3 rounded-full bg-red-100">
                    خروج عند الساعة
                    <span className="font-bold px-1">{data.exit_hour}</span>
                    و
                    <span className="font-bold px-1">{data.exit_minute}</span>
                    دقيقة
                </span>
                <span className="px-3 rounded-full bg-green-100">
                    عودة عند الساعة
                    <span className="font-bold px-1">{data.enter_hour}</span>
                    و
                    <span className="font-bold px-1">{data.enter_minute}</span>
                    دقيقة
                </span>
            </div>}
        </div>
    )
}