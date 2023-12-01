function speak2({ text, speechRate, lang, volume, pitch }, endEvent, startEvent) {
    if (!window.SpeechSynthesisUtterance) {
        console.warn('当前浏览器不支持文字转语音服务')
        return;
    }
  
    if (!text) {
        return;
    }
  
    const speechUtterance = new SpeechSynthesisUtterance();
    speechUtterance.text = text;
    speechUtterance.rate = speechRate || 1;
    speechUtterance.lang = lang || 'zh-CN';
    speechUtterance.volume = volume || 1;
    speechUtterance.pitch = pitch || 1;
    speechUtterance.onend = function() {
        endEvent && endEvent();
    };
    speechUtterance.onstart = function() {
        startEvent && startEvent();
    };
    speechSynthesis.speak(speechUtterance);
    
    return speechUtterance;
}




function chatWithGPT(callback, accessToken, text) {
    const url = "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/eb-instant?access_token=" + accessToken
    const messages = JSON.stringify({
        "messages": [{
            "role": "user", 
            "content": "请用一句话介绍" + text
        }]
    })

    const xhr = new XMLHttpRequest()
    xhr.open("POST", url, true)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(messages)

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                var response = JSON.parse(xhr.responseText).result
                console.log(response)
                callback({text: response})
            } else {
                console.error("xhr.status: " + xhr.status)
            }
        }
    }
}

function getAccessToken(callback, callback2 ,text) {
    const API_KEY = "QNCWARVK02rNekZ8UmxwX1q4"
    const SECRET_KEY = "6n0T0sFGbisrTYAvRR3CQrDcChGx2TAY"
    const url = 'https://aip.baidubce.com/oauth/2.0/token?client_id=' + API_KEY + '&client_secret=' + SECRET_KEY + '&grant_type=client_credentials'

    const xhr = new XMLHttpRequest()
    xhr.open("GET", url, true)
    xhr.send()

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                var accessToken = JSON.parse(xhr.responseText).access_token
                console.log("Acquired access_token: " + accessToken)
                callback(callback2, accessToken, text)
            } else {
                console.error("xhr.status: " + xhr.status)
            }
        }
    }
}


function speak({ text }) {
    speak2({text: text})
    setTimeout(function(){speak2({text: text})}, 2000)
    setTimeout(function(){speak2({text: text})}, 4000)
    if(text != "害怕" && text != "生气" && text != "无聊" && text != "开心" && text != "饿了" && text != "伤心" && text != "生病了" && text != "渴了" && text != "累了" )
        setTimeout(function(){getAccessToken(chatWithGPT, speak2 , text)}, 6000)
}


