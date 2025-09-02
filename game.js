
const grid = document.getElementById('grid');
const targetEl = document.getElementById('target');
const scoreEl = document.getElementById('score');
let score = 0;
let target = 0;

function randomInt(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }

function makeTile(count){
  const el = document.createElement('div');
  el.className = 'banana';
  const bananas = '🍌'.repeat(count);
  el.innerHTML = `<span class="emoji">${bananas}</span><div>${count}</div>`;
  el.dataset.count = count;
  el.addEventListener('click', () => {
    if(Number(el.dataset.count) === target){
      score++; scoreEl.textContent = score;
      newRound();
    } else {
      el.style.background = '#ffe6e6';
      setTimeout(() => el.style.background = '#fff', 300);
      if(score>0){ score--; scoreEl.textContent = score; }
    }
  });
  return el;
}

function newRound(){
  grid.innerHTML='';
  const counts = new Set();
  while(counts.size < 10){
    counts.add(randomInt(1,10));
  }
  [...counts].forEach(c => grid.appendChild(makeTile(c)));
  target = randomInt(1,10);
  targetEl.textContent = target;
}
newRound();
