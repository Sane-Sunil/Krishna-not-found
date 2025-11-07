// 404-init.js
function attachDisintegration(particleCount = 300) {
    const container = document.querySelector('._404-div');
    if (!container) return;

    container.querySelectorAll('#text-div span').forEach(span => {
        span.addEventListener('mouseenter', () => {
            setTimeout(() => disintegrate(span, particleCount), 500); // short delay
        });
    });

    // Floating animation for image
    const img = container.querySelector('#krish-black');
    if (img) img.style.animation = 'floatUpDown 6s ease-in-out infinite';
}

function disintegrate(span, particleCount) {
    const container = document.querySelector('._404-div');
    const rect = span.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const canvas = document.createElement('canvas');
    canvas.width = rect.width;
    canvas.height = rect.height;
    const ctx = canvas.getContext('2d');

    const style = getComputedStyle(span);
    ctx.font = style.font;
    ctx.fillStyle = style.color;
    ctx.fillText(span.textContent, 0, rect.height * 0.8);

    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const indices = [];

    for (let y = 0; y < canvas.height; y += 2) {
        for (let x = 0; x < canvas.width; x += 2) {
            const i = (y * canvas.width + x) * 4;
            if (pixels[i+3] > 128) indices.push({x, y, color: `rgb(${pixels[i]},${pixels[i+1]},${pixels[i+2]})`});
        }
    }

    for (let i = 0; i < particleCount && indices.length; i++) {
        const idx = Math.floor(Math.random() * indices.length);
        const p = indices.splice(idx, 1)[0];

        const dust = document.createElement('span');
        dust.className = 'dust';
        dust.style.left = rect.left - containerRect.left + p.x + 'px';
        dust.style.top = rect.top - containerRect.top + p.y + 'px';
        dust.style.backgroundColor = p.color;

        // Random movement (mostly right and up)
        const dxoptions = [500];
        const dx = dxoptions[Math.floor(Math.random() * dxoptions.length)] + Math.random() * 50;
        const dyoptions = [-500];
        const dy = dyoptions[Math.floor(Math.random() * dyoptions.length)] + Math.random() * 50;
        const rot = Math.random() * 720 - 360 + 'deg';

        dust.style.setProperty('--x', dx + 'px');
        dust.style.setProperty('--y', dy + 'px');
        dust.style.setProperty('--r', rot);
        dust.style.animation = `disintegrate ${5 + Math.random()}s ease-in forwards`;

        container.appendChild(dust);
        dust.addEventListener('animationend', () => dust.remove());
        setTimeout(() => {
            // body.dust.style.animation = `disintegrate ${5 + Math.random()}s ease-in forwards`;

            // container.appendChild(dust);
            document.body.style.transition = `opacity 3s ease`;
            document.body.style.opacity = '0';
        }, 10000);
    }

    span.style.visibility = 'hidden';
     // after disintegration finishes

}

// expose globally
window.attachDisintegration = attachDisintegration;
