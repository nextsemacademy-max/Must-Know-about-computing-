// 100 Comprehensive Multiple Choice Questions for Computer-Based Test (CBT)
// Covering: Windows OS, Linux OS, MS Office (Word, Excel, PowerPoint), Internet Theory, Git, HTML & CSS.

const CBT_QUESTIONS = [
  // ==========================================
  // SECTION 1: WINDOWS OPERATING SYSTEM (Q1 - Q12)
  // ==========================================
  {
    id: 1,
    category: "Windows OS",
    subtopic: "File Systems",
    question: "Which of the following is the default and standard file system used by modern Microsoft Windows operating systems that supports file encryption, journaling, and large partition sizes?",
    options: ["FAT32", "NTFS", "exFAT", "ext4"],
    correct: 1,
    explanation: "NTFS (New Technology File System) has been the default file system for Windows NT-derived OS (including Windows 10 & 11). It supports features like journaling, file permissions, compression, and EFS (Encrypting File System)."
  },
  {
    id: 2,
    category: "Windows OS",
    subtopic: "Keyboard Shortcuts",
    question: "Which Windows keyboard shortcut opens the 'Run' dialog box directly?",
    options: ["Windows Key + R", "Windows Key + E", "Ctrl + Shift + Esc", "Alt + F4"],
    correct: 0,
    explanation: "Windows Key + R immediately launches the Run dialog. Windows Key + E opens File Explorer, and Ctrl + Shift + Esc directly opens Task Manager."
  },
  {
    id: 3,
    category: "Windows OS",
    subtopic: "System Utilities",
    question: "What command can be executed in the Windows Run dialog or Command Prompt to launch the Windows Registry Editor?",
    options: ["regedit", "dxdiag", "msconfig", "services.msc"],
    correct: 0,
    explanation: "'regedit' opens the Windows Registry Editor. 'msconfig' opens System Configuration, 'dxdiag' launches DirectX Diagnostic Tool, and 'services.msc' opens Windows Services."
  },
  {
    id: 4,
    category: "Windows OS",
    subtopic: "Process Management",
    question: "Which key combination directly opens the Windows Task Manager without passing through the GINA/lock screen security options?",
    options: ["Ctrl + Alt + Del", "Ctrl + Shift + Esc", "Alt + Space + C", "Windows Key + X"],
    correct: 1,
    explanation: "Ctrl + Shift + Esc directly opens the Windows Task Manager in a single step, whereas Ctrl + Alt + Del brings up the Windows Security screen."
  },
  {
    id: 5,
    category: "Windows OS",
    subtopic: "Virtual Memory",
    question: "What is the hidden system file used by Windows on the root drive to manage virtual memory (paging)?",
    options: ["bootmgr.sys", "pagefile.sys", "hiberfil.sys", "ntoskrnl.exe"],
    correct: 1,
    explanation: "'pagefile.sys' is the paging file Windows uses as secondary storage when physical RAM is exhausted. 'hiberfil.sys' is for hibernation, and 'bootmgr' is the Windows Boot Manager."
  },
  {
    id: 6,
    category: "Windows OS",
    subtopic: "Security & Permissions",
    question: "What feature in Windows prompts users for permission or administrator credentials before allowing software to make changes to the system?",
    options: ["BitLocker", "User Account Control (UAC)", "Windows Defender SmartScreen", "Windows Sandbox"],
    correct: 1,
    explanation: "User Account Control (UAC) prevents unauthorized system-level modifications by requiring standard users to elevate privileges or administrators to confirm intent."
  },
  {
    id: 7,
    category: "Windows OS",
    subtopic: "CLI Tools",
    question: "Which Windows Command Prompt command is used to test network connectivity and packet round-trip time to a remote host?",
    options: ["tracert", "ping", "ipconfig", "nslookup"],
    correct: 1,
    explanation: "The 'ping' command sends ICMP Echo Request packets to verify IP connectivity and measure round-trip time. 'tracert' traces the route of hops."
  },
  {
    id: 8,
    category: "Windows OS",
    subtopic: "CLI Tools",
    question: "In Windows Command Prompt, which command displays the computer's current IP address, subnet mask, and default gateway configuration?",
    options: ["ifconfig", "ipconfig", "netstat", "route print"],
    correct: 1,
    explanation: "'ipconfig' (Internet Protocol Configuration) displays Windows network adapter details. 'ifconfig' is the legacy command used on Unix/Linux systems."
  },
  {
    id: 9,
    category: "Windows OS",
    subtopic: "Architecture",
    question: "What is the primary difference between 32-bit (x86) and 64-bit (x64) Windows operating systems regarding physical RAM limitation?",
    options: [
      "32-bit Windows can address an unlimited amount of RAM",
      "32-bit Windows can address a maximum of 4 GB of RAM",
      "64-bit Windows is limited to 8 GB of RAM",
      "Both can address up to 128 GB of RAM"
    ],
    correct: 1,
    explanation: "A 32-bit architecture uses 32-bit memory addresses, limiting addressable memory space to 2^32 bytes = 4 GB. 64-bit systems can address theoretical limits up to 16 Exabytes (terabytes in practical OS editions)."
  },
  {
    id: 10,
    category: "Windows OS",
    subtopic: "System Management",
    question: "Which tool in Windows allows you to view and configure hardware devices, update drivers, and troubleshoot device conflicts?",
    options: ["Event Viewer", "Device Manager", "Disk Management", "Resource Monitor"],
    correct: 1,
    explanation: "Device Manager provides a centralized graphical tree view of all hardware installed on the computer and lets you update, rollback, or disable drivers."
  },
  {
    id: 11,
    category: "Windows OS",
    subtopic: "PowerShell",
    question: "In Windows PowerShell, what is the standard naming convention for built-in commandlets (cmdlets)?",
    options: ["Object.Method()", "Verb-Noun (e.g., Get-Process)", "Noun_Verb (e.g., Process_Get)", "EXEC_COMMAND"],
    correct: 1,
    explanation: "PowerShell cmdlets use an approved Verb-Noun syntax (such as Get-Service, Set-ExecutionPolicy, Start-Process), making commands predictable."
  },
  {
    id: 12,
    category: "Windows OS",
    subtopic: "File Paths",
    question: "What environment variable in Windows represents the path to the current user's profile directory (e.g., C:\\Users\\Username)?",
    options: ["%SYSTEMROOT%", "%USERPROFILE%", "%APPDATA%", "%PROGRAMFILES%"],
    correct: 1,
    explanation: "%USERPROFILE% points to the active user's folder (e.g., C:\\Users\\nextsem). %SYSTEMROOT% typically refers to C:\\Windows."
  },

  // ==========================================
  // SECTION 2: LINUX OPERATING SYSTEM (Q13 - Q25)
  // ==========================================
  {
    id: 13,
    category: "Linux OS",
    subtopic: "Filesystem Hierarchy",
    question: "In the Linux Filesystem Hierarchy Standard (FHS), which directory holds system-wide configuration files?",
    options: ["/bin", "/etc", "/var", "/usr"],
    correct: 1,
    explanation: "/etc contains host-specific system configuration files (e.g., /etc/passwd, /etc/fstab). /bin contains essential binaries, /var contains variable files like logs, and /usr contains user utilities."
  },
  {
    id: 14,
    category: "Linux OS",
    subtopic: "File Permissions",
    question: "What numerical (octal) permission value grants read, write, and execute permissions to the Owner, and read and execute permissions to Group and Others?",
    options: ["777", "755", "644", "700"],
    correct: 1,
    explanation: "Permissions: Read=4, Write=2, Execute=1. Owner: 4+2+1=7 (rwx). Group: 4+0+1=5 (r-x). Others: 4+0+1=5 (r-x). Together this produces octal 755."
  },
  {
    id: 15,
    category: "Linux OS",
    subtopic: "Command Line",
    question: "Which Linux command is used to change the owner and group ownership of a file or directory?",
    options: ["chmod", "chown", "chgrp", "passwd"],
    correct: 1,
    explanation: "'chown' (change owner) changes file owner and optionally the group (e.g., 'chown user:group filename'). 'chmod' changes file mode/access permissions."
  },
  {
    id: 16,
    category: "Linux OS",
    subtopic: "Process Management",
    question: "Which signal is sent by default when you execute the command 'kill <PID>' without specifying any signal flag in Linux?",
    options: ["SIGKILL (9)", "SIGTERM (15)", "SIGHUP (1)", "SIGSTOP (19)"],
    correct: 1,
    explanation: "'kill' sends SIGTERM (signal 15) by default, asking the process to terminate gracefully. SIGKILL (signal 9) forcibly kills the process immediately."
  },
  {
    id: 17,
    category: "Linux OS",
    subtopic: "Redirection & Pipes",
    question: "In Linux shell scripting, what file descriptor number represents standard error (stderr)?",
    options: ["0", "1", "2", "3"],
    correct: 2,
    explanation: "Standard POSIX file descriptors: 0 is standard input (stdin), 1 is standard output (stdout), and 2 is standard error (stderr)."
  },
  {
    id: 18,
    category: "Linux OS",
    subtopic: "Search & Filtering",
    question: "Which powerful Linux command is used to search for lines matching a regular expression pattern inside text files?",
    options: ["find", "grep", "locate", "diff"],
    correct: 1,
    explanation: "'grep' (Global Regular Expression Print) searches plain-text data sets for lines matching a regular expression. 'find' searches the directory tree for filenames and metadata."
  },
  {
    id: 19,
    category: "Linux OS",
    subtopic: "Links",
    question: "What happens to a soft link (symbolic link) in Linux if the original target file is deleted?",
    options: [
      "The soft link takes over the contents of the deleted file",
      "The soft link becomes a broken (dangling) link",
      "The soft link is automatically deleted by the kernel",
      "The original file is restored from the soft link"
    ],
    correct: 1,
    explanation: "A soft (symbolic) link points to the pathname of the target file. If the target file is removed, the symlink still exists but points to a non-existent path (broken link). In contrast, a hard link shares the inode and retains the data."
  },
  {
    id: 20,
    category: "Linux OS",
    subtopic: "Package Management",
    question: "Which package management command is used on Debian and Ubuntu based distributions to install software packages from repositories?",
    options: ["rpm -i", "yum install", "apt install", "pacman -S"],
    correct: 2,
    explanation: "Debian/Ubuntu use APT ('apt' or 'apt-get'). Red Hat/CentOS historically used 'yum' and now 'dnf'. Arch Linux uses 'pacman'."
  },
  {
    id: 21,
    category: "Linux OS",
    subtopic: "Directory Navigation",
    question: "What is the output or effect of executing 'cd ~' in a Linux terminal?",
    options: [
      "Changes directory to the root directory (/)",
      "Changes directory to the current user's home directory",
      "Changes directory to the previous working directory",
      "Displays the current working directory path"
    ],
    correct: 1,
    explanation: "The tilde '~' is an alias for the environment variable $HOME, so 'cd ~' (or simply 'cd') navigates to the current logged-in user's home directory."
  },
  {
    id: 22,
    category: "Linux OS",
    subtopic: "Kernel & Architecture",
    question: "Which component of the Linux operating system interacts directly with the computer hardware and manages CPU, memory, and devices?",
    options: ["The Shell", "The Desktop Environment", "The Kernel", "The GNU Coreutils"],
    correct: 2,
    explanation: "The Linux kernel is the core layer of the OS that directly controls hardware resources and allocates CPU, RAM, and disk access to user applications."
  },
  {
    id: 23,
    category: "Linux OS",
    subtopic: "System Monitoring",
    question: "Which Linux command displays real-time system performance, CPU load averages, and an interactive list of active processes?",
    options: ["df", "free", "top", "uname"],
    correct: 2,
    explanation: "'top' (and its modern variant 'htop') provides real-time interactive process and resource monitoring. 'df' shows disk space and 'free' shows RAM."
  },
  {
    id: 24,
    category: "Linux OS",
    subtopic: "Redirection Operators",
    question: "What is the difference between the '>' and '>>' redirection operators in Linux shells?",
    options: [
      "'>' appends output to a file, while '>>' overwrites the file",
      "'>' overwrites or creates a file, while '>>' appends output to the end of the file",
      "'>' redirects stdin, while '>>' redirects stderr",
      "Both perform identical overwriting operations"
    ],
    correct: 1,
    explanation: "'>' redirects standard output to a file, creating it or completely overwriting existing contents. '>>' appends the redirected output to the existing file without truncating it."
  },
  {
    id: 25,
    category: "Linux OS",
    subtopic: "Archiving & Compression",
    question: "Which command flag combination creates a gzip-compressed archive named 'backup.tar.gz' from a directory using the 'tar' command?",
    options: ["tar -xvf backup.tar.gz directory", "tar -czvf backup.tar.gz directory", "tar -tzvf backup.tar.gz", "tar -rvf backup.tar.gz directory"],
    correct: 1,
    explanation: "'tar -czvf' means: -c (create), -z (gzip compress), -v (verbose), -f (file). To extract it, one would use -xzvf."
  },

  // ==========================================
  // SECTION 3: MS OFFICE - MS WORD (Q26 - Q33)
  // ==========================================
  {
    id: 26,
    category: "MS Word",
    subtopic: "Automation & Mass Mailing",
    question: "Which feature in Microsoft Word allows users to create personalized letters, envelopes, or mailing labels for a list of multiple recipients automatically?",
    options: ["AutoText", "Mail Merge", "Macro Recorder", "SmartArt"],
    correct: 1,
    explanation: "Mail Merge combines a standardized template document with a data source (e.g., an Excel sheet or Access database) to produce personalized documents in bulk."
  },
  {
    id: 27,
    category: "MS Word",
    subtopic: "Keyboard Shortcuts",
    question: "In Microsoft Word, what is the default shortcut key to insert a Hyperlink into the selected text?",
    options: ["Ctrl + H", "Ctrl + K", "Ctrl + L", "Ctrl + Alt + H"],
    correct: 1,
    explanation: "Ctrl + K is the standard shortcut in Microsoft Office (Word, Excel, PowerPoint) and web browsers to insert a hyperlink. Ctrl + H opens Find and Replace."
  },
  {
    id: 28,
    category: "MS Word",
    subtopic: "Layout & Formatting",
    question: "To have a single Microsoft Word document contain both Portrait and Landscape pages, what must be inserted before changing the page orientation?",
    options: ["Page Break", "Column Break", "Section Break", "Line Break"],
    correct: 2,
    explanation: "A Section Break (e.g., Next Page Section Break) isolates document sections, allowing different page orientations, headers, footers, and margins within the same file."
  },
  {
    id: 29,
    category: "MS Word",
    subtopic: "Collaboration",
    question: "Which Microsoft Word feature records insertions, deletions, formatting changes, and comments made by reviewers in a collaborative document?",
    options: ["Version History", "Track Changes", "Document Inspector", "Restrict Editing"],
    correct: 1,
    explanation: "Track Changes (under the Review tab) marks up edits made by authors and reviewers so changes can be accepted or rejected individually."
  },
  {
    id: 30,
    category: "MS Word",
    subtopic: "Document Navigation",
    question: "How does Microsoft Word automatically generate an accurate, clickable Table of Contents (TOC)?",
    options: [
      "By scanning highlighted bold text",
      "By applying Heading Styles (Heading 1, Heading 2, etc.) to titles and subtitles",
      "By counting paragraphs and line indentations",
      "By analyzing bookmarks and footnotes only"
    ],
    correct: 1,
    explanation: "Word's automated Table of Contents engine looks for text formatted with built-in or custom Heading Styles (Heading 1, Heading 2, Heading 3)."
  },
  {
    id: 31,
    category: "MS Word",
    subtopic: "Text Formatting",
    question: "What is the shortcut key to cycle through text casing (Sentence case, UPPERCASE, lowercase) for selected text in MS Word?",
    options: ["Shift + F3", "Ctrl + Shift + A", "Alt + C", "Ctrl + F4"],
    correct: 0,
    explanation: "Shift + F3 toggles the case of selected text between ALL CAPS, all lowercase, and Title Case/Sentence case."
  },
  {
    id: 32,
    category: "MS Word",
    subtopic: "File Extensions",
    question: "What is the default file extension for Microsoft Word templates (macro-free) introduced in Office 2007 and later?",
    options: [".dotx", ".docx", ".docm", ".dotm"],
    correct: 0,
    explanation: "'.dotx' is the standard OpenXML template format. '.docx' is a standard document, '.dotm' is a macro-enabled template, and '.docm' is a macro-enabled document."
  },
  {
    id: 33,
    category: "MS Word",
    subtopic: "Find & Replace",
    question: "What is the shortcut key to open the 'Find and Replace' dialog box with the Replace tab active in MS Word?",
    options: ["Ctrl + F", "Ctrl + H", "Ctrl + G", "Ctrl + R"],
    correct: 1,
    explanation: "Ctrl + H directly opens the Replace tab of the Find and Replace dialog. Ctrl + F opens the Navigation/Find pane, and Ctrl + G opens the 'Go To' tab."
  },

  // ==========================================
  // SECTION 4: MS OFFICE - MS EXCEL (Q34 - Q42)
  // ==========================================
  {
    id: 34,
    category: "MS Excel",
    subtopic: "Formulas & Syntax",
    question: "Every formula or calculation in Microsoft Excel must begin with which character?",
    options: ["@", "=", "#", "+"],
    correct: 1,
    explanation: "In Microsoft Excel, all formulas must start with the equal sign '='. Without it, Excel treats entered characters as text or numbers."
  },
  {
    id: 35,
    category: "MS Excel",
    subtopic: "Cell Referencing",
    question: "In Excel formula syntax, what does the dollar sign '$' in the cell reference '$A$1' indicate?",
    options: [
      "The value represents currency (US Dollars)",
      "Both the column 'A' and row '1' are absolute references and will not change when copied",
      "Only the column is locked, but the row is relative",
      "The cell is encrypted and locked for editing"
    ],
    correct: 1,
    explanation: "'$A$1' is an absolute reference. When autofilled or copied to another cell, neither the column nor the row changes. A1 is relative, and $A1 / A$1 are mixed references."
  },
  {
    id: 36,
    category: "MS Excel",
    subtopic: "Lookup Functions",
    question: "What is the primary limitation of the legacy VLOOKUP function in Excel compared to INDEX/MATCH or XLOOKUP?",
    options: [
      "VLOOKUP cannot perform approximate matches",
      "VLOOKUP can only search for a key in the leftmost column of the table array and retrieve values to the right",
      "VLOOKUP cannot handle numbers",
      "VLOOKUP can only return data from the first row"
    ],
    correct: 1,
    explanation: "VLOOKUP requires the lookup column to be the first (leftmost) column of the lookup range, making it unable to look up data to the left without helper columns. XLOOKUP and INDEX/MATCH overcome this."
  },
  {
    id: 37,
    category: "MS Excel",
    subtopic: "Error Values",
    question: "Which error code appears in an Excel cell when a formula attempts to divide a numeric value by zero or an empty cell?",
    options: ["#VALUE!", "#N/A", "#DIV/0!", "#REF!"],
    correct: 2,
    explanation: "#DIV/0! occurs when a formula attempts division by 0. #VALUE! indicates wrong data type, #REF! is an invalid cell reference, and #N/A means value not available."
  },
  {
    id: 38,
    category: "MS Excel",
    subtopic: "Data Analysis",
    question: "Which Excel feature is designed to summarize, aggregate, sort, group, and dynamically reorganize large datasets without writing complex formulas?",
    options: ["Pivot Table", "Data Validation", "Goal Seek", "Conditional Formatting"],
    correct: 0,
    explanation: "Pivot Tables allow interactive cross-tabulation and aggregation (sum, count, average) of raw data with drag-and-drop row/column/value fields."
  },
  {
    id: 39,
    category: "MS Excel",
    subtopic: "Keyboard Shortcuts",
    question: "Which function key toggles between absolute, mixed, and relative cell references (e.g., A1 -> $A$1 -> A$1 -> $A1) while editing a formula in Excel?",
    options: ["F2", "F4", "F5", "F9"],
    correct: 1,
    explanation: "F4 cycles reference types when a cell reference is selected in the formula bar. F2 enters edit mode into the active cell."
  },
  {
    id: 40,
    category: "MS Excel",
    subtopic: "View Controls",
    question: "Which feature locks specific rows or columns in place so they remain visible while scrolling through a massive spreadsheet?",
    options: ["Split View", "Freeze Panes", "Gridlock Mode", "Hide Rows"],
    correct: 1,
    explanation: "'Freeze Panes' (under the View tab) keeps headers or specific columns visible on screen while scrolling vertically or horizontally."
  },
  {
    id: 41,
    category: "MS Excel",
    subtopic: "Conditional Logic",
    question: "Which function calculates the total sum of cells in a range that meet a specific single condition or criteria?",
    options: ["SUM", "SUMIF", "COUNTIF", "TOTALIF"],
    correct: 1,
    explanation: "SUMIF adds the cells specified by a condition (syntax: SUMIF(range, criteria, [sum_range])). SUMIFS allows multiple criteria."
  },
  {
    id: 42,
    category: "MS Excel",
    subtopic: "Data Integrity",
    question: "Which Excel tool restricts the type of data or values that users can enter into a given cell (such as providing a dropdown list or limiting dates)?",
    options: ["Data Consolidation", "Data Validation", "Goal Seek", "Solver"],
    correct: 1,
    explanation: "Data Validation (Data tab) ensures entered data conforms to specific criteria (e.g., whole numbers, dates, or items from a designated dropdown list)."
  },

  // ==========================================
  // SECTION 5: MS OFFICE - MS POWERPOINT (Q43 - Q50)
  // ==========================================
  {
    id: 43,
    category: "MS PowerPoint",
    subtopic: "Slide Master",
    question: "What is the purpose of the 'Slide Master' in Microsoft PowerPoint?",
    options: [
      "To record speech narration for each slide",
      "To set universal default formatting, fonts, logos, and layouts across all slides in the presentation",
      "To automatically time the transition between slides",
      "To convert PowerPoint presentations into video formats"
    ],
    correct: 1,
    explanation: "The Slide Master is the top slide in a hierarchy that stores information about the theme and layouts (including background, color, fonts, effects, and placeholder sizes) for the entire presentation."
  },
  {
    id: 44,
    category: "MS PowerPoint",
    subtopic: "Keyboard Shortcuts",
    question: "Which shortcut key starts a PowerPoint slide show from the very first slide?",
    options: ["F5", "Shift + F5", "Ctrl + F5", "Alt + F5"],
    correct: 0,
    explanation: "F5 starts the presentation from Slide 1. Shift + F5 starts the presentation from the currently active slide."
  },
  {
    id: 45,
    category: "MS PowerPoint",
    subtopic: "Visual Effects",
    question: "What is the technical difference between a 'Transition' and an 'Animation' in Microsoft PowerPoint?",
    options: [
      "Transitions apply to individual objects on a slide; Animations apply between slides",
      "Transitions apply to the movement between slides; Animations apply to individual elements (text, images, shapes) on a slide",
      "Transitions work only with video files; Animations work with audio files",
      "There is no difference; they are synonymous terms"
    ],
    correct: 1,
    explanation: "A Transition is the visual effect that occurs when moving from one slide to the next. An Animation is applied to individual objects on a single slide (entrance, emphasis, exit, motion paths)."
  },
  {
    id: 46,
    category: "MS PowerPoint",
    subtopic: "Slide Show Navigation",
    question: "During an active PowerPoint presentation slide show, pressing which key temporarily turns the screen completely Black to refocus audience attention?",
    options: ["B", "W", "Esc", "Space"],
    correct: 0,
    explanation: "Pressing 'B' (or period '.') turns the screen black during a slide show. Pressing 'W' (or comma ',') turns the screen white. Pressing any key again restores the slide."
  },
  {
    id: 47,
    category: "MS PowerPoint",
    subtopic: "Presenter Features",
    question: "Which view displays the current slide, upcoming slide preview, timer, and private speaker notes on the presenter's screen while the audience only sees the full slide on a secondary display?",
    options: ["Reading View", "Presenter View", "Slide Sorter View", "Notes Page View"],
    correct: 1,
    explanation: "Presenter View is automatically enabled when projecting to an external monitor or projector, displaying speaker notes and timers to the presenter."
  },
  {
    id: 48,
    category: "MS PowerPoint",
    subtopic: "File Formats",
    question: "Which file extension saves a PowerPoint presentation so that it automatically opens directly into full Slide Show mode when double-clicked?",
    options: [".pptx", ".ppsx", ".potx", ".pptm"],
    correct: 1,
    explanation: "'.ppsx' (PowerPoint Show) opens directly in full-screen presentation mode rather than normal design edit mode (.pptx)."
  },
  {
    id: 49,
    category: "MS PowerPoint",
    subtopic: "Graphics & Diagrams",
    question: "Which built-in Office graphics tool allows presenters to create flowcharts, organizational pyramids, process hierarchies, and relationship diagrams?",
    options: ["WordArt", "SmartArt", "ClipArt", "QuickShapes"],
    correct: 1,
    explanation: "SmartArt graphics provide designer-quality templates for visual representation of information, such as process flows, hierarchy charts, cycle diagrams, and matrices."
  },
  {
    id: 50,
    category: "MS PowerPoint",
    subtopic: "Printing & Distribution",
    question: "When printing slides for the audience, which print layout option prints thumbnail slides alongside blank lines for handwritten notes?",
    options: ["Full Page Slides", "Notes Pages", "3 Slides per page Handout", "Outline"],
    correct: 2,
    explanation: "The '3 Slides per page' Handout layout prints 3 slides on the left side of the page and ruled lines on the right side for the audience to take notes."
  },

  // ==========================================
  // SECTION 6: INTERNET THEORY & NETWORKING (Q51 - Q65)
  // ==========================================
  {
    id: 51,
    category: "Internet Theory",
    subtopic: "OSI Model",
    question: "How many layers are in the ISO/OSI Reference Model for network communication?",
    options: ["4", "5", "7", "8"],
    correct: 2,
    explanation: "The OSI model consists of 7 layers: Physical (1), Data Link (2), Network (3), Transport (4), Session (5), Presentation (6), and Application (7)."
  },
  {
    id: 52,
    category: "Internet Theory",
    subtopic: "Transport Protocols",
    question: "What is the fundamental difference between TCP (Transmission Control Protocol) and UDP (User Datagram Protocol)?",
    options: [
      "TCP is connectionless and unreliable; UDP is connection-oriented and reliable",
      "TCP is connection-oriented, reliable, and guarantees packet delivery; UDP is connectionless, faster, with no delivery guarantee",
      "TCP operates at Layer 7; UDP operates at Layer 3",
      "TCP can only transmit text; UDP can only transmit multimedia"
    ],
    correct: 1,
    explanation: "TCP establishes a 3-way handshake, verifies packet delivery, retransmits lost packets, and guarantees ordering. UDP transmits datagrams without a handshake or delivery verification, making it ideal for streaming and gaming."
  },
  {
    id: 53,
    category: "Internet Theory",
    subtopic: "IP Addressing",
    question: "What is the bit-length of an IPv4 address and an IPv6 address respectively?",
    options: ["32 bits and 64 bits", "32 bits and 128 bits", "64 bits and 128 bits", "16 bits and 32 bits"],
    correct: 1,
    explanation: "IPv4 addresses are 32 bits long (expressed as 4 decimal octets, e.g., 192.168.1.1). IPv6 addresses are 128 bits long (expressed as 8 hexadecimal quartets, e.g., 2001:db8::1)."
  },
  {
    id: 54,
    category: "Internet Theory",
    subtopic: "Domain Name System",
    question: "What is the primary function of the Domain Name System (DNS) on the internet?",
    options: [
      "Encrypting web traffic between client and server",
      "Translating human-friendly domain names (e.g., example.com) into machine-routable IP addresses",
      "Assigning dynamic IP addresses to home devices",
      "Caching web images for faster rendering"
    ],
    correct: 1,
    explanation: "DNS acts as the phonebook of the internet, resolving human-readable hostnames (such as www.google.com) into numerical IP addresses (such as 142.250.190.46)."
  },
  {
    id: 55,
    category: "Internet Theory",
    subtopic: "Well-Known Ports",
    question: "Which standard TCP port numbers are designated by default for unencrypted HTTP and encrypted HTTPS web traffic respectively?",
    options: ["Port 21 and Port 22", "Port 25 and Port 110", "Port 80 and Port 443", "Port 53 and Port 8080"],
    correct: 2,
    explanation: "Port 80 is the default port for plain HTTP traffic. Port 443 is used for HTTPS encrypted with SSL/TLS. Port 21 is FTP, 22 is SSH, 25 is SMTP, and 53 is DNS."
  },
  {
    id: 56,
    category: "Internet Theory",
    subtopic: "Security & Encryption",
    question: "What cryptographic security protocol replaced the deprecated SSL (Secure Sockets Layer) to encrypt modern HTTPS internet communications?",
    options: ["TLS (Transport Layer Security)", "IPsec", "SSH-2", "WPA3"],
    correct: 0,
    explanation: "TLS (Transport Layer Security) is the modern cryptographic successor to SSL. Even though people still say 'SSL certificate', modern connections actually use TLS (TLS 1.2 or TLS 1.3)."
  },
  {
    id: 57,
    category: "Internet Theory",
    subtopic: "Private IP Ranges",
    question: "According to RFC 1918, which of the following IP address blocks is designated as a private, non-routable IP range commonly used in local area networks?",
    options: ["8.8.8.0 / 24", "192.168.0.0 / 16", "1.1.1.0 / 24", "128.0.0.0 / 8"],
    correct: 1,
    explanation: "RFC 1918 defines three private IP address spaces: 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16. These addresses are not routable on the public internet."
  },
  {
    id: 58,
    category: "Internet Theory",
    subtopic: "Network Hardware",
    question: "At which layer of the OSI model does a standard network switch operate by inspecting MAC addresses?",
    options: ["Layer 1 (Physical)", "Layer 2 (Data Link)", "Layer 3 (Network)", "Layer 4 (Transport)"],
    correct: 1,
    explanation: "Standard Layer 2 Ethernet switches operate at the Data Link layer, maintaining a MAC address table to forward frames specifically to the destination port."
  },
  {
    id: 59,
    category: "Internet Theory",
    subtopic: "Address Resolution",
    question: "Which protocol resolves a known Layer 3 IP address to a physical Layer 2 MAC address within a local subnet?",
    options: ["DNS", "DHCP", "ARP (Address Resolution Protocol)", "ICMP"],
    correct: 2,
    explanation: "ARP (Address Resolution Protocol) broadcasts a query across the local network asking 'Who has IP X.X.X.X? Tell me your MAC address'."
  },
  {
    id: 60,
    category: "Internet Theory",
    subtopic: "Dynamic IP Allocation",
    question: "Which protocol automatically assigns IP addresses, subnet masks, default gateways, and DNS server addresses to client devices joining a network?",
    options: ["DHCP", "NAT", "BGP", "SNMP"],
    correct: 0,
    explanation: "DHCP (Dynamic Host Configuration Protocol) automatically allocates IP configuration parameters to devices via the DORA (Discover, Offer, Request, Acknowledge) process."
  },
  {
    id: 61,
    category: "Internet Theory",
    subtopic: "HTTP Methods",
    question: "In the HTTP protocol, which request method is designed to retrieve data from a web server without altering the server's state (idempotent and safe)?",
    options: ["POST", "GET", "PUT", "DELETE"],
    correct: 1,
    explanation: "HTTP GET requests are intended purely to retrieve representations of resources. They should be safe and idempotent, having no side effects on the server state."
  },
  {
    id: 62,
    category: "Internet Theory",
    subtopic: "HTTP Status Codes",
    question: "What does an HTTP 404 response status code sent by a web server signify?",
    options: [
      "Internal Server Error",
      "Unauthorized Access / Authentication Required",
      "Not Found (the requested resource could not be found on the server)",
      "Bad Gateway"
    ],
    correct: 2,
    explanation: "404 Not Found indicates that the origin server did not find a current representation for the target resource. 500 is Internal Server Error, 401 is Unauthorized, and 502 is Bad Gateway."
  },
  {
    id: 63,
    category: "Internet Theory",
    subtopic: "Web Storage & Tracking",
    question: "What is a small text file stored by the client web browser at the request of a website to maintain session state and preferences called?",
    options: ["Cookie", "Applet", "Plugin", "Socket"],
    correct: 0,
    explanation: "HTTP Cookies are small pieces of data sent from a website and stored on the user's computer by the user's web browser while browsing, used for session management and user tracking."
  },
  {
    id: 64,
    category: "Internet Theory",
    subtopic: "Network Address Translation",
    question: "What technology allows multiple private IP devices in a home or office LAN to share a single public IP address when accessing the internet?",
    options: ["VLAN", "NAT (Network Address Translation)", "DMZ", "VPN"],
    correct: 1,
    explanation: "NAT (specifically PAT or Port Address Translation) maps private IP addresses and ephemeral ports to a single public IP address, conserving IPv4 addresses."
  },
  {
    id: 65,
    category: "Internet Theory",
    subtopic: "URL Components",
    question: "In the URL 'https://www.example.com:8080/products?item=book#reviews', what part is '?item=book' called?",
    options: ["Path", "Fragment identifier", "Query string (or Query parameter)", "Hostname"],
    correct: 2,
    explanation: "'https' is the protocol/scheme, 'www.example.com' is the host, '8080' is the port, '/products' is the path, '?item=book' is the query string, and '#reviews' is the fragment identifier."
  },

  // ==========================================
  // SECTION 7: GIT & VERSION CONTROL (Q66 - Q80)
  // ==========================================
  {
    id: 66,
    category: "Git",
    subtopic: "Architecture",
    question: "What type of version control system is Git classified as?",
    options: [
      "Centralized Version Control System (CVCS)",
      "Distributed Version Control System (DVCS)",
      "Local-only Version Control System",
      "Client-locked Version Control System"
    ],
    correct: 1,
    explanation: "Git is a Distributed Version Control System (DVCS). Every developer has a complete local clone of the entire repository history, enabling offline commits, branching, and merging."
  },
  {
    id: 67,
    category: "Git",
    subtopic: "Three States",
    question: "Which of the following correctly describes the three primary states that files can reside in within a Git repository?",
    options: [
      "Working Directory, Staging Area (Index), and Repository (Commit history)",
      "Local, Staged, and Remote Cloud",
      "Draft, Review, and Published",
      "Checked-Out, Locked, and Unlocked"
    ],
    correct: 0,
    explanation: "Git's core architecture divides files into: the Working Directory (modified files), the Staging Area / Index (files marked to go into the next commit), and the Git Repository / Directory (.git folder containing committed snapshots)."
  },
  {
    id: 68,
    category: "Git",
    subtopic: "Initialization",
    question: "Which command transforms an existing local folder into a new Git version-controlled repository by creating a hidden '.git' directory?",
    options: ["git start", "git create", "git init", "git setup"],
    correct: 2,
    explanation: "'git init' initializes a new Git repository by creating the hidden .git metadata folder containing object storage, references, and configuration."
  },
  {
    id: 69,
    category: "Git",
    subtopic: "Staging Changes",
    question: "What command stages all modified, deleted, and newly created files in the entire project for the next commit?",
    options: ["git add .", "git commit -a", "git stage --save", "git push --all"],
    correct: 0,
    explanation: "'git add .' (or 'git add -A') stages all new, modified, and tracked deleted files in the repository to the staging index."
  },
  {
    id: 70,
    category: "Git",
    subtopic: "Committing",
    question: "Which Git command commits staged modifications along with an inline log message?",
    options: [
      "git commit -m 'Commit message'",
      "git save 'Commit message'",
      "git log -m 'Commit message'",
      "git push -m 'Commit message'"
    ],
    correct: 0,
    explanation: "'git commit -m \"message\"' records a snapshot of the staged changes in the local repository history with the given description."
  },
  {
    id: 71,
    category: "Git",
    subtopic: "Branching",
    question: "Which modern command creates a new branch named 'feature-login' and immediately switches your working directory to it?",
    options: [
      "git switch -c feature-login",
      "git branch --goto feature-login",
      "git new feature-login",
      "git merge feature-login"
    ],
    correct: 0,
    explanation: "'git switch -c feature-login' (or the classic 'git checkout -b feature-login') creates and switches to the new branch in one operation."
  },
  {
    id: 72,
    category: "Git",
    subtopic: "Syncing Remote",
    question: "What does the command 'git pull origin main' fundamentally execute under the hood?",
    options: [
      "It only downloads commits from the remote without merging",
      "It executes 'git fetch origin main' followed by 'git merge origin/main'",
      "It overwrites the local working directory with remote files completely",
      "It executes 'git push' in reverse"
    ],
    correct: 1,
    explanation: "'git pull' is essentially a combination of 'git fetch' (which downloads new data from the remote repository) and 'git merge' (which integrates remote changes into the current branch)."
  },
  {
    id: 73,
    category: "Git",
    subtopic: "Stashing",
    question: "If you have uncommitted changes in your working tree but need to quickly switch to another branch without committing, which command temporarily shelves your work?",
    options: ["git stash", "git pause", "git freeze", "git hold"],
    correct: 0,
    explanation: "'git stash' records the current state of the working directory and index and reverts back to a clean HEAD state. Later, you can restore changes with 'git stash pop'."
  },
  {
    id: 74,
    category: "Git",
    subtopic: "Excluding Files",
    question: "What is the name of the special text file located in the root of a repository used to specify intentionally untracked files and folders (e.g., node_modules, .env)?",
    options: [".gitexclude", ".gitignore", ".gitconfig", ".gitfilter"],
    correct: 1,
    explanation: "The '.gitignore' file contains patterns of file paths that Git should intentionally ignore and not track or prompt to stage."
  },
  {
    id: 75,
    category: "Git",
    subtopic: "Git Log & History",
    question: "Which command shows the commit history along with commit hashes, author details, dates, and commit messages?",
    options: ["git status", "git log", "git diff", "git show"],
    correct: 1,
    explanation: "'git log' displays the chronological history of commits made on the current branch. 'git status' shows current working directory status."
  },
  {
    id: 76,
    category: "Git",
    subtopic: "Conflict Resolution",
    question: "When does a 'Merge Conflict' occur in Git?",
    options: [
      "When two developers work on different branches simultaneously",
      "When Git cannot automatically resolve differences because competing changes were made to the exact same line(s) of a file in both branches",
      "Whenever you push to GitHub without an SSH key",
      "When a repository exceeds 1 GB in size"
    ],
    correct: 1,
    explanation: "Merge conflicts happen when competing changes are made to the same lines of code in different branches, or when a file is deleted in one branch and modified in another. Git pauses and requires manual resolution."
  },
  {
    id: 77,
    category: "Git",
    subtopic: "Head Pointer",
    question: "What does 'HEAD' represent in a Git repository?",
    options: [
      "The oldest commit ever made in the project repository",
      "A pointer/reference to the currently checked-out branch or commit snapshot",
      "The main administrator's account on GitHub",
      "The remote server URL configuration"
    ],
    correct: 1,
    explanation: "In Git, HEAD is a reference pointer pointing to the current branch reference or specific commit you are currently working on in your working directory."
  },
  {
    id: 78,
    category: "Git",
    subtopic: "Undoing Commits",
    question: "Which command is recommended in public, shared team branches to safely undo the effects of an earlier commit by creating a brand-new inverse commit?",
    options: ["git reset --hard", "git revert <commit-hash>", "git rebase -i", "git clean -fd"],
    correct: 1,
    explanation: "'git revert' is safe for shared public branches because it does not rewrite history; it creates a new commit that inverts the changes of the specified past commit."
  },
  {
    id: 79,
    category: "Git",
    subtopic: "Cloning",
    question: "Which command downloads an existing remote Git repository and all its history to your local computer?",
    options: ["git copy", "git fork", "git clone <url>", "git import"],
    correct: 2,
    explanation: "'git clone <url>' makes a complete local copy of an existing remote repository, automatically setting up the remote tracking branch 'origin'."
  },
  {
    id: 80,
    category: "Git",
    subtopic: "Hashing",
    question: "What cryptographic algorithm has Git historically used to identify commits, trees, blobs, and ensure data integrity via 40-character checksum strings?",
    options: ["MD5", "SHA-1", "RSA-2048", "AES-256"],
    correct: 1,
    explanation: "Git historically uses 160-bit SHA-1 hashes (expressed as 40 hexadecimal characters) to uniquely identify commits, blobs, and trees (with modern Git introducing SHA-256 support)."
  },

  // ==========================================
  // SECTION 8: HTML (HYPERTEXT MARKUP LANGUAGE) (Q81 - Q90)
  // ==========================================
  {
    id: 81,
    category: "HTML",
    subtopic: "Document Structure",
    question: "What is the very first declaration required at the top of an HTML5 document to instruct browsers to render in standards mode?",
    options: ["<!DOCTYPE html>", "<html>", "<meta version='5'>", "<?xml version='1.0'?>"],
    correct: 0,
    explanation: "<!DOCTYPE html> is the concise, case-insensitive doctype declaration introduced in HTML5 that forces modern web browsers into standards-compliant rendering mode."
  },
  {
    id: 82,
    category: "HTML",
    subtopic: "Semantic Elements",
    question: "Which of the following is a semantic HTML5 element meant specifically for primary navigation links on a webpage?",
    options: ["<links>", "<navigate>", "<nav>", "<menu-bar>"],
    correct: 2,
    explanation: "The '<nav>' tag is a semantic HTML5 element specifically intended to enclose major navigational blocks containing links to other pages or sections."
  },
  {
    id: 83,
    category: "HTML",
    subtopic: "Hyperlinks & Attributes",
    question: "Which HTML attribute and value configures a hyperlink anchor tag (<a>) to open the destination link in a new browser tab?",
    options: ["target='_blank'", "target='_new'", "window='open'", "href='newtab'"],
    correct: 0,
    explanation: "target='_blank' instructs the browser to open the linked document in a new window or tab. Modern best practices also recommend adding rel='noopener noreferrer' for security."
  },
  {
    id: 84,
    category: "HTML",
    subtopic: "Images & Accessibility",
    question: "What attribute of the <img> element provides alternate descriptive text for screen readers and when the image fails to load?",
    options: ["title", "alt", "src", "caption"],
    correct: 1,
    explanation: "The 'alt' attribute provides alternative text essential for web accessibility (screen readers for visually impaired users) and displays when the image cannot be loaded."
  },
  {
    id: 85,
    category: "HTML",
    subtopic: "Forms & Methods",
    question: "What is the primary difference between the HTTP form submission methods 'GET' and 'POST' in HTML?",
    options: [
      "GET sends form data encoded in the URL query string; POST sends form data inside the HTTP request body",
      "POST sends data visible in the URL; GET hides data",
      "GET is used for submitting passwords; POST is used for simple search queries",
      "GET can transmit binary files; POST cannot"
    ],
    correct: 0,
    explanation: "Method GET appends form data to the URL as name/value pairs in the query string (visible in browser history and address bar). POST encapsulates data in the HTTP body, suitable for sensitive or large payloads."
  },
  {
    id: 86,
    category: "HTML",
    subtopic: "Input Types",
    question: "Which HTML5 input type automatically restricts or validates user input to ensure it conforms to an email address format upon form submission?",
    options: ["<input type='mail'>", "<input type='email'>", "<input type='address'>", "<input type='text-email'>"],
    correct: 1,
    explanation: "<input type='email'> provides built-in browser-level email validation and triggers an email-optimized keyboard on mobile devices."
  },
  {
    id: 87,
    category: "HTML",
    subtopic: "Lists",
    question: "Which HTML element tag is used to create an Ordered (numbered) list of items?",
    options: ["<ul>", "<ol>", "<dl>", "<li>"],
    correct: 1,
    explanation: "'<ol>' creates an ordered (numbered or alphabetized) list. '<ul>' creates an unordered (bulleted) list. Each item inside both is marked with '<li>'."
  },
  {
    id: 88,
    category: "HTML",
    subtopic: "Tables",
    question: "Which table attribute allows a single table cell (<td> or <th>) to span across multiple horizontal columns?",
    options: ["rowspan", "colspan", "span", "colwidth"],
    correct: 1,
    explanation: "'colspan' defines the number of columns a cell should span horizontally. 'rowspan' defines how many vertical rows a cell spans."
  },
  {
    id: 89,
    category: "HTML",
    subtopic: "Metadata & Responsive Design",
    question: "Which <meta> tag setting inside the <head> element is critical for ensuring proper mobile responsive rendering and viewport scaling?",
    options: [
      "<meta name='viewport' content='width=device-width, initial-scale=1.0'>",
      "<meta name='screen' content='mobile=true'>",
      "<meta name='scale' content='responsive'>",
      "<meta http-equiv='mobile-optimize' content='100%'>"
    ],
    correct: 0,
    explanation: "The meta viewport tag (<meta name='viewport' content='width=device-width, initial-scale=1.0'>) sets the viewport width to the device screen width and establishes a 1:1 initial zoom ratio."
  },
  {
    id: 90,
    category: "HTML",
    subtopic: "Void Elements",
    question: "Which of the following HTML elements is a 'void' (self-closing) element that cannot contain any closing tag or child text nodes?",
    options: ["<p>", "<div>", "<br>", "<button>"],
    correct: 2,
    explanation: "Void elements in HTML cannot have child nodes or closing tags. Examples include <br>, <hr>, <img>, <input>, <link>, and <meta>."
  },

  // ==========================================
  // SECTION 9: CSS (CASCADING STYLE SHEETS) (Q91 - Q100)
  // ==========================================
  {
    id: 91,
    category: "CSS",
    subtopic: "Box Model",
    question: "What are the four components of the standard CSS Box Model, starting from the innermost layer to the outermost layer?",
    options: [
      "Margin, Border, Padding, Content",
      "Content, Padding, Border, Margin",
      "Content, Margin, Padding, Border",
      "Padding, Content, Border, Margin"
    ],
    correct: 1,
    explanation: "From inside out, the CSS Box Model consists of: (1) Content (text/images), (2) Padding (transparent area around content), (3) Border (line around padding), and (4) Margin (transparent space outside border)."
  },
  {
    id: 92,
    category: "CSS",
    subtopic: "Box Sizing",
    question: "What CSS property and value ensures that padding and borders are included within an element's total declared width and height?",
    options: [
      "box-sizing: content-box;",
      "box-sizing: border-box;",
      "box-model: include-padding;",
      "overflow: contain;"
    ],
    correct: 1,
    explanation: "With 'box-sizing: border-box;', the width and height properties include content, padding, and border, preventing unexpected layout expansion when adding padding."
  },
  {
    id: 93,
    category: "CSS",
    subtopic: "Selectors & Specificity",
    question: "Which CSS selector has the highest specificity weighting when resolving styling rule conflicts?",
    options: [
      "Element type selector (e.g., h1)",
      "Class selector (e.g., .card)",
      "ID selector (e.g., #header)",
      "Universal selector (*)"
    ],
    correct: 2,
    explanation: "Specificity hierarchy from lowest to highest: Universal selector (0,0,0,0) -> Element/pseudo-element (0,0,0,1) -> Class/attribute/pseudo-class (0,0,1,0) -> ID selector (0,1,0,0) -> Inline style (1,0,0,0)."
  },
  {
    id: 94,
    category: "CSS",
    subtopic: "Flexbox Layout",
    question: "In CSS Flexible Box Layout (Flexbox), which property aligns flex items along the primary main axis?",
    options: ["align-items", "justify-content", "align-content", "flex-wrap"],
    correct: 1,
    explanation: "'justify-content' aligns items along the main axis (horizontal by default in row layout). 'align-items' aligns items along the cross axis (vertical)."
  },
  {
    id: 95,
    category: "CSS",
    subtopic: "CSS Grid",
    question: "What CSS unit represents a fraction of the available free space in a CSS Grid container?",
    options: ["fr", "em", "vw", "%"],
    correct: 0,
    explanation: "The 'fr' unit represents a fraction of the leftover free space in the grid container. For example, 'grid-template-columns: 1fr 2fr;' divides space into 1/3 and 2/3 parts."
  },
  {
    id: 96,
    category: "CSS",
    subtopic: "Positioning",
    question: "How does an element with 'position: absolute;' position itself in the DOM?",
    options: [
      "Relative to the browser viewport at all times, unaffected by scrolling",
      "Relative to its nearest positioned ancestor (an ancestor with position other than static)",
      "According to the normal standard flow of the document",
      "Directly below its preceding sibling element"
    ],
    correct: 1,
    explanation: "An element with position: absolute is removed from normal flow and positioned relative to its closest ancestor with a position other than static (e.g., relative, absolute, fixed, or sticky). If none exists, it positions relative to the initial containing block."
  },
  {
    id: 97,
    category: "CSS",
    subtopic: "Positioning",
    question: "Which CSS position value keeps an element in normal document flow until a scroll threshold is reached, after which it behaves like 'fixed' within its parent container?",
    options: ["position: static;", "position: relative;", "position: sticky;", "position: inherit;"],
    correct: 2,
    explanation: "'position: sticky;' is a hybrid of relative and fixed positioning. It acts as relative until the user scrolls past a specified threshold (e.g., top: 0), where it sticks in place within its parent container."
  },
  {
    id: 98,
    category: "CSS",
    subtopic: "Units & Typography",
    question: "What is the key difference between the CSS length units 'em' and 'rem'?",
    options: [
      "'em' is relative to the root (<html>) font-size; 'rem' is relative to the immediate parent's font-size",
      "'rem' is relative to the root (<html>) font-size; 'em' is relative to the font-size of its direct parent or current element",
      "'em' is an absolute unit equal to pixels; 'rem' is a percentage unit",
      "There is no difference; both are interchangeable root units"
    ],
    correct: 1,
    explanation: "'rem' stands for 'root em' and always scales relative to the <html> root element's font-size (default 16px). 'em' cascades and compounds based on the element's inherited font-size."
  },
  {
    id: 99,
    category: "CSS",
    subtopic: "Media Queries",
    question: "Which CSS rule is used to apply specific styles only when the viewport width is 768 pixels or narrower (e.g., for mobile screens)?",
    options: [
      "@media screen and (max-width: 768px) { ... }",
      "@screen min-width: 768px { ... }",
      "@media only device: 768 { ... }",
      "@viewport width <= 768px { ... }"
    ],
    correct: 0,
    explanation: "@media screen and (max-width: 768px) { ... } specifies a media query condition where rules inside only apply when the viewport width is less than or equal to 768px."
  },
  {
    id: 100,
    category: "CSS",
    subtopic: "Layering & Stacking",
    question: "Which CSS property specifies the z-order (stacking level) of an overlapping positioned element along the perpendicular 3D screen axis?",
    options: ["stack-order", "layer-index", "z-index", "elevation"],
    correct: 2,
    explanation: "The 'z-index' property specifies the stack level of a positioned element along the z-axis. Elements with higher z-index values appear in front of elements with lower values within the same stacking context."
  }
];

// Export for module systems or attach to global window
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CBT_QUESTIONS;
} else if (typeof window !== 'undefined') {
  window.CBT_QUESTIONS = CBT_QUESTIONS;
}
