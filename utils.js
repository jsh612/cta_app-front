import { useMeChecker } from "./AuthContext";

// 입력 기본정보 출력 (순환, 회차, 학원)
export const basicInfo = () => {
  const roundArr = [
    { label: "동차GS", value: 1 },
    { label: "2순환", value: 2 },
    { label: "3순환", value: 3 }
  ];

  const episodeArr = [
    { label: "1회", value: 1 },
    { label: "2회", value: 2 },
    { label: "3회", value: 3 },
    { label: "4회", value: 4 },
    { label: "5회", value: 5 },
    { label: "6회", value: 6 },
    { label: "7회", value: 7 },
    { label: "8회", value: 8 },
    { label: "9회", value: 9 },
    { label: "10회", value: 10 },
    { label: "11회", value: 11 },
    { label: "12회", value: 12 }
  ];

  const academyArr = [
    { label: "우리", value: "우리" },
    { label: "나무", value: "나무" },
    { label: "위너스", value: "위너스" }
  ];

  return { roundArr, episodeArr, academyArr };
};

//data를 활용하여 순위 표시에 필요한 배열 생성
export const makeRankList = data => {
  const accsScoreArr = [];
  const accsRankArr = [];
  const taxAccsScoreArr = [];
  const taxAccsRankArr = [];
  const totalScoreArr = [];
  const totalRankArr = [];

  if (data && data.seeRound) {
    const {
      seeRound: { accs, taxAccs, totalAccs }
    } = data;
    const longestLength =
      accs.length > taxAccs.length ? accs.length : taxAccs.length;

    for (let i = 0; i < longestLength; i++) {
      if (accs[i]) {
        accsScoreArr.push(accs[i].score);
        accsRankArr.push(accs[i].rank);
      } else {
        accsScoreArr.push("-");
        accsRankArr.push("-");
      }
      if (taxAccs[i]) {
        taxAccsScoreArr.push(taxAccs[i].score);
        taxAccsRankArr.push(taxAccs[i].rank);
      } else {
        taxAccsScoreArr.push("-");
        taxAccsRankArr.push("-");
      }
      if (totalAccs[i]) {
        totalScoreArr.push(totalAccs[i].score);
        totalRankArr.push(totalAccs[i].rank);
      } else {
        totalScoreArr.push("-");
        totalRankArr.push("-");
      }
    }
  }
  return {
    accsScoreArr,
    accsRankArr,
    taxAccsScoreArr,
    taxAccsRankArr,
    totalScoreArr,
    totalRankArr
  };
};

//배열을 오름차순 또는 내림차순으로 정렬
export const sortFunc = (arr, bigger = true) => {
  return bigger ? arr.sort((a, b) => a - b) : arr.sort((a, b) => b - a);
};

//각 성적의 평균 계산 함수
export const average = arr => {
  let sum = 0;
  let leng = arr.length;
  arr.forEach(v => {
    if (typeof v === "number") {
      sum = sum + v;
    } else {
      leng = leng - 1;
    }
  });
  return sum / leng;
};
