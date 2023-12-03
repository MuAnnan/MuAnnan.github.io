async function getJSON(file) {
    const response = await fetch(file)
    const responseText = await response.text()
    const responseJSON = JSON.parse(responseText)
    console.log(responseJSON)
    return responseJSON
}

async function submain() {
    const JSONData = await getJSON("FreedomCoding.json")
    const windowWdith = window.innerWidth
    const cardHeight = windowWdith * 0.25 - 4
    console.log(cardHeight)

    const activeCard = JSONData[pageName]
    const elem = document.getElementById("subrow")
    var text = `
        <a href="index.html" class="card" style="height: ${cardHeight}px;" onclick="speak('已返回')">
            <div class="title">⬅</div>
        </a>
    `
    for(card in activeCard){
        console.log(card + activeCard[card])
        text += `
            <div class="card" style="height: ${cardHeight}px" onclick="speak('${card}')">
                <div class="explain">${card}</div>
                <div class="mask">
                    <img src="${activeCard[card]}"/>
                </div>
            </div>
        `
    }
    elem.innerHTML = text
}

window.onload = function() {
    submain()
}