document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1200,
        once: true,
        easing: 'ease-out-cubic',
        offset: 100
    });
});

const enterBtn = document.querySelector('.btn-enter');
if (enterBtn) {
    enterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = enterBtn.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    
    const banner = document.querySelector('.banner-parallax');
    if (banner) {
        banner.style.transform = `translateY(${scrolled * 0.4}px)`;
    }

    const bokeh = document.querySelector('.bokeh-overlay');
    if (bokeh) {
        bokeh.style.transform = `translateY(${scrolled * 0.15}px)`;
    }

    const headerStrip = document.querySelector('.header-anim-strip');
    if (headerStrip) {
        if (scrolled > 50) {
            headerStrip.style.opacity = '0.3';
            headerStrip.style.height = '2px';
        } else {
            headerStrip.style.opacity = '0.8';
            headerStrip.style.height = '4px';
        }
    }
});

document.querySelectorAll('.commander-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

function handleHashChange() {
    const hash = window.location.hash;
    
    document.querySelectorAll('.commander-details-overlay').forEach(overlay => {
        overlay.classList.remove('active');
    });

    if (hash && hash.startsWith('#details-')) {
        const targetOverlay = document.querySelector(hash);
        if (targetOverlay) {
            targetOverlay.classList.add('active');
            document.body.classList.add('no-scroll');
        }
    } else {
        document.body.classList.remove('no-scroll');
    }
}

function closeOverlay(e) {
    if (e) e.preventDefault();
    history.pushState("", document.title, window.location.pathname + window.location.search);
    handleHashChange();
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const hash = window.location.hash;
        if (hash && hash.startsWith('#details-')) {
            closeOverlay(e);
        }
    }
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('commander-details-overlay') || e.target.closest('.close-button')) {
        closeOverlay(e);
    }
});

window.addEventListener('hashchange', handleHashChange);
window.addEventListener('load', handleHashChange);
