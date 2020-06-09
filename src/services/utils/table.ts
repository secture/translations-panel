export type OrderTableType = 'asc' | 'desc';

export class TableUtils {

    constructor() {
    }

    desc<T>(a: T, b: T, orderBy: keyof T) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    getSorting<K extends keyof any>(order: OrderTableType, orderBy: K,): (a: { [key in K]: number | string }, b: { [key in K]: number | string }) => number {
        return order === 'desc' ? (a, b) => this.desc(a, b, orderBy) : (a, b) => -this.desc(a, b, orderBy);
    }

    stableSort(array: any[], cmp: (a: any, b: any) => number) {
        const stabilizedThis = array.map((el, index) => [el, index] as [any, number]);
        stabilizedThis.sort((a, b) => {
            const order = cmp(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map(el => el[0]);
    }

}
