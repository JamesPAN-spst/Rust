document.addEventListener('DOMContentLoaded', () => {
    initCollapsibles();
    initQuizzes();
    initSidebar();
    initActiveLinks();
});

function initCollapsibles() {
    document.querySelectorAll('.collapsible-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const content = trigger.nextElementSibling;
            if (content) content.classList.toggle('show');
        });
    });
}

function initQuizzes() {
    document.querySelectorAll('.quick-quiz').forEach(quiz => {
        const answer = quiz.dataset.answer;
        const explanation = quiz.dataset.explanation || '';
        const feedback = quiz.querySelector('.quiz-feedback');
        let locked = false;

        quiz.querySelectorAll('.quiz-options label').forEach(label => {
            const input = label.querySelector('input');
            label.addEventListener('click', () => {
                if (!input || locked) return;
                locked = true;
                input.checked = true;

                quiz.querySelectorAll('.quiz-options label').forEach(option => {
                    const optionInput = option.querySelector('input');
                    if (!optionInput) return;
                    optionInput.disabled = true;
                    if (optionInput.value === answer) option.classList.add('correct');
                    if (optionInput.value === input.value && input.value !== answer) option.classList.add('incorrect');
                });

                if (!feedback) return;
                const correct = input.value === answer;
                feedback.className = 'quiz-feedback ' + (correct ? 'correct' : 'incorrect');
                feedback.innerHTML = correct
                    ? '✅ 正确。' + (explanation ? '<br>' + explanation : '')
                    : '❌ 不对，正确答案是 ' + answer + '。' + (explanation ? '<br>' + explanation : '');
            });
        });
    });
}

function initSidebar() {
    const toggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');
    if (!toggle || !sidebar) return;
    toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
    if (content) content.addEventListener('click', () => sidebar.classList.remove('open'));
}

function initActiveLinks() {
    const current = window.location.pathname;
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && current.endsWith(href.replace(/^\.\//, ''))) link.classList.add('active');
    });
}
