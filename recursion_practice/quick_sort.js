const testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 34]

function quickSort(arr) { // break down array
    if (arr.length < 2) return arr

    let pivot = arr[arr.length-1] // use last element as pivot

    // determine where to position pivot point
    const left = []
    const right = []
    for (let n of arr) {
        if (n < pivot) left.push(n)
        else if (n > pivot) right.push(n)
    }
    return [].concat(quickSort(left),[pivot], quickSort(right))
}

const sorted = quickSort(testArr)
console.log(sorted)
console.log(sorted[sorted.length/2])