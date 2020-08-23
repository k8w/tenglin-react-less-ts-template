import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Global } from '../models/Global';
import loadable from "@loadable/component";
import Loading from './Loading/Loading';

export interface LazyRouteLoaderProps extends React.Props<any> {
    routes: {
        path: string,
        load: () => any
    }[];
}

export interface LazyRouteLoaderState {
    hasError: boolean;
}

export class LazyRouteLoader extends React.Component<LazyRouteLoaderProps, LazyRouteLoaderState>{

    state = {
        hasError: false
    }

    private _historyUnlisten?: () => void;
    componentDidMount() {
        this._historyUnlisten = Global.history.listen(() => {
            this.setState({ hasError: false })
        })
    }

    componentWillUnmount() {
        if (this._historyUnlisten) {
            this._historyUnlisten();
            this._historyUnlisten = undefined;
        }
    }

    render() {
        if (this.state.hasError) {
            return <Failed onRetry={this.retry} />
        }

        return (
            <Suspense fallback={<Loading />}>
                <Switch>
                    {this.props.routes.map((v, i) => <Route path={v.path} key={i} component={loadable(v.load, {
                        fallback: <Loading />
                    })}></Route>)}
                </Switch>
            </Suspense>
        )
    }

    componentDidCatch(error: Error, errInfo: any) {
        this.setState({
            hasError: true
        })
    }

    retry = () => {
        this.setState({ hasError: false })
    }

}

const Failed = (props: { onRetry: () => void }) => (
    <div id='fail-404'>网络开小差了, <a onClick={props.onRetry}>重试</a></div>
)