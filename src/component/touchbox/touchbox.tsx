import React from "react";
import './touchbox.less';

// 地雷组件
import HealthBox from "./components/healthbox/healthBox";
import DangerousBox from "./components/dangerousbox/dangerousBox";
import FlagBox from "./components/flagbox/flagbox";

class TouchBox extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div
                style={this.props.style}
                onMouseDown={this.props.onMouseDown}
                onContextMenu={(e)=>{
                    e.preventDefault();
                }}
                className='torch-box'
            >
                <div className='cover-box' style={this.props.coverStyle}>
                    {this.props.coverFlag && (
                        <FlagBox/>
                    )}
                </div>
                {this.props.isHealthBox && (
                    <HealthBox haveLei={this.props.haveLei}/>
                )}
                {!this.props.isHealthBox && (
                    <DangerousBox/>
                )}
            </div>
        );
    }
}
export default TouchBox;