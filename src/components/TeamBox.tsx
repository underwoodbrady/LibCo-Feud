type TeamBoxProps = {
    name: string;
    points: number;
    onclick?: ()=>void;
};

let TeamBox = ({ name, points, onclick }: TeamBoxProps) => {
    return (
        <div className="flex items-center flex-col">
            <h2 className="mb-4">{name}</h2>
            <div className="w-24 h-24 bg-blue-300 flex justify-center items-center">
                <p className="font-semibold text-xl">{points}</p>
            </div>
            <button className="bg-blue-400 h-8 w-full" onClick={onclick}>+</button>
        </div>
    );
};

export default TeamBox;
