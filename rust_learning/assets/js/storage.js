/* ═══════════════════════════════════════════
   Rust Learning · storage.js
   Theme persistence + Wrong-Book localStorage
   Adapted from math_univers
   ═════════════════════════════════════════ */

/* ── Theme (3-mode: light → dark → neon → light) ── */
var _themeOrder = ['light', 'dark', 'neon'];
var _themeIcons = { light: '🌙', dark: '✨', neon: '☀️' };

function toggleTheme() {
  var html = document.documentElement;
  var cur = html.getAttribute('data-theme') || 'light';
  var idx = _themeOrder.indexOf(cur);
  var next = _themeOrder[(idx + 1) % _themeOrder.length];
  html.setAttribute('data-theme', next);
  localStorage.setItem('rust-learning-theme', next);
  var icon = document.getElementById('theme-icon');
  if (icon) icon.textContent = _themeIcons[next] || '🌙';
  _toggleNeonCanvas(next === 'neon');
}

function _toggleNeonCanvas(on) {
  var c = document.getElementById('neon-canvas');
  if (on && !c) { _initNeonCanvas(); return; }
  if (!on && c && c._neonRaf) {
    cancelAnimationFrame(c._neonRaf);
    c._neonRaf = null;
  }
  if (on && c && !c._neonRaf) { _startNeonRender(c); }
}

// Apply saved theme immediately
(function () {
  try {
    var saved = localStorage.getItem('rust-learning-theme');
    if (saved) document.documentElement.setAttribute('data-theme', saved);
  } catch (e) { /* localStorage unavailable */ }
  document.addEventListener('DOMContentLoaded', function () {
    var cur = document.documentElement.getAttribute('data-theme') || 'light';
    var icon = document.getElementById('theme-icon');
    if (icon) icon.textContent = _themeIcons[cur] || '🌙';
    if (cur === 'neon') _initNeonCanvas();
  });
})();

/* ── Neon WebGL Background ── */
function _initNeonCanvas() {
  if (document.getElementById('neon-canvas')) { _startNeonRender(document.getElementById('neon-canvas')); return; }
  var canvas = document.createElement('canvas');
  canvas.id = 'neon-canvas';
  document.body.insertBefore(canvas, document.body.firstChild);
  if(!document.getElementById('zodiac-label')){
    var lbl=document.createElement('div');lbl.id='zodiac-label';
    lbl.innerHTML='<span class="zodiac-symbol"></span><span class="zodiac-cn"></span><span class="zodiac-en"></span>';
    document.body.insertBefore(lbl,canvas.nextSibling);
  }
  var gl = canvas.getContext('webgl');
  if (!gl) return;

  var vs = 'attribute vec2 p;void main(){gl_Position=vec4(p,0,1);}';
  var fs = [
    'precision highp float;',
    'uniform vec2 R;uniform float T;',
    'uniform float cN;uniform vec2 cS[16];uniform float cLN;uniform vec4 cL[24];',
    'float rnd(vec2 s){return fract(sin(dot(s,vec2(12.9898,78.233)))*43758.5453);}',
    'float nse(vec2 s){vec2 i=floor(s),f=fract(s);float a=rnd(i),b=rnd(i+vec2(1,0)),c=rnd(i+vec2(0,1)),d=rnd(i+vec2(1,1));vec2 u=f*f*(3.-2.*f);return mix(a,b,u.x)+(c-a)*u.y*(1.-u.x)+(d-b)*u.x*u.y;}',
    'float fbm(vec2 s){float v=0.,a=.5;mat2 m=mat2(.877,.479,-.479,.877);for(int i=0;i<5;i++){v+=a*nse(s);s=m*s*2.+100.;a*=.5;}return v;}',
    'vec3 pal(float t){',
    '  vec3 a=vec3(.5,.3,.3),b=vec3(.5,.4,.35),c=vec3(1,1,1),d=vec3(.0,.10,.20);',
    '  return a+b*cos(6.2832*(c*t+d));',
    '}',
    'float sdSeg(vec2 p,vec2 a,vec2 b){vec2 pa=p-a,ba=b-a;float h=clamp(dot(pa,ba)/dot(ba,ba),0.,1.);return length(pa-ba*h);}',
    'vec3 zodiac(vec2 uv,float asp){',
    '  vec3 acc=vec3(0.);vec2 suv=vec2(uv.x*asp,uv.y);',
    '  float pulse=.9+.1*sin(T*.3);',
    '  for(int i=0;i<24;i++){if(float(i)>=cLN)break;vec2 a=vec2(cL[i].x*asp,cL[i].y),b=vec2(cL[i].z*asp,cL[i].w);float d=sdSeg(suv,a,b);acc+=vec3(.5,.6,.85)*exp(-d*d*12000.)*.3*pulse;}',
    '  for(int i=0;i<16;i++){if(float(i)>=cN)break;vec2 sp=vec2(cS[i].x*asp,cS[i].y);float d=length(suv-sp);acc+=vec3(.6,.72,1.)*(exp(-d*d*40000.)*1.2+exp(-d*d*3000.)*.25+exp(-d*d*400.)*.08)*pulse;}',
    '  return acc;',
    '}',
    '// Multi-layer starfield: positions randomize each cycle',
    'vec3 starfield(vec2 uv,float t){',
    '  vec3 acc=vec3(0.);',
    '  float asp=R.x/R.y;',
    '  vec2 suv=vec2(uv.x*asp,uv.y);',
    '',
    '  // Trail helper: asymmetric glow stretched behind movement',
    '  // delta=pixel-star, vel=velocity, s=stretch factor (lower=longer trail)',
    '',
    '  // Layer 1: fine dust (many, soft glow, subtle trail)',
    '  for(int i=0;i<55;i++){',
    '    float fi=float(i);',
    '    float period=rnd(vec2(fi,10.))*4.+3.;',
    '    float phase=rnd(vec2(fi,11.))*period;',
    '    float cycle=floor((t+phase)/period);',
    '    float life=fract((t+phase)/period);',
    '    float fade=smoothstep(0.,.06,life)*smoothstep(1.,.7,life);',
    '    if(fade<.001) continue;',
    '    float px=rnd(vec2(fi+cycle*13.7,12.));',
    '    float py=rnd(vec2(fi+cycle*17.3,13.));',
    '    float dx=sin(t*.06+fi*3.1)*.006+cos(t*.04+fi*1.7)*.004;',
    '    float dy=cos(t*.05+fi*2.3)*.005+sin(t*.03+fi*2.9)*.003;',
    '    vec2 pos=vec2(px*asp+dx,py+dy);',
    '    vec2 vel=vec2(cos(t*.06+fi*3.1)*.00036-sin(t*.04+fi*1.7)*.00016,',
    '                  -sin(t*.05+fi*2.3)*.00025+cos(t*.03+fi*2.9)*.00009);',
    '    vec2 delta=suv-pos;',
    '    float vl=max(length(vel),.00001);vec2 vn=vel/vl;',
    '    float al=dot(delta,vn);float pr=length(delta-al*vn);',
    '    float s=mix(.3,1.,smoothstep(-.003,.0,al));',
    '    float dist=sqrt(al*al*s+pr*pr);',
    '    float core=exp(-dist*dist*200000.)*.4;',
    '    float halo=exp(-dist*dist*15000.)*.12;',
    '    float glow=(core+halo)*fade;',
    '    float hue=rnd(vec2(fi,14.))*.3+.55+cycle*.05;',
    '    vec3 c=.5+.5*cos(6.2832*(hue+vec3(0.,.33,.67)));',
    '    c=mix(c,vec3(.7,.75,.85),.8);',
    '    acc+=c*glow*.2;',
    '  }',
    '',
    '  // Layer 2: small stars (moderate count, soft halo, trail)',
    '  for(int i=0;i<30;i++){',
    '    float fi=float(i)+100.;',
    '    float period=rnd(vec2(fi,20.))*5.+4.;',
    '    float phase=rnd(vec2(fi,21.))*period;',
    '    float cycle=floor((t+phase)/period);',
    '    float life=fract((t+phase)/period);',
    '    float fade=smoothstep(0.,.05,life)*smoothstep(1.,.65,life);',
    '    if(fade<.001) continue;',
    '    float px=rnd(vec2(fi+cycle*19.1,22.));',
    '    float py=rnd(vec2(fi+cycle*23.7,23.));',
    '    float dx=sin(t*.05+fi*1.9)*.005+cos(t*.035+fi*2.7)*.003;',
    '    float dy=cos(t*.04+fi*1.3)*.004+sin(t*.025+fi*3.1)*.003;',
    '    vec2 pos=vec2(px*asp+dx,py+dy);',
    '    vec2 vel=vec2(cos(t*.05+fi*1.9)*.00025-sin(t*.035+fi*2.7)*.000105,',
    '                  -sin(t*.04+fi*1.3)*.00016+cos(t*.025+fi*3.1)*.000075);',
    '    vec2 delta=suv-pos;',
    '    float vl=max(length(vel),.00001);vec2 vn=vel/vl;',
    '    float al=dot(delta,vn);float pr=length(delta-al*vn);',
    '    float s=mix(.25,1.,smoothstep(-.003,.0,al));',
    '    float dist=sqrt(al*al*s+pr*pr);',
    '    float core=exp(-dist*dist*250000.)*.5;',
    '    float halo=exp(-dist*dist*18000.)*.1;',
    '    float glow=(core+halo)*fade;',
    '    float hue=rnd(vec2(fi,24.))*.3+.55+cycle*.05;',
    '    vec3 c=.5+.5*cos(6.2832*(hue+vec3(0.,.33,.67)));',
    '    c=mix(c,vec3(.7,.75,.85),.75);',
    '    acc+=c*glow*.4;',
    '  }',
    '',
    '  // Layer 3: medium stars (fewer, brighter, visible trail)',
    '  for(int i=0;i<15;i++){',
    '    float fi=float(i)+200.;',
    '    float period=rnd(vec2(fi,30.))*6.+5.;',
    '    float phase=rnd(vec2(fi,31.))*period;',
    '    float cycle=floor((t+phase)/period);',
    '    float life=fract((t+phase)/period);',
    '    float fade=smoothstep(0.,.04,life)*smoothstep(1.,.6,life);',
    '    if(fade<.001) continue;',
    '    float px=rnd(vec2(fi+cycle*29.3,32.));',
    '    float py=rnd(vec2(fi+cycle*31.9,33.));',
    '    float dx=sin(t*.04+fi*2.3)*.005+cos(t*.025+fi*3.3)*.003;',
    '    float dy=cos(t*.03+fi*1.8)*.004+sin(t*.02+fi*2.5)*.003;',
    '    vec2 pos=vec2(px*asp+dx,py+dy);',
    '    vec2 vel=vec2(cos(t*.04+fi*2.3)*.0002-sin(t*.025+fi*3.3)*.000075,',
    '                  -sin(t*.03+fi*1.8)*.00012+cos(t*.02+fi*2.5)*.00006);',
    '    vec2 delta=suv-pos;',
    '    float vl=max(length(vel),.00001);vec2 vn=vel/vl;',
    '    float al=dot(delta,vn);float pr=length(delta-al*vn);',
    '    float s=mix(.18,1.,smoothstep(-.004,.0,al));',
    '    float dist=sqrt(al*al*s+pr*pr);',
    '    float core=exp(-dist*dist*500000.)*.9;',
    '    float halo=exp(-dist*dist*25000.)*.1;',
    '    float glow=(core+halo)*fade;',
    '    float hue=rnd(vec2(fi,34.))*.3+.55+cycle*.05;',
    '    vec3 c=.5+.5*cos(6.2832*(hue+vec3(0.,.33,.67)));',
    '    c=mix(c,vec3(.75,.78,.88),.7);',
    '    acc+=c*glow*.6;',
    '  }',
    '',
    '  // Layer 4: rare bright stars (prominent trail)',
    '  for(int i=0;i<8;i++){',
    '    float fi=float(i)+300.;',
    '    float period=rnd(vec2(fi,40.))*7.+6.;',
    '    float phase=rnd(vec2(fi,41.))*period;',
    '    float cycle=floor((t+phase)/period);',
    '    float life=fract((t+phase)/period);',
    '    float fade=smoothstep(0.,.03,life)*smoothstep(1.,.55,life);',
    '    if(fade<.001) continue;',
    '    float px=rnd(vec2(fi+cycle*37.1,42.));',
    '    float py=rnd(vec2(fi+cycle*41.3,43.));',
    '    float dx=sin(t*.035+fi*2.7)*.006+cos(t*.02+fi*3.5)*.004;',
    '    float dy=cos(t*.025+fi*2.1)*.005+sin(t*.015+fi*2.9)*.003;',
    '    vec2 pos=vec2(px*asp+dx,py+dy);',
    '    vec2 vel=vec2(cos(t*.035+fi*2.7)*.00021-sin(t*.02+fi*3.5)*.00008,',
    '                  -sin(t*.025+fi*2.1)*.000125+cos(t*.015+fi*2.9)*.000045);',
    '    vec2 delta=suv-pos;',
    '    float vl=max(length(vel),.00001);vec2 vn=vel/vl;',
    '    float al=dot(delta,vn);float pr=length(delta-al*vn);',
    '    float s=mix(.12,1.,smoothstep(-.005,.0,al));',
    '    float dist=sqrt(al*al*s+pr*pr);',
    '    float core=exp(-dist*dist*400000.);',
    '    float halo=exp(-dist*dist*12000.)*.12;',
    '    float glow=(core+halo)*fade;',
    '    float hue=rnd(vec2(fi,44.))*.3+.55+cycle*.05;',
    '    vec3 c=.5+.5*cos(6.2832*(hue+vec3(0.,.33,.67)));',
    '    c=mix(c,vec3(.8,.82,.9),.65);',
    '    acc+=c*glow*.8;',
    '  }',
    '',
    '  return acc;',
    '}',
    'void main(){vec2 uv=gl_FragCoord.xy/R;vec2 s=uv*3.;s.x*=R.x/R.y;',
    'vec2 q=vec2(fbm(s+.0*T),fbm(s+vec2(1)));',
    'vec2 r=vec2(fbm(s+4.*q+vec2(1.7,.2)+.15*T),fbm(s+4.*q+vec2(8.3,2.8)+.126*T));',
    'float f=fbm(s+4.*r);',
    'vec3 col=pal(f*.7+.3);',
    'col=mix(col,col*col*2.2,clamp(length(q),0.,1.));',
    'col*=vec3(.14,.13,.16);',
    '// Add starfield',
    'col+=starfield(uv,T);',
    'col+=zodiac(uv,R.x/R.y);',
    'gl_FragColor=vec4(col,1);}'
  ].join('\n');

  function sh(gl,t,s){var o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);return o;}
  var prg=gl.createProgram();
  gl.attachShader(prg,sh(gl,gl.VERTEX_SHADER,vs));
  gl.attachShader(prg,sh(gl,gl.FRAGMENT_SHADER,fs));
  gl.linkProgram(prg);gl.useProgram(prg);

  var buf=gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER,buf);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
  var p=gl.getAttribLocation(prg,'p');gl.enableVertexAttribArray(p);gl.vertexAttribPointer(p,2,gl.FLOAT,false,0,0);

  canvas._gl=gl;canvas._prg=prg;
  canvas._uR=gl.getUniformLocation(prg,'R');
  canvas._uT=gl.getUniformLocation(prg,'T');
  canvas._ucN=gl.getUniformLocation(prg,'cN');
  canvas._ucS=gl.getUniformLocation(prg,'cS');
  canvas._ucLN=gl.getUniformLocation(prg,'cLN');
  canvas._ucL=gl.getUniformLocation(prg,'cL');
  _startNeonRender(canvas);
}

/* ── Zodiac Names (symbol, Chinese, English) ── */
var _zodiacNames = [
  ['♑','摩羯座','Capricorn'],['♒','水瓶座','Aquarius'],['♓','双鱼座','Pisces'],
  ['♈','白羊座','Aries'],['♉','金牛座','Taurus'],['♊','双子座','Gemini'],
  ['♋','巨蟹座','Cancer'],['♌','狮子座','Leo'],['♍','处女座','Virgo'],
  ['♎','天秤座','Libra'],['♏','天蝎座','Scorpio'],['♐','射手座','Sagittarius']
];

/* ── Zodiac Constellation Data (12 signs, month-indexed, vertical layout) ── */
var _zodiacData = [
  // 0:Jan ♑ 摩羯座 Capricorn – sea-goat tail curving up
  {s:[[.46,.80],[.44,.72],[.42,.63],[.45,.55],[.50,.48],[.55,.42],[.58,.35],[.56,.28],[.52,.25],[.48,.30],[.44,.36]],
   l:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,3]]},
  // 1:Feb ♒ 水瓶座 Aquarius – water pouring down
  {s:[[.47,.82],[.50,.74],[.46,.66],[.53,.60],[.48,.52],[.52,.44],[.46,.38],[.50,.30],[.55,.24],[.44,.24]],
   l:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[7,9]]},
  // 2:Mar ♓ 双鱼座 Pisces – two fish linked by cord
  {s:[[.44,.78],[.48,.72],[.52,.78],[.50,.65],[.48,.55],[.52,.55],[.50,.45],[.44,.35],[.50,.28],[.56,.35]],
   l:[[0,1],[1,2],[1,3],[3,4],[4,5],[5,3],[4,6],[6,7],[6,8],[6,9]]},
  // 3:Apr ♈ 白羊座 Aries – ram horns curving
  {s:[[.50,.80],[.48,.70],[.52,.62],[.46,.54],[.50,.46],[.54,.54],[.50,.38],[.48,.28]],
   l:[[0,1],[1,2],[2,3],[3,4],[2,5],[4,6],[6,7]]},
  // 4:May ♉ 金牛座 Taurus – V-shaped bull face + horns
  {s:[[.42,.80],[.58,.80],[.46,.70],[.54,.70],[.50,.60],[.47,.50],[.53,.50],[.50,.42],[.46,.32],[.54,.32]],
   l:[[0,2],[1,3],[2,4],[3,4],[4,5],[4,6],[5,7],[6,7],[5,8],[6,9]]},
  // 5:Jun ♊ 双子座 Gemini – parallel twins
  {s:[[.44,.78],[.56,.78],[.44,.66],[.56,.66],[.44,.54],[.56,.54],[.44,.42],[.56,.42],[.48,.34],[.52,.34]],
   l:[[0,2],[2,4],[4,6],[6,8],[1,3],[3,5],[5,7],[7,9],[2,3],[4,5]]},
  // 6:Jul ♋ 巨蟹座 Cancer – crab pincer shape
  {s:[[.42,.75],[.50,.68],[.58,.75],[.46,.58],[.54,.58],[.50,.48],[.44,.38],[.56,.38],[.50,.28]],
   l:[[0,1],[1,2],[1,3],[1,4],[3,5],[4,5],[5,6],[5,7],[6,8],[7,8]]},
  // 7:Aug ♌ 狮子座 Leo – sickle + triangle body
  {s:[[.48,.82],[.44,.74],[.42,.64],[.46,.56],[.52,.56],[.56,.64],[.54,.48],[.50,.38],[.46,.30],[.54,.30]],
   l:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[4,6],[6,7],[7,8],[7,9],[8,9]]},
  // 8:Sep ♍ 处女座 Virgo – tall Y-shaped figure
  {s:[[.50,.82],[.48,.72],[.52,.72],[.46,.62],[.54,.62],[.50,.52],[.44,.42],[.50,.42],[.56,.42],[.50,.30]],
   l:[[0,1],[0,2],[1,3],[2,4],[3,5],[4,5],[5,6],[5,7],[5,8],[7,9]]},
  // 9:Oct ♎ 天秤座 Libra – scales balanced
  {s:[[.50,.80],[.50,.65],[.42,.55],[.58,.55],[.38,.45],[.46,.45],[.54,.45],[.62,.45],[.50,.35],[.50,.25]],
   l:[[0,1],[1,2],[1,3],[2,4],[2,5],[3,6],[3,7],[4,5],[6,7],[5,8],[6,8],[8,9]]},
  // 10:Nov ♏ 天蝎座 Scorpio – long curved tail stinger
  {s:[[.44,.82],[.46,.74],[.48,.66],[.50,.58],[.50,.50],[.48,.42],[.44,.36],[.42,.28],[.46,.22],[.52,.26],[.56,.32]],
   l:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10]]},
  // 11:Dec ♐ 射手座 Sagittarius – arrow + bow shape
  {s:[[.50,.82],[.50,.72],[.46,.62],[.54,.62],[.50,.52],[.42,.44],[.58,.44],[.50,.36],[.50,.26],[.44,.78],[.56,.78]],
   l:[[0,1],[1,2],[1,3],[2,4],[3,4],[2,5],[3,6],[4,7],[7,8],[0,9],[0,10]]}
];

function _setZodiacUniforms(canvas) {
  var gl=canvas._gl;
  if(!gl) return;
  var m=new Date().getMonth();
  if(canvas._zodiacMonth===m) return;
  canvas._zodiacMonth=m;
  var z=_zodiacData[m];
  var ns=z.s.length, nl=z.l.length;
  var sArr=new Float32Array(32);
  for(var i=0;i<ns&&i<16;i++){sArr[i*2]=z.s[i][0];sArr[i*2+1]=z.s[i][1];}
  gl.uniform1f(canvas._ucN,ns);
  gl.uniform2fv(canvas._ucS,sArr);
  var lArr=new Float32Array(96);
  for(var i=0;i<nl&&i<24;i++){
    var a=z.l[i][0],b=z.l[i][1];
    lArr[i*4]=z.s[a][0];lArr[i*4+1]=z.s[a][1];
    lArr[i*4+2]=z.s[b][0];lArr[i*4+3]=z.s[b][1];
  }
  gl.uniform1f(canvas._ucLN,nl);
  gl.uniform4fv(canvas._ucL,lArr);
  var lbl=document.getElementById('zodiac-label');
  if(lbl){
    var n=_zodiacNames[m];
    lbl.querySelector('.zodiac-symbol').textContent=n[0];
    lbl.querySelector('.zodiac-cn').textContent=n[1];
    lbl.querySelector('.zodiac-en').textContent=n[2];
  }
}

function _startNeonRender(canvas) {
  var gl=canvas._gl; if(!gl) return;
  var start=performance.now();
  canvas._zodiacMonth=-1;
  function frame(){
    if(document.documentElement.getAttribute('data-theme')!=='neon'){canvas._neonRaf=null;return;}
    canvas.width=window.innerWidth;canvas.height=window.innerHeight;
    gl.viewport(0,0,canvas.width,canvas.height);
    gl.uniform2f(canvas._uR,canvas.width,canvas.height);
    gl.uniform1f(canvas._uT,(performance.now()-start)/1000);
    _setZodiacUniforms(canvas);
    gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
    canvas._neonRaf=requestAnimationFrame(frame);
  }
  canvas._neonRaf=requestAnimationFrame(frame);
}

/* ═══════════════════════════════════════════
   Wrong-Book Storage
   ═════════════════════════════════════════ */
var WrongBook = {
  _KEY: 'rust-learning-wrong-book',
  _data: null,

  _load: function () {
    if (this._data) return this._data;
    try { this._data = JSON.parse(localStorage.getItem(this._KEY)) || []; }
    catch (e) { this._data = []; }
    return this._data;
  },
  _save: function () {
    try { localStorage.setItem(this._KEY, JSON.stringify(this._data)); } catch (e) {}
    this._updateBadge();
  },
  _updateBadge: function () {
    var badge = document.getElementById('wrong-book-badge');
    if (!badge) return;
    var count = this._load().length;
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  },

  record: function (id, info) {
    var items = this._load();
    var existing = null;
    for (var i = 0; i < items.length; i++) {
      if (items[i].id === id) { existing = items[i]; break; }
    }
    if (existing) {
      existing.count = (existing.count || 1) + 1;
      existing.userAnswer = info.userAnswer;
    } else {
      items.push({
        id: id,
        question: info.question,
        correctAnswer: info.correctAnswer,
        userAnswer: info.userAnswer,
        module: info.module || '',
        chapter: info.chapter || '',
        count: 1,
        time: Date.now()
      });
    }
    this._save();
  },

  remove: function (id) {
    var items = this._load();
    this._data = items.filter(function (item) { return item.id !== id; });
    this._save();
  },

  getAll: function () { return this._load().slice(); },

  clear: function () {
    this._data = [];
    this._save();
  }
};
