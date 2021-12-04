import classes from "./TableThi.module.css"
import { useEffect } from "react";

const TableThi = ({historical_thi, future_thi, dateThi, loading}) => {

  const getNewDate = (inputDate, nbOfDays) => {
    console.log("input date ", inputDate)
    let date = new Date(inputDate);
    date.setDate(date.getDate() + nbOfDays)

    return `${date.getDate()}/${date.getMonth() + 1}/${date
      .getFullYear()
      .toString()
      .slice(2, 4)}`;
  };

  // useEffect(()=>{

  // },[dateThi])

  const getRanking = (thi) =>{
    if(thi<=68){
      return 'round A'
    }
    if(thi>68 && thi <= 72){
      return 'round B'
    }
    if(thi>72 && thi <= 78){
      return 'round C'
    }
    if(thi > 78){
      return 'round D'
    }
  }


  return (
    <>
      <p>Voici le THI centré sur le {dateThi} :</p>
      <table>
        <thead>
          <tr>
            <th>{getNewDate(dateThi, -5)}</th>
            <th>{getNewDate(dateThi, -4)}</th>
            <th>{getNewDate(dateThi, -3)}</th>
            <th>{getNewDate(dateThi, -2)}</th>
            <th>{getNewDate(dateThi, -1)}</th>
            <th className={classes.selected} >{getNewDate(dateThi, 0)}</th>
            <th>{getNewDate(dateThi, 1)}</th>
            <th>{getNewDate(dateThi, 2)}</th>
            <th>{getNewDate(dateThi, 3)}</th>
            <th>{getNewDate(dateThi, 4)}</th>
            <th>{getNewDate(dateThi, 5)}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
            <div className={historical_thi ? getRanking(historical_thi[0]):""}>{historical_thi && historical_thi[0]}</div>
            </td>
            <td>
              <div className={historical_thi ? getRanking(historical_thi[1]):""}>{historical_thi && historical_thi[1]}</div>
            </td>
            <td>
              <div className={historical_thi ? getRanking(historical_thi[2]):""}>{historical_thi && historical_thi[2]}</div>
            </td>
            <td>
              <div className={historical_thi ? getRanking(historical_thi[3]):""}>{historical_thi && historical_thi[3]}</div>
            </td>
            <td>
              <div className={historical_thi ? getRanking(historical_thi[4]):""}>{historical_thi && historical_thi[4]}</div>
            </td>
            <td className={classes.selected} >
              <div className={` ${classes.round}`}>XXXX</div>
            </td>
            <td>
              <div className={`${future_thi ? getRanking(future_thi[0]):""} ${classes.round}`}>{future_thi && future_thi[0]}</div>
            </td>
            <td>
              <div className={`${future_thi ? getRanking(future_thi[1]):""} ${classes.round}`}>{future_thi && future_thi[1]}</div>
            </td>
            <td >
              <div className={`${future_thi ? getRanking(future_thi[2]):""} ${classes.round}`}>{future_thi && future_thi[2]}</div>
            </td>
            <td>
              <div className={`${future_thi ? getRanking(future_thi[3]):""} ${classes.round}`}>{future_thi && future_thi[3]}</div>
            </td>
            <td>
              <div className={`${future_thi ? getRanking(future_thi[4]):""} ${classes.round}`}>{future_thi && future_thi[4]}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default TableThi
