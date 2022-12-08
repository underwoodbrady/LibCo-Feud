import fullList from "./fullDataset.txt";
import { AnswerType, QuestionList } from "../types/GameTypes";

export const createFullArr = async () => {
    let initArr;
    let finalArr;
    await fetch(fullList)
        .then((response) => response.text())
        .then((result) => {
            initArr = result.split("\n");
            finalArr = [];
            for (let i in initArr) {

                let commaSeparated = initArr[i].split("\t");
                let question = commaSeparated.shift();
                let answers = [];
                let structuredData : QuestionList;

                for (let e = 0, i = commaSeparated.length; e < i; e += 2) {

                    let answer: AnswerType = {
                        text: commaSeparated[e],
                        value: Number(commaSeparated[e + 1]),
                    };

                    answers.push(answer);
                }
                
                structuredData = {
                    question: question || "",
                    answers: answers,
                };

                finalArr.push(structuredData);
            }
        });

    return finalArr;
};
