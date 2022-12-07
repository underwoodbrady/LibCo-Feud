import { useEffect, useState } from "react";

type AnswerProps = {
    text: string;
    value: string;
    index: number;
    revealed: boolean;
};

let Answer = ({ text, value, index, revealed }: AnswerProps) => {
    let [shown, setShown] = useState<boolean>(false);

    useEffect(()=>{
        setShown(false);
    },[text, value, revealed])

    return (
        <div className="bg-blue-400 p-4 w-56 h-[56px] text-left relative hover:cursor-pointer" onClick={()=>setShown(true)}>
            {(revealed || shown) && (
                <>
                    <h3>
                        {index}. {text}
                    </h3>
                    <div className="absolute right-0 top-0 h-full bg-blue-300 w-14 flex justify-center items-center">
                        <p className="font-semibold">{value}</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default Answer;
