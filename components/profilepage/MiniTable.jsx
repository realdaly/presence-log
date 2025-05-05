export default function MiniTable({
    label, 
    moreHours, 
    moreMins, 
    lessHours, 
    lessMins
}){
    return(
        <div className="w-fit">
            {/* table header */}
            <div className="p-3 text-center bg-gray-200 border-b border-l-2 rounded-t-xl font-bold">
                {label}
            </div>
            {/* table body */}
            <div className="border-b border-r border-l bg-white p-3">
                <div className="flex items-center gap-x-3">
                    <span className="font-semibold">
                        الزيادة بالوقت:
                    </span>
                    <span className="px-3 rounded-full bg-green-100">
                        <span className="font-bold px-1">{moreHours}</span>
                        ساعة و
                        <span className="font-bold px-1">{moreMins}</span>
                        دقيقة
                    </span>
                </div>
            </div>
            <div className="border-b border-r border-l rounded-b-xl bg-white p-3">
                <div className="flex items-center gap-x-3">
                    <span className="font-semibold">
                        النقيصة بالوقت:
                    </span>
                    <span className="px-3 rounded-full bg-red-100">
                        <span className="font-bold px-1">{lessHours}</span>
                        ساعة و
                        <span className="font-bold px-1">{lessMins}</span>
                        دقيقة
                    </span>
                </div>
            </div>
        </div>
    );
}