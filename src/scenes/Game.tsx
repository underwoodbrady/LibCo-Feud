import TeamBox from '../components/TeamBox';
import QuestionDisplay from '../components/QuestionDisplay';
import Answer from '../components/Answer';

let Game = () => {

    return(
        <main>
            <QuestionDisplay/>
            <div>
                <Answer/>
                <Answer/>
                <Answer/>
                <Answer/>
                <Answer/>
                <Answer/>
                <Answer/>
            </div>
        </main>
    );

}

export default Game;