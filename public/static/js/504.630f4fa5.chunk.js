"use strict";(self.webpackChunkjora_web=self.webpackChunkjora_web||[]).push([[504],{1504:(e,t,a)=>{a.r(t),a.d(t,{default:()=>g});var o=a(5043),n=a(454),l=a(495),r=a(8655),s=a(105),i=a(7154);const c=new class{get token(){return localStorage.getItem("token")||""}get headers(){return{headers:{"x-token":this.token}}}async login(e,t,a){console.log("".concat("https://65f05f8866d744124245ea0e--lively-toffee-4b41d9.netlify.app/jorweb/api","/login"));try{await i.A.post("".concat("https://65f05f8866d744124245ea0e--lively-toffee-4b41d9.netlify.app/jorweb/api","/login"),{usuario:e,password:t}).then((e=>{localStorage.setItem("token",e.data.token),a.history.push("/fform")})).catch((e=>{console.log(e),alert("error al loguearse","","error")}))}catch(o){console.log(o)}}logout(e){this.authenticated=!1,e.history.push("/"),localStorage.removeItem("token")}validarToken(){return i.A.get("".concat("https://65f05f8866d744124245ea0e--lively-toffee-4b41d9.netlify.app/jorweb/api","/login/renew"),this.headers).then((e=>console.log(e)))}};var d=a(579);const g=e=>{const[t,a]=(0,o.useState)(""),[i,g]=(0,o.useState)("");return(0,d.jsx)(n.A,{container:!0,spacing:0,direction:"column",alignItems:"center",justify:"center",style:{minHeight:"100vh"},children:(0,d.jsxs)(l.A,{elevation:5,style:{flexDirection:"column",display:"flex",padding:60},children:[(0,d.jsx)(r.A,{variant:"outlined",id:"standard-basic",label:"Usuario",style:{marginBottom:20},value:t,onChange:e=>a(e.target.value)}),(0,d.jsx)(r.A,{variant:"outlined",id:"standard-basic",label:" Contrase\xf1a ",style:{marginBottom:20},value:i,onChange:e=>g(e.target.value)}),(0,d.jsx)(s.A,{disabled:!(t.length>0&&i.length>0),variant:"contained",color:"primary",onClick:()=>async function(){c.login(t,i,e)}(),children:"Acceder"})]})})}}}]);
//# sourceMappingURL=504.630f4fa5.chunk.js.map