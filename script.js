/* ============================================================
   FIFA DÜNYA KUPASI 2026 — TAHMİN PLATFORMU
   script.js — tüm mantık tek dosyada
   ============================================================ */

// ─── SABITLER ────────────────────────────────────────────────
const LOCK_DATE = new Date('2026-06-08T00:00:00');
const IS_LOCKED = new Date() >= LOCK_DATE;
const SB_URL    = 'https://jkfhqcygjvuijkjamgyn.supabase.co';
const SB_KEY    = 'sb_publishable_G-zV5rNtEOmyAgS2B035Ww_vvK0XGSt';

// Adım sırası: A'dan L'ye 12 grup + 5 eleme turu + özet
// steps: group-A … group-L, summary, r32, r16, qf, sf, final
const GROUP_IDS = ['A','B','C','D','E','F','G','H','I','J','K','L'];
const ELIM_ROUNDS = [
  { id:'r32',  label:'Son 32',       matchCount:16 },
  { id:'r16',  label:'Son 16',       matchCount:8  },
  { id:'qf',   label:'Çeyrek Final', matchCount:4  },
  { id:'sf',   label:'Yarı Final',   matchCount:2  },
  { id:'final',label:'Final',        matchCount:1  },
];

// ─── GERÇEK 2026 GRUPLAR + FİKSTÜR ──────────────────────────
const GROUPS = {
  A:{ teams:[
    {n:'Meksika',f:'🇲🇽'},{n:'Güney Kore',f:'🇰🇷'},
    {n:'Güney Afrika',f:'🇿🇦'},{n:'Çekya',f:'🇨🇿'}
  ], fixtures:[
    {h:'Meksika',a:'Güney Afrika',d:'11 Haz',v:'Estadio Azteca'},
    {h:'Güney Kore',a:'Çekya',d:'11 Haz',v:'Estadio Akron'},
    {h:'Çekya',a:'Güney Afrika',d:'18 Haz',v:'Mercedes-Benz Stadium'},
    {h:'Meksika',a:'Güney Kore',d:'18 Haz',v:'Estadio Akron'},
    {h:'Çekya',a:'Meksika',d:'24 Haz',v:'Estadio Azteca'},
    {h:'Güney Afrika',a:'Güney Kore',d:'24 Haz',v:'Estadio BBVA'},
  ]},
  B:{ teams:[
    {n:'Kanada',f:'🇨🇦'},{n:'Bosna-Hersek',f:'🇧🇦'},
    {n:'Katar',f:'🇶🇦'},{n:'İsviçre',f:'🇨🇭'}
  ], fixtures:[
    {h:'Kanada',a:'Bosna-Hersek',d:'12 Haz',v:'BMO Field, Toronto'},
    {h:'Katar',a:'İsviçre',d:'13 Haz',v:'Lumen Field, Seattle'},
    {h:'Bosna-Hersek',a:'İsviçre',d:'19 Haz',v:'Hard Rock Stadium'},
    {h:'Kanada',a:'Katar',d:'19 Haz',v:'BC Place, Vancouver'},
    {h:'İsviçre',a:'Kanada',d:'25 Haz',v:'BC Place, Vancouver'},
    {h:'Bosna-Hersek',a:'Katar',d:'25 Haz',v:"Levi's Stadium"},
  ]},
  C:{ teams:[
    {n:'Brezilya',f:'🇧🇷'},{n:'Fas',f:'🇲🇦'},
    {n:'İskoçya',f:'🏴󠁧󠁢󠁳󠁣󠁴󠁿'},{n:'Haiti',f:'🇭🇹'}
  ], fixtures:[
    {h:'Brezilya',a:'Fas',d:'12 Haz',v:'MetLife Stadium'},
    {h:'İskoçya',a:'Haiti',d:'12 Haz',v:'SoFi Stadium'},
    {h:'Fas',a:'Haiti',d:'18 Haz',v:'AT&T Stadium'},
    {h:'Brezilya',a:'İskoçya',d:'18 Haz',v:'Gillette Stadium'},
    {h:'Fas',a:'İskoçya',d:'24 Haz',v:'Gillette Stadium'},
    {h:'Haiti',a:'Brezilya',d:'24 Haz',v:'Hard Rock Stadium'},
  ]},
  D:{ teams:[
    {n:'ABD',f:'🇺🇸'},{n:'Paraguay',f:'🇵🇾'},
    {n:'Avustralya',f:'🇦🇺'},{n:'Türkiye',f:'🇹🇷'}
  ], fixtures:[
    {h:'ABD',a:'Paraguay',d:'12 Haz',v:'SoFi Stadium'},
    {h:'Avustralya',a:'Türkiye',d:'13 Haz',v:'Lumen Field'},
    {h:'Paraguay',a:'Türkiye',d:'19 Haz',v:'Arrowhead Stadium'},
    {h:'ABD',a:'Avustralya',d:'19 Haz',v:'SoFi Stadium'},
    {h:'Türkiye',a:'ABD',d:'25 Haz',v:"Levi's Stadium"},
    {h:'Paraguay',a:'Avustralya',d:'25 Haz',v:'Lincoln Financial'},
  ]},
  E:{ teams:[
    {n:'Almanya',f:'🇩🇪'},{n:'Fildişi Sahili',f:'🇨🇮'},
    {n:'Ekvador',f:'🇪🇨'},{n:'Curaçao',f:'🇨🇼'}
  ], fixtures:[
    {h:'Almanya',a:'Curaçao',d:'14 Haz',v:'NRG Stadium'},
    {h:'Fildişi Sahili',a:'Ekvador',d:'14 Haz',v:'Lincoln Financial'},
    {h:'Almanya',a:'Fildişi Sahili',d:'20 Haz',v:'BMO Field'},
    {h:'Ekvador',a:'Curaçao',d:'20 Haz',v:'Arrowhead Stadium'},
    {h:'Curaçao',a:'Fildişi Sahili',d:'25 Haz',v:'Lincoln Financial'},
    {h:'Ekvador',a:'Almanya',d:'25 Haz',v:'MetLife Stadium'},
  ]},
  F:{ teams:[
    {n:'Hollanda',f:'🇳🇱'},{n:'Japonya',f:'🇯🇵'},
    {n:'İsveç',f:'🇸🇪'},{n:'Tunus',f:'🇹🇳'}
  ], fixtures:[
    {h:'Hollanda',a:'Japonya',d:'14 Haz',v:'AT&T Stadium'},
    {h:'İsveç',a:'Tunus',d:'14 Haz',v:'Estadio BBVA'},
    {h:'Hollanda',a:'İsveç',d:'20 Haz',v:'NRG Stadium'},
    {h:'Japonya',a:'Tunus',d:'20 Haz',v:'Estadio BBVA'},
    {h:'Tunus',a:'Hollanda',d:'25 Haz',v:'Estadio Akron'},
    {h:'İsveç',a:'Japonya',d:'25 Haz',v:'Hard Rock Stadium'},
  ]},
  G:{ teams:[
    {n:'Belçika',f:'🇧🇪'},{n:'Mısır',f:'🇪🇬'},
    {n:'İran',f:'🇮🇷'},{n:'Yeni Zelanda',f:'🇳🇿'}
  ], fixtures:[
    {h:'Belçika',a:'Mısır',d:'15 Haz',v:'SoFi Stadium'},
    {h:'İran',a:'Yeni Zelanda',d:'15 Haz',v:"Levi's Stadium"},
    {h:'Belçika',a:'Yeni Zelanda',d:'21 Haz',v:'AT&T Stadium'},
    {h:'Mısır',a:'İran',d:'21 Haz',v:'NRG Stadium'},
    {h:'Mısır',a:'Yeni Zelanda',d:'26 Haz',v:'Lincoln Financial'},
    {h:'İran',a:'Belçika',d:'26 Haz',v:'MetLife Stadium'},
  ]},
  H:{ teams:[
    {n:'İspanya',f:'🇪🇸'},{n:'Uruguay',f:'🇺🇾'},
    {n:'Suudi Arabistan',f:'🇸🇦'},{n:'Yeşil Burun Adaları',f:'🇨🇻'}
  ], fixtures:[
    {h:'İspanya',a:'Suudi Arabistan',d:'15 Haz',v:'Mercedes-Benz Stadium'},
    {h:'Uruguay',a:'Yeşil Burun Adaları',d:'15 Haz',v:'Hard Rock Stadium'},
    {h:'İspanya',a:'Uruguay',d:'21 Haz',v:'Gillette Stadium'},
    {h:'Suudi Arabistan',a:'Yeşil Burun Adaları',d:'21 Haz',v:'Lumen Field'},
    {h:'Suudi Arabistan',a:'Uruguay',d:'26 Haz',v:'MetLife Stadium'},
    {h:'Yeşil Burun Adaları',a:'İspanya',d:'26 Haz',v:'Arrowhead Stadium'},
  ]},
  I:{ teams:[
    {n:'Fransa',f:'🇫🇷'},{n:'Senegal',f:'🇸🇳'},
    {n:'Norveç',f:'🇳🇴'},{n:'Irak',f:'🇮🇶'}
  ], fixtures:[
    {h:'Fransa',a:'Norveç',d:'16 Haz',v:'Mercedes-Benz Stadium'},
    {h:'Senegal',a:'Irak',d:'16 Haz',v:'Lincoln Financial'},
    {h:'Fransa',a:'Irak',d:'22 Haz',v:'Lincoln Financial'},
    {h:'Norveç',a:'Senegal',d:'22 Haz',v:'Gillette Stadium'},
    {h:'Irak',a:'Norveç',d:'27 Haz',v:'BC Place'},
    {h:'Fransa',a:'Senegal',d:'27 Haz',v:'Estadio Azteca'},
  ]},
  J:{ teams:[
    {n:'Arjantin',f:'🇦🇷'},{n:'Avusturya',f:'🇦🇹'},
    {n:'Cezayir',f:'🇩🇿'},{n:'Ürdün',f:'🇯🇴'}
  ], fixtures:[
    {h:'Arjantin',a:'Avusturya',d:'16 Haz',v:'AT&T Stadium'},
    {h:'Cezayir',a:'Ürdün',d:'16 Haz',v:"Levi's Stadium"},
    {h:'Arjantin',a:'Cezayir',d:'22 Haz',v:'Hard Rock Stadium'},
    {h:'Avusturya',a:'Ürdün',d:'22 Haz',v:'NRG Stadium'},
    {h:'Ürdün',a:'Arjantin',d:'27 Haz',v:'Estadio BBVA'},
    {h:'Cezayir',a:'Avusturya',d:'27 Haz',v:'Estadio Akron'},
  ]},
  K:{ teams:[
    {n:'Portekiz',f:'🇵🇹'},{n:'Kolombiya',f:'🇨🇴'},
    {n:'Özbekistan',f:'🇺🇿'},{n:'Kongo DR',f:'🇨🇩'}
  ], fixtures:[
    {h:'Portekiz',a:'Özbekistan',d:'17 Haz',v:'NRG Stadium'},
    {h:'Kolombiya',a:'Kongo DR',d:'17 Haz',v:'Estadio Akron'},
    {h:'Portekiz',a:'Kongo DR',d:'23 Haz',v:'Mercedes-Benz Stadium'},
    {h:'Özbekistan',a:'Kolombiya',d:'23 Haz',v:'Arrowhead Stadium'},
    {h:'Kongo DR',a:'Özbekistan',d:'28 Haz',v:'Lumen Field'},
    {h:'Kolombiya',a:'Portekiz',d:'28 Haz',v:'Estadio Azteca'},
  ]},
  L:{ teams:[
    {n:'İngiltere',f:'🏴󠁧󠁢󠁥󠁮󠁧󠁿'},{n:'Hırvatistan',f:'🇭🇷'},
    {n:'Gana',f:'🇬🇭'},{n:'Panama',f:'🇵🇦'}
  ], fixtures:[
    {h:'İngiltere',a:'Hırvatistan',d:'17 Haz',v:'AT&T Stadium'},
    {h:'Gana',a:'Panama',d:'17 Haz',v:'BMO Field'},
    {h:'İngiltere',a:'Gana',d:'23 Haz',v:'Gillette Stadium'},
    {h:'Hırvatistan',a:'Panama',d:'23 Haz',v:'BMO Field'},
    {h:'Panama',a:'İngiltere',d:'28 Haz',v:'Lincoln Financial'},
    {h:'Hırvatistan',a:'Gana',d:'28 Haz',v:'BC Place'},
  ]},
};

// Son 32 resmi eşleşme yapısı (FIFA 2026 bracket)
const R32_PAIRS = [
  [{g:'A',p:2},{g:'B',p:2}],
  [{g:'C',p:1},{g:'F',p:2}],
  [{g:'E',p:1},{t:'3rd',label:'En iyi 3. (A/C/E/F/H/I)'}],
  [{g:'F',p:1},{g:'C',p:2}],
  [{g:'E',p:2},{g:'I',p:2}],
  [{g:'I',p:1},{t:'3rd',label:'En iyi 3. (C/D/F/G/H)'}],
  [{g:'A',p:1},{t:'3rd',label:'En iyi 3. (C/E/F/H/I)'}],
  [{g:'L',p:1},{t:'3rd',label:'En iyi 3. (E/H/I/J/K)'}],
  [{g:'G',p:1},{t:'3rd',label:'En iyi 3. (A/E/H/I/J)'}],
  [{g:'D',p:1},{t:'3rd',label:'En iyi 3. (B/E/F/I/J)'}],
  [{g:'H',p:1},{g:'J',p:2}],
  [{g:'K',p:2},{g:'L',p:2}],
  [{g:'B',p:1},{t:'3rd',label:'En iyi 3. (E/F/G/I/J)'}],
  [{g:'D',p:2},{g:'G',p:2}],
  [{g:'J',p:1},{g:'H',p:2}],
  [{g:'K',p:1},{t:'3rd',label:'En iyi 3. (D/I/J/K/L)'}],
];

function getFlag(name) {
  for (const gid of GROUP_IDS) {
    const t = GROUPS[gid].teams.find(x => x.n === name);
    if (t) return t.f;
  }
  return '🏳️';
}

// ─── SUPABASE ────────────────────────────────────────────────
const DB = {
  async req(path, opts = {}) {
    const r = await fetch(SB_URL + path, {
      ...opts,
      headers: {
        'apikey': SB_KEY,
        'Authorization': 'Bearer ' + SB_KEY,
        'Content-Type': 'application/json',
        ...(opts.headers || {}),
      }
    });
    const txt = await r.text();
    if (!r.ok) throw new Error(JSON.parse(txt)?.message || 'DB hata ' + r.status);
    return txt ? JSON.parse(txt) : null;
  },
  getUser(username) {
    return this.req(`/rest/v1/users?username=eq.${encodeURIComponent(username)}&select=id,username`);
  },
  loginUser(username, hash) {
    return this.req(`/rest/v1/users?username=eq.${encodeURIComponent(username)}&password_hash=eq.${hash}&select=id,username`);
  },
  createUser(username, hash) {
    return this.req('/rest/v1/users', {
      method: 'POST',
      headers: { 'Prefer': 'return=representation' },
      body: JSON.stringify({ username, password_hash: hash })
    });
  },
  async getPred(userId) {
    const d = await this.req(`/rest/v1/predictions?user_id=eq.${userId}&select=*`);
    return d && d[0];
  },
  async savePred(userId, payload) {
    const ex = await this.req(`/rest/v1/predictions?user_id=eq.${userId}&select=id`);
    const body = JSON.stringify({ user_id: userId, ...payload, updated_at: new Date().toISOString() });
    if (ex && ex.length > 0) {
      return this.req(`/rest/v1/predictions?user_id=eq.${userId}`, { method: 'PATCH', headers: { 'Prefer': 'return=minimal' }, body });
    }
    return this.req('/rest/v1/predictions', { method: 'POST', headers: { 'Prefer': 'return=minimal' }, body });
  },
  allUsers()  { return this.req('/rest/v1/users?select=id,username'); },
  allPreds()  { return this.req('/rest/v1/predictions?select=user_id,group_rankings,bracket,champion'); },
};

async function hashPw(pw) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(pw));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
}

// ─── UYGULAMA DURUMU ─────────────────────────────────────────
const State = {
  user: null,
  preds: {
    group_rankings: {},   // { A: ['Meksika','Güney Kore','Çekya','Güney Afrika'], ... }
    bracket: {},          // { r32: ['...x16'], r16: [...], qf: [...], sf: [...], final: [...] }
    champion: ''
  },

  getRanking(gid) {
    const stored = this.preds.group_rankings[gid];
    if (stored && stored.length === 4) return [...stored];
    return GROUPS[gid].teams.map(t => t.n);
  },

  setRanking(gid, arr) {
    this.preds.group_rankings[gid] = arr;
  },

  // İlk 2 takım her gruptan geçer; 3. sıra best-third adayı
  getAdvancers(gid) {
    return this.getRanking(gid).slice(0, 2);
  },

  // Tüm grupların tamamlanıp tamamlanmadığı
  isGroupDone(gid) {
    const r = this.preds.group_rankings[gid];
    if (!r || r.length < 4) return false;
    const def = GROUPS[gid].teams.map(t => t.n);
    return r.some((t, i) => t !== def[i]);
  },

  groupsDoneCount() {
    return GROUP_IDS.filter(g => this.isGroupDone(g)).length;
  },

  // R32 takımını kaynaklardan çek
  getR32Team(src) {
    if (src.t === '3rd') return { n: src.label, f: '❓', isTbd: true };
    const ranking = this.getRanking(src.g);
    const name = ranking[src.p - 1];
    return { n: name || '?', f: name ? getFlag(name) : '❓', isTbd: !name };
  },

  getBracketWinner(round, matchIdx) {
    return (this.preds.bracket[round] || [])[matchIdx] || null;
  },

  setBracketWinner(round, matchIdx, team) {
    if (!this.preds.bracket[round]) this.preds.bracket[round] = [];
    this.preds.bracket[round][matchIdx] = team;
    // Sonraki turları temizle (değişen bir şey varsa)
    const order = ['r32','r16','qf','sf','final'];
    const idx = order.indexOf(round);
    for (let i = idx + 1; i < order.length; i++) {
      this.preds.bracket[order[i]] = [];
    }
    if (round === 'final') this.preds.champion = team;
  },

  // Bir turda galip takımları döndür (bracket için kaynak)
  getRoundWinners(round) {
    return this.preds.bracket[round] || [];
  },
};

// ─── ADIM YÖNETİCİSİ ─────────────────────────────────────────
// steps: group-A…group-L (12), summary, r32, r16, qf, sf, final
const STEPS = [
  ...GROUP_IDS.map(g => ({ type:'group', id: g })),
  { type:'summary' },
  ...ELIM_ROUNDS.map(r => ({ type:'elim', ...r })),
];

const Nav = {
  current: 0,

  step() { return STEPS[this.current]; },

  go(idx) {
    if (idx < 0 || idx >= STEPS.length) return;
    this.current = idx;
    render();
  },

  next() { this.go(this.current + 1); },
  prev() { this.go(this.current - 1); },
};

// ─── TOAST ───────────────────────────────────────────────────
function toast(msg, type = 'ok') {
  const wrap = document.getElementById('toast-wrap');
  const el = document.createElement('div');
  el.className = 'toast toast-' + type;
  el.textContent = msg;
  wrap.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

// ─── AUTH RENDER ─────────────────────────────────────────────
function renderAuth() {
  const main = document.getElementById('main-content');
  main.innerHTML = `
    <div class="auth-page">
      <div class="auth-logo">🏆</div>
      <h1 class="auth-title">FIFA Dünya Kupası 2026</h1>
      <p class="auth-sub">Tahmin Platformu</p>
      <div class="auth-tabs">
        <button class="atab active" id="atab-login" onclick="authTab('login')">Giriş Yap</button>
        <button class="atab" id="atab-reg" onclick="authTab('register')">Kayıt Ol</button>
      </div>
      <div id="auth-form"></div>
    </div>
  `;
  authTab('login');
}

let _authMode = 'login';
function authTab(mode) {
  _authMode = mode;
  document.getElementById('atab-login').classList.toggle('active', mode === 'login');
  document.getElementById('atab-reg').classList.toggle('active', mode === 'register');
  const f = document.getElementById('auth-form');
  if (mode === 'login') {
    f.innerHTML = `
      <div class="field"><label>Kullanıcı Adı</label><input class="inp" id="a-u" autocomplete="username" placeholder="kullaniciadi"/></div>
      <div class="field"><label>Şifre</label>
        <div class="pw-wrap"><input class="inp" id="a-p" type="password" autocomplete="current-password" placeholder="••••••"/>
        <button class="pw-eye" type="button" onclick="togglePw('a-p',this)">👁</button></div>
      </div>
      <p class="auth-err" id="aerr"></p>
      <button class="btn-primary w100" onclick="doLogin()">Giriş Yap</button>
    `;
  } else {
    f.innerHTML = `
      <div class="field"><label>Kullanıcı Adı <small>(min 3 karakter)</small></label><input class="inp" id="a-u" autocomplete="username" placeholder="kullaniciadi"/></div>
      <div class="field"><label>Şifre <small>(min 6 karakter)</small></label>
        <div class="pw-wrap"><input class="inp" id="a-p" type="password" autocomplete="new-password" placeholder="••••••"/>
        <button class="pw-eye" type="button" onclick="togglePw('a-p',this)">👁</button></div>
      </div>
      <div class="field"><label>Şifre Tekrar</label>
        <div class="pw-wrap"><input class="inp" id="a-p2" type="password" autocomplete="new-password" placeholder="••••••"/>
        <button class="pw-eye" type="button" onclick="togglePw('a-p2',this)">👁</button></div>
      </div>
      <p class="auth-err" id="aerr"></p>
      <button class="btn-primary w100" onclick="doRegister()">Kayıt Ol</button>
    `;
  }
}

function togglePw(id, btn) {
  const el = document.getElementById(id);
  el.type = el.type === 'password' ? 'text' : 'password';
  btn.textContent = el.type === 'password' ? '👁' : '🙈';
}

async function doLogin() {
  const u = document.getElementById('a-u').value.trim();
  const p = document.getElementById('a-p').value;
  const err = document.getElementById('aerr');
  if (!u || !p) { err.textContent = 'Tüm alanları doldur.'; return; }
  try {
    const hash = await hashPw(p);
    const res = await DB.loginUser(u, hash);
    if (!res || res.length === 0) { err.textContent = 'Kullanıcı adı veya şifre hatalı.'; return; }
    await loginSuccess(res[0]);
  } catch(e) { err.textContent = 'Hata: ' + e.message; }
}

async function doRegister() {
  const u = document.getElementById('a-u').value.trim();
  const p = document.getElementById('a-p').value;
  const p2 = document.getElementById('a-p2').value;
  const err = document.getElementById('aerr');
  if (!u || !p) { err.textContent = 'Tüm alanları doldur.'; return; }
  if (u.length < 3) { err.textContent = 'Kullanıcı adı en az 3 karakter.'; return; }
  if (p.length < 6) { err.textContent = 'Şifre en az 6 karakter.'; return; }
  if (p !== p2) { err.textContent = 'Şifreler eşleşmiyor.'; return; }
  try {
    const ex = await DB.getUser(u);
    if (ex && ex.length > 0) { err.textContent = 'Bu kullanıcı adı alınmış.'; return; }
    const hash = await hashPw(p);
    const res = await DB.createUser(u, hash);
    if (!res || res.length === 0) { err.textContent = 'Kayıt başarısız.'; return; }
    await loginSuccess(res[0]);
  } catch(e) { err.textContent = 'Hata: ' + e.message; }
}

async function loginSuccess(user) {
  State.user = user;
  sessionStorage.setItem('wc_user', JSON.stringify(user));
  try {
    const p = await DB.getPred(user.id);
    if (p) {
      State.preds.group_rankings = p.group_rankings || {};
      State.preds.bracket        = p.bracket || {};
      State.preds.champion       = p.champion || '';
    }
  } catch(e) {}
  toast('Hoş geldin, ' + user.username + '! 👋');
  Nav.current = 0;
  render();
}

function doLogout() {
  State.user = null;
  State.preds = { group_rankings:{}, bracket:{}, champion:'' };
  sessionStorage.removeItem('wc_user');
  renderAuth();
  updateHeader();
}

// ─── HEADER ──────────────────────────────────────────────────
function updateHeader() {
  const u = State.user;
  document.getElementById('hdr-user').innerHTML = u
    ? `<div class="hdr-avatar">${u.username[0].toUpperCase()}</div>
       <span class="hdr-uname">${u.username}</span>
       <button class="hdr-logout" onclick="doLogout()">Çıkış</button>`
    : '';

  // Geri sayım
  const now = new Date();
  const el = document.getElementById('hdr-lock');
  if (IS_LOCKED) { el.textContent = '🔒 Kilitli'; return; }
  const diff = LOCK_DATE - now;
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  el.textContent = `⏳ ${d}g ${h}s ${m}dk`;
}

// ─── ADIM ÜST BARI ───────────────────────────────────────────
function renderStepBar() {
  const bar = document.getElementById('step-bar');
  const step = Nav.step();

  let label = '';
  if (step.type === 'group') label = `Grup ${step.id}`;
  else if (step.type === 'summary') label = 'Özet';
  else label = step.label;

  const total = STEPS.length;
  const pct = Math.round(((Nav.current) / (total - 1)) * 100);

  bar.innerHTML = `
    <div class="sb-top">
      <button class="sb-back ${Nav.current === 0 ? 'invisible' : ''}" onclick="Nav.prev()">‹</button>
      <div class="sb-center">
        <div class="sb-label">${label}</div>
        <div class="sb-prog-wrap"><div class="sb-prog-fill" style="width:${pct}%"></div></div>
        <div class="sb-step-txt">${Nav.current + 1} / ${total}</div>
      </div>
      <div style="width:36px"></div>
    </div>
  `;
}

// ─── GRUP SAYFASI ────────────────────────────────────────────
function renderGroupPage(gid) {
  const g = GROUPS[gid];
  const ranking = State.getRanking(gid);
  const locked = IS_LOCKED;

  const main = document.getElementById('main-content');
  main.innerHTML = `
    <div class="page-group">
      <div class="grp-head">
        <div class="grp-title-row">
          <span class="grp-badge">Grup ${gid}</span>
          <button class="btn-fixture" onclick="openFixture('${gid}')">📅 Fikstür</button>
        </div>
        <p class="grp-hint">${locked ? '🔒 Tahminler kilitlendi.' : '↕ Sürükle-bırak ile tahmin sıranı belirle'}</p>
      </div>

      <div class="rank-table">
        <div class="rank-header">
          <div class="rh-pos">#</div>
          <div class="rh-team">Takım</div>
          <div class="rh-badge">Durum</div>
          ${!locked ? '<div class="rh-drag"></div>' : ''}
        </div>
        <div class="rank-list" id="rank-list-${gid}" 
             ${!locked ? `ondragover="onDragOver(event)" ondrop="onDrop(event,'${gid}')"` : ''}>
          ${ranking.map((name, i) => renderRankRow(name, i, gid, locked)).join('')}
        </div>
      </div>

      <div class="grp-qualify-info">
        <div class="qi-item qi-1st"><span class="qi-dot"></span>1. sıra — gruptan geçer ✓</div>
        <div class="qi-item qi-2nd"><span class="qi-dot"></span>2. sıra — gruptan geçer ✓</div>
        <div class="qi-item qi-3rd"><span class="qi-dot"></span>3. sıra — en iyi 3. adayı</div>
        <div class="qi-item qi-4th"><span class="qi-dot"></span>4. sıra — elenir</div>
      </div>

      <div class="page-actions">
        <button class="btn-primary btn-next" onclick="Nav.next()">
          ${Nav.current === GROUP_IDS.length - 1 ? 'Özete Git →' : `Grup ${GROUP_IDS[Nav.current + 1]}'ye Git →`}
        </button>
      </div>
    </div>
  `;

  if (!locked) initDragDrop(gid);
}

function renderRankRow(name, i, gid, locked) {
  const flag = getFlag(name);
  const posClass = ['pos-1','pos-2','pos-3','pos-4'][i];
  const statusMap = ['Gruptan Geçer ✓','Gruptan Geçer ✓','En İyi 3. Adayı','Elenir'];
  const statusClass = ['st-pass','st-pass','st-third','st-out'][i];

  return `
    <div class="rank-row ${posClass}" 
         draggable="${!locked}" 
         data-name="${name}" 
         data-idx="${i}"
         id="rrow-${gid}-${i}"
         ${!locked ? `ondragstart="onDragStart(event,'${gid}',${i})"` : ''}>
      <div class="rr-pos">${i + 1}</div>
      <div class="rr-team">
        <span class="rr-flag">${flag}</span>
        <span class="rr-name">${name}</span>
      </div>
      <div class="rr-status ${statusClass}">${statusMap[i]}</div>
      ${!locked ? `<div class="rr-drag-handle" aria-hidden="true">⠿</div>` : ''}
    </div>
  `;
}

// Drag & Drop
let _dragGid = null, _dragIdx = null;

function initDragDrop(gid) {
  // Touch support için pointer events
  const rows = document.querySelectorAll(`#rank-list-${gid} .rank-row`);
  rows.forEach(row => {
    row.addEventListener('touchstart', touchStart, { passive: true });
    row.addEventListener('touchmove', touchMove, { passive: false });
    row.addEventListener('touchend', touchEnd, { passive: true });
  });
}

function onDragStart(e, gid, idx) {
  _dragGid = gid; _dragIdx = idx;
  e.dataTransfer.effectAllowed = 'move';
  e.currentTarget.classList.add('dragging');
}

function onDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  const target = e.target.closest('.rank-row');
  if (target) {
    document.querySelectorAll('.rank-row').forEach(r => r.classList.remove('drag-over'));
    target.classList.add('drag-over');
  }
}

function onDrop(e, gid) {
  e.preventDefault();
  document.querySelectorAll('.rank-row').forEach(r => {
    r.classList.remove('dragging', 'drag-over');
  });
  const target = e.target.closest('.rank-row');
  if (!target || _dragGid !== gid) return;
  const toIdx = parseInt(target.dataset.idx);
  if (_dragIdx === toIdx) return;
  const ranking = State.getRanking(gid);
  const [moved] = ranking.splice(_dragIdx, 1);
  ranking.splice(toIdx, 0, moved);
  State.setRanking(gid, ranking);
  renderGroupPage(gid);
}

// Touch drag
let _touchRow = null, _touchGid = null, _touchStartY = 0, _touchCurrentIdx = 0;

function touchStart(e) {
  _touchRow = e.currentTarget;
  _touchGid = _touchRow.dataset.name ? _touchRow.closest('[id^="rank-list-"]').id.replace('rank-list-','') : null;
  _touchStartY = e.touches[0].clientY;
  _touchCurrentIdx = parseInt(_touchRow.dataset.idx);
  _touchRow.classList.add('dragging');
}

function touchMove(e) {
  if (!_touchRow) return;
  e.preventDefault();
  const y = e.touches[0].clientY;
  const rows = Array.from(_touchRow.parentNode.querySelectorAll('.rank-row'));
  rows.forEach(r => r.classList.remove('drag-over'));
  const el = document.elementFromPoint(e.touches[0].clientX, y);
  const target = el ? el.closest('.rank-row') : null;
  if (target && target !== _touchRow) target.classList.add('drag-over');
}

function touchEnd(e) {
  if (!_touchRow || !_touchGid) return;
  const rows = Array.from(_touchRow.parentNode.querySelectorAll('.rank-row'));
  const target = rows.find(r => r.classList.contains('drag-over'));
  rows.forEach(r => r.classList.remove('dragging', 'drag-over'));
  if (target) {
    const fromIdx = parseInt(_touchRow.dataset.idx);
    const toIdx = parseInt(target.dataset.idx);
    if (fromIdx !== toIdx) {
      const ranking = State.getRanking(_touchGid);
      const [moved] = ranking.splice(fromIdx, 1);
      ranking.splice(toIdx, 0, moved);
      State.setRanking(_touchGid, ranking);
      renderGroupPage(_touchGid);
    }
  }
  _touchRow = null; _touchGid = null;
}

// ─── FİKSTÜR MODAL ───────────────────────────────────────────
function openFixture(gid) {
  const g = GROUPS[gid];
  const modal = document.getElementById('modal');
  modal.innerHTML = `
    <div class="modal-box">
      <div class="modal-head">
        <span>Grup ${gid} Fikstürü</span>
        <button class="modal-close" onclick="closeModal()">✕</button>
      </div>
      <div class="modal-body">
        ${g.fixtures.map(f => `
          <div class="fx-match">
            <div class="fx-team fx-home" style=""><span class="fx-flag">${getFlag(f.h)}</span><span>${f.h}</span></div>
            <div class="fx-vs">VS</div>
            <div class="fx-team fx-away"><span>${f.a}</span><span class="fx-flag">${getFlag(f.a)}</span></div>
            <div class="fx-info">📅 ${f.d} &nbsp;·&nbsp; 🏟 ${f.v}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  modal.classList.add('open');
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
}

// ─── ÖZET SAYFASI ────────────────────────────────────────────
function renderSummaryPage() {
  const done = State.groupsDoneCount();
  const main = document.getElementById('main-content');

  const rows = GROUP_IDS.map(gid => {
    const [t1, t2] = State.getAdvancers(gid);
    const third = State.getRanking(gid)[2];
    return `
      <div class="sum-row">
        <div class="sum-gid">Grup ${gid}</div>
        <div class="sum-teams">
          <span class="sum-team pass">${getFlag(t1)} ${t1}</span>
          <span class="sum-sep">·</span>
          <span class="sum-team pass">${getFlag(t2)} ${t2}</span>
          <span class="sum-sep">·</span>
          <span class="sum-team third">${getFlag(third)} ${third} <small>(3.)</small></span>
        </div>
      </div>
    `;
  }).join('');

  main.innerHTML = `
    <div class="page-summary">
      <div class="sum-header">
        <div class="sum-title">Grup Aşaması Özeti</div>
        <div class="sum-stat">${done}/12 grup özelleştirildi</div>
      </div>
      <p class="sum-hint">Grup sıralamalarına göre Son 32'ye geçen takımlar:</p>
      <div class="sum-table">${rows}</div>
      <div class="sum-legend">
        <span class="sum-team pass">✓ Gruptan geçer</span>
        <span class="sum-team third">? En iyi 3. adayı</span>
      </div>
      <div class="page-actions">
        <button class="btn-primary btn-next" onclick="Nav.next()">Son 32'ye Geç →</button>
      </div>
    </div>
  `;
}

// ─── ELİMİNASYON SAYFASI ─────────────────────────────────────
function renderElimPage(roundId, label, matchCount) {
  const main = document.getElementById('main-content');
  const locked = IS_LOCKED;

  const matches = [];
  for (let i = 0; i < matchCount; i++) {
    const teams = getMatchTeams(roundId, i);
    const winner = State.getBracketWinner(roundId, i);
    matches.push({ i, t1: teams[0], t2: teams[1], winner });
  }

  const allPicked = matches.every(m => m.winner);

  main.innerHTML = `
    <div class="page-elim">
      <div class="elim-header">
        <div class="elim-title">${label}</div>
        <div class="elim-sub">${matchCount} maç · Kazananı seçmek için tıkla</div>
      </div>
      ${locked ? `<div class="locked-msg">🔒 Tahminler 8 Haziran'dan itibaren kilitlendi.</div>` : ''}
      <div class="matches-list" id="matches-list">
        ${matches.map(m => renderMatchCard(m, roundId, locked)).join('')}
      </div>
      <div class="page-actions">
        ${allPicked || locked
          ? `<button class="btn-primary btn-next" onclick="Nav.next()">${isLastStep() ? 'Tahminleri Kaydet 💾' : 'Sonraki Tur →'}</button>`
          : `<p class="pick-warn">⚠️ Devam etmek için tüm maçların kazananlarını seç.</p>`
        }
      </div>
    </div>
  `;
}

function isLastStep() {
  return Nav.current === STEPS.length - 1;
}

function renderMatchCard(m, roundId, locked) {
  const t1 = m.t1, t2 = m.t2;
  const isTbd1 = !t1 || t1.isTbd;
  const isTbd2 = !t2 || t2.isTbd;

  return `
    <div class="match-card ${m.winner ? 'has-winner' : ''}">
      <div class="match-num">Maç ${m.i + 1}</div>
      <div class="match-teams">
        <div class="match-team ${m.winner === (t1?.n) ? 'winner' : ''} ${isTbd1 ? 'tbd' : ''}"
             ${!isTbd1 && !locked ? `onclick="pickWinner('${roundId}',${m.i},'${(t1?.n||'').replace(/'/g,"\\'")}',this)"` : ''}>
          <span class="mt-flag">${isTbd1 ? '❓' : t1.f}</span>
          <span class="mt-name">${isTbd1 ? (t1?.n || 'TBD') : t1.n}</span>
          ${m.winner === t1?.n ? '<span class="mt-check">✓</span>' : ''}
        </div>
        <div class="match-vs">VS</div>
        <div class="match-team ${m.winner === (t2?.n) ? 'winner' : ''} ${isTbd2 ? 'tbd' : ''}"
             ${!isTbd2 && !locked ? `onclick="pickWinner('${roundId}',${m.i},'${(t2?.n||'').replace(/'/g,"\\'")}',this)"` : ''}>
          <span class="mt-flag">${isTbd2 ? '❓' : t2.f}</span>
          <span class="mt-name">${isTbd2 ? (t2?.n || 'TBD') : t2.n}</span>
          ${m.winner === t2?.n ? '<span class="mt-check">✓</span>' : ''}
        </div>
      </div>
    </div>
  `;
}

function pickWinner(round, matchIdx, team, el) {
  if (IS_LOCKED) return;
  State.setBracketWinner(round, matchIdx, team);
  // Final'de şampiyon
  if (round === 'final') {
    State.preds.champion = team;
    toast('🏆 Şampiyon: ' + team + ' ' + getFlag(team), 'ok');
  }
  renderElimPage(
    STEPS[Nav.current].id,
    STEPS[Nav.current].label,
    STEPS[Nav.current].matchCount
  );
}

function getMatchTeams(roundId, matchIdx) {
  if (roundId === 'r32') {
    const pair = R32_PAIRS[matchIdx];
    return pair.map(src => State.getR32Team(src));
  }
  // Diğer turlar: önceki turun galibi
  const order = ['r32','r16','qf','sf','final'];
  const prevRound = order[order.indexOf(roundId) - 1];
  const winners = State.getRoundWinners(prevRound);
  const t1name = winners[matchIdx * 2];
  const t2name = winners[matchIdx * 2 + 1];
  return [
    t1name ? { n: t1name, f: getFlag(t1name), isTbd: false } : { n: 'TBD', f: '❓', isTbd: true },
    t2name ? { n: t2name, f: getFlag(t2name), isTbd: false } : { n: 'TBD', f: '❓', isTbd: true },
  ];
}

// ─── LEDERLİK & İSTATİSTİK ───────────────────────────────────
function renderLeaderboard() {
  const main = document.getElementById('main-content');
  main.innerHTML = `<div class="lb-page"><div class="lb-loading">Yükleniyor...</div></div>`;
  loadLbData();
}

async function loadLbData() {
  try {
    const [users, preds] = await Promise.all([DB.allUsers(), DB.allPreds()]);
    const predMap = {};
    (preds || []).forEach(p => predMap[p.user_id] = p);

    const rows = (users || []).map(u => {
      const p = predMap[u.id] || {};
      const r = p.group_rankings || {};
      const done = GROUP_IDS.filter(g => {
        const rank = r[g];
        if (!rank || rank.length < 4) return false;
        return rank.some((t, i) => t !== GROUPS[g].teams[i].n);
      }).length;
      return { id: u.id, name: u.username, pts: done * 2, pct: Math.round(done/12*100) };
    }).sort((a,b) => b.pts - a.pts || b.pct - a.pct);

    const main = document.getElementById('main-content');
    main.innerHTML = `
      <div class="lb-page">
        <h2 class="page-title">🏅 Liderlik Tablosu</h2>
        <div class="points-key">
          Grup geçişi <b>2p</b> · Son 32 <b>5p</b> · Çeyrek <b>7p</b> · Yarı <b>10p</b> · Final <b>15p</b> · Şampiyon <b>20p</b>
        </div>
        <div class="lb-list">
          <div class="lb-row lb-hdr"><div>#</div><div>Kullanıcı</div><div>Puan</div><div>Tamaml.</div></div>
          ${rows.length === 0
            ? '<div class="lb-empty">Henüz tahmin yapan yok.</div>'
            : rows.map((u, i) => {
                const medal = ['🥇','🥈','🥉'][i] || (i+1);
                const isMe = State.user && u.id === State.user.id;
                return `
                  <div class="lb-row ${isMe?'me':''}">
                    <div class="lb-rank">${medal}</div>
                    <div class="lb-name">${u.name}${isMe?'<span class="me-tag"> ★</span>':''}</div>
                    <div class="lb-pts">${u.pts}</div>
                    <div class="lb-pct">%${u.pct}</div>
                  </div>`;
              }).join('')
          }
        </div>
      </div>
    `;
  } catch(e) {
    document.querySelector('.lb-page').innerHTML = `<p style="color:#ff6b6b">Yüklenemedi: ${e.message}</p>`;
  }
}

function renderStats() {
  const main = document.getElementById('main-content');
  main.innerHTML = `<div class="stats-page"><div class="lb-loading">Yükleniyor...</div></div>`;
  loadStatsData();
}

async function loadStatsData() {
  try {
    const [users, preds] = await Promise.all([DB.allUsers(), DB.allPreds()]);
    const total = users?.length || 0;
    const withPreds = preds?.length || 0;
    const withChamp = (preds||[]).filter(p=>p.champion).length;

    const champCount = {};
    (preds||[]).forEach(p => { if(p.champion) champCount[p.champion]=(champCount[p.champion]||0)+1; });
    const topChamp = Object.entries(champCount).sort((a,b)=>b[1]-a[1]).slice(0,8);
    const maxC = topChamp[0]?.[1]||1;

    document.querySelector('.stats-page').innerHTML = `
      <h2 class="page-title">📊 İstatistikler</h2>
      <div class="stat-cards">
        <div class="stat-card"><div class="sc-val">${total}</div><div class="sc-lbl">Kullanıcı</div></div>
        <div class="stat-card"><div class="sc-val">${withPreds}</div><div class="sc-lbl">Tahmin Yapan</div></div>
        <div class="stat-card"><div class="sc-val">${withChamp}</div><div class="sc-lbl">Şampiyon Seçen</div></div>
      </div>
      <h3 class="stats-sub">En Çok Seçilen Şampiyonlar</h3>
      <div class="bar-list">
        ${topChamp.length === 0
          ? '<p class="empty-txt">Henüz veri yok.</p>'
          : topChamp.map(([name,cnt]) => `
            <div class="bar-row">
              <div class="bar-lbl">${getFlag(name)} ${name}</div>
              <div class="bar-track"><div class="bar-fill" style="width:${Math.round(cnt/maxC*100)}%"></div></div>
              <div class="bar-cnt">${cnt}</div>
            </div>`).join('')
        }
      </div>
    `;
  } catch(e) {}
}

// ─── KAYDET ──────────────────────────────────────────────────
async function saveAll() {
  if (!State.user) { toast('Önce giriş yapmalısın!', 'err'); return; }
  if (IS_LOCKED) { toast('Tahminler kilitlendi.', 'err'); return; }
  try {
    await DB.savePred(State.user.id, {
      group_rankings: State.preds.group_rankings,
      bracket: State.preds.bracket,
      champion: State.preds.champion,
    });
    toast('Tahminler kaydedildi ✓');
  } catch(e) {
    toast('Kayıt hatası: ' + e.message, 'err');
  }
}

// ─── ANA RENDER ──────────────────────────────────────────────
function render() {
  updateHeader();
  renderStepBar();

  const step = Nav.step();
  if (step.type === 'group')   renderGroupPage(step.id);
  else if (step.type === 'summary') renderSummaryPage();
  else if (step.type === 'elim')    renderElimPage(step.id, step.label, step.matchCount);
}

// ─── TAB YÖNETİMİ ────────────────────────────────────────────
function showTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`.tab-btn[data-tab="${tab}"]`)?.classList.add('active');

  const stepArea = document.getElementById('step-area');
  const stepBar  = document.getElementById('step-bar');

  if (tab === 'predict') {
    stepArea.style.display = 'block';
    stepBar.style.display  = 'block';
    if (!State.user) { renderAuth(); return; }
    render();
  } else if (tab === 'leaderboard') {
    stepArea.style.display = 'none';
    stepBar.style.display  = 'none';
    renderLeaderboard();
  } else if (tab === 'stats') {
    stepArea.style.display = 'none';
    stepBar.style.display  = 'none';
    renderStats();
  }
}

// ─── BAŞLATMA ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  updateHeader();
  setInterval(updateHeader, 60000);

  // Modal tıklama kapatma
  document.getElementById('modal').addEventListener('click', e => {
    if (e.target === document.getElementById('modal')) closeModal();
  });

  // Session restore
  const saved = sessionStorage.getItem('wc_user');
  if (saved) {
    try {
      const user = JSON.parse(saved);
      State.user = user;
      const p = await DB.getPred(user.id);
      if (p) {
        State.preds.group_rankings = p.group_rankings || {};
        State.preds.bracket        = p.bracket || {};
        State.preds.champion       = p.champion || '';
      }
    } catch(e) { sessionStorage.removeItem('wc_user'); }
  }

  showTab('predict');
});
