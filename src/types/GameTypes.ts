export type AnswerType = {
    text: string;
    value: number;
};

export type QuestionList = {
    question: string;
    answers: AnswerType[];
};