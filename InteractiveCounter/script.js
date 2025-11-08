const increaseBtn = document.querySelector("#increase")
const decreaseBtn = document.querySelector("#decrease")
const resetBtn = document.querySelector("#reset")

const counter = document.querySelector("#counter")

function startCount() {
    let count = 0

    return {
        increment() {
            count++
            return count
        },
        decrement() {
            count--
            return count
        },
        reset() {
            count = 0
            return count
        }
    }
}

const countHandler = startCount()
let value = 0
increaseBtn.addEventListener('click', ()=>{
    value = countHandler.increment()
    counter.textContent = value
    counter.style.color = "green"
})


decreaseBtn.addEventListener('click',()=>{
    value = countHandler.decrement()
    counter.textContent = value
    counter.style.color = "red"
})

resetBtn.addEventListener('click',()=>{
    value = countHandler.reset()
    counter.textContent = value
    counter.style.color = "blue"
})
