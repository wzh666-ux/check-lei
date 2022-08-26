import React from "react";
import './soceboard.less';

class Soceboard extends React.Component<any, any>{
    public static time: number | undefined;
    public static useTime: number;
    public static leiReallyNum: number = 0;
    public static bjNum: number = 0;
    constructor(props: any) {
        super(props);
        this.state = {
            count: 0
        }
    }

    componentDidMount() {
        let count = this.state.count;
        clearInterval(Soceboard.time)
        Soceboard.time = setInterval(()=>{
            count++;
            Soceboard.useTime = count;
            this.setState({count});
        },1000)
    }

    render() {
        return (
            <div className='soceboard'>
                游戏信息面板
                <div>
                    地雷密度：{this.props.leiNumbers}
                </div>
                <div>
                    地雷总数：{Soceboard.leiReallyNum}
                </div>
                <div>
                    已标记格数：{Soceboard.bjNum}
                </div>
                <div>
                    扫雷用时：{this.state.count}秒
                </div>
            </div>
        );
    }
}

export default Soceboard;
