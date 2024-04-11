import TeamBox from "../components/TeamBox";
import QuestionDisplay from "../components/QuestionDisplay";
import Answer from "../components/Answer";
import Button from "../components/Button";
import { useCallback, useEffect, useState } from "react";
import { createFullArr } from "../data/getDataset";
import { AnswerType, QuestionList } from "../types/GameTypes";
import Icon from "../assets/icons";

const randomizeOrder = false;

let Game = () => {
    let [dataList, setDataList] = useState<QuestionList[]>([]);
    let [question, setQuestion] = useState<string>("");
    let [questionNumber, setQuestionNumber] = useState<number>(0)
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

    interface AnswerRevealed {
        [key: number]: boolean;
    }

    const noAnswersRevealed: AnswerRevealed = {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
    }

    let [answerRevealed, setAnswerRevealed] = useState<AnswerRevealed>(noAnswersRevealed);

    let getRandomNumber = () => Math.floor(Math.random() * dataList.length);

    useEffect(() => {
        createFullArr().then((fullArr: any) => {
            if (randomizeOrder) {
                const tempRandomNumber = getRandomNumber();
                setQuestion(fullArr[tempRandomNumber].question);
                setAnswers(fullArr[tempRandomNumber].answers);
            } else {
                setQuestion(fullArr[questionNumber].question);
                setAnswers(fullArr[questionNumber].answers);
            }

            setDataList(fullArr);
        });
    }, []);

    let newQuestion = (question: number) => {
        setRevealAll(false);
        setAnswerRevealed(noAnswersRevealed);
        setQuestion(dataList[question].question);
        setAnswers(dataList[question]?.answers);
        setQuestionNumber(question);
    };

    let nextQuestion = () => {
        if (randomizeOrder){
            newQuestion(getRandomNumber())
            return
        }
        if (questionNumber < dataList.length)
            newQuestion(questionNumber + 1);
    }

    let previousQuestion = () => {
        if (randomizeOrder){
            newQuestion(getRandomNumber())
            return
        }
        if (questionNumber > 0)
            newQuestion(questionNumber - 1);
    }

    let revealAnswer = (answer: number) => {
        setAnswerRevealed({ ...answerRevealed, [answer]: true })
        updateTeamScore(currentTeam, answers[answer].value)
    }

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

    const handleKeyBoard = useCallback((event: KeyboardEvent) => {
        switch (event.code) {
            case "Space":
                switchTeam();
                break;
            case "Backspace":
                resetLives();
                break;
            case "Enter":
                revealAllAnswers();
                break;
            case "ArrowRight":
                nextQuestion();
                break;
            case "ArrowLeft":
                previousQuestion();
                break;
            case "Digit1":
                revealAnswer(0);
                break;
            case "Digit2":
                revealAnswer(1);
                break;
            case "Digit3":
                revealAnswer(2);
                break;
            case "Digit4":
                revealAnswer(3);
                break;
            case "Digit5":
                revealAnswer(4);
                break;
            case "Digit6":
                revealAnswer(5);
                break;
            case "Digit7":
                revealAnswer(6);
                break;
            case "Digit8":
                revealAnswer(7);
                break;
            case "Digit9":
                wrongAnswer();
                break;
        }
    }, [currentTeam, setCurrentTeam, teamLives, setTeamLives, revealAll, setRevealAll, teamLives, setTeamLives, answerRevealed, setAnswerRevealed, teamScores, updateTeamScore, answers, setAnswers, question, setQuestion]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyBoard);

        return () => {
            document.removeEventListener("keydown", handleKeyBoard);
        }
    }, [handleKeyBoard])

    return (
        <main className="flex justify-between flex-col items-center h-screen bg-black/20">
            <div className="">
                <QuestionDisplay question={question} />
            </div>
            <div className="flex justify-between px-12 items-center my-auto flex-1 w-full">
                <TeamBox
                    name="Libco"
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
                            revealed={revealAll || answerRevealed[ind]}
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
                    name="Koch Cunts"
                    points={teamScores.team2}
                    isTurn={currentTeam == 2}
                    lives={teamLives.team2}
                    updateScore={(score) =>
                        updateTeamScore(2, score - teamScores.team2)
                    }
                />
            </div>
            <div className="w-[600px] h-[90px] bg-[#021938] border-[#222A34] border-4 rounded-lg flex -mb-2 justify-around p-4">
                <Button label="Wrong" onclick={wrongAnswer} red icon="wrong" />
                <Button onclick={resetLives} icon="reset" />
                <Button onclick={switchTeam} icon="switch" />
                <Button onclick={revealAllAnswers} icon="view" />
                <Button label="Next" onclick={() => nextQuestion()} icon="next" />
            </div>
        </main>
    );
};

export default Game;
