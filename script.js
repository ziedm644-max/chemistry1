// ─ بيانات المستخدمين
const users = {
  "111111": { name: "أحمد علي",   isTeacher: false },
  "222222": { name: "محمد أسامة", isTeacher: false },
  "333333": { name: "عمر ربيع",   isTeacher: false },
  "999999": { name: "Ziad Mohsen", isTeacher: true  }
};

let currentUser = null;

// ─ تسجيل الدخول
function tryLogin() {
  const code = document.getElementById("code")?.value?.trim();
  if(!code || code.length !== 6 || !/^\d{6}$/.test(code)) { alert("أدخل كود صحيح من 6 أرقام"); return; }
  if(users[code]){
    currentUser = users[code];
    localStorage.setItem("ziadUserCode", code);
    window.location.href = "dashboard.html";
  } else alert("الكود غير صحيح");
}

// ─ تشغيل الداشبورد
function initDashboard() {
  const code = localStorage.getItem("ziadUserCode");
  if(!code || !users[code]) { window.location.href="index.html"; return; }
  currentUser = users[code];
  document.getElementById("welcome-msg").innerText = `مرحباً ${currentUser.name} 👋`;
  renderNavigation();
}

// ─ أزرار التنقل
function renderNavigation(){
  const nav = document.getElementById("main-nav");
  let html = "";
  if(!currentUser.isTeacher){
    html = `
      <button onclick="openPage('home.html')">الرئيسية</button>
      <button onclick="openPage('courses.html')">الكورسات</button>
      <button onclick="openPage('exams.html')">الامتحانات</button>
      <button onclick="openPage('contact-teacher.html')">تواصل مع المدرس</button>
    `;
  } else {
    html = `
      <button onclick="openPage('home.html')">الرئيسية</button>
      <button onclick="openPage('courses.html')">الكورسات</button>
      <button onclick="openPage('grades.html')">الدرجات</button>
    `;
  }
  nav.innerHTML = html;
}

// ─ فتح صفحة جديدة لكل زرار
function openPage(url){
  window.open(url, "_blank");
}

// ─ صفحة الدرجات للمدرس
function renderGrades() {
  if(!currentUser.isTeacher) return;
  const grades = JSON.parse(localStorage.getItem("ziadGrades") || "{}");
  let html = `<h3>درجات الطلاب</h3>
    <table><tr><th>الاسم</th><th>الدرجة</th></tr>`;
  for(const student in grades){
    html += `<tr><td>${student}</td><td>${grades[student]}</td></tr>`;
  }
  html += `</table>`;
  document.getElementById("page-content").innerHTML = html;
}