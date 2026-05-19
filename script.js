/* ============================================================
   World Cup 2026 — script.js v13
   ============================================================ */

const LOCK_DATE  = new Date('2026-06-08T00:00:00');
const IS_LOCKED  = new Date() >= LOCK_DATE;
const WC_KICKOFF = new Date('2026-06-11T19:00:00Z');
const SB_URL = 'https://jkfhqcygjvuijkjamgyn.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprZmhxY3lnanZ1aWpramFtZ3luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0MzAwNjMsImV4cCI6MjA5NDAwNjA2M30.6_6QZBGdYiOKpyIGbfuzKfTXsyTifyUSTBHoW5fWmJ8';

const GRP = ['A','B','C','D','E','F','G','H','I','J','K','L'];
const ELIM_ROUNDS = [
  {id:'r32',label:'Son 32',n:16},
  {id:'r16',label:'Son 16',n:8},
  {id:'qf', label:'Çeyrek Final',n:4},
  {id:'sf', label:'Yarı Final',n:2},
  {id:'final',label:'Final',n:1},
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

// Puanlama sistemi
const POINTS = {
  group_rank: 3,      // Sıralama sisteminde doğru grup sırası (pozisyon başına)
  group_advance: 2,   // Gruptan geçen takımı doğru bilmek
  match_result: 2,    // Maç sonucunu doğru bilmek
  r32: 5, r16: 7, qf: 10, sf: 15, final: 20, champion: 30,
  best8: 3,           // En iyi 3. tahmin doğru
};

const GROUPS = {
  A:{t:[{n:'Meksika',f:'🇲🇽'},{n:'Güney Kore',f:'🇰🇷'},{n:'Güney Afrika',f:'🇿🇦'},{n:'Çekya',f:'🇨🇿'}],
    fx:[{h:'Meksika',a:'Güney Afrika',d:'11 Haz',v:'Estadio Azteca'},{h:'Güney Kore',a:'Çekya',d:'11 Haz',v:'Estadio Akron'},{h:'Çekya',a:'Güney Afrika',d:'18 Haz',v:'Mercedes-Benz Stadium'},{h:'Meksika',a:'Güney Kore',d:'18 Haz',v:'Estadio Akron'},{h:'Çekya',a:'Meksika',d:'24 Haz',v:'Estadio Azteca'},{h:'Güney Afrika',a:'Güney Kore',d:'24 Haz',v:'Estadio BBVA'}]},
  B:{t:[{n:'Kanada',f:'🇨🇦'},{n:'Bosna-Hersek',f:'🇧🇦'},{n:'Katar',f:'🇶🇦'},{n:'İsviçre',f:'🇨🇭'}],
    fx:[{h:'Kanada',a:'Bosna-Hersek',d:'12 Haz',v:'BMO Field'},{h:'Katar',a:'İsviçre',d:'13 Haz',v:'Lumen Field'},{h:'Bosna-Hersek',a:'İsviçre',d:'19 Haz',v:'Hard Rock Stadium'},{h:'Kanada',a:'Katar',d:'19 Haz',v:'BC Place'},{h:'İsviçre',a:'Kanada',d:'25 Haz',v:'BC Place'},{h:'Bosna-Hersek',a:'Katar',d:'25 Haz',v:"Levi's Stadium"}]},
  C:{t:[{n:'Brezilya',f:'🇧🇷'},{n:'Fas',f:'🇲🇦'},{n:'İskoçya',f:'🏴󠁧󠁢󠁳󠁣󠁴󠁿'},{n:'Haiti',f:'🇭🇹'}],
    fx:[{h:'Brezilya',a:'Fas',d:'12 Haz',v:'MetLife Stadium'},{h:'İskoçya',a:'Haiti',d:'12 Haz',v:'SoFi Stadium'},{h:'Fas',a:'Haiti',d:'18 Haz',v:'AT&T Stadium'},{h:'Brezilya',a:'İskoçya',d:'18 Haz',v:'Gillette Stadium'},{h:'Fas',a:'İskoçya',d:'24 Haz',v:'Gillette Stadium'},{h:'Haiti',a:'Brezilya',d:'24 Haz',v:'Hard Rock Stadium'}]},
  D:{t:[{n:'ABD',f:'🇺🇸'},{n:'Paraguay',f:'🇵🇾'},{n:'Avustralya',f:'🇦🇺'},{n:'Türkiye',f:'🇹🇷'}],
    fx:[{h:'ABD',a:'Paraguay',d:'12 Haz',v:'SoFi Stadium'},{h:'Avustralya',a:'Türkiye',d:'13 Haz',v:'Lumen Field'},{h:'Paraguay',a:'Türkiye',d:'19 Haz',v:'Arrowhead Stadium'},{h:'ABD',a:'Avustralya',d:'19 Haz',v:'SoFi Stadium'},{h:'Türkiye',a:'ABD',d:'25 Haz',v:"Levi's Stadium"},{h:'Paraguay',a:'Avustralya',d:'25 Haz',v:'Lincoln Financial'}]},
  E:{t:[{n:'Almanya',f:'🇩🇪'},{n:'Fildişi Sahili',f:'🇨🇮'},{n:'Ekvador',f:'🇪🇨'},{n:'Curaçao',f:'🇨🇼'}],
    fx:[{h:'Almanya',a:'Curaçao',d:'14 Haz',v:'NRG Stadium'},{h:'Fildişi Sahili',a:'Ekvador',d:'14 Haz',v:'Lincoln Financial'},{h:'Almanya',a:'Fildişi Sahili',d:'20 Haz',v:'BMO Field'},{h:'Ekvador',a:'Curaçao',d:'20 Haz',v:'Arrowhead Stadium'},{h:'Curaçao',a:'Fildişi Sahili',d:'25 Haz',v:'Lincoln Financial'},{h:'Ekvador',a:'Almanya',d:'25 Haz',v:'MetLife Stadium'}]},
  F:{t:[{n:'Hollanda',f:'🇳🇱'},{n:'Japonya',f:'🇯🇵'},{n:'İsveç',f:'🇸🇪'},{n:'Tunus',f:'🇹🇳'}],
    fx:[{h:'Hollanda',a:'Japonya',d:'14 Haz',v:'AT&T Stadium'},{h:'İsveç',a:'Tunus',d:'14 Haz',v:'Estadio BBVA'},{h:'Hollanda',a:'İsveç',d:'20 Haz',v:'NRG Stadium'},{h:'Japonya',a:'Tunus',d:'20 Haz',v:'Estadio BBVA'},{h:'Tunus',a:'Hollanda',d:'25 Haz',v:'Estadio Akron'},{h:'İsveç',a:'Japonya',d:'25 Haz',v:'Hard Rock Stadium'}]},
  G:{t:[{n:'Belçika',f:'🇧🇪'},{n:'Mısır',f:'🇪🇬'},{n:'İran',f:'🇮🇷'},{n:'Yeni Zelanda',f:'🇳🇿'}],
    fx:[{h:'Belçika',a:'Mısır',d:'15 Haz',v:'SoFi Stadium'},{h:'İran',a:'Yeni Zelanda',d:'15 Haz',v:"Levi's Stadium"},{h:'Belçika',a:'Yeni Zelanda',d:'21 Haz',v:'AT&T Stadium'},{h:'Mısır',a:'İran',d:'21 Haz',v:'NRG Stadium'},{h:'Mısır',a:'Yeni Zelanda',d:'26 Haz',v:'Lincoln Financial'},{h:'İran',a:'Belçika',d:'26 Haz',v:'MetLife Stadium'}]},
  H:{t:[{n:'İspanya',f:'🇪🇸'},{n:'Uruguay',f:'🇺🇾'},{n:'Suudi Arabistan',f:'🇸🇦'},{n:'Yeşil Burun',f:'🇨🇻'}],
    fx:[{h:'İspanya',a:'Suudi Arabistan',d:'15 Haz',v:'Mercedes-Benz Stadium'},{h:'Uruguay',a:'Yeşil Burun',d:'15 Haz',v:'Hard Rock Stadium'},{h:'İspanya',a:'Uruguay',d:'21 Haz',v:'Gillette Stadium'},{h:'Suudi Arabistan',a:'Yeşil Burun',d:'21 Haz',v:'Lumen Field'},{h:'Suudi Arabistan',a:'Uruguay',d:'26 Haz',v:'MetLife Stadium'},{h:'Yeşil Burun',a:'İspanya',d:'26 Haz',v:'Arrowhead Stadium'}]},
  I:{t:[{n:'Fransa',f:'🇫🇷'},{n:'Senegal',f:'🇸🇳'},{n:'Norveç',f:'🇳🇴'},{n:'Irak',f:'🇮🇶'}],
    fx:[{h:'Fransa',a:'Norveç',d:'16 Haz',v:'Mercedes-Benz Stadium'},{h:'Senegal',a:'Irak',d:'16 Haz',v:'Lincoln Financial'},{h:'Fransa',a:'Irak',d:'22 Haz',v:'Lincoln Financial'},{h:'Norveç',a:'Senegal',d:'22 Haz',v:'Gillette Stadium'},{h:'Irak',a:'Norveç',d:'27 Haz',v:'BC Place'},{h:'Fransa',a:'Senegal',d:'27 Haz',v:'Estadio Azteca'}]},
  J:{t:[{n:'Arjantin',f:'🇦🇷'},{n:'Avusturya',f:'🇦🇹'},{n:'Cezayir',f:'🇩🇿'},{n:'Ürdün',f:'🇯🇴'}],
    fx:[{h:'Arjantin',a:'Avusturya',d:'16 Haz',v:'AT&T Stadium'},{h:'Cezayir',a:'Ürdün',d:'16 Haz',v:"Levi's Stadium"},{h:'Arjantin',a:'Cezayir',d:'22 Haz',v:'Hard Rock Stadium'},{h:'Avusturya',a:'Ürdün',d:'22 Haz',v:'NRG Stadium'},{h:'Ürdün',a:'Arjantin',d:'27 Haz',v:'Estadio BBVA'},{h:'Cezayir',a:'Avusturya',d:'27 Haz',v:'Estadio Akron'}]},
  K:{t:[{n:'Portekiz',f:'🇵🇹'},{n:'Kolombiya',f:'🇨🇴'},{n:'Özbekistan',f:'🇺🇿'},{n:'Kongo DR',f:'🇨🇩'}],
    fx:[{h:'Portekiz',a:'Özbekistan',d:'17 Haz',v:'NRG Stadium'},{h:'Kolombiya',a:'Kongo DR',d:'17 Haz',v:'Estadio Akron'},{h:'Portekiz',a:'Kongo DR',d:'23 Haz',v:'Mercedes-Benz Stadium'},{h:'Özbekistan',a:'Kolombiya',d:'23 Haz',v:'Arrowhead Stadium'},{h:'Kongo DR',a:'Özbekistan',d:'28 Haz',v:'Lumen Field'},{h:'Kolombiya',a:'Portekiz',d:'28 Haz',v:'Estadio Azteca'}]},
  L:{t:[{n:'İngiltere',f:'🏴󠁧󠁢󠁥󠁮󠁧󠁿'},{n:'Hırvatistan',f:'🇭🇷'},{n:'Gana',f:'🇬🇭'},{n:'Panama',f:'🇵🇦'}],
    fx:[{h:'İngiltere',a:'Hırvatistan',d:'17 Haz',v:'AT&T Stadium'},{h:'Gana',a:'Panama',d:'17 Haz',v:'BMO Field'},{h:'İngiltere',a:'Gana',d:'23 Haz',v:'Gillette Stadium'},{h:'Hırvatistan',a:'Panama',d:'23 Haz',v:'BMO Field'},{h:'Panama',a:'İngiltere',d:'28 Haz',v:'Lincoln Financial'},{h:'Hırvatistan',a:'Gana',d:'28 Haz',v:'BC Place'}]},
};
function getFlag(n){for(const g of GRP){const t=GROUPS[g].t.find(x=>x.n===n);if(t)return t.f;}return'🏳️';}

// ── MAÇTAN PUAN HESAPLA ───────────────────────────────────────
// Bir grup için maç sonuçlarından sıralama üret
function calcGroupRankingFromMatches(gid, matchWinners){
  // matchWinners: {0:'Meksika', 1:'draw', ...} — 6 maç için
  const teams = GROUPS[gid].t.map(t=>({n:t.n,pts:0,gf:0,ga:0,wins:0}));
  const tmap = {};teams.forEach(t=>tmap[t.n]=t);
  GROUPS[gid].fx.forEach((fx,i)=>{
    const w = matchWinners[i];
    if(!w)return;
    if(w==='draw'){tmap[fx.h]&&(tmap[fx.h].pts+=1);tmap[fx.a]&&(tmap[fx.a].pts+=1);}
    else if(w===fx.h){tmap[fx.h]&&(tmap[fx.h].pts+=3,tmap[fx.h].wins++);}
    else if(w===fx.a){tmap[fx.a]&&(tmap[fx.a].pts+=3,tmap[fx.a].wins++);}
  });
  return teams.sort((a,b)=>b.pts-a.pts||b.wins-a.wins);
}

// Eşit puanlı takımları bul
function findTiedGroups(gid, matchWinners, manualOrder){
  const ranking = calcGroupRankingFromMatches(gid, matchWinners);
  // Eşitlik var mı kontrol et
  const tied = [];
  for(let i=0;i<ranking.length-1;i++){
    if(ranking[i].pts===ranking[i+1].pts){
      // Bu iki takım eşit — manuel sıralama gerektiriyor
      const group = tied.find(g=>g.includes(ranking[i].n));
      if(group)group.push(ranking[i+1].n);
      else{
        const existing = tied.find(g=>g.includes(ranking[i+1].n));
        if(existing)existing.unshift(ranking[i].n);
        else tied.push([ranking[i].n,ranking[i+1].n]);
      }
    }
  }
  return {ranking, tied};
}

// ── SUPABASE ──────────────────────────────────────────────────
const DB={
  async q(path,opts={}){
    const r=await fetch(SB_URL+path,{...opts,headers:{'apikey':SB_KEY,'Authorization':'Bearer '+SB_KEY,'Content-Type':'application/json',...(opts.headers||{})}});
    const txt=await r.text();
    if(!r.ok){let m='DB hata '+r.status;try{const j=JSON.parse(txt);m=j.message||j.error||m;}catch(e){}throw new Error(m);}
    return txt?JSON.parse(txt):null;
  },
  getUser(u){return this.q(`/rest/v1/users?username=eq.${encodeURIComponent(u)}&select=id,username`);},
  login(u,h){return this.q(`/rest/v1/users?username=eq.${encodeURIComponent(u)}&password_hash=eq.${h}&select=id,username`);},
  createUser(u,h){return this.q('/rest/v1/users',{method:'POST',headers:{'Prefer':'return=representation'},body:JSON.stringify({username:u,password_hash:h})});},

  // Genel havuz prediction (sadece ranking sistemi)
  async getGeneralPred(uid){const d=await this.q(`/rest/v1/predictions?user_id=eq.${uid}&select=*`);return d&&d[0];},
  async saveGeneralPred(uid,data){
    const ex=await this.q(`/rest/v1/predictions?user_id=eq.${uid}&select=id`);
    const body=JSON.stringify({user_id:uid,...data,updated_at:new Date().toISOString()});
    if(ex&&ex.length)return this.q(`/rest/v1/predictions?user_id=eq.${uid}`,{method:'PATCH',headers:{'Prefer':'return=minimal'},body});
    return this.q('/rest/v1/predictions',{method:'POST',headers:{'Prefer':'return=minimal'},body});
  },

  // Ekip tahminleri (her ekip için ayrı, isimli)
  async getTeamPreds(uid){return this.q(`/rest/v1/team_preds?user_id=eq.${uid}&select=*`);},
  async saveTeamPred(uid,teamId,data){
    const ex=await this.q(`/rest/v1/team_preds?user_id=eq.${uid}&team_id=eq.${teamId}&select=id`);
    const body=JSON.stringify({user_id:uid,team_id:teamId,...data,updated_at:new Date().toISOString()});
    if(ex&&ex.length)return this.q(`/rest/v1/team_preds?user_id=eq.${uid}&team_id=eq.${teamId}`,{method:'PATCH',headers:{'Prefer':'return=minimal'},body});
    return this.q('/rest/v1/team_preds',{method:'POST',headers:{'Prefer':'return=minimal'},body});
  },

  // Ekipler
  getTeamByName(name){return this.q(`/rest/v1/teams?name=eq.${encodeURIComponent(name)}&select=id,name,password_hash,owner_id,max_members,max_predictions,visibility,pred_system`);},
  createTeam(name,pwHash,ownerId,settings){return this.q('/rest/v1/teams',{method:'POST',headers:{'Prefer':'return=representation'},body:JSON.stringify({name,password_hash:pwHash||null,owner_id:ownerId,...settings})});},
  getMyTeams(uid){return this.q(`/rest/v1/team_members?user_id=eq.${uid}&select=team_id,teams(id,name,max_members,max_predictions,visibility,pred_system)`);},
  joinTeam(teamId,userId){return this.q('/rest/v1/team_members',{method:'POST',headers:{'Prefer':'return=minimal'},body:JSON.stringify({team_id:teamId,user_id:userId})});},
  leaveTeam(teamId,userId){return this.q(`/rest/v1/team_members?team_id=eq.${teamId}&user_id=eq.${userId}`,{method:'DELETE'});},
  getTeamMembers(teamId){return this.q(`/rest/v1/team_members?team_id=eq.${teamId}&select=user_id,users(username)`);},
  getTeamPredictions(teamId){return this.q(`/rest/v1/team_preds?team_id=eq.${teamId}&select=user_id,pred_name,group_rankings,bracket,champion,system`);},

  // Liderlik
  allUsers(){return this.q('/rest/v1/users?select=id,username');},
  allGeneralPreds(){return this.q('/rest/v1/predictions?select=user_id,group_rankings,bracket,champion,best8,public');},
};
async function hashPw(p){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(p));return Array.from(new Uint8Array(b)).map(x=>x.toString(16).padStart(2,'0')).join('');}

// ── STATE ─────────────────────────────────────────────────────
const S={
  user:null,
  // Aktif tahmin oturumu
  session:{
    type:'general', // 'general' | 'team'
    teamId:null,
    teamName:'',
    teamPredSystem:'ranking', // 'ranking' | 'match' | 'both'
    predName:'',
    // Tahmin verisi
    data:{
      system:'ranking', // 'ranking' | 'match' | 'both'
      group_rankings:{},   // {A:['Meksika',...], ...}
      group_matches:{},    // {A:{0:'Meksika',1:'draw',...}, ...} — maç sistemi için
      group_tiebreaks:{},  // {A:['Meksika','Kore']} — eşit puan durumunda manuel sıra
      best8:[],
      bracket:{},
      champion:'',
      public:true,
    }
  },
  myTeams:[],
  generalPred:null,
  teamPredsMap:{}, // teamId -> pred data
  currentStep:0,
  steps:[],

  // Aktif tahminin grup sıralamasını hesapla
  getGroupRanking(gid){
    const d=this.session.data;
    if(d.system==='ranking'){
      const r=d.group_rankings[gid];
      return(r&&r.length===4)?[...r]:GROUPS[gid].t.map(t=>t.n);
    }
    // match veya both: maçlardan hesapla, sonra tiebreak uygula
    const mw=d.group_matches[gid]||{};
    const ranked=calcGroupRankingFromMatches(gid,mw);
    const names=ranked.map(r=>r.n);
    // tiebreak varsa uygula
    const tb=d.group_tiebreaks[gid];
    if(tb&&tb.length>0){
      // eşit puanlıların arasında tb sırasını uygula
      const pts=Object.fromEntries(ranked.map(r=>[r.n,r.pts]));
      return names.slice().sort((a,b)=>{
        if(pts[a]!==pts[b])return pts[b]-pts[a];
        const ai=tb.indexOf(a),bi=tb.indexOf(b);
        if(ai>=0&&bi>=0)return ai-bi;
        return 0;
      });
    }
    return names;
  },

  setGroupRanking(gid,arr){this.session.data.group_rankings[gid]=arr;},
  setMatchWinner(gid,matchIdx,winner){
    if(!this.session.data.group_matches[gid])this.session.data.group_matches[gid]={};
    this.session.data.group_matches[gid][matchIdx]=winner;
  },
  setTiebreak(gid,order){this.session.data.group_tiebreaks[gid]=order;},

  isGroupDone(gid){
    const d=this.session.data;
    if(d.system==='ranking'){
      const r=d.group_rankings[gid];
      if(!r||r.length<4)return false;
      return r.some((t,i)=>t!==GROUPS[gid].t[i].n);
    }
    // match sistemi: 6 maçın hepsi seçilmiş mi? Tiebreak zorunlu değil.
    const mw=d.group_matches[gid]||{};
    return Object.keys(mw).length>=6;
  },
  doneCount(){return GRP.filter(g=>this.isGroupDone(g)).length;},

  allThirds(){return GRP.map(g=>({gid:g,name:this.getGroupRanking(g)[2],flag:getFlag(this.getGroupRanking(g)[2])}));},
  toggleBest8(name){
    const b=this.session.data.best8;const i=b.indexOf(name);
    if(i>=0)b.splice(i,1);else if(b.length<8)b.push(name);else return false;
    return true;
  },

  r32team(src){
    if(src.t==='3'){const b=this.session.data.best8;const nm=b[src.slot];return nm?{n:nm,f:getFlag(nm),tbd:false}:{n:'En İyi 3. #'+(src.slot+1),f:'❓',tbd:true};}
    const r=this.getGroupRanking(src.g);const n=r[src.p-1];
    return n?{n,f:getFlag(n),tbd:false}:{n:'TBD',f:'❓',tbd:true};
  },
  matchTeams(rid,mi){
    if(rid==='r32')return R32[mi].map(s=>this.r32team(s));
    const ord=['r32','r16','qf','sf','final'];
    const prev=ord[ord.indexOf(rid)-1];
    const w=this.session.data.bracket[prev]||[];
    const mk=nm=>nm?{n:nm,f:getFlag(nm),tbd:false}:{n:'TBD',f:'❓',tbd:true};
    return[mk(w[mi*2]),mk(w[mi*2+1])];
  },
  winner(rid,mi){return(this.session.data.bracket[rid]||[])[mi]||null;},
  setWinner(rid,mi,team){
    if(!this.session.data.bracket[rid])this.session.data.bracket[rid]=[];
    this.session.data.bracket[rid][mi]=team;
    const ord=['r32','r16','qf','sf','final'];
    const idx=ord.indexOf(rid);
    for(let i=idx+1;i<ord.length;i++)this.session.data.bracket[ord[i]]=[];
    if(rid==='final')this.session.data.champion=team;
  },

  buildSteps(){
    const sys=this.session.data.system;
    // 'both' = ekip kurucusu her iki sistemi de serbest bıraktı
    // Her kullanıcı kendi istediği sistemi seçer, buildSteps kullanıcının seçimine göre çalışır
    const groupSteps=GRP.map(id=>({type:sys==='ranking'?'group_rank':'group_match',id}));
    this.steps=[
      ...groupSteps,
      {type:'summary'},
      {type:'best8'},
      ...ELIM_ROUNDS.map(r=>({type:'elim',...r})),
    ];
  },
};

// ── TEMA & YARDIMCILAR ────────────────────────────────────────
function toggleTheme(){const n=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=n;document.getElementById('theme-btn').textContent=n==='dark'?'🌙':'☀️';localStorage.setItem('wc_theme',n);}
function loadTheme(){const t=localStorage.getItem('wc_theme')||'dark';document.documentElement.dataset.theme=t;const b=document.getElementById('theme-btn');if(b)b.textContent=t==='dark'?'🌙':'☀️';}
function toast(msg,type='ok'){const w=document.getElementById('toast-wrap');const el=document.createElement('div');el.className='toast toast-'+type;el.textContent=msg;w.appendChild(el);setTimeout(()=>el.remove(),3000);}
function mc(){return document.getElementById('main-content');}
function openModal(html){document.getElementById('modal-box').innerHTML=html;document.getElementById('modal').classList.add('open');}
function closeModal(e){if(!e||e.target===document.getElementById('modal'))document.getElementById('modal').classList.remove('open');}
function setMode(m){
  document.getElementById('step-bar').style.display=m==='predict'?'block':'none';
  document.querySelector('.save-fab').style.display=m==='predict'?'flex':'none';
}
function tpw(id,btn){const el=document.getElementById(id);el.type=el.type==='password'?'text':'password';btn.textContent=el.type==='password'?'👁':'🙈';}

// ── AUTH ──────────────────────────────────────────────────────
let _sm='login';
function splashTab(m){_sm=m;document.getElementById('stab-login').classList.toggle('active',m==='login');document.getElementById('stab-reg').classList.toggle('active',m==='register');renderSplashForm();}
function serr(msg){const el=document.getElementById('serr');if(el)el.textContent=msg;}

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

async function doLogin(){
  const u=document.getElementById('su').value.trim(),p=document.getElementById('sp').value;
  serr('');if(!u||!p){serr('Tüm alanları doldur.');return;}serr('Giriş yapılıyor...');
  try{const h=await hashPw(p);const r=await DB.login(u,h);if(!r||!r.length){serr('Kullanıcı adı veya şifre hatalı.');return;}await loginOK(r[0]);}
  catch(e){serr('Hata: '+e.message);}
}
async function doRegister(){
  const u=document.getElementById('su').value.trim(),p=document.getElementById('sp').value,p2=document.getElementById('sp2')?document.getElementById('sp2').value:'';
  serr('');
  if(!u||!p){serr('Tüm alanları doldur.');return;}
  if(u.length<3){serr('Kullanıcı adı en az 3 karakter.');return;}
  if(p.length<6){serr('Şifre en az 6 karakter.');return;}
  if(p2&&p!==p2){serr('Şifreler eşleşmiyor.');return;}
  serr('Kontrol ediliyor...');
  try{
    const ex=await DB.getUser(u);if(ex&&ex.length){serr('Bu kullanıcı adı alınmış.');return;}
    const h=await hashPw(p);const r=await DB.createUser(u,h);
    if(!r||!r.length){serr('Kayıt başarısız.');return;}
    await loginOK(r[0]);
  }catch(e){serr('Hata: '+e.message);}
}

async function loginOK(user){
  S.user=user;localStorage.setItem('wc_user',JSON.stringify(user));
  try{
    const[gp,teamsRaw]=await Promise.all([DB.getGeneralPred(user.id),DB.getMyTeams(user.id)]);
    S.generalPred=gp||null;
    S.myTeams=(teamsRaw||[]).map(r=>r.teams).filter(Boolean);
  }catch(e){console.warn(e);}
  document.getElementById('splash-screen').style.display='none';
  document.getElementById('main-app').style.display='block';
  updateHeader();showMainMenu();toast('Hoş geldin, '+user.username+'! 👋');
}

function doLogout(){
  S.user=null;S.myTeams=[];S.generalPred=null;S.teamPredsMap={};S.currentStep=0;
  localStorage.removeItem('wc_user');
  document.getElementById('main-app').style.display='none';
  document.getElementById('splash-screen').style.display='flex';
  _sm='login';renderSplashForm();
}

// ── HEADER ────────────────────────────────────────────────────
function updateHeader(){
  const lock=document.getElementById('hdr-lock');
  if(lock){const now=new Date();if(now>=WC_KICKOFF)lock.textContent='⚽ Turnuva başladı!';else{const d=WC_KICKOFF-now;lock.textContent=`⏳ ${Math.floor(d/86400000)}g ${Math.floor((d%86400000)/3600000)}s ${Math.floor((d%3600000)/60000)}dk`;}}
  const ua=document.getElementById('hdr-user-area');
  if(ua&&S.user){ua.innerHTML=`<div class="hdr-chip"><div class="hdr-av">${S.user.username[0].toUpperCase()}</div><span class="hdr-uname">${S.user.username}</span><button class="hdr-out" onclick="doLogout()">Çıkış</button></div>`;}
}

// ── ANA MENÜ ──────────────────────────────────────────────────
function showMainMenu(){
  setMode('menu');
  const hasPred=!!S.generalPred||(Object.keys(S.teamPredsMap).length>0);
  mc().innerHTML=`
    <div class="menu-page">
      <div class="menu-hero">
        <div class="menu-welcome">Hoş geldin,</div>
        <div class="menu-username">${S.user.username}</div>
        ${S.myTeams.length>0?`<div class="menu-team-badge">👥 ${S.myTeams.length} ekipte üyesin</div>`:''}
      </div>
      <div class="menu-cards">
        <button class="menu-card menu-primary" onclick="showStartPredict()">
          <div class="mc-icon">⚽</div>
          <div class="mc-text"><div class="mc-title">Tahmine Başla</div><div class="mc-sub">Yeni tahmin oluştur veya güncelle</div></div>
          <div class="mc-arr">›</div>
        </button>
        ${hasPred?`<button class="menu-card" onclick="showMyPreds()">
          <div class="mc-icon">📋</div>
          <div class="mc-text"><div class="mc-title">Tahminlerime Göz At</div><div class="mc-sub">Mevcut tahminlerini görüntüle</div></div>
          <div class="mc-arr">›</div>
        </button>`:''}
        <button class="menu-card" onclick="showTeamHub()">
          <div class="mc-icon">👥</div>
          <div class="mc-text">
            <div class="mc-title">Ekip Yönetimi</div>
            <div class="mc-sub">${S.myTeams.length>0?S.myTeams.map(t=>t.name).join(', '):'Ekip kur veya katıl'}</div>
          </div>
          <div class="mc-arr">›</div>
        </button>
        <button class="menu-card" onclick="showLeaderboard()">
          <div class="mc-icon">🏅</div>
          <div class="mc-text"><div class="mc-title">Liderlik & İstatistik</div><div class="mc-sub">Genel sıralamalar</div></div>
          <div class="mc-arr">›</div>
        </button>
      </div>
    </div>`;
}

// ── TAHMİNE BAŞLA ─────────────────────────────────────────────
function showStartPredict(){
  setMode('menu');
  mc().innerHTML=`
    <div class="page">
      <button class="back-btn" onclick="showMainMenu()">‹ Ana Menü</button>
      <div class="sum-title" style="margin-top:12px">⚽ Tahmine Başla</div>
      <p class="page-sub">Tahminin nereye gönderilsin? Sistem ne olsun?</p>

      <div class="pool-section">
        <div class="pool-section-title">🌍 Genel Havuz</div>
        <p class="pool-note">Sadece <b>Grup Sıralaması</b> sistemiyle. Kişi başı max 1 tahmin.</p>
        <button class="menu-card menu-primary" style="margin-top:8px" onclick="startSession('general',null,'ranking')">
          <div class="mc-icon">🌍</div>
          <div class="mc-text"><div class="mc-title">Genel Havuzda Tahmin</div><div class="mc-sub">Herkesin görebileceği tabloya katıl</div></div>
          <div class="mc-arr">›</div>
        </button>
      </div>

      ${S.myTeams.length>0?`
      <div class="pool-section">
        <div class="pool-section-title">👥 Ekiplerim</div>
        ${S.myTeams.map(t=>`
          <button class="menu-card" style="margin-top:8px" onclick="showTeamPredSetup('${t.id}','${t.name.replace(/'/g,"\\'")}','${t.pred_system||'ranking'}')">
            <div class="mc-icon">👥</div>
            <div class="mc-text">
              <div class="mc-title">${t.name}</div>
              <div class="mc-sub">Sistem: ${{'ranking':'Grup Sıralaması','match':'Maç Maç','both':'Serbest'}[t.pred_system||'ranking']}</div>
            </div>
            <div class="mc-arr">›</div>
          </button>`).join('')}
      </div>`:''}

      <div class="pool-section">
        <div class="pool-section-title">➕ Ekip</div>
        <div class="menu-cards" style="margin-top:8px">
          <button class="menu-card" onclick="showCreateTeam()"><div class="mc-icon">🏗️</div><div class="mc-text"><div class="mc-title">Ekip Kur</div><div class="mc-sub">Yeni ekip oluştur</div></div><div class="mc-arr">›</div></button>
          <button class="menu-card" onclick="showJoinTeam()"><div class="mc-icon">🤝</div><div class="mc-text"><div class="mc-title">Ekibe Katıl</div><div class="mc-sub">Mevcut ekibe gir</div></div><div class="mc-arr">›</div></button>
        </div>
      </div>
    </div>`;
}

function showTeamPredSetup(teamId,teamName,teamSystem){
  const sysLabel={'ranking':'Grup Sıralaması','match':'Maç Maç Kazanan','both':'Serbest (ikisi de)'};
  mc().innerHTML=`
    <div class="page">
      <button class="back-btn" onclick="showStartPredict()">‹ Geri</button>
      <div class="sum-title" style="margin-top:12px">👥 ${teamName}</div>
      <p class="page-sub">Bu ekip için tahmin oluştur. İsim ver; boş bırakırsan ekip adıyla anılır.</p>
      <div class="form-card">
        <div class="sfield">
          <label>Tahmin Adı <small>(isteğe bağlı)</small></label>
          <input class="sinp" id="pred-name" placeholder="${teamName} Tahmini"/>
        </div>
        ${teamSystem==='both'?`
        <div class="sfield">
          <label>Tahmin Sistemi</label>
          <select class="sinp" id="pred-sys">
            <option value="ranking">📋 Grup Sıralaması — takımları elle sırala</option>
            <option value="match">⚽ Maç Maç Kazanan — her maçın galibini seç</option>
          </select>
        </div>
        <p class="pool-note">Bu ekipte her üye istediği sistemi seçebilir.</p>`
        :`<div class="pool-note">Sistem: <b>${sysLabel[teamSystem]}</b></div>`}
      </div>
      <div class="page-actions">
        <button class="btn-primary btn-next" onclick="startSessionFromTeam('${teamId}','${teamSystem}')">Tahmine Başla →</button>
      </div>
    </div>`;
}

function startSessionFromTeam(teamId,teamSystem){
  const predNameEl=document.getElementById('pred-name');
  const predSysEl=document.getElementById('pred-sys');
  const predName=predNameEl?predNameEl.value.trim():'';
  // both ise kullanıcının seçimine bak, yoksa ekip sistemini kullan
  const actualSystem=predSysEl?predSysEl.value:teamSystem;
  S.session.type='team';
  S.session.teamId=teamId;
  S.session.teamName=S.myTeams.find(t=>t.id===teamId)?.name||'';
  S.session.predName=predName||S.session.teamName;
  const existing=S.teamPredsMap[teamId];
  S.session.data={
    system:actualSystem,
    group_rankings:existing?.group_rankings||{},
    group_matches:existing?.group_matches||{},
    group_tiebreaks:existing?.group_tiebreaks||{},
    best8:existing?.best8||[],
    bracket:existing?.bracket||{},
    champion:existing?.champion||'',
    public:false,
  };
  S.currentStep=0;
  S.buildSteps();
  setMode('predict');
  renderCurrentStep();
}

function startSession(type,teamId,system){
  const predNameEl=document.getElementById('pred-name');
  const predName=predNameEl?predNameEl.value.trim():'';
  S.session.type=type;
  S.session.teamId=teamId;
  S.session.teamName=teamId?S.myTeams.find(t=>t.id===teamId)?.name||'':'';
  S.session.teamPredSystem=system;
  S.session.predName=predName||S.session.teamName||'';

  // Mevcut tahmin varsa yükle
  if(type==='general'&&S.generalPred){
    S.session.data={system:'ranking',group_rankings:S.generalPred.group_rankings||{},group_matches:{},group_tiebreaks:{},best8:S.generalPred.best8||[],bracket:S.generalPred.bracket||{},champion:S.generalPred.champion||'',public:true};
  } else if(type==='team'&&S.teamPredsMap[teamId]){
    const tp=S.teamPredsMap[teamId];
    S.session.data={system,group_rankings:tp.group_rankings||{},group_matches:tp.group_matches||{},group_tiebreaks:tp.group_tiebreaks||{},best8:tp.best8||[],bracket:tp.bracket||{},champion:tp.champion||'',public:false};
  } else {
    S.session.data={system,group_rankings:{},group_matches:{},group_tiebreaks:{},best8:[],bracket:{},champion:'',public:type==='general'};
  }

  S.session.data.system=system;
  S.currentStep=0;
  S.buildSteps();
  setMode('predict');
  renderCurrentStep();
}

// ── STEP BAR ──────────────────────────────────────────────────
function renderStepBar(){
  const step=S.steps[S.currentStep];
  const lbl=step.type==='group_rank'?`Grup ${step.id} — Sıralama`:step.type==='group_match'?`Grup ${step.id} — Maçlar`:step.type==='summary'?'Grup Özeti':step.type==='best8'?'En İyi 8 Üçüncü':step.label;
  const pct=Math.round((S.currentStep/(S.steps.length-1))*100);
  document.getElementById('step-bar').innerHTML=`<div class="sb-wrap">
    <button class="sb-back${S.currentStep===0?' ghost':''}" onclick="stepNav(-1)">‹</button>
    <div class="sb-center">
      <div class="sb-label">${lbl}</div>
      <div class="sb-prog"><div class="sb-prog-f" style="width:${pct}%"></div></div>
      <div class="sb-info">Adım ${S.currentStep+1}/${S.steps.length} · ${S.session.type==='general'?'🌍 Genel':'👥 '+S.session.teamName}</div>
    </div>
    <button class="sb-home-big" onclick="showMainMenu()">🏠 Ana Menü</button>
  </div>`;
}

function stepNav(dir){
  const n=S.currentStep+dir;
  if(n<0||n>=S.steps.length)return;
  S.currentStep=n;autoSave();renderCurrentStep();
}

function renderCurrentStep(){
  renderStepBar();
  const s=S.steps[S.currentStep];
  if(s.type==='group_rank')renderGroupRanking(s.id);
  else if(s.type==='group_match')renderGroupMatches(s.id);
  else if(s.type==='summary')renderSummary();
  else if(s.type==='best8')renderBest8();
  else renderElim(s.id,s.label,s.n);
}

// ── GRUP SIRALAMA ─────────────────────────────────────────────
function renderGroupRanking(gid){
  const ranking=S.session.data.system==='both'
    ?S.getGroupRanking(gid)
    :(() => {const r=S.session.data.group_rankings[gid];return(r&&r.length===4)?[...r]:GROUPS[gid].t.map(t=>t.n);})();
  const locked=IS_LOCKED;
  const gIdx=GRP.indexOf(gid);const isLast=gIdx===GRP.length-1;
  mc().innerHTML=`
    <div class="page">
      <div class="grp-topbar">
        <div class="grp-badge">Grup ${gid}</div>
        <button class="btn-fix" onclick="showFixture('${gid}')">📅 Fikstür</button>
      </div>
      <p class="grp-hint">${locked?'🔒 Kilitli':S.session.data.system==='both'?'Maç sonuçlarına göre hesaplanan sıra — eşitlikleri sürükle-bırak ile çöz':'↕ Sürükle-bırak ile tahmin sıranı belirle'}</p>
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
  const descs=["1. sıra — Son 32","2. sıra — Son 32","3. sıra — En iyi 8 havuzu","4. sıra — elenmiş"];
  return`<div class="rank-row pos-${i+1}" draggable="${!locked}" data-idx="${i}" data-name="${nm}"
    ${!locked?`ondragstart="ds(event,'${gid}',${i})" ondragover="dov(event)" ondrop="dp(event,'${gid}')" ondragend="de()"
    ontouchstart="ts(event,'${gid}')" ontouchmove="tm(event)" ontouchend="te(event,'${gid}')" style="touch-action:none"`:''}
  ><div class="rr-num">${i+1}</div>
    <div class="rr-team"><span class="rr-flag">${f}</span><div class="rr-info"><div class="rr-name">${nm}</div><div class="rr-desc">${descs[i]}</div></div></div>
    <div class="rr-badge ${badges[i]}">${labels[i]}</div>
    <div class="rr-drag">${locked?'':'⠿'}</div>
  </div>`;
}

let _dg=null,_di=null,_tr=null;
function initDrag(){}
function ds(e,g,i){_dg=g;_di=i;e.currentTarget.classList.add('dragging');e.dataTransfer.effectAllowed='move';}
function dov(e){e.preventDefault();const t=e.target.closest('.rank-row');if(t){document.querySelectorAll('.rank-row').forEach(r=>r.classList.remove('drag-over'));t.classList.add('drag-over');}}
function de(){document.querySelectorAll('.rank-row').forEach(r=>r.classList.remove('dragging','drag-over'));}
function dp(e,gid){
  e.preventDefault();de();
  const t=e.target.closest('.rank-row');if(!t||_dg!==gid)return;
  const ti=parseInt(t.dataset.idx);if(_di===ti)return;
  const sys=S.session.data.system;
  if(sys==='ranking'){
    const r=S.session.data.group_rankings[gid]||(GROUPS[gid].t.map(t=>t.n));
    const[m]=r.splice(_di,1);r.splice(ti,0,m);S.setGroupRanking(gid,r);
  } else {
    // both: sadece tiebreak için sürükle
    const ranking=S.getGroupRanking(gid);
    const[m]=ranking.splice(_di,1);ranking.splice(ti,0,m);S.setTiebreak(gid,ranking);
  }
  renderGroupRanking(gid);
}
function ts(e,gid){_tr=e.currentTarget;_tr.classList.add('dragging');}
function tm(e){if(!_tr)return;e.preventDefault();document.querySelectorAll('.rank-row').forEach(r=>r.classList.remove('drag-over'));const el=document.elementFromPoint(e.touches[0].clientX,e.touches[0].clientY);const t=el?.closest('.rank-row');if(t&&t!==_tr)t.classList.add('drag-over');}
function te(e,gid){
  if(!_tr)return;
  const rows=Array.from(_tr.parentNode.querySelectorAll('.rank-row'));
  const tgt=rows.find(r=>r.classList.contains('drag-over'));
  rows.forEach(r=>r.classList.remove('dragging','drag-over'));
  if(tgt){
    const fi=parseInt(_tr.dataset.idx),ti=parseInt(tgt.dataset.idx);
    if(fi!==ti){
      const sys=S.session.data.system;
      if(sys==='ranking'){
        const r=S.session.data.group_rankings[gid]||GROUPS[gid].t.map(t=>t.n);
        const[m]=r.splice(fi,1);r.splice(ti,0,m);S.setGroupRanking(gid,r);
      } else {
        const ranking=S.getGroupRanking(gid);
        const[m]=ranking.splice(fi,1);ranking.splice(ti,0,m);S.setTiebreak(gid,ranking);
      }
    }
  }
  _tr=null;renderGroupRanking(gid);
}

// ── GRUP MAÇLARI ──────────────────────────────────────────────
function renderGroupMatches(gid){
  const g=GROUPS[gid];
  const locked=IS_LOCKED;
  const mw=S.session.data.group_matches[gid]||{};
  const gIdx=GRP.indexOf(gid);
  const isLast=gIdx===GRP.length-1;
  const doneCnt=Object.keys(mw).length;
  const totalCnt=g.fx.length;
  const allPicked=doneCnt===totalCnt;

  // Grup sıralaması ve eşitlik bölümü (tüm maçlar seçiliyse)
  let rankingSection='';
  if(allPicked){
    rankingSection=buildMatchRankingSection(gid,mw,isLast);
  }

  mc().innerHTML=`
    <div class="page">
      <div class="grp-topbar">
        <div class="grp-badge">Grup ${gid}</div>
        <div class="grp-pts-preview" id="grp-pts-${gid}"></div>
      </div>

      <div class="match-progress-bar" id="match-progress-${gid}">
        <div class="mp-track"><div class="mp-fill" id="mp-fill-${gid}" style="width:${Math.round(doneCnt/totalCnt*100)}%"></div></div>
        <span class="mp-txt" id="mp-txt-${gid}">${doneCnt}/${totalCnt} maç seçildi</span>
      </div>

      <p class="grp-hint">${locked?'🔒 Kilitli':'Kazananı seç. Beraberlik için ortadaki <b>=</b> butonuna bas.'}</p>

      <div class="match-list-group">
        ${g.fx.map((fx,i)=>{
          const w=mw[i];
          return`<div class="group-match-card${w?' gmc-picked':''}" data-gid="${gid}" data-match-idx="${i}">
            <div class="gmc-date">📅 ${fx.d} · 🏟 ${fx.v}</div>
            <div class="gmc-teams">
              <button class="gmc-btn gmc-btn-home${w===fx.h?' gmc-sel':''}"
                ${!locked?`onclick="pickMatch('${gid}',${i},'${fx.h.replace(/'/g,"\\'")}')"`:'disabled'}>
                <span class="gmc-flag">${getFlag(fx.h)}</span>
                <span class="gmc-name">${fx.h}</span>
              </button>
              <button class="gmc-btn gmc-btn-draw${w==='draw'?' gmc-sel':''}"
                ${!locked?`onclick="pickMatch('${gid}',${i},'draw')"`:'disabled'}>
                <span class="gmc-eq">=</span>
              </button>
              <button class="gmc-btn gmc-btn-away${w===fx.a?' gmc-sel':''}"
                ${!locked?`onclick="pickMatch('${gid}',${i},'${fx.a.replace(/'/g,"\\'")}')"`:'disabled'}>
                <span class="gmc-name">${fx.a}</span>
                <span class="gmc-flag">${getFlag(fx.a)}</span>
              </button>
            </div>
          </div>`;
        }).join('')}
      </div>

      <div id="ranking-section-${gid}">
        ${rankingSection}
      </div>
    </div>`;

  updateGroupPtsPreview(gid,mw);
}

// Tüm maçlar seçilince gösterilen sıralama + ileri butonu
function buildMatchRankingSection(gid,mw,isLast){
  const gIdx=GRP.indexOf(gid);
  const ranked=calcGroupRankingFromMatches(gid,mw);
  const tb=S.session.data.group_tiebreaks[gid]||[];

  // Eşitlik grupları
  const tiedGroups=[];
  for(let i=0;i<ranked.length-1;i++){
    if(ranked[i].pts===ranked[i+1].pts){
      const existing=tiedGroups.find(g=>g.includes(ranked[i].n));
      if(existing){ if(!existing.includes(ranked[i+1].n)) existing.push(ranked[i+1].n); }
      else {
        const existing2=tiedGroups.find(g=>g.includes(ranked[i+1].n));
        if(existing2){ if(!existing2.includes(ranked[i].n)) existing2.unshift(ranked[i].n); }
        else tiedGroups.push([ranked[i].n,ranked[i+1].n]);
      }
    }
  }
  const hasTie=tiedGroups.length>0;
  const allTied=tiedGroups.flat();

  // Tiebreak uygulanmış sıralamayı hesapla
  const finalRanked=[...ranked].sort((a,b)=>{
    if(a.pts!==b.pts) return b.pts-a.pts;
    const ai=tb.indexOf(a.n), bi=tb.indexOf(b.n);
    if(ai>=0&&bi>=0) return ai-bi;
    return 0;
  });

  const badges=['b-pass','b-pass','b-third','b-out'];
  const labels=['Son 32 ✓','Son 32 ✓','3. Sıra Adayı','Elendi'];

  const rowsHtml=finalRanked.map((r,i)=>{
    const isTied=allTied.includes(r.n);
    const tgIdx=tiedGroups.findIndex(tg=>tg.includes(r.n));
    // Bu satırdaki pozisyon tgIdx'teki grupta
    const tiedGroupOrdered=tgIdx>=0
      ? (tb.length>0
          ? [...tiedGroups[tgIdx]].sort((a,b)=>{ const ai=tb.indexOf(a),bi=tb.indexOf(b); return (ai<0?99:ai)-(bi<0?99:bi); })
          : tiedGroups[tgIdx])
      : [];
    const posInGroup=tiedGroupOrdered.indexOf(r.n);

    if(isTied){
      return`<div class="rank-row pos-${i+1} tie-row" draggable="true"
          data-name="${r.n}" data-tg="${tgIdx}" data-pos="${posInGroup}"
          ondragstart="dsTie(event,'${gid}',${tgIdx},${posInGroup})"
          ondragover="dov(event)" ondrop="dpTie(event,'${gid}',${tgIdx})" ondragend="de()"
          ontouchstart="tsTie(event,'${gid}',${tgIdx})" ontouchmove="tm(event)" ontouchend="teTie(event,'${gid}',${tgIdx})"
          style="touch-action:none">
        <div class="rr-num">${i+1}</div>
        <div class="rr-team">
          <span class="rr-flag">${getFlag(r.n)}</span>
          <div class="rr-info">
            <div class="rr-name">${r.n}</div>
            <div class="rr-desc tie-row-hint">⚖️ ${r.pts} puan — eşit, sürükle sırala</div>
          </div>
        </div>
        <div class="rr-badge ${badges[i]}">${labels[i]}</div>
        <div class="rr-drag">⠿</div>
      </div>`;
    } else {
      return`<div class="rank-row pos-${i+1} rank-fixed">
        <div class="rr-num">${i+1}</div>
        <div class="rr-team">
          <span class="rr-flag">${getFlag(r.n)}</span>
          <div class="rr-info">
            <div class="rr-name">${r.n}</div>
            <div class="rr-desc">${r.pts} puan · ${r.wins} galibiyet</div>
          </div>
        </div>
        <div class="rr-badge ${badges[i]}">${labels[i]}</div>
        <div class="rr-drag" style="visibility:hidden">·</div>
      </div>`;
    }
  }).join('');

  const tieNotice=hasTie
    ? `<div class="tie-notice">
        <span class="tie-notice-icon">⚖️</span>
        <span>Eşit puanlı takımlar var — sarı satırları sürükleyerek sırayı belirle</span>
       </div>`
    : '';

  const nextLabel=isLast?'Özete Git →':`Grup ${GRP[gIdx+1]} →`;

  return`<div class="match-ranking-section">
    <div class="match-ranking-header">
      <div class="match-ranking-title">Grup ${gid} Sıralaması</div>
    </div>
    ${tieNotice}
    <div class="rank-table">${rowsHtml}</div>
    <div class="page-actions" style="padding-top:14px">
      <button class="btn-primary btn-next" onclick="stepNav(1)">${nextLabel}</button>
    </div>
  </div>`;
}

function pickMatch(gid,matchIdx,winner){
  if(IS_LOCKED)return;
  S.setMatchWinner(gid,matchIdx,winner);
  const mw=S.session.data.group_matches[gid]||{};
  const g=GROUPS[gid];

  // Butonları in-place güncelle
  const card=document.querySelector(`.group-match-card[data-gid="${gid}"][data-match-idx="${matchIdx}"]`);
  if(card){
    const fx=g.fx[matchIdx];
    card.querySelector('.gmc-btn-home')?.classList.toggle('gmc-sel',winner===fx.h);
    card.querySelector('.gmc-btn-draw')?.classList.toggle('gmc-sel',winner==='draw');
    card.querySelector('.gmc-btn-away')?.classList.toggle('gmc-sel',winner===fx.a);
    card.classList.toggle('gmc-picked',!!winner);
  }

  // İlerleme çubuğu
  const done=Object.keys(mw).length;
  const total=g.fx.length;
  const fill=document.getElementById(`mp-fill-${gid}`);
  const txt=document.getElementById(`mp-txt-${gid}`);
  if(fill) fill.style.width=`${Math.round(done/total*100)}%`;
  if(txt)  txt.textContent=`${done}/${total} maç seçildi`;

  // Puan önizleme
  updateGroupPtsPreview(gid,mw);

  // Tüm maçlar seçildi mi? → Sıralama bölümünü göster/güncelle
  const gIdx=GRP.indexOf(gid);
  const isLast=gIdx===GRP.length-1;
  const allPicked=done===total;
  const rankSec=document.getElementById(`ranking-section-${gid}`);
  if(rankSec){
    if(allPicked){
      rankSec.innerHTML=buildMatchRankingSection(gid,mw,isLast);
      // Sırlamaya kaydır
      setTimeout(()=>rankSec.scrollIntoView({behavior:'smooth',block:'start'}),100);
    } else {
      rankSec.innerHTML='';
    }
  }

  autoSave();
}

function updateGroupPtsPreview(gid,mw){
  const el=document.getElementById(`grp-pts-${gid}`);if(!el)return;
  if(Object.keys(mw).length===0){ el.innerHTML=''; return; }
  const ranked=calcGroupRankingFromMatches(gid,mw);
  el.innerHTML=ranked.map(r=>`<span class="pts-chip pts-chip-${r.pts>=6?'hi':r.pts>=3?'mid':'lo'}">${getFlag(r.n)} <b>${r.pts}p</b></span>`).join('');
}

// Tie drag
let _tieDrag={gid:null,tgIdx:null,fromName:null};

function dsTie(e,gid,tgIdx,posInTg){
  const fromName=e.currentTarget.dataset.name;
  _tieDrag={gid,tgIdx,fromName};
  e.currentTarget.classList.add('dragging');
  e.dataTransfer.effectAllowed='move';
}

function dpTie(e,gid,tgIdx){
  e.preventDefault();de();
  const t=e.target.closest('.tie-row');
  if(!t||_tieDrag.gid!==gid)return;
  const toName=t.dataset.name;
  if(!toName||_tieDrag.fromName===toName)return;

  const mw=S.session.data.group_matches[gid]||{};
  // Eşitlik gruplarını hesapla
  const ranked=calcGroupRankingFromMatches(gid,mw);
  const tiedGroups=_getTiedGroups(ranked);
  const tg=tiedGroups[tgIdx]||[];
  if(!tg.includes(_tieDrag.fromName)||!tg.includes(toName))return;

  const cur=S.session.data.group_tiebreaks[gid]?[...S.session.data.group_tiebreaks[gid]]:[...tg];
  if(!cur.includes(_tieDrag.fromName)) cur.push(...tg.filter(n=>!cur.includes(n)));
  if(!cur.includes(toName)) cur.push(...tg.filter(n=>!cur.includes(n)));
  const fi=cur.indexOf(_tieDrag.fromName);
  const ti=cur.indexOf(toName);
  const[moved]=cur.splice(fi,1);
  cur.splice(ti,0,moved);
  S.setTiebreak(gid,cur);
  _refreshRankingSection(gid);
}

let _tieTouchDrag={gid:null,tgIdx:null,el:null,fromName:null};
function tsTie(e,gid,tgIdx){
  const el=e.currentTarget;
  _tieTouchDrag={gid,tgIdx,el,fromName:el.dataset.name};
  el.classList.add('dragging');
}
function teTie(e,gid,tgIdx){
  if(!_tieTouchDrag.el)return;
  const container=_tieTouchDrag.el.closest('.rank-table')||_tieTouchDrag.el.parentNode;
  const rows=Array.from(container.querySelectorAll('.tie-row'));
  const tgt=rows.find(r=>r.classList.contains('drag-over'));
  rows.forEach(r=>r.classList.remove('dragging','drag-over'));
  if(tgt){
    const toName=tgt.dataset.name;
    if(toName&&_tieTouchDrag.fromName!==toName){
      const mw=S.session.data.group_matches[gid]||{};
      const ranked=calcGroupRankingFromMatches(gid,mw);
      const tiedGroups=_getTiedGroups(ranked);
      const tg=tiedGroups[tgIdx]||[];
      const cur=S.session.data.group_tiebreaks[gid]?[...S.session.data.group_tiebreaks[gid]]:[...tg];
      if(!cur.includes(_tieTouchDrag.fromName)) cur.push(...tg.filter(n=>!cur.includes(n)));
      if(!cur.includes(toName)) cur.push(...tg.filter(n=>!cur.includes(n)));
      const fi=cur.indexOf(_tieTouchDrag.fromName);
      const ti=cur.indexOf(toName);
      const[moved]=cur.splice(fi,1);cur.splice(ti,0,moved);
      S.setTiebreak(gid,cur);
    }
  }
  _tieTouchDrag={gid:null,tgIdx:null,el:null,fromName:null};
  _refreshRankingSection(gid);
}

// Eşitlik gruplarını ranked dizisinden çıkar
function _getTiedGroups(ranked){
  const groups=[];
  for(let i=0;i<ranked.length-1;i++){
    if(ranked[i].pts===ranked[i+1].pts){
      const ex=groups.find(g=>g.includes(ranked[i].n));
      if(ex){ if(!ex.includes(ranked[i+1].n)) ex.push(ranked[i+1].n); }
      else {
        const ex2=groups.find(g=>g.includes(ranked[i+1].n));
        if(ex2){ if(!ex2.includes(ranked[i].n)) ex2.unshift(ranked[i].n); }
        else groups.push([ranked[i].n,ranked[i+1].n]);
      }
    }
  }
  return groups;
}

function _refreshRankingSection(gid){
  const mw=S.session.data.group_matches[gid]||{};
  const gIdx=GRP.indexOf(gid);
  const isLast=gIdx===GRP.length-1;
  const rankSec=document.getElementById(`ranking-section-${gid}`);
  if(rankSec) rankSec.innerHTML=buildMatchRankingSection(gid,mw,isLast);
}

// ── FİKSTÜR ──────────────────────────────────────────────────
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

// ── ÖZET ──────────────────────────────────────────────────────
function renderSummary(){
  mc().innerHTML=`
    <div class="page">
      <div class="sum-title">📋 Grup Özeti</div>
      <p class="sum-sub">${S.doneCount()}/12 grup tamamlandı</p>
      <div class="sum-table">
        ${GRP.map(g=>{
          const r=S.getGroupRanking(g);
          return`<div class="sum-row"><div class="sum-gid">Grup ${g}</div><div class="sum-teams">
            <span class="stag pass">${getFlag(r[0])} ${r[0]}</span>
            <span class="stag pass">${getFlag(r[1])} ${r[1]}</span>
            <span class="stag third">${getFlag(r[2])} ${r[2]}</span>
          </div></div>`;
        }).join('')}
      </div>
      <div class="page-actions"><button class="btn-primary btn-next" onclick="stepNav(1)">En İyi 8 Üçüncüyü Seç →</button></div>
    </div>`;
}

// ── EN İYİ 8 ──────────────────────────────────────────────────
function renderBest8(){
  const thirds=S.allThirds();
  const sel=S.session.data.best8;
  const locked=IS_LOCKED;
  mc().innerHTML=`
    <div class="page">
      <div class="best8-header">
        <div class="best8-title">🥉 En İyi 8 Üçüncü</div>
        <div class="best8-sub">Son 32'ye 8 üçüncü dahil olur. Hangilerinin geçeceğini tahmin et.</div>
      </div>
      <div class="best8-counter">
        <div class="b8c-bar"><div class="b8c-fill" id="b8-fill" style="width:${Math.round(sel.length/8*100)}%"></div></div>
        <span class="b8c-txt" id="b8-txt"><b>${sel.length}</b>/8 seçildi</span>
      </div>
      ${locked?`<div class="locked-banner">🔒 Kilitlendi.</div>`:''}
      <div class="best8-list" id="best8-list">
        ${thirds.map(t=>best8RowHtml(t,sel,locked)).join('')}
      </div>
      <div class="page-actions" id="best8-next">
        ${best8NextHtml(sel,locked)}
      </div>
    </div>`;
}

function best8RowHtml(t,sel,locked){
  const on=sel.includes(t.name);
  return`<div class="b8-row${on?' b8-sel':''}" id="b8r-${t.name.replace(/[^a-zA-Z]/g,'_')}"
    ${!locked?`onclick="toggleBest8('${t.name.replace(/'/g,"\\'")}')"`:''}>
    <div class="b8-left">
      <span class="b8-flag">${t.flag}</span>
      <div class="b8-info">
        <div class="b8-name">${t.name}</div>
        <div class="b8-group">Grup ${t.gid} · 3. sıra</div>
      </div>
    </div>
    <div class="b8-check">${on?'✓':''}</div>
  </div>`;
}

function best8NextHtml(sel,locked){
  if(locked||sel.length===8) return`<button class="btn-primary btn-next" onclick="stepNav(1)">Son 32'ye Geç →</button>`;
  return`<p class="pick-warn">⚠️ ${8-sel.length} takım daha seç</p>`;
}

function toggleBest8(n){
  if(IS_LOCKED)return;
  const ok=S.toggleBest8(n);
  if(!ok){toast('Zaten 8 seçildi!','err');return;}
  const sel=S.session.data.best8;
  const t=S.allThirds().find(x=>x.name===n);
  if(!t)return;
  // In-place: sadece o satırı güncelle
  const safeId='b8r-'+n.replace(/[^a-zA-Z]/g,'_');
  const row=document.getElementById(safeId);
  if(row){
    const on=sel.includes(n);
    row.classList.toggle('b8-sel',on);
    row.querySelector('.b8-check').textContent=on?'✓':'';
  }
  // Sayaç
  const fill=document.getElementById('b8-fill');
  const txt=document.getElementById('b8-txt');
  if(fill) fill.style.width=`${Math.round(sel.length/8*100)}%`;
  if(txt)  txt.innerHTML=`<b>${sel.length}</b>/8 seçildi`;
  // Buton
  const next=document.getElementById('best8-next');
  if(next) next.innerHTML=best8NextHtml(sel,false);
  autoSave();
}

// ── ELİMİNASYON ───────────────────────────────────────────────
function renderElim(rid,label,n){
  const locked=IS_LOCKED;
  const matches=Array.from({length:n},(_,i)=>{
    const[t1,t2]=S.matchTeams(rid,i);
    return{i,t1,t2,w:S.winner(rid,i)};
  });
  const allDone=matches.every(m=>m.w);
  const isLast=S.currentStep===S.steps.length-1;

  // Turnuva ağacı mı, liste mi?
  const useTree=(rid==='r16'||rid==='qf'||rid==='sf'||rid==='final');

  mc().innerHTML=`
    <div class="page elim-page">
      <div class="elim-header">
        <div class="elim-title">${label.toUpperCase()}</div>
        <div class="elim-sub">${n} maç · ${rid==='final'?'Şampiyonu belirle':'Kazananı seçmek için tıkla'}</div>
      </div>
      ${locked?`<div class="locked-banner">🔒 Kilitlendi.</div>`:''}
      <div class="${useTree?'bracket-grid':'matches-list'}" id="elim-matches-${rid}">
        ${matches.map(m=>matchCardHtml(m,rid,locked)).join('')}
      </div>
      <div id="elim-next-${rid}" class="page-actions">
        ${elimNextHtml(allDone,locked,isLast,rid)}
      </div>
    </div>`;
}

function matchCardHtml(m,rid,locked){
  const t1=m.t1||{n:'TBD',f:'❓',tbd:true};
  const t2=m.t2||{n:'TBD',f:'❓',tbd:true};
  const w=m.w;
  const isFinal=rid==='final';

  const teamRow=(t,side)=>{
    const isW=w===t.n;
    const isLoser=w&&!isW;
    const clickable=!t.tbd&&!locked;
    return`<button
      class="elim-team${isW?' elim-winner':''}${isLoser?' elim-loser':''}${t.tbd?' elim-tbd':''}"
      data-side="${side}"
      ${clickable?`onclick="pickElim('${rid}',${m.i},'${t.n.replace(/'/g,"\\'")}')"`:'disabled'}>
      <span class="elim-flag">${t.f}</span>
      <span class="elim-name">${t.n}</span>
      ${isW?'<span class="elim-check">✓</span>':''}
    </button>`;
  };

  return`<div class="elim-card${w?' elim-card-done':''}${isFinal?' elim-card-final':''}" id="ecard-${rid}-${m.i}" data-match="${m.i}">
    <div class="elim-card-label">Maç ${m.i+1}${isFinal?' · 🏆':''}</div>
    <div class="elim-card-body">
      ${teamRow(t1,'home')}
      <div class="elim-divider"></div>
      ${teamRow(t2,'away')}
    </div>
  </div>`;
}

function elimNextHtml(allDone,locked,isLast,rid){
  if(!allDone&&!locked) return`<p class="pick-warn">⚠️ Tüm kazananları seç</p>`;
  if(isLast) return`<div class="final-save-card">
    <div class="fsc-title">🏆 Tahminleri Kaydet</div>
    ${S.session.data.champion?`<div class="fsc-champ">Şampiyon: ${getFlag(S.session.data.champion)} <b>${S.session.data.champion}</b></div>`:''}
    ${S.session.type==='general'?`<label class="pool-toggle-row" style="margin:14px 0">
      <input type="checkbox" id="pub-chk" checked onchange="S.session.data.public=this.checked"/>
      <span class="ptl-box"></span>
      <div class="ptl-text"><div class="ptl-title">Genel havuza gönder</div><div class="ptl-sub">Herkese açık tabloya ekle</div></div>
    </label>`:''}
    <button class="sbtn" onclick="doFinalSave()">💾 Tahminleri Kaydet</button>
  </div>`;
  return`<button class="btn-primary btn-next" onclick="stepNav(1)">Sonraki Tur →</button>`;
}

function pickElim(rid,mi,team){
  if(IS_LOCKED)return;
  S.setWinner(rid,mi,team);
  if(rid==='final') toast('🏆 '+team+' '+getFlag(team),'ok');
  autoSave();

  // In-place: sadece o kartı güncelle
  const card=document.getElementById(`ecard-${rid}-${mi}`);
  if(card){
    const locked=IS_LOCKED;
    const[t1,t2]=S.matchTeams(rid,mi);
    const newHtml=matchCardHtml({i:mi,t1,t2,w:team},rid,locked);
    const tmp=document.createElement('div');
    tmp.innerHTML=newHtml;
    card.replaceWith(tmp.firstElementChild);
  }

  // İleri butonu güncelle
  const step=S.steps[S.currentStep];
  const n=step.n;
  const matches=Array.from({length:n},(_,i)=>S.winner(rid,i));
  const allDone=matches.every(Boolean);
  const isLast=S.currentStep===S.steps.length-1;
  const nextEl=document.getElementById(`elim-next-${rid}`);
  if(nextEl) nextEl.innerHTML=elimNextHtml(allDone,false,isLast,rid);
}

// Eski pick fonksiyon ismi — geriye dönük uyumluluk için
function pick(rid,mi,team){ pickElim(rid,mi,team); }


// ── KAYDET ────────────────────────────────────────────────────
let _autoTimer=null;
function autoSave(){clearTimeout(_autoTimer);_autoTimer=setTimeout(async()=>{if(S.user&&!IS_LOCKED){try{await persistSave();}catch(e){}}},2000);}

async function persistSave(){
  const d=S.session.data;
  // group_rankings hesapla (maç sisteminde maçlardan türet)
  const allRankings={};
  GRP.forEach(g=>{allRankings[g]=S.getGroupRanking(g);});
  if(S.session.type==='general'){
    await DB.saveGeneralPred(S.user.id,{group_rankings:d.group_rankings,bracket:d.bracket,champion:d.champion,best8:d.best8,public:d.public});
    S.generalPred={...d};
  } else {
    await DB.saveTeamPred(S.user.id,S.session.teamId,{pred_name:S.session.predName||S.session.teamName,system:d.system,group_rankings:allRankings,group_matches:d.group_matches,group_tiebreaks:d.group_tiebreaks,bracket:d.bracket,champion:d.champion,best8:d.best8});
    S.teamPredsMap[S.session.teamId]={...d};
  }
}

function getGroupRankingAll(){const o={};GRP.forEach(g=>{o[g]=S.getGroupRanking(g);});return o;}

async function doFinalSave(){
  try{
    await persistSave();
    toast('Tahminler kaydedildi! 🎉');
    setTimeout(showMainMenu,800);
  }catch(e){toast('Kayıt hatası: '+e.message,'err');}
}
async function saveAll(){try{await persistSave();toast('Kaydedildi ✓');}catch(e){toast('Hata: '+e.message,'err');}}

// ── GEÇMİŞ TAHMİNLER ─────────────────────────────────────────
function showMyPreds(){
  setMode('menu');
  const gp=S.generalPred;
  mc().innerHTML=`
    <div class="page">
      <button class="back-btn" onclick="showMainMenu()">‹ Ana Menü</button>
      <div class="sum-title" style="margin-top:12px">📋 Tahminlerim</div>
      ${gp?`<div class="pred-card">
        <div class="pred-card-header"><span class="pred-card-title">🌍 Genel Havuz Tahmini</span><span class="pred-card-sys">Grup Sıralaması</span></div>
        <div class="sum-table" style="margin-top:8px">
          ${GRP.slice(0,4).map(g=>{const r=gp.group_rankings&&gp.group_rankings[g]?gp.group_rankings[g]:GROUPS[g].t.map(t=>t.n);
            return`<div class="sum-row"><div class="sum-gid">Grup ${g}</div><div class="sum-teams">
              <span class="stag pass">${getFlag(r[0])} ${r[0]}</span><span class="stag pass">${getFlag(r[1])} ${r[1]}</span>
            </div></div>`;}).join('')}
          <div class="sum-row"><div class="sum-gid" style="color:var(--text3)">…</div></div>
        </div>
        ${gp.champion?`<div class="champ-disp">🏆 ${getFlag(gp.champion)} <b>${gp.champion}</b></div>`:''}
        <button class="btn-primary" style="width:100%;margin-top:10px" onclick="startSession('general',null,'ranking')">✏️ Düzenle</button>
      </div>`:''}
      ${Object.keys(S.teamPredsMap).length>0?Object.entries(S.teamPredsMap).map(([tid,tp])=>{
        const team=S.myTeams.find(t=>t.id===tid);
        return`<div class="pred-card">
          <div class="pred-card-header"><span class="pred-card-title">👥 ${tp.pred_name||team?.name||'Ekip Tahmini'}</span><span class="pred-card-sys">${{'ranking':'Grup Sıralaması','match':'Maç Maç','both':'Serbest Sistem'}[tp.system||'ranking']}</span></div>
          ${tp.champion?`<div class="champ-disp">🏆 ${getFlag(tp.champion)} <b>${tp.champion}</b></div>`:''}
          <button class="btn-primary" style="width:100%;margin-top:10px;background:var(--bg3);color:var(--text)" onclick="startSession('team','${tid}','${tp.system||'ranking'}')">✏️ Düzenle</button>
        </div>`;}).join(''):''}
    </div>`;
}

// ── EKİP HUB ──────────────────────────────────────────────────
function showTeamHub(){
  setMode('menu');
  mc().innerHTML=`
    <div class="page">
      <button class="back-btn" onclick="showMainMenu()">‹ Ana Menü</button>
      <div class="sum-title" style="margin-top:12px">👥 Ekip Yönetimi</div>
      ${S.myTeams.length>0?`
        <div class="team-list" style="margin-top:12px">
          ${S.myTeams.map(t=>`
            <div class="team-item">
              <div class="ti-info">
                <div class="ti-name">${t.name}</div>
                <div class="ti-meta">${{'ranking':'Grup Sıralaması','match':'Maç Maç','both':'Serbest Sistem'}[t.pred_system||'ranking']} · ${t.max_members>0?'Max '+t.max_members+' üye':'Sınırsız'}</div>
              </div>
              <div class="ti-actions">
                <button class="ti-btn" onclick="showTeamDetail('${t.id}','${t.name.replace(/'/g,"\\'")}')">Detay</button>
                <button class="ti-btn ti-leave" onclick="confirmLeave('${t.id}','${t.name.replace(/'/g,"\\'")}')">Ayrıl</button>
              </div>
            </div>`).join('')}
        </div>`:`<p class="page-sub" style="margin-top:12px">Henüz hiçbir ekibe üye değilsin.</p>`}
      <div class="menu-cards" style="margin-top:16px">
        <button class="menu-card" onclick="showCreateTeam()"><div class="mc-icon">🏗️</div><div class="mc-text"><div class="mc-title">Ekip Kur</div><div class="mc-sub">Yeni ekip oluştur</div></div><div class="mc-arr">›</div></button>
        <button class="menu-card" onclick="showJoinTeam()"><div class="mc-icon">🤝</div><div class="mc-text"><div class="mc-title">Ekibe Katıl</div><div class="mc-sub">Mevcut ekibe gir</div></div><div class="mc-arr">›</div></button>
      </div>
    </div>`;
}

async function showTeamDetail(teamId,teamName){
  setMode('menu');mc().innerHTML=`<div class="page"><div class="lb-loading">⏳ Yükleniyor...</div></div>`;
  try{
    const[members,preds]=await Promise.all([DB.getTeamMembers(teamId),DB.getTeamPredictions(teamId)]);
    const predMap={};(preds||[]).forEach(p=>predMap[p.user_id]=p);
    const rows=(members||[]).map(m=>{
      const p=predMap[m.user_id];const r=p?.group_rankings||{};
      const done=GRP.filter(g=>{const rk=r[g];return rk&&rk.length===4&&rk.some((t,i)=>t!==GROUPS[g].t[i].n);}).length;
      return{uid:m.user_id,name:(m.users||{}).username||'?',pts:done*2,done,isMe:m.user_id===S.user.id,predName:p?.pred_name||''};
    }).sort((a,b)=>b.pts-a.pts);
    mc().innerHTML=`<div class="page">
      <button class="back-btn" onclick="showTeamHub()">‹ Ekipler</button>
      <div class="sum-title" style="margin-top:12px">👥 ${teamName}</div>
      <div class="lb-table" style="margin-top:12px">
        <div class="lb-hdr-row"><div>#</div><div>Üye / Tahmin</div><div style="text-align:right">Puan</div><div style="text-align:right">%</div></div>
        ${rows.map((u,i)=>{const m=i===0?'🥇':i===1?'🥈':i===2?'🥉':i+1;
          return`<div class="lb-row${u.isMe?' me':''}"><div class="lb-rank">${m}</div><div class="lb-name">${u.name}${u.predName?' <small style="color:var(--text3)">· ${u.predName}</small>':''}${u.isMe?'<span class="me-tag">★</span>':''}</div><div class="lb-pts" style="text-align:right">${u.pts}</div><div class="lb-pct" style="text-align:right">%${Math.round(u.done/12*100)}</div></div>`;
        }).join('')||'<div class="lb-empty">Henüz tahmin yok.</div>'}
      </div>
    </div>`;
  }catch(e){mc().innerHTML=`<div class="page"><button class="back-btn" onclick="showTeamHub()">‹ Geri</button><p style="color:var(--red);margin-top:12px">${e.message}</p></div>`;}
}

function confirmLeave(teamId,teamName){
  openModal(`<div class="modal-head"><span>Ekipten Ayrıl</span><button class="modal-close" onclick="closeModal()">✕</button></div>
    <div class="modal-body" style="padding:1.5rem">
      <p style="margin-bottom:1rem;color:var(--text2)"><b>${teamName}</b> ekibinden ayrılmak istediğine emin misin?</p>
      <div style="display:flex;gap:8px">
        <button class="btn-primary" style="flex:1;background:var(--red)" onclick="doLeave('${teamId}')">Ayrıl</button>
        <button class="btn-primary" style="flex:1;background:var(--bg3);color:var(--text)" onclick="closeModal()">İptal</button>
      </div>
    </div>`);
}
async function doLeave(teamId){
  try{await DB.leaveTeam(teamId,S.user.id);S.myTeams=S.myTeams.filter(t=>t.id!==teamId);delete S.teamPredsMap[teamId];closeModal();toast('Ekipten ayrıldın.');showTeamHub();}
  catch(e){toast('Hata: '+e.message,'err');}
}

// ── EKİP KUR ──────────────────────────────────────────────────
function showCreateTeam(){
  setMode('menu');
  mc().innerHTML=`
    <div class="page">
      <button class="back-btn" onclick="showTeamHub()">‹ Geri</button>
      <div class="sum-title" style="margin-top:12px">🏗️ Ekip Kur</div>
      <p class="page-sub">Arkadaşların ekip adı ve şifreyle katılabilir.</p>
      <div class="form-card">
        <div class="sfield"><label>Ekip Adı</label><input class="sinp" id="ct-name" placeholder="Örn: Kuzey Yıldızları"/></div>
        <div class="sfield"><label>Ekip Şifresi</label>
          <div class="pw-row"><input class="sinp" id="ct-pass" type="password" placeholder="••••••"/><button class="pw-eye" onclick="tpw('ct-pass',this)" type="button">👁</button></div>
        </div>
        <div class="settings-section">
          <div class="settings-title">⚙️ Tahmin Sistemi</div>
          <div class="sfield"><label>Üyeler nasıl tahmin yapsın?</label>
            <select class="sinp" id="ct-sys">
              <option value="ranking">Grup Sıralaması — takımları sırala</option>
              <option value="match">Maç Maç Kazanan — her maçın galibini seç</option>
              <option value="both">Serbest — — maçları seç + eşitlikleri sırala</option>
            </select>
          </div>
          <div class="sfield"><label>Maksimum Üye</label>
            <select class="sinp" id="ct-maxm"><option value="0">Sınırsız</option><option value="5">5 kişi</option><option value="10" selected>10 kişi</option><option value="20">20 kişi</option><option value="50">50 kişi</option></select>
          </div>
          <div class="sfield"><label>Katılım</label>
            <select class="sinp" id="ct-vis"><option value="private" selected>Gizli — sadece şifreyle</option><option value="public">Açık — şifresiz</option></select>
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
  const sys=document.getElementById('ct-sys').value;
  const maxM=parseInt(document.getElementById('ct-maxm').value);
  const vis=document.getElementById('ct-vis').value;
  const err=document.getElementById('ct-err');
  if(!name||name.length<2){err.textContent='Ekip adı en az 2 karakter.';return;}
  if(vis==='private'&&!pass){err.textContent='Gizli ekip için şifre gerekli.';return;}
  err.textContent='Kontrol ediliyor...';
  try{
    const ex=await DB.getTeamByName(name);if(ex&&ex.length){err.textContent='Bu ekip adı alınmış.';return;}
    const pwHash=pass?await hashPw(pass):'';
    const res=await DB.createTeam(name,pwHash,S.user.id,{max_members:maxM,max_predictions:1,visibility:vis,pred_system:sys});
    if(!res||!res.length){err.textContent='Oluşturulamadı.';return;}
    await DB.joinTeam(res[0].id,S.user.id);
    S.myTeams.push(res[0]);
    toast('Ekip kuruldu: '+name+' 🎉');showTeamHub();
  }catch(e){err.textContent='Hata: '+e.message;}
}

// ── EKİBE KATIL ───────────────────────────────────────────────
function showJoinTeam(){
  setMode('menu');
  mc().innerHTML=`
    <div class="page">
      <button class="back-btn" onclick="showTeamHub()">‹ Geri</button>
      <div class="sum-title" style="margin-top:12px">🤝 Ekibe Katıl</div>
      <p class="page-sub">Arkadaşından aldığın ekip adı ve şifreyle katıl.</p>
      <div class="form-card">
        <div class="sfield"><label>Ekip Adı</label><input class="sinp" id="jt-name" placeholder="Ekip adı"/></div>
        <div class="sfield"><label>Şifre <small>(açık ekiplerde boş bırak)</small></label>
          <div class="pw-row"><input class="sinp" id="jt-pass" type="password" placeholder="••••••"/><button class="pw-eye" onclick="tpw('jt-pass',this)" type="button">👁</button></div>
        </div>
        <p class="serr" id="jt-err"></p>
        <button class="sbtn" onclick="doJoinTeam()">Katıl →</button>
      </div>
    </div>`;
}
async function doJoinTeam(){
  const name=document.getElementById('jt-name').value.trim(),pass=document.getElementById('jt-pass').value;
  const err=document.getElementById('jt-err');
  if(!name){err.textContent='Ekip adı gir.';return;}
  err.textContent='Kontrol ediliyor...';
  try{
    const ex=await DB.getTeamByName(name);if(!ex||!ex.length){err.textContent='Ekip bulunamadı.';return;}
    const team=ex[0];
    if(S.myTeams.find(t=>t.id===team.id)){err.textContent='Zaten bu ekibin üyesin.';return;}
    if(team.visibility!=='public'&&team.password_hash){const h=await hashPw(pass);if(h!==team.password_hash){err.textContent='Şifre yanlış.';return;}}
    if(team.max_members>0){const mems=await DB.getTeamMembers(team.id);if(mems&&mems.length>=team.max_members){err.textContent='Ekip kapasitesi dolmuş.';return;}}
    await DB.joinTeam(team.id,S.user.id);
    S.myTeams.push(team);
    toast('Ekibe katıldın: '+name+' 🎉');showTeamHub();
  }catch(e){err.textContent='Hata: '+e.message;}
}

// ── LİDERLİK ─────────────────────────────────────────────────
function showLeaderboard(){
  setMode('menu');mc().innerHTML=`<div class="page"><div class="lb-loading">⏳ Yükleniyor...</div></div>`;
  loadLb();
}
async function loadLb(){
  try{
    const[users,preds]=await Promise.all([DB.allUsers(),DB.allGeneralPreds()]);
    const pm={};(preds||[]).forEach(p=>pm[p.user_id]=p);
    const rows=(users||[]).map(u=>{
      const p=pm[u.id]||{};const r=p.group_rankings||{};
      const done=GRP.filter(g=>{const rk=r[g];return rk&&rk.length===4&&rk.some((t,i)=>t!==GROUPS[g].t[i].n);}).length;
      return{id:u.id,name:u.username,pts:done*2,pct:Math.round(done/12*100),pub:p.public!==false};
    }).filter(u=>u.pub).sort((a,b)=>b.pts-a.pts||b.pct-a.pct);
    mc().innerHTML=`<div class="page">
      <button class="back-btn" onclick="showMainMenu()">‹ Ana Menü</button>
      <div class="page-title" style="margin-top:12px">🏅 Liderlik Tablosu</div>
      <div class="pts-key">Grup sırası <b>${POINTS.group_rank}p</b> · Gruptan geçiş <b>${POINTS.group_advance}p</b> · Son 32 <b>${POINTS.r32}p</b> · Çeyrek <b>${POINTS.qf}p</b> · Yarı <b>${POINTS.sf}p</b> · Final <b>${POINTS.final}p</b> · Şampiyon <b>${POINTS.champion}p</b></div>
      <div class="lb-table">
        <div class="lb-hdr-row"><div>#</div><div>Kullanıcı</div><div style="text-align:right">Puan</div><div style="text-align:right">%</div></div>
        ${rows.length===0?'<div class="lb-empty">Henüz tahmin yok.</div>':rows.map((u,i)=>{
          const m=i===0?'🥇':i===1?'🥈':i===2?'🥉':i+1;const me=S.user&&u.id===S.user.id;
          return`<div class="lb-row${me?' me':''}"><div class="lb-rank">${m}</div><div class="lb-name">${u.name}${me?'<span class="me-tag">★</span>':''}</div><div class="lb-pts" style="text-align:right">${u.pts}</div><div class="lb-pct" style="text-align:right">%${u.pct}</div></div>`;
        }).join('')}
      </div>
    </div>`;
  }catch(e){mc().innerHTML=`<div class="page"><button class="back-btn" onclick="showMainMenu()">‹ Geri</button><p style="color:var(--red);margin-top:12px">${e.message}</p></div>`;}
}

// ── BAŞLATMA ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded',async()=>{
  loadTheme();setInterval(updateHeader,60000);
  document.getElementById('modal').addEventListener('click',e=>{if(e.target===document.getElementById('modal'))closeModal();});
  document.querySelector('.save-fab').addEventListener('click',saveAll);
  const saved=localStorage.getItem('wc_user');
  if(saved){
    try{
      const user=JSON.parse(saved);S.user=user;
      const[gp,teamsRaw]=await Promise.all([DB.getGeneralPred(user.id),DB.getMyTeams(user.id)]);
      S.generalPred=gp||null;
      S.myTeams=(teamsRaw||[]).map(r=>r.teams).filter(Boolean);
      document.getElementById('splash-screen').style.display='none';
      document.getElementById('main-app').style.display='block';
      updateHeader();showMainMenu();return;
    }catch(e){localStorage.removeItem('wc_user');}
  }
  renderSplashForm();
});
