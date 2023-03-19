const time = 3000
const longerTime = 4000
const imgs = document.querySelectorAll('.image');
const navs = document.querySelectorAll('.symbol')
const move = [0, -20, -40, -60]
const curr = document.querySelector('.curr');
const defaultStartIdx = 0
let shuffle;
let restart;

function startShuffle(startIdx, userClicked, defaultDelay) {
    console.log(startIdx)
    let showNow = userClicked
    let delayTime = 0;

    if (showNow) {
        shuffleThru(startIdx, delayTime)
        console.log(`feeding ${startIdx} after click`)
        showNow = false;
    }

    delayTime = defaultDelay
    for (let i = startIdx; i < imgs.length; i++ ) {
        console.log(`feeding ${i} for shuffle`)
        shuffleThru(i, delayTime)
    }

}


function shuffleThru(i, delayTime) {
    
    shuffle = setTimeout(function() {
        const activeSym = document.querySelector('.sym-active')
        activeSym.classList.remove('sym-active')
        
        navs[i].classList.add('sym-active')
        curr.style['margin-left'] = `${move[i]}%`
    }, i * delayTime)

    restart = setTimeout(function() {
        const activeSym = document.querySelector('.sym-active');
        let activeIdx = Number(activeSym.classList[1].slice(-1))
        console.log(activeIdx)
        if (activeIdx === imgs.length-1) {
            console.log('restarting')
            document.querySelector('.sym0').click()
        }
    }, imgs.length * delayTime)

}

function resetTimeouts() {
    clearTimeout(shuffle)
    clearTimeout(restart)
}


// EVENT LISTENERS

navs.forEach(nav => {
    nav.addEventListener('click', (e) => {
        const targetIdx = Number(e.target.classList[1].slice(-1))
        startShuffle(targetIdx, true, time)
    })
})


const btns = document.querySelectorAll('.direction')

btns.forEach(btn => {
    btn.addEventListener('click', () => {

        const activeSym = document.querySelector('.sym-active');
        let idx = Number(activeSym.classList[1].slice(-1))
        const direction = btn.classList[1]

        if (direction === "next") {
            idx === imgs.length-1 ? idx = 0 : idx++
            
        } else if (direction === "prev") {
            idx === 0 ? idx = imgs.length-1 : idx--
        }

        startShuffle(idx, true, time)
    })
})

document.querySelector('.sym0').click() // start slideshow



// DROP-DOWN MENU
const menu = document.querySelector('.menu')
const menuBtn = document.querySelector('button.menu-icon')

menuBtn.onclick = () => {
    menu.classList.toggle('show')
}