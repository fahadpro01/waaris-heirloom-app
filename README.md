# 📜 Waaris (वारिस) - Universal Family Financial Security & Asset Recovery Protocol (All Age Groups)

[![Vercel Deployment](https://img.shields.io/badge/Deployment-Vercel-000000?style=for-the-badge&logo=vercel)](https://temporary-fleet-carbon-4mwqziz.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-fahadpro01%2Fwaaris--heirloom--app-181717?style=for-the-badge&logo=github)](https://github.com/fahadpro01/waaris-heirloom-app)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![WebGPU AI](https://img.shields.io/badge/AI-On--Device_WebGPU-059669?style=for-the-badge)](https://webgpu.io)
[![DigiLocker](https://img.shields.io/badge/Integration-MeitY_DigiLocker-0284C7?style=for-the-badge)](https://digilocker.gov.in)

> **Waaris (वारिस)** is a universal family financial security map and automated asset recovery protocol designed for individuals and families **across all age groups** (young working professionals, adults, parents, and seniors). It enables users to record, verify, and auto-discover bank savings accounts, FDs, LIC policies, EPF provident funds, mutual funds, and shares—ensuring family members can effortlessly claim financial assets without password dependencies or expensive legal aid.

---

## 🚀 Live Demo & Pitch Deck Presentation

- 🌐 **Live Web Application**: [https://temporary-fleet-carbon-4mwqziz.vercel.app](https://temporary-fleet-carbon-4mwqziz.vercel.app)
- 📦 **GitHub Repository**: [https://github.com/fahadpro01/waaris-heirloom-app](https://github.com/fahadpro01/waaris-heirloom-app)

---

## 📊 The Macro Problem: ₹1.5 Lakh Cr to ₹2 Lakh Cr ($18B–$24B) Unclaimed Asset Pool

Over **₹1.5 Lakh Crore to ₹2 Lakh Crore** in total unclaimed financial assets is estimated to be lying forgotten in India across bank savings accounts, provident funds (PF), life insurance, shares, and mutual funds.

### 2026 Estimated Unclaimed Amounts by Regulatory Custodian:

| Financial Asset Category | Regulatory Custodian / Pool | Estimated Unclaimed Amount |
| :--- | :--- | :--- |
| **Bank Savings & FDs** | RBI’s Depositor Education & Awareness (DEA) Fund | **₹60,518 Crore** |
| **Provident Fund (EPF)** | Employees' Provident Fund Organisation (EPFO) | **₹27,000 to ₹80,000 Crore** |
| **Shares & Dividends** | Investor Education & Protection Fund (IEPF) | **₹25,000 to ₹65,000 Crore** |
| **Life Insurance Policies** | IRDAI / Respective Insurers | **₹8,973 Crore** |
| **Mutual Funds** | SEBI / Asset Management Companies (AMCs) | **₹3,811 Crore** *(Officially reported for FY26)* |

### Why Families Across All Age Groups Lose Wealth:
1. **Scattered Accounts**: Working professionals and families open accounts across multiple banks over changing jobs, cities, and life stages without a single central record.
2. **Missing Nominees**: Over 50% of savings accounts and insurance policies lack updated nominee names, causing civil court succession certificate battles.
3. **Complex Legal Claim Notices**: Submitting bank claim forms (Form 20, EPFO 10D/5IF) requires specialized legal wording that families cannot easily manage without expensive lawyers.

---

## 🌟 Core Features & Innovations

### 1. 1-Tap RBI Account Aggregator Auto-Discovery
- Auto-scans savings accounts, fixed deposits, LIC policy bonds, and EPF balances tied to the primary mobile number across major Indian institutions (**SBI, HDFC, ICICI, Axis, LIC, EPFO**).
- Displays discovered balances prior to importing into the family map (Jupiter / Fi Money style authentication).

### 2. MeitY DigiLocker Government Vault
- Direct Govt of India document integration with official green verified status badges.
- Imports verified insurance policy bonds, EPF UAN certificates, and PAN cards directly into the family asset map with 1 tap.

### 3. On-Device WebGPU AI Legal Claim Writer
- Executes local LLM models (Llama 3.3 / DeepSeek) directly inside browser GPU memory (WebGPU / Wasm).
- Automatically writes official legal heir claim notices for RBI DEA, EPFO, IRDAI, and SEBI pools with **0 cloud data leaks**.

### 4. Universal High-Readability UX (All Age Groups)
- Warm light palette (`#FDFBF7`), emerald green (`#059669`), warm gold (`#D97706`). **Zero dark mode**, zero black backgrounds.
- Built-in **Voice Navigation Assistant** providing step-by-step audio walkthroughs.
- Standalone PWA taskbar and mobile home screen installation support.

### 5. 8-Question Family Safety Audit Scorecard
- Interactive readiness evaluation assessing nominee updates, joint account clauses, legal wills, digital access recovery, and vault backups.

---

## 🛡️ Hackathon Judge Defense Guide: Why Waaris is NOT an AI Wrapper

| Judge Question | Defense Strategy |
| :--- | :--- |
| **"Is this just a wrapper around ChatGPT?"** | **No.** Waaris integrates real financial protocol infrastructure: RBI Account Aggregator auto-discovery pipelines, MeitY DigiLocker OAuth integration, offline state persistence, and WebGPU local LLMs running 100% on device. |
| **"How is user security & privacy guaranteed?"** | Zero net banking passwords, PINs, or confidential credentials are requested or stored. Data is stored strictly on local device memory tied to verified phone OTP sessions. |
| **"What happens offline?"** | Local WebGPU AI models draft legal claim letters even without an active internet connection. |

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 18.3, TypeScript 5.5, Vite 5.4, Tailwind CSS 3.4
- **Icons**: Lucide React
- **PWA Capabilities**: Service Worker Network-First Strategy (`waaris-v2`), Web App Manifest, Standalone Mobile Viewport
- **AI Execution**: Local WebGPU / Wasm LLMs (Llama 3.3 / DeepSeek) with OpenRouter fallback
- **Integrations**: RBI Account Aggregator Protocol, MeitY DigiLocker OAuth
- **Deployments**: Vercel Edge Network

---

## 💻 Local Setup & Installation

```bash
# 1. Clone the repository
git clone https://github.com/fahadpro01/waaris-heirloom-app.git

# 2. Navigate into the project directory
cd waaris-heirloom-app

# 3. Install dependencies
npm install

# 4. Start the Vite development server
npm run dev
```

Open `http://localhost:3000` in your web browser.

---

## 📦 Build & Deployment Commands

```bash
# Compile TypeScript & Build Production Bundle
npm run build

# Preview Production Build Locally
npm run preview
```

---

## 📄 License & Attribution

Universal family financial security and asset recovery protocol for all age groups across India. Built with 💚 for families.
