(() => {
  'use strict';
  const config = window.PORTFOLIO;
  const $ = (selector) => document.querySelector(selector);
  const grid = $('#project-grid');
  const themeButton = $('#theme-toggle');
  function syncTheme() {
    const light = document.documentElement.dataset.theme === 'light';
    themeButton.setAttribute('aria-pressed', String(light));
    themeButton.setAttribute('aria-label', `Switch to ${light ? 'dark' : 'light'} mode`);
    themeButton.querySelector('.theme-label').textContent = `${light ? 'Dark' : 'Light'} mode`;
    themeButton.querySelector('.theme-icon').textContent = light ? '☾' : '☼';
    $('meta[name="theme-color"]').content = light ? '#edeee6' : '#101410';
  }
  themeButton.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('portfolio-theme', theme); } catch (_) {}
    syncTheme();
  });
  syncTheme();
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  const dialog = $('#project-dialog');
  const video = $('#project-video');
  let userMotion = true;
  try { userMotion = localStorage.getItem('portfolio-motion') !== 'off'; } catch (_) {}
  let activeCategory = 'All work', expanded = false, currentProject = null, opener = null;
  let framePending = false, sceneDirty = true, pointerX = 0, pointerY = 0, cursorShown = false;
  let motionCards = [];
  const motionEnabled = () => userMotion && !reduced.matches;
  const projects = [...config.featured];
  config.categories.forEach((category) => {
    const template = config.featured.find((p) => p.category === category.name);
    for (let i = 2; i <= category.count; i++) {
      projects.push({ ...template, id: template.id.replace('01', String(i).padStart(2, '0')), title: `${category.name} — placeholder ${String(i).padStart(2, '0')}`, alternate: null });
    }
  });
  const allCount = config.categories.reduce((total, c) => total + c.count, 0);
  const escape = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const filters = [{ name: 'All work', count: allCount }, ...config.categories];
  $('.filter-bar').innerHTML = filters.map((c) => `<button class="filter" data-category="${escape(c.name)}" aria-pressed="${c.name === activeCategory}" aria-controls="project-grid">${escape(c.name)}<span>${String(c.count).padStart(2, '0')}</span></button>`).join('');

  function artwork(p) {
    if (p.style === 'saas') return '<div class="mini-app" aria-hidden="true"><div class="mini-nav"><span>● flow / demo</span><span>↗</span></div><div class="mini-heading">Make room<br>for your next idea.</div><div class="mini-chart"><i style="height:35%"></i><i style="height:55%"></i><i style="height:45%"></i><i style="height:70%"></i><i style="height:62%"></i><i style="height:90%"></i><i style="height:100%"></i></div><div class="mini-lines"><span></span><span></span><span></span></div></div>';
    return `${p.style === 'motion' ? '<span class="motion-shape" aria-hidden="true"></span>' : ''}<span class="art-type" aria-hidden="true"><strong>${p.overlay || ''}</strong></span>`;
  }
  let observer;
  if ('IntersectionObserver' in window) observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    entry.target.dataset.visible = String(entry.isIntersecting);
    if (entry.isIntersecting) { entry.target.classList.add('is-revealed'); entry.target.classList.remove('reveal-pending'); }
  }), { threshold: .12 });
  const revealTargets = [...document.querySelectorAll('.section-heading, .section-kicker, .about-copy, .about-visual, .contact h2, .contact-bottom')];
  function watchReveal(item) {
    if (!observer) return;
    item.classList.add('scroll-reveal');
    if (!item.classList.contains('is-revealed') && motionEnabled() && item.getBoundingClientRect().top > innerHeight * .94) item.classList.add('reveal-pending');
    observer.observe(item);
  }
  function render() {
    if (observer) observer.disconnect();
    const matching = activeCategory === 'All work' ? projects : projects.filter((p) => p.category === activeCategory);
    const shown = activeCategory === 'All work' && !expanded ? matching.slice(0, 6) : matching;
    grid.innerHTML = shown.map((p) => `<article class="project art-${p.style}" data-id="${p.id}"><button class="project-button media-trigger" data-project="${p.id}" aria-label="Play ${escape(p.title)} — ${escape(p.category)} placeholder preview"><div class="project-art"><img src="${config.images[p.image]}" alt="" width="1000" height="667" loading="lazy" decoding="async"${p.alternate ? ` data-alternate="${config.images[p.alternate]}" data-original="${config.images[p.image]}"` : ''}><span class="art-shade"></span>${artwork(p)}<span class="art-kicker">${escape(p.category.toUpperCase())} / DEMO</span><span class="demo-badge">PLACEHOLDER PREVIEW</span><span class="project-play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m8 5 12 7-12 7Z" fill="currentColor"/></svg></span></div><div class="project-info"><div><h3>${escape(p.title)}</h3><p>${escape(p.subtitle)}</p></div><span class="project-index">↗ ${p.id.split('-').at(-1)}</span></div></button></article>`).join('');
    motionCards = [...grid.querySelectorAll('.project')];
    motionCards.forEach((item, index) => { item.style.setProperty('--reveal-delay', `${index % 2 * 100}ms`); if (observer) watchReveal(item); else item.dataset.visible = 'true'; });
    revealTargets.forEach(watchReveal);
    sceneDirty = true; requestFrame();
    $('#result-count').textContent = `${String(shown.length).padStart(2, '0')} / ${String(matching.length).padStart(2, '0')} DEMO SLOTS`;
    $('#load-more').hidden = activeCategory !== 'All work' || expanded;
    if ($('#load-more').hidden) $('#load-more').style.display = 'none'; else $('#load-more').style.display = '';
    $('.filter-bar').querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.category === activeCategory)));
    $('.cursor').classList.remove('active');
  }
  $('.filter-bar').addEventListener('click', (e) => {
    const button = e.target.closest('button');
    if (!button) return;
    activeCategory = button.dataset.category;
    expanded = false;
    render();
  });
  $('#load-more').addEventListener('click', () => {
    expanded = true;
    render();
    grid.querySelectorAll('button')[6]?.focus({ preventScroll: true });
  });

  function openProject(p, trigger, updateHash = true) {
    currentProject = p;
    if (!dialog.open) opener = trigger || document.activeElement;
    const media = config.media[p.media];
    $('#dialog-category').textContent = `${p.category.toUpperCase()} / PLACEHOLDER PREVIEW`;
    $('#dialog-title').textContent = p.title;
    $('#dialog-description').textContent = 'Demonstration only. This sample video illustrates the playback experience and does not represent original work in this category. Replace it with the finished project, verified credits, and an accessible description before launch.';
    const credit = $('#video-credit');
    credit.textContent = `${media.credit}. Photos: Unsplash. `;
    const source = document.createElement('a'); source.href = media.source; source.target = '_blank'; source.rel = 'noopener'; source.textContent = 'View sample source ↗'; credit.appendChild(source);
    $('#video-fallback').hidden = true;
    $('#video-direct').href = media.url;
    video.src = media.url;
    video.poster = config.images[p.image];
    video.load();
    if (!dialog.open) { dialog.showModal(); document.body.style.overflow = 'hidden'; }
    if (updateHash) history.replaceState(null, '', `#project/${p.id}`);
    $('.cursor').classList.remove('active');
    // Playback always requires a deliberate press of the native play control.
  }
  grid.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-project]');
    if (trigger) openProject(projects.find((p) => p.id === trigger.dataset.project), trigger);
  });
  $('[data-reel]').addEventListener('click', (e) => openProject({ id: 'demo-reel', title: 'A different perspective', category: 'Demo reel', media: 'reel', image: 'mountains' }, e.currentTarget));
  $('.close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => {
    video.pause(); video.removeAttribute('src'); video.load();
    document.body.style.overflow = '';
    if (location.hash.startsWith('#project/')) history.replaceState(null, '', '#work');
    opener?.focus({ preventScroll: true });
  });
  video.addEventListener('error', () => { if (dialog.open && video.getAttribute('src')) $('#video-fallback').hidden = false; });
  $('#next-project').addEventListener('click', () => {
    const index = projects.findIndex((p) => p.id === currentProject.id);
    const matching = activeCategory === 'All work' ? projects : projects.filter((p) => p.category === activeCategory);
    const next = matching[(matching.findIndex((p) => p.id === currentProject.id) + 1) % matching.length] || projects[(index + 1) % projects.length];
    video.pause(); openProject(next, opener);
  });
  function readHash() {
    const id = location.hash.replace('#project/', '');
    if (!location.hash.startsWith('#project/')) { if (dialog.open) dialog.close(); return; }
    const project = projects.find((p) => p.id === id);
    if (project) openProject(project, null, false);
    else if (id === 'demo-reel') openProject({ id, title: 'A different perspective', category: 'Demo reel', media: 'reel', image: 'mountains' }, null, false);
  }
  window.addEventListener('hashchange', readHash);

  function syncMotion() {
    document.documentElement.classList.toggle('motion-off', !motionEnabled());
    $('#motion-toggle').textContent = `MOTION: ${motionEnabled() ? 'ON' : 'OFF'}`;
    $('#motion-toggle').setAttribute('aria-pressed', String(!motionEnabled()));
    $('#motion-toggle').setAttribute('aria-label', reduced.matches ? 'Motion disabled by system preference' : `Turn ${motionEnabled() ? 'off' : 'on'} decorative motion`);
    $('#motion-toggle').disabled = reduced.matches;
    if (!motionEnabled()) {
      document.querySelectorAll('[data-scroll-style]').forEach((el) => { el.removeAttribute('style'); el.removeAttribute('data-scroll-style'); });
      document.querySelectorAll('.reveal-pending').forEach((el) => el.classList.remove('reveal-pending'));
      grid.querySelectorAll('[data-original]').forEach((img) => img.src = img.dataset.original);
    }
    sceneDirty = true; requestFrame();
  }
  $('#motion-toggle').addEventListener('click', () => { userMotion = !userMotion; try { localStorage.setItem('portfolio-motion', userMotion ? 'on' : 'off'); } catch (_) {} syncMotion(); });
  reduced.addEventListener('change', syncMotion);
  document.addEventListener('visibilitychange', () => {
    document.documentElement.classList.toggle('page-hidden', document.hidden);
    $('.ticker > div').style.animationPlayState = document.hidden ? 'paused' : 'running';
    if (document.hidden) video.pause();
  });
  window.setInterval(() => {
    if (!motionEnabled() || document.hidden || dialog.open) return;
    grid.querySelectorAll('[data-alternate]').forEach((img) => {
      const item = img.closest('.project');
      if (item.dataset.visible !== 'true' || item.matches(':hover') || item.contains(document.activeElement)) return;
      img.src = img.getAttribute('src') === img.dataset.original ? img.dataset.alternate : img.dataset.original;
    });
  }, 6500);

  const reel = $('.reel');
  const about = $('.about');
  const clamp = (v, low, high) => Math.max(low, Math.min(high, v));
  function sceneStyle(el, name, value) {
    el.style.setProperty(name, value); el.dataset.scrollStyle = 'true';
  }
  function updateFrame() {
    framePending = false;
    if (document.hidden) return;
    if (sceneDirty) {
      sceneDirty = false;
      $('.site-header').classList.toggle('is-scrolled', scrollY > 35);
      const maxScroll = document.documentElement.scrollHeight - innerHeight;
      $('.scroll-progress').style.transform = `scaleX(${maxScroll > 0 ? scrollY / maxScroll : 0})`;
      if (motionEnabled()) {
        const mobile = innerWidth <= 600;
        const rect = reel.getBoundingClientRect();
        if (rect.bottom > -150 && rect.top < innerHeight + 150) {
          const depth = clamp((innerHeight * .5 - rect.top - rect.height / 2) * .58, -185, 185);
          sceneStyle($('.reel-image'), 'transform', `translate3d(0,${depth}px,0) scale(1.28)`);
          sceneStyle(reel, '--reel-radius', `${clamp(22 - (innerHeight - rect.top) * .022, 2, 22)}px`);
        }
        motionCards.forEach((card) => {
          const r = card.getBoundingClientRect();
          if (r.bottom < -100 || r.top > innerHeight + 100) return;
          const travel = clamp((innerHeight * .5 - r.top - r.height / 2) / innerHeight, -.8, .8);
          sceneStyle(card.querySelector('.project-art'), '--image-drift', `${travel * (mobile ? 85 : 145)}px`);
        });
        const ar = about.getBoundingClientRect();
        if (ar.bottom > 0 && ar.top < innerHeight) {
          const progress = clamp((innerHeight - ar.top) / (innerHeight + ar.height), 0, 1);
          sceneStyle($('.about-emblem'), 'transform', `rotate(${progress * 140}deg)`);
          sceneStyle($('.orbital-system'), 'transform', `rotate(${progress * -35}deg)`);
        }

      }
    }
    if (motionEnabled() && fine.matches && cursorShown && !dialog.open) $('.cursor').style.transform = `translate(${pointerX + 17}px, ${pointerY + 17}px)`;
  }
  function requestFrame() { if (!framePending) { framePending = true; requestAnimationFrame(updateFrame); } }
  function scrollScene() { sceneDirty = true; requestFrame(); }
  window.addEventListener('scroll', scrollScene, { passive: true });
  window.addEventListener('resize', scrollScene, { passive: true });
  window.addEventListener('pageshow', scrollScene);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) scrollScene(); });
  document.addEventListener('pointermove', (e) => {
    pointerX = e.clientX; pointerY = e.clientY;
    cursorShown = fine.matches && motionEnabled() && !!e.target.closest('.media-trigger') && !dialog.open;
    $('.cursor').classList.toggle('active', cursorShown);
    requestFrame();
  }, { passive: true });
  document.addEventListener('pointerleave', () => $('.cursor').classList.remove('active'));
  $('#contact-button').addEventListener('click', () => {
    if (config.email) { location.href = `mailto:${config.email}`; return; }
    const note = $('#contact-note');
    note.textContent = 'The contact address hasn’t been added yet. This is a portfolio preview — the live site will connect this button to the owner’s verified email.';
    note.classList.add('highlight'); note.setAttribute('role', 'status');
  });
  if (config.email) $('#contact-note').textContent = config.email;
  $('#year').textContent = new Date().getFullYear();
  render(); syncMotion(); readHash(); requestFrame();
})();
