/* Union Decor — калькулятор, рельс декоров, пошаговый подбор, reveal.
   Без зависимостей. */
(function () {
  'use strict';

  var PHONE = '77475004879';
  var $ = function (id) { return document.getElementById(id); };
  var wa = function (text) { return 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(text); };

  /* ---------- Любой [data-wa] ведёт в WhatsApp с готовым текстом ---------- */
  document.querySelectorAll('[data-wa]').forEach(function (el) {
    el.href = wa(el.dataset.wa);
    el.target = '_blank';
    el.rel = 'noopener';
  });

  var nf0 = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 });
  var nf1 = new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  var m2 = function (n) { return nf1.format(n) + ' м²'; };
  var tg = function (n) { return nf0.format(n) + ' ₸'; };

  /* ======================= Калькулятор ======================= */
  (function () {
    var form = $('calcForm');
    if (!form) return;

    // Цены на 17.07.2026 (акция). Источник — FACTS.md.
    var PRODUCTS = {
      hoxen: {
        name: 'Ламинат «ёлочка» Hoxen', price: 5690, instalment: 6490,
        img: 'assets/img/laminat-panels.jpg', short: 'Hoxen — «ёлочка»', meta: 'Германия · 8 мм · 33 класс'
      },
      smart: {
        name: 'SPC-кварцвинил «ёлочка» SmartVinil', price: 7900, instalment: 8990,
        img: 'assets/img/spc-herringbone.jpg', short: 'SmartVinil — «ёлочка»', meta: 'Италия · 5 мм · 43 класс'
      },
      'eng-en': {
        name: 'Инженерная доска, английская ёлочка', price: 22900, instalment: null, from: true,
        img: 'assets/img/parket-corrida.jpg', short: 'Metric Parquet — Corrida', meta: 'Дуб · 15 мм · англ. ёлочка'
      },
      'eng-fr': {
        name: 'Инженерная доска, французская ёлочка', price: 25900, instalment: null,
        img: 'assets/img/parket-inzhenernaya.jpg', short: 'Шеврон — франц. ёлочка', meta: 'Дуб · 15 мм'
      },
      other: {
        name: 'Покрытие ещё не выбрано', price: null, instalment: null,
        img: 'assets/img/showroom-samples.jpg', short: 'Подберём вместе', meta: 'Более 1000 декоров в зале'
      }
    };

    var WASTE = { straight: 0.05, herring: 0.12 };

    var LAY_TXT = {
      herring: {
        t: '«Ёлочка» — запас 12%',
        d: 'Планки идут под углом, у стен каждая упирается в срез. Обрезки в дело не идут.'
      },
      straight: {
        t: 'Прямая — запас 5%',
        d: 'Планки идут вдоль стены со смещением. Подрезка уходит только по краям.'
      }
    };

    var st = { mode: 'area', lay: 'herring', prod: 'hoxen' };

    var el = {
      area: $('area'), len: $('len'), wid: $('wid'), prod: $('prod'),
      rowArea: $('rowArea'), rowDims: $('rowDims'),
      rArea: $('rArea'), rWaste: $('rWaste'), rTotal: $('rTotal'),
      rPpm: $('rPpm'), rSum: $('rSum'), rInst: $('rInst'),
      specProd: $('specProd'), wa: $('calcWa'),
      decorImg: $('decorImg'), decorName: $('decorName'), decorMeta: $('decorMeta'),
      laySt: $('laySt'), layHb: $('layHb'), layTxt: $('layTxt')
    };

    var round100 = function (n) { return Math.round(n / 100) * 100; };

    function readArea() {
      var a = st.mode === 'area'
        ? parseFloat(el.area.value)
        : parseFloat(el.len.value) * parseFloat(el.wid.value);
      if (!isFinite(a) || a <= 0) return 0;
      return Math.min(a, 10000);
    }

    function message(area, total, rate, p) {
      var lines = [
        'Здравствуйте! Посчитал на сайте, проверьте, пожалуйста:',
        '',
        '• Покрытие: ' + p.name,
        '• Укладка: ' + (st.lay === 'herring' ? '«ёлочка»' : 'прямая'),
        '• Площадь пола: ' + m2(area),
        '• С запасом +' + Math.round(rate * 100) + '%: ' + m2(total)
      ];
      if (p.price !== null) {
        lines.push('• Ориентировочно: ' + (p.from ? 'от ' : '') + tg(round100(total * p.price)));
      }
      lines.push('', 'Подскажите наличие и точное количество упаковок.');
      return lines.join('\n');
    }

    function render() {
      var area = readArea();
      var p = PRODUCTS[st.prod];
      var rate = WASTE[st.lay];
      var waste = area * rate;
      var total = area + waste;

      el.specProd.textContent = p.name;
      el.rArea.textContent = m2(area);
      el.rWaste.textContent = '+' + Math.round(rate * 100) + '% · ' + m2(waste);
      el.rTotal.textContent = m2(total);

      // превью выбранного декора
      if (el.decorImg.getAttribute('src') !== p.img) el.decorImg.src = p.img;
      el.decorImg.alt = p.short;
      el.decorName.textContent = p.short;
      el.decorMeta.textContent = p.meta;

      // Схема укладки. Через класс, а не .hidden: SVGElement не наследует
      // HTMLElement, у него нет свойства hidden — присваивание молча создаёт
      // expando и атрибут в DOM не появляется.
      var isHb = st.lay === 'herring';
      el.layHb.classList.toggle('is-off', !isHb);
      el.laySt.classList.toggle('is-off', isHb);
      el.layTxt.innerHTML = '<b>' + LAY_TXT[st.lay].t + '</b>' + LAY_TXT[st.lay].d;

      if (p.price === null) {
        el.rPpm.textContent = '—';
        el.rSum.textContent = 'по декору';
        el.rInst.classList.add('is-off');
      } else {
        el.rPpm.textContent = (p.from ? 'от ' : '') + tg(p.price);
        el.rSum.textContent = (p.from ? 'от ' : '') + tg(round100(total * p.price));
        if (p.instalment) {
          el.rInst.classList.remove('is-off');
          el.rInst.textContent = 'В рассрочку без переплаты — около ' +
            tg(round100(total * p.instalment)) + ' (' + tg(p.instalment) + '/м²)';
        } else {
          el.rInst.classList.add('is-off');
        }
      }
      el.wa.href = wa(message(area, total, rate, p));
    }

    form.querySelectorAll('[data-mode]').forEach(function (b) {
      b.addEventListener('click', function () {
        st.mode = b.dataset.mode;
        form.querySelectorAll('[data-mode]').forEach(function (x) { x.classList.toggle('is-on', x === b); });
        el.rowArea.classList.toggle('is-hidden', st.mode !== 'area');
        el.rowDims.classList.toggle('is-hidden', st.mode === 'area');
        render();
      });
    });

    form.querySelectorAll('[data-lay]').forEach(function (b) {
      b.addEventListener('click', function () {
        st.lay = b.dataset.lay;
        form.querySelectorAll('[data-lay]').forEach(function (x) { x.classList.toggle('is-on', x === b); });
        render();
      });
    });

    el.prod.addEventListener('change', function () { st.prod = el.prod.value; render(); });
    [el.area, el.len, el.wid].forEach(function (i) { i.addEventListener('input', render); });
    form.addEventListener('submit', function (e) { e.preventDefault(); });

    render();
  })();

  /* ======================= Фильтр-табы галереи ======================= */
  (function () {
    var tabs = $('tabs');
    var rail = $('rail');
    if (!tabs || !rail) return;

    var tiles = [].slice.call(rail.querySelectorAll('.tile'));

    tabs.addEventListener('click', function (e) {
      var b = e.target.closest('.tab');
      if (!b) return;

      var f = b.dataset.f;
      tabs.querySelectorAll('.tab').forEach(function (x) { x.classList.toggle('is-on', x === b); });

      tiles.forEach(function (t) {
        t.hidden = f !== 'all' && t.dataset.t !== f;
      });

      rail.scrollTo({ left: 0, behavior: 'smooth' });
      rail.dispatchEvent(new Event('scroll'));   // пересчитать индикатор
    });
  })();

  /* ======================= Рельс декоров ======================= */
  (function () {
    var rail = $('rail');
    var thumb = $('railThumb');
    if (!rail) return;

    // индикатор прокрутки: ширина = доля видимого, сдвиг = прогресс
    function bar() {
      var max = rail.scrollWidth - rail.clientWidth;
      var ratio = Math.min(rail.clientWidth / rail.scrollWidth, 1);
      thumb.style.width = Math.max(ratio * 100, 8) + '%';

      var track = thumb.parentElement.clientWidth;
      var progress = max > 0 ? rail.scrollLeft / max : 0;
      thumb.style.transform = 'translateX(' + (progress * (track - thumb.offsetWidth)) + 'px)';
    }
    rail.addEventListener('scroll', bar, { passive: true });
    window.addEventListener('resize', bar);
    bar();

    // перетаскивание мышью
    var down = false, startX = 0, startLeft = 0, moved = 0;

    rail.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'touch') return;       // тач и так умеет
      down = true; moved = 0;
      startX = e.clientX;
      startLeft = rail.scrollLeft;
      rail.classList.add('is-drag');
    });

    window.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - startX;
      moved = Math.abs(dx);
      rail.scrollLeft = startLeft - dx;
    });

    window.addEventListener('pointerup', function () {
      if (!down) return;
      down = false;
      rail.classList.remove('is-drag');
    });

    // клавиатура
    rail.addEventListener('keydown', function (e) {
      var step = rail.clientWidth * 0.8;
      if (e.key === 'ArrowRight') { rail.scrollBy({ left: step, behavior: 'smooth' }); e.preventDefault(); }
      if (e.key === 'ArrowLeft')  { rail.scrollBy({ left: -step, behavior: 'smooth' }); e.preventDefault(); }
    });
  })();

  /* ======================= Пошаговый подбор ======================= */
  (function () {
    var form = $('askForm');
    if (!form) return;

    var steps = [].slice.call(form.querySelectorAll('.step'));
    var dots = [].slice.call(form.querySelectorAll('.ask__steps i'));
    var back = $('askBack');
    var out = { room: null, area: null, when: null };
    var cur = 0;

    var LABEL = { room: $('sRoom'), area: $('sArea'), when: $('sWhen') };
    var btn = $('askWa'), btnTxt = $('askWaTxt');

    function show(i) {
      cur = Math.max(0, Math.min(i, steps.length - 1));
      steps.forEach(function (s, n) { s.hidden = n !== cur; });
      dots.forEach(function (d, n) { d.classList.toggle('is-on', n <= cur); });
      back.hidden = cur === 0;
    }

    function sync() {
      Object.keys(out).forEach(function (k) {
        var d = LABEL[k];
        d.textContent = out[k] || '—';
        d.classList.toggle('is-empty', !out[k]);
      });

      var done = out.room && out.area && out.when;
      btn.setAttribute('aria-disabled', done ? 'false' : 'true');
      btnTxt.textContent = done ? 'Отправить запрос в WhatsApp' : 'Ответьте на три вопроса';

      if (done) {
        btn.href = wa([
          'Здравствуйте! Хочу подобрать пол. Ответил на сайте:',
          '',
          '• Объект: ' + out.room,
          '• Площадь: ' + out.area,
          '• Сроки: ' + out.when,
          '',
          'Пришлите, пожалуйста, подборку декоров с ценами.'
        ].join('\n'));
        btn.target = '_blank';
        btn.rel = 'noopener';
      } else {
        btn.removeAttribute('href');
      }
    }

    form.querySelectorAll('.opt').forEach(function (b) {
      b.addEventListener('click', function () {
        var k = b.dataset.k;
        out[k] = b.dataset.v;
        // подсветить выбранное в своей группе
        form.querySelectorAll('.opt[data-k="' + k + '"]').forEach(function (x) {
          x.classList.toggle('is-on', x === b);
        });
        sync();
        if (cur < steps.length - 1) setTimeout(function () { show(cur + 1); }, 180);
      });
    });

    back.addEventListener('click', function () { show(cur - 1); });
    form.addEventListener('submit', function (e) { e.preventDefault(); });

    btn.addEventListener('click', function (e) {
      if (btn.getAttribute('aria-disabled') === 'true') e.preventDefault();
    });

    show(0);
    sync();
  })();

  /* ======================= Появление при скролле =======================
     Намеренно без IntersectionObserver: он не везде отрабатывает, а цена
     ошибки здесь — пустая страница. Обычная проверка позиции на scroll
     с throttle через rAF: 11 элементов, стоимость незаметна, поведение
     предсказуемо. Плюс страховочный таймер. */
  (function () {
    var els = [].slice.call(document.querySelectorAll('[data-reveal]'));
    if (!els.length) return;

    var reveal = function (e) { e.classList.add('is-in'); };

    // Reduced motion — показываем сразу, .js-reveal не вешаем вовсе
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(reveal);
      return;
    }

    // Прячем только теперь, когда точно есть кому показать обратно
    document.documentElement.classList.add('js-reveal');

    var pending = els.slice();
    var ticking = false;

    function off() {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    }

    function check() {
      ticking = false;
      var line = window.innerHeight * 0.92;
      pending = pending.filter(function (e) {
        if (e.getBoundingClientRect().top < line) { reveal(e); return false; }
        return true;
      });
      if (!pending.length) off();
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(check);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    check();
    window.addEventListener('load', check);

    // Страховка: что бы ни пошло не так — через 3 секунды видно всё
    setTimeout(function () { els.forEach(reveal); off(); }, 3000);
  })();
})();
