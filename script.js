// JavaScript for surprise reveal
document.getElementById("surpriseButton").addEventListener("click", function() {
    document.getElementById("surpriseMessage").classList.add("reveal");
    startConfetti();
});

// Confetti party popper effect
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let particles = [];

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function createParticle() {
    const particle = {
        x: random(0, canvas.width),
        y: random(-20, canvas.height),
        size: random(5, 10),
        color: `hsl(${random(0, 360)}, 100%, 50%)`,
        speedY: random(1, 3),
        speedX: random(-1.5, 1.5)
    };
    particles.push(particle);
}

function updateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        particle.y += particle.speedY;
        particle.x += particle.speedX;

        if (particle.y > canvas.height) {
            particles.splice(i, 1);
            i--;
        }

        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function startConfetti() {
    setInterval(function() {
        createParticle();
        updateParticles();
    }, 30);
}

// Make the canvas fit the window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
