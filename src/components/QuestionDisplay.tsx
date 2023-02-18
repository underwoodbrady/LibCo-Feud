type QuestionDisplayProps = {
    question: string;
};

let QuestionDisplay = ({ question }: QuestionDisplayProps) => {
    return (
        <div className="w-[600px] h-[140px] bg-[#021938] border-[#222A34] border-4 font-semibold rounded-lg text-center flex justify-center items-center text-2xl px-8 -mt-2">
            {question}
        </div>
    );
};

export default QuestionDisplay;
