import TeamBox from "../components/TeamBox";
import QuestionDisplay from "../components/QuestionDisplay";
import Answer from "../components/Answer";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { createFullArr } from "../data/getDataset";
import { AnswerType, QuestionList } from "../types/GameTypes";


let Game = () => {
    let [dataList, setDataList] = useState<QuestionList[]>([]);
    let [question, setQuestion] = useState<string>("");
    let [answers, setAnswers] = useState<AnswerType[]>([]);
    let [revealAll, setRevealAll] = useState<boolean>(false);

    useEffect(() => {
        createFullArr().then((fullArr: any) => {
            const randomNum = Math.floor(Math.random() * fullArr.length);
            setQuestion(fullArr[randomNum].question);
            setAnswers(fullArr[randomNum].answers);
            setDataList(fullArr);
        });
    }, []);

    let newQuestion = () => {
        setRevealAll(false);
        const randomNum = Math.floor(Math.random() * dataList.length);
        setQuestion(dataList[randomNum].question);
        setAnswers(dataList[randomNum]?.answers);
    };

    let revealAllAnswers = () => {
        setRevealAll(true);
    };

    return (
        <main className="flex justify-center flex-col items-center m-8">
            <div className="mb-8">
                <QuestionDisplay question={question} />
            </div>
            <div className="flex justify-between items-center mb-8">
                <TeamBox name="Team 1" points={0} />
                <div className="grid grid-cols-2 bg-neutral-900 p-4 gap-4 mx-8">
                    {answers.map((val, ind) => (
                        <Answer
                            text={val.text}
                            value={val.value}
                            index={ind + 1}
                            revealed={revealAll}
                        />
                    ))}
                </div>
                <TeamBox name="Team 2" points={0} />
            </div>
            <div className="space-y-2">
                <p className="underline mb-2">
                    Click Boxes to Reveal Individually
                </p>
                <Button label="Go Next" onclick={newQuestion} />
                <Button label="Reveal All" onclick={revealAllAnswers} />
            </div>
        </main>
    );
};

export default Game;
