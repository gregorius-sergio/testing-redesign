const fs = require('fs');
const path = require('path');

const cssToAdd = `
        /* Horizontal Overlapping Gallery */
        .gallery-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 1rem 0;
            width: 100%;
            overflow: hidden;
        }

        .gallery-title {
            font-size: 2rem;
            font-weight: 900;
            margin-bottom: 2rem;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: var(--text-main);
            opacity: 0.9;
        }

        .overlapping-row {
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            padding: 2rem;
        }

        .gallery-card {
            width: 320px;
            height: 200px;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
            transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
            border: 2px solid rgba(255, 255, 255, 0.1);
            position: relative;
            margin-left: -60px; /* Overlap from left to keep centering */
            background: #111;
        }

        .gallery-card:first-child { margin-left: 0; }

        .gallery-card img { width: 100%; height: 100%; object-fit: cover; }

        .gallery-card:hover {
            transform: translateY(-20px) scale(1.1);
            z-index: 20 !important;
            margin-left: 0px; 
            margin-right: 40px;
            box-shadow: 0 20px 40px rgba(157, 78, 221, 0.4);
            border-color: var(--accent-purple);
        }

        /* Bento Grid Redesign (Solid Electric) */
        .bento-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-auto-rows: minmax(180px, auto);
            gap: 1.5rem;
            max-width: 1000px;
            margin: 0 auto;
            padding: 1rem 2rem 4rem 2rem;
        }

        .bento-item {
            border-radius: 24px;
            padding: 2rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: relative;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s ease;
        }
        
        .bento-item:hover { transform: translateY(-5px); }

        .bento-tech { background: #560BAD; grid-column: span 2; }
        .bento-history { background: #3F37C9; grid-column: span 1; }
        .bento-main { background: #240046; grid-column: span 3; min-height: 250px; }
        .bento-extra { background: #D4AF37; grid-column: span 1; color: #000 !important; }

        .bento-icon {
            width: 40px;
            height: 40px;
            background: rgba(255, 255, 255, 0.15);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.5rem;
        }
        
        .bento-extra .bento-icon { background: rgba(0,0,0,0.1); }

        .bento-label {
            font-size: 0.75rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            margin-bottom: 0.5rem;
            opacity: 0.8;
        }

        .bento-title {
            font-size: 1.8rem;
            font-weight: 900;
            line-height: 1.1;
            margin-bottom: 1rem;
        }

        .bento-desc {
            font-size: 0.95rem;
            line-height: 1.6;
            opacity: 0.9;
        }
        
        .bento-item, .bento-item * { color: #fff !important; }
        .bento-extra, .bento-extra * { color: #000 !important; }

        @media (max-width: 768px) {
            .bento-grid { grid-template-columns: 1fr; }
            .bento-tech, .bento-history, .bento-main, .bento-extra { grid-column: span 1; }
            .gallery-card { width: 200px; height: 130px; margin-right: -40px; }
        }

        /* Force Visibility on Project Pages */
        .animate-on-scroll {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
        }
        
        /* Ensure main is visible and not hidden by any overlap */
        main {
            position: relative;
            z-index: 1;
        }

        /* LIGHT MODE REVISIONS */
        [data-theme="light"] .card-status {
            color: #000 !important;
            background: rgba(0, 0, 0, 0.05);
            padding: 4px 12px;
            border-radius: 20px;
        }
        [data-theme="light"] .gallery-title { color: #000; }
        
        /* Force Dark Footer Persistence - Extreme Specificity */
        html[data-theme="light"] body footer, 
        html[data-theme="light"] body .footer-section, 
        html[data-theme="light"] body .footer-bottom,
        html[data-theme="light"] body footer *, 
        html[data-theme="light"] body .footer-section * {
            background-color: #05000a !important;
            color: #fff !important;
            border-color: rgba(255,255,255,0.1) !important;
        }
        footer, .footer-section {
            background-color: #05000a !important;
        }
`;

const jsToAdd = `
        // Simple Gallery Hover Shift Logic
        const galleryCards = document.querySelectorAll('.gallery-card');
        galleryCards.forEach((card, i) => {
            card.style.zIndex = i;
        });

        // Restore Navigation and Animations
        window.addEventListener('load', () => {
            // Re-init Aurora
            if (typeof reinitAurora === 'function') {
                const savedTheme = localStorage.getItem('theme') || 'dark';
                reinitAurora(savedTheme);
            }
            // Re-init Antigravity
            if (typeof initGlobalGravity === 'function') {
                initGlobalGravity();
            }
            // Fix hamburger menu functionality - Extreme Force
            const hamburger = document.querySelector('.hamburger');
            const navOverlay = document.querySelector('.nav-overlay');
            const menuBackdrop = document.querySelector('.menu-backdrop');
            
            function doToggle() {
                console.log("Forced Toggle");
                if (hamburger) hamburger.classList.toggle('active');
                if (navOverlay) navOverlay.classList.toggle('active');
                if (menuBackdrop) menuBackdrop.classList.toggle('active');
            }

            if (hamburger && navOverlay) {
                // Completely replace to kill any remaining inline or attached listeners
                const newHamburger = hamburger.cloneNode(true);
                hamburger.parentNode.replaceChild(newHamburger, hamburger);
                
                newHamburger.addEventListener('click', (e) => {
                   e.preventDefault();
                   e.stopPropagation();
                   doToggle();
                });
                
                if (menuBackdrop) {
                    const newBackdrop = menuBackdrop.cloneNode(true);
                    menuBackdrop.parentNode.replaceChild(newBackdrop, menuBackdrop);
                    newBackdrop.addEventListener('click', doToggle);
                }

                // Close menu when clicking links
                const navLinks = navOverlay.querySelectorAll('a');
                navLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        if (hamburger) hamburger.classList.remove('active');
                        if (navOverlay) navOverlay.classList.remove('active');
                        if (menuBackdrop) menuBackdrop.classList.remove('active');
                    });
                });
            }
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
    beforeMain = beforeMain.replace('</style>', cssToAdd + '\n    </style>');

    // inject js
    afterMain = afterMain.replace('</script>', jsToAdd + '\n    </script>');

    // fix navigation links
    // Only replace hash links that are exactly "#hash", not those already prepended
    beforeMain = beforeMain.replace(/href="#(?!home|about|learning|interests|education|projects|connect)/g, 'href="index.html#'); // Special case for unknown hashes
    // Force the main menu items to go back to index.html
    beforeMain = beforeMain.replace(/href="#home"/g, 'href="index.html#home"');
    beforeMain = beforeMain.replace(/href="#about"/g, 'href="index.html#about"');
    beforeMain = beforeMain.replace(/href="#learning"/g, 'href="index.html#learning"');
    beforeMain = beforeMain.replace(/href="#interests"/g, 'href="index.html#interests"');
    beforeMain = beforeMain.replace(/href="#education"/g, 'href="index.html#education"');
    beforeMain = beforeMain.replace(/href="#projects"/g, 'href="index.html#projects"');
    beforeMain = beforeMain.replace(/href="#connect"/g, 'href="index.html#connect"');

    afterMain = afterMain.replace(/href="#home"/g, 'href="index.html#home"');
    afterMain = afterMain.replace(/href="#about"/g, 'href="index.html#about"');
    afterMain = afterMain.replace(/href="#learning"/g, 'href="index.html#learning"');
    afterMain = afterMain.replace(/href="#interests"/g, 'href="index.html#interests"');
    afterMain = afterMain.replace(/href="#education"/g, 'href="index.html#education"');
    afterMain = afterMain.replace(/href="#projects"/g, 'href="index.html#projects"');
    afterMain = afterMain.replace(/href="#connect"/g, 'href="index.html#connect"');

    // Strip all inline onclick="toggleMenu()" to prevent double-toggle regressions
    beforeMain = beforeMain.replace(/onclick="toggleMenu\(\)"/g, '');

    const finalHtml = beforeMain + mainHTML + afterMain;

    fs.writeFileSync(path.join(__dirname, filename), finalHtml, 'utf8');
    console.log("Built " + filename);
}

const grembitHTML = `    <main>
        <section class="hero" id="home" style="min-height: 40vh; padding-top: 150px; padding-bottom: 20px;">
            <canvas id="hero-aurora" class="aurora-canvas"></canvas>
            <div class="hero-top-row">
                <div class="hero-text-content animate-on-scroll" style="max-width: 800px; text-align: center; margin: 0 auto; flex: unset;">
                    <span class="card-status" style="justify-content: center; margin-bottom: 1rem;">UNDER DEVELOPING</span>
                    <h1>
                        Grembit Axiom 10<br>
                        <span class="highlight-text">The Evolution of Logic</span>
                    </h1>
                </div>
            </div>
        </section>

        <section id="gallery" style="padding: 10px 0;">
            <div class="gallery-container">
                <h2 class="gallery-title">Documentation</h2>
                <div class="overlapping-row">
                    <div class="gallery-card"><img src="assets/axiom10-1.png" alt="Axiom 10"></div>
                    <div class="gallery-card"><img src="assets/axiom10-2.png" alt="Axiom 10"></div>
                    <div class="gallery-card"><img src="assets/axiom10-3.png" alt="Axiom 10"></div>
                </div>
            </div>
        </section>

        <section id="details" style="padding-bottom: 5rem;">
            <div class="bento-grid" style="padding-top: 0; margin-top: -1rem;">
                <div class="bento-item bento-main">
                    <div class="bento-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></div>
                    <h3 class="bento-title">Axiom 10 Upgrades</h3>
                    <p class="bento-desc">Koneksi langsung ke Binance futures, pembagian porsi Core-Satellite untuk meminimalkan risiko, dan Take Profit algoritmik yang telah terkalibrasi secara matematis untuk efisiensi maksimal.</p>
                </div>
                <div class="bento-item bento-tech">
                    <div class="bento-label">Engine</div>
                    <div class="bento-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></div>
                    <p class="bento-desc"><strong>Stack:</strong> Python, Pandas, CCXT, Scikit-learn, Binance API</p>
                </div>
                <div class="bento-item bento-history">
                    <div class="bento-label">Legacy</div>
                    <div class="bento-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
                    <p class="bento-desc">V9.2 terbukti tahan banting dalam menjaga modal tetap utuh di tengah badai pasar yang ekstrem.</p>
                </div>
            </div>
        </section>
    </main>`;

const vadaHTML = `    <main>
        <section class="hero" id="home" style="min-height: 40vh; padding-top: 150px; padding-bottom: 20px;">
            <canvas id="hero-aurora" class="aurora-canvas"></canvas>
            <div class="hero-top-row">
                <div class="hero-text-content animate-on-scroll" style="max-width: 800px; text-align: center; margin: 0 auto; flex: unset;">
                    <span class="card-status" style="justify-content: center; margin-bottom: 1rem;">COMPLETED</span>
                    <h1>
                        Grembit VADA<br>
                        <span class="highlight-text">Virtual Automated Data Analyst</span>
                    </h1>
                </div>
            </div>
        </section>

        <section id="gallery" style="padding: 10px 0;">
            <div class="gallery-container">
                <h2 class="gallery-title">Documentation</h2>
                <div class="overlapping-row">
                    <div class="gallery-card"><img src="assets/vada-1.png" alt="VADA"></div>
                    <div class="gallery-card"><img src="assets/vada-2.png" alt="VADA"></div>
                    <div class="gallery-card"><img src="assets/vada-3.png" alt="VADA"></div>
                </div>
            </div>
        </section>

        <section id="details" style="padding-bottom: 5rem;">
            <div class="bento-grid" style="padding-top: 0; margin-top: -1rem;">
                <div class="bento-item bento-main">
                    <div class="bento-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg></div>
                    <h3 class="bento-title">Automated Journal</h3>
                    <p class="bento-desc">Merekam setiap pesanan dan status secara otomatis ke dalam CSV dari localhost, menghilangkan kesalahan manual dan bias psikologi trader dalam pencatatan performa.</p>
                </div>
                <div class="bento-item bento-tech">
                    <div class="bento-label">Architecture</div>
                    <div class="bento-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></div>
                    <p class="bento-desc"><strong>Stack:</strong> Python, Binance API, CSV, Localhost Bridge</p>
                </div>
                <div class="bento-item bento-extra">
                    <div class="bento-label">Status</div>
                    <div class="bento-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
                    <p class="bento-desc">Sistem stabil dan berjalan 24/7 di lingkungan localhost production.</p>
                </div>
            </div>
        </section>
    </main>`;

const portfolioHTML = `    <main>
        <section class="hero" id="home" style="min-height: 40vh; padding-top: 150px; padding-bottom: 20px;">
            <canvas id="hero-aurora" class="aurora-canvas"></canvas>
            <div class="hero-top-row">
                <div class="hero-text-content animate-on-scroll" style="max-width: 800px; text-align: center; margin: 0 auto; flex: unset;">
                    <span class="card-status" style="justify-content: center; margin-bottom: 1rem;">LIVE</span>
                    <h1>
                        Portfolio Website<br>
                        <span class="highlight-text">Digital Alter Ego</span>
                    </h1>
                </div>
            </div>
        </section>

        <section id="gallery" style="padding: 10px 0;">
             <div class="gallery-container">
                <h2 class="gallery-title">Documentation</h2>
                <div class="overlapping-row">
                    <div class="gallery-card"><img src="assets/vada-1.png" alt="Portfolio Stack"></div>
                    <div class="gallery-card"><img src="assets/vada-2.png" alt="Portfolio UI"></div>
                    <div class="gallery-card"><img src="assets/vada-3.png" alt="Portfolio Logic"></div>
                </div>
            </div>
        </section>

        <section id="details" style="padding-bottom: 5rem;">
            <div class="bento-grid" style="padding-top: 0; margin-top: -1rem;">
                <div class="bento-item bento-main">
                    <div class="bento-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></div>
                    <h3 class="bento-title">Vibe Coding Method</h3>
                    <p class="bento-desc">Kolaborasi ekstensif antara AI dan desain intuitif untuk meracik UI/UX tanpa bergantung pada framework besar, mengedepankan efisiensi dan estetika murni.</p>
                </div>
                <div class="bento-item bento-tech">
                    <div class="bento-label">Technologies</div>
                    <div class="bento-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg></div>
                    <p class="bento-desc">HTML5, WebGL Aurora, CSS Glassmorphism, Vanilla JS</p>
                </div>
                <div class="bento-item bento-history">
                    <div class="bento-label">Visuals</div>
                    <div class="bento-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg></div>
                    <p class="bento-desc">Animasi WebGL (Aurora, Particles, Global Gravity) yang terintegrasi halus.</p>
                </div>
            </div>
        </section>
    </main>`;

buildPage('project-grembit.html', grembitHTML);
buildPage('project-grembit-vada.html', vadaHTML);
buildPage('project-portfolio.html', portfolioHTML);
