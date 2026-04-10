/* ============================================
   math_univers 学习平台 - 主交互脚本
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initCollapsibles();
    initQuizzes();
    initSidebarToggle();
    initSidebarActiveState();
    initKaTeX();
});

/* --- 折叠答案块 --- */
function initCollapsibles() {
    const triggers = document.querySelectorAll('.collapsible-trigger');
    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const content = trigger.nextElementSibling;
            if (!content || !content.classList.contains('collapsible-content')) return;

            trigger.classList.toggle('active');
            content.classList.toggle('show');
        });
    });
}

/* --- 快速测试组件 --- */
function initQuizzes() {
    const quizzes = document.querySelectorAll('.quick-quiz');
    quizzes.forEach(quiz => {
        const correctAnswer = quiz.dataset.answer;
        const options = quiz.querySelectorAll('.quiz-options label');
        const feedback = quiz.querySelector('.quiz-feedback');
        const explanation = quiz.dataset.explanation || '';
        let answered = false;

        options.forEach(label => {
            const radio = label.querySelector('input[type="radio"]');
            if (!radio) return;

            label.addEventListener('click', () => {
                if (answered) return;
                answered = true;

                // 标记选中状态
                radio.checked = true;

                const selected = radio.value;
                const isCorrect = selected === correctAnswer;

                // 高亮正确和错误选项
                options.forEach(opt => {
                    const optRadio = opt.querySelector('input[type="radio"]');
                    if (!optRadio) return;
                    optRadio.disabled = true;

                    if (optRadio.value === correctAnswer) {
                        opt.classList.add('correct');
                    } else if (optRadio.value === selected && !isCorrect) {
                        opt.classList.add('incorrect');
                    }
                });

                // 显示反馈
                if (feedback) {
                    feedback.className = 'quiz-feedback ' + (isCorrect ? 'correct' : 'incorrect');
                    if (isCorrect) {
                        feedback.innerHTML = '✅ 正确！' + (explanation ? '<br>' + explanation : '');
                    } else {
                        feedback.innerHTML = '❌ 错误。正确答案是 ' + correctAnswer + '。' +
                            (explanation ? '<br>' + explanation : '');
                    }
                }
            });
        });
    });
}

/* --- 侧边栏切换（移动端） --- */
function initSidebarToggle() {
    const toggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    if (!toggle || !sidebar) return;

    toggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    // 点击内容区关闭侧边栏
    const content = document.querySelector('.content');
    if (content) {
        content.addEventListener('click', () => {
            sidebar.classList.remove('open');
        });
    }
}

/* --- 侧边栏当前页高亮 --- */
function initSidebarActiveState() {
    const links = document.querySelectorAll('.sidebar-nav a');
    const currentPath = window.location.pathname;

    links.forEach(link => {
        if (link.getAttribute('href') && currentPath.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });
}

/* --- KaTeX 自动渲染 --- */
function initKaTeX() {
    // 渲染行内公式 —— 使用 class="katex-inline"
    const inlineElements = document.querySelectorAll('.katex-inline');
    inlineElements.forEach(el => {
        try {
            if (typeof katex !== 'undefined') {
                katex.render(el.textContent, el, {
                    throwOnError: false,
                    displayMode: false
                });
            }
        } catch (e) {
            console.warn('KaTeX inline render error:', e);
        }
    });

    // 渲染块级公式 —— 使用 class="katex-display"
    const displayElements = document.querySelectorAll('.katex-display');
    displayElements.forEach(el => {
        try {
            if (typeof katex !== 'undefined') {
                katex.render(el.textContent, el, {
                    throwOnError: false,
                    displayMode: true
                });
            }
        } catch (e) {
            console.warn('KaTeX display render error:', e);
        }
    });
}
