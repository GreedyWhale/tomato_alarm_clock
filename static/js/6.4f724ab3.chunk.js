(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{166:function(e,a,t){"use strict";var n=t(184),r=t.n(n),c=t(65),o=t(172),s=r.a.create({baseURL:"https://gp-server.hunger-valley.com",timeout:2e3,headers:{"t-app-id":"XTrcPmPP6mK73ZgLHoXfnRef","t-app-secret":"FNhsEEYYNvPK4xt5nLG9Qfv9"}});s.interceptors.request.use(function(e){var a=localStorage.getItem(o.a);return a&&(e.headers.Authorization="Bearer ".concat(a)),e},function(e){return Promise.reject(e)}),s.interceptors.response.use(function(e){return e.headers["x-token"]&&localStorage.setItem(o.a,e.headers["x-token"]),e},function(e){return 401===e.response.status&&c.a.replace("/login"),Promise.reject(e)}),a.a=s},172:function(e,a,t){"use strict";t.d(a,"a",function(){return n});var n="TOMATO_ALARM_CLOCK_X_TOKEN"},174:function(e,a,t){e.exports=t.p+"static/media/logo.f4002783.svg"},280:function(e,a,t){},282:function(e,a,t){"use strict";t.r(a);t(175);var n=t(173),r=(t(167),t(170)),c=(t(203),t(206)),o=t(165),s=t(0),i=t.n(s),l=(t(280),t(174)),u=t.n(l),m=t(166);a.default=function(e){var a=e.history,t=Object(s.useState)(!0),l=Object(o.a)(t,2),p=l[0],g=l[1],f=Object(s.useState)(""),d=Object(o.a)(f,2),h=d[0],E=d[1],_=Object(s.useState)(""),v=Object(o.a)(_,2),b=v[0],N=v[1],w=Object(s.useState)(""),O=Object(o.a)(w,2),j=O[0],P=O[1],C=function(){return h?!!b||(c.a.error("\u8bf7\u8f93\u5165\u5bc6\u7801"),!1):(c.a.error("\u8bf7\u8f93\u5165\u7528\u6237\u540d"),!1)},S=function(){return h?b?b===j||(c.a.error("\u4e24\u6b21\u8f93\u5165\u7684\u5bc6\u7801\u4e0d\u4e00\u81f4"),!1):(c.a.error("\u8bf7\u8f93\u5165\u5bc6\u7801"),!1):(c.a.error("\u8bf7\u8f93\u5165\u7528\u6237\u540d"),!1)},k=function(){m.a.post("/sign_in/user",{account:h,password:b}).then(function(){a.replace("/")}).catch(function(e){try{var a=e.response.data.errors;c.a.error(a)}catch(t){c.a.error(e.message)}})},L=function(){m.a.post("/sign_up/user",{account:h,password:b,password_confirmation:j}).then(function(){a.replace("/")}).catch(function(e){var a=e.response.data.errors;c.a.error(a.account[0]?"\u8be5\u7528\u6237\u5df2\u5b58\u5728":e.message)})};return i.a.createElement("div",{className:"".concat("log-in","_container")},i.a.createElement("div",{className:"".concat("log-in","_content")},i.a.createElement("img",{src:u.a,alt:"logo",className:"".concat("log-in","_logo")}),i.a.createElement("h3",{className:"".concat("log-in","_title")},p?"Log in":"Sign up"),i.a.createElement("div",{className:"".concat("log-in","_input-area")},i.a.createElement("h5",{className:"".concat("log-in","_input-label")},"Username"),i.a.createElement(r.a,{className:"".concat("log-in","_input"),onChange:function(e){E(e.target.value)}}),i.a.createElement("h5",{className:"".concat("log-in","_input-label")},"Password"),i.a.createElement(r.a.Password,{className:"".concat("log-in","_input"),type:"password",onChange:function(e){N(e.target.value)}}),!p&&i.a.createElement(i.a.Fragment,null,i.a.createElement("h5",{className:"".concat("log-in","_input-label")},"Confirm Password"),i.a.createElement(r.a.Password,{className:"".concat("log-in","_input"),type:"password",onChange:function(e){P(e.target.value)}}))),i.a.createElement(n.a,{block:!0,ghost:!0,className:"".concat("log-in","_button"),onClick:function(){p&&C()?k():!p&&S()&&L()}},p?"Log in":"Sign up"),i.a.createElement("p",{className:"".concat("log-in","_tip")},p?i.a.createElement(i.a.Fragment,null,"\u65b0\u7528\u6237\uff1f ",i.a.createElement("span",{onClick:function(){g(!1)}},"Sign up")):i.a.createElement(i.a.Fragment,null,"\u8001\u7528\u6237\uff1f ",i.a.createElement("span",{onClick:function(){g(!0)}},"Log in")))))}}}]);
//# sourceMappingURL=6.4f724ab3.chunk.js.map