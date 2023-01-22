type TeamBoxProps = {
    name: string;
    points: number;
    isTurn: boolean;
};

let TeamBox = ({ name, points, isTurn }: TeamBoxProps) => {
    return (
        <div className="flex items-center flex-col">
            <h2 className={isTurn ? "mb-4 text-yellow-300": "mb-4"}>{name}</h2>
            <div className="w-24 h-24 bg-blue-300 flex justify-center items-center">
                <p className="font-semibold text-xl">{points}</p>
            </div>
        </div>
    );
};

export default TeamBox;
