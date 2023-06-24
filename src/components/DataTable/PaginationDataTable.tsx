import React, {FC, useRef, useState} from "react";
import styles from "./PaginationDataTable.module.scss";
import {DataTable, TableProps} from "./DataTable";
import {ChevDownIcon, ChevLefIcon, ChevRightIcon, FirstPageIcon, LastPageIcon} from "../Icons/Icons";
import {useOnClickOutside} from "../../hooks/use-onclick-outside";
import cn from "classnames";
import {Checkbox} from "../Checkbox/Checkbox";
import {useWindowSize} from "../../hooks/use-window-size";

export const PaginationDataTable: FC<TableProps> = ({rows, columns}) => {
  const [itemPerPage, setItemPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const {width} = useWindowSize();

  const isMobile = width < 1024;

  const filteredRows = rows.filter((_, index) => {
    const start = (page - 1) * itemPerPage;
    const end = page * itemPerPage;
    return index >= start && index < end;
  });

  return (
    <div className={styles["pagination-data-table"]}>
      <DataTable rows={filteredRows} columns={columns} />

      <div className={styles["pagination"]}>
        {!isMobile && (
          <div className={styles["left-section"]}>
            Show
            <ShowSelect
              list={[5, 10, 25, 50]}
              valueAs={(v) => `${v} rows`}
              value={itemPerPage}
              onChange={(v) => {
                setItemPerPage(v);
                if (v !== itemPerPage) {
                  setPage(1);
                }
              }}
            />
            <div className={styles["number-of-items"]}>
              {page * itemPerPage - (itemPerPage - 1)} - {Math.min(page * itemPerPage, rows.length)} of {rows.length}
            </div>
          </div>
        )}

        <div className={styles["right-section"]}>
          {!isMobile && (
            <button className={styles["action-btn"]} onClick={() => setPage(1)} disabled={page === 1}>
              <FirstPageIcon />
            </button>
          )}

          <button
            className={styles["action-btn"]}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            <ChevLefIcon />
          </button>

          {isMobile && (
            <div className={styles["select-page-mobile"]}>
              Page
              <ShowSelect
                className={styles["page-select"]}
                value={page}
                onChange={(v) => setPage(v)}
                list={new Array(Math.ceil(rows.length / itemPerPage)).fill(null).map((_, i) => i + 1)}
                valueAs={(v) => v}
              />
              of {Math.ceil(rows.length / itemPerPage)}
            </div>
          )}

          <button
            className={styles["action-btn"]}
            onClick={() => setPage((p) => Math.min(p + 1, Math.ceil(rows.length / itemPerPage)))}
            disabled={page + 1 > Math.ceil(rows.length / itemPerPage)}
          >
            <ChevRightIcon />
          </button>

          {!isMobile && (
            <button
              className={styles["action-btn"]}
              onClick={() => setPage(Math.ceil(rows.length / itemPerPage))}
              disabled={page === Math.ceil(rows.length / itemPerPage)}
            >
              <LastPageIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

type ShowSelectProps = {
  value: number;
  onChange: (v: number) => void;
  list: number[];
  valueAs: (v: number) => any;
  className?: string;
};

const ShowSelect: FC<ShowSelectProps> = ({value, onChange, list, valueAs, className}) => {
  const [open, setOpen] = useState(false);
  const elem = useRef(null);
  useOnClickOutside(elem, () => setOpen(false));

  return (
    <div className={cn(styles["show-select"], className)} ref={elem}>
      <div className={styles["select-value"]} onClick={() => setOpen(true)}>
        {valueAs(value)} <ChevDownIcon />
      </div>

      <div className={cn(styles["popup"], open && styles["open"])}>
        {list.map((item) => (
          <div
            className={styles["select-item"]}
            key={item}
            onClick={() => {
              onChange(item);
              setOpen(false);
            }}
          >
            {item}

            {item == value && <Checkbox className={styles["checkbox"]} value={true} onChange={() => {}} />}
          </div>
        ))}
      </div>
    </div>
  );
};
