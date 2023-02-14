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
        <div className="flex items-center flex-col">
            <h2 className={isTurn ? "mb-4 text-yellow-200 font-bold" : "mb-4 text-neutral-200"}>{name}</h2>
            <div className="w-24 h-24 bg-blue-300 flex justify-center items-center mb-4">
                {isEditingScore ? (
                    <div className="flex flex-col justify-center items-center">
                        <input
                            type="number"
                            name="score"
                            className="text-white bg-blue-400 w-16 outline-none"
                            value={editedScore}
                            onChange={(e) => setEditedScore(e.target.value)}
                        />
                        <button
                            className="text-sm bg-blue-500 w-full"
                            onClick={onUpdate}>
                            Update
                        </button>
                    </div>
                ) : (
                    <button
                        className="font-semibold text-xl"
                        onClick={() => setIsEditingScore(true)}>
                        {points}
                    </button>
                )}
            </div>
            <div className="flex space-x-4 w-full h-5">
                {Array(lives).fill("").map((num)=>{
                    return(
                        <img src={Icon.heart} width={20}/>
                    )
                })}
            </div>
        </div>
    );
};

export default TeamBox;
