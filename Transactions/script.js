const input = document.querySelector('#input')
const btn = document.querySelector('#button')
const message = document.querySelector('#message')
const res = document.querySelector('#results')


const transactions = [
    { description: "Grocery", amount: 45 },
    { description: "Electric Bill", amount: 120 },
    { description: "Online Course", amount: 200 },
    { description: "Book Purchase", amount: 90 },
    { description: "New Phone", amount: 550 },
    { description: "Dinner", amount: 130 },
    { description: "Coffee", amount: 15 }
];


btn.addEventListener('click', () => {
    let filteredTransactions = transactions.filter((el) =>
        el.amount > 100
    ).sort((a, b) => b.amount - a.amount).slice(0, 3)

    res.innerHTML = ""

    filteredTransactions.map(el => `${el.description}: ${el.amount}`)
    .forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        res.appendChild(li);
    })

})