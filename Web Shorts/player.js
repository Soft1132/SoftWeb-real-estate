(() => {
  const icons = {
    play: '<path d="m9 5 11 7-11 7Z" fill="currentColor" stroke="none"/>',
    pause: '<path d="M8 5v14M16 5v14" stroke-width="4"/>',
    sound: '<path d="M11 5 6 9H3v6h3l5 4Z"/><path d="M15 8a6 6 0 0 1 0 8M18 5a10 10 0 0 1 0 14"/>',
    muted: '<path d="M11 5 6 9H3v6h3l5 4Z"/><path d="m16 9 6 6m0-6-6 6"/>',
    fullscreen: '<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/>',
    close: '<path d="M3 8h5V3m13 5h-5V3M8 21v-5H3m13 5v-5h5"/>',
  };
  const svg = name => '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + icons[name] + '</svg>';
  const words = {
    en: { play: 'Play', pause: 'Pause', watch: 'Watch reel', replay: 'Replay', mute: 'Mute', unmute: 'Unmute', volume: 'Volume', seek: 'Seek video', full: 'Full screen', exit: 'Exit full screen', loading: 'Loading', slow: 'Buffering', error: 'The video could not load.', retry: 'Try again', blocked: 'Press play to start the video.' },
    ru: { play: 'Воспроизвести', pause: 'Пауза', watch: 'Смотреть рилс', replay: 'Смотреть ещё раз', mute: 'Выключить звук', unmute: 'Включить звук', volume: 'Громкость', seek: 'Перемотка видео', full: 'На весь экран', exit: 'Выйти из полного экрана', loading: 'Загрузка', slow: 'Буферизация', error: 'Не удалось загрузить видео.', retry: 'Повторить', blocked: 'Нажмите воспроизведение для запуска.' }
  };
  const time = value => {
    const seconds = Math.max(0, Math.floor(Number.isFinite(value) ? value : 0));
    return Math.floor(seconds / 60) + ':' + String(seconds % 60).padStart(2, '0');
  };
  const players = [];

  document.querySelectorAll('.reel-shell.has-video').forEach((shell, index) => {
    const video = shell.querySelector('video');
    if (!video || !video.canPlayType('video/mp4')) return;
    let wantedPlaying = false;
    let failed = false;
    let loadingKind = 'loading';
    let scrubbing = false;
    let duration = Number((window.SOFT_REELS || [])[index]?.duration) || 0;
    const text = () => words[document.documentElement.lang === 'ru' ? 'ru' : 'en'];
    const ui = document.createElement('div');
    ui.className = 'player-ui';
    ui.innerHTML = `
      <button class="player-start" type="button">${svg('play')}<span></span></button>
      <div class="player-loading" hidden><span class="player-spinner" aria-hidden="true"></span><span class="player-load-label"></span></div>
      <div class="player-error" hidden><p role="alert"></p><button type="button" class="player-retry"></button></div>
      <div class="player-controls">
        <input class="player-seek" type="range" min="0" max="100" value="0" step="0.1" disabled>
        <div class="player-toolbar">
          <button type="button" class="player-play">${svg('play')}</button>
          <span class="player-time"><span class="player-current">0:00</span><span class="player-divider"> / </span><span class="player-duration">${time(duration)}</span></span>
          <div class="player-sound">
            <button type="button" class="player-mute">${svg('sound')}</button>
            <div class="player-volume-wrap"><input class="player-volume" type="range" min="0" max="1" step="0.05" value="1"></div>
          </div>
          <button type="button" class="player-full">${svg('fullscreen')}</button>
        </div>
      </div>
      <span class="player-announcement sr-only" aria-live="polite"></span>`;
    const find = selector => ui.querySelector(selector);
    const start = find('.player-start');
    const play = find('.player-play');
    const seek = find('.player-seek');
    const mute = find('.player-mute');
    const volume = find('.player-volume');
    const full = find('.player-full');
    const loading = find('.player-loading');
    const error = find('.player-error');
    const announcement = find('.player-announcement');

    function updateBuffer() {
      let end = 0;
      let loaded = 0;
      for (let i = 0; i < video.buffered.length; i++) {
        end = Math.max(end, video.buffered.end(i));
        loaded += video.buffered.end(i) - video.buffered.start(i);
      }
      seek.style.setProperty('--buffered', Math.min(100, duration ? end / duration * 100 : 0) + '%');
      find('.player-load-label').textContent = text()[loadingKind] + (loaded && duration ? ' · ' + Math.min(100, Math.floor(loaded / duration * 100)) + '%' : '…');
    }
    function setLoading(active, kind = 'loading') {
      loadingKind = kind;
      if (loading.hidden === active && !failed) announcement.textContent = active ? text()[kind] : '';
      loading.hidden = !active || failed;
      shell.classList.toggle('is-loading', active && !failed);
      video.setAttribute('aria-busy', String(active && !failed));
      updateBuffer();
    }
    function updateControls() {
      const active = wantedPlaying || !video.paused;
      play.innerHTML = svg(active ? 'pause' : 'play');
      play.setAttribute('aria-label', active ? text().pause : text().play);
      start.setAttribute('aria-label', video.ended ? text().replay : text().watch);
      start.querySelector('span').textContent = video.ended ? text().replay : text().watch;
      start.hidden = active || failed;
      mute.innerHTML = svg(video.muted || video.volume === 0 ? 'muted' : 'sound');
      mute.setAttribute('aria-label', video.muted || video.volume === 0 ? text().unmute : text().mute);
      mute.setAttribute('aria-pressed', String(video.muted || video.volume === 0));
      volume.value = String(video.muted ? 0 : video.volume);
      volume.setAttribute('aria-label', text().volume);
      seek.setAttribute('aria-label', text().seek);
      const fullscreen = document.fullscreenElement === shell || video.webkitDisplayingFullscreen;
      full.innerHTML = svg(fullscreen ? 'close' : 'fullscreen');
      full.setAttribute('aria-label', fullscreen ? text().exit : text().full);
      full.hidden = !(shell.requestFullscreen || video.webkitEnterFullscreen);
      find('.player-error p').textContent = text().error;
      find('.player-retry').textContent = text().retry;
      updateBuffer();
    }
    function updateTime() {
      if (Number.isFinite(video.duration) && video.duration > 0) duration = video.duration;
      const position = video.currentTime || 0;
      if (!scrubbing) seek.value = String(position);
      seek.max = String(duration || 100);
      seek.disabled = !duration || video.readyState < 1;
      seek.style.setProperty('--played', Math.min(100, duration ? Number(seek.value) / duration * 100 : 0) + '%');
      seek.setAttribute('aria-valuetext', time(Number(seek.value)) + ' / ' + time(duration));
      find('.player-current').textContent = time(scrubbing ? Number(seek.value) : position);
      find('.player-duration').textContent = time(duration);
      updateBuffer();
    }
    function pause() {
      wantedPlaying = false;
      video.pause();
      setLoading(false);
      updateControls();
    }
    async function begin() {
      failed = false;
      error.hidden = true;
      announcement.textContent = '';
      wantedPlaying = true;
      video.preload = 'auto';
      if (video.ended) video.currentTime = 0;
      setLoading(video.readyState < 3);
      updateControls();
      play.focus({ preventScroll: true });
      try {
        await video.play();
        if (!wantedPlaying) video.pause();
      } catch (reason) {
        if (reason.name === 'AbortError' && !wantedPlaying) return;
        wantedPlaying = false;
        setLoading(false);
        if (reason.name === 'NotAllowedError') announcement.textContent = text().blocked;
        else showError();
        updateControls();
      }
    }
    function toggle() {
      if (wantedPlaying || !video.paused) pause();
      else begin();
    }
    function showError() {
      wantedPlaying = false;
      failed = true;
      setLoading(false);
      error.hidden = false;
      updateControls();
    }
    async function fullscreen() {
      try {
        if (document.fullscreenElement === shell) await document.exitFullscreen();
        else if (shell.requestFullscreen) await shell.requestFullscreen();
        else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen();
      } catch {
        if (video.webkitEnterFullscreen && video.readyState >= 1) video.webkitEnterFullscreen();
      }
    }
    function prepare() {
      if (video.preload !== 'none') return;
      const connection = navigator.connection;
      video.preload = connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType || '') ? 'metadata' : 'auto';
      // Changing preload is enough; load() would interrupt a play already requested.
    }
    start.addEventListener('click', begin);
    play.addEventListener('click', toggle);
    video.addEventListener('click', toggle);
    mute.addEventListener('click', () => {
      const silent = video.muted || video.volume === 0;
      if (silent && video.volume === 0) video.volume = 1;
      video.muted = !silent;
      updateControls();
    });
    volume.addEventListener('input', () => { video.volume = Number(volume.value); video.muted = video.volume === 0; });
    full.addEventListener('click', fullscreen);
    find('.player-retry').addEventListener('click', () => { failed = false; video.load(); begin(); });
    seek.addEventListener('pointerdown', () => { scrubbing = true; });
    seek.addEventListener('input', () => {
      if (duration && video.readyState >= 1) video.currentTime = Number(seek.value);
      updateTime();
    });
    ['change', 'pointerup', 'pointercancel', 'blur'].forEach(event => seek.addEventListener(event, () => { scrubbing = false; updateTime(); }));
    shell.addEventListener('keydown', event => {
      if (event.target.matches('input, button')) return;
      if (event.code === 'Space' || event.key.toLowerCase() === 'k') { event.preventDefault(); toggle(); }
      else if (event.key.toLowerCase() === 'm') mute.click();
      else if (event.key.toLowerCase() === 'f') fullscreen();
      else if ((event.key === 'ArrowLeft' || event.key === 'ArrowRight') && video.readyState >= 1) {
        event.preventDefault();
        video.currentTime = Math.min(duration, Math.max(0, video.currentTime + (event.key === 'ArrowRight' ? 5 : -5)));
      }
    });
    video.addEventListener('play', () => { wantedPlaying = true; players.forEach(player => { if (player.video !== video) player.pause(); }); updateControls(); });
    video.addEventListener('playing', () => { setLoading(false); updateControls(); });
    video.addEventListener('pause', () => { wantedPlaying = false; setLoading(false); updateControls(); });
    video.addEventListener('ended', pause);
    video.addEventListener('waiting', () => { if (wantedPlaying || !video.paused) setLoading(true); });
    video.addEventListener('stalled', () => { if (wantedPlaying || !video.paused) setLoading(true, 'slow'); });
    video.addEventListener('seeking', () => { if (wantedPlaying && video.readyState < 3) setLoading(true); });
    ['canplay', 'loadeddata', 'seeked'].forEach(event => video.addEventListener(event, () => { if (video.readyState >= 3) setLoading(false); }));
    ['loadedmetadata', 'durationchange', 'timeupdate'].forEach(event => video.addEventListener(event, updateTime));
    video.addEventListener('progress', updateBuffer);
    video.addEventListener('volumechange', updateControls);
    video.addEventListener('error', showError);
    document.addEventListener('fullscreenchange', updateControls);
    document.addEventListener('soft:language', updateControls);
    document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
    shell.append(ui);
    shell.classList.add('player-enhanced');
    shell.tabIndex = 0;
    shell.setAttribute('role', 'group');
    shell.setAttribute('aria-labelledby', 'reel-title-' + (index + 1));
    video.controls = false;
    updateControls();
    updateTime();
    players.push({ video, pause });
    if ('IntersectionObserver' in window) {
      const preloadObserver = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) { prepare(); preloadObserver.disconnect(); }
      }, { rootMargin: '300px 0px' });
      preloadObserver.observe(shell);
      const visibilityObserver = new IntersectionObserver(entries => {
        if (!entries[0].isIntersecting && !video.paused && document.fullscreenElement !== shell && !video.webkitDisplayingFullscreen) pause();
      }, { threshold: 0.05 });
      visibilityObserver.observe(shell);
    } else video.preload = 'metadata';
  });
})();
