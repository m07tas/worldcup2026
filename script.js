/* ============================================================
   FIFA 2026 TAHMİN PLATFORMU — script.js  (v12 - clean)
   ============================================================ */

const LOCK_DATE  = new Date('2026-06-08T00:00:00');
const IS_LOCKED  = new Date() >= LOCK_DATE;
const WC_KICKOFF = new Date('2026-06-11T19:00:00Z');
const SB_URL = 'https://jkfhqcygjvuijkjamgyn.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprZmhxY3lnanZ1aWpramFtZ3luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0MzAwNjMsImV4cCI6MjA5NDAwNjA2M30.6_6QZBGdYiOKpyIGbfuzKfTXsyTifyUSTBHoW5fWmJ8';

const GRP = ['A','B','C','D','E','F','G','H','I','J','K','L'];
const ELIM = [
  {id:'r32',label:'Son 32',n:16},
  {id:'r16',label:'Son 16',n:8},
  {id:'qf', label:'Çeyrek Final',n:4},
  {id:'sf', label:'Yarı Final',n:2},
  {id:'final',label:'Final',n:1},
];
const STEPS = [
  ...GRP.map(id=>({type:'group',id})),
  {type:'summary'},{type:'best8'},
  ...ELIM.map(r=>({type:'elim',...r})),
];
const R32 = [
  [{g:'A',p:2},{g:'B',p:2}],[{g:'C',p:1},{g:'F',p:2}],
  [{g:'E',p:1},{t:'3',slot:0}],[{g:'F',p:1},{g:'C',p:2}],
  [{g:'E',p:2},{g:'I',p:2}],[{g:'I',p:1},{t:'3',slot:1}],
  [{g:'A',p:1},{t:'3',slot:2}],[{g:'L',p:1},{t:'3',slot:3}],
  [{g:'G',p:1},{t:'3',slot:4}],[{g:'D',p:1},{t:'3',slot:5}],
  [{g:'H',p:1},{g:'J',p:2}],[{g:'K',p:2},{g:'L',p:2}],
  [{g:'B',p:1},{t:'3',slot:6}],[{g:'D',p:2},{g:'G',p:2}],
  [{g:'J',p:1},{g:'H',p:2}],[{g:'K',p:1},{t:'3',slot:7}],
];
const GROUPS={A:{t:[{n:'Meksika',f:'🇲🇽'},{n:'Güney Kore',f:'🇰🇷'},{n:'Güney Afrika',f:'🇿🇦'},{n:'Çekya',f:'🇨🇿'}],fx:[{h:'Meksika',a:'Güney Afrika',d:'11 Haz',v:'Estadio Azteca'},{h:'Güney Kore',a:'Çekya',d:'11 Haz',v:'Estadio Akron'},{h:'Çekya',a:'Güney Afrika',d:'18 Haz',v:'Mercedes-Benz Stadium'},{h:'Meksika',a:'Güney Kore',d:'18 Haz',v:'Estadio Akron'},{h:'Çekya',a:'Meksika',d:'24 Haz',v:'Estadio Azteca'},{h:'Güney Afrika',a:'Güney Kore',d:'24 Haz',v:'Estadio BBVA'}]},B:{t:[{n:'Kanada',f:'🇨🇦'},{n:'Bosna-Hersek',f:'🇧🇦'},{n:'Katar',f:'🇶🇦'},{n:'İsviçre',f:'🇨🇭'}],fx:[{h:'Kanada',a:'Bosna-Hersek',d:'12 Haz',v:'BMO Field'},{h:'Katar',a:'İsviçre',d:'13 Haz',v:'Lumen Field'},{h:'Bosna-Hersek',a:'İsviçre',d:'19 Haz',v:'Hard Rock Stadium'},{h:'Kanada',a:'Katar',d:'19 Haz',v:'BC Place'},{h:'İsviçre',a:'Kanada',d:'25 Haz',v:'BC Place'},{h:'Bosna-Hersek',a:'Katar',d:'25 Haz',v:"Levi's Stadium"}]},C:{t:[{n:'Brezilya',f:'🇧🇷'},{n:'Fas',f:'🇲🇦'},{n:'İskoçya',f:'🏴󠁧󠁢󠁳󠁣󠁴󠁿'},{n:'Haiti',f:'🇭🇹'}],fx:[{h:'Brezilya',a:'Fas',d:'12 Haz',v:'MetLife Stadium'},{h:'İskoçya',a:'Haiti',d:'12 Haz',v:'SoFi Stadium'},{h:'Fas',a:'Haiti',d:'18 Haz',v:'AT&T Stadium'},{h:'Brezilya',a:'İskoçya',d:'18 Haz',v:'Gillette Stadium'},{h:'Fas',a:'İskoçya',d:'24 Haz',v:'Gillette Stadium'},{h:'Haiti',a:'Brezilya',d:'24 Haz',v:'Hard Rock Stadium'}]},D:{t:[{n:'ABD',f:'🇺🇸'},{n:'Paraguay',f:'🇵🇾'},{n:'Avustralya',f:'🇦🇺'},{n:'Türkiye',f:'🇹🇷'}],fx:[{h:'ABD',a:'Paraguay',d:'12 Haz',v:'SoFi Stadium'},{h:'Avustralya',a:'Türkiye',d:'13 Haz',v:'Lumen Field'},{h:'Paraguay',a:'Türkiye',d:'19 Haz',v:'Arrowhead Stadium'},{h:'ABD',a:'Avustralya',d:'19 Haz',v:'SoFi Stadium'},{h:'Türkiye',a:'ABD',d:'25 Haz',v:"Levi's Stadium"},{h:'Paraguay',a:'Avustralya',d:'25 Haz',v:'Lincoln Financial'}]},E:{t:[{n:'Almanya',f:'🇩🇪'},{n:'Fildişi Sahili',f:'🇨🇮'},{n:'Ekvador',f:'🇪🇨'},{n:'Curaçao',f:'🇨🇼'}],fx:[{h:'Almanya',a:'Curaçao',d:'14 Haz',v:'NRG Stadium'},{h:'Fildişi Sahili',a:'Ekvador',d:'14 Haz',v:'Lincoln Financial'},{h:'Almanya',a:'Fildişi Sahili',d:'20 Haz',v:'BMO Field'},{h:'Ekvador',a:'Curaçao',d:'20 Haz',v:'Arrowhead Stadium'},{h:'Curaçao',a:'Fildişi Sahili',d:'25 Haz',v:'Lincoln Financial'},{h:'Ekvador',a:'Almanya',d:'25 Haz',v:'MetLife Stadium'}]},F:{t:[{n:'Hollanda',f:'🇳🇱'},{n:'Japonya',f:'🇯🇵'},{n:'İsveç',f:'🇸🇪'},{n:'Tunus',f:'🇹🇳'}],fx:[{h:'Hollanda',a:'Japonya',d:'14 Haz',v:'AT&T Stadium'},{h:'İsveç',a:'Tunus',d:'14 Haz',v:'Estadio BBVA'},{h:'Hollanda',a:'İsveç',d:'20 Haz',v:'NRG Stadium'},{h:'Japonya',a:'Tunus',d:'20 Haz',v:'Estadio BBVA'},{h:'Tunus',a:'Hollanda',d:'25 Haz',v:'Estadio Akron'},{h:'İsveç',a:'Japonya',d:'25 Haz',v:'Hard Rock Stadium'}]},G:{t:[{n:'Belçika',f:'🇧🇪'},{n:'Mısır',f:'🇪🇬'},{n:'İran',f:'🇮🇷'},{n:'Yeni Zelanda',f:'🇳🇿'}],fx:[{h:'Belçika',a:'Mısır',d:'15 Haz',v:'SoFi Stadium'},{h:'İran',a:'Yeni Zelanda',d:'15 Haz',v:"Levi's Stadium"},{h:'Belçika',a:'Yeni Zelanda',d:'21 Haz',v:'AT&T Stadium'},{h:'Mısır',a:'İran',d:'21 Haz',v:'NRG Stadium'},{h:'Mısır',a:'Yeni Zelanda',d:'26 Haz',v:'Lincoln Financial'},{h:'İran',a:'Belçika',d:'26 Haz',v:'MetLife Stadium'}]},H:{t:[{n:'İspanya',f:'🇪🇸'},{n:'Uruguay',f:'🇺🇾'},{n:'Suudi Arabistan',f:'🇸🇦'},{n:'Yeşil Burun',f:'🇨🇻'}],fx:[{h:'İspanya',a:'Suudi Arabistan',d:'15 Haz',v:'Mercedes-Benz Stadium'},{h:'Uruguay',a:'Yeşil Burun',d:'15 Haz',v:'Hard Rock Stadium'},{h:'İspanya',a:'Uruguay',d:'21 Haz',v:'Gillette Stadium'},{h:'Suudi Arabistan',a:'Yeşil Burun',d:'21 Haz',v:'Lumen Field'},{h:'Suudi Arabistan',a:'Uruguay',d:'26 Haz',v:'MetLife Stadium'},{h:'Yeşil Burun',a:'İspanya',d:'26 Haz',v:'Arrowhead Stadium'}]},I:{t:[{n:'Fransa',f:'🇫🇷'},{n:'Senegal',f:'🇸🇳'},{n:'Norveç',f:'🇳🇴'},{n:'Irak',f:'🇮🇶'}],fx:[{h:'Fransa',a:'Norveç',d:'16 Haz',v:'Mercedes-Benz Stadium'},{h:'Senegal',a:'Irak',d:'16 Haz',v:'Lincoln Financial'},{h:'Fransa',a:'Irak',d:'22 Haz',v:'Lincoln Financial'},{h:'Norveç',a:'Senegal',d:'22 Haz',v:'Gillette Stadium'},{h:'Irak',a:'Norveç',d:'27 Haz',v:'BC Place'},{h:'Fransa',a:'Senegal',d:'27 Haz',v:'Estadio Azteca'}]},J:{t:[{n:'Arjantin',f:'🇦🇷'},{n:'Avusturya',f:'🇦🇹'},{n:'Cezayir',f:'🇩🇿'},{n:'Ürdün',f:'🇯🇴'}],fx:[{h:'Arjantin',a:'Avusturya',d:'16 Haz',v:'AT&T Stadium'},{h:'Cezayir',a:'Ürdün',d:'16 Haz',v:"Levi's Stadium"},{h:'Arjantin',a:'Cezayir',d:'22 Haz',v:'Hard Rock Stadium'},{h:'Avusturya',a:'Ürdün',d:'22 Haz',v:'NRG Stadium'},{h:'Ürdün',a:'Arjantin',d:'27 Haz',v:'Estadio BBVA'},{h:'Cezayir',a:'Avusturya',d:'27 Haz',v:'Estadio Akron'}]},K:{t:[{n:'Portekiz',f:'🇵🇹'},{n:'Kolombiya',f:'🇨🇴'},{n:'Özbekistan',f:'🇺🇿'},{n:'Kongo DR',f:'🇨🇩'}],fx:[{h:'Portekiz',a:'Özbekistan',d:'17 Haz',v:'NRG Stadium'},{h:'Kolombiya',a:'Kongo DR',d:'17 Haz',v:'Estadio Akron'},{h:'Portekiz',a:'Kongo DR',d:'23 Haz',v:'Mercedes-Benz Stadium'},{h:'Özbekistan',a:'Kolombiya',d:'23 Haz',v:'Arrowhead Stadium'},{h:'Kongo DR',a:'Özbekistan',d:'28 Haz',v:'Lumen Field'},{h:'Kolombiya',a:'Portekiz',d:'28 Haz',v:'Estadio Azteca'}]},L:{t:[{n:'İngiltere',f:'🏴󠁧󠁢󠁥󠁮󠁧󠁿'},{n:'Hırvatistan',f:'🇭🇷'},{n:'Gana',f:'🇬🇭'},{n:'Panama',f:'🇵🇦'}],fx:[{h:'İngiltere',a:'Hırvatistan',d:'17 Haz',v:'AT&T Stadium'},{h:'Gana',a:'Panama',d:'17 Haz',v:'BMO Field'},{h:'İngiltere',a:'Gana',d:'23 Haz',v:'Gillette Stadium'},{h:'Hırvatistan',a:'Panama',d:'23 Haz',v:'BMO Field'},{h:'Panama',a:'İngiltere',d:'28 Haz',v:'Lincoln Financial'},{h:'Hırvatistan',a:'Gana',d:'28 Haz',v:'BC Place'}]}};
function getFlag(n){for(const g of GRP){const t=GROUPS[g].t.find(x=>x.n===n);if(t)return t.f;}return'🏳️';}

// ── SUPABASE ──────────────────────────────────────────────────
const DB={
  async q(path,opts={}){
    const r=await fetch(SB_URL+path,{...opts,headers:{'apikey':SB_KEY,'Authorization':'Bearer '+SB_KEY,'Content-Type':'application/json',...(opts.headers||{})}});
    const txt=await r.text();
    if(!r.ok){let m='DB hata '+r.status;try{const j=JSON.parse(txt);m=j.message||j.error||m;}catch(e){}throw new Error(m);}
    return txt?JSON.parse(txt):null;
  },
  // Users
  getUser(u){return this.q(`/rest/v1/users?username=eq.${encodeURIComponent(u)}&select=id,username`);},
  login(u,h){return this.q(`/rest/v1/users?username=eq.${encodeURIComponent(u)}&password_hash=eq.${h}&select=id,username`);},
  createUser(u,h){return this.q('/rest/v1/users',{method:'POST',headers:{'Prefer':'return=representation'},body:JSON.stringify({username:u,password_hash:h})});},
  // Predictions (1 per user, genel havuz)
  async getPred(uid){const d=await this.q(`/rest/v1/predictions?user_id=eq.${uid}&select=*`);return d&&d[0];},
  async savePred(uid,payload){
    const ex=await this.q(`/rest/v1/predictions?user_id=eq.${uid}&select=id`);
    const body=JSON.stringify({user_id:uid,...payload,updated_at:new Date().toISOString()});
    if(ex&&ex.length)return this.q(`/rest/v1/predictions?user_id=eq.${uid}`,{method:'PATCH',headers:{'Prefer':'return=minimal'},body});
    return this.q('/rest/v1/predictions',{method:'POST',headers:{'Prefer':'return=minimal'},body});
  },
  // Teams
  getTeamByName(name){return this.q(`/rest/v1/teams?name=eq.${encodeURIComponent(name)}&select=id,name,password_hash,owner_id,max_members,max_predictions,visibility`);},
  createTeam(name,pwHash,ownerId,settings){
    return this.q('/rest/v1/teams',{method:'POST',headers:{'Prefer':'return=representation'},
      body:JSON.stringify({name,password_hash:pwHash||null,owner_id:ownerId,...settings})});
  },
  // Team members — çoklu ekip için
  getMyTeams(uid){return this.q(`/rest/v1/team_members?user_id=eq.${uid}&select=team_id,teams(id,name,max_members,max_predictions,visibility)`);},
  joinTeamMember(teamId,userId){return this.q('/rest/v1/team_members',{method:'POST',headers:{'Prefer':'return=minimal'},body:JSON.stringify({team_id:teamId,user_id:userId})});},
  leaveTeam(teamId,userId){return this.q(`/rest/v1/team_members?team_id=eq.${teamId}&user_id=eq.${userId}`,{method:'DELETE'});},
  getTeamMembers(teamId){return this.q(`/rest/v1/team_members?team_id=eq.${teamId}&select=user_id,users(username)`);},
  // team_predictions — hangi tahmin hangi ekipte
  getMyTeamPreds(uid){return this.q(`/rest/v1/team_predictions?user_id=eq.${uid}&select=team_id`);},
  addToTeam(teamId,userId){return this.q('/rest/v1/team_predictions',{method:'POST',headers:{'Prefer':'return=minimal'},body:JSON.stringify({team_id:teamId,user_id:userId})});},
  removeFromTeam(teamId,userId){return this.q(`/rest/v1/team_predictions?team_id=eq.${teamId}&user_id=eq.${userId}`,{method:'DELETE'});},
  getTeamPredictions(teamId){return this.q(`/rest/v1/team_predictions?team_id=eq.${teamId}&select=user_id`);},
  // Leaderboard
  allUsers(){return this.q('/rest/v1/users?select=id,username');},
  allPreds(){return this.q('/rest/v1/predictions?select=user_id,group_rankings,bracket,champion,public');},
};

async function hashPw(p){
  const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(p));
  return Array.from(new Uint8Array(b)).map(x=>x.toString(16).padStart(2,'0')).join('');
}

// ── STATE ─────────────────────────────────────────────────────
const S={
  user:null,
  preds:{group_rankings:{},bracket:{},champion:'',best8:[],public:true},
  myTeams:[], // [{id,name,...}] — kullanıcının üye olduğu ekipler
  myTeamPredIds:[], // hangi ekiplere tahmin gönderildi [teamId,...]
  currentStep:0,
  ranking(g){const r=this.preds.group_rankings[g];return(r&&r.length===4)?[...r]:GROUPS[g].t.map(t=>t.n);},
  setRanking(g,a){this.preds.group_rankings[g]=a;},
  isGroupDone(g){const r=this.preds.group_rankings[g];if(!r||r.length<4)return false;return r.some((t,i)=>t!==GROUPS[g].t[i].n);},
  doneCount(){return GRP.filter(g=>this.isGroupDone(g)).length;},
  allThirds(){return GRP.map(g=>({gid:g,name:this.ranking(g)[2],flag:getFlag(this.ranking(g)[2])}));},
  toggleBest8(name){
    const b=this.preds.best8||[];const i=b.indexOf(name);
    if(i>=0)b.splice(i,1);else if(b.length<8)b.push(name);else return false;
    this.preds.best8=b;return true;
  },
  r32team(src){
    if(src.t==='3'){const b=this.preds.best8||[];const nm=b[src.slot];return nm?{n:nm,f:getFlag(nm),tbd:false}:{n:'En İyi 3. #'+(src.slot+1),f:'❓',tbd:true};}
    const r=this.ranking(src.g);const n=r[src.p-1];
    return n?{n,f:getFlag(n),tbd:false}:{n:'TBD',f:'❓',tbd:true};
  },
  matchTeams(rid,mi){
    if(rid==='r32')return R32[mi].map(s=>this.r32team(s));
    const ord=['r32','r16','qf','sf','final'];
    const prev=ord[ord.indexOf(rid)-1];
    const w=this.preds.bracket[prev]||[];
    const mk=nm=>nm?{n:nm,f:getFlag(nm),tbd:false}:{n:'TBD',f:'❓',tbd:true};
    return[mk(w[mi*2]),mk(w[mi*2+1])];
  },
  winner(rid,mi){return(this.preds.bracket[rid]||[])[mi]||null;},
  setWinner(rid,mi,team){
    if(!this.preds.bracket[rid])this.preds.bracket[rid]=[];
    this.preds.bracket[rid][mi]=team;
    const ord=['r32','r16','qf','sf','final'];
    const idx=ord.indexOf(rid);
    for(let i=idx+1;i<ord.length;i++)this.preds.bracket[ord[i]]=[];
    if(rid==='final')this.preds.champion=team;
  },
};

// ── TEMA ──────────────────────────────────────────────────────
function toggleTheme(){
  const n=document.documentElement.dataset.theme==='dark'?'light':'dark';
  document.documentElement.dataset.theme=n;
  document.getElementById('theme-btn').textContent=n==='dark'?'🌙':'☀️';
  localStorage.setItem('wc_theme',n);
}
function loadTheme(){
  const t=localStorage.getItem('wc_theme')||'dark';
  document.documentElement.dataset.theme=t;
  const b=document.getElementById('theme-btn');if(b)b.textContent=t==='dark'?'🌙':'☀️';
}

// ── TOAST ─────────────────────────────────────────────────────
function toast(msg,type='ok'){
  const w=document.getElementById('toast-wrap');
  const el=document.createElement('div');el.className='toast toast-'+type;el.textContent=msg;
  w.appendChild(el);setTimeout(()=>el.remove(),3000);
}
function mc(){return document.getElementById('main-content');}
function openModal(html){document.getElementById('modal-box').innerHTML=html;document.getElementById('modal').classList.add('open');}
function closeModal(e){if(!e||e.target===document.getElementById('modal'))document.getElementById('modal').classList.remove('open');}

// ── AUTH ──────────────────────────────────────────────────────
let _sm='login';
function splashTab(m){
  _sm=m;
  document.getElementById('stab-login').classList.toggle('active',m==='login');
  document.getElementById('stab-reg').classList.toggle('active',m==='register');
  renderSplashForm();
}
function renderSplashForm(){
  const f=document.getElementById('splash-form');
  if(_sm==='login'){
    f.innerHTML=`
      <div class="sfield"><label>Kullanıcı Adı</label><input class="sinp" id="su" autocomplete="username" placeholder="kullaniciadi"/></div>
      <div class="sfield"><label>Şifre</label><div class="pw-row"><input class="sinp" id="sp" type="password" autocomplete="current-password" placeholder="••••••"/><button class="pw-eye" onclick="tpw('sp',this)" type="button">👁</button></div></div>
      <p class="serr" id="serr"></p>
      <button class="sbtn" onclick="doLogin()">Giriş Yap →</button>`;
  }else{
    f.innerHTML=`
      <div class="sfield"><label>Kullanıcı Adı <small>(min 3)</small></label><input class="sinp" id="su" autocomplete="username" placeholder="kullaniciadi"/></div>
      <div class="sfield"><label>Şifre <small>(min 6)</small></label><div class="pw-row"><input class="sinp" id="sp" type="password" autocomplete="new-password" placeholder="••••••"/><button class="pw-eye" onclick="tpw('sp',this)" type="button">👁</button></div></div>
      <div class="sfield"><label>Şifre Tekrar</label><div class="pw-row"><input class="sinp" id="sp2" type="password" autocomplete="new-password" placeholder="••••••"/><button class="pw-eye" onclick="tpw('sp2',this)" type="button">👁</button></div></div>
      <p class="serr" id="serr"></p>
      <button class="sbtn" onclick="doRegister()">Kayıt Ol →</button>`;
  }
}
function tpw(id,btn){const el=document.getElementById(id);el.type=el.type==='password'?'text':'password';btn.textContent=el.type==='password'?'👁':'🙈';}
function serr(msg){const el=document.getElementById('serr');if(el)el.textContent=msg;}

async function doLogin(){
  const u=document.getElementById('su').value.trim(),p=document.getElementById('sp').value;
  serr('');if(!u||!p){serr('Tüm alanları doldur.');return;}serr('Giriş yapılıyor...');
  try{
    const h=await hashPw(p);const r=await DB.login(u,h);
    if(!r||!r.length){serr('Kullanıcı adı veya şifre hatalı.');return;}
    await loginOK(r[0]);
  }catch(e){serr('Hata: '+e.message);}
}
async function doRegister(){
  const u=document.getElementById('su').value.trim(),p=document.getElementById('sp').value;
  const p2=document.getElementById('sp2')?document.getElementById('sp2').value:'';
  serr('');
  if(!u||!p){serr('Tüm alanları doldur.');return;}
  if(u.length<3){serr('Kullanıcı adı en az 3 karakter.');return;}
  if(p.length<6){serr('Şifre en az 6 karakter.');return;}
  if(p2&&p!==p2){serr('Şifreler eşleşmiyor.');return;}
  serr('Kontrol ediliyor...');
  try{
    const ex=await DB.getUser(u);
    if(ex&&ex.length){serr('Bu kullanıcı adı alınmış.');return;}
    const h=await hashPw(p);const r=await DB.createUser(u,h);
    if(!r||!r.length){serr('Kayıt başarısız.');return;}
    await loginOK(r[0]);
  }catch(e){serr('Hata: '+e.message);}
}

async function loginOK(user){
  S.user=user;
  localStorage.setItem('wc_user',JSON.stringify(user));
  try{
    const[pred,teamsRaw,teamPredRaw]=await Promise.all([
      DB.getPred(user.id),
      DB.getMyTeams(user.id),
      DB.getMyTeamPreds(user.id),
    ]);
    if(pred){
      S.preds.group_rankings=pred.group_rankings||{};
      S.preds.bracket=pred.bracket||{};
      S.preds.champion=pred.champion||'';
      S.preds.best8=pred.best8||[];
      S.preds.public=pred.public!==false;
    }
    S.myTeams=(teamsRaw||[]).map(r=>r.teams).filter(Boolean);
    S.myTeamPredIds=(teamPredRaw||[]).map(r=>r.team_id);
  }catch(e){console.warn('Yükleme hatası:',e);}
  document.getElementById('splash-screen').style.display='none';
  document.getElementById('main-app').style.display='block';
  updateHeader();
  showMainMenu();
  toast('Hoş geldin, '+user.username+'! 👋');
}

function doLogout(){
  S.user=null;
  S.preds={group_rankings:{},bracket:{},champion:'',best8:[],public:true};
  S.myTeams=[];S.myTeamPredIds=[];S.currentStep=0;
  localStorage.removeItem('wc_user');
  document.getElementById('main-app').style.display='none';
  document.getElementById('splash-screen').style.display='flex';
  _sm='login';renderSplashForm();
}

// ── HEADER ────────────────────────────────────────────────────
function updateHeader(){
  const lock=document.getElementById('hdr-lock');
  if(lock){
    const now=new Date();
    if(now>=WC_KICKOFF)lock.textContent='⚽ Turnuva başladı!';
    else{const d=WC_KICKOFF-now;lock.textContent=`⏳ ${Math.floor(d/86400000)}g ${Math.floor((d%86400000)/3600000)}s ${Math.floor((d%3600000)/60000)}dk`;}
  }
  const ua=document.getElementById('hdr-user-area');
  if(ua&&S.user){
    ua.innerHTML=`<div class="hdr-chip">
      <div class="hdr-av">${S.user.username[0].toUpperCase()}</div>
      <span class="hdr-uname">${S.user.username}</span>
      <button class="hdr-out" onclick="doLogout()">Çıkış</button>
    </div>`;
  }
}

// ── APP MODE ──────────────────────────────────────────────────
function setMode(mode){
  document.getElementById('step-bar').style.display=mode==='predict'?'block':'none';
  document.querySelector('.bottom-nav').style.display='none';
  document.querySelector('.save-fab').style.display='none';
}

// ── ANA MENÜ ──────────────────────────────────────────────────
function showMainMenu(){
  setMode('menu');
  const hasPred=S.doneCount()>0||Object.keys(S.preds.bracket).length>0;
  const teamCount=S.myTeams.length;
  mc().innerHTML=`
    <div class="menu-page">
      <div class="menu-hero">
        <div class="menu-welcome">Hoş geldin,</div>
        <div class="menu-username">${S.user.username}</div>
        ${teamCount>0?`<div class="menu-team-badge">👥 ${teamCount} ekipte üyesin</div>`:''}
      </div>
      <div class="menu-cards">
        <button class="menu-card menu-primary" onclick="showStartPredict()">
          <div class="mc-icon">⚽</div>
          <div class="mc-text"><div class="mc-title">Tahmine Başla</div><div class="mc-sub">${hasPred?'Tahminlerini güncelle':'Grupları tahmin et, şampiyonu seç'}</div></div>
          <div class="mc-arr">›</div>
        </button>
        ${hasPred?`<button class="menu-card" onclick="showMyPreds()">
          <div class="mc-icon">📋</div>
          <div class="mc-text"><div class="mc-title">Tahminlerime Göz At</div><div class="mc-sub">Tahminlerini gör, ekip ve havuz ayarla</div></div>
          <div class="mc-arr">›</div>
        </button>`:''}
        <button class="menu-card" onclick="showTeamHub()">
          <div class="mc-icon">👥</div>
          <div class="mc-text">
            <div class="mc-title">Ekip Yönetimi</div>
            <div class="mc-sub">${teamCount>0?S.myTeams.map(t=>t.name).join(', '):'Ekip kur veya ekibe katıl'}</div>
          </div>
          <div class="mc-arr">›</div>
        </button>
        <button class="menu-card" onclick="showLeaderboard()">
          <div class="mc-icon">🏅</div>
          <div class="mc-text"><div class="mc-title">Liderlik & İstatistik</div><div class="mc-sub">Sıralamalar ve istatistikler</div></div>
          <div class="mc-arr">›</div>
        </button>
      </div>
    </div>`;
}

// ── TAHMİNE BAŞLA (havuz seçimi) ─────────────────────────────
function showStartPredict(){
  setMode('menu');
  mc().innerHTML=`
    <div class="page">
      <button class="back-btn" onclick="showMainMenu()">‹ Ana Menü</button>
      <div class="sum-title" style="margin-top:12px">⚽ Tahmine Başla</div>
      <p class="page-sub">Tahminlerin hangi havuza gönderilsin? Birden fazla seçebilirsin.</p>

      <div class="pool-section">
        <div class="pool-section-title">🌍 Genel Havuz</div>
        <label class="pool-toggle-row">
          <input type="checkbox" id="pool-public" ${S.preds.public?'checked':''}/>
          <span class="ptl-box"></span>
          <div class="ptl-text">
            <div class="ptl-title">Genel liderlik tablosuna dahil et</div>
            <div class="ptl-sub">Herkesin görebileceği tabloya katıl (kişi başı max 1 tahmin)</div>
          </div>
        </label>
      </div>

      ${S.myTeams.length>0?`
      <div class="pool-section">
        <div class="pool-section-title">👥 Ekiplerim</div>
        ${S.myTeams.map(t=>`
          <label class="pool-toggle-row">
            <input type="checkbox" class="team-pool-chk" data-tid="${t.id}" ${S.myTeamPredIds.includes(t.id)?'checked':''}/>
            <span class="ptl-box"></span>
            <div class="ptl-text">
              <div class="ptl-title">${t.name}</div>
              <div class="ptl-sub">Bu ekibin liderlik tablosuna dahil et</div>
            </div>
          </label>`).join('')}
      </div>`:''}

      <div class="pool-section">
        <div class="pool-section-title">➕ Yeni Ekip</div>
        <div class="menu-cards" style="margin-top:8px">
          <button class="menu-card" onclick="showCreateTeam()">
            <div class="mc-icon">🏗️</div>
            <div class="mc-text"><div class="mc-title">Ekip Kur</div><div class="mc-sub">Yeni ekip oluştur ve bu tahminle katıl</div></div>
            <div class="mc-arr">›</div>
          </button>
          <button class="menu-card" onclick="showJoinTeam()">
            <div class="mc-icon">🤝</div>
            <div class="mc-text"><div class="mc-title">Ekibe Katıl</div><div class="mc-sub">Arkadaşının ekibine gir ve bu tahminle katıl</div></div>
            <div class="mc-arr">›</div>
          </button>
        </div>
      </div>

      <div class="page-actions">
        <button class="btn-primary btn-next" onclick="beginPredict()">Tahmine Başla →</button>
      </div>
    </div>`;
}

async function beginPredict(){
  // Seçimleri kaydet
  S.preds.public=document.getElementById('pool-public').checked;
  const newTeamPredIds=[];
  document.querySelectorAll('.team-pool-chk').forEach(chk=>{
    if(chk.checked)newTeamPredIds.push(chk.dataset.tid);
  });
  // Değişen team_predictions kayıtlarını güncelle
  try{
    // Eklenenler
    for(const tid of newTeamPredIds){
      if(!S.myTeamPredIds.includes(tid))await DB.addToTeam(tid,S.user.id);
    }
    // Çıkarılanlar
    for(const tid of S.myTeamPredIds){
      if(!newTeamPredIds.includes(tid))await DB.removeFromTeam(tid,S.user.id);
    }
    S.myTeamPredIds=newTeamPredIds;
    await savePred();
  }catch(e){console.warn('Havuz güncelleme hatası:',e);}
  setMode('predict');
  document.getElementById('step-bar').style.display='block';
  document.querySelector('.save-fab').style.display='flex';
  S.currentStep=0;
  renderCurrentStep();
}

// ── GEÇMİŞ TAHMİNLER ─────────────────────────────────────────
function showMyPreds(){
  setMode('menu');
  mc().innerHTML=`
    <div class="page">
      <button class="back-btn" onclick="showMainMenu()">‹ Ana Menü</button>
      <div class="sum-title" style="margin-top:12px">📋 Tahminlerim</div>
      <p class="page-sub">
        ${S.preds.public?'✅ Genel havuzda':'❌ Genel havuzda değil'} &nbsp;·&nbsp;
        ${S.myTeamPredIds.length>0?`👥 ${S.myTeamPredIds.length} ekipte`:'Hiçbir ekipte değil'}
      </p>
      <div class="sum-table" style="margin-top:10px">
        ${GRP.map(g=>{
          const r=S.ranking(g);const done=S.isGroupDone(g);
          return`<div class="sum-row"><div class="sum-gid">Grup ${g}</div><div class="sum-teams">
            ${done
              ?`<span class="stag pass">${getFlag(r[0])} ${r[0]}</span><span class="stag pass">${getFlag(r[1])} ${r[1]}</span><span class="stag third">${getFlag(r[2])} ${r[2]}</span>`
              :`<span class="stag" style="background:var(--bg3);color:var(--text3)">Henüz tahmin yok</span>`}
          </div></div>`;
        }).join('')}
      </div>
      ${S.preds.champion?`<div class="champ-disp"><span>🏆 Şampiyon:</span><span>${getFlag(S.preds.champion)} <b>${S.preds.champion}</b></span></div>`:''}
      <div class="page-actions" style="display:flex;gap:8px;margin-top:12px">
        <button class="btn-primary" style="flex:1;background:var(--bg3);color:var(--text)" onclick="showStartPredict()">⚙️ Havuz Ayarla</button>
        <button class="btn-primary" style="flex:1" onclick="editPredict()">✏️ Düzenle</button>
      </div>
    </div>`;
}

function editPredict(){
  setMode('predict');
  document.getElementById('step-bar').style.display='block';
  document.querySelector('.save-fab').style.display='flex';
  S.currentStep=0;
  renderCurrentStep();
}

// ── EKİP HUB ──────────────────────────────────────────────────
function showTeamHub(){
  setMode('menu');
  mc().innerHTML=`
    <div class="page">
      <button class="back-btn" onclick="showMainMenu()">‹ Ana Menü</button>
      <div class="sum-title" style="margin-top:12px">👥 Ekip Yönetimi</div>
      ${S.myTeams.length>0?`
        <div class="page-sub">Üye olduğun ${S.myTeams.length} ekip:</div>
        <div class="team-list">
          ${S.myTeams.map(t=>`
            <div class="team-item">
              <div class="ti-info">
                <div class="ti-name">${t.name}</div>
                <div class="ti-meta">${t.max_members>0?`Max ${t.max_members} üye`:''} ${t.visibility==='public'?'· Açık':'· Gizli'}</div>
              </div>
              <div class="ti-actions">
                <button class="ti-btn" onclick="showTeamDetail('${t.id}','${t.name.replace(/'/g,"\\'")}')">Detay</button>
                <button class="ti-btn ti-leave" onclick="confirmLeaveTeam('${t.id}','${t.name.replace(/'/g,"\\'")}')">Ayrıl</button>
              </div>
            </div>`).join('')}
        </div>`
      :`<p class="page-sub">Henüz herhangi bir ekibe üye değilsin.</p>`}
      <div class="menu-cards" style="margin-top:16px">
        <button class="menu-card" onclick="showCreateTeam()">
          <div class="mc-icon">🏗️</div>
          <div class="mc-text"><div class="mc-title">Yeni Ekip Kur</div><div class="mc-sub">Kendi ekibini oluştur, arkadaşlarını davet et</div></div>
          <div class="mc-arr">›</div>
        </button>
        <button class="menu-card" onclick="showJoinTeam()">
          <div class="mc-icon">🤝</div>
          <div class="mc-text"><div class="mc-title">Ekibe Katıl</div><div class="mc-sub">Ad ve şifreyle başka bir ekibe gir</div></div>
          <div class="mc-arr">›</div>
        </button>
      </div>
    </div>`;
}

async function showTeamDetail(teamId,teamName){
  setMode('menu');
  mc().innerHTML=`<div class="page"><div class="lb-loading">⏳ Yükleniyor...</div></div>`;
  try{
    const[members,preds]=await Promise.all([
      DB.getTeamMembers(teamId),
      DB.getTeamPredictions(teamId),
    ]);
    const predUserIds=new Set((preds||[]).map(p=>p.user_id));
    const allPreds=await DB.allPreds();
    const predMap={};(allPreds||[]).forEach(p=>predMap[p.user_id]=p);
    const rows=(members||[]).map(m=>{
      const u=m.users||{};
      const p=predMap[m.user_id]||{};
      const r=p.group_rankings||{};
      const done=GRP.filter(g=>{const rk=r[g];return rk&&rk.length===4&&rk.some((t,i)=>t!==GROUPS[g].t[i].n);}).length;
      const isInTeam=predUserIds.has(m.user_id);
      return{uid:m.user_id,name:u.username||'?',pts:done*2,done,isInTeam,isMe:m.user_id===S.user.id};
    }).filter(r=>r.isInTeam).sort((a,b)=>b.pts-a.pts||b.done-a.done);
    mc().innerHTML=`
      <div class="page">
        <button class="back-btn" onclick="showTeamHub()">‹ Ekipler</button>
        <div class="sum-title" style="margin-top:12px">👥 ${teamName}</div>
        <div class="lb-table" style="margin-top:12px">
          <div class="lb-hdr-row"><div>#</div><div>Üye</div><div style="text-align:right">Puan</div><div style="text-align:right">Tamaml.</div></div>
          ${rows.length===0?'<div class="lb-empty">Henüz tahmin yok.</div>':rows.map((u,i)=>{
            const m=i===0?'🥇':i===1?'🥈':i===2?'🥉':i+1;
            return`<div class="lb-row${u.isMe?' me':''}"><div class="lb-rank">${m}</div><div class="lb-name">${u.name}${u.isMe?'<span class="me-tag">★</span>':''}</div><div class="lb-pts" style="text-align:right">${u.pts}</div><div class="lb-pct" style="text-align:right">%${Math.round(u.done/12*100)}</div></div>`;
          }).join('')}
        </div>
      </div>`;
  }catch(e){mc().innerHTML=`<div class="page"><button class="back-btn" onclick="showTeamHub()">‹ Geri</button><p style="color:var(--red);margin-top:12px">Yüklenemedi: ${e.message}</p></div>`;}
}

function confirmLeaveTeam(teamId,teamName){
  openModal(`
    <div class="modal-head"><span>Ekipten Ayrıl</span><button class="modal-close" onclick="closeModal()">✕</button></div>
    <div class="modal-body" style="padding:1.5rem">
      <p style="margin-bottom:1rem;color:var(--text2)"><b>${teamName}</b> ekibinden ayrılmak istediğine emin misin?</p>
      <div style="display:flex;gap:8px">
        <button class="btn-primary" style="flex:1;background:var(--red)" onclick="doLeaveTeam('${teamId}')">Ayrıl</button>
        <button class="btn-primary" style="flex:1;background:var(--bg3);color:var(--text)" onclick="closeModal()">İptal</button>
      </div>
    </div>`);
}

async function doLeaveTeam(teamId){
  try{
    await DB.leaveTeam(teamId,S.user.id);
    await DB.removeFromTeam(teamId,S.user.id);
    S.myTeams=S.myTeams.filter(t=>t.id!==teamId);
    S.myTeamPredIds=S.myTeamPredIds.filter(id=>id!==teamId);
    closeModal();toast('Ekipten ayrıldın.');showTeamHub();
  }catch(e){toast('Hata: '+e.message,'err');}
}

// ── EKİP KUR ──────────────────────────────────────────────────
function showCreateTeam(fromPredict=false){
  setMode('menu');
  mc().innerHTML=`
    <div class="page">
      <button class="back-btn" onclick="${fromPredict?'showStartPredict()':'showTeamHub()'}">‹ Geri</button>
      <div class="sum-title" style="margin-top:12px">🏗️ Ekip Kur</div>
      <p class="page-sub">Yeni bir ekip oluştur. Arkadaşların ekip adı ve şifreyle katılabilir.</p>
      <div class="form-card">
        <div class="sfield"><label>Ekip Adı</label><input class="sinp" id="ct-name" placeholder="Örn: Kuzey Yıldızları"/></div>
        <div class="sfield"><label>Ekip Şifresi</label>
          <div class="pw-row"><input class="sinp" id="ct-pass" type="password" placeholder="Arkadaşlarına vereceğin şifre"/>
          <button class="pw-eye" onclick="tpw('ct-pass',this)" type="button">👁</button></div>
        </div>
        <div class="settings-section">
          <div class="settings-title">⚙️ Ekip Ayarları</div>
          <div class="sfield"><label>Maksimum Üye Sayısı</label>
            <select class="sinp" id="ct-maxm"><option value="0">Sınırsız</option><option value="5">5 kişi</option><option value="10" selected>10 kişi</option><option value="20">20 kişi</option><option value="50">50 kişi</option></select>
          </div>
          <div class="sfield"><label>Üye Başı Maksimum Tahmin Sayısı</label>
            <select class="sinp" id="ct-maxp"><option value="1" selected>1 tahmin</option><option value="3">3 tahmin</option><option value="5">5 tahmin</option><option value="0">Sınırsız</option></select>
          </div>
          <div class="sfield"><label>Katılım</label>
            <select class="sinp" id="ct-vis"><option value="private" selected>Gizli — sadece şifreyle</option><option value="public">Açık — şifresiz katılım</option></select>
          </div>
        </div>
        <p class="serr" id="ct-err"></p>
        <button class="sbtn" onclick="doCreateTeam()">Ekibi Kur →</button>
      </div>
    </div>`;
}

async function doCreateTeam(){
  const name=document.getElementById('ct-name').value.trim();
  const pass=document.getElementById('ct-pass').value;
  const maxMember=parseInt(document.getElementById('ct-maxm').value);
  const maxPred=parseInt(document.getElementById('ct-maxp').value);
  const vis=document.getElementById('ct-vis').value;
  const err=document.getElementById('ct-err');
  if(!name||name.length<2){err.textContent='Ekip adı en az 2 karakter.';return;}
  if(vis==='private'&&!pass){err.textContent='Gizli ekip için şifre gerekli.';return;}
  err.textContent='Kontrol ediliyor...';
  try{
    const ex=await DB.getTeamByName(name);
    if(ex&&ex.length){err.textContent='Bu ekip adı alınmış, başka bir ad seç.';return;}
    const pwHash=pass?await hashPw(pass):'';
    const res=await DB.createTeam(name,pwHash,S.user.id,{max_members:maxMember,max_predictions:maxPred,visibility:vis});
    if(!res||!res.length){err.textContent='Oluşturulamadı.';return;}
    const team=res[0];
    await DB.joinTeamMember(team.id,S.user.id);
    S.myTeams.push(team);
    toast('Ekip kuruldu: '+name+' 🎉');
    showTeamHub();
  }catch(e){err.textContent='Hata: '+e.message;}
}

// ── EKİBE KATIL ───────────────────────────────────────────────
function showJoinTeam(fromPredict=false){
  setMode('menu');
  mc().innerHTML=`
    <div class="page">
      <button class="back-btn" onclick="${fromPredict?'showStartPredict()':'showTeamHub()'}">‹ Geri</button>
      <div class="sum-title" style="margin-top:12px">🤝 Ekibe Katıl</div>
      <p class="page-sub">Arkadaşından aldığın ekip adı ve şifreyle katıl.</p>
      <div class="form-card">
        <div class="sfield"><label>Ekip Adı</label><input class="sinp" id="jt-name" placeholder="Ekip adını gir"/></div>
        <div class="sfield"><label>Ekip Şifresi <small>(açık ekiplerde boş bırak)</small></label>
          <div class="pw-row"><input class="sinp" id="jt-pass" type="password" placeholder="••••••"/>
          <button class="pw-eye" onclick="tpw('jt-pass',this)" type="button">👁</button></div>
        </div>
        <p class="serr" id="jt-err"></p>
        <button class="sbtn" onclick="doJoinTeam()">Katıl →</button>
      </div>
    </div>`;
}

async function doJoinTeam(){
  const name=document.getElementById('jt-name').value.trim();
  const pass=document.getElementById('jt-pass').value;
  const err=document.getElementById('jt-err');
  if(!name){err.textContent='Ekip adı gir.';return;}
  err.textContent='Kontrol ediliyor...';
  try{
    const ex=await DB.getTeamByName(name);
    if(!ex||!ex.length){err.textContent='Bu isimde ekip bulunamadı.';return;}
    const team=ex[0];
    // Zaten üye mi?
    if(S.myTeams.find(t=>t.id===team.id)){err.textContent='Zaten bu ekibin üyesin.';return;}
    // Şifre kontrolü
    if(team.visibility!=='public'&&team.password_hash){
      const h=await hashPw(pass);
      if(h!==team.password_hash){err.textContent='Ekip şifresi yanlış.';return;}
    }
    // Maksimum üye kontrolü
    if(team.max_members>0){
      const members=await DB.getTeamMembers(team.id);
      if(members&&members.length>=team.max_members){err.textContent='Ekip üye kapasitesi dolmuş.';return;}
    }
    await DB.joinTeamMember(team.id,S.user.id);
    S.myTeams.push(team);
    toast('Ekibe katıldın: '+name+' 🎉');
    showTeamHub();
  }catch(e){err.textContent='Hata: '+e.message;}
}

// ── KAYDET ────────────────────────────────────────────────────
async function savePred(){
  if(!S.user)throw new Error('Giriş yapılmamış');
  if(IS_LOCKED)throw new Error('Tahminler kilitlendi');
  await DB.savePred(S.user.id,{
    group_rankings:S.preds.group_rankings,
    bracket:S.preds.bracket,
    champion:S.preds.champion,
    best8:S.preds.best8||[],
    public:S.preds.public,
  });
}

async function saveAll(){
  try{
    await savePred();
    toast('Kaydedildi ✓');
  }catch(e){toast('Kayıt hatası: '+e.message,'err');}
}

// Grup geçişlerinde otomatik kayıt (sessiz)
let _autoSaveTimer=null;
function autoSave(){
  clearTimeout(_autoSaveTimer);
  _autoSaveTimer=setTimeout(async()=>{
    if(S.user&&!IS_LOCKED){
      try{await savePred();}catch(e){}
    }
  },2000);
}

// ── STEP BAR ──────────────────────────────────────────────────
function renderStepBar(){
  const bar=document.getElementById('step-bar');
  const step=STEPS[S.currentStep];
  const lbl=step.type==='group'?`Grup ${step.id}`:step.type==='summary'?'Grup Özeti':step.type==='best8'?'En İyi 8 Üçüncü':step.label;
  const pct=Math.round((S.currentStep/(STEPS.length-1))*100);
  bar.innerHTML=`<div class="sb-wrap">
    <button class="sb-back${S.currentStep===0?' ghost':''}" onclick="stepNav(-1)">‹</button>
    <div class="sb-center">
      <div class="sb-label">${lbl}</div>
      <div class="sb-prog"><div class="sb-prog-f" style="width:${pct}%"></div></div>
      <div class="sb-info">Adım ${S.currentStep+1} / ${STEPS.length}</div>
    </div>
    <button class="sb-home-big" onclick="showMainMenu()">🏠 Ana Menü</button>
  </div>`;
}

function stepNav(dir){
  const n=S.currentStep+dir;
  if(n<0||n>=STEPS.length)return;
  S.currentStep=n;
  autoSave();
  renderCurrentStep();
}

function renderCurrentStep(){
  renderStepBar();
  const s=STEPS[S.currentStep];
  if(s.type==='group')renderGroup(s.id);
  else if(s.type==='summary')renderSummary();
  else if(s.type==='best8')renderBest8();
  else renderElim(s.id,s.label,s.n);
}

// ── GRUP ──────────────────────────────────────────────────────
function renderGroup(gid){
  const ranking=S.ranking(gid);const locked=IS_LOCKED;
  const gIdx=GRP.indexOf(gid);const isLast=gIdx===GRP.length-1;
  mc().innerHTML=`
    <div class="page">
      <div class="grp-topbar">
        <div class="grp-badge">Grup ${gid}</div>
        <button class="btn-fix" onclick="showFixture('${gid}')">📅 Fikstür</button>
      </div>
      <p class="grp-hint">${locked?'🔒 Kilitli':'↕ Sürükle-bırak ile sırala'}</p>
      <div class="rank-table">
        <div id="rlist-${gid}">${ranking.map((n,i)=>rowHtml(n,i,gid,locked)).join('')}</div>
      </div>
      <div class="page-actions">
        <button class="btn-primary btn-next" onclick="stepNav(1)">${isLast?'Özete Git →':'Grup '+GRP[gIdx+1]+' →'}</button>
      </div>
    </div>`;
  if(!locked)initDrag(gid);
}

function rowHtml(nm,i,gid,locked){
  const f=getFlag(nm);
  const badges=['b-pass','b-pass','b-third','b-out'];
  const labels=['Gruptan Geçer ✓','Gruptan Geçer ✓','En İyi 3. Adayı','Elenir ✗'];
  const descs=["1. sıra — Son 32'ye gider","2. sıra — Son 32'ye gider","3. sıra — En iyi 8 havuzuna girer","4. sıra — turnuva bitti"];
  return`<div class="rank-row pos-${i+1}" draggable="${!locked}" data-idx="${i}" data-name="${nm}"
    ${!locked?`ondragstart="ds(event,'${gid}',${i})" ondragover="dov(event)" ondrop="dp(event,'${gid}')" ondragend="de()"
    ontouchstart="ts(event,'${gid}')" ontouchmove="tm(event)" ontouchend="te(event,'${gid}')" style="touch-action:none"`:''}
  >
    <div class="rr-num">${i+1}</div>
    <div class="rr-team"><span class="rr-flag">${f}</span><div class="rr-info"><div class="rr-name">${nm}</div><div class="rr-desc">${descs[i]}</div></div></div>
    <div class="rr-badge ${badges[i]}">${labels[i]}</div>
    <div class="rr-drag">${locked?'':'⠿'}</div>
  </div>`;
}

let _dg=null,_di=null,_tr=null,_tg=null;
function initDrag(){}
function ds(e,g,i){_dg=g;_di=i;e.currentTarget.classList.add('dragging');e.dataTransfer.effectAllowed='move';}
function dov(e){e.preventDefault();const t=e.target.closest('.rank-row');if(t){document.querySelectorAll('.rank-row').forEach(r=>r.classList.remove('drag-over'));t.classList.add('drag-over');}}
function de(){document.querySelectorAll('.rank-row').forEach(r=>r.classList.remove('dragging','drag-over'));}
function dp(e,gid){
  e.preventDefault();de();
  const t=e.target.closest('.rank-row');if(!t||_dg!==gid)return;
  const ti=parseInt(t.dataset.idx);if(_di===ti)return;
  const r=S.ranking(gid);const[m]=r.splice(_di,1);r.splice(ti,0,m);S.setRanking(gid,r);renderGroup(gid);
}
function ts(e,gid){_tr=e.currentTarget;_tg=gid;_tr.classList.add('dragging');}
function tm(e){if(!_tr)return;e.preventDefault();document.querySelectorAll('.rank-row').forEach(r=>r.classList.remove('drag-over'));const el=document.elementFromPoint(e.touches[0].clientX,e.touches[0].clientY);const t=el?.closest('.rank-row');if(t&&t!==_tr)t.classList.add('drag-over');}
function te(e,gid){
  if(!_tr)return;const rows=Array.from(_tr.parentNode.querySelectorAll('.rank-row'));const tgt=rows.find(r=>r.classList.contains('drag-over'));
  rows.forEach(r=>r.classList.remove('dragging','drag-over'));
  if(tgt){const fi=parseInt(_tr.dataset.idx),ti=parseInt(tgt.dataset.idx);if(fi!==ti){const r=S.ranking(gid);const[m]=r.splice(fi,1);r.splice(ti,0,m);S.setRanking(gid,r);}}
  _tr=null;_tg=null;renderGroup(gid);
}

function showFixture(gid){
  const g=GROUPS[gid];
  openModal(`<div class="modal-head"><span>⚽ Grup ${gid} Fikstürü</span><button class="modal-close" onclick="closeModal()">✕</button></div>
    <div class="modal-body">${g.fx.map(f=>`
      <div class="fx-match"><div class="fx-row">
        <div class="fx-t"><span class="fx-flag">${getFlag(f.h)}</span><span>${f.h}</span></div>
        <div class="fx-vs">VS</div>
        <div class="fx-t r"><span>${f.a}</span><span class="fx-flag">${getFlag(f.a)}</span></div>
      </div><div class="fx-info">📅 ${f.d} · 🏟 ${f.v}</div></div>`).join('')}
    </div>`);
}

function renderSummary(){
  mc().innerHTML=`
    <div class="page">
      <div class="sum-title">📋 Grup Özeti</div>
      <p class="sum-sub">${S.doneCount()}/12 grup özelleştirildi</p>
      <div class="sum-table">
        ${GRP.map(g=>{const r=S.ranking(g);return`<div class="sum-row"><div class="sum-gid">Grup ${g}</div><div class="sum-teams">
          <span class="stag pass">${getFlag(r[0])} ${r[0]}</span>
          <span class="stag pass">${getFlag(r[1])} ${r[1]}</span>
          <span class="stag third">${getFlag(r[2])} ${r[2]}</span>
        </div></div>`;}).join('')}
      </div>
      <div class="page-actions">
        <button class="btn-primary btn-next" onclick="stepNav(1)">En İyi 8 Üçüncüyü Seç →</button>
      </div>
    </div>`;
}

function renderBest8(){
  const thirds=S.allThirds();const sel=S.preds.best8||[];const locked=IS_LOCKED;
  mc().innerHTML=`
    <div class="page">
      <div class="best8-header"><div class="best8-title">🥉 En İyi 8 Üçüncü</div>
        <div class="best8-sub">12 gruptan 3. sıra bitiren takımların en iyisi 8 tanesi Son 32'ye katılır.</div>
      </div>
      <div class="best8-counter"><div class="b8c-bar"><div class="b8c-fill" style="width:${Math.round(sel.length/8*100)}%"></div></div>
        <span class="b8c-txt"><b>${sel.length}</b>/8 seçildi</span>
      </div>
      ${locked?`<div class="locked-banner">🔒 Tahminler kilitlendi.</div>`:''}
      <div class="best8-list">
        ${thirds.map(t=>`<div class="b8-row${sel.includes(t.name)?' b8-sel':''}" ${!locked?`onclick="toggleBest8('${t.name.replace(/'/g,"\\'")}')"`:''}">
          <div class="b8-left"><span class="b8-flag">${t.flag}</span><div class="b8-info"><div class="b8-name">${t.name}</div><div class="b8-group">Grup ${t.gid} · 3. sıra</div></div></div>
          <div class="b8-check">${sel.includes(t.name)?'✓':''}</div>
        </div>`).join('')}
      </div>
      <div class="page-actions">
        ${sel.length===8||locked
          ?`<button class="btn-primary btn-next" onclick="stepNav(1)">Son 32'ye Geç →</button>`
          :`<p class="pick-warn">⚠️ ${8-sel.length} takım daha seç</p>`}
      </div>
    </div>`;
}
function toggleBest8(n){if(IS_LOCKED)return;if(!S.toggleBest8(n)){toast('Zaten 8 seçildi!','err');return;}renderBest8();}

function renderElim(rid,label,n){
  const locked=IS_LOCKED;
  const matches=Array.from({length:n},(_,i)=>{const[t1,t2]=S.matchTeams(rid,i);return{i,t1,t2,w:S.winner(rid,i)};});
  const allDone=matches.every(m=>m.w);
  const isLast=S.currentStep===STEPS.length-1;
  mc().innerHTML=`
    <div class="page">
      <div class="elim-title">${label}</div>
      <div class="elim-sub">${n} maç · ${rid==='final'?'Şampiyonu belirle':'Kazananı seçmek için tıkla'}</div>
      ${locked?`<div class="locked-banner">🔒 Tahminler kilitlendi.</div>`:''}
      <div class="matches-list">${matches.map(m=>matchHtml(m,rid,locked)).join('')}</div>
      <div class="page-actions">
        ${allDone||locked
          ? isLast ? `
            <div class="final-save-card">
              <div class="fsc-title">🏆 Tahminleri Kaydet</div>
              ${S.preds.champion?`<div class="fsc-champ">Şampiyon: ${getFlag(S.preds.champion)} <b>${S.preds.champion}</b></div>`:''}
              <label class="pool-toggle-row" style="margin:14px 0">
                <input type="checkbox" id="pub-chk" ${S.preds.public?'checked':''} onchange="S.preds.public=this.checked"/>
                <span class="ptl-box"></span>
                <div class="ptl-text">
                  <div class="ptl-title">Genel havuza gönder</div>
                  <div class="ptl-sub">Herkese açık liderlik tablosuna ekle (kişi başı max 1 tahmin)</div>
                </div>
              </label>
              ${S.myTeams.length>0?`<div style="margin-bottom:14px">
                <div style="font-size:12px;font-weight:700;color:var(--text3);margin-bottom:8px;text-transform:uppercase;letter-spacing:.5px">Ekiplerim</div>
                ${S.myTeams.map(t=>`<label class="pool-toggle-row" style="margin-bottom:8px">
                  <input type="checkbox" class="team-save-chk" data-tid="${t.id}" ${S.myTeamPredIds.includes(t.id)?'checked':''}/>
                  <span class="ptl-box"></span>
                  <div class="ptl-text"><div class="ptl-title">${t.name} ekibine gönder</div></div>
                </label>`).join('')}
              </div>`:''}
              <button class="sbtn" onclick="doFinalSave()">💾 Tahminleri Kaydet</button>
            </div>`
          : `<button class="btn-primary btn-next" onclick="stepNav(1)">Sonraki Tur →</button>`
          : `<p class="pick-warn">⚠️ Devam etmek için tüm kazananları seç</p>`}
      </div>
    </div>`;
}

async function doFinalSave(){
  S.preds.public=document.getElementById('pub-chk').checked;
  const newTeamIds=[];
  document.querySelectorAll('.team-save-chk').forEach(chk=>{if(chk.checked)newTeamIds.push(chk.dataset.tid);});
  try{
    await savePred();
    for(const tid of newTeamIds){if(!S.myTeamPredIds.includes(tid))await DB.addToTeam(tid,S.user.id);}
    for(const tid of S.myTeamPredIds){if(!newTeamIds.includes(tid))await DB.removeFromTeam(tid,S.user.id);}
    S.myTeamPredIds=newTeamIds;
    toast('Tahminler kaydedildi! 🎉');
    setTimeout(showMainMenu,800);
  }catch(e){toast('Kayıt hatası: '+e.message,'err');}
}

function matchHtml(m,rid,locked){
  const t1=m.t1||{n:'TBD',f:'❓',tbd:true},t2=m.t2||{n:'TBD',f:'❓',tbd:true};
  const tm=(t,isW)=>`<div class="match-team${isW?' winner':''}${t.tbd?' tbd':''}${locked?' no-pick':''}"
    ${!t.tbd&&!locked?`onclick="pick('${rid}',${m.i},'${t.n.replace(/'/g,"\\'")}')"`:''}">
    <span class="mt-flag">${t.f}</span><span class="mt-name">${t.n}</span>${isW?'<span class="mt-check">✓</span>':''}
  </div>`;
  return`<div class="match-card${m.w?' won':''}">
    <div class="match-num">Maç ${m.i+1}${rid==='final'?' · 🏆 Şampiyonu Belirle':''}</div>
    <div class="match-teams">${tm(t1,m.w===t1.n)}<div class="match-vs">VS</div>${tm(t2,m.w===t2.n)}</div>
  </div>`;
}
function pick(rid,mi,team){if(IS_LOCKED)return;S.setWinner(rid,mi,team);if(rid==='final')toast('🏆 Şampiyon: '+team+' '+getFlag(team),'ok');renderElim(STEPS[S.currentStep].id,STEPS[S.currentStep].label,STEPS[S.currentStep].n);}

// ── LİDERLİK ─────────────────────────────────────────────────
function showLeaderboard(){
  setMode('menu');
  mc().innerHTML=`<div class="page"><div class="lb-loading">⏳ Yükleniyor...</div></div>`;
  loadLb();
}
async function loadLb(){
  try{
    const[users,preds]=await Promise.all([DB.allUsers(),DB.allPreds()]);
    const pm={};(preds||[]).forEach(p=>pm[p.user_id]=p);
    const rows=(users||[]).map(u=>{
      const p=pm[u.id]||{};const r=p.group_rankings||{};
      const done=GRP.filter(g=>{const rk=r[g];return rk&&rk.length===4&&rk.some((t,i)=>t!==GROUPS[g].t[i].n);}).length;
      return{id:u.id,name:u.username,pts:done*2,pct:Math.round(done/12*100),pub:p.public!==false};
    }).filter(u=>u.pub).sort((a,b)=>b.pts-a.pts||b.pct-a.pct);
    mc().innerHTML=`<div class="page">
      <button class="back-btn" onclick="showMainMenu()">‹ Ana Menü</button>
      <div class="page-title" style="margin-top:12px">🏅 Liderlik Tablosu</div>
      <div class="pts-key">Grup <b>2p</b> · Son 32 <b>5p</b> · Çeyrek <b>7p</b> · Yarı <b>10p</b> · Final <b>15p</b> · Şampiyon <b>20p</b></div>
      <div class="lb-table">
        <div class="lb-hdr-row"><div>#</div><div>Kullanıcı</div><div style="text-align:right">Puan</div><div style="text-align:right">Tamaml.</div></div>
        ${rows.length===0?'<div class="lb-empty">Henüz tahmin yok.</div>':rows.map((u,i)=>{
          const m=i===0?'🥇':i===1?'🥈':i===2?'🥉':i+1;const me=S.user&&u.id===S.user.id;
          return`<div class="lb-row${me?' me':''}"><div class="lb-rank">${m}</div><div class="lb-name">${u.name}${me?'<span class="me-tag">★</span>':''}</div><div class="lb-pts" style="text-align:right">${u.pts}</div><div class="lb-pct" style="text-align:right">%${u.pct}</div></div>`;
        }).join('')}
      </div>
    </div>`;
  }catch(e){mc().innerHTML=`<div class="page"><button class="back-btn" onclick="showMainMenu()">‹ Geri</button><p style="color:var(--red);margin-top:12px">Yüklenemedi: ${e.message}</p></div>`;}
}

// ── BAŞLATMA ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded',async()=>{
  loadTheme();
  setInterval(updateHeader,60000);
  document.getElementById('modal').addEventListener('click',e=>{if(e.target===document.getElementById('modal'))closeModal();});
  document.querySelector('.save-fab').addEventListener('click',saveAll);
  const saved=localStorage.getItem('wc_user');
  if(saved){
    try{
      const user=JSON.parse(saved);
      S.user=user;
      const[pred,teamsRaw,teamPredRaw]=await Promise.all([
        DB.getPred(user.id),
        DB.getMyTeams(user.id),
        DB.getMyTeamPreds(user.id),
      ]);
      if(pred){
        S.preds.group_rankings=pred.group_rankings||{};
        S.preds.bracket=pred.bracket||{};
        S.preds.champion=pred.champion||'';
        S.preds.best8=pred.best8||[];
        S.preds.public=pred.public!==false;
      }
      S.myTeams=(teamsRaw||[]).map(r=>r.teams).filter(Boolean);
      S.myTeamPredIds=(teamPredRaw||[]).map(r=>r.team_id);
      document.getElementById('splash-screen').style.display='none';
      document.getElementById('main-app').style.display='block';
      updateHeader();showMainMenu();return;
    }catch(e){localStorage.removeItem('wc_user');}
  }
  renderSplashForm();
});
