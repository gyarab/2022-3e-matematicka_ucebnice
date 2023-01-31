/**
 * GENERATE EQUATION
 *
 * function provides equation documentation
 *
 * - length - tells the function what is the number of polynomials in the equation (unlimited)
 * - difficulty - tells the function what should be the output difficulty (number 1 to 3)
 *
 * difficulty 1 => generates numbers 1 to 10
 * difficulty 2 => generates numbers 1 to 50
 * difficulty 3 => generates numbers 1 to 100
 *
 * @param length
 * @param difficulty
 * @returns {{question: string, answers: *[], correctAnswer: number}}
 */
export function generateEquation(length, difficulty) {
    /*
    TODO -> chtělo by, aby funkce uměla i násobení a dělení. Může být ve tvaru zlomku 3/2. Klidně proházet pořadí členů i s x. Možná by bylo zajímavé tu generaci trochu změnit třeba že uděláš pole čísel a pak na konci uděláš string a mezi čísla dáš náhodně operátory.
    */

    if (typeof length === "undefined" || typeof difficulty === "undefined")
        throw new Error('All parameters must be defined!')
    if (length === null || difficulty === null)
        throw new Error('There are not null parameters acceptable only!')
    if (isNaN(length))
        throw new Error('The equation length is not a number!')
    if (isNaN(difficulty))
        throw new Error('The difficulty is not a number!')
    if (!isFinite(length) || !isFinite(difficulty))
        throw new Error('It is required to have finite value of the parameter!')

    let equation = "";
    let correctAnswer = 0;
    if (difficulty === 1) {
        difficulty = 10 + 1;
    } else if (difficulty === 2) {
        difficulty = 50 + 1;
    } else if (difficulty === 3) {
        difficulty = 100 + 1;
    } else {
        throw new Error('The equation has incorrect difficulty parameter! Read the documentation...')
    }
    equation += "x = ";
    for (let i = 0; i < length; i++) {
        let a = Math.floor(Math.random() * difficulty);

        if (i === 0) {
            let a = Math.floor(Math.random() * difficulty) + 1;
            correctAnswer += a;
            equation += (a + " ");
            continue
        }
        if (Math.floor(Math.random() * 2) === 1) {
            correctAnswer += a;
            equation += ("+" + " " + a + " ");
        } else {
            correctAnswer -= a;
            equation += ("-" + " " + a + " ");
        }
    }

    let ans = []
    ans.push(correctAnswer);
    ans.push(correctAnswer - 2);
    ans.push(correctAnswer + 2);
    ans.push(correctAnswer + 1);
    ans.sort((a, b) => 0.5 - Math.random());

    return {
        question: equation,
        correctAnswer: correctAnswer,
        answers: ans
    }
}


/**
 * GENERATE EQUAL PAIRS
 *
 * This function generates new Map() which contains pairs for pexeso game, for rendering and comparing.
 * The whole generation is based on size of pexeso and its difficulty. These pieces of information are read from parameters.
 *
 * @param size
 * @param difficulty
 * @returns {Map<any, any>}
 */
export function generateEqualPairs(size, difficulty) {
    /*
    TODO -> při generování se občas opakují klíče ==> nutno zajistit, aby měla mapa na výstupu požadovaný počet prvků
    
    ctverec 4 X 4 (pripadne potom zmenime zalezi jak to bude vypadat)
    difficulty 1 = nasobení (6 * 7, 42) (6,7 trida)
    difficulty 2 = scitani (27 + 43) (6,7 trida)
    difficulty 3 = odmocnina (√49,7) (8,9 trida)
    difficulty 4 = extremni cviceni (nasobeni lvl hard a take mix) proste mix
     */

    if (typeof size === "undefined" || typeof difficulty === "undefined")
        throw new Error('All parameters must be defined!')
    if (length === null || difficulty === null)
        throw new Error('There are not null parameters acceptable only!')
    if (isNaN(size))
        throw new Error('The equation length is not a number!')
    if (isNaN(difficulty))
        throw new Error('The difficulty is not a number!')
    if (!isFinite(size) || !isFinite(difficulty))
        throw new Error('It is required to have finite value of the parameter!')

    let pairs = new Map()
    const numberOfEntries = (size ** 2) / 2

    if (difficulty === 1) {
        for (let i = 0; i < numberOfEntries; i++) {
            let a = Math.floor(Math.random() * 11);
            let b = Math.floor(Math.random() * 11);
            pairs.set(`${a*b}`, a + " * " + b)
        }
    } else if (difficulty === 2) {
        for (let i = 0; i < numberOfEntries; i++) {
            let a = Math.floor(Math.random() * 41) + 10;
            let b = Math.floor(Math.random() * 41) + 10;

            const isMinus = Math.floor(Math.random() * 2) === 1
            const key = isMinus ? `${a-b}` : `${a+b}`
            if (pairs.has(key)) {
                i--
                continue
            }
            const value = isMinus ? `${a} - ${b}` : `${a} + ${b}`
            pairs.set(key, value)
        }
    } else if (difficulty === 3) {
        for (let i = 0; i < numberOfEntries; i++) {
            let a = Math.floor(Math.random() * 11);
            if (pairs.has(`${a}`)) {
                i--
                continue
            }
            pairs.set(`${a}`, "√" + a * a)
        }
    } else if (difficulty === 4) {
        for (let i = 0; i < numberOfEntries; i++) {
            let choice = Math.floor(Math.random() * 3);
            if (choice === 0) {
                // hard nasobeni

                let a = Math.floor(Math.random() * 11 + 10);
                let b = Math.floor(Math.random() * 10);
                const key = `${a*b}`
                if (pairs.has(key)) {
                    i--
                    continue
                }
                pairs.set(`${key}`, a + " * " + b);
            } else if (choice === 1) {
                // hard scitani (112 - 69)

                let a = Math.floor(Math.random() * 101) + 100;
                let b = Math.floor(Math.random() * 11);

                const isMinus = Math.floor(Math.random() * 2) === 1
                const key = isMinus ? `${a-b}` : `${a+b}`
                if (pairs.has(key)) {
                    i--
                    continue
                }
                const value = isMinus ? `${a} - ${b}` : `${a} + ${b}`
                pairs.set(`${key}`, value)
            } else if (choice === 2) {
                let a = Math.floor(Math.random() * 16 + 5);
                if (pairs.has(`${a}`)) {
                    i--
                    continue
                }
                pairs.set(`${a}`, "√" + a * a)
            }
        }
    } else
        throw new Error('The equation has incorrect difficulty parameter! Read the documentation...')

    return pairs
}
