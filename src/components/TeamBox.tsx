type TeamBoxProps = {
    name: string;
    points: number;
};

let TeamBox = ({ name, points }: TeamBoxProps) => {
    return (
        <div className="flex items-center flex-col">
            <h2 className="mb-4">{name}</h2>
            <div className="w-24 h-24 bg-blue-300 flex justify-center items-center">
                <p className="font-semibold text-xl">{points}</p>
            </div>
        </div>
    );
};

export default TeamBox;
