import React from "react";
import styled from "styled-components";
import { Row } from "react-native-table-component";
import { useQuery } from "@apollo/react-hooks";
import { ME } from "../queries/AuthQueries";

export default ({ academy, round, episode, borderStyle, style, textStyle }) => {
  const { data, refetch, loading } = useQuery(ME);

  if (data) {
    refetch();
  }
  const accResult = !loading
    ? data.me.accs.find(acc => {
        return (
          acc.academy === academy &&
          acc.round === round &&
          acc.episode === episode
        );
      })
    : null;
  const taxAccResult = !loading
    ? data.me.taxAccs.find(taxAcc => {
        return (
          taxAcc.academy === academy &&
          taxAcc.round === round &&
          taxAcc.episode === episode
        );
      })
    : null;
  const totalAccResult = !loading
    ? data.me.totalAccs.find(totalAcc => {
        return (
          totalAcc.academy === academy &&
          totalAcc.round === round &&
          totalAcc.episode === episode
        );
      })
    : null;
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
