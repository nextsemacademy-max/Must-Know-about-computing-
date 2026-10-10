# National Computer Competency Assessment - 100 MCQ Computer-Based Test (CBT)

A production-grade, responsive **Computer-Based Test (CBT)** web application designed for comprehensive evaluation across foundational computer systems, operating systems, productivity software, internet theory, version control, and web technologies.

---

## 🎯 Test Blueprint & Question Distribution (100 MCQs)

The assessment comprises exactly **100 multiple-choice questions** distributed across 9 core competency domains:

| Domain / Module | Subtopics Covered | Question Range | Total Questions |
| :--- | :--- | :---: | :---: |
| **Windows OS** | NTFS, Task Manager shortcuts, Registry (`regedit`), Virtual Memory (`pagefile.sys`), UAC, `ping`/`ipconfig`, 32-bit vs 64-bit RAM limits, Device Manager, PowerShell cmdlets, Environment Variables | Q1 – Q12 | **12** |
| **Linux OS** | FHS (`/etc`, `/var`, `/bin`), Permissions (octal `755`), `chown`/`chmod`, Signals (`kill`, `SIGTERM`), standard streams (`stderr` descriptor 2), `grep`, soft links vs hard links, `apt` package manager, `$HOME`, Linux Kernel, `top`/`htop`, redirection (`>` vs `>>`), `tar -czvf` | Q13 – Q25 | **13** |
| **MS Word** | Mail Merge, Hyperlink shortcut (`Ctrl+K`), Section breaks vs Page breaks, Track Changes, Heading Styles Table of Contents, `Shift+F3` case toggling, `.dotx` templates, Find & Replace (`Ctrl+H`) | Q26 – Q33 | **8** |
| **MS Excel** | Formula syntax (`=`), Absolute referencing (`$A$1`), `VLOOKUP` limitations vs `XLOOKUP`, `#DIV/0!` error codes, Pivot Tables, `F4` reference cycling, Freeze Panes, `SUMIF`, Data Validation | Q34 – Q42 | **9** |
| **MS PowerPoint** | Slide Master, Presentation shortcuts (`F5` vs `Shift+F5`), Transitions vs Animations, Screen blanking keys (`B` & `W`), Presenter View, `.ppsx` show format, SmartArt, 3-Slides Handout printing | Q43 – Q50 | **8** |
| **Internet Theory** | 7-Layer OSI Model, TCP vs UDP, IPv4 (32-bit) vs IPv6 (128-bit), DNS resolution, Well-known ports (80 HTTP, 443 HTTPS, 21 FTP, 22 SSH), TLS encryption, Private IP ranges (RFC 1918), Layer 2 Switch MAC addressing, ARP, DHCP DORA, HTTP GET vs POST, 404 Status Code, HTTP Cookies, NAT, URL Query strings | Q51 – Q65 | **15** |
| **Git Version Control**| DVCS architecture, 3 States (Working Tree, Staging Index, Repository), `git init`, `git add .`, `git commit -m`, `git switch -c`, `git pull` (`fetch` + `merge`), `git stash`, `.gitignore`, `git log`, Merge conflicts, `HEAD` pointer, `git revert`, `git clone`, SHA-1 hashes | Q66 – Q80 | **15** |
| **HTML** | `<!DOCTYPE html>`, Semantic `<nav>`, `target='_blank'`, accessibility `alt`, Form GET vs POST, `<input type='email'>`, `<ol>` vs `<ul>`, `colspan`, responsive `<meta name='viewport'>`, void elements (`<br>`) | Q81 – Q90 | **10** |
| **CSS** | Box Model (Content, Padding, Border, Margin), `box-sizing: border-box`, Selector Specificity hierarchy, Flexbox `justify-content` vs `align-items`, CSS Grid `fr` units, `position: absolute` vs `position: sticky`, `rem` vs `em`, Media Queries `@media (max-width: 768px)`, `z-index` stacking context | Q91 – Q100 | **10** |
| **Total** | **Comprehensive Full-Spectrum Assessment** | **Q1 – Q100** | **100 MCQs** |

---

## ⚡ Key Features of the CBT Engine

1. **Standard Exam Matrix (NTA/Prometric Standard Palette)**:
   - 🟢 **Answered**: Question has been responded to.
   - 🔴 **Not Answered**: Question was visited but no option chosen.
   - 🟣 **Marked for Review**: Question flagged for reconsidering.
   - 🟣🟩 **Answered & Marked for Review**: Has an answer and is also flagged.
   - ⚪ **Not Visited**: Unopened question.
2. **Interactive 100-Question Grid**: Jump to any question immediately from the sidebar matrix.
3. **Timed Exam Mode & Practice Mode**:
   - **Timed Exam Mode**: 90-minute countdown timer with 5-minute visual alerts and auto-submission.
   - **Practice Mode**: Instant answer verification and solution explanations upon selection.
4. **Rich Results & Analytics Dashboard**:
   - Total Score out of 100 with percentage and pass/fail evaluation (Pass criterion: 60%).
   - Accuracy rate calculation.
   - Topic-wise visual progress bar breakdown across all 9 domains.
   - Filterable question review list (All, Correct, Incorrect, Unattempted, Flagged).
   - Detailed rationale and explanation for every single question.
5. **Autosave & Persistence**:
   - Real-time automatic caching in `localStorage`. If the user accidentally closes the tab or refreshes, their test progress, selected answers, and timer state are preserved.
6. **Print & PDF Export**:
   - Built-in `@media print` layout to print or save a clean assessment scorecard and solution book.
   - Export results to structured JSON.
7. **Accessibility & Keyboard Shortcuts**:
   - Keys `1`, `2`, `3`, `4` or `A`, `B`, `C`, `D`: Select option.
   - Key `Enter` or `N` or `Arrow Right`: Save & Next.
   - Key `P` or `Arrow Left`: Previous.
   - Key `M`: Mark / Unmark for Review.
   - Key `Delete` / `Backspace`: Clear Response.
   - Font scale controls (`A-` / `A+`).
   - Theme toggle (Sleek Dark Mode & High-Contrast Light Mode).
   - Audio feedback synthesizer (Web Audio API with toggle).

---

## 🚀 How to Run the Assessment

You can open the assessment in any standard modern web browser (Edge, Chrome, Firefox, Brave):

1. **Direct File Open**:
   - Navigate to:
     `C:\Users\nextsem\.gemini\antigravity-ide\scratch\computer-based-test-100-mcq\index.html`
   - Double-click `index.html` or open it with your browser.
2. **Or via Local Web Server**:
   ```bash
   npx -y serve "C:\Users\nextsem\.gemini\antigravity-ide\scratch\computer-based-test-100-mcq"
   ```
