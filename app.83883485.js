(function(e){function t(t){for(var n,o,a=t[0],d=t[1],l=t[2],u=0,c=[];u<a.length;u++)o=a[u],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&c.push(r[o][0]),r[o]=0;for(n in d)Object.prototype.hasOwnProperty.call(d,n)&&(e[n]=d[n]);p&&p(t);while(c.length)c.shift()();return s.push.apply(s,l||[]),i()}function i(){for(var e,t=0;t<s.length;t++){for(var i=s[t],n=!0,a=1;a<i.length;a++){var d=i[a];0!==r[d]&&(n=!1)}n&&(s.splice(t--,1),e=o(o.s=i[0]))}return e}var n={},r={app:0},s=[];function o(t){if(n[t])return n[t].exports;var i=n[t]={i:t,l:!1,exports:{}};return e[t].call(i.exports,i,i.exports,o),i.l=!0,i.exports}o.m=e,o.c=n,o.d=function(e,t,i){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(o.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(i,n,function(t){return e[t]}.bind(null,n));return i},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/ifg-self-audit/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],d=a.push.bind(a);a.push=t,a=a.slice();for(var l=0;l<a.length;l++)t(a[l]);var p=d;s.push([0,"chunk-vendors"]),i()})({0:function(e,t,i){e.exports=i("56d7")},"2a66":function(e,t,i){},3188:function(e,t,i){},"56d7":function(e,t,i){"use strict";i.r(t);i("a79d");var n=i("2b0e"),r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"container max-w-5xl mx-auto py-8 px-4 print:max-w-none print:p-0"},[i("header",{staticClass:"mb-12 print:mb-4"},[e._m(0),e.done?e._e():i("span",[e._v(" Frage "+e._s(e.currentQuestion+1)+" von "+e._s(e.questionaire.length)+" ")])]),i("div",{staticClass:"bg-gray-100 print:bg-transparent"},[i("div",{staticClass:"h-1 bg-green transition-all duration-200 ease-out print:hidden",style:{width:e.progress+"%"}}),i("div",{staticClass:"p-8 pt-6 print:px-0"},[e.done?i("ResultsView",e._b({attrs:{totalPoints:e.totalPoints,questionaire:e.questionaire,answers:e.answers},on:{restart:e.restart}},"ResultsView",e.resultMessage,!1)):i("MessageView",e._b({attrs:{first:0===e.currentQuestion},on:{next:e.nextQuestion,previous:e.previousQuestion}},"MessageView",e.question,!1))],1)]),e._m(1)])},s=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"print:flex"},[n("div",{staticClass:"print:ml-auto print:order-2"},[n("img",{staticClass:"w-14",attrs:{src:i("9b19")}})]),n("h1",{staticClass:"mt-12 print:mt-0"},[e._v("IFG Self Audit")])])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("footer",{staticClass:"mt-12 print:mt-4 text-sm text-gray-600 flex"},[i("span",[e._v(" Ein Projekt von "),i("a",{attrs:{href:"https://fragdenstaat.de"}},[e._v("FragDenStaat")]),e._v(". ")]),i("span",{staticClass:"ml-auto print:hidden"},[i("a",{attrs:{href:"https://fragdenstaat.de/impressum"}},[e._v("Impressum")])])])}],o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("h2",{domProps:{textContent:e._s(e.sectionTitle||e.title)}}),e.sectionTitle?i("h3",{domProps:{textContent:e._s(e.title)}}):e._e(),i("ContentContainer",{staticClass:"mb-4",attrs:{body:e.body}}),e.error?i("div",{staticClass:"mb-2 mt-8"},[e._m(0)]):e._e(),i("OptionsView",{attrs:{options:e.options},model:{value:e.choice,callback:function(t){e.choice=t},expression:"choice"}}),i("div",{staticClass:"flex mt-8"},[e.first?e._e():i("button",{staticClass:"btn btn-secondary",on:{click:function(t){return e.$emit("previous")}}},[e._v(" Zurück ")]),i("button",{staticClass:"btn btn-primary ml-auto",on:{click:e.next}},[e._v(" Weiter ")])])],1)},a=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("p",[i("strong",[e._v("Fehler:")]),e._v(" Bitte wählen Sie eine der Optionen.")])}],d=i("b49f"),l=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"content-container",domProps:{innerHTML:e._s(e.body)}})},p=[],u={props:["body"]},c=u,h=(i("fd93"),i("2877")),g=Object(h["a"])(c,l,p,!1,null,"504305a6",null),b=g.exports,f=function(){var e=this,t=e.$createElement,i=e._self._c||t;return e.options?i("div",{staticClass:"my-6"},e._l(e.radios,(function(t){return i("div",{key:t.id,staticClass:"flex mb-1"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.choice,expression:"choice"}],attrs:{type:"radio",id:t.id},domProps:{value:t.id,checked:e._q(e.choice,t.id)},on:{change:function(i){e.choice=t.id}}}),i("label",{staticClass:"ml-2 flex-1",attrs:{for:t.id}},[e._v(e._s(t.text))])])})),0):e._e()},m=[],y={props:["options"],data(){return{choice:""}},computed:{radios(){var e;return null===(e=this.options)||void 0===e?void 0:e.map(e=>({...e,id:Math.random().toString(36).substring(7)}))}},watch:{choice(){this.$emit("input",this.radios.find(e=>e.id===this.choice))}}},x=y,v=Object(h["a"])(x,f,m,!1,null,null,null),w=v.exports,k={props:["id","title","body","options","section","first"],components:{ContentContainer:b,OptionsView:w},data(){return{choice:void 0,error:!1}},computed:{sectionTitle(){return this.section&&d["b"][this.section]}},methods:{next(){!this.options||this.choice?this.$emit("next",this.choice):this.error=!0}},watch:{id(){this.error=!1,this.choice=void 0}}},_=k,z=Object(h["a"])(_,o,a,!1,null,null,null),A=z.exports,J=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.title?n("h2",{domProps:{textContent:e._s(e.title)}}):e._e(),n("ContentContainer",{staticClass:"mb-2",attrs:{body:e.body}}),n("div",{staticClass:"barometer"},[n("img",{staticClass:"needle",style:{marginLeft:e.barometerPosition},attrs:{src:i("bf9f")}})]),n("p",[e._v(" Von "),n("strong",[e._v(e._s(e.totalPoints)+" erreichbaren")]),e._v(" Punkten haben Sie "),n("strong",[e._v(e._s(e.collectedPoints)+" Punkt"+e._s(1===e.collectedPoints?"":"e")+" erreicht")]),e._v(". "),0===e.improvements.length?n("span",[e._v(" Sie sind bereits auf dem besten Stand! ")]):n("span",[e._v(" Um mehr Transparenz zu schaffen, nehmen Sie sich folgende Punkte zu Herzen: ")])]),n("ul",{staticClass:"mt-8"},e._l(e.improvements,(function(t,i){var r=t.question;return n("li",{key:i,staticClass:"mb-4",domProps:{innerHTML:e._s(r.guidance)}})})),0),n("button",{staticClass:"btn btn-primary print:hidden mt-4",on:{click:e.print}},[e._v(" Ergebnis drucken ")]),n("button",{staticClass:"btn btn-secondary print:hidden mt-4 ml-2",on:{click:e.restart}},[e._v(" Neu beginnen ")])],1)},N=[],S=(i("ddb0"),{props:["title","body","answers"],data(){return{questionaire:d["a"],totalPoints:d["c"]}},components:{ContentContainer:b},computed:{improvements(){return this.answers.map(e=>({answer:e,question:this.questionaire.find(t=>t.id===e.id)})).filter(({question:e})=>e.options&&e.guidance).filter(({answer:e,question:t})=>{const i=Math.max(...t.options.map(e=>e.points));return i!==e.choice.points}).sort((e,t)=>t.question.priority-e.question.priority)},collectedPoints(){const e=this.answers.reduce((e,t)=>{var i;return e+((null===(i=t.choice)||void 0===i?void 0:i.points)||0)},0);return Math.max(e,0)},barometerPosition(){const e=this.collectedPoints/this.totalPoints;return`calc(${100*e}% - ${e}rem)`}},methods:{print(){window.print()},restart(){window.confirm("Wollen Sie wirklich neustarten?")&&this.$emit("restart")}}}),C=S,W=(i("8cc4"),Object(h["a"])(C,J,N,!1,null,"21ae9e5c",null)),I=W.exports,B=function(e,t){var i,n;const r=/'(.+)' ([!=]=) (\d+)/,[,s,o,a]=r.exec(e.condition)||[];if(!s||!o||!a)return!0;console.log([s,o,a]);const d=null===(i=t.find(e=>e.id===s))||void 0===i||null===(n=i.choice)||void 0===n?void 0:n.points;console.log("p",d);let l=!0;switch(o){case"==":l=d==a;break;case"!=":l=d!=a;break;case"<=":l=d<=a;break;case">=":l=d>=a;break}return console.log("state",l),l};const P=d["a"].pop();var F={name:"App",components:{MessageView:A,ResultsView:I},data(){return{questionaire:d["a"],currentQuestion:0,answers:[],resultMessage:P}},created(){try{const e=localStorage.getItem("store"),t=JSON.parse(e);t.version===d["d"]&&(this.currentQuestion=t.currentQuestion,this.answers=t.answers)}catch{}},methods:{nextQuestion(e){this.answers.push({id:this.question.id,choice:e}),this.currentQuestion++;const t=this.questionaire[this.currentQuestion];B(t,this.answers)||this.nextQuestion()},previousQuestion(){if(this.currentQuestion>0){this.currentQuestion--;const e=this.questionaire[this.currentQuestion],t=this.answers.findIndex(t=>t.id===e.id);t&&this.answers.splice(t,1),B(e,this.answers)||this.previousQuestion()}},restart(){this.answers=[],this.currentQuestion=0},updateStore(){console.log("updated");const e={currentQuestion:this.currentQuestion,answers:this.answers,version:d["d"]};localStorage.setItem("store",JSON.stringify(e))}},computed:{question(){return this.questionaire[this.currentQuestion]},done(){return this.currentQuestion===this.questionaire.length},progress(){return this.currentQuestion/this.questionaire.length*100}},watch:{currentQuestion:"updateStore",answers:"updateStore"}},O=F,G=Object(h["a"])(O,r,s,!1,null,null,null),V=G.exports;i("017a"),i("85b4");n["a"].config.productionTip=!1,new n["a"]({render:e=>e(V)}).$mount("#app")},"85b4":function(e,t,i){},"8cc4":function(e,t,i){"use strict";var n=i("3188"),r=i.n(n);r.a},"9b19":function(e,t,i){e.exports=i.p+"img/logo.580ed694.svg"},b49f:function(e){e.exports=JSON.parse('{"a":[{"options":false,"priority":0,"title":"Willkommen!","id":"0-Intro","body":"<p>Die Zahl der Anfragen nach den Informationszugangsgesetzen steigt kontinuierlich. Für Behörden, die Anfragen bearbeiten müssen, bedeutet dies oft eine große organisatorische Herausforderung.</p>\\n<p>Dieses Self-Audit soll Beamtinnen und Beamten eine Hilfestellung geben, um Prozesse und Grundlagen für die professionelle Bearbeitung der Anfragen zu optimieren.</p>\\n<p>Es basiert auf dem <a href=\\"https://ico.org.uk/about-the-ico/news-and-events/news-and-blogs/2020/07/ico-launches-self-assessment-freedom-of-information-toolkit/\\">“Self Assessment Toolkit”</a> der Britischen Information Commissioner sowie <a href=\\"http://www.itspublicknowledge.info/ScottishPublicAuthorities/Self-AssessmentToolkit/Self-AssessmentToolkitIntroduction.aspx\\">dem Toolkit</a> der Schottischen Beauftragten und ist an den deutschen Kontext angepasst worden. In den Self-Audit sind zudem Forschungen und Erfahrungen der Organisationen <a href=\\"https://www.mysociety.org/2019/05/08/research-report-better-foi-and-sars-management-for-councils/\\">MySociety</a> und FragDenStaat eingeflossen.</p>\\n<h3 id=\\"ziel-des-self-audit-ist-es\\">Ziel des Self-Audit ist es,</h3>\\n<ul>\\n<li>Verantwortlichen in Behörden bei der internen Organisation Hilfestellung zu geben</li>\\n<li>Auf blinde Flecken im Umgang mit Auskunftsanfragen aufmerksam machen</li>\\n<li>Durch Standardisierung die Qualität der Antragsbearbeitung zu verbessern</li>\\n</ul>\\n<h3 id=\\"methodologie\\">Methodologie</h3>\\n<ul>\\n<li>Sie erhalten ca. 50 Multiple-Choice-Fragen zu verschiedenen Dimensionen.</li>\\n<li>Aus den Ergebnissen kann interner Verbesserungsbedarf abgeleitet werden.</li>\\n<li>Antworten werden nicht an uns oder Dritte weitergegeben.</li>\\n</ul>\\n<p>Sie können die Bearbeitung des Self Audits jederzeit pausieren, die Daten werden auf Ihrem Rechner lokal gesichert.</p>\\n"},{"options":false,"priority":0,"title":"Teil 1: Rechtliche und organisatorische Voraussetzungen","id":"1-Rechtliche und organisatorische Voraussetzungen","body":"<p>Diese Voraussetzungen sollte Ihre Organisation erfüllen.</p>\\n"},{"options":[{"text":"Ja","points":5},{"text":"Nein","points":0}],"priority":0,"title":"1.1 Existiert neben dem UIG und VIG auch ein IFG?","id":"1.1","body":"<p>Wenn nein: Gibt es eine Informationsfreiheitssatzung?</p>\\n","guidance":"\\n<h2 id=\\"es-gibt-kein-informationsfreiheitsgesetz\\">Es gibt kein Informationsfreiheitsgesetz.</h2>\\n<p>Dies ist ein für Behördentransparenz essentielles Gesetz und sollte unbedingt geschaffen werden.</p>\\n"},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"1.2.1 Gibt es eine zentrale, offizielle, formelle Verantwortlichkeit, die im Organigramm abgebildet wird?","id":"1.2.1","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"1.2.2 Gibt es eine öffentlich zugängliche Kontaktmöglichkeit?","id":"1.2.2","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"1.3.1 Ist die zuständige Stelle mit ausreichender Zeit und Ressourcen ausgestattet?","id":"1.3.1","body":""},{"options":[{"text":"Keine","points":0},{"text":"Zwischen 1 und 3","points":1},{"text":"Zwischen 3 und 5","points":2},{"text":"Zwischen 5 und 10","points":3}],"priority":0,"title":"1.3.2 Wie viele Personenstellen sind vorgesehen?","id":"1.3.2","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"1.4.1 Gibt es ein Training für zuständige Stellen?","id":"1.4.1","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"1.4.2 Ist dieses Training verpflichtend?","condition":"\'1.4.1\' == 1","id":"1.4.2","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"1.5.1 Gibt es ein behördeninternes Wissensmanagement zum Umgang mit IFG-Anfragen?","id":"1.5.1","body":""},{"options":[{"text":"nichts bis wenig","points":0},{"text":"einiges","points":1},{"text":"viel","points":2}],"priority":0,"title":"1.5.2 Wie viel Wissen zu IFG-Anfragen ist niedergeschrieben?","id":"1.5.2","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"1.6.1 Werden die Vorgaben zur ordnungsgemäßen Aktenführung beachtet?","id":"1.6.1","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"1.6.2 Fließen Erfahrungen mit IFG-Anfragen zurück in Art der Aktenführung?","id":"1.6.2","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"1.6.3 Gibt es klare Vorgaben zur internen Suche von Informationen?","id":"1.6.3","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"1.7 Existiert ein technisches System, das den Umgang mit Anfragen erleichtert?","id":"1.7","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"1.8 Existiert ein effektives System, durch das Fehler bei der Bearbeitung von Anfragen vermieden werden und Teile der Arbeit automatisiert werden?","id":"1.8","body":""},{"options":false,"priority":0,"title":"Teil 2: Behördenkultur","id":"2-Behördenkultur","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"2.1 Ist Offenheit, Transparenz und IFG-Compliance ein erklärtes Ziel der Behörde?","id":"2.1","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"2.2 Geht die Behördenleitung mit gutem Beispiel voran?","id":"2.2","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"2.3 Ist die Beantwortung von Anfragen innerhalb der Fristen ein erklärtes Ziel?","id":"2.3","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"2.4 Ist eine gute Ausstattung der zuständigen Personen/Referate ein erklärtes Ziel?","id":"2.4","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"2.5.1 Werden Statistiken geführt?","section":"2.5","id":"2.5.1","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"2.5.2 Werden regelmäßige Evaluationen durchgeführt?","section":"2.5","id":"2.5.2","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"2.5.3 Werden regelmäßig Verbesserungen im IFG-Management eingeführt?","section":"2.5","id":"2.5.3","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"2.5.4 Wird dies von der Behördenleitung überwacht?","section":"2.5","id":"2.5.4","body":""},{"options":false,"priority":0,"title":"Teil 3: Umgang mit Anfragen","id":"3-Umgang mit Anfragen","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"3.1 Existieren klare und einfach zugängliche interne Vorgaben und Prozesse zum Umgang mit Anfragen?","id":"3.1","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"3.2 Werden die Vorgaben regelmäßig aktualisiert?","id":"3.2","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"3.3 Existieren klare Prozesse zum Umgang mit Rückfragen und Widersprüchen?","id":"3.3","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"3.4 Wird Antragsteller:innen Hilfe bei der Formulierung von Anfragen angeboten? Wird bei Unklarheiten Rücksprache gehalten?","id":"3.4","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"3.5 Werden bei Anfragen alle Anspruchsgrundlagen IFG, UIG und VIG geprüft?","id":"3.5","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"3.6 Werden die Ausnahmetatbestände eng ausgelegt?","id":"3.6","body":""},{"options":false,"priority":0,"title":"Teil 4: Umgang mit Bescheiden","id":"4-Umgang mit Bescheiden","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"4.1 Enthalten Bescheide eine klare Rechtsbehelfsbelehrung?","id":"4.1","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"4.2 Werden (teilweise) Ablehnung eindeutig und verständlich sowie konkret auf den Einzelfall bezogen begründet?","id":"4.2","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"4.3.1 Werden Gebühren nur dann erhoben, wenn dies nicht anders möglich ist? ","id":"4.3.1","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"4.3.2 Werden die Gebühren so bemessen, dass sie so niedrig wie möglich sind und keinesfalls abschreckend wirken?","id":"4.3.2","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"4.4 Werden Informationen in der Form und dem Format herausgegeben, das begehrt wird?","id":"4.4","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"4.5 Beachtet die Behörde Vorgaben zu Open Data?","id":"4.5","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"4.6 Erteilt die Behörde Auskunft, auch wenn kein Auskunftsanspruch besteht, eine Antwort aber unkompliziert möglich ist?","id":"4.6","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"4.7.1 Werden Anfragen unverzüglich, also nicht erst nach Ablauf der Frist beantwortet?","id":"4.7.1","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"4.7.2 Wie viele Anfragen werden innerhalb der Frist beantwortet, wie viele nicht?","id":"4.7.2","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"4.7.3 Hat sich die Bearbeitungszeit verändert in letzter Zeit?","id":"4.7.3","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"4.7.4 Wie reagiert die Behörde auf einen Anstieg von Anfragen?","id":"4.7.4","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"4.8 Werden Widersprüche von einer anderen Person bearbeitet als der ursprüngliche Bescheid?","id":"4.8","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"4.9 Werden Widersprüche unverzüglich bearbeitet?","id":"4.9","body":""},{"options":false,"priority":0,"title":"Teil 5: Datenschutz und Drittbeteiligung","id":"5-Datenschutz und Drittbeteiligung","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"5.1 Werden einfache Anfragen auch dann beantwortet, wenn sie anonym oder unter Pseudonym gestellt werden?","id":"5.1","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"5.2 Wird die Identität von Antragsteller:innen bei Drittbeteiligungen nicht weitergegeben, es sei denn, es besteht Einverständnis darüber?","id":"5.2","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"5.3 Wird eine Drittbeteiligung nur dann eingeleitet, wenn dies wirklich erforderlich ist und Antragsteller:innen keiner Schwärzung von betroffenen Daten zugestimmt haben?","id":"5.3","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"5.4 Wird eine Drittbeteiligung frühzeitig eingeleitet, sodass Antwortfristen eingehalten werden können?","id":"5.4","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"5.5 Werden Vorkehrungen getroffen, um Drittbeteiligungen nicht veranlassen zu müssen (z.B. bei Vertragserstellung Markierung schutzwürdiger Informationen)?","id":"5.5","body":""},{"options":false,"priority":0,"title":"Teil 6: Kommunikation","id":"6-Kommunikation","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"6.1 Stellt die Behörden zentrale Informationen wie den Aktenplan und den Organisationsplan auf ihrer Website bereit?","id":"6.1","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"6.2 Bewirbt die Behörde die Auskunftsmöglichkeit nach dem IFG auf ihrer Website?","id":"6.2","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"6.3 Werden weitere Infos wie Pläne und Gesetzesvorhaben aktiv auf der Website veröffentlicht?","id":"6.3","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"6.4 Veröffentlicht die Behörde Antworten auf IFG-Anfragen zusätzlich auf Ihrer Website (“Access to one, access to all”)?","id":"6.4","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"6.5 Überprüft die Behörde regelmäßig, ob sie alle Anfragen über FragDenStaat.de bearbeitet hat? Sind die Kontaktdaten dort aktuell?","id":"6.5","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"6.6 Wird die Kommunikation mit Antragsteller:innen so gestaltet, dass auch Nicht-Jurist:innen die Antworten der Behörde verstehen können?","id":"6.6","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"6.7 Beantwortet die Behörde Anfragen grundsätzlich elektronisch?","id":"6.7","body":""},{"options":[{"text":"Ja","points":1},{"text":"Nein","points":0}],"priority":0,"title":"6.8 Steht die Behörde im Kontakt mit Bürger:innen, um Feedback entgegenzunehmen und ihre Arbeit zu verbessern?","id":"6.8","body":""},{"options":null,"priority":0,"title":"Fertig!","id":"99-Done","body":"<p>Hier der Überblick.</p>\\n"}],"c":61,"d":"3wxd0o","b":{"2.5":"Fehlerkultur"}}')},bf9f:function(e,t,i){e.exports=i.p+"img/circle.199a29ea.svg"},fd93:function(e,t,i){"use strict";var n=i("2a66"),r=i.n(n);r.a}});
//# sourceMappingURL=app.83883485.js.map