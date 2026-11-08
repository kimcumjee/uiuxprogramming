// 하루한칸 - 5주차 JavaScript
// 사용자가 알림 설정을 저장하면 문구·스타일·버튼 상태를 함께 바꿉니다.

console.log("script.js 연결 완료");

/* ---------- DOM 요소 선택 ----------
   클릭 함수보다 먼저 실행되어야 하므로 파일 위쪽에 둡니다.
   null 이 나오면 HTML 의 id 와 선택자를 다시 비교합니다. */
const saveMessage = document.querySelector("#saveMessage");
const saveButton = document.querySelector("#saveButton");

console.log(saveMessage);
console.log(saveButton);

/* ---------- 변수와 자료형 ----------
   const 는 다시 대입하지 않을 값, let 은 실행 중 바뀌는 값에 사용합니다. */
const beforeText = "아직 알림 시간을 저장하지 않았습니다.";   // String
const afterText = "매일 저녁 9시에 알려 드릴게요.";          // String
let saveCount = 0;                                        // Number
let isSaved = false;                                      // Boolean

// typeof 로 예상한 자료형이 맞는지 확인합니다.
console.log(typeof beforeText); // string
console.log(typeof saveCount);  // number
console.log(typeof isSaved);    // boolean

/* ---------- === 로 값과 자료형을 함께 비교 ---------- */
console.log(1 === 1);   // true  - 값과 자료형이 모두 같음
console.log(1 === "1"); // false - Number 와 String 은 자료형이 다름

/* ---------- 함수 ----------
   여러 줄의 동작에 이름을 붙입니다. 선언만으로는 실행되지 않습니다. */
function makeSaveMessage(isSaved) {
  if (isSaved === true) {
    return afterText;
  } else {
    return beforeText;
  }
}

function saveSettings() {
  isSaved = true;
  saveCount = saveCount + 1;

  // 1. 문구 교체
  saveMessage.textContent = makeSaveMessage(isSaved);

  // 2. 상태 스타일 적용 (CSS 의 .is-saved 규칙이 이때 적용됩니다)
  saveMessage.classList.add("is-saved");

  // 3. 버튼 상태 변경 (같은 저장 동작이 반복되지 않게 함)
  saveButton.textContent = "저장됨";
  saveButton.disabled = true;

  console.log("저장 횟수:", saveCount);
}

/* ---------- 클릭 이벤트 연결 ----------
   saveSettings() 로 적지 않습니다. 지금 실행하는 것이 아니라
   클릭이 발생한 순간 브라우저가 실행해야 하기 때문입니다. */
saveButton.addEventListener("click", saveSettings);


/* ===================================================================
   6주차 · 이벤트 처리와 동적 UI
   =================================================================== */

/* ---------- 이용 설정: 여섯 요소 선택 ---------- */
const themeButton = document.querySelector("#themeButton");
const userNameInput = document.querySelector("#userName");
const userNameCount = document.querySelector("#userNameCount");
const agreeCheck = document.querySelector("#agreeCheck");
const agreeMessage = document.querySelector("#agreeMessage");
const startButton = document.querySelector("#startButton");

/* ---------- click: 테마와 버튼 문구 전환 ----------
   toggle 은 클래스가 없으면 추가하고 있으면 제거한 뒤
   현재 상태를 Boolean 으로 돌려줍니다. */
function handleThemeClick() {
  const isDark = document.body.classList.toggle("dark");
  themeButton.textContent = isDark
    ? "밝은 테마로 바꾸기"
    : "어두운 테마로 바꾸기";
}

themeButton.addEventListener("click", handleThemeClick);

/* ---------- input: 입력하는 동안 글자 수 표시 ----------
   input 은 글자를 쓰거나 지울 때마다 발생합니다. */
function handleUserNameInput() {
  const currentLength = userNameInput.value.length;
  userNameCount.textContent = currentLength + " / 10";
}

userNameInput.addEventListener("input", handleUserNameInput);

/* ---------- change: 체크 상태로 안내 문구와 버튼 전환 ----------
   change 는 선택 상태가 달라졌을 때 발생합니다.
   agreed 하나를 기준으로 문구·클래스·버튼 상태를 함께 바꿉니다. */
function handleAgreeChange() {
  const agreed = agreeCheck.checked;

  startButton.disabled = !agreed;
  agreeMessage.textContent = agreed
    ? "확인이 끝났습니다. 오늘 기록을 시작할 수 있습니다."
    : "안내를 확인해야 기록을 시작할 수 있습니다.";
  agreeMessage.classList.toggle("is-ready", agreed);
}

agreeCheck.addEventListener("change", handleAgreeChange);

/* ---------- 탭: 여러 요소를 한꺼번에 선택 ----------
   querySelector 는 하나, querySelectorAll 은 모두 찾습니다. */
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

// 기존 선택 상태를 모두 해제합니다.
function resetTabsAndPanels() {
  tabs.forEach(function (tab) {
    tab.classList.remove("is-active");
    tab.setAttribute("aria-selected", "false");
  });

  panels.forEach(function (panel) {
    panel.classList.remove("is-active");
    panel.hidden = true;
  });
}

// 클릭한 탭과 data-target 으로 연결된 패널 하나만 켭니다.
function activateTab(clickedTab) {
  const targetSelector = clickedTab.dataset.target;
  const targetPanel = document.querySelector(targetSelector);

  clickedTab.classList.add("is-active");
  clickedTab.setAttribute("aria-selected", "true");
  targetPanel.classList.add("is-active");
  targetPanel.hidden = false;
}

// 먼저 모두 끄고, 그다음 하나만 켜야 항상 한 개만 열립니다.
function handleTabClick(event) {
  resetTabsAndPanels();
  activateTab(event.currentTarget);
}

tabs.forEach(function (tab) {
  tab.addEventListener("click", handleTabClick);
});


/* ===================================================================
   10주차 · 내비게이션과 현재 위치
   메뉴: 서비스 소개(#about) → 오늘 기록(#recordFlow) → 이번 주 기록(#weekBoard)
   =================================================================== */

const navLinks = document.querySelectorAll(".main-nav a");
const menuToggle = document.querySelector("#menu-toggle");
const mainNav = document.querySelector("#main-nav");

// 주소의 # 값과 같은 메뉴 하나에만 강조와 aria-current 를 남깁니다.
// # 이 없으면 첫 메뉴(서비스 소개)를 현재 위치로 봅니다.
function updateCurrentNav() {
  const currentHash = window.location.hash;

  navLinks.forEach(function (link) {
    const current = currentHash
      ? link.getAttribute("href") === currentHash
      : link === navLinks[0];

    link.classList.toggle("is-current", current);

    if (current) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

window.addEventListener("hashchange", updateCurrentNav);
updateCurrentNav();

// 버튼으로 영역을 옮길 때도 메뉴와 같은 주소를 쓰게 합니다.
// 이미 같은 주소면 hashchange 가 생기지 않으므로 직접 스크롤합니다.
function goTo(hash) {
  if (window.location.hash === hash) {
    document.querySelector(hash).scrollIntoView();
  } else {
    window.location.hash = hash;
  }
}

/* ---------- 모바일 메뉴: 메뉴·버튼 문구·aria-expanded 를 같은 값으로 ---------- */
function setMenuOpen(isOpen) {
  mainNav.classList.toggle("is-open", isOpen);
  menuToggle.textContent = isOpen ? "메뉴 닫기" : "메뉴 열기";
  menuToggle.setAttribute("aria-expanded", String(isOpen));
}

menuToggle.addEventListener("click", function () {
  setMenuOpen(!mainNav.classList.contains("is-open"));
});

// 목적지를 고르면 메뉴를 닫습니다.
navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    setMenuOpen(false);
  });
});

// 열린 메뉴는 Esc 로도 닫고, 초점을 메뉴 버튼으로 돌려줍니다.
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && mainNav.classList.contains("is-open")) {
    setMenuOpen(false);
    menuToggle.focus();
  }
});


/* ===================================================================
   7주차 · 사용자 흐름과 인터랙션 시나리오
   과업: 오늘 공부한 내용을 기록해 달력의 한 칸을 채운다.
   완료 조건: 확인 화면에서 내용을 검토하고 완료 화면에 도달한다.
   =================================================================== */

const recordFlow = document.querySelector("#recordFlow");
const recordForm = document.querySelector("#recordForm");
const recordGate = document.querySelector("#recordGate");
const recordGateLink = document.querySelector("#recordGateLink");
const recordSteps = document.querySelectorAll(".record-step");
const recordProgress = document.querySelector("#recordProgress");
const recordSubject = document.querySelector("#recordSubject");
const recordMinutes = document.querySelector("#recordMinutes");
const recordFocus = document.querySelector("#recordFocus");
const focusHelp = document.querySelector("#focusHelp");
const recordSummary = document.querySelector("#recordSummary");
const recordDone = document.querySelector("#recordDone");

// 9주차 · 입력칸마다 필드 묶음·안내·글자 수·오류 문장을 따로 둡니다.
const subjectField = document.querySelector("#subject-field");
const subjectHelp = document.querySelector("#subject-help");
const subjectCount = document.querySelector("#subject-count");
const subjectError = document.querySelector("#subject-error");
const minutesField = document.querySelector("#minutes-field");
const minutesHelp = document.querySelector("#minutes-help");
const minutesError = document.querySelector("#minutes-error");

// 9주차 · 조건부 입력 (공부 방식)
const methodOption = document.querySelector("#methodOption");
const methodOptions = document.querySelector("#methodOptions");
const methodInputs = [...document.querySelectorAll('input[name="method"]')];

// 9주차 · 제출 상태. 알림 설정의 saveButton 과 이름이 겹치지 않게 record 를 붙였습니다.
const recordSaveButton = document.querySelector("#recordComplete");
const recordBack3 = document.querySelector("#recordBack3");
const submitStatus = document.querySelector("#submit-status");
// 주소에 ?save-error=1 을 붙이면 저장 실패 경로를 확인할 수 있습니다.
const forceSaveFailure = new URLSearchParams(location.search).has("save-error");

const SUBJECT_HELP = "달력에서 알아볼 수 있도록 과목 이름을 2자 이상 입력해 주세요.";
const MINUTES_HELP = "1분부터 1440분(24시간)까지 숫자로 입력합니다. 10분 단위면 충분합니다.";
const SAVE_LABEL = "오늘 칸 채우기";

const stepNames = ["과목과 시간", "집중도 선택", "내용 확인"];
let currentStep = 1;
let isSaving = false;

// 현재 단계만 보여 주고, 지금 어디인지 진행 표시에 적습니다.
// 9주차: 단계가 바뀌면 새 단계 제목으로 초점을 옮겨 현재 위치를 알려 줍니다.
function showRecordStep(step) {
  currentStep = step;

  recordSteps.forEach(function (item) {
    item.hidden = Number(item.dataset.step) !== step;
  });

  recordProgress.textContent = step <= 3
    ? step + " / 3 · " + stepNames[step - 1]
    : "기록 완료";

  const heading = recordSteps[step - 1].querySelector("h3");
  heading.tabIndex = -1;
  heading.focus();
}

/* ---------- 9주차 · 조건부 입력을 한 함수에서 갱신 ----------
   hidden 으로 화면에서 숨기고, disabled 로 Tab 이동과 제출 데이터에서도 뺍니다. */
function syncMethodFields() {
  const open = methodOption.checked;
  methodOption.setAttribute("aria-expanded", String(open));
  methodOptions.hidden = !open;
  methodInputs.forEach(function (input) {
    input.disabled = !open;
  });
}

methodOption.addEventListener("change", syncMethodFields);
syncMethodFields();

/* ---------- 9주차 · 입력 중 상태 ----------
   작성하는 동안에는 빨간 오류를 띄우지 않고, 글자 수와 조건 충족 여부만 알려 줍니다. */
function isInvalid(input) {
  return input.getAttribute("aria-invalid") === "true";
}

function updateSubjectExperience() {
  const length = recordSubject.value.length;
  const enough = recordSubject.value.trim().length >= 2;

  subjectCount.textContent = length + " / 20자";
  subjectField.classList.toggle("is-valid", enough && !isInvalid(recordSubject));

  if (!isInvalid(recordSubject)) {
    subjectHelp.textContent = enough ? "입력 조건을 충족했습니다." : SUBJECT_HELP;
  }
}

function getMinutesProblem() {
  const raw = recordMinutes.value;
  const minutes = Number(raw);

  if (raw === "") return "공부한 시간을 입력해 주세요. 예: 90";
  if (!Number.isInteger(minutes)) return "시간은 분 단위 정수로 입력해 주세요. 예: 1시간 30분이면 90";
  if (minutes < 1) return "공부한 시간을 1분 이상으로 입력해 주세요. 예: 10";
  if (minutes > 1440) return "하루는 1440분입니다. 1440분 이하로 입력해 주세요.";
  return "";
}

function updateMinutesExperience() {
  const ok = getMinutesProblem() === "";
  minutesField.classList.toggle("is-valid", ok && !isInvalid(recordMinutes));

  if (!isInvalid(recordMinutes)) {
    minutesHelp.textContent = ok
      ? "입력 조건을 충족했습니다. " + Number(recordMinutes.value) + "분으로 기록합니다."
      : MINUTES_HELP;
  }
}

/* ---------- 9주차 · 오류 표시와 해제를 같은 규칙으로 ----------
   aria-invalid, .has-error, 오류 문장을 항상 함께 켜고 함께 끕니다. */
function showFieldError(input, field, errorEl, message) {
  input.setAttribute("aria-invalid", "true");
  errorEl.textContent = message;
  field.classList.remove("is-valid");
  field.classList.add("has-error");
  return false;
}

function clearFieldError(input, field, errorEl) {
  input.removeAttribute("aria-invalid");
  errorEl.textContent = "";
  field.classList.remove("has-error");
}

// 빈 값과 글자 수 부족은 원인이 다르므로 문장도 다르게 씁니다.
function validateSubject() {
  const subject = recordSubject.value.trim();

  if (!subject) {
    return showFieldError(recordSubject, subjectField, subjectError,
      "공부한 과목을 입력해 주세요. 예: 자료구조");
  }

  if (subject.length < 2) {
    return showFieldError(recordSubject, subjectField, subjectError,
      "과목 이름을 2자 이상 입력해 주세요. 예: 영어, 회계원리");
  }

  clearFieldError(recordSubject, subjectField, subjectError);
  updateSubjectExperience();
  return true;
}

function validateMinutes() {
  const problem = getMinutesProblem();

  if (problem) {
    return showFieldError(recordMinutes, minutesField, minutesError, problem);
  }

  clearFieldError(recordMinutes, minutesField, minutesError);
  updateMinutesExperience();
  return true;
}

// 두 칸을 모두 검사해 오류를 한 번에 보여 주고, 첫 오류 칸으로 초점을 옮깁니다.
function validateStep1() {
  const subjectOk = validateSubject();
  const minutesOk = validateMinutes();
  return subjectOk && minutesOk;
}

function focusFirstError() {
  window.requestAnimationFrame(function () {
    recordForm.querySelector('[aria-invalid="true"]')?.focus();
  });
}

// 오류가 확인된 칸은 고치는 즉시 다시 검사해 결과를 반영합니다.
recordSubject.addEventListener("input", function () {
  updateSubjectExperience();
  if (isInvalid(recordSubject)) validateSubject();
});

recordMinutes.addEventListener("input", function () {
  updateMinutesExperience();
  if (isInvalid(recordMinutes)) validateMinutes();
});

/* ---------- 진입: 6주차의 동의 조건을 유지한 채 흐름을 엽니다 ----------
   startButton 은 agreeCheck 를 선택해야 눌리므로,
   안내를 확인한 사용자만 이 흐름에 들어옵니다. */
// 10주차: 영역은 항상 보이므로, 시작하면 안내 대신 입력 form 을 엽니다.
function openRecordForm() {
  recordGate.hidden = true;
  recordProgress.hidden = false;
  recordForm.hidden = false;
}

startButton.addEventListener("click", function () {
  openRecordForm();
  goTo("#recordFlow");
  showRecordStep(1);
});

/* ---------- 1단계: 필수값 검사 ----------
   비어 있으면 다음으로 넘기지 않고 같은 단계에 머뭅니다. */
document.querySelector("#recordNext1").addEventListener("click", function () {
  if (!validateStep1()) {
    focusFirstError();
    return;
  }

  showRecordStep(2);
});

/* ---------- 2단계: 선택에 따른 조건부 안내 ---------- */
recordFocus.addEventListener("change", function () {
  focusHelp.hidden = recordFocus.value !== "아쉬움";
});

// 이전으로 돌아가도 입력한 값은 지우지 않습니다.
document.querySelector("#recordBack2").addEventListener("click", function () {
  showRecordStep(1);
});

/* ---------- 3단계: 제출될 값을 확인 화면에 반영 ----------
   FormData 로 읽으므로 닫혀서 disabled 된 공부 방식은 요약에도 들어가지 않습니다. */
function readRecordForm() {
  const data = new FormData(recordForm);
  return {
    subject: String(data.get("subject") || "").trim(),
    minutes: Number(data.get("minutes")),
    focus: String(data.get("focus") || "좋음"),
    method: data.get("withMethod") === "included" ? String(data.get("method") || "") : ""
  };
}

document.querySelector("#recordNext2").addEventListener("click", function () {
  recordSummary.textContent = describeRecord(readRecordForm());
  submitStatus.textContent = "";
  showRecordStep(3);
});

recordBack3.addEventListener("click", function () {
  showRecordStep(2);
});

/* ---------- 9주차 · 저장 상태 ----------
   저장하는 동안에는 버튼을 잠가 중복 제출을 막고 처리 중임을 알립니다. */
function setSubmitState(loading, message) {
  isSaving = loading;
  recordForm.setAttribute("aria-busy", String(loading));
  recordSaveButton.disabled = loading;
  recordBack3.disabled = loading;
  recordSaveButton.textContent = loading ? "칸을 채우는 중…" : SAVE_LABEL;
  submitStatus.textContent = message;
  submitStatus.classList.toggle("is-failed", !loading && message.startsWith("저장하지 못했습니다"));
}

function wait(milliseconds) {
  return new Promise(function (resolve) {
    window.setTimeout(resolve, milliseconds);
  });
}

// 실제 서버 대신 0.6초 기다린 뒤 저장합니다. 실패 테스트 주소에서는 오류를 던집니다.
async function persistRecord(record) {
  await wait(600);

  if (forceSaveFailure) {
    throw new Error("수업용 저장 실패");
  }

  saveTodayRecord(record);
}

/* ---------- 9주차 · submit 하나로 단계 이동과 저장을 통합 ----------
   [오늘 칸 채우기] 버튼과 입력칸에서 누른 Enter 가 모두 이 흐름을 거칩니다. */
recordForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  if (isSaving) return;

  if (currentStep === 1) {
    document.querySelector("#recordNext1").click();
    return;
  }

  if (currentStep === 2) {
    document.querySelector("#recordNext2").click();
    return;
  }

  if (currentStep !== 3) return;

  // 확인 단계에서도 전체 값을 다시 검사합니다. 오류가 있으면 1단계를 열고 첫 오류 칸으로 갑니다.
  if (!validateStep1()) {
    showRecordStep(1);
    focusFirstError();
    return;
  }

  const record = readRecordForm();
  setSubmitState(true, "오늘 칸에 기록을 저장하고 있습니다.");

  try {
    await persistRecord(record);
    setSubmitState(false, "오늘 칸을 채웠습니다.");
    recordDone.textContent = describeRecord(record) +
      " 기록을 저장했습니다. [이번 주 기록 보기]에서 채운 칸을 확인할 수 있습니다.";
    showRecordStep(4);
  } catch {
    setSubmitState(false,
      "저장하지 못했습니다. 입력한 내용은 그대로 두었습니다. [오늘 칸 채우기]를 다시 눌러 주세요.");
    recordSaveButton.focus();
  }
});

/* ---------- 다시 시작: 입력·오류·선택·진행·저장 상태를 모두 초기화 ----------
   이번 주 기록의 [새 기록 더하기]도 같은 함수로 흐름을 처음부터 엽니다. */
function resetRecordFlow() {
  recordForm.reset();
  syncMethodFields();
  focusHelp.hidden = true;

  clearFieldError(recordSubject, subjectField, subjectError);
  clearFieldError(recordMinutes, minutesField, minutesError);
  subjectField.classList.remove("is-valid");
  minutesField.classList.remove("is-valid");
  subjectCount.textContent = "0 / 20자";
  subjectHelp.textContent = SUBJECT_HELP;
  minutesHelp.textContent = MINUTES_HELP;

  recordSummary.textContent = "";
  recordDone.textContent = "";
  setSubmitState(false, "");

  openRecordForm();
  showRecordStep(1);
  recordSubject.focus();
}

document.querySelector("#recordRestart").addEventListener("click", resetRecordFlow);


/* ===================================================================
   중간고사 · 이번 주 기록 보기
   7주차 흐름의 끝(기록 완료)에서 이어지는 새 사용 경로입니다.
   사용자 목표: 오늘 칸이 채워진 것을 확인하고, 이번 주에 꾸준히 했는지 본다.
   새 행동: 날짜 칸 열어 보기 · 과목으로 찾기 · 잘못 남긴 기록 지우기
   =================================================================== */

const weekBoard = document.querySelector("#weekBoard");
const weekBoardTitle = document.querySelector("#weekBoardTitle");
const streakMessage = document.querySelector("#streakMessage");
const weekCells = document.querySelector("#weekCells");
const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchSubject");
const searchMessage = document.querySelector("#searchMessage");
const searchClear = document.querySelector("#searchClear");
const dayDetail = document.querySelector("#dayDetail");
const dayDetailTitle = document.querySelector("#dayDetailTitle");
const dayRecords = document.querySelector("#dayRecords");
const dayEmpty = document.querySelector("#dayEmpty");
const deleteConfirm = document.querySelector("#deleteConfirm");
const deleteConfirmText = document.querySelector("#deleteConfirmText");
const boardMessage = document.querySelector("#boardMessage");

const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

/* ---------- 날짜 도우미 ----------
   기록은 "2026-10-22" 같은 날짜 문자열로 구분합니다. */
function toDateKey(date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return date.getFullYear() + "-" + month + "-" + day;
}

// 오늘에서 offset 일 전의 날짜 (0 이면 오늘)
function daysAgo(offset) {
  const date = new Date();
  date.setDate(date.getDate() - offset);
  return date;
}

// "10월 21일 (화)" 형태로 보여 줍니다.
function formatDay(date) {
  return (date.getMonth() + 1) + "월 " + date.getDate() + "일 (" +
    dayNames[date.getDay()] + ")";
}

/* ---------- 기록 데이터 ----------
   프로토타입이므로 지난 6일은 예시 기록을 넣어 둡니다.
   4일 전은 일부러 비워 연속 일수가 끊긴 경우를 볼 수 있게 했습니다. */
let records = [
  { id: 1, date: toDateKey(daysAgo(6)), subject: "자료구조", minutes: 60, focus: "보통" },
  { id: 2, date: toDateKey(daysAgo(5)), subject: "영어 단어", minutes: 30, focus: "좋음" },
  { id: 3, date: toDateKey(daysAgo(3)), subject: "자료구조", minutes: 90, focus: "좋음", method: "문제 풀기" },
  { id: 4, date: toDateKey(daysAgo(2)), subject: "운영체제", minutes: 45, focus: "아쉬움" },
  { id: 5, date: toDateKey(daysAgo(1)), subject: "자료구조", minutes: 40, focus: "보통" },
  { id: 6, date: toDateKey(daysAgo(1)), subject: "영어 단어", minutes: 20, focus: "좋음" }
];
let nextRecordId = 7;

let selectedOffset = null;  // 지금 열어 둔 날짜 (오늘에서 며칠 전인지)
let searchKeyword = "";     // 지금 적용된 검색어 (없으면 빈 문자열)
let pendingDeleteId = null; // 지울지 확인하고 있는 기록
let justFilled = false;     // 방금 채운 오늘 칸에 강조 효과를 줄지

function getRecordsOn(date) {
  const dateKey = toDateKey(date);
  return records.filter(function (record) {
    return record.date === dateKey;
  });
}

function describeRecord(record) {
  return record.subject + " · " + record.minutes + "분 · 집중도 " + record.focus +
    (record.method ? " · " + record.method : "");
}

function matchesKeyword(record, keyword) {
  return record.subject.toLowerCase().includes(keyword.toLowerCase());
}

// 9주차: 기록 form 의 submit 이 저장에 성공했을 때 호출합니다.
function saveTodayRecord(record) {
  records.push({
    id: nextRecordId,
    date: toDateKey(daysAgo(0)),
    subject: record.subject,
    minutes: record.minutes,
    focus: record.focus,
    method: record.method
  });
  nextRecordId = nextRecordId + 1;

  // 10주차: 기록 보드는 항상 보이므로 오늘 칸과 기록 목록을 바로 갱신합니다.
  selectedOffset = 0;
  pendingDeleteId = null;
  boardMessage.textContent = "";
  justFilled = true;
  renderBoard();
}

/* ---------- 연속 일수 ----------
   오늘 칸이 비어 있으면 어제부터 셉니다.
   오늘을 아직 안 했다고 연속 기록이 0 으로 보이면 의욕이 꺾이기 때문입니다. */
function renderStreak() {
  const todayFilled = getRecordsOn(daysAgo(0)).length > 0;
  let offset = todayFilled ? 0 : 1;
  let streak = 0;

  while (offset <= 6 && getRecordsOn(daysAgo(offset)).length > 0) {
    streak = streak + 1;
    offset = offset + 1;
  }

  if (todayFilled) {
    streakMessage.textContent = streak + "일 연속으로 칸을 채우고 있습니다.";
  } else if (streak > 0) {
    streakMessage.textContent = "오늘 칸이 비어 있습니다. 오늘 기록하면 " +
      (streak + 1) + "일 연속이 됩니다.";
  } else {
    streakMessage.textContent = "오늘 칸을 채우면 연속 기록이 다시 시작됩니다.";
  }
  streakMessage.classList.toggle("is-waiting", !todayFilled);
}

/* ---------- 최근 7일 칸 ----------
   상태(기록 여부·오늘·선택·검색 결과)를 클래스로 붙이고,
   보이는 모양은 CSS 가 담당합니다. */
function renderWeek() {
  weekCells.innerHTML = "";
  weekCells.classList.toggle("is-searching", searchKeyword !== "");

  for (let offset = 6; offset >= 0; offset--) {
    const date = daysAgo(offset);
    const dayList = getRecordsOn(date);
    const filled = dayList.length > 0;
    const matched = searchKeyword !== "" && dayList.some(function (record) {
      return matchesKeyword(record, searchKeyword);
    });

    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = "week-cell";
    cell.classList.toggle("is-filled", filled);
    cell.classList.toggle("is-today", offset === 0);
    cell.classList.toggle("is-match", matched);
    cell.classList.toggle("is-selected", offset === selectedOffset);
    cell.classList.toggle("just-filled", offset === 0 && justFilled);
    cell.setAttribute("aria-pressed", String(offset === selectedOffset));
    cell.setAttribute("aria-label",
      formatDay(date) + (offset === 0 ? " 오늘" : "") + ", " +
      (filled ? "기록 " + dayList.length + "개" : "기록 없음") +
      (matched ? ", 찾은 과목 있음" : ""));

    cell.innerHTML =
      '<span class="cell-day">' + (offset === 0 ? "오늘" : dayNames[date.getDay()]) + "</span>" +
      '<span class="cell-date">' + date.getDate() + "</span>" +
      '<span class="cell-count">' + (filled ? dayList.length + "개" : "빈 칸") + "</span>";

    cell.addEventListener("click", function () {
      selectDay(offset);
    });

    const item = document.createElement("li");
    item.appendChild(cell);
    weekCells.appendChild(item);
  }

  justFilled = false;
}

/* ---------- 선택한 날짜의 기록 ----------
   기록이 있으면 목록과 지우기 버튼을, 없으면 결과 없음 안내를 보여 줍니다. */
function renderDetail() {
  if (selectedOffset === null) {
    dayDetail.hidden = true;
    return;
  }

  const date = daysAgo(selectedOffset);
  const dayList = getRecordsOn(date);

  dayDetail.hidden = false;
  dayDetailTitle.textContent =
    formatDay(date) + (selectedOffset === 0 ? " · 오늘" : "") + " 기록";

  dayRecords.innerHTML = "";
  dayList.forEach(function (record) {
    const item = document.createElement("li");

    // 사용자가 입력한 과목명이 들어가므로 innerHTML 이 아니라 textContent 로 넣습니다.
    const text = document.createElement("span");
    text.textContent = describeRecord(record);

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "secondary-button";
    removeButton.textContent = "지우기";
    removeButton.setAttribute("aria-label", record.subject + " 기록 지우기");
    removeButton.addEventListener("click", function () {
      askDelete(record.id);
    });

    item.append(text, removeButton);
    dayRecords.appendChild(item);
  });

  dayRecords.hidden = dayList.length === 0;
  dayEmpty.hidden = dayList.length > 0;
  dayEmpty.textContent = selectedOffset === 0
    ? "오늘은 아직 기록이 없습니다. 아래 [새 기록 더하기]로 오늘 칸을 채워 보세요."
    : "이 날은 기록이 없습니다. 하루 빠져도 지금까지 채운 칸은 그대로 남습니다.";

  // 지우기 확인 중인 기록이 있을 때만 확인 상자를 보여 줍니다.
  const pending = records.find(function (record) {
    return record.id === pendingDeleteId;
  });
  deleteConfirm.hidden = !pending;
  if (pending) {
    deleteConfirmText.textContent = "'" + describeRecord(pending) +
      "' 기록을 지울까요? 지우면 칸과 연속 일수가 다시 계산됩니다.";
  }
}

function renderBoard() {
  renderStreak();
  renderWeek();
  renderDetail();
  renderRecordList();
}

// 칸을 다시 그리면 포커스가 사라지므로, 선택한 칸으로 되돌립니다.
function focusSelectedCell() {
  if (selectedOffset !== null) {
    weekCells.querySelectorAll(".week-cell")[6 - selectedOffset].focus();
  }
}

/* ---------- 진입: 7주차 완료 화면에서 이어집니다 ---------- */
document.querySelector("#openWeekButton").addEventListener("click", function () {
  // 10주차: 메뉴와 같은 주소(#weekBoard)로 이동해 현재 메뉴 표시도 함께 바뀝니다.
  goTo("#weekBoard");
  selectedOffset = 0;
  pendingDeleteId = null;
  boardMessage.textContent = "";
  justFilled = true;
  renderBoard();
  weekBoardTitle.focus();
});

/* ---------- 칸 선택 ----------
   다른 날을 열면 진행 중이던 지우기 확인은 닫습니다.
   검색어는 그대로 두어 찾은 칸을 차례로 열어 볼 수 있게 합니다. */
function selectDay(offset) {
  selectedOffset = offset;
  pendingDeleteId = null;
  boardMessage.textContent = "";
  renderBoard();
  focusSelectedCell();
}

/* ---------- 과목으로 찾기 ----------
   빈 값 → 오류 안내, 일치 없음 → 결과 없음 안내, 일치 → 칸 강조와 합계 */
function applySearch(keyword) {
  searchMessage.className = "";
  searchInput.classList.remove("has-error");

  if (keyword === "") {
    searchKeyword = "";
    searchMessage.textContent = "찾을 과목 이름을 입력해 주세요. 예: 자료구조";
    searchMessage.classList.add("is-error");
    searchInput.classList.add("has-error");
    searchClear.hidden = true;
    searchInput.focus();
    renderWeek();
    return;
  }

  const matched = records.filter(function (record) {
    return matchesKeyword(record, keyword);
  });
  searchClear.hidden = false;

  if (matched.length === 0) {
    searchKeyword = "";
    searchMessage.textContent = "'" + keyword +
      "' 기록이 이번 주에 없습니다. 과목 이름을 확인하거나 [검색 지우기]로 전체 칸을 다시 보세요.";
    searchMessage.classList.add("is-empty");
    renderWeek();
    return;
  }

  const total = matched.reduce(function (sum, record) {
    return sum + record.minutes;
  }, 0);

  searchKeyword = keyword;
  searchMessage.textContent = "'" + keyword + "' 기록 " + matched.length +
    "개 · 총 " + total + "분. 강조된 칸을 눌러 자세히 보세요.";
  searchMessage.classList.add("is-found");
  renderWeek();
}

// submit 의 기본 동작(새로고침)을 막고 검색만 실행합니다. Enter 로도 찾을 수 있습니다.
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  applySearch(searchInput.value.trim());
});

// 다시 입력하기 시작하면 오류 표시를 지웁니다.
searchInput.addEventListener("input", function () {
  if (searchMessage.classList.contains("is-error")) {
    searchMessage.textContent = "";
    searchMessage.className = "";
    searchInput.classList.remove("has-error");
  }
});

searchClear.addEventListener("click", function () {
  searchInput.value = "";
  searchKeyword = "";
  searchMessage.textContent = "";
  searchMessage.className = "";
  searchClear.hidden = true;
  renderWeek();
  searchInput.focus();
});

/* ---------- 기록 지우기: 확인 → 지우기 / 취소 ----------
   바로 지우지 않고 한 번 더 묻습니다. 기본 포커스는 안전한 [취소]에 둡니다. */
function askDelete(recordId) {
  pendingDeleteId = recordId;
  boardMessage.textContent = "";
  renderDetail();
  document.querySelector("#deleteNo").focus();
}

document.querySelector("#deleteNo").addEventListener("click", function () {
  pendingDeleteId = null;
  boardMessage.textContent = "지우기를 취소했습니다. 기록은 그대로 남아 있습니다.";
  renderDetail();
  focusSelectedCell();
});

document.querySelector("#deleteYes").addEventListener("click", function () {
  records = records.filter(function (record) {
    return record.id !== pendingDeleteId;
  });
  pendingDeleteId = null;

  // 검색 중이었다면 남은 기록으로 결과를 다시 계산합니다.
  if (searchKeyword !== "") {
    applySearch(searchKeyword);
  }

  renderBoard();
  boardMessage.textContent = "기록을 지웠습니다. 칸과 연속 일수를 다시 계산했습니다.";
  focusSelectedCell();
});

/* ---------- 새 기록 더하기: 7주차 흐름을 처음 상태로 다시 엽니다 ----------
   10주차: 이번 주 기록이 항상 보이므로, 안내를 확인하지 않은 사용자는 시작 조건으로 안내합니다. */
document.querySelector("#addRecordButton").addEventListener("click", function () {
  goTo("#recordFlow");

  if (!agreeCheck.checked) {
    recordGateLink.focus();
    return;
  }

  resetRecordFlow();
});


/* ===================================================================
   10주차 · 기록 모아 보기 (집중도 필터)
   저장된 기록에서 구분할 수 있는 상태 = 집중도(좋음 / 보통 / 아쉬움)
   =================================================================== */

const filterButtons = document.querySelectorAll(".filter-button");
const recordList = document.querySelector("#recordList");
const recordEmpty = document.querySelector("#recordEmpty");
const recordCount = document.querySelector("#recordCount");
let currentFilter = "all";

function getVisibleRecords() {
  return records
    .filter(function (record) {
      return currentFilter === "all" || record.focus === currentFilter;
    })
    .sort(function (a, b) {
      // 최근 날짜가 위로, 같은 날은 나중에 남긴 기록이 위로
      return a.date === b.date ? b.id - a.id : (a.date < b.date ? 1 : -1);
    });
}

// "2026-10-22" 같은 기록 날짜가 오늘에서 며칠 전인지 찾습니다.
function offsetOf(dateKey) {
  for (let offset = 0; offset <= 6; offset++) {
    if (toDateKey(daysAgo(offset)) === dateKey) return offset;
  }
  return null;
}

function renderRecordList() {
  const visibleRecords = getVisibleRecords();

  recordList.replaceChildren();
  recordEmpty.hidden = visibleRecords.length !== 0;
  recordList.hidden = visibleRecords.length === 0;

  const emptyTitle = recordEmpty.querySelector("h4");
  const emptyDescription = recordEmpty.querySelector("p");
  const emptyAction = recordEmpty.querySelector("a");

  if (visibleRecords.length === 0) {
    const filtered = currentFilter !== "all";
    emptyTitle.textContent = filtered
      ? "집중도 '" + currentFilter + "' 기록이 이번 주에 없어요."
      : "아직 남긴 기록이 없어요.";
    emptyDescription.textContent = filtered
      ? "다른 집중도를 선택하거나 [전체]를 눌러 모든 기록을 보세요."
      : "오늘 공부한 것을 기록하면 이곳에 한 줄씩 모입니다.";
    emptyAction.hidden = filtered;
  }

  recordCount.textContent = String(visibleRecords.length);
  recordCount.setAttribute("aria-label", "현재 표시 중인 기록 " + visibleRecords.length + "개");

  visibleRecords.forEach(function (record) {
    const offset = offsetOf(record.date);
    const date = daysAgo(offset);

    // 누르면 그날 칸을 열어 자세한 기록과 지우기를 볼 수 있습니다.
    const button = document.createElement("button");
    button.type = "button";
    button.className = "record-item";

    const day = document.createElement("span");
    day.className = "record-item-day";
    day.textContent = offset === 0 ? "오늘" : formatDay(date);

    const text = document.createElement("span");
    text.textContent = describeRecord(record);   // 사용자가 입력한 과목명이므로 textContent

    button.append(day, text);
    button.setAttribute("aria-label", formatDay(date) + " " + describeRecord(record) + ", 이 날 칸 열기");
    button.addEventListener("click", function () {
      selectDay(offset);
    });

    const item = document.createElement("li");
    item.appendChild(button);
    recordList.appendChild(item);
  });
}

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    currentFilter = button.dataset.filter;

    filterButtons.forEach(function (item) {
      const selected = item === button;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });

    renderRecordList();
  });
});

// 이번 주 기록은 처음부터 보이므로 페이지를 열 때 한 번 그립니다.
renderBoard();
