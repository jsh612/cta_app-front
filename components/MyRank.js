import React from "react";
import { Row } from "react-native-table-component";
import { useQuery } from "@apollo/react-hooks";
import { ME } from "../queries/AuthQueries";

export default ({
  academy,
  round,
  episode,
  year,
  borderStyle,
  style,
  textStyle
}) => {
  const { data, refetch, loading } = useQuery(ME, {
    fetchPolicy: "network-only"
  });
  if (data) {
    refetch();
  }
  const accResult = (!loading
    ? data.me.accs.find(acc => {
        return (
          acc.academy === academy &&
          acc.round === round &&
          acc.episode === episode &&
          acc.year === year
        );
      })
    : null) || { rank: "-", score: "-" };

  const taxAccResult = (!loading
    ? data.me.taxAccs.find(taxAcc => {
        return (
          taxAcc.academy === academy &&
          taxAcc.round === round &&
          taxAcc.episode === episode &&
          taxAcc.year === year
        );
      })
    : null) || { rank: "-", score: "-" };

  const totalAccResult = (!loading
    ? data.me.totalAccs.find(totalAcc => {
        return (
          totalAcc.academy === academy &&
          totalAcc.round === round &&
          totalAcc.episode === episode &&
          totalAcc.year === year
        );
      })
    : null) || { rank: "-", score: "-" };

  const dataArr = !loading
    ? [
        `(나)${accResult.rank}`,
        accResult.score,
        `(나)${taxAccResult.rank}`,
        taxAccResult.score,
        `(나)${totalAccResult.rank}`,
        totalAccResult.score
      ]
    : null;
  return data && data.me ? (
    <Row
      borderStyle={borderStyle}
      style={style}
      textStyle={textStyle}
      data={dataArr}
    />
  ) : null;
};
