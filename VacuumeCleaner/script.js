//P -- CLEAN, ALL AREAS COVORED, MINIMAL NOISE, MINIMAL ROUTE, OBSTACLE AVOIDANCE
//E -- FLOORS, TYPE OF FLOORS, ROOMS SEPARETAED BY DOORS
//A -- MOTOR, WHEELS, BRUSH, MOP, LIGHT, SENSORS, CAMERA, BATERY
//S -- SENSORS, CAMERA


const leftBtn = document.getElementById('leftBtn');
const suctionBtn = document.getElementById('suctionBtn');
const rightBtn = document.getElementById('rightBtn');
const vacuumImg = document.getElementById('vacuumImg');
const locA = document.getElementById('locA');
const locB = document.getElementById('locB');
const container = document.querySelector('.container');
const locations = document.querySelector('.locations');


function appendChildMultiple(parent) {   // creates 20 "dirt" elements 
    if (parent.nodeType !== undefined) {
        for (let i = 0; i <= 20; i++) {
            const div = document.createElement("div")
            div.style.width = "25px"
            div.style.height = "25px"
            div.style.border = "1px solid brown"
            div.style.borderRadius = "50%"
            div.style.backgroundColor = "brown"
            parent.appendChild(div)
        }
    }
}
appendChildMultiple(locA) // creates div with  20 "dirt" spots in location A
appendChildMultiple(locB)  // creates div with  20 "dirt" spots in location B


class World {
    constructor(locNumber) {
        this.locNumber = locNumber
        this.floors = []
        this.location = "A"  // why do we have A as default? 

        for (let i = 0; i < 2; i++) {
            this.floors.push({ dirty: true })  // floor is dirty by default 
        }
    }

    makeDirty(currentLocNumber) {
        this.floors[currentLocNumber].dirty = true     // makes floor dirty again
    }

    simulate(action) {    // moves left and rigth and does "suction" 
        if (action == "right") {
            this.location = "B"
        }
        else if (action == "left") {
            this.location = "A"
        }
        else if (action == "suction") {
            if (this.location == "A") {
                this.floors[0].dirty = false  // makes floor clean in location A
            }
            else {
                this.floors[1].dirty = false  // makes floor clean in location B
            }
        }
    }
}


const world = new World()

function work() {
    if (world.location == "B") {
        vacuumImg.style.transform = "translateX(400px)"   // moves right
    }
    else {
        vacuumImg.style.transform = "translateX(0px)"     // moves left
    }

}

function suction() {
    console.log(world.floors[0].dirty)
    if (world.location == "A" && world.floors[0].dirty == true) {
        locA.innerHTML = ""  // makes floor  clean
    }
    else if (world.location == "B" && world.floors[1].dirty == true) {
        locB.innerHTML = ""  // makes floor  clean
    }
}

leftBtn.addEventListener("click", () => {
    world.simulate("left")  // changes location to A
    work() // moves left
})

rightBtn.addEventListener("click", () => {
    world.simulate("right") // changes location to B
    work() // moves right
})

suctionBtn.addEventListener("click", () => {
    suction() // makes floor dirty or clean depending on origianal state
    world.simulate("suction") // changes state to false or true depending on original state

})

locA.addEventListener('click', () => {
    world.floors[0].dirty = !world.floors[0].dirty
    if (world.floors[0].dirty == true) {
        appendChildMultiple(locA)
    }
    else {
        locA.innerHTML = ""
    }
})

locB.addEventListener('click', () => {
    world.floors[1].dirty = !world.floors[1].dirty
    if (world.floors[1].dirty == true) {
        appendChildMultiple(locB)
    }
    else {
        locB.innerHTML = ""
    }
})

// function automate() {

//     if (world.location == "A") {
//         suction()
//         world.simulate("suction")
//         world.simulate("right")
//         work()
//         console.log("if A")
//     }
//     else if (world.location == "B") {
//         suction()
//         world.simulate("suction")
//         world.simulate("left")
//         work()
//         console.log("if B")
//     }
//     // work()
//     if (world.floors[0].dirty == false && world.floors[1].dirty == false) 
//         { clearInterval(automation) 
//             console.log("clearInterval")
//         }
//     // if (world.floors[0].dirty == false) {
//     //     world.simulate("right")
//     //     work() 
//     //     if (world.floors[1].dirty == false) {
//     //         world.simulate("left")
//     //         work() 

//     //         clearInterval(automation)
//     //     }
//     // }

//     recheckState()
// }

// let automation = setInterval(automate, 1000)

// function recheckState(){
//     setInterval(()=>{
//         if (world.floors[0].dirty == true || world.floors[1].dirty == true){
//             setInterval(automate, 1000)
//         }
//     },1000)
// }

let interval = null

function startRobot() {
    interval = setInterval(automate, 1000)
}


function stopRobot() {
    clearInterval(interval)
    interval = null

}

function automate() {
    let allClean = world.floors[0].dirty == false && world.floors[1].dirty == false
    if (world.location == "A" && world.floors[0].dirty == true) {
        suction()
        world.simulate("suction")
        world.simulate("right")
        work()
    }
    else if (world.location == "B" && world.floors[1].dirty == true) {
        suction()
        world.simulate("suction")
        world.simulate("left")
        work()
    }
    if(allClean == true){
        stopRobot()
    }
}

startRobot()


setInterval(()=>{
   let floorA = world.floors[0].dirty 
   let floorB = world.floors[1].dirty 
   if (floorA == true || floorB == true){
    startRobot()
   }
},1000)


