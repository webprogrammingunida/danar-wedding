/**
 * Shared utility helpers
 */
export const $=(s,p=document)=>p.querySelector(s);
export const $$=(s,p=document)=>Array.from(p.querySelectorAll(s));
export const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
export function debounce(fn,d=300){let t;return(...a)=>{clearTimeout(t);t=setTimeout(()=>fn(...a),d);};}
export function throttle(fn,l=200){let w=false;return(...a)=>{if(w)return;fn(...a);w=true;setTimeout(()=>w=false,l);};}
export const show=e=>e&&e.classList.remove('hidden');
export const hide=e=>e&&e.classList.add('hidden');
export const toggle=e=>e&&e.classList.toggle('hidden');
export function on(target,event,cb){const el=typeof target==='string'?$(target):target;if(el)el.addEventListener(event,cb);}
export const scrollToTop=()=>window.scrollTo({top:0,behavior:'smooth'});
export const scrollToElement=e=>e&&e.scrollIntoView({behavior:'smooth',block:'start'});
export async function copy(text){try{await navigator.clipboard.writeText(text);return true;}catch{return false;}}
export const clamp=(v,min,max)=>Math.min(max,Math.max(min,v));
export const capitalize=(t='')=>t.charAt(0).toUpperCase()+t.slice(1);
export const uid=(len=10)=>Math.random().toString(36).slice(2,len+2);
