const scoreText = document.querySelector("#score");
const resetBtn = document.querySelector("#resetBtn");
const itemsContainer = document.querySelector("#items");
const zones = document.querySelectorAll(".zone");

function startCount() {
    let count = 0
    return {
        increment() {
            count++
        },
        reset() {
            count = 0
        },
        getCount() {
            return count
        }
    }
}

const countHandler = startCount()
function updateScore() {
    scoreText.textContent = countHandler.getCount()
}

updateScore()

const itemObj = {
    Car: "object",
    Dog: "animal",
    Apple: "fruit"
}

const zoneObj = {
    object: "object-zone",
    animal: "animal-zone",
    fruit: "fruit-zone"
}

for (let name in itemObj) {
    const div = document.createElement("div");
    div.className = "item";
    div.setAttribute("id", name);
    div.textContent = name;
    div.draggable = true;
    itemsContainer.appendChild(div);

    div.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("drag_me", event.target.id)

    })

}


zones.forEach((item) => {
    item.addEventListener("dragover", (event) => {
        event.preventDefault();
    })

    item.addEventListener("dragenter", () => {
        item.style.backgroundColor = "lightgreen";
        item.style.borderColor = "black"
    })

    item.addEventListener("dragleave", () => {
        item.style.backgroundColor = ""
        item.style.borderColor = ""
    })

    item.addEventListener("drop", (event) => {
        event.preventDefault();
        const drag_me = event.dataTransfer.getData("drag_me")
        console.log(`drag me: ${drag_me}`)

        let itemCategory = itemObj[drag_me]
        let zone = zoneObj[itemCategory]
        if (item.id == zone) {
            const draggableItem = document.querySelector(`#${drag_me}`)
            item.appendChild(draggableItem)
            countHandler.increment()
            updateScore()
        }
        else {
            item.style.backgroundColor = ""
            item.style.borderColor = ""
        }
    })
})

resetBtn.addEventListener("click", () => {
    const items = document.querySelectorAll(".item")
    items.forEach((item) => {
        itemsContainer.appendChild(item)
    })
    zones.forEach((zone) => {
        zone.style.backgroundColor = ""
        zone.style.borderColor = ""
    })
    countHandler.reset()
    updateScore()

})



console.log(itemObj["Car"]) // object
console.log(zoneObj[itemObj["Car"]]) // object-zone