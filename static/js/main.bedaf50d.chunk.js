(this.webpackJsonpfrankbot=this.webpackJsonpfrankbot||[]).push([[0],{16:function(e,t,n){e.exports=n.p+"static/media/frank-deboosere.4795c658.jpg"},19:function(e,t,n){e.exports=n.p+"static/media/brain.68699961.rive"},21:function(e,t,n){e.exports=n(43)},26:function(e,t,n){},27:function(e,t,n){},43:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(15),s=n.n(c),u=(n(26),n(27),n(16)),o=n.n(u),i=n(1),l=n.n(i),p=n(2),m=n(20),f=n(3),b=n(17),h=n.n(b),d=n(18),v=n.n(d),g="https://api.openweathermap.org/data/2.5/",E="f5e62cea3e7d485815ffe62d8edc70c6",k=n(19),j=n.n(k),y=Object(a.createContext)(),O=function(e){var t=e.children,n=Object(a.useState)(),c=Object(f.a)(n,2),s=c[0],u=c[1],o=Object(a.useState)(),i=Object(f.a)(o,2),m=i[0],b=i[1];function h(){return(h=Object(p.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s.loadFile(j.a);case 3:s.sortReplies(),s.setUservar("local-user","location","gent"),console.log("De chatbot is ge\xefnitialiseerd!"),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function d(e){return s.reply("local-user",e)}function k(e,t){return O.apply(this,arguments)}function O(){return(O=Object(p.a)(l.a.mark((function e(t,n){var a,c,s,u;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a="".concat(g,"weather?q=").concat(n[0],"&units=metric&lang=nl&APPID=").concat(E),e.next=3,fetch(a);case 3:return c=e.sent,e.next=6,c.json();case 6:s=e.sent,u="",e.t0=n[1],e.next="temperatuur"===e.t0?11:"wind"===e.t0?13:"regen"===e.t0?15:17;break;case 11:return u="Het is nu ".concat(parseInt(s.main.temp),"\xb0C in ").concat(s.name,"."),e.abrupt("break",20);case 13:return u="Er zijn momenteel windsnelheden van ".concat(parseInt(s.wind.speed)," meter per seconde in ").concat(s.name,"."),e.abrupt("break",20);case 15:return u=s.rain?"Het voorbije uur heeft het ".concat(parseInt(s.rain.rain["1h"]),"mm/m\xb2 geregend in ").concat(s.name,"."):"Het voorbije uur heeft het niet geregend in ".concat(s.name,"."),e.abrupt("break",20);case 17:return m.callback("De weersvoorspelling voor vandaag is ".concat(s.weather[0].description," in ").concat(s.name,".")),m.callback(r.a.createElement(r.a.Fragment,null,r.a.createElement("button",{className:"chatButton",onClick:function(){return w("temperatuur")}},"Temperatuur"),r.a.createElement("button",{className:"chatButton",onClick:function(){return w("wind")}},"Wind"),r.a.createElement("button",{className:"chatButton",onClick:function(){return w("regen")}},"Regen"))),e.abrupt("break",20);case 20:return e.abrupt("return",u);case 21:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function w(e){return x.apply(this,arguments)}function x(){return(x=Object(p.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return m.callback(t.trim(),!0),e.next=3,d(t);case 3:n=e.sent,m.callback(n.trim());case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}Object(a.useEffect)((function(){u(new v.a)}),[]),Object(a.useEffect)((function(){s&&m&&s.setSubroutine("getWeather",k)}),[s,m]),Object(a.useEffect)((function(){s&&function(){h.apply(this,arguments)}()}),[s]);var N={setAddToDisplay:b,reply:d,botReady:!!s};return r.a.createElement(y.Provider,{value:N},t)},w=function(){var e=Object(a.useState)(""),t=Object(f.a)(e,2),n=t[0],c=t[1],s=Object(a.useState)([]),u=Object(f.a)(s,2),o=u[0],i=u[1],b=Object(a.useRef)(null),d=Object(a.useContext)(y),v=d.reply,g=d.setAddToDisplay,E=d.botReady;function k(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];""!==e&&i((function(n){return[].concat(Object(m.a)(n),[{message:e,isUser:t}])}))}function j(){return(j=Object(p.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(n.trim().length<1)){e.next=3;break}return c(""),e.abrupt("return");case 3:O(n),c("");case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function O(e){return w.apply(this,arguments)}function w(){return(w=Object(p.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return k(t.trim(),!0),e.next=3,v(t);case 3:k(e.sent.trim());case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(a.useEffect)((function(){E&&g({callback:k})}),[E]),Object(a.useEffect)((function(){b.current&&b.current.scrollTo({top:b.current.scrollHeight})}),[o]),r.a.createElement("div",{className:"chatContainer"},r.a.createElement("div",{className:"chatDisplay",ref:b},o.map((function(e,t){return r.a.createElement("div",{key:"message-".concat(t),className:h()("chatMessage","".concat(e.isUser&&"chatMessage--user"))},e.message)}))),r.a.createElement("form",{className:"chatForm",autoComplete:"off",onSubmit:function(e){e.preventDefault(),function(){j.apply(this,arguments)}()}},r.a.createElement("input",{className:"chatInput",type:"text",name:"chatInput",id:"chatInput",onChange:function(e){c(e.target.value)},value:n,autoFocus:!0}),r.a.createElement("button",{type:"submit",className:"chatSend"},"Verstuur")))};var x=function(){return r.a.createElement("div",{className:"app"},r.a.createElement("header",{className:"appHeader container"},r.a.createElement("div",{className:"inner"},r.a.createElement("img",{src:o.a,alt:"Frank Deboosere"}),r.a.createElement("h1",null,"Frankbot"))),r.a.createElement("main",{className:"appMain container fullHeight"},r.a.createElement("div",{className:"inner fullHeight"},r.a.createElement(w,null))))};s.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(O,null,r.a.createElement(x,null))),document.getElementById("root"))}},[[21,1,2]]]);
//# sourceMappingURL=main.bedaf50d.chunk.js.map