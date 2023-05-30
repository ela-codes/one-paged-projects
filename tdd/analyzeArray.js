class ArrayDescription {
    constructor(array) {
        this.average = this.getArrAverage(array)
        this.length = array.length
        this.min = this.getArrMin(this.getSortedArray(array))
        this.max = this.getArrMax(this.getSortedArray(array))
    }

    getArrAverage(array) {
        const sum = array.reduce((accum, currValue) => accum + currValue, 0)
        return Math.round(sum / array.length)
    }

    getArrMin(array) {
        return array[0]
    }

    getArrMax(array) {
        return array[array.length-1]
    }

    getSortedArray(array) {
        function quickSort(arr) { 
            if (arr.length < 2) return arr
        
            let pivot = arr[arr.length-1] 
        
            const left = []
            const right = []
            for (let n of arr) {
                if (n < pivot) left.push(n)
                else if (n > pivot) right.push(n)
            }
            return [].concat(quickSort(left),[pivot], quickSort(right))
        }
        const sortedArr = quickSort(array)
        return sortedArr
    }
}

function analyzeArray(array) {
    function isValidArray(array) {
        for (let i of array) { // must be all numbers
            if (typeof i !== 'number') {
                return false
            }
        }


        if (!Array.isArray(array)) return false // must be an array object
    
        return true
    }

    
    if (isValidArray(array)) {
        const analyzedArrayObj = new ArrayDescription(array)
        return analyzedArrayObj
    } else {
        return 'Not a valid array'
    }
}

export default analyzeArray

