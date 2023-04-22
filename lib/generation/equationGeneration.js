/**
 * GENERATE EQUATION
 *
 * function provides equation documentation
 *
 * - length - tells the function what is the number of polynomials in the equation (unlimited)
 * - difficulty - tells the function what should be the output difficulty (number 1 to 3)
 *
 * - difficulty 1 => generates numbers 1 to 10
 * - difficulty 2 => generates numbers 1 to 50
 * - difficulty 3 => generates numbers 1 to 100
 *
 * @param length
 * @param difficultyCoefficient
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
    let difficultyCoefficient = difficulty
    if (difficulty === 1) {
        difficultyCoefficient = 10 + 1;
    } else if (difficulty === 2) {
        difficultyCoefficient = 50 + 1;
    } else if (difficulty === 3) {
        difficultyCoefficient = 100 + 1;
    } else {
        throw new Error('The equation has incorrect difficulty parameter! Read the documentation...')
    }
    equation += "x = ";
    for (let i = 0; i < length; i++) {
        let a = Math.floor(Math.random() * difficultyCoefficient);

        if (i === 0) {
            let a = Math.floor(Math.random() * difficultyCoefficient) + 1;
            correctAnswer += a;
            equation += (a + " ");
            continue
        }
        if (getRandomBoolean()) {
            correctAnswer += a;
            equation += ("+" + " " + a + " ");
        } else {
            correctAnswer -= a;
            equation += ("-" + " " + a + " ");
        }
    }

    let ans = []

    /*
        This method provides a generation of a random answer which is different from others and is close to the correct answer.
        The return statement means that if the answer is already in the array, it will rerun its own method again until there is some available answer.
     */
    const generateRandomAnswer = (correctAnswer, deflection) => {
        const randInt = getRandomInt(1, deflection)
        const newAnswer = (getRandomBoolean()) ? (correctAnswer-randInt) : (correctAnswer+randInt)
        return (ans.includes(newAnswer)) ? generateRandomAnswer(correctAnswer, deflection) : newAnswer
    }

    for (let i = 0; i < 3; i++)
        ans.push(generateRandomAnswer(correctAnswer, i + 2))

    return {
        difficulty: difficulty,
        length: length,
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

    if (typeof size === "undefined" || size === undefined || typeof difficulty === "undefined" || difficulty === undefined)
        throw new Error('All parameters must be defined!')
    if (size === null || difficulty === null)
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
            let a = getRandomInt(0, 10);
            let b = getRandomInt(0, 10);
            pairs.set(`${a * b}`, a + " * " + b)
        }
    } else if (difficulty === 2) {
        for (let i = 0; i < numberOfEntries; i++) {
            let a = getRandomInt(0, 40) + 10;
            let b = getRandomInt(0, 40) + 10;

            const isMinus = getRandomBoolean()
            const key = isMinus ? `${a - b}` : `${a + b}`
            if (pairs.has(key)) {
                i--
                continue
            }
            const value = isMinus ? `${a} - ${b}` : `${a} + ${b}`
            pairs.set(key, value)
        }
    } else if (difficulty === 3) {
        for (let i = 0; i < numberOfEntries; i++) {
            let a = getRandomInt(0, 10);
            if (pairs.has(`${a}`)) {
                i--
                continue
            }
            pairs.set(`${a}`, "√" + a * a)
        }
    } else if (difficulty === 4) {
        for (let i = 0; i < numberOfEntries; i++) {
            let choice = getRandomInt(0, 2);
            if (choice === 0) {
                // hard nasobeni

                let a = getRandomInt(10, 20);
                let b = getRandomInt(0, 9);
                const key = `${a * b}`
                if (pairs.has(key)) {
                    i--
                    continue
                }
                pairs.set(`${key}`, a + " * " + b);
            } else if (choice === 1) {
                // hard scitani (112 - 69)

                let a = getRandomInt(0, 100) + 100;
                let b = getRandomInt(0, 10);

                const isMinus = getRandomBoolean()
                const key = isMinus ? `${a - b}` : `${a + b}`
                if (pairs.has(key)) {
                    i--
                    continue
                }
                const value = isMinus ? `${a} - ${b}` : `${a} + ${b}`
                pairs.set(`${key}`, value)
            } else if (choice === 2) {
                let a = getRandomInt(5, 20);
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

export function generateSorterGameObject(size, difficulty = 1) {
    /*
    TODO -> vygeneruj objekt podle schématu
    TODO -> pole itemů budou stringy čísel a případně operátoru (nezáleží na tom, kde ty operátory budou)
    TODO -> parametr size udává počet itemů
    difficulty 1 = 7ma trida
    difficulty 2 = 9ta trida
    difficulty 3 = 9ta trida HARD


     */
    let d = difficulty * 20;
    let items = [];
    let result = 0;

    // prvni cislo
    let a = getRandomInt(1, d);
    items.push("+ " + a);
    result += a;
    for (let i = 0; i < size; i++) {
        switch (getRandomInt(1, 4)) {
            case 1:
                // '+'
                a = getRandomInt(1, d);
                items.push("+ " + a);
                result += a;
                break;
            case 2:
                // '-'
                a = getRandomInt(1, d);
                items.push("- " + a);
                result -= a;
                break;
            case 3:
                // '*'
                for (let i = 0; i < 5; i++) {
                    let a = getRandomInt(2, d / 2);
                    if (Math.abs(result * a) < d * 5) {
                        items.push("* " + a);
                        result *= a;
                        break;
                    } else if (i === 4) {
                        let a = getRandomInt(1, d);
                        items.push("+ " + a);
                        result += a;
                    }
                }
                break;
            case 4:
                //   '/'
                let list = [...getNumberDecomposition(result)];
                if (list.length > 1) {
                    let numbersOfMultiplying = getRandomInt(1, list.length - 1);
                    let a = 1;
                    for (let i = 0; i < numbersOfMultiplying; i++) {
                        let listNum = list[getRandomInt(0, list.length - 1)];
                        list.splice(list.indexOf(listNum), 1);
                        a *= listNum;
                    }
                    items.push("/ " + a);
                    result /= a;
                    break;
                } else {
                    // '-'
                    let a = getRandomInt(0, d);
                    items.push("- " + a);
                    result -= a;
                }
                break;
        }

        if (i % 2 === 0) {
            items.push("==" + result + "==");
        }
    }
    return {
        items: items,
        result: result.toString(),
        evaluation: undefined
    }
}

/**
 * GET NUMBER DECOMPOSITION
 *
 * This method returns an array of primary numbers whose product is equal to the parameter
 *
 * @param {int} n
 * @returns {list}
 */
export function getNumberDecomposition(n) {
    n = Math.abs(n)
    let list = []
    if (n === 0)
        return list

    let i = 2;
    while (n !== 1) {
        if (n % i === 0) {
            n /= i
            list.push(i)
        } else
            i++
    }
    return list;
}

/**
 * GET RANDOM BOOLEAN
 *
 * This method returns random boolean, so that the output is true or false.
 *
 * @returns {boolean}
 */
export function getRandomBoolean() {
    return getRandomInt() === 1
}

/**
 * GET RANDOM INT
 *
 * This method returns a random int from certain range.
 * The first number in the range is included as well as the last number in the range.
 * Default random int is 0 or 1
 *
 * - rangeStart - should be a positive number, defines the first number in a range possible to generate
 * - rangeEnd - should be a positive number, defines the last number in a range possible to render
 *
 * @param rangeStart
 * @param rangeEnd
 * @returns {number}
 */
export function getRandomInt(rangeStart = 0, rangeEnd = 1) {
    const range = rangeEnd - rangeStart + 1
    return Math.floor(Math.random() * range + rangeStart)
}

/**
 * MIX ARRAY
 *
 * This function return mixed array given as a parameter
 * @param arr
 * @returns {*}
 */
export const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    return arr
};
