import React from 'react';
import './Loading.less';

export interface LoadingProps extends React.Props<any> {

}

export interface LoadingState {

}

export default class Loading extends React.Component<LoadingProps, LoadingState>{
    render() {
        return <div className='Loading'>加载中</div>;
    }
}