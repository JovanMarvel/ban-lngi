let t = 0;
let baseFontSize = 7;

let fontSize = baseFontSize;

function baseFunction(n, a = 0){
  return Math.floor(10**10**n**1.229 + a).toLocaleString().replace(/,/g, " ");
}

function preciseBaseFunction(n, a = 0){
  return 10**10**n**1.229 + a;
}

function findFontSize(){
  return document.getElementById("numberContainer").clientWidth / document.getElementById("num").clientWidth * fontSize;
}

function ban1(n){
  if (n < 1) return baseFunction(n);
  else {
    let i = 10 ** (n % 1) ** 1.229;
    return (n < 2 ? "10<sup>" : "{10, ").repeat(Math.floor(i)) + ban1((i % 1) * (n % 1 == 0 ? n - 1 : Math.floor(n))) + (n < 2 ? "</sup>" : ", " + Math.floor(n) + "}").repeat(Math.floor(i));
  }
}

function ban2(n){
  if (n < 1) return ban1(10 ** n ** 1.229);
  else {
    let i = 10 ** (n % 1) ** 1.229;
    return (n < 2 ? "{10, 10, " : "{10, ").repeat(Math.floor(i)) + ban2((i % 1) * (n % 1 == 0 ? n - 1 : Math.floor(n))) + (n < 2 ? "}" : ", " + Math.floor(n - 1) + ", 2}").repeat(Math.floor(i));
  }
}

function getNum(){
  if(t < 3000){
    return baseFunction(t/3000, -10);
  } else {
    return ban2(t/3000-1);
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
