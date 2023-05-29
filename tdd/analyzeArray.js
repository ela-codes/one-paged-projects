class ArrayDescription {
    constructor(array) {
        this.avg = this.getArrAverage(array)
        this.min = this.getArrMin(array)
        this.max = this.getArrMax(array)
        this.length = array.length
        this.sortedArr = this.quickSort(array)
    }

    getArrAverage(array) {
        const sum = array.reduce((accum, currValue) => accum + currValue, 0)
        return sum / array.length
    }

    getArrMin(array) {
        return this.sortedArr[0]
    }

    getArrMax(array) {
        return this.sortedArr[this.sortedArr.length-1]
    }

    quickSort(array) { 
        if (arr.length < 2) return arr
    
        let pivot = arr[arr.length-1] 
    
        const left = []
        const right = []
        for (let n of arr) {
            if (n < pivot) left.push(n)
            else if (n > pivot) right.push(n)
        }
        return [].concat(this.quickSort(left),[pivot], this.quickSort(right))
    }
}


export default ArrayDescription