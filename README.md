<div align="center">

# 💻 Must-Know About Computing
### Windows CLI Package Management & Interactive Command Generator

[![Live Demo](https://img.shields.io/badge/Live%20Website-GitHub%20Pages-success?style=for-the-badge&logo=github)](https://nextsemacademy-max.github.io/Must-Know-about-computing-/)
[![Windows](https://img.shields.io/badge/Platform-Windows%2010%20%7C%2011-0078D6?style=for-the-badge&logo=windows)](https://learn.microsoft.com/en-us/windows/package-manager/winget/)
[![Nextsem Academy](https://img.shields.io/badge/Powered%20By-Nextsem%20Academy-0d1117?style=for-the-badge)](https://github.com/nextsemacademy-max)

<p align="center">
  <strong>A comprehensive, step-by-step interactive visual guide for searching, installing, upgrading, and uninstalling applications via terminal using Windows Package Manager (<code>winget</code>).</strong>
</p>

[🌐 **Launch Live Web App**](https://nextsemacademy-max.github.io/Must-Know-about-computing-/) &bull; [📖 **Quick Reference**](#-quick-command-cheat-sheet) &bull; [⚙️ **Interactive Generator**](#-interactive-generator-features) &bull; [🛠️ **Troubleshooting**](#-troubleshooting--error-resolutions)

</div>

---

## 🌟 Overview

Modern Windows includes a built-in command-line package manager called **`winget`**. It allows users and developers to automate software management without navigating browser download pages, clicking through GUI installers, or dealing with unwanted installer bundled bloatware.

This repository hosts both the complete educational guide and an **interactive command generator** that builds ready-to-run batch setup commands for your PC.

---

## ✨ Features

- **📸 100% Real-Terminal Verified:** Every single step includes verified PowerShell screenshots with timestamps, demonstrating real output.
- **🌓 Dark & Light Mode:** Seamlessly switch between GitHub-dark and light themes with automatic preference persistence.
- **⚙️ Interactive Command Generator:** Select software (VS Code, Git, Chrome, Node.js, Python, VLC, etc.) to generate one-line silent install scripts.
- **🛡️ Battle-Tested Troubleshooting:** Practical resolutions for real-world Windows errors (TLS cert errors, timeout issues, parameter gotchas).
- **📱 Zero Dependencies:** Built with pure Vanilla HTML5, CSS3, and JavaScript — fast, responsive, and lightweight.

---

## 🚀 Quick Command Cheat Sheet

| Action | Command | Purpose |
| :--- | :--- | :--- |
| **Check Version & Sources** | `winget --version; winget source list` | Verify installation and source endpoints |
| **Search an App** | `winget search <app> -s winget` | Locate the exact package `Id` |
| **Install an App** | `winget install --id <Id> -s winget -e` | Install using unique ID |
| **Silent Unattended Install** | `winget install --id <Id> -s winget -e --silent --accept-package-agreements --accept-source-agreements` | Background install with no prompts |
| **Inspect Installed App** | `winget list <app>` | Check installed version & source |
| **Check Available Upgrades** | `winget upgrade -s winget` | Lists all outdated apps |
| **Single App Upgrade** | `winget upgrade --id <Id> -s winget` | Update specific software |
| **Bulk Upgrade All Apps** | `winget upgrade --all -s winget --silent` | One-command upgrade for all apps |
| **Uninstall an App** | `winget uninstall --id <Id> --silent` | Clean removal without leftover files |

---

## 📚 Curriculum Steps Included

### Step 0: Elevated Administrator Privileges
Learn how to launch terminal with administrator rights required to write to `Program Files`.
* **Shortcut:** <kbd>Win</kbd> + <kbd>X</kbd> &rarr; <kbd>A</kbd> (Terminal / PowerShell Admin).

### Step 1: Verify Winget & Configured Sources
Inspect the version (`v1.9.25200`) and the two default sources: `msstore` (Microsoft Store) and `winget` (Community catalog).
```powershell
winget --version; winget source list
```

### Step 2: Search for an Application
Identify the unique, unambiguous package `Id` (e.g. `Google.Chrome`) to avoid installing lookalikes.
```powershell
winget search chrome -s winget
```

### Step 3: Install an Application with Duplicate Protection
Install using `-s winget` to bypass Store TLS issues. Demonstrates how winget intelligently detects existing installations and checks for upgrades safely.
```powershell
winget install --id Google.Chrome -s winget -e --accept-package-agreements --accept-source-agreements
```

### Step 4: Verify Installed Application & Resilience
Inspect package version and understand how winget continues returning results even if one source encounters a network warning.
```powershell
winget list Google.Chrome
```

### Step 5: Check & Perform Upgrades
Scan your entire system against the repository and perform single or bulk unattended updates.
```powershell
winget upgrade -s winget
```

### Step 6: Clean Uninstallation
Remove software cleanly using unique IDs and optional `--purge` flags.
```powershell
winget uninstall --id Google.Chrome --silent
```

---

## 🛠️ Troubleshooting & Error Resolutions

The repository documents solutions for the most frequent Windows package management errors:

| Error Code / Message | Root Cause | Solution |
| :--- | :--- | :--- |
| **`0x8a15005e : The server certificate did not match...`** | Network inspection (VPN/proxy/antivirus HTTPS scanning) or stale store cache causes TLS failure on `msstore`. | Bypass `msstore` by targeting `winget` directly: `winget install --id <Id> -s winget` |
| **`No sources match the given value: -e`** | Omitting the source name after `-s`. | Always specify source: `-s winget -e` |
| **`0x80072ee2 : ERROR_INTERNET_TIMEOUT`** | Network timeout downloading runtime dependencies (e.g. `Microsoft.UI.Xaml`), or app is in active use. | Retry command or close in-use application prior to updating. |
| **`'winget' is not recognized...`** | Older Windows 10 build or App Installer disabled. | Update **App Installer** in Microsoft Store or install `.msixbundle` from GitHub releases. |
| **`0x80070005 : Access is Denied (Exit 1603)`** | Insufficient permissions to modify system folders. | Relaunch PowerShell via **Run as administrator**. |

---

## 💻 Local Setup & Development

To run or modify the project locally:

```powershell
# 1. Clone the repository
git clone https://github.com/nextsemacademy-max/Must-Know-about-computing-.git
cd Must-Know-about-computing-

# 2. Open index.html directly in any browser
Start-Process index.html
```

---

## 🌐 Deploying to GitHub Pages

This project is configured to deploy directly to GitHub Pages from the `main` branch:
1. Go to **Settings** &rarr; **Pages**.
2. Set **Branch** to `main` and directory to `/ (root)`.
3. Click **Save**. GitHub Actions builds and publishes the live site automatically.

---

<div align="center">

Developed with ❤️ for **Nextsem Academy**  
*Empowering learners with practical, real-world computing & developer skills.*

</div>
