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

        const tree = this.createRootandSubTrees(properArray)

        return tree
    }

    createRootandSubTrees(properArray) {
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
                const childrenArray = this.inorder(node.left).concat(this.inorder(node.right))
                console.log(Math.floor(childrenArray.length/2))
                console.log(childrenArray)
                this.createSubTrees(childrenArray, prev)
            }
        }

        else if (node) { // searching the tree
            if (value < node.data) {
                // console.log(value, ' is less than', node.data)
                this.delete(value, node.left, node, 'left')
            } else if (value > node.data) {
                // console.log(value, ' is greater than', node.data)
                this.delete(value, node.right, node, 'right')
            }
        }
    }

    find(value, node = this.root) {
        if (node && node.data === value) return node

        if (value < node.data) return this.find(value, node.left)
        else if (value > node.data) return this.find(value, node.right)
    }

    levelOrder(node = this.root , queue = [this.root], result = []) {
        // traverse the tree in breadth-first level order
        if (queue.length > 0) {
            if (node.left) queue.push(node.left)
            if (node.right) queue.push(node.right)
            result.push(queue.shift().data) // value from first in queue
            return this.levelOrder(queue[0], [...queue], [...result])
        } else if (queue.length === 0) {
            return result
        }
    }

    inorder(root = this.root, result = []) {
        if (root === null) return null
        
        this.inorder(root.left, result)
        result.push(root.data)
        this.inorder(root.right, result)

        return result
    }

    preorder(root = this.root, result = []) {
        if (root === null) return null

        result.push(root.data)
        this.preorder(root.left, result)
        this.preorder(root.right, result)

        return result
    }

    postorder(root = this.root, result = []) {
        if (root === null) return null
        
        this.postorder(root.left, result)
        this.postorder(root.right, result)
        result.push(root.data)
        
        return result
    }

    height(node) {
        //using BFS method
        if (node === null) return 0
        let height = 0;
        let queue = [node]

        while (queue.length > 0) {
            for (let i = 0; i < queue.length; i++) {
                let nextNode = queue.shift()
                if (nextNode.left) queue.push(nextNode.left)
                if (nextNode.right) queue.push(nextNode.right)
            } height ++ 
        } return height
    }

    depth(targetNode, root = this.root, depthCount = 0) {
        if (targetNode.data === root.data) return depthCount
        
        depthCount++
        if (targetNode.data < root.data) return this.depth(targetNode, root.left, depthCount)
        else if (targetNode.data > root.data) return this.depth(targetNode, root.right, depthCount)
    }

    isBalanced(node = this.root) {
        // difference of heights between left & right subtree of every node is not more than 1
        let left = this.height(node.left)
        let right = this.height(node.right)
        let difference = Math.abs(left-right)

        if (difference > 1) return false
        
        if (node.left) this.isBalanced(node.left)
        if (node.right) this.isBalanced(node.right)
        
        return true
    }

    rebalance() {
        let orderedArray = this.inorder()
        this.root = this.createRootandSubTrees(orderedArray)
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


function runBinarySearchTreeTests(tree, array) {
    
    function randomInsert(minValue, maxValue) {
        const num = getRandomNum(minValue, maxValue)
        console.log(`>>> Inserting ${num}.`)
        tree.insert(num)
        array.push(num)
    }

    function randomDelete() {
        let rootValue = tree.root.value
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

    function runTraversals() {
        console.log('Level Order: ', tree.levelOrder())
        
        console.log('Inorder: ', tree.inorder())
        
        console.log('Preorder: ', tree.preorder())
        
        console.log('Postorder: ', tree.postorder())
    }

    function randomFind() {
        const idx = getRandomNum(0, array.length-1)
        const randomValueFromArr = array[idx]
        console.log('Finding ', randomValueFromArr, '-> ', tree.find(randomValueFromArr))
        return tree.find(randomValueFromArr)
    }

    function randomNodeHeight() {
        const randomNode = randomFind(tree, array)
        console.log('Height of: ', randomNode.data, ' is ', tree.height(randomNode))
    }

    function randomNodeDepth() {
        const randomNode = randomFind(tree, array)
        console.log('Depth of: ', randomNode.data, ' from root is ', tree.depth(randomNode))
    }

    function checkBalance() {
        console.log('Balanced? ',tree.isBalanced())
    }

    function createUnbalancedTree() {
        for (let i = 0; i < 3 ; i ++) {
            randomInsert(1000, 5000)
        }
        prettyPrint(tree.root)
    }

    function rebalanceTree() {
        tree.rebalance()
        prettyPrint(tree.root)
        checkBalance(tree)
    }

    randomInsert(-100, 100)
    randomDelete(tree, myArray, tree.root.data)
    randomFind()
    runTraversals()
    randomNodeHeight()
    randomNodeDepth()
    checkBalance()
    createUnbalancedTree()
    checkBalance()
    rebalanceTree()
    runTraversals()
}

// RUN TESTS
const myArray = getRandomArray()
const tree = new Tree(myArray)
prettyPrint(tree.root)
runBinarySearchTreeTests(tree, myArray)

  
// Improvements:
// if input array is already sorted, dont do quicksort
// improve method of removing duplicates
