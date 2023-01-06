export default function generateEquation(length, difficulty) {
    /*
    TODO -> Funkce by měla vracet objekt jako je níže. Tento obsah by měla vygenerovat! Nezáleží na počtu odpovědí, ale je vždy pouze 1 správná.
    TODO -> Abychom to trochu zobecnili, funkce by měla mít něco jako parametr `length`, který bude udávat počet členů v rovnici a dále úroveň obtížnosti.
     */

    return {
        question: '2 + 2 = x',
        correctAnswer: '4',
        answers: ['1', '2', '3', '4']
    }
}