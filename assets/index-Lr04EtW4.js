(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=Array.isArray,t=Array.prototype.indexOf,n=Array.prototype.includes,r=Array.from,i=Object.defineProperty,a=Object.getOwnPropertyDescriptor,o=Object.getOwnPropertyDescriptors,s=Object.prototype,c=Array.prototype,l=Object.getPrototypeOf,u=Object.isExtensible;function d(e){return typeof e==`function`}var f=()=>{};function p(e){return e()}function m(e){for(var t=0;t<e.length;t++)e[t]()}function h(){var e,t;return{promise:new Promise((n,r)=>{e=n,t=r}),resolve:e,reject:t}}function g(e,t,n=!1){return e===void 0?n?t():t:e}function _(e,t){if(Array.isArray(e))return e;if(t===void 0||!(Symbol.iterator in e))return Array.from(e);let n=[];for(let r of e)if(n.push(r),n.length===t)break;return n}function v(e,t){var n={};for(var r in e)t.includes(r)||(n[r]=e[r]);for(var i of Object.getOwnPropertySymbols(e))Object.propertyIsEnumerable.call(e,i)&&!t.includes(i)&&(n[i]=e[i]);return n}var y=1<<24,b=1024,x=2048,S=4096,C=8192,w=16384,T=32768,ee=1<<25,E=65536,te=1<<19,ne=1<<20,D=1<<25,re=65536,ie=1<<21,ae=1<<22,oe=1<<23,se=Symbol(`$state`),ce=Symbol(`legacy props`),le=Symbol(``),ue=new class extends Error{name=`StaleReactionError`;message="The reaction that called `getAbortSignal()` was re-run or destroyed"},de=!!globalThis.document?.contentType&&globalThis.document.contentType.includes(`xml`);function fe(e){throw Error(`https://svelte.dev/e/lifecycle_outside_component`)}function pe(){throw Error(`https://svelte.dev/e/async_derived_orphan`)}function me(e,t,n){throw Error(`https://svelte.dev/e/each_key_duplicate`)}function he(e){throw Error(`https://svelte.dev/e/effect_in_teardown`)}function ge(){throw Error(`https://svelte.dev/e/effect_in_unowned_derived`)}function _e(e){throw Error(`https://svelte.dev/e/effect_orphan`)}function ve(){throw Error(`https://svelte.dev/e/effect_update_depth_exceeded`)}function ye(e){throw Error(`https://svelte.dev/e/props_invalid_value`)}function be(){throw Error(`https://svelte.dev/e/set_context_after_init`)}function xe(){throw Error(`https://svelte.dev/e/state_descriptors_fixed`)}function Se(){throw Error(`https://svelte.dev/e/state_prototype_fixed`)}function Ce(){throw Error(`https://svelte.dev/e/state_unsafe_mutation`)}function we(){throw Error(`https://svelte.dev/e/svelte_boundary_reset_onerror`)}var Te={},Ee=Symbol(),De=`http://www.w3.org/1999/xhtml`;function Oe(){console.warn(`https://svelte.dev/e/derived_inert`)}function ke(e){console.warn(`https://svelte.dev/e/hydration_mismatch`)}function Ae(){console.warn(`https://svelte.dev/e/select_multiple_invalid_value`)}function je(){console.warn(`https://svelte.dev/e/svelte_boundary_reset_noop`)}var O=!1;function Me(e){O=e}var k;function Ne(e){if(e===null)throw ke(),Te;return k=e}function Pe(){return Ne(_n(k))}function A(e){if(O){if(_n(k)!==null)throw ke(),Te;k=e}}function Fe(e=1){if(O){for(var t=e,n=k;t--;)n=_n(n);k=n}}function Ie(e=!0){for(var t=0,n=k;;){if(n.nodeType===8){var r=n.data;if(r===`]`){if(t===0)return n;--t}else (r===`[`||r===`[!`||r[0]===`[`&&!isNaN(Number(r.slice(1))))&&(t+=1)}var i=_n(n);e&&n.remove(),n=i}}function Le(e){if(!e||e.nodeType!==8)throw ke(),Te;return e.data}function Re(e){return e===this.v}function ze(e,t){return e==e?e!==t||typeof e==`object`&&!!e||typeof e==`function`:t==t}function Be(e){return!ze(e,this.v)}var Ve=!1,He=!1;function Ue(){He=!0}var We=[];function Ge(e,t=!1,n=!1){return Ke(e,new Map,``,We,null,n)}function Ke(t,n,r,i,a=null,o=!1){if(typeof t==`object`&&t){var c=n.get(t);if(c!==void 0)return c;if(t instanceof Map)return new Map(t);if(t instanceof Set)return new Set(t);if(e(t)){var u=Array(t.length);n.set(t,u),a!==null&&n.set(a,u);for(var d=0;d<t.length;d+=1){var f=t[d];d in t&&(u[d]=Ke(f,n,r,i,null,o))}return u}if(l(t)===s){u={},n.set(t,u),a!==null&&n.set(a,u);for(var p of Object.keys(t))u[p]=Ke(t[p],n,r,i,null,o);return u}if(t instanceof Date)return structuredClone(t);if(typeof t.toJSON==`function`&&!o)return Ke(t.toJSON(),n,r,i,t)}if(t instanceof EventTarget)return t;try{return structuredClone(t)}catch{return t}}var qe=null;function Je(e){qe=e}function Ye(e){return $e(`getContext`).get(e)}function Xe(e,t){let n=$e(`setContext`);if(Ve){var r=H.f;!V&&r&32&&!qe.i||be()}return n.set(e,t),t}function Ze(e){return $e(`hasContext`).has(e)}function j(e,t=!1,n){qe={p:qe,i:!1,c:null,e:null,s:e,x:null,r:H,l:He&&!t?{s:null,u:null,$:[]}:null}}function M(e){var t=qe,n=t.e;if(n!==null){t.e=null;for(var r of n)Pn(r)}return e!==void 0&&(t.x=e),t.i=!0,qe=t.p,e??{}}function Qe(){return!He||qe!==null&&qe.l===null}function $e(e){return qe===null&&fe(e),qe.c??=new Map(et(qe)||void 0)}function et(e){let t=e.p;for(;t!==null;){let e=t.c;if(e!==null)return e;t=t.p}return null}var tt=[];function nt(){var e=tt;tt=[],m(e)}function rt(e){if(tt.length===0&&!yt){var t=tt;queueMicrotask(()=>{t===tt&&nt()})}tt.push(e)}function it(){for(;tt.length>0;)nt()}function at(e){var t=H;if(t===null)return V.f|=oe,e;if(!(t.f&32768)&&!(t.f&4))throw e;ot(e,t)}function ot(e,t){for(;t!==null;){if(t.f&128){if(!(t.f&32768))throw e;try{t.b.error(e);return}catch(t){e=t}}t=t.parent}throw e}var st=~(x|S|b);function ct(e,t){e.f=e.f&st|t}function lt(e){e.f&512||e.deps===null?ct(e,b):ct(e,S)}function ut(e){if(e!==null)for(let t of e)!(t.f&2)||!(t.f&65536)||(t.f^=re,ut(t.deps))}function dt(e,t,n){e.f&2048?t.add(e):e.f&4096&&n.add(e),ut(e.deps),ct(e,b)}var ft=!1,pt=!1;function mt(e){var t=pt;try{return pt=!1,[e(),pt]}finally{pt=t}}var ht=new Set,N=null,gt=null,_t=null,vt=null,yt=!1,bt=!1,xt=null,St=null,Ct=0,wt=1,Tt=class e{id=wt++;current=new Map;previous=new Map;#e=new Set;#t=new Set;#n=new Set;#r=new Map;#i=new Map;#a=null;#o=[];#s=[];#c=new Set;#l=new Set;#u=new Map;#d=new Set;is_fork=!1;#f=!1;#p=new Set;#m(){return this.is_fork||this.#i.size>0}#h(){for(let n of this.#p)for(let r of n.#i.keys()){for(var e=!1,t=r;t.parent!==null;){if(this.#u.has(t)){e=!0;break}t=t.parent}if(!e)return!0}return!1}skip_effect(e){this.#u.has(e)||this.#u.set(e,{d:[],m:[]}),this.#d.delete(e)}unskip_effect(e,t=e=>this.schedule(e)){var n=this.#u.get(e);if(n){this.#u.delete(e);for(var r of n.d)ct(r,x),t(r);for(r of n.m)ct(r,S),t(r)}this.#d.add(e)}#g(){if(Ct++>1e3&&(ht.delete(this),Dt()),!this.#m()){for(let e of this.#c)this.#l.delete(e),ct(e,x),this.schedule(e);for(let e of this.#l)ct(e,S),this.schedule(e)}let t=this.#o;this.#o=[],this.apply();var n=xt=[],r=[],i=St=[];for(let e of t)try{this.#_(e,n,r)}catch(t){throw Pt(e),t}if(N=null,i.length>0){var a=e.ensure();for(let e of i)a.schedule(e)}if(xt=null,St=null,this.#m()||this.#h()){this.#v(r),this.#v(n);for(let[e,t]of this.#u)Nt(e,t)}else{this.#r.size===0&&ht.delete(this),this.#c.clear(),this.#l.clear();for(let e of this.#e)e(this);this.#e.clear(),gt=this,kt(r),kt(n),gt=null,this.#a?.resolve()}var o=N;if(this.#o.length>0){let e=o??=this;e.#o.push(...this.#o.filter(t=>!e.#o.includes(t)))}o!==null&&(ht.add(o),o.#g()),Ve&&!ht.has(this)&&this.#y()}#_(e,t,n){e.f^=b;for(var r=e.first;r!==null;){var i=r.f,a=(i&96)!=0;if(!(a&&i&1024||i&8192||this.#u.has(r))&&r.fn!==null){a?r.f^=b:i&4?t.push(r):Ve&&i&16777224?n.push(r):yr(r)&&(i&16&&this.#l.add(r),wr(r));var o=r.first;if(o!==null){r=o;continue}}for(;r!==null;){var s=r.next;if(s!==null){r=s;break}r=r.parent}}}#v(e){for(var t=0;t<e.length;t+=1)dt(e[t],this.#c,this.#l)}capture(e,t,n=!1){e.v!==Ee&&!this.previous.has(e)&&this.previous.set(e,e.v),e.f&8388608||(this.current.set(e,[t,n]),_t?.set(e,t)),this.is_fork||(e.v=t)}activate(){N=this}deactivate(){N=null,_t=null}flush(){try{bt=!0,N=this,this.#g()}finally{Ct=0,vt=null,xt=null,St=null,bt=!1,N=null,_t=null,Qt.clear()}}discard(){for(let e of this.#t)e(this);this.#t.clear(),this.#n.clear(),ht.delete(this)}register_created_effect(e){this.#s.push(e)}#y(){for(let l of ht){var e=l.id<this.id,t=[];for(let[r,[i,a]]of this.current){if(l.current.has(r)){var n=l.current.get(r)[0];if(e&&i!==n)l.current.set(r,[i,a]);else continue}t.push(r)}var r=[...l.current.keys()].filter(e=>!this.current.has(e));if(r.length===0)e&&l.discard();else if(t.length>0){if(e)for(let e of this.#d)l.unskip_effect(e,e=>{e.f&4194320?l.schedule(e):l.#v([e])});l.activate();var i=new Set,a=new Map;for(var o of t)At(o,r,i,a);a=new Map;var s=[...l.current.keys()].filter(e=>this.current.has(e)?this.current.get(e)[0]!==e:!0);for(let e of this.#s)!(e.f&155648)&&jt(e,s,a)&&(e.f&4194320?(ct(e,x),l.schedule(e)):l.#c.add(e));if(l.#o.length>0){l.apply();for(var c of l.#o)l.#_(c,[],[]);l.#o=[]}l.deactivate()}}for(let e of ht)e.#p.has(this)&&(e.#p.delete(this),e.#p.size===0&&!e.#m()&&(e.activate(),e.#g()))}increment(e,t){let n=this.#r.get(t)??0;if(this.#r.set(t,n+1),e){let e=this.#i.get(t)??0;this.#i.set(t,e+1)}}decrement(e,t,n){let r=this.#r.get(t)??0;if(r===1?this.#r.delete(t):this.#r.set(t,r-1),e){let e=this.#i.get(t)??0;e===1?this.#i.delete(t):this.#i.set(t,e-1)}this.#f||n||(this.#f=!0,rt(()=>{this.#f=!1,this.flush()}))}transfer_effects(e,t){for(let t of e)this.#c.add(t);for(let e of t)this.#l.add(e);e.clear(),t.clear()}oncommit(e){this.#e.add(e)}ondiscard(e){this.#t.add(e)}on_fork_commit(e){this.#n.add(e)}run_fork_commit_callbacks(){for(let e of this.#n)e(this);this.#n.clear()}settled(){return(this.#a??=h()).promise}static ensure(){if(N===null){let t=N=new e;bt||(ht.add(N),yt||rt(()=>{N===t&&t.flush()}))}return N}apply(){if(!Ve||!this.is_fork&&ht.size===1){_t=null;return}_t=new Map;for(let[e,[t]]of this.current)_t.set(e,t);for(let n of ht)if(!(n===this||n.is_fork)){var e=!1,t=!1;if(n.id<this.id)for(let[r,[,i]]of n.current)i||(e||=this.current.has(r),t||=!this.current.has(r));if(e&&t)this.#p.add(n);else for(let[e,t]of n.previous)_t.has(e)||_t.set(e,t)}}schedule(e){if(vt=e,e.b?.is_pending&&e.f&16777228&&!(e.f&32768)){e.b.defer_effect(e);return}for(var t=e;t.parent!==null;){t=t.parent;var n=t.f;if(xt!==null&&t===H&&(Ve||(V===null||!(V.f&2))&&!ft))return;if(n&96){if(!(n&1024))return;t.f^=b}}this.#o.push(t)}};function Et(e){var t=yt;yt=!0;try{var n;for(e&&(N!==null&&!N.is_fork&&N.flush(),n=e());;){if(it(),N===null)return n;N.flush()}}finally{yt=t}}function Dt(){try{ve()}catch(e){ot(e,vt)}}var Ot=null;function kt(e){var t=e.length;if(t!==0){for(var n=0;n<t;){var r=e[n++];if(!(r.f&24576)&&yr(r)&&(Ot=new Set,wr(r),r.deps===null&&r.first===null&&r.nodes===null&&r.teardown===null&&r.ac===null&&Yn(r),Ot?.size>0)){Qt.clear();for(let e of Ot){if(e.f&24576)continue;let t=[e],n=e.parent;for(;n!==null;)Ot.has(n)&&(Ot.delete(n),t.push(n)),n=n.parent;for(let e=t.length-1;e>=0;e--){let n=t[e];n.f&24576||wr(n)}}Ot.clear()}}Ot=null}}function At(e,t,n,r){if(!n.has(e)&&(n.add(e),e.reactions!==null))for(let i of e.reactions){let e=i.f;e&2?At(i,t,n,r):e&4194320&&!(e&2048)&&jt(i,t,r)&&(ct(i,x),Mt(i))}}function jt(e,t,r){let i=r.get(e);if(i!==void 0)return i;if(e.deps!==null)for(let i of e.deps){if(n.call(t,i))return!0;if(i.f&2&&jt(i,t,r))return r.set(i,!0),!0}return r.set(e,!1),!1}function Mt(e){N.schedule(e)}function Nt(e,t){if(!(e.f&32&&e.f&1024)){e.f&2048?t.d.push(e):e.f&4096&&t.m.push(e),ct(e,b);for(var n=e.first;n!==null;)Nt(n,t),n=n.next}}function Pt(e){ct(e,b);for(var t=e.first;t!==null;)Pt(t),t=t.next}function Ft(e){let t=0,n=en(0),r;return()=>{jn()&&(U(n),Bn(()=>(t===0&&(r=Or(()=>e(()=>an(n)))),t+=1,()=>{rt(()=>{--t,t===0&&(r?.(),r=void 0,an(n))})})))}}var It=E|te;function Lt(e,t,n,r){new Rt(e,t,n,r)}var Rt=class{parent;is_pending=!1;transform_error;#e;#t=O?k:null;#n;#r;#i;#a=null;#o=null;#s=null;#c=null;#l=0;#u=0;#d=!1;#f=new Set;#p=new Set;#m=null;#h=Ft(()=>(this.#m=en(this.#l),()=>{this.#m=null}));constructor(e,t,n,r){this.#e=e,this.#n=t,this.#r=e=>{var t=H;t.b=this,t.f|=128,n(e)},this.parent=H.b,this.transform_error=r??this.parent?.transform_error??(e=>e),this.#i=Vn(()=>{if(O){let e=this.#t;Pe();let t=e.data===`[!`;if(e.data.startsWith(`[?`)){let t=JSON.parse(e.data.slice(2));this.#_(t)}else t?this.#v():this.#g()}else this.#y()},It),O&&(this.#e=k)}#g(){try{this.#a=Un(()=>this.#r(this.#e))}catch(e){this.error(e)}}#_(e){let t=this.#n.failed;t&&(this.#s=Un(()=>{t(this.#e,()=>e,()=>()=>{})}))}#v(){let e=this.#n.pending;e&&(this.is_pending=!0,this.#o=Un(()=>e(this.#e)),rt(()=>{var e=this.#c=document.createDocumentFragment(),t=hn();e.append(t),this.#a=this.#x(()=>Un(()=>this.#r(t))),this.#u===0&&(this.#e.before(e),this.#c=null,Xn(this.#o,()=>{this.#o=null}),this.#b(N))}))}#y(){try{if(this.is_pending=this.has_pending_snippet(),this.#u=0,this.#l=0,this.#a=Un(()=>{this.#r(this.#e)}),this.#u>0){var e=this.#c=document.createDocumentFragment();er(this.#a,e);let t=this.#n.pending;this.#o=Un(()=>t(this.#e))}else this.#b(N)}catch(e){this.error(e)}}#b(e){this.is_pending=!1,e.transfer_effects(this.#f,this.#p)}defer_effect(e){dt(e,this.#f,this.#p)}is_rendered(){return!this.is_pending&&(!this.parent||this.parent.is_rendered())}has_pending_snippet(){return!!this.#n.pending}#x(e){var t=H,n=V,r=qe;sr(this.#i),or(this.#i),Je(this.#i.ctx);try{return Tt.ensure(),e()}catch(e){return at(e),null}finally{sr(t),or(n),Je(r)}}#S(e,t){if(!this.has_pending_snippet()){this.parent&&this.parent.#S(e,t);return}this.#u+=e,this.#u===0&&(this.#b(t),this.#o&&Xn(this.#o,()=>{this.#o=null}),this.#c&&=(this.#e.before(this.#c),null))}update_pending_count(e,t){this.#S(e,t),this.#l+=e,!(!this.#m||this.#d)&&(this.#d=!0,rt(()=>{this.#d=!1,this.#m&&nn(this.#m,this.#l)}))}get_effect_pending(){return this.#h(),U(this.#m)}error(e){if(!this.#n.onerror&&!this.#n.failed)throw e;N?.is_fork?(this.#a&&N.skip_effect(this.#a),this.#o&&N.skip_effect(this.#o),this.#s&&N.skip_effect(this.#s),N.on_fork_commit(()=>{this.#C(e)})):this.#C(e)}#C(e){this.#a&&=(qn(this.#a),null),this.#o&&=(qn(this.#o),null),this.#s&&=(qn(this.#s),null),O&&(Ne(this.#t),Fe(),Ne(Ie()));var t=this.#n.onerror;let n=this.#n.failed;var r=!1,i=!1;let a=()=>{if(r){je();return}r=!0,i&&we(),this.#s!==null&&Xn(this.#s,()=>{this.#s=null}),this.#x(()=>{this.#y()})},o=e=>{try{i=!0,t?.(e,a),i=!1}catch(e){ot(e,this.#i&&this.#i.parent)}n&&(this.#s=this.#x(()=>{try{return Un(()=>{var t=H;t.b=this,t.f|=128,n(this.#e,()=>e,()=>a)})}catch(e){return ot(e,this.#i.parent),null}}))};rt(()=>{var t;try{t=this.transform_error(e)}catch(e){ot(e,this.#i&&this.#i.parent);return}typeof t==`object`&&t&&typeof t.then==`function`?t.then(o,e=>ot(e,this.#i&&this.#i.parent)):o(t)})}};function zt(e,t,n,r){let i=Qe()?Ut:Gt;var a=e.filter(e=>!e.settled);if(n.length===0&&a.length===0){r(t.map(i));return}var o=H,s=Bt(),c=a.length===1?a[0].promise:a.length>1?Promise.all(a.map(e=>e.promise)):null;function l(e){s();try{r(e)}catch(e){o.f&16384||ot(e,o)}Vt()}if(n.length===0){c.then(()=>l(t.map(i)));return}var u=Ht();function d(){Promise.all(n.map(e=>Wt(e))).then(e=>l([...t.map(i),...e])).catch(e=>ot(e,o)).finally(()=>u())}c?c.then(()=>{s(),d(),Vt()}):d()}function Bt(){var e=H,t=V,n=qe,r=N;return function(i=!0){sr(e),or(t),Je(n),i&&!(e.f&16384)&&(r?.activate(),r?.apply())}}function Vt(e=!0){sr(null),or(null),Je(null),e&&N?.deactivate()}function Ht(){var e=H,t=e.b,n=N,r=t.is_rendered();return t.update_pending_count(1,n),n.increment(r,e),(i=!1)=>{t.update_pending_count(-1,n),n.decrement(r,e,i)}}function Ut(e){var t=2|x;return H!==null&&(H.f|=te),{ctx:qe,deps:null,effects:null,equals:Re,f:t,fn:e,reactions:null,rv:0,v:Ee,wv:0,parent:H,ac:null}}function Wt(e,t,n){let r=H;r===null&&pe();var i=void 0,a=en(Ee),o=!V,s=new Map;return zn(()=>{var t=H,n=h();i=n.promise;try{Promise.resolve(e()).then(n.resolve,n.reject).finally(Vt)}catch(e){n.reject(e),Vt()}var c=N;if(o){if(t.f&32768)var l=Ht();if(r.b.is_rendered())s.get(c)?.reject(ue),s.delete(c);else{for(let e of s.values())e.reject(ue);s.clear()}s.set(c,n)}let u=(e,n=void 0)=>{if(l&&l(n===ue),!(n===ue||t.f&16384)){if(c.activate(),n)a.f|=oe,nn(a,n);else{a.f&8388608&&(a.f^=oe),nn(a,e);for(let[e,t]of s){if(s.delete(e),e===c)break;t.reject(ue)}}c.deactivate()}};n.promise.then(u,e=>u(null,e||`unknown`))}),Mn(()=>{for(let e of s.values())e.reject(ue)}),new Promise(e=>{function t(n){function r(){n===i?e(a):t(i)}n.then(r,r)}t(i)})}function P(e){let t=Ut(e);return Ve||lr(t),t}function Gt(e){let t=Ut(e);return t.equals=Be,t}function Kt(e){var t=e.effects;if(t!==null){e.effects=null;for(var n=0;n<t.length;n+=1)qn(t[n])}}function qt(e){var t,n=H,r=e.parent;if(!rr&&r!==null&&r.f&24576)return Oe(),e.v;sr(r);try{e.f&=~re,Kt(e),t=xr(e)}finally{sr(n)}return t}function Jt(e){var t=qt(e);if(!e.equals(t)&&(e.wv=vr(),(!N?.is_fork||e.deps===null)&&(N===null?e.v=t:N.capture(e,t,!0),e.deps===null))){ct(e,b);return}rr||(_t===null?lt(e):(jn()||N?.is_fork)&&_t.set(e,t))}function Yt(e){if(e.effects!==null)for(let t of e.effects)(t.teardown||t.ac)&&(t.teardown?.(),t.ac?.abort(ue),t.teardown=f,t.ac=null,Cr(t,0),Gn(t))}function Xt(e){if(e.effects!==null)for(let t of e.effects)t.teardown&&wr(t)}var Zt=new Set,Qt=new Map,$t=!1;function en(e,t){return{f:0,v:e,reactions:null,equals:Re,rv:0,wv:0}}function F(e,t){let n=en(e,t);return lr(n),n}function tn(e,t=!1,n=!0){let r=en(e);return t||(r.equals=Be),He&&n&&qe!==null&&qe.l!==null&&(qe.l.s??=[]).push(r),r}function I(e,t,r=!1){return V!==null&&(!ar||V.f&131072)&&Qe()&&V.f&4325394&&(cr===null||!n.call(cr,e))&&Ce(),nn(e,r?sn(t):t,St)}function nn(e,t,n=null){if(!e.equals(t)){Qt.set(e,rr?t:e.v);var r=Tt.ensure();if(r.capture(e,t),e.f&2){let t=e;e.f&2048&&qt(t),_t===null&&lt(t)}e.wv=vr(),on(e,x,n),Qe()&&H!==null&&H.f&1024&&!(H.f&96)&&(fr===null?pr([e]):fr.push(e)),!r.is_fork&&Zt.size>0&&!$t&&rn()}return t}function rn(){$t=!1;for(let e of Zt)e.f&1024&&ct(e,S),yr(e)&&wr(e);Zt.clear()}function an(e){I(e,e.v+1)}function on(e,t,n){var r=e.reactions;if(r!==null)for(var i=Qe(),a=r.length,o=0;o<a;o++){var s=r[o],c=s.f;if(!(!i&&s===H)){var l=(c&x)===0;if(l&&ct(s,t),c&2){var u=s;_t?.delete(u),c&65536||(c&512&&(s.f|=re),on(u,S,n))}else if(l){var d=s;c&16&&Ot!==null&&Ot.add(d),n===null?Mt(d):n.push(d)}}}}function sn(t){if(typeof t!=`object`||!t||se in t)return t;let n=l(t);if(n!==s&&n!==c)return t;var r=new Map,i=e(t),o=F(0),u=null,d=gr,f=e=>{if(gr===d)return e();var t=V,n=gr;or(null),_r(d);var r=e();return or(t),_r(n),r};return i&&r.set(`length`,F(t.length,u)),new Proxy(t,{defineProperty(e,t,n){(!(`value`in n)||n.configurable===!1||n.enumerable===!1||n.writable===!1)&&xe();var i=r.get(t);return i===void 0?f(()=>{var e=F(n.value,u);return r.set(t,e),e}):I(i,n.value,!0),!0},deleteProperty(e,t){var n=r.get(t);if(n===void 0){if(t in e){let e=f(()=>F(Ee,u));r.set(t,e),an(o)}}else I(n,Ee),an(o);return!0},get(e,n,i){if(n===se)return t;var o=r.get(n),s=n in e;if(o===void 0&&(!s||a(e,n)?.writable)&&(o=f(()=>F(sn(s?e[n]:Ee),u)),r.set(n,o)),o!==void 0){var c=U(o);return c===Ee?void 0:c}return Reflect.get(e,n,i)},getOwnPropertyDescriptor(e,t){var n=Reflect.getOwnPropertyDescriptor(e,t);if(n&&`value`in n){var i=r.get(t);i&&(n.value=U(i))}else if(n===void 0){var a=r.get(t),o=a?.v;if(a!==void 0&&o!==Ee)return{enumerable:!0,configurable:!0,value:o,writable:!0}}return n},has(e,t){if(t===se)return!0;var n=r.get(t),i=n!==void 0&&n.v!==Ee||Reflect.has(e,t);return(n!==void 0||H!==null&&(!i||a(e,t)?.writable))&&(n===void 0&&(n=f(()=>F(i?sn(e[t]):Ee,u)),r.set(t,n)),U(n)===Ee)?!1:i},set(e,t,n,s){var c=r.get(t),l=t in e;if(i&&t===`length`)for(var d=n;d<c.v;d+=1){var p=r.get(d+``);p===void 0?d in e&&(p=f(()=>F(Ee,u)),r.set(d+``,p)):I(p,Ee)}if(c===void 0)(!l||a(e,t)?.writable)&&(c=f(()=>F(void 0,u)),I(c,sn(n)),r.set(t,c));else{l=c.v!==Ee;var m=f(()=>sn(n));I(c,m)}var h=Reflect.getOwnPropertyDescriptor(e,t);if(h?.set&&h.set.call(s,n),!l){if(i&&typeof t==`string`){var g=r.get(`length`),_=Number(t);Number.isInteger(_)&&_>=g.v&&I(g,_+1)}an(o)}return!0},ownKeys(e){U(o);var t=Reflect.ownKeys(e).filter(e=>{var t=r.get(e);return t===void 0||t.v!==Ee});for(var[n,i]of r)i.v!==Ee&&!(n in e)&&t.push(n);return t},setPrototypeOf(){Se()}})}function cn(e){try{if(typeof e==`object`&&e&&se in e)return e[se]}catch{}return e}function ln(e,t){return Object.is(cn(e),cn(t))}var un,dn,fn,pn;function mn(){if(un===void 0){un=window,dn=/Firefox/.test(navigator.userAgent);var e=Element.prototype,t=Node.prototype,n=Text.prototype;fn=a(t,`firstChild`).get,pn=a(t,`nextSibling`).get,u(e)&&(e.__click=void 0,e.__className=void 0,e.__attributes=null,e.__style=void 0,e.__e=void 0),u(n)&&(n.__t=void 0)}}function hn(e=``){return document.createTextNode(e)}function gn(e){return fn.call(e)}function _n(e){return pn.call(e)}function L(e,t){if(!O)return gn(e);var n=gn(k);if(n===null)n=k.appendChild(hn());else if(t&&n.nodeType!==3){var r=hn();return n?.before(r),Ne(r),r}return t&&xn(n),Ne(n),n}function R(e,t=!1){if(!O){var n=gn(e);return n instanceof Comment&&n.data===``?_n(n):n}if(t){if(k?.nodeType!==3){var r=hn();return k?.before(r),Ne(r),r}xn(k)}return k}function z(e,t=1,n=!1){let r=O?k:e;for(var i;t--;)i=r,r=_n(r);if(!O)return r;if(n){if(r?.nodeType!==3){var a=hn();return r===null?i?.after(a):r.before(a),Ne(a),a}xn(r)}return Ne(r),r}function vn(e){e.textContent=``}function yn(){return!Ve||Ot!==null?!1:(H.f&T)!==0}function bn(e,t,n){let r=n?{is:n}:void 0;return document.createElementNS(t??`http://www.w3.org/1999/xhtml`,e,r)}function xn(e){if(e.nodeValue.length<65536)return;let t=e.nextSibling;for(;t!==null&&t.nodeType===3;)t.remove(),e.nodeValue+=t.nodeValue,t=e.nextSibling}function Sn(e,t){if(t){let t=document.body;e.autofocus=!0,rt(()=>{document.activeElement===t&&e.focus()})}}function Cn(e){O&&gn(e)!==null&&vn(e)}var wn=!1;function Tn(){wn||(wn=!0,document.addEventListener(`reset`,e=>{Promise.resolve().then(()=>{if(!e.defaultPrevented)for(let t of e.target.elements)t.__on_r?.()})},{capture:!0}))}function En(e){var t=V,n=H;or(null),sr(null);try{return e()}finally{or(t),sr(n)}}function Dn(e,t,n,r=n){e.addEventListener(t,()=>En(n));let i=e.__on_r;i?e.__on_r=()=>{i(),r(!0)}:e.__on_r=()=>r(!0),Tn()}function On(e){H===null&&(V===null&&_e(e),ge()),rr&&he(e)}function kn(e,t){var n=t.last;n===null?t.last=t.first=e:(n.next=e,e.prev=n,t.last=e)}function An(e,t){var n=H;n!==null&&n.f&8192&&(e|=C);var r={ctx:qe,deps:null,nodes:null,f:e|x|512,first:null,fn:t,last:null,next:null,parent:n,b:n&&n.b,prev:null,teardown:null,wv:0,ac:null};N?.register_created_effect(r);var i=r;if(e&4)xt===null?Tt.ensure().schedule(r):xt.push(r);else if(t!==null){try{wr(r)}catch(e){throw qn(r),e}i.deps===null&&i.teardown===null&&i.nodes===null&&i.first===i.last&&!(i.f&524288)&&(i=i.first,e&16&&e&65536&&i!==null&&(i.f|=E))}if(i!==null&&(i.parent=n,n!==null&&kn(i,n),V!==null&&V.f&2&&!(e&64))){var a=V;(a.effects??=[]).push(i)}return r}function jn(){return V!==null&&!ar}function Mn(e){let t=An(8,null);return ct(t,b),t.teardown=e,t}function Nn(e){On(`$effect`);var t=H.f;if(!V&&t&32&&!(t&32768)){var n=qe;(n.e??=[]).push(e)}else return Pn(e)}function Pn(e){return An(4|ne,e)}function Fn(e){return On(`$effect.pre`),An(8|ne,e)}function In(e){Tt.ensure();let t=An(64|te,e);return()=>{qn(t)}}function Ln(e){Tt.ensure();let t=An(64|te,e);return(e={})=>new Promise(n=>{e.outro?Xn(t,()=>{qn(t),n(void 0)}):(qn(t),n(void 0))})}function Rn(e){return An(4,e)}function zn(e){return An(ae|te,e)}function Bn(e,t=0){return An(8|t,e)}function B(e,t=[],n=[],r=[]){zt(r,t,n,t=>{An(8,()=>e(...t.map(U)))})}function Vn(e,t=0){return An(16|t,e)}function Hn(e,t=0){return An(y|t,e)}function Un(e){return An(32|te,e)}function Wn(e){var t=e.teardown;if(t!==null){let e=rr,n=V;ir(!0),or(null);try{t.call(null)}finally{ir(e),or(n)}}}function Gn(e,t=!1){var n=e.first;for(e.first=e.last=null;n!==null;){let e=n.ac;e!==null&&En(()=>{e.abort(ue)});var r=n.next;n.f&64?n.parent=null:qn(n,t),n=r}}function Kn(e){for(var t=e.first;t!==null;){var n=t.next;t.f&32||qn(t),t=n}}function qn(e,t=!0){var n=!1;(t||e.f&262144)&&e.nodes!==null&&e.nodes.end!==null&&(Jn(e.nodes.start,e.nodes.end),n=!0),ct(e,ee),Gn(e,t&&!n),Cr(e,0);var r=e.nodes&&e.nodes.t;if(r!==null)for(let e of r)e.stop();Wn(e),e.f^=ee,e.f|=w;var i=e.parent;i!==null&&i.first!==null&&Yn(e),e.next=e.prev=e.teardown=e.ctx=e.deps=e.fn=e.nodes=e.ac=e.b=null}function Jn(e,t){for(;e!==null;){var n=e===t?null:_n(e);e.remove(),e=n}}function Yn(e){var t=e.parent,n=e.prev,r=e.next;n!==null&&(n.next=r),r!==null&&(r.prev=n),t!==null&&(t.first===e&&(t.first=r),t.last===e&&(t.last=n))}function Xn(e,t,n=!0){var r=[];Zn(e,r,!0);var i=()=>{n&&qn(e),t&&t()},a=r.length;if(a>0){var o=()=>--a||i();for(var s of r)s.out(o)}else i()}function Zn(e,t,n){if(!(e.f&8192)){e.f^=C;var r=e.nodes&&e.nodes.t;if(r!==null)for(let e of r)(e.is_global||n)&&t.push(e);for(var i=e.first;i!==null;){var a=i.next;if(!(i.f&64)){var o=(i.f&65536)!=0||(i.f&32)!=0&&(e.f&16)!=0;Zn(i,t,o?n:!1)}i=a}}}function Qn(e){$n(e,!0)}function $n(e,t){if(e.f&8192){e.f^=C,e.f&1024||(ct(e,x),Tt.ensure().schedule(e));for(var n=e.first;n!==null;){var r=n.next,i=(n.f&65536)!=0||(n.f&32)!=0;$n(n,i?t:!1),n=r}var a=e.nodes&&e.nodes.t;if(a!==null)for(let e of a)(e.is_global||t)&&e.in()}}function er(e,t){if(e.nodes)for(var n=e.nodes.start,r=e.nodes.end;n!==null;){var i=n===r?null:_n(n);t.append(n),n=i}}var tr=null,nr=!1,rr=!1;function ir(e){rr=e}var V=null,ar=!1;function or(e){V=e}var H=null;function sr(e){H=e}var cr=null;function lr(e){V!==null&&(!Ve||V.f&2)&&(cr===null?cr=[e]:cr.push(e))}var ur=null,dr=0,fr=null;function pr(e){fr=e}var mr=1,hr=0,gr=hr;function _r(e){gr=e}function vr(){return++mr}function yr(e){var t=e.f;if(t&2048)return!0;if(t&2&&(e.f&=~re),t&4096){for(var n=e.deps,r=n.length,i=0;i<r;i++){var a=n[i];if(yr(a)&&Jt(a),a.wv>e.wv)return!0}t&512&&_t===null&&ct(e,b)}return!1}function br(e,t,r=!0){var i=e.reactions;if(i!==null&&!(!Ve&&cr!==null&&n.call(cr,e)))for(var a=0;a<i.length;a++){var o=i[a];o.f&2?br(o,t,!1):t===o&&(r?ct(o,x):o.f&1024&&ct(o,S),Mt(o))}}function xr(e){var t=ur,n=dr,r=fr,i=V,a=cr,o=qe,s=ar,c=gr,l=e.f;ur=null,dr=0,fr=null,V=l&96?null:e,cr=null,Je(e.ctx),ar=!1,gr=++hr,e.ac!==null&&(En(()=>{e.ac.abort(ue)}),e.ac=null);try{e.f|=ie;var u=e.fn,d=u();e.f|=T;var f=e.deps,p=N?.is_fork;if(ur!==null){var m;if(p||Cr(e,dr),f!==null&&dr>0)for(f.length=dr+ur.length,m=0;m<ur.length;m++)f[dr+m]=ur[m];else e.deps=f=ur;if(jn()&&e.f&512)for(m=dr;m<f.length;m++)(f[m].reactions??=[]).push(e)}else !p&&f!==null&&dr<f.length&&(Cr(e,dr),f.length=dr);if(Qe()&&fr!==null&&!ar&&f!==null&&!(e.f&6146))for(m=0;m<fr.length;m++)br(fr[m],e);if(i!==null&&i!==e){if(hr++,i.deps!==null)for(let e=0;e<n;e+=1)i.deps[e].rv=hr;if(t!==null)for(let e of t)e.rv=hr;fr!==null&&(r===null?r=fr:r.push(...fr))}return e.f&8388608&&(e.f^=oe),d}catch(e){return at(e)}finally{e.f^=ie,ur=t,dr=n,fr=r,V=i,cr=a,Je(o),ar=s,gr=c}}function Sr(e,r){let i=r.reactions;if(i!==null){var a=t.call(i,e);if(a!==-1){var o=i.length-1;o===0?i=r.reactions=null:(i[a]=i[o],i.pop())}}if(i===null&&r.f&2&&(ur===null||!n.call(ur,r))){var s=r;s.f&512&&(s.f^=512,s.f&=~re),s.v!==Ee&&lt(s),Yt(s),Cr(s,0)}}function Cr(e,t){var n=e.deps;if(n!==null)for(var r=t;r<n.length;r++)Sr(e,n[r])}function wr(e){var t=e.f;if(!(t&16384)){ct(e,b);var n=H,r=nr;H=e,nr=!0;try{t&16777232?Kn(e):Gn(e),Wn(e);var i=xr(e);e.teardown=typeof i==`function`?i:null,e.wv=mr}finally{nr=r,H=n}}}async function Tr(){if(Ve)return new Promise(e=>{requestAnimationFrame(()=>e()),setTimeout(()=>e())});await Promise.resolve(),Et()}function U(e){var t=(e.f&2)!=0;if(tr?.add(e),V!==null&&!ar&&!(H!==null&&H.f&16384)&&(cr===null||!n.call(cr,e))){var r=V.deps;if(V.f&2097152)e.rv<hr&&(e.rv=hr,ur===null&&r!==null&&r[dr]===e?dr++:ur===null?ur=[e]:ur.push(e));else{(V.deps??=[]).push(e);var i=e.reactions;i===null?e.reactions=[V]:n.call(i,V)||i.push(V)}}if(rr&&Qt.has(e))return Qt.get(e);if(t){var a=e;if(rr){var o=a.v;return(!(a.f&1024)&&a.reactions!==null||Dr(a))&&(o=qt(a)),Qt.set(a,o),o}var s=(a.f&512)==0&&!ar&&V!==null&&(nr||(V.f&512)!=0),c=(a.f&T)===0;yr(a)&&(s&&(a.f|=512),Jt(a)),s&&!c&&(Xt(a),Er(a))}if(_t?.has(e))return _t.get(e);if(e.f&8388608)throw e.v;return e.v}function Er(e){if(e.f|=512,e.deps!==null)for(let t of e.deps)(t.reactions??=[]).push(e),t.f&2&&!(t.f&512)&&(Xt(t),Er(t))}function Dr(e){if(e.v===Ee)return!0;if(e.deps===null)return!1;for(let t of e.deps)if(Qt.has(t)||t.f&2&&Dr(t))return!0;return!1}function Or(e){var t=ar;try{return ar=!0,e()}finally{ar=t}}function kr(e){if(!(typeof e!=`object`||!e||e instanceof EventTarget)){if(se in e)Ar(e);else if(!Array.isArray(e))for(let t in e){let n=e[t];typeof n==`object`&&n&&se in n&&Ar(n)}}}function Ar(e,t=new Set){if(typeof e==`object`&&e&&!(e instanceof EventTarget)&&!t.has(e)){t.add(e),e instanceof Date&&e.getTime();for(let n in e)try{Ar(e[n],t)}catch{}let n=l(e);if(n!==Object.prototype&&n!==Array.prototype&&n!==Map.prototype&&n!==Set.prototype&&n!==Date.prototype){let t=o(n);for(let n in t){let r=t[n].get;if(r)try{r.call(e)}catch{}}}}}function jr(e){return e.endsWith(`capture`)&&e!==`gotpointercapture`&&e!==`lostpointercapture`}var Mr=[`beforeinput`,`click`,`change`,`dblclick`,`contextmenu`,`focusin`,`focusout`,`input`,`keydown`,`keyup`,`mousedown`,`mousemove`,`mouseout`,`mouseover`,`mouseup`,`pointerdown`,`pointermove`,`pointerout`,`pointerover`,`pointerup`,`touchend`,`touchmove`,`touchstart`];function Nr(e){return Mr.includes(e)}var Pr=`allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback`.split(`.`),Fr={formnovalidate:`formNoValidate`,ismap:`isMap`,nomodule:`noModule`,playsinline:`playsInline`,readonly:`readOnly`,defaultvalue:`defaultValue`,defaultchecked:`defaultChecked`,srcobject:`srcObject`,novalidate:`noValidate`,allowfullscreen:`allowFullscreen`,disablepictureinpicture:`disablePictureInPicture`,disableremoteplayback:`disableRemotePlayback`};function Ir(e){return e=e.toLowerCase(),Fr[e]??e}[...Pr];var Lr=[`touchstart`,`touchmove`];function Rr(e){return Lr.includes(e)}var zr=Symbol(`events`),Br=new Set,Vr=new Set;function Hr(e){if(!O)return;e.removeAttribute(`onload`),e.removeAttribute(`onerror`);let t=e.__e;t!==void 0&&(e.__e=void 0,queueMicrotask(()=>{e.isConnected&&e.dispatchEvent(t)}))}function Ur(e,t,n,r={}){function i(e){if(r.capture||Jr.call(t,e),!e.cancelBubble)return En(()=>n?.call(this,e))}return e.startsWith(`pointer`)||e.startsWith(`touch`)||e===`wheel`?rt(()=>{t.addEventListener(e,i,r)}):t.addEventListener(e,i,r),i}function Wr(e,t,n,r={}){var i=Ur(t,e,n,r);return()=>{e.removeEventListener(t,i,r)}}function Gr(e,t,n,r,i){var a={capture:r,passive:i},o=Ur(e,t,n,a);(t===document.body||t===window||t===document||t instanceof HTMLMediaElement)&&Mn(()=>{t.removeEventListener(e,o,a)})}function W(e,t,n){(t[zr]??={})[e]=n}function Kr(e){for(var t=0;t<e.length;t++)Br.add(e[t]);for(var n of Vr)n(e)}var qr=null;function Jr(e){var t=this,n=t.ownerDocument,r=e.type,a=e.composedPath?.()||[],o=a[0]||e.target;qr=e;var s=0,c=qr===e&&e[zr];if(c){var l=a.indexOf(c);if(l!==-1&&(t===document||t===window)){e[zr]=t;return}var u=a.indexOf(t);if(u===-1)return;l<=u&&(s=l)}if(o=a[s]||e.target,o!==t){i(e,`currentTarget`,{configurable:!0,get(){return o||n}});var d=V,f=H;or(null),sr(null);try{for(var p,m=[];o!==null;){var h=o.assignedSlot||o.parentNode||o.host||null;try{var g=o[zr]?.[r];g!=null&&(!o.disabled||e.target===o)&&g.call(o,e)}catch(e){p?m.push(e):p=e}if(e.cancelBubble||h===t||h===null)break;o=h}if(p){for(let e of m)queueMicrotask(()=>{throw e});throw p}}finally{e[zr]=t,delete e.currentTarget,or(d),sr(f)}}}var Yr=globalThis?.window?.trustedTypes&&globalThis.window.trustedTypes.createPolicy(`svelte-trusted-html`,{createHTML:e=>e});function Xr(e){return Yr?.createHTML(e)??e}function Zr(e){var t=bn(`template`);return t.innerHTML=Xr(e.replaceAll(`<!>`,`<!---->`)),t.content}function Qr(e,t){var n=H;n.nodes===null&&(n.nodes={start:e,end:t,a:null,t:null})}function G(e,t){var n=(t&1)!=0,r=(t&2)!=0,i,a=!e.startsWith(`<!>`);return()=>{if(O)return Qr(k,null),k;i===void 0&&(i=Zr(a?e:`<!>`+e),n||(i=gn(i)));var t=r||dn?document.importNode(i,!0):i.cloneNode(!0);if(n){var o=gn(t),s=t.lastChild;Qr(o,s)}else Qr(t,t);return t}}function $r(e,t,n=`svg`){var r=!e.startsWith(`<!>`),i=(t&1)!=0,a=`<${n}>${r?e:`<!>`+e}</${n}>`,o;return()=>{if(O)return Qr(k,null),k;if(!o){var e=gn(Zr(a));if(i)for(o=document.createDocumentFragment();gn(e);)o.appendChild(gn(e));else o=gn(e)}var t=o.cloneNode(!0);if(i){var n=gn(t),r=t.lastChild;Qr(n,r)}else Qr(t,t);return t}}function ei(e,t){return $r(e,t,`svg`)}function ti(e=``){if(!O){var t=hn(e+``);return Qr(t,t),t}var n=k;return n.nodeType===3?xn(n):(n.before(n=hn()),Ne(n)),Qr(n,n),n}function ni(){if(O)return Qr(k,null),k;var e=document.createDocumentFragment(),t=document.createComment(``),n=hn();return e.append(t,n),Qr(t,n),e}function K(e,t){if(O){var n=H;(!(n.f&32768)||n.nodes.end===null)&&(n.nodes.end=k),Pe();return}e!==null&&e.before(t)}function q(e,t){var n=t==null?``:typeof t==`object`?`${t}`:t;n!==(e.__t??=e.nodeValue)&&(e.__t=n,e.nodeValue=`${n}`)}function ri(e,t){return ai(e,t)}var ii=new Map;function ai(e,{target:t,anchor:n,props:i={},events:a,context:o,intro:s=!0,transformError:c}){mn();var l=void 0,u=Ln(()=>{var s=n??t.appendChild(hn());Lt(s,{pending:()=>{}},t=>{j({});var n=qe;if(o&&(n.c=o),a&&(i.$$events=a),O&&Qr(t,null),l=e(t,i)||{},O&&(H.nodes.end=k,k===null||k.nodeType!==8||k.data!==`]`))throw ke(),Te;M()},c);var u=new Set,d=e=>{for(var n=0;n<e.length;n++){var r=e[n];if(!u.has(r)){u.add(r);var i=Rr(r);for(let e of[t,document]){var a=ii.get(e);a===void 0&&(a=new Map,ii.set(e,a));var o=a.get(r);o===void 0?(e.addEventListener(r,Jr,{passive:i}),a.set(r,1)):a.set(r,o+1)}}}};return d(r(Br)),Vr.add(d),()=>{for(var e of u)for(let n of[t,document]){var r=ii.get(n),i=r.get(e);--i==0?(n.removeEventListener(e,Jr),r.delete(e),r.size===0&&ii.delete(n)):r.set(e,i)}Vr.delete(d),s!==n&&s.parentNode?.removeChild(s)}});return oi.set(l,u),l}var oi=new WeakMap,si=class{anchor;#e=new Map;#t=new Map;#n=new Map;#r=new Set;#i=!0;constructor(e,t=!0){this.anchor=e,this.#i=t}#a=e=>{if(this.#e.has(e)){var t=this.#e.get(e),n=this.#t.get(t);if(n)Qn(n),this.#r.delete(t);else{var r=this.#n.get(t);r&&(this.#t.set(t,r.effect),this.#n.delete(t),r.fragment.lastChild.remove(),this.anchor.before(r.fragment),n=r.effect)}for(let[t,n]of this.#e){if(this.#e.delete(t),t===e)break;let r=this.#n.get(n);r&&(qn(r.effect),this.#n.delete(n))}for(let[e,r]of this.#t){if(e===t||this.#r.has(e))continue;let i=()=>{if(Array.from(this.#e.values()).includes(e)){var t=document.createDocumentFragment();er(r,t),t.append(hn()),this.#n.set(e,{effect:r,fragment:t})}else qn(r);this.#r.delete(e),this.#t.delete(e)};this.#i||!n?(this.#r.add(e),Xn(r,i,!1)):i()}}};#o=e=>{this.#e.delete(e);let t=Array.from(this.#e.values());for(let[e,n]of this.#n)t.includes(e)||(qn(n.effect),this.#n.delete(e))};ensure(e,t){var n=N,r=yn();if(t&&!this.#t.has(e)&&!this.#n.has(e))if(r){var i=document.createDocumentFragment(),a=hn();i.append(a),this.#n.set(e,{effect:Un(()=>t(a)),fragment:i})}else this.#t.set(e,Un(()=>t(this.anchor)));if(this.#e.set(n,e),r){for(let[t,r]of this.#t)t===e?n.unskip_effect(r):n.skip_effect(r);for(let[t,r]of this.#n)t===e?n.unskip_effect(r.effect):n.skip_effect(r.effect);n.oncommit(this.#a),n.ondiscard(this.#o)}else O&&(this.anchor=k),this.#a(n)}};function J(e,t,n=!1){var r;O&&(r=k,Pe());var i=new si(e),a=n?E:0;function o(e,t){if(O){var n=Le(r);if(e!==parseInt(n.substring(1))){var a=Ie();Ne(a),i.anchor=a,Me(!1),i.ensure(e,t),Me(!0);return}}i.ensure(e,t)}Vn(()=>{var e=!1;t((t,n=0)=>{e=!0,o(n,t)}),e||o(-1,null)},a)}function ci(e,t){O&&Ne(gn(e)),Bn(()=>{var n=t();for(var r in n){var i=n[r];i?e.style.setProperty(r,i):e.style.removeProperty(r)}})}function li(e,t){return t}function ui(e,t,n){for(var i=[],a=t.length,o,s=t.length,c=0;c<a;c++){let n=t[c];Xn(n,()=>{if(o){if(o.pending.delete(n),o.done.add(n),o.pending.size===0){var t=e.outrogroups;di(e,r(o.done)),t.delete(o),t.size===0&&(e.outrogroups=null)}}else --s},!1)}if(s===0){var l=i.length===0&&n!==null;if(l){var u=n,d=u.parentNode;vn(d),d.append(u),e.items.clear()}di(e,t,!l)}else o={pending:new Set(t),done:new Set},(e.outrogroups??=new Set).add(o)}function di(e,t,n=!0){var r;if(e.pending.size>0){r=new Set;for(let t of e.pending.values())for(let n of t)r.add(e.items.get(n).e)}for(var i=0;i<t.length;i++){var a=t[i];r?.has(a)?(a.f|=D,er(a,document.createDocumentFragment())):qn(t[i],n)}}var fi;function pi(t,n,i,a,o,s=null){var c=t,l=new Map;if(n&4){var u=t;c=O?Ne(gn(u)):u.appendChild(hn())}O&&Pe();var d=null,f=Gt(()=>{var t=i();return e(t)?t:t==null?[]:r(t)}),p,m=new Map,h=!0;function g(e){v.effect.f&16384||(v.pending.delete(e),v.fallback=d,hi(v,p,c,n,a),d!==null&&(p.length===0?d.f&33554432?(d.f^=D,_i(d,null,c)):Qn(d):Xn(d,()=>{d=null})))}function _(e){v.pending.delete(e)}var v={effect:Vn(()=>{p=U(f);var e=p.length;let t=!1;O&&Le(c)===`[!`!=(e===0)&&(c=Ie(),Ne(c),Me(!1),t=!0);for(var r=new Set,u=N,v=yn(),y=0;y<e;y+=1){O&&k.nodeType===8&&k.data===`]`&&(c=k,t=!0,Me(!1));var b=p[y],x=a(b,y),S=h?null:l.get(x);S?(S.v&&nn(S.v,b),S.i&&nn(S.i,y),v&&u.unskip_effect(S.e)):(S=gi(l,h?c:fi??=hn(),b,x,y,o,n,i),h||(S.e.f|=D),l.set(x,S)),r.add(x)}if(e===0&&s&&!d&&(h?d=Un(()=>s(c)):(d=Un(()=>s(fi??=hn())),d.f|=D)),e>r.size&&me(``,``,``),O&&e>0&&Ne(Ie()),!h)if(m.set(u,r),v){for(let[e,t]of l)r.has(e)||u.skip_effect(t.e);u.oncommit(g),u.ondiscard(_)}else g(u);t&&Me(!0),U(f)}),flags:n,items:l,pending:m,outrogroups:null,fallback:d};h=!1,O&&(c=k)}function mi(e){for(;e!==null&&!(e.f&32);)e=e.next;return e}function hi(e,t,n,i,a){var o=(i&8)!=0,s=t.length,c=e.items,l=mi(e.effect.first),u,d=null,f,p=[],m=[],h,g,_,v;if(o)for(v=0;v<s;v+=1)h=t[v],g=a(h,v),_=c.get(g).e,_.f&33554432||(_.nodes?.a?.measure(),(f??=new Set).add(_));for(v=0;v<s;v+=1){if(h=t[v],g=a(h,v),_=c.get(g).e,e.outrogroups!==null)for(let t of e.outrogroups)t.pending.delete(_),t.done.delete(_);if(_.f&8192&&(Qn(_),o&&(_.nodes?.a?.unfix(),(f??=new Set).delete(_))),_.f&33554432)if(_.f^=D,_===l)_i(_,null,n);else{var y=d?d.next:l;_===e.effect.last&&(e.effect.last=_.prev),_.prev&&(_.prev.next=_.next),_.next&&(_.next.prev=_.prev),vi(e,d,_),vi(e,_,y),_i(_,y,n),d=_,p=[],m=[],l=mi(d.next);continue}if(_!==l){if(u!==void 0&&u.has(_)){if(p.length<m.length){var b=m[0],x;d=b.prev;var S=p[0],C=p[p.length-1];for(x=0;x<p.length;x+=1)_i(p[x],b,n);for(x=0;x<m.length;x+=1)u.delete(m[x]);vi(e,S.prev,C.next),vi(e,d,S),vi(e,C,b),l=b,d=C,--v,p=[],m=[]}else u.delete(_),_i(_,l,n),vi(e,_.prev,_.next),vi(e,_,d===null?e.effect.first:d.next),vi(e,d,_),d=_;continue}for(p=[],m=[];l!==null&&l!==_;)(u??=new Set).add(l),m.push(l),l=mi(l.next);if(l===null)continue}_.f&33554432||p.push(_),d=_,l=mi(_.next)}if(e.outrogroups!==null){for(let t of e.outrogroups)t.pending.size===0&&(di(e,r(t.done)),e.outrogroups?.delete(t));e.outrogroups.size===0&&(e.outrogroups=null)}if(l!==null||u!==void 0){var w=[];if(u!==void 0)for(_ of u)_.f&8192||w.push(_);for(;l!==null;)!(l.f&8192)&&l!==e.fallback&&w.push(l),l=mi(l.next);var T=w.length;if(T>0){var ee=i&4&&s===0?n:null;if(o){for(v=0;v<T;v+=1)w[v].nodes?.a?.measure();for(v=0;v<T;v+=1)w[v].nodes?.a?.fix()}ui(e,w,ee)}}o&&rt(()=>{if(f!==void 0)for(_ of f)_.nodes?.a?.apply()})}function gi(e,t,n,r,i,a,o,s){var c=o&1?o&16?en(n):tn(n,!1,!1):null,l=o&2?en(i):null;return{v:c,i:l,e:Un(()=>(a(t,c??n,l??i,s),()=>{e.delete(r)}))}}function _i(e,t,n){if(e.nodes)for(var r=e.nodes.start,i=e.nodes.end,a=t&&!(t.f&33554432)?t.nodes.start:n;r!==null;){var o=_n(r);if(a.before(r),r===i)return;r=o}}function vi(e,t,n){t===null?e.effect.first=n:t.next=n,n===null?e.effect.last=t:n.prev=t}function yi(e,t,...n){var r=new si(e);Vn(()=>{let e=t()??null;r.ensure(e,e&&(t=>e(t,...n)))},E)}function bi(e,t,n){var r;O&&(r=k,Pe());var i=new si(e);Vn(()=>{var e=t()??null;if(O&&Le(r)===`[`!=(e!==null)){var a=Ie();Ne(a),i.anchor=a,Me(!1),i.ensure(e,e&&(t=>n(t,e))),Me(!0);return}i.ensure(e,e&&(t=>n(t,e)))},E)}function xi(e,t,n){Rn(()=>{var r=Or(()=>t(e,n?.())||{});if(n&&r?.update){var i=!1,a={};Bn(()=>{var e=n();kr(e),i&&ze(a,e)&&(a=e,r.update(e))}),i=!0}if(r?.destroy)return()=>r.destroy()})}function Si(e,t){var n=void 0,r;Hn(()=>{n!==(n=t())&&(r&&=(qn(r),null),n&&(r=Un(()=>{Rn(()=>n(e))})))})}function Ci(e){var t,n,r=``;if(typeof e==`string`||typeof e==`number`)r+=e;else if(typeof e==`object`)if(Array.isArray(e)){var i=e.length;for(t=0;t<i;t++)e[t]&&(n=Ci(e[t]))&&(r&&(r+=` `),r+=n)}else for(n in e)e[n]&&(r&&(r+=` `),r+=n);return r}function wi(){for(var e,t,n=0,r=``,i=arguments.length;n<i;n++)(e=arguments[n])&&(t=Ci(e))&&(r&&(r+=` `),r+=t);return r}function Ti(e){return typeof e==`object`?wi(e):e??``}var Ei=[...` 	
\r\f\xA0\v﻿`];function Di(e,t,n){var r=e==null?``:``+e;if(t&&(r=r?r+` `+t:t),n){for(var i of Object.keys(n))if(n[i])r=r?r+` `+i:i;else if(r.length)for(var a=i.length,o=0;(o=r.indexOf(i,o))>=0;){var s=o+a;(o===0||Ei.includes(r[o-1]))&&(s===r.length||Ei.includes(r[s]))?r=(o===0?``:r.substring(0,o))+r.substring(s+1):o=s}}return r===``?null:r}function Oi(e,t=!1){var n=t?` !important;`:`;`,r=``;for(var i of Object.keys(e)){var a=e[i];a!=null&&a!==``&&(r+=` `+i+`: `+a+n)}return r}function ki(e){return e[0]!==`-`||e[1]!==`-`?e.toLowerCase():e}function Ai(e,t){if(t){var n=``,r,i;if(Array.isArray(t)?(r=t[0],i=t[1]):r=t,e){e=String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g,``).trim();var a=!1,o=0,s=!1,c=[];r&&c.push(...Object.keys(r).map(ki)),i&&c.push(...Object.keys(i).map(ki));var l=0,u=-1;let t=e.length;for(var d=0;d<t;d++){var f=e[d];if(s?f===`/`&&e[d-1]===`*`&&(s=!1):a?a===f&&(a=!1):f===`/`&&e[d+1]===`*`?s=!0:f===`"`||f===`'`?a=f:f===`(`?o++:f===`)`&&o--,!s&&a===!1&&o===0){if(f===`:`&&u===-1)u=d;else if(f===`;`||d===t-1){if(u!==-1){var p=ki(e.substring(l,u).trim());if(!c.includes(p)){f!==`;`&&d++;var m=e.substring(l,d).trim();n+=` `+m+`;`}}l=d+1,u=-1}}}}return r&&(n+=Oi(r)),i&&(n+=Oi(i,!0)),n=n.trim(),n===``?null:n}return e==null?null:String(e)}function ji(e,t,n,r,i,a){var o=e.__className;if(O||o!==n||o===void 0){var s=Di(n,r,a);(!O||s!==e.getAttribute(`class`))&&(s==null?e.removeAttribute(`class`):t?e.className=s:e.setAttribute(`class`,s)),e.__className=n}else if(a&&i!==a)for(var c in a){var l=!!a[c];(i==null||l!==!!i[c])&&e.classList.toggle(c,l)}return a}function Mi(e,t={},n,r){for(var i in n){var a=n[i];t[i]!==a&&(n[i]==null?e.style.removeProperty(i):e.style.setProperty(i,a,r))}}function Ni(e,t,n,r){var i=e.__style;if(O||i!==t){var a=Ai(t,r);(!O||a!==e.getAttribute(`style`))&&(a==null?e.removeAttribute(`style`):e.style.cssText=a),e.__style=t}else r&&(Array.isArray(r)?(Mi(e,n?.[0],r[0]),Mi(e,n?.[1],r[1],`important`)):Mi(e,n,r));return r}function Pi(t,n,r=!1){if(t.multiple){if(n==null)return;if(!e(n))return Ae();for(var i of t.options)i.selected=n.includes(Li(i));return}for(i of t.options)if(ln(Li(i),n)){i.selected=!0;return}(!r||n!==void 0)&&(t.selectedIndex=-1)}function Fi(e){var t=new MutationObserver(()=>{Pi(e,e.__value)});t.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:[`value`]}),Mn(()=>{t.disconnect()})}function Ii(e,t,n=t){var r=new WeakSet,i=!0;Dn(e,`change`,t=>{var i=t?`[selected]`:`:checked`,a;if(e.multiple)a=[].map.call(e.querySelectorAll(i),Li);else{var o=e.querySelector(i)??e.querySelector(`option:not([disabled])`);a=o&&Li(o)}n(a),e.__value=a,N!==null&&r.add(N)}),Rn(()=>{var a=t();if(e===document.activeElement){var o=Ve?gt:N;if(r.has(o))return}if(Pi(e,a,i),i&&a===void 0){var s=e.querySelector(`:checked`);s!==null&&(a=Li(s),n(a))}e.__value=a,i=!1}),Fi(e)}function Li(e){return`__value`in e?e.__value:e.value}var Ri=Symbol(`class`),zi=Symbol(`style`),Bi=Symbol(`is custom element`),Vi=Symbol(`is html`),Hi=de?`link`:`LINK`,Ui=de?`input`:`INPUT`,Wi=de?`option`:`OPTION`,Gi=de?`select`:`SELECT`,Ki=de?`progress`:`PROGRESS`;function qi(e){if(O){var t=!1,n=()=>{if(!t){if(t=!0,e.hasAttribute(`value`)){var n=e.value;Y(e,`value`,null),e.value=n}if(e.hasAttribute(`checked`)){var r=e.checked;Y(e,`checked`,null),e.checked=r}}};e.__on_r=n,rt(n),Tn()}}function Ji(e,t){var n=Qi(e);n.value===(n.value=t??void 0)||e.value===t&&(t!==0||e.nodeName!==Ki)||(e.value=t??``)}function Yi(e,t){t?e.hasAttribute(`selected`)||e.setAttribute(`selected`,``):e.removeAttribute(`selected`)}function Y(e,t,n,r){var i=Qi(e);O&&(i[t]=e.getAttribute(t),t===`src`||t===`srcset`||t===`href`&&e.nodeName===Hi)||i[t]!==(i[t]=n)&&(t===`loading`&&(e[le]=n),n==null?e.removeAttribute(t):typeof n!=`string`&&ea(e).includes(t)?e[t]=n:e.setAttribute(t,n))}function Xi(e,t,n,r,i=!1,a=!1){if(O&&i&&e.nodeName===Ui){var o=e;(o.type===`checkbox`?`defaultChecked`:`defaultValue`)in n||qi(o)}var s=Qi(e),c=s[Bi],l=!s[Vi];let u=O&&c;u&&Me(!1);var d=t||{},f=e.nodeName===Wi;for(var p in t)p in n||(n[p]=null);n.class?n.class=Ti(n.class):(r||n[Ri])&&(n.class=null),n[zi]&&(n.style??=null);var m=ea(e);for(let i in n){let o=n[i];if(f&&i===`value`&&o==null){e.value=e.__value=``,d[i]=o;continue}if(i===`class`){ji(e,e.namespaceURI===`http://www.w3.org/1999/xhtml`,o,r,t?.[Ri],n[Ri]),d[i]=o,d[Ri]=n[Ri];continue}if(i===`style`){Ni(e,o,t?.[zi],n[zi]),d[i]=o,d[zi]=n[zi];continue}var h=d[i];if(!(o===h&&!(o===void 0&&e.hasAttribute(i)))){d[i]=o;var g=i[0]+i[1];if(g!==`$$`)if(g===`on`){let t={},n=`$$`+i,r=i.slice(2);var _=Nr(r);if(jr(r)&&(r=r.slice(0,-7),t.capture=!0),!_&&h){if(o!=null)continue;e.removeEventListener(r,d[n],t),d[n]=null}if(_)W(r,e,o),Kr([r]);else if(o!=null){function a(e){d[i].call(this,e)}d[n]=Ur(r,e,a,t)}}else if(i===`style`)Y(e,i,o);else if(i===`autofocus`)Sn(e,!!o);else if(!c&&(i===`__value`||i===`value`&&o!=null))e.value=e.__value=o;else if(i===`selected`&&f)Yi(e,o);else{var v=i;l||(v=Ir(v));var y=v===`defaultValue`||v===`defaultChecked`;if(o==null&&!c&&!y)if(s[i]=null,v===`value`||v===`checked`){let n=e,r=t===void 0;if(v===`value`){let e=n.defaultValue;n.removeAttribute(v),n.defaultValue=e,n.value=n.__value=r?e:null}else{let e=n.defaultChecked;n.removeAttribute(v),n.defaultChecked=e,n.checked=r?e:!1}}else e.removeAttribute(i);else y||m.includes(v)&&(c||typeof o!=`string`)?(e[v]=o,v in s&&(s[v]=Ee)):typeof o!=`function`&&Y(e,v,o,a)}}}return u&&Me(!0),d}function Zi(e,t,n=[],r=[],i=[],a,o=!1,s=!1){zt(i,n,r,n=>{var r=void 0,i={},c=e.nodeName===Gi,l=!1;if(Hn(()=>{var u=t(...n.map(U)),d=Xi(e,r,u,a,o,s);l&&c&&`value`in u&&Pi(e,u.value);for(let e of Object.getOwnPropertySymbols(i))u[e]||qn(i[e]);for(let t of Object.getOwnPropertySymbols(u)){var f=u[t];t.description===`@attach`&&(!r||f!==r[t])&&(i[t]&&qn(i[t]),i[t]=Un(()=>Si(e,()=>f))),d[t]=f}r=d}),c){var u=e;Rn(()=>{Pi(u,r.value,!0),Fi(u)})}l=!0})}function Qi(e){return e.__attributes??={[Bi]:e.nodeName.includes(`-`),[Vi]:e.namespaceURI===De}}var $i=new Map;function ea(e){var t=e.getAttribute(`is`)||e.nodeName,n=$i.get(t);if(n)return n;$i.set(t,n=[]);for(var r,i=e,a=Element.prototype;a!==i;){for(var s in r=o(i),r)r[s].set&&n.push(s);i=l(i)}return n}function ta(e,t,n=t){var r=new WeakSet;Dn(e,`input`,async i=>{var a=i?e.defaultValue:e.value;if(a=ra(e)?ia(a):a,n(a),N!==null&&r.add(N),await Tr(),a!==(a=t())){var o=e.selectionStart,s=e.selectionEnd,c=e.value.length;if(e.value=a??``,s!==null){var l=e.value.length;o===s&&s===c&&l>c?(e.selectionStart=l,e.selectionEnd=l):(e.selectionStart=o,e.selectionEnd=Math.min(s,l))}}}),(O&&e.defaultValue!==e.value||Or(t)==null&&e.value)&&(n(ra(e)?ia(e.value):e.value),N!==null&&r.add(N)),Bn(()=>{var n=t();if(e===document.activeElement){var i=Ve?gt:N;if(r.has(i))return}ra(e)&&n===ia(e.value)||e.type===`date`&&!n&&!e.value||n!==e.value&&(e.value=n??``)})}function na(e,t,n=t){Dn(e,`change`,t=>{n(t?e.defaultChecked:e.checked)}),(O&&e.defaultChecked!==e.checked||Or(t)==null)&&n(e.checked),Bn(()=>{e.checked=!!t()})}function ra(e){var t=e.type;return t===`number`||t===`range`}function ia(e){return e===``?null:+e}var aa=new class e{#e=new WeakMap;#t;#n;static entries=new WeakMap;constructor(e){this.#n=e}observe(e,t){var n=this.#e.get(e)||new Set;return n.add(t),this.#e.set(e,n),this.#r().observe(e,this.#n),()=>{var n=this.#e.get(e);n.delete(t),n.size===0&&(this.#e.delete(e),this.#t.unobserve(e))}}#r(){return this.#t??=new ResizeObserver(t=>{for(var n of t){e.entries.set(n.target,n);for(var r of this.#e.get(n.target)||[])r(n)}})}}({box:`border-box`});function oa(e,t,n){var r=aa.observe(e,()=>n(e[t]));Rn(()=>(Or(()=>n(e[t])),r))}function sa(e,t){return e===t||e?.[se]===t}function ca(e={},t,n,r){var i=qe.r,a=H;return Rn(()=>{var o,s;return Bn(()=>{o=s,s=r?.()||[],Or(()=>{e!==n(...s)&&(t(e,...s),o&&sa(n(...o),e)&&t(null,...o))})}),()=>{let r=a;for(;r!==i&&r.parent!==null&&r.parent.f&33554432;)r=r.parent;let o=()=>{s&&sa(n(...s),e)&&t(null,...s)},c=r.teardown;r.teardown=()=>{o(),c?.()}}}),e}function la(e=!1){let t=qe,n=t.l.u;if(!n)return;let r=()=>kr(t.s);if(e){let e=0,n={},i=Ut(()=>{let r=!1,i=t.s;for(let e in i)i[e]!==n[e]&&(n[e]=i[e],r=!0);return r&&e++,e});r=()=>U(i)}n.b.length&&Fn(()=>{ua(t,r),m(n.b)}),Nn(()=>{let e=Or(()=>n.m.map(p));return()=>{for(let t of e)typeof t==`function`&&t()}}),n.a.length&&Nn(()=>{ua(t,r),m(n.a)})}function ua(e,t){if(e.l.s)for(let t of e.l.s)U(t);t()}function da(e){var t=en(0);return function(){return arguments.length===1?(I(t,U(t)+1),arguments[0]):(U(t),e())}}var fa={get(e,t){if(!e.exclude.includes(t))return e.props[t]},set(e,t){return!1},getOwnPropertyDescriptor(e,t){if(!e.exclude.includes(t)&&t in e.props)return{enumerable:!0,configurable:!0,value:e.props[t]}},has(e,t){return e.exclude.includes(t)?!1:t in e.props},ownKeys(e){return Reflect.ownKeys(e.props).filter(t=>!e.exclude.includes(t))}};function pa(e,t,n){return new Proxy({props:e,exclude:t},fa)}var ma={get(e,t){let n=e.props.length;for(;n--;){let r=e.props[n];if(d(r)&&(r=r()),typeof r==`object`&&r&&t in r)return r[t]}},set(e,t,n){let r=e.props.length;for(;r--;){let i=e.props[r];d(i)&&(i=i());let o=a(i,t);if(o&&o.set)return o.set(n),!0}return!1},getOwnPropertyDescriptor(e,t){let n=e.props.length;for(;n--;){let r=e.props[n];if(d(r)&&(r=r()),typeof r==`object`&&r&&t in r){let e=a(r,t);return e&&!e.configurable&&(e.configurable=!0),e}}},has(e,t){if(t===se||t===ce)return!1;for(let n of e.props)if(d(n)&&(n=n()),n!=null&&t in n)return!0;return!1},ownKeys(e){let t=[];for(let n of e.props)if(d(n)&&(n=n()),n){for(let e in n)t.includes(e)||t.push(e);for(let e of Object.getOwnPropertySymbols(n))t.includes(e)||t.push(e)}return t}};function ha(...e){return new Proxy({props:e},ma)}function X(e,t,n,r){var i=!He||(n&2)!=0,o=(n&8)!=0,s=(n&16)!=0,c=r,l=!0,u=()=>(l&&(l=!1,c=s?Or(r):r),c);let d;if(o){var f=se in e||ce in e;d=a(e,t)?.set??(f&&t in e?n=>e[t]=n:void 0)}var p,m=!1;o?[p,m]=mt(()=>e[t]):p=e[t],p===void 0&&r!==void 0&&(p=u(),d&&(i&&ye(t),d(p)));var h=i?()=>{var n=e[t];return n===void 0?u():(l=!0,n)}:()=>{var n=e[t];return n!==void 0&&(c=void 0),n===void 0?c:n};if(i&&!(n&4))return h;if(d){var g=e.$$legacy;return(function(e,t){return arguments.length>0?((!i||!t||g||m)&&d(t?h():e),e):h()})}var _=!1,v=(n&1?Ut:Gt)(()=>(_=!1,h()));o&&U(v);var y=H;return(function(e,t){if(arguments.length>0){let n=t?U(v):i&&o?sn(e):e;return I(v,n),_=!0,c!==void 0&&(c=n),e}return rr&&_||y.f&16384?v.v:U(v)})}function ga(e){qe===null&&fe(`onMount`),He&&qe.l!==null?va(qe).m.push(e):Nn(()=>{let t=Or(e);if(typeof t==`function`)return t})}function _a(e){qe===null&&fe(`onDestroy`),ga(()=>()=>Or(e))}function va(e){var t=e.l;return t.u??={a:[],b:[],m:[]}}typeof window<`u`&&((window.__svelte??={}).v??=new Set).add(`5`),Ue();var ya={value:()=>{}};function ba(){for(var e=0,t=arguments.length,n={},r;e<t;++e){if(!(r=arguments[e]+``)||r in n||/[\s.]/.test(r))throw Error(`illegal type: `+r);n[r]=[]}return new xa(n)}function xa(e){this._=e}function Sa(e,t){return e.trim().split(/^|\s+/).map(function(e){var n=``,r=e.indexOf(`.`);if(r>=0&&(n=e.slice(r+1),e=e.slice(0,r)),e&&!t.hasOwnProperty(e))throw Error(`unknown type: `+e);return{type:e,name:n}})}xa.prototype=ba.prototype={constructor:xa,on:function(e,t){var n=this._,r=Sa(e+``,n),i,a=-1,o=r.length;if(arguments.length<2){for(;++a<o;)if((i=(e=r[a]).type)&&(i=Ca(n[i],e.name)))return i;return}if(t!=null&&typeof t!=`function`)throw Error(`invalid callback: `+t);for(;++a<o;)if(i=(e=r[a]).type)n[i]=wa(n[i],e.name,t);else if(t==null)for(i in n)n[i]=wa(n[i],e.name,null);return this},copy:function(){var e={},t=this._;for(var n in t)e[n]=t[n].slice();return new xa(e)},call:function(e,t){if((i=arguments.length-2)>0)for(var n=Array(i),r=0,i,a;r<i;++r)n[r]=arguments[r+2];if(!this._.hasOwnProperty(e))throw Error(`unknown type: `+e);for(a=this._[e],r=0,i=a.length;r<i;++r)a[r].value.apply(t,n)},apply:function(e,t,n){if(!this._.hasOwnProperty(e))throw Error(`unknown type: `+e);for(var r=this._[e],i=0,a=r.length;i<a;++i)r[i].value.apply(t,n)}};function Ca(e,t){for(var n=0,r=e.length,i;n<r;++n)if((i=e[n]).name===t)return i.value}function wa(e,t,n){for(var r=0,i=e.length;r<i;++r)if(e[r].name===t){e[r]=ya,e=e.slice(0,r).concat(e.slice(r+1));break}return n!=null&&e.push({name:t,value:n}),e}var Ta={svg:`http://www.w3.org/2000/svg`,xhtml:`http://www.w3.org/1999/xhtml`,xlink:`http://www.w3.org/1999/xlink`,xml:`http://www.w3.org/XML/1998/namespace`,xmlns:`http://www.w3.org/2000/xmlns/`};function Ea(e){var t=e+=``,n=t.indexOf(`:`);return n>=0&&(t=e.slice(0,n))!==`xmlns`&&(e=e.slice(n+1)),Ta.hasOwnProperty(t)?{space:Ta[t],local:e}:e}function Da(e){return function(){var t=this.ownerDocument,n=this.namespaceURI;return n===`http://www.w3.org/1999/xhtml`&&t.documentElement.namespaceURI===`http://www.w3.org/1999/xhtml`?t.createElement(e):t.createElementNS(n,e)}}function Oa(e){return function(){return this.ownerDocument.createElementNS(e.space,e.local)}}function ka(e){var t=Ea(e);return(t.local?Oa:Da)(t)}function Aa(){}function ja(e){return e==null?Aa:function(){return this.querySelector(e)}}function Ma(e){typeof e!=`function`&&(e=ja(e));for(var t=this._groups,n=t.length,r=Array(n),i=0;i<n;++i)for(var a=t[i],o=a.length,s=r[i]=Array(o),c,l,u=0;u<o;++u)(c=a[u])&&(l=e.call(c,c.__data__,u,a))&&(`__data__`in c&&(l.__data__=c.__data__),s[u]=l);return new xs(r,this._parents)}function Na(e){return e==null?[]:Array.isArray(e)?e:Array.from(e)}function Pa(){return[]}function Fa(e){return e==null?Pa:function(){return this.querySelectorAll(e)}}function Ia(e){return function(){return Na(e.apply(this,arguments))}}function La(e){e=typeof e==`function`?Ia(e):Fa(e);for(var t=this._groups,n=t.length,r=[],i=[],a=0;a<n;++a)for(var o=t[a],s=o.length,c,l=0;l<s;++l)(c=o[l])&&(r.push(e.call(c,c.__data__,l,o)),i.push(c));return new xs(r,i)}function Ra(e){return function(){return this.matches(e)}}function za(e){return function(t){return t.matches(e)}}var Ba=Array.prototype.find;function Va(e){return function(){return Ba.call(this.children,e)}}function Ha(){return this.firstElementChild}function Ua(e){return this.select(e==null?Ha:Va(typeof e==`function`?e:za(e)))}var Wa=Array.prototype.filter;function Ga(){return Array.from(this.children)}function Ka(e){return function(){return Wa.call(this.children,e)}}function qa(e){return this.selectAll(e==null?Ga:Ka(typeof e==`function`?e:za(e)))}function Ja(e){typeof e!=`function`&&(e=Ra(e));for(var t=this._groups,n=t.length,r=Array(n),i=0;i<n;++i)for(var a=t[i],o=a.length,s=r[i]=[],c,l=0;l<o;++l)(c=a[l])&&e.call(c,c.__data__,l,a)&&s.push(c);return new xs(r,this._parents)}function Ya(e){return Array(e.length)}function Xa(){return new xs(this._enter||this._groups.map(Ya),this._parents)}function Za(e,t){this.ownerDocument=e.ownerDocument,this.namespaceURI=e.namespaceURI,this._next=null,this._parent=e,this.__data__=t}Za.prototype={constructor:Za,appendChild:function(e){return this._parent.insertBefore(e,this._next)},insertBefore:function(e,t){return this._parent.insertBefore(e,t)},querySelector:function(e){return this._parent.querySelector(e)},querySelectorAll:function(e){return this._parent.querySelectorAll(e)}};function Qa(e){return function(){return e}}function $a(e,t,n,r,i,a){for(var o=0,s,c=t.length,l=a.length;o<l;++o)(s=t[o])?(s.__data__=a[o],r[o]=s):n[o]=new Za(e,a[o]);for(;o<c;++o)(s=t[o])&&(i[o]=s)}function eo(e,t,n,r,i,a,o){var s,c,l=new Map,u=t.length,d=a.length,f=Array(u),p;for(s=0;s<u;++s)(c=t[s])&&(f[s]=p=o.call(c,c.__data__,s,t)+``,l.has(p)?i[s]=c:l.set(p,c));for(s=0;s<d;++s)p=o.call(e,a[s],s,a)+``,(c=l.get(p))?(r[s]=c,c.__data__=a[s],l.delete(p)):n[s]=new Za(e,a[s]);for(s=0;s<u;++s)(c=t[s])&&l.get(f[s])===c&&(i[s]=c)}function to(e){return e.__data__}function no(e,t){if(!arguments.length)return Array.from(this,to);var n=t?eo:$a,r=this._parents,i=this._groups;typeof e!=`function`&&(e=Qa(e));for(var a=i.length,o=Array(a),s=Array(a),c=Array(a),l=0;l<a;++l){var u=r[l],d=i[l],f=d.length,p=ro(e.call(u,u&&u.__data__,l,r)),m=p.length,h=s[l]=Array(m),g=o[l]=Array(m);n(u,d,h,g,c[l]=Array(f),p,t);for(var _=0,v=0,y,b;_<m;++_)if(y=h[_]){for(_>=v&&(v=_+1);!(b=g[v])&&++v<m;);y._next=b||null}}return o=new xs(o,r),o._enter=s,o._exit=c,o}function ro(e){return typeof e==`object`&&`length`in e?e:Array.from(e)}function io(){return new xs(this._exit||this._groups.map(Ya),this._parents)}function ao(e,t,n){var r=this.enter(),i=this,a=this.exit();return typeof e==`function`?(r=e(r),r&&=r.selection()):r=r.append(e+``),t!=null&&(i=t(i),i&&=i.selection()),n==null?a.remove():n(a),r&&i?r.merge(i).order():i}function oo(e){for(var t=e.selection?e.selection():e,n=this._groups,r=t._groups,i=n.length,a=r.length,o=Math.min(i,a),s=Array(i),c=0;c<o;++c)for(var l=n[c],u=r[c],d=l.length,f=s[c]=Array(d),p,m=0;m<d;++m)(p=l[m]||u[m])&&(f[m]=p);for(;c<i;++c)s[c]=n[c];return new xs(s,this._parents)}function so(){for(var e=this._groups,t=-1,n=e.length;++t<n;)for(var r=e[t],i=r.length-1,a=r[i],o;--i>=0;)(o=r[i])&&(a&&o.compareDocumentPosition(a)^4&&a.parentNode.insertBefore(o,a),a=o);return this}function co(e){e||=lo;function t(t,n){return t&&n?e(t.__data__,n.__data__):!t-!n}for(var n=this._groups,r=n.length,i=Array(r),a=0;a<r;++a){for(var o=n[a],s=o.length,c=i[a]=Array(s),l,u=0;u<s;++u)(l=o[u])&&(c[u]=l);c.sort(t)}return new xs(i,this._parents).order()}function lo(e,t){return e<t?-1:e>t?1:e>=t?0:NaN}function uo(){var e=arguments[0];return arguments[0]=this,e.apply(null,arguments),this}function fo(){return Array.from(this)}function po(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var r=e[t],i=0,a=r.length;i<a;++i){var o=r[i];if(o)return o}return null}function mo(){let e=0;for(let t of this)++e;return e}function ho(){return!this.node()}function go(e){for(var t=this._groups,n=0,r=t.length;n<r;++n)for(var i=t[n],a=0,o=i.length,s;a<o;++a)(s=i[a])&&e.call(s,s.__data__,a,i);return this}function _o(e){return function(){this.removeAttribute(e)}}function vo(e){return function(){this.removeAttributeNS(e.space,e.local)}}function yo(e,t){return function(){this.setAttribute(e,t)}}function bo(e,t){return function(){this.setAttributeNS(e.space,e.local,t)}}function xo(e,t){return function(){var n=t.apply(this,arguments);n==null?this.removeAttribute(e):this.setAttribute(e,n)}}function So(e,t){return function(){var n=t.apply(this,arguments);n==null?this.removeAttributeNS(e.space,e.local):this.setAttributeNS(e.space,e.local,n)}}function Co(e,t){var n=Ea(e);if(arguments.length<2){var r=this.node();return n.local?r.getAttributeNS(n.space,n.local):r.getAttribute(n)}return this.each((t==null?n.local?vo:_o:typeof t==`function`?n.local?So:xo:n.local?bo:yo)(n,t))}function wo(e){return e.ownerDocument&&e.ownerDocument.defaultView||e.document&&e||e.defaultView}function To(e){return function(){this.style.removeProperty(e)}}function Eo(e,t,n){return function(){this.style.setProperty(e,t,n)}}function Do(e,t,n){return function(){var r=t.apply(this,arguments);r==null?this.style.removeProperty(e):this.style.setProperty(e,r,n)}}function Oo(e,t,n){return arguments.length>1?this.each((t==null?To:typeof t==`function`?Do:Eo)(e,t,n??``)):ko(this.node(),e)}function ko(e,t){return e.style.getPropertyValue(t)||wo(e).getComputedStyle(e,null).getPropertyValue(t)}function Ao(e){return function(){delete this[e]}}function jo(e,t){return function(){this[e]=t}}function Mo(e,t){return function(){var n=t.apply(this,arguments);n==null?delete this[e]:this[e]=n}}function No(e,t){return arguments.length>1?this.each((t==null?Ao:typeof t==`function`?Mo:jo)(e,t)):this.node()[e]}function Po(e){return e.trim().split(/^|\s+/)}function Fo(e){return e.classList||new Io(e)}function Io(e){this._node=e,this._names=Po(e.getAttribute(`class`)||``)}Io.prototype={add:function(e){this._names.indexOf(e)<0&&(this._names.push(e),this._node.setAttribute(`class`,this._names.join(` `)))},remove:function(e){var t=this._names.indexOf(e);t>=0&&(this._names.splice(t,1),this._node.setAttribute(`class`,this._names.join(` `)))},contains:function(e){return this._names.indexOf(e)>=0}};function Lo(e,t){for(var n=Fo(e),r=-1,i=t.length;++r<i;)n.add(t[r])}function Ro(e,t){for(var n=Fo(e),r=-1,i=t.length;++r<i;)n.remove(t[r])}function zo(e){return function(){Lo(this,e)}}function Bo(e){return function(){Ro(this,e)}}function Vo(e,t){return function(){(t.apply(this,arguments)?Lo:Ro)(this,e)}}function Ho(e,t){var n=Po(e+``);if(arguments.length<2){for(var r=Fo(this.node()),i=-1,a=n.length;++i<a;)if(!r.contains(n[i]))return!1;return!0}return this.each((typeof t==`function`?Vo:t?zo:Bo)(n,t))}function Uo(){this.textContent=``}function Wo(e){return function(){this.textContent=e}}function Go(e){return function(){var t=e.apply(this,arguments);this.textContent=t??``}}function Ko(e){return arguments.length?this.each(e==null?Uo:(typeof e==`function`?Go:Wo)(e)):this.node().textContent}function qo(){this.innerHTML=``}function Jo(e){return function(){this.innerHTML=e}}function Yo(e){return function(){var t=e.apply(this,arguments);this.innerHTML=t??``}}function Xo(e){return arguments.length?this.each(e==null?qo:(typeof e==`function`?Yo:Jo)(e)):this.node().innerHTML}function Zo(){this.nextSibling&&this.parentNode.appendChild(this)}function Qo(){return this.each(Zo)}function $o(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function es(){return this.each($o)}function ts(e){var t=typeof e==`function`?e:ka(e);return this.select(function(){return this.appendChild(t.apply(this,arguments))})}function ns(){return null}function rs(e,t){var n=typeof e==`function`?e:ka(e),r=t==null?ns:typeof t==`function`?t:ja(t);return this.select(function(){return this.insertBefore(n.apply(this,arguments),r.apply(this,arguments)||null)})}function is(){var e=this.parentNode;e&&e.removeChild(this)}function as(){return this.each(is)}function os(){var e=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function ss(){var e=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function cs(e){return this.select(e?ss:os)}function ls(e){return arguments.length?this.property(`__data__`,e):this.node().__data__}function us(e){return function(t){e.call(this,t,this.__data__)}}function ds(e){return e.trim().split(/^|\s+/).map(function(e){var t=``,n=e.indexOf(`.`);return n>=0&&(t=e.slice(n+1),e=e.slice(0,n)),{type:e,name:t}})}function fs(e){return function(){var t=this.__on;if(t){for(var n=0,r=-1,i=t.length,a;n<i;++n)a=t[n],(!e.type||a.type===e.type)&&a.name===e.name?this.removeEventListener(a.type,a.listener,a.options):t[++r]=a;++r?t.length=r:delete this.__on}}}function ps(e,t,n){return function(){var r=this.__on,i,a=us(t);if(r){for(var o=0,s=r.length;o<s;++o)if((i=r[o]).type===e.type&&i.name===e.name){this.removeEventListener(i.type,i.listener,i.options),this.addEventListener(i.type,i.listener=a,i.options=n),i.value=t;return}}this.addEventListener(e.type,a,n),i={type:e.type,name:e.name,value:t,listener:a,options:n},r?r.push(i):this.__on=[i]}}function ms(e,t,n){var r=ds(e+``),i,a=r.length,o;if(arguments.length<2){var s=this.node().__on;if(s){for(var c=0,l=s.length,u;c<l;++c)for(i=0,u=s[c];i<a;++i)if((o=r[i]).type===u.type&&o.name===u.name)return u.value}return}for(s=t?ps:fs,i=0;i<a;++i)this.each(s(r[i],t,n));return this}function hs(e,t,n){var r=wo(e),i=r.CustomEvent;typeof i==`function`?i=new i(t,n):(i=r.document.createEvent(`Event`),n?(i.initEvent(t,n.bubbles,n.cancelable),i.detail=n.detail):i.initEvent(t,!1,!1)),e.dispatchEvent(i)}function gs(e,t){return function(){return hs(this,e,t)}}function _s(e,t){return function(){return hs(this,e,t.apply(this,arguments))}}function vs(e,t){return this.each((typeof t==`function`?_s:gs)(e,t))}function*ys(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var r=e[t],i=0,a=r.length,o;i<a;++i)(o=r[i])&&(yield o)}var bs=[null];function xs(e,t){this._groups=e,this._parents=t}function Ss(){return new xs([[document.documentElement]],bs)}function Cs(){return this}xs.prototype=Ss.prototype={constructor:xs,select:Ma,selectAll:La,selectChild:Ua,selectChildren:qa,filter:Ja,data:no,enter:Xa,exit:io,join:ao,merge:oo,selection:Cs,order:so,sort:co,call:uo,nodes:fo,node:po,size:mo,empty:ho,each:go,attr:Co,style:Oo,property:No,classed:Ho,text:Ko,html:Xo,raise:Qo,lower:es,append:ts,insert:rs,remove:as,clone:cs,datum:ls,on:ms,dispatch:vs,[Symbol.iterator]:ys};function ws(e){return typeof e==`string`?new xs([[document.querySelector(e)]],[document.documentElement]):new xs([[e]],bs)}function Ts(e){let t;for(;t=e.sourceEvent;)e=t;return e}function Es(e,t){if(e=Ts(e),t===void 0&&(t=e.currentTarget),t){var n=t.ownerSVGElement||t;if(n.createSVGPoint){var r=n.createSVGPoint();return r.x=e.clientX,r.y=e.clientY,r=r.matrixTransform(t.getScreenCTM().inverse()),[r.x,r.y]}if(t.getBoundingClientRect){var i=t.getBoundingClientRect();return[e.clientX-i.left-t.clientLeft,e.clientY-i.top-t.clientTop]}}return[e.pageX,e.pageY]}var Ds={passive:!1},Os={capture:!0,passive:!1};function ks(e){e.stopImmediatePropagation()}function As(e){e.preventDefault(),e.stopImmediatePropagation()}function js(e){var t=e.document.documentElement,n=ws(e).on(`dragstart.drag`,As,Os);`onselectstart`in t?n.on(`selectstart.drag`,As,Os):(t.__noselect=t.style.MozUserSelect,t.style.MozUserSelect=`none`)}function Ms(e,t){var n=e.document.documentElement,r=ws(e).on(`dragstart.drag`,null);t&&(r.on(`click.drag`,As,Os),setTimeout(function(){r.on(`click.drag`,null)},0)),`onselectstart`in n?r.on(`selectstart.drag`,null):(n.style.MozUserSelect=n.__noselect,delete n.__noselect)}var Ns=e=>()=>e;function Ps(e,{sourceEvent:t,subject:n,target:r,identifier:i,active:a,x:o,y:s,dx:c,dy:l,dispatch:u}){Object.defineProperties(this,{type:{value:e,enumerable:!0,configurable:!0},sourceEvent:{value:t,enumerable:!0,configurable:!0},subject:{value:n,enumerable:!0,configurable:!0},target:{value:r,enumerable:!0,configurable:!0},identifier:{value:i,enumerable:!0,configurable:!0},active:{value:a,enumerable:!0,configurable:!0},x:{value:o,enumerable:!0,configurable:!0},y:{value:s,enumerable:!0,configurable:!0},dx:{value:c,enumerable:!0,configurable:!0},dy:{value:l,enumerable:!0,configurable:!0},_:{value:u}})}Ps.prototype.on=function(){var e=this._.on.apply(this._,arguments);return e===this._?this:e};function Fs(e){return!e.ctrlKey&&!e.button}function Is(){return this.parentNode}function Ls(e,t){return t??{x:e.x,y:e.y}}function Rs(){return navigator.maxTouchPoints||`ontouchstart`in this}function zs(){var e=Fs,t=Is,n=Ls,r=Rs,i={},a=ba(`start`,`drag`,`end`),o=0,s,c,l,u,d=0;function f(e){e.on(`mousedown.drag`,p).filter(r).on(`touchstart.drag`,g).on(`touchmove.drag`,_,Ds).on(`touchend.drag touchcancel.drag`,v).style(`touch-action`,`none`).style(`-webkit-tap-highlight-color`,`rgba(0,0,0,0)`)}function p(n,r){if(!(u||!e.call(this,n,r))){var i=y(this,t.call(this,n,r),n,r,`mouse`);i&&(ws(n.view).on(`mousemove.drag`,m,Os).on(`mouseup.drag`,h,Os),js(n.view),ks(n),l=!1,s=n.clientX,c=n.clientY,i(`start`,n))}}function m(e){if(As(e),!l){var t=e.clientX-s,n=e.clientY-c;l=t*t+n*n>d}i.mouse(`drag`,e)}function h(e){ws(e.view).on(`mousemove.drag mouseup.drag`,null),Ms(e.view,l),As(e),i.mouse(`end`,e)}function g(n,r){if(e.call(this,n,r)){var i=n.changedTouches,a=t.call(this,n,r),o=i.length,s,c;for(s=0;s<o;++s)(c=y(this,a,n,r,i[s].identifier,i[s]))&&(ks(n),c(`start`,n,i[s]))}}function _(e){var t=e.changedTouches,n=t.length,r,a;for(r=0;r<n;++r)(a=i[t[r].identifier])&&(As(e),a(`drag`,e,t[r]))}function v(e){var t=e.changedTouches,n=t.length,r,a;for(u&&clearTimeout(u),u=setTimeout(function(){u=null},500),r=0;r<n;++r)(a=i[t[r].identifier])&&(ks(e),a(`end`,e,t[r]))}function y(e,t,r,s,c,l){var u=a.copy(),d=Es(l||r,t),p,m,h;if((h=n.call(e,new Ps(`beforestart`,{sourceEvent:r,target:f,identifier:c,active:o,x:d[0],y:d[1],dx:0,dy:0,dispatch:u}),s))!=null)return p=h.x-d[0]||0,m=h.y-d[1]||0,function n(r,a,l){var g=d,_;switch(r){case`start`:i[c]=n,_=o++;break;case`end`:delete i[c],--o;case`drag`:d=Es(l||a,t),_=o;break}u.call(r,e,new Ps(r,{sourceEvent:a,subject:h,target:f,identifier:c,active:_,x:d[0]+p,y:d[1]+m,dx:d[0]-g[0],dy:d[1]-g[1],dispatch:u}),s)}}return f.filter=function(t){return arguments.length?(e=typeof t==`function`?t:Ns(!!t),f):e},f.container=function(e){return arguments.length?(t=typeof e==`function`?e:Ns(e),f):t},f.subject=function(e){return arguments.length?(n=typeof e==`function`?e:Ns(e),f):n},f.touchable=function(e){return arguments.length?(r=typeof e==`function`?e:Ns(!!e),f):r},f.on=function(){var e=a.on.apply(a,arguments);return e===a?f:e},f.clickDistance=function(e){return arguments.length?(d=(e=+e)*e,f):Math.sqrt(d)},f}function Bs(e,t,n){e.prototype=t.prototype=n,n.constructor=e}function Vs(e,t){var n=Object.create(e.prototype);for(var r in t)n[r]=t[r];return n}function Hs(){}var Us=.7,Ws=1/Us,Gs=`\\s*([+-]?\\d+)\\s*`,Ks=`\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*`,qs=`\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*`,Js=/^#([0-9a-f]{3,8})$/,Ys=RegExp(`^rgb\\(${Gs},${Gs},${Gs}\\)$`),Xs=RegExp(`^rgb\\(${qs},${qs},${qs}\\)$`),Zs=RegExp(`^rgba\\(${Gs},${Gs},${Gs},${Ks}\\)$`),Qs=RegExp(`^rgba\\(${qs},${qs},${qs},${Ks}\\)$`),$s=RegExp(`^hsl\\(${Ks},${qs},${qs}\\)$`),ec=RegExp(`^hsla\\(${Ks},${qs},${qs},${Ks}\\)$`),tc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};Bs(Hs,oc,{copy(e){return Object.assign(new this.constructor,this,e)},displayable(){return this.rgb().displayable()},hex:nc,formatHex:nc,formatHex8:rc,formatHsl:ic,formatRgb:ac,toString:ac});function nc(){return this.rgb().formatHex()}function rc(){return this.rgb().formatHex8()}function ic(){return yc(this).formatHsl()}function ac(){return this.rgb().formatRgb()}function oc(e){var t,n;return e=(e+``).trim().toLowerCase(),(t=Js.exec(e))?(n=t[1].length,t=parseInt(t[1],16),n===6?sc(t):n===3?new dc(t>>8&15|t>>4&240,t>>4&15|t&240,(t&15)<<4|t&15,1):n===8?cc(t>>24&255,t>>16&255,t>>8&255,(t&255)/255):n===4?cc(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|t&240,((t&15)<<4|t&15)/255):null):(t=Ys.exec(e))?new dc(t[1],t[2],t[3],1):(t=Xs.exec(e))?new dc(t[1]*255/100,t[2]*255/100,t[3]*255/100,1):(t=Zs.exec(e))?cc(t[1],t[2],t[3],t[4]):(t=Qs.exec(e))?cc(t[1]*255/100,t[2]*255/100,t[3]*255/100,t[4]):(t=$s.exec(e))?vc(t[1],t[2]/100,t[3]/100,1):(t=ec.exec(e))?vc(t[1],t[2]/100,t[3]/100,t[4]):tc.hasOwnProperty(e)?sc(tc[e]):e===`transparent`?new dc(NaN,NaN,NaN,0):null}function sc(e){return new dc(e>>16&255,e>>8&255,e&255,1)}function cc(e,t,n,r){return r<=0&&(e=t=n=NaN),new dc(e,t,n,r)}function lc(e){return e instanceof Hs||(e=oc(e)),e?(e=e.rgb(),new dc(e.r,e.g,e.b,e.opacity)):new dc}function uc(e,t,n,r){return arguments.length===1?lc(e):new dc(e,t,n,r??1)}function dc(e,t,n,r){this.r=+e,this.g=+t,this.b=+n,this.opacity=+r}Bs(dc,uc,Vs(Hs,{brighter(e){return e=e==null?Ws:Ws**+e,new dc(this.r*e,this.g*e,this.b*e,this.opacity)},darker(e){return e=e==null?Us:Us**+e,new dc(this.r*e,this.g*e,this.b*e,this.opacity)},rgb(){return this},clamp(){return new dc(gc(this.r),gc(this.g),gc(this.b),hc(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:fc,formatHex:fc,formatHex8:pc,formatRgb:mc,toString:mc}));function fc(){return`#${_c(this.r)}${_c(this.g)}${_c(this.b)}`}function pc(){return`#${_c(this.r)}${_c(this.g)}${_c(this.b)}${_c((isNaN(this.opacity)?1:this.opacity)*255)}`}function mc(){let e=hc(this.opacity);return`${e===1?`rgb(`:`rgba(`}${gc(this.r)}, ${gc(this.g)}, ${gc(this.b)}${e===1?`)`:`, ${e})`}`}function hc(e){return isNaN(e)?1:Math.max(0,Math.min(1,e))}function gc(e){return Math.max(0,Math.min(255,Math.round(e)||0))}function _c(e){return e=gc(e),(e<16?`0`:``)+e.toString(16)}function vc(e,t,n,r){return r<=0?e=t=n=NaN:n<=0||n>=1?e=t=NaN:t<=0&&(e=NaN),new xc(e,t,n,r)}function yc(e){if(e instanceof xc)return new xc(e.h,e.s,e.l,e.opacity);if(e instanceof Hs||(e=oc(e)),!e)return new xc;if(e instanceof xc)return e;e=e.rgb();var t=e.r/255,n=e.g/255,r=e.b/255,i=Math.min(t,n,r),a=Math.max(t,n,r),o=NaN,s=a-i,c=(a+i)/2;return s?(o=t===a?(n-r)/s+(n<r)*6:n===a?(r-t)/s+2:(t-n)/s+4,s/=c<.5?a+i:2-a-i,o*=60):s=c>0&&c<1?0:o,new xc(o,s,c,e.opacity)}function bc(e,t,n,r){return arguments.length===1?yc(e):new xc(e,t,n,r??1)}function xc(e,t,n,r){this.h=+e,this.s=+t,this.l=+n,this.opacity=+r}Bs(xc,bc,Vs(Hs,{brighter(e){return e=e==null?Ws:Ws**+e,new xc(this.h,this.s,this.l*e,this.opacity)},darker(e){return e=e==null?Us:Us**+e,new xc(this.h,this.s,this.l*e,this.opacity)},rgb(){var e=this.h%360+(this.h<0)*360,t=isNaN(e)||isNaN(this.s)?0:this.s,n=this.l,r=n+(n<.5?n:1-n)*t,i=2*n-r;return new dc(wc(e>=240?e-240:e+120,i,r),wc(e,i,r),wc(e<120?e+240:e-120,i,r),this.opacity)},clamp(){return new xc(Sc(this.h),Cc(this.s),Cc(this.l),hc(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){let e=hc(this.opacity);return`${e===1?`hsl(`:`hsla(`}${Sc(this.h)}, ${Cc(this.s)*100}%, ${Cc(this.l)*100}%${e===1?`)`:`, ${e})`}`}}));function Sc(e){return e=(e||0)%360,e<0?e+360:e}function Cc(e){return Math.max(0,Math.min(1,e||0))}function wc(e,t,n){return(e<60?t+(n-t)*e/60:e<180?n:e<240?t+(n-t)*(240-e)/60:t)*255}var Tc=e=>()=>e;function Ec(e,t){return function(n){return e+n*t}}function Dc(e,t,n){return e**=+n,t=t**+n-e,n=1/n,function(r){return(e+r*t)**+n}}function Oc(e){return(e=+e)==1?kc:function(t,n){return n-t?Dc(t,n,e):Tc(isNaN(t)?n:t)}}function kc(e,t){var n=t-e;return n?Ec(e,n):Tc(isNaN(e)?t:e)}var Ac=(function e(t){var n=Oc(t);function r(e,t){var r=n((e=uc(e)).r,(t=uc(t)).r),i=n(e.g,t.g),a=n(e.b,t.b),o=kc(e.opacity,t.opacity);return function(t){return e.r=r(t),e.g=i(t),e.b=a(t),e.opacity=o(t),e+``}}return r.gamma=e,r})(1);function jc(e,t){t||=[];var n=e?Math.min(t.length,e.length):0,r=t.slice(),i;return function(a){for(i=0;i<n;++i)r[i]=e[i]*(1-a)+t[i]*a;return r}}function Mc(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Nc(e,t){var n=t?t.length:0,r=e?Math.min(n,e.length):0,i=Array(r),a=Array(n),o;for(o=0;o<r;++o)i[o]=Hc(e[o],t[o]);for(;o<n;++o)a[o]=t[o];return function(e){for(o=0;o<r;++o)a[o]=i[o](e);return a}}function Pc(e,t){var n=new Date;return e=+e,t=+t,function(r){return n.setTime(e*(1-r)+t*r),n}}function Fc(e,t){return e=+e,t=+t,function(n){return e*(1-n)+t*n}}function Ic(e,t){var n={},r={},i;for(i in(typeof e!=`object`||!e)&&(e={}),(typeof t!=`object`||!t)&&(t={}),t)i in e?n[i]=Hc(e[i],t[i]):r[i]=t[i];return function(e){for(i in n)r[i]=n[i](e);return r}}var Lc=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,Rc=new RegExp(Lc.source,`g`);function zc(e){return function(){return e}}function Bc(e){return function(t){return e(t)+``}}function Vc(e,t){var n=Lc.lastIndex=Rc.lastIndex=0,r,i,a,o=-1,s=[],c=[];for(e+=``,t+=``;(r=Lc.exec(e))&&(i=Rc.exec(t));)(a=i.index)>n&&(a=t.slice(n,a),s[o]?s[o]+=a:s[++o]=a),(r=r[0])===(i=i[0])?s[o]?s[o]+=i:s[++o]=i:(s[++o]=null,c.push({i:o,x:Fc(r,i)})),n=Rc.lastIndex;return n<t.length&&(a=t.slice(n),s[o]?s[o]+=a:s[++o]=a),s.length<2?c[0]?Bc(c[0].x):zc(t):(t=c.length,function(e){for(var n=0,r;n<t;++n)s[(r=c[n]).i]=r.x(e);return s.join(``)})}function Hc(e,t){var n=typeof t,r;return t==null||n===`boolean`?Tc(t):(n===`number`?Fc:n===`string`?(r=oc(t))?(t=r,Ac):Vc:t instanceof oc?Ac:t instanceof Date?Pc:Mc(t)?jc:Array.isArray(t)?Nc:typeof t.valueOf!=`function`&&typeof t.toString!=`function`||isNaN(t)?Ic:Fc)(e,t)}var Uc=180/Math.PI,Wc={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function Gc(e,t,n,r,i,a){var o,s,c;return(o=Math.sqrt(e*e+t*t))&&(e/=o,t/=o),(c=e*n+t*r)&&(n-=e*c,r-=t*c),(s=Math.sqrt(n*n+r*r))&&(n/=s,r/=s,c/=s),e*r<t*n&&(e=-e,t=-t,c=-c,o=-o),{translateX:i,translateY:a,rotate:Math.atan2(t,e)*Uc,skewX:Math.atan(c)*Uc,scaleX:o,scaleY:s}}var Kc;function qc(e){let t=new(typeof DOMMatrix==`function`?DOMMatrix:WebKitCSSMatrix)(e+``);return t.isIdentity?Wc:Gc(t.a,t.b,t.c,t.d,t.e,t.f)}function Jc(e){return e==null||(Kc||=document.createElementNS(`http://www.w3.org/2000/svg`,`g`),Kc.setAttribute(`transform`,e),!(e=Kc.transform.baseVal.consolidate()))?Wc:(e=e.matrix,Gc(e.a,e.b,e.c,e.d,e.e,e.f))}function Yc(e,t,n,r){function i(e){return e.length?e.pop()+` `:``}function a(e,r,i,a,o,s){if(e!==i||r!==a){var c=o.push(`translate(`,null,t,null,n);s.push({i:c-4,x:Fc(e,i)},{i:c-2,x:Fc(r,a)})}else (i||a)&&o.push(`translate(`+i+t+a+n)}function o(e,t,n,a){e===t?t&&n.push(i(n)+`rotate(`+t+r):(e-t>180?t+=360:t-e>180&&(e+=360),a.push({i:n.push(i(n)+`rotate(`,null,r)-2,x:Fc(e,t)}))}function s(e,t,n,a){e===t?t&&n.push(i(n)+`skewX(`+t+r):a.push({i:n.push(i(n)+`skewX(`,null,r)-2,x:Fc(e,t)})}function c(e,t,n,r,a,o){if(e!==n||t!==r){var s=a.push(i(a)+`scale(`,null,`,`,null,`)`);o.push({i:s-4,x:Fc(e,n)},{i:s-2,x:Fc(t,r)})}else (n!==1||r!==1)&&a.push(i(a)+`scale(`+n+`,`+r+`)`)}return function(t,n){var r=[],i=[];return t=e(t),n=e(n),a(t.translateX,t.translateY,n.translateX,n.translateY,r,i),o(t.rotate,n.rotate,r,i),s(t.skewX,n.skewX,r,i),c(t.scaleX,t.scaleY,n.scaleX,n.scaleY,r,i),t=n=null,function(e){for(var t=-1,n=i.length,a;++t<n;)r[(a=i[t]).i]=a.x(e);return r.join(``)}}}var Xc=Yc(qc,`px, `,`px)`,`deg)`),Zc=Yc(Jc,`, `,`)`,`)`),Qc=1e-12;function $c(e){return((e=Math.exp(e))+1/e)/2}function el(e){return((e=Math.exp(e))-1/e)/2}function tl(e){return((e=Math.exp(2*e))-1)/(e+1)}var nl=(function e(t,n,r){function i(e,i){var a=e[0],o=e[1],s=e[2],c=i[0],l=i[1],u=i[2],d=c-a,f=l-o,p=d*d+f*f,m,h;if(p<Qc)h=Math.log(u/s)/t,m=function(e){return[a+e*d,o+e*f,s*Math.exp(t*e*h)]};else{var g=Math.sqrt(p),_=(u*u-s*s+r*p)/(2*s*n*g),v=(u*u-s*s-r*p)/(2*u*n*g),y=Math.log(Math.sqrt(_*_+1)-_);h=(Math.log(Math.sqrt(v*v+1)-v)-y)/t,m=function(e){var r=e*h,i=$c(y),c=s/(n*g)*(i*tl(t*r+y)-el(y));return[a+c*d,o+c*f,s*i/$c(t*r+y)]}}return m.duration=h*1e3*t/Math.SQRT2,m}return i.rho=function(t){var n=Math.max(.001,+t),r=n*n;return e(n,r,r*r)},i})(Math.SQRT2,2,4),rl=0,il=0,al=0,ol=1e3,sl,cl,ll=0,ul=0,dl=0,fl=typeof performance==`object`&&performance.now?performance:Date,pl=typeof window==`object`&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(e){setTimeout(e,17)};function ml(){return ul||=(pl(hl),fl.now()+dl)}function hl(){ul=0}function gl(){this._call=this._time=this._next=null}gl.prototype=_l.prototype={constructor:gl,restart:function(e,t,n){if(typeof e!=`function`)throw TypeError(`callback is not a function`);n=(n==null?ml():+n)+(t==null?0:+t),!this._next&&cl!==this&&(cl?cl._next=this:sl=this,cl=this),this._call=e,this._time=n,Sl()},stop:function(){this._call&&(this._call=null,this._time=1/0,Sl())}};function _l(e,t,n){var r=new gl;return r.restart(e,t,n),r}function vl(){ml(),++rl;for(var e=sl,t;e;)(t=ul-e._time)>=0&&e._call.call(void 0,t),e=e._next;--rl}function yl(){ul=(ll=fl.now())+dl,rl=il=0;try{vl()}finally{rl=0,xl(),ul=0}}function bl(){var e=fl.now(),t=e-ll;t>ol&&(dl-=t,ll=e)}function xl(){for(var e,t=sl,n,r=1/0;t;)t._call?(r>t._time&&(r=t._time),e=t,t=t._next):(n=t._next,t._next=null,t=e?e._next=n:sl=n);cl=e,Sl(r)}function Sl(e){rl||(il&&=clearTimeout(il),e-ul>24?(e<1/0&&(il=setTimeout(yl,e-fl.now()-dl)),al&&=clearInterval(al)):(al||=(ll=fl.now(),setInterval(bl,ol)),rl=1,pl(yl)))}function Cl(e,t,n){var r=new gl;return t=t==null?0:+t,r.restart(n=>{r.stop(),e(n+t)},t,n),r}var wl=ba(`start`,`end`,`cancel`,`interrupt`),Tl=[];function El(e,t,n,r,i,a){var o=e.__transition;if(!o)e.__transition={};else if(n in o)return;Al(e,n,{name:t,index:r,group:i,on:wl,tween:Tl,time:a.time,delay:a.delay,duration:a.duration,ease:a.ease,timer:null,state:0})}function Dl(e,t){var n=kl(e,t);if(n.state>0)throw Error(`too late; already scheduled`);return n}function Ol(e,t){var n=kl(e,t);if(n.state>3)throw Error(`too late; already running`);return n}function kl(e,t){var n=e.__transition;if(!n||!(n=n[t]))throw Error(`transition not found`);return n}function Al(e,t,n){var r=e.__transition,i;r[t]=n,n.timer=_l(a,0,n.time);function a(e){n.state=1,n.timer.restart(o,n.delay,n.time),n.delay<=e&&o(e-n.delay)}function o(a){var l,u,d,f;if(n.state!==1)return c();for(l in r)if(f=r[l],f.name===n.name){if(f.state===3)return Cl(o);f.state===4?(f.state=6,f.timer.stop(),f.on.call(`interrupt`,e,e.__data__,f.index,f.group),delete r[l]):+l<t&&(f.state=6,f.timer.stop(),f.on.call(`cancel`,e,e.__data__,f.index,f.group),delete r[l])}if(Cl(function(){n.state===3&&(n.state=4,n.timer.restart(s,n.delay,n.time),s(a))}),n.state=2,n.on.call(`start`,e,e.__data__,n.index,n.group),n.state===2){for(n.state=3,i=Array(d=n.tween.length),l=0,u=-1;l<d;++l)(f=n.tween[l].value.call(e,e.__data__,n.index,n.group))&&(i[++u]=f);i.length=u+1}}function s(t){for(var r=t<n.duration?n.ease.call(null,t/n.duration):(n.timer.restart(c),n.state=5,1),a=-1,o=i.length;++a<o;)i[a].call(e,r);n.state===5&&(n.on.call(`end`,e,e.__data__,n.index,n.group),c())}function c(){for(var i in n.state=6,n.timer.stop(),delete r[t],r)return;delete e.__transition}}function jl(e,t){var n=e.__transition,r,i,a=!0,o;if(n){for(o in t=t==null?null:t+``,n){if((r=n[o]).name!==t){a=!1;continue}i=r.state>2&&r.state<5,r.state=6,r.timer.stop(),r.on.call(i?`interrupt`:`cancel`,e,e.__data__,r.index,r.group),delete n[o]}a&&delete e.__transition}}function Ml(e){return this.each(function(){jl(this,e)})}function Nl(e,t){var n,r;return function(){var i=Ol(this,e),a=i.tween;if(a!==n){r=n=a;for(var o=0,s=r.length;o<s;++o)if(r[o].name===t){r=r.slice(),r.splice(o,1);break}}i.tween=r}}function Pl(e,t,n){var r,i;if(typeof n!=`function`)throw Error();return function(){var a=Ol(this,e),o=a.tween;if(o!==r){i=(r=o).slice();for(var s={name:t,value:n},c=0,l=i.length;c<l;++c)if(i[c].name===t){i[c]=s;break}c===l&&i.push(s)}a.tween=i}}function Fl(e,t){var n=this._id;if(e+=``,arguments.length<2){for(var r=kl(this.node(),n).tween,i=0,a=r.length,o;i<a;++i)if((o=r[i]).name===e)return o.value;return null}return this.each((t==null?Nl:Pl)(n,e,t))}function Il(e,t,n){var r=e._id;return e.each(function(){var e=Ol(this,r);(e.value||={})[t]=n.apply(this,arguments)}),function(e){return kl(e,r).value[t]}}function Ll(e,t){var n;return(typeof t==`number`?Fc:t instanceof oc?Ac:(n=oc(t))?(t=n,Ac):Vc)(e,t)}function Rl(e){return function(){this.removeAttribute(e)}}function zl(e){return function(){this.removeAttributeNS(e.space,e.local)}}function Bl(e,t,n){var r,i=n+``,a;return function(){var o=this.getAttribute(e);return o===i?null:o===r?a:a=t(r=o,n)}}function Vl(e,t,n){var r,i=n+``,a;return function(){var o=this.getAttributeNS(e.space,e.local);return o===i?null:o===r?a:a=t(r=o,n)}}function Hl(e,t,n){var r,i,a;return function(){var o,s=n(this),c;return s==null?void this.removeAttribute(e):(o=this.getAttribute(e),c=s+``,o===c?null:o===r&&c===i?a:(i=c,a=t(r=o,s)))}}function Ul(e,t,n){var r,i,a;return function(){var o,s=n(this),c;return s==null?void this.removeAttributeNS(e.space,e.local):(o=this.getAttributeNS(e.space,e.local),c=s+``,o===c?null:o===r&&c===i?a:(i=c,a=t(r=o,s)))}}function Wl(e,t){var n=Ea(e),r=n===`transform`?Zc:Ll;return this.attrTween(e,typeof t==`function`?(n.local?Ul:Hl)(n,r,Il(this,`attr.`+e,t)):t==null?(n.local?zl:Rl)(n):(n.local?Vl:Bl)(n,r,t))}function Gl(e,t){return function(n){this.setAttribute(e,t.call(this,n))}}function Kl(e,t){return function(n){this.setAttributeNS(e.space,e.local,t.call(this,n))}}function ql(e,t){var n,r;function i(){var i=t.apply(this,arguments);return i!==r&&(n=(r=i)&&Kl(e,i)),n}return i._value=t,i}function Jl(e,t){var n,r;function i(){var i=t.apply(this,arguments);return i!==r&&(n=(r=i)&&Gl(e,i)),n}return i._value=t,i}function Yl(e,t){var n=`attr.`+e;if(arguments.length<2)return(n=this.tween(n))&&n._value;if(t==null)return this.tween(n,null);if(typeof t!=`function`)throw Error();var r=Ea(e);return this.tween(n,(r.local?ql:Jl)(r,t))}function Xl(e,t){return function(){Dl(this,e).delay=+t.apply(this,arguments)}}function Zl(e,t){return t=+t,function(){Dl(this,e).delay=t}}function Ql(e){var t=this._id;return arguments.length?this.each((typeof e==`function`?Xl:Zl)(t,e)):kl(this.node(),t).delay}function $l(e,t){return function(){Ol(this,e).duration=+t.apply(this,arguments)}}function eu(e,t){return t=+t,function(){Ol(this,e).duration=t}}function tu(e){var t=this._id;return arguments.length?this.each((typeof e==`function`?$l:eu)(t,e)):kl(this.node(),t).duration}function nu(e,t){if(typeof t!=`function`)throw Error();return function(){Ol(this,e).ease=t}}function ru(e){var t=this._id;return arguments.length?this.each(nu(t,e)):kl(this.node(),t).ease}function iu(e,t){return function(){var n=t.apply(this,arguments);if(typeof n!=`function`)throw Error();Ol(this,e).ease=n}}function au(e){if(typeof e!=`function`)throw Error();return this.each(iu(this._id,e))}function ou(e){typeof e!=`function`&&(e=Ra(e));for(var t=this._groups,n=t.length,r=Array(n),i=0;i<n;++i)for(var a=t[i],o=a.length,s=r[i]=[],c,l=0;l<o;++l)(c=a[l])&&e.call(c,c.__data__,l,a)&&s.push(c);return new Fu(r,this._parents,this._name,this._id)}function su(e){if(e._id!==this._id)throw Error();for(var t=this._groups,n=e._groups,r=t.length,i=n.length,a=Math.min(r,i),o=Array(r),s=0;s<a;++s)for(var c=t[s],l=n[s],u=c.length,d=o[s]=Array(u),f,p=0;p<u;++p)(f=c[p]||l[p])&&(d[p]=f);for(;s<r;++s)o[s]=t[s];return new Fu(o,this._parents,this._name,this._id)}function cu(e){return(e+``).trim().split(/^|\s+/).every(function(e){var t=e.indexOf(`.`);return t>=0&&(e=e.slice(0,t)),!e||e===`start`})}function lu(e,t,n){var r,i,a=cu(t)?Dl:Ol;return function(){var o=a(this,e),s=o.on;s!==r&&(i=(r=s).copy()).on(t,n),o.on=i}}function uu(e,t){var n=this._id;return arguments.length<2?kl(this.node(),n).on.on(e):this.each(lu(n,e,t))}function du(e){return function(){var t=this.parentNode;for(var n in this.__transition)if(+n!==e)return;t&&t.removeChild(this)}}function fu(){return this.on(`end.remove`,du(this._id))}function pu(e){var t=this._name,n=this._id;typeof e!=`function`&&(e=ja(e));for(var r=this._groups,i=r.length,a=Array(i),o=0;o<i;++o)for(var s=r[o],c=s.length,l=a[o]=Array(c),u,d,f=0;f<c;++f)(u=s[f])&&(d=e.call(u,u.__data__,f,s))&&(`__data__`in u&&(d.__data__=u.__data__),l[f]=d,El(l[f],t,n,f,l,kl(u,n)));return new Fu(a,this._parents,t,n)}function mu(e){var t=this._name,n=this._id;typeof e!=`function`&&(e=Fa(e));for(var r=this._groups,i=r.length,a=[],o=[],s=0;s<i;++s)for(var c=r[s],l=c.length,u,d=0;d<l;++d)if(u=c[d]){for(var f=e.call(u,u.__data__,d,c),p,m=kl(u,n),h=0,g=f.length;h<g;++h)(p=f[h])&&El(p,t,n,h,f,m);a.push(f),o.push(u)}return new Fu(a,o,t,n)}var hu=Ss.prototype.constructor;function gu(){return new hu(this._groups,this._parents)}function _u(e,t){var n,r,i;return function(){var a=ko(this,e),o=(this.style.removeProperty(e),ko(this,e));return a===o?null:a===n&&o===r?i:i=t(n=a,r=o)}}function vu(e){return function(){this.style.removeProperty(e)}}function yu(e,t,n){var r,i=n+``,a;return function(){var o=ko(this,e);return o===i?null:o===r?a:a=t(r=o,n)}}function bu(e,t,n){var r,i,a;return function(){var o=ko(this,e),s=n(this),c=s+``;return s??(c=s=(this.style.removeProperty(e),ko(this,e))),o===c?null:o===r&&c===i?a:(i=c,a=t(r=o,s))}}function xu(e,t){var n,r,i,a=`style.`+t,o=`end.`+a,s;return function(){var c=Ol(this,e),l=c.on,u=c.value[a]==null?s||=vu(t):void 0;(l!==n||i!==u)&&(r=(n=l).copy()).on(o,i=u),c.on=r}}function Su(e,t,n){var r=(e+=``)==`transform`?Xc:Ll;return t==null?this.styleTween(e,_u(e,r)).on(`end.style.`+e,vu(e)):typeof t==`function`?this.styleTween(e,bu(e,r,Il(this,`style.`+e,t))).each(xu(this._id,e)):this.styleTween(e,yu(e,r,t),n).on(`end.style.`+e,null)}function Cu(e,t,n){return function(r){this.style.setProperty(e,t.call(this,r),n)}}function wu(e,t,n){var r,i;function a(){var a=t.apply(this,arguments);return a!==i&&(r=(i=a)&&Cu(e,a,n)),r}return a._value=t,a}function Tu(e,t,n){var r=`style.`+(e+=``);if(arguments.length<2)return(r=this.tween(r))&&r._value;if(t==null)return this.tween(r,null);if(typeof t!=`function`)throw Error();return this.tween(r,wu(e,t,n??``))}function Eu(e){return function(){this.textContent=e}}function Du(e){return function(){var t=e(this);this.textContent=t??``}}function Ou(e){return this.tween(`text`,typeof e==`function`?Du(Il(this,`text`,e)):Eu(e==null?``:e+``))}function ku(e){return function(t){this.textContent=e.call(this,t)}}function Au(e){var t,n;function r(){var r=e.apply(this,arguments);return r!==n&&(t=(n=r)&&ku(r)),t}return r._value=e,r}function ju(e){var t=`text`;if(arguments.length<1)return(t=this.tween(t))&&t._value;if(e==null)return this.tween(t,null);if(typeof e!=`function`)throw Error();return this.tween(t,Au(e))}function Mu(){for(var e=this._name,t=this._id,n=Lu(),r=this._groups,i=r.length,a=0;a<i;++a)for(var o=r[a],s=o.length,c,l=0;l<s;++l)if(c=o[l]){var u=kl(c,t);El(c,e,n,l,o,{time:u.time+u.delay+u.duration,delay:0,duration:u.duration,ease:u.ease})}return new Fu(r,this._parents,e,n)}function Nu(){var e,t,n=this,r=n._id,i=n.size();return new Promise(function(a,o){var s={value:o},c={value:function(){--i===0&&a()}};n.each(function(){var n=Ol(this,r),i=n.on;i!==e&&(t=(e=i).copy(),t._.cancel.push(s),t._.interrupt.push(s),t._.end.push(c)),n.on=t}),i===0&&a()})}var Pu=0;function Fu(e,t,n,r){this._groups=e,this._parents=t,this._name=n,this._id=r}function Iu(e){return Ss().transition(e)}function Lu(){return++Pu}var Ru=Ss.prototype;Fu.prototype=Iu.prototype={constructor:Fu,select:pu,selectAll:mu,selectChild:Ru.selectChild,selectChildren:Ru.selectChildren,filter:ou,merge:su,selection:gu,transition:Mu,call:Ru.call,nodes:Ru.nodes,node:Ru.node,size:Ru.size,empty:Ru.empty,each:Ru.each,on:uu,attr:Wl,attrTween:Yl,style:Su,styleTween:Tu,text:Ou,textTween:ju,remove:fu,tween:Fl,delay:Ql,duration:tu,ease:ru,easeVarying:au,end:Nu,[Symbol.iterator]:Ru[Symbol.iterator]};function zu(e){return((e*=2)<=1?e*e*e:(e-=2)*e*e+2)/2}var Bu={time:null,delay:0,duration:250,ease:zu};function Vu(e,t){for(var n;!(n=e.__transition)||!(n=n[t]);)if(!(e=e.parentNode))throw Error(`transition ${t} not found`);return n}function Hu(e){var t,n;e instanceof Fu?(t=e._id,e=e._name):(t=Lu(),(n=Bu).time=ml(),e=e==null?null:e+``);for(var r=this._groups,i=r.length,a=0;a<i;++a)for(var o=r[a],s=o.length,c,l=0;l<s;++l)(c=o[l])&&El(c,e,t,l,o,n||Vu(c,t));return new Fu(r,this._parents,e,t)}Ss.prototype.interrupt=Ml,Ss.prototype.transition=Hu;var Uu=e=>()=>e;function Wu(e,{sourceEvent:t,target:n,transform:r,dispatch:i}){Object.defineProperties(this,{type:{value:e,enumerable:!0,configurable:!0},sourceEvent:{value:t,enumerable:!0,configurable:!0},target:{value:n,enumerable:!0,configurable:!0},transform:{value:r,enumerable:!0,configurable:!0},_:{value:i}})}function Gu(e,t,n){this.k=e,this.x=t,this.y=n}Gu.prototype={constructor:Gu,scale:function(e){return e===1?this:new Gu(this.k*e,this.x,this.y)},translate:function(e,t){return e===0&t===0?this:new Gu(this.k,this.x+this.k*e,this.y+this.k*t)},apply:function(e){return[e[0]*this.k+this.x,e[1]*this.k+this.y]},applyX:function(e){return e*this.k+this.x},applyY:function(e){return e*this.k+this.y},invert:function(e){return[(e[0]-this.x)/this.k,(e[1]-this.y)/this.k]},invertX:function(e){return(e-this.x)/this.k},invertY:function(e){return(e-this.y)/this.k},rescaleX:function(e){return e.copy().domain(e.range().map(this.invertX,this).map(e.invert,e))},rescaleY:function(e){return e.copy().domain(e.range().map(this.invertY,this).map(e.invert,e))},toString:function(){return`translate(`+this.x+`,`+this.y+`) scale(`+this.k+`)`}};var Ku=new Gu(1,0,0);qu.prototype=Gu.prototype;function qu(e){for(;!e.__zoom;)if(!(e=e.parentNode))return Ku;return e.__zoom}function Ju(e){e.stopImmediatePropagation()}function Yu(e){e.preventDefault(),e.stopImmediatePropagation()}function Xu(e){return(!e.ctrlKey||e.type===`wheel`)&&!e.button}function Zu(){var e=this;return e instanceof SVGElement?(e=e.ownerSVGElement||e,e.hasAttribute(`viewBox`)?(e=e.viewBox.baseVal,[[e.x,e.y],[e.x+e.width,e.y+e.height]]):[[0,0],[e.width.baseVal.value,e.height.baseVal.value]]):[[0,0],[e.clientWidth,e.clientHeight]]}function Qu(){return this.__zoom||Ku}function $u(e){return-e.deltaY*(e.deltaMode===1?.05:e.deltaMode?1:.002)*(e.ctrlKey?10:1)}function ed(){return navigator.maxTouchPoints||`ontouchstart`in this}function td(e,t,n){var r=e.invertX(t[0][0])-n[0][0],i=e.invertX(t[1][0])-n[1][0],a=e.invertY(t[0][1])-n[0][1],o=e.invertY(t[1][1])-n[1][1];return e.translate(i>r?(r+i)/2:Math.min(0,r)||Math.max(0,i),o>a?(a+o)/2:Math.min(0,a)||Math.max(0,o))}function nd(){var e=Xu,t=Zu,n=td,r=$u,i=ed,a=[0,1/0],o=[[-1/0,-1/0],[1/0,1/0]],s=250,c=nl,l=ba(`start`,`zoom`,`end`),u,d,f,p=500,m=150,h=0,g=10;function _(e){e.property(`__zoom`,Qu).on(`wheel.zoom`,w,{passive:!1}).on(`mousedown.zoom`,T).on(`dblclick.zoom`,ee).filter(i).on(`touchstart.zoom`,E).on(`touchmove.zoom`,te).on(`touchend.zoom touchcancel.zoom`,ne).style(`-webkit-tap-highlight-color`,`rgba(0,0,0,0)`)}_.transform=function(e,t,n,r){var i=e.selection?e.selection():e;i.property(`__zoom`,Qu),e===i?i.interrupt().each(function(){S(this,arguments).event(r).start().zoom(null,typeof t==`function`?t.apply(this,arguments):t).end()}):x(e,t,n,r)},_.scaleBy=function(e,t,n,r){_.scaleTo(e,function(){return this.__zoom.k*(typeof t==`function`?t.apply(this,arguments):t)},n,r)},_.scaleTo=function(e,r,i,a){_.transform(e,function(){var e=t.apply(this,arguments),a=this.__zoom,s=i==null?b(e):typeof i==`function`?i.apply(this,arguments):i,c=a.invert(s),l=typeof r==`function`?r.apply(this,arguments):r;return n(y(v(a,l),s,c),e,o)},i,a)},_.translateBy=function(e,r,i,a){_.transform(e,function(){return n(this.__zoom.translate(typeof r==`function`?r.apply(this,arguments):r,typeof i==`function`?i.apply(this,arguments):i),t.apply(this,arguments),o)},null,a)},_.translateTo=function(e,r,i,a,s){_.transform(e,function(){var e=t.apply(this,arguments),s=this.__zoom,c=a==null?b(e):typeof a==`function`?a.apply(this,arguments):a;return n(Ku.translate(c[0],c[1]).scale(s.k).translate(typeof r==`function`?-r.apply(this,arguments):-r,typeof i==`function`?-i.apply(this,arguments):-i),e,o)},a,s)};function v(e,t){return t=Math.max(a[0],Math.min(a[1],t)),t===e.k?e:new Gu(t,e.x,e.y)}function y(e,t,n){var r=t[0]-n[0]*e.k,i=t[1]-n[1]*e.k;return r===e.x&&i===e.y?e:new Gu(e.k,r,i)}function b(e){return[(+e[0][0]+ +e[1][0])/2,(+e[0][1]+ +e[1][1])/2]}function x(e,n,r,i){e.on(`start.zoom`,function(){S(this,arguments).event(i).start()}).on(`interrupt.zoom end.zoom`,function(){S(this,arguments).event(i).end()}).tween(`zoom`,function(){var e=this,a=arguments,o=S(e,a).event(i),s=t.apply(e,a),l=r==null?b(s):typeof r==`function`?r.apply(e,a):r,u=Math.max(s[1][0]-s[0][0],s[1][1]-s[0][1]),d=e.__zoom,f=typeof n==`function`?n.apply(e,a):n,p=c(d.invert(l).concat(u/d.k),f.invert(l).concat(u/f.k));return function(e){if(e===1)e=f;else{var t=p(e),n=u/t[2];e=new Gu(n,l[0]-t[0]*n,l[1]-t[1]*n)}o.zoom(null,e)}})}function S(e,t,n){return!n&&e.__zooming||new C(e,t)}function C(e,n){this.that=e,this.args=n,this.active=0,this.sourceEvent=null,this.extent=t.apply(e,n),this.taps=0}C.prototype={event:function(e){return e&&(this.sourceEvent=e),this},start:function(){return++this.active===1&&(this.that.__zooming=this,this.emit(`start`)),this},zoom:function(e,t){return this.mouse&&e!==`mouse`&&(this.mouse[1]=t.invert(this.mouse[0])),this.touch0&&e!==`touch`&&(this.touch0[1]=t.invert(this.touch0[0])),this.touch1&&e!==`touch`&&(this.touch1[1]=t.invert(this.touch1[0])),this.that.__zoom=t,this.emit(`zoom`),this},end:function(){return--this.active===0&&(delete this.that.__zooming,this.emit(`end`)),this},emit:function(e){var t=ws(this.that).datum();l.call(e,this.that,new Wu(e,{sourceEvent:this.sourceEvent,target:_,type:e,transform:this.that.__zoom,dispatch:l}),t)}};function w(t,...i){if(!e.apply(this,arguments))return;var s=S(this,i).event(t),c=this.__zoom,l=Math.max(a[0],Math.min(a[1],c.k*2**r.apply(this,arguments))),u=Es(t);if(s.wheel)(s.mouse[0][0]!==u[0]||s.mouse[0][1]!==u[1])&&(s.mouse[1]=c.invert(s.mouse[0]=u)),clearTimeout(s.wheel);else if(c.k===l)return;else s.mouse=[u,c.invert(u)],jl(this),s.start();Yu(t),s.wheel=setTimeout(d,m),s.zoom(`mouse`,n(y(v(c,l),s.mouse[0],s.mouse[1]),s.extent,o));function d(){s.wheel=null,s.end()}}function T(t,...r){if(f||!e.apply(this,arguments))return;var i=t.currentTarget,a=S(this,r,!0).event(t),s=ws(t.view).on(`mousemove.zoom`,d,!0).on(`mouseup.zoom`,p,!0),c=Es(t,i),l=t.clientX,u=t.clientY;js(t.view),Ju(t),a.mouse=[c,this.__zoom.invert(c)],jl(this),a.start();function d(e){if(Yu(e),!a.moved){var t=e.clientX-l,r=e.clientY-u;a.moved=t*t+r*r>h}a.event(e).zoom(`mouse`,n(y(a.that.__zoom,a.mouse[0]=Es(e,i),a.mouse[1]),a.extent,o))}function p(e){s.on(`mousemove.zoom mouseup.zoom`,null),Ms(e.view,a.moved),Yu(e),a.event(e).end()}}function ee(r,...i){if(e.apply(this,arguments)){var a=this.__zoom,c=Es(r.changedTouches?r.changedTouches[0]:r,this),l=a.invert(c),u=a.k*(r.shiftKey?.5:2),d=n(y(v(a,u),c,l),t.apply(this,i),o);Yu(r),s>0?ws(this).transition().duration(s).call(x,d,c,r):ws(this).call(_.transform,d,c,r)}}function E(t,...n){if(e.apply(this,arguments)){var r=t.touches,i=r.length,a=S(this,n,t.changedTouches.length===i).event(t),o,s,c,l;for(Ju(t),s=0;s<i;++s)c=r[s],l=Es(c,this),l=[l,this.__zoom.invert(l),c.identifier],a.touch0?!a.touch1&&a.touch0[2]!==l[2]&&(a.touch1=l,a.taps=0):(a.touch0=l,o=!0,a.taps=1+!!u);u&&=clearTimeout(u),o&&(a.taps<2&&(d=l[0],u=setTimeout(function(){u=null},p)),jl(this),a.start())}}function te(e,...t){if(this.__zooming){var r=S(this,t).event(e),i=e.changedTouches,a=i.length,s,c,l,u;for(Yu(e),s=0;s<a;++s)c=i[s],l=Es(c,this),r.touch0&&r.touch0[2]===c.identifier?r.touch0[0]=l:r.touch1&&r.touch1[2]===c.identifier&&(r.touch1[0]=l);if(c=r.that.__zoom,r.touch1){var d=r.touch0[0],f=r.touch0[1],p=r.touch1[0],m=r.touch1[1],h=(h=p[0]-d[0])*h+(h=p[1]-d[1])*h,g=(g=m[0]-f[0])*g+(g=m[1]-f[1])*g;c=v(c,Math.sqrt(h/g)),l=[(d[0]+p[0])/2,(d[1]+p[1])/2],u=[(f[0]+m[0])/2,(f[1]+m[1])/2]}else if(r.touch0)l=r.touch0[0],u=r.touch0[1];else return;r.zoom(`touch`,n(y(c,l,u),r.extent,o))}}function ne(e,...t){if(this.__zooming){var n=S(this,t).event(e),r=e.changedTouches,i=r.length,a,o;for(Ju(e),f&&clearTimeout(f),f=setTimeout(function(){f=null},p),a=0;a<i;++a)o=r[a],n.touch0&&n.touch0[2]===o.identifier?delete n.touch0:n.touch1&&n.touch1[2]===o.identifier&&delete n.touch1;if(n.touch1&&!n.touch0&&(n.touch0=n.touch1,delete n.touch1),n.touch0)n.touch0[1]=this.__zoom.invert(n.touch0[0]);else if(n.end(),n.taps===2&&(o=Es(o,this),Math.hypot(d[0]-o[0],d[1]-o[1])<g)){var s=ws(this).on(`dblclick.zoom`);s&&s.apply(this,arguments)}}}return _.wheelDelta=function(e){return arguments.length?(r=typeof e==`function`?e:Uu(+e),_):r},_.filter=function(t){return arguments.length?(e=typeof t==`function`?t:Uu(!!t),_):e},_.touchable=function(e){return arguments.length?(i=typeof e==`function`?e:Uu(!!e),_):i},_.extent=function(e){return arguments.length?(t=typeof e==`function`?e:Uu([[+e[0][0],+e[0][1]],[+e[1][0],+e[1][1]]]),_):t},_.scaleExtent=function(e){return arguments.length?(a[0]=+e[0],a[1]=+e[1],_):[a[0],a[1]]},_.translateExtent=function(e){return arguments.length?(o[0][0]=+e[0][0],o[1][0]=+e[1][0],o[0][1]=+e[0][1],o[1][1]=+e[1][1],_):[[o[0][0],o[0][1]],[o[1][0],o[1][1]]]},_.constrain=function(e){return arguments.length?(n=e,_):n},_.duration=function(e){return arguments.length?(s=+e,_):s},_.interpolate=function(e){return arguments.length?(c=e,_):c},_.on=function(){var e=l.on.apply(l,arguments);return e===l?_:e},_.clickDistance=function(e){return arguments.length?(h=(e=+e)*e,_):Math.sqrt(h)},_.tapDistance=function(e){return arguments.length?(g=+e,_):g},_}var rd={error001:()=>`[React Flow]: Seems like you have not used zustand provider as an ancestor. Help: https://reactflow.dev/error#001`,error002:()=>`It looks like you've created a new nodeTypes or edgeTypes object. If this wasn't on purpose please define the nodeTypes/edgeTypes outside of the component or memoize them.`,error003:e=>`Node type "${e}" not found. Using fallback type "default".`,error004:()=>`The React Flow parent container needs a width and a height to render the graph.`,error005:()=>`Only child nodes can use a parent extent.`,error006:()=>`Can't create edge. An edge needs a source and a target.`,error007:e=>`The old edge with id=${e} does not exist.`,error009:e=>`Marker type "${e}" doesn't exist.`,error008:(e,{id:t,sourceHandle:n,targetHandle:r})=>`Couldn't create edge for ${e} handle id: "${e===`source`?n:r}", edge id: ${t}.`,error010:()=>`Handle: No node id found. Make sure to only use a Handle inside a custom Node.`,error011:e=>`Edge type "${e}" not found. Using fallback type "default".`,error012:e=>`Node with id "${e}" does not exist, it may have been removed. This can happen when a node is deleted before the "onNodeClick" handler is called.`,error013:(e=`react`)=>`It seems that you haven't loaded the styles. Please import '@xyflow/${e}/dist/style.css' or base.css to make sure everything is working properly.`,error014:()=>`useNodeConnections: No node ID found. Call useNodeConnections inside a custom Node or provide a node ID.`,error015:()=>`It seems that you are trying to drag a node that is not initialized. Please use onNodesChange as explained in the docs.`},id=[[-1/0,-1/0],[1/0,1/0]],ad=[`Enter`,` `,`Escape`],od={"node.a11yDescription.default":`Press enter or space to select a node. Press delete to remove it and escape to cancel.`,"node.a11yDescription.keyboardDisabled":`Press enter or space to select a node. You can then use the arrow keys to move the node around. Press delete to remove it and escape to cancel.`,"node.a11yDescription.ariaLiveMessage":({direction:e,x:t,y:n})=>`Moved selected node ${e}. New position, x: ${t}, y: ${n}`,"edge.a11yDescription.default":`Press enter or space to select an edge. You can then press delete to remove it or escape to cancel.`,"controls.ariaLabel":`Control Panel`,"controls.zoomIn.ariaLabel":`Zoom In`,"controls.zoomOut.ariaLabel":`Zoom Out`,"controls.fitView.ariaLabel":`Fit View`,"controls.interactive.ariaLabel":`Toggle Interactivity`,"minimap.ariaLabel":`Mini Map`,"handle.ariaLabel":`Handle`},sd;(function(e){e.Strict=`strict`,e.Loose=`loose`})(sd||={});var cd;(function(e){e.Free=`free`,e.Vertical=`vertical`,e.Horizontal=`horizontal`})(cd||={});var ld;(function(e){e.Partial=`partial`,e.Full=`full`})(ld||={});var ud={inProgress:!1,isValid:null,from:null,fromHandle:null,fromPosition:null,fromNode:null,to:null,toHandle:null,toPosition:null,toNode:null,pointer:null},dd;(function(e){e.Bezier=`default`,e.Straight=`straight`,e.Step=`step`,e.SmoothStep=`smoothstep`,e.SimpleBezier=`simplebezier`})(dd||={});var fd;(function(e){e.Arrow=`arrow`,e.ArrowClosed=`arrowclosed`})(fd||={});var Z;(function(e){e.Left=`left`,e.Top=`top`,e.Right=`right`,e.Bottom=`bottom`})(Z||={});var pd={[Z.Left]:Z.Right,[Z.Right]:Z.Left,[Z.Top]:Z.Bottom,[Z.Bottom]:Z.Top};function md(e,t){if(!e&&!t)return!0;if(!e||!t||e.size!==t.size)return!1;if(!e.size&&!t.size)return!0;for(let n of e.keys())if(!t.has(n))return!1;return!0}function hd(e,t,n){if(!n)return;let r=[];e.forEach((e,n)=>{t?.has(n)||r.push(e)}),r.length&&n(r)}function gd(e){return e===null?null:e?`valid`:`invalid`}var _d=e=>`id`in e&&`source`in e&&`target`in e,vd=e=>`id`in e&&`position`in e&&!(`source`in e)&&!(`target`in e),yd=e=>`id`in e&&`internals`in e&&!(`source`in e)&&!(`target`in e),bd=(e,t=[0,0])=>{let{width:n,height:r}=$d(e),i=e.origin??t,a=n*i[0],o=r*i[1];return{x:e.position.x-a,y:e.position.y-o}},xd=(e,t={nodeOrigin:[0,0]})=>e.length===0?{x:0,y:0,width:0,height:0}:Id(e.reduce((e,n)=>{let r=typeof n==`string`,i=!t.nodeLookup&&!r?n:void 0;return t.nodeLookup&&(i=r?t.nodeLookup.get(n):yd(n)?n:t.nodeLookup.get(n.id)),Pd(e,i?Rd(i,t.nodeOrigin):{x:0,y:0,x2:0,y2:0})},{x:1/0,y:1/0,x2:-1/0,y2:-1/0})),Sd=(e,t={})=>{let n={x:1/0,y:1/0,x2:-1/0,y2:-1/0},r=!1;return e.forEach(e=>{(t.filter===void 0||t.filter(e))&&(n=Pd(n,Rd(e)),r=!0)}),r?Id(n):{x:0,y:0,width:0,height:0}},Cd=(e,t,[n,r,i]=[0,0,1],a=!1,o=!1)=>{let s={...Gd(t,[n,r,i]),width:t.width/i,height:t.height/i},c=[];for(let t of e.values()){let{measured:e,selectable:n=!0,hidden:r=!1}=t;if(o&&!n||r)continue;let i=e.width??t.width??t.initialWidth??null,l=e.height??t.height??t.initialHeight??null,u=Bd(s,Ld(t)),d=(i??0)*(l??0),f=a&&u>0;(!t.internals.handleBounds||f||u>=d||t.dragging)&&c.push(t)}return c},wd=(e,t)=>{let n=new Set;return e.forEach(e=>{n.add(e.id)}),t.filter(e=>n.has(e.source)||n.has(e.target))};function Td(e,t){let n=new Map,r=t?.nodes?new Set(t.nodes.map(e=>e.id)):null;return e.forEach(e=>{e.measured.width&&e.measured.height&&(t?.includeHiddenNodes||!e.hidden)&&(!r||r.has(e.id))&&n.set(e.id,e)}),n}async function Ed({nodes:e,width:t,height:n,panZoom:r,minZoom:i,maxZoom:a},o){if(e.size===0)return Promise.resolve(!0);let s=Xd(Sd(Td(e,o)),t,n,o?.minZoom??i,o?.maxZoom??a,o?.padding??.1);return await r.setViewport(s,{duration:o?.duration,ease:o?.ease,interpolate:o?.interpolate}),Promise.resolve(!0)}function Dd({nodeId:e,nextPosition:t,nodeLookup:n,nodeOrigin:r=[0,0],nodeExtent:i,onError:a}){let o=n.get(e),s=o.parentId?n.get(o.parentId):void 0,{x:c,y:l}=s?s.internals.positionAbsolute:{x:0,y:0},u=o.origin??r,d=o.extent||i;if(o.extent===`parent`&&!o.expandParent)if(!s)a?.(`005`,rd.error005());else{let e=s.measured.width,t=s.measured.height;e&&t&&(d=[[c,l],[c+e,l+t]])}else s&&Qd(o.extent)&&(d=[[o.extent[0][0]+c,o.extent[0][1]+l],[o.extent[1][0]+c,o.extent[1][1]+l]]);let f=Qd(d)?Ad(t,d,o.measured):t;return(o.measured.width===void 0||o.measured.height===void 0)&&a?.(`015`,rd.error015()),{position:{x:f.x-c+(o.measured.width??0)*u[0],y:f.y-l+(o.measured.height??0)*u[1]},positionAbsolute:f}}async function Od({nodesToRemove:e=[],edgesToRemove:t=[],nodes:n,edges:r,onBeforeDelete:i}){let a=new Set(e.map(e=>e.id)),o=[];for(let e of n){if(e.deletable===!1)continue;let t=a.has(e.id),n=!t&&e.parentId&&o.find(t=>t.id===e.parentId);(t||n)&&o.push(e)}let s=new Set(t.map(e=>e.id)),c=r.filter(e=>e.deletable!==!1),l=wd(o,c);for(let e of c)s.has(e.id)&&!l.find(t=>t.id===e.id)&&l.push(e);if(!i)return{edges:l,nodes:o};let u=await i({nodes:o,edges:l});return typeof u==`boolean`?u?{edges:l,nodes:o}:{edges:[],nodes:[]}:u}var kd=(e,t=0,n=1)=>Math.min(Math.max(e,t),n),Ad=(e={x:0,y:0},t,n)=>({x:kd(e.x,t[0][0],t[1][0]-(n?.width??0)),y:kd(e.y,t[0][1],t[1][1]-(n?.height??0))});function jd(e,t,n){let{width:r,height:i}=$d(n),{x:a,y:o}=n.internals.positionAbsolute;return Ad(e,[[a,o],[a+r,o+i]],t)}var Md=(e,t,n)=>e<t?kd(Math.abs(e-t),1,t)/t:e>n?-kd(Math.abs(e-n),1,t)/t:0,Nd=(e,t,n=15,r=40)=>[Md(e.x,r,t.width-r)*n,Md(e.y,r,t.height-r)*n],Pd=(e,t)=>({x:Math.min(e.x,t.x),y:Math.min(e.y,t.y),x2:Math.max(e.x2,t.x2),y2:Math.max(e.y2,t.y2)}),Fd=({x:e,y:t,width:n,height:r})=>({x:e,y:t,x2:e+n,y2:t+r}),Id=({x:e,y:t,x2:n,y2:r})=>({x:e,y:t,width:n-e,height:r-t}),Ld=(e,t=[0,0])=>{let{x:n,y:r}=yd(e)?e.internals.positionAbsolute:bd(e,t);return{x:n,y:r,width:e.measured?.width??e.width??e.initialWidth??0,height:e.measured?.height??e.height??e.initialHeight??0}},Rd=(e,t=[0,0])=>{let{x:n,y:r}=yd(e)?e.internals.positionAbsolute:bd(e,t);return{x:n,y:r,x2:n+(e.measured?.width??e.width??e.initialWidth??0),y2:r+(e.measured?.height??e.height??e.initialHeight??0)}},zd=(e,t)=>Id(Pd(Fd(e),Fd(t))),Bd=(e,t)=>{let n=Math.max(0,Math.min(e.x+e.width,t.x+t.width)-Math.max(e.x,t.x)),r=Math.max(0,Math.min(e.y+e.height,t.y+t.height)-Math.max(e.y,t.y));return Math.ceil(n*r)},Vd=e=>Hd(e.width)&&Hd(e.height)&&Hd(e.x)&&Hd(e.y),Hd=e=>!isNaN(e)&&isFinite(e),Ud=(e,t)=>{},Wd=(e,t=[1,1])=>({x:t[0]*Math.round(e.x/t[0]),y:t[1]*Math.round(e.y/t[1])}),Gd=({x:e,y:t},[n,r,i],a=!1,o=[1,1])=>{let s={x:(e-n)/i,y:(t-r)/i};return a?Wd(s,o):s},Kd=({x:e,y:t},[n,r,i])=>({x:e*i+n,y:t*i+r});function qd(e,t){if(typeof e==`number`)return Math.floor((t-t/(1+e))*.5);if(typeof e==`string`&&e.endsWith(`px`)){let t=parseFloat(e);if(!Number.isNaN(t))return Math.floor(t)}if(typeof e==`string`&&e.endsWith(`%`)){let n=parseFloat(e);if(!Number.isNaN(n))return Math.floor(t*n*.01)}return console.error(`[React Flow] The padding value "${e}" is invalid. Please provide a number or a string with a valid unit (px or %).`),0}function Jd(e,t,n){if(typeof e==`string`||typeof e==`number`){let r=qd(e,n),i=qd(e,t);return{top:r,right:i,bottom:r,left:i,x:i*2,y:r*2}}if(typeof e==`object`){let r=qd(e.top??e.y??0,n),i=qd(e.bottom??e.y??0,n),a=qd(e.left??e.x??0,t),o=qd(e.right??e.x??0,t);return{top:r,right:o,bottom:i,left:a,x:a+o,y:r+i}}return{top:0,right:0,bottom:0,left:0,x:0,y:0}}function Yd(e,t,n,r,i,a){let{x:o,y:s}=Kd(e,[t,n,r]),{x:c,y:l}=Kd({x:e.x+e.width,y:e.y+e.height},[t,n,r]),u=i-c,d=a-l;return{left:Math.floor(o),top:Math.floor(s),right:Math.floor(u),bottom:Math.floor(d)}}var Xd=(e,t,n,r,i,a)=>{let o=Jd(a,t,n),s=(t-o.x)/e.width,c=(n-o.y)/e.height,l=kd(Math.min(s,c),r,i),u=e.x+e.width/2,d=e.y+e.height/2,f=t/2-u*l,p=n/2-d*l,m=Yd(e,f,p,l,t,n),h={left:Math.min(m.left-o.left,0),top:Math.min(m.top-o.top,0),right:Math.min(m.right-o.right,0),bottom:Math.min(m.bottom-o.bottom,0)};return{x:f-h.left+h.right,y:p-h.top+h.bottom,zoom:l}},Zd=()=>typeof navigator<`u`&&navigator?.userAgent?.indexOf(`Mac`)>=0;function Qd(e){return e!=null&&e!==`parent`}function $d(e){return{width:e.measured?.width??e.width??e.initialWidth??0,height:e.measured?.height??e.height??e.initialHeight??0}}function ef(e){return(e.measured?.width??e.width??e.initialWidth)!==void 0&&(e.measured?.height??e.height??e.initialHeight)!==void 0}function tf(e,t={width:0,height:0},n,r,i){let a={...e},o=r.get(n);if(o){let e=o.origin||i;a.x+=o.internals.positionAbsolute.x-(t.width??0)*e[0],a.y+=o.internals.positionAbsolute.y-(t.height??0)*e[1]}return a}function nf(e){return{...od,...e||{}}}function rf(e,{snapGrid:t=[0,0],snapToGrid:n=!1,transform:r,containerBounds:i}){let{x:a,y:o}=uf(e),s=Gd({x:a-(i?.left??0),y:o-(i?.top??0)},r),{x:c,y:l}=n?Wd(s,t):s;return{xSnapped:c,ySnapped:l,...s}}var af=e=>({width:e.offsetWidth,height:e.offsetHeight}),of=e=>e?.getRootNode?.()||window?.document,sf=[`INPUT`,`SELECT`,`TEXTAREA`];function cf(e){let t=e.composedPath?.()?.[0]||e.target;return t?.nodeType===1?sf.includes(t.nodeName)||t.hasAttribute(`contenteditable`)||!!t.closest(`.nokey`):!1}var lf=e=>`clientX`in e,uf=(e,t)=>{let n=lf(e),r=n?e.clientX:e.touches?.[0].clientX,i=n?e.clientY:e.touches?.[0].clientY;return{x:r-(t?.left??0),y:i-(t?.top??0)}},df=(e,t,n,r,i)=>{let a=t.querySelectorAll(`.${e}`);return!a||!a.length?null:Array.from(a).map(t=>{let a=t.getBoundingClientRect();return{id:t.getAttribute(`data-handleid`),type:e,nodeId:i,position:t.getAttribute(`data-handlepos`),x:(a.left-n.left)/r,y:(a.top-n.top)/r,...af(t)}})};function ff({sourceX:e,sourceY:t,targetX:n,targetY:r,sourceControlX:i,sourceControlY:a,targetControlX:o,targetControlY:s}){let c=e*.125+i*.375+o*.375+n*.125,l=t*.125+a*.375+s*.375+r*.125;return[c,l,Math.abs(c-e),Math.abs(l-t)]}function pf(e,t){return e>=0?.5*e:t*25*Math.sqrt(-e)}function mf({pos:e,x1:t,y1:n,x2:r,y2:i,c:a}){switch(e){case Z.Left:return[t-pf(t-r,a),n];case Z.Right:return[t+pf(r-t,a),n];case Z.Top:return[t,n-pf(n-i,a)];case Z.Bottom:return[t,n+pf(i-n,a)]}}function hf({sourceX:e,sourceY:t,sourcePosition:n=Z.Bottom,targetX:r,targetY:i,targetPosition:a=Z.Top,curvature:o=.25}){let[s,c]=mf({pos:n,x1:e,y1:t,x2:r,y2:i,c:o}),[l,u]=mf({pos:a,x1:r,y1:i,x2:e,y2:t,c:o}),[d,f,p,m]=ff({sourceX:e,sourceY:t,targetX:r,targetY:i,sourceControlX:s,sourceControlY:c,targetControlX:l,targetControlY:u});return[`M${e},${t} C${s},${c} ${l},${u} ${r},${i}`,d,f,p,m]}function gf({sourceX:e,sourceY:t,targetX:n,targetY:r}){let i=Math.abs(n-e)/2,a=n<e?n+i:n-i,o=Math.abs(r-t)/2;return[a,r<t?r+o:r-o,i,o]}function _f({sourceNode:e,targetNode:t,selected:n=!1,zIndex:r=0,elevateOnSelect:i=!1,zIndexMode:a=`basic`}){return a===`manual`?r:(i&&n?r+1e3:r)+Math.max(e.parentId||i&&e.selected?e.internals.z:0,t.parentId||i&&t.selected?t.internals.z:0)}function vf({sourceNode:e,targetNode:t,width:n,height:r,transform:i}){let a=Pd(Rd(e),Rd(t));return a.x===a.x2&&(a.x2+=1),a.y===a.y2&&(a.y2+=1),Bd({x:-i[0]/i[2],y:-i[1]/i[2],width:n/i[2],height:r/i[2]},Id(a))>0}var yf=({source:e,sourceHandle:t,target:n,targetHandle:r})=>`xy-edge__${e}${t||``}-${n}${r||``}`,bf=(e,t)=>t.some(t=>t.source===e.source&&t.target===e.target&&(t.sourceHandle===e.sourceHandle||!t.sourceHandle&&!e.sourceHandle)&&(t.targetHandle===e.targetHandle||!t.targetHandle&&!e.targetHandle)),xf=(e,t,n={})=>{if(!e.source||!e.target)return rd.error006(),t;let r=n.getEdgeId||yf,i;return i=_d(e)?{...e}:{...e,id:r(e)},bf(i,t)?t:(i.sourceHandle===null&&delete i.sourceHandle,i.targetHandle===null&&delete i.targetHandle,t.concat(i))};function Sf({sourceX:e,sourceY:t,targetX:n,targetY:r}){let[i,a,o,s]=gf({sourceX:e,sourceY:t,targetX:n,targetY:r});return[`M ${e},${t}L ${n},${r}`,i,a,o,s]}var Cf={[Z.Left]:{x:-1,y:0},[Z.Right]:{x:1,y:0},[Z.Top]:{x:0,y:-1},[Z.Bottom]:{x:0,y:1}},wf=({source:e,sourcePosition:t=Z.Bottom,target:n})=>t===Z.Left||t===Z.Right?e.x<n.x?{x:1,y:0}:{x:-1,y:0}:e.y<n.y?{x:0,y:1}:{x:0,y:-1},Tf=(e,t)=>Math.sqrt((t.x-e.x)**2+(t.y-e.y)**2);function Ef({source:e,sourcePosition:t=Z.Bottom,target:n,targetPosition:r=Z.Top,center:i,offset:a,stepPosition:o}){let s=Cf[t],c=Cf[r],l={x:e.x+s.x*a,y:e.y+s.y*a},u={x:n.x+c.x*a,y:n.y+c.y*a},d=wf({source:l,sourcePosition:t,target:u}),f=d.x===0?`y`:`x`,p=d[f],m=[],h,g,_={x:0,y:0},v={x:0,y:0},[,,y,b]=gf({sourceX:e.x,sourceY:e.y,targetX:n.x,targetY:n.y});if(s[f]*c[f]===-1){f===`x`?(h=i.x??l.x+(u.x-l.x)*o,g=i.y??(l.y+u.y)/2):(h=i.x??(l.x+u.x)/2,g=i.y??l.y+(u.y-l.y)*o);let e=[{x:h,y:l.y},{x:h,y:u.y}],t=[{x:l.x,y:g},{x:u.x,y:g}];m=s[f]===p?f===`x`?e:t:f===`x`?t:e}else{let i=[{x:l.x,y:u.y}],o=[{x:u.x,y:l.y}];if(m=f===`x`?s.x===p?o:i:s.y===p?i:o,t===r){let t=Math.abs(e[f]-n[f]);if(t<=a){let r=Math.min(a-1,a-t);s[f]===p?_[f]=(l[f]>e[f]?-1:1)*r:v[f]=(u[f]>n[f]?-1:1)*r}}if(t!==r){let e=f===`x`?`y`:`x`,t=s[f]===c[e],n=l[e]>u[e],r=l[e]<u[e];(s[f]===1&&(!t&&n||t&&r)||s[f]!==1&&(!t&&r||t&&n))&&(m=f===`x`?i:o)}let d={x:l.x+_.x,y:l.y+_.y},y={x:u.x+v.x,y:u.y+v.y};Math.max(Math.abs(d.x-m[0].x),Math.abs(y.x-m[0].x))>=Math.max(Math.abs(d.y-m[0].y),Math.abs(y.y-m[0].y))?(h=(d.x+y.x)/2,g=m[0].y):(h=m[0].x,g=(d.y+y.y)/2)}let x={x:l.x+_.x,y:l.y+_.y},S={x:u.x+v.x,y:u.y+v.y};return[[e,...x.x!==m[0].x||x.y!==m[0].y?[x]:[],...m,...S.x!==m[m.length-1].x||S.y!==m[m.length-1].y?[S]:[],n],h,g,y,b]}function Df(e,t,n,r){let i=Math.min(Tf(e,t)/2,Tf(t,n)/2,r),{x:a,y:o}=t;if(e.x===a&&a===n.x||e.y===o&&o===n.y)return`L${a} ${o}`;if(e.y===o){let t=e.x<n.x?-1:1,r=e.y<n.y?1:-1;return`L ${a+i*t},${o}Q ${a},${o} ${a},${o+i*r}`}let s=e.x<n.x?1:-1;return`L ${a},${o+i*(e.y<n.y?-1:1)}Q ${a},${o} ${a+i*s},${o}`}function Of({sourceX:e,sourceY:t,sourcePosition:n=Z.Bottom,targetX:r,targetY:i,targetPosition:a=Z.Top,borderRadius:o=5,centerX:s,centerY:c,offset:l=20,stepPosition:u=.5}){let[d,f,p,m,h]=Ef({source:{x:e,y:t},sourcePosition:n,target:{x:r,y:i},targetPosition:a,center:{x:s,y:c},offset:l,stepPosition:u}),g=`M${d[0].x} ${d[0].y}`;for(let e=1;e<d.length-1;e++)g+=Df(d[e-1],d[e],d[e+1],o);return g+=`L${d[d.length-1].x} ${d[d.length-1].y}`,[g,f,p,m,h]}function kf(e){return e&&!!(e.internals.handleBounds||e.handles?.length)&&!!(e.measured.width||e.width||e.initialWidth)}function Af(e){let{sourceNode:t,targetNode:n}=e;if(!kf(t)||!kf(n))return null;let r=t.internals.handleBounds||jf(t.handles),i=n.internals.handleBounds||jf(n.handles),a=Nf(r?.source??[],e.sourceHandle),o=Nf(e.connectionMode===sd.Strict?i?.target??[]:(i?.target??[]).concat(i?.source??[]),e.targetHandle);if(!a||!o)return e.onError?.(`008`,rd.error008(a?`target`:`source`,{id:e.id,sourceHandle:e.sourceHandle,targetHandle:e.targetHandle})),null;let s=a?.position||Z.Bottom,c=o?.position||Z.Top,l=Mf(t,a,s),u=Mf(n,o,c);return{sourceX:l.x,sourceY:l.y,targetX:u.x,targetY:u.y,sourcePosition:s,targetPosition:c}}function jf(e){if(!e)return null;let t=[],n=[];for(let r of e)r.width=r.width??1,r.height=r.height??1,r.type===`source`?t.push(r):r.type===`target`&&n.push(r);return{source:t,target:n}}function Mf(e,t,n=Z.Left,r=!1){let i=(t?.x??0)+e.internals.positionAbsolute.x,a=(t?.y??0)+e.internals.positionAbsolute.y,{width:o,height:s}=t??$d(e);if(r)return{x:i+o/2,y:a+s/2};switch(t?.position??n){case Z.Top:return{x:i+o/2,y:a};case Z.Right:return{x:i+o,y:a+s/2};case Z.Bottom:return{x:i+o/2,y:a+s};case Z.Left:return{x:i,y:a+s/2}}}function Nf(e,t){return e&&(t?e.find(e=>e.id===t):e[0])||null}function Pf(e,t){return e?typeof e==`string`?e:`${t?`${t}__`:``}${Object.keys(e).sort().map(t=>`${t}=${e[t]}`).join(`&`)}`:``}function Ff(e,{id:t,defaultColor:n,defaultMarkerStart:r,defaultMarkerEnd:i}){let a=new Set;return e.reduce((e,o)=>([o.markerStart||r,o.markerEnd||i].forEach(r=>{if(r&&typeof r==`object`){let i=Pf(r,t);a.has(i)||(e.push({id:i,color:r.color||n,...r}),a.add(i))}}),e),[]).sort((e,t)=>e.id.localeCompare(t.id))}var If=1e3,Lf=10,Rf={nodeOrigin:[0,0],nodeExtent:id,elevateNodesOnSelect:!0,zIndexMode:`basic`,defaults:{}},zf={...Rf,checkEquality:!0};function Bf(e,t){let n={...e};for(let e in t)t[e]!==void 0&&(n[e]=t[e]);return n}function Vf(e,t,n){let r=Bf(Rf,n);for(let n of e.values())if(n.parentId)Kf(n,e,t,r);else{let e=Ad(bd(n,r.nodeOrigin),Qd(n.extent)?n.extent:r.nodeExtent,$d(n));n.internals.positionAbsolute=e}}function Hf(e,t){if(!e.handles)return e.measured?t?.internals.handleBounds:void 0;let n=[],r=[];for(let t of e.handles){let i={id:t.id,width:t.width??1,height:t.height??1,nodeId:e.id,x:t.x,y:t.y,position:t.position,type:t.type};t.type===`source`?n.push(i):t.type===`target`&&r.push(i)}return{source:n,target:r}}function Uf(e){return e===`manual`}function Wf(e,t,n,r={}){let i=Bf(zf,r),a={i:0},o=new Map(t),s=i?.elevateNodesOnSelect&&!Uf(i.zIndexMode)?If:0,c=e.length>0,l=!1;t.clear(),n.clear();for(let u of e){let e=o.get(u.id);if(i.checkEquality&&u===e?.internals.userNode)t.set(u.id,e);else{let n=Ad(bd(u,i.nodeOrigin),Qd(u.extent)?u.extent:i.nodeExtent,$d(u));e={...i.defaults,...u,measured:{width:u.measured?.width,height:u.measured?.height},internals:{positionAbsolute:n,handleBounds:Hf(u,e),z:qf(u,s,i.zIndexMode),userNode:u}},t.set(u.id,e)}(e.measured===void 0||e.measured.width===void 0||e.measured.height===void 0)&&!e.hidden&&(c=!1),u.parentId&&Kf(e,t,n,r,a),l||=u.selected??!1}return{nodesInitialized:c,hasSelectedNodes:l}}function Gf(e,t){if(!e.parentId)return;let n=t.get(e.parentId);n?n.set(e.id,e):t.set(e.parentId,new Map([[e.id,e]]))}function Kf(e,t,n,r,i){let{elevateNodesOnSelect:a,nodeOrigin:o,nodeExtent:s,zIndexMode:c}=Bf(Rf,r),l=e.parentId,u=t.get(l);if(!u){console.warn(`Parent node ${l} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);return}Gf(e,n),i&&!u.parentId&&u.internals.rootParentIndex===void 0&&c===`auto`&&(u.internals.rootParentIndex=++i.i,u.internals.z=u.internals.z+i.i*Lf),i&&u.internals.rootParentIndex!==void 0&&(i.i=u.internals.rootParentIndex);let{x:d,y:f,z:p}=Jf(e,u,o,s,a&&!Uf(c)?If:0,c),{positionAbsolute:m}=e.internals,h=d!==m.x||f!==m.y;(h||p!==e.internals.z)&&t.set(e.id,{...e,internals:{...e.internals,positionAbsolute:h?{x:d,y:f}:m,z:p}})}function qf(e,t,n){let r=Hd(e.zIndex)?e.zIndex:0;return Uf(n)?r:r+(e.selected?t:0)}function Jf(e,t,n,r,i,a){let{x:o,y:s}=t.internals.positionAbsolute,c=$d(e),l=bd(e,n),u=Qd(e.extent)?Ad(l,e.extent,c):l,d=Ad({x:o+u.x,y:s+u.y},r,c);e.extent===`parent`&&(d=jd(d,c,t));let f=qf(e,i,a),p=t.internals.z??0;return{x:d.x,y:d.y,z:p>=f?p+1:f}}function Yf(e,t,n,r=[0,0]){let i=[],a=new Map;for(let n of e){let e=t.get(n.parentId);if(!e)continue;let r=zd(a.get(n.parentId)?.expandedRect??Ld(e),n.rect);a.set(n.parentId,{expandedRect:r,parent:e})}return a.size>0&&a.forEach(({expandedRect:t,parent:a},o)=>{let s=a.internals.positionAbsolute,c=$d(a),l=a.origin??r,u=t.x<s.x?Math.round(Math.abs(s.x-t.x)):0,d=t.y<s.y?Math.round(Math.abs(s.y-t.y)):0,f=Math.max(c.width,Math.round(t.width)),p=Math.max(c.height,Math.round(t.height)),m=(f-c.width)*l[0],h=(p-c.height)*l[1];(u>0||d>0||m||h)&&(i.push({id:o,type:`position`,position:{x:a.position.x-u+m,y:a.position.y-d+h}}),n.get(o)?.forEach(t=>{e.some(e=>e.id===t.id)||i.push({id:t.id,type:`position`,position:{x:t.position.x+u,y:t.position.y+d}})})),(c.width<t.width||c.height<t.height||u||d)&&i.push({id:o,type:`dimensions`,setAttributes:!0,dimensions:{width:f+(u?l[0]*u-m:0),height:p+(d?l[1]*d-h:0)}})}),i}function Xf(e,t,n,r,i,a,o){let s=r?.querySelector(`.xyflow__viewport`),c=!1;if(!s)return{changes:[],updatedInternals:c};let l=[],u=window.getComputedStyle(s),{m22:d}=new window.DOMMatrixReadOnly(u.transform),f=[];for(let r of e.values()){let e=t.get(r.id);if(!e)continue;if(e.hidden){t.set(e.id,{...e,internals:{...e.internals,handleBounds:void 0}}),c=!0;continue}let s=af(r.nodeElement),u=e.measured.width!==s.width||e.measured.height!==s.height;if(s.width&&s.height&&(u||!e.internals.handleBounds||r.force)){let p=r.nodeElement.getBoundingClientRect(),m=Qd(e.extent)?e.extent:a,{positionAbsolute:h}=e.internals;e.parentId&&e.extent===`parent`?h=jd(h,s,t.get(e.parentId)):m&&(h=Ad(h,m,s));let g={...e,measured:s,internals:{...e.internals,positionAbsolute:h,handleBounds:{source:df(`source`,r.nodeElement,p,d,e.id),target:df(`target`,r.nodeElement,p,d,e.id)}}};t.set(e.id,g),e.parentId&&Kf(g,t,n,{nodeOrigin:i,zIndexMode:o}),c=!0,u&&(l.push({id:e.id,type:`dimensions`,dimensions:s}),e.expandParent&&e.parentId&&f.push({id:e.id,parentId:e.parentId,rect:Ld(g,i)}))}}if(f.length>0){let e=Yf(f,t,n,i);l.push(...e)}return{changes:l,updatedInternals:c}}async function Zf({delta:e,panZoom:t,transform:n,translateExtent:r,width:i,height:a}){if(!t||!e.x&&!e.y)return Promise.resolve(!1);let o=await t.setViewportConstrained({x:n[0]+e.x,y:n[1]+e.y,zoom:n[2]},[[0,0],[i,a]],r),s=!!o&&(o.x!==n[0]||o.y!==n[1]||o.k!==n[2]);return Promise.resolve(s)}function Qf(e,t,n,r,i,a){let o=i,s=r.get(o)||new Map;r.set(o,s.set(n,t)),o=`${i}-${e}`;let c=r.get(o)||new Map;if(r.set(o,c.set(n,t)),a){o=`${i}-${e}-${a}`;let s=r.get(o)||new Map;r.set(o,s.set(n,t))}}function $f(e,t,n){e.clear(),t.clear();for(let r of n){let{source:n,target:i,sourceHandle:a=null,targetHandle:o=null}=r,s={edgeId:r.id,source:n,target:i,sourceHandle:a,targetHandle:o},c=`${n}-${a}--${i}-${o}`;Qf(`source`,s,`${i}-${o}--${n}-${a}`,e,n,a),Qf(`target`,s,c,e,i,o),t.set(r.id,r)}}function ep(e,t){if(!e.parentId)return!1;let n=t.get(e.parentId);return n?n.selected?!0:ep(n,t):!1}function tp(e,t,n){let r=e;do{if(r?.matches?.(t))return!0;if(r===n)return!1;r=r?.parentElement}while(r);return!1}function np(e,t,n,r){let i=new Map;for(let[a,o]of e)if((o.selected||o.id===r)&&(!o.parentId||!ep(o,e))&&(o.draggable||t&&o.draggable===void 0)){let t=e.get(a);t&&i.set(a,{id:a,position:t.position||{x:0,y:0},distance:{x:n.x-t.internals.positionAbsolute.x,y:n.y-t.internals.positionAbsolute.y},extent:t.extent,parentId:t.parentId,origin:t.origin,expandParent:t.expandParent,internals:{positionAbsolute:t.internals.positionAbsolute||{x:0,y:0}},measured:{width:t.measured.width??0,height:t.measured.height??0}})}return i}function rp({nodeId:e,dragItems:t,nodeLookup:n,dragging:r=!0}){let i=[];for(let[e,a]of t){let t=n.get(e)?.internals.userNode;t&&i.push({...t,position:a.position,dragging:r})}if(!e)return[i[0],i];let a=n.get(e)?.internals.userNode;return[a?{...a,position:t.get(e)?.position||a.position,dragging:r}:i[0],i]}function ip({dragItems:e,snapGrid:t,x:n,y:r}){let i=e.values().next().value;if(!i)return null;let a={x:n-i.distance.x,y:r-i.distance.y},o=Wd(a,t);return{x:o.x-a.x,y:o.y-a.y}}function ap({onNodeMouseDown:e,getStoreItems:t,onDragStart:n,onDrag:r,onDragStop:i}){let a={x:null,y:null},o=0,s=new Map,c=!1,l={x:0,y:0},u=null,d=!1,f=null,p=!1,m=!1,h=null;function g({noDragClassName:g,handleSelector:_,domNode:v,isSelectable:y,nodeId:b,nodeClickDistance:x=0}){f=ws(v);function S({x:e,y:n}){let{nodeLookup:i,nodeExtent:o,snapGrid:c,snapToGrid:l,nodeOrigin:u,onNodeDrag:d,onSelectionDrag:f,onError:p,updateNodePositions:g}=t();a={x:e,y:n};let _=!1,v=s.size>1,y=v&&o?Fd(Sd(s)):null,x=v&&l?ip({dragItems:s,snapGrid:c,x:e,y:n}):null;for(let[t,r]of s){if(!i.has(t))continue;let a={x:e-r.distance.x,y:n-r.distance.y};l&&(a=x?{x:Math.round(a.x+x.x),y:Math.round(a.y+x.y)}:Wd(a,c));let s=null;if(v&&o&&!r.extent&&y){let{positionAbsolute:e}=r.internals,t=e.x-y.x+o[0][0],n=e.x+r.measured.width-y.x2+o[1][0],i=e.y-y.y+o[0][1],a=e.y+r.measured.height-y.y2+o[1][1];s=[[t,i],[n,a]]}let{position:d,positionAbsolute:f}=Dd({nodeId:t,nextPosition:a,nodeLookup:i,nodeExtent:s||o,nodeOrigin:u,onError:p});_=_||r.position.x!==d.x||r.position.y!==d.y,r.position=d,r.internals.positionAbsolute=f}if(m||=_,_&&(g(s,!0),h&&(r||d||!b&&f))){let[e,t]=rp({nodeId:b,dragItems:s,nodeLookup:i});r?.(h,s,e,t),d?.(h,e,t),b||f?.(h,t)}}async function C(){if(!u)return;let{transform:e,panBy:n,autoPanSpeed:r,autoPanOnNodeDrag:i}=t();if(!i){c=!1,cancelAnimationFrame(o);return}let[s,d]=Nd(l,u,r);(s!==0||d!==0)&&(a.x=(a.x??0)-s/e[2],a.y=(a.y??0)-d/e[2],await n({x:s,y:d})&&S(a)),o=requestAnimationFrame(C)}function w(r){let{nodeLookup:i,multiSelectionActive:o,nodesDraggable:c,transform:l,snapGrid:f,snapToGrid:p,selectNodesOnDrag:m,onNodeDragStart:h,onSelectionDragStart:g,unselectNodesAndEdges:_}=t();d=!0,(!m||!y)&&!o&&b&&(i.get(b)?.selected||_()),y&&m&&b&&e?.(b);let v=rf(r.sourceEvent,{transform:l,snapGrid:f,snapToGrid:p,containerBounds:u});if(a=v,s=np(i,c,v,b),s.size>0&&(n||h||!b&&g)){let[e,t]=rp({nodeId:b,dragItems:s,nodeLookup:i});n?.(r.sourceEvent,s,e,t),h?.(r.sourceEvent,e,t),b||g?.(r.sourceEvent,t)}}let T=zs().clickDistance(x).on(`start`,e=>{let{domNode:n,nodeDragThreshold:r,transform:i,snapGrid:o,snapToGrid:s}=t();u=n?.getBoundingClientRect()||null,p=!1,m=!1,h=e.sourceEvent,r===0&&w(e),a=rf(e.sourceEvent,{transform:i,snapGrid:o,snapToGrid:s,containerBounds:u}),l=uf(e.sourceEvent,u)}).on(`drag`,e=>{let{autoPanOnNodeDrag:n,transform:r,snapGrid:i,snapToGrid:o,nodeDragThreshold:f,nodeLookup:m}=t(),g=rf(e.sourceEvent,{transform:r,snapGrid:i,snapToGrid:o,containerBounds:u});if(h=e.sourceEvent,(e.sourceEvent.type===`touchmove`&&e.sourceEvent.touches.length>1||b&&!m.has(b))&&(p=!0),!p){if(!c&&n&&d&&(c=!0,C()),!d){let t=uf(e.sourceEvent,u),n=t.x-l.x,r=t.y-l.y;Math.sqrt(n*n+r*r)>f&&w(e)}(a.x!==g.xSnapped||a.y!==g.ySnapped)&&s&&d&&(l=uf(e.sourceEvent,u),S(g))}}).on(`end`,e=>{if(!(!d||p)&&(c=!1,d=!1,cancelAnimationFrame(o),s.size>0)){let{nodeLookup:n,updateNodePositions:r,onNodeDragStop:a,onSelectionDragStop:o}=t();if(m&&=(r(s,!1),!1),i||a||!b&&o){let[t,r]=rp({nodeId:b,dragItems:s,nodeLookup:n,dragging:!1});i?.(e.sourceEvent,s,t,r),a?.(e.sourceEvent,t,r),b||o?.(e.sourceEvent,r)}}}).filter(e=>{let t=e.target;return!e.button&&(!g||!tp(t,`.${g}`,v))&&(!_||tp(t,_,v))});f.call(T)}function _(){f?.on(`.drag`,null)}return{update:g,destroy:_}}function op(e,t,n){let r=[],i={x:e.x-n,y:e.y-n,width:n*2,height:n*2};for(let e of t.values())Bd(i,Ld(e))>0&&r.push(e);return r}var sp=250;function cp(e,t,n,r){let i=[],a=1/0,o=op(e,n,t+sp);for(let n of o){let o=[...n.internals.handleBounds?.source??[],...n.internals.handleBounds?.target??[]];for(let s of o){if(r.nodeId===s.nodeId&&r.type===s.type&&r.id===s.id)continue;let{x:o,y:c}=Mf(n,s,s.position,!0),l=Math.sqrt((o-e.x)**2+(c-e.y)**2);l>t||(l<a?(i=[{...s,x:o,y:c}],a=l):l===a&&i.push({...s,x:o,y:c}))}}if(!i.length)return null;if(i.length>1){let e=r.type===`source`?`target`:`source`;return i.find(t=>t.type===e)??i[0]}return i[0]}function lp(e,t,n,r,i,a=!1){let o=r.get(e);if(!o)return null;let s=i===`strict`?o.internals.handleBounds?.[t]:[...o.internals.handleBounds?.source??[],...o.internals.handleBounds?.target??[]],c=(n?s?.find(e=>e.id===n):s?.[0])??null;return c&&a?{...c,...Mf(o,c,c.position,!0)}:c}function up(e,t){return e||(t?.classList.contains(`target`)?`target`:t?.classList.contains(`source`)?`source`:null)}function dp(e,t){let n=null;return t?n=!0:e&&!t&&(n=!1),n}var fp=()=>!0;function pp(e,{connectionMode:t,connectionRadius:n,handleId:r,nodeId:i,edgeUpdaterType:a,isTarget:o,domNode:s,nodeLookup:c,lib:l,autoPanOnConnect:u,flowId:d,panBy:f,cancelConnection:p,onConnectStart:m,onConnect:h,onConnectEnd:g,isValidConnection:_=fp,onReconnectEnd:v,updateConnection:y,getTransform:b,getFromHandle:x,autoPanSpeed:S,dragThreshold:C=1,handleDomNode:w}){let T=of(e.target),ee=0,E,{x:te,y:ne}=uf(e),D=up(a,w),re=s?.getBoundingClientRect(),ie=!1;if(!re||!D)return;let ae=lp(i,D,r,c,t);if(!ae)return;let oe=uf(e,re),se=!1,ce=null,le=!1,ue=null;function de(){if(!u||!re)return;let[e,t]=Nd(oe,re,S);f({x:e,y:t}),ee=requestAnimationFrame(de)}let fe={...ae,nodeId:i,type:D,position:ae.position},pe=c.get(i),me={inProgress:!0,isValid:null,from:Mf(pe,fe,Z.Left,!0),fromHandle:fe,fromPosition:fe.position,fromNode:pe,to:oe,toHandle:null,toPosition:pd[fe.position],toNode:null,pointer:oe};function he(){ie=!0,y(me),m?.(e,{nodeId:i,handleId:r,handleType:D})}C===0&&he();function ge(e){if(!ie){let{x:t,y:n}=uf(e),r=t-te,i=n-ne;if(!(r*r+i*i>C*C))return;he()}if(!x()||!fe){_e(e);return}let a=b();oe=uf(e,re),E=cp(Gd(oe,a,!1,[1,1]),n,c,fe),se||=(de(),!0);let s=mp(e,{handle:E,connectionMode:t,fromNodeId:i,fromHandleId:r,fromType:o?`target`:`source`,isValidConnection:_,doc:T,lib:l,flowId:d,nodeLookup:c});ue=s.handleDomNode,ce=s.connection,le=dp(!!E,s.isValid);let u=c.get(i),f=u?Mf(u,fe,Z.Left,!0):me.from,p={...me,from:f,isValid:le,to:s.toHandle&&le?Kd({x:s.toHandle.x,y:s.toHandle.y},a):oe,toHandle:s.toHandle,toPosition:le&&s.toHandle?s.toHandle.position:pd[fe.position],toNode:s.toHandle?c.get(s.toHandle.nodeId):null,pointer:oe};y(p),me=p}function _e(e){if(!(`touches`in e&&e.touches.length>0)){if(ie){(E||ue)&&ce&&le&&h?.(ce);let{inProgress:t,...n}=me,r={...n,toPosition:me.toHandle?me.toPosition:null};g?.(e,r),a&&v?.(e,r)}p(),cancelAnimationFrame(ee),se=!1,le=!1,ce=null,ue=null,T.removeEventListener(`mousemove`,ge),T.removeEventListener(`mouseup`,_e),T.removeEventListener(`touchmove`,ge),T.removeEventListener(`touchend`,_e)}}T.addEventListener(`mousemove`,ge),T.addEventListener(`mouseup`,_e),T.addEventListener(`touchmove`,ge),T.addEventListener(`touchend`,_e)}function mp(e,{handle:t,connectionMode:n,fromNodeId:r,fromHandleId:i,fromType:a,doc:o,lib:s,flowId:c,isValidConnection:l=fp,nodeLookup:u}){let d=a===`target`,f=t?o.querySelector(`.${s}-flow__handle[data-id="${c}-${t?.nodeId}-${t?.id}-${t?.type}"]`):null,{x:p,y:m}=uf(e),h=o.elementFromPoint(p,m),g=h?.classList.contains(`${s}-flow__handle`)?h:f,_={handleDomNode:g,isValid:!1,connection:null,toHandle:null};if(g){let e=up(void 0,g),t=g.getAttribute(`data-nodeid`),a=g.getAttribute(`data-handleid`),o=g.classList.contains(`connectable`),s=g.classList.contains(`connectableend`);if(!t||!e)return _;let c={source:d?t:r,sourceHandle:d?a:i,target:d?r:t,targetHandle:d?i:a};_.connection=c,_.isValid=o&&s&&(n===sd.Strict?d&&e===`source`||!d&&e===`target`:t!==r||a!==i)&&l(c),_.toHandle=lp(t,e,a,u,n,!0)}return _}var hp={onPointerDown:pp,isValid:mp};function gp({domNode:e,panZoom:t,getTransform:n,getViewScale:r}){let i=ws(e);function a({translateExtent:e,width:a,height:o,zoomStep:s=1,pannable:c=!0,zoomable:l=!0,inversePan:u=!1}){let d=e=>{if(e.sourceEvent.type!==`wheel`||!t)return;let r=n(),i=e.sourceEvent.ctrlKey&&Zd()?10:1,a=-e.sourceEvent.deltaY*(e.sourceEvent.deltaMode===1?.05:e.sourceEvent.deltaMode?1:.002)*s,o=r[2]*2**(a*i);t.scaleTo(o)},f=[0,0],p=nd().on(`start`,e=>{(e.sourceEvent.type===`mousedown`||e.sourceEvent.type===`touchstart`)&&(f=[e.sourceEvent.clientX??e.sourceEvent.touches[0].clientX,e.sourceEvent.clientY??e.sourceEvent.touches[0].clientY])}).on(`zoom`,c?i=>{let s=n();if(i.sourceEvent.type!==`mousemove`&&i.sourceEvent.type!==`touchmove`||!t)return;let c=[i.sourceEvent.clientX??i.sourceEvent.touches[0].clientX,i.sourceEvent.clientY??i.sourceEvent.touches[0].clientY],l=[c[0]-f[0],c[1]-f[1]];f=c;let d=r()*Math.max(s[2],Math.log(s[2]))*(u?-1:1),p={x:s[0]-l[0]*d,y:s[1]-l[1]*d},m=[[0,0],[a,o]];t.setViewportConstrained({x:p.x,y:p.y,zoom:s[2]},m,e)}:null).on(`zoom.wheel`,l?d:null);i.call(p,{})}function o(){i.on(`zoom`,null)}return{update:a,destroy:o,pointer:Es}}var _p=e=>({x:e.x,y:e.y,zoom:e.k}),vp=({x:e,y:t,zoom:n})=>Ku.translate(e,t).scale(n),yp=(e,t)=>e.target.closest(`.${t}`),bp=(e,t)=>t===2&&Array.isArray(e)&&e.includes(2),xp=e=>((e*=2)<=1?e*e*e:(e-=2)*e*e+2)/2,Sp=(e,t=0,n=xp,r=()=>{})=>{let i=typeof t==`number`&&t>0;return i||r(),i?e.transition().duration(t).ease(n).on(`end`,r):e},Cp=e=>{let t=e.ctrlKey&&Zd()?10:1;return-e.deltaY*(e.deltaMode===1?.05:e.deltaMode?1:.002)*t};function wp({zoomPanValues:e,noWheelClassName:t,d3Selection:n,d3Zoom:r,panOnScrollMode:i,panOnScrollSpeed:a,zoomOnPinch:o,onPanZoomStart:s,onPanZoom:c,onPanZoomEnd:l}){return u=>{if(yp(u,t))return u.ctrlKey&&u.preventDefault(),!1;u.preventDefault(),u.stopImmediatePropagation();let d=n.property(`__zoom`).k||1;if(u.ctrlKey&&o){let e=Es(u),t=d*2**Cp(u);r.scaleTo(n,t,e,u);return}let f=u.deltaMode===1?20:1,p=i===cd.Vertical?0:u.deltaX*f,m=i===cd.Horizontal?0:u.deltaY*f;!Zd()&&u.shiftKey&&i!==cd.Vertical&&(p=u.deltaY*f,m=0),r.translateBy(n,-(p/d)*a,-(m/d)*a,{internal:!0});let h=_p(n.property(`__zoom`));clearTimeout(e.panScrollTimeout),e.isPanScrolling?(c?.(u,h),e.panScrollTimeout=setTimeout(()=>{l?.(u,h),e.isPanScrolling=!1},150)):(e.isPanScrolling=!0,s?.(u,h))}}function Tp({noWheelClassName:e,preventScrolling:t,d3ZoomHandler:n}){return function(r,i){let a=r.type===`wheel`,o=!t&&a&&!r.ctrlKey,s=yp(r,e);if(r.ctrlKey&&a&&s&&r.preventDefault(),o||s)return null;r.preventDefault(),n.call(this,r,i)}}function Ep({zoomPanValues:e,onDraggingChange:t,onPanZoomStart:n}){return r=>{if(r.sourceEvent?.internal)return;let i=_p(r.transform);e.mouseButton=r.sourceEvent?.button||0,e.isZoomingOrPanning=!0,e.prevViewport=i,r.sourceEvent?.type===`mousedown`&&t(!0),n&&n?.(r.sourceEvent,i)}}function Dp({zoomPanValues:e,panOnDrag:t,onPaneContextMenu:n,onTransformChange:r,onPanZoom:i}){return a=>{e.usedRightMouseButton=!!(n&&bp(t,e.mouseButton??0)),a.sourceEvent?.sync||r([a.transform.x,a.transform.y,a.transform.k]),i&&!a.sourceEvent?.internal&&i?.(a.sourceEvent,_p(a.transform))}}function Op({zoomPanValues:e,panOnDrag:t,panOnScroll:n,onDraggingChange:r,onPanZoomEnd:i,onPaneContextMenu:a}){return o=>{if(!o.sourceEvent?.internal&&(e.isZoomingOrPanning=!1,a&&bp(t,e.mouseButton??0)&&!e.usedRightMouseButton&&o.sourceEvent&&a(o.sourceEvent),e.usedRightMouseButton=!1,r(!1),i)){let t=_p(o.transform);e.prevViewport=t,clearTimeout(e.timerId),e.timerId=setTimeout(()=>{i?.(o.sourceEvent,t)},n?150:0)}}}function kp({zoomActivationKeyPressed:e,zoomOnScroll:t,zoomOnPinch:n,panOnDrag:r,panOnScroll:i,zoomOnDoubleClick:a,userSelectionActive:o,noWheelClassName:s,noPanClassName:c,lib:l,connectionInProgress:u}){return d=>{let f=e||t,p=n&&d.ctrlKey,m=d.type===`wheel`;if(d.button===1&&d.type===`mousedown`&&(yp(d,`${l}-flow__node`)||yp(d,`${l}-flow__edge`)))return!0;if(!r&&!f&&!i&&!a&&!n||o||u&&!m||yp(d,s)&&m||yp(d,c)&&(!m||i&&m&&!e)||!n&&d.ctrlKey&&m)return!1;if(!n&&d.type===`touchstart`&&d.touches?.length>1)return d.preventDefault(),!1;if(!f&&!i&&!p&&m||!r&&(d.type===`mousedown`||d.type===`touchstart`)||Array.isArray(r)&&!r.includes(d.button)&&d.type===`mousedown`)return!1;let h=Array.isArray(r)&&r.includes(d.button)||!d.button||d.button<=1;return(!d.ctrlKey||m)&&h}}function Ap({domNode:e,minZoom:t,maxZoom:n,translateExtent:r,viewport:i,onPanZoom:a,onPanZoomStart:o,onPanZoomEnd:s,onDraggingChange:c}){let l={isZoomingOrPanning:!1,usedRightMouseButton:!1,prevViewport:{x:0,y:0,zoom:0},mouseButton:0,timerId:void 0,panScrollTimeout:void 0,isPanScrolling:!1},u=e.getBoundingClientRect(),d=nd().scaleExtent([t,n]).translateExtent(r),f=ws(e).call(d);v({x:i.x,y:i.y,zoom:kd(i.zoom,t,n)},[[0,0],[u.width,u.height]],r);let p=f.on(`wheel.zoom`),m=f.on(`dblclick.zoom`);d.wheelDelta(Cp);function h(e,t){return f?new Promise(n=>{d?.interpolate(t?.interpolate===`linear`?Hc:nl).transform(Sp(f,t?.duration,t?.ease,()=>n(!0)),e)}):Promise.resolve(!1)}function g({noWheelClassName:e,noPanClassName:t,onPaneContextMenu:n,userSelectionActive:r,panOnScroll:i,panOnDrag:u,panOnScrollMode:h,panOnScrollSpeed:g,preventScrolling:v,zoomOnPinch:y,zoomOnScroll:b,zoomOnDoubleClick:x,zoomActivationKeyPressed:S,lib:C,onTransformChange:w,connectionInProgress:T,paneClickDistance:ee,selectionOnDrag:E}){r&&!l.isZoomingOrPanning&&_();let te=i&&!S&&!r;d.clickDistance(E?1/0:!Hd(ee)||ee<0?0:ee);let ne=te?wp({zoomPanValues:l,noWheelClassName:e,d3Selection:f,d3Zoom:d,panOnScrollMode:h,panOnScrollSpeed:g,zoomOnPinch:y,onPanZoomStart:o,onPanZoom:a,onPanZoomEnd:s}):Tp({noWheelClassName:e,preventScrolling:v,d3ZoomHandler:p});if(f.on(`wheel.zoom`,ne,{passive:!1}),!r){let e=Ep({zoomPanValues:l,onDraggingChange:c,onPanZoomStart:o});d.on(`start`,e);let t=Dp({zoomPanValues:l,panOnDrag:u,onPaneContextMenu:!!n,onPanZoom:a,onTransformChange:w});d.on(`zoom`,t);let r=Op({zoomPanValues:l,panOnDrag:u,panOnScroll:i,onPaneContextMenu:n,onPanZoomEnd:s,onDraggingChange:c});d.on(`end`,r)}let D=kp({zoomActivationKeyPressed:S,panOnDrag:u,zoomOnScroll:b,panOnScroll:i,zoomOnDoubleClick:x,zoomOnPinch:y,userSelectionActive:r,noPanClassName:t,noWheelClassName:e,lib:C,connectionInProgress:T});d.filter(D),x?f.on(`dblclick.zoom`,m):f.on(`dblclick.zoom`,null)}function _(){d.on(`zoom`,null)}async function v(e,t,n){let r=vp(e),i=d?.constrain()(r,t,n);return i&&await h(i),new Promise(e=>e(i))}async function y(e,t){let n=vp(e);return await h(n,t),new Promise(e=>e(n))}function b(e){if(f){let t=vp(e),n=f.property(`__zoom`);(n.k!==e.zoom||n.x!==e.x||n.y!==e.y)&&d?.transform(f,t,null,{sync:!0})}}function x(){let e=f?qu(f.node()):{x:0,y:0,k:1};return{x:e.x,y:e.y,zoom:e.k}}function S(e,t){return f?new Promise(n=>{d?.interpolate(t?.interpolate===`linear`?Hc:nl).scaleTo(Sp(f,t?.duration,t?.ease,()=>n(!0)),e)}):Promise.resolve(!1)}function C(e,t){return f?new Promise(n=>{d?.interpolate(t?.interpolate===`linear`?Hc:nl).scaleBy(Sp(f,t?.duration,t?.ease,()=>n(!0)),e)}):Promise.resolve(!1)}function w(e){d?.scaleExtent(e)}function T(e){d?.translateExtent(e)}function ee(e){let t=!Hd(e)||e<0?0:e;d?.clickDistance(t)}return{update:g,destroy:_,setViewport:y,setViewportConstrained:v,getViewport:x,scaleTo:S,scaleBy:C,setScaleExtent:w,setTranslateExtent:T,syncViewport:b,setClickDistance:ee}}var jp;(function(e){e.Line=`line`,e.Handle=`handle`})(jp||={});function Mp(){let e={};return[t=>{if(t&&!Ze(e))throw Error(t);return Ye(e)},t=>Xe(e,t)]}var[Np,Pp]=Mp(),[Fp,Ip]=Mp(),[Lp,Rp]=Mp(),zp=G(`<div><!></div>`);function Bp(e,t){j(t,!0);let n=X(t,`id`,3,null),r=X(t,`type`,3,`source`),i=X(t,`position`,19,()=>Z.Top),a=X(t,`isConnectableStart`,3,!0),o=X(t,`isConnectableEnd`,3,!0),s=pa(t,[`$$slots`,`$$events`,`$$legacy`,`id`,`type`,`position`,`style`,`class`,`isConnectable`,`isConnectableStart`,`isConnectableEnd`,`isValidConnection`,`onconnect`,`ondisconnect`,`children`]),c=Np(`Handle must be used within a Custom Node component`),l=Fp(`Handle must be used within a Custom Node component`),u=P(()=>r()===`target`),d=P(()=>t.isConnectable===void 0?l.value:t.isConnectable),p=bm(),m=P(()=>p.ariaLabelConfig),h=null;Fn(()=>{if(t.onconnect||t.ondisconnect){p.edges;let e=p.connectionLookup.get(`${c}-${r()}${n()?`-${n()}`:``}`);if(h&&!md(e,h)){let n=e??new Map;hd(h,n,t.ondisconnect),hd(n,h,t.onconnect)}h=new Map(e)}});let g=P(()=>{if(!p.connection.inProgress)return[!1,!1,!1,!1,null];let{fromHandle:e,toHandle:t,isValid:i}=p.connection,a=e&&e.nodeId===c&&e.type===r()&&e.id===n(),o=t&&t.nodeId===c&&t.type===r()&&t.id===n();return[!0,a,o,p.connectionMode===sd.Strict?e?.type!==r():c!==e?.nodeId||n()!==e?.id,o&&i]}),v=P(()=>_(U(g),5)),y=P(()=>U(v)[0]),b=P(()=>U(v)[1]),x=P(()=>U(v)[2]),S=P(()=>U(v)[3]),C=P(()=>U(v)[4]);function w(e){let t=p.onbeforeconnect?p.onbeforeconnect(e):e;t&&(p.addEdge(t),p.onconnect?.(e))}function T(e){let r=lf(e);e.currentTarget&&(r&&e.button===0||!r)&&hp.onPointerDown(e,{handleId:n(),nodeId:c,isTarget:U(u),connectionRadius:p.connectionRadius,domNode:p.domNode,nodeLookup:p.nodeLookup,connectionMode:p.connectionMode,lib:`svelte`,autoPanOnConnect:p.autoPanOnConnect,autoPanSpeed:p.autoPanSpeed,flowId:p.flowId,isValidConnection:t.isValidConnection||((...e)=>p.isValidConnection?.(...e)??!0),updateConnection:p.updateConnection,cancelConnection:p.cancelConnection,panBy:p.panBy,onConnect:w,onConnectStart:p.onconnectstart,onConnectEnd:(...e)=>p.onconnectend?.(...e),getTransform:()=>[p.viewport.x,p.viewport.y,p.viewport.zoom],getFromHandle:()=>p.connection.fromHandle,dragThreshold:p.connectionDragThreshold,handleDomNode:e.currentTarget})}function ee(e){if(!c||!p.clickConnectStartHandle&&!a())return;if(!p.clickConnectStartHandle){p.onclickconnectstart?.(e,{nodeId:c,handleId:n(),handleType:r()}),p.clickConnectStartHandle={nodeId:c,type:r(),id:n()};return}let i=of(e.target),o=t.isValidConnection??p.isValidConnection,{connectionMode:s,clickConnectStartHandle:l,flowId:u,nodeLookup:d}=p,{connection:f,isValid:m}=hp.isValid(e,{handle:{nodeId:c,id:n(),type:r()},connectionMode:s,fromNodeId:l.nodeId,fromHandleId:l.id??null,fromType:l.type,isValidConnection:o,flowId:u,doc:i,lib:`svelte`,nodeLookup:d});m&&f&&w(f);let h=structuredClone(Ge(p.connection));delete h.inProgress,h.toPosition=h.toHandle?h.toHandle.position:null,p.onclickconnectend?.(e,h),p.clickConnectStartHandle=null}var E=zp(),te=()=>{};Zi(E,()=>({"data-handleid":n(),"data-nodeid":c,"data-handlepos":i(),"data-id":`${p.flowId??``}-${c??``}-${n()??`null`??``}-${r()??``}`,class:[`svelte-flow__handle`,`svelte-flow__handle-${i()}`,p.noDragClass,p.noPanClass,i(),t.class],onmousedown:T,ontouchstart:T,onclick:p.clickConnect?ee:void 0,onkeypress:te,style:t.style,role:`button`,"aria-label":U(m)[`handle.ariaLabel`],tabindex:`-1`,...s,[Ri]:{valid:U(C),connectingto:U(x),connectingfrom:U(b),source:!U(u),target:U(u),connectablestart:a(),connectableend:o(),connectable:U(d),connectionindicator:U(d)&&(!U(y)||U(S))&&(U(y)||p.clickConnectStartHandle?o():a())}})),yi(L(E),()=>t.children??f),A(E),K(e,E),M()}var Vp=G(`<!> <!>`,1);function Hp(e,t){j(t,!0);let n=X(t,`targetPosition`,19,()=>Z.Top),r=X(t,`sourcePosition`,19,()=>Z.Bottom);var i=Vp(),a=R(i);Bp(a,{type:`target`,get position(){return n()}});var o=z(a);Bp(z(o),{type:`source`,get position(){return r()}}),B(()=>q(o,` ${t.data?.label??``} `)),K(e,i),M()}var Up=G(` <!>`,1);function Wp(e,t){j(t,!0);let n=X(t,`data`,19,()=>({label:`Node`})),r=X(t,`sourcePosition`,19,()=>Z.Bottom);Fe();var i=Up(),a=R(i);Bp(z(a),{type:`source`,get position(){return r()}}),B(()=>q(a,`${n()?.label??``} `)),K(e,i),M()}var Gp=G(` <!>`,1);function Kp(e,t){j(t,!0);let n=X(t,`data`,19,()=>({label:`Node`})),r=X(t,`targetPosition`,19,()=>Z.Top);Fe();var i=Gp(),a=R(i);Bp(z(a),{type:`target`,get position(){return r()}}),B(()=>q(a,`${n()?.label??``} `)),K(e,i),M()}function qp(e,t){}function Jp(e,t,n){if(!n||!t)return;let r=n===`root`?t:t.querySelector(`.svelte-flow__${n}`);r&&r.appendChild(e)}function Yp(e,t){let n=P(bm),r=P(()=>U(n).domNode),i;return U(r)?Jp(e,U(r),t):i=In(()=>{Nn(()=>{Jp(e,U(r),t),i?.()})}),{async update(t){Jp(e,U(r),t)},destroy(){e.parentNode&&e.parentNode.removeChild(e),i?.()}}}function Xp(){let e=F(typeof window>`u`);if(U(e)){let t=In(()=>{Nn(()=>{I(e,!1),t?.()})})}return{get value(){return U(e)}}}var Zp=e=>vd(e),Qp=e=>_d(e);function $p(e){return e===void 0?void 0:`${e}px`}var em={ArrowUp:{x:0,y:-1},ArrowDown:{x:0,y:1},ArrowLeft:{x:-1,y:0},ArrowRight:{x:1,y:0}},tm=G(`<div><!></div>`);function nm(e,t){j(t,!0);let n=X(t,`x`,3,0),r=X(t,`y`,3,0),i=X(t,`selectEdgeOnClick`,3,!1),a=X(t,`transparent`,3,!1),o=pa(t,[`$$slots`,`$$events`,`$$legacy`,`x`,`y`,`width`,`height`,`selectEdgeOnClick`,`transparent`,`class`,`children`]),s=bm(),c=Lp(`EdgeLabel must be used within a Custom Edge component`),l=P(()=>s.visible.edges.get(c)?.zIndex);var u=tm(),d=()=>{i()&&c&&s.handleEdgeSelection(c)};Zi(u,e=>({class:[`svelte-flow__edge-label`,{transparent:a()},t.class],tabindex:`-1`,onclick:d,...o,[zi]:e}),[()=>({display:Xp().value?`none`:void 0,cursor:i()?`pointer`:void 0,transform:`translate(-50%, -50%) translate(${n()??``}px,${r()??``}px)`,"pointer-events":`all`,width:$p(t.width),height:$p(t.height),"z-index":U(l)})],void 0,void 0,`svelte-1wg91mu`),yi(L(u),()=>t.children??f),A(u),xi(u,(e,t)=>Yp?.(e,t),()=>`edge-labels`),K(e,u),M()}var rm=ei(`<path></path>`),im=ei(`<path fill="none"></path><!><!>`,1);function am(e,t){let n=X(t,`interactionWidth`,3,20),r=pa(t,[`$$slots`,`$$events`,`$$legacy`,`id`,`path`,`label`,`labelX`,`labelY`,`labelStyle`,`markerStart`,`markerEnd`,`style`,`interactionWidth`,`class`]);var i=im(),a=R(i),o=z(a),s=e=>{var i=rm();Zi(i,()=>({d:t.path,"stroke-opacity":0,"stroke-width":n(),fill:`none`,class:`svelte-flow__edge-interaction`,...r})),K(e,i)};J(o,e=>{n()>0&&e(s)});var c=z(o),l=e=>{nm(e,{get x(){return t.labelX},get y(){return t.labelY},get style(){return t.labelStyle},selectEdgeOnClick:!0,children:(e,n)=>{Fe();var r=ti();B(()=>q(r,t.label)),K(e,r)},$$slots:{default:!0}})};J(c,e=>{t.label&&e(l)}),B(()=>{Y(a,`id`,t.id),Y(a,`d`,t.path),ji(a,0,Ti([`svelte-flow__edge-path`,t.class])),Y(a,`marker-start`,t.markerStart),Y(a,`marker-end`,t.markerEnd),Ni(a,t.style)}),K(e,i)}function om(e,t){j(t,!0);let n=P(()=>hf({sourceX:t.sourceX,sourceY:t.sourceY,targetX:t.targetX,targetY:t.targetY,sourcePosition:t.sourcePosition,targetPosition:t.targetPosition,curvature:t.pathOptions?.curvature})),r=P(()=>_(U(n),3)),i=P(()=>U(r)[0]),a=P(()=>U(r)[1]),o=P(()=>U(r)[2]);am(e,{get id(){return t.id},get path(){return U(i)},get labelX(){return U(a)},get labelY(){return U(o)},get label(){return t.label},get labelStyle(){return t.labelStyle},get markerStart(){return t.markerStart},get markerEnd(){return t.markerEnd},get interactionWidth(){return t.interactionWidth},get style(){return t.style}}),M()}function sm(e,t){j(t,!0);let n=P(()=>Of({sourceX:t.sourceX,sourceY:t.sourceY,targetX:t.targetX,targetY:t.targetY,sourcePosition:t.sourcePosition,targetPosition:t.targetPosition})),r=P(()=>_(U(n),3)),i=P(()=>U(r)[0]),a=P(()=>U(r)[1]),o=P(()=>U(r)[2]);am(e,{get path(){return U(i)},get labelX(){return U(a)},get labelY(){return U(o)},get label(){return t.label},get labelStyle(){return t.labelStyle},get markerStart(){return t.markerStart},get markerEnd(){return t.markerEnd},get interactionWidth(){return t.interactionWidth},get style(){return t.style}}),M()}function cm(e,t){j(t,!0);let n=P(()=>Sf({sourceX:t.sourceX,sourceY:t.sourceY,targetX:t.targetX,targetY:t.targetY})),r=P(()=>_(U(n),3)),i=P(()=>U(r)[0]),a=P(()=>U(r)[1]),o=P(()=>U(r)[2]);am(e,{get path(){return U(i)},get labelX(){return U(a)},get labelY(){return U(o)},get label(){return t.label},get labelStyle(){return t.labelStyle},get markerStart(){return t.markerStart},get markerEnd(){return t.markerEnd},get interactionWidth(){return t.interactionWidth},get style(){return t.style}}),M()}function lm(e,t){j(t,!0);let n=P(()=>Of({sourceX:t.sourceX,sourceY:t.sourceY,targetX:t.targetX,targetY:t.targetY,sourcePosition:t.sourcePosition,targetPosition:t.targetPosition,borderRadius:0})),r=P(()=>_(U(n),3)),i=P(()=>U(r)[0]),a=P(()=>U(r)[1]),o=P(()=>U(r)[2]);am(e,{get path(){return U(i)},get labelX(){return U(a)},get labelY(){return U(o)},get label(){return t.label},get labelStyle(){return t.labelStyle},get markerStart(){return t.markerStart},get markerEnd(){return t.markerEnd},get interactionWidth(){return t.interactionWidth},get style(){return t.style}}),M()}var um=class{#e;#t;constructor(e,t){this.#e=e,this.#t=Ft(t)}get current(){return this.#t(),this.#e()}},dm=/\(.+\)/,fm=new Set([`all`,`print`,`screen`,`and`,`or`,`not`,`only`]),pm=class extends um{constructor(e,t){let n=dm.test(e)||e.split(/[\s,]+/).some(e=>fm.has(e.trim()))?e:`(${e})`,r=window.matchMedia(n);super(()=>r.matches,e=>Wr(r,`change`,e))}};function mm(e,t,n,r){let i=new Map;return Cd(e,{x:0,y:0,width:n,height:r},t,!0).forEach(e=>{i.set(e.id,e)}),i}function hm(e){let{edges:t,defaultEdgeOptions:n,nodeLookup:r,previousEdges:i,connectionMode:a,onerror:o,onlyRenderVisible:s,elevateEdgesOnSelect:c,zIndexMode:l}=e,u=new Map;for(let d of t){let t=r.get(d.source),f=r.get(d.target);if(!t||!f)continue;if(s){let{visibleNodes:n,transform:r,width:i,height:a}=e;if(vf({sourceNode:t,targetNode:f,width:i,height:a,transform:r}))n.set(t.id,t),n.set(f.id,f);else continue}let p=i.get(d.id);if(p&&d===p.edge&&t==p.sourceNode&&f==p.targetNode){u.set(d.id,p);continue}let m=Af({id:d.id,sourceNode:t,targetNode:f,sourceHandle:d.sourceHandle||null,targetHandle:d.targetHandle||null,connectionMode:a,onError:o});m&&u.set(d.id,{...n,...d,...m,zIndex:_f({selected:d.selected,zIndex:d.zIndex??n.zIndex,sourceNode:t,targetNode:f,elevateOnSelect:c,zIndexMode:l}),sourceNode:t,targetNode:f,edge:d})}return u}var gm={input:Wp,output:Kp,default:Hp,group:qp},_m={straight:cm,smoothstep:sm,default:om,step:lm};function vm(e,t,n,r,i,a){return t&&!n&&r&&i?Xd(Sd(a,{filter:e=>!!((e.width||e.initialWidth)&&(e.height||e.initialHeight))}),r,i,.5,2,.1):n??{x:0,y:0,zoom:1}}function ym(e){class t{#e=P(()=>e.props.id??`1`);get flowId(){return U(this.#e)}set flowId(e){I(this.#e,e)}#t=F(null);get domNode(){return U(this.#t)}set domNode(e){I(this.#t,e)}#n=F(null);get panZoom(){return U(this.#n)}set panZoom(e){I(this.#n,e)}#r=F(e.width??0);get width(){return U(this.#r)}set width(e){I(this.#r,e)}#i=F(e.height??0);get height(){return U(this.#i)}set height(e){I(this.#i,e)}#a=F(e.props.zIndexMode??`basic`);get zIndexMode(){return U(this.#a)}set zIndexMode(e){I(this.#a,e)}#o=P(()=>{let{nodesInitialized:t}=Wf(e.nodes,this.nodeLookup,this.parentLookup,{nodeExtent:this.nodeExtent,nodeOrigin:this.nodeOrigin,elevateNodesOnSelect:e.props.elevateNodesOnSelect??!0,checkEquality:!0,zIndexMode:this.zIndexMode});return this.fitViewQueued&&t&&(this.fitViewOptions?.duration?this.resolveFitView():queueMicrotask(()=>{this.resolveFitView()})),t});get nodesInitialized(){return U(this.#o)}set nodesInitialized(e){I(this.#o,e)}#s=P(()=>this.panZoom!==null);get viewportInitialized(){return U(this.#s)}set viewportInitialized(e){I(this.#s,e)}#c=P(()=>($f(this.connectionLookup,this.edgeLookup,e.edges),e.edges));get _edges(){return U(this.#c)}set _edges(e){I(this.#c,e)}get nodes(){return this.nodesInitialized,e.nodes}set nodes(t){e.nodes=t}get edges(){return this._edges}set edges(t){e.edges=t}_prevSelectedNodes=[];_prevSelectedNodeIds=new Set;#l=P(()=>{let e=this._prevSelectedNodeIds.size,t=new Set,n=this.nodes.filter(e=>(e.selected&&(t.add(e.id),this._prevSelectedNodeIds.delete(e.id)),e.selected));return(e!==t.size||this._prevSelectedNodeIds.size>0)&&(this._prevSelectedNodes=n),this._prevSelectedNodeIds=t,this._prevSelectedNodes});get selectedNodes(){return U(this.#l)}set selectedNodes(e){I(this.#l,e)}_prevSelectedEdges=[];_prevSelectedEdgeIds=new Set;#u=P(()=>{let e=this._prevSelectedEdgeIds.size,t=new Set,n=this.edges.filter(e=>(e.selected&&(t.add(e.id),this._prevSelectedEdgeIds.delete(e.id)),e.selected));return(e!==t.size||this._prevSelectedEdgeIds.size>0)&&(this._prevSelectedEdges=n),this._prevSelectedEdgeIds=t,this._prevSelectedEdges});get selectedEdges(){return U(this.#u)}set selectedEdges(e){I(this.#u,e)}selectionChangeHandlers=new Map;nodeLookup=new Map;parentLookup=new Map;connectionLookup=new Map;edgeLookup=new Map;_prevVisibleEdges=new Map;#d=P(()=>{let{nodes:t,_edges:n,_prevVisibleEdges:r,nodeLookup:i,connectionMode:a,onerror:o,onlyRenderVisibleElements:s,defaultEdgeOptions:c,zIndexMode:l}=this,u,d,f={edges:n,defaultEdgeOptions:c,previousEdges:r,nodeLookup:i,connectionMode:a,elevateEdgesOnSelect:e.props.elevateEdgesOnSelect??!0,zIndexMode:l,onerror:o};if(s){let{viewport:e,width:t,height:n}=this,r=[e.x,e.y,e.zoom];u=mm(i,r,t,n),d=hm({...f,onlyRenderVisible:!0,visibleNodes:u,transform:r,width:t,height:n})}else u=this.nodeLookup,d=hm(f);return{nodes:u,edges:d}});get visible(){return U(this.#d)}set visible(e){I(this.#d,e)}#f=P(()=>e.props.nodesDraggable??!0);get nodesDraggable(){return U(this.#f)}set nodesDraggable(e){I(this.#f,e)}#p=P(()=>e.props.nodesConnectable??!0);get nodesConnectable(){return U(this.#p)}set nodesConnectable(e){I(this.#p,e)}#m=P(()=>e.props.elementsSelectable??!0);get elementsSelectable(){return U(this.#m)}set elementsSelectable(e){I(this.#m,e)}#h=P(()=>e.props.nodesFocusable??!0);get nodesFocusable(){return U(this.#h)}set nodesFocusable(e){I(this.#h,e)}#g=P(()=>e.props.edgesFocusable??!0);get edgesFocusable(){return U(this.#g)}set edgesFocusable(e){I(this.#g,e)}#_=P(()=>e.props.disableKeyboardA11y??!1);get disableKeyboardA11y(){return U(this.#_)}set disableKeyboardA11y(e){I(this.#_,e)}#v=P(()=>e.props.minZoom??.5);get minZoom(){return U(this.#v)}set minZoom(e){I(this.#v,e)}#y=P(()=>e.props.maxZoom??2);get maxZoom(){return U(this.#y)}set maxZoom(e){I(this.#y,e)}#b=P(()=>e.props.nodeOrigin??[0,0]);get nodeOrigin(){return U(this.#b)}set nodeOrigin(e){I(this.#b,e)}#x=P(()=>e.props.nodeExtent??id);get nodeExtent(){return U(this.#x)}set nodeExtent(e){I(this.#x,e)}#S=P(()=>e.props.translateExtent??id);get translateExtent(){return U(this.#S)}set translateExtent(e){I(this.#S,e)}#C=P(()=>e.props.defaultEdgeOptions??{});get defaultEdgeOptions(){return U(this.#C)}set defaultEdgeOptions(e){I(this.#C,e)}#w=P(()=>e.props.nodeDragThreshold??1);get nodeDragThreshold(){return U(this.#w)}set nodeDragThreshold(e){I(this.#w,e)}#T=P(()=>e.props.autoPanOnNodeDrag??!0);get autoPanOnNodeDrag(){return U(this.#T)}set autoPanOnNodeDrag(e){I(this.#T,e)}#E=P(()=>e.props.autoPanOnConnect??!0);get autoPanOnConnect(){return U(this.#E)}set autoPanOnConnect(e){I(this.#E,e)}#D=P(()=>e.props.autoPanOnNodeFocus??!0);get autoPanOnNodeFocus(){return U(this.#D)}set autoPanOnNodeFocus(e){I(this.#D,e)}#O=P(()=>e.props.autoPanSpeed??15);get autoPanSpeed(){return U(this.#O)}set autoPanSpeed(e){I(this.#O,e)}#k=P(()=>e.props.connectionDragThreshold??1);get connectionDragThreshold(){return U(this.#k)}set connectionDragThreshold(e){I(this.#k,e)}fitViewQueued=e.props.fitView??!1;fitViewOptions=e.props.fitViewOptions;fitViewResolver=null;#A=P(()=>e.props.snapGrid??null);get snapGrid(){return U(this.#A)}set snapGrid(e){I(this.#A,e)}#j=F(!1);get dragging(){return U(this.#j)}set dragging(e){I(this.#j,e)}#M=F(null);get selectionRect(){return U(this.#M)}set selectionRect(e){I(this.#M,e)}#N=F(!1);get selectionKeyPressed(){return U(this.#N)}set selectionKeyPressed(e){I(this.#N,e)}#P=F(!1);get multiselectionKeyPressed(){return U(this.#P)}set multiselectionKeyPressed(e){I(this.#P,e)}#F=F(!1);get deleteKeyPressed(){return U(this.#F)}set deleteKeyPressed(e){I(this.#F,e)}#I=F(!1);get panActivationKeyPressed(){return U(this.#I)}set panActivationKeyPressed(e){I(this.#I,e)}#L=F(!1);get zoomActivationKeyPressed(){return U(this.#L)}set zoomActivationKeyPressed(e){I(this.#L,e)}#R=F(null);get selectionRectMode(){return U(this.#R)}set selectionRectMode(e){I(this.#R,e)}#z=F(``);get ariaLiveMessage(){return U(this.#z)}set ariaLiveMessage(e){I(this.#z,e)}#B=P(()=>e.props.selectionMode??ld.Partial);get selectionMode(){return U(this.#B)}set selectionMode(e){I(this.#B,e)}#V=P(()=>({...gm,...e.props.nodeTypes}));get nodeTypes(){return U(this.#V)}set nodeTypes(e){I(this.#V,e)}#H=P(()=>({..._m,...e.props.edgeTypes}));get edgeTypes(){return U(this.#H)}set edgeTypes(e){I(this.#H,e)}#U=P(()=>e.props.noPanClass??`nopan`);get noPanClass(){return U(this.#U)}set noPanClass(e){I(this.#U,e)}#W=P(()=>e.props.noDragClass??`nodrag`);get noDragClass(){return U(this.#W)}set noDragClass(e){I(this.#W,e)}#G=P(()=>e.props.noWheelClass??`nowheel`);get noWheelClass(){return U(this.#G)}set noWheelClass(e){I(this.#G,e)}#K=P(()=>nf(e.props.ariaLabelConfig));get ariaLabelConfig(){return U(this.#K)}set ariaLabelConfig(e){I(this.#K,e)}#q=F(vm(this.nodesInitialized,e.props.fitView,e.props.initialViewport,this.width,this.height,this.nodeLookup));get _viewport(){return U(this.#q)}set _viewport(e){I(this.#q,e)}get viewport(){return e.viewport??this._viewport}set viewport(t){e.viewport&&=t,this._viewport=t}#J=F(ud);get _connection(){return U(this.#J)}set _connection(e){I(this.#J,e)}#Y=P(()=>this._connection.inProgress?{...this._connection,to:Gd(this._connection.to,[this.viewport.x,this.viewport.y,this.viewport.zoom])}:this._connection);get connection(){return U(this.#Y)}set connection(e){I(this.#Y,e)}#X=P(()=>e.props.connectionMode??sd.Strict);get connectionMode(){return U(this.#X)}set connectionMode(e){I(this.#X,e)}#Z=P(()=>e.props.connectionRadius??20);get connectionRadius(){return U(this.#Z)}set connectionRadius(e){I(this.#Z,e)}#Q=P(()=>e.props.isValidConnection??(()=>!0));get isValidConnection(){return U(this.#Q)}set isValidConnection(e){I(this.#Q,e)}#$=P(()=>e.props.selectNodesOnDrag??!0);get selectNodesOnDrag(){return U(this.#$)}set selectNodesOnDrag(e){I(this.#$,e)}#ee=P(()=>e.props.defaultMarkerColor===void 0?`#b1b1b7`:e.props.defaultMarkerColor);get defaultMarkerColor(){return U(this.#ee)}set defaultMarkerColor(e){I(this.#ee,e)}#te=P(()=>Ff(e.edges,{defaultColor:this.defaultMarkerColor,id:this.flowId,defaultMarkerStart:this.defaultEdgeOptions.markerStart,defaultMarkerEnd:this.defaultEdgeOptions.markerEnd}));get markers(){return U(this.#te)}set markers(e){I(this.#te,e)}#ne=P(()=>e.props.onlyRenderVisibleElements??!1);get onlyRenderVisibleElements(){return U(this.#ne)}set onlyRenderVisibleElements(e){I(this.#ne,e)}#re=P(()=>e.props.onflowerror??Ud);get onerror(){return U(this.#re)}set onerror(e){I(this.#re,e)}#ie=P(()=>e.props.ondelete);get ondelete(){return U(this.#ie)}set ondelete(e){I(this.#ie,e)}#ae=P(()=>e.props.onbeforedelete);get onbeforedelete(){return U(this.#ae)}set onbeforedelete(e){I(this.#ae,e)}#oe=P(()=>e.props.onbeforeconnect);get onbeforeconnect(){return U(this.#oe)}set onbeforeconnect(e){I(this.#oe,e)}#se=P(()=>e.props.onconnect);get onconnect(){return U(this.#se)}set onconnect(e){I(this.#se,e)}#ce=P(()=>e.props.onconnectstart);get onconnectstart(){return U(this.#ce)}set onconnectstart(e){I(this.#ce,e)}#le=P(()=>e.props.onconnectend);get onconnectend(){return U(this.#le)}set onconnectend(e){I(this.#le,e)}#ue=P(()=>e.props.onbeforereconnect);get onbeforereconnect(){return U(this.#ue)}set onbeforereconnect(e){I(this.#ue,e)}#de=P(()=>e.props.onreconnect);get onreconnect(){return U(this.#de)}set onreconnect(e){I(this.#de,e)}#fe=P(()=>e.props.onreconnectstart);get onreconnectstart(){return U(this.#fe)}set onreconnectstart(e){I(this.#fe,e)}#pe=P(()=>e.props.onreconnectend);get onreconnectend(){return U(this.#pe)}set onreconnectend(e){I(this.#pe,e)}#me=P(()=>e.props.clickConnect??!0);get clickConnect(){return U(this.#me)}set clickConnect(e){I(this.#me,e)}#he=P(()=>e.props.onclickconnectstart);get onclickconnectstart(){return U(this.#he)}set onclickconnectstart(e){I(this.#he,e)}#ge=P(()=>e.props.onclickconnectend);get onclickconnectend(){return U(this.#ge)}set onclickconnectend(e){I(this.#ge,e)}#_e=F(null);get clickConnectStartHandle(){return U(this.#_e)}set clickConnectStartHandle(e){I(this.#_e,e)}#ve=P(()=>e.props.onselectiondrag);get onselectiondrag(){return U(this.#ve)}set onselectiondrag(e){I(this.#ve,e)}#ye=P(()=>e.props.onselectiondragstart);get onselectiondragstart(){return U(this.#ye)}set onselectiondragstart(e){I(this.#ye,e)}#be=P(()=>e.props.onselectiondragstop);get onselectiondragstop(){return U(this.#be)}set onselectiondragstop(e){I(this.#be,e)}resolveFitView=async()=>{this.panZoom&&(await Ed({nodes:this.nodeLookup,width:this.width,height:this.height,panZoom:this.panZoom,minZoom:this.minZoom,maxZoom:this.maxZoom},this.fitViewOptions),this.fitViewResolver?.resolve(!0),this.fitViewQueued=!1,this.fitViewOptions=void 0,this.fitViewResolver=null)};_prefersDark=new pm(`(prefers-color-scheme: dark)`,e.props.colorModeSSR===`dark`);#xe=P(()=>e.props.colorMode===`system`?this._prefersDark.current?`dark`:`light`:e.props.colorMode??`light`);get colorMode(){return U(this.#xe)}set colorMode(e){I(this.#xe,e)}constructor(){}resetStoreValues(){this.dragging=!1,this.selectionRect=null,this.selectionRectMode=null,this.selectionKeyPressed=!1,this.multiselectionKeyPressed=!1,this.deleteKeyPressed=!1,this.panActivationKeyPressed=!1,this.zoomActivationKeyPressed=!1,this._connection=ud,this.clickConnectStartHandle=null,this.viewport=e.props.initialViewport??{x:0,y:0,zoom:1},this.ariaLiveMessage=``}}return new t}function bm(){let e=Ye(xm);if(!e)throw Error(`To call useStore outside of <SvelteFlow /> you need to wrap your component in a <SvelteFlowProvider />`);return e.getStore()}var xm=Symbol();function Sm(e){let t=ym(e);function n(e){t.nodeTypes={...gm,...e}}function r(e){t.edgeTypes={..._m,...e}}function i(e){t.edges=xf(e,t.edges)}let a=(e,n=!1)=>{t.nodes=t.nodes.map(r=>{if(t.connection.inProgress&&t.connection.fromNode.id===r.id){let e=t.nodeLookup.get(r.id);e&&(t.connection={...t.connection,from:Mf(e,t.connection.fromHandle,Z.Left,!0)})}let i=e.get(r.id);return i?{...r,position:i.position,dragging:n}:r})};function o(e){let{changes:n,updatedInternals:r}=Xf(e,t.nodeLookup,t.parentLookup,t.domNode,t.nodeOrigin,t.nodeExtent,t.zIndexMode);if(!r)return;Vf(t.nodeLookup,t.parentLookup,{nodeOrigin:t.nodeOrigin,nodeExtent:t.nodeExtent,zIndexMode:t.zIndexMode}),t.fitViewQueued&&t.resolveFitView();let i=new Map;for(let e of n){let n=t.nodeLookup.get(e.id)?.internals.userNode;if(!n)continue;let r={...n};switch(e.type){case`dimensions`:{let t={...r.measured,...e.dimensions};e.setAttributes&&(r.width=e.dimensions?.width??r.width,r.height=e.dimensions?.height??r.height),r.measured=t;break}case`position`:r.position=e.position??r.position;break}i.set(e.id,r)}t.nodes=t.nodes.map(e=>i.get(e.id)??e)}function s(e){let n=t.fitViewResolver??Promise.withResolvers();return t.fitViewQueued=!0,t.fitViewOptions=e,t.fitViewResolver=n,t.nodes=[...t.nodes],n.promise}async function c(e,n,r){let i=r?.zoom===void 0?t.maxZoom:r.zoom,a=t.panZoom;return a?(await a.setViewport({x:t.width/2-e*i,y:t.height/2-n*i,zoom:i},{duration:r?.duration,ease:r?.ease,interpolate:r?.interpolate}),Promise.resolve(!0)):Promise.resolve(!1)}function l(e,n){let r=t.panZoom;return r?r.scaleBy(e,n):Promise.resolve(!1)}function u(e){return l(1.2,e)}function d(e){return l(1/1.2,e)}function f(e){let n=t.panZoom;n&&(n.setScaleExtent([e,t.maxZoom]),t.minZoom=e)}function p(e){let n=t.panZoom;n&&(n.setScaleExtent([t.minZoom,e]),t.maxZoom=e)}function m(e){let n=t.panZoom;n&&(n.setTranslateExtent(e),t.translateExtent=e)}function h(e,t=null){let n=!1,r=e.map(e=>(!t||t.has(e.id))&&e.selected?(n=!0,{...e,selected:!1}):e);return[n,r]}function g(e){let n=e?.nodes?new Set(e.nodes.map(e=>e.id)):null,[r,i]=h(t.nodes,n);r&&(t.nodes=i);let a=e?.edges?new Set(e.edges.map(e=>e.id)):null,[o,s]=h(t.edges,a);o&&(t.edges=s)}function _(e){let n=t.multiselectionKeyPressed;t.nodes=t.nodes.map(t=>{let r=e.includes(t.id),i=n&&t.selected||r;return!!t.selected===i?t:{...t,selected:i}}),n||g({nodes:[]})}function v(e){let n=t.multiselectionKeyPressed;t.edges=t.edges.map(t=>{let r=e.includes(t.id),i=n&&t.selected||r;return!!t.selected===i?t:{...t,selected:i}}),n||g({edges:[]})}function y(e,n,r){let i=t.nodeLookup.get(e);if(!i){console.warn(`012`,rd.error012(e));return}t.selectionRect=null,t.selectionRectMode=null,i.selected?(n||i.selected&&t.multiselectionKeyPressed)&&(g({nodes:[i],edges:[]}),requestAnimationFrame(()=>r?.blur())):_([e])}function b(e){let n=t.edgeLookup.get(e);if(!n){console.warn(`012`,rd.error012(e));return}(n.selectable||t.elementsSelectable&&n.selectable===void 0)&&(t.selectionRect=null,t.selectionRectMode=null,n.selected?n.selected&&t.multiselectionKeyPressed&&g({nodes:[],edges:[n]}):v([e]))}function x(e,n){let{nodeExtent:r,snapGrid:i,nodeOrigin:o,nodeLookup:s,nodesDraggable:c,onerror:l}=t,u=new Map,d=i?.[0]??5,f=i?.[1]??5,p=e.x*d*n,m=e.y*f*n;for(let e of s.values()){if(!(e.selected&&(e.draggable||c&&e.draggable===void 0)))continue;let t={x:e.internals.positionAbsolute.x+p,y:e.internals.positionAbsolute.y+m};i&&(t=Wd(t,i));let{position:n,positionAbsolute:a}=Dd({nodeId:e.id,nextPosition:t,nodeLookup:s,nodeExtent:r,nodeOrigin:o,onError:l});e.position=n,e.internals.positionAbsolute=a,u.set(e.id,e)}a(u)}function S(e){return Zf({delta:e,panZoom:t.panZoom,transform:[t.viewport.x,t.viewport.y,t.viewport.zoom],translateExtent:t.translateExtent,width:t.width,height:t.height})}let C=e=>{t._connection={...e}};function w(){t._connection=ud}function T(){t.resetStoreValues(),g()}return Object.assign(t,{setNodeTypes:n,setEdgeTypes:r,addEdge:i,updateNodePositions:a,updateNodeInternals:o,zoomIn:u,zoomOut:d,fitView:s,setCenter:c,setMinZoom:f,setMaxZoom:p,setTranslateExtent:m,unselectNodesAndEdges:g,addSelectedNodes:_,addSelectedEdges:v,handleNodeSelection:y,handleEdgeSelection:b,moveSelectedNodes:x,panBy:S,updateConnection:C,cancelConnection:w,reset:T})}function Cm(e,t){let{minZoom:n,maxZoom:r,initialViewport:i,onPanZoomStart:a,onPanZoom:o,onPanZoomEnd:s,translateExtent:c,setPanZoomInstance:l,onDraggingChange:u,onTransformChange:d}=t,f=Ap({domNode:e,minZoom:n,maxZoom:r,translateExtent:c,viewport:i,onPanZoom:o,onPanZoomStart:a,onPanZoomEnd:s,onDraggingChange:u}),p=f.getViewport();return(i.x!==p.x||i.y!==p.y||i.zoom!==p.zoom)&&d([p.x,p.y,p.zoom]),l(f),f.update(t),{update(e){f.update(e)}}}var wm=G(`<div class="svelte-flow__zoom svelte-flow__container"><!></div>`);function Tm(e,t){j(t,!0);let n=X(t,`store`,15),r=P(()=>n().panActivationKeyPressed||t.panOnDrag),i=P(()=>n().panActivationKeyPressed||t.panOnScroll),{viewport:a}=n(),o=!1;Nn(()=>{!o&&n().viewportInitialized&&(t.oninit?.(),o=!0)});var s=wm();yi(L(s),()=>t.children),A(s),xi(s,(e,t)=>Cm?.(e,t),()=>({viewport:n().viewport,minZoom:n().minZoom,maxZoom:n().maxZoom,initialViewport:a,onDraggingChange:e=>{n(n().dragging=e,!0)},setPanZoomInstance:e=>{n(n().panZoom=e,!0)},onPanZoomStart:t.onmovestart,onPanZoom:t.onmove,onPanZoomEnd:t.onmoveend,zoomOnScroll:t.zoomOnScroll,zoomOnDoubleClick:t.zoomOnDoubleClick,zoomOnPinch:t.zoomOnPinch,panOnScroll:U(i),panOnDrag:U(r),panOnScrollSpeed:t.panOnScrollSpeed,panOnScrollMode:t.panOnScrollMode,zoomActivationKeyPressed:n().zoomActivationKeyPressed,preventScrolling:typeof t.preventScrolling==`boolean`?t.preventScrolling:!0,noPanClassName:n().noPanClass,noWheelClassName:n().noWheelClass,userSelectionActive:!!n().selectionRect,translateExtent:n().translateExtent,lib:`svelte`,paneClickDistance:t.paneClickDistance,selectionOnDrag:t.selectionOnDrag,onTransformChange:e=>{n(n().viewport={x:e[0],y:e[1],zoom:e[2]},!0)},connectionInProgress:n().connection.inProgress})),K(e,s),M()}function Em(e,t){return n=>{n.target===t&&e?.(n)}}function Dm(e){return t=>{let n=e.has(t.id);return!!t.selected===n?t:{...t,selected:n}}}function Om(e,t){if(e.size!==t.size)return!1;for(let n of e)if(!t.has(n))return!1;return!0}var km=G(`<div><!></div>`);function Am(e,t){j(t,!0);let n=X(t,`store`,15),r=X(t,`panOnDrag`,3,!0),i=X(t,`paneClickDistance`,3,1),a,o=null,s=new Set,c=new Set,l=P(()=>n().panActivationKeyPressed||r()),u=P(()=>n().selectionKeyPressed||!!n().selectionRect||t.selectionOnDrag&&U(l)!==!0),d=P(()=>n().elementsSelectable&&(U(u)||n().selectionRectMode===`user`)),f=!1;function p(e){if(o=a?.getBoundingClientRect(),!o)return;let r=e.target===a,i=!r&&!!e.target.closest(`.nokey`),s=t.selectionOnDrag&&r||n().selectionKeyPressed;if(i||!U(u)||!s||e.button!==0||!e.isPrimary)return;e.target?.setPointerCapture?.(e.pointerId),f=!1;let{x:c,y:l}=uf(e,o);n(n().selectionRect={width:0,height:0,startX:c,startY:l,x:c,y:l},!0),r||(e.stopPropagation(),e.preventDefault())}function m(e){if(!U(u)||!o||!n().selectionRect)return;let r=uf(e,o),{startX:a=0,startY:l=0}=n().selectionRect;if(!f){let o=n().selectionKeyPressed?0:i();if(Math.hypot(r.x-a,r.y-l)<=o)return;n().unselectNodesAndEdges(),t.onselectionstart?.(e)}f=!0;let d={...n().selectionRect,x:r.x<a?r.x:a,y:r.y<l?r.y:l,width:Math.abs(r.x-a),height:Math.abs(r.y-l)},p=s,m=c;s=new Set(Cd(n().nodeLookup,d,[n().viewport.x,n().viewport.y,n().viewport.zoom],n().selectionMode===ld.Partial,!0).map(e=>e.id));let h=n().defaultEdgeOptions.selectable??!0;c=new Set;for(let e of s){let t=n().connectionLookup.get(e);if(t)for(let{edgeId:e}of t.values()){let t=n().edgeLookup.get(e);t&&(t.selectable??h)&&c.add(e)}}Om(p,s)||n(n().nodes=n().nodes.map(Dm(s)),!0),Om(m,c)||n(n().edges=n().edges.map(Dm(c)),!0),n(n().selectionRectMode=`user`,!0),n(n().selectionRect=d,!0)}function h(e){e.button===0&&(e.target?.releasePointerCapture?.(e.pointerId),!f&&e.target===a&&v?.(e),n(n().selectionRect=null,!0),f&&n(n().selectionRectMode=s.size>0?`nodes`:null,!0),f&&t.onselectionend?.(e))}let g=e=>{if(Array.isArray(U(l))&&U(l).includes(2)){e.preventDefault();return}t.onpanecontextmenu?.({event:e})},_=e=>{f&&=(e.stopPropagation(),!1)};function v(e){if(f||n().connection.inProgress){f=!1;return}t.onpaneclick?.({event:e}),n().unselectNodesAndEdges(),n(n().selectionRectMode=null,!0),n(n().selectionRect=null,!0)}var y=km();let b;var x=P(()=>U(d)?void 0:Em(v,a)),S=P(()=>Em(g,a));yi(L(y),()=>t.children),A(y),ca(y,e=>a=e,()=>a),B(e=>b=ji(y,1,`svelte-flow__pane svelte-flow__container`,null,b,e),[()=>({draggable:r()===!0||Array.isArray(r())&&r().includes(0),dragging:n().dragging,selection:U(u)})]),W(`click`,y,function(...e){U(x)?.apply(this,e)}),Gr(`pointerdown`,y,function(...e){(U(d)?p:void 0)?.apply(this,e)},!0),W(`pointermove`,y,function(...e){(U(d)?m:void 0)?.apply(this,e)}),W(`pointerup`,y,function(...e){(U(d)?h:void 0)?.apply(this,e)}),W(`contextmenu`,y,function(...e){U(S)?.apply(this,e)}),Gr(`click`,y,function(...e){(U(d)?_:void 0)?.apply(this,e)},!0),K(e,y),M()}Kr([`click`,`pointermove`,`pointerup`,`contextmenu`]);var jm=G(`<div class="svelte-flow__viewport xyflow__viewport svelte-flow__container"><!></div>`);function Mm(e,t){j(t,!0);var n=jm();let r;yi(L(n),()=>t.children),A(n),B(()=>r=Ni(n,``,r,{transform:`translate(${t.store.viewport.x??``}px, ${t.store.viewport.y??``}px) scale(${t.store.viewport.zoom??``})`})),K(e,n),M()}function Nm(e,t){let{store:n,onDrag:r,onDragStart:i,onDragStop:a,onNodeMouseDown:o}=t,s=ap({onDrag:r,onDragStart:i,onDragStop:a,onNodeMouseDown:o,getStoreItems:()=>{let{snapGrid:e,viewport:t}=n;return{nodes:n.nodes,nodeLookup:n.nodeLookup,edges:n.edges,nodeExtent:n.nodeExtent,snapGrid:e||[0,0],snapToGrid:!!e,nodeOrigin:n.nodeOrigin,multiSelectionActive:n.multiselectionKeyPressed,domNode:n.domNode,transform:[t.x,t.y,t.zoom],autoPanOnNodeDrag:n.autoPanOnNodeDrag,nodesDraggable:n.nodesDraggable,selectNodesOnDrag:n.selectNodesOnDrag,nodeDragThreshold:n.nodeDragThreshold,unselectNodesAndEdges:n.unselectNodesAndEdges,updateNodePositions:n.updateNodePositions,onSelectionDrag:n.onselectiondrag,onSelectionDragStart:n.onselectiondragstart,onSelectionDragStop:n.onselectiondragstop,panBy:n.panBy}}});function c(e,t){if(t.disabled){s.destroy();return}s.update({domNode:e,noDragClassName:t.noDragClass,handleSelector:t.handleSelector,nodeId:t.nodeId,isSelectable:t.isSelectable,nodeClickDistance:t.nodeClickDistance})}return c(e,t),{update(t){c(e,t)},destroy(){s.destroy()}}}var Pm=G(`<div aria-live="assertive" aria-atomic="true" class="a11y-live-msg svelte-13pq11u"> </div>`),Fm=G(`<div class="a11y-hidden svelte-13pq11u"> </div> <div class="a11y-hidden svelte-13pq11u"> </div> <!>`,1);function Im(e,t){j(t,!0);var n=Fm(),r=R(n),i=L(r,!0);A(r);var a=z(r,2),o=L(a,!0);A(a);var s=z(a,2),c=e=>{var n=Pm(),r=L(n,!0);A(n),B(()=>{Y(n,`id`,`${zm}-${t.store.flowId}`),q(r,t.store.ariaLiveMessage)}),K(e,n)};J(s,e=>{t.store.disableKeyboardA11y||e(c)}),B(()=>{Y(r,`id`,`${Lm}-${t.store.flowId}`),q(i,t.store.disableKeyboardA11y?t.store.ariaLabelConfig[`node.a11yDescription.default`]:t.store.ariaLabelConfig[`node.a11yDescription.keyboardDisabled`]),Y(a,`id`,`${Rm}-${t.store.flowId}`),q(o,t.store.ariaLabelConfig[`edge.a11yDescription.default`])}),K(e,n),M()}var Lm=`svelte-flow__node-desc`,Rm=`svelte-flow__edge-desc`,zm=`svelte-flow__aria-live`,Bm=G(`<div><!></div>`);function Vm(e,t){j(t,!0);let n=X(t,`store`,15),r=P(()=>g(t.node.data,()=>({}),!0)),i=P(()=>g(t.node.selected,!1)),a=P(()=>t.node.draggable),o=P(()=>t.node.selectable),s=P(()=>g(t.node.deletable,!0)),c=P(()=>t.node.connectable),l=P(()=>t.node.focusable),u=P(()=>g(t.node.hidden,!1)),d=P(()=>g(t.node.dragging,!1)),f=P(()=>g(t.node.style,``)),p=P(()=>t.node.class),m=P(()=>g(t.node.type,`default`)),h=P(()=>t.node.parentId),_=P(()=>t.node.sourcePosition),v=P(()=>t.node.targetPosition),y=P(()=>g(t.node.measured,()=>({width:0,height:0}),!0).width),b=P(()=>g(t.node.measured,()=>({width:0,height:0}),!0).height),x=P(()=>t.node.initialWidth),S=P(()=>t.node.initialHeight),C=P(()=>t.node.width),w=P(()=>t.node.height),T=P(()=>t.node.dragHandle),ee=P(()=>g(t.node.internals.z,0)),E=P(()=>t.node.internals.positionAbsolute.x),te=P(()=>t.node.internals.positionAbsolute.y),ne=P(()=>t.node.internals.userNode),{id:D}=t.node,re=P(()=>U(a)??n().nodesDraggable),ie=P(()=>U(o)??n().elementsSelectable),ae=P(()=>U(c)??n().nodesConnectable),oe=P(()=>ef(t.node)),se=P(()=>!!t.node.internals.handleBounds),ce=P(()=>U(oe)&&U(se)),le=P(()=>U(l)??n().nodesFocusable);function ue(e){return n().parentLookup.has(e)}let de=P(()=>ue(D)),fe=F(null),pe=null,me=U(m),he=U(_),ge=U(v),_e=P(()=>n().nodeTypes[U(m)]??Hp),ve=P(()=>n().ariaLabelConfig);Pp(D),Ip({get value(){return U(ae)}});let ye=P(()=>{let e=U(y)===void 0?U(C)??U(x):U(C),t=U(b)===void 0?U(w)??U(S):U(w);if(!(e===void 0&&t===void 0&&U(f)===void 0))return`${U(f)};${e?`width:${$p(e)};`:``}${t?`height:${$p(t)};`:``}`});Nn(()=>{(U(m)!==me||U(_)!==he||U(v)!==ge)&&U(fe)!==null&&requestAnimationFrame(()=>{U(fe)!==null&&n().updateNodeInternals(new Map([[D,{id:D,nodeElement:U(fe),force:!0}]]))}),me=U(m),he=U(_),ge=U(v)}),Nn(()=>{t.resizeObserver&&(!U(ce)||U(fe)!==pe)&&(pe&&t.resizeObserver.unobserve(pe),U(fe)&&t.resizeObserver.observe(U(fe)),pe=U(fe))}),_a(()=>{pe&&t.resizeObserver?.unobserve(pe)});function be(e){U(ie)&&(!n().selectNodesOnDrag||!U(re)||n().nodeDragThreshold>0)&&n().handleNodeSelection(D),t.onnodeclick?.({node:U(ne),event:e})}function xe(e){if(!(cf(e)||n().disableKeyboardA11y))if(ad.includes(e.key)&&U(ie)){let t=e.key===`Escape`;n().handleNodeSelection(D,t,U(fe))}else U(re)&&t.node.selected&&Object.prototype.hasOwnProperty.call(em,e.key)&&(e.preventDefault(),n(n().ariaLiveMessage=U(ve)[`node.a11yDescription.ariaLiveMessage`]({direction:e.key.replace(`Arrow`,``).toLowerCase(),x:~~t.node.internals.positionAbsolute.x,y:~~t.node.internals.positionAbsolute.y}),!0),n().moveSelectedNodes(em[e.key],e.shiftKey?4:1))}let Se=()=>{if(n().disableKeyboardA11y||!n().autoPanOnNodeFocus||!U(fe)?.matches(`:focus-visible`))return;let{width:e,height:r,viewport:i}=n();Cd(new Map([[D,t.node]]),{x:0,y:0,width:e,height:r},[i.x,i.y,i.zoom],!0).length>0||n().setCenter(t.node.position.x+(t.node.measured.width??0)/2,t.node.position.y+(t.node.measured.height??0)/2,{zoom:i.zoom})};var Ce=ni(),we=R(Ce),Te=e=>{var a=Bm();Zi(a,()=>({"data-id":D,class:[`svelte-flow__node`,`svelte-flow__node-${U(m)}`,U(p)],style:U(ye),onclick:be,onpointerenter:t.onnodepointerenter?e=>t.onnodepointerenter({node:U(ne),event:e}):void 0,onpointerleave:t.onnodepointerleave?e=>t.onnodepointerleave({node:U(ne),event:e}):void 0,onpointermove:t.onnodepointermove?e=>t.onnodepointermove({node:U(ne),event:e}):void 0,oncontextmenu:t.onnodecontextmenu?e=>t.onnodecontextmenu({node:U(ne),event:e}):void 0,onkeydown:U(le)?xe:void 0,onfocus:U(le)?Se:void 0,tabIndex:U(le)?0:void 0,role:t.node.ariaRole??(U(le)?`group`:void 0),"aria-roledescription":`node`,"aria-describedby":n().disableKeyboardA11y?void 0:`${Lm}-${n().flowId}`,...t.node.domAttributes,[Ri]:{dragging:U(d),selected:U(i),draggable:U(re),connectable:U(ae),selectable:U(ie),nopan:U(re),parent:U(de)},[zi]:{"z-index":U(ee),transform:`translate(${U(E)??``}px, ${U(te)??``}px)`,visibility:U(oe)?`visible`:`hidden`}})),bi(L(a),()=>U(_e),(e,t)=>{t(e,{get data(){return U(r)},get id(){return D},get selected(){return U(i)},get selectable(){return U(ie)},get deletable(){return U(s)},get sourcePosition(){return U(_)},get targetPosition(){return U(v)},get zIndex(){return U(ee)},get dragging(){return U(d)},get draggable(){return U(re)},get dragHandle(){return U(T)},get parentId(){return U(h)},get type(){return U(m)},get isConnectable(){return U(ae)},get positionAbsoluteX(){return U(E)},get positionAbsoluteY(){return U(te)},get width(){return U(C)},get height(){return U(w)}})}),A(a),xi(a,(e,t)=>Nm?.(e,t),()=>({nodeId:D,isSelectable:U(ie),disabled:!U(re),handleSelector:U(T),noDragClass:n().noDragClass,nodeClickDistance:t.nodeClickDistance,onNodeMouseDown:n().handleNodeSelection,onDrag:(e,n,r,i)=>{t.onnodedrag?.({event:e,targetNode:r,nodes:i})},onDragStart:(e,n,r,i)=>{t.onnodedragstart?.({event:e,targetNode:r,nodes:i})},onDragStop:(e,n,r,i)=>{t.onnodedragstop?.({event:e,targetNode:r,nodes:i})},store:n()})),ca(a,e=>I(fe,e),()=>U(fe)),K(e,a)};J(we,e=>{U(u)||e(Te)}),K(e,Ce),M()}var Hm=G(`<div class="svelte-flow__nodes"></div>`);function Um(e,t){j(t,!0);let n=X(t,`store`,15),r=typeof ResizeObserver>`u`?null:new ResizeObserver(e=>{let t=new Map;e.forEach(e=>{let n=e.target.getAttribute(`data-id`);t.set(n,{id:n,nodeElement:e.target,force:!0})}),n().updateNodeInternals(t)});_a(()=>{r?.disconnect()});var i=Hm();pi(i,21,()=>n().visible.nodes.values(),e=>e.id,(e,i)=>{Vm(e,{get node(){return U(i)},get resizeObserver(){return r},get nodeClickDistance(){return t.nodeClickDistance},get onnodeclick(){return t.onnodeclick},get onnodepointerenter(){return t.onnodepointerenter},get onnodepointermove(){return t.onnodepointermove},get onnodepointerleave(){return t.onnodepointerleave},get onnodedrag(){return t.onnodedrag},get onnodedragstart(){return t.onnodedragstart},get onnodedragstop(){return t.onnodedragstop},get onnodecontextmenu(){return t.onnodecontextmenu},get store(){return n()},set store(e){n(e)}})}),A(i),K(e,i),M()}var Wm=ei(`<svg class="svelte-flow__edge-wrapper"><g><!></g></svg>`);function Gm(e,t){j(t,!0);let n=P(()=>t.edge.id),r=P(()=>t.edge.source),i=P(()=>t.edge.target),a=P(()=>t.edge.sourceX),o=P(()=>t.edge.sourceY),s=P(()=>t.edge.targetX),c=P(()=>t.edge.targetY),l=P(()=>t.edge.sourcePosition),u=P(()=>t.edge.targetPosition),d=P(()=>g(t.edge.animated,!1)),f=P(()=>g(t.edge.selected,!1)),p=P(()=>t.edge.label),m=P(()=>t.edge.labelStyle),h=P(()=>g(t.edge.data,()=>({}),!0)),_=P(()=>t.edge.style),v=P(()=>t.edge.interactionWidth),y=P(()=>g(t.edge.type,`default`)),b=P(()=>t.edge.sourceHandle),x=P(()=>t.edge.targetHandle),S=P(()=>t.edge.markerStart),C=P(()=>t.edge.markerEnd),w=P(()=>t.edge.selectable),T=P(()=>t.edge.focusable),ee=P(()=>g(t.edge.deletable,!0)),E=P(()=>t.edge.hidden),te=P(()=>t.edge.zIndex),ne=P(()=>t.edge.class),D=P(()=>t.edge.ariaLabel);Rp(U(n));let re=null,ie=P(()=>U(w)??t.store.elementsSelectable),ae=P(()=>U(T)??t.store.edgesFocusable),oe=P(()=>t.store.edgeTypes[U(y)]??om),se=P(()=>U(S)?`url('#${Pf(U(S),t.store.flowId)}')`:void 0),ce=P(()=>U(C)?`url('#${Pf(U(C),t.store.flowId)}')`:void 0);function le(e){let r=t.store.edgeLookup.get(U(n));r&&(U(ie)&&t.store.handleEdgeSelection(U(n)),t.onedgeclick?.({event:e,edge:r}))}function ue(e,r){let i=t.store.edgeLookup.get(U(n));i&&r({event:e,edge:i})}function de(e){if(!t.store.disableKeyboardA11y&&ad.includes(e.key)&&U(ie)){let{unselectNodesAndEdges:r,addSelectedEdges:i}=t.store;e.key===`Escape`?(re?.blur(),r({edges:[t.edge]})):i([U(n)])}}var fe=ni(),pe=R(fe),me=e=>{var g=Wm();let S;var C=L(g);Zi(C,()=>({class:[`svelte-flow__edge`,U(ne)],"data-id":U(n),onclick:le,oncontextmenu:t.onedgecontextmenu?e=>{ue(e,t.onedgecontextmenu)}:void 0,onpointerenter:t.onedgepointerenter?e=>{ue(e,t.onedgepointerenter)}:void 0,onpointerleave:t.onedgepointerleave?e=>{ue(e,t.onedgepointerleave)}:void 0,"aria-label":U(D)===null?void 0:U(D)?U(D):`Edge from ${U(r)} to ${U(i)}`,"aria-describedby":U(ae)?`${Rm}-${t.store.flowId}`:void 0,role:t.edge.ariaRole??(U(ae)?`group`:`img`),"aria-roledescription":`edge`,onkeydown:U(ae)?de:void 0,tabindex:U(ae)?0:void 0,...t.edge.domAttributes,[Ri]:{animated:U(d),selected:U(f),selectable:U(ie)}})),bi(L(C),()=>U(oe),(e,t)=>{t(e,{get id(){return U(n)},get source(){return U(r)},get target(){return U(i)},get sourceX(){return U(a)},get sourceY(){return U(o)},get targetX(){return U(s)},get targetY(){return U(c)},get sourcePosition(){return U(l)},get targetPosition(){return U(u)},get animated(){return U(d)},get selected(){return U(f)},get label(){return U(p)},get labelStyle(){return U(m)},get data(){return U(h)},get style(){return U(_)},get interactionWidth(){return U(v)},get selectable(){return U(ie)},get deletable(){return U(ee)},get type(){return U(y)},get sourceHandleId(){return U(b)},get targetHandleId(){return U(x)},get markerStart(){return U(se)},get markerEnd(){return U(ce)}})}),A(C),ca(C,e=>re=e,()=>re),A(g),B(()=>S=Ni(g,``,S,{"z-index":U(te)})),K(e,g)};J(pe,e=>{U(E)||e(me)}),K(e,fe),M()}var Km=ei(`<defs></defs>`);function qm(e,t){j(t,!1);let n=bm();la();var r=Km();pi(r,5,()=>n.markers,e=>e.id,(e,t)=>{Zm(e,ha(()=>U(t)))}),A(r),K(e,r),M()}var Jm=ei(`<polyline class="arrow" fill="none" stroke-linecap="round" stroke-linejoin="round" points="-5,-4 0,0 -5,4"></polyline>`),Ym=ei(`<polyline class="arrowclosed" stroke-linecap="round" stroke-linejoin="round" points="-5,-4 0,0 -5,4 -5,-4"></polyline>`),Xm=ei(`<marker class="svelte-flow__arrowhead" viewBox="-10 -10 20 20" refX="0" refY="0"><!></marker>`);function Zm(e,t){j(t,!0);let n=X(t,`width`,3,12.5),r=X(t,`height`,3,12.5),i=X(t,`markerUnits`,3,`strokeWidth`),a=X(t,`orient`,3,`auto-start-reverse`),o=X(t,`color`,3,`none`);var s=Xm(),c=L(s),l=e=>{var n=Jm();let r;B(()=>{Y(n,`stroke-width`,t.strokeWidth),r=Ni(n,``,r,{stroke:o()})}),K(e,n)},u=e=>{var n=Ym();let r;B(()=>{Y(n,`stroke-width`,t.strokeWidth),r=Ni(n,``,r,{stroke:o(),fill:o()})}),K(e,n)};J(c,e=>{t.type===fd.Arrow?e(l):t.type===fd.ArrowClosed&&e(u,1)}),A(s),B(()=>{Y(s,`id`,t.id),Y(s,`markerWidth`,`${n()}`),Y(s,`markerHeight`,`${r()}`),Y(s,`markerUnits`,i()),Y(s,`orient`,a())}),K(e,s),M()}var Qm=G(`<div class="svelte-flow__edges"><svg class="svelte-flow__marker"><!></svg> <!></div>`);function $m(e,t){j(t,!0);let n=X(t,`store`,15);var r=Qm(),i=L(r);qm(L(i),{}),A(i),pi(z(i,2),17,()=>n().visible.edges.values(),e=>e.id,(e,r)=>{Gm(e,{get edge(){return U(r)},get onedgeclick(){return t.onedgeclick},get onedgecontextmenu(){return t.onedgecontextmenu},get onedgepointerenter(){return t.onedgepointerenter},get onedgepointerleave(){return t.onedgepointerleave},get store(){return n()},set store(e){n(e)}})}),A(r),K(e,r),M()}var eh=G(`<div class="svelte-flow__selection svelte-1vr3gfi"></div>`);function th(e,t){j(t,!0);let n=X(t,`x`,3,0),r=X(t,`y`,3,0),i=X(t,`width`,3,0),a=X(t,`height`,3,0),o=X(t,`isVisible`,3,!0);var s=ni(),c=R(s),l=e=>{var t=eh();let o;B(e=>o=Ni(t,``,o,e),[()=>({width:typeof i()==`string`?i():$p(i()),height:typeof a()==`string`?a():$p(a()),transform:`translate(${n()}px, ${r()}px)`})]),K(e,t)};J(c,e=>{o()&&e(l)}),K(e,s),M()}var nh=G(`<div><!></div>`);function rh(e,t){j(t,!0);let n=F(void 0);Nn(()=>{t.store.disableKeyboardA11y||U(n)?.focus({preventScroll:!0})});let r=P(()=>{if(t.store.selectionRectMode===`nodes`){t.store.nodes;let e=Sd(t.store.nodeLookup,{filter:e=>!!e.selected});if(e.width>0&&e.height>0)return e}return null});function i(e){let n=t.store.nodes.filter(e=>e.selected);t.onselectioncontextmenu?.({nodes:n,event:e})}function a(e){let n=t.store.nodes.filter(e=>e.selected);t.onselectionclick?.({nodes:n,event:e})}function o(e){Object.prototype.hasOwnProperty.call(em,e.key)&&(e.preventDefault(),t.store.moveSelectedNodes(em[e.key],e.shiftKey?4:1))}var s=ni(),c=R(s),l=e=>{var s=nh();let c;th(L(s),{width:`100%`,height:`100%`,x:0,y:0}),A(s),xi(s,(e,t)=>Nm?.(e,t),()=>({disabled:!1,store:t.store,onDrag:(e,n,r,i)=>{t.onnodedrag?.({event:e,targetNode:null,nodes:i})},onDragStart:(e,n,r,i)=>{t.onnodedragstart?.({event:e,targetNode:null,nodes:i})},onDragStop:(e,n,r,i)=>{t.onnodedragstop?.({event:e,targetNode:null,nodes:i})}})),ca(s,e=>I(n,e),()=>U(n)),B(e=>{ji(s,1,Ti([`svelte-flow__selection-wrapper`,t.store.noPanClass]),`svelte-sf2y5e`),Y(s,`role`,t.store.disableKeyboardA11y?void 0:`button`),Y(s,`tabindex`,t.store.disableKeyboardA11y?void 0:-1),c=Ni(s,``,c,e)},[()=>({width:$p(U(r).width),height:$p(U(r).height),transform:`translate(${U(r).x??``}px, ${U(r).y??``}px)`})]),W(`contextmenu`,s,i),W(`click`,s,a),W(`keydown`,s,function(...e){(t.store.disableKeyboardA11y?void 0:o)?.apply(this,e)}),K(e,s)},u=P(()=>t.store.selectionRectMode===`nodes`&&U(r)&&Hd(U(r).x)&&Hd(U(r).y));J(c,e=>{U(u)&&e(l)}),K(e,s),M()}Kr([`contextmenu`,`click`,`keydown`]);function ih(e){switch(e){case`ctrl`:return 8;case`shift`:return 4;case`alt`:return 2;case`meta`:return 1}}function ah(e,t){let{enabled:n=!0,trigger:r,type:i=`keydown`}=t;function a(t){let n=Array.isArray(r)?r:[r],i=[t.metaKey,t.altKey,t.shiftKey,t.ctrlKey].reduce((e,t,n)=>t?e|1<<n:e,0);for(let r of n){let n={preventDefault:!1,enabled:!0,...r},{modifier:a,key:o,callback:s,preventDefault:c,enabled:l}=n;if(l){if(t.key!==o)continue;if(a===null||a===!1){if(i!==0)continue}else if(a!==void 0&&a?.[0]?.length>0){let e=Array.isArray(a)?a:[a],t=!1;for(let n of e)if((Array.isArray(n)?n:[n]).reduce((e,t)=>e|ih(t),0)===i){t=!0;break}if(!t)continue}c&&t.preventDefault();let r={node:e,trigger:n,originalEvent:t};e.dispatchEvent(new CustomEvent(`shortcut`,{detail:r})),s?.(r)}}}let o;return n&&(o=Wr(e,i,a)),{update:t=>{let{enabled:s=!0,type:c=`keydown`}=t;n&&(!s||i!==c)?o?.():!n&&s&&(o=Wr(e,c,a)),n=s,i=c,r=t.trigger},destroy:()=>{o?.()}}}function oh(){let e=P(bm),t=t=>{let n=Zp(t)?t:U(e).nodeLookup.get(t.id),r=n.parentId?tf(n.position,n.measured,n.parentId,U(e).nodeLookup,U(e).nodeOrigin):n.position;return Ld({...n,position:r,width:n.measured?.width??n.width,height:n.measured?.height??n.height})};function n(t,n,r={replace:!1}){U(e).nodes=Or(()=>U(e).nodes).map(e=>{if(e.id===t){let t=typeof n==`function`?n(e):n;return r?.replace&&Zp(t)?t:{...e,...t}}return e})}function r(t,n,r={replace:!1}){U(e).edges=Or(()=>U(e).edges).map(e=>{if(e.id===t){let t=typeof n==`function`?n(e):n;return r.replace&&Qp(t)?t:{...e,...t}}return e})}let i=t=>U(e).nodeLookup.get(t);return{zoomIn:U(e).zoomIn,zoomOut:U(e).zoomOut,getInternalNode:i,getNode:e=>i(e)?.internals.userNode,getNodes:t=>t===void 0?U(e).nodes:sh(U(e).nodeLookup,t),getEdge:t=>U(e).edgeLookup.get(t),getEdges:t=>t===void 0?U(e).edges:sh(U(e).edgeLookup,t),setZoom:(t,n)=>{let r=U(e).panZoom;return r?r.scaleTo(t,n):Promise.resolve(!1)},getZoom:()=>U(e).viewport.zoom,setViewport:async(t,n)=>{let r=U(e).viewport;return U(e).panZoom?(await U(e).panZoom.setViewport({x:t.x??r.x,y:t.y??r.y,zoom:t.zoom??r.zoom},n),Promise.resolve(!0)):Promise.resolve(!1)},getViewport:()=>Ge(U(e).viewport),setCenter:async(t,n,r)=>U(e).setCenter(t,n,r),fitView:t=>U(e).fitView(t),fitBounds:async(t,n)=>{if(!U(e).panZoom)return Promise.resolve(!1);let r=Xd(t,U(e).width,U(e).height,U(e).minZoom,U(e).maxZoom,n?.padding??.1);return await U(e).panZoom.setViewport(r,{duration:n?.duration,ease:n?.ease,interpolate:n?.interpolate}),Promise.resolve(!0)},getIntersectingNodes:(n,r=!0,i)=>{let a=Vd(n),o=a?n:t(n);return o?(i||U(e).nodes).filter(t=>{let i=U(e).nodeLookup.get(t.id);if(!i||!a&&t.id===n.id)return!1;let s=Ld(i),c=Bd(s,o);return r&&c>0||c>=s.width*s.height||c>=o.width*o.height}):[]},isNodeIntersecting:(e,n,r=!0)=>{let i=Vd(e)?e:t(e);if(!i)return!1;let a=Bd(i,n);return r&&a>0||a>=n.width*n.height||a>=i.width*i.height},deleteElements:async({nodes:t=[],edges:n=[]})=>{let{nodes:r,edges:i}=await Od({nodesToRemove:t,edgesToRemove:n,nodes:U(e).nodes,edges:U(e).edges,onBeforeDelete:U(e).onbeforedelete});return r&&(U(e).nodes=Or(()=>U(e).nodes).filter(e=>!r.some(({id:t})=>t===e.id))),i&&(U(e).edges=Or(()=>U(e).edges).filter(e=>!i.some(({id:t})=>t===e.id))),(r.length>0||i.length>0)&&U(e).ondelete?.({nodes:r,edges:i}),{deletedNodes:r,deletedEdges:i}},screenToFlowPosition:(t,n={snapToGrid:!0})=>{if(!U(e).domNode)return t;let r=n.snapToGrid?U(e).snapGrid:!1,{x:i,y:a,zoom:o}=U(e).viewport,{x:s,y:c}=U(e).domNode.getBoundingClientRect();return Gd({x:t.x-s,y:t.y-c},[i,a,o],r!==null,r||[1,1])},flowToScreenPosition:t=>{if(!U(e).domNode)return t;let{x:n,y:r,zoom:i}=U(e).viewport,{x:a,y:o}=U(e).domNode.getBoundingClientRect(),s=Kd(t,[n,r,i]);return{x:s.x+a,y:s.y+o}},toObject:()=>structuredClone({nodes:[...U(e).nodes],edges:[...U(e).edges],viewport:{...U(e).viewport}}),updateNode:n,updateNodeData:(t,r,i)=>{let a=U(e).nodeLookup.get(t)?.internals.userNode;if(!a)return;let o=typeof r==`function`?r(a):r;n(t,e=>({...e,data:i?.replace?o:{...e.data,...o}}))},updateEdge:r,getNodesBounds:t=>xd(t,{nodeLookup:U(e).nodeLookup,nodeOrigin:U(e).nodeOrigin}),getHandleConnections:({type:t,id:n,nodeId:r})=>Array.from(U(e).connectionLookup.get(`${r}-${t}-${n??null}`)?.values()??[])}}function sh(e,t){let n=[];for(let r of t){let t=e.get(r);if(t){let e=`internals`in t?t.internals?.userNode:t;n.push(e)}}return n}function ch(e,t){j(t,!0);let n=X(t,`store`,15),r=X(t,`selectionKey`,3,`Shift`),i=X(t,`multiSelectionKey`,19,()=>Zd()?`Meta`:`Control`),a=X(t,`deleteKey`,3,`Backspace`),o=X(t,`panActivationKey`,3,` `),s=X(t,`zoomActivationKey`,19,()=>Zd()?`Meta`:`Control`),{deleteElements:c}=oh();function l(e){return typeof e==`object`&&!!e}function u(e){return l(e)&&e.modifier||[]}function d(e){return e==null?``:l(e)?e.key:e}function f(e,t){return(Array.isArray(e)?e:[e]).map(e=>{let n=d(e);return{key:n,modifier:u(e),enabled:n!==null,callback:t}})}function p(){n(n().selectionRect=null,!0),n(n().selectionKeyPressed=!1,!0),n(n().multiselectionKeyPressed=!1,!0),n(n().deleteKeyPressed=!1,!0),n(n().panActivationKeyPressed=!1,!0),n(n().zoomActivationKeyPressed=!1,!0)}function m(){c({nodes:n().nodes.filter(e=>e.selected),edges:n().edges.filter(e=>e.selected)})}Gr(`blur`,un,p),Gr(`contextmenu`,un,p),xi(un,(e,t)=>ah?.(e,t),()=>({trigger:f(r(),()=>n(n().selectionKeyPressed=!0,!0)),type:`keydown`})),xi(un,(e,t)=>ah?.(e,t),()=>({trigger:f(r(),()=>n(n().selectionKeyPressed=!1,!0)),type:`keyup`})),xi(un,(e,t)=>ah?.(e,t),()=>({trigger:f(i(),()=>{n(n().multiselectionKeyPressed=!0,!0)}),type:`keydown`})),xi(un,(e,t)=>ah?.(e,t),()=>({trigger:f(i(),()=>n(n().multiselectionKeyPressed=!1,!0)),type:`keyup`})),xi(un,(e,t)=>ah?.(e,t),()=>({trigger:f(a(),e=>{!(e.originalEvent.ctrlKey||e.originalEvent.metaKey||e.originalEvent.shiftKey)&&!cf(e.originalEvent)&&(n(n().deleteKeyPressed=!0,!0),m())}),type:`keydown`})),xi(un,(e,t)=>ah?.(e,t),()=>({trigger:f(a(),()=>n(n().deleteKeyPressed=!1,!0)),type:`keyup`})),xi(un,(e,t)=>ah?.(e,t),()=>({trigger:f(o(),()=>n(n().panActivationKeyPressed=!0,!0)),type:`keydown`})),xi(un,(e,t)=>ah?.(e,t),()=>({trigger:f(o(),()=>n(n().panActivationKeyPressed=!1,!0)),type:`keyup`})),xi(un,(e,t)=>ah?.(e,t),()=>({trigger:f(s(),()=>n(n().zoomActivationKeyPressed=!0,!0)),type:`keydown`})),xi(un,(e,t)=>ah?.(e,t),()=>({trigger:f(s(),()=>n(n().zoomActivationKeyPressed=!1,!0)),type:`keyup`})),M()}var lh=ei(`<path fill="none" class="svelte-flow__connection-path"></path>`),uh=ei(`<svg class="svelte-flow__connectionline"><g><!></g></svg>`);function dh(e,t){j(t,!0);let n=P(()=>{if(!t.store.connection.inProgress)return``;let e={sourceX:t.store.connection.from.x,sourceY:t.store.connection.from.y,sourcePosition:t.store.connection.fromPosition,targetX:t.store.connection.to.x,targetY:t.store.connection.to.y,targetPosition:t.store.connection.toPosition};switch(t.type){case dd.Bezier:{let[t]=hf(e);return t}case dd.Straight:{let[t]=Sf(e);return t}case dd.Step:case dd.SmoothStep:{let[n]=Of({...e,borderRadius:t.type===dd.Step?0:void 0});return n}}});var r=ni(),i=R(r),a=e=>{var r=uh(),i=L(r),a=L(i),o=e=>{var n=ni();bi(R(n),()=>t.LineComponent,(e,t)=>{t(e,{})}),K(e,n)},s=e=>{var r=lh();B(()=>{Y(r,`d`,U(n)),Ni(r,t.style)}),K(e,r)};J(a,e=>{t.LineComponent?e(o):e(s,-1)}),A(i),A(r),B(e=>{Y(r,`width`,t.store.width),Y(r,`height`,t.store.height),Ni(r,t.containerStyle),ji(i,0,e)},[()=>Ti([`svelte-flow__connection`,gd(t.store.connection.isValid)])]),K(e,r)};J(i,e=>{t.store.connection.inProgress&&e(a)}),K(e,r),M()}var fh=G(`<div><!></div>`);function ph(e,t){j(t,!0);let n=X(t,`position`,3,`top-right`),r=pa(t,[`$$slots`,`$$events`,`$$legacy`,`position`,`style`,`class`,`children`]),i=P(()=>`${n()}`.split(`-`));var a=fh();Zi(a,e=>({class:e,style:t.style,...r}),[()=>[`svelte-flow__panel`,t.class,...U(i)]]),yi(L(a),()=>t.children??f),A(a),K(e,a),M()}var mh=G(`<a href="https://svelteflow.dev" target="_blank" rel="noopener noreferrer" aria-label="Svelte Flow attribution">Svelte Flow</a>`);function hh(e,t){j(t,!0);let n=X(t,`position`,3,`bottom-right`);var r=ni(),i=R(r),a=e=>{ph(e,{get position(){return n()},class:`svelte-flow__attribution`,"data-message":`Feel free to remove the attribution or check out how you could support us: https://svelteflow.dev/support-us`,children:(e,t)=>{K(e,mh())},$$slots:{default:!0}})};J(i,e=>{t.proOptions?.hideAttribution||e(a)}),K(e,r),M()}var gh=G(`<div><!></div>`);function _h(e,t){j(t,!0);let n=X(t,`domNode`,15),r=X(t,`clientWidth`,15),i=X(t,`clientHeight`,15),a=P(()=>t.rest.class),o=P(()=>v(t.rest,`id.class.nodeTypes.edgeTypes.colorMode.isValidConnection.onmove.onmovestart.onmoveend.onflowerror.ondelete.onbeforedelete.onbeforeconnect.onconnect.onconnectstart.onconnectend.onbeforereconnect.onreconnect.onreconnectstart.onreconnectend.onclickconnectstart.onclickconnectend.oninit.onselectionchange.onselectiondragstart.onselectiondrag.onselectiondragstop.onselectionstart.onselectionend.clickConnect.fitView.fitViewOptions.nodeOrigin.nodeDragThreshold.connectionDragThreshold.minZoom.maxZoom.initialViewport.connectionRadius.connectionMode.selectionMode.selectNodesOnDrag.snapGrid.defaultMarkerColor.translateExtent.nodeExtent.onlyRenderVisibleElements.autoPanOnConnect.autoPanOnNodeDrag.colorModeSSR.defaultEdgeOptions.elevateNodesOnSelect.elevateEdgesOnSelect.nodesDraggable.autoPanOnNodeFocus.nodesConnectable.elementsSelectable.nodesFocusable.edgesFocusable.disableKeyboardA11y.noDragClass.noPanClass.noWheelClass.ariaLabelConfig.autoPanSpeed.panOnScrollSpeed.zIndexMode`.split(`.`)));function s(e){e.currentTarget.scrollTo({top:0,left:0,behavior:`auto`}),t.rest.onscroll&&t.rest.onscroll(e)}var c=gh();Zi(c,e=>({class:[`svelte-flow`,`svelte-flow__container`,U(a),t.colorMode],"data-testid":`svelte-flow__wrapper`,role:`application`,onscroll:s,...U(o),[zi]:e}),[()=>({width:$p(t.width),height:$p(t.height)})],void 0,void 0,`svelte-mkap6j`),yi(L(c),()=>t.children??f),A(c),ca(c,e=>n(e),()=>n()),oa(c,`clientHeight`,i),oa(c,`clientWidth`,r),K(e,c),M()}var vh=G(`<div class="svelte-flow__viewport-back svelte-flow__container"></div> <!> <div class="svelte-flow__edge-labels svelte-flow__container"></div> <!> <!> <!> <div class="svelte-flow__viewport-front svelte-flow__container"></div>`,1),yh=G(`<!> <!>`,1),bh=G(`<!> <!> <!> <!> <!>`,1);function xh(e,t){j(t,!0);let n=X(t,`paneClickDistance`,3,1),r=X(t,`nodeClickDistance`,3,1),i=X(t,`panOnScrollMode`,19,()=>cd.Free),a=X(t,`preventScrolling`,3,!0),o=X(t,`zoomOnScroll`,3,!0),s=X(t,`zoomOnDoubleClick`,3,!0),c=X(t,`zoomOnPinch`,3,!0),l=X(t,`panOnScroll`,3,!1),u=X(t,`panOnScrollSpeed`,3,.5),d=X(t,`panOnDrag`,3,!0),p=X(t,`selectionOnDrag`,3,!1),m=X(t,`connectionLineType`,19,()=>dd.Bezier),h=X(t,`nodes`,31,()=>sn([])),g=X(t,`edges`,31,()=>sn([])),_=X(t,`viewport`,15,void 0),v=pa(t,`$$slots.$$events.$$legacy.width.height.proOptions.selectionKey.deleteKey.panActivationKey.multiSelectionKey.zoomActivationKey.paneClickDistance.nodeClickDistance.onmovestart.onmoveend.onmove.oninit.onnodeclick.onnodecontextmenu.onnodedrag.onnodedragstart.onnodedragstop.onnodepointerenter.onnodepointermove.onnodepointerleave.onselectionclick.onselectioncontextmenu.onselectionstart.onselectionend.onedgeclick.onedgecontextmenu.onedgepointerenter.onedgepointerleave.onpaneclick.onpanecontextmenu.panOnScrollMode.preventScrolling.zoomOnScroll.zoomOnDoubleClick.zoomOnPinch.panOnScroll.panOnScrollSpeed.panOnDrag.selectionOnDrag.connectionLineComponent.connectionLineStyle.connectionLineContainerStyle.connectionLineType.attributionPosition.children.nodes.edges.viewport`.split(`.`)),y=Sm({props:v,width:t.width,height:t.height,get nodes(){return h()},set nodes(e){h(e)},get edges(){return g()},set edges(e){g(e)},get viewport(){return _()},set viewport(e){_(e)}}),b=Ye(xm);b&&b.setStore&&b.setStore(y),Xe(xm,{provider:!1,getStore(){return y}}),Nn(()=>{let e={nodes:y.selectedNodes,edges:y.selectedEdges};Or(()=>t.onselectionchange)?.(e);for(let t of y.selectionChangeHandlers.values())t(e)}),_a(()=>{y.reset()}),_h(e,{get colorMode(){return y.colorMode},get width(){return t.width},get height(){return t.height},get rest(){return v},get domNode(){return y.domNode},set domNode(e){y.domNode=e},get clientWidth(){return y.width},set clientWidth(e){y.width=e},get clientHeight(){return y.height},set clientHeight(e){y.height=e},children:(e,h)=>{var g=bh(),_=R(g);ch(_,{get selectionKey(){return t.selectionKey},get deleteKey(){return t.deleteKey},get panActivationKey(){return t.panActivationKey},get multiSelectionKey(){return t.multiSelectionKey},get zoomActivationKey(){return t.zoomActivationKey},get store(){return y},set store(e){y=e}});var v=z(_,2);Tm(v,{get panOnScrollMode(){return i()},get preventScrolling(){return a()},get zoomOnScroll(){return o()},get zoomOnDoubleClick(){return s()},get zoomOnPinch(){return c()},get panOnScroll(){return l()},get panOnScrollSpeed(){return u()},get panOnDrag(){return d()},get paneClickDistance(){return n()},get selectionOnDrag(){return p()},get onmovestart(){return t.onmovestart},get onmove(){return t.onmove},get onmoveend(){return t.onmoveend},get oninit(){return t.oninit},get store(){return y},set store(e){y=e},children:(e,i)=>{Am(e,{get onpaneclick(){return t.onpaneclick},get onpanecontextmenu(){return t.onpanecontextmenu},get onselectionstart(){return t.onselectionstart},get onselectionend(){return t.onselectionend},get panOnDrag(){return d()},get paneClickDistance(){return n()},get selectionOnDrag(){return p()},get store(){return y},set store(e){y=e},children:(e,n)=>{var i=yh(),a=R(i);Mm(a,{get store(){return y},set store(e){y=e},children:(e,n)=>{var i=vh(),a=z(R(i),2);$m(a,{get onedgeclick(){return t.onedgeclick},get onedgecontextmenu(){return t.onedgecontextmenu},get onedgepointerenter(){return t.onedgepointerenter},get onedgepointerleave(){return t.onedgepointerleave},get store(){return y},set store(e){y=e}});var o=z(a,4);dh(o,{get type(){return m()},get LineComponent(){return t.connectionLineComponent},get containerStyle(){return t.connectionLineContainerStyle},get style(){return t.connectionLineStyle},get store(){return y},set store(e){y=e}});var s=z(o,2);Um(s,{get nodeClickDistance(){return r()},get onnodeclick(){return t.onnodeclick},get onnodecontextmenu(){return t.onnodecontextmenu},get onnodepointerenter(){return t.onnodepointerenter},get onnodepointermove(){return t.onnodepointermove},get onnodepointerleave(){return t.onnodepointerleave},get onnodedrag(){return t.onnodedrag},get onnodedragstart(){return t.onnodedragstart},get onnodedragstop(){return t.onnodedragstop},get store(){return y},set store(e){y=e}}),rh(z(s,2),{get onselectionclick(){return t.onselectionclick},get onselectioncontextmenu(){return t.onselectioncontextmenu},get onnodedrag(){return t.onnodedrag},get onnodedragstart(){return t.onnodedragstart},get onnodedragstop(){return t.onnodedragstop},get store(){return y},set store(e){y=e}}),Fe(2),K(e,i)},$$slots:{default:!0}});var o=z(a,2);{let e=P(()=>!!(y.selectionRect&&y.selectionRectMode===`user`)),t=P(()=>y.selectionRect?.width),n=P(()=>y.selectionRect?.height),r=P(()=>y.selectionRect?.x),i=P(()=>y.selectionRect?.y);th(o,{get isVisible(){return U(e)},get width(){return U(t)},get height(){return U(n)},get x(){return U(r)},get y(){return U(i)}})}K(e,i)},$$slots:{default:!0}})},$$slots:{default:!0}});var b=z(v,2);hh(b,{get proOptions(){return t.proOptions},get position(){return t.attributionPosition}});var x=z(b,2);Im(x,{get store(){return y}}),yi(z(x,2),()=>t.children??f),K(e,g)},$$slots:{default:!0}}),M()}var Sh=G(`<button><!></button>`);function Ch(e,t){let n=pa(t,[`$$slots`,`$$events`,`$$legacy`,`class`,`bgColor`,`bgColorHover`,`color`,`colorHover`,`borderColor`,`onclick`,`children`]);var r=Sh();Zi(r,()=>({type:`button`,onclick:t.onclick,class:[`svelte-flow__controls-button`,t.class],...n,[zi]:{"--xy-controls-button-background-color-props":t.bgColor,"--xy-controls-button-background-color-hover-props":t.bgColorHover,"--xy-controls-button-color-props":t.color,"--xy-controls-button-color-hover-props":t.colorHover,"--xy-controls-button-border-color-props":t.borderColor}})),yi(L(r),()=>t.children??f),A(r),K(e,r)}var wh=ei(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z"></path></svg>`);function Th(e){K(e,wh())}var Eh=ei(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 5"><path d="M0 0h32v4.2H0z"></path></svg>`);function Dh(e){K(e,Eh())}var Oh=ei(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 30"><path d="M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z"></path></svg>`);function kh(e){K(e,Oh())}var Ah=ei(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 32"><path d="M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z"></path></svg>`);function jh(e){K(e,Ah())}var Mh=ei(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 32"><path d="M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z"></path></svg>`);function Nh(e){K(e,Mh())}var Ph=G(`<!> <!>`,1),Fh=G(`<!> <!> <!> <!> <!> <!>`,1);function Ih(e,t){j(t,!0);let n=X(t,`position`,3,`bottom-left`),r=X(t,`orientation`,3,`vertical`),i=X(t,`showZoom`,3,!0),a=X(t,`showFitView`,3,!0),o=X(t,`showLock`,3,!0),s=pa(t,[`$$slots`,`$$events`,`$$legacy`,`position`,`orientation`,`showZoom`,`showFitView`,`showLock`,`style`,`class`,`buttonBgColor`,`buttonBgColorHover`,`buttonColor`,`buttonColorHover`,`buttonBorderColor`,`fitViewOptions`,`children`,`before`,`after`]),c=P(bm),l={bgColor:t.buttonBgColor,bgColorHover:t.buttonBgColorHover,color:t.buttonColor,colorHover:t.buttonColorHover,borderColor:t.buttonBorderColor},u=P(()=>U(c).nodesDraggable||U(c).nodesConnectable||U(c).elementsSelectable),d=P(()=>U(c).viewport.zoom<=U(c).minZoom),f=P(()=>U(c).viewport.zoom>=U(c).maxZoom),p=P(()=>U(c).ariaLabelConfig),m=P(()=>r()===`horizontal`?`horizontal`:`vertical`),h=()=>{U(c).zoomIn()},g=()=>{U(c).zoomOut()},_=()=>{U(c).fitView(t.fitViewOptions)},v=()=>{let e=!U(u);U(c).nodesDraggable=e,U(c).nodesConnectable=e,U(c).elementsSelectable=e};{let r=P(()=>[`svelte-flow__controls`,U(m),t.class]);ph(e,ha({get class(){return U(r)},get position(){return n()},"data-testid":`svelte-flow__controls`,get"aria-label"(){return U(p)[`controls.ariaLabel`]},get style(){return t.style}},()=>s,{children:(e,n)=>{var r=Fh(),s=R(r),c=e=>{var n=ni();yi(R(n),()=>t.before),K(e,n)};J(s,e=>{t.before&&e(c)});var m=z(s,2),y=e=>{var t=Ph(),n=R(t);Ch(n,ha({onclick:h,class:`svelte-flow__controls-zoomin`,get title(){return U(p)[`controls.zoomIn.ariaLabel`]},get"aria-label"(){return U(p)[`controls.zoomIn.ariaLabel`]},get disabled(){return U(f)}},()=>l,{children:(e,t)=>{Th(e,{})},$$slots:{default:!0}})),Ch(z(n,2),ha({onclick:g,class:`svelte-flow__controls-zoomout`,get title(){return U(p)[`controls.zoomOut.ariaLabel`]},get"aria-label"(){return U(p)[`controls.zoomOut.ariaLabel`]},get disabled(){return U(d)}},()=>l,{children:(e,t)=>{Dh(e,{})},$$slots:{default:!0}})),K(e,t)};J(m,e=>{i()&&e(y)});var b=z(m,2),x=e=>{Ch(e,ha({class:`svelte-flow__controls-fitview`,onclick:_,get title(){return U(p)[`controls.fitView.ariaLabel`]},get"aria-label"(){return U(p)[`controls.fitView.ariaLabel`]}},()=>l,{children:(e,t)=>{kh(e,{})},$$slots:{default:!0}}))};J(b,e=>{a()&&e(x)});var S=z(b,2),C=e=>{Ch(e,ha({class:`svelte-flow__controls-interactive`,onclick:v,get title(){return U(p)[`controls.interactive.ariaLabel`]},get"aria-label"(){return U(p)[`controls.interactive.ariaLabel`]}},()=>l,{children:(e,t)=>{var n=ni(),r=R(n),i=e=>{Nh(e,{})},a=e=>{jh(e,{})};J(r,e=>{U(u)?e(i):e(a,-1)}),K(e,n)},$$slots:{default:!0}}))};J(S,e=>{o()&&e(C)});var w=z(S,2),T=e=>{var n=ni();yi(R(n),()=>t.children),K(e,n)};J(w,e=>{t.children&&e(T)});var ee=z(w,2),E=e=>{var n=ni();yi(R(n),()=>t.after),K(e,n)};J(ee,e=>{t.after&&e(E)}),K(e,r)},$$slots:{default:!0}}))}M()}var Lh;(function(e){e.Lines=`lines`,e.Dots=`dots`,e.Cross=`cross`})(Lh||={});var Rh=ei(`<circle></circle>`);function zh(e,t){var n=Rh();B(()=>{Y(n,`cx`,t.radius),Y(n,`cy`,t.radius),Y(n,`r`,t.radius),ji(n,0,Ti([`svelte-flow__background-pattern`,`dots`,t.class]))}),K(e,n)}var Bh=ei(`<path></path>`);function Vh(e,t){j(t,!0);var n=Bh();B(()=>{Y(n,`stroke-width`,t.lineWidth),Y(n,`d`,`M${t.dimensions[0]/2} 0 V${t.dimensions[1]} M0 ${t.dimensions[1]/2} H${t.dimensions[0]}`),ji(n,0,Ti([`svelte-flow__background-pattern`,t.variant,t.class]))}),K(e,n),M()}var Hh={[Lh.Dots]:1,[Lh.Lines]:1,[Lh.Cross]:6},Uh=ei(`<svg data-testid="svelte-flow__background"><pattern patternUnits="userSpaceOnUse"><!></pattern><rect x="0" y="0" width="100%" height="100%"></rect></svg>`);function Wh(e,t){j(t,!0);let n=X(t,`variant`,19,()=>Lh.Dots),r=X(t,`gap`,3,20),i=X(t,`lineWidth`,3,1),a=P(bm),o=P(()=>n()===Lh.Dots),s=P(()=>n()===Lh.Cross),c=P(()=>Array.isArray(r())?r():[r(),r()]),l=P(()=>`background-pattern-${U(a).flowId}-${t.id??``}`),u=P(()=>[U(c)[0]*U(a).viewport.zoom||1,U(c)[1]*U(a).viewport.zoom||1]),d=P(()=>(t.size??Hh[n()])*U(a).viewport.zoom),f=P(()=>U(s)?[U(d),U(d)]:U(u)),p=P(()=>U(o)?[U(d)/2,U(d)/2]:[U(f)[0]/2,U(f)[1]/2]);var m=Uh();let h;var g=L(m),_=L(g),v=e=>{{let n=P(()=>U(d)/2);zh(e,{get radius(){return U(n)},get class(){return t.patternClass}})}},y=e=>{Vh(e,{get dimensions(){return U(f)},get variant(){return n()},get lineWidth(){return i()},get class(){return t.patternClass}})};J(_,e=>{U(o)?e(v):e(y,-1)}),A(g);var b=z(g);A(m),B(()=>{ji(m,0,Ti([`svelte-flow__background`,`svelte-flow__container`,t.class])),h=Ni(m,``,h,{"--xy-background-color-props":t.bgColor,"--xy-background-pattern-color-props":t.patternColor}),Y(g,`id`,U(l)),Y(g,`x`,U(a).viewport.x%U(u)[0]),Y(g,`y`,U(a).viewport.y%U(u)[1]),Y(g,`width`,U(u)[0]),Y(g,`height`,U(u)[1]),Y(g,`patternTransform`,`translate(-${U(p)[0]},-${U(p)[1]})`),Y(b,`fill`,`url(#${U(l)})`)}),K(e,m),M()}function Gh(e){let t=P(bm),n=P(()=>U(t).nodeLookup),r=P(()=>U(t).nodes),i=P(()=>(U(r),U(n).get(e)));return{get current(){return U(i)}}}var Kh=ei(`<rect></rect>`);function qh(e,t){j(t,!0);let n=X(t,`borderRadius`,3,5),r=X(t,`strokeWidth`,3,2),i=P(()=>Gh(t.id)),a=P(()=>{if(!U(i).current)return{width:0,height:0,x:0,y:0};let{width:e,height:n}=$d(U(i).current);return{width:t.width??e,height:t.height??n,x:t.x??U(i).current.internals.positionAbsolute.x,y:t.y??U(i).current.internals.positionAbsolute.y}}),o=P(()=>U(a).width),s=P(()=>U(a).height),c=P(()=>U(a).x),l=P(()=>U(a).y);var u=ni(),d=R(u),f=e=>{let i=P(()=>t.nodeComponent);var a=ni();bi(R(a),()=>U(i),(e,i)=>{i(e,{get id(){return t.id},get x(){return U(c)},get y(){return U(l)},get width(){return U(o)},get height(){return U(s)},get borderRadius(){return n()},get class(){return t.class},get color(){return t.color},get shapeRendering(){return t.shapeRendering},get strokeColor(){return t.strokeColor},get strokeWidth(){return r()},get selected(){return t.selected}})}),K(e,a)},p=e=>{var i=Kh();let a,u;B(()=>{a=ji(i,0,Ti([`svelte-flow__minimap-node`,t.class]),null,a,{selected:t.selected}),Y(i,`x`,U(c)),Y(i,`y`,U(l)),Y(i,`rx`,n()),Y(i,`ry`,n()),Y(i,`width`,U(o)),Y(i,`height`,U(s)),Y(i,`shape-rendering`,t.shapeRendering),u=Ni(i,``,u,{fill:t.color,stroke:t.strokeColor,"stroke-width":r()})}),K(e,i)};J(d,e=>{t.nodeComponent?e(f):e(p,-1)}),K(e,u),M()}function Jh(e,t){let n=gp({domNode:e,panZoom:t.panZoom,getTransform:()=>{let{viewport:e}=t.store;return[e.x,e.y,e.zoom]},getViewScale:t.getViewScale});n.update({translateExtent:t.translateExtent,width:t.width,height:t.height,inversePan:t.inversePan,zoomStep:t.zoomStep,pannable:t.pannable,zoomable:t.zoomable});function r(e){n.update({translateExtent:e.translateExtent,width:e.width,height:e.height,inversePan:e.inversePan,zoomStep:e.zoomStep,pannable:e.pannable,zoomable:e.zoomable})}return{update:r,destroy(){n.destroy()}}}var Yh=e=>e instanceof Function?e:()=>e,Xh=ei(`<title> </title>`),Zh=ei(`<svg class="svelte-flow__minimap-svg" role="img"><!><!><path class="svelte-flow__minimap-mask" fill-rule="evenodd" pointer-events="none"></path></svg>`),Qh=G(`<svelte-css-wrapper style="display: contents"><!></svelte-css-wrapper>`,1);function $h(e,t){j(t,!0);let n=X(t,`position`,3,`bottom-right`),r=X(t,`nodeStrokeColor`,3,`transparent`),i=X(t,`nodeClass`,3,``),a=X(t,`nodeBorderRadius`,3,5),o=X(t,`nodeStrokeWidth`,3,2),s=X(t,`width`,3,200),c=X(t,`height`,3,150),l=X(t,`pannable`,3,!0),u=X(t,`zoomable`,3,!0),d=pa(t,[`$$slots`,`$$events`,`$$legacy`,`position`,`ariaLabel`,`nodeStrokeColor`,`nodeColor`,`nodeClass`,`nodeBorderRadius`,`nodeStrokeWidth`,`nodeComponent`,`bgColor`,`maskColor`,`maskStrokeColor`,`maskStrokeWidth`,`width`,`height`,`pannable`,`zoomable`,`inversePan`,`zoomStep`,`class`]),f=P(bm),p=P(()=>U(f).ariaLabelConfig),m=typeof window>`u`||window.chrome?`crispEdges`:`geometricPrecision`,h=P(()=>`svelte-flow__minimap-desc-${U(f).flowId}`),g=P(()=>({x:-U(f).viewport.x/U(f).viewport.zoom,y:-U(f).viewport.y/U(f).viewport.zoom,width:U(f).width/U(f).viewport.zoom,height:U(f).height/U(f).viewport.zoom})),_=P(()=>zd(Sd(U(f).nodeLookup,{filter:e=>!e.hidden}),U(g))),v=P(()=>U(_).width/s()),y=P(()=>U(_).height/c()),b=P(()=>Math.max(U(v),U(y))),x=P(()=>U(b)*s()),S=P(()=>U(b)*c()),C=P(()=>5*U(b)),w=P(()=>U(_).x-(U(x)-U(_).width)/2-U(C)),T=P(()=>U(_).y-(U(S)-U(_).height)/2-U(C)),ee=P(()=>U(x)+U(C)*2),E=P(()=>U(S)+U(C)*2),te=()=>U(b);var ne=Qh(),D=R(ne);{let e=P(()=>[`svelte-flow__minimap`,t.class]);ci(D,()=>({"--xy-minimap-background-color-props":t.bgColor})),ph(D.lastChild,ha({get position(){return n()},get class(){return U(e)},"data-testid":`svelte-flow__minimap`},()=>d,{children:(e,n)=>{var d=ni(),_=R(d),v=e=>{var n=Zh();let d;var _=L(n),v=e=>{var n=Xh(),r=L(n,!0);A(n),B(()=>{Y(n,`id`,U(h)),q(r,t.ariaLabel??U(p)[`minimap.ariaLabel`])}),K(e,n)};J(_,e=>{(t.ariaLabel??U(p)[`minimap.ariaLabel`])&&e(v)});var y=z(_);pi(y,17,()=>U(f).nodes,e=>e.id,(e,n)=>{let s=P(()=>U(f).nodeLookup.get(U(n).id));var c=ni(),l=R(c),u=e=>{{let c=P(()=>t.nodeColor===void 0?void 0:Yh(t.nodeColor)(U(n))),l=P(()=>Yh(r())(U(n))),u=P(()=>Yh(i())(U(n)));qh(e,{get id(){return U(s).id},get selected(){return U(s).selected},get nodeComponent(){return t.nodeComponent},get color(){return U(c)},get borderRadius(){return a()},get strokeColor(){return U(l)},get strokeWidth(){return o()},get shapeRendering(){return m},get class(){return U(u)}})}},d=P(()=>U(s)&&ef(U(s))&&!U(s).hidden);J(l,e=>{U(d)&&e(u)}),K(e,c)});var x=z(y);A(n),xi(n,(e,t)=>Jh?.(e,t),()=>({store:U(f),panZoom:U(f).panZoom,getViewScale:te,translateExtent:U(f).translateExtent,width:U(f).width,height:U(f).height,inversePan:t.inversePan,zoomStep:t.zoomStep,pannable:l(),zoomable:u()})),B(()=>{Y(n,`width`,s()),Y(n,`height`,c()),Y(n,`viewBox`,`${U(w)??``} ${U(T)??``} ${U(ee)??``} ${U(E)??``}`),Y(n,`aria-labelledby`,U(h)),d=Ni(n,``,d,{"--xy-minimap-mask-background-color-props":t.maskColor,"--xy-minimap-mask-stroke-color-props":t.maskStrokeColor,"--xy-minimap-mask-stroke-width-props":t.maskStrokeWidth?t.maskStrokeWidth*U(b):void 0}),Y(x,`d`,`M${U(w)-U(C)},${U(T)-U(C)}h${U(ee)+U(C)*2}v${U(E)+U(C)*2}h${-U(ee)-U(C)*2}z
      M${U(g).x??``},${U(g).y??``}h${U(g).width??``}v${U(g).height??``}h${-U(g).width}z`)}),K(e,n)};J(_,e=>{U(f).panZoom&&e(v)}),K(e,d)},$$slots:{default:!0}})),A(D)}K(e,ne),M()}var Q=sn({lang:`es`,dict:{en:{title:`aventura`,subtitle:`interactive v2`,test_story:`test story`,engine_opts:`options`,editing:`editing:`,text:`text`,options:`options (buttons)`,add_option:`+ add option`,image:`image`,areas:`areas (image maps)`,add_area:`+ add area`,btn_remove_img:`remove image`,btn_upload_img:`+ upload image`,btn_edit_areas:`[ edit visual areas ]`,placeholder_name:`name (reference)`,placeholder_btn:`btn (visible text)`,placeholder_tooltip:`tooltip (hover text)`,back_canvas:`<- back to canvas`,add_scene:`add new scene`,must_name_scene:`give the scene a name first!`,no_number_scene_name:`scene name cannot start with a number`,btn_create:`+ create`,load_json:`load json`,save_json:`save json`,export_html:`export html`,powered_by:`powered by`,source_code:`source code`,draw_areas:`draw areas:`,no_text:`no text`,mapped_areas:`mapped areas`,empty_area_msg:`click and drag over the image to create an area.`,btn_save_areas:`save areas`,btn_remove:`remove`,leave_empty:`leave empty to hide`,typewriter_speed:`typewriter speed (ms)`,enable_eval:`enable eval tags`,enable_back:`enable back button`,enable_restart:`enable restart button`,adventure_scroll:`adventure scroll (vertical append)`,base_colors:`base colors`,background:`background`,text_color:`text color`,accent_bg:`accent bg`,accent_text:`accent text`,button_colors:`button colors`,btn_bg:`btn bg`,btn_text:`btn text`,hover_bg:`hover bg`,hover_text:`hover text`,geometry_type:`geometry & typography`,btn_border_css:`button border (css)`,container_border_css:`container border (css)`,border_radius:`border radius`,font_family:`font family`,igrama_format:`image format`,testing_story:`testing story...`,no_scenes:`no scenes to test!`,empty_text:`[empty text]`,igrama_integration:`igrama integration`,upload_igrama:`+ upload igrama.json`,remove_igrama:`remove igrama model`,igrama_loaded:`model loaded!`,igrama_rule:`igrama rule`,igrama_placeholder:`e.g. base`,grammar_editor:`grammar editor`,test_grammar:`test grammar`,save_grammar:`save grammar`,invalid_json:`Invalid JSON format. Please check your syntax.`,test_passed:`Grammar test passed! No missing references or circular dependencies.`,err_no_grammar:`There is no grammar to test.`,err_syntax:`Syntax error in rule`,err_missing_ref:`The following rules do not exist, referenced in`,warn_circular:`Circular dependency detected:`,err_parse:`Parsing Error:`,err_invalid_root:`The grammar root must be an Object, not an Array or string.`,err_invalid_rule:`Rules must be an array of strings. Invalid rule:`,warn_empty_rule:`Rule is empty and will generate nothing:`},es:{title:`aventura`,subtitle:`interactiva v2`,test_story:`probar historia`,engine_opts:`opciones`,editing:`editando:`,text:`texto`,options:`opciones (botones)`,add_option:`+ añadir opción`,image:`imagen`,areas:`áreas (mapas visuales)`,add_area:`+ añadir área`,btn_remove_img:`eliminar imagen`,btn_upload_img:`+ subir imagen`,btn_edit_areas:`[ editar áreas visuales ]`,placeholder_name:`nombre (referencia)`,placeholder_btn:`btn (texto visible)`,placeholder_tooltip:`tooltip (texto flotante)`,back_canvas:`<- volver al lienzo`,add_scene:`añadir nueva escena`,must_name_scene:`¡dale un nombre a la escena primero!`,no_number_scene_name:`el nombre de la escena no puede iniciar con un número`,btn_create:`+ crear`,load_json:`cargar json`,save_json:`guardar json`,export_html:`exportar html`,powered_by:`creado con`,source_code:`código fuente`,draw_areas:`dibujar áreas:`,no_text:`sin texto`,mapped_areas:`áreas mapeadas`,empty_area_msg:`haz clic y arrastra sobre la imagen para crear un área.`,btn_save_areas:`guardar áreas`,btn_remove:`eliminar`,leave_empty:`dejar en blanco para ocultar`,typewriter_speed:`velocidad de escritura (ms)`,enable_eval:`habilitar etiquetas eval`,enable_back:`habilitar botón atrás`,enable_restart:`habilitar botón de reinicio`,adventure_scroll:`scroll de aventura (añadir verticalmente)`,base_colors:`colores base`,background:`fondo`,text_color:`color de texto`,accent_bg:`fondo de acento`,accent_text:`texto de acento`,button_colors:`colores de botones`,btn_bg:`fondo de botón`,btn_text:`texto de botón`,hover_bg:`fondo al pasar el ratón`,hover_text:`texto al pasar el ratón`,geometry_type:`geometría y tipografía`,btn_border_css:`borde de botón (css)`,container_border_css:`borde de contenedor (css)`,border_radius:`radio de borde`,font_family:`tipografía`,igrama_format:`formato de imagen`,testing_story:`probando historia...`,no_scenes:`¡no hay escenas para probar!`,empty_text:`[texto vacío]`,igrama_integration:`integración igrama`,upload_igrama:`+ subir igrama.json`,remove_igrama:`eliminar modelo igrama`,igrama_loaded:`¡modelo cargado!`,igrama_rule:`regla igrama`,igrama_placeholder:`ej. base`,grammar_editor:`editor de gramática`,test_grammar:`probar gramática`,save_grammar:`guardar gramática`,invalid_json:`Formato JSON inválido. Por favor, revisa la sintaxis.`,test_passed:`¡Prueba superada! No hay referencias perdidas ni bucles circulares.`,err_no_grammar:`No hay gramática para probar.`,err_syntax:`Error de sintaxis en la regla`,err_missing_ref:`Las siguientes reglas no existen, referenciadas en`,warn_circular:`Dependencia circular detectada:`,err_parse:`Error de análisis:`,err_invalid_root:`La raíz debe ser un Objeto, no un Array o texto.`,err_invalid_rule:`Las reglas deben ser un array de textos. Regla inválida:`,warn_empty_rule:`La regla está vacía y no generará nada:`}},t(e){return this.dict[this.lang][e]||e}}),$=sn({nodes:[],edges:[],selectedNodeId:null,grammar:{},igrama:null,igramaFormat:`png`,viewport:{x:0,y:0,zoom:1},options:{typewriterSpeed:20,adventureScroll:!1,adventureSlide:!1,evalTags:!1,backBtn:!1,restartBtn:!1,defaultCSS:!0,theme:{background:`#ffffff`,text:`#000000`,fontFamily:`ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`,accentBackground:`#00bfff`,accentText:`#000000`,buttonBorder:`2px solid #000000`,borderRadius:`0px`,containerBorder:`none`,buttonBg:`#ffffff`,buttonText:`#000000`,buttonHoverBg:`#000000`,buttonHoverText:`#ffffff`}}});function eg(){$.nodes=[{id:`inicio`,type:`sceneNode`,position:{x:100,y:150},data:{text:`érase una vez un círculo...`,options:[{btn:`dejar tranquilo`},{btn:`aplastar`}],areas:[]}},{id:`tranquilo`,type:`sceneNode`,position:{x:400,y:150},data:{text:`perfecto, un final redondo.`,options:[],areas:[]}},{id:`aplastar`,type:`sceneNode`,position:{x:400,y:250},data:{text:`parece que la historia dio una elipsis.`,options:[],areas:[]}}],$.edges=[{id:`e-inicio-tranquilo-op_0`,source:`inicio`,target:`tranquilo`,sourceHandle:`op_0`},{id:`e-inicio-aplastar-op_1`,source:`inicio`,target:`aplastar`,sourceHandle:`op_1`}]}function tg(e){if(!e||e.trim()===``)return alert(Q.t(`must_name_scene`));if(/^\d/.test(e))return alert(Q.t(`no_number_scene_name`));let t=e.toLowerCase().replace(/\s/gi,`_`).replace(/\W/,``).replace(/[;.,:{}()<>$%&!¡?¿"'/\\#@&*+-]/gi,``);if($.nodes.find(e=>e.id===t))return alert(`a scene with that name already exists`);let n=(window.innerWidth-300)/2,r=window.innerHeight/2,{x:i,y:a,zoom:o}=$.viewport,s={id:t,type:`sceneNode`,position:{x:(n-i)/o,y:(r-a)/o},data:{text:``,options:[],areas:[]}};$.nodes=[...$.nodes,s]}function ng(e){$.selectedNodeId&&($.nodes=$.nodes.map(t=>t.id===$.selectedNodeId?{...t,data:{...t.data,...e}}:t))}function rg(){let e={};return $.nodes.forEach(t=>{let n=JSON.parse(JSON.stringify(t.data));n.display={x:Math.round(t.position.x),y:Math.round(t.position.y)},$.edges.filter(e=>e.source===t.id).forEach(e=>{if(!e.sourceHandle)return;let[t,r]=e.sourceHandle.split(`_`),i=parseInt(r);t===`op`&&n.options[i]?n.options[i].scene=e.target:t===`area`&&n.areas[i]&&(n.areas[i].scene=e.target)}),e[t.id]=n}),e}function ig(e){let t=[],n=[];for(let[r,i]of Object.entries(e))t.push({id:r,type:`sceneNode`,position:i.display||{x:Math.random()*200,y:Math.random()*200},data:{text:i.text||i.texto||``,image:i.image||i.imagen||null,image:i.image||i.imagen,options:i.options||i.opciones||[],areas:i.areas||[]}}),i.options&&i.options.forEach((e,t)=>{e.scene&&n.push({id:`e-${r}-${e.scene}-op_${t}`,source:r,target:e.scene,sourceHandle:`op_${t}`})}),i.areas&&i.areas.forEach((e,t)=>{e.scene&&n.push({id:`e-${r}-${e.scene}-area_${t}`,source:r,target:e.scene,sourceHandle:`area_${t}`})});$.nodes=t,$.edges=n}var ag=G(`<div class="img-preview svelte-fzs63w"><img alt="scene thumbnail" class="svelte-fzs63w"/></div>`),og=G(`<div class="output-row svelte-fzs63w"><span> </span> <!></div>`),sg=G(`<div class="node-outputs"></div>`),cg=G(`<div class="output-row svelte-fzs63w"><span> </span> <!></div>`),lg=G(`<div class="node-outputs areas"></div>`),ug=G(`<div><!> <header class="node-header svelte-fzs63w"><strong> </strong></header> <div class="node-body svelte-fzs63w"><!> <p class="node-text svelte-fzs63w"> </p></div> <!> <!></div>`);function dg(e,t){j(t,!0);var n=ug(),r=L(n);Bp(r,{type:`target`,get position(){return Z.Left},class:`brutalist-handle handle-target`});var i=z(r,2),a=L(i),o=L(a,!0);A(a),A(i);var s=z(i,2),c=L(s),l=e=>{var n=ag(),r=L(n);A(n),B(()=>Y(r,`src`,t.data.image)),K(e,n)};J(c,e=>{t.data.image&&e(l)});var u=z(c,2),d=L(u,!0);A(u),A(s);var f=z(s,2),p=e=>{var n=sg();pi(n,21,()=>t.data.options,li,(e,t,n)=>{var r=og(),i=L(r),a=L(i);A(i),Bp(z(i,2),{type:`source`,get position(){return Z.Right},id:`op_${n}`,class:`brutalist-handle handle-source`}),A(r),B(()=>q(a,`> ${U(t).btn??``}`)),K(e,r)}),A(n),K(e,n)};J(f,e=>{t.data.options&&t.data.options.length>0&&e(p)});var m=z(f,2),h=e=>{var n=lg();pi(n,21,()=>t.data.areas,li,(e,t,n)=>{var r=cg(),i=L(r),a=L(i);A(i),Bp(z(i,2),{type:`source`,get position(){return Z.Right},id:`area_${n}`,class:`brutalist-handle handle-source area-source`}),A(r),B(()=>q(a,`[area] ${U(t).name??``}`)),K(e,r)}),A(n),K(e,n)};J(m,e=>{t.data.areas&&t.data.areas.length>0&&e(h)}),A(n),B(e=>{ji(n,1,`scene-node ${$.selectedNodeId===t.id?`selected`:``}`,`svelte-fzs63w`),q(o,t.id),q(d,e)},[()=>t.data.text?t.data.text.length>50?t.data.text.slice(0,50)+`...`:t.data.text:Q.t(`empty_text`)]),W(`click`,n,()=>$.selectedNodeId=t.id),K(e,n),M()}Kr([`click`]);function fg(e){return new Promise((t,n)=>{let r=new FileReader;r.onload=e=>{let r=new Image;r.onload=()=>{let e=r.width,n=r.height,i=1920;(e>i||n>i)&&(e>n?(n=Math.round(n*i/e),e=i):(e=Math.round(e*i/n),n=i));let a=document.createElement(`canvas`);a.width=e,a.height=n,a.getContext(`2d`).drawImage(r,0,0,e,n),t(a.toDataURL(`image/webp`,.8))},r.onerror=n,r.src=e.target.result},r.onerror=n,r.readAsDataURL(e)})}function pg(e,t,n){let r=document.createElement(`a`),i=new Blob([e],{type:n});r.href=URL.createObjectURL(i),r.download=t,r.click(),URL.revokeObjectURL(r.href)}function mg(e){return!e||e.length===0?null:e.slice().sort((e,t)=>e.position.y===t.position.y?e.position.x-t.position.x:e.position.y-t.position.y)[0].id}function hg(e,t,n,r,i=`en`){return`<!DOCTYPE html>
<html lang="${i}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aventura</title>
  <style>
    body {
      margin: 0; padding: 0;
      background-color: ${n.theme?.background||`#ffffff`};
      display: flex; justify-content: center;
      min-height: 100vh;
    }
    #storygeneraldiv {
      width: 100%; max-width: 600px;
      padding: 2rem 1rem;
      box-sizing: border-box;
    }
  </style>
</head>
<body>
  <script type="module">
    ${e}
    window.Aventura = Aventura;
  <\/script>

  <script type="module">
    const scenes = ${JSON.stringify(t)};
    const options = ${JSON.stringify(n)};
    
    const engine = new window.Aventura('${i}', options);
    
    engine.setGrammar(options.grammar || {});

    if (options.igrama) {
      engine.setIgrama(options.igrama);
    }

    engine.setScenes(scenes).startAdventure('${r}');
  <\/script>
</body>
</html>`}var gg=G(`<div class="area-btn-preview svelte-a6z52y"> </div>`),_g=G(`<div class="area-box svelte-a6z52y"><span class="area-label svelte-a6z52y"> </span> <!> <div class="resize-handle svelte-a6z52y"></div></div>`),vg=G(`<div class="area-box area-box-active svelte-a6z52y"></div>`),yg=G(`<!> <!>`,1),bg=G(`<div class="area-edit-row svelte-a6z52y"><label class="svelte-a6z52y"> </label> <input type="text"/> <label class="svelte-a6z52y"> </label> <input type="text"/> <label class="svelte-a6z52y"> </label> <input type="text"/> <button class="btn btn-danger w-full mt-1"> </button></div>`),xg=G(`<p class="empty-state" style="font-size: 0.9rem;"> </p>`),Sg=G(`<div class="modal-backdrop svelte-a6z52y"><div class="modal-content svelte-a6z52y"><header class="modal-header svelte-a6z52y"><h3 style="margin: 0;"> </h3> <button class="btn-close">x</button></header> <div class="modal-body svelte-a6z52y"><div class="canvas-wrapper svelte-a6z52y"><div class="drawing-container svelte-a6z52y"><img alt="scene map" draggable="false" class="svelte-a6z52y"/> <!></div></div> <div class="sidebar-areas svelte-a6z52y"><h4 class="ui-section-title" style="margin-top: 0;"> </h4> <!> <!></div></div> <footer class="modal-footer svelte-a6z52y"><button class="btn btn-primary"> </button></footer></div></div>`);function Cg(e,t){j(t,!0);let n=X(t,`isOpen`,3,!1),r,i,a=F(sn([])),o=F(!1),s=F(0),c=F(0),l=F(null),u=F(!1);Nn(()=>{n()&&t.nodeData&&t.nodeData.data&&(I(a,JSON.parse(JSON.stringify(t.nodeData.data.areas||[])),!0),I(u,!1))});function d(e){let t=r.getBoundingClientRect(),n=e.clientX-t.left,i=e.clientY-t.top;return n=Math.max(0,Math.min(n,t.width)),i=Math.max(0,Math.min(i,t.height)),{x:n,y:i}}function f(e){if(!U(u))return;I(o,!0);let t=d(e);I(s,t.x,!0),I(c,t.y,!0),I(l,{x:U(s),y:U(c),w:0,h:0},!0)}function p(e){if(!U(o))return;let t=d(e);I(l,{x:Math.min(t.x,U(s)),y:Math.min(t.y,U(c)),w:Math.abs(t.x-U(s)),h:Math.abs(t.y-U(c))},!0)}function m(){if(U(o)){if(I(o,!1),U(l)&&U(l).w>10&&U(l).h>10){let e=r.naturalWidth/r.width,t=r.naturalHeight/r.height,n=U(a).length+1,i=U(l).w*e,o=U(l).h*t,s=U(l).x*e,c=U(l).y*t;U(a).push({name:`area ${n}`,btn:``,tooltip:``,x:Math.round(s+i/2),y:Math.round(c+o/2),w:Math.round(i),h:Math.round(o)})}I(l,null)}}function h(){t.onSave(U(a)),t.onClose()}let g=F(null),_=F(null),v=F(0),y=F(0),b=F(null);function x(e,t,n){e.stopPropagation(),I(n===`resize`?_:g,t,!0),I(v,e.clientX,!0),I(y,e.clientY,!0),I(b,{...U(a)[t]},!0),window.addEventListener(`pointermove`,S),window.addEventListener(`pointerup`,C)}function S(e){let t=e.clientX-U(v),n=e.clientY-U(y),i=r.naturalWidth/r.width,o=r.naturalHeight/r.height,s=t*i,c=n*o,l=U(a)[U(g)===null?U(_):U(g)];if(U(g)!==null){let e=U(b).x+s,t=U(b).y+c;l.x=Math.max(l.w/2,Math.min(r.naturalWidth-l.w/2,Math.round(e))),l.y=Math.max(l.h/2,Math.min(r.naturalHeight-l.h/2,Math.round(t)))}else if(U(_)!==null){let e=U(b).x-U(b).w/2,t=U(b).y-U(b).h/2,n=U(b).w+s,i=U(b).h+c;n=Math.max(10,Math.min(r.naturalWidth-e,n)),i=Math.max(10,Math.min(r.naturalHeight-t,i)),l.w=Math.round(n),l.h=Math.round(i),l.x=Math.round(e+l.w/2),l.y=Math.round(t+l.h/2)}}function C(){I(g,null),I(_,null),window.removeEventListener(`pointermove`,S),window.removeEventListener(`pointerup`,C)}var w=ni(),T=R(w),ee=e=>{var n=Sg(),o=L(n),s=L(o),c=L(s),d=L(c);A(c);var g=z(c,2);A(s);var _=z(s,2),v=L(_),y=L(v),b=L(y);ca(b,e=>r=e,()=>r);var S=z(b,2),C=e=>{var t=yg(),n=R(t);pi(n,17,()=>U(a),li,(e,t,n)=>{var i=_g(),a=L(i),o=L(a,!0);A(a);var s=z(a,2),c=e=>{var n=gg(),r=L(n,!0);A(n),B(()=>q(r,U(t).btn)),K(e,n)};J(s,e=>{U(t).btn&&e(c)});var l=z(s,2);A(i),B(()=>{Ni(i,`
                  left: ${(U(t).x-U(t).w/2)/(r.naturalWidth/r.width)}px; 
                  top: ${(U(t).y-U(t).h/2)/(r.naturalHeight/r.height)}px; 
                  width: ${U(t).w/(r.naturalWidth/r.width)}px; 
                  height: ${U(t).h/(r.naturalHeight/r.height)}px;
                  pointer-events: auto; 
                  cursor: move;`),q(o,U(t).name)}),W(`pointerdown`,i,e=>x(e,n,`drag`)),W(`pointerdown`,l,e=>x(e,n,`resize`)),K(e,i)});var i=z(n,2),o=e=>{var t=vg();B(()=>Ni(t,`left: ${U(l).x??``}px; top: ${U(l).y??``}px; width: ${U(l).w??``}px; height: ${U(l).h??``}px;`)),K(e,t)};J(i,e=>{U(l)&&e(o)}),K(e,t)};J(S,e=>{U(u)&&r&&e(C)}),A(y),ca(y,e=>i=e,()=>i),A(v);var w=z(v,2),T=L(w),ee=L(T,!0);A(T);var E=z(T,2);pi(E,17,()=>U(a),li,(e,t,n)=>{var r=bg(),i=L(r),o=L(i);A(i);var s=z(i,2);qi(s);var c=z(s,2),l=L(c);A(c);var u=z(c,2);qi(u);var d=z(u,2),f=L(d);A(d);var p=z(d,2);qi(p);var m=z(p,2),h=L(m,!0);A(m),A(r),B((e,t,n,r,i)=>{q(o,`${e??``}:`),q(l,`${t??``}:`),Y(u,`placeholder`,n),q(f,`${r??``}:`),q(h,i)},[()=>Q.t(`placeholder_name`),()=>Q.t(`placeholder_btn`),()=>Q.t(`leave_empty`),()=>Q.t(`placeholder_tooltip`),()=>Q.t(`btn_remove`)]),ta(s,()=>U(t).name,e=>U(t).name=e),ta(u,()=>U(t).btn,e=>U(t).btn=e),ta(p,()=>U(t).tooltip,e=>U(t).tooltip=e),W(`click`,m,()=>I(a,U(a).filter((e,t)=>t!==n),!0)),K(e,r)});var te=z(E,2),ne=e=>{var t=xg(),n=L(t,!0);A(t),B(e=>q(n,e),[()=>Q.t(`empty_area_msg`)]),K(e,t)};J(te,e=>{U(a).length===0&&e(ne)}),A(w),A(_);var D=z(_,2),re=L(D),ie=L(re,!0);A(re),A(D),A(o),A(n),B((e,n,r,i)=>{q(d,`${e??``} ${n??``}...`),Y(b,`src`,t.nodeData.data.image),q(ee,r),q(ie,i)},[()=>Q.t(`draw_areas`),()=>t.nodeData.data.text?t.nodeData.data.text.slice(0,20):Q.t(`no_text`),()=>Q.t(`mapped_areas`),()=>Q.t(`btn_save_areas`)]),W(`click`,g,function(...e){t.onClose?.apply(this,e)}),W(`pointerdown`,y,f),W(`pointermove`,y,p),W(`pointerup`,y,m),Gr(`pointerleave`,y,m),Gr(`load`,b,()=>I(u,!0)),Hr(b),W(`click`,re,h),K(e,n)};J(T,e=>{n()&&t.nodeData&&e(ee)}),K(e,w),M()}Kr([`click`,`pointerdown`,`pointermove`,`pointerup`]);async function wg(e){try{let t=await fetch(e);if(!t.ok)throw Error(`Aventura couldn't load the file. Status: ${t.status}`);return await t.json()}catch(t){return console.error(`Aventura Error: Failed to load JSON from "${e}".\n`,t),null}}function Tg(e){if(!e.prob||!Array.isArray(e.prob)||e.prob.length!==e.length){let t=Math.floor(Math.random()*e.length);return{element:e[t],index:t}}let t=e.prob.reduce((e,t)=>e+t,0),n=Math.random()*t,r=0;for(let t=0;t<e.length;t++)if(r+=e.prob[t],n<=r)return{element:e[t],index:t};return{element:e[e.length-1],index:e.length-1}}function Eg(e,t){let n=e;for(let e of t)e===`ALLCAPS`?n=n.toUpperCase():e===`CAPITALIZE`&&(n=n.charAt(0).toUpperCase()+n.slice(1));return n}var Dg=(e,t,n)=>({...e,index:t,result:n}),Og=(e,t)=>({...e,result:t}),kg=(e,t)=>({...e,isError:!0,error:t}),Ag=class e{constructor(e){this.parserStateTransformerFunction=e}run=e=>{let t={targetString:e,index:0,result:null,isError:!1,error:null};return this.parserStateTransformerFunction(t)};map(t){return new e(e=>{let n=this.parserStateTransformerFunction(e);return n.isError?n:Og(n,t(n.result))})}chain(t){return new e(e=>{let n=this.parserStateTransformerFunction(e);return n.isError?n:t(n.result).parserStateTransformerFunction(n)})}errorMap(t){return new e(e=>{let n=this.parserStateTransformerFunction(e);return n.isError?kg(n,t(n.result,n.index)):n})}},jg=e=>new Ag(t=>{let{targetString:n,index:r,isError:i}=t;if(i)return t;let a=n.slice(r);return a.length===0?kg(t,`Unexpected end of input`):a.startsWith(e)?Dg(t,r+e.length,e):kg(t,`Expected '${e}' at index ${r}`)}),Mg=e=>new Ag(t=>{let{targetString:n,index:r,isError:i}=t;if(i)return t;let a=n.slice(r);if(a.length===0)return kg(t,`Unexpected end of input`);let o=a.match(e);return o?Dg(t,r+o[0].length,o[0]):kg(t,`Regex did not match at index ${r}`)}),Ng=e=>new Ag(t=>{if(t.isError)return t;let n=[],r=t;for(let t of e)if(r=t.parserStateTransformerFunction(r),n.push(r.result),r.isError)return r;return Og(r,n)}),Pg=e=>new Ag(t=>{if(t.isError)return t;for(let n of e){let e=n.parserStateTransformerFunction(t);if(!e.isError)return e}return kg(t,`Choice parser failed to match any options`)}),Fg=e=>new Ag(t=>{if(t.isError)return t;let n=[],r=t,i=!1;for(;!i;){let t=e.parserStateTransformerFunction(r);t.isError?i=!0:(n.push(t.result),r=t)}return Og(r,n)}),Ig=e=>new Ag(t=>{if(t.isError)return t;let n=e.parserStateTransformerFunction(t);return n.isError?Og(t,null):n}),Lg=jg(`<`),Rg=jg(`>`),zg=jg(`#`),Bg=Ng([Lg,Mg(/^[a-zA-Z0-9_.]+/),Ig(Ng([zg,Mg(/^[a-zA-Z,]+/),zg]).map(e=>e[1].split(`,`))),Rg]).map(e=>({type:`non-terminal`,value:e[1],transforms:e[2]||[]})),Vg=jg(`$`),Hg=jg(`[`),Ug=jg(`]`),Wg=Mg(/^[^\]]+/),Gg=Fg(Pg([Ng([Vg,Mg(/^[a-zA-Z0-9_]+/),Vg,Hg,Wg,Ug]).map(e=>{let t=e[4].split(`,`).map(e=>{let[t,n]=e.split(`:`),r=t.trim();return{key:r.startsWith(`-`)?r.substring(1):r,rule:n.trim(),isDestructive:r.startsWith(`-`)}});return{type:`dynamic-rule`,variableName:e[1],assignments:t}}),Bg,Pg([Mg(/^[^<$]+/),jg(`$`),jg(`<`)]).map(e=>({type:`terminal`,value:e}))]));function Kg(e){return Gg.run(e)}var qg=class{constructor(){this.grammar={}}setGrammar(e){return this.grammar=JSON.parse(JSON.stringify(e)),this}testGrammar(){if(this.grammarReport={errors:[],warnings:[],passed:!0},!this.grammar||Object.keys(this.grammar).length===0)return this.grammarReport.errors.push({code:`NO_GRAMMAR`}),this.grammarReport.passed=!1,this;if(Array.isArray(this.grammar)||typeof this.grammar!=`object`)return this.grammarReport.errors.push({code:`INVALID_ROOT`}),this.grammarReport.passed=!1,this;let e=!1,t=0,n={};for(let[r,i]of Object.entries(this.grammar)){if(!Array.isArray(i)){e=!0,t++,this.grammarReport.errors.push({code:`INVALID_RULE_TYPE`,rule:r});continue}if(i.length===0){t++,this.grammarReport.warnings.push({code:`EMPTY_RULE`,rule:r});continue}n[r]=new Set;for(let a of i){let i=Kg(a);if(i.isError){e=!0,t++,this.grammarReport.errors.push({code:`SYNTAX_ERROR`,rule:r,details:i.error}),console.error(`Syntax error in rule "${r}": ${i.error}`);continue}let o=[];for(let e of i.result)if(e.type===`non-terminal`&&!e.value.includes(`.`))this.grammar[e.value]?n[r].add(e.value):o.push(e.value);else if(e.type===`dynamic-rule`)for(let t of e.assignments)t.rule.includes(`.`)||(this.grammar[t.rule]?n[r].add(t.rule):o.push(t.rule));o.length>0&&(e=!0,t++,this.grammarReport.errors.push({code:`MISSING_REF`,rule:r,missing:o}),console.error(`The following rules, referenced in "${r}", do not exist: ${o.join(`, `)}`))}}let r=new Set,i=new Set,a=[],o=e=>{if(r.add(e),i.add(e),n[e])for(let t of n[e])r.has(t)?i.has(t)&&a.push(`${e} -> ${t}`):o(t);i.delete(e)};for(let e of Object.keys(n))r.has(e)||o(e);return a.length>0&&(e=!0,t+=a.length,console.warn(`Warning: Circular dependencies detected! This may cause infinite loops:`),a.forEach(e=>{this.grammarReport.warnings.push({code:`CIRCULAR_DEP`,cycle:e}),console.warn(`  - ${e}`)})),e?(this.grammarReport.passed=!1,console.warn(`Grammar test finished with ${t} error(s)/warning(s).`)):console.log(`Grammar test passed! No missing references or circular dependencies found.`),this}expandText(e,t={},n=0){if(!this.grammar||Object.keys(this.grammar).length===0)return e;let r=Kg(e);if(r.isError)return e;let i=``;for(let e of r.result)if(e.type===`terminal`)i+=e.value;else if(e.type===`dynamic-rule`){t[e.variableName]=t[e.variableName]||{};for(let r of e.assignments)t[e.variableName][r.key]=this.expandGrammar(r.rule,t,r.isDestructive,n+1)}else if(e.type===`non-terminal`){let r=this.expandGrammar(e.value,t,!1,n+1);e.transforms.length>0&&(r=Eg(r,e.transforms)),i+=r}return i}expandGrammar(e,t={},n=!1,r=0){if(r>100)return console.warn(`Aventura: Maximum recursion depth exceeded at <${e}>.`),`[MAX_DEPTH_EXCEEDED: ${e}]`;if(e.includes(`.`)){let[n,r]=e.split(`.`);if(t[n]&&t[n][r])return t[n][r]}let i=this.grammar[e];if(!i||i.length===0)return`<${e}>`;let a=Tg(i),o=a.element;return n&&(i.splice(a.index,1),i.prob&&i.prob.splice(a.index,1)),this.expandText(o,t,r)}},Jg=class{constructor(){this.markov={},this.markovSeparator=` `}async buildModel(e,t=1,n=null){let r=await(await fetch(e)).text(),i=this._buildMarkovModel(r,t,this.markovSeparator);if(n){let r=e.split(`/`),a=r[r.length-1].split(`.`)[0];n(i,`${a}_markovModel_${t}N.json`)}return i}_buildMarkovModel(e,t=1,n=` `){let r=e.replace(/([,:.;])/g,` $1`).replace(/[()\¿¡!?”“—-]/g,``).toLowerCase().split(n),i={};for(let e=0;e<r.length-t;e++){let n=``;for(let i=0;i<t;i++)n+=i===0?r[e+i]:` `+r[e+i];i[n]===void 0&&(i[n]={});let a=r[e+t];i[n][a]===void 0?i[n][a]=1:i[n][a]++}let a={};for(let e of Object.keys(i)){let t=Object.keys(i[e]);a[e]={probs:[],grams:t};let n=0;for(let r=0;r<t.length;r++)n+=i[e][t[r]];for(let r=0;r<t.length;r++)a[e].probs[r]=i[e][t[r]]/n}return a}setModel(e){return this.markov=e,this}testDistribution(){if(!this.markov||Object.keys(this.markov).length===0)return console.error(`No Markov model loaded to test.`),this;let e={},t=Object.values(this.markov);for(let n of t)for(let t of n.probs){let n=(Math.round(t/.05)*.05).toFixed(2);e[n]===void 0?e[n]=1:e[n]++}console.log(`------------------------------------ DIST ------------------------------------`);let n=Math.max(...Object.values(e)),r=Object.entries(e).sort((e,t)=>parseFloat(e[0])-parseFloat(t[0]));for(let[e,t]of r){let r=`|`.repeat(Math.ceil(t*100/n));console.log(`${e}... ${r}`)}return console.log(`------------------------------------ DIST ------------------------------------`),this}generateChain(e,t,n=.1){if(!this.markov||Object.keys(this.markov).length===0)return``;let r=t===void 0||this.markov[t]===void 0?this._randomMarkovWord():t,i=r;for(let t=0;t<e-1;t++){let e=this._getNextMarkov(this.markov[i]);e===void 0&&(e=this._getNextMarkov(this.markov[this._randomMarkovWord()]));let t=i.split(this.markovSeparator);t.push(e),t=t.slice(1).join(this.markovSeparator),i=t,r+=`${this.markovSeparator}${e}`}return this._formatMarkov(r,n)}_randomMarkovWord(){let e=Object.keys(this.markov);return e[Math.floor(Math.random()*e.length)]}_getNextMarkov(e){if(e===void 0)return;let t=Math.random(),n=0;for(let r=0;r<e.probs.length;r++){if(n<=t&&t<n+e.probs[r])return e.grams[r];n+=e.probs[r]}return e.grams[e.grams.length-1]}_formatMarkov(e,t){let n=e.replace(/ ([,:.;])/g,`$1`);return n=n.replaceAll(/([.]) ([\wáéíóú])/gi,(e,n,r)=>Math.random()<t?`.\n${r.toUpperCase()}`:`. ${r.toUpperCase()}`),n.charAt(0).toUpperCase()+n.slice(1)}},Yg=class{constructor(e){this.grammar=e,this.scenes={},this.currentScene=null,this.previousScene=null,this.onSceneChange=null,this.history=[],this.startSceneId=null,this.storyContext={}}resetContext(){this.storyContext={}}_normalizeScenes(e){let t={};for(let[n,r]of Object.entries(e))t[n]={key:n,text:r.text,scene:r.scene,image:r.image,deadEnd:r.deadEnd,plop:r.plop,title:r.title,igrama:r.igrama,viz:r.viz,dataScene:r.dataScene,meta:r.meta,areas:r.areas?r.areas.map(e=>({x:e.x,y:e.y,w:e.w,h:e.h,btn:e.btn,text:e.text,scene:e.scene,tooltip:e.tooltip})):void 0,options:r.options?r.options.map(e=>({btn:e.btn,text:e.text,scene:e.scene,image:e.image})):void 0},Object.keys(t[n]).forEach(e=>t[n][e]===void 0&&delete t[n][e]);return t}setScenes(e){return this.scenes=this._normalizeScenes(e),this}goToScene(e){let t=this.scenes[e];if(!t){console.error(`Aventura Engine: Scene "${e}" not found.`);return}this._dispatchScene(e,t)}playDynamicScene(e){let t={text:e.text,scene:e.scene,image:e.image};this._dispatchScene(`temp_${Math.random().toString(36).substr(2,5)}`,t)}restart(){this.startSceneId&&(this.history=[],this.resetContext(),this.goToScene(this.startSceneId))}goBack(){if(this.history.length===0)return;let e=this.history.pop(),t=this.scenes[e];this._dispatchScene(e,t,!0)}_dispatchScene(e,t,n=!1){this.startSceneId||=e,this.currentScene!==e&&(this.previousScene=this.currentScene,!n&&this.currentScene&&this.history.push(this.currentScene)),this.currentScene=e,t.dataScene&&this.previousScene&&(t.options=[{btn:`<<<`,scene:this.previousScene}]);let r=this.grammar?this.grammar.expandText(t.text||``,this.storyContext):t.text||``,i=t.options&&t.options.length>0,a=t.areas&&t.areas.some(e=>e.scene),o=!i&&!a,s={id:e,rawScene:t,parsedText:r,options:t.options,image:t.image,areas:t.areas,deadEnd:t.deadEnd,canGoBack:this.history.length>0,isTerminal:o};this.onSceneChange&&this.onSceneChange(s)}testScenes(){if(!this.scenes||Object.keys(this.scenes).length===0)return console.error(`Aventura Engine: There are no scenes to test.`),this;let e=[];for(let[t,n]of Object.entries(this.scenes))if(n.options)for(let r of n.options)this.scenes[r.scene]||e.push(`${t} => [${r.btn}] => ${r.scene}`);else n.deadEnd||n.scene&&!this.scenes[n.scene]&&e.push(`${t} => ${n.scene}`);return e.length>0?console.error(`Aventura Engine: The following scenes are dead ends:\n  - ${e.join(`
  - `)}`):console.log(`Aventura Engine: Scene test passed! No dead ends found.`),this}},Xg=class{constructor(e,t,n){this.lang=e,this.options=t,this.engine=n,this.container=null,this.storyPreload={}}init(){this.options.defaultCSS&&this._injectThemeCSS();let e=this.options.adventureContainer?document.getElementById(this.options.adventureContainer):document.body;this.container=document.getElementById(`storygeneraldiv`),this.container||(this.container=document.createElement(`div`),this.container.id=`storygeneraldiv`,this.container.className=`storygeneraldiv`,e.appendChild(this.container))}preloadImages(e){for(let t of Object.keys(e)){let n=e[t].image||e[t].imagen;n&&!this.storyPreload[n]&&(this.storyPreload[n]=new Image,this.storyPreload[n].src=n)}}render(e){if(!this.container)return;!this.options.adventureScroll||e.rawScene.plop?this.container.innerHTML=``:(this.container.querySelectorAll(`.storybutton-container`).forEach(e=>e.remove()),this.container.querySelectorAll(`.storyimage-area`).forEach(e=>e.remove()));let t=document.createElement(`div`);t.className=`storydiv`,this.container.appendChild(t),this._renderImageAndAreas(e,t),this._renderText(e,t)}async _renderImageAndAreas(e,t){let n=e.image,r=e.rawScene.igrama,i=e.rawScene.viz;if(!n&&!r&&!i)return;let a=document.createElement(`div`);a.className=`storyimage-container`,t.appendChild(a);let o;if(i&&this.engine.grammar.dataEngine){let e=this.options.vizWidth||600,t=this.options.vizHeight||500,n=this.engine.grammar.dataEngine.renderViz(i,e,t,e=>this.engine.goToScene(e));n&&a.appendChild(n)}else if(r&&this.engine.grammar.igramaEngine){o=new Image,o.className=`storyimage`,a.appendChild(o);let t=this.engine.grammar.expandIgrama(r),n=this.engine.grammar.igramaText(t);n&&(e.parsedText=n+`
`+e.parsedText);let i=await this.engine.grammar.igramaDataUrl(t,this.options.igramaFormat);o.src=i}else n&&(o=this.storyPreload[n]?this.storyPreload[n].cloneNode():new Image,o.src=n,o.className=`storyimage`,a.appendChild(o));if(o&&e.areas&&e.areas.length>0){let t=()=>{let t=`http://www.w3.org/2000/svg`,n=document.createElementNS(t,`svg`);n.setAttribute(`viewBox`,`0 0 ${o.naturalWidth} ${o.naturalHeight}`),n.setAttribute(`preserveAspectRatio`,`xMidYMid meet`),n.setAttribute(`class`,`story-svg-overlay`);for(let r of e.areas){let e=document.createElementNS(t,`g`);e.setAttribute(`class`,`storyimage-area`);let i=document.createElementNS(t,`rect`);if(i.setAttribute(`x`,r.x-r.w/2),i.setAttribute(`y`,r.y-r.h/2),i.setAttribute(`width`,r.w),i.setAttribute(`height`,r.h),e.appendChild(i),r.btn){let n=document.createElementNS(t,`text`);n.setAttribute(`x`,r.x),n.setAttribute(`y`,r.y),n.setAttribute(`font-size`,o.naturalHeight*.05),n.textContent=r.btn,e.appendChild(n)}if(r.tooltip){let n=document.createElementNS(t,`title`);n.textContent=r.tooltip,e.appendChild(n)}e.onclick=()=>{let e=r.scene||r.escena;this.engine.goToScene(e)},n.appendChild(e)}a.appendChild(n)};o.complete?t():o.onload=t}}async _renderText(e,t){let n=document.createElement(`p`);if(n.className=`storyp`,t.appendChild(n),this.options.adventureSlide&&this.container.scrollIntoView({behavior:`smooth`,block:`end`}),this.options.typewriterSpeed>0){let t=0,r=0;await new Promise(i=>{let a=o=>{if(r||=o,o-r>=this.options.typewriterSpeed){t++;let i=e.parsedText.substring(0,t);this.options.evalTags?n.innerHTML=i.replace(/\n/g,`<br>`):n.textContent=i,r=o}t>=e.parsedText.length?i():requestAnimationFrame(a)};requestAnimationFrame(a)})}else this.options.evalTags?n.innerHTML=e.parsedText.replace(/\n/g,`<br>`):n.textContent=e.parsedText;this._renderButtons(e,t)}_renderButtons(e,t){let n=document.createElement(`div`);if(n.className=`storybutton-container`,t.appendChild(n),this.options.backBtn&&e.canGoBack){let e=document.createElement(`button`);e.className=`storybutton`,e.textContent=`<<<`,e.addEventListener(`click`,()=>this.engine.goBack()),n.appendChild(e)}if(e.options&&e.options.length>0)for(let t of e.options){let e=document.createElement(`button`);e.className=`storybutton`,e.textContent=t.btn,n.appendChild(e),e.addEventListener(`click`,()=>{if(t.text||t.texto)this.engine.playDynamicScene(t);else{let e=t.scene||t.escena;this.engine.goToScene(e)}})}else if(!e.deadEnd&&!e.isTerminal){let t=e.rawScene.scene||e.rawScene.escena;if(t){let e=document.createElement(`button`);e.className=`storybutton`,e.textContent=`>>>`,n.appendChild(e),e.addEventListener(`click`,()=>this.engine.goToScene(t))}}if(this.options.restartBtn&&e.isTerminal){let e=document.createElement(`button`);e.className=`storybutton btn-restart`,e.textContent=`↻`,e.addEventListener(`click`,()=>this.engine.restart()),n.appendChild(e)}this.options.adventureSlide&&this.container.scrollIntoView({behavior:`smooth`,block:`end`})}_injectThemeCSS(){if(document.getElementById(`aventura-theme-styles`))return;let e=this.options.theme,t=document.createElement(`style`);t.id=`aventura-theme-styles`,t.innerHTML=`
      :root {
        --av-bg: ${e.background}; 
        --av-text: ${e.text}; 
        --av-font: ${e.fontFamily};
        --av-accent-bg: ${e.accentBackground}; 
        --av-accent-text: ${e.accentText};
        --av-btn-border: ${e.buttonBorder}; 
        --av-radius: ${e.borderRadius};
        --av-container-border: ${e.containerBorder};
        
        --av-btn-bg: ${e.buttonBg||e.background};
        --av-btn-text: ${e.buttonText||e.text};
        --av-btn-hover-bg: ${e.buttonHoverBg||e.accentBackground};
        --av-btn-hover-text: ${e.buttonHoverText||e.accentText};
      }
      
      .storygeneraldiv { 
        box-sizing: border-box; 
        margin: auto; 
        max-width: 600px; 
        font-family: var(--av-font); 
        background: var(--av-bg); 
        color: var(--av-text);
      }
      
      .storydiv { 
        box-sizing: border-box; 
        width: 100%; 
        display: flex; 
        padding: 1em; 
        flex-direction: column; 
        border: var(--av-container-border); 
      }
      
      .storyp { 
        font-size: 1.1em; 
        line-height: 1.5; 
        min-height: 1.5em; 
        white-space: pre-wrap; 
        margin-bottom: 1.5em; 
      }
      
      .storybutton { 
        background: var(--av-btn-bg); 
        color: var(--av-btn-text); 
        border: var(--av-btn-border); 
        border-radius: var(--av-radius); 
        margin: 0px 0.5em 0.5em 0px; 
        padding: 0.6em 1.2em; 
        font-size: 1em; 
        font-family: var(--av-font); 
        font-weight: bold;
        cursor: pointer; 
        transition: transform 0.1s ease, box-shadow 0.1s ease, background 0.1s ease; 
      }
      
      /* The tactile pop-out effect */
      .storybutton:hover { 
        background: var(--av-btn-hover-bg); 
        color: var(--av-btn-hover-text);
        transform: translate(-2px, -2px);
        box-shadow: 4px 4px 0px var(--av-accent-bg);
      }
      
      .storyimage-container { 
        position: relative; 
        width: 100%; 
        margin: 1em auto; 
        border: 2px solid var(--av-text); /* Hard border on the image */
      }
      
      .storyimage { 
        width: 100%; 
        display: block; 
        border-radius: var(--av-radius); 
      }
      
      .story-svg-overlay { 
        position: absolute; 
        top: 0; left: 0; width: 100%; height: 100%; 
      }
      
      /* Updated areas to match the editor's dashed aesthetic */
      .storyimage-area rect { 
        fill: rgba(255, 255, 255, 0.3); 
        stroke: var(--av-text); 
        stroke-width: 2; 
        stroke-dasharray: 4 4; /* Dashed line */
        cursor: pointer; 
        transition: all 0.1s ease; 
      }
      
      .storyimage-area:hover rect { 
        fill: rgba(0, 191, 255, 0.2); /* Accent tint */
        stroke: var(--av-accent-bg); 
        stroke-dasharray: 0; /* Solid line on hover */
      }
      
      .storyimage-area text { 
        font-family: var(--av-font); 
        font-weight: bold;
        fill: var(--av-text); 
        text-anchor: middle; 
        dominant-baseline: middle; 
        pointer-events: none; 
      }
    `,document.head.appendChild(t)}},Zg=class{constructor(e){this.textGrammarEngine=e,this.igrama=null,this.imgsMemo={},this.minigifOptions={}}setIgrama(e){return this.igrama=e,this}expand(e){return!this.igrama||!this.igrama.grammar?[]:this._resolveIgramaGrammar(e).split(`|`).map(e=>this.decodeDrawing(e))}_resolveIgramaGrammar(e,t=0){if(t>100)return``;let n=e;e.startsWith(`<`)&&e.endsWith(`>`)&&(n=e.substring(1,e.length-1));let r=this.igrama.grammar[n];return!r||r.length===0?e:Tg(r).element.replace(/<([^>]+)>/g,(e,n)=>this._resolveIgramaGrammar(n,t+1))}decodeDrawing(e){if(!e||e===``)return[];let[t,n,r]=e.split(`%%`),i={type:t,attribute:r};return t===`vector`?i.content=n.split(`**`).map(e=>{let t=e.split(`&`),n=[];n.color=t[0],n.weight=t[1],n.type=t.length>3?t[2]:`stroke`,n.style=t.length>3?t[3]:`solid`;let r=t.length>3?t[4]:t[2];if(!r)return n;let i=r.split(`,`);for(let e=0;e<i.length;e+=2)n.push([+i[e],+i[e+1]]);return n}):i.content=n,i}getText(e){return e.filter(e=>e.attribute).map(e=>e.attribute).reverse().join(` `).trim()}async getDataUrl(e,t=`png`){if(!this.igrama||!this.igrama.metadata)return``;let n=this.igrama.metadata.width,r=this.igrama.metadata.height,i=document.createElement(`canvas`);i.width=n,i.height=r;let a=i.getContext(`2d`);a.lineJoin=`round`,a.lineCap=`round`,a.fillStyle=this.igrama.metadata.bg||`#FFFFFF`,a.fillRect(0,0,n,r),await this.drawLayers(e,a);let o=``;if(t===`png`)o=i.toDataURL(`image/png`);else if(t===`gif`)if(typeof MiniGif>`u`)console.error(`Aventura: MiniGif library is required to export GIFs.`);else{let t=Object.assign({colorResolution:7,dither:!1,delay:50},this.minigifOptions),s=new MiniGif(t);s.addFrame(i);let c=this._getLayerWiggle(e);a.fillStyle=this.igrama.metadata.bg||`#FFFFFF`,a.fillRect(0,0,n,r),await this.drawLayers(c,a),s.addFrame(i);let l=s.makeGif();o=`data:image/gif;base64,`+await this._base64ArrayBuffer(l)}return o}async drawLayers(e,t){for(let[n,r]of e.entries())if(r.type===`url`&&this.igrama.sections&&this.igrama.sections[n]){let{w:e,h:i,x:a,y:o}=this.igrama.sections[n];if(!this.imgsMemo[r.content]){let e=new Image;e.src=r.content,this.imgsMemo[r.content]=await new Promise(t=>{e.onload=()=>t(e),e.onerror=()=>t(e)})}t.drawImage(this.imgsMemo[r.content],a,o,e,i)}else if(r.type===`vector`)for(let e of r.content){if(e.length===0)continue;let n=this._getSpline(e);this._drawSpline(n,t,e.color,e.weight,e.type,e.style)}}_drawSpline(e,t,n,r,i,a){if(e.length===0)return;let o=`#000000`;n===`white`?o=`#ffffff`:n===`black`?o=`#000000`:n===`accent`&&this.igrama&&this.igrama.metadata?o=this.igrama.metadata.accentColor||`#000000`:n&&n.startsWith(`#`)&&(o=n);let s=this._getPattern(t,o,a);t.beginPath();for(let n=0;n<e.length;n++)n===0?t.moveTo(...e[0]):t.lineTo(...e[n]);i===`fill`?(t.fillStyle=s,t.fill()):(t.strokeStyle=s,t.lineWidth=r,t.stroke())}_getPattern(e,t,n){if(n===`solid`)return t;let r=typeof window<`u`&&window.devicePixelRatio||1,i=document.createElement(`canvas`);i.width=5*r,i.height=5*r;let a=i.getContext(`2d`);a.scale(r,r),a.strokeStyle=t,a.lineWidth=1,a.lineCap=`square`,a.beginPath(),a.moveTo(0,5),a.lineTo(5,0),a.stroke(),a.beginPath(),a.moveTo(-5/2,5/2),a.lineTo(5/2,-5/2),a.stroke(),a.beginPath(),a.moveTo(5/2,5*1.5),a.lineTo(5*1.5,5/2),a.stroke();let o=e.createPattern(i,`repeat`);return typeof DOMMatrix<`u`&&o.setTransform(new DOMMatrix().scale(1/r,1/r)),o}_getSpline(e){let t=[];for(let n=0;n<e.length-1;n++){let r=[];r[0]=n>0?e[n-1]:e[0],r[1]=e[n],r[2]=e[n+1],r[3]=n<e.length-2?e[n+2]:e[e.length-1];for(let e=0;e<1;e+=.05){let n=e*e,i=n*e,a=.5*(2*r[1][0]+(-r[0][0]+r[2][0])*e+(2*r[0][0]-5*r[1][0]+4*r[2][0]-r[3][0])*n+(-r[0][0]+3*r[1][0]-3*r[2][0]+r[3][0])*i),o=.5*(2*r[1][1]+(-r[0][1]+r[2][1])*e+(2*r[0][1]-5*r[1][1]+4*r[2][1]-r[3][1])*n+(-r[0][1]+3*r[1][1]-3*r[2][1]+r[3][1])*i);t.push([a,o])}}return t}_getLayerWiggle(e){let t=JSON.parse(JSON.stringify(e)),n=(e,t)=>Math.floor(e+Math.random()*(t-e));for(let[r,i]of t.entries())if(i.type===`vector`)for(let[t,a]of i.content.entries()){for(let e of a)Math.random()<.5?e[0]+=n(-3,3):e[1]+=n(-3,3);a.color=e[r].content[t].color,a.weight=e[r].content[t].weight,a.type=e[r].content[t].type,a.style=e[r].content[t].style}return t}async _base64ArrayBuffer(e){return new Promise(t=>{let n=new FileReader;n.onload=()=>t(n.result.split(`,`,2)[1]),n.readAsDataURL(new Blob([e]))})}},Qg=class{constructor(e){this.options=e,this.data=[],this.metaKeys=[]}setupDataScenes(e,t,n){if(!(globalThis.d3||window.d3))return console.warn(`Aventura: D3 library is required to use the Data Engine visualizations.`),e;this.data=JSON.parse(JSON.stringify(t)),this.metaKeys=n||[];for(let t of this.data){if(t.ID===void 0){console.error(`Aventura: All data items must contain a unique 'ID' key.`);break}e[`ind_${t.ID}`]={text:t.CONT||``,meta:t.ID,dataScene:!0,options:[]},t.IMGURL&&(e[`ind_${t.ID}`].image=t.IMGURL),t.URL&&(e[`ind_${t.ID}`].url=t.URL)}return e}_filterData(e){let t=this.data;if(!e)return t;let n=e=>e===`true`?!0:e===`false`?!1:e;for(let r of e){let[e,i,a]=r,o=n(a);i===`=`||i===`==`||i===`===`?t=t.filter(t=>n(t[e])==o):i===`<`?t=t.filter(t=>n(t[e])<o):i===`>`&&(t=t.filter(t=>n(t[e])>o))}return t}renderViz(e,t,n,r){let i=this._filterData(e.filter);return e.type===`compare`?this._compareViz(i,e.x,e.y,t,n,r):e.type===`scatter`?this._scatterViz(i,e.x,e.y,t,n,r):e.type===`pack`?this._packViz(i,e.x,e.y,t,n,r):null}_compareViz(e,t,n,r,i,a){let o=globalThis.d3||window.d3,s=[e.find(e=>e.ID==t),e.find(e=>e.ID==n)].filter(Boolean),c=o.create(`svg`).attr(`viewBox`,[0,0,r,i]).attr(`class`,`story-svg-viz`),l=r/2*.8;return c.selectAll(`image`).data(s).join(`image`).attr(`href`,e=>e.IMGURL).attr(`width`,l).attr(`x`,(e,t)=>r/2*t+r/4-l/2).attr(`y`,i*.1).style(`cursor`,`pointer`).on(`click`,(e,t)=>a(`ind_${t.ID}`)),c.node()}_scatterViz(e,t,n,r,i,a){let o=globalThis.d3||window.d3,s=this.options.vizImageSize||50,c={l:.2*r,r:.1*r,t:.1*i,b:.1*i},l=r-c.l-c.r,u=i-c.t-c.b,d=[...new Set(e.map(e=>e[t]))],f=[...new Set(e.map(e=>e[n]))],p=o.scalePoint().domain(d).range([0,l]).padding(.5).round(!0),m=o.scalePoint().domain(f).range([0,u]).padding(.5).round(!0),h=e.map(e=>({...e,x:p(e[t])+c.l,y:m(e[n])+c.t})),g=o.create(`svg`).attr(`viewBox`,[0,0,r,i]).attr(`class`,`story-svg-viz`),_=g.append(`g`).attr(`fill`,`var(--av-text)`).attr(`font-size`,`14px`).attr(`text-anchor`,`middle`);d.forEach(e=>_.append(`text`).attr(`x`,c.l+p(e)).attr(`y`,c.t+u+20).text(e)),_.append(`line`).attr(`x1`,c.l).attr(`y1`,c.t+u).attr(`x2`,c.l+l).attr(`y2`,c.t+u).attr(`stroke`,`var(--av-text)`),f.forEach(e=>_.append(`text`).attr(`x`,c.l-10).attr(`y`,c.t+m(e)).attr(`text-anchor`,`end`).attr(`dominant-baseline`,`middle`).text(e)),_.append(`line`).attr(`x1`,c.l).attr(`y1`,c.t).attr(`x2`,c.l).attr(`y2`,c.t+u).attr(`stroke`,`var(--av-text)`);let v=g.append(`g`).selectAll(`image`).data(h).join(`image`).attr(`href`,e=>e.IMGURL).attr(`width`,s).style(`cursor`,`pointer`).on(`click`,(e,t)=>a(`ind_${t.ID}`));return o.forceSimulation(h).force(`charge`,o.forceManyBody().strength(5)).force(`collide`,o.forceCollide(s*.6)).on(`tick`,()=>{v.attr(`x`,e=>e.x-s/2).attr(`y`,e=>e.y-s/2)}),g.node()}_packViz(e,t,n,r,i,a){let o=globalThis.d3||window.d3,s=this.options.vizImageSize||40,c=o.rollup(e,e=>e.length,e=>e[t],e=>e[n]),l=o.hierarchy(c,([e,t])=>t.size&&Array.from(t)).sum(([,e])=>e).sort((e,t)=>t.value-e.value);o.pack().size([r,i]).padding(20)(l);let u=[];for(let a of e)for(let e of l.leaves())a[t]===e.parent.data[0]&&a[n]===e.data[0]&&u.push({...a,targetX:e.x,targetY:e.y,x:r/2,y:i/2});let d=o.create(`svg`).attr(`viewBox`,[0,0,r,i]).attr(`class`,`story-svg-viz`),f=[`rgba(0,0,0,0)`,`rgba(0,0,0,0.05)`,`rgba(0,0,0,0.1)`];d.append(`g`).selectAll(`circle`).data(l.descendants()).join(`circle`).attr(`cx`,e=>e.x).attr(`cy`,e=>e.y).attr(`r`,e=>e.r).attr(`fill`,e=>f[e.depth]||f[2]).attr(`stroke`,`var(--av-text)`).attr(`stroke-opacity`,.2),d.append(`g`).attr(`fill`,`var(--av-text)`).attr(`font-size`,`12px`).attr(`text-anchor`,`middle`).selectAll(`text`).data(l.descendants().filter(e=>e.depth===1||e.depth===2)).join(`text`).attr(`x`,e=>e.x).attr(`y`,e=>e.y-e.r-5).text(e=>e.data[0]);let p=d.append(`g`).selectAll(`image`).data(u).join(`image`).attr(`href`,e=>e.IMGURL).attr(`width`,s).style(`cursor`,`pointer`).on(`click`,(e,t)=>a(`ind_${t.ID}`));return o.forceSimulation(u).force(`x`,o.forceX(e=>e.targetX).strength(.5)).force(`y`,o.forceY(e=>e.targetY).strength(.5)).force(`collide`,o.forceCollide(s*.6)).on(`tick`,()=>{p.attr(`x`,e=>e.x-s/2).attr(`y`,e=>e.y-s/2)}),d.node()}},$g=class{constructor(e=`es`,t={}){this.lang=e===`en`||e===`es`?e:`en`,this.options=Object.assign({typewriterSpeed:50,defaultCSS:!0,adventureContainer:void 0,adventureScroll:!1,adventureSlide:!1,evalTags:!1,igramaFormat:`png`,minigifOptions:{},vizWidth:600,vizHeight:500,vizImageSize:50,theme:{background:`#ffffff`,text:`#000000`,fontFamily:`'Inconsolata', monospace`,accentBackground:`#00bfff`,accentText:`#000000`,buttonBorder:`2px solid #000000`,borderRadius:`0px`,containerBorder:`none`,buttonBg:`#ffffff`,buttonText:`#000000`,buttonHoverBg:`#000000`,buttonHoverText:`#ffffff`}},t),this.grammarEngine=new qg,this.markovEngine=new Jg,this.storyEngine=new Yg(this),this.igramaEngine=new Zg(this),this.dataEngine=new Qg(this.options),this.loadJSON=wg,this.setGrammar=e=>(this.grammarEngine.setGrammar(e),this),this.expandGrammar=(e,t)=>this.grammarEngine.expandGrammar(e,t),this.expandText=(e,t)=>this.grammarEngine.expandText(e,t),this.testGrammar=()=>(this.grammarEngine.testGrammar(),this.grammarReport=this.grammarEngine.grammarReport,this),this.markovModel=(e,t,n)=>this.markovEngine.buildModel(e,t,n?this.saveJSON:null),this.setMarkov=e=>(this.markovEngine.setModel(e),this),this.markovChain=(e,t,n)=>this.markovEngine.generateChain(e,t,n),this.testDistribution=()=>(this.markovEngine.testDistribution(),this),this.setIgrama=e=>(this.igramaEngine.setIgrama(e),this),this.expandIgrama=e=>this.igramaEngine.expand(e),this.igramaText=e=>this.igramaEngine.getText(e),this.igramaDataUrl=(e,t)=>this.igramaEngine.getDataUrl(e,t||this.options.igramaFormat),this.showIgrama=async(e,t,n)=>{let r=await this.igramaDataUrl(e,t),i=new Image;i.src=r,i.className=`storyimage`,(n?document.getElementById(n):document.body).appendChild(i)},this.setDataScenes=(e,t,n)=>{let r=this.dataEngine.setupDataScenes(e,t,n);return this.storyEngine.setScenes(r),this},this.setScenes=e=>(this.storyEngine.setScenes(e),this),this.testScenes=()=>(this.storyEngine.testScenes(),this),this.startAdventure=e=>{let t=new Xg(this.lang,this.options,this.storyEngine);return t.preloadImages(this.storyEngine.scenes),t.init(),this.storyEngine.onSceneChange=e=>{t.render(e)},this.storyEngine.resetContext(),this.storyEngine.goToScene(e),this}}},e_=G(`<div class="modal-backdrop svelte-1mr11d3"><div class="modal-content svelte-1mr11d3"><header class="modal-header svelte-1mr11d3"><h3 class="svelte-1mr11d3"> </h3> <button class="btn-close">x</button></header> <div class="modal-body svelte-1mr11d3"><div class="story-container svelte-1mr11d3"></div></div></div></div>`);function t_(e,t){j(t,!0);let n=X(t,`isOpen`,3,!1),r;Nn(()=>{if(n()&&r){r.innerHTML=``;let e=document.getElementById(`storygeneraldiv`);e&&e.remove();let n=document.getElementById(`aventura-theme-styles`);if(n&&n.remove(),$.nodes.length===0){alert(Q.t(`no_scenes`)),t.onClose();return}let i=rg(),a=mg($.nodes),o=JSON.parse(JSON.stringify($.options)),s=new $g(Q.lang,o);s.setGrammar(o.grammar||{}),o.igrama&&s.setIgrama(o.igrama),s.setScenes(i).startAdventure(a),requestAnimationFrame(()=>{let e=document.getElementById(`storygeneraldiv`);e&&r.appendChild(e)})}});var i=ni(),a=R(i),o=e=>{var n=e_(),i=L(n),a=L(i),o=L(a),s=L(o,!0);A(o);var c=z(o,2);A(a);var l=z(a,2);ca(L(l),e=>r=e,()=>r),A(l),A(i),A(n),B(e=>q(s,e),[()=>Q.t(`testing_story`)]),W(`click`,c,function(...e){t.onClose?.apply(this,e)}),K(e,n)};J(a,e=>{n()&&e(o)}),K(e,i),M()}Kr([`click`]);var n_=G(`<div style="margin-bottom: 0.5rem; font-size: 0.85rem; font-weight: bold; color: var(--accent-color);"> </div> <button class="btn btn-danger w-full"> </button>`,1),r_=G(`<label class="btn btn-secondary w-full file-upload-btn svelte-fsu2o5" style="text-align: center; border-style: dashed; padding: 0.5rem; cursor: pointer; display: block;"> <input type="file" accept=".json" hidden=""/></label>`),i_=G(`<div class="modal-backdrop svelte-fsu2o5"><div class="modal-content svelte-fsu2o5"><header class="modal-header svelte-fsu2o5"><h3 style="margin: 0;"> </h3> <button class="btn-close">x</button></header> <div class="modal-body svelte-fsu2o5"><div class="control-group svelte-fsu2o5"><label class="svelte-fsu2o5"> </label> <input type="number" min="0"/></div> <div class="checkbox-group svelte-fsu2o5"><label class="svelte-fsu2o5"><input type="checkbox"/> </label> <label class="svelte-fsu2o5"><input type="checkbox"/> </label> <label class="svelte-fsu2o5"><input type="checkbox"/> </label> <label class="svelte-fsu2o5"><input type="checkbox"/> </label></div> <h4 class="ui-section-title" style="margin-top: 1rem;"> </h4> <div class="color-grid svelte-fsu2o5"><div class="control-group svelte-fsu2o5"><label class="svelte-fsu2o5"> </label> <input type="color" class="color-picker svelte-fsu2o5"/></div> <div class="control-group svelte-fsu2o5"><label class="svelte-fsu2o5"> </label> <input type="color" class="color-picker svelte-fsu2o5"/></div> <div class="control-group svelte-fsu2o5"><label class="svelte-fsu2o5"> </label> <input type="color" class="color-picker svelte-fsu2o5"/></div> <div class="control-group svelte-fsu2o5"><label class="svelte-fsu2o5"> </label> <input type="color" class="color-picker svelte-fsu2o5"/></div></div> <h4 class="ui-section-title" style="margin-top: 1rem;"> </h4> <div class="color-grid svelte-fsu2o5"><div class="control-group svelte-fsu2o5"><label class="svelte-fsu2o5"> </label> <input type="color" class="color-picker svelte-fsu2o5"/></div> <div class="control-group svelte-fsu2o5"><label class="svelte-fsu2o5"> </label> <input type="color" class="color-picker svelte-fsu2o5"/></div> <div class="control-group svelte-fsu2o5"><label class="svelte-fsu2o5"> </label> <input type="color" class="color-picker svelte-fsu2o5"/></div> <div class="control-group svelte-fsu2o5"><label class="svelte-fsu2o5"> </label> <input type="color" class="color-picker svelte-fsu2o5"/></div></div> <h4 class="ui-section-title" style="margin-top: 1rem;"> </h4> <div class="control-group svelte-fsu2o5"><label class="svelte-fsu2o5"> </label> <input type="text"/></div> <div class="control-group svelte-fsu2o5"><label class="svelte-fsu2o5"> </label> <input type="text"/></div> <div class="control-group svelte-fsu2o5"><label class="svelte-fsu2o5"> </label> <input type="text"/></div> <div class="control-group svelte-fsu2o5"><label class="svelte-fsu2o5"> </label> <textarea rows="3"></textarea></div> <h4 class="ui-section-title" style="margin-top: 1rem;"> </h4> <div class="control-group svelte-fsu2o5" style="margin-bottom: 0.5rem;"><label class="svelte-fsu2o5"> </label> <select class="format-select svelte-fsu2o5"><option>png</option><option>gif</option></select></div> <div class="control-group svelte-fsu2o5"><!></div></div></div></div>`);function a_(e,t){j(t,!0);let n=X(t,`isOpen`,3,!1);function r(e){let t=e.target.files[0];if(!t)return;let n=new FileReader;n.onload=e=>{try{let t=JSON.parse(e.target.result);$.options.igrama=t}catch{alert(`Failed to parse Igrama JSON file!`)}},n.readAsText(t),e.target.value=``}var i=ni(),a=R(i),o=e=>{var n=i_(),i=L(n),a=L(i),o=L(a),s=L(o,!0);A(o);var c=z(o,2);A(a);var l=z(a,2),u=L(l),d=L(u),f=L(d,!0);A(d);var p=z(d,2);qi(p),A(u);var m=z(u,2),h=L(m),g=L(h);qi(g);var _=z(g);A(h);var v=z(h,2),y=L(v);qi(y);var b=z(y);A(v);var x=z(v,2),S=L(x);qi(S);var C=z(S);A(x);var w=z(x,2),T=L(w);qi(T);var ee=z(T);A(w),A(m);var E=z(m,2),te=L(E,!0);A(E);var ne=z(E,2),D=L(ne),re=L(D),ie=L(re,!0);A(re);var ae=z(re,2);qi(ae),A(D);var oe=z(D,2),se=L(oe),ce=L(se,!0);A(se);var le=z(se,2);qi(le),A(oe);var ue=z(oe,2),de=L(ue),fe=L(de,!0);A(de);var pe=z(de,2);qi(pe),A(ue);var me=z(ue,2),he=L(me),ge=L(he,!0);A(he);var _e=z(he,2);qi(_e),A(me),A(ne);var ve=z(ne,2),ye=L(ve,!0);A(ve);var be=z(ve,2),xe=L(be),Se=L(xe),Ce=L(Se,!0);A(Se);var we=z(Se,2);qi(we),A(xe);var Te=z(xe,2),Ee=L(Te),De=L(Ee,!0);A(Ee);var Oe=z(Ee,2);qi(Oe),A(Te);var ke=z(Te,2),Ae=L(ke),je=L(Ae,!0);A(Ae);var O=z(Ae,2);qi(O),A(ke);var Me=z(ke,2),k=L(Me),Ne=L(k,!0);A(k);var Pe=z(k,2);qi(Pe),A(Me),A(be);var Fe=z(be,2),Ie=L(Fe,!0);A(Fe);var Le=z(Fe,2),Re=L(Le),ze=L(Re,!0);A(Re);var Be=z(Re,2);qi(Be),A(Le);var Ve=z(Le,2),He=L(Ve),Ue=L(He,!0);A(He);var We=z(He,2);qi(We),A(Ve);var Ge=z(Ve,2),Ke=L(Ge),qe=L(Ke,!0);A(Ke);var Je=z(Ke,2);qi(Je),A(Ge);var Ye=z(Ge,2),Xe=L(Ye),Ze=L(Xe,!0);A(Xe);var j=z(Xe,2);Cn(j),A(Ye);var M=z(Ye,2),Qe=L(M,!0);A(M);var $e=z(M,2),et=L($e),tt=L(et,!0);A(et);var nt=z(et,2),rt=L(nt);rt.value=rt.__value=`png`;var it=z(rt);it.value=it.__value=`gif`,A(nt),A($e);var at=z($e,2),ot=L(at),st=e=>{var t=n_(),n=R(t),r=L(n);A(n);var i=z(n,2),a=L(i,!0);A(i),B((e,t)=>{q(r,`✓ ${e??``}`),q(a,t)},[()=>Q.t(`igrama_loaded`),()=>Q.t(`remove_igrama`)]),W(`click`,i,()=>$.options.igrama=null),K(e,t)},ct=e=>{var t=r_(),n=L(t),i=z(n);A(t),B(e=>q(n,`${e??``} `),[()=>Q.t(`upload_igrama`)]),W(`change`,i,r),K(e,t)};J(ot,e=>{$.options.igrama?e(st):e(ct,-1)}),A(at),A(l),A(i),A(n),B((e,t,n,r,i,a,o,c,l,u,d,p,m,h,g,v,y,x,S,w,T,E,ne)=>{q(s,e),q(f,t),q(_,` ${n??``}`),q(b,` ${r??``}`),q(C,` ${i??``}`),q(ee,` ${a??``}`),q(te,o),q(ie,c),q(ce,l),q(fe,u),q(ge,d),q(ye,p),q(Ce,m),q(De,h),q(je,g),q(Ne,v),q(Ie,y),q(ze,x),q(Ue,S),q(qe,w),q(Ze,T),q(Qe,E),q(tt,ne)},[()=>Q.t(`engine_opts`),()=>Q.t(`typewriter_speed`),()=>Q.t(`enable_eval`),()=>Q.t(`enable_back`),()=>Q.t(`enable_restart`),()=>Q.t(`adventure_scroll`),()=>Q.t(`base_colors`),()=>Q.t(`background`),()=>Q.t(`text_color`),()=>Q.t(`accent_bg`),()=>Q.t(`accent_text`),()=>Q.t(`button_colors`),()=>Q.t(`btn_bg`),()=>Q.t(`btn_text`),()=>Q.t(`hover_bg`),()=>Q.t(`hover_text`),()=>Q.t(`geometry_type`),()=>Q.t(`btn_border_css`),()=>Q.t(`container_border_css`),()=>Q.t(`border_radius`),()=>Q.t(`font_family`),()=>Q.t(`igrama_integration`),()=>Q.t(`igrama_format`)]),W(`click`,c,function(...e){t.onClose?.apply(this,e)}),ta(p,()=>$.options.typewriterSpeed,e=>$.options.typewriterSpeed=e),na(g,()=>$.options.evalTags,e=>$.options.evalTags=e),na(y,()=>$.options.backBtn,e=>$.options.backBtn=e),na(S,()=>$.options.restartBtn,e=>$.options.restartBtn=e),na(T,()=>$.options.adventureScroll,e=>$.options.adventureScroll=e),ta(ae,()=>$.options.theme.background,e=>$.options.theme.background=e),ta(le,()=>$.options.theme.text,e=>$.options.theme.text=e),ta(pe,()=>$.options.theme.accentBackground,e=>$.options.theme.accentBackground=e),ta(_e,()=>$.options.theme.accentText,e=>$.options.theme.accentText=e),ta(we,()=>$.options.theme.buttonBg,e=>$.options.theme.buttonBg=e),ta(Oe,()=>$.options.theme.buttonText,e=>$.options.theme.buttonText=e),ta(O,()=>$.options.theme.buttonHoverBg,e=>$.options.theme.buttonHoverBg=e),ta(Pe,()=>$.options.theme.buttonHoverText,e=>$.options.theme.buttonHoverText=e),ta(Be,()=>$.options.theme.buttonBorder,e=>$.options.theme.buttonBorder=e),ta(We,()=>$.options.theme.containerBorder,e=>$.options.theme.containerBorder=e),ta(Je,()=>$.options.theme.borderRadius,e=>$.options.theme.borderRadius=e),ta(j,()=>$.options.theme.fontFamily,e=>$.options.theme.fontFamily=e),Ii(nt,()=>$.options.igramaFormat,e=>$.options.igramaFormat=e),K(e,n)};J(a,e=>{n()&&e(o)}),K(e,i),M()}Kr([`click`,`change`]);var o_=G(`<p class="success-msg svelte-1altl7q"> </p>`),s_=G(`<p class="error-msg svelte-1altl7q"> </p>`),c_=G(`<p class="error-msg svelte-1altl7q"> </p>`),l_=G(`<p class="error-msg svelte-1altl7q"> </p>`),u_=G(`<p class="error-msg svelte-1altl7q"> </p>`),d_=G(`<p class="error-msg svelte-1altl7q"> </p>`),f_=G(`<p class="error-msg svelte-1altl7q"> </p>`),p_=G(`<p class="warn-msg svelte-1altl7q"> </p>`),m_=G(`<p class="warn-msg svelte-1altl7q"> </p>`),h_=G(`<!> <!>`,1),g_=G(`<div><!></div>`),__=G(`<div class="modal-backdrop svelte-1altl7q"><div class="modal-content svelte-1altl7q"><header class="modal-header svelte-1altl7q"><h3 style="margin: 0;"> </h3> <button class="btn-close">x</button></header> <div class="modal-body svelte-1altl7q"><div class="action-bar svelte-1altl7q"><label class="btn btn-secondary file-upload-btn" style="border-style: dashed; padding: 0.4rem 1rem; cursor: pointer;"> <input type="file" accept=".json" hidden=""/></label> <button class="btn btn-primary"> </button></div> <textarea class="grammar-textarea svelte-1altl7q" spellcheck="false"></textarea> <!></div> <footer class="modal-footer svelte-1altl7q"><button class="btn btn-primary w-full"> </button></footer></div></div>`);function v_(e,t){j(t,!0);let n=X(t,`isOpen`,3,!1),r=F(``),i=F(null);Nn(()=>{n()&&($.options.grammar&&Object.keys($.options.grammar).length>0?I(r,JSON.stringify($.options.grammar,null,2),!0):I(r,`{
  "base": [
    "aventura"
  ]
}`),I(i,null))});function a(e){try{return JSON.parse(e)}catch{return Function(`return `+e)()}}function o(e){let t=e.target.files[0];if(!t)return;let n=new FileReader;n.onload=e=>{try{let t=a(e.target.result);I(r,JSON.stringify(t,null,2),!0),I(i,null)}catch{alert(Q.t(`invalid_json`))}},n.readAsText(t),e.target.value=``}function s(){I(i,{errors:[],warnings:[],passed:!1},!0);let e;try{e=a(U(r))}catch(e){U(i).errors.push({code:`PARSE_ERROR`,details:e.message});return}let t=new $g(Q.lang,{});t.setGrammar(e).testGrammar(),I(i,t.grammarReport,!0)}function c(){try{let e=a(U(r));$.options.grammar=e,t.onClose()}catch{alert(Q.t(`invalid_json`))}}var l=ni(),u=R(l),d=e=>{var n=__(),a=L(n),l=L(a),u=L(l),d=L(u,!0);A(u);var f=z(u,2);A(l);var p=z(l,2),m=L(p),h=L(m),g=L(h),_=z(g);A(h);var v=z(h,2),y=L(v,!0);A(v),A(m);var b=z(m,2);Cn(b);var x=z(b,2),S=e=>{var t=g_(),n=L(t),r=e=>{var t=o_(),n=L(t);A(t),B(e=>q(n,`✓ ${e??``}`),[()=>Q.t(`test_passed`)]),K(e,t)},a=e=>{var t=h_(),n=R(t);pi(n,17,()=>U(i).errors,li,(e,t)=>{var n=ni(),r=R(n),i=e=>{var n=s_(),r=L(n);A(n),B(e=>q(r,`✖ ${e??``} ${U(t).details??``}`),[()=>Q.t(`err_parse`)]),K(e,n)},a=e=>{var t=c_(),n=L(t);A(t),B(e=>q(n,`✖ ${e??``}`),[()=>Q.t(`err_invalid_root`)]),K(e,t)},o=e=>{var n=l_(),r=L(n);A(n),B(e=>q(r,`✖ ${e??``} "${U(t).rule??``}"`),[()=>Q.t(`err_invalid_rule`)]),K(e,n)},s=e=>{var t=u_(),n=L(t);A(t),B(e=>q(n,`✖ ${e??``}`),[()=>Q.t(`err_no_grammar`)]),K(e,t)},c=e=>{var n=d_(),r=L(n);A(n),B(e=>q(r,`✖ ${e??``} "${U(t).rule??``}": ${U(t).details??``}`),[()=>Q.t(`err_syntax`)]),K(e,n)},l=e=>{var n=f_(),r=L(n);A(n),B((e,n)=>q(r,`✖ ${e??``} "${U(t).rule??``}": ${n??``}`),[()=>Q.t(`err_missing_ref`),()=>U(t).missing.join(`, `)]),K(e,n)};J(r,e=>{U(t).code===`PARSE_ERROR`?e(i):U(t).code===`INVALID_ROOT`?e(a,1):U(t).code===`INVALID_RULE_TYPE`?e(o,2):U(t).code===`NO_GRAMMAR`?e(s,3):U(t).code===`SYNTAX_ERROR`?e(c,4):U(t).code===`MISSING_REF`&&e(l,5)}),K(e,n)}),pi(z(n,2),17,()=>U(i).warnings,li,(e,t)=>{var n=ni(),r=R(n),i=e=>{var n=p_(),r=L(n);A(n),B(e=>q(r,`⚠ ${e??``} "${U(t).rule??``}"`),[()=>Q.t(`warn_empty_rule`)]),K(e,n)},a=e=>{var n=m_(),r=L(n);A(n),B(e=>q(r,`⚠ ${e??``} ${U(t).cycle??``}`),[()=>Q.t(`warn_circular`)]),K(e,n)};J(r,e=>{U(t).code===`EMPTY_RULE`?e(i):U(t).code===`CIRCULAR_DEP`&&e(a,1)}),K(e,n)}),K(e,t)};J(n,e=>{U(i).passed?e(r):e(a,-1)}),A(t),B(()=>ji(t,1,`console-output ${U(i).passed?`passed`:`failed`}`,`svelte-1altl7q`)),K(e,t)};J(x,e=>{U(i)&&e(S)}),A(p);var C=z(p,2),w=L(C),T=L(w,!0);A(w),A(C),A(a),A(n),B((e,t,n,r)=>{q(d,e),q(g,`${t??``} `),q(y,n),q(T,r)},[()=>Q.t(`grammar_editor`),()=>Q.t(`load_json`),()=>Q.t(`test_grammar`),()=>Q.t(`save_grammar`)]),W(`click`,f,function(...e){t.onClose?.apply(this,e)}),W(`change`,_,o),W(`click`,v,s),ta(b,()=>U(r),e=>I(r,e)),W(`click`,w,c),K(e,n)};J(u,e=>{n()&&e(d)}),K(e,l),M()}Kr([`click`,`change`]);var y_=`async function loadJSON(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(\`Aventura couldn't load the file. Status: \${response.status}\`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(\`Aventura Error: Failed to load JSON from "\${url}".\\n\`, error);
    return null;
  }
}

function getRandomPick(arr) {
  // Fallback if no valid probabilities
  if (!arr.prob || !Array.isArray(arr.prob) || arr.prob.length !== arr.length) {
    const index = Math.floor(Math.random() * arr.length);
    return { element: arr[index], index };
  }

  const totalWeight = arr.prob.reduce((sum, weight) => sum + weight, 0);
  const randomThreshold = Math.random() * totalWeight;

  let weightAccumulator = 0;
  for (let i = 0; i < arr.length; i++) {
    weightAccumulator += arr.prob[i];
    if (randomThreshold <= weightAccumulator) {
      return { element: arr[i], index: i };
    }
  }

  return { element: arr[arr.length - 1], index: arr.length - 1 };
}

function applyTransforms(text, transforms) {
  let result = text;
  
  for (const t of transforms) {
    if (t === 'ALLCAPS') {
      result = result.toUpperCase();
    } else if (t === 'CAPITALIZE') {
      // Capitalizes the first letter of the string
      result = result.charAt(0).toUpperCase() + result.slice(1);
    }
  }
  
  return result;
}

const updateParserState = (state, index, result) => ({ ...state, index, result });
const updateParserResult = (state, result) => ({ ...state, result });
const updateParserError = (state, errorMsg) => ({ ...state, isError: true, error: errorMsg });

class dParser {
  constructor(parserStateTransformerFunction) {
    this.parserStateTransformerFunction = parserStateTransformerFunction;
  }
  
  run = (targetString) => {
    const initialState = { targetString, index: 0, result: null, isError: false, error: null };
    return this.parserStateTransformerFunction(initialState);
  }

  map(fn) {
    return new dParser(parserState => {
      const nextState = this.parserStateTransformerFunction(parserState);
      if (nextState.isError) return nextState;
      return updateParserResult(nextState, fn(nextState.result));
    });
  }

  chain(fn) {
    return new dParser(parserState => {
      const nextState = this.parserStateTransformerFunction(parserState);
      if (nextState.isError) return nextState;
      const nextParser = fn(nextState.result);
      return nextParser.parserStateTransformerFunction(nextState);
    });
  }

  errorMap(fn) {
    return new dParser(parserState => {
      const nextState = this.parserStateTransformerFunction(parserState);
      if (!nextState.isError) return nextState;
      return updateParserError(nextState, fn(nextState.result, nextState.index));
    });
  }
}

const str = s => new dParser(parserState => {
  const { targetString, index, isError } = parserState;
  if (isError) return parserState;

  const slicedTarget = targetString.slice(index);
  if (slicedTarget.length === 0) {
    return updateParserError(parserState, \`Unexpected end of input\`);
  }
  if (slicedTarget.startsWith(s)) {
    return updateParserState(parserState, index + s.length, s);
  }
  return updateParserError(parserState, \`Expected '\${s}' at index \${index}\`);
});

const regexParser = regex => new dParser(parserState => {
  const { targetString, index, isError } = parserState;
  if (isError) return parserState;

  const slicedTarget = targetString.slice(index);
  if (slicedTarget.length === 0) {
    return updateParserError(parserState, \`Unexpected end of input\`);
  }
  
  const match = slicedTarget.match(regex);
  if (match) {
    return updateParserState(parserState, index + match[0].length, match[0]);
  }
  return updateParserError(parserState, \`Regex did not match at index \${index}\`);
});

const sequenceOf = parsers => new dParser(parserState => {
  if (parserState.isError) return parserState;
  const results = [];
  let nextState = parserState;
  for (let p of parsers) {
    nextState = p.parserStateTransformerFunction(nextState);
    results.push(nextState.result);
    if (nextState.isError) return nextState; // Fail fast
  }
  return updateParserResult(nextState, results);
});

const choice = parsers => new dParser(parserState => {
  if (parserState.isError) return parserState;
  for (let p of parsers) {
    const nextState = p.parserStateTransformerFunction(parserState);
    if (!nextState.isError) return nextState;
  }
  return updateParserError(parserState, \`Choice parser failed to match any options\`);
});

const many = parser => new dParser(parserState => {
  if (parserState.isError) return parserState;
  const results = [];
  let nextState = parserState;
  let done = false;
  while (!done) {
    let testState = parser.parserStateTransformerFunction(nextState);
    if (!testState.isError) {
      results.push(testState.result);
      nextState = testState;
    } else {
      done = true;
    }
  }
  return updateParserResult(nextState, results);
});

const optional = parser => new dParser(parserState => {
  if (parserState.isError) return parserState;
  const nextState = parser.parserStateTransformerFunction(parserState);
  if (nextState.isError) {
    // If it fails, return the original state but with a null result
    return updateParserResult(parserState, null);
  }
  return nextState;
});

// --- Aventura Syntax Parsers ---
const leftTag = str('<');
const rightTag = str('>');
const hashTag = str('#');

// 1. Tag names can now include dots (e.g., hero.name)
const tagName = regexParser(/^[a-zA-Z0-9_.]+/); 

const transformList = regexParser(/^[a-zA-Z,]+/); 
const transformsParser = sequenceOf([hashTag, transformList, hashTag]).map(res => res[1].split(','));

const nonTerminalParser = sequenceOf([leftTag, tagName, optional(transformsParser), rightTag]).map(res => ({
  type: 'non-terminal',
  value: res[1],
  transforms: res[2] || [] 
}));

// 2. NEW: Dynamic Rule Parser ($hero$[name:animal,-trait:adjective])
const dollarTag = str('$');
const leftBracket = str('[');
const rightBracket = str(']');
const assignmentInner = regexParser(/^[^\\]]+/); // Grabs everything inside [ ]

const dynamicRuleParser = sequenceOf([
  dollarTag,
  regexParser(/^[a-zA-Z0-9_]+/), // variable name (no dots here)
  dollarTag,
  leftBracket,
  assignmentInner,
  rightBracket
]).map(res => {
  // Parse the key:value pairs
  const pairs = res[4].split(',').map(pair => {
    const [k, v] = pair.split(':');
    const cleanKey = k.trim();
    return { 
      key: cleanKey.startsWith('-') ? cleanKey.substring(1) : cleanKey, // Remove the minus for the memory key
      rule: v.trim(),
      isDestructive: cleanKey.startsWith('-')
    };
  });
  
  return {
    type: 'dynamic-rule',
    variableName: res[1],
    assignments: pairs
  };
});

// 3. Terminals: Grab text until we hit a '<' or a '$'
const textChunkParser = regexParser(/^[^<$]+/);
// But also allow literal '$' if they aren't part of a dynamic rule (like "costs $5")
const literalDollar = str('$'); 
const literalLeftAngle = str('<');

const terminalParser = choice([textChunkParser, literalDollar, literalLeftAngle]).map(res => ({
  type: 'terminal',
  value: res
}));

// Add dynamicRuleParser to the choice list! Order matters here.
const aventuraRuleParser = many(choice([dynamicRuleParser, nonTerminalParser, terminalParser]));

function parseAventuraRule(ruleString) {
  return aventuraRuleParser.run(ruleString);
}

/**
 * GrammarEngine
 * Handles the parsing and expansion of Context-Free Grammars. 
 * Supports recursive tag expansion, dynamic variable assignment, and transformation rules.
 */
class GrammarEngine {
  constructor() {
    this.grammar = {};
  }

  /**
   * Loads a parsed JSON grammar object into the engine.
   * @param {Object} grammarObj - The grammar dictionary.
   */
  setGrammar(grammarObj) {
    this.grammar = JSON.parse(JSON.stringify(grammarObj));
    return this;
  }

  /**
   * Validates the loaded grammar. Checks for missing non-terminal references
   * and uses a Depth-First Search (DFS) to detect infinite circular dependencies.
   */
  testGrammar() {
    this.grammarReport = { errors: [], warnings: [], passed: true };

    if (!this.grammar || Object.keys(this.grammar).length === 0) {
      this.grammarReport.errors.push({ code: "NO_GRAMMAR" });
      this.grammarReport.passed = false;
      return this;
    }

    // EDGE CASE: The root is an array instead of an object mapping
    if (Array.isArray(this.grammar) || typeof this.grammar !== 'object') {
      this.grammarReport.errors.push({ code: "INVALID_ROOT" });
      this.grammarReport.passed = false;
      return this;
    }

    let grammarError = false;
    let errorCount = 0;
    const dependencyGraph = {};

    for (const [key, rules] of Object.entries(this.grammar)) {
      // EDGE CASE: The rule is a string, number, or object instead of an Array
      if (!Array.isArray(rules)) {
        grammarError = true;
        errorCount++;
        this.grammarReport.errors.push({ code: "INVALID_RULE_TYPE", rule: key });
        continue;
      }
      
      // EDGE CASE: The array is perfectly formatted, but completely empty
      if (rules.length === 0) {
        errorCount++;
        this.grammarReport.warnings.push({ code: "EMPTY_RULE", rule: key });
        continue;
      }

      dependencyGraph[key] = new Set(); 

      for (const ruleString of rules) {
        const parsedState = parseAventuraRule(ruleString);
        if (parsedState.isError) {
          grammarError = true;
          errorCount++;
          
          this.grammarReport.errors.push({ 
            code: "SYNTAX_ERROR", 
            rule: key, 
            details: parsedState.error 
          });
          console.error(\`Syntax error in rule "\${key}": \${parsedState.error}\`);
          continue;
        }

        const deadEnds = [];
        for (const token of parsedState.result) {
          if (token.type === 'non-terminal' && !token.value.includes('.')) {
            if (!this.grammar[token.value]) deadEnds.push(token.value);
            else dependencyGraph[key].add(token.value); 
          } else if (token.type === 'dynamic-rule') {
            for (const assign of token.assignments) {
              if (assign.rule.includes('.')) continue;
              if (!this.grammar[assign.rule]) deadEnds.push(assign.rule);
              else dependencyGraph[key].add(assign.rule); 
            }
          }
        }

        if (deadEnds.length > 0) {
          grammarError = true;
          errorCount++;
          
          this.grammarReport.errors.push({ 
            code: "MISSING_REF", 
            rule: key, 
            missing: deadEnds 
          });
          console.error(\`The following rules, referenced in "\${key}", do not exist: \${deadEnds.join(", ")}\`);
        }
      }
    }

    const visited = new Set();
    const recursionStack = new Set();
    const cycles = [];

    const detectCycle = (node) => {
      visited.add(node);
      recursionStack.add(node);

      if (dependencyGraph[node]) {
        for (const neighbor of dependencyGraph[node]) {
          if (!visited.has(neighbor)) {
            detectCycle(neighbor);
          } else if (recursionStack.has(neighbor)) {
            cycles.push(\`\${node} -> \${neighbor}\`);
          }
        }
      }
      recursionStack.delete(node); 
    };

    for (const key of Object.keys(dependencyGraph)) {
      if (!visited.has(key)) detectCycle(key);
    }

    if (cycles.length > 0) {
      grammarError = true;
      errorCount += cycles.length;
      console.warn(\`Warning: Circular dependencies detected! This may cause infinite loops:\`);
      cycles.forEach(cycle => {
        this.grammarReport.warnings.push({ code: "CIRCULAR_DEP", cycle: cycle });
        console.warn(\`  - \${cycle}\`);
      });
    }

    if (!grammarError) {
      console.log("Grammar test passed! No missing references or circular dependencies found.");
    } else {
      this.grammarReport.passed = false;
      console.warn(\`Grammar test finished with \${errorCount} error(s)/warning(s).\`);
    }

    return this;
  }

  /**
   * Parses raw text, evaluates embedded grammar tags, and resolves variable assignments.
   * @param {string} rawText - The text string containing Aventura syntax.
   * @param {Object} context - The memory object for storing/retrieving dynamic variables.
   * @param {number} depth - Current recursion depth to prevent infinite loops.
   */
  expandText(rawText, context = {}, depth = 0) {
    if (!this.grammar || Object.keys(this.grammar).length === 0) return rawText;

    const parsedState = parseAventuraRule(rawText);
    if (parsedState.isError) return rawText;

    let finalOutput = '';
    
    for (const token of parsedState.result) {
      if (token.type === 'terminal') {
        finalOutput += token.value;
      } else if (token.type === 'dynamic-rule') {
        context[token.variableName] = context[token.variableName] || {};
        for (const assign of token.assignments) {
          context[token.variableName][assign.key] = this.expandGrammar(assign.rule, context, assign.isDestructive, depth + 1);
        }
      } else if (token.type === 'non-terminal') {
        let expanded = this.expandGrammar(token.value, context, false, depth + 1);
        if (token.transforms.length > 0) {
          expanded = applyTransforms(expanded, token.transforms);
        }
        finalOutput += expanded;
      }
    }
    return finalOutput;
  }

  /**
   * Resolves a specific grammar symbol by randomly selecting a valid rule.
   * @param {string} startSymbol - The key to look up in the grammar dictionary.
   * @param {Object} context - The memory object for dynamic variables.
   * @param {boolean} isDestructive - If true, removes the selected rule from the grammar.
   * @param {number} depth - Current recursion depth.
   */
  expandGrammar(startSymbol, context = {}, isDestructive = false, depth = 0) {
    if (depth > 100) {
      console.warn(\`Aventura: Maximum recursion depth exceeded at <\${startSymbol}>.\`);
      return \`[MAX_DEPTH_EXCEEDED: \${startSymbol}]\`;
    }

    // Attempt to retrieve a saved variable from memory context
    if (startSymbol.includes('.')) {
      const [varName, keyName] = startSymbol.split('.');
      if (context[varName] && context[varName][keyName]) {
        return context[varName][keyName]; 
      }
    }

    const rules = this.grammar[startSymbol];
    if (!rules || rules.length === 0) return \`<\${startSymbol}>\`; 

    const pick = getRandomPick(rules);
    const randomRule = pick.element;
    
    if (isDestructive) {
      rules.splice(pick.index, 1); 
      if (rules.prob) rules.prob.splice(pick.index, 1); 
    }

    return this.expandText(randomRule, context, depth);
  }
}

/**
 * MarkovEngine
 * Handles the generation, storage, and traversal of n-gram Markov Chains 
 * for procedural text generation.
 */
class MarkovEngine {
  constructor() {
    this.markov = {};
    this.markovSeparator = " ";
  }

  /**
   * Fetches a text file and builds a new Markov model.
   * @param {string} filename - The URL path to the source text file.
   * @param {number} ngram - The n-gram depth for the chain (default: 1).
   * @param {Function} saveJSONCallback - Optional callback to save the generated model.
   */
  async buildModel(filename, ngram = 1, saveJSONCallback = null) {
    const response = await fetch(filename);
    const text = await response.text();
    const model = this._buildMarkovModel(text, ngram, this.markovSeparator);
    
    if (saveJSONCallback) {
      const filenameParts = filename.split('/');
      const cleanName = filenameParts[filenameParts.length - 1].split('.')[0];
      saveJSONCallback(model, \`\${cleanName}_markovModel_\${ngram}N.json\`);
    }
    
    return model;
  }

  /**
   * Internal parser that calculates token frequencies and normalizes probabilities.
   */
  _buildMarkovModel(text, ngram = 1, separator = " ") {
    // Clean and normalize the source text
    let cleanedText = text.replace(/([,:.;])/g, " $1").replace(/[()\\¿¡!?”“—-]/g, "").toLowerCase();
    
    const words = cleanedText.split(separator);
    const fragments = {};

    // Build the frequency map
    for (let i = 0; i < words.length - ngram; i++) {
      let f = "";
      for (let j = 0; j < ngram; j++) {
        f += j === 0 ? words[i + j] : " " + words[i + j];
      }

      if (fragments[f] === undefined) { fragments[f] = {}; }
      const nextWord = words[i + ngram];

      if (fragments[f][nextWord] === undefined) {
        fragments[f][nextWord] = 1;
      } else {
        fragments[f][nextWord]++;
      }
    }

    // Calculate normalized probabilities
    const mProbs = {};
    for (let f of Object.keys(fragments)) {
      const keys = Object.keys(fragments[f]);
      mProbs[f] = { probs: [], grams: keys };

      let sum = 0;
      for (let i = 0; i < keys.length; i++) {
        sum += fragments[f][keys[i]];
      }
      for (let i = 0; i < keys.length; i++) {
        mProbs[f].probs[i] = fragments[f][keys[i]] / sum;
      }
    }

    return mProbs;
  }

  /**
   * Loads a pre-compiled JSON Markov model into the engine.
   */
  setModel(model) {
    this.markov = model;
    return this;
  }

  /**
   * Generates a console-based ASCII bar chart mapping the distribution 
   * of probabilities within the currently loaded model.
   */
  testDistribution() {
    if (!this.markov || Object.keys(this.markov).length === 0) {
      console.error("No Markov model loaded to test.");
      return this;
    }

    const distributions = {};
    const values = Object.values(this.markov);

    for (const v of values) {
      for (const p of v.probs) {
        const aprox = (Math.round(p / 0.05) * 0.05).toFixed(2);
        if (distributions[aprox] === undefined) distributions[aprox] = 1;
        else distributions[aprox]++;
      }
    }

    console.log("------------------------------------ DIST ------------------------------------");
    const max = Math.max(...Object.values(distributions));
    const sorted = Object.entries(distributions).sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]));
    
    for (const [aprox, count] of sorted) {
      const bar = "|".repeat(Math.ceil((count * 100) / max));
      console.log(\`\${aprox}... \${bar}\`);
    }
    console.log("------------------------------------ DIST ------------------------------------");

    return this;
  }

  /**
   * Traverses the Markov model to generate a procedural text chain.
   * @param {number} chainLength - The total number of words to generate.
   * @param {string} seed - The starting n-gram.
   * @param {number} newLineProbability - Chance (0-1) to inject a line break after a period.
   */
  generateChain(chainLength, seed, newLineProbability = 0.1) {
    if (!this.markov || Object.keys(this.markov).length === 0) return "";

    let result = (seed === undefined || this.markov[seed] === undefined) ? this._randomMarkovWord() : seed;
    let currentGram = result;
  
    for (let chain = 0; chain < chainLength - 1; chain++) {
      let nextWord = this._getNextMarkov(this.markov[currentGram]);
      
      if (nextWord === undefined) {
        // Fallback: Pick a random node if the chain hits a dead end
        nextWord = this._getNextMarkov(this.markov[this._randomMarkovWord()]);
      }
      
      let tempList = currentGram.split(this.markovSeparator);
      tempList.push(nextWord);
      tempList = tempList.slice(1).join(this.markovSeparator);
      currentGram = tempList;
      
      result += \`\${this.markovSeparator}\${nextWord}\`;
    }
  
    return this._formatMarkov(result, newLineProbability);
  }

  _randomMarkovWord() {
    const keys = Object.keys(this.markov);
    const choice = Math.floor(Math.random() * keys.length);
    return keys[choice];
  }

  _getNextMarkov(data) {
    if (data === undefined) return undefined;
    const rnd = Math.random();
    let count = 0;
    for (let i = 0; i < data.probs.length; i++) {
      if (count <= rnd && rnd < count + data.probs[i]) {
        return data.grams[i];
      }
      count += data.probs[i];
    }
    return data.grams[data.grams.length - 1]; 
  }

  _formatMarkov(str, newLineProbability) {
    let formatted = str.replace(/ ([,:.;])/g, "$1");
    formatted = formatted.replaceAll(/([.]) ([\\wáéíóú])/ig, (match, c1, c2) => {
      if (Math.random() < newLineProbability) return \`.\\n\${c2.toUpperCase()}\`;
      return \`. \${c2.toUpperCase()}\`;
    });
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }
}

/**
 * StoryEngine
 * A headless state machine that manages scene transitions, memory context,
 * and data normalization for interactive narratives. It broadcasts state 
 * changes to the UI layer without interacting with the DOM.
 */
class StoryEngine {
  constructor(grammarEngine) {
    this.grammar = grammarEngine;
    this.scenes = {};
    this.currentScene = null;
    this.previousScene = null;
    this.onSceneChange = null;

    // Navigation Context
    this.history = [];
    this.startSceneId = null;

    // Persists generative text variables across the lifespan of a single playthrough
    this.storyContext = {};
  }

  /**
   * Wipes the generative memory clean for a new playthrough.
   */
  resetContext() {
    this.storyContext = {};
  }

  /**
   * Schema Sanitization Gate.
   */
  _normalizeScenes(rawScenes) {
    const normalized = {};
    for (const [key, scene] of Object.entries(rawScenes)) {
      normalized[key] = {
        key: key,
        text: scene.text,
        scene: scene.scene,
        image: scene.image,
        deadEnd: scene.deadEnd,
        plop: scene.plop,
        title: scene.title,
        
        igrama: scene.igrama,
        viz: scene.viz,             
        dataScene: scene.dataScene, 
        meta: scene.meta,           

        areas: scene.areas ? scene.areas.map(a => ({
          x: a.x, y: a.y, w: a.w, h: a.h,
          btn: a.btn,
          text: a.text,
          scene: a.scene,
          tooltip: a.tooltip
        })) : undefined,
        
        options: scene.options ? scene.options.map(o => ({
          btn: o.btn,
          text: o.text,
          scene: o.scene,
          image: o.image
        })) : undefined
      };

      Object.keys(normalized[key]).forEach(k => normalized[key][k] === undefined && delete normalized[key][k]);
    }
    return normalized;
  }
  
  /**
   * Ingests, normalizes, and stores the scene graph.
   */
  setScenes(scenes) {
    this.scenes = this._normalizeScenes(scenes);
    return this;
  }

  /**
   * Validates and triggers a transition to a targeted scene.
   */
  goToScene(sceneId) {
    const scene = this.scenes[sceneId];
    if (!scene) {
      console.error(\`Aventura Engine: Scene "\${sceneId}" not found.\`);
      return;
    }
    this._dispatchScene(sceneId, scene);
  }

  /**
   * Generates a temporary, intermediate scene for branching options.
   */
  playDynamicScene(option) {
    const tempScene = {
      text: option.text,
      scene: option.scene,
      image: option.image
    };
    this._dispatchScene(\`temp_\${Math.random().toString(36).substr(2, 5)}\`, tempScene);
  }

  /**
   * Native Restart Function
   * Clears history, resets generative context, and boots the first scene.
   */
  restart() {
    if (!this.startSceneId) return;
    this.history = [];
    this.resetContext();
    this.goToScene(this.startSceneId);
  }

  /**
   * Native Back Function
   * Pops the history stack and dispatches the previous scene without logging it.
   */
  goBack() {
    if (this.history.length === 0) return;
    const prevSceneId = this.history.pop();
    const scene = this.scenes[prevSceneId];
    this._dispatchScene(prevSceneId, scene, true);
  }

  /**
   * The core state machine tick. Updates history, processes grammar, 
   * packages the state, and broadcasts to the UI layer.
   */
  _dispatchScene(sceneId, scene, isGoingBack = false) {
    // Record the absolute start scene on the very first dispatch
    if (!this.startSceneId) {
      this.startSceneId = sceneId;
    }

    if (this.currentScene !== sceneId) {
      this.previousScene = this.currentScene;
      
      // If we are moving forward, push the current scene to the history stack
      if (!isGoingBack && this.currentScene) {
        this.history.push(this.currentScene);
      }
    }
    
    this.currentScene = sceneId;

    if (scene.dataScene && this.previousScene) {
      scene.options = [{ btn: "<<<", scene: this.previousScene }];
    }

    const parsedText = this.grammar ? this.grammar.expandText(scene.text || '', this.storyContext) : (scene.text || '');

    // Terminal State Detection (Dead End)
    const hasOptions = scene.options && scene.options.length > 0;
    const hasAreaLinks = scene.areas && scene.areas.some(a => a.scene);
    const isTerminal = !hasOptions && !hasAreaLinks;

    const sceneState = {
      id: sceneId,
      rawScene: scene,
      parsedText: parsedText,
      options: scene.options, 
      image: scene.image,     
      areas: scene.areas,
      deadEnd: scene.deadEnd,
      
      // Broadcast navigational state to the UI layer
      canGoBack: this.history.length > 0,
      isTerminal: isTerminal
    };

    if (this.onSceneChange) {
      this.onSceneChange(sceneState);
    }
  }

  /**
   * Debugging utility to traverse the normalized scene graph and detect unreachable nodes.
   */
  testScenes() {
    if (!this.scenes || Object.keys(this.scenes).length === 0) {
      console.error("Aventura Engine: There are no scenes to test.");
      return this;
    }

    const deadEnds = [];
    
    for (const [key, scene] of Object.entries(this.scenes)) {
      if (scene.options) {
        for (const opt of scene.options) {
          if (!this.scenes[opt.scene]) {
            deadEnds.push(\`\${key} => [\${opt.btn}] => \${opt.scene}\`);
          }
        }
      } else if (!scene.deadEnd) {
        if (scene.scene && !this.scenes[scene.scene]) {
          deadEnds.push(\`\${key} => \${scene.scene}\`);
        }
      }
    }

    if (deadEnds.length > 0) {
      console.error(\`Aventura Engine: The following scenes are dead ends:\\n  - \${deadEnds.join("\\n  - ")}\`);
    } else {
      console.log("Aventura Engine: Scene test passed! No dead ends found.");
    }
    return this;
  }
}

/**
 * StoryUI
 * The default presentation layer for Aventura. It acts as a "Batteries Included" 
 * UI that listens to the StoryEngine and dynamically generates the DOM elements, 
 * CSS styling, SVG interactive areas, and visual transitions.
 */
class StoryUI {
  constructor(lang, options, storyEngine) {
    this.lang = lang;
    this.options = options;
    this.engine = storyEngine; 
    this.container = null;
    this.storyPreload = {};
  }

  /**
   * Initializes the DOM environment, injecting required CSS variables
   * and establishing the main container for the story elements.
   */
  init() {
    if (this.options.defaultCSS) this._injectThemeCSS();

    const parent = this.options.adventureContainer ? document.getElementById(this.options.adventureContainer) : document.body;
    this.container = document.getElementById("storygeneraldiv");
    
    if (!this.container) {
      this.container = document.createElement("div");
      this.container.id = "storygeneraldiv";
      this.container.className = "storygeneraldiv"; 
      parent.appendChild(this.container);
    }
  }

  /**
   * Preloads static images into memory to prevent flickering during scene transitions.
   */
  preloadImages(scenes) {
    for (const key of Object.keys(scenes)) {
      const im = scenes[key].image || scenes[key].imagen;
      if (im && !this.storyPreload[im]) {
        this.storyPreload[im] = new Image();
        this.storyPreload[im].src = im;
      }
    }
  }

  /**
   * The primary render hook. Clears or prepares the container based on the 
   * scrolling settings, and orchestrates the rendering of media and text.
   */
  render(sceneState) {
    if (!this.container) return;

    // Handle single-view replacement vs. scrolling history
    if (!this.options.adventureScroll || sceneState.rawScene.plop) {
      this.container.innerHTML = ''; 
    } else {
      // Remove interactive elements from previous scenes to prevent retroactive branching
      const prevButtons = this.container.querySelectorAll('.storybutton-container');
      prevButtons.forEach(el => el.remove());
      
      const prevAreas = this.container.querySelectorAll('.storyimage-area');
      prevAreas.forEach(el => el.remove());
    }

    const storydiv = document.createElement("div");
    storydiv.className = "storydiv";
    this.container.appendChild(storydiv);  

    this._renderImageAndAreas(sceneState, storydiv);
    this._renderText(sceneState, storydiv);
  }

  /**
   * Evaluates the scene state and conditionally delegates rendering to the 
   * D3 DataEngine, the IgramaEngine, or standard static image handling.
   */
  async _renderImageAndAreas(sceneState, storydiv) {
    const imgSrc = sceneState.image;
    const igramaRule = sceneState.rawScene.igrama;
    const vizConfig = sceneState.rawScene.viz;

    if (!imgSrc && !igramaRule && !vizConfig) return;

    const imgContainer = document.createElement("div");
    imgContainer.className = "storyimage-container";
    storydiv.appendChild(imgContainer);

    let image;

    // Route 1: D3 Interactive Data Visualization
    if (vizConfig && this.engine.grammar.dataEngine) {
      const width = this.options.vizWidth || 600;
      const height = this.options.vizHeight || 500;
      
      const svgNode = this.engine.grammar.dataEngine.renderViz(
        vizConfig, 
        width, 
        height, 
        (target) => this.engine.goToScene(target) 
      );
      
      if (svgNode) imgContainer.appendChild(svgNode);

    // Route 2: Generative Canvas Drawing (Igrama)
    } else if (igramaRule && this.engine.grammar.igramaEngine) {
      image = new Image();
      image.className = "storyimage";
      imgContainer.appendChild(image);
      
      const layers = this.engine.grammar.expandIgrama(igramaRule);
      
      // Append generative attributes to the main text flow
      const extraText = this.engine.grammar.igramaText(layers);
      if (extraText) {
         sceneState.parsedText = extraText + "\\n" + sceneState.parsedText;
      }

      const url = await this.engine.grammar.igramaDataUrl(layers, this.options.igramaFormat);
      image.src = url;

    // Route 3: Standard Static Image
    } else if (imgSrc) {
      image = this.storyPreload[imgSrc] ? this.storyPreload[imgSrc].cloneNode() : new Image();
      image.src = imgSrc;
      image.className = "storyimage";
      imgContainer.appendChild(image);
    }

    // Attach SVG overlay hitboxes if defined in the scene state
    if (image && sceneState.areas && sceneState.areas.length > 0) {
      const attachSVG = () => {
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("viewBox", \`0 0 \${image.naturalWidth} \${image.naturalHeight}\`);
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
        svg.setAttribute("class", "story-svg-overlay"); 

        for (const a of sceneState.areas) {
          const group = document.createElementNS(svgNS, "g");
          group.setAttribute("class", "storyimage-area"); 
          
          const rect = document.createElementNS(svgNS, "rect");
          rect.setAttribute("x", a.x - (a.w / 2));
          rect.setAttribute("y", a.y - (a.h / 2));
          rect.setAttribute("width", a.w);
          rect.setAttribute("height", a.h);
          group.appendChild(rect);

          if (a.btn) {
            const text = document.createElementNS(svgNS, "text");
            text.setAttribute("x", a.x);
            text.setAttribute("y", a.y);
            text.setAttribute("font-size", image.naturalHeight * 0.05); 
            text.textContent = a.btn;
            group.appendChild(text);
          }

          if (a.tooltip) {
            const title = document.createElementNS(svgNS, "title");
            title.textContent = a.tooltip;
            group.appendChild(title);
          }

          group.onclick = () => {
            const target = a.scene || a.escena;
            this.engine.goToScene(target);
          };

          svg.appendChild(group);
        }
        imgContainer.appendChild(svg);
      };

      // Ensure the image has layout dimensions before calculating the SVG coordinate space
      if (image.complete) {
        attachSVG();
      } else {
        image.onload = attachSVG;
      }
    }
  }

  /**
   * Processes the normalized text. Handles HTML evaluation security 
   * and orchestrates the asynchronous typewriter effect.
   */
  async _renderText(sceneState, storydiv) {
    const paragraph = document.createElement("p");
    paragraph.className = "storyp";
    storydiv.appendChild(paragraph);

    if (this.options.adventureSlide) {
      this.container.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
    
    // Typewriter effect handling
    if (this.options.typewriterSpeed > 0) {
      let i = 0;
      let lastTime = 0;
      
      await new Promise(resolve => {
        const typeFrame = (time) => {
          if (!lastTime) lastTime = time;
          if (time - lastTime >= this.options.typewriterSpeed) {
            i++;
            
            const currentText = sceneState.parsedText.substring(0, i);
            
            // Text injection logic based on security settings
            if (this.options.evalTags) {
              paragraph.innerHTML = currentText.replace(/\\n/g, '<br>');
            } else {
              paragraph.textContent = currentText; 
            }
            
            lastTime = time;
          }
          if (i >= sceneState.parsedText.length) resolve();
          else requestAnimationFrame(typeFrame);
        };
        requestAnimationFrame(typeFrame);
      });
    } else {
      // Instant text rendering
      if (this.options.evalTags) {
        paragraph.innerHTML = sceneState.parsedText.replace(/\\n/g, '<br>');
      } else {
        paragraph.textContent = sceneState.parsedText;
      }
    }

    this._renderButtons(sceneState, storydiv);
  }

  /**
   * Generates interactive buttons for scene traversal. 
   * Handles intermediate dynamic scenes, dead ends, and dynamic history navigation.
   */
  _renderButtons(sceneState, storydiv) {
    const btns_container = document.createElement("div");
    btns_container.className = "storybutton-container";
    storydiv.appendChild(btns_container);

    // --- 1. INJECT BACK BUTTON ---
    if (this.options.backBtn && sceneState.canGoBack) {
      const backBtn = document.createElement("button");
      backBtn.className = "storybutton";
      backBtn.textContent = "<<<";
      backBtn.addEventListener("click", () => this.engine.goBack());
      btns_container.appendChild(backBtn);
    }

    // --- 2. RENDER NORMAL OPTIONS ---
    if (sceneState.options && sceneState.options.length > 0) {
      for (const opt of sceneState.options) {
        const btn = document.createElement("button");
        btn.className = "storybutton";
        btn.textContent = opt.btn;
        btns_container.appendChild(btn);
        
        btn.addEventListener("click", () => {
          const intermediateText = opt.text || opt.texto;
          if (!intermediateText) {
            const target = opt.scene || opt.escena;
            this.engine.goToScene(target);
          } else {
            this.engine.playDynamicScene(opt);
          }
        });
      }
    } else if (!sceneState.deadEnd && !sceneState.isTerminal) {
      // Fallback continue button if a scene target is defined without explicit buttons
      const target = sceneState.rawScene.scene || sceneState.rawScene.escena;
      if (target) {
        const btn = document.createElement("button");
        btn.className = "storybutton";
        btn.textContent = ">>>";
        btns_container.appendChild(btn);
        btn.addEventListener("click", () => this.engine.goToScene(target));
      }
    }

    // --- 3. INJECT RESTART BUTTON ---
    if (this.options.restartBtn && sceneState.isTerminal) {
      const restartBtn = document.createElement("button");
      restartBtn.className = "storybutton btn-restart";
      restartBtn.textContent = "↻";
      restartBtn.addEventListener("click", () => this.engine.restart());
      btns_container.appendChild(restartBtn);
    }

    if (this.options.adventureSlide) {
      this.container.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }

  /**
   * Dynamically constructs and applies the CSS variables to the document head 
   * based on the Aventura initialization options.
   */
  _injectThemeCSS() {
    if (document.getElementById('aventura-theme-styles')) return;

    const t = this.options.theme;
    const style = document.createElement('style');
    style.id = 'aventura-theme-styles';
    
    style.innerHTML = \`
      :root {
        --av-bg: \${t.background}; 
        --av-text: \${t.text}; 
        --av-font: \${t.fontFamily};
        --av-accent-bg: \${t.accentBackground}; 
        --av-accent-text: \${t.accentText};
        --av-btn-border: \${t.buttonBorder}; 
        --av-radius: \${t.borderRadius};
        --av-container-border: \${t.containerBorder};
        
        --av-btn-bg: \${t.buttonBg || t.background};
        --av-btn-text: \${t.buttonText || t.text};
        --av-btn-hover-bg: \${t.buttonHoverBg || t.accentBackground};
        --av-btn-hover-text: \${t.buttonHoverText || t.accentText};
      }
      
      .storygeneraldiv { 
        box-sizing: border-box; 
        margin: auto; 
        max-width: 600px; 
        font-family: var(--av-font); 
        background: var(--av-bg); 
        color: var(--av-text);
      }
      
      .storydiv { 
        box-sizing: border-box; 
        width: 100%; 
        display: flex; 
        padding: 1em; 
        flex-direction: column; 
        border: var(--av-container-border); 
      }
      
      .storyp { 
        font-size: 1.1em; 
        line-height: 1.5; 
        min-height: 1.5em; 
        white-space: pre-wrap; 
        margin-bottom: 1.5em; 
      }
      
      .storybutton { 
        background: var(--av-btn-bg); 
        color: var(--av-btn-text); 
        border: var(--av-btn-border); 
        border-radius: var(--av-radius); 
        margin: 0px 0.5em 0.5em 0px; 
        padding: 0.6em 1.2em; 
        font-size: 1em; 
        font-family: var(--av-font); 
        font-weight: bold;
        cursor: pointer; 
        transition: transform 0.1s ease, box-shadow 0.1s ease, background 0.1s ease; 
      }
      
      /* The tactile pop-out effect */
      .storybutton:hover { 
        background: var(--av-btn-hover-bg); 
        color: var(--av-btn-hover-text);
        transform: translate(-2px, -2px);
        box-shadow: 4px 4px 0px var(--av-accent-bg);
      }
      
      .storyimage-container { 
        position: relative; 
        width: 100%; 
        margin: 1em auto; 
        border: 2px solid var(--av-text); /* Hard border on the image */
      }
      
      .storyimage { 
        width: 100%; 
        display: block; 
        border-radius: var(--av-radius); 
      }
      
      .story-svg-overlay { 
        position: absolute; 
        top: 0; left: 0; width: 100%; height: 100%; 
      }
      
      /* Updated areas to match the editor's dashed aesthetic */
      .storyimage-area rect { 
        fill: rgba(255, 255, 255, 0.3); 
        stroke: var(--av-text); 
        stroke-width: 2; 
        stroke-dasharray: 4 4; /* Dashed line */
        cursor: pointer; 
        transition: all 0.1s ease; 
      }
      
      .storyimage-area:hover rect { 
        fill: rgba(0, 191, 255, 0.2); /* Accent tint */
        stroke: var(--av-accent-bg); 
        stroke-dasharray: 0; /* Solid line on hover */
      }
      
      .storyimage-area text { 
        font-family: var(--av-font); 
        font-weight: bold;
        fill: var(--av-text); 
        text-anchor: middle; 
        dominant-baseline: middle; 
        pointer-events: none; 
      }
    \`;
    document.head.appendChild(style);
  }
}

/**
 * IgramaEngine
 * A headless rendering engine for generative images (Igramas).
 * Processes context-free image grammars to produce composite HTML5 Canvases,
 * vector splines, and animated GIFs (via MiniGif).
 */
class IgramaEngine {
  constructor(grammarEngine) {
    this.textGrammarEngine = grammarEngine; 
    this.igrama = null;
    
    // Memory cache to prevent redundant fetching of external image assets
    this.imgsMemo = {};
    this.minigifOptions = {};
  }

  /**
   * Ingests the Igrama JSON configuration.
   */
  setIgrama(igramaObj) {
    this.igrama = igramaObj;
    return this;
  }

  // ==========================================
  // 1. GRAMMAR EXPANSION & PARSING
  // ==========================================

  expand(startSymbol) {
    if (!this.igrama || !this.igrama.grammar) return [];
    const rawString = this._resolveIgramaGrammar(startSymbol);
    return rawString.split('|').map(drawing => this.decodeDrawing(drawing));
  }

  _resolveIgramaGrammar(symbol, depth = 0) {
    if (depth > 100) return "";
    
    let lookup = symbol;
    if (symbol.startsWith('<') && symbol.endsWith('>')) {
      lookup = symbol.substring(1, symbol.length - 1);
    }

    const rules = this.igrama.grammar[lookup];
    if (!rules || rules.length === 0) return symbol; 

    const pick = getRandomPick(rules).element;

    return pick.replace(/<([^>]+)>/g, (match, innerTag) => {
      return this._resolveIgramaGrammar(innerTag, depth + 1);
    });
  }

  /**
   * Decodes proprietary Igrama syntax into executable layer objects.
   * Expected format: type%%content%%attribute
   */
  decodeDrawing(data) {
    if (!data || data === '') return [];
    
    const [type, content, attribute] = data.split('%%');
    let decoded = { type, attribute };

    if (type === 'vector') {
      decoded.content = content.split('**').map(doodle => {
        // NEW PARSER: Automatically supports both legacy formats and the new 2-Bit format
        const parts = doodle.split('&');
        const xy = [];
        
        xy.color = parts[0];
        xy.weight = parts[1];
        
        // If it's the new format, grab type and style. If legacy, default to stroke/solid.
        xy.type = parts.length > 3 ? parts[2] : 'stroke';
        xy.style = parts.length > 3 ? parts[3] : 'solid';
        
        const v = parts.length > 3 ? parts[4] : parts[2];
        if (!v) return xy;
        
        const flat = v.split(',');
        for (let i = 0; i < flat.length; i += 2) {
          xy.push([+flat[i], +flat[i + 1]]);
        }
        return xy;
      });
    } else {
      decoded.content = content; 
    }
    return decoded;
  }

  getText(layers) {
    return layers.filter(d => d.attribute).map(d => d.attribute).reverse().join(' ').trim();
  }

  // ==========================================
  // 2. RENDERING PIPELINE
  // ==========================================

  async getDataUrl(layers, format = 'png') {
    if (!this.igrama || !this.igrama.metadata) return '';

    const width = this.igrama.metadata.width;
    const height = this.igrama.metadata.height;
    
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.fillStyle = this.igrama.metadata.bg || '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    await this.drawLayers(layers, ctx);

    let dataUrl = '';
    if (format === 'png') {
      dataUrl = canvas.toDataURL('image/png');
    } else if (format === 'gif') {
      if (typeof MiniGif === 'undefined') {
        console.error("Aventura: MiniGif library is required to export GIFs.");
      } else {
        const options = Object.assign({ colorResolution: 7, dither: false, delay: 50 }, this.minigifOptions);
        const gif = new MiniGif(options);   
        
        gif.addFrame(canvas); 
        
        const layerWiggle = this._getLayerWiggle(layers);
        ctx.fillStyle = this.igrama.metadata.bg || '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        await this.drawLayers(layerWiggle, ctx);
        gif.addFrame(canvas);
        
        const buffer = gif.makeGif();
        const base64 = await this._base64ArrayBuffer(buffer);
        dataUrl = "data:image/gif;base64," + base64;
      }
    }
    
    return dataUrl;
  }

  async drawLayers(layers, ctx) {
    for (const [index, layer] of layers.entries()) {
      if (layer.type === 'url' && this.igrama.sections && this.igrama.sections[index]) {
        const { w, h, x, y } = this.igrama.sections[index];
        
        if (!this.imgsMemo[layer.content]) {
          const img = new Image();
          img.src = layer.content;
          this.imgsMemo[layer.content] = await new Promise(resolve => {
            img.onload = () => resolve(img);
            img.onerror = () => resolve(img);
          });
        }
        ctx.drawImage(this.imgsMemo[layer.content], x, y, w, h);
        
      } else if (layer.type === 'vector') {
        for (const doodle of layer.content) {
          if (doodle.length === 0) continue;
          const spline = this._getSpline(doodle);
          // Pass the new type and style properties to the drawing function
          this._drawSpline(spline, ctx, doodle.color, doodle.weight, doodle.type, doodle.style);        
        }
      }
    }
  }

  _drawSpline(spline, ctx, semanticColor, weight, type, style) {
    if (spline.length === 0) return;

    // 1. Resolve Semantic Color
    let actualHex = '#000000';
    if (semanticColor === 'white') actualHex = '#ffffff';
    else if (semanticColor === 'black') actualHex = '#000000';
    else if (semanticColor === 'accent' && this.igrama && this.igrama.metadata) {
      actualHex = this.igrama.metadata.accentColor || '#000000';
    } else if (semanticColor && semanticColor.startsWith('#')) {
      actualHex = semanticColor; // Legacy backwards compatibility
    }

    // 2. Generate the pattern (Solid or Hatching)
    const fillStyle = this._getPattern(ctx, actualHex, style);

    // 3. Create the Path
    ctx.beginPath();
    for (let i = 0; i < spline.length; i++) {
      if (i === 0) ctx.moveTo(...spline[0]);
      else ctx.lineTo(...spline[i]);
    }

    // 4. Fill or Stroke
    if (type === 'fill') {
      ctx.fillStyle = fillStyle;
      ctx.fill();
    } else {
      ctx.strokeStyle = fillStyle;
      ctx.lineWidth = weight;
      ctx.stroke();
    }
  }

  /**
   * Generates a CanvasPattern for native Dither/Hatching fills
   */
  _getPattern(ctx, color, style) {
    if (style === 'solid') return color;
    
    // Safely check for window (in case Aventura runs in Node environments)
    const dpr = typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1;
    
    const pCanvas = document.createElement('canvas');
    const etchSize = 5; 
    
    pCanvas.width = etchSize * dpr;
    pCanvas.height = etchSize * dpr;
    const pCtx = pCanvas.getContext('2d');
    pCtx.scale(dpr, dpr);
    
    pCtx.strokeStyle = color;
    pCtx.lineWidth = 1; 
    pCtx.lineCap = 'square';
    
    pCtx.beginPath();
    pCtx.moveTo(0, etchSize);
    pCtx.lineTo(etchSize, 0);
    pCtx.stroke();
    
    pCtx.beginPath();
    pCtx.moveTo(-etchSize / 2, etchSize / 2);
    pCtx.lineTo(etchSize / 2, -etchSize / 2);
    pCtx.stroke();
    
    pCtx.beginPath();
    pCtx.moveTo(etchSize / 2, etchSize * 1.5);
    pCtx.lineTo(etchSize * 1.5, etchSize / 2);
    pCtx.stroke();
    
    const pattern = ctx.createPattern(pCanvas, 'repeat');
    if (typeof DOMMatrix !== 'undefined') {
      pattern.setTransform(new DOMMatrix().scale(1 / dpr, 1 / dpr));
    }
    
    return pattern;
  }

  _getSpline(points) {
    let spline = [];
    for (let i = 0; i < points.length - 1; i++) {
      const p = [];
      p[0] = i > 0 ? points[i - 1] : points[0];
      p[1] = points[i];
      p[2] = points[i + 1];
      p[3] = i < points.length - 2 ? points[i + 2] : points[points.length -1];
      
      for (let t = 0; t < 1; t += 0.05) {
        const t2 = t * t;
        const t3 = t2 * t;
        const x = 0.5 * ((2 * p[1][0]) + (-p[0][0] + p[2][0]) * t + (2 * p[0][0] - 5 * p[1][0] + 4 * p[2][0] - p[3][0]) * t2 + (-p[0][0] + 3 * p[1][0] - 3 * p[2][0] + p[3][0]) * t3);
        const y = 0.5 * ((2 * p[1][1]) + (-p[0][1] + p[2][1]) * t + (2 * p[0][1] - 5 * p[1][1] + 4 * p[2][1] - p[3][1]) * t2 + (-p[0][1] + 3 * p[1][1] - 3 * p[2][1] + p[3][1]) * t3);
        spline.push([x, y]);     
      }
    }
    return spline;
  }

  _getLayerWiggle(layers) {
    const r = 3;
    const layerWiggle = JSON.parse(JSON.stringify(layers));
    const rndRng = (a, b) => Math.floor(a + (Math.random() * (b - a)));
    
    for (const [i, layer] of layerWiggle.entries()) {
      if (layer.type === 'vector') {
        for (const [j, doodle] of layer.content.entries()) {
          for (const v of doodle) {
            if (Math.random() < 0.5) v[0] += rndRng(-r, r);
            else v[1] += rndRng(-r, r);  
          }
          // Carry over all rendering properties to the Wiggle Frame
          doodle.color = layers[i].content[j].color;
          doodle.weight = layers[i].content[j].weight;
          doodle.type = layers[i].content[j].type;
          doodle.style = layers[i].content[j].style;
        }
      }
    }
    return layerWiggle;
  }

  async _base64ArrayBuffer(data) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",", 2)[1]);
      reader.readAsDataURL(new Blob([data]));
    });
  }
}

/**
 * DataEngine
 * A headless visualization engine designed for digital humanities and archival navigation.
 * Inspired by Aby Warburg's Mnemosyne Atlas, it processes tabular data to automatically 
 * generate interactive, D3-powered SVG visualizations and interconnected story scenes.
 */
class DataEngine {
  constructor(options) {
    this.options = options;
    this.data = [];
    this.metaKeys = [];
  }

  /**
   * Ingests archival data and automatically generates individual artifact scenes (\`ind_[ID]\`).
   * Injects these generated scenes directly into the StoryEngine's scene graph.
   */
  setupDataScenes(scenes, data, metaKeys) {
    const d3Instance = globalThis.d3 || window.d3;
    if (!d3Instance) {
      console.warn("Aventura: D3 library is required to use the Data Engine visualizations.");
      return scenes;
    }

    this.data = JSON.parse(JSON.stringify(data));
    this.metaKeys = metaKeys || [];

    for (const d of this.data) {
      if (d.ID === undefined) {
        console.error("Aventura: All data items must contain a unique 'ID' key.");
        break;
      }
      
      // Construct the individual artifact scene
      scenes[\`ind_\${d.ID}\`] = {
        text: d.CONT || '',
        meta: d.ID, 
        dataScene: true, // Flags the StoryEngine to dynamically inject a "Go Back" button
        options: [] 
      };
      
      if (d.IMGURL) scenes[\`ind_\${d.ID}\`].image = d.IMGURL;
      if (d.URL) scenes[\`ind_\${d.ID}\`].url = d.URL;
    }

    return scenes;
  }

  /**
   * Evaluates comparison rules (e.g., [["Year", ">", 1900]]) to filter 
   * the dataset dynamically before rendering a visualization.
   */
  _filterData(filterRules) {
    let filtered = this.data;
    if (!filterRules) return filtered;

    const parseBool = (v) => v === "true" ? true : v === "false" ? false : v;

    for (const f of filterRules) {
      const [key, comp, val] = f;
      const target = parseBool(val);
      
      if (comp === "=" || comp === "==" || comp === "===") {
        filtered = filtered.filter(d => parseBool(d[key]) == target);
      } else if (comp === "<") {
        filtered = filtered.filter(d => parseBool(d[key]) < target);
      } else if (comp === ">") {
        filtered = filtered.filter(d => parseBool(d[key]) > target);
      }
    }
    return filtered;
  }

  /**
   * Central router that determines which D3 layout algorithm to execute
   * based on the scene's \`viz\` configuration block.
   */
  renderViz(vizConfig, width, height, onNavigate) {
    const filteredData = this._filterData(vizConfig.filter);
    
    if (vizConfig.type === 'compare') {
      return this._compareViz(filteredData, vizConfig.x, vizConfig.y, width, height, onNavigate);
    } else if (vizConfig.type === 'scatter') {
      return this._scatterViz(filteredData, vizConfig.x, vizConfig.y, width, height, onNavigate);
    } else if (vizConfig.type === 'pack') {
      return this._packViz(filteredData, vizConfig.x, vizConfig.y, width, height, onNavigate);
    }
    return null;
  }

  // ==========================================
  // D3 SVG VISUALIZATION ALGORITHMS
  // ==========================================

  /**
   * Renders a static side-by-side comparison of two specific artifacts.
   */
  _compareViz(data, id1, id2, width, height, onNavigate) {
    const d3 = globalThis.d3 || window.d3;
    const filtered = [data.find(d => d.ID == id1), data.find(d => d.ID == id2)].filter(Boolean);
    
    const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("class", "story-svg-viz");

    const w = (width / 2) * 0.8;
    
    svg.selectAll("image")
      .data(filtered)
      .join("image")
      .attr("href", d => d.IMGURL)
      .attr("width", w)
      .attr("x", (d, i) => (i * (width / 2)) + (width / 4) - (w / 2))
      .attr("y", height * 0.1)
      .style("cursor", "pointer")
      .on("click", (event, d) => onNavigate(\`ind_\${d.ID}\`));

    return svg.node();
  }

  /**
   * Maps artifacts onto a Cartesian plane using a force-directed layout 
   * to resolve coordinate collisions.
   */
  _scatterViz(data, vx, vy, width, height, onNavigate) {
    const d3 = globalThis.d3 || window.d3;
    const size = this.options.vizImageSize || 50;
    const margin = {l: 0.2 * width, r: 0.1 * width, t: 0.1 * height, b: 0.1 * height};
    const wm = width - margin.l - margin.r;
    const hm = height - margin.t - margin.b;

    const domainX = [...new Set(data.map(d => d[vx]))];
    const domainY = [...new Set(data.map(d => d[vy]))];
    
    const scaleX = d3.scalePoint().domain(domainX).range([0, wm]).padding(0.5).round(true);
    const scaleY = d3.scalePoint().domain(domainY).range([0, hm]).padding(0.5).round(true);

    // Initialize node starting positions
    const nodes = data.map(d => ({
      ...d,
      x: scaleX(d[vx]) + margin.l,
      y: scaleY(d[vy]) + margin.t
    }));

    const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("class", "story-svg-viz");

    // Construct categorical axes
    const axes = svg.append("g").attr("fill", "var(--av-text)").attr("font-size", "14px").attr("text-anchor", "middle");
    domainX.forEach(d => axes.append("text").attr("x", margin.l + scaleX(d)).attr("y", margin.t + hm + 20).text(d));
    axes.append("line").attr("x1", margin.l).attr("y1", margin.t + hm).attr("x2", margin.l + wm).attr("y2", margin.t + hm).attr("stroke", "var(--av-text)");

    domainY.forEach(d => axes.append("text").attr("x", margin.l - 10).attr("y", margin.t + scaleY(d)).attr("text-anchor", "end").attr("dominant-baseline", "middle").text(d));
    axes.append("line").attr("x1", margin.l).attr("y1", margin.t).attr("x2", margin.l).attr("y2", margin.t + hm).attr("stroke", "var(--av-text)");

    // Bind data to interactive SVG image nodes
    const nodeGroup = svg.append("g")
      .selectAll("image")
      .data(nodes)
      .join("image")
      .attr("href", d => d.IMGURL)
      .attr("width", size)
      .style("cursor", "pointer")
      .on("click", (event, d) => onNavigate(\`ind_\${d.ID}\`));

    // Live physics simulation tick logic
    d3.forceSimulation(nodes)
      .force("charge", d3.forceManyBody().strength(5))
      .force("collide", d3.forceCollide(size * 0.6))
      .on("tick", () => {
        nodeGroup
          .attr("x", d => d.x - (size/2))
          .attr("y", d => d.y - (size/2));
      });

    return svg.node();
  }

  /**
   * Implements a hierarchical circle-packing layout. Initializes nodes at the 
   * canvas center to create an outward burst animation as the physics resolve.
   */
  _packViz(data, h1, h2, width, height, onNavigate) {
    const d3 = globalThis.d3 || window.d3;
    const size = this.options.vizImageSize || 40;
    
    const groups = d3.rollup(data, v => v.length, d => d[h1], d => d[h2]);
    const root = d3.hierarchy(groups, ([key, value]) => value.size && Array.from(value))
      .sum(([,value]) => value)
      .sort((a, b) => b.value - a.value);

    d3.pack().size([width, height]).padding(20)(root);

    // Map the calculated hierarchical leaf coordinates back to the artifact data
    const nodes = [];
    for (const f of data) {
      for (const d of root.leaves()) {
        if (f[h1] === d.parent.data[0] && f[h2] === d.data[0]) {
          nodes.push({ 
            ...f, 
            targetX: d.x, 
            targetY: d.y, 
            x: width / 2, 
            y: height / 2 
          });
        }
      }
    }

    const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("class", "story-svg-viz");

    // Draw hierarchical bounding circles
    const scheme = ["rgba(0,0,0,0)", "rgba(0,0,0,0.05)", "rgba(0,0,0,0.1)"];
    svg.append("g")
      .selectAll("circle")
      .data(root.descendants())
      .join("circle")
      .attr("cx", d => d.x).attr("cy", d => d.y).attr("r", d => d.r)
      .attr("fill", d => scheme[d.depth] || scheme[2])
      .attr("stroke", "var(--av-text)")
      .attr("stroke-opacity", 0.2);

    // Attach taxonomy labels
    svg.append("g").attr("fill", "var(--av-text)").attr("font-size", "12px").attr("text-anchor", "middle")
      .selectAll("text")
      .data(root.descendants().filter(d => d.depth === 1 || d.depth === 2))
      .join("text")
      .attr("x", d => d.x).attr("y", d => d.y - d.r - 5)
      .text(d => d.data[0]);

    // Bind data to interactive SVG image nodes
    const nodeGroup = svg.append("g")
      .selectAll("image")
      .data(nodes)
      .join("image")
      .attr("href", d => d.IMGURL)
      .attr("width", size)
      .style("cursor", "pointer")
      .on("click", (event, d) => onNavigate(\`ind_\${d.ID}\`));

    // Live physics simulation tick logic
    d3.forceSimulation(nodes)
      .force("x", d3.forceX(d => d.targetX).strength(0.5))
      .force("y", d3.forceY(d => d.targetY).strength(0.5))
      .force("collide", d3.forceCollide(size * 0.6))
      .on("tick", () => {
        nodeGroup
          .attr("x", d => d.x - (size/2))
          .attr("y", d => d.y - (size/2));
      });

    return svg.node();
  }
}

/**
 * Aventura Orchestrator
 * The core entry point for the Aventura V3 framework. Initializes all headless 
 * engines, manages global configurations, and exposes the unified public API.
 */
class Aventura {
  constructor(lang = 'es', options = {}) {
    this.lang = (lang === 'en' || lang === 'es') ? lang : 'en';
    
    // Global framework configuration
    this.options = Object.assign({
      typewriterSpeed: 50,
      defaultCSS: true,
      adventureContainer: undefined,
      adventureScroll: false,
      adventureSlide: false,
      evalTags: false,
      igramaFormat: "png",
      minigifOptions: {},
      vizWidth: 600,
      vizHeight: 500,
      vizImageSize: 50,
      theme: {
        background: '#ffffff',
        text: '#000000',
        fontFamily: "'Inconsolata', monospace",
        accentBackground: '#00bfff',
        accentText: '#000000',
        buttonBorder: '2px solid #000000',
        borderRadius: '0px',
        containerBorder: 'none',
        buttonBg: '#ffffff',
        buttonText: '#000000',
        buttonHoverBg: '#000000',
        buttonHoverText: '#ffffff'
      }
    }, options);

    // Initialize Sub-Engines
    this.grammarEngine = new GrammarEngine();
    this.markovEngine = new MarkovEngine();
    this.storyEngine = new StoryEngine(this);
    this.igramaEngine = new IgramaEngine(this);
    this.dataEngine = new DataEngine(this.options);
    
    // Export utility wrappers
    this.loadJSON = loadJSON;

    // =========================================================
    // UNIFIED PUBLIC API
    // =========================================================

    // --- Context-Free Grammar ---
    this.setGrammar = (g) => { this.grammarEngine.setGrammar(g); return this; };
    this.expandGrammar = (start, context) => this.grammarEngine.expandGrammar(start, context);
    this.expandText = (text, context) => this.grammarEngine.expandText(text, context);
    this.testGrammar = () => {
      this.grammarEngine.testGrammar();
      this.grammarReport = this.grammarEngine.grammarReport;
      return this;
    };
    
    // --- Markov Chains ---
    this.markovModel = (file, n, save) => this.markovEngine.buildModel(file, n, save ? this.saveJSON : null);
    this.setMarkov = (m) => { this.markovEngine.setModel(m); return this; };
    this.markovChain = (len, seed, nlProb) => this.markovEngine.generateChain(len, seed, nlProb);
    this.testDistribution = () => { this.markovEngine.testDistribution(); return this; };

    // --- Generative Images (Igramas) ---
    this.setIgrama = (i) => { this.igramaEngine.setIgrama(i); return this; };
    this.expandIgrama = (start) => this.igramaEngine.expand(start);
    this.igramaText = (layers) => this.igramaEngine.getText(layers);
    this.igramaDataUrl = (layers, format) => this.igramaEngine.getDataUrl(layers, format || this.options.igramaFormat);
    
    // Utility to render an Igrama directly to the DOM outside of the story flow
    this.showIgrama = async (layers, format, containerId) => {
      const url = await this.igramaDataUrl(layers, format);
      const img = new Image();
      img.src = url;
      img.className = 'storyimage';
      const parent = containerId ? document.getElementById(containerId) : document.body;
      parent.appendChild(img);
    };

    // --- Archival Data Visualization ---
    this.setDataScenes = (scenes, data, metaKeys) => {
      const enhancedScenes = this.dataEngine.setupDataScenes(scenes, data, metaKeys);
      this.storyEngine.setScenes(enhancedScenes);
      return this;
    };

    // --- Interactive Story Orchestration ---
    this.setScenes = (s) => { this.storyEngine.setScenes(s); return this; };
    this.testScenes = () => { this.storyEngine.testScenes(); return this; };
    
    this.startAdventure = (startSymbol) => {
      const defaultUI = new StoryUI(this.lang, this.options, this.storyEngine);
      defaultUI.preloadImages(this.storyEngine.scenes);
      defaultUI.init();

      // Bridge the headless engine's state changes to the UI renderer
      this.storyEngine.onSceneChange = (sceneState) => {
        defaultUI.render(sceneState);
      };

      this.storyEngine.resetContext();
      this.storyEngine.goToScene(startSymbol);
      return this;
    };
  }
}

export { Aventura as default };
`,b_=G(`<div class="option-row svelte-181dlmc"><input type="text"/> <button class="btn btn-danger">x</button></div>`),x_=G(`<div class="image-preview-mini svelte-181dlmc"><img alt="preview" class="svelte-181dlmc"/> <button class="btn btn-danger w-full mt-1"> </button></div> <button class="btn btn-primary w-full mt-1"> </button>`,1),S_=G(`<label class="btn btn-secondary w-full file-upload-btn svelte-181dlmc"> <input type="file" accept="image/*" hidden=""/></label>`),C_=G(`<div class="control-group svelte-181dlmc"><label class="svelte-181dlmc"> </label> <input type="text" style="width: 100%; box-sizing: border-box; padding: 0.5rem; font-family: monospace;"/></div>`),w_=G(`<div class="editor-panel svelte-181dlmc"><h3 class="ui-section-title"> </h3> <div class="control-group svelte-181dlmc"><label class="svelte-181dlmc"> </label> <textarea rows="6"></textarea></div> <div class="control-group svelte-181dlmc"><label class="svelte-181dlmc"> </label> <!> <button class="btn btn-secondary w-full mt-1"> </button></div> <div class="control-group svelte-181dlmc"><label class="svelte-181dlmc"> </label> <!></div> <!> <button class="btn btn-secondary w-full" style="border-style: dashed; margin-top: 2rem;"> </button></div>`),T_=G(`<div class="creator-panel svelte-181dlmc"><h3 class="ui-section-title"> </h3> <div class="control-group svelte-181dlmc"><input type="text" placeholder="scene_name"/> <button class="btn btn-secondary w-full mt-1"> </button></div></div>`),E_=G(`<aside class="sidebar svelte-181dlmc"><div class="sidebar-header svelte-181dlmc"><div class="header-top svelte-181dlmc"><div><h1 class="svelte-181dlmc">aventura interactiva</h1> <p class="svelte-181dlmc">v2</p></div> <div class="lang-toggle" style="display: flex; gap: 0.5rem;"><button style="padding: 0.1rem 0.4rem;">EN</button> <button style="padding: 0.1rem 0.4rem;">ES</button></div></div> <button class="btn btn-primary w-full mt-1"> </button> <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-top: 0.25rem;"><button class="btn btn-secondary"> </button> <button class="btn btn-secondary"> </button></div></div> <div class="sidebar-content svelte-181dlmc"><!></div> <footer class="sidebar-footer svelte-181dlmc"><div class="io-grid svelte-181dlmc"><label class="btn btn-secondary io-btn svelte-181dlmc"> <input type="file" accept=".json" hidden=""/></label> <button class="btn btn-secondary io-btn svelte-181dlmc"> </button> <button class="btn btn-primary io-btn btn-export svelte-181dlmc"> </button></div> <div class="credits" style="text-align: center; margin-top: 1rem; font-size: 0.75rem; opacity: 0.7;"> <strong>Aventura</strong> | <a href="https://github.com/srsergiorodriguez/aventura" target="_blank" style="color: inherit;"> </a></div></footer></aside> <!> <!> <!> <!>`,1);function D_(e,t){j(t,!0);let n=F(``),r=F(!1),i=F(!1),a=F(!1),o=F(!1),s=P(()=>$.nodes.find(e=>e.id===$.selectedNodeId));function c(){tg(U(n)),I(n,``)}function l(e){ng({text:e.target.value})}function u(){ng({options:[...U(s).data.options||[],{btn:`new option`}]})}function d(e,t){let n=[...U(s).data.options];n[e].btn=t,ng({options:n})}function f(e){ng({options:U(s).data.options.filter((t,n)=>n!==e)})}async function p(e){let t=e.target.files[0];if(t)try{ng({image:await fg(t)})}catch{alert(`failed to process image`)}}function m(){let e=rg();pg(JSON.stringify(e,null,2),`historia_aventura.json`,`application/json`)}function h(e){let t=e.target.files[0];if(!t)return;let n=new FileReader;n.onload=e=>{try{ig(JSON.parse(e.target.result)),$.selectedNodeId=null}catch{alert(`Failed to parse JSON file!`)}},n.readAsText(t),e.target.value=``}function g(){if($.nodes.length===0)return alert(`no scenes to export!`);let e=rg(),t=mg($.nodes);pg(hg(y_,e,$.options,t,Q.lang),`juego_aventura.html`,`text/html`)}var _=E_(),v=R(_),y=L(v),b=L(y),x=z(L(b),2),S=L(x),C=z(S,2);A(x),A(b);var w=z(b,2),T=L(w,!0);A(w);var ee=z(w,2),E=L(ee),te=L(E,!0);A(E);var ne=z(E,2),D=L(ne,!0);A(ne),A(ee),A(y);var re=z(y,2),ie=L(re),ae=e=>{var t=w_(),n=L(t),i=L(n);A(n);var a=z(n,2),o=L(a),c=L(o,!0);A(o);var m=z(o,2);Cn(m),A(a);var h=z(a,2),g=L(h),_=L(g,!0);A(g);var v=z(g,2);pi(v,17,()=>U(s).data.options||[],li,(e,t,n)=>{var r=b_(),i=L(r);qi(i);var a=z(i,2);A(r),B(()=>Ji(i,U(t).btn)),W(`input`,i,e=>d(n,e.target.value)),W(`click`,a,()=>f(n)),K(e,r)});var y=z(v,2),b=L(y,!0);A(y),A(h);var x=z(h,2),S=L(x),C=L(S,!0);A(S);var w=z(S,2),T=e=>{var t=x_(),n=R(t),i=L(n),a=z(i,2),o=L(a,!0);A(a),A(n);var c=z(n,2),l=L(c,!0);A(c),B((e,t)=>{Y(i,`src`,U(s).data.image),q(o,e),q(l,t)},[()=>Q.t(`btn_remove_img`),()=>Q.t(`btn_edit_areas`)]),W(`click`,a,()=>ng({image:null,areas:[]})),W(`click`,c,()=>I(r,!0)),K(e,t)},ee=e=>{var t=S_(),n=L(t),r=z(n);A(t),B(e=>q(n,`${e??``} `),[()=>Q.t(`btn_upload_img`)]),W(`change`,r,p),K(e,t)};J(w,e=>{U(s).data.image?e(T):e(ee,-1)}),A(x);var E=z(x,2),te=e=>{var t=C_(),n=L(t),r=L(n,!0);A(n);var i=z(n,2);qi(i),A(t),B((e,t)=>{q(r,e),Y(i,`placeholder`,t),Ji(i,U(s).data.igrama||``)},[()=>Q.t(`igrama_rule`),()=>Q.t(`igrama_placeholder`)]),W(`input`,i,e=>ng({igrama:e.target.value})),K(e,t)};J(E,e=>{$.options.igrama&&e(te)});var ne=z(E,2),D=L(ne,!0);A(ne),A(t),B((e,t,n,r,a,o)=>{q(i,`${e??``} ${U(s).id??``}`),q(c,t),Ji(m,U(s).data.text),q(_,n),q(b,r),q(C,a),q(D,o)},[()=>Q.t(`editing`),()=>Q.t(`text`),()=>Q.t(`options`),()=>Q.t(`add_option`),()=>Q.t(`image`),()=>Q.t(`back_canvas`)]),W(`input`,m,l),W(`click`,y,u),W(`click`,ne,()=>$.selectedNodeId=null),K(e,t)},oe=e=>{var t=T_(),r=L(t),i=L(r,!0);A(r);var a=z(r,2),o=L(a);qi(o);var s=z(o,2),l=L(s,!0);A(s),A(a),A(t),B((e,t)=>{q(i,e),q(l,t)},[()=>Q.t(`add_scene`),()=>Q.t(`btn_create`)]),W(`keydown`,o,e=>e.key===`Enter`&&c()),ta(o,()=>U(n),e=>I(n,e)),W(`click`,s,c),K(e,t)};J(ie,e=>{U(s)?e(ae):e(oe,-1)}),A(re);var se=z(re,2),ce=L(se),le=L(ce),ue=L(le),de=z(ue);A(le);var fe=z(le,2),pe=L(fe,!0);A(fe);var me=z(fe,2),he=L(me,!0);A(me),A(ce);var ge=z(ce,2),_e=L(ge),ve=z(_e,3),ye=L(ve,!0);A(ve),A(ge),A(se),A(v);var be=z(v,2);t_(be,{get isOpen(){return U(i)},onClose:()=>I(i,!1)});var xe=z(be,2);Cg(xe,{get isOpen(){return U(r)},get nodeData(){return U(s)},onSave:e=>ng({areas:e}),onClose:()=>I(r,!1)});var Se=z(xe,2);a_(Se,{get isOpen(){return U(a)},onClose:()=>I(a,!1)}),v_(z(Se,2),{get isOpen(){return U(o)},onClose:()=>I(o,!1)}),B((e,t,n,r,i,a,o,s)=>{ji(S,1,`btn ${Q.lang===`en`?`btn-primary`:`btn-secondary`}`),ji(C,1,`btn ${Q.lang===`es`?`btn-primary`:`btn-secondary`}`),q(T,e),q(te,t),q(D,n),q(ue,`${r??``} `),q(pe,i),q(he,a),q(_e,`${o??``} `),q(ye,s)},[()=>Q.t(`test_story`),()=>Q.t(`grammar_editor`),()=>Q.t(`engine_opts`),()=>Q.t(`load_json`),()=>Q.t(`save_json`),()=>Q.t(`export_html`),()=>Q.t(`powered_by`),()=>Q.t(`source_code`)]),W(`click`,S,()=>Q.lang=`en`),W(`click`,C,()=>Q.lang=`es`),W(`click`,w,()=>I(i,!0)),W(`click`,E,()=>I(o,!0)),W(`click`,ne,()=>I(a,!0)),W(`change`,de,h),W(`click`,fe,m),W(`click`,me,g),K(e,_),M()}Kr([`click`,`input`,`change`,`keydown`]);var O_=da(()=>$),k_=G(`<!> <!> <!>`,1),A_=G(`<div class="app-layout svelte-1fg37ex"><div class="workspace-wrapper svelte-1fg37ex"><!></div> <!></div>`);function j_(e,t){j(t,!1);let n={sceneNode:dg};function r(e){let t=O_().edges.filter(t=>!(t.source===e.source&&t.sourceHandle===e.sourceHandle));O_(O_().edges=xf(e,t))}la();var i=A_(),a=L(i);xh(L(a),{get nodeTypes(){return n},fitView:!0,onpaneclick:()=>O_(O_().selectedNodeId=null),onconnect:r,proOptions:{hideAttribution:!0},get nodes(){return O_().nodes},set nodes(e){O_(O_().nodes=e)},get edges(){return O_().edges},set edges(e){O_(O_().edges=e)},get viewport(){return O_().viewport},set viewport(e){O_(O_().viewport=e)},children:(e,t)=>{var n=k_(),r=R(n);Wh(r,{variant:`dots`,gap:20,size:1,color:`#cccccc`});var i=z(r,2);Ih(i,{showInteractive:!1}),$h(z(i,2),{nodeColor:`#000`,maskColor:`rgba(255, 255, 255, 0.8)`}),K(e,n)},$$slots:{default:!0},$$legacy:!0}),A(a),D_(z(a,2),{}),A(i),K(e,i),M()}var M_=G(`<main><!></main>`);function N_(e,t){j(t,!0),Nn(()=>{eg()});var n=M_();j_(L(n),{}),A(n),K(e,n),M()}ri(N_,{target:document.getElementById(`app`)});