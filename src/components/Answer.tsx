import { useEffect, useState } from "react";

type AnswerProps = {
    text: string;
    value: number;
    index?: number;
    revealed?: boolean;
    onclick: () => void;
};

let Answer = ({ text, value, index, revealed, onclick }: AnswerProps) => {
    let [shown, setShown] = useState<boolean>(false);

    useEffect(()=>{
        setShown(false);
    },[text, value, revealed])

    const answerClicked= () =>{
        setShown(true)
        onclick()
    }

    return (
        <div className={revealed || shown ? "bg-[#013EA4] w-60 h-[60px] text-left relative":"bg-gradient-to-b from-[#6591E0] to-[#1157CE] w-60 h-[60px] text-left relative cursor-pointer"} onClick={answerClicked}>
            {(revealed || shown) ? (
                <div className="p-4 mr-14">
                    <h3 className="uppercase font-semibold">
                        {text}
                    </h3>
                    <div className="absolute right-0 top-0 h-full w-14 flex justify-center items-center bg-gradient-to-b from-[#6591E0] to-[#1157CE]">
                        <p className="font-bold text-xl">{value}</p>
                    </div>
                </div>
            ): (
                <div className="w-full h-full flex justify-center items-center">
                    <div className=" rounded-[50%] w-16 h-[48px] bg-[#0C2C7D] border-[#3D5CAC] border-2 shadow-inner flex text-2xl font-bold justify-center items-center">
                        {index}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Answer;
