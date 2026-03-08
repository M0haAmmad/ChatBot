const feed = document.getElementById('feed');
const input = document.getElementById('postInput');

// Initial Posts
const initialPosts = [
    { name: "DevCommander", handle: "@cmd_dev", content: "Just deployed the new Nebula Dashboard navigation. Smooth as silk! #webdev #space", time: "2m ago", likes: 12 },
    { name: "CodePilot", handle: "@cpilot", content: "Does anyone else dream in CSS grids? Just me? Okay. 🌌", time: "15m ago", likes: 45 },
    { name: "CyberNinja", handle: "@shadow_coder", content: "Finally hunted down that memory leak. Nothing a well-placed garbage collection strategy can't fix! 🥷💻", time: "22m ago", likes: 104 },
    { name: "AstroBot", handle: "@bot_v1", content: "System optimization complete. Efficiency increased by 0.004%.", time: "1h ago", likes: 890 },
    { name: "PixelPusher", handle: "@ui_guru", content: "Dark mode isn't just a theme, it's a lifestyle choice. Prove me wrong.", time: "2h ago", likes: 320 },
    { name: "LunaSky", handle: "@luna_codes", content: "Looking for a pair programming partner for a hackathon this weekend! DM me!", time: "3h ago", likes: 5 },
    { name: "DataArchitect", handle: "@sql_master", content: "Wrote a SQL query today that spans 4 screens. I am both terrified and proud.", time: "5h ago", likes: 72 },
    { name: "FrontendFairy", handle: "@flex_boxer", content: "Just aligned a div perfectly on the first try. Buying a lottery ticket right now! 🍀", time: "7h ago", likes: 1560 }
];

function renderPost(post, prepend = false) {
    const el = document.createElement('div');
    el.className = 'post-card';
    el.innerHTML = `
        <div class="post-header">
            <div class="avatar"><i class="fas fa-user-astronaut"></i></div>
            <div class="user-info">
                <h4>${post.name}</h4>
                <span>${post.handle} • ${post.time}</span>
            </div>
        </div>
        <div class="post-content">${post.content}</div>
        <div class="post-actions">
            <div class="action" onclick="toggleLike(this)"><i class="far fa-heart"></i> ${post.likes}</div>
            <div class="action"><i class="far fa-comment"></i> Comment</div>
            <div class="action"><i class="fas fa-share"></i> Share</div>
        </div>
    `;
    if (prepend) {
        feed.prepend(el);
    } else {
        feed.appendChild(el);
    }
}

// Render Initial
initialPosts.forEach(p => renderPost(p));

function createPost() {
    const content = input.value;
    if (!content.trim()) return;

    const newPost = {
        name: "Guest User",
        handle: "@visitor",
        content: content,
        time: "Just now",
        likes: 0
    };

    renderPost(newPost, true);
    input.value = '';
}

function toggleLike(btn) {
    btn.classList.toggle('liked');
    let icon = btn.querySelector('i');
    let countTxt = btn.innerText;
    let count = parseInt(countTxt);

    if (btn.classList.contains('liked')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        btn.innerHTML = `<i class="fas fa-heart"></i> ${count + 1}`;
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        btn.innerHTML = `<i class="far fa-heart"></i> ${count - 1}`;
    }
}

// Simulate incoming posts
setInterval(() => {
    if (Math.random() > 0.7) {
        const randomContent = [
            "Just saw a shooting star! Make a wish!",
            "React 19 is looking promising.",
            "Coffee supply low. Send reinforcements.",
            "Why is vertically centering a div still hard in zero gravity?",
            "Just refactored 500 lines of code into 50. Feels good man.",
            "Anyone else excited for the new ECMAScript features?",
            "My code compiles on the first try... I must have done something wrong.",
            "Tabs or spaces? The eternal space battle continues...",
            "Deploying to production on a Friday. Wish me luck!",
            "Just found out my 10-line loop could be a 1-line Array.map(). I love JavaScript.",
            "Is it just me or does the new GitHub UI look super slick compared to before?",
            "Imposter syndrome hitting hard today, but we keep pushing code! 💪",
            "I'm convinced that 90% of programming is just knowing what to Google."
        ];
        const p = {
            name: "SpaceCadet_" + Math.floor(Math.random() * 100),
            handle: "@cadet",
            content: randomContent[Math.floor(Math.random() * randomContent.length)],
            time: "Just now",
            likes: 0
        };
        renderPost(p, true);
    }
}, 8000);

// Starfield Animation
const canvas = document.getElementById('starfield');
if (canvas) {
    const ctx = canvas.getContext('2d');

    let width, height;
    let stars = [];
    const starCount = 300;
    const speed = 0.5;

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        initStars();
    }

    function initStars() {
        stars = [];
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                z: Math.random() * width,
                o: '0.' + Math.floor(Math.random() * 99) + 1
            });
        }
    }

    function move() {
        for (let i = 0; i < starCount; i++) {
            let star = stars[i];
            star.z = star.z - speed;

            if (star.z <= 0) {
                star.z = width;
                star.x = Math.random() * width;
                star.y = Math.random() * height;
            }
        }
    }

    function draw() {
        ctx.fillStyle = "#050510";
        ctx.fillRect(0, 0, width, height);

        for (let i = 0; i < starCount; i++) {
            let star = stars[i];
            let k = 128.0 / star.z;
            let px = star.x * k + width / 2;
            let py = star.y * k + height / 2;
            let size = (1 - star.z / width) + 1;
            let shade = parseInt((1 - star.z / width) * 255);

            if (px >= 0 && px <= width && py >= 0 && py <= height) {
                ctx.beginPath();
                ctx.fillStyle = `rgba(255, 255, 255, ${star.o})`;
                ctx.arc(px, py, size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

    function animate() {
        move();
        draw();
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    resize();
    animate();
}
