export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined
        }
        return JSON.parse(atob(serializedState));
    } catch (err) {
        return undefined
    }
};

export const saveState = (state: any) => {
    try {
        const serializedStated = btoa(JSON.stringify(state));
        localStorage.setItem('state', serializedStated);
    } catch (err) {

    }
};
