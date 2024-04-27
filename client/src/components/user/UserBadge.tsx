
const UserBadge = ({user}:{user:any}) => {
    return (
        <div className="flex gap-2 items-center justify-center rounded-md bg-slate-200 px-4 py-2 ">
            <div className="">
                <div className="w-[43px] h-[43px] bg-black rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{user.name[0]}</span>
                </div>
            </div>
            <div className="flex flex-col -space-y-1">
                <span className="font-bold">{user.name}</span>
                <span className="text-sm">{user.email}</span>
            </div>
        </div>
    )
}

export default UserBadge;