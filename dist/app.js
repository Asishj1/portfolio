(() => {
  'use strict';
  const config = window.PORTFOLIO;
  const $ = (selector) => document.querySelector(selector);
  const grid = $('#project-grid');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  const dialog = $('#project-dialog');
  const video = $('#project-video');
  let userMotion = true;
  try { userMotion = localStorage.getItem('portfolio-motion') !== 'off'; } catch (_) {}
  let activeCategory = 'All work', expanded = false, currentProject = null, opener = null;
  let framePending = false, pointerX = 0, pointerY = 0, cursorShown = false;
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
  if ('IntersectionObserver' in window) observer = new IntersectionObserver((entries) => entries.forEach((entry) => { entry.target.dataset.visible = String(entry.isIntersecting); }), { threshold: .2 });
  function render() {
    if (observer) observer.disconnect();
    const matching = activeCategory === 'All work' ? projects : projects.filter((p) => p.category === activeCategory);
    const shown = activeCategory === 'All work' && !expanded ? matching.slice(0, 6) : matching;
    grid.innerHTML = shown.map((p) => `<article class="project art-${p.style}" data-id="${p.id}"><button class="project-button media-trigger" data-project="${p.id}" aria-label="Play ${escape(p.title)} — ${escape(p.category)} placeholder preview"><div class="project-art"><img src="${config.images[p.image]}" alt="" width="1000" height="667" loading="lazy" decoding="async"${p.alternate ? ` data-alternate="${config.images[p.alternate]}" data-original="${config.images[p.image]}"` : ''}><span class="art-shade"></span>${artwork(p)}<span class="art-kicker">${escape(p.category.toUpperCase())} / DEMO</span><span class="demo-badge">PLACEHOLDER PREVIEW</span><span class="project-play" aria-hidden="true">▶</span></div><div class="project-info"><div><h3>${escape(p.title)}</h3><p>${escape(p.subtitle)}</p></div><span class="project-index">↗ ${p.id.split('-').at(-1)}</span></div></button></article>`).join('');
    grid.querySelectorAll('.project').forEach((item) => observer ? observer.observe(item) : item.dataset.visible = 'true');
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
      $('.reel-image').style.transform = '';
      grid.querySelectorAll('[data-original]').forEach((img) => img.src = img.dataset.original);
    }
  }
  $('#motion-toggle').addEventListener('click', () => { userMotion = !userMotion; try { localStorage.setItem('portfolio-motion', userMotion ? 'on' : 'off'); } catch (_) {} syncMotion(); });
  reduced.addEventListener('change', syncMotion);
  document.addEventListener('visibilitychange', () => {
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
  function updateFrame() {
    framePending = false;
    if (!motionEnabled() || document.hidden) return;
    const rect = reel.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < innerHeight) $('.reel-image').style.transform = `translateY(${Math.max(-50, Math.min(50, (innerHeight * .45 - rect.top - rect.height / 2) * .12))}px)`;
    if (fine.matches && cursorShown && !dialog.open) $('.cursor').style.transform = `translate(${pointerX + 17}px, ${pointerY + 17}px)`;
  }
  function requestFrame() { if (!framePending) { framePending = true; requestAnimationFrame(updateFrame); } }
  window.addEventListener('scroll', requestFrame, { passive: true });
  window.addEventListener('resize', requestFrame, { passive: true });
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
