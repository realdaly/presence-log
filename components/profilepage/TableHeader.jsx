export default function TableHeader(){
    return(
        <div className="sticky top-0 z-10 flex bg-gray-200 border-b font-bold rounded-t-xl w-fit border-l-2 border-gray-200">
            <div className="p-3 text-center w-40">اليوم</div>
            <div className="p-3 text-center w-56">وقت الحضور</div>
            <div className="p-3 text-center w-56">وقت الانصراف</div>
            <div className="p-3 text-center w-56">الوقت الكلي</div>
            <div className="p-3 text-center w-56">مقدار الزيادة</div>
            <div className="p-3 text-center w-56">مقدار النقيصة</div>
            <div className="p-3 text-center w-44">الملاحظات</div>
        </div>
    )
}