import classes from "./TableThi.module.css"

const TableThi = ({dateThi}) => {

  const getNewDate = (inputDate, nbOfDays) => {
    const date = new Date(inputDate);
    const result = new Date();
    result.setDate(date.getDate() + nbOfDays);
    return `${result.getDate()}/${result.getMonth() + 1}/${result
      .getFullYear()
      .toString()
      .slice(2, 4)}`;
  };

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
              <div className={`${classes.A} ${classes.round}`}>39</div>
            </td>
            <td>
              <div className={`${classes.B} ${classes.round}`}>39</div>
            </td>
            <td>
              <div className={`${classes.A} ${classes.round}`}>39</div>
            </td>
            <td>
              <div className={` ${classes.C} ${classes.round}`}>39</div>
            </td>
            <td>
              <div className={`${classes.B} ${classes.round}`}>39</div>
            </td>
            <td className={classes.selected} >
              <div className={`${classes.D} ${classes.round}`}>39</div>
            </td>
            <td>
              <div className={`${classes.E} ${classes.round}`}>39</div>
            </td>
            <td>
              <div className={`${classes.E} ${classes.round}`}>39</div>
            </td>
            <td >
              <div className={`${classes.F} ${classes.round}`}>39</div>
            </td>
            <td>
              <div className={`${classes.D} ${classes.round}`}>39</div>
            </td>
            <td>
              <div className={`${classes.C} ${classes.round}`}>39</div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default TableThi
