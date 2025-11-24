const canvas = document.querySelector(".canvas");
const reset = document.querySelector("#resetBtn");
const colors = document.querySelectorAll(".color");


colors.forEach(el => {
    el.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData("drag_me", event.target.id)
        console.log(event.target.id)
        el.style.opacity = 0.5
    })
    el.addEventListener('dragend', (e) => {
        el.style.opacity = 1
    })
})

canvas.addEventListener("dragover", (event) => {
    event.preventDefault();
})

canvas.addEventListener("drop", (event) => {
    event.preventDefault();
    const drag_me = event.dataTransfer.getData("drag_me")
    console.log(`drag me: ${drag_me}`)
    canvas.style.backgroundColor = drag_me
})

reset.addEventListener('click', () => {
    canvas.style.backgroundColor = "white"
})