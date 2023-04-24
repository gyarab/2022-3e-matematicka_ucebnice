let list = new Map;
list.set('1', 'one')
list.set('2', 'two')
list.set('3', 'three')
list.set('4', 'four')
list.set('5', 'five')
list.set('6', 'six')
list.set('7', 'seven')
list.set('8', 'eight')
list.set('9', 'nine')
list.set('10', 'ten')
list.set('11', 'eleven')
list.set('12', 'twelve')

let arr = Array.from(list.entries()).reduce((acc, item) => {
    let group = acc.pop();
    if (group.length === 4) {
        acc.push(group);
        group = [];
    }
    group.push(item);
    acc.push(group);
    return acc;
}, [[]]);
console.log(arr)