/* ═══════════════════════════════════════════
   Rust Learning · components.js
   Quiz rendering, inline quiz, scroll spy, wrong-book UI, page transitions
   Adapted from math_univers
   ═════════════════════════════════════════ */

/* ── Render QUESTIONS into #quiz-zone ── */
function escapeQuizHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function renderQuiz(questions, container) {
  if (!questions || !container) return;
  container.innerHTML = questions.map(function (q, i) {
    return '<div class="quiz-item" id="quiz-' + i + '">' +
      '<div class="q-header">' +
        '<div class="q-num">' + (i + 1) + '</div>' +
        '<div class="q-text">' + escapeQuizHtml(q.question) + '</div>' +
      '</div>' +
      '<div class="q-options">' +
        q.options.map(function (opt, j) {
          return '<button class="q-opt" onclick="handleQuizAnswer(' + i + ',' + j + ',this)">' +
            '<span class="opt-letter">' + String.fromCharCode(65 + j) + '</span>' + escapeQuizHtml(opt) +
          '</button>';
        }).join('') +
      '</div>' +
      '<div class="q-explanation" id="quiz-exp-' + i + '">' +
        '<button class="q-reset" onclick="resetQuizItem(' + i + ')">↺ 重做</button>' +
        '<span class="exp-label">解析</span>' +
        escapeQuizHtml(q.explanation) +
      '</div>' +
    '</div>';
  }).join('');
}

/* ── Handle quiz answer ── */
function handleQuizAnswer(qIndex, optIndex, btn) {
  var q = QUESTIONS[qIndex];
  var item = document.getElementById('quiz-' + qIndex);
  var opts = item.querySelectorAll('.q-opt');

  for (var i = 0; i < opts.length; i++) {
    opts[i].disabled = true;
    if (i === q.answer) opts[i].classList.add('correct');
  }
  if (optIndex !== q.answer) {
    btn.classList.add('wrong');
    if (typeof WrongBook !== 'undefined') {
      var pageBody = document.body;
      WrongBook.record(q.id, {
        question: q.question,
        correctAnswer: String.fromCharCode(65 + q.answer),
        userAnswer: String.fromCharCode(65 + optIndex),
        module: pageBody.getAttribute('data-module') || '',
        chapter: (pageBody.getAttribute('data-module') || '') + ' Ch.' + (document.querySelector('.chapter-indicator') ? document.querySelector('.chapter-indicator').textContent : '')
      });
    }
  } else {
    if (typeof WrongBook !== 'undefined') WrongBook.remove(q.id);
  }

  document.getElementById('quiz-exp-' + qIndex).classList.add('show');
}

/* ── Reset single quiz ── */
function resetQuizItem(qIndex) {
  var item = document.getElementById('quiz-' + qIndex);
  var opts = item.querySelectorAll('.q-opt');
  for (var i = 0; i < opts.length; i++) {
    opts[i].disabled = false;
    opts[i].classList.remove('correct', 'wrong');
  }
  document.getElementById('quiz-exp-' + qIndex).classList.remove('show');
}

/* ── Inline quiz ── */
function checkInlineQuiz(quizId, btn, isCorrect, feedback) {
  var quiz = document.getElementById(quizId);
  var opts = quiz.querySelectorAll('.iq-options button');
  for (var i = 0; i < opts.length; i++) opts[i].disabled = true;

  btn.classList.add(isCorrect ? 'correct' : 'wrong');

  if (!isCorrect && typeof WrongBook !== 'undefined') {
    var pageBody = document.body;
    var mod = pageBody.getAttribute('data-module') || '';
    var prompt = quiz.querySelector('.iq-prompt');
    var correctLetter = '—';
    var allBtns = quiz.querySelectorAll('.iq-options button');
    for (var k = 0; k < allBtns.length; k++) {
      var oc = allBtns[k].getAttribute('onclick') || '';
      if (/,\s*this\s*,\s*true\b/.test(oc)) {
        correctLetter = allBtns[k].textContent.trim().substring(0, 1);
        break;
      }
    }
    WrongBook.record(quizId, {
      question: prompt ? prompt.textContent : quizId,
      correctAnswer: correctLetter,
      userAnswer: btn.textContent.trim().substring(0, 1),
      module: mod,
      chapter: mod + ' ' + quizId
    });
  } else if (isCorrect && typeof WrongBook !== 'undefined') {
    WrongBook.remove(quizId);
  }

  var fb = quiz.querySelector('.iq-feedback');
  if (!fb) {
    fb = document.createElement('div');
    fb.className = 'iq-feedback';
    quiz.appendChild(fb);
  }
  fb.innerHTML = (isCorrect
    ? '<strong style="color:var(--success)">✓ 正确！</strong> '
    : '<strong style="color:var(--error)">✗ 错误。</strong> ') + (feedback || '')
    + '<button class="iq-retry-btn" onclick="resetInlineQuiz(\'' + quizId + '\')">↺ 重做</button>';
  fb.classList.add('show');
}

/* ── Reset inline quiz ── */
function resetInlineQuiz(quizId) {
  var quiz = document.getElementById(quizId);
  var opts = quiz.querySelectorAll('.iq-options button');
  for (var i = 0; i < opts.length; i++) {
    opts[i].disabled = false;
    opts[i].classList.remove('correct', 'wrong');
  }
  var fb = quiz.querySelector('.iq-feedback');
  if (fb) fb.classList.remove('show');
}

/* ── Scroll spy for TOC sidebar ── */
function initScrollSpy() {
  var sections = document.querySelectorAll('.kp-section, .exercises-section');
  var links = document.querySelectorAll('.toc-list a');
  if (!sections.length || !links.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.id;
        for (var i = 0; i < links.length; i++) {
          links[i].classList.toggle('active', links[i].getAttribute('href') === '#' + id);
        }
      }
    });
  }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });

  for (var i = 0; i < sections.length; i++) observer.observe(sections[i]);
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', function () {
  initScrollSpy();
  if (typeof QUESTIONS !== 'undefined') {
    var zone = document.getElementById('quiz-zone');
    if (zone) renderQuiz(QUESTIONS, zone);
  }
  initWrongBook();
  initPageTransitions();
});

/* ═══════════════════════════════════════════
   错题本 UI
   ═════════════════════════════════════════ */
function initWrongBook() {
  if (typeof WrongBook === 'undefined') return;

  var fab = document.createElement('button');
  fab.className = 'wrong-book-fab';
  fab.title = '错题本';
  fab.innerHTML = '📋<span class="wrong-book-badge" id="wrong-book-badge">0</span>';
  fab.onclick = function () { toggleWrongBookPanel(); };
  document.body.appendChild(fab);

  var panel = document.createElement('div');
  panel.className = 'wrong-book-panel';
  panel.id = 'wrong-book-panel';
  panel.innerHTML =
    '<div class="wb-header"><h3>📋 错题本</h3></div>' +
    '<div class="wb-body" id="wrong-book-body"></div>' +
    '<div class="wb-footer">' +
      '<button class="wb-clear" onclick="WrongBook.clear();renderWrongBookList()">🗑 清空</button>' +
      '<button class="wb-close" onclick="toggleWrongBookPanel()">✕ 关闭</button>' +
    '</div>';
  document.body.appendChild(panel);

  WrongBook._updateBadge();
}

function toggleWrongBookPanel() {
  var panel = document.getElementById('wrong-book-panel');
  if (!panel) return;
  var isOpen = panel.classList.toggle('open');
  if (isOpen) renderWrongBookList();
}

function renderWrongBookList() {
  var body = document.getElementById('wrong-book-body');
  if (!body) return;
  var items = WrongBook.getAll();
  if (items.length === 0) {
    body.innerHTML = '<div class="wb-empty">🎉 暂无错题，继续保持！</div>';
    return;
  }
  body.innerHTML = items.map(function (item) {
    return '<div class="wb-item">' +
      '<div class="wb-item-header">' +
        '<span class="wb-item-count">× ' + item.count + '</span>' +
        '<span class="wb-item-chapter">' + escapeHtmlWb(item.chapter || item.module) + '</span>' +
        '<button class="wb-item-remove" onclick="WrongBook.remove(\'' + escapeAttrWb(item.id) + '\');renderWrongBookList()">✕</button>' +
      '</div>' +
      '<div class="wb-item-question">' + escapeHtmlWb(item.question) + '</div>' +
      '<div class="wb-item-answer">你的答案: <strong style="color:var(--error)">' + escapeHtmlWb(item.userAnswer) + '</strong> · 正确: <strong style="color:var(--success)">' + escapeHtmlWb(item.correctAnswer) + '</strong></div>' +
    '</div>';
  }).join('');
}

function escapeHtmlWb(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function escapeAttrWb(s) {
  return String(s).replace(/'/g,"\\'").replace(/"/g,'&quot;');
}

/* ═══════════════════════════════════════════
   Page Transitions
   ═════════════════════════════════════════ */
function initPageTransitions() {
  window.addEventListener('pageshow', function () {
    if (document.body.classList.contains('page-exit')) {
      document.body.classList.remove('page-exit');
      document.body.style.animation = 'none';
      void document.body.offsetHeight;
      document.body.style.animation = '';
    }
  });

  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href]');
    if (!link) return;
    var href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('javascript') || link.target === '_blank') return;
    if (href.startsWith('http') && !href.includes(location.host)) return;
    e.preventDefault();
    document.body.classList.add('page-exit');
    setTimeout(function () { window.location.href = href; }, 250);
  });
}
