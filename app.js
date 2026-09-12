// Interactive Windows CLI App Manager Logic

(function () {
  // App Catalog
  const APPS = [
    { name: 'VS Code', wingetId: 'Microsoft.VisualStudioCode', chocoId: 'vscode', category: 'Dev' },
    { name: 'Google Chrome', wingetId: 'Google.Chrome', chocoId: 'googlechrome', category: 'Browser' },
    { name: 'Mozilla Firefox', wingetId: 'Mozilla.Firefox', chocoId: 'firefox', category: 'Browser' },
    { name: 'Brave Browser', wingetId: 'Brave.Brave', chocoId: 'brave', category: 'Browser' },
    { name: 'Git', wingetId: 'Git.Git', chocoId: 'git', category: 'Dev' },
    { name: '7-Zip', wingetId: '7zip.7zip', chocoId: '7zip', category: 'Utility' },
    { name: 'VLC Media Player', wingetId: 'VideoLAN.VLC', chocoId: 'vlc', category: 'Media' },
    { name: 'Node.js (LTS)', wingetId: 'OpenJS.NodeJS.LTS', chocoId: 'nodejs-lts', category: 'Dev' },
    { name: 'Python 3', wingetId: 'Python.Python.3.12', chocoId: 'python3', category: 'Dev' },
    { name: 'Discord', wingetId: 'Discord.Discord', chocoId: 'discord', category: 'Social' },
    { name: 'Spotify', wingetId: 'Spotify.Spotify', chocoId: 'spotify', category: 'Media' },
    { name: 'Steam', wingetId: 'Valve.Steam', chocoId: 'steam', category: 'Gaming' },
    { name: 'Docker Desktop', wingetId: 'Docker.DockerDesktop', chocoId: 'docker-desktop', category: 'Dev' },
    { name: 'Notepad++', wingetId: 'Notepad++.Notepad++', chocoId: 'notepadplusplus', category: 'Utility' },
    { name: 'Microsoft PowerToys', wingetId: 'Microsoft.PowerToys', chocoId: 'powertoys', category: 'Utility' },
    { name: 'Postman', wingetId: 'Postman.Postman', chocoId: 'postman', category: 'Dev' },
    { name: 'OBS Studio', wingetId: 'OBSProject.OBSStudio', chocoId: 'obs-studio', category: 'Media' },
    { name: 'Telegram', wingetId: 'Telegram.TelegramDesktop', chocoId: 'telegram', category: 'Social' },
    { name: 'Slack', wingetId: 'SlackTechnologies.Slack', chocoId: 'slack', category: 'Social' },
    { name: 'Zoom', wingetId: 'Zoom.Zoom', chocoId: 'zoom', category: 'Social' },
    { name: 'Everything Search', wingetId: 'voidtools.Everything', chocoId: 'everything', category: 'Utility' },
    { name: 'Neovim', wingetId: 'Neovim.Neovim', chocoId: 'neovim', category: 'Dev' },
    { name: 'Rustup (Rust)', wingetId: 'Rustlang.Rustup', chocoId: 'rustup.install', category: 'Dev' },
    { name: 'Blender', wingetId: 'BlenderFoundation.Blender', chocoId: 'blender', category: 'Media' }
  ];

  // State
  let currentMode = 'install'; // 'install' | 'uninstall'
  let currentTool = 'winget';  // 'winget' | 'choco'
  const selectedApps = new Set(['Microsoft.VisualStudioCode', 'Git.Git', '7zip.7zip']);

  // DOM Elements
  const appsContainer = document.getElementById('apps-container');
  const appSearch = document.getElementById('app-search');
  const modeInstall = document.getElementById('mode-install');
  const modeUninstall = document.getElementById('mode-uninstall');
  const toolWinget = document.getElementById('tool-winget');
  const toolChoco = document.getElementById('tool-choco');
  const flagSilent = document.getElementById('flag-silent');
  const flagSource = document.getElementById('flag-source');
  const flagSourceWrap = document.getElementById('flag-source-wrap');
  const flagAgreements = document.getElementById('flag-agreements');
  const flagAgreementsWrap = document.getElementById('flag-agreements-wrap');
  const generatedBatchCommand = document.getElementById('generated-batch-command');
  const copyGeneratedBtn = document.getElementById('copy-generated-btn');
  const btnSelectAll = document.getElementById('btn-select-all');
  const btnClearAll = document.getElementById('btn-clear-all');

  // Render Apps in Grid
  function renderApps() {
    const query = appSearch.value.trim().toLowerCase();
    appsContainer.innerHTML = '';

    const filtered = APPS.filter(app => 
      app.name.toLowerCase().includes(query) || 
      app.wingetId.toLowerCase().includes(query) || 
      app.category.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      appsContainer.innerHTML = '<div style="grid-column: 1 / -1; padding: 1rem; color: var(--text-muted); text-align: center; font-size: 0.85rem;">No matching applications found.</div>';
      return;
    }

    filtered.forEach(app => {
      const isSelected = selectedApps.has(app.wingetId);
      const chip = document.createElement('label');
      chip.className = `app-chip ${isSelected ? 'selected' : ''}`;

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = isSelected;
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          selectedApps.add(app.wingetId);
        } else {
          selectedApps.delete(app.wingetId);
        }
        chip.classList.toggle('selected', checkbox.checked);
        updateGeneratedCommand();
      });

      const labelText = document.createElement('span');
      labelText.className = 'app-chip-name';
      labelText.textContent = app.name;
      labelText.title = `${app.name} (${app.wingetId})`;

      chip.appendChild(checkbox);
      chip.appendChild(labelText);
      appsContainer.appendChild(chip);
    });
  }

  // Generate the command string
  function updateGeneratedCommand() {
    if (selectedApps.size === 0) {
      generatedBatchCommand.textContent = '# Select one or more apps above to generate your command';
      return;
    }

    const selectedAppObjs = APPS.filter(a => selectedApps.has(a.wingetId));
    const isSilent = flagSilent.checked;
    const isAgreements = flagAgreements.checked;

    if (currentTool === 'winget') {
      flagAgreementsWrap.style.display = currentMode === 'install' ? 'flex' : 'none';
      if (flagSourceWrap) {
        flagSourceWrap.style.display = currentMode === 'install' ? 'flex' : 'none';
      }
      const silentFlag = isSilent ? ' --silent' : '';
      const sourceFlag = (currentMode === 'install' && flagSource && flagSource.checked) ? ' -s winget' : '';
      const agreeFlags = (currentMode === 'install' && isAgreements) 
        ? ' --accept-package-agreements --accept-source-agreements' 
        : '';

      const commands = selectedAppObjs.map(app => {
        if (currentMode === 'install') {
          return `winget install --id ${app.wingetId}${sourceFlag} -e${silentFlag}${agreeFlags}`;
        } else {
          return `winget uninstall --id ${app.wingetId}${silentFlag}`;
        }
      });

      if (commands.length === 1) {
        generatedBatchCommand.textContent = commands[0];
      } else {
        // Multi-command chain with &&
        generatedBatchCommand.textContent = commands.join(' && ');
      }
    } else if (currentTool === 'choco') {
      flagAgreementsWrap.style.display = 'none';
      if (flagSourceWrap) {
        flagSourceWrap.style.display = 'none';
      }
      const chocoIds = selectedAppObjs.map(a => a.chocoId).join(' ');
      const confirmFlag = isSilent ? ' -y' : '';

      if (currentMode === 'install') {
        generatedBatchCommand.textContent = `choco install ${chocoIds}${confirmFlag}`;
      } else {
        generatedBatchCommand.textContent = `choco uninstall ${chocoIds}${confirmFlag}`;
      }
    }
  }

  // Copy helper
  async function copyText(text, btn) {
    try {
      await navigator.clipboard.writeText(text);
      const original = btn.textContent;
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove('copied');
      }, 1500);
    } catch (e) {
      prompt('Copy manually:', text);
    }
  }

  // Setup Global Copy Buttons in step cards
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const codeTarget = btn.parentElement.querySelector('.copy-target');
      if (codeTarget) {
        copyText(codeTarget.textContent.trim(), btn);
      }
    });
  });

  // Generated Command Copy
  copyGeneratedBtn.addEventListener('click', () => {
    copyText(generatedBatchCommand.textContent.trim(), copyGeneratedBtn);
  });

  // Search input
  appSearch.addEventListener('input', renderApps);

  // Mode buttons
  modeInstall.addEventListener('click', () => {
    currentMode = 'install';
    modeInstall.classList.add('active');
    modeUninstall.classList.remove('active');
    updateGeneratedCommand();
  });

  modeUninstall.addEventListener('click', () => {
    currentMode = 'uninstall';
    modeUninstall.classList.add('active');
    modeInstall.classList.remove('active');
    updateGeneratedCommand();
  });

  // Tool buttons
  toolWinget.addEventListener('click', () => {
    currentTool = 'winget';
    toolWinget.classList.add('active');
    toolChoco.classList.remove('active');
    updateGeneratedCommand();
  });

  toolChoco.addEventListener('click', () => {
    currentTool = 'choco';
    toolChoco.classList.add('active');
    toolWinget.classList.remove('active');
    updateGeneratedCommand();
  });

  // Option Flags
  flagSilent.addEventListener('change', updateGeneratedCommand);
  if (flagSource) {
    flagSource.addEventListener('change', updateGeneratedCommand);
  }
  flagAgreements.addEventListener('change', updateGeneratedCommand);

  // Select All & Clear All
  btnSelectAll.addEventListener('click', () => {
    APPS.forEach(a => selectedApps.add(a.wingetId));
    renderApps();
    updateGeneratedCommand();
  });

  btnClearAll.addEventListener('click', () => {
    selectedApps.clear();
    renderApps();
    updateGeneratedCommand();
  });

  // Theme Toggle Controller
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const themeLabel = document.getElementById('theme-label');

  function getPreferredTheme() {
    const saved = localStorage.getItem('winget_theme');
    if (saved) return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      if (themeIcon) themeIcon.textContent = '☀️';
      if (themeLabel) themeLabel.textContent = 'Light';
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeIcon) themeIcon.textContent = '🌙';
      if (themeLabel) themeLabel.textContent = 'Dark';
    }
  }

  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const newTheme = isLight ? 'dark' : 'light';
      localStorage.setItem('winget_theme', newTheme);
      applyTheme(newTheme);
    });
  }

  // Initial render
  renderApps();
  updateGeneratedCommand();
})();
