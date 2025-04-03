export default function Loader(){
    return(
        <div className="flex-col gap-4 w-full flex items-center justify-center min-h-64">
            <div className="size-12 border-4 border-transparent text-accent1 text-4xl animate-spin flex items-center justify-center border-t-accent1 rounded-full">
                <div className="size-8 border-4 border-transparent text-accent2 text-2xl animate-spin flex items-center justify-center border-t-accent2 rounded-full"></div>
            </div>
        </div>
    );
}