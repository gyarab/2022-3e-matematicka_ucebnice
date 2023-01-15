export default function generateEquation(length, difficulty) {
    /*
    TODO -> Funkce by měla vracet objekt jako je níže. Tento obsah by měla vygenerovat! Nezáleží na počtu odpovědí, ale je vždy pouze 1 správná.
    TODO -> Abychom to trochu zobecnili, funkce by měla mít něco jako parametr `length`, který bude udávat počet členů v rovnici a dále úroveň obtížnosti.
    difficulty 1 = cisla od 1 do 10
    difficulty 2 = cisla od 1 do 50
    difficulty 3 = cisla od 1 do 100
    
     
    */
    
    let s = "";
    let vysledek = 0;
    if (difficulty === 1){
        for(let i = 0; i <length; i++){
            let a = Math.floor(Math.random() * 11);

            if (Math.floor(Math.random()*2) ===1){
                vysledek+=a;
                s+=+"+"+" "+a+" ";
            }else{
                vysledek-=a;
                s+="-"+" "+a+" ";
            }
               }
        s+="= x";
        let ans = []
        ans.push(vysledek);
        ans.push(vysledek-2);
        ans.push(vysledek+2);
        ans.push(vysledek+1);
        ans = ans.sort((a, b) => 0.5 - Math.random());
    }
    return {

        question: s,
        correctAnswer: vysledek,
        answers: ans
    }
}