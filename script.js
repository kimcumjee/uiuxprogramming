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
