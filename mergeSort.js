const unsortedArr = [-39,14,8,26,42,1,70,523,-3, 4]


function merge(arr) {
    if (arr.length > 2) {
        let midIdx = arr.length/2
        const left = merge(arr.slice(0, midIdx))
        const right = merge(arr.slice(midIdx))
        return mergeSort(left, right)
    } else {
        if (arr[0] > arr[1]) {
            let copy = arr[0]
            arr[0] = arr[1]
            arr[1] = copy
        } return arr
    }
}

function mergeSort(left, right) {
    const final = []

    while(left.length && right.length) {
        if (left[0] < right[0]) {
            final.push(left.shift())
        } else {
            final.push(right.shift())
        }
    } return final.concat(left).concat(right)
}

console.log(merge(unsortedArr))