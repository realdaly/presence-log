export default function TableHeader(){
    return(
        <div className="sticky top-0 z-10 flex bg-gray-200 border-b border-l-2 xl:rounded-t-xl font-bold w-fit">
            <div className="p-3 text-center w-40 2xl:w-60">اليوم</div>
            <div className="p-3 text-center w-56 2xl:w-64">وقت الحضور</div>
            <div className="p-3 text-center w-56 2xl:w-64">وقت الانصراف</div>
            <div className="p-3 text-center w-56 2xl:w-64">الوقت الكلي</div>
            <div className="p-3 text-center w-56 2xl:w-64">مقدار الزيادة</div>
            <div className="p-3 text-center w-56 2xl:w-64">مقدار النقيصة</div>
            <div className="p-3 text-center w-44">الملاحظات</div>
        </div>
    );
}