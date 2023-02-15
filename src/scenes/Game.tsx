import TeamBox from "../components/TeamBox";
import QuestionDisplay from "../components/QuestionDisplay";
import Answer from "../components/Answer";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { createFullArr } from "../data/getDataset";
import { AnswerType, QuestionList } from "../types/GameTypes";
import Icon from "../assets/icons";

let Game = () => {
    let [dataList, setDataList] = useState<QuestionList[]>([]);
    let [question, setQuestion] = useState<string>("");
    let [answers, setAnswers] = useState<AnswerType[]>([]);
    let [revealAll, setRevealAll] = useState<boolean>(false);
    let [showWrong, setShowWrong] = useState<boolean>(false);

    let [teamScores, setTeamScores] = useState({
        team1: 0,
        team2: 0,
    });

    let [currentTeam, setCurrentTeam] = useState(
        Math.floor(Math.random() * 2) + 1
    );

    let [teamLives, setTeamLives] = useState({
        team1: 3,
        team2: 3,
    });

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

    let updateTeamScore = (team: number, score: number) => {
        if (team === 1)
            setTeamScores({ ...teamScores, team1: teamScores.team1 + score });
        if (team === 2)
            setTeamScores({ ...teamScores, team2: teamScores.team2 + score });
    };

    let removeTeamLife = (team: number) => {
        if (team === 1 && teamLives.team1 > 0)
            setTeamLives({ ...teamLives, team1: teamLives.team1 - 1 });
        if (team === 2 && teamLives.team2 > 0)
            setTeamLives({ ...teamLives, team2: teamLives.team2 - 1 });
    };

    let resetLives = () => {
        setTeamLives({ team1: 3, team2: 3 });
    };

    let wrongAnswer = () => {
        removeTeamLife(currentTeam);
        setShowWrong(true);
        setTimeout(() => {
            setShowWrong(false);
        }, 1000);
    };

    let switchTeam = () => {
        if (currentTeam == 1) {
            setCurrentTeam(2);
        } else if (currentTeam == 2) {
            setCurrentTeam(1);
        }
    };

    return (
        <main className="flex justify-between flex-col items-center h-screen bg-black/10">
            <div className="">
                <QuestionDisplay question={question} />
            </div>
            <div className="flex justify-between px-12 items-center my-auto flex-1 w-full">
                <TeamBox
                    name="Team 1"
                    points={teamScores.team1}
                    isTurn={currentTeam == 1}
                    lives={teamLives.team1}
                    updateScore={(score) =>
                        updateTeamScore(1, score - teamScores.team1)
                    }
                />
                <div className="relative grid grid-rows-4 grid-cols-2 grid-flow-col bg-white p-1 gap-1 mx-8 rounded-sm">
                    {answers.map((val, ind) => (
                        <Answer
                            text={val.answer}
                            value={val.value}
                            index={ind + 1}
                            revealed={revealAll}
                            onclick={() =>
                                updateTeamScore(currentTeam, val.value)
                            }
                            key={ind + 1}
                        />
                    ))}
                    {answers.length < 8 &&
                        [...Array(8 - answers.length)].map((val, ind) => (
                            <div className="bg-gradient-to-b from-[#6591E0] to-[#1157CE] p-4 w-60 h-[60px] text-left relative hover:cursor-pointer"></div>
                        ))}
                    {showWrong && (
                        <img
                            src={Icon.smallWrong}
                            className="w-28 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
                        />
                    )}
                </div>
                <TeamBox
                    name="Team 2"
                    points={teamScores.team2}
                    isTurn={currentTeam == 2}
                    lives={teamLives.team2}
                    updateScore={(score) =>
                        updateTeamScore(2, score - teamScores.team2)
                    }
                />
            </div>
            <div className="w-[600px] h-[90px] bg-[#021938] border-[#222A34] border-4 rounded-lg flex -mb-2 justify-around p-4">
                <Button label="Wrong" onclick={wrongAnswer} red icon="wrong"/>
                <Button onclick={resetLives} icon="reset"/>
                <Button  onclick={switchTeam} icon="switch"/>
                <Button  onclick={revealAllAnswers} icon="view"/>
                <Button label="Next" onclick={newQuestion} icon="next"/>
            </div>
            {/**
                 *     <div>
                <Button label="Go Next" onclick={newQuestion} />
                <Button label="Reveal All" onclick={revealAllAnswers} />
            </div>
            <div>
                <Button label="Wrong Answer" onclick={wrongAnswer} />
                <Button label="Reset Lives" onclick={resetLives} />
            </div>
            <Button label="Switch Current Team" onclick={switchTeam} />
                 * 
                 */}
        </main>
    );
};

export default Game;
