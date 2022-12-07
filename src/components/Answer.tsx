type AnswerProps = {
    text: string,
    value: string,
    index: number,
}

let Answer = ({text, value, index}: AnswerProps) => {

    return(
        <div className="bg-blue-400 p-4 w-56 text-left relative">
            <h3>{index}. {text}</h3>
            <div className="absolute right-0 top-0 h-full bg-blue-300 w-14 flex justify-center items-center">
                <p className="font-semibold">{value}</p>
            </div>
        </div>
    )
}

export default Answer;