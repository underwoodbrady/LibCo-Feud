import TeamBox from "../components/TeamBox";
import QuestionDisplay from "../components/QuestionDisplay";
import Answer from "../components/Answer";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { createFullArr } from "../data/getQuestions";

let answers = [
    {
        text: "Answer",
        value: 56,
    },
    {
        text: "Answer",
        value: 23,
    },
    {
        text: "Answer",
        value: 34,
    },
    {
        text: "Answer",
        value: 3,
    },
    {
        text: "Answer",
        value: 3,
    },
    {
        text: "Answer",
        value: 3,
    },
    {
        text: "Answer",
        value: 3,
    },
    {
        text: "Answer",
        value: 3,
    },
];

type Answer = {
    text: string;
    value: string;
};

type DataList = {
    question: string;
    answers: Answer[];
};

let Game = () => {
    let [dataList, setDataList] = useState<DataList[]>([]);
    let [question, setQuestion] = useState<string>("");
    let [answers, setAnswers] = useState<Answer[]>([]);

    useEffect(() => {
        createFullArr().then((fullArr: any) => {
            const randomNum = Math.floor(Math.random() * fullArr.length);
            setQuestion(fullArr[randomNum].question);
            setAnswers(fullArr[randomNum].answers);
            setDataList(fullArr);
        });
    }, []);

    let newQuestion = () => {
        console.log(dataList);
        const randomNum = Math.floor(Math.random() * dataList.length);
        setQuestion(dataList[randomNum].question);
        setAnswers(dataList[randomNum]?.answers);
    };

    return (
        <main className="flex justify-center flex-col items-center m-8">
            <div className="mb-8">
                <QuestionDisplay question={question} />
            </div>
            <div className="flex justify-between items-center mb-8">
                <TeamBox name="Team 1" points={48} />
                <div className="grid grid-cols-2 bg-neutral-900 p-4 gap-4 mx-8">
                    {answers.map((val, ind) => (
                        <Answer text={val.text} value={val.value} index={ind} />
                    ))}
                </div>
                <TeamBox name="Team 2" points={51} />
            </div>
            <Button label="Go To Next" onclick={newQuestion} />
        </main>
    );
};

export default Game;
