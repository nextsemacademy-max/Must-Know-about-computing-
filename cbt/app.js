/**
 * Computer-Based Test (CBT) Application Logic
 * Standard Examination Engine with Timer, Navigation Matrix, Real-time Autosave & Detailed Analytics.
 */

(function () {
  'use strict';

  // Constants
  const STORAGE_KEY = 'CBT_EXAM_STATE_V1';
  const TOTAL_QUESTIONS = CBT_QUESTIONS.length; // 100
  const DEFAULT_DURATION_SECONDS = 90 * 60; // 90 minutes

  // Application State
  const state = {
    currentIndex: 0,
    answers: {},            // questionId -> selectedOptionIndex (0..3)
    markedForReview: {},    // questionId -> boolean
    visited: {},           // questionId -> boolean
    timeRemaining: DEFAULT_DURATION_SECONDS,
    isSubmitted: false,
    examMode: 'exam',      // 'exam' | 'practice'
    categoryFilter: 'ALL',
    fontSizeScale: 1.0,
    soundEnabled: true,
    startTime: Date.now(),
    endTime: null,
  };

  // Web Audio Synthesizer for subtle tactile feedback
  const audioCtx = (window.AudioContext || window.webkitAudioContext) ? new (window.AudioContext || window.webkitAudioContext)() : null;

  function playSound(type) {
    if (!state.soundEnabled || !audioCtx) return;
    try {
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      const now = audioCtx.currentTime;

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'select') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(554.37, now + 0.08);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.1);
        osc.frequency.setValueAtTime(783.99, now + 0.2);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      }
    } catch (e) {
      // Audio not permitted or failed silently
    }
  }

  // Firebase Configuration (NextSem CS-Guide ignou-study-notes-by-nextsem)
  const firebaseConfig = {
    apiKey: "AIzaSyDBoWw_8QOA_S_UfTRQQcNc-CGLBbctMAQ",
    authDomain: "ignou-study-notes-by-nextsem.firebaseapp.com",
    projectId: "ignou-study-notes-by-nextsem",
    storageBucket: "ignou-study-notes-by-nextsem.firebasestorage.app",
    messagingSenderId: "498697546118",
    appId: "1:498697546118:web:4630ab76b34fcc3d83a407",
    measurementId: "G-HT7CETXT6J"
  };

  let auth = null;
  let db = null;
  let currentUser = null;
  let evaluatedScoreData = null;

  try {
    if (typeof firebase !== 'undefined') {
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      auth = firebase.auth();
      db = firebase.firestore();
    }
  } catch (fbInitErr) {
    console.warn("Firebase initialization deferred:", fbInitErr);
  }

  // DOM Elements
  const elements = {
    // Header & Meta
    timerDisplay: document.getElementById('timer-display'),
    timerCard: document.getElementById('timer-card'),
    modeBadgeText: document.getElementById('mode-badge-text'),
    toggleModeBtn: document.getElementById('btn-toggle-mode'),
    themeToggleBtn: document.getElementById('btn-theme-toggle'),
    fullscreenBtn: document.getElementById('btn-fullscreen'),
    soundToggleBtn: document.getElementById('btn-sound-toggle'),
    fontDecBtn: document.getElementById('btn-font-dec'),
    fontIncBtn: document.getElementById('btn-font-inc'),
    btnHeaderAuth: document.getElementById('btn-header-auth'),
    headerAuthLabel: document.getElementById('header-auth-label'),

    // Main Test Arena
    questionStage: document.getElementById('question-stage'),
    categoryTag: document.getElementById('category-tag'),
    subtopicTag: document.getElementById('subtopic-tag'),
    questionNumberTag: document.getElementById('question-number-tag'),
    questionText: document.getElementById('question-text'),
    optionsContainer: document.getElementById('options-container'),
    flagBtn: document.getElementById('btn-flag'),
    practiceExplanationCard: document.getElementById('practice-explanation-card'),
    practiceExplanationText: document.getElementById('practice-explanation-text'),

    // Navigation Buttons
    prevBtn: document.getElementById('btn-prev'),
    nextBtn: document.getElementById('btn-next'),
    clearBtn: document.getElementById('btn-clear'),
    reviewBtn: document.getElementById('btn-review'),
    submitTestBtn: document.getElementById('btn-submit-test'),

    // Sidebar Palette & Candidate
    answeredCount: document.getElementById('count-answered'),
    notAnsweredCount: document.getElementById('count-not-answered'),
    markedCount: document.getElementById('count-marked'),
    markedAnsweredCount: document.getElementById('count-marked-answered'),
    notVisitedCount: document.getElementById('count-not-visited'),
    categoryFilterSelect: document.getElementById('category-filter-select'),
    questionsMatrix: document.getElementById('questions-matrix'),
    candidateCard: document.getElementById('candidate-card'),
    candidateAvatar: document.getElementById('candidate-avatar'),
    candidateName: document.getElementById('candidate-name'),
    candidateId: document.getElementById('candidate-id'),

    // Confirmation Modal
    submitModal: document.getElementById('submit-modal'),
    modalAnswered: document.getElementById('modal-answered'),
    modalNotAnswered: document.getElementById('modal-not-answered'),
    modalMarked: document.getElementById('modal-marked'),
    modalNotVisited: document.getElementById('modal-not-visited'),
    btnCancelSubmit: document.getElementById('btn-cancel-submit'),
    btnConfirmSubmit: document.getElementById('btn-confirm-submit'),

    // Results View
    resultsContainer: document.getElementById('results-container'),
    scoreNumber: document.getElementById('score-number'),
    scoreBadge: document.getElementById('score-badge'),
    accuracyVal: document.getElementById('accuracy-val'),
    attemptedVal: document.getElementById('attempted-val'),
    timeSpentVal: document.getElementById('time-spent-val'),
    categoryProgressList: document.getElementById('category-progress-list'),
    reviewList: document.getElementById('review-list'),
    btnRetake: document.getElementById('btn-retake'),
    btnPrintReport: document.getElementById('btn-print-report'),
    btnExportJson: document.getElementById('btn-export-json'),
    reviewFilterChips: document.querySelectorAll('.filter-chip'),

    // CS-Guide Google Cloud Sync Elements
    csGuideSyncCard: document.getElementById('cs-guide-sync-card'),
    syncStatusBadge: document.getElementById('sync-status-badge'),
    syncStatusText: document.getElementById('sync-status-text'),
    syncUnauthBox: document.getElementById('sync-unauth-box'),
    btnGoogleSync: document.getElementById('btn-google-sync'),
    syncAuthBox: document.getElementById('sync-auth-box'),
    userAvatar: document.getElementById('user-avatar'),
    userDisplayName: document.getElementById('user-display-name'),
    userEmail: document.getElementById('user-email'),
    btnManualSync: document.getElementById('btn-manual-sync'),
    linkCsGuideProfile: document.getElementById('link-csguide-profile'),
    btnGoogleSignOut: document.getElementById('btn-google-signout'),
    syncNotification: document.getElementById('sync-notification')
  };

  // State Persistence
  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        currentIndex: state.currentIndex,
        answers: state.answers,
        markedForReview: state.markedForReview,
        visited: state.visited,
        timeRemaining: state.timeRemaining,
        isSubmitted: state.isSubmitted,
        examMode: state.examMode,
        startTime: state.startTime,
        endTime: state.endTime
      }));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  }

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        state.currentIndex = parsed.currentIndex || 0;
        state.answers = parsed.answers || {};
        state.markedForReview = parsed.markedForReview || {};
        state.visited = parsed.visited || {};
        state.timeRemaining = typeof parsed.timeRemaining === 'number' ? parsed.timeRemaining : DEFAULT_DURATION_SECONDS;
        state.isSubmitted = !!parsed.isSubmitted;
        state.examMode = parsed.examMode || 'exam';
        state.startTime = parsed.startTime || Date.now();
        state.endTime = parsed.endTime || null;
      }
    } catch (e) {
      console.warn('Failed to parse saved state:', e);
    }
  }

  // Timer Management
  let timerInterval = null;

  function startTimer() {
    clearInterval(timerInterval);
    updateTimerDisplay();

    timerInterval = setInterval(() => {
      if (state.isSubmitted) {
        clearInterval(timerInterval);
        return;
      }

      if (state.timeRemaining > 0) {
        state.timeRemaining--;
        updateTimerDisplay();
        if (state.timeRemaining % 10 === 0) {
          saveState();
        }
      } else {
        clearInterval(timerInterval);
        autoSubmitTest();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const hours = Math.floor(state.timeRemaining / 3600);
    const minutes = Math.floor((state.timeRemaining % 3600) / 60);
    const seconds = state.timeRemaining % 60;

    const pad = (n) => String(n).padStart(2, '0');
    elements.timerDisplay.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

    if (state.timeRemaining <= 300) {
      elements.timerCard.classList.add('warning');
    } else {
      elements.timerCard.classList.remove('warning');
    }
  }

  function autoSubmitTest() {
    alert('Time has expired! Submitting your test automatically.');
    finishTest();
  }

  // Question Status Helper
  function getQuestionStatus(qId) {
    const isAnswered = state.answers[qId] !== undefined;
    const isMarked = !!state.markedForReview[qId];
    const isVisited = !!state.visited[qId];

    if (isMarked && isAnswered) return 'marked-answered';
    if (isMarked) return 'marked';
    if (isAnswered) return 'answered';
    if (isVisited) return 'not-answered';
    return 'not-visited';
  }

  // Render Functions
  function renderCurrentQuestion() {
    const q = CBT_QUESTIONS[state.currentIndex];
    state.visited[q.id] = true;

    // Meta Tags
    elements.categoryTag.textContent = q.category;
    elements.subtopicTag.textContent = q.subtopic ? `• ${q.subtopic}` : '';
    elements.questionNumberTag.textContent = `Q ${state.currentIndex + 1} / ${TOTAL_QUESTIONS}`;
    elements.questionText.textContent = q.question;

    // Flag button state
    const isMarked = !!state.markedForReview[q.id];
    if (isMarked) {
      elements.flagBtn.classList.add('active');
      elements.flagBtn.innerHTML = `<span>★</span> Marked for Review`;
    } else {
      elements.flagBtn.classList.remove('active');
      elements.flagBtn.innerHTML = `<span>☆</span> Mark for Review`;
    }

    // Options rendering
    elements.optionsContainer.innerHTML = '';
    const selectedOption = state.answers[q.id];

    q.options.forEach((optText, optIdx) => {
      const optionItem = document.createElement('div');
      optionItem.className = 'option-item';
      if (selectedOption === optIdx) {
        optionItem.classList.add('selected');
      }

      const keyLabel = ['A', 'B', 'C', 'D'][optIdx];

      optionItem.innerHTML = `
        <div class="option-marker">${keyLabel}</div>
        <div class="option-label-text">${optText}</div>
        <span class="option-key-hint">Key ${optIdx + 1}</span>
      `;

      optionItem.addEventListener('click', () => {
        selectOption(optIdx);
      });

      elements.optionsContainer.appendChild(optionItem);
    });

    // Navigation buttons state
    elements.prevBtn.disabled = state.currentIndex === 0;
    elements.nextBtn.textContent = state.currentIndex === TOTAL_QUESTIONS - 1 ? 'Save & Finish' : 'Save & Next →';

    // Practice mode explanation
    if (state.examMode === 'practice' && selectedOption !== undefined) {
      elements.practiceExplanationCard.classList.add('active');
      const isCorrect = selectedOption === q.correct;
      elements.practiceExplanationText.innerHTML = `
        <strong style="color: ${isCorrect ? 'var(--status-answered)' : 'var(--status-not-answered)'}">
          ${isCorrect ? '✓ Correct Answer!' : '✗ Incorrect Selection.'}
        </strong> Correct Answer: <strong>Option ${['A','B','C','D'][q.correct]}: ${q.options[q.correct]}</strong>
        <p style="margin-top: 0.5rem;">${q.explanation}</p>
      `;
    } else {
      elements.practiceExplanationCard.classList.remove('active');
    }

    updateSidebarCounters();
    updateMatrixPalette();
    saveState();
  }

  function selectOption(optIndex) {
    const q = CBT_QUESTIONS[state.currentIndex];
    state.answers[q.id] = optIndex;
    playSound('select');
    renderCurrentQuestion();
  }

  function clearResponse() {
    const q = CBT_QUESTIONS[state.currentIndex];
    if (state.answers[q.id] !== undefined) {
      delete state.answers[q.id];
      playSound('click');
      renderCurrentQuestion();
    }
  }

  function toggleMarkForReview() {
    const q = CBT_QUESTIONS[state.currentIndex];
    if (state.markedForReview[q.id]) {
      delete state.markedForReview[q.id];
    } else {
      state.markedForReview[q.id] = true;
    }
    playSound('click');
    renderCurrentQuestion();
  }

  function handleSaveAndNext() {
    playSound('click');
    if (state.currentIndex < TOTAL_QUESTIONS - 1) {
      state.currentIndex++;
      renderCurrentQuestion();
    } else {
      openSubmitModal();
    }
  }

  function handlePrev() {
    if (state.currentIndex > 0) {
      playSound('click');
      state.currentIndex--;
      renderCurrentQuestion();
    }
  }

  function handleMarkAndNext() {
    const q = CBT_QUESTIONS[state.currentIndex];
    state.markedForReview[q.id] = true;
    playSound('click');
    if (state.currentIndex < TOTAL_QUESTIONS - 1) {
      state.currentIndex++;
      renderCurrentQuestion();
    } else {
      openSubmitModal();
    }
  }

  // Sidebar Tally Matrix
  function updateSidebarCounters() {
    let answered = 0;
    let notAnswered = 0;
    let marked = 0;
    let markedAnswered = 0;
    let notVisited = 0;

    CBT_QUESTIONS.forEach(q => {
      const status = getQuestionStatus(q.id);
      if (status === 'answered') answered++;
      else if (status === 'not-answered') notAnswered++;
      else if (status === 'marked') marked++;
      else if (status === 'marked-answered') markedAnswered++;
      else if (status === 'not-visited') notVisited++;
    });

    elements.answeredCount.textContent = answered;
    elements.notAnsweredCount.textContent = notAnswered;
    elements.markedCount.textContent = marked;
    elements.markedAnsweredCount.textContent = markedAnswered;
    elements.notVisitedCount.textContent = notVisited;
  }

  function updateMatrixPalette() {
    elements.questionsMatrix.innerHTML = '';
    const filter = state.categoryFilter;

    CBT_QUESTIONS.forEach((q, idx) => {
      if (filter !== 'ALL' && q.category !== filter) {
        return;
      }

      const status = getQuestionStatus(q.id);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `matrix-btn ${status}`;
      if (idx === state.currentIndex) {
        btn.classList.add('current');
      }
      btn.textContent = idx + 1;
      btn.title = `Question ${idx + 1} (${q.category}) - ${status.replace('-', ' ')}`;

      btn.addEventListener('click', () => {
        playSound('click');
        state.currentIndex = idx;
        renderCurrentQuestion();
      });

      elements.questionsMatrix.appendChild(btn);
    });
  }

  // Modal Handlers
  function openSubmitModal() {
    let answered = 0;
    let notAnswered = 0;
    let marked = 0;
    let notVisited = 0;

    CBT_QUESTIONS.forEach(q => {
      const status = getQuestionStatus(q.id);
      if (status === 'answered' || status === 'marked-answered') answered++;
      if (status === 'not-answered') notAnswered++;
      if (status === 'marked' || status === 'marked-answered') marked++;
      if (status === 'not-visited') notVisited++;
    });

    elements.modalAnswered.textContent = answered;
    elements.modalNotAnswered.textContent = notAnswered;
    elements.modalMarked.textContent = marked;
    elements.modalNotVisited.textContent = notVisited;

    elements.submitModal.classList.add('active');
  }

  function closeSubmitModal() {
    elements.submitModal.classList.remove('active');
  }

  function finishTest() {
    closeSubmitModal();
    clearInterval(timerInterval);
    state.isSubmitted = true;
    state.endTime = Date.now();
    saveState();
    playSound('success');

    // Switch view
    document.querySelector('.cbt-main-content').style.display = 'none';
    elements.resultsContainer.classList.add('active');

    // Update Header Status
    if (elements.modeBadgeText) {
      elements.modeBadgeText.textContent = 'Exam Completed & Evaluated';
    }
    const elapsedSecs = DEFAULT_DURATION_SECONDS - state.timeRemaining;
    const elapsedMins = Math.floor(elapsedSecs / 60);
    const elapsedRemSecs = elapsedSecs % 60;
    if (elements.timerDisplay) {
      elements.timerDisplay.textContent = `Completed (${elapsedMins}m ${elapsedRemSecs}s)`;
    }

    // Scroll to Top immediately so score is visible
    window.scrollTo({ top: 0, behavior: 'smooth' });

    renderResults();

    // Auto-sync score if user is already signed in
    if (currentUser) {
      syncScoreToFirestore(currentUser);
    }
  }

  // Results & Analytics
  function renderResults() {
    let correctCount = 0;
    let attemptedCount = 0;
    const categoryStats = {};

    CBT_QUESTIONS.forEach(q => {
      if (!categoryStats[q.category]) {
        categoryStats[q.category] = { total: 0, correct: 0, attempted: 0 };
      }
      categoryStats[q.category].total++;

      const userAns = state.answers[q.id];
      if (userAns !== undefined) {
        attemptedCount++;
        categoryStats[q.category].attempted++;
        if (userAns === q.correct) {
          correctCount++;
          categoryStats[q.category].correct++;
        }
      }
    });

    const score = correctCount;
    const percentage = ((score / TOTAL_QUESTIONS) * 100).toFixed(1);
    const accuracy = attemptedCount > 0 ? ((correctCount / attemptedCount) * 100).toFixed(1) : 0;
    const timeSpentSeconds = DEFAULT_DURATION_SECONDS - state.timeRemaining;
    const minsSpent = Math.floor(timeSpentSeconds / 60);
    const secsSpent = timeSpentSeconds % 60;

    // Display Hero Score
    elements.scoreNumber.textContent = score;
    elements.scoreBadge.textContent = score >= 60 ? 'PASSED (PROMOTED)' : 'NEEDS PRACTICE';
    elements.scoreBadge.className = `score-badge-status ${score >= 60 ? 'pass' : 'fail'}`;

    elements.accuracyVal.textContent = `${accuracy}%`;
    elements.attemptedVal.textContent = `${attemptedCount} / ${TOTAL_QUESTIONS}`;
    elements.timeSpentVal.textContent = `${minsSpent}m ${secsSpent}s`;

    // Render Category Breakdown Bars
    elements.categoryProgressList.innerHTML = '';
    Object.keys(categoryStats).forEach(cat => {
      const stat = categoryStats[cat];
      const catPct = ((stat.correct / stat.total) * 100).toFixed(0);

      const row = document.createElement('div');
      row.className = 'category-bar-row';
      row.innerHTML = `
        <div class="category-bar-header">
          <span>${cat}</span>
          <span><strong>${stat.correct} / ${stat.total}</strong> (${catPct}%)</span>
        </div>
        <div class="category-progress-track">
          <div class="category-progress-fill" style="width: ${catPct}%"></div>
        </div>
      `;
      elements.categoryProgressList.appendChild(row);
    });

    evaluatedScoreData = {
      score: score,
      percentage: percentage,
      accuracy: accuracy,
      attemptedCount: attemptedCount,
      timeSpentSeconds: timeSpentSeconds,
      minsSpent: minsSpent,
      secsSpent: secsSpent,
      categoryStats: categoryStats
    };

    updateUserUI(currentUser);
    if (currentUser) {
      syncScoreToFirestore(currentUser);
    }

    renderReviewList('ALL');
  }

  // ── CS-Guide Firebase Auth & Score Synchronization ──
  function updateUserUI(user) {
    if (user) {
      if (elements.btnHeaderAuth) {
        elements.btnHeaderAuth.classList.add('signed-in');
        if (elements.headerAuthLabel) {
          elements.headerAuthLabel.textContent = user.displayName ? user.displayName.split(' ')[0] : 'Profile';
        }
      }
      if (elements.candidateName) {
        elements.candidateName.textContent = user.displayName || 'Candidate';
      }
      if (elements.candidateId) {
        elements.candidateId.textContent = user.email || 'Verified Candidate';
      }
      if (elements.candidateAvatar) {
        if (user.photoURL) {
          elements.candidateAvatar.innerHTML = `<img src="${user.photoURL}" style="width:100%;height:100%;border-radius:var(--radius-md);object-fit:cover;" alt="Avatar" />`;
        } else {
          elements.candidateAvatar.textContent = (user.displayName || user.email || 'CC').charAt(0).toUpperCase();
        }
      }

      // Sync Card View
      if (elements.syncUnauthBox) elements.syncUnauthBox.style.display = 'none';
      if (elements.syncAuthBox) elements.syncAuthBox.style.display = 'flex';
      if (elements.userAvatar) {
        elements.userAvatar.src = user.photoURL || 'https://lh3.googleusercontent.com/a/default-user';
      }
      if (elements.userDisplayName) {
        elements.userDisplayName.textContent = user.displayName || 'NextSem Student';
      }
      if (elements.userEmail) {
        elements.userEmail.textContent = user.email || '';
      }
      if (elements.syncStatusText && (!elements.syncStatusBadge || !elements.syncStatusBadge.classList.contains('synced'))) {
        elements.syncStatusText.textContent = 'Google Connected';
      }
    } else {
      if (elements.btnHeaderAuth) {
        elements.btnHeaderAuth.classList.remove('signed-in');
        if (elements.headerAuthLabel) {
          elements.headerAuthLabel.textContent = 'Sign In';
        }
      }
      if (elements.candidateName) elements.candidateName.textContent = 'Computer Competency';
      if (elements.candidateId) elements.candidateId.textContent = 'ID: CBT-2026-X100';
      if (elements.candidateAvatar) elements.candidateAvatar.textContent = 'CC';

      if (elements.syncUnauthBox) elements.syncUnauthBox.style.display = 'flex';
      if (elements.syncAuthBox) elements.syncAuthBox.style.display = 'none';
      if (elements.syncStatusBadge) elements.syncStatusBadge.className = 'sync-status-badge';
      if (elements.syncStatusText) elements.syncStatusText.textContent = 'Not Connected';
      if (elements.syncNotification) elements.syncNotification.style.display = 'none';
    }
  }

  async function syncScoreToFirestore(user) {
    if (!user) return;
    if (!evaluatedScoreData) {
      renderResults();
    }
    if (!evaluatedScoreData) return;

    if (elements.syncStatusText) {
      elements.syncStatusText.textContent = 'Syncing...';
    }
    if (elements.btnManualSync) {
      elements.btnManualSync.innerHTML = '<span>⏳</span> Syncing to Firestore...';
      elements.btnManualSync.disabled = true;
    }

    const payload = {
      examTitle: "National Computer Competency Assessment (100 MCQs)",
      examCode: "CBT-100-COMP",
      score: evaluatedScoreData.score,
      totalQuestions: TOTAL_QUESTIONS,
      percentage: parseFloat(evaluatedScoreData.percentage),
      accuracy: parseFloat(evaluatedScoreData.accuracy),
      passed: evaluatedScoreData.score >= 60,
      status: evaluatedScoreData.score >= 60 ? "PASSED (PROMOTED)" : "NEEDS PRACTICE",
      timeSpentSeconds: evaluatedScoreData.timeSpentSeconds,
      timeSpentFormatted: `${evaluatedScoreData.minsSpent}m ${evaluatedScoreData.secsSpent}s`,
      submittedAt: new Date().toISOString(),
      categoryStats: evaluatedScoreData.categoryStats
    };

    try {
      if (db) {
        await db.collection("users_progress").doc(user.uid).set({
          email: user.email,
          displayName: user.displayName || user.email.split('@')[0],
          photoURL: user.photoURL || null,
          cbt_score: payload,
          lastUpdated: new Date().toISOString()
        }, { merge: true });
      }

      // Local storage mirror
      localStorage.setItem(`nextsem_cbt_score_${user.email}`, JSON.stringify(payload));
      localStorage.setItem('nextsem_cbt_score_latest', JSON.stringify(payload));
      localStorage.setItem('nextsem_user', JSON.stringify({
        uid: user.uid,
        name: user.displayName || user.email.split('@')[0],
        email: user.email,
        photo: user.photoURL || null
      }));

      if (elements.syncStatusBadge) {
        elements.syncStatusBadge.className = 'sync-status-badge synced';
      }
      if (elements.syncStatusText) {
        elements.syncStatusText.textContent = '☁️ Synced to CS-Guide Profile';
      }
      if (elements.btnManualSync) {
        elements.btnManualSync.innerHTML = '<span>✓</span> Score Synced';
        elements.btnManualSync.disabled = false;
      }
      if (elements.syncNotification) {
        elements.syncNotification.style.display = 'flex';
        elements.syncNotification.innerHTML = `<span>🎉</span> Score of <strong>${payload.score} / ${payload.totalQuestions}</strong> (${payload.percentage}%) has been certified and synced under <strong>${user.email}</strong>!`;
      }
    } catch (err) {
      console.warn("Firestore sync warning (saved locally):", err);
      localStorage.setItem(`nextsem_cbt_score_${user.email}`, JSON.stringify(payload));
      localStorage.setItem('nextsem_cbt_score_latest', JSON.stringify(payload));

      if (elements.syncStatusBadge) {
        elements.syncStatusBadge.className = 'sync-status-badge synced';
      }
      if (elements.syncStatusText) {
        elements.syncStatusText.textContent = '💾 Saved Locally (Offline)';
      }
      if (elements.btnManualSync) {
        elements.btnManualSync.innerHTML = '<span>🔄</span> Retry Cloud Sync';
        elements.btnManualSync.disabled = false;
      }
      if (elements.syncNotification) {
        elements.syncNotification.style.display = 'flex';
        elements.syncNotification.innerHTML = `<span>💾</span> Score saved locally on device for ${user.email}. Sign in when connected to cloud.`;
      }
    }
  }

  async function handleGoogleSignIn() {
    if (!auth) {
      alert("Google Authentication service is initializing. Please check your internet connection.");
      return;
    }
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await auth.signInWithPopup(provider);
      if (result && result.user) {
        currentUser = result.user;
        updateUserUI(currentUser);
        if (state.isSubmitted) {
          await syncScoreToFirestore(currentUser);
        }
      }
    } catch (e) {
      console.warn("Popup sign-in fallback:", e);
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        await auth.signInWithRedirect(provider);
      } catch (err2) {
        console.error("Sign-in failed:", err2);
        alert("Google Sign-In failed: " + err2.message);
      }
    }
  }

  async function handleGoogleSignOut() {
    if (auth) {
      await auth.signOut();
    }
    currentUser = null;
    updateUserUI(null);
  }

  function handleHeaderAuthClick() {
    if (currentUser) {
      if (state.isSubmitted && elements.csGuideSyncCard) {
        elements.csGuideSyncCard.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.open('http://localhost:3001/profile', '_blank');
      }
    } else {
      handleGoogleSignIn();
    }
  }

  function renderReviewList(filterType) {
    elements.reviewList.innerHTML = '';

    CBT_QUESTIONS.forEach((q, idx) => {
      const userAns = state.answers[q.id];
      const isCorrect = userAns === q.correct;
      const isAttempted = userAns !== undefined;
      const isMarked = !!state.markedForReview[q.id];

      if (filterType === 'CORRECT' && (!isAttempted || !isCorrect)) return;
      if (filterType === 'INCORRECT' && (!isAttempted || isCorrect)) return;
      if (filterType === 'UNATTEMPTED' && isAttempted) return;
      if (filterType === 'FLAGGED' && !isMarked) return;

      const card = document.createElement('div');
      card.className = `review-card ${isAttempted ? (isCorrect ? 'correct-card' : 'incorrect-card') : 'unanswered-card'}`;

      let optionsHtml = '';
      q.options.forEach((opt, optIdx) => {
        let optClass = 'review-option';
        let badge = '';

        if (optIdx === q.correct) {
          optClass += ' is-correct';
          badge = '<span style="margin-left:auto; font-weight:700; color:var(--status-answered);">✓ Correct Answer</span>';
        } else if (optIdx === userAns) {
          optClass += ' is-user-selected';
          badge = '<span style="margin-left:auto; font-weight:700; color:var(--status-not-answered);">✗ Your Answer</span>';
        }

        optionsHtml += `
          <div class="${optClass}">
            <strong>[${['A','B','C','D'][optIdx]}]</strong> ${opt} ${badge}
          </div>
        `;
      });

      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <span class="question-index-pill">Q ${idx + 1}</span>
            <span class="category-tag">${q.category}</span>
          </div>
          <span style="font-size:0.85rem; font-weight:700; color:${isCorrect ? 'var(--status-answered)' : (isAttempted ? 'var(--status-not-answered)' : 'var(--text-muted)')}">
            ${isCorrect ? '+1.0 Mark (Correct)' : (isAttempted ? '0.0 Mark (Wrong)' : '0.0 Mark (Skipped)')}
          </span>
        </div>
        <div class="question-text">${q.question}</div>
        <div style="display:flex; flex-direction:column; gap:0.5rem;">${optionsHtml}</div>
        <div class="review-explanation">
          <strong style="color:var(--text-primary); display:block; margin-bottom:0.35rem;">Detailed Solution & Rationale:</strong>
          ${q.explanation}
        </div>
      `;

      elements.reviewList.appendChild(card);
    });
  }

  // Keyboard Shortcuts Handler
  function setupKeyboardNavigation() {
    window.addEventListener('keydown', (e) => {
      // Do not capture if modal is open or submitted
      if (elements.submitModal.classList.contains('active') || state.isSubmitted) return;

      // Check for Option selection (1..4 or A..D)
      if (['1', '2', '3', '4'].includes(e.key)) {
        selectOption(parseInt(e.key, 10) - 1);
      } else if (['a', 'b', 'c', 'd'].includes(e.key.toLowerCase()) && !e.ctrlKey && !e.altKey) {
        const map = { a: 0, b: 1, c: 2, d: 3 };
        selectOption(map[e.key.toLowerCase()]);
      } else if (e.key === 'ArrowRight' || e.key === 'n' || e.key === 'N') {
        handleSaveAndNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'p' || e.key === 'P') {
        handlePrev();
      } else if (e.key === 'm' || e.key === 'M') {
        toggleMarkForReview();
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        clearResponse();
      }
    });
  }

  // Event Listeners Initialization
  function initEvents() {
    // Mode Toggle (Exam vs Practice)
    elements.toggleModeBtn.addEventListener('click', () => {
      state.examMode = state.examMode === 'exam' ? 'practice' : 'exam';
      elements.modeBadgeText.textContent = state.examMode === 'exam' ? 'Timed Exam Mode' : 'Practice / Learning Mode';
      renderCurrentQuestion();
      saveState();
    });

    // Theme Toggle
    elements.themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      elements.themeToggleBtn.innerHTML = isLight ? '🌙' : '☀️';
      localStorage.setItem('CBT_THEME', isLight ? 'light' : 'dark');
    });

    // Fullscreen Toggle
    elements.fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });

    // Sound Toggle
    elements.soundToggleBtn.addEventListener('click', () => {
      state.soundEnabled = !state.soundEnabled;
      elements.soundToggleBtn.innerHTML = state.soundEnabled ? '🔊' : '🔇';
    });

    // Font Scaling
    elements.fontIncBtn.addEventListener('click', () => {
      if (state.fontSizeScale < 1.3) {
        state.fontSizeScale += 0.1;
        document.documentElement.style.setProperty('--font-scale', state.fontSizeScale);
      }
    });

    elements.fontDecBtn.addEventListener('click', () => {
      if (state.fontSizeScale > 0.85) {
        state.fontSizeScale -= 0.1;
        document.documentElement.style.setProperty('--font-scale', state.fontSizeScale);
      }
    });

    // Test Navigation
    elements.nextBtn.addEventListener('click', handleSaveAndNext);
    elements.prevBtn.addEventListener('click', handlePrev);
    elements.clearBtn.addEventListener('click', clearResponse);
    elements.reviewBtn.addEventListener('click', handleMarkAndNext);
    elements.flagBtn.addEventListener('click', toggleMarkForReview);

    // Modal
    elements.submitTestBtn.addEventListener('click', openSubmitModal);
    elements.btnCancelSubmit.addEventListener('click', closeSubmitModal);
    elements.btnConfirmSubmit.addEventListener('click', finishTest);

    // Category Filter in Palette
    elements.categoryFilterSelect.addEventListener('change', (e) => {
      state.categoryFilter = e.target.value;
      updateMatrixPalette();
    });

    // Results Actions
    elements.btnRetake.addEventListener('click', () => {
      if (confirm('Are you sure you want to retake this test? All previous responses will be cleared.')) {
        localStorage.removeItem(STORAGE_KEY);
        window.location.reload();
      }
    });

    elements.btnPrintReport.addEventListener('click', () => {
      window.print();
    });

    elements.btnExportJson.addEventListener('click', () => {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({
        test: "Computer-Based Test (100 MCQ Assessment)",
        date: new Date().toISOString(),
        score: elements.scoreNumber.textContent,
        accuracy: elements.accuracyVal.textContent,
        timeSpent: elements.timeSpentVal.textContent,
        answers: state.answers
      }, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', 'CBT_Exam_Report.json');
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    });

    // Review Filter Chips
    elements.reviewFilterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        elements.reviewFilterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        renderReviewList(chip.dataset.filter);
      });
    });

    // Click outside modal to close
    elements.submitModal.addEventListener('click', (e) => {
      if (e.target === elements.submitModal) {
        closeSubmitModal();
      }
    });

    // CS-Guide Auth & Sync Events
    if (elements.btnGoogleSync) {
      elements.btnGoogleSync.addEventListener('click', handleGoogleSignIn);
    }
    if (elements.btnHeaderAuth) {
      elements.btnHeaderAuth.addEventListener('click', handleHeaderAuthClick);
    }
    if (elements.btnManualSync) {
      elements.btnManualSync.addEventListener('click', () => {
        if (currentUser) {
          syncScoreToFirestore(currentUser);
        } else {
          handleGoogleSignIn();
        }
      });
    }
    if (elements.btnGoogleSignOut) {
      elements.btnGoogleSignOut.addEventListener('click', handleGoogleSignOut);
    }
  }

  // Application Startup
  function init() {
    loadState();

    // Theme check
    if (localStorage.getItem('CBT_THEME') === 'light') {
      document.body.classList.add('light-theme');
      elements.themeToggleBtn.innerHTML = '🌙';
    }

    initEvents();
    setupKeyboardNavigation();

    // Setup Firebase Auth State Listener
    if (auth) {
      auth.onAuthStateChanged((user) => {
        currentUser = user;
        updateUserUI(user);
        if (user && state.isSubmitted) {
          syncScoreToFirestore(user);
        }
      });

      auth.getRedirectResult().then((result) => {
        if (result && result.user) {
          currentUser = result.user;
          updateUserUI(result.user);
          if (state.isSubmitted) {
            syncScoreToFirestore(result.user);
          }
        }
      }).catch((redirectErr) => {
        console.warn("Redirect auth check:", redirectErr);
      });
    } else {
      // Check if user was previously saved locally
      try {
        const localUserRaw = localStorage.getItem('nextsem_user');
        if (localUserRaw) {
          const u = JSON.parse(localUserRaw);
          updateUserUI({ displayName: u.name, email: u.email, photoURL: u.photo });
        }
      } catch (e) {}
    }

    if (state.isSubmitted) {
      document.querySelector('.cbt-main-content').style.display = 'none';
      elements.resultsContainer.classList.add('active');
      renderResults();
    } else {
      renderCurrentQuestion();
      startTimer();
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
