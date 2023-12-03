function speakOne(text) {
    console.log(text)
	if (!window.SpeechSynthesisUtterance) {
    console.warn('当前浏览器不支持文字转语音服务')
    return
  }

  if (!text) {
    return
  }

  const speechUtterance = new SpeechSynthesisUtterance();
  speechUtterance.text = text
  speechUtterance.rate = 1
  speechUtterance.lang = 'zh-CN'
  speechUtterance.volume = 1
  speechUtterance.pitch = 1
  speechSynthesis.speak(speechUtterance)
  

  

  return speechUtterance
}

async function speak(text) {
    speakOne(text)
    setTimeout(function(){speakOne(text)}, 2000)
    setTimeout(function(){speakOne(text)}, 4000)
    if(text!="害怕" && text!="生气" && text!="无聊" && text!="开心" && text!="饿了" && text!="伤心" && text!="生病了" && text!="渴了" && text!="累了" && text!="以返回" && text!="心情"){
        const response = await chatWithERNIE_Bot(text)
        setTimeout(function(){speakOne(response)}, 6000)
      }
}