/* --------------------- থিম টগলিং --------------------- */
const toggleThemeBtn = document.getElementById('toggleThemeBtn');
let themeMode = 'light'; // সম্ভাব্য মান: 'light', 'dark', 'system'

function applyTheme(mode) {
  if(mode === 'system') {
    // সিস্টেম প্রেফারেন্স অনুযায়ী
    if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
    }
  } else {
    document.body.classList.remove('light-mode', 'dark-mode');
    document.body.classList.add(mode + '-mode');
  }
}

toggleThemeBtn.addEventListener('click', () => {
  if(themeMode === 'light') {
    themeMode = 'dark';
  } else if(themeMode === 'dark') {
    themeMode = 'system';
  } else {
    themeMode = 'light';
  }
  toggleThemeBtn.textContent = 'থিম: ' + (themeMode === 'system' ? 'সিস্টেম' : themeMode.charAt(0).toUpperCase() + themeMode.slice(1));
  applyTheme(themeMode);
});

toggleThemeBtn.textContent = 'থিম: Light';

// MESSAGE REPEAT
const generateBtn = document.getElementById('generateBtn');
const messageInput = document.getElementById('messageInput');
const repeatCountInput = document.getElementById('repeatCount');
const outputBox = document.getElementById('outputBox');

generateBtn.addEventListener('click', () => {
  const message = messageInput.value;
  const count = parseInt(repeatCountInput.value);
  outputBox.textContent = ''; 
  if(!message || isNaN(count) || count < 1) {
    outputBox.textContent = 'দয়া করে বৈধ ইনপুট দিন।';
    return;
  }
  
//   LOOP USE
  for(let i = 0; i < count; i++) {
    outputBox.textContent += message + '\n';
  }
});

//    COPPY FUNCTIONALLATY
const copyBtn = document.getElementById('copyBtn');
copyBtn.addEventListener('click', () => {
  const text = outputBox.textContent;
  navigator.clipboard.writeText(text).then(() => {
    alert('Coppied');
  }).catch(() => {
    alert('Not Coppy!');
  });
});

// WEB SHARE API
const shareBtn = document.getElementById('shareBtn');
shareBtn.addEventListener('click', () => {
  const text = outputBox.textContent;
  if (navigator.share) {
    navigator.share({
      title: 'Share Message',
      text: text
    }).catch((err) => {
      console.error('Share Problem', err);
    });
  } else {
    alert('Your Device Not Supported Share');
  }
});

// INTARACTIVE BACKGROUND
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
const particleCount = 100;
const maxVelocity = 0.5;
const particleSize = 2;
let canvasWidth, canvasHeight;

function resizeCanvas() {
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.vx = (Math.random() - 0.5) * maxVelocity;
    this.vy = (Math.random() - 0.5) * maxVelocity;
    this.size = particleSize;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if(this.x < 0) this.x = canvasWidth;
    if(this.x > canvasWidth) this.x = 0;
    if(this.y < 0) this.y = canvasHeight;
    if(this.y > canvasHeight) this.y = 0;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(100, 100, 255, 0.7)';
    ctx.fill();
  }
}

// PARTICLE BACKGROUND
for(let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}


let mouseX = null, mouseY = null;
canvas.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});
canvas.addEventListener('mouseleave', () => {
  mouseX = null;
  mouseY = null;
});

function animate() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  particles.forEach(p => {
    if(mouseX !== null && mouseY !== null) {
      let dx = p.x - mouseX;
      let dy = p.y - mouseY;
      let dist = Math.sqrt(dx * dx + dy * dy);
      if(dist < 100) {
        let angle = Math.atan2(dy, dx);
        p.vx = Math.cos(angle) * maxVelocity;
        p.vy = Math.sin(angle) * maxVelocity;
      }
    }
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}
animate();