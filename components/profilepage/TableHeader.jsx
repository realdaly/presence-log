export default function TableHeader(){
    return(
        <div className="flex flex-col md:flex-row bg-gray-200 border-b font-bold rounded-t-xl">
            <div className="p-3 text-center md:w-[14.28%]">اليوم</div>
            <div className="p-3 text-center md:w-[14.28%]">وقت الحضور</div>
            <div className="p-3 text-center md:w-[14.28%]">وقت الانصراف</div>
            <div className="p-3 text-center md:w-[14.28%]">الوقت الكلي</div>
            <div className="p-3 text-center md:w-[14.28%]">مقدار الزيادة</div>
            <div className="p-3 text-center md:w-[14.28%]">مقدار النقيصة</div>
            <div className="p-3 text-center md:w-[14.28%]">الملاحظات</div>
        </div>
    )
}