// ===== 2026 FIFA WORLD CUP DATA =====

const LOCK_DATE = new Date('2026-06-08T00:00:00');
const IS_LOCKED = new Date() >= LOCK_DATE;

const GROUPS = [
  { id:'A', teams:[
    {n:'Meksika', f:'🇲🇽', en:'Mexico'},
    {n:'Güney Kore', f:'🇰🇷', en:'Korea Republic'},
    {n:'Güney Afrika', f:'🇿🇦', en:'South Africa'},
    {n:'Çekya', f:'🇨🇿', en:'Czechia'},
  ], fixtures:[
    {home:'Meksika', away:'Güney Afrika', date:'11 Haz 2026', venue:'Estadio Azteca, Meksika'},
    {home:'Güney Kore', away:'Çekya', date:'11 Haz 2026', venue:'Estadio Akron, Guadalajara'},
    {home:'Çekya', away:'Güney Afrika', date:'18 Haz 2026', venue:'Mercedes-Benz Stadium, Atlanta'},
    {home:'Meksika', away:'Güney Kore', date:'18 Haz 2026', venue:'Estadio Akron, Guadalajara'},
    {home:'Çekya', away:'Meksika', date:'24 Haz 2026', venue:'Estadio Azteca, Meksika'},
    {home:'Güney Afrika', away:'Güney Kore', date:'24 Haz 2026', venue:'Estadio BBVA, Monterrey'},
  ]},
  { id:'B', teams:[
    {n:'Kanada', f:'🇨🇦', en:'Canada'},
    {n:'Bosna-Hersek', f:'🇧🇦', en:'Bosnia and Herzegovina'},
    {n:'Katar', f:'🇶🇦', en:'Qatar'},
    {n:'İsviçre', f:'🇨🇭', en:'Switzerland'},
  ], fixtures:[
    {home:'Kanada', away:'Bosna-Hersek', date:'12 Haz 2026', venue:'BMO Field, Toronto'},
    {home:'Katar', away:'İsviçre', date:'13 Haz 2026', venue:'Lumen Field, Seattle'},
    {home:'Bosna-Hersek', away:'İsviçre', date:'19 Haz 2026', venue:'Hard Rock Stadium, Miami'},
    {home:'Kanada', away:'Katar', date:'19 Haz 2026', venue:'BC Place, Vancouver'},
    {home:'İsviçre', away:'Kanada', date:'25 Haz 2026', venue:'BC Place, Vancouver'},
    {home:'Bosna-Hersek', away:'Katar', date:'25 Haz 2026', venue:'Levi\'s Stadium, San Francisco'},
  ]},
  { id:'C', teams:[
    {n:'Brezilya', f:'🇧🇷', en:'Brazil'},
    {n:'Fas', f:'🇲🇦', en:'Morocco'},
    {n:'İskoçya', f:'🏴󠁧󠁢󠁳󠁣󠁴󠁿', en:'Scotland'},
    {n:'Haiti', f:'🇭🇹', en:'Haiti'},
  ], fixtures:[
    {home:'Brezilya', away:'Fas', date:'12 Haz 2026', venue:'MetLife Stadium, New Jersey'},
    {home:'İskoçya', away:'Haiti', date:'12 Haz 2026', venue:'SoFi Stadium, Los Angeles'},
    {home:'Fas', away:'Haiti', date:'18 Haz 2026', venue:'AT&T Stadium, Dallas'},
    {home:'Brezilya', away:'İskoçya', date:'18 Haz 2026', venue:'Gillette Stadium, Boston'},
    {home:'Fas', away:'İskoçya', date:'24 Haz 2026', venue:'Gillette Stadium, Boston'},
    {home:'Haiti', away:'Brezilya', date:'24 Haz 2026', venue:'Hard Rock Stadium, Miami'},
  ]},
  { id:'D', teams:[
    {n:'ABD', f:'🇺🇸', en:'United States'},
    {n:'Paraguay', f:'🇵🇾', en:'Paraguay'},
    {n:'Avustralya', f:'🇦🇺', en:'Australia'},
    {n:'Türkiye', f:'🇹🇷', en:'Türkiye'},
  ], fixtures:[
    {home:'ABD', away:'Paraguay', date:'12 Haz 2026', venue:'SoFi Stadium, Los Angeles'},
    {home:'Avustralya', away:'Türkiye', date:'13 Haz 2026', venue:'Lumen Field, Seattle'},
    {home:'Paraguay', away:'Türkiye', date:'19 Haz 2026', venue:'Arrowhead Stadium, Kansas City'},
    {home:'ABD', away:'Avustralya', date:'19 Haz 2026', venue:'SoFi Stadium, Los Angeles'},
    {home:'Türkiye', away:'ABD', date:'25 Haz 2026', venue:'Levi\'s Stadium, San Francisco'},
    {home:'Paraguay', away:'Avustralya', date:'25 Haz 2026', venue:'Lincoln Financial, Philadelphia'},
  ]},
  { id:'E', teams:[
    {n:'Almanya', f:'🇩🇪', en:'Germany'},
    {n:'Fildişi Sahili', f:'🇨🇮', en:'Ivory Coast'},
    {n:'Ekvador', f:'🇪🇨', en:'Ecuador'},
    {n:'Curaçao', f:'🇨🇼', en:'Curaçao'},
  ], fixtures:[
    {home:'Almanya', away:'Curaçao', date:'14 Haz 2026', venue:'NRG Stadium, Houston'},
    {home:'Fildişi Sahili', away:'Ekvador', date:'14 Haz 2026', venue:'Lincoln Financial, Philadelphia'},
    {home:'Almanya', away:'Fildişi Sahili', date:'20 Haz 2026', venue:'BMO Field, Toronto'},
    {home:'Ekvador', away:'Curaçao', date:'20 Haz 2026', venue:'Arrowhead Stadium, Kansas City'},
    {home:'Curaçao', away:'Fildişi Sahili', date:'25 Haz 2026', venue:'Lincoln Financial, Philadelphia'},
    {home:'Ekvador', away:'Almanya', date:'25 Haz 2026', venue:'MetLife Stadium, New Jersey'},
  ]},
  { id:'F', teams:[
    {n:'Hollanda', f:'🇳🇱', en:'Netherlands'},
    {n:'Japonya', f:'🇯🇵', en:'Japan'},
    {n:'İsveç', f:'🇸🇪', en:'Sweden'},
    {n:'Tunus', f:'🇹🇳', en:'Tunisia'},
  ], fixtures:[
    {home:'Hollanda', away:'Japonya', date:'14 Haz 2026', venue:'AT&T Stadium, Dallas'},
    {home:'İsveç', away:'Tunus', date:'14 Haz 2026', venue:'Estadio BBVA, Monterrey'},
    {home:'Hollanda', away:'İsveç', date:'20 Haz 2026', venue:'NRG Stadium, Houston'},
    {home:'Japonya', away:'Tunus', date:'20 Haz 2026', venue:'Estadio BBVA, Monterrey'},
    {home:'Tunus', away:'Hollanda', date:'25 Haz 2026', venue:'Estadio Akron, Guadalajara'},
    {home:'İsveç', away:'Japonya', date:'25 Haz 2026', venue:'Hard Rock Stadium, Miami'},
  ]},
  { id:'G', teams:[
    {n:'Belçika', f:'🇧🇪', en:'Belgium'},
    {n:'Mısır', f:'🇪🇬', en:'Egypt'},
    {n:'İran', f:'🇮🇷', en:'Iran'},
    {n:'Yeni Zelanda', f:'🇳🇿', en:'New Zealand'},
  ], fixtures:[
    {home:'Belçika', away:'Mısır', date:'15 Haz 2026', venue:'SoFi Stadium, Los Angeles'},
    {home:'İran', away:'Yeni Zelanda', date:'15 Haz 2026', venue:'Levi\'s Stadium, San Francisco'},
    {home:'Belçika', away:'Yeni Zelanda', date:'21 Haz 2026', venue:'AT&T Stadium, Dallas'},
    {home:'Mısır', away:'İran', date:'21 Haz 2026', venue:'NRG Stadium, Houston'},
    {home:'Mısır', away:'Yeni Zelanda', date:'26 Haz 2026', venue:'Lincoln Financial, Philadelphia'},
    {home:'İran', away:'Belçika', date:'26 Haz 2026', venue:'MetLife Stadium, New Jersey'},
  ]},
  { id:'H', teams:[
    {n:'İspanya', f:'🇪🇸', en:'Spain'},
    {n:'Uruguay', f:'🇺🇾', en:'Uruguay'},
    {n:'Suudi Arabistan', f:'🇸🇦', en:'Saudi Arabia'},
    {n:'Yeşil Burun Adaları', f:'🇨🇻', en:'Cape Verde'},
  ], fixtures:[
    {home:'İspanya', away:'Suudi Arabistan', date:'15 Haz 2026', venue:'Mercedes-Benz Stadium, Atlanta'},
    {home:'Uruguay', away:'Yeşil Burun Adaları', date:'15 Haz 2026', venue:'Hard Rock Stadium, Miami'},
    {home:'İspanya', away:'Uruguay', date:'21 Haz 2026', venue:'Gillette Stadium, Boston'},
    {home:'Suudi Arabistan', away:'Yeşil Burun Adaları', date:'21 Haz 2026', venue:'Lumen Field, Seattle'},
    {home:'Suudi Arabistan', away:'Uruguay', date:'26 Haz 2026', venue:'MetLife Stadium, New Jersey'},
    {home:'Yeşil Burun Adaları', away:'İspanya', date:'26 Haz 2026', venue:'Arrowhead Stadium, Kansas City'},
  ]},
  { id:'I', teams:[
    {n:'Fransa', f:'🇫🇷', en:'France'},
    {n:'Senegal', f:'🇸🇳', en:'Senegal'},
    {n:'Norveç', f:'🇳🇴', en:'Norway'},
    {n:'Irak', f:'🇮🇶', en:'Iraq'},
  ], fixtures:[
    {home:'Fransa', away:'Norveç', date:'16 Haz 2026', venue:'Mercedes-Benz Stadium, Atlanta'},
    {home:'Senegal', away:'Irak', date:'16 Haz 2026', venue:'Lincoln Financial, Philadelphia'},
    {home:'Fransa', away:'Irak', date:'22 Haz 2026', venue:'Lincoln Financial, Philadelphia'},
    {home:'Norveç', away:'Senegal', date:'22 Haz 2026', venue:'Gillette Stadium, Boston'},
    {home:'Irak', away:'Norveç', date:'27 Haz 2026', venue:'BC Place, Vancouver'},
    {home:'Fransa', away:'Senegal', date:'27 Haz 2026', venue:'Estadio Azteca, Meksika'},
  ]},
  { id:'J', teams:[
    {n:'Arjantin', f:'🇦🇷', en:'Argentina'},
    {n:'Avusturya', f:'🇦🇹', en:'Austria'},
    {n:'Cezayir', f:'🇩🇿', en:'Algeria'},
    {n:'Ürdün', f:'🇯🇴', en:'Jordan'},
  ], fixtures:[
    {home:'Arjantin', away:'Avusturya', date:'16 Haz 2026', venue:'AT&T Stadium, Dallas'},
    {home:'Cezayir', away:'Ürdün', date:'16 Haz 2026', venue:'Levi\'s Stadium, San Francisco'},
    {home:'Arjantin', away:'Cezayir', date:'22 Haz 2026', venue:'Hard Rock Stadium, Miami'},
    {home:'Avusturya', away:'Ürdün', date:'22 Haz 2026', venue:'NRG Stadium, Houston'},
    {home:'Ürdün', away:'Arjantin', date:'27 Haz 2026', venue:'Estadio BBVA, Monterrey'},
    {home:'Cezayir', away:'Avusturya', date:'27 Haz 2026', venue:'Estadio Akron, Guadalajara'},
  ]},
  { id:'K', teams:[
    {n:'Portekiz', f:'🇵🇹', en:'Portugal'},
    {n:'Kolombiya', f:'🇨🇴', en:'Colombia'},
    {n:'Özbekistan', f:'🇺🇿', en:'Uzbekistan'},
    {n:'K. Demokratik Kongo', f:'🇨🇩', en:'DR Congo'},
  ], fixtures:[
    {home:'Portekiz', away:'Özbekistan', date:'17 Haz 2026', venue:'NRG Stadium, Houston'},
    {home:'Kolombiya', away:'K. Demokratik Kongo', date:'17 Haz 2026', venue:'Estadio Akron, Guadalajara'},
    {home:'Portekiz', away:'K. Demokratik Kongo', date:'23 Haz 2026', venue:'Mercedes-Benz Stadium, Atlanta'},
    {home:'Özbekistan', away:'Kolombiya', date:'23 Haz 2026', venue:'Arrowhead Stadium, Kansas City'},
    {home:'K. Demokratik Kongo', away:'Özbekistan', date:'28 Haz 2026', venue:'Lumen Field, Seattle'},
    {home:'Kolombiya', away:'Portekiz', date:'28 Haz 2026', venue:'Estadio Azteca, Meksika'},
  ]},
  { id:'L', teams:[
    {n:'İngiltere', f:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', en:'England'},
    {n:'Hırvatistan', f:'🇭🇷', en:'Croatia'},
    {n:'Gana', f:'🇬🇭', en:'Ghana'},
    {n:'Panama', f:'🇵🇦', en:'Panama'},
  ], fixtures:[
    {home:'İngiltere', away:'Hırvatistan', date:'17 Haz 2026', venue:'AT&T Stadium, Dallas'},
    {home:'Gana', away:'Panama', date:'17 Haz 2026', venue:'BMO Field, Toronto'},
    {home:'İngiltere', away:'Gana', date:'23 Haz 2026', venue:'Gillette Stadium, Boston'},
    {home:'Hırvatistan', away:'Panama', date:'23 Haz 2026', venue:'BMO Field, Toronto'},
    {home:'Panama', away:'İngiltere', date:'28 Haz 2026', venue:'Lincoln Financial, Philadelphia'},
    {home:'Hırvatistan', away:'Gana', date:'28 Haz 2026', venue:'BC Place, Vancouver'},
  ]},
];

// Build a flat team lookup
const TEAM_LOOKUP = {};
GROUPS.forEach(g => {
  g.teams.forEach(t => {
    TEAM_LOOKUP[t.n] = t;
    TEAM_LOOKUP[t.en] = t;
  });
});

function getFlag(name) {
  return (TEAM_LOOKUP[name] || {}).f || '🏳️';
}

// Round of 32 bracket structure - based on official 2026 bracket
// Format: [groupWinner/runner, ...]
// Official bracket pairings for Round of 32:
const R32_STRUCTURE = [
  // Match 1-16 pairs: [team1_source, team2_source]
  // Based on official FIFA 2026 bracket
  { m:0, t1:{g:'A',pos:2}, t2:{g:'B',pos:2} },         // A2 vs B2
  { m:1, t1:{g:'C',pos:1}, t2:{g:'F',pos:2} },          // C1 vs F2
  { m:2, t1:{g:'E',pos:1}, t2:{g:'third',groups:'ACEFHI'} }, // E1 vs best-3rd from A/C/E/F/H/I
  { m:3, t1:{g:'F',pos:1}, t2:{g:'C',pos:2} },          // F1 vs C2
  { m:4, t1:{g:'E',pos:2}, t2:{g:'I',pos:2} },          // E2 vs I2
  { m:5, t1:{g:'I',pos:1}, t2:{g:'third',groups:'CDFGH'} },  // I1 vs best-3rd from C/D/F/G/H
  { m:6, t1:{g:'A',pos:1}, t2:{g:'third',groups:'CEFHI'} },  // A1 vs best-3rd from C/E/F/H/I
  { m:7, t1:{g:'L',pos:1}, t2:{g:'third',groups:'EHIJK'} },  // L1 vs best-3rd from E/H/I/J/K
  { m:8, t1:{g:'G',pos:1}, t2:{g:'third',groups:'AEHIJ'} },  // G1 vs best-3rd from A/E/H/I/J
  { m:9, t1:{g:'D',pos:1}, t2:{g:'third',groups:'BEFIJ'} },  // D1 vs best-3rd from B/E/F/I/J
  { m:10, t1:{g:'H',pos:1}, t2:{g:'J',pos:2} },         // H1 vs J2
  { m:11, t1:{g:'K',pos:2}, t2:{g:'L',pos:2} },         // K2 vs L2
  { m:12, t1:{g:'B',pos:1}, t2:{g:'third',groups:'EFGIJ'} }, // B1 vs best-3rd from E/F/G/I/J
  { m:13, t1:{g:'D',pos:2}, t2:{g:'G',pos:2} },         // D2 vs G2
  { m:14, t1:{g:'J',pos:1}, t2:{g:'H',pos:2} },         // J1 vs H2
  { m:15, t1:{g:'K',pos:1}, t2:{g:'third',groups:'DIJKL'} }, // K1 vs best-3rd from D/I/J/K/L
];

const ROUND_NAMES = ['Son 32', 'Son 16', 'Çeyrek Final', 'Yarı Final', 'Final'];
const ROUND_COUNTS = [16, 8, 4, 2, 1];
// ===== SUPABASE CLIENT =====
const SB_URL = 'https://jkfhqcygjvuijkjamgyn.supabase.co';
const SB_KEY = 'sb_publishable_G-zV5rNtEOmyAgS2B035Ww_vvK0XGSt';

const DB = {
  async fetch(path, opts = {}) {
    const res = await fetch(SB_URL + path, {
      ...opts,
      headers: {
        'apikey': SB_KEY,
        'Authorization': 'Bearer ' + SB_KEY,
        'Content-Type': 'application/json',
        ...(opts.headers || {}),
      }
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'DB error ' + res.status);
    }
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  },

  async getUser(username) {
    const data = await this.fetch(`/rest/v1/users?username=eq.${encodeURIComponent(username)}&select=id,username`);
    return data && data[0];
  },

  async getUserWithPw(username, pwHash) {
    const data = await this.fetch(`/rest/v1/users?username=eq.${encodeURIComponent(username)}&password_hash=eq.${pwHash}&select=id,username`);
    return data && data[0];
  },

  async createUser(username, pwHash) {
    const data = await this.fetch('/rest/v1/users', {
      method: 'POST',
      headers: { 'Prefer': 'return=representation' },
      body: JSON.stringify({ username, password_hash: pwHash })
    });
    return data && data[0];
  },

  async getPrediction(userId) {
    const data = await this.fetch(`/rest/v1/predictions?user_id=eq.${userId}&select=group_rankings,group_advancers,bracket,champion`);
    return data && data[0];
  },

  async upsertPrediction(userId, payload) {
    const existing = await this.fetch(`/rest/v1/predictions?user_id=eq.${userId}&select=id`);
    const body = JSON.stringify({ user_id: userId, ...payload, updated_at: new Date().toISOString() });
    if (existing && existing.length > 0) {
      return this.fetch(`/rest/v1/predictions?user_id=eq.${userId}`, {
        method: 'PATCH',
        headers: { 'Prefer': 'return=minimal' },
        body
      });
    } else {
      return this.fetch('/rest/v1/predictions', {
        method: 'POST',
        headers: { 'Prefer': 'return=minimal' },
        body
      });
    }
  },

  async getAllUsers() {
    return this.fetch('/rest/v1/users?select=id,username');
  },

  async getAllPredictions() {
    return this.fetch('/rest/v1/predictions?select=user_id,group_rankings,group_advancers,bracket,champion');
  }
};

async function hashPw(pw) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(pw));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
}
// ===== AUTH MODULE =====
const Auth = {
  mode: 'login',

  switchMode(m) {
    this.mode = m;
    document.getElementById('at-login').classList.toggle('active', m === 'login');
    document.getElementById('at-reg').classList.toggle('active', m === 'register');
    this.render();
  },

  render() {
    const c = document.getElementById('auth-card-inner');
    if (this.mode === 'login') {
      c.innerHTML = `
        <div class="auth-field">
          <label>Kullanıcı Adı</label>
          <input class="field-input" id="a-user" placeholder="kullaniciadi" autocomplete="username"/>
        </div>
        <div class="auth-field">
          <label>Şifre</label>
          <div class="auth-input-wrap">
            <input class="field-input" id="a-pw" type="password" placeholder="••••••" autocomplete="current-password"/>
            <button class="pw-toggle" type="button" onclick="Auth.togglePw('a-pw',this)">👁</button>
          </div>
        </div>
        <div class="auth-err" id="auth-err"></div>
        <button class="btn-primary full-w" style="margin-top:4px" onclick="Auth.login()">Giriş Yap</button>
      `;
    } else {
      c.innerHTML = `
        <div class="auth-field">
          <label>Kullanıcı Adı <span style="color:#5a6478;font-size:11px;text-transform:none;letter-spacing:0">(en az 3 karakter)</span></label>
          <input class="field-input" id="a-user" placeholder="kullaniciadi" autocomplete="username"/>
        </div>
        <div class="auth-field">
          <label>Şifre <span style="color:#5a6478;font-size:11px;text-transform:none;letter-spacing:0">(en az 6 karakter)</span></label>
          <div class="auth-input-wrap">
            <input class="field-input" id="a-pw" type="password" placeholder="••••••" autocomplete="new-password"/>
            <button class="pw-toggle" type="button" onclick="Auth.togglePw('a-pw',this)">👁</button>
          </div>
        </div>
        <div class="auth-field">
          <label>Şifre Tekrar</label>
          <div class="auth-input-wrap">
            <input class="field-input" id="a-pw2" type="password" placeholder="••••••" autocomplete="new-password"/>
            <button class="pw-toggle" type="button" onclick="Auth.togglePw('a-pw2',this)">👁</button>
          </div>
        </div>
        <div class="auth-err" id="auth-err"></div>
        <button class="btn-primary full-w" style="margin-top:4px" onclick="Auth.register()">Kayıt Ol</button>
      `;
    }
  },

  togglePw(id, btn) {
    const inp = document.getElementById(id);
    inp.type = inp.type === 'password' ? 'text' : 'password';
    btn.textContent = inp.type === 'password' ? '👁' : '🙈';
  },

  setErr(msg) {
    const el = document.getElementById('auth-err');
    if (el) el.textContent = msg;
  },

  async login() {
    const username = document.getElementById('a-user').value.trim();
    const pw = document.getElementById('a-pw').value;
    this.setErr('');
    if (!username || !pw) { this.setErr('Tüm alanları doldur.'); return; }
    try {
      const hash = await hashPw(pw);
      const user = await DB.getUserWithPw(username, hash);
      if (!user) { this.setErr('Kullanıcı adı veya şifre hatalı.'); return; }
      await App.onLogin(user);
    } catch(e) {
      this.setErr('Bağlantı hatası: ' + e.message);
    }
  },

  async register() {
    const username = document.getElementById('a-user').value.trim();
    const pw = document.getElementById('a-pw').value;
    const pw2 = document.getElementById('a-pw2').value;
    this.setErr('');
    if (!username || !pw) { this.setErr('Tüm alanları doldur.'); return; }
    if (username.length < 3) { this.setErr('Kullanıcı adı en az 3 karakter olmalı.'); return; }
    if (pw.length < 6) { this.setErr('Şifre en az 6 karakter olmalı.'); return; }
    if (pw !== pw2) { this.setErr('Şifreler eşleşmiyor.'); return; }
    try {
      const existing = await DB.getUser(username);
      if (existing) { this.setErr('Bu kullanıcı adı alınmış.'); return; }
      const hash = await hashPw(pw);
      const user = await DB.createUser(username, hash);
      if (!user) { this.setErr('Kayıt başarısız.'); return; }
      await App.onLogin(user);
    } catch(e) {
      this.setErr('Kayıt hatası: ' + e.message);
    }
  }
};
// ===== GROUPS MODULE =====
const Groups = {
  currentIdx: 0,

  init() {
    this.currentIdx = 0;
    this.renderDots();
    this.renderGroup();
    this.populateChampSelect();
    this.updateProgress();
  },

  renderDots() {
    const wrap = document.getElementById('group-dots');
    wrap.innerHTML = '';
    GROUPS.forEach((g, i) => {
      const done = this.isGroupDone(g.id);
      const isCurrent = i === this.currentIdx;
      const dot = document.createElement('div');
      dot.className = 'group-dot' + (done ? ' done' : '') + (isCurrent ? ' current' : '');
      dot.textContent = g.id;
      dot.onclick = () => this.goToGroup(i);
      wrap.appendChild(dot);
    });
  },

  renderGroup() {
    const g = GROUPS[this.currentIdx];
    const card = document.getElementById('group-stage-card');
    const rankings = this.getRankings(g.id);

    document.getElementById('gni-current').textContent = g.id;
    document.getElementById('gnb-prev').disabled = this.currentIdx === 0;
    document.getElementById('gnb-next').textContent = this.currentIdx === GROUPS.length - 1 ? 'Tamamla ✓' : 'Sonraki ›';

    card.innerHTML = `
      <div class="gc-header">
        <div>
          <div class="gc-title">Grup ${g.id}</div>
          <div class="gc-sub">${g.teams.map(t => t.f).join(' ')}</div>
        </div>
        <button class="gc-fixture-btn" onclick="App.showFixture('${g.id}')">📅 Fikstür</button>
      </div>
      <div class="gc-order-hint">
        ↕ Takımları sıralamak için ▲▼ butonlarını kullan — 1. ve 2. sıra gruptan geçer
      </div>
      <div class="gc-rank-header">
        <div>#</div>
        <div>Takım</div>
        <div style="text-align:center">OM</div>
        <div style="text-align:center">G</div>
        <div style="text-align:center">A</div>
        <div style="text-align:center">AG</div>
        <div style="text-align:center">P</div>
      </div>
      <div class="gc-ranking" id="gc-ranking-body"></div>
      <div class="qualify-line"><span class="qualify-label">✓ Gruptan Geçer</span></div>
      <div class="third-line"><span class="third-label">? En İyi 3.</span></div>
    `;

    this.renderRankRows(g, rankings);
    this.updateProgress();
    this.renderDots();
  },

  renderRankRows(g, rankings) {
    const body = document.getElementById('gc-ranking-body');
    body.innerHTML = '';
    rankings.forEach((teamName, i) => {
      const team = g.teams.find(t => t.n === teamName) || { n: teamName, f: '🏳️' };
      const posClass = ['p1','p2','p3',''][i] || '';
      const qualClass = i < 2 ? 'qualifies' : i === 2 ? 'qualifies-3rd' : '';
      const row = document.createElement('div');
      row.className = `gc-rank-row ${qualClass}`;
      row.innerHTML = `
        <div class="pos-num ${posClass}">${i+1}</div>
        <div class="team-cell">
          <span class="team-flag">${team.f}</span>
          <span class="team-name">${team.n}</span>
        </div>
        <div class="stat-cell">3</div>
        <div class="stat-cell">—</div>
        <div class="stat-cell">—</div>
        <div class="stat-cell">—</div>
        <div class="stat-cell pts">—</div>
        <div class="rank-controls">
          <button class="rank-btn" onclick="Groups.moveUp('${g.id}',${i})" ${i===0||IS_LOCKED?'disabled':''}>▲</button>
          <button class="rank-btn" onclick="Groups.moveDown('${g.id}',${i})" ${i===g.teams.length-1||IS_LOCKED?'disabled':''}>▼</button>
        </div>
      `;
      body.appendChild(row);

      // Insert visual lines
      if (i === 1) {
        // Qualify line is in the HTML already via qualify-line div
      }
    });

    // Adjust grid columns to include controls
    const rankHeader = card ? card.querySelector('.gc-rank-header') : document.querySelector('.gc-rank-header');
    if (rankHeader) {
      rankHeader.style.gridTemplateColumns = '28px 1fr 32px 32px 32px 32px 40px 42px';
    }
    document.querySelectorAll('.gc-rank-row').forEach(r => {
      r.style.gridTemplateColumns = '28px 1fr 32px 32px 32px 32px 40px 42px';
    });
  },

  getRankings(gid) {
    const stored = (App.preds.group_rankings || {})[gid];
    if (stored && stored.length === 4) return stored;
    return GROUPS.find(g => g.id === gid).teams.map(t => t.n);
  },

  moveUp(gid, idx) {
    if (idx === 0 || IS_LOCKED) return;
    const rankings = this.getRankings(gid);
    [rankings[idx-1], rankings[idx]] = [rankings[idx], rankings[idx-1]];
    this.saveRankings(gid, rankings);
    this.renderRankRows(GROUPS.find(g => g.id === gid), rankings);
    this.updateProgress();
    this.renderDots();
  },

  moveDown(gid, idx) {
    const g = GROUPS.find(x => x.id === gid);
    if (idx >= g.teams.length - 1 || IS_LOCKED) return;
    const rankings = this.getRankings(gid);
    [rankings[idx], rankings[idx+1]] = [rankings[idx+1], rankings[idx]];
    this.saveRankings(gid, rankings);
    this.renderRankRows(g, rankings);
    this.updateProgress();
    this.renderDots();
  },

  saveRankings(gid, rankings) {
    if (!App.preds.group_rankings) App.preds.group_rankings = {};
    App.preds.group_rankings[gid] = rankings;
    // auto-derive advancers (top 2)
    if (!App.preds.group_advancers) App.preds.group_advancers = {};
    App.preds.group_advancers[gid] = rankings.slice(0, 2);
  },

  isGroupDone(gid) {
    // A group is "done" if user has explicitly set a ranking (moved at least one team)
    const stored = (App.preds.group_rankings || {})[gid];
    if (!stored || stored.length < 4) return false;
    // Check if it differs from default order
    const defaultOrder = GROUPS.find(g => g.id === gid).teams.map(t => t.n);
    return stored.some((t, i) => t !== defaultOrder[i]);
  },

  updateProgress() {
    const done = GROUPS.filter(g => this.isGroupDone(g.id)).length;
    const pct = Math.round((done / GROUPS.length) * 100);
    document.getElementById('gnp-fill').style.width = pct + '%';
    document.getElementById('gnp-txt').textContent = `${done}/12 grup tamamlandı`;
    document.getElementById('adv-count') && (document.getElementById('adv-count').textContent = done * 2);
  },

  prevGroup() {
    if (this.currentIdx > 0) {
      this.currentIdx--;
      this.renderGroup();
    }
  },

  nextGroup() {
    if (this.currentIdx < GROUPS.length - 1) {
      this.currentIdx++;
      this.renderGroup();
    } else {
      App.showToast('Tüm grupları tamamladın! Şimdi şampiyonu seç. 🏆', 'ok');
    }
  },

  goToGroup(idx) {
    this.currentIdx = idx;
    this.renderGroup();
  },

  onChampChange() {
    App.preds.champion = document.getElementById('champ-select').value;
  },

  populateChampSelect() {
    const sel = document.getElementById('champ-select');
    if (!sel) return;
    sel.innerHTML = '<option value="">— Şampiyonu seç —</option>';
    GROUPS.forEach(g => {
      const opt = document.createElement('optgroup');
      opt.label = `Grup ${g.id}`;
      g.teams.forEach(t => {
        const o = document.createElement('option');
        o.value = t.n;
        o.textContent = t.f + ' ' + t.n;
        opt.appendChild(o);
      });
      sel.appendChild(opt);
    });
    if (App.preds.champion) sel.value = App.preds.champion;
  },

  loadPreds() {
    this.renderGroup();
    this.renderDots();
    this.populateChampSelect();
    this.updateProgress();
  }
};
// ===== BRACKET MODULE =====
const Bracket = {
  render() {
    const container = document.getElementById('bracket-container');
    container.innerHTML = '';
    const bp = App.preds.bracket || {};

    ROUND_COUNTS.forEach((matchCount, ri) => {
      const col = document.createElement('div');
      col.className = 'bracket-round';
      col.innerHTML = `<div class="br-label">${ROUND_NAMES[ri]}</div><div class="br-matches" id="br-matches-${ri}"></div>`;
      container.appendChild(col);
    });

    this.renderRound(0, bp);
  },

  renderRound(ri, bp) {
    const matchCount = ROUND_COUNTS[ri];
    const wrap = document.getElementById(`br-matches-${ri}`);
    if (!wrap) return;
    wrap.innerHTML = '';

    for (let m = 0; m < matchCount; m++) {
      const teams = this.getMatchTeams(ri, m, bp);
      const winner = (bp[ri] || [])[m];

      const slot = document.createElement('div');
      slot.className = 'bracket-match';

      teams.forEach(team => {
        const row = document.createElement('div');
        const isTbd = !team || team === 'TBD';
        const isWin = !isTbd && winner === team;
        row.className = 'bm-team' + (isTbd ? ' tbd' : '') + (isWin ? ' winner' : '') + (IS_LOCKED ? ' locked' : '');
        const flag = isTbd ? '' : getFlag(team);
        row.innerHTML = `<span class="bm-flag">${isTbd ? '?' : flag}</span><span class="bm-name">${isTbd ? 'TBD' : team}</span>`;

        if (!isTbd && !IS_LOCKED) {
          row.onclick = () => {
            if (!bp[ri]) bp[ri] = [];
            bp[ri][m] = team;
            App.preds.bracket = bp;
            // Re-render from this round onward
            for (let r = ri; r < ROUND_COUNTS.length; r++) {
              this.renderRound(r, bp);
            }
          };
        }
        slot.appendChild(row);
      });
      wrap.appendChild(slot);
    }
  },

  getMatchTeams(ri, m, bp) {
    if (ri === 0) {
      // Round of 32: use group rankings
      return this.getR32Teams(m);
    }
    // Later rounds: use winners from previous round
    const prevWinners = bp[ri - 1] || [];
    const t1 = prevWinners[m * 2];
    const t2 = prevWinners[m * 2 + 1];
    return [t1 || null, t2 || null];
  },

  getR32Teams(matchIdx) {
    const struct = R32_STRUCTURE[matchIdx];
    if (!struct) return [null, null];

    const getTeam = (src) => {
      if (!src) return null;
      if (src.third) {
        return '3. Grup (' + src.groups + ')';
      }
      const gid = src.g;
      const pos = src.pos - 1; // 0-indexed
      const rankings = (App.preds.group_rankings || {})[gid];
      if (!rankings || !rankings[pos]) {
        const g = GROUPS.find(x => x.id === gid);
        return g ? g.teams[pos]?.n : null;
      }
      return rankings[pos];
    };

    return [getTeam(struct.t1), getTeam(struct.t2)];
  },

  loadPreds() {
    this.render();
  }
};
// ===== LEADERBOARD MODULE =====
const Leaderboard = {
  async load() {
    const wrap = document.getElementById('lb-table');
    wrap.innerHTML = '<div class="lb-loading">Yükleniyor...</div>';

    try {
      const [users, allPreds] = await Promise.all([DB.getAllUsers(), DB.getAllPredictions()]);
      const predMap = {};
      (allPreds || []).forEach(p => predMap[p.user_id] = p);

      const rows = (users || []).map(u => {
        const p = predMap[u.id] || {};
        const done = this.calcGroupsDone(p.group_rankings);
        const pts = done * 2; // Simple point system for now
        return { id: u.id, name: u.username, pts, done, pct: Math.round((done / 12) * 100) };
      }).sort((a, b) => b.pts - a.pts || b.pct - a.pct);

      if (rows.length === 0) {
        wrap.innerHTML = '<div class="lb-loading">Henüz tahmin yapan yok. İlk sen ol!</div>';
        return;
      }

      let html = `
        <div class="lb-header-row">
          <div>#</div><div>Kullanıcı</div>
          <div style="text-align:right">Puan</div>
          <div style="text-align:right">Tamaml.</div>
        </div>
      `;
      rows.forEach((u, i) => {
        const rankClass = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';
        const rankIcon = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : (i + 1);
        const isMe = App.currentUser && u.id === App.currentUser.id;
        html += `
          <div class="lb-row${isMe ? ' is-me' : ''}">
            <div class="lb-rank ${rankClass}">${rankIcon}</div>
            <div class="lb-name">${u.name}${isMe ? '<span class="me-tag">★ BEN</span>' : ''}</div>
            <div class="lb-pts">${u.pts}</div>
            <div class="lb-pct">%${u.pct}</div>
          </div>
        `;
      });
      wrap.innerHTML = html;

      // Update my rank on dash
      if (App.currentUser) {
        const myIdx = rows.findIndex(r => r.id === App.currentUser.id);
        if (myIdx >= 0) {
          document.getElementById('my-rank').textContent = myIdx + 1;
          document.getElementById('my-pts').textContent = rows[myIdx].pts;
          document.getElementById('my-done').textContent = rows[myIdx].pct + '%';
        }
      }
    } catch(e) {
      wrap.innerHTML = '<div class="lb-loading" style="color:#ff3d3d">Yüklenemedi: ' + e.message + '</div>';
    }
  },

  calcGroupsDone(rankings) {
    if (!rankings) return 0;
    return GROUPS.filter(g => {
      const r = rankings[g.id];
      if (!r || r.length < 4) return false;
      const def = g.teams.map(t => t.n);
      return r.some((t, i) => t !== def[i]);
    }).length;
  }
};

// ===== STATS MODULE =====
const Stats = {
  async load() {
    try {
      const [users, allPreds] = await Promise.all([DB.getAllUsers(), DB.getAllPredictions()]);
      const total = users ? users.length : 0;
      const withPreds = (allPreds || []).length;
      const withChamp = (allPreds || []).filter(p => p.champion).length;

      document.getElementById('global-stats').innerHTML = `
        <div class="gs-card"><div class="gs-val">${total}</div><div class="gs-lbl">Toplam Kullanıcı</div></div>
        <div class="gs-card"><div class="gs-val">${withPreds}</div><div class="gs-lbl">Tahmin Yapan</div></div>
        <div class="gs-card"><div class="gs-val">${withChamp}</div><div class="gs-lbl">Şampiyon Seçen</div></div>
        <div class="gs-card"><div class="gs-val">${withPreds > 0 ? Math.round((withChamp/withPreds)*100) : 0}%</div><div class="gs-lbl">Tamamlama Oranı</div></div>
      `;

      // Champion bars
      const champCounts = {};
      (allPreds || []).forEach(p => { if (p.champion) champCounts[p.champion] = (champCounts[p.champion] || 0) + 1; });
      const champSorted = Object.entries(champCounts).sort((a,b) => b[1]-a[1]).slice(0,10);
      const maxC = champSorted[0]?.[1] || 1;
      const champEl = document.getElementById('champ-bars');
      if (champSorted.length === 0) {
        champEl.innerHTML = '<p style="color:#5a6478;font-size:13px">Henüz şampiyon tahmini yok.</p>';
      } else {
        champEl.innerHTML = champSorted.map(([name, cnt]) => `
          <div class="bar-row">
            <div class="bar-label">${getFlag(name)} ${name}</div>
            <div class="bar-track"><div class="bar-fill" style="width:${Math.round((cnt/maxC)*100)}%"></div></div>
            <div class="bar-count">${cnt}</div>
            <div class="bar-pct">%${withPreds > 0 ? Math.round((cnt/withPreds)*100) : 0}</div>
          </div>
        `).join('');
      }

      // Advancers bars
      const advCounts = {};
      (allPreds || []).forEach(p => {
        const adv = p.group_advancers || {};
        Object.values(adv).forEach(teams => {
          (teams || []).forEach(t => { advCounts[t] = (advCounts[t] || 0) + 1; });
        });
      });
      const advSorted = Object.entries(advCounts).sort((a,b) => b[1]-a[1]).slice(0,10);
      const maxA = advSorted[0]?.[1] || 1;
      const advEl = document.getElementById('adv-bars');
      if (advSorted.length === 0) {
        advEl.innerHTML = '<p style="color:#5a6478;font-size:13px">Henüz veri yok.</p>';
      } else {
        advEl.innerHTML = advSorted.map(([name, cnt]) => `
          <div class="bar-row">
            <div class="bar-label">${getFlag(name)} ${name}</div>
            <div class="bar-track"><div class="bar-fill" style="width:${Math.round((cnt/maxA)*100)}%"></div></div>
            <div class="bar-count">${cnt}</div>
            <div class="bar-pct">%${withPreds > 0 ? Math.round((cnt/withPreds)*100) : 0}</div>
          </div>
        `).join('');
      }

    } catch(e) {
      console.error('Stats error', e);
    }
  }
};
// ===== MAIN APP =====
const App = {
  currentUser: null,
  preds: { group_rankings: {}, group_advancers: {}, bracket: {}, champion: '' },

  async init() {
    Auth.render();
    this.updateCountdown();
    setInterval(() => this.updateCountdown(), 60000);
    this.showTab('tab-auth');
    Leaderboard.load();

    // Try restore session
    const saved = sessionStorage.getItem('wc2026_user');
    if (saved) {
      try {
        const user = JSON.parse(saved);
        await this.onLogin(user, true);
      } catch(e) { sessionStorage.removeItem('wc2026_user'); }
    }
  },

  updateCountdown() {
    const now = new Date();
    const txt = document.getElementById('lock-txt');
    if (now >= LOCK_DATE) {
      txt.textContent = 'Tahminler kilitlendi';
      return;
    }
    const diff = LOCK_DATE - now;
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    txt.textContent = `${d}g ${h}s ${m}dk kaldı`;
  },

  showTab(id) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    const tabEl = document.getElementById(id);
    if (tabEl) tabEl.classList.add('active');
    const nb = document.querySelector(`.nav-btn[data-tab="${id}"]`);
    if (nb) nb.classList.add('active');

    if (id === 'tab-groups') this.initGroupsTab();
    if (id === 'tab-bracket') this.initBracketTab();
    if (id === 'tab-lb') Leaderboard.load();
    if (id === 'tab-stats') Stats.load();
  },

  initGroupsTab() {
    if (!this.currentUser) {
      document.getElementById('groups-unauth').style.display = 'block';
      document.getElementById('groups-content').style.display = 'none';
    } else {
      document.getElementById('groups-unauth').style.display = 'none';
      document.getElementById('groups-content').style.display = 'block';
      document.getElementById('groups-lock-banner').style.display = IS_LOCKED ? 'block' : 'none';
      document.getElementById('btn-save-groups') && (document.getElementById('btn-save-groups').disabled = IS_LOCKED);
      Groups.loadPreds();
    }
  },

  initBracketTab() {
    if (!this.currentUser) {
      document.getElementById('bracket-unauth').style.display = 'block';
      document.getElementById('bracket-content').style.display = 'none';
    } else {
      document.getElementById('bracket-unauth').style.display = 'none';
      document.getElementById('bracket-content').style.display = 'block';
      document.getElementById('bracket-lock-banner').style.display = IS_LOCKED ? 'block' : 'none';
      document.getElementById('btn-save-bracket') && (document.getElementById('btn-save-bracket').disabled = IS_LOCKED);
      Bracket.loadPreds();
    }
  },

  async onLogin(user, silent = false) {
    this.currentUser = user;
    sessionStorage.setItem('wc2026_user', JSON.stringify(user));

    // Load predictions
    try {
      const p = await DB.getPrediction(user.id);
      if (p) {
        this.preds = {
          group_rankings: p.group_rankings || {},
          group_advancers: p.group_advancers || {},
          bracket: p.bracket || {},
          champion: p.champion || ''
        };
      }
    } catch(e) { console.warn('Could not load predictions', e); }

    this.updateAuthUI();
    if (!silent) {
      this.showToast('Hoş geldin, ' + user.username + '! 👋', 'ok');
      this.showTab('tab-groups');
    }
  },

  logout() {
    this.currentUser = null;
    this.preds = { group_rankings: {}, group_advancers: {}, bracket: {}, champion: '' };
    sessionStorage.removeItem('wc2026_user');
    this.updateAuthUI();
    this.showTab('tab-auth');
    this.showToast('Çıkış yapıldı', 'ok');
  },

  updateAuthUI() {
    const isLoggedIn = !!this.currentUser;
    document.getElementById('auth-form-wrap').style.display = isLoggedIn ? 'none' : 'block';
    document.getElementById('auth-user-wrap').style.display = isLoggedIn ? 'block' : 'none';
    document.getElementById('user-chip').style.display = isLoggedIn ? 'flex' : 'none';
    document.getElementById('nb-groups').disabled = !isLoggedIn;
    document.getElementById('nb-bracket').disabled = !isLoggedIn;

    if (isLoggedIn) {
      const initials = this.currentUser.username.slice(0, 2).toUpperCase();
      document.getElementById('chip-avatar').textContent = initials;
      document.getElementById('chip-name').textContent = this.currentUser.username;
      document.getElementById('dash-avatar').textContent = initials;
      document.getElementById('dash-name').textContent = this.currentUser.username;
      this.updateMyStats();
    }
  },

  updateMyStats() {
    const done = Groups.calcGroupsDone ? 0 : 0; // Will be updated by Leaderboard
    const rankings = this.preds.group_rankings || {};
    const doneCount = GROUPS.filter(g => {
      const r = rankings[g.id];
      if (!r || r.length < 4) return false;
      const def = g.teams.map(t => t.n);
      return r.some((t, i) => t !== def[i]);
    }).length;
    const pts = doneCount * 2;
    document.getElementById('my-pts').textContent = pts;
    document.getElementById('my-done').textContent = Math.round((doneCount / 12) * 100) + '%';
  },

  async saveAll() {
    if (!this.currentUser) { this.showToast('Önce giriş yapmalısın', 'err'); return; }
    if (IS_LOCKED) { this.showToast('Tahminler 8 Haziran\'dan itibaren kilitlendi', 'err'); return; }
    try {
      await DB.upsertPrediction(this.currentUser.id, {
        group_rankings: this.preds.group_rankings,
        group_advancers: this.preds.group_advancers,
        bracket: this.preds.bracket,
        champion: this.preds.champion
      });
      this.showToast('Tahminler kaydedildi ✓', 'ok');
      this.updateMyStats();
    } catch(e) {
      this.showToast('Kayıt hatası: ' + e.message, 'err');
    }
  },

  showFixture(gid) {
    const g = GROUPS.find(x => x.id === gid);
    if (!g) return;
    document.getElementById('modal-title').textContent = `Grup ${gid} Fikstürü`;
    const body = document.getElementById('modal-body');
    body.innerHTML = g.fixtures.map(f => `
      <div class="fixture-match">
        <div class="fm-team">
          <span class="fm-flag">${getFlag(f.home)}</span>
          <span>${f.home}</span>
        </div>
        <div class="fm-vs">VS</div>
        <div class="fm-team right">
          <span>${f.away}</span>
          <span class="fm-flag">${getFlag(f.away)}</span>
        </div>
        <div class="fixture-date">📅 ${f.date} · 📍 ${f.venue}</div>
      </div>
    `).join('');
    document.getElementById('fixture-modal').classList.add('open');
  },

  closeFixture(e) {
    if (!e || e.target === document.getElementById('fixture-modal')) {
      document.getElementById('fixture-modal').classList.remove('open');
    }
  },

  showToast(msg, type = 'ok') {
    const wrap = document.getElementById('toast-wrap');
    const t = document.createElement('div');
    t.className = 'toast ' + type;
    t.textContent = msg;
    wrap.appendChild(t);
    setTimeout(() => t.remove(), 3000);
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
