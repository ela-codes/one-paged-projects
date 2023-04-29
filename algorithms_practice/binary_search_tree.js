class Node {
    constructor(data = null, leftNode = null, rightNode = null) {
        this.left = leftNode,
        this.data = data,
        this.right = rightNode
    }
}


class Tree {
    constructor(newArray) {
        this.root = this.buildTree(newArray)
    }

    buildTree(array) {
        // input is an array (sorted or unsorted)
        // removes duplicates and sorts array, if not sorted
        // returns the root node of a balanced tree
        function removeDuplicates(arr) {
            return [...new Set(arr)]
        }

        function quickSort(arr) {
            if (arr.length < 2) return arr
    
            let pivot = arr[arr.length-1] // use last element as pivot
        
            // determine where to position pivot point
            const left = []
            const right = []
            for (let n of arr) {
                if (n < pivot) left.push(n)
                else if (n > pivot) right.push(n)
            } return [].concat(quickSort(left), [pivot], quickSort(right))
        }

        function formBinaryTree(arr) {
            function recursiveTree(arr, root) {
                if (arr.length < 1) return null
                
                const midIdx = Math.floor(arr.length/2)
                const node = new Node(arr[midIdx])

                if (arr[midIdx] < root.data) {
                    root.left = node
                } else if (arr[midIdx] > root.data) {
                    root.right = node
                }

                recursiveTree(arr.slice(0, midIdx), node)
                recursiveTree(arr.slice(midIdx + 1), node)
            }

            const midIdx = Math.floor(arr.length/2)
            const rootNode = new Node(arr[midIdx]) // create root node from middle array value

            recursiveTree(arr.slice(0, midIdx), rootNode)
            recursiveTree(arr.slice(midIdx + 1), rootNode)

            return rootNode
        }
        
        const properArray = quickSort(removeDuplicates(array))
        console.log(`Sorted array: ${properArray}`)
        const builtTree = formBinaryTree(properArray)
        return builtTree
    }


}


function prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) {
       return
    }
    if (node.right) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false)
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`)

    if (node.left) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true)
    }
  }



// TEST CASES

const testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345]
const myTree = new Tree(testArr)
prettyPrint(myTree.root)

const withNegArr = [100, 7, 0, 4, -23, 8, 19, -7, 9, 67, 982, 2, -3]
const withNegTree = new Tree(withNegArr)
prettyPrint(withNegTree.root)