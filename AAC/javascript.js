// function speakOne({ text, speechRate, lang, volume, pitch }, endEvent, startEvent) {
//   if (!window.SpeechSynthesisUtterance) {
//       console.warn('当前浏览器不支持文字转语音服务')
//       return;
//   }

//   if (!text) {
//       return;
//   }

//   const speechUtterance = new SpeechSynthesisUtterance();
//   speechUtterance.text = text;
//   speechUtterance.rate = speechRate || 1;
//   speechUtterance.lang = lang || 'zh-CN';
//   speechUtterance.volume = volume || 1;
//   speechUtterance.pitch = pitch || 1;
//   speechUtterance.onend = function() {
//       endEvent && endEvent();
//   };
//   speechUtterance.onstart = function() {
//       startEvent && startEvent();
//   };
//   speechSynthesis.speak(speechUtterance);
  
//   return speechUtterance;
// }

var responseHUA


function chatgpt(text) {
  const apiKey = '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'
  const url = 'https://api.openai.com/v1/completions'
  var requestData = {
    "model": "text-davinci-003",
    'prompt': '请用简短的话介绍一下' + text + '这个物品',
    'max_tokens': 500,
  }

  var xhr = new XMLHttpRequest();   // 创建一个新的XMLHttpRequest对象
  xhr.open("POST", url, true);   // 设置请求方法和请求地址

  xhr.setRequestHeader("Content-Type", "application/json");   // 设置请求头
  xhr.setRequestHeader("Authorization", `Bearer ${apiKey}`);

  xhr.onreadystatechange = function () {   // 定义请求完成时的回调函数
    if (xhr.readyState == 4) {   					 // 确保请求已完成
      if (xhr.status == 200) {  					 // 检查请求是否成功
        var responseData = JSON.parse(xhr.responseText);   // 处理返回的数据
        responseHUA = responseData.choices[0].text
        console.log(responseHUA)
      } else {
        console.error("请求失败，状态码：" + xhr.status);     // 请求失败时的处理
      }
    }
  };

  var jsonData = JSON.stringify(requestData);   // 将数据转换为JSON字符串
  xhr.send(jsonData);   // 发送请求
}





function speak({ text, speechRate, lang, volume, pitch }, endEvent, startEvent) {
  if(text != "害怕" && text != "生气" && text != "无聊" && text != "开心" && text != "饿了" && text != "伤心" && text != "生病了" && text != "渴了" && text != "累了" )
    chatgpt(text)
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
  setTimeout(function() {speechSynthesis.speak(speechUtterance);}, 2000)
  setTimeout(function() {speechSynthesis.speak(speechUtterance);}, 4000)


  if(text != "害怕" && text != "生气" && text != "无聊" && text != "开心" && text != "饿了" && text != "伤心" && text != "生病了" && text != "渴了" && text != "累了" )
    setTimeout(function() {
      speechUtterance.text = responseHUA;
      speechSynthesis.speak(speechUtterance)
    }, 8000)

  return speechUtterance;
}


