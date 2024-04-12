import { useEffect, useState } from "react";
import Icon from "../assets/icons";

type TeamBoxProps = {
    name: string;
    points: number;
    isTurn: boolean;
    lives: number;
    updateScore: (score: number) => void;
};

let TeamBox = ({ name, points, isTurn, lives, updateScore }: TeamBoxProps) => {
    const [isEditingScore, setIsEditingScore] = useState<boolean>(false);
    const [editedScore, setEditedScore] = useState<string>(String(points));

    useEffect(() => {
        setEditedScore(String(points));
    }, [points]);

    const onUpdate = () => {
        setIsEditingScore(false);
        updateScore(Number(editedScore));
    };

    return (
        <div
            className={
                isTurn
                    ? "w-32 h-32 bg-[#040c68] border-[#FFB104] border-2 rounded-lg text-center drop flex flex-col items-center justify-around"
                    : "w-32 h-32 bg-[#040c68] border-[#1075B1] border-2 rounded-lg text-center flex flex-col items-center justify-around"
            }>
            <h2
                className={
                    isTurn
                        ? "text-[#FFB104] font-bold my-2 text-lg"
                        : "text-white my-2 text-lg"
                }>
                {name}
            </h2>

            {isEditingScore ? (
                <div className="flex flex-col justify-center items-center">
                    <input
                        type="number"
                        name="score"
                        className="text-white bg-transparent text-xl font-semibold text-center w-16 outline-none mb-2"
                        value={editedScore}
                        onChange={(e) => setEditedScore(e.target.value)}
                    />
                    <button
                        className="text-sm bg-[#0345b3] rounded-lg w-full py-1"
                        onClick={onUpdate}>
                        Update
                    </button>
                </div>
            ) : (
                <button
                    className="font-semibold text-4xl text-center h-full mb-4 text-white"
                    onClick={() => setIsEditingScore(true)}>
                    {points}
                </button>
            )}

            {(3 - lives >= 1) && (
                <div className="flex space-x-2 mb-3 justify-center">
                    {Array(3 - lives)
                        .fill("")
                        .map((num) => {
                            return <img src={Icon.smallWrong} width={16} />;
                        })}
                </div>
            )}
        </div>
    );
};

export default TeamBox;
