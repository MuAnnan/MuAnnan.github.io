async function getAccessToken() {
    const API_KEY = "QNCWARVK02rNekZ8UmxwX1q4"
    const SECRET_KEY = "6n0T0sFGbisrTYAvRR3CQrDcChGx2TAY"
    const url = 'https://aip.baidubce.com/oauth/2.0/token?client_id=' + API_KEY + '&client_secret=' + SECRET_KEY + '&grant_type=client_credentials'
    const response = await fetch(url)
    const responseText = await response.text()
    const access_token = JSON.parse(responseText).access_token
    console.log("Acquire access_token: " + access_token)
    return access_token
}

async function chatWithERNIE_Bot(text) {
    const url = "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/eb-instant?access_token=" + await getAccessToken()
    const messages = JSON.stringify({
        "messages": [{"role": "user", "content": "请仅用一句话介绍" + text}]
    })
    const optionObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: messages
    }
    const response = await fetch(url, optionObj)
    const responseText = await response.text()
    const responseResult = JSON.parse(responseText).result
    console.log("Result:" + responseResult)
    return responseResult
}