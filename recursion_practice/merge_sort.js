const arr = [9,3,7,5,6,4,8,2]

function sort(arr) {
    console.log('checking ' + arr)
    if (arr.length > 1) {
        let mid = arr.length / 2
        sort(arr.slice(0, mid))
        sort(arr.slice(mid))
    } else if (arr.length === 1) {
        console.log(arr)
        mergeArr(arr[0])
    }
}

let merge = []
function mergeArr(num) {
    if (merge.length == 2) {
        if (merge[0] > merge[1]) {
            let copy = merge[0]
            merge[0] = merge[1]
            merge[1] = copy
            console.log(merge)
        }
    } else if (!merge) {
        merge.push(num)
    }
}

sort(arr)