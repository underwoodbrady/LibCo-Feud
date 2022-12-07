import fullList from "./fullDataset.txt";

export const createFullArr = async() => {
    let initArr;
    let finalArr
    await fetch(fullList)
    .then((response)=> response.text())
    .then((result) =>{
        initArr  = result.split("\n"); 
        finalArr = [];
        for(let i in initArr){
            let commaSeparated = initArr[i].split("\t");
            let question = commaSeparated.shift();
            let answers = [];
            let structuredData;
            for(let e = 0, i=commaSeparated.length; e<i; e+=2){
                answers.push({
                    text: commaSeparated[e],
                    value: commaSeparated[e+1],
                })
            }
            structuredData = {
                question: question,
                answers: answers,
            }
            finalArr.push(structuredData);
        }
    })

    return finalArr;
}


