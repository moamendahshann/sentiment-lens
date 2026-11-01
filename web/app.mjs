import {infer,tokenize} from './model.mjs';
const $=id=>document.getElementById(id),button=$('analyze');let model;
const labels={positive:'إشارة إيجابية',negative:'إشارة سلبية',uncertain:'إشارة غير حاسمة',unknown:'مفردات غير معروفة'};
function reset(){$('result').hidden=true;$('empty').hidden=false;$('elapsed').textContent='';$('status').textContent=''}
$('review').oninput=()=>{const value=$('review').value;$('counter').textContent=`${value.length} / 2000`;reset()};
$('clear').onclick=()=>{$('review').value='';$('review').oninput();$('review').focus()};
for(const b of document.querySelectorAll('[data-example]'))b.onclick=()=>{$('review').value=b.dataset.example;$('review').oninput();if(model)analyze()};
function analyze(){
 const text=$('review').value.trim();reset();if(!model)return;
 if(/[\u0600-\u06ff]/.test(text)){$('status').textContent='النموذج مدرّب على الإنجليزية فقط. جرّب مراجعة إنجليزية؛ لا تتم ترجمة النص تلقائيًا.';return}
 if(tokenize(text).length<2){$('status').textContent='اكتب كلمتين بالإنجليزية على الأقل أو اختر مثالًا.';return}
 const started=performance.now(),r=infer(text,model);$('elapsed').textContent=`${(performance.now()-started).toFixed(1)} ms · local`;
 $('empty').hidden=true;$('result').hidden=false;$('label').textContent=labels[r.label];$('interpretation').textContent=r.label==='unknown'?'لا توجد سمات تعلّمها النموذج في هذا النص. جرّب مراجعة أقرب إلى مجالات التدريب.':r.label==='uncertain'?'النص قريب من الحد الفاصل، أو قليل الارتباط بالمفردات المتعلّمة. راجع النتيجة بحذر.':'النموذج يميل لهذه الفئة اعتمادًا على الأنماط التي تعلّمها من المراجعات.';
 $('score').textContent=r.positiveScore===null?'—':`${(r.positiveScore*100).toFixed(1)}%`;$('meter').style.width=`${r.positiveScore===null?0:r.positiveScore*100}%`;
 $('contributions').replaceChildren();
 for(const c of r.contributions){const row=document.createElement('div');row.className='term'+(c.value<0?' negative':'');const term=document.createElement('span'),value=document.createElement('span');term.textContent=c.term;value.textContent=(c.value>=0?'+':'')+c.value.toFixed(2);row.append(term,value);row.title=c.value>=0?'مساهمة باتجاه الإيجابية':'مساهمة باتجاه السلبية';$('contributions').append(row)}
}
button.onclick=analyze;
try{
 const [mr,rr]=await Promise.all([fetch('model.json'),fetch('metrics.json')]);if(!mr.ok||!rr.ok)throw Error('download');model=await mr.json();const report=await rr.json();
 if(model.weights.length!==model.vectorizer.vocab.length)throw Error('invalid model');
 $('accuracy').textContent=(report.test.accuracy*100).toFixed(1)+'%';$('baseline').textContent=(report.majorityBaselineAccuracy*100).toFixed(1)+'%';$('testCount').textContent=report.test.samples;
 const names={amazon:'منتجات Amazon',imdb:'أفلام IMDb',yelp:'مطاعم Yelp'};for(const d of report.leaveOneDomainOut){const row=document.createElement('tr');for(const value of [names[d.heldOutDomain],(d.accuracy*100).toFixed(1)+'%',d.macroF1.toFixed(3)]){const td=document.createElement('td');td.textContent=value;row.append(td)}$('domains').append(row)}
 button.disabled=false;button.textContent='حلّل إشارة النص ↗';
}catch{$('status').textContent='تعذر تحميل ملفات النموذج. حدّث الصفحة أو أعد تشغيل الخادم المحلي.';button.textContent='النموذج غير متاح'}
