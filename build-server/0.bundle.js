exports.ids=[0],exports.modules={20:function(e,t,r){"use strict";r.r(t);var a=r(0),n=r.n(a),c=(r(3),r(4)),i=r(5),o=r(12),u=r(9),l=r(23),s=r(7);function m(e,t,r,a,n,c,i){try{var o=e[c](i),u=o.value}catch(e){return void r(e)}o.done?t(u):Promise.resolve(u).then(a,n)}function f(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],a=!0,n=!1,c=void 0;try{for(var i,o=e[Symbol.iterator]();!(a=(i=o.next()).done)&&(r.push(i.value),!t||r.length!==t);a=!0);}catch(e){n=!0,c=e}finally{try{a||null==o.return||o.return()}finally{if(n)throw c}}return r}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return v(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return v(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function v(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,a=new Array(t);r<t;r++)a[r]=e[r];return a}t.default=function(){var e=f(Object(a.useState)(""),2),t=e[0],r=e[1],v=f(Object(a.useState)(""),2),d=v[0],h=v[1],p=f(Object(a.useState)(!1),2),b=p[0],y=p[1],g=Object(s.useTranslation)("common").t,E=Object(c.useDispatch)(),N=Object(o.a)().request,j=function(){var e,r=(e=regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""!==t.trim()&&""!==d.trim()){e.next=3;break}return alert(g("auth.alert")),e.abrupt("return");case 3:return e.next=5,N(Object(u.f)(),"POST",{login:t,password:d});case 5:if((r=e.sent).errors){e.next=10;break}return E(Object(i.a)(r)),E(Object(i.c)()),e.abrupt("return",y(!0));case 10:alert(r.errors);case 11:case"end":return e.stop()}}),e)})),function(){var t=this,r=arguments;return new Promise((function(a,n){var c=e.apply(t,r);function i(e){m(c,a,n,i,o,"next",e)}function o(e){m(c,a,n,i,o,"throw",e)}i(void 0)}))});return function(){return r.apply(this,arguments)}}(),w=function(e){var t=e.target;return t.name===g("auth.name_login")?r(t.value.trim()):h(t.value.trim())};return n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col s12 m12"},n.a.createElement("div",{className:"card blue-grey darken-3 "},n.a.createElement("div",{className:"card-content white-text"},n.a.createElement("span",{className:"card-title"},g("auth.title")),n.a.createElement("div",{className:"container"},n.a.createElement(l.a,{onChange:w,value:t,name:g("auth.name_login"),className:"validate"}),n.a.createElement(l.a,{onChange:w,value:d,name:g("auth.name_password"),className:"validate"}))),n.a.createElement("div",{className:"card-action"},function(e){return e?n.a.createElement("a",{href:"/list"}):""}(b),n.a.createElement("a",{href:"/list",onClick:function(){return j()}},g("auth.btn"))))))}},23:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var a=r(0),n=r.n(a),c=r(13),i=r.n(c),o=function(e){var t=e.value,r=e.name,a=e.onChange,c=e.className,i=e.placeholder,o=void 0===i?"":i;return n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"input-field col s12"},n.a.createElement("input",{value:t,name:r,type:"text",className:c,onChange:function(e){return a(e)},placeholder:o}),n.a.createElement("label",{className:"active"},r)))};o.propTypes={value:i.a.string,name:i.a.string,onChange:i.a.func,className:i.a.string}}};