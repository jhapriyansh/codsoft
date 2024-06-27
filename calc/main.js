"use strict";
const input = document.querySelector(".inp");
const result = document.querySelector(".res");
const del = document.querySelector(".del");
const btn = document.querySelectorAll(".bottom span");
let expr = "";
let answer;
let decimalAdded = false;
const operator = ["+", "-", "x", "÷"];
function handleKeyPress(e) {
  const key = e.target.dataset.key;
  const lastChar = expr[expr.length - 1];
  if (key === "=") {
    return;
  }
  if (key === "." && decimalAdded) {
    return;
  }
  if (operator.indexOf(key) !== -1) {
    decimalAdded = false;
  }
  if (expr.length === 0 && key === "-") {
    expr += key;
    input.innerHTML = expr;
    return;
  }
  if (expr.length === 0 && operator.indexOf(key) !== -1) {
    input.innerHTML = expr;
    return;
  }
  if (operator.indexOf(lastChar) !== -1 && operator.indexOf(key) !== -1) {
    expr = expr.replace(/.$/, key);
    input.innerHTML = expr;
    return;
  }
  if (key) {
    if (key === ".") decimalAdded = true;
    expr += key;
    input.innerHTML = expr;
    return;
  }
}
function evaluate(e) {
  const key = e.target.dataset.key;
  const lastChar = expr[expr.length - 1];
  if (key === "=" && operator.indexOf(lastChar) !== -1) {
    expr = expr.slice(0, -1);
  }
  if (expr.length === 0) {
    answer = "";
    result.innerHTML = answer;
    return;
  }
  try {
    if (expr[0] === "0" && expr[1] !== "." && expr.length > 1) {
      expr = expr.slice(1);
    }
    const final = expr.replace(/x/g, "*").replace(/÷/g, "/");
    answer = +eval(final).toFixed(4);
    if (key === "=") {
      decimalAdded = false;
      expr = `${answer}`;
      answer = "";
      input.innerHTML = expr;
      result.innerHTML = answer;
      return;
    }
    result.innerHTML = answer;
  } catch (e) {
    if (key === "=") {
      decimalAdded = false;
      result.innerHTML = `<span class="error">Invalid Maths exprssion</span>`;
      input.innerHTML = `<span class="error">${expr}</span>`;
    }
    console.log(e);
  }
}
function clearInput(e) {
  if (e.ctrlKey) {
    expr = "";
    answer = "";
    input.innerHTML = expr;
    result.innerHTML = answer;
    return;
  }
  expr = expr.slice(0, -1);
  input.innerHTML = expr;
}
del.addEventListener("click", clearInput);
btn.forEach((key) => {
  key.addEventListener("click", handleKeyPress);
  key.addEventListener("click", evaluate);
});