/* ============================================================
   Motor de recálculo dos indicadores calculados/mistos
   Replica as fórmulas da coluna indicador.formula_excel.
   Só sobrescreve linhas com origem='Calculado' (ou inexistentes);
   valores 'Reportado' nunca são alterados.
   ============================================================ */
function petroRecalc(db, acoes){
  const M={},O={},tipo={};
  const rv=db.exec('SELECT indicador_id,ano,valor,origem FROM valor');
  const rows=rv.length?rv[0].values:[];
  rows.forEach(([id,y,v,o])=>{(M[id]=M[id]||{})[y]=v;(O[id]=O[id]||{})[y]=o;});
  const yrs=[...new Set(rows.map(r=>r[1]))].sort((a,b)=>a-b);
  const ri=db.exec('SELECT id,tipo FROM indicador');
  if(ri.length)ri[0].values.forEach(([id,t])=>tipo[id]=t);
  const q=(id,y)=>{const v=M[id]&&M[id][y];if(v==null||!isFinite(v))throw 0;return v;};
  const P=y=>q(33,y)*365/1e6;              // produção anual (bi boe)
  const sum=(ids,y)=>ids.reduce((a,id)=>a+q(id,y),0);
  const F=[
    [4, y=>q(1,y)*q(2,y)],                                   // Brent R$
    [8, y=>q(7,y)*q(3,y)],                                   // VM R$ (misto)
    [7, y=>q(8,y)/q(3,y)],                                   // VM US$ (misto)
    [6, y=>q(6,y+1)/(1+q(5,y+1)), true],                     // Cotação PETR4 (misto, de trás pra frente)
    [30,y=>q(29,y)*q(3,y)],                                  // DL R$
    [9, y=>q(8,y)+q(30,y)],                                  // EV
    [11,y=>q(10,y)/acoes],                                   // DPA
    [12,y=>q(20,y)/acoes],                                   // LPA
    [13,y=>q(10,y)/q(20,y)],                                 // Payout
    [14,y=>q(10,y)/q(8,y)],                                  // DY
    [15,y=>q(8,y)/q(20,y)],                                  // P/L
    [16,y=>q(9,y)/q(19,y)],                                  // EV/EBITDA
    [22,y=>q(18,y)/q(17,y)],[23,y=>q(19,y)/q(17,y)],[24,y=>q(20,y)/q(17,y)],
    [27,y=>q(26,y)/q(10,y)],
    [35,y=>q(33,y)-q(34,y)],[37,y=>q(36,y)/q(33,y)],
    [39,y=>q(38,y)/P(y)],
    [40,y=>{const prev=(M[38]&&M[38][y-1]!=null)?M[38][y-1]:(y===2020?9.59:null);if(prev==null)throw 0;return (q(38,y)-prev+P(y))/P(y);}],
    [49,y=>q(42,y)-sum([43,44,45,46,47,48],y)],[50,y=>sum([43,44,45],y)/q(42,y)],
    [58,y=>q(51,y)-sum([52,53,54,55,56,57],y)],[59,y=>sum([52,53,55],y)/q(51,y)],
    [60,y=>q(42,y)/q(51,y)],[63,y=>q(61,y)-q(62,y)],
    [65,y=>q(64,y)*q(2,y)],[66,y=>q(65,y)/q(25,y)],[67,y=>q(65,y)/q(17,y)],[69,y=>q(68,y)/5],
    [86,y=>q(81,y)/q(17,y)],[87,y=>q(81,y)*1000/365],[89,y=>q(34,y)/q(88,y)],[90,y=>q(78,y)+q(79,y)]
  ];
  const ups=[];let changed=0;
  F.forEach(([id,f,desc])=>{
    if(!tipo[id]||tipo[id]==='Reportado')return;
    (desc?[...yrs].reverse():yrs).forEach(y=>{
      const o=O[id]&&O[id][y];if(o&&o!=='Calculado')return;
      let v;try{v=f(y);}catch(e){return;}
      if(v==null||!isFinite(v))return;
      const old=M[id]&&M[id][y];if(old==null||Math.abs(old-v)>1e-9*Math.max(1,Math.abs(v)))changed++;
      (M[id]=M[id]||{})[y]=v;(O[id]=O[id]||{})[y]='Calculado';ups.push([id,y,v]);
    });
  });
  if(ups.length){
    const st=db.prepare("INSERT INTO valor(indicador_id,ano,valor,origem) VALUES(?,?,?,'Calculado') ON CONFLICT(indicador_id,ano) DO UPDATE SET valor=excluded.valor WHERE valor.origem='Calculado'");
    db.exec('SAVEPOINT recalc');
    try{ups.forEach(u=>st.run(u));db.exec('RELEASE recalc');}catch(e){db.exec('ROLLBACK TO recalc');db.exec('RELEASE recalc');st.free();throw e;}
    st.free();
  }
  return {written:ups.length,changed};
}
if(typeof module!=='undefined')module.exports={petroRecalc};
