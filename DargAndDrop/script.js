const canvas = document.querySelector(".canvas");
const reset = document.querySelector("#resetBtn");
const colors = document.querySelectorAll(".color");


colors.forEach(el=>{
    el.addEventListener('dragstart', (event)=>{
        event.dataTransfer.setData("drag_me",event.target.id)
        console.log(event.target.id)
        item.style.opacity=0.5
    })


} )

reset.addEventListener('click',()={
    
})