/* ============================================================
   AI 智能体对比站 · 通用交互
   - 网格底纹开关
   - 自检测验判分（.quiz[data-answer]）
   ============================================================ */
(function () {
  // 主题切换（深色/浅色）+ 本地记忆
  var themeBtn = document.getElementById('themeToggle');
  function applyTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('theme-dark');
    } else {
      document.body.classList.remove('theme-dark');
    }
    if (themeBtn) {
      themeBtn.textContent = theme === 'dark' ? '☀ LIGHT' : '☾ DARK';
    }
  }
  var savedTheme = localStorage.getItem('ai-agents-theme');
  if (!savedTheme) {
    // 首次访问，跟随系统偏好
    savedTheme = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  }
  applyTheme(savedTheme);
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var now = document.body.classList.contains('theme-dark') ? 'light' : 'dark';
      applyTheme(now);
      localStorage.setItem('ai-agents-theme', now);
    });
  }

  // 网格底纹开关
  var gt = document.getElementById('gridToggle');
  if (gt) {
    gt.addEventListener('click', function () {
      document.body.classList.toggle('no-grid');
      gt.textContent = document.body.classList.contains('no-grid') ? 'GRID: OFF' : 'GRID: ON';
    });
  }

  // 自检测验判分
  document.querySelectorAll('.quiz').forEach(function (qz) {
    var ans = (qz.getAttribute('data-answer') || '').trim();
    var fb = qz.querySelector('.fb');
    var btn = qz.querySelector('.submit');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var checked = qz.querySelector('input:checked');
      if (!checked) {
        if (fb) { fb.className = 'fb no'; fb.textContent = '请先选择一个答案。'; }
        return;
      }
      var val = checked.value;
      qz.classList.remove('correct', 'wrong');
      qz.querySelectorAll('label').forEach(function (lb) {
        var inp = lb.querySelector('input');
        lb.classList.remove('right', 'chosen');
        if (inp && inp.value === ans) lb.classList.add('right');
        if (inp === checked && val !== ans) lb.classList.add('chosen');
      });
      var explain = qz.getAttribute('data-explain') || '';
      if (val === ans) {
        qz.classList.add('correct');
        if (fb) { fb.className = 'fb ok'; fb.textContent = '✅ 答对了！' + (explain ? ' ' + explain : ''); }
      } else {
        qz.classList.add('wrong');
        if (fb) { fb.className = 'fb no'; fb.textContent = '❌ 再想想。' + (explain ? ' ' + explain : ''); }
      }
    });
  });

  // 实践页：选型决策器
  var conds = document.getElementById('conds');
  if (conds) {
    var MAP = {
      domestic: { tool: 'WorkBuddy',     why: '国内直连、中文原生，不用折腾代理' },
      free:     { tool: 'WorkBuddy',      why: 'WorkBuddy 体验版每月有 500 积分；ZCode 提供 5 天试用，客户端显示 GLM-5.3 每日 300 万、GLM-5.3-Flash 每日 500 万 Token' },
      code:     { tool: 'ZCode',          why: 'ZCode / TraeWork 专为写代码优化' },
      frontier: { tool: 'Codex',          why: 'Codex 模型能力最前沿' },
      team:     { tool: '码道CodeArts',       why: '码道CodeArts有任务看板，可自然语言造应用、分派协作' },
      mobile:   { tool: 'TraeWork',       why: 'TraeWork 三端同步、手机可派活' },
      skill:    { tool: 'WorkBuddy',      why: 'WorkBuddy 能手搓 Skill 做自动化' }
    };
    var decideBtn = document.getElementById('decideBtn');
    var decideOut = document.getElementById('decideResult');
    decideBtn.addEventListener('click', function () {
      var checked = Array.prototype.slice.call(conds.querySelectorAll('input:checked')).map(function (i) { return i.value; });
      if (!checked.length) {
        decideOut.innerHTML = '<span class="rec-why" style="color:var(--danger)">请至少勾一个条件。</span>';
        return;
      }
      var score = {}, whys = [];
      checked.forEach(function (c) {
        var t = MAP[c].tool, w = MAP[c].why;
        score[t] = (score[t] || 0) + 1;
        if (whys.indexOf(w) < 0) whys.push(w);
      });
      if (checked.indexOf('frontier') >= 0 && checked.indexOf('domestic') < 0) {
        whys.push('注意：Codex 国内需科学上网、按美元计费');
      }
      var ranked = Object.keys(score).sort(function (a, b) { return score[b] - score[a]; });
      var top = ranked[0], second = ranked[1];
      var html = '<div class="rec-card"><div class="rec-main">主推 <b>' + top + '</b></div>';
      html += '<p class="rec-why">' + whys.join('；') + '。</p>';
      if (second && score[second] === score[top]) html += '<p class="rec-alt">并列可选项：<b>' + second + '</b>。</p>';
      if (checked.indexOf('code') >= 0 && checked.indexOf('domestic') >= 0) {
        html += '<p class="rec-combo">组合建议：WorkBuddy（日常办公）+ ZCode / TraeWork（编程主力）。均可国内使用；免费额度、试用期限和模型费用按各自当前套餐为准。</p>';
      }
      html += '</div>';
      decideOut.innerHTML = html;
    });
  }

  // 实践页：掌握度自查（非考试）
  var sc = document.getElementById('selfcheck');
  if (sc) {
    var st = document.getElementById('selfText');
    function upd() {
      var n = sc.querySelectorAll('input:checked').length;
      var tot = sc.querySelectorAll('input').length;
      var msg = '已掌握 ' + n + ' / ' + tot;
      if (n === tot) msg += '：可以独立帮同学选型了！';
      else if (n >= 2) msg += '：基本够用，薄弱项回详解页补一下。';
      else if (n > 0) msg += '：刚起步，建议先把五章读完。';
      st.textContent = msg;
    }
    sc.querySelectorAll('input').forEach(function (i) { i.addEventListener('change', upd); });
  }
  // 侧边导航：折叠 / 展开（图标栏模式，状态记在 localStorage）
  var sbCol = document.getElementById('sbCollapse');
  if (sbCol) {
    if (localStorage.getItem('ai-agents-sbmin') === '1') {
      document.body.classList.add('sb-min');
    }
    function syncCol() {
      var min = document.body.classList.contains('sb-min');
      sbCol.setAttribute('title', min ? '展开侧栏' : '收起侧栏');
      sbCol.setAttribute('aria-expanded', min ? 'false' : 'true');
      var t = sbCol.querySelector('.txt');
      if (t) t.textContent = min ? '展开' : '收起';
    }
    sbCol.addEventListener('click', function () {
      var min = document.body.classList.toggle('sb-min');
      localStorage.setItem('ai-agents-sbmin', min ? '1' : '0');
      syncCol();
    });
    syncCol();
  }

  // 侧边导航：窄屏抽屉（按钮 / 遮罩 / 选中项 / ESC / 视口变宽自动关闭）
  var sbToggle = document.getElementById('sbToggle');
  var sbMask = document.getElementById('sbMask');
  if (sbToggle) {
    function closeSb() {
      document.body.classList.remove('sb-open');
      sbToggle.setAttribute('aria-expanded', 'false');
    }
    sbToggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('sb-open');
      sbToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    if (sbMask) sbMask.addEventListener('click', closeSb);
    document.querySelectorAll('.sidebar .sb-item').forEach(function (a) {
      a.addEventListener('click', closeSb);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeSb();
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1000) closeSb();
    });
  }

  // 代码块复制按钮（.code .copy-btn 取同级 pre 文本）
  document.querySelectorAll('.code .copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var pre = btn.closest('.code') && btn.closest('.code').querySelector('pre');
      if (!pre) return;
      var text = pre.innerText;
      var done = function () {
        var old = btn.textContent;
        btn.textContent = '已复制';
        setTimeout(function () { btn.textContent = old; }, 1400);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () {});
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'absolute';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); done(); } catch (e) {}
        document.body.removeChild(ta);
      }
    });
  });

  // 首页图鉴：卡片鼠标跟随光晕（写入 --mx/--my 供 CSS radial-gradient 使用）
  var cards = document.querySelectorAll('.agent-card');
  if (cards.length) {
    cards.forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(2) + '%');
        card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(2) + '%');
      });
    });
  }

  // 首页分类面板进入视野时再播放入场效果，长页面滚动时保持轻快。
  var revealTargets = document.querySelectorAll('.cat-panel, .path');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (revealTargets.length && !reduceMotion) {
    if ('IntersectionObserver' in window) {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.remove('reveal-pending');
            entry.target.classList.add('reveal-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
      revealTargets.forEach(function (target) {
        target.classList.add('reveal-pending');
        revealObserver.observe(target);
      });
    } else {
      revealTargets.forEach(function (target) { target.classList.add('reveal-visible'); });
    }
  }

  // 其余页面按内容块触发相同的轻量入场效果。
  var sharedRevealTargets = document.querySelectorAll(
    '.dim, .decision, .scene-card, .selfcheck label, .chart-box, .matrix-wrap, .pk-setup, .pk-stage, .feat, .spec .cell, .price-table, .hero-shot'
  );
  if (sharedRevealTargets.length && !reduceMotion) {
    if ('IntersectionObserver' in window) {
      var sharedRevealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.remove('reveal-pending');
            entry.target.classList.add('reveal-visible');
            sharedRevealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.06, rootMargin: '0px 0px -28px 0px' });
      sharedRevealTargets.forEach(function (target, index) {
        target.style.setProperty('--reveal-delay', (index % 4 * 45) + 'ms');
        target.classList.add('reveal-pending');
        sharedRevealObserver.observe(target);
      });
    } else {
      sharedRevealTargets.forEach(function (target) { target.classList.add('reveal-visible'); });
    }
  }
})();
