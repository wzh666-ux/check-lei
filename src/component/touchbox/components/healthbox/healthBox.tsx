import React from "react";
import '../common.less';

// 外部图标库
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fa1, fa2, fa3, fa4, fa5, fa6, fa7, fa8 } from '@fortawesome/free-solid-svg-icons'


class HealthBox extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            number: [
                fa1, fa2, fa3, fa4, fa5, fa6, fa7, fa8
            ],
            colors: [
                "#0000FE",
                "#008001",
                "#FE0000",
                "#010080",
                "#800000",
                "#008080",
                "#000000",
                "#808080"
            ],
            leiNumber: 0
        }
    }

    componentDidMount() {
        if(this.props.haveLei - 1 < 0){
            this.setState({leiNumber: 0})
        }else {
            this.setState({leiNumber: this.props.haveLei - 1})
        }
    }

    render() {
        return (
            <div className="touch-box">
                {this.props.haveLei != 0 && (
                    <>
                        {this.state.colors.map((item: any, index: number)=>{
                            if(index == this.props.haveLei - 1){
                                return <FontAwesomeIcon size='xs' key={index} icon={this.state.number[this.state.leiNumber]} color={item}/>
                            }
                        })}
                    </>
                )}
            </div>
        );
    }
}

export default HealthBox;