/* ============================================================
   FIFA 2026 TAHMİN PLATFORMU — script.js
   ============================================================ */

const LOCK_DATE = new Date('2026-06-08T00:00:00');
const IS_LOCKED = new Date() >= LOCK_DATE;
const WC_KICKOFF = new Date('2026-06-11T19:00:00Z');
const SB_URL = 'https://jkfhqcygjvuijkjamgyn.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprZmhxY3lnanZ1aWpramFtZ3luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0MzAwNjMsImV4cCI6MjA5NDAwNjA2M30.6_6QZBGdYiOKpyIGbfuzKfTXsyTifyUSTBHoW5fWmJ8';

const GROUP_IDS = ['A','B','C','D','E','F','G','H','I','J','K','L'];
const ELIM_ROUNDS = [
  {id:'r32',  label:'Son 32',       n:16},
  {id:'r16',  label:'Son 16',       n:8 },
  {id:'qf',   label:'Çeyrek Final', n:4 },
  {id:'sf',   label:'Yarı Final',   n:2 },
  {id:'final',label:'Final',        n:1 },
];
const STEPS = [
  ...GROUP_IDS.map(id => ({type:'group',id})),
  {type:'summary'},
  {type:'best8'},
  ...ELIM_ROUNDS.map(r => ({type:'elim',...r})),
];

// Son 32 resmi eşleşmeler - her 3rd kaynağa sıra numarası atıyoruz
let _thirdSlot = 0;
const R32 = [
  [{g:'A',p:2},{g:'B',p:2}],
  [{g:'C',p:1},{g:'F',p:2}],
  [{g:'E',p:1},{t:'3rd',slot:0}],
  [{g:'F',p:1},{g:'C',p:2}],
  [{g:'E',p:2},{g:'I',p:2}],
  [{g:'I',p:1},{t:'3rd',slot:1}],
  [{g:'A',p:1},{t:'3rd',slot:2}],
  [{g:'L',p:1},{t:'3rd',slot:3}],
  [{g:'G',p:1},{t:'3rd',slot:4}],
  [{g:'D',p:1},{t:'3rd',slot:5}],
  [{g:'H',p:1},{g:'J',p:2}],
  [{g:'K',p:2},{g:'L',p:2}],
  [{g:'B',p:1},{t:'3rd',slot:6}],
  [{g:'D',p:2},{g:'G',p:2}],
  [{g:'J',p:1},{g:'H',p:2}],
  [{g:'K',p:1},{t:'3rd',slot:7}],
];

const GROUPS = {
  A:{teams:[{n:'Meksika',f:'🇲🇽'},{n:'Güney Kore',f:'🇰🇷'},{n:'Güney Afrika',f:'🇿🇦'},{n:'Çekya',f:'🇨🇿'}],
     fx:[{h:'Meksika',a:'Güney Afrika',d:'11 Haz',v:'Estadio Azteca'},{h:'Güney Kore',a:'Çekya',d:'11 Haz',v:'Estadio Akron'},{h:'Çekya',a:'Güney Afrika',d:'18 Haz',v:'Mercedes-Benz Stadium'},{h:'Meksika',a:'Güney Kore',d:'18 Haz',v:'Estadio Akron'},{h:'Çekya',a:'Meksika',d:'24 Haz',v:'Estadio Azteca'},{h:'Güney Afrika',a:'Güney Kore',d:'24 Haz',v:'Estadio BBVA'}]},
  B:{teams:[{n:'Kanada',f:'🇨🇦'},{n:'Bosna-Hersek',f:'🇧🇦'},{n:'Katar',f:'🇶🇦'},{n:'İsviçre',f:'🇨🇭'}],
     fx:[{h:'Kanada',a:'Bosna-Hersek',d:'12 Haz',v:'BMO Field'},{h:'Katar',a:'İsviçre',d:'13 Haz',v:'Lumen Field'},{h:'Bosna-Hersek',a:'İsviçre',d:'19 Haz',v:'Hard Rock Stadium'},{h:'Kanada',a:'Katar',d:'19 Haz',v:'BC Place'},{h:'İsviçre',a:'Kanada',d:'25 Haz',v:'BC Place'},{h:'Bosna-Hersek',a:'Katar',d:'25 Haz',v:"Levi's Stadium"}]},
  C:{teams:[{n:'Brezilya',f:'🇧🇷'},{n:'Fas',f:'🇲🇦'},{n:'İskoçya',f:'🏴󠁧󠁢󠁳󠁣󠁴󠁿'},{n:'Haiti',f:'🇭🇹'}],
     fx:[{h:'Brezilya',a:'Fas',d:'12 Haz',v:'MetLife Stadium'},{h:'İskoçya',a:'Haiti',d:'12 Haz',v:'SoFi Stadium'},{h:'Fas',a:'Haiti',d:'18 Haz',v:'AT&T Stadium'},{h:'Brezilya',a:'İskoçya',d:'18 Haz',v:'Gillette Stadium'},{h:'Fas',a:'İskoçya',d:'24 Haz',v:'Gillette Stadium'},{h:'Haiti',a:'Brezilya',d:'24 Haz',v:'Hard Rock Stadium'}]},
  D:{teams:[{n:'ABD',f:'🇺🇸'},{n:'Paraguay',f:'🇵🇾'},{n:'Avustralya',f:'🇦🇺'},{n:'Türkiye',f:'🇹🇷'}],
     fx:[{h:'ABD',a:'Paraguay',d:'12 Haz',v:'SoFi Stadium'},{h:'Avustralya',a:'Türkiye',d:'13 Haz',v:'Lumen Field'},{h:'Paraguay',a:'Türkiye',d:'19 Haz',v:'Arrowhead Stadium'},{h:'ABD',a:'Avustralya',d:'19 Haz',v:'SoFi Stadium'},{h:'Türkiye',a:'ABD',d:'25 Haz',v:"Levi's Stadium"},{h:'Paraguay',a:'Avustralya',d:'25 Haz',v:'Lincoln Financial'}]},
  E:{teams:[{n:'Almanya',f:'🇩🇪'},{n:'Fildişi Sahili',f:'🇨🇮'},{n:'Ekvador',f:'🇪🇨'},{n:'Curaçao',f:'🇨🇼'}],
     fx:[{h:'Almanya',a:'Curaçao',d:'14 Haz',v:'NRG Stadium'},{h:'Fildişi Sahili',a:'Ekvador',d:'14 Haz',v:'Lincoln Financial'},{h:'Almanya',a:'Fildişi Sahili',d:'20 Haz',v:'BMO Field'},{h:'Ekvador',a:'Curaçao',d:'20 Haz',v:'Arrowhead Stadium'},{h:'Curaçao',a:'Fildişi Sahili',d:'25 Haz',v:'Lincoln Financial'},{h:'Ekvador',a:'Almanya',d:'25 Haz',v:'MetLife Stadium'}]},
  F:{teams:[{n:'Hollanda',f:'🇳🇱'},{n:'Japonya',f:'🇯🇵'},{n:'İsveç',f:'🇸🇪'},{n:'Tunus',f:'🇹🇳'}],
     fx:[{h:'Hollanda',a:'Japonya',d:'14 Haz',v:'AT&T Stadium'},{h:'İsveç',a:'Tunus',d:'14 Haz',v:'Estadio BBVA'},{h:'Hollanda',a:'İsveç',d:'20 Haz',v:'NRG Stadium'},{h:'Japonya',a:'Tunus',d:'20 Haz',v:'Estadio BBVA'},{h:'Tunus',a:'Hollanda',d:'25 Haz',v:'Estadio Akron'},{h:'İsveç',a:'Japonya',d:'25 Haz',v:'Hard Rock Stadium'}]},
  G:{teams:[{n:'Belçika',f:'🇧🇪'},{n:'Mısır',f:'🇪🇬'},{n:'İran',f:'🇮🇷'},{n:'Yeni Zelanda',f:'🇳🇿'}],
     fx:[{h:'Belçika',a:'Mısır',d:'15 Haz',v:'SoFi Stadium'},{h:'İran',a:'Yeni Zelanda',d:'15 Haz',v:"Levi's Stadium"},{h:'Belçika',a:'Yeni Zelanda',d:'21 Haz',v:'AT&T Stadium'},{h:'Mısır',a:'İran',d:'21 Haz',v:'NRG Stadium'},{h:'Mısır',a:'Yeni Zelanda',d:'26 Haz',v:'Lincoln Financial'},{h:'İran',a:'Belçika',d:'26 Haz',v:'MetLife Stadium'}]},
  H:{teams:[{n:'İspanya',f:'🇪🇸'},{n:'Uruguay',f:'🇺🇾'},{n:'Suudi Arabistan',f:'🇸🇦'},{n:'Yeşil Burun',f:'🇨🇻'}],
     fx:[{h:'İspanya',a:'Suudi Arabistan',d:'15 Haz',v:'Mercedes-Benz Stadium'},{h:'Uruguay',a:'Yeşil Burun',d:'15 Haz',v:'Hard Rock Stadium'},{h:'İspanya',a:'Uruguay',d:'21 Haz',v:'Gillette Stadium'},{h:'Suudi Arabistan',a:'Yeşil Burun',d:'21 Haz',v:'Lumen Field'},{h:'Suudi Arabistan',a:'Uruguay',d:'26 Haz',v:'MetLife Stadium'},{h:'Yeşil Burun',a:'İspanya',d:'26 Haz',v:'Arrowhead Stadium'}]},
  I:{teams:[{n:'Fransa',f:'🇫🇷'},{n:'Senegal',f:'🇸🇳'},{n:'Norveç',f:'🇳🇴'},{n:'Irak',f:'🇮🇶'}],
     fx:[{h:'Fransa',a:'Norveç',d:'16 Haz',v:'Mercedes-Benz Stadium'},{h:'Senegal',a:'Irak',d:'16 Haz',v:'Lincoln Financial'},{h:'Fransa',a:'Irak',d:'22 Haz',v:'Lincoln Financial'},{h:'Norveç',a:'Senegal',d:'22 Haz',v:'Gillette Stadium'},{h:'Irak',a:'Norveç',d:'27 Haz',v:'BC Place'},{h:'Fransa',a:'Senegal',d:'27 Haz',v:'Estadio Azteca'}]},
  J:{teams:[{n:'Arjantin',f:'🇦🇷'},{n:'Avusturya',f:'🇦🇹'},{n:'Cezayir',f:'🇩🇿'},{n:'Ürdün',f:'🇯🇴'}],
     fx:[{h:'Arjantin',a:'Avusturya',d:'16 Haz',v:'AT&T Stadium'},{h:'Cezayir',a:'Ürdün',d:'16 Haz',v:"Levi's Stadium"},{h:'Arjantin',a:'Cezayir',d:'22 Haz',v:'Hard Rock Stadium'},{h:'Avusturya',a:'Ürdün',d:'22 Haz',v:'NRG Stadium'},{h:'Ürdün',a:'Arjantin',d:'27 Haz',v:'Estadio BBVA'},{h:'Cezayir',a:'Avusturya',d:'27 Haz',v:'Estadio Akron'}]},
  K:{teams:[{n:'Portekiz',f:'🇵🇹'},{n:'Kolombiya',f:'🇨🇴'},{n:'Özbekistan',f:'🇺🇿'},{n:'Kongo DR',f:'🇨🇩'}],
     fx:[{h:'Portekiz',a:'Özbekistan',d:'17 Haz',v:'NRG Stadium'},{h:'Kolombiya',a:'Kongo DR',d:'17 Haz',v:'Estadio Akron'},{h:'Portekiz',a:'Kongo DR',d:'23 Haz',v:'Mercedes-Benz Stadium'},{h:'Özbekistan',a:'Kolombiya',d:'23 Haz',v:'Arrowhead Stadium'},{h:'Kongo DR',a:'Özbekistan',d:'28 Haz',v:'Lumen Field'},{h:'Kolombiya',a:'Portekiz',d:'28 Haz',v:'Estadio Azteca'}]},
  L:{teams:[{n:'İngiltere',f:'🏴󠁧󠁢󠁥󠁮󠁧󠁿'},{n:'Hırvatistan',f:'🇭🇷'},{n:'Gana',f:'🇬🇭'},{n:'Panama',f:'🇵🇦'}],
     fx:[{h:'İngiltere',a:'Hırvatistan',d:'17 Haz',v:'AT&T Stadium'},{h:'Gana',a:'Panama',d:'17 Haz',v:'BMO Field'},{h:'İngiltere',a:'Gana',d:'23 Haz',v:'Gillette Stadium'},{h:'Hırvatistan',a:'Panama',d:'23 Haz',v:'BMO Field'},{h:'Panama',a:'İngiltere',d:'28 Haz',v:'Lincoln Financial'},{h:'Hırvatistan',a:'Gana',d:'28 Haz',v:'BC Place'}]},
};

function getFlag(n){for(const g of GROUP_IDS){const t=GROUPS[g].teams.find(x=>x.n===n);if(t)return t.f;}return '🏳️';}

// ── SUPABASE ──────────────────────────────────────────────────
const DB={
  async r(path,opts={}){
    const res=await fetch(SB_URL+path,{...opts,headers:{'apikey':SB_KEY,'Authorization':'Bearer '+SB_KEY,'Content-Type':'application/json',...(opts.headers||{})}});
    const txt=await res.text();
    if(!res.ok){let m='DB hata '+res.status;try{const j=JSON.parse(txt);m=j.message||j.error||m;}catch(e){}throw new Error(m);}
    return txt?JSON.parse(txt):null;
  },
  getUser(u){return this.r(`/rest/v1/users?username=eq.${encodeURIComponent(u)}&select=id,username`);},
  login(u,h){return this.r(`/rest/v1/users?username=eq.${encodeURIComponent(u)}&password_hash=eq.${h}&select=id,username`);},
  create(u,h){return this.r('/rest/v1/users',{method:'POST',headers:{'Prefer':'return=representation'},body:JSON.stringify({username:u,password_hash:h})});},
  async getPred(uid){const d=await this.r(`/rest/v1/predictions?user_id=eq.${uid}&select=*`);return d&&d[0];},
  async savePred(uid,payload){
    const ex=await this.r(`/rest/v1/predictions?user_id=eq.${uid}&select=id`);
    const body=JSON.stringify({user_id:uid,...payload,updated_at:new Date().toISOString()});
    if(ex&&ex.length)return this.r(`/rest/v1/predictions?user_id=eq.${uid}`,{method:'PATCH',headers:{'Prefer':'return=minimal'},body});
    return this.r('/rest/v1/predictions',{method:'POST',headers:{'Prefer':'return=minimal'},body});
  },
  getTeamByName(name){return this.r(`/rest/v1/predictions?team_name=eq.${encodeURIComponent(name)}&select=user_id,team_name,team_pass&limit=1`);},
  getTeamMembers(name){return this.r(`/rest/v1/predictions?team_name=eq.${encodeURIComponent(name)}&select=user_id,group_rankings,bracket,champion`);},
  allUsers(){return this.r('/rest/v1/users?select=id,username');},
  allPreds(){return this.r('/rest/v1/predictions?select=user_id,group_rankings,bracket,champion,team_name,public');},
};

async function hashPw(p){
  const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(p));
  return Array.from(new Uint8Array(b)).map(x=>x.toString(16).padStart(2,'0')).join('');
}

// ── STATE ─────────────────────────────────────────────────────
const S={
  user:null,
  preds:{group_rankings:{},bracket:{},champion:'',best8:[],team_name:'',share_public:true},
  currentStep:0,
  ranking(g){const r=this.preds.group_rankings[g];return(r&&r.length===4)?[...r]:GROUPS[g].teams.map(t=>t.n);},
  setRanking(g,arr){this.preds.group_rankings[g]=arr;},
  isGroupDone(g){const r=this.preds.group_rankings[g];if(!r||r.length<4)return false;return r.some((t,i)=>t!==GROUPS[g].teams[i].n);},
  doneCount(){return GROUP_IDS.filter(g=>this.isGroupDone(g)).length;},
  allThirds(){return GROUP_IDS.map(g=>({gid:g,name:this.ranking(g)[2],flag:getFlag(this.ranking(g)[2])}));},
  toggleBest8(name){
    if(IS_LOCKED)return false;
    const b=this.preds.best8||[];
    const idx=b.indexOf(name);
    if(idx>=0){b.splice(idx,1);}
    else if(b.length<8){b.push(name);}
    else{return false;}
    this.preds.best8=b;
    return true;
  },
  // R32 için: her 3rd slotuna best8 listesinden sırayla takım ata
  r32team(src){
    if(src.t==='3rd'){
      const b=this.preds.best8||[];
      const team=b[src.slot];
      return team?{n:team,f:getFlag(team),tbd:false}:{n:'En İyi 3. #'+(src.slot+1),f:'❓',tbd:true};
    }
    const r=this.ranking(src.g);
    const n=r[src.p-1];
    return n?{n,f:getFlag(n),tbd:false}:{n:'TBD',f:'❓',tbd:true};
  },
  matchTeams(rid,mi){
    if(rid==='r32'){return R32[mi].map(s=>this.r32team(s));}
    const order=['r32','r16','qf','sf','final'];
    const prev=order[order.indexOf(rid)-1];
    const w=this.preds.bracket[prev]||[];
    const mk=(nm)=>nm?{n:nm,f:getFlag(nm),tbd:false}:{n:'TBD',f:'❓',tbd:true};
    return[mk(w[mi*2]),mk(w[mi*2+1])];
  },
  winner(rid,mi){return(this.preds.bracket[rid]||[])[mi]||null;},
  setWinner(rid,mi,team){
    if(!this.preds.bracket[rid])this.preds.bracket[rid]=[];
    this.preds.bracket[rid][mi]=team;
    const order=['r32','r16','qf','sf','final'];
    const idx=order.indexOf(rid);
    for(let i=idx+1;i<order.length;i++)this.preds.bracket[order[i]]=[];
    if(rid==='final')this.preds.champion=team;
  },
};

// ── TEMA ──────────────────────────────────────────────────────
function toggleTheme(){
  const html=document.documentElement;
  const next=html.dataset.theme==='dark'?'light':'dark';
  html.dataset.theme=next;
  document.getElementById('theme-btn').textContent=next==='dark'?'🌙':'☀️';
  localStorage.setItem('wc_theme',next);
}
function loadTheme(){
  const t=localStorage.getItem('wc_theme')||'dark';
  document.documentElement.dataset.theme=t;
  const btn=document.getElementById('theme-btn');
  if(btn)btn.textContent=t==='dark'?'🌙':'☀️';
}

// ── TOAST ─────────────────────────────────────────────────────
function toast(msg,type='ok'){
  const w=document.getElementById('toast-wrap');
  const el=document.createElement('div');
  el.className='toast toast-'+type;
  el.textContent=msg;
  w.appendChild(el);
  setTimeout(()=>el.remove(),3000);
}

function openModal(html){
  document.getElementById('modal-box').innerHTML=html;
  document.getElementById('modal').classList.add('open');
}
function closeModal(e){
  if(!e||e.target===document.getElementById('modal'))
    document.getElementById('modal').classList.remove('open');
}

// ── SPLASH ────────────────────────────────────────────────────
let _sMode='login';

function splashTab(mode){
  _sMode=mode;
  document.getElementById('stab-login').classList.toggle('active',mode==='login');
  document.getElementById('stab-reg').classList.toggle('active',mode==='register');
  renderSplashForm();
}

function renderSplashForm(){
  const f=document.getElementById('splash-form');
  if(_sMode==='login'){
    f.innerHTML=`
      <div class="sfield"><label>Kullanıcı Adı</label><input class="sinp" id="su" autocomplete="username" placeholder="kullaniciadi"/></div>
      <div class="sfield"><label>Şifre</label><div class="pw-row"><input class="sinp" id="sp" type="password" autocomplete="current-password" placeholder="••••••"/><button class="pw-eye" onclick="tpw('sp',this)" type="button">👁</button></div></div>
      <p class="serr" id="serr"></p>
      <button class="sbtn" onclick="doSplashLogin()">Giriş Yap →</button>`;
  }else{
    f.innerHTML=`
      <div class="sfield"><label>Kullanıcı Adı <small>(min 3)</small></label><input class="sinp" id="su" autocomplete="username" placeholder="kullaniciadi"/></div>
      <div class="sfield"><label>Şifre <small>(min 6)</small></label><div class="pw-row"><input class="sinp" id="sp" type="password" autocomplete="new-password" placeholder="••••••"/><button class="pw-eye" onclick="tpw('sp',this)" type="button">👁</button></div></div>
      <div class="sfield"><label>Şifre Tekrar</label><div class="pw-row"><input class="sinp" id="sp2" type="password" autocomplete="new-password" placeholder="••••••"/><button class="pw-eye" onclick="tpw('sp2',this)" type="button">👁</button></div></div>
      <p class="serr" id="serr"></p>
      <button class="sbtn" onclick="doSplashRegister()">Kayıt Ol →</button>`;
  }
}

function tpw(id,btn){
  const el=document.getElementById(id);
  el.type=el.type==='password'?'text':'password';
  btn.textContent=el.type==='password'?'👁':'🙈';
}
function serr(msg){const el=document.getElementById('serr');if(el)el.textContent=msg;}

async function doSplashLogin(){
  const u=document.getElementById('su').value.trim();
  const p=document.getElementById('sp').value;
  serr('');
  if(!u||!p){serr('Tüm alanları doldur.');return;}
  serr('Giriş yapılıyor...');
  try{
    const h=await hashPw(p);
    const res=await DB.login(u,h);
    if(!res||!res.length){serr('Kullanıcı adı veya şifre hatalı.');return;}
    await onLoginSuccess(res[0]);
  }catch(e){serr('Hata: '+e.message);}
}

async function doSplashRegister(){
  const u=document.getElementById('su').value.trim();
  const p=document.getElementById('sp').value;
  const p2=document.getElementById('sp2')?document.getElementById('sp2').value:'';
  serr('');
  if(!u||!p){serr('Tüm alanları doldur.');return;}
  if(u.length<3){serr('Kullanıcı adı en az 3 karakter.');return;}
  if(p.length<6){serr('Şifre en az 6 karakter.');return;}
  if(p2&&p!==p2){serr('Şifreler eşleşmiyor.');return;}
  serr('Kontrol ediliyor...');
  try{
    const ex=await DB.getUser(u);
    if(ex&&ex.length){serr('Bu kullanıcı adı alınmış, başka bir ad seç.');return;}
    const h=await hashPw(p);
    const res=await DB.create(u,h);
    if(!res||!res.length){serr('Kayıt başarısız.');return;}
    await onLoginSuccess(res[0]);
  }catch(e){serr('Hata: '+e.message);}
}

async function onLoginSuccess(user){
  S.user=user;
  sessionStorage.setItem('wc_user',JSON.stringify(user));
  try{
    const p=await DB.getPred(user.id);
    if(p){
      S.preds.group_rankings=p.group_rankings||{};
      S.preds.bracket=p.bracket||{};
      S.preds.champion=p.champion||'';
      S.preds.best8=p.best8||[];
      S.preds.team_name=p.team_name||'';
      S.preds.team_pass=p.team_pass||'';
      S.preds.share_public=p.public!==false;
    }
  }catch(e){console.warn('Tahmin yüklenemedi:',e);}
  document.getElementById('splash-screen').style.display='none';
  document.getElementById('main-app').style.display='block';
  updateHeader();
  showMainMenu();
  toast('Hoş geldin, '+user.username+'! 👋');
}

function doLogout(){
  S.user=null;
  S.preds={group_rankings:{},bracket:{},champion:'',best8:[],team_name:'',share_public:true};
  S.currentStep=0;
  sessionStorage.removeItem('wc_user');
  document.getElementById('main-app').style.display='none';
  document.getElementById('splash-screen').style.display='flex';
  _sMode='login';
  renderSplashForm();
}

// ── ANA MENÜ ──────────────────────────────────────────────────
function showMainMenu(){
  // Alt navbar'ı gizle - menü ekranında gerek yok
  document.querySelector('.bottom-nav').style.display='none';
  document.getElementById('step-bar').style.display='none';
  document.querySelector('.save-fab').style.display='none';

  const hasPred = S.doneCount()>0 || Object.keys(S.preds.bracket).length>0;
  const teamName = S.preds.team_name;

  document.getElementById('main-content').innerHTML=`
    <div class="menu-page">
      <div class="menu-hero">
        <div class="menu-welcome">Hoş geldin,</div>
        <div class="menu-username">${S.user.username}</div>
        ${teamName?`<div class="menu-team-badge">👥 ${teamName}</div>`:''}
      </div>
      <div class="menu-cards">
        <button class="menu-card menu-card-primary" onclick="showPoolSelect()">
          <div class="mc-icon">⚽</div>
          <div class="mc-text">
            <div class="mc-title">Tahmine Başla</div>
            <div class="mc-sub">${hasPred?'Tahminlerini güncelle':'Grupları tahmin et, şampiyonu seç'}</div>
          </div>
          <div class="mc-arrow">›</div>
        </button>
        ${hasPred?`<button class="menu-card" onclick="showPastPreds()">
          <div class="mc-icon">📋</div>
          <div class="mc-text">
            <div class="mc-title">Tahminlerime Göz At</div>
            <div class="mc-sub">Mevcut tahminlerini görüntüle</div>
          </div>
          <div class="mc-arrow">›</div>
        </button>`:''}
        <button class="menu-card" onclick="showNavApp()">
          <div class="mc-icon">🏅</div>
          <div class="mc-text">
            <div class="mc-title">Liderlik & İstatistik</div>
            <div class="mc-sub">Sıralamaları ve istatistikleri gör</div>
          </div>
          <div class="mc-arrow">›</div>
        </button>
      </div>
    </div>`;
}

function showNavApp(){
  document.querySelector('.bottom-nav').style.display='flex';
  document.querySelector('.save-fab').style.display='flex';
  showTab('leaderboard');
}

// ── HAVUZ SEÇİMİ ──────────────────────────────────────────────
function showPoolSelect(){
  document.getElementById('main-content').innerHTML=`
    <div class="pool-page">
      <button class="pool-back" onclick="showMainMenu()">‹ Geri</button>
      <div class="pool-hero">
        <div class="pool-title">Tahminini nereye gönderelim?</div>
        <div class="pool-sub">İstersen hem genel havuza hem de ekibine dahil edebilirsin.</div>
      </div>
      <div class="pool-cards">

        <button class="pool-card pool-general" onclick="startPredict(null,true)">
          <div class="pc-icon">🌍</div>
          <div class="pc-body">
            <div class="pc-title">Genel Havuz</div>
            <div class="pc-desc">Herkesin görebileceği genel liderlik tablosuna katıl.</div>
          </div>
          <div class="pc-check">›</div>
        </button>

        <button class="pool-card pool-create" onclick="showCreateTeamScreen()">
          <div class="pc-icon">🏗️</div>
          <div class="pc-body">
            <div class="pc-title">Ekip Kur</div>
            <div class="pc-desc">Arkadaşlarınla özel bir ekip oluştur. Sadece ekibinle yarışın.</div>
          </div>
          <div class="pc-check">›</div>
        </button>

        <button class="pool-card pool-join" onclick="showJoinTeamScreen()">
          <div class="pc-icon">🤝</div>
          <div class="pc-body">
            <div class="pc-title">Ekibe Dahil Ol</div>
            <div class="pc-desc">Arkadaşlarının kurduğu ekibe ekip adı ve şifreyle katıl.</div>
          </div>
          <div class="pc-check">›</div>
        </button>

      </div>
      ${S.preds.team_name?`<div class="pool-current">Mevcut ekibin: <b>👥 ${S.preds.team_name}</b> — <button class="pool-continue-btn" onclick="startPredict('${S.preds.team_name}',${S.preds.share_public})">Bu ekiple devam et ›</button></div>`:''}
    </div>`;
}

function showCreateTeamScreen(){
  document.getElementById('main-content').innerHTML=`
    <div class="pool-page">
      <button class="pool-back" onclick="showPoolSelect()">‹ Geri</button>
      <div class="pool-hero">
        <div class="pool-title">🏗️ Ekip Kur</div>
        <div class="pool-sub">Yeni bir ekip oluştur. Arkadaşların aynı ad ve şifreyle katılabilir.</div>
      </div>
      <div class="pool-form">
        <div class="sfield"><label>Ekip Adı</label><input class="sinp" id="ct-name" placeholder="Örn: Kuzey Yıldızları"/></div>
        <div class="sfield"><label>Ekip Şifresi</label>
          <div class="pw-row"><input class="sinp" id="ct-pass" type="password" placeholder="Arkadaşlarına vereceğin şifre"/>
          <button class="pw-eye" onclick="tpw('ct-pass',this)" type="button">👁</button></div>
        </div>
        <p class="serr" id="ct-err"></p>
        <div class="pool-public-row">
          <label class="public-toggle-label">
            <input type="checkbox" id="ct-public" checked/>
            <span class="ptl-box"></span>
            <div class="ptl-text">
              <div class="ptl-title">Genel havuza da dahil et</div>
              <div class="ptl-sub">Tahminlerin hem ekipte hem genel tabloda görünsün</div>
            </div>
          </label>
        </div>
        <button class="sbtn" onclick="doCreateTeamAndStart()">Ekibi Kur ve Tahmine Başla →</button>
      </div>
    </div>`;
}

async function doCreateTeamAndStart(){
  const name=document.getElementById('ct-name').value.trim();
  const pass=document.getElementById('ct-pass').value;
  const pub=document.getElementById('ct-public').checked;
  const err=document.getElementById('ct-err');
  if(!name||name.length<2){err.textContent='Ekip adı en az 2 karakter.';return;}
  if(!pass||pass.length<3){err.textContent='Şifre en az 3 karakter.';return;}
  err.textContent='Kontrol ediliyor...';
  try{
    const ex=await DB.getTeamByName(name);
    if(ex&&ex.length){err.textContent='Bu ekip adı alınmış, başka bir ad seç.';return;}
    startPredict(name,pub,pass);
  }catch(e){err.textContent='Hata: '+e.message;}
}

function showJoinTeamScreen(){
  document.getElementById('main-content').innerHTML=`
    <div class="pool-page">
      <button class="pool-back" onclick="showPoolSelect()">‹ Geri</button>
      <div class="pool-hero">
        <div class="pool-title">🤝 Ekibe Dahil Ol</div>
        <div class="pool-sub">Arkadaşından aldığın ekip adı ve şifreyle katıl.</div>
      </div>
      <div class="pool-form">
        <div class="sfield"><label>Ekip Adı</label><input class="sinp" id="jt-name" placeholder="Ekip adını gir"/></div>
        <div class="sfield"><label>Ekip Şifresi</label>
          <div class="pw-row"><input class="sinp" id="jt-pass" type="password" placeholder="Ekip şifresi"/>
          <button class="pw-eye" onclick="tpw('jt-pass',this)" type="button">👁</button></div>
        </div>
        <p class="serr" id="jt-err"></p>
        <div class="pool-public-row">
          <label class="public-toggle-label">
            <input type="checkbox" id="jt-public" checked/>
            <span class="ptl-box"></span>
            <div class="ptl-text">
              <div class="ptl-title">Genel havuza da dahil et</div>
              <div class="ptl-sub">Tahminlerin hem ekipte hem genel tabloda görünsün</div>
            </div>
          </label>
        </div>
        <button class="sbtn" onclick="doJoinTeamAndStart()">Ekibe Katıl ve Tahmine Başla →</button>
      </div>
    </div>`;
}

async function doJoinTeamAndStart(){
  const name=document.getElementById('jt-name').value.trim();
  const pass=document.getElementById('jt-pass').value;
  const pub=document.getElementById('jt-public').checked;
  const err=document.getElementById('jt-err');
  if(!name){err.textContent='Ekip adı gir.';return;}
  if(!pass){err.textContent='Şifre gir.';return;}
  err.textContent='Kontrol ediliyor...';
  try{
    const ex=await DB.getTeamByName(name);
    if(!ex||!ex.length){err.textContent='Bu isimde ekip bulunamadı.';return;}
    // Şifre kontrolü
    const teamPass=ex[0].team_pass||'';
    if(teamPass&&teamPass!==pass){err.textContent='Ekip şifresi yanlış.';return;}
    startPredict(name,pub,pass);
  }catch(e){err.textContent='Hata: '+e.message;}
}

function startPredict(teamName, isPublic, teamPass){
  S.preds.team_name = teamName||'';
  S.preds.team_pass = teamPass||S.preds.team_pass||'';
  S.preds.share_public = isPublic!==false;
  S.currentStep=0;
  document.querySelector('.bottom-nav').style.display='flex';
  document.getElementById('step-bar').style.display='block';
  document.querySelector('.save-fab').style.display='flex';
  // Aktif tahmin sekmesi
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.toggle('active',b.dataset.tab==='predict'));
  renderCurrentStep();
}

// ── GEÇMİŞ TAHMİNLER ─────────────────────────────────────────
function showPastPreds(){
  document.getElementById('main-content').innerHTML=`
    <div class="page">
      <button class="pool-back" onclick="showMainMenu()">‹ Ana Menü</button>
      <div class="sum-title" style="margin-top:12px">📋 Mevcut Tahminlerim</div>
      <p class="sum-sub">${S.preds.team_name?`Ekip: 👥 ${S.preds.team_name}`:'Genel havuz'} · ${S.preds.share_public?'Herkese açık':'Sadece ekip'}</p>
      <div class="sum-table" style="margin-top:12px">
        ${GROUP_IDS.map(gid=>{
          const r=S.ranking(gid);
          const done=S.isGroupDone(gid);
          return`<div class="sum-row">
            <div class="sum-gid">Grup ${gid}</div>
            <div class="sum-teams">
              ${done
                ?`<span class="stag pass">${getFlag(r[0])} ${r[0]}</span>
                  <span class="stag pass">${getFlag(r[1])} ${r[1]}</span>
                  <span class="stag third">${getFlag(r[2])} ${r[2]}</span>`
                :`<span class="stag" style="background:var(--bg3);color:var(--text3)">Henüz tahmin yok</span>`}
            </div>
          </div>`;
        }).join('')}
      </div>
      ${S.preds.champion?`<div class="sum-row" style="background:var(--gold-bg);border:1px solid var(--gold-bd);border-radius:12px;margin-top:10px;padding:12px 14px">
        <span style="font-size:13px;font-weight:700;color:var(--gold)">🏆 Şampiyon Tahminin:</span>
        <span style="margin-left:8px;font-weight:700">${getFlag(S.preds.champion)} ${S.preds.champion}</span>
      </div>`:''}
      <div class="page-actions">
        <button class="btn-primary btn-next" onclick="showPoolSelect()">Tahminleri Güncelle →</button>
      </div>
    </div>`;
}
function updateHeader(){
  const lock=document.getElementById('hdr-lock');
  if(lock){
    const now=new Date();
    if(now>=WC_KICKOFF){lock.textContent='⚽ Turnuva başladı!';}
    else{
      const d=WC_KICKOFF-now;
      const dd=Math.floor(d/86400000),hh=Math.floor((d%86400000)/3600000),mm=Math.floor((d%3600000)/60000);
      lock.textContent=`⏳ ${dd}g ${hh}s ${mm}dk`;
    }
  }
  const ua=document.getElementById('hdr-user-area');
  if(ua&&S.user){
    const teamLabel=S.preds.team_name?`👥 ${S.preds.team_name}`:'👥 Ekip';
    ua.innerHTML=`<div class="hdr-chip">
      <div class="hdr-av">${S.user.username[0].toUpperCase()}</div>
      <span class="hdr-uname">${S.user.username}</span>
      <button class="hdr-team-btn" onclick="showTeamModal()" title="Ekip">${teamLabel}</button>
      <button class="hdr-out" onclick="doLogout()">Çıkış</button>
    </div>`;
  }
}

// ── STEP BAR ──────────────────────────────────────────────────
function renderStepBar(){
  const bar=document.getElementById('step-bar');
  const step=STEPS[S.currentStep];
  let lbl='';
  if(step.type==='group')lbl=`Grup ${step.id}`;
  else if(step.type==='summary')lbl='Grup Özeti';
  else if(step.type==='best8')lbl='En İyi 8 Üçüncü';
  else lbl=step.label;
  const pct=Math.round((S.currentStep/(STEPS.length-1))*100);
  bar.innerHTML=`
    <div class="sb-wrap">
      <button class="sb-back${S.currentStep===0?' ghost':''}" onclick="stepNav(-1)">‹</button>
      <div class="sb-center">
        <div class="sb-label">${lbl}</div>
        <div class="sb-prog"><div class="sb-prog-f" style="width:${pct}%"></div></div>
        <div class="sb-info">Adım ${S.currentStep+1} / ${STEPS.length}</div>
      </div>
      <div style="width:36px"></div>
    </div>`;
}

function stepNav(dir){
  const next=S.currentStep+dir;
  if(next<0||next>=STEPS.length)return;
  S.currentStep=next;
  renderCurrentStep();
}

function renderCurrentStep(){
  renderStepBar();
  const step=STEPS[S.currentStep];
  if(step.type==='group')        renderGroup(step.id);
  else if(step.type==='summary') renderSummary();
  else if(step.type==='best8')   renderBest8();
  else                           renderElim(step.id,step.label,step.n);
}

// ── GRUP ──────────────────────────────────────────────────────
function renderGroup(gid){
  const mc=document.getElementById('main-content');
  const ranking=S.ranking(gid);
  const locked=IS_LOCKED;
  const gIdx=GROUP_IDS.indexOf(gid);
  const isLast=gIdx===GROUP_IDS.length-1;
  mc.innerHTML=`
    <div class="page">
      <div class="grp-topbar">
        <div class="grp-badge">Grup ${gid}</div>
        <button class="btn-fix" onclick="showFixture('${gid}')">📅 Fikstür</button>
      </div>
      <p class="grp-hint">${locked?'🔒 Tahminler kilitlendi':'↕ Sürükle-bırak ile tahmin sıranı belirle'}</p>
      <div class="rank-table">
        <div id="rlist-${gid}">${ranking.map((n,i)=>rowHtml(n,i,gid,locked)).join('')}</div>
      </div>
      <div class="page-actions">
        <button class="btn-primary btn-next" onclick="stepNav(1)">
          ${isLast?'Özete Git →':'Grup '+GROUP_IDS[gIdx+1]+' →'}
        </button>
      </div>
    </div>`;
  if(!locked)initDrag(gid);
}

function rowHtml(name,i,gid,locked){
  const f=getFlag(name);
  const badges=['b-pass','b-pass','b-third','b-out'];
  const labels=['Gruptan Geçer ✓','Gruptan Geçer ✓','En İyi 3. Adayı','Elenir ✗'];
  const descs=['1. sıra — Son 32\'ye gider','2. sıra — Son 32\'ye gider','3. sıra — En iyi 8 havuzuna girer','4. sıra — turnuva bitti'];
  return `<div class="rank-row pos-${i+1}" draggable="${!locked}" data-idx="${i}" data-name="${name}"
    ${!locked?`ondragstart="ds(event,'${gid}',${i})" ondragover="dov(event)" ondrop="dp(event,'${gid}')" ondragend="de()"
    ontouchstart="ts(event,'${gid}')" ontouchmove="tm(event)" ontouchend="te(event,'${gid}')" style="touch-action:none"`:''}
    >
    <div class="rr-num">${i+1}</div>
    <div class="rr-team">
      <span class="rr-flag">${f}</span>
      <div class="rr-info">
        <div class="rr-name">${name}</div>
        <div class="rr-desc">${descs[i]}</div>
      </div>
    </div>
    <div class="rr-badge ${badges[i]}">${labels[i]}</div>
    <div class="rr-drag">${locked?'':'⠿'}</div>
  </div>`;
}

// drag & drop
let _dg=null,_di=null,_tr=null,_tg=null;
function initDrag(){}
function ds(e,gid,idx){_dg=gid;_di=idx;e.currentTarget.classList.add('dragging');e.dataTransfer.effectAllowed='move';}
function dov(e){e.preventDefault();const t=e.target.closest('.rank-row');if(t){document.querySelectorAll('.rank-row').forEach(r=>r.classList.remove('drag-over'));t.classList.add('drag-over');}}
function de(){document.querySelectorAll('.rank-row').forEach(r=>r.classList.remove('dragging','drag-over'));}
function dp(e,gid){
  e.preventDefault();de();
  const t=e.target.closest('.rank-row');
  if(!t||_dg!==gid)return;
  const ti=parseInt(t.dataset.idx);
  if(_di===ti)return;
  const r=S.ranking(gid);const[m]=r.splice(_di,1);r.splice(ti,0,m);
  S.setRanking(gid,r);renderGroup(gid);
}
function ts(e,gid){_tr=e.currentTarget;_tg=gid;_tr.classList.add('dragging');}
function tm(e){
  if(!_tr)return;e.preventDefault();
  document.querySelectorAll('.rank-row').forEach(r=>r.classList.remove('drag-over'));
  const el=document.elementFromPoint(e.touches[0].clientX,e.touches[0].clientY);
  const t=el?.closest('.rank-row');
  if(t&&t!==_tr)t.classList.add('drag-over');
}
function te(e,gid){
  if(!_tr)return;
  const rows=Array.from(_tr.parentNode.querySelectorAll('.rank-row'));
  const tgt=rows.find(r=>r.classList.contains('drag-over'));
  rows.forEach(r=>r.classList.remove('dragging','drag-over'));
  if(tgt){
    const fi=parseInt(_tr.dataset.idx),ti=parseInt(tgt.dataset.idx);
    if(fi!==ti){const r=S.ranking(gid);const[m]=r.splice(fi,1);r.splice(ti,0,m);S.setRanking(gid,r);}
  }
  _tr=null;_tg=null;
  renderGroup(gid);
}

// ── FİKSTÜR ──────────────────────────────────────────────────
function showFixture(gid){
  const g=GROUPS[gid];
  openModal(`
    <div class="modal-head"><span>⚽ Grup ${gid} Fikstürü</span><button class="modal-close" onclick="closeModal()">✕</button></div>
    <div class="modal-body">
      ${g.fx.map(f=>`
        <div class="fx-match">
          <div class="fx-row">
            <div class="fx-t"><span class="fx-flag">${getFlag(f.h)}</span><span>${f.h}</span></div>
            <div class="fx-vs">VS</div>
            <div class="fx-t r"><span>${f.a}</span><span class="fx-flag">${getFlag(f.a)}</span></div>
          </div>
          <div class="fx-info">📅 ${f.d} &nbsp;·&nbsp; 🏟 ${f.v}</div>
        </div>`).join('')}
    </div>`);
}

// ── ÖZET ──────────────────────────────────────────────────────
function renderSummary(){
  const mc=document.getElementById('main-content');
  const isPublic=S.preds.share_public!==false;
  mc.innerHTML=`
    <div class="page">
      <div class="sum-title">📋 Grup Özeti</div>
      <p class="sum-sub">${S.doneCount()}/12 grup özelleştirildi</p>
      <div class="sum-table">
        ${GROUP_IDS.map(gid=>{
          const r=S.ranking(gid);
          return`<div class="sum-row">
            <div class="sum-gid">Grup ${gid}</div>
            <div class="sum-teams">
              <span class="stag pass">${getFlag(r[0])} ${r[0]}</span>
              <span class="stag pass">${getFlag(r[1])} ${r[1]}</span>
              <span class="stag third">${getFlag(r[2])} ${r[2]}</span>
            </div>
          </div>`;
        }).join('')}
      </div>
      <div class="public-toggle-card">
        <label class="public-toggle-label">
          <input type="checkbox" id="public-chk" ${isPublic?'checked':''} onchange="S.preds.share_public=this.checked"/>
          <span class="ptl-box"></span>
          <div class="ptl-text">
            <div class="ptl-title">Genel havuza dahil et</div>
            <div class="ptl-sub">${S.preds.team_name?`İşaret kaldırılırsa tahmin sadece <b>${S.preds.team_name}</b> ekibinde görünür`:'Ekibe katılmadan genel liderlik tablosunda görünürsün'}</div>
          </div>
        </label>
      </div>
      <div class="page-actions">
        <button class="btn-primary btn-next" onclick="stepNav(1)">En İyi 8 Üçüncüyü Seç →</button>
      </div>
    </div>`;
}

// ── EN İYİ 8 ÜÇÜNCÜ ──────────────────────────────────────────
function renderBest8(){
  const mc=document.getElementById('main-content');
  const thirds=S.allThirds();
  const sel=S.preds.best8||[];
  const locked=IS_LOCKED;
  mc.innerHTML=`
    <div class="page">
      <div class="best8-header">
        <div class="best8-title">🥉 En İyi 8 Üçüncü</div>
        <div class="best8-sub">12 gruptan 3. sırayı bitiren takımların en iyisi 8 tanesi Son 32'ye katılır. Hangilerinin geçeceğini tahmin et.</div>
      </div>
      <div class="best8-counter">
        <div class="b8c-bar"><div class="b8c-fill" style="width:${Math.round(sel.length/8*100)}%"></div></div>
        <span class="b8c-txt"><b>${sel.length}</b>/8 seçildi</span>
      </div>
      ${locked?`<div class="locked-banner">🔒 Tahminler kilitlendi.</div>`:''}
      <div class="best8-list">
        ${thirds.map(t=>`
          <div class="b8-row${sel.includes(t.name)?' b8-sel':''}" ${!locked?`onclick="toggleBest8('${t.name.replace(/'/g,"\\'")}')"`:''}">
            <div class="b8-left">
              <span class="b8-flag">${t.flag}</span>
              <div class="b8-info">
                <div class="b8-name">${t.name}</div>
                <div class="b8-group">Grup ${t.gid} — 3. sıra</div>
              </div>
            </div>
            <div class="b8-check">${sel.includes(t.name)?'✓':''}</div>
          </div>`).join('')}
      </div>
      <div class="page-actions">
        ${sel.length===8||locked
          ?`<button class="btn-primary btn-next" onclick="stepNav(1)">Son 32'ye Geç →</button>`
          :`<p class="pick-warn">⚠️ 8 takım seçmelisin (${8-sel.length} kaldı)</p>`}
      </div>
    </div>`;
}

function toggleBest8(name){
  if(IS_LOCKED)return;
  if(!S.toggleBest8(name)){toast('Zaten 8 takım seçtiniz!','err');return;}
  renderBest8();
}

// ── ELİMİNASYON ───────────────────────────────────────────────
function renderElim(rid,label,n){
  const mc=document.getElementById('main-content');
  const locked=IS_LOCKED;
  const matches=Array.from({length:n},(_,i)=>{
    const[t1,t2]=S.matchTeams(rid,i);
    return{i,t1,t2,w:S.winner(rid,i)};
  });
  const allDone=matches.every(m=>m.w);
  const isLast=S.currentStep===STEPS.length-1;
  mc.innerHTML=`
    <div class="page">
      <div class="elim-title">${label}</div>
      <div class="elim-sub">${n} maç · ${rid==='final'?'Şampiyonu belirle':'Kazananı seçmek için tıkla'}</div>
      ${locked?`<div class="locked-banner">🔒 8 Haziran'dan itibaren tahminler kilitlendi.</div>`:''}
      <div class="matches-list">
        ${matches.map(m=>matchHtml(m,rid,locked)).join('')}
      </div>
      <div class="page-actions">
        ${allDone||locked
          ?`${isLast?`
            <div class="final-public-toggle">
              <label class="public-toggle-label">
                <input type="checkbox" id="final-public-chk" ${S.preds.share_public?'checked':''} onchange="S.preds.share_public=this.checked"/>
                <span class="ptl-box"></span>
                <div class="ptl-text">
                  <div class="ptl-title">Genel havuza gönderilsin</div>
                  <div class="ptl-sub">${S.preds.team_name?`Ekibin <b>${S.preds.team_name}</b>'e ek olarak genel tabloya da eklensin`:'Herkese açık genel liderlik tablosuna eklensin'}</div>
                </div>
              </label>
            </div>`:''
          }
          <button class="btn-primary btn-next" onclick="${isLast?'saveAll()':'stepNav(1)'}">
            ${isLast?'💾 Tahminleri Kaydet':'Sonraki Tur →'}
          </button>`
          :`<p class="pick-warn">⚠️ Devam etmek için tüm kazananları seç</p>`}
      </div>
    </div>`;
}

function matchHtml(m,rid,locked){
  const t1=m.t1||{n:'TBD',f:'❓',tbd:true};
  const t2=m.t2||{n:'TBD',f:'❓',tbd:true};
  const tm=(t,isW)=>`<div class="match-team${isW?' winner':''}${t.tbd?' tbd':''}${locked?' no-pick':''}"
    ${!t.tbd&&!locked?`onclick="pick('${rid}',${m.i},'${t.n.replace(/'/g,"\\'")}')"`:''}">
    <span class="mt-flag">${t.f}</span>
    <span class="mt-name">${t.n}</span>
    ${isW?'<span class="mt-check">✓</span>':''}
  </div>`;
  return`<div class="match-card${m.w?' won':''}">
    <div class="match-num">Maç ${m.i+1}${rid==='final'?' · 🏆 Şampiyonu Belirle':''}</div>
    <div class="match-teams">
      ${tm(t1,m.w===t1.n)}
      <div class="match-vs">VS</div>
      ${tm(t2,m.w===t2.n)}
    </div>
  </div>`;
}

function pick(rid,mi,team){
  if(IS_LOCKED)return;
  S.setWinner(rid,mi,team);
  if(rid==='final')toast('🏆 Şampiyon: '+team+' '+getFlag(team),'ok');
  renderElim(STEPS[S.currentStep].id,STEPS[S.currentStep].label,STEPS[S.currentStep].n);
}

// ── EKİP SİSTEMİ ──────────────────────────────────────────────
function showTeamModal(){
  const current=S.preds.team_name;
  openModal(`
    <div class="modal-head"><span>👥 Ekip</span><button class="modal-close" onclick="closeModal()">✕</button></div>
    <div class="modal-body">
      ${current?`<div class="team-current">Mevcut ekibin: <b>${current}</b></div>`:''}
      <div class="team-opts">
        <button class="team-opt-btn" onclick="showCreateTeam()">➕ Yeni Ekip Oluştur</button>
        <button class="team-opt-btn" onclick="showJoinTeam()">🔗 Ekibe Katıl</button>
        ${current?`<button class="team-opt-btn team-opt-leave" onclick="doLeaveTeam()">🚪 Ekipten Ayrıl</button>`:''}
      </div>
    </div>`);
}

function showCreateTeam(){
  document.getElementById('modal-box').innerHTML=`
    <div class="modal-head"><span>➕ Ekip Oluştur</span><button class="modal-close" onclick="closeModal()">✕</button></div>
    <div class="modal-body">
      <p class="team-hint">Yeni bir ekip adı gir. Aynı adı kullanan herkes aynı ekipte görünür.</p>
      <div class="sfield"><label>Ekip Adı</label><input class="sinp" id="team-name-inp" placeholder="Örn: Kuzey Yıldızları"/></div>
      <p class="serr" id="team-err"></p>
      <button class="sbtn" onclick="doCreateTeam()">Oluştur →</button>
    </div>`;
}

async function doCreateTeam(){
  const name=document.getElementById('team-name-inp').value.trim();
  const err=document.getElementById('team-err');
  if(!name||name.length<2){err.textContent='En az 2 karakter gir.';return;}
  err.textContent='Kontrol ediliyor...';
  try{
    const ex=await DB.getTeam(name);
    if(ex&&ex.length&&ex[0].user_id!==S.user.id){
      err.textContent='Bu ekip adı alınmış, başka bir ad seç.';return;
    }
    S.preds.team_name=name;
    await saveAll();
    closeModal();
    toast('Ekip oluşturuldu: '+name+' 🎉');
  }catch(e){err.textContent='Hata: '+e.message;}
}

function showJoinTeam(){
  document.getElementById('modal-box').innerHTML=`
    <div class="modal-head"><span>🔗 Ekibe Katıl</span><button class="modal-close" onclick="closeModal()">✕</button></div>
    <div class="modal-body">
      <p class="team-hint">Arkadaşlarının ekip adını gir ve katıl.</p>
      <div class="sfield"><label>Ekip Adı</label><input class="sinp" id="team-name-inp" placeholder="Ekip adını gir"/></div>
      <p class="serr" id="team-err"></p>
      <button class="sbtn" onclick="doJoinTeam()">Katıl →</button>
    </div>`;
}

async function doJoinTeam(){
  const name=document.getElementById('team-name-inp').value.trim();
  const err=document.getElementById('team-err');
  if(!name){err.textContent='Ekip adı gir.';return;}
  S.preds.team_name=name;
  await saveAll();
  closeModal();
  toast('Ekibe katıldın: '+name+' 🎉');
}

async function doLeaveTeam(){
  S.preds.team_name='';
  await saveAll();
  closeModal();
  toast('Ekipten ayrıldın.');
}

// ── KAYDET ────────────────────────────────────────────────────
async function saveAll(){
  if(!S.user){toast('Önce giriş yapmalısın!','err');return;}
  if(IS_LOCKED){toast('Tahminler kilitlendi.','err');return;}
  try{
    await DB.savePred(S.user.id,{
      group_rankings:S.preds.group_rankings,
      bracket:S.preds.bracket,
      champion:S.preds.champion,
      best8:S.preds.best8||[],
      team_name:S.preds.team_name||null,
      team_pass:S.preds.team_pass||null,
      public:S.preds.share_public,
    });
    toast('Tahminler kaydedildi ✓');
  }catch(e){toast('Hata: '+e.message,'err');}
}

// ── SEKMELER ──────────────────────────────────────────────────
function showTab(tab){
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));
  const bar=document.getElementById('step-bar');
  if(tab==='predict'){
    bar.style.display='block';
    renderCurrentStep();
  }else{
    bar.style.display='none';
    if(tab==='leaderboard')renderLeaderboard();
    else renderStats();
  }
}

// ── LİDERLİK ─────────────────────────────────────────────────
function renderLeaderboard(){
  document.getElementById('main-content').innerHTML=`<div class="page"><div class="lb-loading">⏳ Yükleniyor...</div></div>`;
  loadLb();
}
async function loadLb(){
  try{
    const[users,preds]=await Promise.all([DB.allUsers(),DB.allPreds()]);
    const pm={};(preds||[]).forEach(p=>pm[p.user_id]=p);
    const rows=(users||[]).map(u=>{
      const p=pm[u.id]||{};
      const r=p.group_rankings||{};
      const done=GROUP_IDS.filter(g=>{const rk=r[g];return rk&&rk.length===4&&rk.some((t,i)=>t!==GROUPS[g].teams[i].n);}).length;
      return{id:u.id,name:u.username,pts:done*2,pct:Math.round(done/12*100)};
    }).sort((a,b)=>b.pts-a.pts||b.pct-a.pct);
    document.getElementById('main-content').innerHTML=`<div class="page">
      <div class="page-title">🏅 Liderlik Tablosu</div>
      <div class="pts-key">Grup geçişi <b>2p</b> · Son 32 <b>5p</b> · Çeyrek <b>7p</b> · Yarı <b>10p</b> · Final <b>15p</b> · Şampiyon <b>20p</b></div>
      <div class="lb-table">
        <div class="lb-hdr-row"><div>#</div><div>Kullanıcı</div><div style="text-align:right">Puan</div><div style="text-align:right">Tamaml.</div></div>
        ${rows.length===0?'<div class="lb-empty">Henüz tahmin yapan yok.</div>':rows.map((u,i)=>{
          const m=i===0?'🥇':i===1?'🥈':i===2?'🥉':i+1;
          const me=S.user&&u.id===S.user.id;
          return`<div class="lb-row${me?' me':''}">
            <div class="lb-rank">${m}</div>
            <div class="lb-name">${u.name}${me?'<span class="me-tag">★</span>':''}</div>
            <div class="lb-pts" style="text-align:right">${u.pts}</div>
            <div class="lb-pct" style="text-align:right">%${u.pct}</div>
          </div>`;}).join('')}
      </div>
    </div>`;
  }catch(e){document.querySelector('.lb-loading').textContent='Yüklenemedi: '+e.message;}
}

// ── İSTATİSTİK ────────────────────────────────────────────────
function renderStats(){
  document.getElementById('main-content').innerHTML=`<div class="page"><div class="lb-loading">⏳ Yükleniyor...</div></div>`;
  loadStats();
}
async function loadStats(){
  try{
    const[users,preds]=await Promise.all([DB.allUsers(),DB.allPreds()]);
    const total=users?.length||0,withP=preds?.length||0,withC=(preds||[]).filter(p=>p.champion).length;
    const cc={};(preds||[]).forEach(p=>{if(p.champion)cc[p.champion]=(cc[p.champion]||0)+1;});
    const top=Object.entries(cc).sort((a,b)=>b[1]-a[1]).slice(0,8);
    const max=top[0]?.[1]||1;
    document.querySelector('.lb-loading').parentElement.innerHTML=`
      <div class="page-title">📊 İstatistikler</div>
      <div class="stat-cards">
        <div class="stat-card"><div class="sc-val">${total}</div><div class="sc-lbl">Kullanıcı</div></div>
        <div class="stat-card"><div class="sc-val">${withP}</div><div class="sc-lbl">Tahmin Yapan</div></div>
        <div class="stat-card"><div class="sc-val">${withC}</div><div class="sc-lbl">Şampiyon Seçen</div></div>
      </div>
      <div class="stats-sub">En Çok Seçilen Şampiyonlar</div>
      <div class="bar-list">${top.length===0?'<p style="color:var(--text3);font-size:13px">Henüz veri yok.</p>':top.map(([n,c])=>`
        <div class="bar-row">
          <div class="bar-lbl">${getFlag(n)} ${n}</div>
          <div class="bar-track"><div class="bar-fill" style="width:${Math.round(c/max*100)}%"></div></div>
          <div class="bar-cnt">${c}</div>
        </div>`).join('')}
      </div>`;
  }catch(e){console.error(e);}
}

// ── BAŞLATMA ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded',async()=>{
  loadTheme();
  setInterval(updateHeader,60000);
  document.getElementById('modal').addEventListener('click',e=>{
    if(e.target===document.getElementById('modal'))closeModal();
  });
  const saved=sessionStorage.getItem('wc_user');
  if(saved){
    try{
      const user=JSON.parse(saved);
      S.user=user;
      const p=await DB.getPred(user.id);
      if(p){S.preds.group_rankings=p.group_rankings||{};S.preds.bracket=p.bracket||{};S.preds.champion=p.champion||'';S.preds.best8=p.best8||[];}
      document.getElementById('splash-screen').style.display='none';
      document.getElementById('main-app').style.display='block';
      updateHeader();
      showMainMenu();
      return;
    }catch(e){sessionStorage.removeItem('wc_user');}
  }
  renderSplashForm();
});
