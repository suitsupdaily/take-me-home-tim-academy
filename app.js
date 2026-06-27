const units = [
  {
    label:'Unit 1', title:'Land, Real Property, and Real Estate', theme:'Everything begins with the land.',
    podcast:`Welcome to Take Me Home Tim Academy. Today we begin with the foundation of every real estate career: land, real estate, and real property.

Imagine standing on a quiet Iowa hill outside Earlham. No house. No fence. No driveway. Just soil, rocks, air, and space. That is land. Land is the earth itself and the natural things connected to it.

Now imagine someone builds a farmhouse, pours a foundation, plants trees, digs a well, and adds a garage. The land plus those permanent improvements becomes real estate.

Now imagine someone buys that property. They do not just receive dirt and a building. They receive rights: the right to possess it, control it, enjoy it, exclude others from it, and sell it or give it away. That package is real property.

Remember it this way: land is nature. Real estate is land plus permanent improvements. Real property is real estate plus ownership rights.

The big exam phrase is bundle of rights. Picture five arrows in a quiver: possess, control, enjoy, exclude, and dispose. Sometimes one arrow can be limited. A utility easement, for example, may let a company access part of the property. The owner still owns it, but one right has a limit.

In real life, clients will not usually ask you for a textbook definition. They will ask whether the chandelier stays, whether the TV mount is included, whether the shed is part of the deal, or whether the seller can take the built-in shelves. This unit helps you answer those questions with calm confidence.

Your goal is not just to pass the test. Your goal is to become trusted. This first unit gives you the language of ownership, and that language is the beginning of becoming a true real estate professional.`,
    notes:['Land = natural earth, airspace, minerals, and water rights where applicable.','Real estate = land plus permanent improvements.','Real property = real estate plus legal ownership rights.','Personal property = movable items not permanently attached.','Bundle of rights = possess, control, enjoy, exclude, dispose.'],
    memory:['Land = nature.','Real Estate = everything stuck to the earth.','Real Property = real estate plus rights.','L → RE → RP means Land, then buildings, then rights.'],
    confidence:'This is the vocabulary of ownership. When you can explain what stays, what goes, and what rights are involved, clients feel safer with you.',
    quiz:[
      {q:'Which term includes ownership rights?', a:'Real property', choices:['Land','Real estate','Real property','Personal property']},
      {q:'Land plus permanent improvements is called:', a:'Real estate', choices:['Personal property','Real estate','Bundle of rights','Chattel']},
      {q:'Which is usually personal property unless included by contract?', a:'A couch', choices:['A foundation','A furnace','A couch','A built-in cabinet']},
      {q:'The right to sell or transfer property is the right to:', a:'Dispose', choices:['Exclude','Dispose','Enjoy','Possess']}
    ]
  },
  {label:'Unit 2', title:'Coming Soon', theme:'Fixtures, personal property, and what stays with the house.', podcast:'Unit 2 is ready to be built when you send the next CE Shop topic.', notes:['Send the next unit title or lesson text.'], memory:['One unit at a time wins the license.'], confidence:'Progress beats perfection.', quiz:[]}
];
let current=0;
const $=id=>document.getElementById(id);
function save(key,val){localStorage.setItem(key,JSON.stringify(val))}
function load(key,def){try{return JSON.parse(localStorage.getItem(key))??def}catch{return def}}
let complete=load('tmht_complete',{});
function render(){const u=units[current];$('unitLabel').textContent=u.label;$('unitTitle').textContent=u.title;$('unitTheme').textContent=u.theme;$('podcastText').textContent=u.podcast;
 $('notesList').innerHTML=u.notes.map(x=>`<li>${x}</li>`).join(''); $('memoryList').innerHTML=u.memory.map(x=>`<li>${x}</li>`).join(''); $('confidenceText').textContent=u.confidence;
 $('quiz').innerHTML=u.quiz.length?u.quiz.map((qq,i)=>`<div class="question"><strong>${i+1}. ${qq.q}</strong>${qq.choices.map(c=>`<label><input type="radio" name="q${i}" value="${c}"> ${c}</label>`).join('')}</div>`).join(''):'<p>Quiz coming soon.</p>'; $('quizResult').textContent=''; updateProgress();}
function updateProgress(){let pct=Math.round(Object.keys(complete).filter(k=>complete[k]).length/units.length*100);$('progressBar').style.width=pct+'%';$('progressText').textContent=pct+'% complete';}
$('unitTabs').innerHTML=units.map((u,i)=>`<button onclick="current=${i}; render()">${u.label}</button>`).join('');
$('playBtn').onclick=()=>{speechSynthesis.cancel(); const utter=new SpeechSynthesisUtterance(units[current].podcast); utter.rate=parseFloat($('rate').value); utter.pitch=1; utter.onend=()=>{complete[units[current].label]=true;save('tmht_complete',complete);updateProgress()}; speechSynthesis.speak(utter)};
$('pauseBtn').onclick=()=> speechSynthesis.paused ? speechSynthesis.resume() : speechSynthesis.pause();
$('stopBtn').onclick=()=> speechSynthesis.cancel();
$('checkQuiz').onclick=()=>{const u=units[current]; if(!u.quiz.length)return; let score=0; u.quiz.forEach((qq,i)=>{const pick=document.querySelector(`input[name=q${i}]:checked`); if(pick&&pick.value===qq.a)score++;}); $('quizResult').textContent=`You scored ${score}/${u.quiz.length}. ${score===u.quiz.length?'Bingo. Realtor brain activated.':'Review the notes, then try again.'}`; if(score===u.quiz.length){complete[u.label]=true;save('tmht_complete',complete);updateProgress();}};
$('resetBtn').onclick=()=>{complete={};save('tmht_complete',complete);updateProgress()};
if('serviceWorker' in navigator){navigator.serviceWorker.register('sw.js')}
render();
