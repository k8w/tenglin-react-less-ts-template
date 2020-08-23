import React from 'react';
import { Link } from 'react-router-dom';
import './OtherView.less';

export interface OtherViewProps extends React.Props<any> {
    match: {
        params: {
            name: string
        }
    }
}

export interface OtherViewState {

}

export default class OtherView extends React.Component<OtherViewProps, OtherViewState>{

    state: OtherViewState = {

    };

    render() {
        return <div className='OtherView'>
            <h1>This is Other View</h1>
            <p>你的名字是 {this.props.match.params.name}</p>
            <Link to='/home'>跳到HomeView</Link>
        </div>
    }
}