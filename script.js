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
