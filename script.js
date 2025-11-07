// --------- Utility: DOM helpers ---------
const $ = (sel, el=document) => el.querySelector(sel);
const $$ = (sel, el=document) => [...el.querySelectorAll(sel)];

function setYear(){
  const y = new Date().getFullYear();
  const slot = $("#year");
  if(slot) slot.textContent = y;
}

// --------- Mobile Nav ---------
const navToggle = $("#navToggle");
const navMenu = $("#navMenu");
if(navToggle && navMenu){
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    navMenu.classList.toggle("open");
    navMenu.style.display = navMenu.classList.contains("open") ? "flex" : "";
  });
}

// --------- Theme (Dark / Light) ---------
const modeToggle = $("#modeToggle");
function applyTheme(mode){
  const root = document.documentElement;
  const isDark = mode === "dark" || (mode === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  root.classList.toggle("dark", isDark);
  if(modeToggle) modeToggle.setAttribute("aria-pressed", String(isDark));
}

function initTheme(){
  const saved = localStorage.getItem("ns-theme") || "auto";
  applyTheme(saved);
}
if(modeToggle){
  modeToggle.addEventListener("click", () => {
    const current = localStorage.getItem("ns-theme") || "auto";
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem("ns-theme", next);
    applyTheme(next);
  });
}

// --------- Contact Form (Demo) ---------
const contactForm = $("#contactForm");
const contactResult = $("#contactResult");
if(contactForm){
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(contactForm).entries());
    // Very basic validation
    if(!data.name || !data.email || !data.message){
      contactResult.textContent = "필수 항목을 입력해주세요.";
      contactResult.style.color = "var(--warn)";
      return;
    }
    // Demo: pretend to send
    contactResult.textContent = "문의가 접수되었습니다. 영업일 기준 1~2일 내 회신 드립니다.";
    contactResult.style.color = "var(--ok)";
    contactForm.reset();
  });
}

// --------- News (LocalStorage demo) ---------
const newsForm = $("#newsForm");
const newsList = $("#newsList");
const NEWS_KEY = "ns-news";
function renderNews(items){
  if(!newsList) return;
  newsList.innerHTML = "";
  items.forEach(({date,title,body}) => {
    const art = document.createElement("article");
    art.className = "news";
    const t = document.createElement("time");
    t.setAttribute("datetime", date);
    t.textContent = date;
    const h3 = document.createElement("h3");
    h3.textContent = title;
    const p = document.createElement("p");
    p.textContent = body;
    art.append(t,h3,p);
    newsList.append(art);
  });
}

function loadNews(){
  try{
    const raw = localStorage.getItem(NEWS_KEY);
    if(!raw) return;
    const parsed = JSON.parse(raw);
    if(Array.isArray(parsed)) renderNews(parsed);
  }catch{}
}

if(newsForm){
  newsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const date = $("#newsDate").value || new Date().toISOString().slice(0,10);
    const title = $("#newsTitleInput").value.trim();
    const body = $("#newsBody").value.trim();
    if(!title || !body){
      alert("제목과 내용을 입력해주세요.");
      return;
    }
    const items = JSON.parse(localStorage.getItem(NEWS_KEY) || "[]");
    items.unshift({date,title,body});
    localStorage.setItem(NEWS_KEY, JSON.stringify(items));
    renderNews(items);
    newsForm.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setYear();
  initTheme();
  loadNews();
});
