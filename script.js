
function createParticles() {
    const particlesDiv = document.getElementById("particles");
    if (!particlesDiv) return;
    
    for (let i = 0; i < 35; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.style.left = Math.random() * 100 + "vw";
        const size = Math.random() * 20 + 8;
        square.style.width = size + "px";
        square.style.height = size + "px";
        square.style.animationDuration = Math.random() * 12 + 6 + "s";
        square.style.animationDelay = Math.random() * 8 + "s";
        square.style.background = `rgba(${80 + Math.random() * 100}, ${150 + Math.random() * 105}, 255, 0.25)`;
        particlesDiv.appendChild(square);
    }
}


function lightningEffect() {
    const lightningDiv = document.getElementById("lightning");
    if (!lightningDiv) return;
    
    setInterval(() => {
        if (Math.random() < 0.12) {
            lightningDiv.style.opacity = "0.7";
            setTimeout(() => {
                lightningDiv.style.opacity = "0";
            }, 90);
            setTimeout(() => {
                lightningDiv.style.opacity = "0.3";
                setTimeout(() => {
                    lightningDiv.style.opacity = "0";
                }, 70);
            }, 120);
        }
    }, 4800);
}


function initScrollAnimation() {
    const sections = document.querySelectorAll("section");
    
    const reveal = () => {
        sections.forEach(section => {
            const top = section.getBoundingClientRect().top;
            if (top < window.innerHeight - 80) {
                section.style.opacity = "1";
                section.style.transform = "translateY(0)";
            }
        });
    };
    
    sections.forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(40px)";
        section.style.transition = "all 0.8s ease";
    });
    
    window.addEventListener("scroll", reveal);
    reveal();
}


function initSmoothScroll() {
    document.querySelectorAll(".nav-links a, .hero-buttons a").forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            const hash = this.getAttribute("href");
            if (hash && hash !== "#" && hash.startsWith("#")) {
                e.preventDefault();
                const target = document.querySelector(hash);
                if (target) {
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }
        });
    });
}


window.changeLanguage = function(lang) {
    if (lang === 'jp') {
        // NAVIGATION
        document.getElementById("navAbout").innerText = "私について";
        document.getElementById("navSkills").innerText = "スキル";
        document.getElementById("navProjects").innerText = "プロジェクト";
        document.getElementById("navJourney").innerText = "学習経験";
        document.getElementById("navContact").innerText = "連絡先";
        
        // HERO SECTION
        document.getElementById("heroTitle").innerHTML = 'こんにちは、私は <span>タマン・パルサン</span> です';
        document.getElementById("heroSubtitle").innerText = "エントリーレベル IT 開発者";
        document.getElementById("heroDesc").innerText = "レスポンシブWebサイトを作成し、Web開発、Java、最新技術のスキルを継続的に向上させています。";
        document.getElementById("heroBtn").innerText = "プロジェクトを見る";
        
        // ABOUT
        document.getElementById("aboutText").innerText = "日本を拠点とするエントリーレベルのIT開発者です。Web開発とソフトウェアエンジニアリングに強い関心を持っています。";
        
        // PROJECTS
        document.getElementById("project1Title").innerText = "カフェサイト";
        document.getElementById("project1Desc").innerText = "メニューと決済システムを備えたレスポンシブカフェサイト。";
        document.getElementById("project2Title").innerText = "請求システム";
        document.getElementById("project2Desc").innerText = "合計計算とダッシュボード付き請求システム。";
        document.getElementById("project3Title").innerText = "Java計算機";
        document.getElementById("project3Desc").innerText = "Javaプログラミング言語で構築された計算機。";
        
        // CONTACT
        document.getElementById("emailText").innerHTML = "📧 メール: tpalsang2001@gmail.com";
        document.getElementById("githubText").innerHTML = "💻 GitHub: <a href='https://palsangtamang.github.io/my-portfolio/' target='_blank'>palsangtamang.github.io/my-portfolio/</a>";
        document.getElementById("phoneText").innerHTML = "📞 電話: 080-6994-7485";
        document.getElementById("locationText").innerHTML = "📍 千葉県, 日本";
        
        // SECTION TITLES
        document.getElementById("aboutTitle").innerText = "私について";
        document.getElementById("skillsTitle").innerText = "私のスキル";
        document.getElementById("projectTitle").innerText = "注目プロジェクト";
        document.getElementById("journeyTitle").innerText = "学習の歩み";
        document.getElementById("contactTitle").innerText = "連絡先";
        
        // JOURNEY CARDS
        const journeyCards = document.querySelectorAll("#journey .timeline-card");
        if (journeyCards.length >= 3) {
            journeyCards[0].querySelector("h3").innerText = "プログラミング開始";
            journeyCards[0].querySelector("p").innerText = "Web開発とJavaの学習を開始。";
            journeyCards[1].querySelector("h3").innerText = "プロジェクト構築";
            journeyCards[1].querySelector("p").innerText = "複数のレスポンシブWebアプリを作成。";
            journeyCards[2].querySelector("h3").innerText = "将来の目標";
            journeyCards[2].querySelector("p").innerText = "日本でプロのIT開発者になる。";
        }
        
        // FOOTER
        document.getElementById("footerText").innerHTML = "© 2026 パルサン・タマン | All Rights Reserved";
    } 
    else {
        // ENGLISH DEFAULT
        document.getElementById("navAbout").innerText = "About";
        document.getElementById("navSkills").innerText = "Skills";
        document.getElementById("navProjects").innerText = "Projects";
        document.getElementById("navJourney").innerText = "Journey";
        document.getElementById("navContact").innerText = "Contact";
        
        document.getElementById("heroTitle").innerHTML = 'Hello, I\'m <span>Tamang Palsang</span>';
        document.getElementById("heroSubtitle").innerText = "Entry-Level IT Developer";
        document.getElementById("heroDesc").innerText = "I create responsive websites and continuously improve my skills in web development, Java, and modern programming technologies.";
        document.getElementById("heroBtn").innerText = "View Projects";
        
        document.getElementById("aboutText").innerText = "I am an entry-level IT developer based in Japan with a strong interest in web development and software engineering.";
        
        document.getElementById("project1Title").innerText = "Cafe Website";
        document.getElementById("project1Desc").innerText = "Responsive cafe website with menu and payment system.";
        document.getElementById("project2Title").innerText = "Billing Website";
        document.getElementById("project2Desc").innerText = "Billing system with total calculation and dashboard.";
        document.getElementById("project3Title").innerText = "Java Calculator";
        document.getElementById("project3Desc").innerText = "Calculator built using Java programming language.";
        
        document.getElementById("emailText").innerHTML = "📧 Email: tpalsang2001@gmail.com";
        document.getElementById("githubText").innerHTML = "💻 GitHub: <a href='https://palsangtamang.github.io/My-Portfolio/' target='_blank'>palsangtamang.github.io/My-Portfolio/</a>";
        document.getElementById("phoneText").innerHTML = "📞 Phone: 080-6994-7485";
        document.getElementById("locationText").innerHTML = "📍 Chiba, Japan";
        
        document.getElementById("aboutTitle").innerText = "About Me";
        document.getElementById("skillsTitle").innerText = "My Skills";
        document.getElementById("projectTitle").innerText = "Featured Projects";
        document.getElementById("journeyTitle").innerText = "My Learning Journey";
        document.getElementById("contactTitle").innerText = "Contact Me";
        
        const journeyCardsEn = document.querySelectorAll("#journey .timeline-card");
        if (journeyCardsEn.length >= 3) {
            journeyCardsEn[0].querySelector("h3").innerText = "Started Programming";
            journeyCardsEn[0].querySelector("p").innerText = "Started learning web development and Java.";
            journeyCardsEn[1].querySelector("h3").innerText = "Built Projects";
            journeyCardsEn[1].querySelector("p").innerText = "Created multiple responsive web applications.";
            journeyCardsEn[2].querySelector("h3").innerText = "Future Goal";
            journeyCardsEn[2].querySelector("p").innerText = "Become a professional IT developer in Japan.";
        }
        
        document.getElementById("footerText").innerHTML = "© 2026 Palsang Tamang | All Rights Reserved";
    }
};

window.addEventListener("load", () => {
    createParticles();
    initScrollAnimation();
    initSmoothScroll();
    lightningEffect();
    changeLanguage('en');
});