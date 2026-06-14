/* ==========================================================================
   CSS SIMPLYCOUNTDOWN OTOMATIS (Lingkaran Pas, Tulisan Dikecilkan)
   ========================================================================== */
const styleSimply = document.createElement('style');
styleSimply.textContent = `
.simply-countdown{overflow:hidden;display:flex;flex-wrap:wrap;justify-content:center;gap:0.75rem;font-family:Inter,system-ui,-apple-system,sans-serif}

/* Ukuran Lingkaran Tetap Lega (Layar HP) */
.simply-countdown>.simply-section{
    width:60px;
    height:60px;
    padding:1.2rem;
    display:flex;
    align-items:center;
    justify-content:center;
    background:rgba(255,255,255,.9);
    border:1px solid rgba(226,232,240,.8);
    border-radius:50% !important;
    box-shadow:0 4px 6px -1px rgba(0,0,0,.05),0 2px 4px -1px rgba(0,0,0,.03),0 0 0 1px rgba(0,0,0,.02);
    transition:.3s cubic-bezier(.4, 0, .2, 1);
    backdrop-filter:blur(10px);
}

.simply-countdown>.simply-section>div{display:flex;flex-direction:column;line-height:1.1;align-items:center}

/* Ukuran Angka Tetap Jelas */
.simply-countdown>.simply-section .simply-amount{font-size:1.35rem;font-weight:700;color:#1e293b;line-height:1;letter-spacing:-.025em}

/* Khusus Tulisannya Saja Yang Dikecilkan (Layar HP) */
.simply-countdown>.simply-section .simply-word{
    font-size:.38rem; 
    font-weight:500;
    color:#64748b;
    text-transform:uppercase;
    letter-spacing:.05em;
    margin-top: 2px;
}

/* Ukuran Layar Tablet */
@media (min-width:640px){
  .simply-countdown>.simply-section{width:70px;height:70px;padding:1.4rem}
  .simply-countdown>.simply-section .simply-amount{font-size:1.5rem}
  .simply-countdown>.simply-section .simply-word{font-size:.45rem}
}

/* Ukuran Layar Laptop / PC */
@media (min-width:1024px){
  .simply-countdown>.simply-section{width:80px;height:80px;padding:1.6rem}
  .simply-countdown>.simply-section .simply-amount{font-size:1.75rem}
  .simply-countdown>.simply-section .simply-word{font-size:.5rem}
}
#countdown { margin: 25px 0; }
`;
document.head.appendChild(styleSimply);

/* ==========================================================================
   LOGIKA JAVASCRIPT SIMPLYCOUNTDOWN (SUDAH DIPERBAIKI)
   ========================================================================== */
const w = (n, e, o, t, l, d) => {
  const u = document.createElement("div"); u.className = `${n} ${d.sectionClass}`;
  const c = document.createElement("div"), a = document.createElement("span"), r = document.createElement("span");
  return a.className = `${e} ${d.amountClass}`, r.className = `${o} ${d.wordClass}`, a.textContent = String(t), r.textContent = l, c.appendChild(a), c.appendChild(r), u.appendChild(c), u;
}, b = (n, e, o) => {
  const t = n.querySelector(".simply-amount"), l = n.querySelector(".simply-word");
  t && (t.textContent = String(e)), l && (l.textContent = o);
}, E = (n, e) => {
  const o = "simply-amount", t = "simply-word", l = w("simply-section simply-days-section", o, t, 0, "day", e), d = w("simply-section simply-hours-section", o, t, 0, "hour", e), u = w("simply-section simply-minutes-section", o, t, 0, "minute", e), c = w("simply-section simply-seconds-section", o, t, 0, "second", e);
  return n.appendChild(l), n.appendChild(d), n.appendChild(u), n.appendChild(c), { days: l, hours: d, minutes: u, seconds: c };
};
const m = {
  year: 2027, month: 1, day: 1, hours: 0, minutes: 0, seconds: 0,
  words: {
    days: { lambda: (n, e) => e > 1 ? n + "s" : n, root: "day" },
    hours: { lambda: (n, e) => e > 1 ? n + "s" : n, root: "hour" },
    minutes: { lambda: (n, e) => e > 1 ? n + "s" : n, root: "minute" },
    seconds: { lambda: (n, e) => e > 1 ? n + "s" : n, root: "second" }
  },
  plural: !0, inline: !1, inlineSeparator: ", ", enableUtc: !1, onEnd: () => {}, refresh: 1e3, inlineClass: "simply-countdown-inline", sectionClass: "simply-section", amountClass: "simply-amount", wordClass: "simply-word", zeroPad: !1, countUp: !1, removeZeroUnits: !1, onStop: () => {}, onResume: () => {}, onUpdate: () => {}
}, N = (n) => n instanceof NodeList;
function I(n, e) { return `${e.zeroPad ? String(n.value).padStart(2, "0") : n.value} ${e.words[n.word].lambda(e.words[n.word].root, n.value)}`; }
function S(n, e, o) { return o.removeZeroUnits ? n.value !== 0 || e.some((t) => t.value !== 0) : !0; }
function M(n, e, o) { const t = n.filter((l, d) => S(l, n.slice(0, d), e)).map((l) => I(l, e)).join(e.inlineSeparator); o.innerHTML = t; }
function $(n, e, o) { n.forEach((t, l) => { t.word === "seconds" || S(t, n.slice(0, l), e) ? (b(o[t.word], e.zeroPad ? String(t.value).padStart(2, "0") : t.value, e.words[t.word].lambda(e.words[t.word].root, t.value)), o[t.word].style.display = "") : o[t.word].style.display = "none"; }); }
const y = (n, e) => {
  let o = { isPaused: !1, interval: null, targetDate: new Date() };
  const t = (s) => s.enableUtc ? new Date(Date.UTC(s.year, s.month - 1, s.day, s.hours, s.minutes, s.seconds)) : new Date(s.year, s.month - 1, s.day, s.hours, s.minutes, s.seconds);
  o.targetDate = t(e); let l = null; e.inline && (l = document.createElement("span"), l.className = e.inlineClass, n.appendChild(l));
  const d = e.inline ? null : E(n, { sectionClass: e.sectionClass, amountClass: e.amountClass, wordClass: e.wordClass }), 
  u = () => {
    const s = e.enableUtc ? new Date(Date.UTC((new Date()).getUTCFullYear(), (new Date()).getUTCMonth(), (new Date()).getUTCDate(), (new Date()).getUTCHours(), (new Date()).getUTCMinutes(), (new Date()).getUTCSeconds())) : new Date();
    let i = e.countUp ? s.getTime() - o.targetDate.getTime() : o.targetDate.getTime() - s.getTime();
    i <= 0 && !e.countUp && (i = 0, o.interval !== null && clearInterval(o.interval), e.onEnd && e.onEnd());
    const f = Math.floor(i / (1e3 * 60 * 60 * 24)); i -= f * 1e3 * 60 * 60 * 24;
    const C = Math.floor(i / (1e3 * 60 * 60)); i -= C * 1e3 * 60 * 60;
    const v = Math.floor(i / (1e3 * 60)); i -= v * 1e3 * 60;
    const g = Math.floor(i / 1e3);
    e.inline && l ? M([{ value: f, word: "days" }, { value: C, word: "hours" }, { value: v, word: "minutes" }, { value: g, word: "seconds" }], e, l) : d && $([{ value: f, word: "days" }, { value: C, word: "hours" }, { value: v, word: "minutes" }, { value: g, word: "seconds" }], e, d);
  }, c = () => { o.interval = setInterval(u, e.refresh), u(); }, a = () => { var s; o.interval !== null && (clearInterval(o.interval), o.interval = null), o.isPaused = !0, (s = e.onStop) == null || s.call(e); }, r = () => { var s; o.isPaused && (c(), o.isPaused = !1, (s = e.onResume) == null || s.call(e)); }, U = (s) => { var i; Object.assign(e, s), (s.year !== void 0 || s.month !== void 0 || s.day !== void 0 || s.hours !== void 0 || s.minutes !== void 0 || s.seconds !== void 0) && (o.targetDate = t(e)), (i = e.onUpdate) == null || i.call(e, s), o.isPaused || (o.interval && clearInterval(o.interval), c()); }, p = () => ({ ...o }); c();
  const h = new MutationObserver((s) => { s.forEach((i) => { i.removedNodes.forEach((f) => { f === n && (o.interval !== null && clearInterval(o.interval), h.disconnect()); }); }); });
  return n.parentNode && h.observe(n.parentNode, { childList: !0 }), { stopCountdown: a, resumeCountdown: r, updateCountdown: U, getState: p };
}, D = (n) => { const e = n; return e.stopCountdown = () => n.forEach((o) => o.stopCountdown()), e.resumeCountdown = () => n.forEach((o) => o.resumeCountdown()), e.updateCountdown = (o) => n.forEach((t) => t.updateCountdown(o)), e.getState = () => n.map((o) => o.getState()), e; }, 
simplyCountdown = (n, e = m) => {
  const o = { ...m, ...e };
  if (typeof n == "string") { const t = document.querySelectorAll(n), l = Array.from(t).map((d) => y(d, o)); return l.length === 1 ? l[0] : D(l); }
  if (N(n)) { const t = Array.from(n).map((l) => y(l, o)); return t.length === 1 ? t[0] : D(t); } return y(n, o);
};
window.simplyCountdown = simplyCountdown;