import React from "react";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const drawRow = (
  x,
  i,
  header,
) => {
  return (
    <tr key={`tr-${i}`}>
      {header.map((y, k) => (
        <td key={`trc-${k}`}>
          {y.prop === "active" ? (
            x[y.prop] === "Active" ? (
              <FontAwesomeIcon className="Active" icon={faCircle} />
            ) : (
               <FontAwesomeIcon className="Inactive" icon={faCircle} />
              )
          ) : (
              null
            )}
          {x[y.prop]}
        </td>
      ))}
    </tr>
  );
};

export default ({
  data,
  header,
  handleSort,
  sortDirection,
  columnToSort
}) => (

    <table className="responsive-table" id='campaigns'>
      <thead>
        <tr>
        {header.map((x, i) => (
          <th key={`thc-${i}`}>
            <div onClick={() => handleSort(x.prop)}>
              <span>{x.name }</span>
              {columnToSort === x.prop ? (
                sortDirection === "asc" ? (
                  
                  <FontAwesomeIcon className="space" icon={faCaretUp} />
                ) : (
                  <FontAwesomeIcon className="space" icon={faCaretDown} />
                  )
              ) : <FontAwesomeIcon className="transperant space" icon={faCaretDown} />}
            </div>
          </th>
        ))}
        </tr>
      </thead>
      <tbody>
        {data.map((x, i) =>
          drawRow(
            x,
            i,
            header,
          )
        )}
      </tbody>
    </table>
);
