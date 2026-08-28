/* 儿童防溺水安全教育H5 - 核心交互逻辑 v3.1 */
/* 新增：音效系统、形象化按钮、快问快答挑战、视觉化总结页 */
(function() {
'use strict';

/* ===== 音效系统 ===== */
var dingAudio = new Audio('audio/ding.mp3');
var buzzAudio = new Audio('audio/buzz.mp3');
var winAudio = new Audio('audio/win.mp3');

function playDing() { try { dingAudio.currentTime = 0; dingAudio.play().catch(function(){}); } catch(e) {} }
function playBuzz() { try { buzzAudio.currentTime = 0; buzzAudio.play().catch(function(){}); } catch(e) {} }
function playWin() { try { winAudio.currentTime = 0; winAudio.play().catch(function(){}); } catch(e) {} }

/* ===== 语音合成 - 童声优化 ===== */
var synth = window.speechSynthesis;
var currentVoice = null;

function initVoice() {
  if (!synth) return;
  var voices = synth.getVoices();
  for (var i = 0; i < voices.length; i++) {
    if (voices[i].lang.indexOf('zh') === 0) { currentVoice = voices[i]; break; }
  }
}
if (synth) {
  if (synth.onvoiceschanged !== undefined) { synth.onvoiceschanged = initVoice; }
  initVoice();
}

function speak(text) {
  if (!synth || !text) return;
  synth.cancel();
  var u = new SpeechSynthesisUtterance(text);
  u.lang = 'zh-CN'; u.rate = 1.15; u.pitch = 1.6; u.volume = 1.0;
  if (currentVoice) u.voice = currentVoice;
  synth.speak(u);
}

/* ===== 状态管理 ===== */
var state = {
  currentScene: 0, stars: 0,
  answered: [false,false,false,false,false,false],
  answeredCorrect: [false,false,false,false,false,false],
  showRescue: false, rescueAnswered: false,
  voiceEnabled: true, quizCompleted: false
};

/* ===== DOM 缓存 ===== */
var $ = function(id) { return document.getElementById(id); };
var $$ = function(sel) { return document.querySelectorAll(sel); };

/* ===== 工具函数 ===== */
function showPage(pageId) {
  $$('.page').forEach(function(p) { p.classList.remove('active'); });
  $(pageId).classList.add('active');
}
function showModal(modalId) { $(modalId).classList.add('show'); document.body.style.overflow = 'hidden'; }
function hideModal(modalId) { $(modalId).classList.remove('show'); document.body.style.overflow = ''; }
function formatDate() {
  var d = new Date();
  return d.getFullYear() + '.' + String(d.getMonth()+1).padStart(2,'0') + '.' + String(d.getDate()).padStart(2,'0');
}

function saveProgress() {
  var data = {
    currentScene: state.currentScene, stars: state.stars,
    answered: state.answered, answeredCorrect: state.answeredCorrect,
    showRescue: state.showRescue, rescueAnswered: state.rescueAnswered,
    quizCompleted: state.quizCompleted, timestamp: Date.now()
  };
  try { localStorage.setItem('drowning_h5_progress', JSON.stringify(data)); } catch(e) {}
}

function loadProgress() {
  try {
    var raw = localStorage.getItem('drowning_h5_progress');
    if (!raw) return false;
    var data = JSON.parse(raw);
    if (Date.now() - data.timestamp > 7 * 24 * 60 * 60 * 1000) {
      localStorage.removeItem('drowning_h5_progress'); return false;
    }
    state.currentScene = data.currentScene || 0;
    state.stars = data.stars || 0;
    state.answered = data.answered || [false,false,false,false,false,false];
    state.answeredCorrect = data.answeredCorrect || [false,false,false,false,false,false];
    state.showRescue = data.showRescue || false;
    state.rescueAnswered = data.rescueAnswered || false;
    state.quizCompleted = data.quizCompleted || false;
    return true;
  } catch(e) { return false; }
}

function clearProgress() {
  try { localStorage.removeItem('drowning_h5_progress'); } catch(e) {}
  state.currentScene = 0; state.stars = 0;
  state.answered = [false,false,false,false,false,false];
  state.answeredCorrect = [false,false,false,false,false,false];
  state.showRescue = false; state.rescueAnswered = false;
  state.quizCompleted = false;
  $('progress-fill').style.width = '0%';
  $('star-count').textContent = '0';
}

/* ===== 首页 ===== */
function checkProgress() {
  var hasProgress = loadProgress();
  var restartBtn = $('btn-restart');
  var restartModalBtn = $('btn-restart-modal');
  if (hasProgress && state.answered.some(function(a){return a;})) {
    if (restartBtn) restartBtn.style.display = 'block';
    if (restartModalBtn) restartModalBtn.style.display = 'block';
  } else {
    if (restartBtn) restartBtn.style.display = 'none';
    if (restartModalBtn) restartModalBtn.style.display = 'none';
  }
}

$('btn-start').addEventListener('click', function() { checkProgress(); showModal('modal-rules'); });
$('btn-restart').addEventListener('click', function() {
  if (confirm('确定要重新开始吗？之前的进度会清空哦！')) { clearProgress(); showModal('modal-rules'); }
});
$('btn-restart-modal').addEventListener('click', function() {
  if (confirm('确定要清除进度重新玩吗？')) {
    clearProgress(); hideModal('modal-rules'); showPage('page-loading');
    setTimeout(function() { showPage('page-game'); initGame(); }, 1500);
  }
});

/* ===== 规则弹窗 ===== */
$('btn-start-game').addEventListener('click', function() {
  hideModal('modal-rules'); showPage('page-loading');
  setTimeout(function() { showPage('page-game'); initGame(); }, 1500);
});

/* ===== 游戏初始化 ===== */
function initGame() { renderScene(state.currentScene); updateProgress(); updateStars(); }

/* ===== 渲染场景 ===== */
function renderScene(index) {
  var scene = TEXT.scenes[index]; if (!scene) return;
  $('scene-tag').textContent = '场景 ' + (index + 1);
  $('scene-name').textContent = scene.name;
  $('scene-img').src = scene.image; $('scene-img').alt = scene.name;
  $('scene-question').textContent = scene.question;
  $('wrong-icon').textContent = scene.wrongIcon || '🏃';
  $('right-icon').textContent = scene.rightIcon || '🧘';
  $('wrong-label').textContent = scene.wrongBtn.replace('❌ ', '');
  $('right-label').textContent = scene.rightBtn.replace('✅ ', '');
  renderDots(index);
  $('btn-prev').disabled = (index === 0);
  $('btn-next').disabled = (index === TEXT.scenes.length - 1);
  if (state.answered[index]) { markAnswered(index); } else { clearAnsweredMarks(); }
  if (state.voiceEnabled && scene.voiceQ) { setTimeout(function() { speak(scene.voiceQ); }, 500); }
}

function renderDots(activeIndex) {
  var dotsContainer = $('scene-dots'); dotsContainer.innerHTML = '';
  var total = TEXT.scenes.length;
  for (var i = 0; i < total; i++) {
    var dot = document.createElement('span');
    dot.className = 'scene-dot' + (i === activeIndex ? ' active' : '');
    dotsContainer.appendChild(dot);
  }
}

function markAnswered(index) {
  var isCorrect = state.answeredCorrect[index];
  if (isCorrect) { $('btn-right').style.opacity = '1'; $('btn-right').style.transform = 'scale(1.05)'; $('btn-wrong').style.opacity = '0.4'; }
  else { $('btn-wrong').style.opacity = '1'; $('btn-wrong').style.transform = 'scale(1.05)'; $('btn-right').style.opacity = '0.4'; }
}
function clearAnsweredMarks() {
  $('btn-wrong').style.opacity = '1'; $('btn-wrong').style.transform = '';
  $('btn-right').style.opacity = '1'; $('btn-right').style.transform = '';
}

function updateProgress() {
  var completed = state.answered.filter(function(a) { return a; }).length;
  $('progress-fill').style.width = ((completed / 6) * 100) + '%';
}
function updateStars() { $('star-count').textContent = state.stars; }

/* ===== 场景导航 ===== */
$('btn-prev').addEventListener('click', function() { if (state.currentScene > 0) { state.currentScene--; renderScene(state.currentScene); } });
$('btn-next').addEventListener('click', function() { if (state.currentScene < 5) { state.currentScene++; renderScene(state.currentScene); } });

/* ===== 卡牌滑动 ===== */
var touchStartX = 0;
$('scene-card').addEventListener('touchstart', function(e) { touchStartX = e.changedTouches[0].screenX; }, {passive: true});
$('scene-card').addEventListener('touchend', function(e) {
  var diff = touchStartX - e.changedTouches[0].screenX;
  if (Math.abs(diff) < 50) return;
  if (diff > 0 && state.currentScene < 5) { state.currentScene++; renderScene(state.currentScene); }
  else if (diff < 0 && state.currentScene > 0) { state.currentScene--; renderScene(state.currentScene); }
}, {passive: true});

/* ===== 答题逻辑 ===== */
$('btn-wrong').addEventListener('click', function() { handleAnswer(false); });
$('btn-right').addEventListener('click', function() { handleAnswer(true); });

function handleAnswer(isRight) {
  var sceneIndex = state.currentScene;
  var scene = TEXT.scenes[sceneIndex];
  state.answered[sceneIndex] = true;
  if (isRight && !state.answeredCorrect[sceneIndex]) { state.answeredCorrect[sceneIndex] = true; state.stars++; playDing(); }
  else { playBuzz(); }
  saveProgress(); updateProgress(); updateStars();
  showResult(isRight ? scene.right : scene.wrong, isRight);
}

function showResult(data, isRight) {
  var content = $('result-content');
  var icon = $('result-icon');
  var title = $('result-title');
  var text = $('result-text');
  var text2 = $('result-text2');
  var rules = $('result-rules');
  var ruleTitle = $('result-rule-title');
  var ruleList = $('result-rule-list');
  var btn = $('btn-result-continue');
  var voiceBtn = $('btn-voice');

  content.className = 'modal-content result-content ' + (isRight ? 'right' : 'wrong');
  icon.textContent = data.icon || (isRight ? '🌟' : '⚠️');
  title.textContent = data.title;
  text.textContent = data.content;
  text2.textContent = data.content2 || '';
  btn.textContent = data.btn;

  if (voiceBtn) {
    voiceBtn.style.display = (data.voice || data.voiceRule) ? 'flex' : 'none';
    voiceBtn.onclick = function() { if (data.voiceRule) speak(data.voiceRule); else if (data.voice) speak(data.voice); };
  }
  if (state.voiceEnabled && data.voice) { setTimeout(function() { speak(data.voice); }, 300); }
  if (data.ruleTitle && data.rules && data.rules.length > 0) {
    rules.style.display = 'block'; ruleTitle.textContent = data.ruleTitle; ruleList.innerHTML = '';
    data.rules.forEach(function(r) { var li = document.createElement('li'); li.innerHTML = r; ruleList.appendChild(li); });
  } else { rules.style.display = 'none'; }
  showModal('modal-result');
}

/* ===== 结果弹窗继续按钮 ===== */
$('btn-result-continue').addEventListener('click', function() {
  hideModal('modal-result');
  var allAnswered = state.answered.every(function(a) { return a; });
  if (allAnswered && !state.showRescue) { state.showRescue = true; saveProgress(); showRescueScene(); return; }
  if (allAnswered && state.showRescue && !state.rescueAnswered) { return; }
  if (allAnswered && state.rescueAnswered) {
    if (!state.quizCompleted) { showQuizChallenge(); }
    else { showSummary(); }
    return;
  }
  var nextUnanswered = -1;
  for (var i = state.currentScene + 1; i < 6; i++) { if (!state.answered[i]) { nextUnanswered = i; break; } }
  if (nextUnanswered !== -1) { state.currentScene = nextUnanswered; }
  else { for (var j = 0; j < 6; j++) { if (!state.answered[j]) { state.currentScene = j; break; } } }
  renderScene(state.currentScene);
});

/* ===== 彩蛋场景 ===== */
function showRescueScene() {
  var r = TEXT.rescueScene;
  $('scene-tag').textContent = '特别关卡';
  $('scene-name').textContent = r.name;
  $('scene-img').src = 'images/scene4.png';
  $('scene-question').textContent = r.question;
  $('wrong-icon').textContent = r.wrongIcon || '🖐️';
  $('right-icon').textContent = r.rightIcon || '📢';
  $('wrong-label').textContent = r.wrongBtn.replace('❌ ', '');
  $('right-label').textContent = r.rightBtn.replace('✅ ', '');
  $('btn-prev').disabled = true; $('btn-next').disabled = true;
  $('scene-dots').innerHTML = '<span class="scene-dot" style="width:30px;background:var(--accent)"></span>';
  var rescueAnswered = false;
  $('btn-wrong').addEventListener('click', function onWrong() { if (rescueAnswered) return; rescueAnswered = true; handleRescueAnswer(false); });
  $('btn-right').addEventListener('click', function onRight() { if (rescueAnswered) return; rescueAnswered = true; handleRescueAnswer(true); });
  if (state.voiceEnabled && r.voiceQ) { setTimeout(function() { speak(r.voiceQ); }, 500); }
}

function handleRescueAnswer(isRight) {
  state.rescueAnswered = true; saveProgress();
  var r = TEXT.rescueScene;
  if (isRight) { playDing(); } else { playBuzz(); }
  showResult(isRight ? r.right : r.wrong, isRight);
  var btn = $('btn-result-continue');
  var newBtn = btn.cloneNode(true);
  btn.parentNode.replaceChild(newBtn, btn);
  newBtn.addEventListener('click', function() {
    hideModal('modal-result');
    if (!state.quizCompleted) { showQuizChallenge(); }
    else { showSummary(); }
  });
}

/* ===== 快问快答挑战 ===== */
var quizQuestions = [];
var quizCurrent = 0;
var quizScore = 0;
var quizAnswered = false;

function showQuizChallenge() {
  showPage('page-quiz');
  var allQ = TEXT.quizChallenge.questions.slice();
  /* 随机选6题 */
  allQ.sort(function() { return Math.random() - 0.5; });
  quizQuestions = allQ.slice(0, 6);
  quizCurrent = 0; quizScore = 0; quizAnswered = false;
  renderQuizQuestion();
  if (state.voiceEnabled) { setTimeout(function() { speak(TEXT.quizChallenge.voiceStart); }, 500); }
}

function renderQuizQuestion() {
  var q = quizQuestions[quizCurrent];
  $('quiz-icon').textContent = q.icon;
  $('quiz-question').textContent = q.text;
  $('quiz-count').textContent = '第 ' + (quizCurrent + 1) + ' / 6 题';
  $('quiz-progress-fill').style.width = ((quizCurrent / 6) * 100) + '%';
  $('quiz-feedback').textContent = '';
  $('quiz-feedback').className = 'quiz-feedback';
  $('quiz-card').className = 'quiz-card';
  $('quiz-hint').textContent = '👆 点击下面的按钮判断';
  $('quiz-actions').style.display = 'flex';
  $('quiz-next').style.display = 'none';
  quizAnswered = false;
  if (state.voiceEnabled && q.voice) { setTimeout(function() { speak(q.voice); }, 400); }
}

$('btn-quiz-safe').addEventListener('click', function() { handleQuizAnswer(true); });
$('btn-quiz-danger').addEventListener('click', function() { handleQuizAnswer(false); });

function handleQuizAnswer(answeredSafe) {
  if (quizAnswered) return;
  quizAnswered = true;
  var q = quizQuestions[quizCurrent];
  var isCorrect = (answeredSafe === q.isSafe);
  var card = $('quiz-card');
  var feedback = $('quiz-feedback');
  var hint = $('quiz-hint');

  if (isCorrect) {
    quizScore++;
    card.classList.add('correct');
    feedback.textContent = TEXT.quizChallenge.labelSafe;
    feedback.className = 'quiz-feedback correct';
    playDing();
    if (state.voiceEnabled) { speak(TEXT.quizChallenge.voiceCorrect); }
  } else {
    card.classList.add('wrong');
    feedback.textContent = q.isSafe ? TEXT.quizChallenge.labelSafe : TEXT.quizChallenge.labelDanger;
    feedback.className = 'quiz-feedback wrong';
    playBuzz();
    if (state.voiceEnabled) { speak(TEXT.quizChallenge.voiceWrong); }
  }

  hint.textContent = isCorrect ? '✨ 答对啦！' : '💡 记住这个安全知识哦！';
  $('quiz-actions').style.display = 'none';

  if (quizCurrent < 5) {
    $('quiz-next').style.display = 'block';
    $('btn-quiz-next').textContent = TEXT.quizChallenge.btnNext;
    $('btn-quiz-next').onclick = function() { quizCurrent++; renderQuizQuestion(); };
  } else {
    $('quiz-next').style.display = 'block';
    $('btn-quiz-next').textContent = TEXT.quizChallenge.btnFinish;
    $('btn-quiz-next').onclick = function() {
      state.quizCompleted = true; saveProgress();
      playWin();
      if (state.voiceEnabled) { speak(TEXT.quizChallenge.voiceFinish); }
      showSummary();
    };
  }
}

/* 返回首页 */
$('btn-quiz-home').addEventListener('click', function() {
  if (confirm('确定要返回首页吗？当前挑战进度会保留。')) { showPage('page-home'); }
});

/* ===== 总结页 ===== */
function showSummary() {
  showPage('page-summary'); playWin();
  var tipsContainer = $('parent-tips'); tipsContainer.innerHTML = '';
  TEXT.summary.parentTips.forEach(function(tip) {
    var div = document.createElement('div');
    div.className = 'parent-tip-card';
    div.innerHTML = '<div class="parent-tip-icon">' + (tip.icon || '💡') + '</div>' +
      '<div class="parent-tip-text"><h4>' + tip.title + '</h4><p>' + tip.desc + '</p></div>';
    tipsContainer.appendChild(div);
  });
  var starEls = document.querySelectorAll('.big-star');
  starEls.forEach(function(s, i) { setTimeout(function() { if (i < state.stars) s.classList.add('lit'); }, i * 150); });
  if (state.voiceEnabled) { setTimeout(function() { speak('恭喜你成为安全小卫士！你真棒！'); }, 800); }
}

/* ===== 证书页 ===== */
$('btn-cert').addEventListener('click', function() { showPage('page-certificate'); $('cert-date').textContent = formatDate(); });
$('btn-back-summary').addEventListener('click', function() { showPage('page-summary'); });
$('btn-save-cert').addEventListener('click', generateCertificate);
$('btn-share-cert').addEventListener('click', sharePage);

function generateCertificate() {
  var name = $('cert-name-input').value.trim() || '小朋友';
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var w = 720; var h = 1080;
  canvas.width = w; canvas.height = h;
  var bgImg = new Image();
  bgImg.crossOrigin = 'anonymous';
  bgImg.onload = function() {
    ctx.drawImage(bgImg, 0, 0, w, h);
    ctx.textAlign = 'center'; ctx.font = '120px sans-serif'; ctx.fillText('🏆', w/2, 220);
    ctx.fillStyle = '#2C5F7C'; ctx.font = 'bold 52px sans-serif'; ctx.fillText('安全小卫士', w/2, 320);
    ctx.font = '24px sans-serif'; ctx.fillStyle = '#888'; ctx.fillText('荣誉称号', w/2, 360);
    ctx.fillStyle = '#333'; ctx.font = 'bold 48px sans-serif'; ctx.fillText(name, w/2, 480);
    ctx.font = '22px sans-serif'; ctx.fillStyle = '#666'; ctx.fillText('小朋友完成全部水域安全学习', w/2, 530);
    ctx.font = '48px sans-serif'; ctx.fillText('⭐⭐⭐⭐⭐⭐', w/2, 620);
    ctx.fillStyle = '#999'; ctx.font = '20px sans-serif';
    ctx.fillText(formatDate(), w/2, 920); ctx.fillText('亲子安全教育公益课堂', w/2, 960);
    var link = document.createElement('a');
    link.download = name + '_安全小卫士奖状.png'; link.href = canvas.toDataURL('image/png'); link.click();
    alert('奖状已保存！');
  };
  bgImg.onerror = function() {
    ctx.fillStyle = '#FFF8E1'; ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#D4AF37'; ctx.lineWidth = 10; ctx.strokeRect(30, 30, w-60, h-60);
    ctx.textAlign = 'center'; ctx.font = '120px sans-serif'; ctx.fillText('🏆', w/2, 220);
    ctx.fillStyle = '#2C5F7C'; ctx.font = 'bold 52px sans-serif'; ctx.fillText('安全小卫士', w/2, 320);
    ctx.font = '24px sans-serif'; ctx.fillStyle = '#888'; ctx.fillText('荣誉称号', w/2, 360);
    ctx.fillStyle = '#333'; ctx.font = 'bold 48px sans-serif'; ctx.fillText(name, w/2, 480);
    ctx.font = '22px sans-serif'; ctx.fillStyle = '#666'; ctx.fillText('小朋友完成全部水域安全学习', w/2, 530);
    ctx.font = '48px sans-serif'; ctx.fillText('⭐⭐⭐⭐⭐⭐', w/2, 620);
    ctx.fillStyle = '#999'; ctx.font = '20px sans-serif';
    ctx.fillText(formatDate(), w/2, 920); ctx.fillText('亲子安全教育公益课堂', w/2, 960);
    var link = document.createElement('a');
    link.download = name + '_安全小卫士奖状.png'; link.href = canvas.toDataURL('image/png'); link.click();
    alert('奖状已保存！');
  };
  bgImg.src = 'images/certificate-bg.png';
}

/* ===== 分享页 ===== */
$('btn-share-summary').addEventListener('click', function() { showPage('page-share'); });
$('btn-share-now').addEventListener('click', sharePage);
$('btn-back-home').addEventListener('click', function() { showPage('page-home'); });

function sharePage() {
  if (navigator.share) {
    navigator.share({ title: TEXT.shareConfig.title, text: TEXT.shareConfig.desc, url: window.location.href }).catch(function() {});
    return;
  }
  if (navigator.clipboard) {
    navigator.clipboard.writeText(window.location.href).then(function() { alert('链接已复制，快去分享给家长群吧！'); }).catch(fallbackShare);
  } else { fallbackShare(); }
}
function fallbackShare() {
  var input = document.createElement('input'); input.value = window.location.href;
  document.body.appendChild(input); input.select(); document.execCommand('copy'); document.body.removeChild(input);
  alert('链接已复制，快去分享给家长群吧！');
}

/* ===== 初始化 ===== */
function init() { loadProgress(); }
init();

})();
