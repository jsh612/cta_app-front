# 세무사 모의고사 공유 앱

## 어려웠던 점

### 1. picker 작성 어려움

- react-native picker를 사용할 경우 ios에서 디자인이 좋지 않음.
- npm 패키지로 해결
- https://www.npmjs.com/package/react-native-table-component
- Picker.js 참조

### 2. useQuery를 특정 버튼 클릭시 실행 되도록 하기 어려움

- hook은 이벤트핸들러에서 실행되지 않기 떄문이다.
- https://ko.reactjs.org/warnings/invalid-hook-call-warning.html
- skip 속성 사용 또는 userLazyQuery 사용
- Rank.js 참조

### 3. 회1 + 회2 합계 점수 등수 효율적으로 만들기 어려움
 - 두개의 배열을 합쳐야 하기 때문에 반복문을 중복으로 돌릴 위험이 있음.
 - 프론트 엔드에서 두 성적을 합치는 것이 아니라 , DB에 점수 입력시 합친다.

### 4. 나의 성적 보기
 - rankObj를 별도로 만듦 (이름: 성적) key : value 로 구성

## 개선해야할 사항

- 가입 -> 로그인 id 전달
- 초기 입력 data 없을 시 Rank.js에서 자료 가져올때 // 데이터 loading시 페이지 작성
- UI 개선
- 로딩 페이지 작성
- 랭크에서 피커 변경시 refetch 문제
