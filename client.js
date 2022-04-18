let mainDivEl = createElement('div', 'cat-main', '');
let catDivEl = createElement('div', 'cat', 'cat-div');
let imgEl = createElement('img', '', 'cat-paw');
let catPawEl = createElement('div', 'cat-paw', 'cat-paw');


let ulEl = document.getElementsByTagName('UL')[0];
let testSwipeEl = document.getElementById('test-swipe');

catPawEl.append(imgEl);
catDivEl.append(catPawEl);
mainDivEl.append(catDivEl);
// append cat-paw to maindiv? or body?
document.body.append(mainDivEl, catPawEl);

function catSwipe(element, delay) {
  element.parentElement.style.overflow = 'hidden';
  setTimeout(function() {
    element.style.display = 'none';
    element.parentElement.style.overflow = 'auto';
  }, delay);
  element.classList.add('slide');
}

// random interval between 30seconds and 2 minutes
function getSeconds() {
  return Math.floor( (Math.random() * 90) + 30) * 1000;
}
// Cat Swipe
setInterval(function() {
  console.log('interval function initiated')
  let onScreenEls = document.getElementsByClassName('on-screen');
  let randomIdx = Math.floor(Math.random() * onScreenEls.length);
  let el = onScreenEls[randomIdx];
  if (el !== undefined && el.classList.contains('on-screen')) catSwipe(el, 2000);
}, 7000);

function createElement(type, className, id) {
  let el = document.createElement(type);
  if (id) el.id = id || '';
  if (className) el.classList.add(className);
  return el;
}

let observer2 = new IntersectionObserver(function(entries) {

  entries.forEach(function(entry) {
    // console.log(entry.target)
    entry.target.classList.toggle('on-screen', entry.isIntersecting)
    if (entry.target.threshold < 1) entry.target.classList.remove('on-screen')

  })

}, {
  threshold: 1
  // rootMargin: '-10px'
});

let ulChildren = Array.from(ulEl.children)
ulChildren.forEach(function(child) {
  observer2.observe(child)
});