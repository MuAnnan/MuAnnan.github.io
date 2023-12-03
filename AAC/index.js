async function getJSON(file) {
    const response = await fetch(file)
    const responseText = await response.text()
    const responseJSON = JSON.parse(responseText)
    console.log(responseJSON)
    return responseJSON
}

async function main() {
    const JSONData = await getJSON("FreedomCoding.json")
    const windowWdith = window.innerWidth
    const cardHeight = windowWdith * 0.25 - 4
    console.log("cardHeight: " + cardHeight)

    const activeCard = JSONData.常用卡片
    const elem = document.getElementById("row1")
    var text = `
        <div class="card" style="height: ${cardHeight}px; background-color: beige">
            <div class="title">常用卡片</div>
        </div>
    `
    for(card in activeCard){
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

    const classifiedCard = JSONData.卡片分类
    const elem2 = document.getElementById("row2")
    var text = `
        <div class="card" style="height: ${cardHeight}px; background-color: #E3ECEC">
            <div class="title" style="color: #4A5298">卡片分类</div>
        </div>
    `
    for(card in classifiedCard){
        text += `
            <a href="${classifiedCard[card][1]}" class="card" style="height: ${cardHeight}px" onclick="speak('${card}')">
                <div class="explain">${card}</div>
                <div class="mask">
                    <img src="${classifiedCard[card][0]}"/>
                </div>
            </a>
        `
    }
    elem2.innerHTML = text
}

window.onload = function() {
    main()
}