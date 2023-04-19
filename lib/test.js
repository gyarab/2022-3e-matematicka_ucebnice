let list = new Map();

const func = (n) => {
    for (let i = 1; i <= n; i++) {
        console.log(i)
    }
}

list.set(1, () => {
    console.log('hello world')
})

list.set(2, (name) => {
    console.log('hello, ' + name)
})

list.set(3, func)

//list.get(3)(5)

let arr = []

arr.push(1)
arr.push(2)
arr.push(3)

console.log(arr.splice(0, -1))