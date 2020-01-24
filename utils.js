//# 성적 자료에서 점수만 뽑아내어 내림차순으로 정렬된 배열 return
export const makeScoreArr = arr => {
  const scoreArr = [];
  arr.forEach(ele => scoreArr.push(ele.score));
  return scoreArr.sort((a, b) => b - a);
};

//# 입력된 배열의 랭킹으로 이루어진 배열 return
export const makeRankArr = arr =>
  arr.slice().map(function(v) {
    return arr.indexOf(v) + 1;
  });
