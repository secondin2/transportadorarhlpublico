/* =====================================================
   Transportadora RHL — Scripts
   ===================================================== */
(() => {
  'use strict';

  /* ---------- CONFIGURAÇÃO (edite aqui) ---------- */
  const CONFIG = {
    // Número do WhatsApp com DDI + DDD, apenas dígitos
    whatsappNumber: '5511917754241',
    // Mensagem padrão dos botões de WhatsApp
    whatsappDefaultMessage: 'Olá! Vim pelo site da RHL e gostaria de solicitar uma cotação de frete.',
    // Como o formulário envia: 'whatsapp' (abre o WhatsApp com a mensagem pronta)
    // ou 'email' (envia por e-mail via FormSubmit, sem backend)
    formMode: 'whatsapp',
    // Endpoint usado apenas no modo 'email'
    emailEndpoint: 'https://formsubmit.co/ajax/contato@transportadorarhl.com.br'
  };

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- Links de WhatsApp ---------- */
  const waUrl = (message) => `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;

  $$('[data-wa]').forEach((link) => {
    link.href = waUrl(link.dataset.wa || CONFIG.whatsappDefaultMessage);
    link.target = '_blank';
    link.rel = 'noopener';
  });

  /* ---------- Cabeçalho fixo ---------- */
  const header = $('.header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Menu mobile ---------- */
  const nav = $('#nav');
  const toggle = $('.nav-toggle');

  const setMenu = (open) => {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    document.body.classList.toggle('menu-open', open);
  };

  toggle.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  $$('a', nav).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('open') && !nav.contains(e.target) && !toggle.contains(e.target)) setMenu(false);
  });

  /* ---------- Link ativo no menu ---------- */
  const navLinks = $$('.nav a[href^="#"]').filter((a) => a.getAttribute('href').length > 1);
  const sections = navLinks.map((a) => $(a.getAttribute('href'))).filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const activeObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    sections.forEach((s) => activeObs.observe(s));
  }

  /* ---------- Contadores animados ---------- */
  const numberFormat = new Intl.NumberFormat('pt-BR');
  const animateCounter = (el) => {
    const target = Number(el.dataset.count) || 0;
    const duration = 1800;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = numberFormat.format(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const counters = $$('[data-count]');
  if ('IntersectionObserver' in window) {
    const counterObs = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { animateCounter(entry.target); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach((el) => counterObs.observe(el));
  } else {
    counters.forEach((el) => { el.textContent = numberFormat.format(Number(el.dataset.count)); });
  }

  /* ---------- Animações de entrada ---------- */
  const revealEls = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObs = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('in'); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => revealObs.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  /* ---------- Máscara de telefone ---------- */
  const phoneInput = $('#telefone');
  const maskPhone = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length === 0) return '';
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };
  phoneInput.addEventListener('input', () => { phoneInput.value = maskPhone(phoneInput.value); });

  /* ---------- Formulário ---------- */
  const form = $('#form-cotacao');
  const status = $('#form-status');
  const submitBtn = $('#form-submit');
  const formNote = $('.form-note');

  if (CONFIG.formMode === 'email') {
    submitBtn.querySelector('span').textContent = 'Enviar mensagem';
    submitBtn.querySelector('svg').replaceWith(createIcon('#i-mail'));
    formNote.textContent = 'Seus dados são usados apenas para responder à sua solicitação.';
  }

  function createIcon(id) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'icon');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttribute('href', id);
    svg.appendChild(use);
    return svg;
  }

  const setFieldError = (name, invalid) => {
    const field = form.elements[name].closest('.field');
    field.classList.toggle('invalid', invalid);
    return !invalid;
  };

  const showStatus = (type, message) => {
    status.className = `form-status show ${type}`;
    status.textContent = message;
  };

  const hideStatus = () => { status.className = 'form-status'; status.textContent = ''; };

  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

  const buildWhatsAppMessage = (d) => [
    '*Solicitação de cotação – Site RHL*',
    '',
    `*Nome:* ${d.nome}`,
    `*Telefone:* ${d.telefone}`,
    d.email && `*E-mail:* ${d.email}`,
    d.empresa && `*Empresa:* ${d.empresa}`,
    d.origem && `*Origem:* ${d.origem}`,
    d.destino && `*Destino:* ${d.destino}`,
    d.carga && `*Tipo de carga:* ${d.carga}`,
    d.mensagem && `*Mensagem:* ${d.mensagem}`
  ].filter(Boolean).join('\n');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Honeypot anti-spam
    if (form.elements.website.value) return;

    const data = Object.fromEntries(new FormData(form).entries());
    Object.keys(data).forEach((k) => { data[k] = String(data[k]).trim(); });

    const valid = [
      setFieldError('nome', data.nome.length < 3),
      setFieldError('telefone', data.telefone.replace(/\D/g, '').length < 10),
      setFieldError('email', Boolean(data.email) && !isEmail(data.email))
    ].every(Boolean);

    if (!valid) {
      showStatus('error', 'Confira os campos destacados e tente novamente.');
      const firstInvalid = $('.field.invalid input, .field.invalid select, .field.invalid textarea', form);
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    hideStatus();

    if (CONFIG.formMode === 'whatsapp') {
      const url = waUrl(buildWhatsAppMessage(data));
      const popup = window.open(url, '_blank', 'noopener');
      // Se o navegador bloquear a nova aba, redireciona na própria aba
      if (!popup) window.location.href = url;
      showStatus('success', 'Abrimos o WhatsApp com a sua solicitação. É só confirmar o envio por lá!');
      form.reset();
      return;
    }

    // Modo e-mail (FormSubmit)
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    try {
      const response = await fetch(CONFIG.emailEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...data,
          _subject: 'Nova solicitação de cotação – Site RHL',
          _template: 'table'
        })
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      showStatus('success', 'Mensagem enviada com sucesso! Em breve entraremos em contato.');
      form.reset();
    } catch (err) {
      showStatus('error', 'Não foi possível enviar agora. Tente novamente ou fale conosco pelo WhatsApp.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
    }
  });

  $$('.field input, .field select, .field textarea', form).forEach((el) => {
    el.addEventListener('input', () => el.closest('.field').classList.remove('invalid'));
  });

  /* ---------- Ano no rodapé ---------- */
  const year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
