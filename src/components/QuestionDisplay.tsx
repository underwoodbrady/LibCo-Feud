type QuestionDisplayProps = {
    question: string,
}

let QuestionDisplay = ({question}:QuestionDisplayProps) => {

    return(
        <div className="w-96 bg-blue-600 p-6">
            {question}
        </div>
    )

}

export default QuestionDisplay;