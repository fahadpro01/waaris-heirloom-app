import PptxGenJS from 'pptxgenjs';
import path from 'path';

const pptx = new PptxGenJS();

pptx.layout = 'LAYOUT_16x9';
pptx.title = 'Waaris Pitch Deck';
pptx.company = 'Waaris Financial Security Protocol';
pptx.author = 'Waaris Team';

// Define Color Palette
const COLORS = {
  bgLight: 'FDFBF7',
  bgCard: 'FFFFFF',
  emeraldDark: '064E3B',
  emeraldPrimary: '059669',
  emeraldLight: 'D1FAE5',
  amberDark: '92400E',
  amberPrimary: 'D97706',
  textDark: '1C1917',
  textMuted: '44403C',
  white: 'FFFFFF',
  accentBorder: 'E7E5E4'
};

// Slide 1: Title Slide
const slide1 = pptx.addSlide();
slide1.background = { color: COLORS.emeraldDark };

slide1.addText('WARIS (वारिस)', {
  x: 0.8, y: 1.8, w: 11.5, h: 0.8,
  fontSize: 44, bold: true, color: COLORS.white, fontFace: 'Arial'
});

slide1.addText('Senior-Accessible Family Financial Security & Asset Recovery Protocol', {
  x: 0.8, y: 2.7, w: 11.5, h: 0.6,
  fontSize: 22, color: 'A7F3D0', fontFace: 'Arial'
});

slide1.addText('Discover Unclaimed Accounts • MeitY DigiLocker Vault • On-Device Local AI Claim Generator', {
  x: 0.8, y: 3.6, w: 11.5, h: 0.5,
  fontSize: 14, color: COLORS.white, fontFace: 'Arial'
});

slide1.addShape(pptx.shapes.RECTANGLE, {
  x: 0.8, y: 4.8, w: 4.5, h: 0.8,
  fill: { color: COLORS.emeraldPrimary }, line: { color: 'A7F3D0', width: 1 }
});
slide1.addText('100% Confidential • Zero Passwords', {
  x: 0.8, y: 4.8, w: 4.5, h: 0.8,
  fontSize: 14, bold: true, color: COLORS.white, align: 'center', fontFace: 'Arial'
});


// Slide 2: The Problem
const slide2 = pptx.addSlide();
slide2.background = { color: COLORS.bgLight };

slide2.addText('THE PROBLEM', {
  x: 0.8, y: 0.6, w: 11.5, h: 0.4,
  fontSize: 14, bold: true, color: COLORS.amberPrimary, fontFace: 'Arial'
});
slide2.addText('₹1.5 Lakh Crore+ ($18B) Unclaimed in Indian Financial System', {
  x: 0.8, y: 1.0, w: 11.5, h: 0.6,
  fontSize: 26, bold: true, color: COLORS.textDark, fontFace: 'Arial'
});

// Problem Cards
const problems = [
  { title: 'Forgotten Accounts', desc: 'Seniors open accounts across SBI, HDFC, LIC, EPFO over 40+ years without central record.', color: COLORS.emeraldLight },
  { title: 'Missing Nominees', desc: 'Over 50% of bank accounts & PF policies lack updated nominee names, leading to court succession battles.', color: COLORS.emeraldLight },
  { title: 'Bureaucratic Hurdles', desc: 'Bereaved families face complex bank claim notices (Form 20, 10D, 5IF) requiring expensive legal aid.', color: COLORS.emeraldLight }
];

problems.forEach((p, idx) => {
  const xPos = 0.8 + idx * 3.8;
  slide2.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: xPos, y: 2.0, w: 3.5, h: 4.2,
    fill: { color: COLORS.bgCard }, line: { color: COLORS.accentBorder, width: 2 }
  });
  slide2.addText(`0${idx + 1}`, {
    x: xPos + 0.3, y: 2.3, w: 1.0, h: 0.6,
    fontSize: 28, bold: true, color: COLORS.emeraldPrimary, fontFace: 'Arial'
  });
  slide2.addText(p.title, {
    x: xPos + 0.3, y: 3.0, w: 2.9, h: 0.6,
    fontSize: 18, bold: true, color: COLORS.textDark, fontFace: 'Arial'
  });
  slide2.addText(p.desc, {
    x: xPos + 0.3, y: 3.7, w: 2.9, h: 2.2,
    fontSize: 13, color: COLORS.textMuted, fontFace: 'Arial'
  });
});


// Slide 3: The Solution
const slide3 = pptx.addSlide();
slide3.background = { color: COLORS.bgLight };

slide3.addText('THE SOLUTION', {
  x: 0.8, y: 0.6, w: 11.5, h: 0.4,
  fontSize: 14, bold: true, color: COLORS.emeraldPrimary, fontFace: 'Arial'
});
slide3.addText('Waaris: Unified Family Asset Map & Recovery Platform', {
  x: 0.8, y: 1.0, w: 11.5, h: 0.6,
  fontSize: 26, bold: true, color: COLORS.textDark, fontFace: 'Arial'
});

const solutionFeatures = [
  { name: '1-Tap Asset Auto-Discovery', detail: 'Scans SBI, HDFC, ICICI, LIC, EPFO via primary mobile number with Jupiter/Fi style AA integration.' },
  { name: 'MeitY DigiLocker Vault', detail: 'Direct government integration importing verified policy bonds, UAN certificates, and PAN.' },
  { name: 'On-Device AI Claim Writer', detail: 'WebGPU local LLM execution generating legally structured claim letters with 0 cloud data exposure.' },
  { name: 'Senior 50+ Accessible UX', detail: 'Warm light palette (#FDFBF7), zero dark mode, built-in Voice Assistant, and PWA taskbar support.' }
];

solutionFeatures.forEach((f, idx) => {
  const yPos = 1.9 + idx * 1.25;
  slide3.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: yPos, w: 11.7, h: 1.1,
    fill: { color: COLORS.bgCard }, line: { color: COLORS.emeraldPrimary, width: 1.5 }
  });
  slide3.addText(f.name, {
    x: 1.1, y: yPos + 0.15, w: 3.5, h: 0.8,
    fontSize: 16, bold: true, color: COLORS.emeraldDark, fontFace: 'Arial'
  });
  slide3.addText(f.detail, {
    x: 4.6, y: yPos + 0.15, w: 7.6, h: 0.8,
    fontSize: 13, color: COLORS.textMuted, fontFace: 'Arial'
  });
});


// Slide 4: Key Pillars
const slide4 = pptx.addSlide();
slide4.background = { color: COLORS.emeraldDark };

slide4.addText('CORE PRODUCT PILLARS', {
  x: 0.8, y: 0.6, w: 11.5, h: 0.4,
  fontSize: 14, bold: true, color: 'A7F3D0', fontFace: 'Arial'
});
slide4.addText('Why Waaris Outperforms Standard Apps', {
  x: 0.8, y: 1.0, w: 11.5, h: 0.6,
  fontSize: 26, bold: true, color: COLORS.white, fontFace: 'Arial'
});

const pillars = [
  { title: 'Privacy First', text: 'No passwords requested. 100% local encrypted state per mobile number.' },
  { title: 'Govt Verified', text: 'MeitY DigiLocker verified green badges for official claim validity.' },
  { title: 'Local WebGPU AI', text: 'On-device LLMs run directly in browser without sending sensitive asset data online.' },
  { title: 'Senior Ergonomics', text: 'Voice navigation assistant, large typography, and zero dark mode confusion.' }
];

pillars.forEach((pil, idx) => {
  const row = Math.floor(idx / 2);
  const col = idx % 2;
  const xPos = 0.8 + col * 5.9;
  const yPos = 2.0 + row * 2.4;

  slide4.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: xPos, y: yPos, w: 5.5, h: 2.1,
    fill: { color: COLORS.bgCard }, line: { color: 'A7F3D0', width: 2 }
  });
  slide4.addText(pil.title, {
    x: xPos + 0.4, y: yPos + 0.3, w: 4.7, h: 0.5,
    fontSize: 18, bold: true, color: COLORS.emeraldDark, fontFace: 'Arial'
  });
  slide4.addText(pil.text, {
    x: xPos + 0.4, y: yPos + 0.8, w: 4.7, h: 1.0,
    fontSize: 13, color: COLORS.textMuted, fontFace: 'Arial'
  });
});


// Slide 5: Technical Architecture
const slide5 = pptx.addSlide();
slide5.background = { color: COLORS.bgLight };

slide5.addText('TECHNICAL ARCHITECTURE', {
  x: 0.8, y: 0.6, w: 11.5, h: 0.4,
  fontSize: 14, bold: true, color: COLORS.emeraldPrimary, fontFace: 'Arial'
});
slide5.addText('Modern WebGPU + PWA Client Protocol', {
  x: 0.8, y: 1.0, w: 11.5, h: 0.6,
  fontSize: 26, bold: true, color: COLORS.textDark, fontFace: 'Arial'
});

const techStack = [
  { layer: 'Frontend Layer', tech: 'React 18 + Vite + Tailwind CSS (Senior Palette)' },
  { layer: 'Auto-Discovery Engine', tech: 'RBI Account Aggregator Protocol + Telecom OTP Auth' },
  { layer: 'Document Verification', tech: 'MeitY DigiLocker OAuth & Document Vault' },
  { layer: 'AI Execution Engine', tech: 'Local WebGPU / Wasm (Llama 3.3 / DeepSeek) + Fallback Cloud API' },
  { layer: 'PWA Mobile Layer', tech: 'Standalone Viewport, Web App Manifest, Service Worker Network-First' }
];

techStack.forEach((ts, idx) => {
  const yPos = 1.9 + idx * 1.0;
  slide5.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: yPos, w: 11.7, h: 0.85,
    fill: { color: COLORS.bgCard }, line: { color: COLORS.accentBorder, width: 1 }
  });
  slide5.addText(ts.layer, {
    x: 1.1, y: yPos + 0.15, w: 3.5, h: 0.5,
    fontSize: 14, bold: true, color: COLORS.emeraldPrimary, fontFace: 'Arial'
  });
  slide5.addText(ts.tech, {
    x: 4.6, y: yPos + 0.15, w: 7.6, h: 0.5,
    fontSize: 13, bold: true, color: COLORS.textDark, fontFace: 'Arial'
  });
});


// Slide 6: Hackathon Judge Defense Guide
const slide6 = pptx.addSlide();
slide6.background = { color: COLORS.bgLight };

slide6.addText('JUDGE DEFENSE STRATEGY', {
  x: 0.8, y: 0.6, w: 11.5, h: 0.4,
  fontSize: 14, bold: true, color: COLORS.amberPrimary, fontFace: 'Arial'
});
slide6.addText('Why Waaris is NOT an AI Wrapper', {
  x: 0.8, y: 1.0, w: 11.5, h: 0.6,
  fontSize: 26, bold: true, color: COLORS.textDark, fontFace: 'Arial'
});

const defensePoints = [
  { q: 'Is this just a wrapper around ChatGPT?', a: 'No. Waaris integrates real financial protocol logic: RBI Account Aggregator auto-discovery, DigiLocker MeitY verification, state persistence, and WebGPU local LLMs running 100% on device.' },
  { q: 'How is senior safety guaranteed?', a: 'Zero net banking credential collection. Data is stored strictly on local device storage tied to verified phone OTP session.' },
  { q: 'What happens offline?', a: 'Local WebGPU AI models draft claim letters even without an active internet connection.' }
];

defensePoints.forEach((dp, idx) => {
  const yPos = 1.9 + idx * 1.6;
  slide6.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: yPos, w: 11.7, h: 1.4,
    fill: { color: COLORS.bgCard }, line: { color: COLORS.amberPrimary, width: 1.5 }
  });
  slide6.addText(`Q: ${dp.q}`, {
    x: 1.1, y: yPos + 0.15, w: 11.1, h: 0.4,
    fontSize: 15, bold: true, color: COLORS.amberDark, fontFace: 'Arial'
  });
  slide6.addText(`A: ${dp.a}`, {
    x: 1.1, y: yPos + 0.55, w: 11.1, h: 0.7,
    fontSize: 13, color: COLORS.textMuted, fontFace: 'Arial'
  });
});


// Slide 7: Live Status & Roadmap
const slide7 = pptx.addSlide();
slide7.background = { color: COLORS.emeraldDark };

slide7.addText('LIVE STATUS & NEXT STEPS', {
  x: 0.8, y: 1.2, w: 11.5, h: 0.4,
  fontSize: 14, bold: true, color: 'A7F3D0', fontFace: 'Arial'
});
slide7.addText('Waaris (वारिस) is Live & Ready', {
  x: 0.8, y: 1.7, w: 11.5, h: 0.6,
  fontSize: 32, bold: true, color: COLORS.white, fontFace: 'Arial'
});
slide7.addText('Deployed on Vercel with PWA Mobile Standalone Support', {
  x: 0.8, y: 2.4, w: 11.5, h: 0.5,
  fontSize: 18, color: 'A7F3D0', fontFace: 'Arial'
});

slide7.addShape(pptx.shapes.RECTANGLE, {
  x: 0.8, y: 3.4, w: 11.7, h: 1.2,
  fill: { color: COLORS.white }, line: { color: COLORS.emeraldPrimary, width: 2 }
});
slide7.addText('Live Application URL:', {
  x: 1.1, y: 3.6, w: 11.1, h: 0.3,
  fontSize: 12, bold: true, color: COLORS.textMuted, fontFace: 'Arial'
});
slide7.addText('https://temporary-agile-orion-nb23bbw.vercel.app', {
  x: 1.1, y: 3.9, w: 11.1, h: 0.5,
  fontSize: 18, bold: true, color: COLORS.emeraldPrimary, fontFace: 'Arial'
});

// Save presentation
const outputPath = path.resolve(process.cwd(), 'Waaris_Pitch_Deck.pptx');
pptx.writeFile({ fileName: outputPath }).then(fileName => {
  console.log(`PPTX created successfully at: ${fileName}`);
}).catch(err => {
  console.error('Error creating PPTX:', err);
});
