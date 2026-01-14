// Library Data (Mock Database)
const libraryData = [
    { title: "데이터 리터러시 가이드", tags: ["데이터", "리터러시", "교육"], type: "Electric", views: 120 },
    { title: "정보 리터러시의 이해", tags: ["정보", "리터러시", "문헌정보"], type: "Psychic", views: 95 },
    { title: "데이터 시각화 교과서", tags: ["데이터", "시각화", "디자인"], type: "Electric", views: 200 },
    { title: "미디어 리터러시와 가짜뉴스", tags: ["미디어", "리터러시", "정보"], type: "Ghost", views: 150 },
    { title: "파이썬 데이터 분석", tags: ["데이터", "파이썬", "프로그래밍"], type: "Steel", views: 300 },
    { title: "도서관 정보학 개론", tags: ["도서관", "정보", "문헌정보"], type: "Normal", views: 80 },
    { title: "디지털 리터러시 교육론", tags: ["디지털", "리터러시", "교육"], type: "Psychic", views: 110 },
    { title: "빅데이터의 세계", tags: ["데이터", "빅데이터", "과학"], type: "Science", views: 250 }, // Science mapped to Electric/Steel?
    { title: "해리포터와 마법사의 돌", tags: ["소설", "판타지", "문학"], type: "Fairy", views: 500 },
    { title: "코스모스", tags: ["과학", "우주", "천문학"], type: "Psychic", views: 400 },
    { title: "총 균 쇠", tags: ["인문", "역사", "사회"], type: "Ground", views: 450 }
];

// Navigation
function showMenu(menuId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));

    // Show target
    const target = document.getElementById(menuId);
    if (target) {
        target.classList.add('active');
        // Update button state
        const btn = document.querySelector(`button[onclick="showMenu('${menuId}')"]`);
        if (btn) btn.classList.add('active');

        // Play sound effect (simulated)
        console.log("Beep!");
        updateScreenText(menuId);
    }
}

function updateScreenText(menuId) {
    const screenText = document.getElementById('right-screen-content');
    if (!screenText) return;

    let text = "";
    if (menuId === 'menu1') text = "SEARCH MODE INITIATED.\nENTER KEYWORDS TO FIND DATA.";
    else if (menuId === 'menu2') text = "CLASSIFICATION DATABASE.\nSELECT A TYPE TO VIEW BOOKS.";
    else if (menuId === 'menu3') text = "BATTLE ARENA (POPULARITY).\nTOP RATED BOOKS DISPLAYED.";
    else if (menuId === 'menu4') text = "TRAINER PROFILE LOADED.\nCHECK RENTALS AND STATUS.";

    screenText.innerText = text;
}

// Menu 1: Boolean Search
function runBooleanSearch() {
    const t1 = document.getElementById('term1').value.trim().toLowerCase();
    const t2 = document.getElementById('term2').value.trim().toLowerCase();
    const op = document.getElementById('operator').value;
    const listDiv = document.getElementById('resultArea');

    if (!listDiv) return;
    listDiv.innerHTML = ""; // Clear

    if (!t1 && !t2) {
        listDiv.innerHTML = "<div class='result-item'>Please enter a keyword.</div>";
        return;
    }

    const results = libraryData.filter(book => {
        const content = book.tags.join(" ").toLowerCase() + " " + book.title.toLowerCase();
        const hasT1 = t1 ? content.includes(t1) : false; // Handle empty t1 if mostly browsing
        const hasT2 = t2 ? content.includes(t2) : false;

        // If t1 is empty but t2 exists (unlikely in UI flow, but good simply)
        if (!t1 && t2) return hasT2;
        if (t1 && !t2) return hasT1;

        if (op === "AND") return hasT1 && hasT2;
        if (op === "OR") return hasT1 || hasT2;
        if (op === "NOT") return hasT1 && !hasT2;
        return hasT1;
    });

    if (results.length === 0) {
        listDiv.innerHTML = "<div class='result-item'>No Data Found.</div>";
    } else {
        results.forEach(book => {
            const div = document.createElement('div');
            div.className = 'result-item';
            div.innerHTML = `<div style="font-weight:bold;">${book.title}</div><div style="font-size:0.8em; opacity:0.8;">[${book.type}] ${book.tags.join(", ")}</div>`;
            listDiv.appendChild(div);
        });
    }
}

// Menu 2: Classification (Initialize)
function initClassification() {
    const grid = document.getElementById('typeGrid');
    if (!grid) return;

    const types = [
        { name: "소설 (Fiction)", type: "Fairy" },
        { name: "과학 (Science)", type: "Psychic" }, // Using Psychic for Science/Mind
        { name: "역사 (History)", type: "Ground" },
        { name: "예술 (Art)", type: "Water" },
        { name: "기술 (Tech)", type: "Electric" },
        { name: "사회 (Social)", type: "Normal" },
    ]; // Pokemon types mapping

    grid.innerHTML = types.map(t => `
        <div class="type-card" onclick="alert('Filtering by ${t.name}...')">
            <div class="type-icon" style="background:${getTypeColor(t.type)}"></div>
            <div>${t.name}</div>
        </div>
    `).join('');
}

function getTypeColor(type) {
    if (type === 'Fire') return '#F08030';
    if (type === 'Water') return '#6890F0';
    if (type === 'Grass') return '#78C850';
    if (type === 'Electric') return '#F8D030';
    if (type === 'Psychic') return '#F85888';
    if (type === 'Ice') return '#98D8D8';
    if (type === 'Dragon') return '#7038F8';
    if (type === 'Dark') return '#705848';
    if (type === 'Fairy') return '#EE99AC';
    if (type === 'Normal') return '#A8A878';
    if (type === 'Ground') return '#E0C068';
    if (type === 'Steel') return '#B8B8D0';
    return '#A8A878';
}

// Menu 3: Battle / Best (Baesu)
function initBattle() {
    const area = document.getElementById('battleList');
    if (!area) return;

    // Sort by views
    const topBooks = [...libraryData].sort((a, b) => b.views - a.views).slice(0, 3);

    area.innerHTML = topBooks.map((book, i) => `
        <div class="book-fighter">
            <div style="font-size:0.8em; color: yellow;">RANK #${i + 1}</div>
            <div style="font-weight:bold; font-size:1.1em;">${book.title}</div>
            <div style="font-size:0.8em;">Power Points (Views): ${book.views}</div>
        </div>
    `).join('<div class="vs-badge">VS</div>');
}

// Menu 4: Trainer
// Static HTML content generally, but could be dynamic if needed.

// Initialize
window.onload = function () {
    // Boot Sequence
    const screen = document.querySelector('.main-screen');
    const originalContent = screen.innerHTML;

    // Show Boot animation
    screen.innerHTML = `
        <div style="height:100%; display:flex; justify-content:center; align-items:center; flex-direction:column; background:#000; color:#fff;">
            <div style="font-size:2em; font-weight:bold; color:#DC0A2D;">POKEDEX OS</div>
            <div style="margin-top:10px; color:#51AE5F;">v3.0 Loading...</div>
            <div style="margin-top:20px; width:200px; height:10px; border:1px solid #555;">
                <div id="loader" style="width:0%; height:100%; background:#51AE5F; transition:width 1s;"></div>
            </div>
        </div>
    `;

    setTimeout(() => {
        document.getElementById('loader').style.width = '100%';
    }, 100);

    setTimeout(() => {
        screen.innerHTML = originalContent;

        // Re-attach events if needed or just init
        showMenu('menu1');
        initClassification();
        initBattle();

    }, 1500);
};
