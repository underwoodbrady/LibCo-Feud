export type AnswerType = {
    answer: string;
    value: number;
};

export type QuestionList = {
    question: string;
    answers: AnswerType[];
};