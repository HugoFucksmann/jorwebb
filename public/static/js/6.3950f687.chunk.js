(this.webpackJsonpjorweb=this.webpackJsonpjorweb||[]).push([[6],{231:function(e,t,r){"use strict";var n=r(21),a=r(0);t.a=function(e){var t=Object(a.useState)(null),r=Object(n.a)(t,2),c=r[0],o=r[1];return Object(a.useEffect)((function(){var t=new Image;t.src=e,t.onload=function(){return o(e)}}),[e]),c}},333:function(e,t,r){"use strict";r.r(t);var n=r(7),a=r.n(n),c=r(60),o=r(10),i=r(12),s=r(21),u=r(0),l=r(121),d=r(35),p=r(227),b=r(292),h=r(217),j=r.p+"static/media/portyt.4a15f96c.jpeg",m=r.p+"static/media/hacemosLogo.c17af448.png",f=r(280),g=r(44),y=r(37),x=r(38),O=r(18),v=r.n(O),k=r(281),w=r.n(k),S=new(function(){function e(){Object(y.a)(this,e)}return Object(x.a)(e,[{key:"token",get:function(){return localStorage.getItem("token")||""}},{key:"headers",get:function(){return{headers:{token:this.token}}}},{key:"getSumate",value:function(){var e=Object(i.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.a.get("".concat("https://jorweb.herokuapp.com/jorweb/api","/sumate"),this.headers).then((function(e){return e.data.sumate.filter((function(e){return e._id})).reverse()})).catch((function(e){return console.log(e),[]}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"crearSumate",value:function(){var e=Object(i.a)(a.a.mark((function e(t,r){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.a.post("".concat("https://jorweb.herokuapp.com/jorweb/api","/sumate"),{sumate:t,token:r}).then((function(e){var t=e.data;return console.log("la data de sumate y el token ",t),t.ok?w.a.fire("envio con exito","te contactaremos en breve !!","success"):w.a.fire("error al enviar el formulario ","","error")})).catch((function(e){return console.log(e),w.a.fire("ocurrio un error","estamos trabajando para repararlo :)","error")}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}()},{key:"borrarSumate",value:function(e){var t="".concat("https://jorweb.herokuapp.com/jorweb/api","/sumate/").concat(e);return v.a.delete(t,this.headers).then((function(){return alert("Borrado","","success")})).catch((function(e){return console.log(e)}))}},{key:"actualizarSumate",value:function(){var e=Object(i.a)(a.a.mark((function e(t,r){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.a.put("".concat("https://jorweb.herokuapp.com/jorweb/api","/sumate/").concat(t),r,this.headers).catch((function(e){return console.log(e)}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));return function(t,r){return e.apply(this,arguments)}}()}]),e}()),C=r(231),A=r(88),M=r(2),z=function(){var e=Object(f.b)().executeRecaptcha,t=Object(C.a)(j),r=Object(u.useState)({nombre:"",apellido:"",dni:"",tel:"",email:"",ayuda:[]}),n=Object(s.a)(r,2),y=n[0],x=n[1];function O(){return(O=Object(i.a)(a.a.mark((function t(){var r;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e();case 2:return r=t.sent,console.log(r),t.next=6,S.crearSumate(y,r);case 6:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return t?Object(M.jsxs)(M.Fragment,{children:[Object(M.jsx)("div",{children:Object(M.jsx)("img",{alt:"hacemos santa fe",style:{height:g.isMobile?60:80,margin:10},src:m})}),Object(M.jsx)("div",{style:{display:"flex",backgroundImage:"url(".concat(t,")"),backgroundSize:"cover",width:"100%"},children:Object(M.jsxs)(l.a,{style:{flexDirection:"column",display:"flex",width:g.isMobile?"80%":320,marginLeft:g.isMobile?30:40,marginTop:20,marginBottom:10},children:[Object(M.jsx)("div",{style:{backgroundColor:"rgba(61, 194, 227)",height:50},children:Object(M.jsx)(d.a,{style:{fontSize:22,padding:10,fontWeight:"bold",color:"#fff"},children:"SUMATE"})}),Object(M.jsxs)("div",{style:{padding:20,display:"flex",flexDirection:"column"},children:[E.map((function(e){return Object(M.jsxs)("div",{style:{marginBottom:20},children:[Object(M.jsx)(d.a,{children:e.name}),Object(M.jsx)(p.a,{size:"small",variant:"outlined",type:e.type,onChange:function(t){return x(Object(o.a)(Object(o.a)({},y),{},Object(c.a)({},e.id,t.target.value)))}})]},e.id)})),Object(M.jsx)(d.a,{style:{fontSize:22},children:"\xbfC\xf3mo te gustar\xeda participar?"}),I.map((function(e){return Object(M.jsx)("div",{children:Object(M.jsxs)(d.a,{style:{fontSize:g.isMobile?12:14},children:[Object(M.jsx)(b.a,{color:"primary",checked:y.ayuda===e,onChange:function(){return x(Object(o.a)(Object(o.a)({},y),{},{ayuda:e}))},inputProps:{"aria-label":"primary checkbox"}}),e]})},e)}))]}),Object(M.jsx)(h.a,{onClick:function(){return function(){return O.apply(this,arguments)}()},color:"primary",variant:"contained",disabled:!(y.nombre.length>0&&y.apellido.length>0&&y.dni.length>0&&y.tel.length>0&&y.ayuda.length>0),children:"ENVIAR"})]})}),Object(M.jsx)("div",{style:{height:"12vh"},children:Object(M.jsx)("img",{alt:"jorgelina mudallel",style:{height:g.isMobile?60:80,margin:10},src:m})})]}):Object(M.jsx)(A.a,{})},E=[{id:"nombre",name:"Nombre",type:"text"},{id:"apellido",name:"Apellido",type:"text"},{id:"dni",name:"DNI",type:"number"},{id:"tel",name:"Numero de tel\xe9fono  m\xf3vil",type:"number"},{id:"email",name:"Correo electr\xf3nico",type:"email"}],I=["En Redes Sociales (Voluntario Digital)","Recorriendo los Barrios","Llamando a otras personas a sumarse","Siendo Fiscal","Colaborar con alimentos o vestimenta"];t.default=function(){return Object(M.jsx)(f.a,{reCaptchaKey:"6LdYrcQbAAAAAM78NjeWXTImZjXMRP-dLU-B8CEv",language:"es",useEnterprise:!0,children:Object(M.jsx)(z,{})})}}}]);
//# sourceMappingURL=6.3950f687.chunk.js.map