import React, {FC} from "react";
import styles from "./DataTable.module.scss";

export type ColumnType = {
  header: string;
  render: (data: any, index: number) => any;
  width?: number;
  maxWidth?: number;
};

export type TableProps = {
  rows: any[];
  columns: ColumnType[];
};

export const DataTable: FC<TableProps> = ({rows, columns}) => {
  return (
    <div className={styles["data-table-wrapper"]}>
      <table className={styles["data-table"]}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} style={{minWidth: column.width, maxWidth: column.maxWidth}}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, index) => (
                <td key={index} style={{minWidth: column.width, maxWidth: column.maxWidth}}>
                  {column.render(row, rowIndex)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
