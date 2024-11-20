function baseFunction(n, a = 0){
  return Math.floor(10**10**n**1.229 + a).toLocaleString().replace(/,/g, " ");
}

function preciseBaseFunction(n, a = 0){
  return 10**10**n**1.229 + a;
}

function findFontSize(){
  return document.getElementById("numberContainer").clientWidth / document.getElementById("num").clientWidth * fontSize;
}

function getNum(){
  if(t < 3000){
    return baseFunction(t/3000, -10);
  } else {
    return "10<sup>".repeat(Math.floor(t/3000)) + baseFunction((t / 3000) % 1) + "</sup>".repeat(Math.floor(t/3000));
  }
}

function updateText(){
  t++;
  
  let num = getNum().toString();
  
  document.getElementById("number").innerHTML = num;
  fontSize = Math.min(baseFontSize, findFontSize());
  document.getElementById("number").style.fontSize = fontSize + "vw";
}

setInterval(updateText, 10);
