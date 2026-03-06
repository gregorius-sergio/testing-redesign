const fs = require('fs');
const path = require('path');

const cssToAdd = `
        /* Stacked Layered Cards Gallery */
        .gallery-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 50vh;
            perspective: 1000px;
        }

        .stacked-cards {
            position: relative;
            width: 80%;
            max-width: 800px;
            height: 450px;
            display: flex;
            justify-content: center;
            align-items: center;
            transform-style: preserve-3d;
        }

        .stack-card {
            position: absolute;
            width: 70%;
            height: auto;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
            transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
            border: 1px solid var(--glass-border);
            cursor: pointer;
            filter: grayscale(30%) brightness(0.8);
        }

        .stack-card img {
            width: 100%;
            height: auto;
            display: block;
        }

        .stack-card:nth-child(1) { transform: translateY(-20px) translateZ(-100px) rotate(-5deg); z-index: 1; }
        .stack-card:nth-child(2) { transform: translateY(0) translateZ(-50px) rotate(2deg); z-index: 2; }
        .stack-card:nth-child(3) { transform: translateY(20px) translateZ(0) rotate(-2deg); z-index: 3; filter: grayscale(0%) brightness(1); }

        .stacked-cards:hover .stack-card { filter: grayscale(0%) brightness(1); }
        .stack-card:hover {
            transform: translateY(-40px) translateZ(50px) rotate(0deg) scale(1.05) !important;
            z-index: 10 !important;
            box-shadow: 0 30px 60px rgba(157, 78, 221, 0.4);
        }
        
        [data-theme="light"] .stack-card { box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1); }
        [data-theme="light"] .stack-card:hover { box-shadow: 0 30px 60px rgba(123, 31, 162, 0.2); }
        
        @media (max-width: 768px) {
            .stacked-cards { height: 300px; width: 95%; }
            .stack-card { width: 85%; }
        }
`;

const jsToAdd = `
        // Stacked Gallery Logic
        const stackCards = document.querySelectorAll('.stack-card');
        stackCards.forEach(card => {
            card.addEventListener('click', () => {
                const parent = card.parentElement;
                parent.querySelectorAll('.stack-card').forEach(c => {
                    c.style.zIndex = '1';
                    c.style.transform = ''; // reset style
                });
                card.style.zIndex = '10';
                card.style.transform = 'translateY(-20px) translateZ(50px) rotate(0deg) scale(1.05)';
            });
        });
`;

function buildPage(filename, mainHTML) {
    const indexPath = path.join(__dirname, 'index.html');
    let content = fs.readFileSync(indexPath, 'utf8');

    // split content
    const mainStart = content.indexOf('<main>');
    const mainEnd = content.indexOf('</main>') + '</main>'.length;

    let beforeMain = content.slice(0, mainStart);
    let afterMain = content.slice(mainEnd);

    // inject css
    beforeMain = beforeMain.replace('</style>', cssToAdd + '\\n    </style>');

    // inject js
    afterMain = afterMain.replace('</script>', jsToAdd + '\\n    </script>');

    const finalHtml = beforeMain + mainHTML + afterMain;

    fs.writeFileSync(path.join(__dirname, filename), finalHtml, 'utf8');
    console.log("Built " + filename);
}

const grembitHTML = `    <main>
        <section class="hero" id="home" style="min-height: 50vh; padding-top: 150px; padding-bottom: 50px;">
            <canvas id="hero-aurora" class="aurora-canvas"></canvas>
            <div class="hero-top-row">
                <div class="hero-text-content animate-on-scroll" style="max-width: 800px; text-align: center; margin: 0 auto; flex: unset;">
                    <span class="project-status-badge" style="margin-bottom: 2rem;">● UNDER DEVELOPING</span>
                    <h1>
                        Grembit Axiom 10<br>
                        <span class="highlight-text">The Evolution of Logic</span>
                    </h1>
                    <p class="hero-desc" style="max-width: 600px; margin: 0 auto;">
                        Strategi personal yang punya otak sendiri. Mengintegrasikan Binance API untuk eksekusi trade live, strategi Core-Satellite, dan penyesuaian take-profit tetap.
                    </p>
                </div>
            </div>
        </section>

        <section id="gallery" style="padding-top: 50px; padding-bottom: 50px;">
            <div class="gallery-container animate-on-scroll delay-100">
                <div class="stacked-cards">
                    <div class="stack-card"><img src="assets/axiom10-1.png" alt="Axiom 10"></div>
                    <div class="stack-card"><img src="assets/axiom10-2.png" alt="Axiom 10"></div>
                    <div class="stack-card"><img src="assets/axiom10-3.png" alt="Axiom 10"></div>
                </div>
            </div>
        </section>

        <section id="details" class="bento-section" style="padding-top: 0rem; padding-bottom: 5rem;">
            <div class="projects-grid" style="grid-template-columns: 1fr; max-width: 900px; margin: 0 auto; display: grid; gap: 2.5rem;">
                <div class="project-card grembit animate-on-scroll delay-200" style="min-height: auto;">
                    <div class="project-header">
                        <h3 class="project-title-large">Tech Stack & Features</h3>
                    </div>
                    <div class="project-body-content">
                        <p class="project-desc-text"><strong>Tech:</strong> Python, Pandas, CCXT, Scikit-learn, Binance API</p>
                        <p class="project-desc-text"><strong>V9.2 History:</strong> Hasil pengujian data historis menunjukkan ketahanan sistem yang luar biasa dalam menjaga modal tetap utuh di tengah badai pasar. Model awalnya adalah eksperimen murni.</p>
                        <p class="project-desc-text"><strong>Axiom 10 Upgrades:</strong> Koneksi langsung ke Binance futures, pembagian porsi Core-Satellite untuk meminimalkan risiko, dan Take Profit algoritmik yang telah terkalibrasi.</p>
                    </div>
                </div>
            </div>
        </section>
    </main>`;

const vadaHTML = `    <main>
        <section class="hero" id="home" style="min-height: 50vh; padding-top: 150px; padding-bottom: 50px;">
            <canvas id="hero-aurora" class="aurora-canvas"></canvas>
            <div class="hero-top-row">
                <div class="hero-text-content animate-on-scroll" style="max-width: 800px; text-align: center; margin: 0 auto; flex: unset;">
                    <span class="project-status-badge" style="margin-bottom: 2rem;">● COMPLETED</span>
                    <h1>
                        Grembit VADA<br>
                        <span class="highlight-text">Virtual Automated Data Analyst</span>
                    </h1>
                    <p class="hero-desc" style="max-width: 600px; margin: 0 auto;">
                        Sistem jurnaling trading otomatis yang merekam, menganalisis, dan memvisualisasikan performa trading secara real-time dari localhost.
                    </p>
                </div>
            </div>
        </section>

        <section id="gallery" style="padding-top: 50px; padding-bottom: 50px;">
            <div class="gallery-container animate-on-scroll delay-100">
                <div class="stacked-cards">
                    <div class="stack-card"><img src="assets/vada-1.png" alt="VADA"></div>
                    <div class="stack-card"><img src="assets/vada-2.png" alt="VADA"></div>
                    <div class="stack-card"><img src="assets/vada-3.png" alt="VADA"></div>
                </div>
            </div>
        </section>

        <section id="details" class="bento-section" style="padding-top: 0rem; padding-bottom: 5rem;">
            <div class="projects-grid" style="grid-template-columns: 1fr; max-width: 900px; margin: 0 auto; display: grid; gap: 2.5rem;">
                <div class="project-card grembit animate-on-scroll delay-200" style="min-height: auto;">
                    <div class="project-header">
                        <h3 class="project-title-large">Tech Stack & Features</h3>
                    </div>
                    <div class="project-body-content">
                        <p class="project-desc-text"><strong>Tech:</strong> Python, Binance API, CSV, Localhost</p>
                        <p class="project-desc-text"><strong>Arsitektur Teknis:</strong> Jembatan antara sistem API Binance dan Localhost untuk pemrosesan data real-time dan perekaman tanpa latensi eksternal.</p>
                        <p class="project-desc-text"><strong>Automated Journal Trade:</strong> Merekam setiap pesanan dan status secara otomatis ke dalam CSV, mengurangi kesalahan manual pencatatan psikologi trader.</p>
                    </div>
                </div>
            </div>
        </section>
    </main>`;

const portfolioHTML = `    <main>
        <section class="hero" id="home" style="min-height: 50vh; padding-top: 150px; padding-bottom: 50px;">
            <canvas id="hero-aurora" class="aurora-canvas"></canvas>
            <div class="hero-top-row">
                <div class="hero-text-content animate-on-scroll" style="max-width: 800px; text-align: center; margin: 0 auto; flex: unset;">
                    <span class="project-status-badge" style="margin-bottom: 2rem;">● COMPLETED & LIVE</span>
                    <h1>
                        Portfolio Website<br>
                        <span class="highlight-text">Digital Alter Ego</span>
                    </h1>
                    <p class="hero-desc" style="max-width: 600px; margin: 0 auto;">
                        Website ini dibuat sepenuhnya secara mandiri. Dibangun dengan metode Vibe Coding, menerjemahkan bentuk visual artistik menjadi baris kode yang fungsional.
                    </p>
                </div>
            </div>
        </section>

        <section id="gallery" style="padding-top: 50px; padding-bottom: 50px;"></section>

        <section id="details" class="bento-section" style="padding-top: 0rem; padding-bottom: 5rem;">
            <div class="projects-grid" style="grid-template-columns: 1fr; max-width: 900px; margin: 0 auto; display: grid; gap: 2.5rem;">
                <div class="project-card portfolio animate-on-scroll delay-200" style="min-height: auto;">
                    <div class="project-header">
                        <h3 class="project-title-large">Tech Stack & Features</h3>
                    </div>
                    <div class="project-body-content">
                        <p class="project-desc-text"><strong>Tech:</strong> HTML5, WebGL Aurora, CSS Glassmorphism</p>
                        <p class="project-desc-text"><strong>Vibe Coding:</strong> Kolaborasi ekstensif antara AI dan desain intuitif untuk meracik UI/UX tanpa bergantung pada kerangka framework besar.</p>
                        <p class="project-desc-text"><strong>Fitur:</strong> Animasi berbasis WebGL (Aurora, Particles, Global Gravity), Transisi halus, Mode Terang/Gelap adaptif, Skema Navigasi Responsif.</p>
                    </div>
                </div>
            </div>
        </section>
    </main>`;

buildPage('project-grembit.html', grembitHTML);
buildPage('project-grembit-vada.html', vadaHTML);
buildPage('project-portfolio.html', portfolioHTML);
