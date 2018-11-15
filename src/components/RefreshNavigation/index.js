import React from 'react';
import {Control, ReactComponent} from 'rc-bmap';
import icon from './refresh.svg';

class RefreshNavigation extends Control {
    render() {
        const {onRefresh} = this.props;
        return (
            <div>
                <button onClick={onRefresh}>
                    <img className="refresh-icon" src={icon} alt="刷新"/>
                </button>
            </div>
        );
    }
}

export default ReactComponent(RefreshNavigation);
