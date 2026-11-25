(() => {
    const viewer = document.getElementById('photo-viewer');
    if (!viewer) return;
    const image = document.getElementById('photo-image');
    const title = document.getElementById('photo-title');
    const count = document.getElementById('photo-count');
    const original = document.getElementById('photo-original');
    const prev = document.getElementById('photo-prev');
    const next = document.getElementById('photo-next');
    const close = document.getElementById('photo-close');
    let photos = [], index = 0, trigger = null, touchStart = null;
    let galleryTitles = null;
    function show() {
        if (galleryTitles) title.textContent = galleryTitles[index];
        image.src = photos[index];
        image.alt = `${title.textContent}, photo ${index + 1}`;
        original.href = photos[index];
        count.textContent = `${index + 1} / ${photos.length}`;
        prev.disabled = index === 0;
        next.disabled = index === photos.length - 1;
    }
    function move(delta) { const n = index + delta; if (n >= 0 && n < photos.length) { index = n; show(); } }
    document.querySelectorAll('.photos-button').forEach(button => button.addEventListener('click', () => {
        const card = button.closest('.archive-card');
        photos = Array.from(card.querySelectorAll('.photo-sources a'), a => a.href);
        if (!photos.length) return;
        galleryTitles = null; trigger = button; index = 0; title.textContent = card.querySelector('h3').textContent;
        show(); viewer.showModal(); document.body.classList.add('photo-viewer-open'); close.focus();
    }));
    const galleryLinks = Array.from(document.querySelectorAll('.gallery-photo'));
    galleryLinks.forEach((link, i) => link.addEventListener('click', e => {
        if (typeof viewer.showModal !== 'function' || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        photos = galleryLinks.map(a => a.href);
        galleryTitles = galleryLinks.map(a => a.dataset.event || 'The Lodge');
        trigger = link; index = i;
        show(); viewer.showModal(); document.body.classList.add('photo-viewer-open'); close.focus();
    }));
    prev.addEventListener('click', () => move(-1)); next.addEventListener('click', () => move(1));
    close.addEventListener('click', () => viewer.close());
    viewer.addEventListener('close', () => { document.body.classList.remove('photo-viewer-open'); image.removeAttribute('src'); if (trigger) trigger.focus(); });
    viewer.addEventListener('keydown', e => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); move(e.key === 'ArrowLeft' ? -1 : 1); } });
    image.addEventListener('touchstart', e => { touchStart = e.changedTouches[0].clientX; }, {passive:true});
    image.addEventListener('touchend', e => { if (touchStart === null) return; const dx = e.changedTouches[0].clientX - touchStart; touchStart = null; if (Math.abs(dx) > 50) move(dx < 0 ? 1 : -1); }, {passive:true});
})();
