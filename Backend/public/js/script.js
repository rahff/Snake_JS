const button = document.querySelector("#button")
const container = document.querySelector("#container")

button.addEventListener("click", () => {
    fetch("/login").then(response => response.text()).then(html =>{
        container.innerHTML = html
    })
})