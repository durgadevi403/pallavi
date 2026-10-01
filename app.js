/* ============================================================
   UNAGALIL ORUTHI — app.js
   உங்களில் ஒருத்தி — AI-Powered Rural Women Empowerment
   ============================================================ */

'use strict';

// ===== GLOBAL STATE =====
const STATE = {
  lang: 'ta',
  largeFontOn: false,
  highContrastOn: false,
  signModeOn: false,
  voiceActive: false,
  recognition: null,
  synth: window.speechSynthesis,
  currentSection: 'home',
};

// ===== SCHEME DATA =====
const SCHEMES = {
  pudhumai: {
    icon: '🎓',
    name: 'புதுமை பெண் திட்டம்',
    nameEn: 'Pudhumai Penn Scheme',
    amount: '₹1,000 / மாதம்',
    desc: 'அரசு பள்ளியில் படித்து, அரசு கல்லூரியில் இளங்கலை படிக்கும் மாணவிகளுக்கு மாதாமாதம் ₹1000 வழங்கப்படுகிறது.',
    eligibility: ['அரசு பள்ளியில் 1–12 வரை படித்திருக்க வேண்டும்', 'அரசு / அரசு உதவி பெறும் கல்லூரியில் படிக்க வேண்டும்', 'வயது 18–25 வருடங்கள்', 'தமிழ்நாடு குடியிருப்பாளர்'],
    docs: ['ஆதார் கார்டு', 'கல்லூரி அட்மிஷன் கடிதம்', '12வது மார்க் ஷீட்', 'வங்கி பாஸ்புக்', 'பாஸ்போர்ட் சைஸ் போட்டோ'],
    steps: ['1. emis.tn.gov.in வலைதளம் திற', '2. Pudhumai Penn பட்டனை கிளிக் செய்', '3. உங்கள் ஆதார் எண் கொடு', '4. கல்லூரி விவரங்கள் நிரப்பு', '5. ஆவணங்கள் அப்லோட் செய்', '6. Submit — முடிந்தது!'],
    category: 'education',
  },
  magalir: {
    icon: '💰',
    name: 'கலைஞர் மகளிர் உரிமை தொகை',
    nameEn: 'Kalaignar Magalir Urimai Thogai',
    amount: '₹1,000 / மாதம்',
    desc: 'குடும்பத்தலைவியாக உள்ள மகளிருக்கு மாதாமாதம் ₹1000 நேரடியாக வங்கி கணக்கில் வரும்.',
    eligibility: ['வயது 21 ஆண்டுகளுக்கு மேல்', 'குடும்பத்தலைவி / ரேஷன் கார்டு தலைவி', 'ஆண்டு வருமானம் ₹2.5 லட்சத்திற்கு கீழ்', 'தமிழ்நாட்டில் வசிக்க வேண்டும்'],
    docs: ['ஆதார் கார்டு', 'ரேஷன் கார்டு', 'வங்கி பாஸ்புக்', 'வருமான சான்றிதழ்'],
    steps: ['1. ஆதார் ரேஷன் கார்டுடன் பொருத்துங்கள்', '2. அருகிலுள்ள வட்டார அலுவலகம் செல்லுங்கள்', '3. இணையதளம்: urimaithogai.tn.gov.in', '4. விண்ணப்பம் நிரப்புங்கள்', '5. ஆவணங்கள் அளியுங்கள்', '6. 30 நாட்களில் தொகை வங்கி கணக்கில் வரும்'],
    category: 'financial',
  },
  shg: {
    icon: '🤝',
    name: 'SHG — சுய உதவிக் குழு கடன்',
    nameEn: 'Self Help Group Loan',
    amount: '₹10,000 – ₹1,00,000',
    desc: 'SHG குழுக்களில் அங்கம் வகிக்கும் பெண்களுக்கு வட்டியில்லா அல்லது குறைந்த வட்டியில் கடன் கிடைக்கும்.',
    eligibility: ['18 வயது மேல் உள்ள பெண்', 'SHG உறுப்பினராக 6 மாதம் ஆனவர்', 'தமிழ்நாட்டில் வசிக்க வேண்டும்', 'BPL / குறைந்த வருமான குடும்பம்'],
    docs: ['ஆதார் கார்டு', 'SHG உறுப்பினர் சான்றிதழ்', 'வங்கி பாஸ்புக்', 'புகைப்படம்'],
    steps: ['1. அருகிலுள்ள SHG குழுவில் சேருங்கள்', '2. 6 மாதம் சேமிப்பு செய்யுங்கள்', '3. குழு மூலம் விண்ணப்பம் அனுப்புங்கள்', '4. வங்கி ஆய்வு', '5. கடன் அனுமதி', '6. கணக்கில் பணம் வரும்'],
    category: 'financial',
  },
  moovalur: {
    icon: '🏥',
    name: 'மூவலூர் ராமாமிர்தம் திட்டம்',
    nameEn: 'Moovalur Ramamirtham Ammaiyar Scheme',
    amount: '₹18,000 + ஊட்டச்சத்து கிட்',
    desc: 'கர்ப்பிணி மற்றும் பாலூட்டும் தாய்மார்களுக்கு ₹18,000 மற்றும் ஊட்டச்சத்து கிட் வழங்கப்படும்.',
    eligibility: ['கர்ப்பிணி / பாலூட்டும் தாய்', 'BPL அல்லது நடுத்தர வருமான குடும்பம்', 'அரசு மருத்துவமனையில் பதிவு செய்திருக்க வேண்டும்'],
    docs: ['ஆதார் கார்டு', 'கர்ப்ப ஆரோக்கிய அட்டை', 'வங்கி பாஸ்புக்', 'ரேஷன் கார்டு'],
    steps: ['1. அருகிலுள்ள அரசு மருத்துவமனை / PHC செல்லுங்கள்', '2. கர்ப்பகால பதிவு செய்யுங்கள்', '3. ஆவணங்கள் கொடுங்கள்', '4. 4 தவணைகளில் பணம் வரும்'],
    category: 'health',
  },
  pmay: {
    icon: '🏠',
    name: 'PMAY — பிரதான மந்திரி ஆவாஸ் யோஜனா',
    nameEn: 'PM Awas Yojana — Gramin',
    amount: '₹1,20,000 மானியம்',
    desc: 'கிராமப்புற குடும்பங்களுக்கு வீடு கட்ட மத்திய அரசு ₹1.20 லட்சம் மானியம் வழங்குகிறது. பெண் பெயரில் வீடு கட்ட முன்னுரிமை!',
    eligibility: ['கிராமப்புற குடும்பம்', 'சொந்த வீடு இல்லாதவர்', 'BPL பட்டியலில் இருக்க வேண்டும்', 'ஆண்டு வருமானம் ₹3 லட்சத்திற்கு கீழ்'],
    docs: ['ஆதார் கார்டு', 'ரேஷன் கார்டு', 'வருமான சான்றிதழ்', 'நிலம் / இடம் ஆவணம்', 'வங்கி பாஸ்புக்'],
    steps: ['1. கிராம பஞ்சாயத்தில் பெயர் பதிவு செய்யுங்கள்', '2. SECC பட்டியலில் பெயர் இருக்க வேண்டும்', '3. pmayg.nic.in இல் விண்ணப்பிக்கலாம்', '4. ஆய்வு மற்றும் அனுமதி', '5. 3 தவணைகளில் பணம் வரும்'],
    category: 'housing',
  },
  mgnrega: {
    icon: '👷‍♀️',
    name: 'MGNREGS — 100 நாள் வேலை',
    nameEn: 'MGNREGS — 100 Days Work Guarantee',
    amount: '₹220+ / நாள்',
    desc: 'ஒவ்வொரு கிராமக் குடும்பத்திற்கும் ஒரு ஆண்டில் 100 நாட்கள் வேலை உத்தரவாதம். யாரும் விண்ணப்பிக்கலாம்!',
    eligibility: ['வயது 18+ ஆண் / பெண்', 'கிராமப்புற குடும்பம்', 'ஜாப் கார்டு வேண்டும்'],
    docs: ['ஆதார் கார்டு', 'ரேஷன் கார்டு', 'புகைப்படம்', 'வங்கி பாஸ்புக்'],
    steps: ['1. கிராம பஞ்சாயத்தில் ஜாப் கார்டு பெறுங்கள்', '2. வேலை கேட்டு விண்ணப்பிக்கவும்', '3. 15 நாட்களில் வேலை கிடைக்கும்', '4. வேலை முடிந்த 15 நாட்களில் கூலி வங்கியில் வரும்'],
    category: 'employment',
  },
  scholarship: {
    icon: '🎒',
    name: 'BC/MBC மாணவி உதவித்தொகை',
    nameEn: 'BC/MBC Student Scholarship',
    amount: 'ஆண்டுக்கு ₹12,000 வரை',
    desc: '10வது முதல் கல்லூரி வரை படிக்கும் BC/MBC மாணவிகளுக்கு அரசு உதவித்தொகை வழங்கப்படுகிறது.',
    eligibility: ['BC / MBC / DNT சமுதாயம்', '10வது முதல் UG வரை படிக்க வேண்டும்', 'குடும்ப வருமானம் ₹2 லட்சத்திற்கு கீழ்', 'தமிழ்நாட்டு மாணவி'],
    docs: ['ஜாதி சான்றிதழ்', 'வருமான சான்றிதழ்', 'மார்க் ஷீட்', 'ஆதார் கார்டு', 'வங்கி பாஸ்புக்'],
    steps: ['1. scholarships.gov.in அல்லது tnscholarship.net இல் பதிவு செய்யுங்கள்', '2. விண்ணப்பம் நிரப்புங்கள்', '3. ஆவணங்கள் அப்லோட் செய்யுங்கள்', '4. கல்லூரி ஆவணங்கள் சரிபார்ப்பு', '5. தொகை வங்கியில் வரும்'],
    category: 'education',
  },
  mudra: {
    icon: '🏪',
    name: 'PM Mudra யோஜனா',
    nameEn: 'PM Mudra Yojana',
    amount: '₹50,000 – ₹10,00,000',
    desc: 'சிறு தொழில் தொடங்க அல்லது விரிவாக்க குறைந்த வட்டியில் கடன். 3 வகை: சிசு, கிசோர், தருண்.',
    eligibility: ['18 வயதுக்கு மேல்', 'சிறு / நுண் தொழில் தொடங்க வேண்டியவர்', 'நல்ல கடன் வரலாறு', 'தொழில் திட்டம் (Business Plan) தயார்'],
    docs: ['ஆதார் கார்டு', 'PAN கார்டு', 'வங்கி அறிக்கை (6 மாதம்)', 'தொழில் திட்டம்', 'ரேஷன் கார்டு'],
    steps: ['1. அருகிலுள்ள வங்கி / MFI செல்லுங்கள்', '2. Mudra விண்ணப்பம் பெறுங்கள்', '3. தொழில் திட்டம் தயாரிக்கவும்', '4. ஆவணங்கள் சமர்ப்பிக்கவும்', '5. வங்கி ஆய்வு', '6. கடன் அனுமதி — 7–15 நாட்கள்'],
    category: 'employment',
  },
};

// ===== COURSE DATA =====
const COURSES = {
  tailoring: {
    title: 'தையல் & டிசைனிங் — முழு பயிற்சி',
    youtubeId: 'dQw4w9WgXcQ', // placeholder
    steps: [
      { label: 'அடிப்படை கருவிகள் அறிமுகம்', done: true },
      { label: 'அளவு எடுக்கும் முறை', done: true },
      { label: 'துணி வெட்டும் முறை', done: false },
      { label: 'சட்டை தைக்கும் முறை', done: false },
      { label: 'சல்வார் தைக்கும் முறை', done: false },
      { label: 'தொழில் தொடங்குவது எப்படி?', done: false },
    ],
  },
  upi: {
    title: 'UPI பாதுகாப்பான பயன்பாடு',
    youtubeId: 'dQw4w9WgXcQ',
    steps: [
      { label: 'UPI என்றால் என்ன?', done: true },
      { label: 'PhonePe கணக்கு திற', done: false },
      { label: 'பணம் அனுப்புவது எப்படி?', done: false },
      { label: 'மோசடி தவிர்ப்பது எப்படி?', done: false },
    ],
  },
  farming: {
    title: 'இயற்கை விவசாயம் & கம்போஸ்ட்',
    youtubeId: 'dQw4w9WgXcQ',
    steps: [
      { label: 'இயற்கை விவசாயம் ஏன்?', done: false },
      { label: 'மண் தயாரிப்பு', done: false },
      { label: 'கம்போஸ்ட் உரம் தயாரிப்பு', done: false },
      { label: 'பூச்சி மேலாண்மை', done: false },
      { label: 'சந்தைப்படுத்தல்', done: false },
    ],
  },
  nutrition: {
    title: 'ஊட்டச்சத்து & குழந்தை ஆரோக்கியம்',
    youtubeId: 'dQw4w9WgXcQ',
    steps: [
      { label: 'ஆரோக்கியமான உணவு என்ன?', done: false },
      { label: 'தாய்ப்பால் முக்கியம்', done: false },
      { label: 'குழந்தை வளர்ச்சி', done: false },
      { label: 'சத்து குறைபாடு தடுப்பு', done: false },
    ],
  },
  smartphone: {
    title: 'ஸ்மார்ட்போன் அடிப்படைகள்',
    youtubeId: 'dQw4w9WgXcQ',
    steps: [
      { label: 'போன் ஆன் / ஆஃப் செய்வது', done: false },
      { label: 'கால் செய்வது / ரிசீவ் செய்வது', done: false },
      { label: 'WhatsApp பயன்படுத்துவது', done: false },
      { label: 'YouTube பார்ப்பது', done: false },
      { label: 'Google Maps பயன்படுத்துவது', done: false },
    ],
  },
  tnpsc: {
    title: 'TNPSC Group 4 தயாரிப்பு',
    youtubeId: 'dQw4w9WgXcQ',
    steps: [
      { label: 'தேர்வு பாடத்திட்டம்', done: false },
      { label: 'தமிழ் இலக்கணம்', done: false },
      { label: 'பொது அறிவு (GK)', done: false },
      { label: 'கணக்கு (Maths)', done: false },
      { label: 'அறிவியல் (Science)', done: false },
      { label: 'பழைய வினாத்தாள்கள்', done: false },
    ],
  },
};

// ===== MULTILINGUAL LABELS =====
const LABELS = {
  ta: {
    listening: 'கேட்கிறேன்... பேசுங்கள்!',
    submitted: '✅ விண்ணப்பம் சமர்ப்பிக்கப்பட்டது! உங்களை விரைவில் தொடர்பு கொள்வோம்.',
    noSupport: '⚠️ உங்கள் browser குரல் ஆதரிக்கவில்லை.',
    schemeApplied: '🎉 விண்ணப்பம் அனுப்பப்பட்டது!',
  },
  en: {
    listening: 'Listening... Speak now!',
    submitted: '✅ Application submitted! We will contact you soon.',
    noSupport: '⚠️ Your browser does not support voice input.',
    schemeApplied: '🎉 Application submitted!',
  },
};

// ===== AI RESPONSES =====
const AI_RESPONSES = {
  புதுமை: `📚 புதுமை பெண் திட்டம்:\n\n• அரசு பள்ளியில் படித்த மாணவிகளுக்கு\n• அரசு கல்லூரியில் படிக்கும்போது ₹1000 மாதம் கிடைக்கும்\n• emis.tn.gov.in இல் விண்ணப்பிக்கலாம்\n\nவிண்ணப்பிக்க வேண்டுமா? 🌺`,
  upi: `💳 UPI பாதுகாப்பான பயன்பாடு:\n\n• OTP யாருக்கும் சொல்லாதீர்கள்!\n• QR Code ஸ்கேன் செய்யும்முன் சரிபார்க்கவும்\n• "Receive Money" க்கு PIN தேவையில்லை\n• தெரியாத நம்பரில் இருந்து கால் வந்தால் கட் செய்யுங்கள்\n\nUPI கோர்ஸ் படிக்கணுமா? 📱`,
  shg: `🤝 SHG கடன் பெற:\n\n• முதலில் அருகிலுள்ள SHG குழுவில் சேருங்கள்\n• 6 மாதம் தொடர்ந்து சேமிக்கவும்\n• ₹10,000 முதல் ₹1 லட்சம் வரை கடன் கிடைக்கும்\n• வட்டி மிகவும் குறைவு!\n\nமேலும் தெரிந்துகொள்ள வேண்டுமா? 💜`,
  tnpsc: `📝 TNPSC Group 4 தயாரிப்பு:\n\n• தமிழ், GK, Maths, Science படிக்கவும்\n• தினமும் 3–4 மணி நேரம் படிங்க\n• பழைய வினாத்தாள் முக்கியம்!\n• எங்கள் TNPSC கோர்ஸ் இலவசம்!\n\nகோர்ஸ் ஆரம்பிக்கணுமா? 📚`,
  default: `வணக்கம் அக்கா! 💜 நான் உங்களுக்கு உதவ தயாராக இருக்கிறேன்.\n\nகேளுங்கள்:\n• அரசு திட்டங்கள் பற்றி\n• படிப்பு / கோர்ஸ் பற்றி\n• கடன் / வேலை பற்றி\n• ஆரோக்கியம் பற்றி\n\nதைரியமாக கேளுங்கள்! 🌺`,
};

// ===== SECTION NAV =====
function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('section-' + id);
  if (target) target.classList.add('active');

  // Update nav buttons
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  const navBtn = document.querySelector(`.nav-btn[onclick*="${id}"]`);
  if (navBtn) navBtn.classList.add('active');

  // Update bottom nav
  document.querySelectorAll('.bnav-btn').forEach(btn => btn.classList.remove('active'));
  const bnavBtn = document.getElementById('bnav-' + id);
  if (bnavBtn) bnavBtn.classList.add('active');

  STATE.currentSection = id;
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (id === 'chat') speakText('வணக்கம்! உங்களுக்கு என்ன உதவி வேண்டும்?');
  if (id === 'schemes') speakText('இங்கே அரசு திட்டங்கள் இருக்கின்றன. உங்களுக்கு தகுதியான திட்டத்தை தேர்வு செய்யுங்கள்!');
}

// ===== LANGUAGE =====
function setLanguage(lang) {
  STATE.lang = lang;
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`[data-lang="${lang}"]`);
  if (btn) btn.classList.add('active');

  // Update translatable elements
  document.querySelectorAll('[data-ta]').forEach(el => {
    const key = `data-${lang}`;
    const val = el.getAttribute(key) || el.getAttribute('data-ta');
    if (val) {
      if (el.tagName === 'INPUT') el.placeholder = val;
      else el.innerHTML = val;
    }
  });
  speakText(lang === 'ta' ? 'மொழி தமிழாக மாற்றப்பட்டது!' : 'Language changed!');
}

// ===== ACCESSIBILITY =====
function toggleFontSize() {
  STATE.largeFontOn = !STATE.largeFontOn;
  document.body.classList.toggle('large-font', STATE.largeFontOn);
  showNotification(STATE.largeFontOn ? '🔤 எழுத்து பெரிதாக்கப்பட்டது!' : '🔤 எழுத்து சாதாரண அளவுக்கு மாற்றப்பட்டது.', 'info');
}

function toggleHighContrast() {
  STATE.highContrastOn = !STATE.highContrastOn;
  document.body.classList.toggle('high-contrast', STATE.highContrastOn);
  showNotification(STATE.highContrastOn ? '⬛ High Contrast On!' : '⬛ High Contrast Off.', 'info');
}

function toggleSignMode() {
  STATE.signModeOn = !STATE.signModeOn;
  const overlay = document.getElementById('signOverlay');
  const btn = document.getElementById('signModeBtn');
  overlay.hidden = !STATE.signModeOn;
  btn.classList.toggle('active-sign', STATE.signModeOn);
  if (STATE.signModeOn) {
    showNotification('🤟 Sign Language Mode இயக்கப்பட்டது!', 'success');
    animateSign('நான் உதவுகிறேன்!');
  }
}

function animateSign(text) {
  const caption = document.getElementById('signCaption');
  if (caption) caption.textContent = `🤟 ${text}`;
  const armL = document.getElementById('avatarArmL');
  const armR = document.getElementById('avatarArmR');
  if (armL && armR) {
    armL.style.animation = 'none';
    armR.style.animation = 'none';
    setTimeout(() => {
      armL.style.animation = 'signArmL 0.5s ease-in-out 4 alternate';
      armR.style.animation = 'signArmR 0.5s ease-in-out 4 alternate';
    }, 50);
  }
}

// ===== VOICE INPUT =====
function startVoiceInput() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    showNotification(LABELS[STATE.lang]?.noSupport || '⚠️ Browser does not support voice.', 'error');
    // Simulate for demo
    simulateVoiceDemo();
    return;
  }

  const modal = document.getElementById('voiceModal');
  modal.hidden = false;
  STATE.voiceActive = true;

  const recognition = new SpeechRecognition();
  recognition.lang = STATE.lang === 'ta' ? 'ta-IN' : STATE.lang === 'hi' ? 'hi-IN' : STATE.lang === 'te' ? 'te-IN' : 'en-IN';
  recognition.continuous = false;
  recognition.interimResults = true;
  STATE.recognition = recognition;

  recognition.onresult = (e) => {
    const transcript = Array.from(e.results).map(r => r[0].transcript).join('');
    document.getElementById('voiceTranscript').textContent = transcript;
    if (e.results[0].isFinal) {
      stopVoiceInput();
      processVoiceCommand(transcript);
    }
  };

  recognition.onerror = () => {
    stopVoiceInput();
    showNotification('⚠️ குரல் கேட்கவில்லை. மீண்டும் முயற்சிக்கவும்.', 'error');
  };

  recognition.onend = () => stopVoiceInput();
  recognition.start();
}

function stopVoiceInput() {
  STATE.voiceActive = false;
  const modal = document.getElementById('voiceModal');
  modal.hidden = true;
  document.getElementById('voiceTranscript').textContent = '';
  if (STATE.recognition) {
    try { STATE.recognition.stop(); } catch(e) {}
    STATE.recognition = null;
  }
}

function simulateVoiceDemo() {
  const modal = document.getElementById('voiceModal');
  modal.hidden = false;
  const phrases = ['புதுமை பெண் திட்டம்...', 'மகளிர் உரிமை தொகை...', 'SHG கடன்...'];
  const phrase = phrases[Math.floor(Math.random() * phrases.length)];
  let i = 0;
  const interval = setInterval(() => {
    document.getElementById('voiceTranscript').textContent = phrase.slice(0, ++i);
    if (i >= phrase.length) {
      clearInterval(interval);
      setTimeout(() => {
        stopVoiceInput();
        processVoiceCommand(phrase);
      }, 600);
    }
  }, 60);
}

function processVoiceCommand(cmd) {
  const lower = cmd.toLowerCase();
  if (lower.includes('திட்டம்') || lower.includes('scheme')) {
    showSection('schemes');
    speakText('இதோ அரசு திட்டங்கள்! உங்களுக்கு தகுதியான திட்டம் தேர்ந்தெடுக்கவும்.');
  } else if (lower.includes('கல்வி') || lower.includes('கோர்ஸ்') || lower.includes('படி')) {
    showSection('courses');
    speakText('கல்வி மையம் திறந்தது! உங்களுக்கு பிடித்த கோர்ஸ் தேர்ந்தெடுக்கவும்.');
  } else if (lower.includes('ஆவண') || lower.includes('ஆதார') || lower.includes('document')) {
    showSection('documents');
    speakText('ஆவணம் காட்டுங்கள், நான் திட்டங்கள் பொருத்துவேன்!');
  } else {
    showSection('chat');
    sendMessage(cmd);
  }
}

// ===== TEXT TO SPEECH =====
function speakText(text) {
  if (!STATE.synth) return;
  STATE.synth.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = STATE.lang === 'ta' ? 'ta-IN' : STATE.lang === 'hi' ? 'hi-IN' : 'en-IN';
  utt.rate = 0.9;
  utt.pitch = 1.1;
  STATE.synth.speak(utt);
  if (STATE.signModeOn) animateSign(text.slice(0, 30));
}

// ===== SCHEME FILTER =====
function filterSchemes(category) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  document.querySelectorAll('.scheme-card').forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = '';
      card.style.animation = 'fadeSlideIn 0.3s ease';
    } else {
      card.style.display = 'none';
    }
  });
}

// ===== COURSE FILTER =====
function filterCourses(category) {
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  document.querySelectorAll('.course-card').forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

// ===== SCHEME DETAIL MODAL =====
function openSchemeDetail(schemeKey) {
  const s = SCHEMES[schemeKey];
  if (!s) return;
  const modal = document.getElementById('schemeModal');
  const content = document.getElementById('schemeModalContent');
  content.innerHTML = `
    <div style="text-align:center;margin-bottom:1.2rem">
      <div style="font-size:3rem">${s.icon}</div>
      <h2 class="modal-scheme-title">${s.name}</h2>
      <div class="modal-scheme-amount">${s.amount}</div>
    </div>
    <p style="color:var(--text-muted);font-size:0.9rem;line-height:1.7;margin-bottom:1rem">${s.desc}</p>
    <h4 class="modal-section-title">✅ தகுதி நிபந்தனைகள்</h4>
    <ul class="modal-list">${s.eligibility.map(e => `<li>${e}</li>`).join('')}</ul>
    <h4 class="modal-section-title">📄 தேவையான ஆவணங்கள்</h4>
    <ul class="modal-list">${s.docs.map(d => `<li>${d}</li>`).join('')}</ul>
    <h4 class="modal-section-title">🪜 விண்ணப்பிக்கும் படிகள்</h4>
    <ul class="modal-list" style="list-style:none">
      ${s.steps.map(st => `<li style="margin-bottom:0.3rem;color:var(--text-muted);font-size:0.88rem">${st}</li>`).join('')}
    </ul>
    <div style="margin-top:1.5rem;display:flex;gap:0.75rem">
      <button class="submit-btn" style="flex:1" onclick="openApplyModal('${schemeKey}');closeModal('schemeModal')">விண்ணப்பிக்க →</button>
      <button class="voice-fill-btn" style="flex:0.6" onclick="speakText('${s.name} திட்டத்திற்கு ${s.eligibility[0]} தேவை')">🔊 கேளுங்கள்</button>
    </div>
  `;
  modal.hidden = false;
  speakText(`${s.name}. தொகை: ${s.amount}. ${s.eligibility[0]}`);
}

// ===== APPLY MODAL =====
function openApplyModal(schemeKey) {
  const s = SCHEMES[schemeKey];
  if (!s) return;
  const modal = document.getElementById('applyModal');
  const content = document.getElementById('applyModalContent');
  content.innerHTML = `
    <div style="text-align:center;margin-bottom:1.2rem">
      <div style="font-size:2.5rem">${s.icon}</div>
      <h2 style="font-size:1.1rem;font-weight:800;margin:0.5rem 0">${s.name}</h2>
      <p style="color:var(--emerald);font-size:0.85rem;font-weight:700">💜 நான் உங்களுக்கு படிப்படியாக உதவுவேன்!</p>
    </div>
    <button class="voice-fill-btn" style="width:100%;margin-bottom:1rem" onclick="speakText('குரலில் நிரப்ப முயற்சிக்கிறோம்!')">
      🎤 குரலில் நிரப்புங்கள் (Voice Fill)
    </button>
    <form class="apply-form" onsubmit="submitApplication(event,'${schemeKey}')">
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">உங்கள் பெயர் *</label>
          <input class="form-input" type="text" placeholder="எ.கா: லலிதா" required id="applyName" />
        </div>
        <div class="form-group">
          <label class="form-label">கைபேசி எண் *</label>
          <input class="form-input" type="tel" placeholder="9876543210" required maxlength="10" id="applyPhone" />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">ஆதார் எண் (கடைசி 4 இலக்கம்) *</label>
        <input class="form-input" type="text" placeholder="XXXX XXXX XXXX" maxlength="4" id="applyAadhaar" />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">மாவட்டம் *</label>
          <select class="form-select" id="applyDistrict">
            <option value="">தேர்வு செய்யுங்கள்</option>
            ${['Chennai','Coimbatore','Madurai','Salem','Tirunelveli','Erode','Vellore','Trichy','Dindigul','Thanjavur','Villupuram','Tiruvannamalai','Kancheepuram','Cuddalore','Tiruppur'].map(d=>`<option>${d}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">வயது *</label>
          <input class="form-input" type="number" placeholder="28" min="18" max="80" id="applyAge" />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">வங்கி கணக்கு எண்</label>
        <input class="form-input" type="text" placeholder="வங்கி கணக்கு எண்" id="applyBank" />
      </div>
      <button type="submit" class="submit-btn">✅ விண்ணப்பம் அனுப்பு →</button>
    </form>
  `;
  modal.hidden = false;
  speakText(`${s.name} விண்ணப்பம் தயார். உங்கள் பெயர் மற்றும் கைபேசி எண் கொடுங்கள்!`);
}

function submitApplication(e, schemeKey) {
  e.preventDefault();
  const name = document.getElementById('applyName')?.value;
  closeModal('applyModal');
  showNotification(`🎉 வணக்கம் ${name || 'அக்கா'}! விண்ணப்பம் வெற்றிகரமாக அனுப்பப்பட்டது. 3–7 நாட்களில் SMS வரும்!`, 'success');
  speakText(`வணக்கம் ${name || 'அக்கா'}! உங்கள் விண்ணப்பம் அனுப்பப்பட்டது! மூன்று நாட்களில் SMS வரும்.`);
  setTimeout(() => showNotification('📱 SMS அனுப்பப்பட்டது: விண்ணப்ப எண் UNO' + Math.floor(Math.random() * 90000 + 10000), 'info'), 2500);
}

// ===== COURSE PLAYER =====
function openCoursePlayer(courseKey) {
  const c = COURSES[courseKey];
  if (!c) return;
  const modal = document.getElementById('courseModal');
  const content = document.getElementById('courseModalContent');
  content.innerHTML = `
    <h2 class="course-player-title">📚 ${c.title}</h2>
    <div class="course-video-frame">
      <div class="course-video-placeholder">
        <span class="big-play" onclick="loadYouTube('${c.youtubeId}','courseVideoFrame')" role="button" tabindex="0">▶</span>
        <p style="font-size:0.9rem">இங்கே கிளிக் செய்து வீடியோ பாருங்கள்!</p>
        <p style="font-size:0.75rem;color:var(--primary-light)">🎵 குரலில் விளக்கம் கேட்க ▶ அழுத்துங்கள்</p>
      </div>
    </div>
    <h4 style="font-weight:800;margin:1rem 0 0.6rem;font-size:0.95rem">📋 கோர்ஸ் பாடங்கள்</h4>
    <div class="course-steps">
      ${c.steps.map((step, i) => `
        <div class="course-step ${step.done ? 'done' : ''}" onclick="speakText('பாடம் ${i+1}: ${step.label}')">
          <div class="course-step-num">${step.done ? '✓' : i + 1}</div>
          <span>${step.label}</span>
          ${step.done ? '<span style="margin-left:auto;color:var(--emerald);font-size:0.75rem">✅ முடிந்தது</span>' : ''}
        </div>
      `).join('')}
    </div>
    <button class="submit-btn" style="margin-top:1rem;width:100%" onclick="speakText('பயிற்சி ஆரம்பிக்கிறோம்! வாழ்த்துகள்!')">
      🚀 பயிற்சி ஆரம்பி!
    </button>
  `;
  modal.hidden = false;
  speakText(`${c.title} கோர்ஸ் திறந்தது! வீடியோ பார்க்க ப்ளே பட்டன் அழுத்துங்கள்.`);
}

function loadYouTube(videoId, containerId) {
  const frame = event.target.closest('.course-video-frame');
  if (frame) {
    frame.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allowfullscreen allow="autoplay"></iframe>`;
  }
}

// ===== MODAL UTILS =====
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.hidden = true;
  STATE.synth && STATE.synth.cancel();
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    ['schemeModal', 'applyModal', 'courseModal'].forEach(id => closeModal(id));
  }
});

// ===== CHAT =====
function sendMessage(text) {
  const input = document.getElementById('chatInput');
  const msg = text || input.value.trim();
  if (!msg) return;
  if (input) input.value = '';

  addChatMessage(msg, 'user');
  document.getElementById('chatQuickReplies')?.remove();

  // Show typing
  const typingId = 'typing_' + Date.now();
  const typingDiv = document.createElement('div');
  typingDiv.className = 'chat-msg ai-msg';
  typingDiv.id = typingId;
  typingDiv.innerHTML = `
    <div class="msg-avatar">🌺</div>
    <div class="msg-bubble">
      <div class="typing-indicator">
        <div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>
      </div>
    </div>`;
  document.getElementById('chatMessages').appendChild(typingDiv);
  scrollChat();

  setTimeout(() => {
    document.getElementById(typingId)?.remove();
    const response = getAIResponse(msg);
    addChatMessage(response, 'ai');
    speakText(response.replace(/\n/g, '. ').slice(0, 120));
  }, 1200 + Math.random() * 600);
}

function addChatMessage(text, type) {
  const container = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = `chat-msg ${type === 'ai' ? 'ai-msg' : 'user-msg'}`;
  const time = new Date().toLocaleTimeString('ta-IN', { hour: '2-digit', minute: '2-digit' });
  div.innerHTML = `
    ${type === 'ai' ? '<div class="msg-avatar">🌺</div>' : ''}
    <div class="msg-bubble">
      <p style="white-space:pre-line">${text}</p>
      <div class="msg-time">${time}</div>
    </div>
    ${type === 'user' ? '<div class="msg-avatar" style="background:linear-gradient(135deg,var(--accent),var(--rose-light))">👩</div>' : ''}
  `;
  container.appendChild(div);
  scrollChat();
}

function scrollChat() {
  const msgs = document.getElementById('chatMessages');
  if (msgs) msgs.scrollTop = msgs.scrollHeight;
}

function getAIResponse(msg) {
  const lower = msg.toLowerCase();
  if (lower.includes('புதுமை') || lower.includes('pudhumai')) return AI_RESPONSES['புதுமை'];
  if (lower.includes('upi') || lower.includes('phonepay') || lower.includes('gpay') || lower.includes('paytm')) return AI_RESPONSES['upi'];
  if (lower.includes('shg') || lower.includes('கடன்') || lower.includes('loan')) return AI_RESPONSES['shg'];
  if (lower.includes('tnpsc') || lower.includes('group 4') || lower.includes('தேர்வு')) return AI_RESPONSES['tnpsc'];
  if (lower.includes('வணக்கம்') || lower.includes('hello') || lower.includes('hai')) return `வணக்கம் அக்கா! 💜 நான் உங்களில் ஒருத்தி. உங்களுக்கு என்ன உதவி செய்யட்டும்?`;
  if (lower.includes('மகளிர்') || lower.includes('magalir') || lower.includes('₹1000')) return `💰 கலைஞர் மகளிர் உரிமை தொகை:\n\n• குடும்பத்தலைவிகளுக்கு மாதம் ₹1000\n• நேரடியாக வங்கி கணக்கில் வரும்\n• urimaithogai.tn.gov.in இல் விண்ணப்பிக்கலாம்\n\nவிண்ணப்பிக்க உதவி வேண்டுமா? 🌺`;
  if (lower.includes('வீடு') || lower.includes('pmay') || lower.includes('house')) return `🏠 PMAY வீட்டு திட்டம்:\n\n• கிராமப்புற குடும்பங்களுக்கு ₹1.2 லட்சம் மானியம்\n• பெண் பெயரில் வீடு கட்ட முன்னுரிமை!\n• BPL பட்டியலில் இருக்க வேண்டும்\n\nமேலும் தெரிந்துகொள்ள விரும்புகிறீர்களா? 💜`;
  if (lower.includes('நன்றி') || lower.includes('thanks')) return `நன்றி அக்கா! 🌺 நான் எப்போதும் உங்களுக்கு உதவ தயாராக இருக்கிறேன்! வேறு ஏதாவது கேட்கணுமா?`;
  return AI_RESPONSES['default'];
}

// ===== DOCUMENT SCAN =====
function triggerDocUpload() {
  document.getElementById('docFileInput').click();
}

function processDocument(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const docResults = document.getElementById('docResults');
    docResults.hidden = false;
    document.getElementById('docPreviewImg').src = e.target.result;
    document.getElementById('docAnalyzing').style.display = 'flex';
    document.getElementById('docMatchedSchemes').innerHTML = '';
    speakText('ஆவணம் கண்டுபிடிக்கிறேன்... கொஞ்சம் நேரம் ஆகும்...');

    // Simulate AI analysis
    setTimeout(() => {
      document.getElementById('docAnalyzing').style.display = 'none';
      const matchedSchemes = detectSchemesByDocument(file.name || 'document.jpg');
      renderMatchedSchemes(matchedSchemes);
    }, 2800);
  };
  reader.readAsDataURL(file);
}

function detectSchemesByDocument(filename) {
  // Simulate detection — in production, this would call an AI/OCR API
  const allSchemes = Object.keys(SCHEMES);
  const num = 3 + Math.floor(Math.random() * 3);
  const matched = [];
  for (let i = 0; i < num; i++) matched.push(allSchemes[Math.floor(Math.random() * allSchemes.length)]);
  return [...new Set(matched)];
}

function renderMatchedSchemes(schemeKeys) {
  const container = document.getElementById('docMatchedSchemes');
  container.innerHTML = `<h3 style="font-weight:800;margin-bottom:1rem;color:var(--emerald)">🎉 உங்களுக்கு ${schemeKeys.length} திட்டங்கள் தகுதியானவை!</h3>`;
  schemeKeys.forEach((key, i) => {
    const s = SCHEMES[key];
    if (!s) return;
    const item = document.createElement('div');
    item.className = 'matched-scheme-item';
    item.style.animationDelay = `${i * 0.15}s`;
    item.innerHTML = `
      <span style="font-size:1.8rem">${s.icon}</span>
      <div style="flex:1">
        <strong style="font-size:0.9rem">${s.name}</strong>
        <div style="font-size:0.78rem;color:var(--accent)">${s.amount}</div>
      </div>
      <button class="scheme-apply-btn" style="width:auto;padding:0.4rem 0.8rem;font-size:0.78rem" onclick="openApplyModal('${key}')">விண்ணப்பிக்க</button>
    `;
    container.appendChild(item);
  });
  speakText(`வாழ்த்துக்கள்! உங்கள் ஆவணம் மூலம் ${schemeKeys.length} திட்டங்களுக்கு தகுதியாக இருக்கிறீர்கள்!`);
  showNotification(`✅ ${schemeKeys.length} திட்டங்கள் கண்டுபிடிக்கப்பட்டன!`, 'success');
}

// ===== TOAST NOTIFICATIONS =====
function showNotification(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icons = { success: '✅', error: '❌', info: '🔔' };
  toast.innerHTML = `<span>${icons[type] || '🔔'}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

// ===== STATS COUNTER =====
function animateStats() {
  document.querySelectorAll('.stat-number').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    let count = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      count = Math.min(count + step, target);
      el.textContent = count.toLocaleString('ta-IN');
      if (count >= target) clearInterval(timer);
    }, 25);
  });
}

// ===== INTERSECTION OBSERVER — STATS =====
const statsArea = document.querySelector('.stats-area');
if (statsArea) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { animateStats(); observer.disconnect(); } });
  }, { threshold: 0.3 });
  observer.observe(statsArea);
}

// ===== KEYBOARD: ESC TO CLOSE =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    stopVoiceInput();
    ['schemeModal', 'applyModal', 'courseModal'].forEach(id => closeModal(id));
    if (STATE.signModeOn) toggleSignMode();
  }
});

// ===== INITIAL GREETING =====
window.addEventListener('DOMContentLoaded', () => {
  // Greet after a short delay
  setTimeout(() => {
    speakText('வணக்கம்! நான் உங்களில் ஒருத்தி. உங்களுக்கு என்ன உதவி வேண்டும்?');
    showNotification('🌺 வணக்கம்! உங்களில் ஒருத்தி வரவேற்கிறேன்!', 'success');
  }, 1200);

  // Periodic scheme reminder
  setTimeout(() => {
    showNotification('💡 புதுமை பெண் திட்டம் — விண்ணப்பிக்க கடைசி தேதி நெருங்குகிறது!', 'info');
  }, 8000);
});

// ===== SERVICE WORKER (offline support) =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}
