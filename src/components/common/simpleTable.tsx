import React from "react";
import {Table, Paper} from "@material-ui/core";
import {tableStyles} from "styles/table";

interface PropsSimpleTable {
    columns: any,
    rows: any
}

const SimpleTable: React.FC<any> = (props: PropsSimpleTable) => {
    const classes = tableStyles();

    return (
        <Paper className={classes.root}>
            <Table className={classes.table} aria-label="simple table">
                    {props.columns}
                    {props.rows}
            </Table>
        </Paper>
    )
};

export default SimpleTable;
