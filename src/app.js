(function(){
'use strict';
/* ============================================================
   IMAGENS (Acervo de Imagens Petrobras) — troque as URLs aqui
   ============================================================ */
const FW='https://petrobras.fotoware.cloud/fotoweb/cache/v2/';
const IMG={
  EP0:FW+'S/e/Folder%203/Dig47467.jpg.lyfzib-IMnnt47VjkAMA.3xKDuUgkDw.jpg',
  EP1:FW+'i/A/Folder%203/Dig47464.jpg.lyfIicqIMnHt47VjkAMA.J6wPBFwEIr.jpg',
  EP2:FW+'_/l/Folder%203/Dig47466.jpg.lyfZlsSIMnHt47VjkAMA.H4VD1Y-FFh.jpg',
  REF0:FW+'Y/Z/Folder%203/Dig47501.jpg.mCfS68GIMhPv47VjkAMA.wYqB4s3nRf.jpg',
  REF1:FW+'k/u/Folder%203/Dig47500.jpg.mCe36b6IMgfv47VjkAMA.f7SRshqcaD.jpg',
  REF2:FW+'i/l/Folder%203/Dig47499.jpg.mCfq_8WIMgPv47VjkAMA._FNdOnEqV1.jpg',
  REF3:FW+'f/E/Folder%203/Dig47498.jpg.mCf70sqIMv_t47VjkAMA.6bOFJbJci4.jpg',
  GAS0:FW+'z/z/Folder%203/Dig45179.jpg.mSfhkr6IMu-b47VjkAMA.KUcaQqO_Ov.jpg',
  GAS1:FW+'7/Z/Folder%203/Dig45178.jpg.mSf8lMGIMuub47VjkAMA.WvUWYXXlHq.jpg',
  TRA1:FW+'5/i/Folder%203/Dig46281.jpg.myesmciIMuXB47VjkAMA.Qhv51j3V2H.jpg',
  TRA2:FW+'V/P/Folder%203/Dig46280.jpg.myeZsr-IMuHB47VjkAMA.Jj2ssTzPdH.jpg',
  TRA10:FW+'c/S/Folder%203/painel184.jpg.myfezMWIMgkf47VjkAMA.hlvPM_f9xR.jpg',
  REN0:FW+'O/h/Folder%203/Dig46962.jpg.nCfQwsGIMjPd47VjkAMA.6LVCoIfQQP.jpg',
  REN1:FW+'n/3/Folder%203/Dig46961.jpg.nCfq5r-IMi_d47VjkAMA.bOIBRSUQDM.jpg',
  EMP0:FW+'n/r/Folder%203/Dig47459.jpg.iCfXg8CIMlHt47VjkAOg0RXT29mbC12aGYAB.A4Gq0nnyzz.jpg'
};
const HERO=['EP0','REF0','EP1','TRA2'];

/* ============================================================
   PALETA (validada: lightness, chroma, CVD adjacente ΔE ≥ 8)
   ============================================================ */
const PAL={
  light:{green:'#008542',yellow:'#E0A800',blue:'#1F6FA8',orange:'#C2410C',teal:'#00A3AD',purple:'#8E5BB5',gray:'#9AA5AA',slate:'#5B6770',
    ink:'#16241F',ink2:'#43534D',muted:'#76857F',grid:'#E8EEEA',axis:'#CFDAD4',surface:'#FFFFFF',refBg:'#FDE7A6',refInk:'#16241F',
    tipBg:'rgba(255,255,255,.97)',tipBorder:'#D3E0D9',pointer:'#A9BDB3',hmNeg:'#F0E6E0',hmMid:'#EEF1EF',hmPos:'#DDE8F1',hmNa:'#F4F6F5',lineGhost:'#C9D6CF',shadow:'rgba(0,60,40,.16)'},
  dark:{green:'#0E8A4C',yellow:'#BC8908',blue:'#3E86CC',orange:'#D5602C',teal:'#0E9EA8',purple:'#A275D8',gray:'#6F7F79',slate:'#8A9893',
    ink:'#E7F1EC',ink2:'#B9CAC2',muted:'#8DA097',grid:'#203830',axis:'#2F4A40',surface:'#122520',refBg:'#5A4708',refInk:'#FFE9A8',
    tipBg:'rgba(16,33,28,.97)',tipBorder:'#2F4A40',pointer:'#4D6A5E',hmNeg:'#3A2620',hmMid:'#1A2E27',hmPos:'#1D3044',hmNa:'#15271F',lineGhost:'#2F4A40',shadow:'rgba(0,0,0,.45)'}
};
/* paleta validada (validate_palette.js): clara vs #fcfcfb, escura vs #122520 */
let THEME='light';let C=Object.assign({},PAL.light);
const FONT='"Segoe UI",Roboto,"Inter","Helvetica Neue",Arial,sans-serif';

/* ============================================================
   DADOS
   ============================================================ */
let D={secoes:[],indicadores:[],fontes:[],constante:[]};const IND={};const ALL=[];let ACOES=13.044497;
const V=(id,y)=>{const x=IND[id]&&IND[id].v[y];return (x==null||isNaN(x))?null:x;};
const DEF={ref:2025,from:2020,to:2025,cur:'BRL',lucro:'cont',base:2021,hm:'main',log:false,shift:true,der:'Diesel',page:'p1'};
const S=Object.assign({},DEF);
const Ys=()=>ALL.filter(y=>y>=S.from&&y<=S.to);
const usd=()=>S.cur==='USD';
const fxM=y=>V(2,y), fxE=y=>V(3,y);
const flow=(x,y)=>x==null?null:(usd()?x/fxM(y):x);        // fluxo em R$ -> moeda (câmbio médio)
const stockU=(x,y)=>x==null?null:(usd()?x:x*fxE(y));        // saldo em US$ -> moeda (câmbio fim)
const cs=()=>usd()?'US$':'R$';
const ub=()=>usd()?'US$ bi':'R$ bi';
const lucro=y=>S.lucro==='rec'?V(21,y):V(20,y);
const lucroLbl=()=>S.lucro==='rec'?'Lucro recorrente':'Lucro contábil';
const prodBi=y=>V(33,y)*365/1e6;                              // bi boe/ano
const brent=y=>usd()?V(1,y):V(4,y);
const ebitdaBoe=y=>flow(V(19,y),y)/prodBi(y);
const tribBoe=y=>flow(V(81,y),y)/prodBi(y);
const capex=y=>usd()?V(64,y):V(65,y);
const sd=(a,b)=>(a==null||b==null||b===0)?null:a/b;
const yoy=(f,y)=>{const a=f(y),b=f(y-1);return (a==null||b==null||b<=0)?null:a/b-1;};
const cagr=(f,b,e)=>{if(e<=b)return null;const x0=f(b),x1=f(e);if(x0==null||x1==null||x0<=0||x1<=0)return null;return Math.pow(x1/x0,1/(e-b))-1;};
const DV=(k,p,v,ck)=>({k,p,v,ck,get c(){return C[this.ck];}});
const DERIV=[DV('Diesel',43,52,'green'),DV('Gasolina',44,53,'yellow'),DV('QAV',45,55,'blue'),DV('Óleo combustível',46,57,'orange'),DV('GLP',47,54,'teal'),DV('Nafta',48,56,'purple'),DV('Outros',49,58,'gray')];

/* ============================================================
   FORMATAÇÃO
   ============================================================ */
const NF={};const nf=d=>NF[d]||(NF[d]=new Intl.NumberFormat('pt-BR',{minimumFractionDigits:d,maximumFractionDigits:d}));
const ok=x=>x!=null&&isFinite(x);
const F={
  n:(x,d=1)=>ok(x)?nf(d).format(x):'–',
  p:(x,d=1)=>ok(x)?nf(d).format(x*100)+'%':'–',
  x:(x,d=2)=>ok(x)?nf(d).format(x)+'x':'–',
  dp:(x,d=1)=>ok(x)?(x>=0?'+':'')+nf(d).format(x*100)+'%':'–',
  pp:(x,d=1)=>ok(x)?(x>=0?'+':'')+nf(d).format(x*100)+' p.p.':'–',
  auto:x=>!ok(x)?'–':Math.abs(x)<10?nf(2).format(x):Math.abs(x)<1000?nf(1).format(x):nf(0).format(x)
};
const fmtUnit=(x,u)=>u==='%'?F.p(x):u==='x'?F.x(x):(u==='pessoas'||u==='casos')?F.n(x,0):F.auto(x);
const vf=(u,d=1)=>v=>ok(v)?F.n(v,d)+(u?' '+u:''):'–';
const vfp=(d=1)=>v=>F.p(v,d);
const vfx=(d=2)=>v=>F.x(v,d);
const ax0=v=>nf(0).format(v);
const axP=v=>nf(0).format(v*100)+'%';
const axAuto=v=>Number.isInteger(v)?nf(0).format(v):Math.abs(v)<1?nf(2).format(v):nf(1).format(v);

/* ============================================================
   HELPERS DE GRÁFICO
   ============================================================ */
const rgba=(h,a)=>{const n=parseInt(h.slice(1),16);return `rgba(${n>>16},${(n>>8)&255},${n&255},${a})`;};
const grad=(c,a1=1,a2=.62)=>new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:rgba(c,a1)},{offset:1,color:rgba(c,a2)}]);
const gradH=(c,a1=.62,a2=1)=>new echarts.graphic.LinearGradient(0,0,1,0,[{offset:0,color:rgba(c,a1)},{offset:1,color:rgba(c,a2)}]);
function bar(name,data,c,o={}){return Object.assign({name,type:'bar',data,barMaxWidth:26,barGap:'18%',itemStyle:{color:grad(c),borderRadius:[4,4,0,0]},emphasis:{focus:'series'}},o);}
function sbar(name,data,c,stack,o={}){return Object.assign({name,type:'bar',stack,data,barMaxWidth:30,itemStyle:{color:grad(c,1,.78),borderColor:C.surface,borderWidth:1},emphasis:{focus:'series'}},o);}
function line(name,data,c,o={}){return Object.assign({name,type:'line',data,symbol:'circle',symbolSize:8,lineStyle:{width:2,color:c},itemStyle:{color:c,borderColor:C.surface,borderWidth:2},emphasis:{focus:'series'},connectNulls:false},o);}
function area(name,data,c,stack,o={}){return line(name,data,c,Object.assign({stack,areaStyle:{color:grad(c,.55,.08)}},o));}
function endLbl(fmt){return {endLabel:{show:true,formatter:p=>fmt(p.value),color:C.ink2,fontSize:11,fontWeight:600,distance:6}};}
function ref1(v,lbl,c=C.muted){return {markLine:{silent:true,symbol:'none',lineStyle:{color:c,width:1.2,type:'solid'},label:{formatter:lbl,color:C.ink2,fontSize:10.5,position:'insideEndTop'},data:[{yAxis:v}]}};}
function xCat(i,data,o={}){return Object.assign({type:'category',gridIndex:i,data:(data||Ys()).map(String),triggerEvent:true,axisTick:{show:false},
  axisLine:{lineStyle:{color:C.axis}},axisLabel:{color:C.muted,fontSize:11.5,formatter:v=>(+v===S.ref?'{r|'+v+'}':v),
  rich:{r:{color:C.refInk,backgroundColor:C.refBg,padding:[3,6],borderRadius:6,fontWeight:700,fontSize:11.5}}}},o);}
function yVal(i,fmt,o={}){return Object.assign({type:'value',gridIndex:i,splitLine:{lineStyle:{color:C.grid}},axisLine:{show:false},axisLabel:{color:C.muted,fontSize:11,formatter:fmt||axAuto}},o);}
const LEG=(o={})=>Object.assign({top:0,left:0,icon:'roundRect',itemWidth:12,itemHeight:8,itemGap:14,textStyle:{color:C.ink2,fontSize:11.5}},o);
const base=()=>({animation:!window.__noAnim,textStyle:{fontFamily:FONT,color:C.ink2},animationDuration:450,animationDurationUpdate:350,backgroundColor:'transparent',
  tooltip:{trigger:'axis',confine:true,axisPointer:{type:'line',lineStyle:{color:C.pointer}},backgroundColor:C.tipBg,borderColor:C.tipBorder,borderWidth:1,padding:[8,12],
    textStyle:{color:C.ink,fontSize:12},extraCssText:'box-shadow:0 10px 28px '+C.shadow+';border-radius:10px;'}});

/* layout de um painel só */
function single({series,yfmt,yopts,legend=true,xdata,xopts,extra}){
  return Object.assign({grid:{left:6,right:24,top:legend?36:14,bottom:4,containLabel:true},legend:legend?LEG():{show:false},
    xAxis:xCat(0,xdata,xopts),yAxis:yVal(0,yfmt,yopts),series},extra||{});
}
/* small multiples: painéis empilhados (v) ou lado a lado (h), sem eixo duplo */
function panels(el,list,dir='v',legend=true){
  const H=el.clientHeight||360,n=list.length,grid=[],xAxis=[],yAxis=[],title=[],series=[];
  if(dir==='v'){
    const top0=legend?30:6,tH=26,gap=14,avail=H-top0-n*tH-(n-1)*gap-4,h=avail/n;
    list.forEach((p,i)=>{const t=top0+tH+i*(h+tH+gap);
      title.push({text:p.title,left:6,top:t-tH+2,textStyle:{fontSize:11.5,fontWeight:700,color:C.ink2}});
      grid.push({left:6,right:24,top:t+8,height:h-8,containLabel:true});
      xAxis.push(xCat(i,null,i<n-1?{axisLabel:{show:false},axisLine:{lineStyle:{color:C.grid}}}:{}));
      yAxis.push(yVal(i,p.yfmt,p.yopts));
      p.series.forEach(s=>{s.xAxisIndex=i;s.yAxisIndex=i;series.push(s);});});
  }else{
    const gap=3,w=(100-gap*(n-1))/n;
    list.forEach((p,i)=>{const l=i*(w+gap);
      title.push({text:p.title,left:(l+.5)+'%',top:2,textStyle:{fontSize:11.5,fontWeight:700,color:C.ink2}});
      grid.push({left:(l+1)+'%',width:(w-2)+'%',top:34,bottom:4,containLabel:true});
      xAxis.push(xCat(i));yAxis.push(yVal(i,p.yfmt,p.yopts));
      p.series.forEach(s=>{s.xAxisIndex=i;s.yAxisIndex=i;series.push(s);});});
  }
  return {grid,xAxis,yAxis,title,series,legend:legend?LEG():{show:false},axisPointer:{link:[{xAxisIndex:'all'}]}};
}
/* tabela-gêmea */
function tblYears(cols){return {cols:['Ano',...cols.map(c=>c[0])],rows:Ys().map((y,i)=>[y,...cols.map(c=>c[2](c[1][i]))])};}

/* ============================================================
   RENDERERS (cada um devolve {opt, table})
   ============================================================ */
const R={};
const YS=()=>Ys();
const map=f=>YS().map(f);

/* ---------- P1 ---------- */
R.c_index=el=>{
  const b=S.base, defs=[['Brent ('+cs()+')',brent,C.green],['Receita',y=>flow(V(17,y),y),C.yellow],[lucroLbl(),y=>flow(lucro(y),y),C.blue],
    ['Cotação PETR4',y=>usd()?V(6,y)/fxE(y):V(6,y),C.orange],['Produção',y=>V(33,y),C.teal]];
  const ser=defs.map(([n,f,c])=>{const b0=f(b);return line(n,map(y=>{const v=f(y);return (b0&&v!=null)?v/b0*100:null;}),c,{tooltip:{valueFormatter:vf('',0)}});});
  ser[0].markLine={silent:true,symbol:'none',lineStyle:{color:C.muted,width:1},label:{formatter:'base '+b+' = 100',color:C.muted,fontSize:10.5,position:'insideStartTop'},data:[{yAxis:100}]};
  const opt=single({series:ser,yfmt:ax0,yopts:S.log?{type:'log',logBase:10,min:v=>Math.max(1,Math.floor(v.min/10)*10)}:{}});
  return {opt,table:tblYears(ser.map(s=>[s.name,s.data,v=>F.n(v,0)]))};
};
const HM_MAIN=[1,4,17,19,20,21,25,26,10,64,29,31,6,8,33,36,38,42,51,61,62,70,75,78,79,81,88];
function shortName(i){
  const o={4:'Brent em R$',17:'Receita de vendas',20:'Lucro contábil',21:'Lucro recorrente',25:'FCO',26:'FCL',10:'Dividendos + JCP',64:'CAPEX (US$)',
    29:'Dívida líquida (US$)',31:'DL / EBITDA',6:'Cotação PETR4',8:'Valor de mercado (R$)',33:'Produção total',36:'Produção pré-sal',38:'Reservas provadas',
    42:'Produção de derivados',51:'Vendas de derivados',61:'Exportações',62:'Importações',70:'Emissões GEE',75:'TAR',78:'Empregados próprios',79:'Terceirizados',
    81:'Tributos + PGOV',88:'Produção nacional (ANP)',9:'Enterprise value',89:'Participação na produção BR',37:'Participação pré-sal',90:'Força de trabalho'};
  if(o[i.id])return o[i.id];
  if(i.id>=43&&i.id<=49)return i.nome.replace('Querosene de aviação (QAV)','QAV')+' (prod.)';
  if(i.id>=52&&i.id<=58)return i.nome+' (vendas)';
  return i.nome.length>34?i.nome.slice(0,33)+'…':i.nome;
}
R.c_heat=el=>{
  const ids=S.hm==='main'?HM_MAIN:S.hm==='all'?D.indicadores.map(i=>i.id):D.indicadores.filter(i=>i.secao===S.hm).map(i=>i.id);
  const list=ids.map(id=>IND[id]).filter(i=>i&&i.id!==5);
  const cols=YS().filter(y=>y>ALL[0]);
  const rows=list.map(shortName).reverse(), data=[];
  list.slice().reverse().forEach((ind,r)=>cols.forEach((y,c)=>{
    const a=V(ind.id,y),b=V(ind.id,y-1);let v=null;
    if(a!=null&&b!=null){v=ind.unidade==='%'?a-b:(b>0?a/b-1:null);}
    data.push([c,r,v==null?'-':v,ind.unidade==='%'?'pp':'pc',ind.nome,ind.unidade]);
  }));
  el.style.height=Math.max(380,rows.length*22+90)+'px';
  const opt={grid:{left:10,right:16,top:8,bottom:44,containLabel:true},
    xAxis:{type:'category',data:cols.map(String),position:'top',triggerEvent:true,axisTick:{show:false},axisLine:{show:false},
      axisLabel:{color:C.muted,formatter:v=>(+v===S.ref?'{r|'+v+'}':v),rich:{r:{color:C.refInk,backgroundColor:C.refBg,padding:[3,6],borderRadius:6,fontWeight:700}}},splitArea:{show:false}},
    yAxis:{type:'category',data:rows,axisTick:{show:false},axisLine:{show:false},axisLabel:{color:C.ink2,fontSize:11,width:200,overflow:'truncate'}},
    visualMap:{min:-.5,max:.5,calculable:false,orient:'horizontal',left:'center',bottom:0,itemWidth:12,itemHeight:180,text:['alta +50%','queda −50%'],textStyle:{color:C.muted,fontSize:10.5},
      inRange:{color:[C.orange,C.hmNeg,C.hmMid,C.hmPos,C.blue]},outOfRange:{color:C.hmNa},dimension:2},
    tooltip:{trigger:'item',formatter:p=>{const d=p.data;const v=d[2];return `<b>${d[4]}</b><br>${cols[d[0]]} vs ${cols[d[0]]-1}: <b>${v==='-'?'n/d':(d[3]==='pp'?F.pp(v):F.dp(v))}</b>`;}},
    series:[{type:'heatmap',data,itemStyle:{borderColor:C.surface,borderWidth:2,borderRadius:4},
      label:{show:true,fontSize:10,formatter:p=>{const v=p.data[2];if(v==='-'||Math.abs(v)<.2)return '';const t=p.data[3]==='pp'?F.pp(v,0):F.dp(v,0);return Math.abs(v)>=.38?'{w|'+t+'}':'{d|'+t+'}';},rich:{w:{color:'#fff',fontSize:10,fontWeight:600},d:{color:C.ink,fontSize:10,fontWeight:600}}},
      emphasis:{itemStyle:{borderColor:C.ink,borderWidth:1}}}]};
  const table={cols:['Indicador',...cols.map(String)],rows:list.map(ind=>[ind.nome,...cols.map(y=>{const a=V(ind.id,y),b=V(ind.id,y-1);if(a==null||b==null)return '–';return ind.unidade==='%'?F.pp(a-b):(b>0?F.dp(a/b-1):'–');})])};
  return {opt,table};
};

/* ---------- P2 ---------- */
R.c_rec=el=>{
  const rec=map(y=>flow(V(17,y),y)),eb=map(y=>flow(V(19,y),y)),br=map(brent);
  const opt=panels(el,[
    {title:'Receita e EBITDA ajustado · '+ub(),yfmt:ax0,series:[bar('Receita',rec,C.green,{tooltip:{valueFormatter:vf(ub())}}),bar('EBITDA ajustado',eb,C.yellow,{tooltip:{valueFormatter:vf(ub())}})]},
    {title:'Brent médio · '+cs()+'/bbl',yfmt:ax0,series:[line('Brent',br,C.blue,Object.assign({tooltip:{valueFormatter:vf(cs()+'/bbl')}},endLbl(v=>F.n(v,0)),{areaStyle:{color:grad(C.blue,.25,0)}}))]}
  ]);
  return {opt,table:tblYears([['Receita ('+ub()+')',rec,v=>F.n(v)],['EBITDA ('+ub()+')',eb,v=>F.n(v)],['Brent ('+cs()+'/bbl)',br,v=>F.n(v)]])};
};
R.c_scatter=el=>{
  const pts=YS().map(y=>({value:[brent(y),flow(lucro(y),y)],name:String(y),y}));
  const opt={grid:{left:6,right:30,top:34,bottom:28,containLabel:true},labelLayout:{moveOverlap:'shiftY'},
    xAxis:{type:'value',name:'Brent ('+cs()+'/bbl)',nameLocation:'middle',nameGap:26,nameTextStyle:{color:C.muted},scale:true,splitLine:{lineStyle:{color:C.grid}},axisLabel:{color:C.muted,formatter:ax0}},
    yAxis:{type:'value',name:lucroLbl()+' ('+ub()+')',nameTextStyle:{color:C.muted,align:'left'},splitLine:{lineStyle:{color:C.grid}},axisLabel:{color:C.muted,formatter:ax0}},
    tooltip:{trigger:'item',formatter:p=>`<b>${p.name}</b><br>Brent: ${F.n(p.value[0])} ${cs()}/bbl<br>${lucroLbl()}: ${F.n(p.value[1])} ${ub()}`},
    series:[{type:'line',data:pts.map(p=>p.value),symbol:'none',lineStyle:{color:C.lineGhost,width:1.2},silent:true,z:1,tooltip:{show:false}},
      {type:'scatter',data:pts.map(p=>({value:p.value,name:p.name,itemStyle:{color:p.y===S.ref?C.yellow:C.green,borderColor:C.surface,borderWidth:2,shadowBlur:p.y===S.ref?10:0,shadowColor:rgba(C.yellow,.6)}})),
      symbolSize:p=>16,label:{show:true,formatter:'{b}',position:'right',color:C.ink2,fontSize:11.5,fontWeight:600},z:3}]};
  return {opt,table:{cols:['Ano','Brent ('+cs()+'/bbl)',lucroLbl()+' ('+ub()+')'],rows:pts.map(p=>[p.name,F.n(p.value[0]),F.n(p.value[1])])}};
};
R.c_marg=el=>{
  const mb=map(y=>V(22,y)),me=map(y=>V(23,y)),ml=map(y=>sd(lucro(y),V(17,y)));
  const s=[line('Margem bruta',mb,C.green,Object.assign({tooltip:{valueFormatter:vfp()}},endLbl(v=>F.p(v,0)))),line('Margem EBITDA',me,C.yellow,Object.assign({tooltip:{valueFormatter:vfp()}},endLbl(v=>F.p(v,0)))),
    line('Margem líquida',ml,C.blue,Object.assign({tooltip:{valueFormatter:vfp()}},endLbl(v=>F.p(v,0))))];
  return {opt:single({series:s,yfmt:axP,yopts:{min:0}}),table:tblYears([['Margem bruta',mb,F.p],['Margem EBITDA',me,F.p],['Margem líquida ('+lucroLbl()+')',ml,F.p]])};
};
R.c_lucros=el=>{
  const a=map(y=>flow(V(20,y),y)),b=map(y=>flow(V(21,y),y));
  const s=[bar('Contábil',a,C.green,{tooltip:{valueFormatter:vf(ub())}}),bar('Recorrente',b,C.yellow,{tooltip:{valueFormatter:vf(ub())}})];
  return {opt:single({series:s,yfmt:ax0}),table:tblYears([['Contábil ('+ub()+')',a,v=>F.n(v)],['Recorrente ('+ub()+')',b,v=>F.n(v)],['Gap',a.map((x,i)=>x-b[i]),v=>F.n(v)]])};
};
R.c_boe=el=>{
  const e=map(ebitdaBoe),b=map(brent),cap=e.map((x,i)=>sd(x,b[i]));const u=cs()+'/boe';
  const s=[line('EBITDA por boe',e,C.green,Object.assign({tooltip:{valueFormatter:vf(u)}},endLbl(v=>F.n(v,0)))),line('Brent',b,C.blue,Object.assign({tooltip:{valueFormatter:vf(cs()+'/bbl')}},endLbl(v=>F.n(v,0))))];
  return {opt:single({series:s,yfmt:ax0,yopts:{min:0}}),table:tblYears([['EBITDA/boe ('+u+')',e,v=>F.n(v)],['Brent ('+cs()+'/bbl)',b,v=>F.n(v)],['Captura',cap,F.p]])};
};
R.c_elast=el=>{
  const er=map(y=>{const a=yoy(y=>flow(V(17,y),y),y),b=yoy(brent,y);return (a==null||b==null||Math.abs(b)<1e-9)?null:a/b;});
  const ee=map(y=>{const a=yoy(y=>flow(V(19,y),y),y),b=yoy(brent,y);return (a==null||b==null||Math.abs(b)<1e-9)?null:a/b;});
  const s=[bar('Receita',er,C.green,{tooltip:{valueFormatter:vfx(2)},itemStyle:{color:grad(C.green),borderRadius:4}}),bar('EBITDA',ee,C.yellow,{tooltip:{valueFormatter:vfx(2)},itemStyle:{color:grad(C.yellow),borderRadius:4}})];
  Object.assign(s[0],ref1(1,'1,0x = mesma variação do Brent'));
  return {opt:single({series:s,yfmt:v=>nf(1).format(v)+'x'}),table:tblYears([['Elasticidade receita',er,v=>F.x(v)],['Elasticidade EBITDA',ee,v=>F.x(v)],['Δ% Brent',map(y=>yoy(brent,y)),F.dp]])};
};

/* ---------- P3 ---------- */
R.c_wf=el=>{
  const y=S.ref,fco=flow(V(25,y),y),cx=capex(y),fcl=flow(V(26,y),y),dv=flow(V(10,y),y);
  const out=fcl-(fco-cx),sal=fcl-dv;
  const steps=[['FCO',0,fco,C.green],['CAPEX',fco,fco-cx,C.orange],['Outros¹',fco-cx,fcl,C.gray],['FCL',0,fcl,C.green],['Dividendos²',fcl,sal,C.orange],['Saldo',0,sal,sal>=0?C.blue:C.orange]];
  const opt={grid:{left:6,right:16,top:46,bottom:4,containLabel:true},title:{text:'Ano '+y+' · '+ub(),left:6,top:0,textStyle:{fontSize:12,fontWeight:700,color:C.ink2}},
    xAxis:{type:'category',data:steps.map(s=>s[0]),axisTick:{show:false},axisLine:{lineStyle:{color:C.axis}},axisLabel:{color:C.ink2,fontSize:11.5}},
    yAxis:yVal(0,ax0),tooltip:{trigger:'item',formatter:p=>{const s=steps[p.dataIndex];const d=s[2]-s[1];return `<b>${s[0]}</b><br>${(s[1]===0?'':(d>=0?'+':''))}${F.n(s[1]===0?s[2]:d)} ${ub()}`;}},
    series:[{type:'custom',data:steps.map((s,i)=>[i,s[1],s[2]]),encode:{x:0,y:[1,2]},
      renderItem:(params,api)=>{const i=api.value(0),a=api.value(1),b=api.value(2);const p1=api.coord([i,a]),p2=api.coord([i,b]);const w=api.size([1,0])[0]*.52;
        const s=steps[i];const top=Math.min(p1[1],p2[1]),h=Math.max(2,Math.abs(p1[1]-p2[1]));const d=s[1]===0?s[2]:b-a;
        return {type:'group',children:[{type:'rect',shape:{x:p1[0]-w/2,y:top,width:w,height:h,r:4},style:{fill:grad(s[3],1,.7)}},
          {type:'text',style:{text:(s[1]===0?'':(d>=0?'+':''))+F.n(d,1),x:p1[0],y:top-6,textAlign:'center',textVerticalAlign:'bottom',fill:C.ink,font:'600 11.5px '+FONT}}]};}}]};
  return {opt,table:{cols:['Etapa',ub()],rows:steps.map(s=>[s[0],F.n(s[1]===0?s[2]:s[2]-s[1])])}};
};
R.c_alloc=el=>{
  const cx=map(y=>V(66,y)),dv=map(y=>sd(V(10,y),V(25,y))),rest=cx.map((c,i)=>Math.max(0,1-c-dv[i]));
  const s=[sbar('CAPEX',cx,C.green,'a',{tooltip:{valueFormatter:vfp()}}),sbar('Dividendos',dv,C.yellow,'a',{tooltip:{valueFormatter:vfp()}}),sbar('Restante',rest,C.gray,'a',{tooltip:{valueFormatter:vfp()},itemStyle:{color:grad(C.gray,.55,.35),borderColor:C.surface,borderWidth:1,borderRadius:[4,4,0,0]}})];
  Object.assign(s[0],ref1(1,'100% do FCO',C.orange));
  return {opt:single({series:s,yfmt:axP}),table:tblYears([['CAPEX ÷ FCO',cx,F.p],['Dividendos ÷ FCO',dv,F.p],['Restante',rest,F.p]])};
};
R.c_cob=el=>{
  const c=map(y=>V(27,y));const s=[line('Cobertura',c,C.green,Object.assign({tooltip:{valueFormatter:vfx(2)},areaStyle:{color:grad(C.green,.25,0)}},ref1(1,'1,0x',C.orange)))];
  return {opt:single({series:s,yfmt:v=>(v<1?nf(1):nf(0)).format(v)+'x',legend:false,yopts:{type:'log',logBase:2,min:.5}}),table:tblYears([['FCL ÷ dividendos',c,v=>F.x(v)]])};
};
R.c_div=el=>{
  const db=map(y=>stockU(V(28,y),y)),dl=map(y=>stockU(V(29,y),y)),r=map(y=>V(31,y));
  const opt=panels(el,[{title:'Dívida · '+ub(),yfmt:ax0,series:[bar('Bruta',db,C.gray,{tooltip:{valueFormatter:vf(ub())},itemStyle:{color:grad(C.gray,.9,.55),borderRadius:[4,4,0,0]}}),bar('Líquida',dl,C.green,{tooltip:{valueFormatter:vf(ub())}})]},
    {title:'Dívida líquida / EBITDA ajustado',yfmt:v=>nf(1).format(v)+'x',series:[line('DL/EBITDA',r,C.orange,Object.assign({tooltip:{valueFormatter:vfx(2)}},endLbl(v=>F.x(v))))]}]);
  return {opt,table:tblYears([['Bruta ('+ub()+')',db,v=>F.n(v)],['Líquida ('+ub()+')',dl,v=>F.n(v)],['DL/EBITDA',r,v=>F.x(v)]])};
};
R.c_capex=el=>{
  const real=map(capex),plan=map(y=>{const py=S.shift?y-1:y;const p=V(69,py);return p==null?null:(usd()?p:p*fxM(y));}),ex=real.map((r,i)=>sd(r,plan[i]));
  const s=[bar('Realizado',real,C.green,{tooltip:{valueFormatter:vf(ub())},barMaxWidth:30}),
    {name:'Média anual do plano'+(S.shift?' (t−1)':''),type:'scatter',data:plan,symbol:'rect',symbolSize:[34,5],itemStyle:{color:C.yellow,borderColor:C.surface,borderWidth:1},z:5,tooltip:{valueFormatter:vf(ub())}}];
  return {opt:single({series:s,yfmt:ax0}),table:tblYears([['Realizado ('+ub()+')',real,v=>F.n(v)],['Plano ('+ub()+')',plan,v=>F.n(v)],['Execução',ex,F.p]])};
};

/* ---------- P4 ---------- */
R.c_cot=el=>{
  const ct=map(y=>usd()?V(6,y)/fxE(y):V(6,y)),vm=map(y=>usd()?V(7,y):V(8,y)),va=map(y=>V(5,y));
  const opt=panels(el,[{title:'PETR4 no fechamento · '+cs(),yfmt:axAuto,series:[line('PETR4',ct,C.green,Object.assign({tooltip:{valueFormatter:v=>F.n(v,2)+' '+cs()},areaStyle:{color:grad(C.green,.28,0)}},endLbl(v=>F.n(v,2))))]},
    {title:'Valor de mercado · '+ub(),yfmt:ax0,series:[bar('Valor de mercado',vm,C.yellow,{tooltip:{valueFormatter:vf(ub())}})]}]);
  return {opt,table:tblYears([['PETR4 ('+cs()+')',ct,v=>F.n(v,2)],['Variação anual',va,F.dp],['Valor de mercado ('+ub()+')',vm,v=>F.n(v)]])};
};
R.c_mult=el=>{
  const pl=map(y=>sd(V(8,y),lucro(y))),ev=map(y=>V(16,y));
  const opt=panels(el,[{title:'P/L ('+lucroLbl().toLowerCase()+')',yfmt:v=>nf(0).format(v)+'x',series:[bar('P/L',pl,C.green,{tooltip:{valueFormatter:vfx(1)},label:{show:true,position:'top',formatter:p=>F.x(p.value,1),fontSize:10.5,color:C.ink2}})]},
    {title:'EV / EBITDA ajustado',yfmt:v=>nf(1).format(v)+'x',series:[bar('EV/EBITDA',ev,C.blue,{tooltip:{valueFormatter:vfx(1)},label:{show:true,position:'top',formatter:p=>F.x(p.value,1),fontSize:10.5,color:C.ink2}})]}],'h',false);
  return {opt,table:tblYears([['P/L',pl,v=>F.x(v,1)],['EV/EBITDA',ev,v=>F.x(v,1)]])};
};
R.c_dy=el=>{
  const d=map(y=>V(14,y));const s=[bar('Dividend yield',d,C.green,{tooltip:{valueFormatter:vfp()},label:{show:true,position:'top',formatter:p=>F.p(p.value,0),fontSize:10.5,color:C.ink2}})];
  return {opt:single({series:s,yfmt:axP,legend:false}),table:tblYears([['Dividend yield',d,F.p]])};
};
R.c_pay=el=>{
  const a=map(y=>sd(V(10,y),V(20,y))),b=map(y=>sd(V(10,y),V(21,y))),c=map(y=>sd(V(10,y),V(26,y)));
  const s=[bar('s/ lucro contábil',a,C.green,{tooltip:{valueFormatter:vfp(0)}}),bar('s/ lucro recorrente',b,C.yellow,{tooltip:{valueFormatter:vfp(0)}}),bar('s/ FCL',c,C.blue,{tooltip:{valueFormatter:vfp(0)}})];
  Object.assign(s[0],ref1(1,'100%',C.orange));
  return {opt:single({series:s,yfmt:axP}),table:tblYears([['Payout contábil',a,F.p],['Payout recorrente',b,F.p],['Dividendos ÷ FCL',c,F.p]])};
};
R.c_lpa=el=>{
  const l=map(y=>{const v=lucro(y)/ACOES;return usd()?v/fxM(y):v;}),d=map(y=>{const v=V(11,y);return usd()?v/fxM(y):v;});const u=cs()+'/ação';
  const s=[bar('LPA',l,C.green,{tooltip:{valueFormatter:v=>F.n(v,2)+' '+u}}),bar('DPA',d,C.yellow,{tooltip:{valueFormatter:v=>F.n(v,2)+' '+u}})];
  return {opt:single({series:s,yfmt:axAuto}),table:tblYears([['LPA ('+u+')',l,v=>F.n(v,2)],['DPA ('+u+')',d,v=>F.n(v,2)]])};
};

/* ---------- P5 ---------- */
R.c_prod=el=>{
  const ps=map(y=>V(36,y)),ot=map(y=>V(33,y)-V(36,y)),sh=map(y=>V(37,y));
  const opt=panels(el,[{title:'Produção própria · mil boe/d',yfmt:ax0,series:[area('Pré-sal',ps,C.green,'p',{tooltip:{valueFormatter:vf('mil boe/d',0)}}),area('Demais (pós-sal, terra, gás, exterior)',ot,C.yellow,'p',{tooltip:{valueFormatter:vf('mil boe/d',0)}})]},
    {title:'Participação do pré-sal',yfmt:axP,yopts:{min:.5,max:.9},series:[line('Pré-sal (% da produção)',sh,C.blue,Object.assign({tooltip:{valueFormatter:vfp()}},endLbl(v=>F.p(v,0))))]}]);
  return {opt,table:tblYears([['Pré-sal',ps,v=>F.n(v,0)],['Demais',ot,v=>F.n(v,0)],['Total',map(y=>V(33,y)),v=>F.n(v,0)],['% pré-sal',sh,F.p]])};
};
R.c_res=el=>{
  const r=map(y=>V(38,y)),rp=map(y=>V(39,y));
  const opt=panels(el,[{title:'Reservas provadas · bi boe',yfmt:axAuto,series:[bar('Reservas',r,C.green,{tooltip:{valueFormatter:vf('bi boe',2)}})]},
    {title:'Reservas / produção · anos',yfmt:axAuto,series:[line('R/P',rp,C.yellow,Object.assign({tooltip:{valueFormatter:vf('anos')}},endLbl(v=>F.n(v,1))))]}],'v',false);
  return {opt,table:tblYears([['Reservas (bi boe)',r,v=>F.n(v,2)],['R/P (anos)',rp,v=>F.n(v,1)]])};
};
R.c_rep=el=>{
  const r=map(y=>V(40,y));const s=[bar('Reposição',r,C.green,{tooltip:{valueFormatter:vfp(0)},label:{show:true,position:'top',formatter:p=>F.p(p.value,0),fontSize:10.5,color:C.ink2}})];
  Object.assign(s[0],ref1(1,'100%',C.orange));
  return {opt:single({series:s,yfmt:axP,legend:false}),table:tblYears([['Reposição',r,F.p]])};
};
R.c_anp=el=>{
  const n=map(y=>V(88,y)),p=map(y=>V(34,y)),sh=map(y=>V(89,y));
  const opt=panels(el,[{title:'Produção de petróleo · mil bbl/d',yfmt:ax0,series:[bar('Brasil (ANP)',n,C.gray,{tooltip:{valueFormatter:vf('mil bbl/d',0)},itemStyle:{color:grad(C.gray,.9,.55),borderRadius:[4,4,0,0]}}),bar('Petrobras (óleo + LGN, Brasil)',p,C.green,{tooltip:{valueFormatter:vf('mil bbl/d',0)}})]},
    {title:'Participação da Petrobras',yfmt:axP,yopts:{min:.5,max:.85},series:[line('Participação',sh,C.orange,Object.assign({tooltip:{valueFormatter:vfp()}},endLbl(v=>F.p(v,0))))]}]);
  return {opt,table:tblYears([['Brasil ANP',n,v=>F.n(v,0)],['Petrobras',p,v=>F.n(v,0)],['Participação',sh,F.p]])};
};

/* ---------- P6 ---------- */
R.c_fut=el=>{
  const f=map(y=>V(41,y));const s=[line('FUT',f,C.green,Object.assign({tooltip:{valueFormatter:vfp(0)},areaStyle:{color:grad(C.green,.3,0)}},endLbl(v=>F.p(v,0))))];
  return {opt:single({series:s,yfmt:axP,legend:false,yopts:{min:.7,max:1}}),table:tblYears([['FUT',f,F.p]])};
};
function mix(kind){
  const tot=kind==='p'?42:51;
  const s=DERIV.map(d=>{const arr=map(y=>sd(V(d[kind],y),V(tot,y)));return sbar(d.k,arr,d.c,'m',{tooltip:{valueFormatter:vfp()},emphasis:{focus:'series'},
    itemStyle:{color:grad(d.c,1,.78),borderColor:C.surface,borderWidth:1,opacity:d.k===S.der?1:.55}});});
  const o=single({series:s,yfmt:axP,yopts:{max:1}});o.legend=LEG({itemGap:10,itemWidth:10});o.grid.top=56;
  return {opt:o,table:tblYears(s.map(x=>[x.name,x.data,F.p]))};
}
R.c_mixp=()=>mix('p');R.c_mixv=()=>mix('v');
R.c_slope=el=>{
  const a=S.from,b=S.to;
  const s=DERIV.map(d=>{const on=d.k===S.der;return line(d.k,[V(d.v,a),V(d.v,b)],d.c,{lineStyle:{width:on?3.5:1.8,color:d.c,opacity:on?1:.45},itemStyle:{color:d.c,borderColor:C.surface,borderWidth:2,opacity:on?1:.55},
    symbolSize:on?10:7,z:on?5:2,tooltip:{valueFormatter:vf('mil bbl/d',0)},endLabel:{show:true,formatter:p=>d.k+' '+F.n(p.value,0),color:on?C.ink:C.muted,fontSize:11,fontWeight:on?700:500}});});
  const opt=single({series:s,yfmt:ax0,legend:false,xdata:[a,b],xopts:{boundaryGap:false,axisLabel:{color:C.ink2,fontWeight:700}}});
  opt.grid.right=120;opt.grid.left=12;
  return {opt,table:{cols:['Derivado',String(a),String(b),'Variação'],rows:DERIV.map(d=>[d.k,F.n(V(d.v,a),0),F.n(V(d.v,b),0),F.dp(sd(V(d.v,b),V(d.v,a))-1)])}};
};
R.c_ratio=el=>{
  const y=S.ref,rows=DERIV.map(d=>({k:d.k,v:sd(V(d.p,y),V(d.v,y)),c:d.c})).sort((p,q)=>p.v-q.v);
  const opt={grid:{left:6,right:52,top:24,bottom:4,containLabel:true},title:{text:'Ano '+y,left:6,top:0,textStyle:{fontSize:12,fontWeight:700,color:C.ink2}},
    xAxis:{type:'value',max:2,splitLine:{lineStyle:{color:C.grid}},axisLabel:{color:C.muted,formatter:axP}},
    yAxis:{type:'category',data:rows.map(r=>r.k),axisTick:{show:false},axisLine:{lineStyle:{color:C.axis}},axisLabel:{color:C.ink2}},
    tooltip:{trigger:'item',formatter:p=>`<b>${p.name}</b><br>Produção ÷ vendas: <b>${F.p(p.data.real,0)}</b>`},
    series:[{type:'bar',name:'Produção ÷ vendas',barMaxWidth:18,data:rows.map(r=>({value:Math.min(r.v,2),real:r.v,itemStyle:{color:gradH(r.k===S.der?C.green:C.gray,.55,1),borderRadius:[0,4,4,0]}})),
      label:{show:true,position:'right',formatter:p=>F.p(p.data.real,0)+(p.data.real>2?' ▸':''),color:C.ink2,fontSize:11},
      markLine:{silent:true,symbol:'none',lineStyle:{color:C.orange,width:1.2,type:'solid'},label:{formatter:'100%',color:C.ink2,fontSize:10.5},data:[{xAxis:1}]}}]};
  return {opt,table:{cols:['Derivado','Produção ÷ vendas'],rows:rows.slice().reverse().map(r=>[r.k,F.p(r.v)])}};
};
R.c_ratio_ts=el=>{
  const d=DERIV.find(x=>x.k===S.der),r=map(y=>sd(V(d.p,y),V(d.v,y))),t=map(y=>V(60,y));
  const s=[line(d.k,r,d.c,Object.assign({tooltip:{valueFormatter:vfp(0)}},endLbl(v=>F.p(v,0)))),line('Total de derivados',t,C.gray,Object.assign({tooltip:{valueFormatter:vfp(0)},lineStyle:{width:2,color:C.gray}},endLbl(v=>F.p(v,0))))];
  Object.assign(s[1],ref1(1,'100%',C.orange));
  return {opt:single({series:s,yfmt:axP}),table:tblYears([[d.k,r,F.p],['Total',t,F.p]])};
};
R.c_comex=el=>{
  const ex=map(y=>V(61,y)),im=map(y=>-V(62,y)),net=map(y=>V(63,y));
  const s=[sbar('Exportações',ex,C.green,'c',{tooltip:{valueFormatter:vf('mil bbl/d',0)},itemStyle:{color:grad(C.green),borderRadius:[4,4,0,0]}}),
    sbar('Importações',im,C.orange,'c',{tooltip:{valueFormatter:v=>F.n(Math.abs(v),0)+' mil bbl/d'},itemStyle:{color:grad(C.orange,.65,1),borderRadius:[0,0,4,4]}}),
    line('Exportação líquida',net,C.blue,Object.assign({tooltip:{valueFormatter:vf('mil bbl/d',0)}},endLbl(v=>F.n(v,0))))];
  return {opt:single({series:s,yfmt:v=>nf(0).format(Math.abs(v))}),table:tblYears([['Exportações',ex,v=>F.n(v,0)],['Importações',im,v=>F.n(-v,0)],['Líquida',net,v=>F.n(v,0)]])};
};

/* ---------- P7 ---------- */
R.c_emis=el=>{
  const e=map(y=>V(70,y));const s=[bar('Emissões',e,C.green,{tooltip:{valueFormatter:vf('mi tCO2e',0)},label:{show:true,position:'top',fontSize:10.5,color:C.ink2,formatter:p=>F.n(p.value,0)}})];
  return {opt:single({series:s,yfmt:ax0,legend:false}),table:tblYears([['Emissões (mi tCO2e)',e,v=>F.n(v,0)]])};
};
R.c_int=el=>{
  const a=map(y=>V(71,y)),b=map(y=>V(72,y)),c=map(y=>V(73,y));
  const mk=(n,d,col,u,meta,dec)=>Object.assign(line(n,d,col,{tooltip:{valueFormatter:vf(u,dec)}}),{markLine:{silent:true,symbol:'none',lineStyle:{color:C.muted,width:1.2,type:'solid'},label:{formatter:'meta '+F.n(meta,dec),position:'insideEndTop',color:C.ink2,fontSize:10.5},data:[{yAxis:meta}]}});
  const opt=panels(el,[{title:'E&P · kgCO2e/boe',yfmt:axAuto,yopts:{scale:true},series:[mk('E&P',a,C.green,'kgCO2e/boe',15,1)]},
    {title:'Refino · kgCO2e/CWT',yfmt:axAuto,yopts:{scale:true},series:[mk('Refino',b,C.yellow,'kgCO2e/CWT',36,1)]},
    {title:'Metano upstream · tCH4/mil tHC',yfmt:v=>nf(2).format(v),yopts:{min:0},series:[mk('Metano',c,C.blue,'tCH4/mil tHC',.2,2)]}],'h',false);
  return {opt,table:tblYears([['E&P (kgCO2e/boe)',a,v=>F.n(v,1)],['Refino (kgCO2e/CWT)',b,v=>F.n(v,1)],['Metano (tCH4/mil tHC)',c,v=>F.n(v,2)]])};
};
R.c_seg=el=>{
  const t=map(y=>V(75,y)),f=map(y=>V(76,y));
  const opt=panels(el,[{title:'TAR · por milhão de homens-hora',yfmt:v=>nf(1).format(v),yopts:{min:0},series:[line('TAR',t,C.orange,Object.assign({tooltip:{valueFormatter:vf('',2)}},endLbl(v=>F.n(v,2))))]},
    {title:'Fatalidades · casos',yfmt:ax0,series:[bar('Fatalidades',f,C.gray,{tooltip:{valueFormatter:vf('casos',0)},itemStyle:{color:grad(C.slate,.9,.6),borderRadius:[4,4,0,0]},label:{show:true,position:'top',fontSize:10.5,color:C.ink2}})]}],'v',false);
  return {opt,table:tblYears([['TAR',t,v=>F.n(v,2)],['Fatalidades',f,v=>F.n(v,0)]])};
};
R.c_pes=el=>{
  const p=map(y=>V(78,y)/1000),t=map(y=>V(79,y)/1000);
  const s=[sbar('Próprios',p,C.green,'w',{tooltip:{valueFormatter:vf('mil',1)}}),sbar('Terceirizados',t,C.yellow,'w',{tooltip:{valueFormatter:vf('mil',1)},itemStyle:{color:grad(C.yellow,1,.78),borderColor:C.surface,borderWidth:1,borderRadius:[4,4,0,0]}})];
  return {opt:single({series:s,yfmt:v=>nf(0).format(v)+' mil'}),table:tblYears([['Próprios (mil)',p,v=>F.n(v,1)],['Terceirizados (mil)',t,v=>F.n(v,1)],['% terceirizados',p.map((x,i)=>t[i]/(x+t[i])),F.p]])};
};
R.c_mul=el=>{
  const m=map(y=>V(80,y));const s=[line('Mulheres na liderança',m,C.purple,Object.assign({tooltip:{valueFormatter:vfp()},areaStyle:{color:grad(C.purple,.25,0)}},endLbl(v=>F.p(v,1))))];
  return {opt:single({series:s,yfmt:axP,legend:false,yopts:{min:.15,max:.3}}),table:tblYears([['Mulheres na liderança',m,F.p]])};
};
R.c_amb=el=>{
  const a=map(y=>V(74,y)),v=map(y=>V(77,y));
  const opt=panels(el,[{title:'Captação de água doce · mi m³',yfmt:ax0,series:[bar('Água doce',a,C.teal,{tooltip:{valueFormatter:vf('mi m³',1)}})]},
    {title:'Volume vazado · m³',yfmt:ax0,series:[bar('Vazamentos',v,C.orange,{tooltip:{valueFormatter:vf('m³',1)},label:{show:true,position:'top',fontSize:10.5,color:C.ink2,formatter:p=>F.n(p.value,0)}})]}],'h',false);
  return {opt,table:tblYears([['Água doce (mi m³)',a,v=>F.n(v,1)],['Vazamento (m³)',v,x=>F.n(x,1)]])};
};

/* ---------- P8 ---------- */
R.c_trib=el=>{
  const parts=[[82,'Federal (exceto PGOV)',C.green],[83,'Estadual (ICMS)',C.yellow],[84,'Municipal',C.blue],[85,'Participações gov. (royalties, PE, bônus)',C.teal]];
  const s=parts.map(([id,n,c],i)=>sbar(n,map(y=>flow(V(id,y),y)),c,'t',{tooltip:{valueFormatter:vf(ub())},itemStyle:{color:grad(c,1,.78),borderColor:C.surface,borderWidth:1,borderRadius:i===parts.length-1?[4,4,0,0]:0}}));
  return {opt:single({series:s,yfmt:ax0}),table:tblYears([...s.map(x=>[x.name,x.data,v=>F.n(v)]),['Total',map(y=>flow(V(81,y),y)),v=>F.n(v)]])};
};
R.c_tribrec=el=>{
  const r=map(y=>V(86,y)),b=map(tribBoe);
  const opt=panels(el,[{title:'Tributos + PGOV ÷ receita de vendas',yfmt:axP,yopts:{min:.3},series:[line('÷ receita',r,C.green,Object.assign({tooltip:{valueFormatter:vfp()}},endLbl(v=>F.p(v,0))))]},
    {title:'Tributos + PGOV por boe produzido · '+cs()+'/boe',yfmt:ax0,series:[bar('por boe',b,C.yellow,{tooltip:{valueFormatter:vf(cs()+'/boe',0)}})]}],'v',false);
  return {opt,table:tblYears([['Tributos ÷ receita',r,F.p],['Tributos por boe ('+cs()+')',b,v=>F.n(v,0)]])};
};
R.c_prodtrab=el=>{
  const r=map(y=>flow(V(17,y),y)*1e3/V(90,y)),f=map(y=>flow(V(26,y),y)*1e3/V(90,y)),c=map(y=>capex(y)*1e3/V(90,y));const u=cs()+' mi/pessoa';
  const s=[bar('Receita por trabalhador',r,C.green,{tooltip:{valueFormatter:vf(u,2)}}),bar('FCL por trabalhador',f,C.yellow,{tooltip:{valueFormatter:vf(u,2)}}),bar('CAPEX por trabalhador',c,C.blue,{tooltip:{valueFormatter:vf(u,2)}})];
  return {opt:single({series:s,yfmt:axAuto}),table:tblYears([['Receita/trab. ('+u+')',r,v=>F.n(v,2)],['FCL/trab.',f,v=>F.n(v,2)],['CAPEX/trab.',c,v=>F.n(v,2)],['Força de trabalho',map(y=>V(90,y)),v=>F.n(v,0)]])};
};

/* ============================================================
   KPIs e SPARKLINES
   ============================================================ */
function spark(vals,refIdx,stroke='#FDC82F',fill='rgba(253,200,47,.22)'){
  const w=240,h=36,p=4,xs=vals.map((_,i)=>p+i*(w-2*p)/Math.max(1,vals.length-1));
  const f=vals.filter(ok);if(!f.length)return '';const mn=Math.min(...f),mx=Math.max(...f),rg=mx-mn||1;
  const ys=vals.map(v=>ok(v)?h-p-(v-mn)/rg*(h-2*p):null);
  const pts=xs.map((x,i)=>ys[i]==null?null:x.toFixed(1)+','+ys[i].toFixed(1)).filter(Boolean);
  const areaP=`M${xs[0]},${h} L${pts.join(' L')} L${xs[xs.length-1]},${h} Z`;
  const dot=refIdx>=0&&ys[refIdx]!=null?`<circle cx="${xs[refIdx]}" cy="${ys[refIdx]}" r="4" fill="${stroke}" stroke="#fff" stroke-width="2"/>`:'';
  return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true"><path d="${areaP}" fill="${fill}"/><polyline points="${pts.join(' ')}" fill="none" stroke="${stroke}" stroke-width="2" vector-effect="non-scaling-stroke"/>${dot}</svg>`;
}
function kpiHTML(k,light){
  const y=S.ref,v=k.f(y),pv=k.f(y-1),d=(v!=null&&pv!=null&&pv!==0)?v/pv-1:null,cg=cagr(k.f,S.base,y);
  const flat=d==null||Math.abs(d)<.0005;const good=(flat||k.neu)?'neu':(k.lower?(d<0?'good':'bad'):(d>0?'good':'bad'));const arrow=flat?'■':(d>0?'▲':'▼');
  const vals=Ys().map(k.f),ri=Ys().indexOf(y);
  return `<div class="kpi"><div class="k">${k.k}</div><div class="v">${k.fmt(v)}<span class="u">${k.u||''}</span></div>
    <div class="d"><span class="${good}">${arrow} ${F.dp(d)} vs ${y-1}</span><span class="neu">CAGR ${S.base}–${y}: ${F.dp(cg)}</span></div>
    ${light?spark(vals,ri,C.green,rgba(C.green,.16)):spark(vals,ri)}</div>`;
}
function renderKPIs(){
  const K=[{k:'Receita de vendas',f:y=>flow(V(17,y),y),fmt:v=>F.n(v,1),u:ub()},{k:'EBITDA ajustado',f:y=>flow(V(19,y),y),fmt:v=>F.n(v,1),u:ub()},
    {k:lucroLbl(),f:y=>flow(lucro(y),y),fmt:v=>F.n(v,1),u:ub()},{k:'Fluxo de caixa livre',f:y=>flow(V(26,y),y),fmt:v=>F.n(v,1),u:ub()},
    {k:'Dividendos + JCP (exercício)',f:y=>flow(V(10,y),y),fmt:v=>F.n(v,1),u:ub()},{k:'Produção total',f:y=>V(33,y),fmt:v=>F.n(v,0),u:'mil boe/d'},
    {k:'Dívida líq. / EBITDA',f:y=>V(31,y),fmt:v=>F.x(v),lower:true},{k:'Emissões GEE (esc. 1+2)',f:y=>V(70,y),fmt:v=>F.n(v,0),u:'mi tCO2e',lower:true}];
  document.getElementById('kpis').innerHTML=K.map(k=>kpiHTML(k)).join('');
  const K8=[{k:'Tributos + PGOV pagos',f:y=>flow(V(81,y),y),fmt:v=>F.n(v,1),u:ub(),neu:1},{k:'Por dia',f:y=>flow(V(87,y),y),fmt:v=>F.n(v,0),u:cs()+' mi/dia',neu:1},
    {k:'Por boe produzido',f:tribBoe,fmt:v=>F.n(v,0),u:cs()+'/boe',neu:1},{k:'Força de trabalho total',f:y=>V(90,y),fmt:v=>F.n(v/1000,1),u:'mil pessoas',neu:1}];
  document.getElementById('kpis8').innerHTML=K8.map(k=>kpiHTML(k,true)).join('');
}

/* ============================================================
   MONTAGEM DOS CARDS, NAVEGAÇÃO E FILTROS
   ============================================================ */
const charts={},tables={};
function buildCards(){
  document.querySelectorAll('article.card[data-id]').forEach(a=>{
    const id=a.dataset.id,isChart=!!R[id];
    a.innerHTML=`<header><h3>${a.dataset.title||''}</h3>${isChart?`<div class="act"><button data-t="${id}" aria-pressed="false">Tabela</button><button data-png="${id}">PNG</button></div>`:''}</header>
      ${a.dataset.sub?`<p class="sub">${a.dataset.sub}</p>`:''}
      ${isChart?`<div class="chart ${a.dataset.h||''}" id="${id}" role="img" aria-label="${(a.dataset.title||'').replace(/"/g,'')}"></div><div class="tbl" id="t_${id}" hidden></div>`:'<div class="body"></div>'}
      ${a.dataset.note?`<p class="note">${a.dataset.note}</p>`:''}`;
  });
  document.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{const t=document.getElementById('t_'+b.dataset.t);t.hidden=!t.hidden;b.classList.toggle('on',!t.hidden);b.setAttribute('aria-pressed',String(!t.hidden));if(!t.hidden)fillTable(b.dataset.t);});
  document.querySelectorAll('[data-png]').forEach(b=>b.onclick=()=>{const c=charts[b.dataset.png];if(!c)return;const a=document.createElement('a');a.href=c.getDataURL({pixelRatio:2,backgroundColor:C.surface});a.download=b.dataset.png+'_'+S.ref+'.png';document.body.appendChild(a);a.click();a.remove();});
  // banners
  document.querySelectorAll('.banner[data-img]').forEach(b=>{const u=IMG[b.dataset.img];b.style.backgroundImage=`linear-gradient(100deg,rgba(0,42,30,.93) 0%,rgba(0,87,60,.80) 45%,rgba(0,133,66,.38) 80%,rgba(253,200,47,.22) 100%)${u?`,url("${u}")`:''}`;});
  // hero
  const hero=document.getElementById('hero');
  HERO.forEach((k,i)=>{const im=document.createElement('img');im.src=IMG[k];im.alt='';im.className=i===0?'on':'';im.onerror=()=>im.remove();hero.insertBefore(im,hero.firstChild);});
  let hi=0;setInterval(()=>{const ims=[...hero.querySelectorAll('img')];if(ims.length<2)return;ims.forEach(x=>x.classList.remove('on'));hi=(hi+1)%ims.length;ims[hi].classList.add('on');},6000);
}
function fillTable(id){
  const t=tables[id],el=document.getElementById('t_'+id);if(!t||!el||el.hidden)return;
  el.innerHTML=`<table><thead><tr>${t.cols.map(c=>`<th>${c}</th>`).join('')}</tr></thead><tbody>${t.rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
}
function renderChart(id){
  const el=document.getElementById(id);if(!el)return;
  let c=charts[id];
  if(!c){c=charts[id]=echarts.init(el,null,{renderer:'canvas'});
    c.on('click',p=>{let y=null;if(p.componentType==='xAxis')y=+p.value;else if(p.name&&/^\d{4}$/.test(p.name))y=+p.name;if(y&&ALL.includes(y)&&y>=S.from&&y<=S.to&&y!==S.ref){S.ref=y;syncControls();refresh();}});}
  try{const r=R[id](el);c.resize();const B=base();c.setOption(Object.assign({},B,r.opt,{tooltip:Object.assign({},B.tooltip,r.opt.tooltip||{})}),true);tables[id]=r.table;fillTable(id);}
  catch(e){console.error('Erro no gráfico '+id,e);el.innerHTML='<p style="color:var(--err);padding:20px">Erro ao renderizar este gráfico.</p>';}
}
function refresh(){
  if(!db)return;
  renderKPIs();
  if(S.page==='p10')renderDbStatus();
  const pg=document.getElementById(S.page);
  pg.querySelectorAll('.chart').forEach(el=>renderChart(el.id));
}
const PAGES=[['p1','Visão geral'],['p2','Macro & resultado'],['p3','Caixa & capital'],['p4','Mercado & acionista'],['p5','Upstream'],['p6','Downstream'],['p7','ESG'],['p8','Impacto no Brasil'],['p10','Dados & SQL']];
function show(p){
  S.page=p;document.querySelectorAll('.page').forEach(s=>s.classList.toggle('on',s.id===p));
  document.querySelectorAll('#tabs button').forEach(b=>b.classList.toggle('on',b.dataset.p===p));
  try{history.replaceState(null,'','#'+p);}catch(e){}
  requestAnimationFrame(()=>{refresh();Object.keys(charts).forEach(k=>{if(document.getElementById(k).offsetParent)charts[k].resize();});});
}
function opts(sel,list,val){sel.innerHTML=list.map(([v,t])=>`<option value="${v}"${String(v)===String(val)?' selected':''}>${t}</option>`).join('');}
function syncControls(){
  opts(fRef,Ys().map(y=>[y,y]),S.ref);opts(fFrom,ALL.filter(y=>y<S.to).map(y=>[y,y]),S.from);opts(fTo,ALL.filter(y=>y>S.from).map(y=>[y,y]),S.to);
  opts(fBase,ALL.filter(y=>y<S.to).map(y=>[y,y]),S.base);
  document.querySelectorAll('#fCur button').forEach(b=>b.classList.toggle('on',b.dataset.v===S.cur));
  document.querySelectorAll('#fLucro button').forEach(b=>b.classList.toggle('on',b.dataset.v===S.lucro));
  fHm.value=S.hm;fLog.checked=S.log;fShift.checked=S.shift;fDer.value=S.der;
}
const $=id=>document.getElementById(id);
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let fRef,fFrom,fTo,fBase,fHm,fLog,fShift,fDer;

/* ============================================================
   TEMA CLARO / ESCURO
   ============================================================ */
function initialTheme(){
  try{const t=localStorage.getItem('petro_dash_theme');if(t==='dark'||t==='light')return t;}catch(e){}
  return (window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light';
}
function applyTheme(t,rerender){
  THEME=t;C=Object.assign({},PAL[t]);document.documentElement.setAttribute('data-theme',t);
  const b=$('themeBtn');if(b)b.innerHTML=t==='dark'?'☀ Tema claro':'☾ Tema escuro';
  try{localStorage.setItem('petro_dash_theme',t);}catch(e){}
  if(rerender)refresh();
}

/* ============================================================
   BANCO DE DADOS (SQLite no navegador via sql.js)
   ============================================================ */
let SQL=null,db=null,SRC={kind:'original',name:'petrobras_2020_2025.db',ts:null};
const UNDO=[],HIST=[],LS_DB='petro_dash_db_v1',LS_META='petro_dash_meta_v1';
const b64ToU8=b=>{const s=atob(b);const u=new Uint8Array(s.length);for(let i=0;i<s.length;i++)u[i]=s.charCodeAt(i);return u;};
const u8ToB64=u=>{let s='';for(let i=0;i<u.length;i+=0x8000)s+=String.fromCharCode.apply(null,u.subarray(i,i+0x8000));return btoa(s);};
function q(sql){const st=db.prepare(sql);const out=[];while(st.step())out.push(st.getAsObject());st.free();return out;}
function schemaOK(d){
  try{
    const need={secao:['id','codigo','nome'],indicador:['id','secao_id','nome','unidade','tipo'],valor:['indicador_id','ano','valor','origem']};
    for(const [t,cols] of Object.entries(need)){
      const r=d.exec(`PRAGMA table_info(${t})`);if(!r.length)return 'tabela obrigatória ausente: '+t;
      const have=r[0].values.map(v=>v[1]),miss=cols.filter(c=>!have.includes(c));
      if(miss.length)return `coluna(s) ausente(s) em ${t}: ${miss.join(', ')}`;
    }
    if(!d.exec('SELECT COUNT(*) FROM valor')[0].values[0][0])return 'a tabela valor ficou vazia';
    return null;
  }catch(e){return e.message;}
}
function loadData(){
  const prevHi=ALL.length?ALL[ALL.length-1]:null;
  const inds=q('SELECT i.*, s.codigo AS secao FROM indicador i JOIN secao s ON s.id=i.secao_id ORDER BY i.id');
  const vals=q('SELECT indicador_id,ano,valor,origem FROM valor');
  const byId={};inds.forEach(i=>{i.v={};i.o={};byId[i.id]=i;});
  vals.forEach(r=>{const i=byId[r.indicador_id];if(i&&r.valor!=null){i.v[r.ano]=r.valor;i.o[r.ano]=r.origem;}});
  let fontes=[],cons=[];try{fontes=q('SELECT * FROM fonte ORDER BY id');}catch(e){}try{cons=q('SELECT * FROM constante');}catch(e){}
  D={secoes:q('SELECT * FROM secao ORDER BY id'),indicadores:inds,fontes,constante:cons};
  Object.keys(IND).forEach(k=>delete IND[k]);inds.forEach(i=>IND[i.id]=i);
  const ta=cons.find(c=>c.nome==='total_acoes');ACOES=ta&&ta.valor?ta.valor:13.044497;
  const ys=[...new Set(vals.map(r=>+r.ano))].sort((a,b)=>a-b);ALL.length=0;ys.forEach(y=>ALL.push(y));
  const lo=ALL[0],hi=ALL[ALL.length-1];
  Object.assign(DEF,{from:lo,to:hi,ref:hi,base:ALL.length>2?ALL[1]:lo});
  if(prevHi!=null&&hi>prevHi){if(S.to===prevHi)S.to=hi;if(S.ref===prevHi)S.ref=hi;}
  if(!ALL.includes(S.from))S.from=lo;if(!ALL.includes(S.to))S.to=hi;if(S.from>=S.to){S.from=lo;S.to=hi;}
  if(!ALL.includes(S.ref)||S.ref<S.from||S.ref>S.to)S.ref=S.to;
  if(!ALL.includes(S.base)||S.base>=S.to)S.base=DEF.base<S.to?DEF.base:S.from;
  const yr=lo===hi?String(lo):lo+'–'+hi;$('yrs').textContent=yr;$('subInfo').textContent=D.indicadores.length+' indicadores · '+D.secoes.length+' temas · '+ALL.length+' anos · base SQLite atualizável (aba Dados & SQL)';document.title='Petrobras '+yr+' · Dashboard de Indicadores';
  $('srcList').innerHTML=D.fontes.map(f=>`<li>${f.url?`<a href="${esc(f.url)}" target="_blank" rel="noopener">${esc(f.documento)}</a>`:esc(f.documento)}</li>`).join('');
}
function persist(){
  const el=$('dbSave');if(!el||!el.checked)return 'desligado';
  try{localStorage.setItem(LS_DB,u8ToB64(db.export()));localStorage.setItem(LS_META,JSON.stringify(SRC));return 'salvo neste navegador';}
  catch(e){return 'não foi possível salvar no navegador';}
}
function clearPersist(){try{localStorage.removeItem(LS_DB);localStorage.removeItem(LS_META);}catch(e){}}
function updateChip(){const c=$('dataChip');c.hidden=SRC.kind==='original';c.textContent=SRC.kind==='file'?'● Base carregada: '+SRC.name:'● Dados editados';}
function rebuildSelects(){
  opts(fHm,[['main','Principais indicadores'],...D.secoes.map(s=>[s.codigo,s.codigo+' · '+s.nome]),['all','Todos ('+D.indicadores.length+')']],S.hm);
  if(![...fHm.options].some(o=>o.value===S.hm)){S.hm='main';fHm.value='main';}
}
function afterDataChange(){loadData();rebuildSelects();syncControls();updateChip();renderSchema();refresh();}
function msg(kind,text){$('sqlMsg').innerHTML=`<div class="msg ${kind}">${esc(text)}</div>`;}
function totalChanges(){return db.exec('SELECT total_changes()')[0].values[0][0];}
function doRecalc(){if(!$('dbRecalc').checked)return null;return petroRecalc(db,ACOES);}
function runSQL(){
  const sql=$('sqlIn').value.trim();if(!sql){msg('info','Escreva uma instrução SQL.');return;}
  const snap=db.export(),before=totalChanges();let res;
  try{db.exec('SAVEPOINT usr');res=db.exec(sql);db.exec('RELEASE usr');}
  catch(e){
    try{db.exec('ROLLBACK TO usr');db.exec('RELEASE usr');}catch(_){db.close();db=new SQL.Database(snap);}
    msg('err','Erro: '+e.message+'\nNada foi aplicado.'+(/transaction/i.test(e.message)?'\nDica: não use BEGIN/COMMIT, cada execução já é atômica.':''));return;
  }
  const changed=totalChanges()-before;
  const out=$('sqlOut'),last=res&&res.length?res[res.length-1]:null;
  if(last){const rows=last.values.slice(0,500);out.hidden=false;
    out.innerHTML=`<table><thead><tr>${last.columns.map(c=>`<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(v=>`<td>${v==null?'<span style="color:var(--muted)">NULL</span>':esc(typeof v==='number'&&!Number.isInteger(v)?+v.toPrecision(12):v)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;}
  else{out.hidden=true;out.innerHTML='';}
  if(changed>0){
    const err=schemaOK(db);
    if(err){db.close();db=new SQL.Database(snap);msg('err','A alteração foi desfeita porque quebraria o dashboard: '+err+'.');return;}
    let rc=null;try{rc=doRecalc();}catch(e){rc={err:e.message};}
    UNDO.push(snap);if(UNDO.length>10)UNDO.shift();
    SRC={kind:'edited',name:SRC.name,ts:new Date().toISOString()};
    afterDataChange();const ps=persist();
    HIST.unshift({sql,changed,ts:new Date()});renderDbStatus();
    msg('ok',`✓ ${changed} linha(s) alterada(s).`+(rc?(rc.err?` Recálculo falhou: ${rc.err}`:` ${rc.changed} valor(es) calculado(s) atualizado(s).`):' Recálculo desligado.')+` Dashboard atualizado · ${ps}.`);
  }else{
    msg(last?'info':'info',last?`${last.values.length} linha(s) retornada(s)${last.values.length>500?' (mostrando 500)':''}.`:'Executado. Nenhuma linha alterada.');
  }
}
function swapDb(nd,src,label){
  UNDO.push(db.export());if(UNDO.length>10)UNDO.shift();
  db.close();db=nd;SRC=src;let rc=null;try{rc=doRecalc();}catch(e){}
  const keep=S.page;afterDataChange();Object.assign(S,DEF,{page:keep});syncControls();refresh();
  const ps=src.kind==='original'?(clearPersist(),'cópia salva no navegador apagada'):persist();
  renderDbStatus();msg('ok',`✓ ${label}${rc?` · ${rc.changed} valor(es) calculado(s) atualizado(s)`:''} · ${ps}.`);
}
function loadFile(file){
  const fr=new FileReader();
  fr.onload=()=>{let nd;try{nd=new SQL.Database(new Uint8Array(fr.result));}catch(e){msg('err','Não consegui abrir o arquivo: '+e.message);return;}
    const err=schemaOK(nd);if(err){nd.close();msg('err','Esse .db não segue o esquema esperado: '+err+'.');return;}
    swapDb(nd,{kind:'file',name:file.name,ts:new Date().toISOString()},'Base carregada: '+file.name);};
  fr.onerror=()=>msg('err','Falha ao ler o arquivo.');fr.readAsArrayBuffer(file);
}
function downloadDb(){
  const blob=new Blob([db.export()],{type:'application/x-sqlite3'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);
  a.download=SRC.kind==='original'?'petrobras_2020_2025.db':'petrobras_'+ALL[0]+'_'+ALL[ALL.length-1]+'_atualizado.db';
  document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},500);
}
function undo(){
  if(!UNDO.length)return;const snap=UNDO.pop();db.close();db=new SQL.Database(snap);
  SRC={kind:'edited',name:SRC.name,ts:new Date().toISOString()};afterDataChange();const ps=persist();
  HIST.unshift({sql:'-- desfazer',changed:0,ts:new Date()});renderDbStatus();msg('ok','✓ Última alteração desfeita · '+ps+'.');
}
const EX=[
  ['Ver indicadores de uma seção',"SELECT indicador_id, indicador, unidade, a2020, a2021, a2022, a2023, a2024, a2025\nFROM vw_tabela_larga\nWHERE secao_codigo = '02_Financas';"],
  ['Buscar o id de um indicador',"SELECT i.id, s.codigo AS secao, i.nome, i.unidade, i.tipo\nFROM indicador i JOIN secao s ON s.id = i.secao_id\nWHERE i.nome LIKE '%lucro%'\nORDER BY i.id;"],
  ['Histórico de um indicador',"SELECT ano, valor, origem\nFROM valor\nWHERE indicador_id = 33   -- Produção total própria (mil boe/d)\nORDER BY ano;"],
  ['Atualizar um valor reportado',"-- Receita de vendas (id 17), 2025, em R$ bi.\n-- Margens, CAPEX/receita e tributos/receita são recalculados automaticamente.\nUPDATE valor SET valor = 497.549\nWHERE indicador_id = 17 AND ano = 2025;"],
  ['Inserir um novo ano (2026)',"-- Insira os valores reportados do novo ano. Os calculados saem sozinhos\n-- quando todos os insumos da fórmula existirem.\nINSERT INTO valor (indicador_id, ano, valor, origem) VALUES\n  (1, 2026, 65.0, 'Reportado'),   -- Brent médio (US$/bbl)\n  (2, 2026, 5.40, 'Reportado'),   -- Câmbio médio (R$/US$)\n  (3, 2026, 5.35, 'Reportado');   -- Câmbio fim de ano (R$/US$)"],
  ['Excluir um ano',"DELETE FROM valor WHERE ano = 2026;"],
  ['Editar nota e fonte de um indicador',"UPDATE indicador\nSET nota = 'Revisado em nov/2026', fonte = 'Relatório de Desempenho 4T25'\nWHERE id = 17;"],
  ['Resumo da base',"SELECT origem, COUNT(*) AS valores, MIN(ano) AS de, MAX(ano) AS ate\nFROM valor GROUP BY origem;"]
];
function buildData(){
  document.querySelector('[data-id="sqlbox"] .body').innerHTML=`
    <div class="sql-tools"><div class="f"><label for="sqlEx">Exemplos prontos</label><select id="sqlEx"><option value="">Escolha um exemplo…</option>${EX.map((e,i)=>`<option value="${i}">${esc(e[0])}</option>`).join('')}</select></div>
      <button class="btn primary" id="sqlRun">▶ Executar</button><button class="btn" id="sqlClear">Limpar</button><span class="note" style="align-self:center">Ctrl + Enter</span></div>
    <textarea class="sql" id="sqlIn" spellcheck="false" aria-label="Instrução SQL">${esc(EX[2][1])}</textarea>
    <div id="sqlMsg"></div><div class="tbl" id="sqlOut" hidden></div>
    <p class="note"><b>Como funciona:</b> a base roda inteira no seu navegador (SQLite via sql.js), sem servidor. Cada execução é atômica: se der erro, nada muda.
    Alterações em <code>valor</code> com origem <b>Reportado</b> disparam o recálculo dos indicadores <b>Calculado</b> (margens, múltiplos, razões, totais).
    Para levar as mudanças embora, use <b>Baixar .db atual</b>. Os textos de "Leitura rápida" descrevem a base original.</p>`;
  document.querySelector('[data-id="dbstat"] .body').innerHTML=`<dl class="kv" id="dbKv"></dl>
    <div class="btns"><label class="btn" for="dbFile" tabindex="0">⭱ Carregar .db</label><input type="file" id="dbFile" accept=".db,.sqlite,.sqlite3" hidden>
      <button class="btn primary" id="dbDown">⭳ Baixar .db atual</button><button class="btn" id="dbUndo">↶ Desfazer</button><button class="btn warn" id="dbReset">Restaurar original</button></div>
    <label class="chk"><input type="checkbox" id="dbRecalc" checked> Recalcular indicadores calculados automaticamente</label>
    <label class="chk"><input type="checkbox" id="dbSave" checked> Guardar alterações neste navegador</label>
    <p class="note">Com "guardar" ligado, a base editada volta quando você reabrir o arquivo neste navegador. "Restaurar original" volta para a base embutida no HTML (dá para desfazer).</p>
    <p class="note" style="margin-top:10px"><b>Histórico desta sessão</b></p><div class="hist" id="dbHist"></div>`;
  $('sqlRun').onclick=runSQL;$('sqlClear').onclick=()=>{$('sqlIn').value='';$('sqlMsg').innerHTML='';$('sqlOut').hidden=true;$('sqlIn').focus();};
  $('sqlEx').onchange=e=>{const i=e.target.value;if(i!=='')$('sqlIn').value=EX[+i][1];e.target.value='';$('sqlIn').focus();};
  $('sqlIn').addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){e.preventDefault();runSQL();}
    if(e.key==='Tab'){e.preventDefault();const t=e.target,p=t.selectionStart;t.value=t.value.slice(0,p)+'  '+t.value.slice(t.selectionEnd);t.selectionStart=t.selectionEnd=p+2;}});
  $('dbFile').onchange=e=>{const f=e.target.files[0];if(f)loadFile(f);e.target.value='';};
  document.querySelector('label[for="dbFile"]').onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();$('dbFile').click();}};
  $('dbDown').onclick=downloadDb;$('dbUndo').onclick=undo;
  $('dbReset').onclick=()=>swapDb(new SQL.Database(b64ToU8(DB_B64)),{kind:'original',name:'petrobras_2020_2025.db',ts:null},'Base original restaurada');
  $('dbSave').onchange=e=>{if(e.target.checked)persist();else clearPersist();};
  renderSchema();renderDbStatus();
}
function renderDbStatus(){
  const kv=$('dbKv');if(!kv)return;
  const cnt=q("SELECT origem, COUNT(*) n FROM valor GROUP BY origem"),tot=cnt.reduce((a,r)=>a+r.n,0);
  const size=db.exec('PRAGMA page_count')[0].values[0][0]*db.exec('PRAGMA page_size')[0].values[0][0];
  const lbl={original:'Base original (embutida no HTML)',file:'Arquivo carregado',edited:'Editada via SQL'}[SRC.kind]||SRC.kind;
  kv.innerHTML=`<dt>Origem</dt><dd>${esc(lbl)}${SRC.kind!=='original'?'<br><span style="font-weight:400;color:var(--muted)">'+esc(SRC.name||'')+'</span>':''}</dd>
    <dt>Última alteração</dt><dd>${SRC.ts?new Date(SRC.ts).toLocaleString('pt-BR'):'–'}</dd>
    <dt>Anos</dt><dd>${ALL[0]}–${ALL[ALL.length-1]} (${ALL.length})</dd><dt>Indicadores</dt><dd>${D.indicadores.length} em ${D.secoes.length} seções</dd>
    <dt>Valores</dt><dd>${tot} · ${cnt.map(r=>r.n+' '+esc(String(r.origem).toLowerCase())).join(' · ')}</dd><dt>Tamanho</dt><dd>${F.n(size/1024,0)} KB</dd>`;
  $('dbUndo').disabled=!UNDO.length;$('dbUndo').textContent='↶ Desfazer'+(UNDO.length?' ('+UNDO.length+')':'');
  $('dbHist').innerHTML=HIST.length?HIST.slice(0,20).map(h=>`<div>[${h.ts.toLocaleTimeString('pt-BR')}] ${esc(h.sql.length>220?h.sql.slice(0,220)+'…':h.sql)}${h.changed?` <b>(${h.changed} linha(s))</b>`:''}</div>`).join(''):'<div style="color:var(--muted)">Nenhuma alteração ainda.</div>';
}
function renderSchema(){
  const el=document.querySelector('[data-id="schema"] .body');if(!el)return;
  const objs=q("SELECT name,type FROM sqlite_master WHERE type IN ('table','view') AND name NOT LIKE 'sqlite_%' ORDER BY type,name");
  const cards=objs.map(o=>{const cols=db.exec(`PRAGMA table_info("${o.name.replace(/"/g,'""')}")`);const cs=cols.length?cols[0].values:[];
    let n='';try{n=db.exec(`SELECT COUNT(*) FROM "${o.name.replace(/"/g,'""')}"`)[0].values[0][0];}catch(e){}
    return `<div class="t"><b>${esc(o.name)}</b> <span style="font-size:11px;color:var(--muted)">${o.type==='view'?'view':'tabela'} · ${n} linhas</span>${cs.map(c=>`<div>${esc(c[1])} <span>${esc(c[2]||'')}${c[5]?' · PK':''}</span></div>`).join('')}</div>`;}).join('');
  const list=D.indicadores.map(i=>`<tr><td>${i.id}</td><td>${esc(i.secao)}</td><td style="text-align:left">${esc(i.nome)}</td><td style="text-align:left">${esc(i.unidade)}</td><td style="text-align:left">${esc(i.tipo)}</td></tr>`).join('');
  el.innerHTML=`<div class="schema">${cards}</div>
    <details style="margin-top:12px"><summary style="cursor:pointer;font-size:13px;font-weight:600;color:var(--accent-ink)">Lista de indicadores (id, seção, nome, unidade, tipo)</summary>
    <div class="tbl" style="max-height:380px"><table><thead><tr><th>id</th><th>Seção</th><th style="text-align:left">Indicador</th><th style="text-align:left">Unidade</th><th style="text-align:left">Tipo</th></tr></thead><tbody>${list}</tbody></table></div></details>`;
}

/* ============================================================
   INIT
   ============================================================ */
function init(){
  fRef=$('fRef');fFrom=$('fFrom');fTo=$('fTo');fBase=$('fBase');fHm=$('fHm');fLog=$('fLog');fShift=$('fShift');fDer=$('fDer');
  $('tabs').innerHTML=PAGES.map(([p,t],i)=>`<button data-p="${p}"><span class="n">${String(i+1).padStart(2,'0')}</span>${t}</button>`).join('');
  $('tabs').querySelectorAll('button').forEach(b=>b.onclick=()=>show(b.dataset.p));
  rebuildSelects();opts(fDer,DERIV.map(d=>[d.k,d.k]),S.der);
  buildCards();buildData();syncControls();updateChip();
  $('themeBtn').onclick=()=>applyTheme(THEME==='dark'?'light':'dark',true);
  $('dataChip').onclick=()=>show('p10');
  fRef.onchange=()=>{S.ref=+fRef.value;refresh();};
  fFrom.onchange=()=>{S.from=+fFrom.value;if(S.ref<S.from)S.ref=S.from;if(S.base>=S.to)S.base=S.from;syncControls();refresh();};
  fTo.onchange=()=>{S.to=+fTo.value;if(S.ref>S.to)S.ref=S.to;if(S.base>=S.to)S.base=Math.min(S.from,S.to-1);syncControls();refresh();};
  fBase.onchange=()=>{S.base=+fBase.value;refresh();};
  document.querySelectorAll('#fCur button').forEach(b=>b.onclick=()=>{S.cur=b.dataset.v;syncControls();refresh();});
  document.querySelectorAll('#fLucro button').forEach(b=>b.onclick=()=>{S.lucro=b.dataset.v;syncControls();refresh();});
  fHm.onchange=()=>{S.hm=fHm.value;renderChart('c_heat');charts.c_heat&&charts.c_heat.resize();};
  fLog.onchange=()=>{S.log=fLog.checked;renderChart('c_index');};
  fShift.onchange=()=>{S.shift=fShift.checked;renderChart('c_capex');};
  fDer.onchange=()=>{S.der=fDer.value;['c_mixp','c_mixv','c_slope','c_ratio','c_ratio_ts'].forEach(renderChart);};
  $('fReset').onclick=()=>{const p=S.page;Object.assign(S,DEF,{page:p});syncControls();refresh();};
  let rt;window.addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(()=>{refresh();},180);});
  const h=(location.hash||'').slice(1);show(PAGES.some(p=>p[0]===h)?h:'p1');
}
function fatal(t){document.querySelector('main').insertAdjacentHTML('afterbegin',`<div class="msg err" style="margin-bottom:16px">${esc(t)}</div>`);}
async function boot(){
  applyTheme(initialTheme(),false);
  if(typeof echarts==='undefined'){fatal('A biblioteca de gráficos (ECharts) não carregou.');return;}
  if(typeof initSqlJs==='undefined'){fatal('O motor SQLite (sql.js) não carregou.');return;}
  try{SQL=await initSqlJs({wasmBinary:b64ToU8(SQL_WASM_B64)});}catch(e){fatal('Falha ao iniciar o SQLite no navegador: '+e.message);return;}
  let saved=null,meta=null;try{saved=localStorage.getItem(LS_DB);meta=JSON.parse(localStorage.getItem(LS_META)||'null');}catch(e){}
  if(saved){try{const d=new SQL.Database(b64ToU8(saved));if(!schemaOK(d)){db=d;SRC=meta||{kind:'edited',name:'',ts:null};}else d.close();}catch(e){}}
  if(!db){db=new SQL.Database(b64ToU8(DB_B64));SRC={kind:'original',name:'petrobras_2020_2025.db',ts:null};}
  loadData();Object.assign(S,DEF);init();
}
window.__dash={S,R,charts,refresh,show,get db(){return db;},run:sql=>{$('sqlIn').value=sql;runSQL();},theme:t=>applyTheme(t,true)};
document.addEventListener('DOMContentLoaded',boot);
})();
