import { createBrowserHistory, createHashHistory } from 'history';

export class Global {

    // 全局 History
    static history = createHashHistory();
    static get query(): { [key: string]: string | undefined } {
        let search = new URLSearchParams(this.history.location.search);
        let output: { [key: string]: string | undefined } = {};
        search.forEach((v, k) => {
            output[k] = v;
        })
        return output;
    }
    static get href(): string {
        return this.history.createHref(this.history.location);
    }

}