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

    buildTree(arr) {
        // input is an array (sorted or unsorted)
        // removes duplicates and sorts array, if not sorted
        // returns the root node of a balanced tree

        const noDuplicateArray = this.removeDuplicates(arr)
        const properArray = this.quickSort(noDuplicateArray)
        console.log(`Sorted array: ${properArray}`)

        const midIdx = Math.floor((properArray.length-1)/2)
        const rootNode = new Node(properArray[midIdx]) // create root node from middle array value

        this.createSubTrees(properArray.slice(0, midIdx), rootNode)
        this.createSubTrees(properArray.slice(midIdx + 1), rootNode)

        return rootNode
    }


    removeDuplicates(arr) {
        return [...new Set(arr)]
    }

    quickSort(arr) {
        if (arr.length < 2) return arr

        let pivot = arr[arr.length-1] // use last element as pivot
    
        // determine where to position pivot point
        const left = []
        const right = []
        for (let n of arr) {
            if (n < pivot) left.push(n)
            else if (n > pivot) right.push(n)
        } return [].concat(this.quickSort(left), [pivot], this.quickSort(right))
    }
    
    createSubTrees(arr, root) {
        if (arr.length < 1) return null
        
        const midIdx = Math.floor((arr.length-1)/2)
        const node = new Node(arr[midIdx])

        if (arr[midIdx] < root.data) {
            root.left = node
        } else if (arr[midIdx] > root.data) {
            root.right = node
        }

        this.createSubTrees(arr.slice(0, midIdx), node)
        this.createSubTrees(arr.slice(midIdx + 1), node)
    }


    
    insert(value, node = this.root, min = -9999, max = 9999) {
        // min and max variables represent a node which contains a node.data < than value and node.data > than value.
        if (!node) {
            if (max === 9999) {
                min.right = new Node(value)

            } else {
                min.left = new Node(value)
            }
        }

        else if (value < max.data && value > min.data) { // found the right position for new node
            const createdNode = new Node(value)
            min.right = createdNode
            createdNode.right = max
        }

        else if (value < node.data) {
            this.insert(value, node.left, min = node, max = node)
            

        } else if (value > node.data) {
            this.insert(value, node.right, min = node)
        }
    }

    delete(value, node = this.root, prev = null, direction = null) {
        if (node.data === value) { // if node is found
            if (node.left === null && node.right === null) {
                prev.left = null
                prev.right = null

            } else if (node.left === null || node.right === null) {
                let targetNode = null;

                node.left ? targetNode = node.left : targetNode = node.right;
                direction === 'left' ? prev.left = targetNode : prev.right = targetNode;

            } else { // two child nodes exist
                const childrenArray = this.getInorderArray(node.left).concat(this.getInorderArray(node.right))
                console.log(Math.floor(childrenArray.length/2))
                console.log(childrenArray)
                this.createSubTrees(childrenArray, prev)
            }
        }

        else if (node) { // searching the tree
            if (value < node.data) {
                console.log(value, ' is less than', node.data)
                this.delete(value, node.left, node, 'left')
            } else if (value > node.data) {
                console.log(value, ' is greater than', node.data)
                this.delete(value, node.right, node, 'right')
            }
        }
    }

    getInorderArray(root, resultArr = []) {
        if (root === null) return null
        
        this.getInorderArray(root.left, resultArr)
        resultArr.push(root.data)
        this.getInorderArray(root.right, resultArr)

        return resultArr
    }

    find(value, node = this.root) {
        if (node && node.data === value) return node

        if (value < node.data) return this.find(value, node.left)
        else if (value > node.data) return this.find(value, node.right)
    }

    levelOrder(node = this.root , queue = [this.root], result = []) {
        // traverse the tree in breadth-first level order
        // for each discovered node, run it through the function as an argument
        if (queue.length > 0) {
            if (node.left) queue.push(node.left)
            if (node.right) queue.push(node.right)
            result.push(queue.shift().data)
            this.levelOrder(queue[0], [...queue], [...result])
        }
        else if (queue.length === 0) {
            console.log(result)
        }
    }
}
 

function prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) return

    if (node.right) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false)
    }

    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`)

    if (node.left) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true)
    }
}



// TEST CASES

function getRandomNum(min = -100, max = 1000) {
    const num = Math.random() * (max - min) + min;
    return Math.floor(num)
}

function getRandomArray() {
        let randomArr = []
        let randomSize = getRandomNum(10, 20)

        while (randomSize > 0) {
            randomArr.push(getRandomNum(-100, 1000))
            randomSize--
        }
        return randomArr
}

function randomInsert(tree, array) {
    const num = getRandomNum()
    console.log(`>>> Inserting ${num}.`)
    tree.insert(num)
    array.push(num)
    prettyPrint(tree.root)
}

function randomDelete(tree, array, rootValue) {
    function getRandomIndex() {
        return getRandomNum(0, array.length-1)
    }

    const randomIdx = getRandomIndex()
    if (array[randomIdx] === rootValue) randomDelete(tree, array, rootValue) //avoid deleting root

    console.log(`>>> Deleting ${array[randomIdx]}.`)
    tree.delete(array[randomIdx])
    array.splice(randomIdx, 1)
    prettyPrint(tree.root)
}

const myArray = getRandomArray()
const tree = new Tree(myArray)
prettyPrint(tree.root)
randomInsert(tree, myArray)
randomDelete(tree, myArray, tree.root.data)
console.log(myArray[2], tree.find(myArray[4]))
tree.levelOrder()


// const test = [1, 345, 34, 23, 2, 6, 3, -4, 10, 8, 6]
// const testTree = new Tree(test)
// prettyPrint(testTree.root)
// testTree.levelOrder()