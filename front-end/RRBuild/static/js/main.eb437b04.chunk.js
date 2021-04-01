(this["webpackJsonpstarter-restaurant-reservation-front-end"]=this["webpackJsonpstarter-restaurant-reservation-front-end"]||[]).push([[0],{35:function(e,t,r){},36:function(e,t,r){"use strict";r.r(t);var a=r(1),n=r.n(a),c=r(19),s=r.n(c),i=r(4),b=r(5),o=r(0);var l=function(){return Object(o.jsx)("nav",{className:"navbar navbar-dark align-items-start p-0",children:Object(o.jsxs)("div",{className:"container-fluid d-flex flex-column p-0",children:[Object(o.jsx)(b.b,{className:"navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0",to:"/",children:Object(o.jsx)("div",{className:"sidebar-brand-text mx-3",children:Object(o.jsx)("span",{children:"Periodic Tables"})})}),Object(o.jsx)("hr",{className:"sidebar-divider my-0"}),Object(o.jsxs)("ul",{className:"nav navbar-nav text-light",id:"accordionSidebar",children:[Object(o.jsx)("li",{className:"nav-item",children:Object(o.jsxs)(b.b,{className:"nav-link",to:"/dashboard",children:[Object(o.jsx)("span",{className:"oi oi-dashboard"}),"\xa0Dashboard"]})}),Object(o.jsx)("li",{className:"nav-item",children:Object(o.jsxs)(b.b,{className:"nav-link",to:"/search",children:[Object(o.jsx)("span",{className:"oi oi-magnifying-glass"}),"\xa0Search"]})}),Object(o.jsx)("li",{className:"nav-item",children:Object(o.jsxs)(b.b,{className:"nav-link",to:"/reservations/new",children:[Object(o.jsx)("span",{className:"oi oi-plus"}),"\xa0New Reservation"]})}),Object(o.jsx)("li",{className:"nav-item",children:Object(o.jsxs)(b.b,{className:"nav-link",to:"/tables/new",children:[Object(o.jsx)("span",{className:"oi oi-layers"}),"\xa0New Table"]})})]}),Object(o.jsx)("div",{className:"text-center d-none d-md-inline",children:Object(o.jsx)("button",{className:"btn rounded-circle border-0",id:"sidebarToggle",type:"button"})})]})})},u=r(2),j=r.n(u),d=r(3),h=r(6),x=/\d\d\d\d-\d\d-\d\d/,p=/\d\d:\d\d/;function O(e){return"".concat(e.getFullYear().toString(10),"-").concat((e.getMonth()+1).toString(10).padStart(2,"0"),"-").concat(e.getDate().toString(10).padStart(2,"0"))}function m(){return O(new Date)}function v(e){var t=new Date(e+"T00:00:00"),r=new Date(t.getTime()-864e5);return console.log(e,t,r),O(r)}function f(e){var t=new Date(e+"T00:00:00"),r=new Date(t.getTime()+864e5);return console.log(e,t,r),O(r)}function y(e){return e.reservation_date=e.reservation_date.match(x)[0],e}function g(e){return Array.isArray(e)?e.map(y):y(e)}var w=Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_API_BASE_URL||"https://restaurant-reservation-back-end.vercel.app",N=new Headers;function _(e,t,r){return k.apply(this,arguments)}function k(){return(k=Object(d.a)(j.a.mark((function e(t,r,a){var n,c;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(t,r);case 3:if(204!==(n=e.sent).status){e.next=6;break}return e.abrupt("return",null);case 6:return e.next=8,n.json();case 8:if(!(c=e.sent).error){e.next=11;break}return e.abrupt("return",Promise.reject({message:c.error}));case 11:return e.abrupt("return",c.data);case 14:if(e.prev=14,e.t0=e.catch(0),"AbortError"===e.t0.name){e.next=19;break}throw console.error(e.t0.stack),e.t0;case 19:return e.abrupt("return",Promise.resolve(a));case 20:case"end":return e.stop()}}),e,null,[[0,14]])})))).apply(this,arguments)}function S(e,t){return C.apply(this,arguments)}function C(){return(C=Object(d.a)(j.a.mark((function e(t,r){var a,n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a="".concat(w,"/reservations/"),n={method:"POST",headers:N,body:JSON.stringify(t),signal:r},console.log("post attempt:",a,n),e.next=5,_(a,n);case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function T(e,t){return A.apply(this,arguments)}function A(){return(A=Object(d.a)(j.a.mark((function e(t,r){var a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a="".concat(w,"/reservations/").concat(t),e.next=3,_(a,{signal:r}).then(g).then(g);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function D(e,t){return E.apply(this,arguments)}function E(){return(E=Object(d.a)(j.a.mark((function e(t,r){var a,n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a="".concat(w,"/reservations/").concat(t.reservation_id),n={method:"PUT",headers:N,body:JSON.stringify(t),signal:r},e.next=4,_(a,n).then(g).then(g);case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function P(e,t){return F.apply(this,arguments)}function F(){return(F=Object(d.a)(j.a.mark((function e(t,r){var a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a="".concat(w,"/reservations/ByDate?reservation_date=").concat(t),e.next=3,_(a,{signal:r}).then(g).then(g);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function R(e,t){return q.apply(this,arguments)}function q(){return(q=Object(d.a)(j.a.mark((function e(t,r){var a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a="".concat(w,"/reservations?mobile_number=").concat(t),e.next=3,_(a,{signal:r}).then(g).then(g);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function B(e,t,r){return L.apply(this,arguments)}function L(){return(L=Object(d.a)(j.a.mark((function e(t,r,a){var n,c;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="".concat(w,"/reservations/").concat(t,"/status"),c={method:"PUT",headers:N,body:JSON.stringify(r),signal:a},e.next=4,_(n,c).then(g).then(g);case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function M(e){return U.apply(this,arguments)}function U(){return(U=Object(d.a)(j.a.mark((function e(t){var r;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=new URL("".concat(w,"/tables/")),e.next=3,_(r,{headers:N,signal:t},[]);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function J(e,t){return H.apply(this,arguments)}function H(){return(H=Object(d.a)(j.a.mark((function e(t,r){var a,n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a="".concat(w,"/tables/"),n={method:"POST",headers:N,body:JSON.stringify(t),signal:r},console.log("post attempt:",a,n),e.next=5,_(a,n);case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function I(e,t,r){return K.apply(this,arguments)}function K(){return(K=Object(d.a)(j.a.mark((function e(t,r,a){var n,c;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="".concat(w,"/tables/").concat(t,"/seat"),c={method:"PUT",headers:N,body:JSON.stringify(r),signal:a},e.next=4,_(n,c);case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function W(e,t){return z.apply(this,arguments)}function z(){return(z=Object(d.a)(j.a.mark((function e(t,r){var a,n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a="".concat(w,"/tables/").concat(t,"/seat"),n={method:"DELETE",signal:r},e.next=4,_(a,n);case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}N.append("Content-Type","application/json");var V=function(e){var t=e.error;return t&&Object(o.jsxs)("div",{className:"alert alert-danger m-2",children:["Error: ",t.message]})},Y=function(e){var t=e.reservations,r=Object(i.g)(),a=function(){var e=Object(d.a)(j.a.mark((function e(t){var a,n,c,s;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=t.target,n=new AbortController,c=a.value,window.confirm("Do you want to cancel this reservation? This cannot be undone.")&&(s=function(){return(s=Object(d.a)(j.a.mark((function e(){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,B(c,{status:"Cancelled"},n.signal);case 3:r.go(0),e.next=13;break;case 6:if(e.prev=6,e.t0=e.catch(0),"AbortError"!==e.t0.name){e.next=12;break}console.log("Aborted"),e.next=13;break;case 12:throw e.t0;case 13:case"end":return e.stop()}}),e,null,[[0,6]])})))).apply(this,arguments)},function(){return s.apply(this,arguments)}());case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return t.length>0?Object(o.jsx)("div",{className:"row",children:t.map((function(e){return Object(o.jsx)("div",{className:"col-sm-6",children:Object(o.jsxs)("div",{className:"card text-white bg-dark mb-3",children:[Object(o.jsx)("div",{className:"card-header",children:Object(o.jsxs)("h4",{children:[e.first_name," ",e.last_name]})}),Object(o.jsxs)("div",{className:"card-body",children:[Object(o.jsxs)("h5",{className:"card-title",children:["Time: ",(t=e.reservation_time,t.match(p)[0])]}),Object(o.jsxs)("p",{className:"card-text",children:["Date: ",e.reservation_date," ",Object(o.jsx)("br",{}),"Phone Number: ",e.mobile_number,Object(o.jsx)("br",{}),"Party Size: ",e.people," ",Object(o.jsx)("br",{})]}),Object(o.jsxs)("div",{"data-reservation-id-status":e.reservation_id,children:["Status: ",e.status]})," ",Object(o.jsx)("br",{})," ",Object(o.jsx)("br",{}),"Booked"===e.status?Object(o.jsxs)("div",{children:[Object(o.jsx)(b.b,{to:"/reservations/".concat(e.reservation_id,"/seat"),className:"btn btn-success",children:"Seat"})," ","\xa0",Object(o.jsx)(b.b,{to:"/reservations/".concat(e.reservation_id,"/edit"),className:"btn btn-warning",children:"Edit"})," ","\xa0",Object(o.jsx)("button",{"data-reservation-id-cancel":e.reservation_id,onClick:a,value:e.reservation_id,className:"btn btn-danger",children:"Cancel"})]}):Object(o.jsx)("button",{"data-reservation-id-cancel":e.reservation_id,onClick:a,value:e.reservation_id,className:"btn btn-danger",children:"Cancel"})]})]})},e.reservation_id);var t}))}):Object(o.jsx)("div",{className:"alert alert-success",role:"alert",children:"No matching reservations found."})},G=function(e){var t=e.tables,r=e.handleFinish;return t.length>0?Object(o.jsx)("div",{className:"row",children:t.map((function(e){return Object(o.jsx)("div",{className:"col-sm-6",children:Object(o.jsx)("div",{className:"card text-white bg-dark mb-3",children:Object(o.jsxs)("div",{className:"card-body",children:[Object(o.jsx)("h5",{className:"card-title",children:e.table_name}),Object(o.jsxs)("p",{className:"card-text",children:["Table Capacity: ",e.capacity," ",Object(o.jsx)("br",{}),"Status:"," ",Object(o.jsx)("span",{"data-table-id-status":e.table_id,children:e.status}),Object(o.jsx)("br",{}),Object(o.jsx)("br",{}),"Occupied"===e.status?Object(o.jsx)("button",{"data-table-id-finish":e.table_id,onClick:r,value:e.table_id,className:"btn btn-success",children:"Finish"}):""]})]})})},e.table_id)}))}):Object(o.jsx)("div",{className:"alert alert-warning",role:"alert",children:"There are no tables saved"})};var Q=function(e){var t=e.date,r=Object(i.h)();r.date&&(t=r.date);var n=Object(a.useState)([]),c=Object(h.a)(n,2),s=c[0],l=c[1],u=Object(a.useState)([]),x=Object(h.a)(u,2),p=x[0],O=x[1],m=Object(a.useState)(null),y=Object(h.a)(m,2),g=y[0],w=y[1];Object(a.useEffect)((function(){var e=t,r=new AbortController;return w(null),P(e,r.signal).then(l).catch(w),M(r.signal).then(O).catch(w),function(){return r.abort()}}),[t]);var N=function(){var e=Object(d.a)(j.a.mark((function e(r){var a,n,c,s;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=r.target,n=new AbortController,c=a.value,window.confirm("Is this table ready to seat new guests? This cannot be undone.")&&(s=function(){return(s=Object(d.a)(j.a.mark((function e(){var r,a,s;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,r=p.filter((function(e){return e.table_id===Number(c)})),e.next=4,W(c,n.signal);case 4:return e.next=6,B(r[0].reservation_id,{status:"Finished"},n.signal);case 6:return e.next=8,M(n.signal);case 8:return a=e.sent,e.next=11,P(t,n.signal);case 11:s=e.sent,O(a),l(s),e.next=23;break;case 16:if(e.prev=16,e.t0=e.catch(0),"AbortError"!==e.t0.name){e.next=22;break}console.log("Aborted"),e.next=23;break;case 22:throw e.t0;case 23:case"end":return e.stop()}}),e,null,[[0,16]])})))).apply(this,arguments)},function(){return s.apply(this,arguments)}());case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(o.jsxs)("main",{children:[Object(o.jsx)("h1",{children:"Dashboard"}),Object(o.jsxs)("div",{className:"d-md-flex mb-3",children:[Object(o.jsxs)("h4",{className:"mb-0",children:["Reservations for ",t]})," ",Object(o.jsx)("br",{})]}),Object(o.jsxs)("div",{children:[Object(o.jsx)(b.b,{to:"/dashboard/".concat(v(t)),className:"btn btn-dark",children:"Previous"})," ","\xa0",Object(o.jsx)(b.b,{to:"/dashboard/".concat(f(t)),className:"btn btn-dark",children:"Next"})," ","\xa0",Object(o.jsx)(b.b,{to:"/dashboard/",className:"btn btn-success",children:"Today"})]}),Object(o.jsx)("br",{}),Object(o.jsx)("div",{children:Object(o.jsx)(Y,{reservations:s})}),Object(o.jsx)("h4",{className:"mb-0",children:"Tables:"})," ",Object(o.jsx)("br",{}),Object(o.jsx)("div",{children:Object(o.jsx)(G,{tables:p,handleFinish:N})}),Object(o.jsx)(V,{error:g})]})};var X=function(){return Object(o.jsx)("div",{className:"NotFound",children:Object(o.jsx)("h1",{children:"Not Found"})})},Z=r(12),$=r(8),ee=function(e){var t=e.errorList;return t.length>0?Object(o.jsx)("div",{children:t.map((function(e){return Object(o.jsx)(V,{error:{message:e}})}))}):""},te=function(e){var t=e.formData,r=e.handleChange;return Object(o.jsxs)("div",{children:[Object(o.jsx)("label",{children:"First Name:"})," ",Object(o.jsx)("br",{}),Object(o.jsx)("input",{id:"first_name",type:"text",name:"first_name",onChange:r,value:t.first_name,style:{width:"50%"},required:!0}),Object(o.jsx)("br",{}),Object(o.jsx)("br",{}),Object(o.jsx)("label",{children:"Last Name:"})," ",Object(o.jsx)("br",{}),Object(o.jsx)("input",{id:"last_name",type:"text",name:"last_name",onChange:r,value:t.last_name,style:{width:"50%"},required:!0}),Object(o.jsx)("br",{}),Object(o.jsx)("br",{}),Object(o.jsx)("label",{children:"Mobile Number:"})," ",Object(o.jsx)("br",{}),Object(o.jsx)("input",{id:"mobile_number",type:"text",name:"mobile_number",onChange:r,value:t.mobile_number,style:{width:"50%"},required:!0}),Object(o.jsx)("br",{}),Object(o.jsx)("br",{}),Object(o.jsx)("label",{children:"Date of Reservation:"})," ",Object(o.jsx)("br",{}),Object(o.jsx)("input",{id:"reservation_date",type:"date",name:"reservation_date",onChange:r,value:t.reservation_date,style:{width:"50%"},required:!0}),Object(o.jsx)("br",{}),Object(o.jsx)("br",{}),Object(o.jsx)("label",{children:"Time of Reservation:"})," ",Object(o.jsx)("br",{}),Object(o.jsx)("input",{id:"reservation_time",type:"time",name:"reservation_time",onChange:r,value:t.reservation_time,style:{width:"50%"},required:!0}),Object(o.jsx)("br",{}),Object(o.jsx)("br",{}),Object(o.jsx)("label",{children:"Number of people in the party (must be at least 1):"})," ",Object(o.jsx)("br",{}),Object(o.jsx)("input",{id:"people",type:"number",name:"people",onChange:r,value:t.people,style:{width:"50%"},required:!0}),Object(o.jsx)("br",{}),Object(o.jsx)("br",{})]})};var re=function(e){var t=e.date,r=Object(i.h)().reservation_id,n={first_name:"",last_name:"",mobile_number:"",reservation_date:t,reservation_time:"10:30:00",people:1},c=[0,0,0],s=["Must select a future date","Restaraunt is closed on Tuesdays","Must select a time between 10:30AM - 9:30PM"],b=Object(a.useState)(Object($.a)({},n)),l=Object(h.a)(b,2),u=l[0],x=l[1],p=Object(a.useState)([]),O=Object(h.a)(p,2),m=O[0],v=O[1];Object(a.useEffect)((function(){if(r){var e=new AbortController;function t(){return(t=Object(d.a)(j.a.mark((function t(){var a;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,T(r,e.signal);case 3:a=t.sent,x(a),t.next=14;break;case 7:if(t.prev=7,t.t0=t.catch(0),"AbortError"!==t.t0.name){t.next=13;break}console.log("Aborted"),t.next=14;break;case 13:throw t.t0;case 14:case"end":return t.stop()}}),t,null,[[0,7]])})))).apply(this,arguments)}!function(){t.apply(this,arguments)}()}}),[r]);var f=new AbortController,y=Object(i.g)();return Object(o.jsxs)("main",{children:[Object(o.jsx)("h1",{children:"Reservations"}),Object(o.jsx)("div",{className:"d-md-flex mb-3",children:Object(o.jsx)(ee,{errorList:m})}),Object(o.jsxs)("form",{onSubmit:function(e){if(e.preventDefault(),0===m.length){function t(){return(t=Object(d.a)(j.a.mark((function e(){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!r){e.next=6;break}return e.next=4,D(u,f.signal);case 4:e.next=8;break;case 6:return e.next=8,S(u,f.signal);case 8:y.push("/dashboard/".concat(u.reservation_date)),e.next=18;break;case 11:if(e.prev=11,e.t0=e.catch(0),"AbortError"!==e.t0.name){e.next=17;break}console.log("Aborted"),e.next=18;break;case 17:throw e.t0;case 18:case"end":return e.stop()}}),e,null,[[0,11]])})))).apply(this,arguments)}return function(){t.apply(this,arguments)}(),function(){console.log("post cleanup"),f.abort()}}},children:[Object(o.jsx)(te,{formData:u,handleChange:function(e){var r=e.target,a=r.value;if("people"===r.name&&r.value<=0&&(a=1),"reservation_date"===r.name){var n=new Date(a),i=new Date(t);c[0]=n<i?1:0,2===n.getUTCDay()?c[1]=1:c[1]=0}"reservation_time"===r.name&&(c[2]=a>="10:30"&&a<="21:30"?0:1);var b=[];c.forEach((function(e,t){1===e&&b.push(s[t])})),v(b),x(Object($.a)(Object($.a)({},u),{},Object(Z.a)({},r.name,a)))}}),Object(o.jsx)("button",{type:"button",onClick:function(){return y.goBack()},className:"btn btn-secondary",children:"Cancel"})," ","\xa0",Object(o.jsx)("button",{type:"submit",className:"btn btn-primary",children:"Save"})]})]})};var ae=function(){var e=Object(a.useState)([]),t=Object(h.a)(e,2),r=t[0],n=t[1],c=Object(a.useState)(Object($.a)({},{mobile_phone:"xxx-xxx-xxxx"})),s=Object(h.a)(c,2),i=s[0],b=s[1],l=new AbortController;return Object(o.jsxs)("main",{children:[Object(o.jsx)("h1",{children:"Search"}),Object(o.jsx)("div",{className:"d-md-flex mb-3",children:Object(o.jsx)("h4",{className:"mb-0",children:"Search for a reservation by phone number"})}),Object(o.jsx)("div",{children:Object(o.jsxs)("form",{onSubmit:function(e){function t(){return(t=Object(d.a)(j.a.mark((function e(){var t;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,R(i.mobile_phone,l.signal);case 3:t=e.sent,n(t),e.next=14;break;case 7:if(e.prev=7,e.t0=e.catch(0),"AbortError"!==e.t0.name){e.next=13;break}console.log("Aborted"),e.next=14;break;case 13:throw e.t0;case 14:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}return e.preventDefault(),function(){t.apply(this,arguments)}(),function(){l.abort()}},children:[Object(o.jsx)("input",{id:"mobile_phone",type:"text",name:"mobile_phone",onChange:function(e){var t=e.target,r=t.value;b(Object($.a)(Object($.a)({},i),{},Object(Z.a)({},t.name,r)))},value:i.mobile_phone,style:{width:"150px"},required:!0}),"\xa0 \xa0",Object(o.jsx)("button",{type:"submit",className:"btn btn-dark",children:"Find"})]})}),Object(o.jsx)("br",{}),Object(o.jsx)("div",{children:Object(o.jsx)(Y,{reservations:r})})]})},ne=function(e){var t=e.formData,r=e.handleChange;return Object(o.jsxs)("div",{children:[Object(o.jsx)("label",{children:"Table Name:"})," ",Object(o.jsx)("br",{}),Object(o.jsx)("input",{id:"table_name",type:"text",name:"table_name",onChange:r,value:t.table_name,style:{width:"50%"},required:!0}),Object(o.jsx)("br",{}),Object(o.jsx)("br",{}),Object(o.jsx)("label",{children:"Table Capacity (must be at least 1):"})," ",Object(o.jsx)("br",{}),Object(o.jsx)("input",{id:"capacity",type:"number",name:"capacity",onChange:r,value:t.capacity,style:{width:"50%"},required:!0}),Object(o.jsx)("br",{}),Object(o.jsx)("br",{})]})};var ce=function(){var e=Object(a.useState)(Object($.a)({},{table_name:"Table Name",capacity:1,status:"Free"})),t=Object(h.a)(e,2),r=t[0],n=t[1],c=new AbortController,s=Object(i.g)();return Object(o.jsxs)("main",{children:[Object(o.jsx)("h1",{children:"Tables"}),Object(o.jsxs)("form",{onSubmit:function(e){function t(){return(t=Object(d.a)(j.a.mark((function e(){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,J(r,c.signal);case 3:s.push("/dashboard"),e.next=13;break;case 6:if(e.prev=6,e.t0=e.catch(0),"AbortError"!==e.t0.name){e.next=12;break}console.log("Aborted"),e.next=13;break;case 12:throw e.t0;case 13:case"end":return e.stop()}}),e,null,[[0,6]])})))).apply(this,arguments)}return e.preventDefault(),function(){t.apply(this,arguments)}(),function(){c.abort()}},children:[Object(o.jsx)(ne,{formData:r,handleChange:function(e){var t=e.target,a=t.value;"capacity"===t.name&&t.value<=0&&(a=1),n(Object($.a)(Object($.a)({},r),{},Object(Z.a)({},t.name,a)))}}),Object(o.jsx)("button",{type:"button",onClick:function(){return s.goBack()},className:"btn btn-secondary",children:"Cancel"})," ","\xa0",Object(o.jsx)("button",{type:"submit",className:"btn btn-primary",children:"Save"})]})]})};var se=function(){var e=Object(i.h)().reservation_id,t=Object(a.useState)([]),r=Object(h.a)(t,2),n=r[0],c=r[1],s=Object(a.useState)([]),b=Object(h.a)(s,2),l=b[0],u=b[1],x=Object(a.useState)({message:"Please select a table"}),p=Object(h.a)(x,2),O=p[0],m=p[1],v=Object(a.useState)(Object($.a)({},{table_id:"x"})),f=Object(h.a)(v,2),y=f[0],g=f[1];Object(a.useEffect)((function(){var t=new AbortController;function r(){return(r=Object(d.a)(j.a.mark((function r(){var a,n;return j.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,T(e,t.signal);case 3:return a=r.sent,r.next=6,M(t.signal);case 6:n=r.sent,c(a),u(n.filter((function(e){return"Free"===e.status}))),r.next=18;break;case 11:if(r.prev=11,r.t0=r.catch(0),"AbortError"!==r.t0.name){r.next=17;break}console.log("Aborted"),r.next=18;break;case 17:throw r.t0;case 18:case"end":return r.stop()}}),r,null,[[0,11]])})))).apply(this,arguments)}!function(){r.apply(this,arguments)}()}));var w=new AbortController,N=Object(i.g)();return Object(o.jsxs)("main",{children:[Object(o.jsx)("h1",{children:"Seat Party"}),Object(o.jsx)(V,{error:O}),Object(o.jsxs)("div",{className:"d-md-flex mb-3",children:[Object(o.jsx)("div",{className:"col-sm-6",children:Object(o.jsxs)("div",{className:"card text-white bg-dark mb-3",children:[Object(o.jsx)("div",{className:"card-header",children:Object(o.jsxs)("h4",{children:[n.first_name," ",n.last_name]})}),Object(o.jsxs)("div",{className:"card-body",children:[Object(o.jsxs)("h5",{className:"card-title",children:["Time: ",n.reservation_time]}),Object(o.jsxs)("p",{className:"card-text",children:["date: ",n.reservation_date," ",Object(o.jsx)("br",{}),"Mobile Number: ",n.mobile_number,Object(o.jsx)("br",{}),"Party Size: ",n.people," ",Object(o.jsx)("br",{})," ",Object(o.jsx)("br",{})]})]})]})}),Object(o.jsx)("div",{className:"col-sm-6",children:Object(o.jsxs)("div",{className:"card text-white bg-dark mb-3",children:[Object(o.jsx)("div",{className:"card-header",children:Object(o.jsx)("h4",{children:"Select a Table"})}),Object(o.jsx)("div",{className:"card-body",children:Object(o.jsxs)("form",{onSubmit:function(t){if(t.preventDefault(),null===O){function r(){return(r=Object(d.a)(j.a.mark((function t(){return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,I(y.table_id,{reservation_id:e},w.signal);case 3:return t.next=5,B(e,{status:"Seated"},w.signal);case 5:N.push("/dashboard/"),t.next=15;break;case 8:if(t.prev=8,t.t0=t.catch(0),"AbortError"!==t.t0.name){t.next=14;break}console.log("Aborted"),t.next=15;break;case 14:throw t.t0;case 15:case"end":return t.stop()}}),t,null,[[0,8]])})))).apply(this,arguments)}return function(){r.apply(this,arguments)}(),function(){w.abort()}}},children:[Object(o.jsxs)("select",{name:"table_id",onChange:function(e){var t=e.target,r=t.value,a=l.filter((function(e){return e.table_id===Number(r)}));"x"===r?m({message:"Please select a table"}):n.people>a[0].capacity?m({message:"That table does not have enough capacity"}):m(null),g(Object($.a)(Object($.a)({},y),{},Object(Z.a)({},t.name,r)))},className:"form-control form-control-lg",value:y.table_id,children:[Object(o.jsx)("option",{value:"x",children:"--- Select A Table ---"}),l.map((function(e){return Object(o.jsxs)("option",{value:e.table_id,children:[e.table_name," - ",e.capacity]})}))]}),Object(o.jsx)("br",{}),Object(o.jsx)("br",{}),Object(o.jsx)("button",{type:"button",onClick:function(){return N.goBack()},className:"btn btn-secondary",children:"Cancel"}),"\xa0 \xa0",Object(o.jsx)("button",{type:"submit",className:"btn btn-primary",children:"Save"})]})})]})})]}),Object(o.jsx)("br",{}),Object(o.jsx)("div",{})]})};var ie=function(){return Object(o.jsxs)(i.d,{children:[Object(o.jsx)(i.b,{exact:!0,path:"/",children:Object(o.jsx)(i.a,{to:"/dashboard"})}),Object(o.jsx)(i.b,{exact:!0,path:"/reservations",children:Object(o.jsx)(i.a,{to:"/dashboard"})}),Object(o.jsx)(i.b,{path:"/dashboard/:date",children:Object(o.jsx)(Q,{})}),Object(o.jsx)(i.b,{path:"/dashboard/",children:Object(o.jsx)(Q,{date:m()})}),Object(o.jsx)(i.b,{path:"/search",children:Object(o.jsx)(ae,{})}),Object(o.jsx)(i.b,{path:"/reservations/:reservation_id/seat",children:Object(o.jsx)(se,{})}),Object(o.jsx)(i.b,{path:"/reservations/:reservation_id/edit",children:Object(o.jsx)(re,{date:m()})}),Object(o.jsx)(i.b,{path:"/reservations/new",children:Object(o.jsx)(re,{date:m()})}),Object(o.jsx)(i.b,{path:"/tables/new",children:Object(o.jsx)(ce,{date:m()})}),Object(o.jsx)(i.b,{children:Object(o.jsx)(X,{})})]})};r(35);var be=function(){return Object(o.jsx)("div",{className:"container-fluid",children:Object(o.jsxs)("div",{className:"row h-100",children:[Object(o.jsx)("div",{className:"col-md-2 side-bar",children:Object(o.jsx)(l,{})}),Object(o.jsx)("div",{className:"col",children:Object(o.jsx)(ie,{})})]})})};var oe=function(){return Object(o.jsx)(i.d,{children:Object(o.jsx)(i.b,{path:"/",children:Object(o.jsx)(be,{})})})};s.a.render(Object(o.jsx)(n.a.StrictMode,{children:Object(o.jsx)(b.a,{children:Object(o.jsx)(oe,{})})}),document.getElementById("root"))}},[[36,1,2]]]);
//# sourceMappingURL=main.eb437b04.chunk.js.map