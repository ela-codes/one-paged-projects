function fibL(n) {
    let arr = [0];
    for (let i = 1 ; i < n ; i ++) {
        if (i == 1 || i == 2) {
            arr.push(1)
        } else {
            arr.push(arr[arr.length - 1] + arr[arr.length - 2])
        }
    } return arr
}


console.log(fibL(8))



function fibR(n, a = [0, 1]) {
    if (a.length >= n) return a;
  return fibR(n, a.concat([a[a.length - 2] + a[a.length - 1]]))
}

console.log(fibR(8))