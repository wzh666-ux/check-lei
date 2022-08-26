import React from 'react'
import './chessboard.less'

// 外部UI库
import { Modal } from "antd";
// 触发模块
import TouchBox from "../touchbox/touchbox";
// 游戏信息面板
import Soceboard from "../soceboard/soceboard";


class Chessboard extends React.Component<any, any>{
    private readonly chessboard: React.RefObject<HTMLDivElement>;

    constructor(props: any) {
        super(props);
        this.chessboard = React.createRef();
        this.state = {
            layout:[],
            leiData:[],
            topBorder:0,
            leftBorder:0
        };
    }

    // 地雷随机生成位置函数
    randomNum(maxNum: number): number{
        return Math.floor(Math.random()*(maxNum+1))
    }

    // 地雷周围数字提示函数
    tranAddLeiNumber(arr: any, x: string | number, y: string | number){
        // @ts-ignore
        if(x >= 0 && x < (this.chessboard.current.clientHeight / 35) && y >= 0 && y < (this.chessboard.current.clientWidth / 35)){
            if(arr[x][y].context != "#"){
                arr[x][y].context += 1
            }
        }
    }
    // 检查触发模块周围
    checkAround(arr: any, x: string | number, y: string | number){
        // @ts-ignore
        if(x >= 0 && x < (this.chessboard.current.clientHeight / 35) && y >= 0 && y < (this.chessboard.current.clientWidth / 35)){
            if(!arr[x][y].flag){
                arr[x][y].coverOpt = 0
            }
            return arr[x][y].context
        }else {
            return null;
        }
    }

    // 游戏失败弹窗
    errorModal(){
        Modal.error({
            title: '游戏结束',
            content: `扫雷失败！！！，用时${Soceboard.useTime}秒。`,
            okText:'重新开始',
            onOk:()=>{
                location.reload();
            }
        });
    };

    // 游戏成功弹窗
    successModal(){
        Modal.success({
            title: '游戏结束',
            content: `扫雷成功！！！，用时${Soceboard.useTime}秒。`,
            okText:'重开一局',
            onOk:()=>{
                location.reload();
            }
        })
    }

    // 初始化游戏
    initGame(){
        console.log('游戏全局配置',this.props)
        let layoutArr: any[] = []
        let topGap: number = 0
        let leftGap: number = 0
        // 初始化游戏棋盘
        // @ts-ignore
        for (let i = 0; i < (this.chessboard.current.clientHeight / 35); i++) {
            layoutArr.push([])
            // @ts-ignore
            for (let j = 0; j < (this.chessboard.current.clientWidth / 35); j++) {
                // todo 这里要记得吧遮罩改回来
                layoutArr[i].push({
                    context: 0,
                    coverOpt: 1,
                    flag: false,
                    coverBackColor: '#e1e1e1'
                })
            }
        }

        // 按游戏配置的地雷密度生成地雷
        for (let i = 0; i < this.props.leiNumbers; i++) {
            // @ts-ignore
            let x = this.randomNum(this.chessboard.current.clientHeight / 35 - 1)
            // @ts-ignore
            let y = this.randomNum(this.chessboard.current.clientWidth / 35 - 1)
            layoutArr[x][y].context = "#"
        }

        // 添加地雷周围数字提示
        // @ts-ignore
        for (let i = 0; i < (this.chessboard.current.clientHeight / 35); i++) {
            // @ts-ignore
            for (let j = 0; j < (this.chessboard.current.clientWidth / 35); j++) {
                if(layoutArr[i][j].context == "#"){
                    this.tranAddLeiNumber(layoutArr,i-1,j);
                    this.tranAddLeiNumber(layoutArr,i-1,j-1);
                    this.tranAddLeiNumber(layoutArr,i-1,j+1);
                    this.tranAddLeiNumber(layoutArr,i,j-1);
                    this.tranAddLeiNumber(layoutArr,i,j+1);
                    this.tranAddLeiNumber(layoutArr,i+1,j);
                    this.tranAddLeiNumber(layoutArr,i+1,j-1);
                    this.tranAddLeiNumber(layoutArr,i+1,j+1);
                }
            }
        }

        // @ts-ignore
        topGap = (this.chessboard.current.clientHeight - parseInt(this.chessboard.current.clientHeight / 35)  * 34) / 2
        // @ts-ignore
        leftGap = (this.chessboard.current.clientWidth - parseInt(this.chessboard.current.clientWidth / 34) * 34) / 2

        this.setState({
            layout: layoutArr,
            topBorder: topGap,
            leftBorder: leftGap
        })
    }

    // 自动递归开荒
    autoOpen(layoutArr: any, i: number, j: number){
        // @ts-ignore
        if(i - 1 >= 0 && i - 1 < (this.chessboard.current.clientHeight / 35) && j >= 0 && j < (this.chessboard.current.clientWidth / 35)) {
            if (layoutArr[i - 1][j].coverOpt == 1) {
                if (this.checkAround(layoutArr, i - 1, j) == 0 && !layoutArr[i - 1][j].flag) {
                    this.autoOpen(layoutArr, i - 1, j)
                }
            }
        }
        // @ts-ignore
        if(i - 1 >= 0 && i - 1 < (this.chessboard.current.clientHeight / 35) && j - 1 >= 0 && j - 1 < (this.chessboard.current.clientWidth / 35)) {
            if (layoutArr[i - 1][j - 1].coverOpt == 1) {
                if (this.checkAround(layoutArr, i - 1, j - 1) == 0 && !layoutArr[i - 1][j - 1].flag) {
                    this.autoOpen(layoutArr, i - 1, j - 1)
                }
            }
        }
        // @ts-ignore
        if(i - 1 >= 0 && i - 1 < (this.chessboard.current.clientHeight / 35) && j + 1 >= 0 && j + 1 < (this.chessboard.current.clientWidth / 35)) {
            if (layoutArr[i - 1][j + 1].coverOpt == 1) {
                if (this.checkAround(layoutArr, i - 1, j + 1) == 0 && !layoutArr[i - 1][j + 1].flag) {
                    this.autoOpen(layoutArr, i - 1, j + 1)
                }
            }
        }
        // @ts-ignore
        if(i >= 0 && i < (this.chessboard.current.clientHeight / 35) && j - 1 >= 0 && j - 1 < (this.chessboard.current.clientWidth / 35)) {
            if (layoutArr[i][j - 1].coverOpt == 1) {
                if (this.checkAround(layoutArr, i, j - 1) == 0 && !layoutArr[i][j - 1].flag) {
                    this.autoOpen(layoutArr, i, j - 1)
                }
            }
        }
        // @ts-ignore
        if(i >= 0 && i < (this.chessboard.current.clientHeight / 35) && j + 1 >= 0 && j + 1 < (this.chessboard.current.clientWidth / 35)) {
            if (layoutArr[i][j + 1].coverOpt == 1) {
                if (this.checkAround(layoutArr, i, j + 1) == 0 && !layoutArr[i][j + 1].flag) {
                    this.autoOpen(layoutArr, i, j + 1)
                }
            }
        }
        // @ts-ignore
        if(i + 1 >= 0 && i + 1 < (this.chessboard.current.clientHeight / 35) && j >= 0 && j < (this.chessboard.current.clientWidth / 35)) {
            if (layoutArr[i + 1][j].coverOpt == 1) {
                if (this.checkAround(layoutArr, i + 1, j) == 0 && !layoutArr[i + 1][j].flag) {
                    this.autoOpen(layoutArr, i + 1, j)
                }
            }
        }
        // @ts-ignore
        if(i + 1 >= 0 && i + 1 < (this.chessboard.current.clientHeight / 35) && j - 1 >= 0 && j - 1 < (this.chessboard.current.clientWidth / 35)) {
            if (layoutArr[i + 1][j - 1].coverOpt == 1) {
                if (this.checkAround(layoutArr, i + 1, j - 1) == 0 && !layoutArr[i + 1][j - 1].flag) {
                    this.autoOpen(layoutArr, i + 1, j - 1)
                }
            }
        }
        // @ts-ignore
        if(i + 1 >= 0 && i + 1 < (this.chessboard.current.clientHeight / 35) && j + 1 >= 0 && j + 1 < (this.chessboard.current.clientWidth / 35)) {
            if (layoutArr[i + 1][j + 1].coverOpt == 1) {
                if (this.checkAround(layoutArr, i + 1, j + 1) == 0 && !layoutArr[i + 1][j + 1].flag) {
                    this.autoOpen(layoutArr, i + 1, j + 1)
                }
            }
        }
    }

    // 点击了鼠标左键
    clickMoseLeft(item: any,row: number,col: number){
        // @ts-ignore
        if(row >= 0 && row < (this.chessboard.current.clientHeight / 35) && col >= 0 && col < (this.chessboard.current.clientWidth / 35)) {
            if (!item.flag && item.coverOpt != 0) {
                let layoutArr = this.state.layout;
                let i = row;
                let j = col;
                if (item.context == 0) {
                    this.autoOpen(layoutArr, i, j);
                    this.checkAround(layoutArr, i, j)
                    this.forceUpdate();
                } else {
                    this.setState((state: any) => {
                        state.layout[row][col].coverOpt = 0
                    })
                    this.forceUpdate();
                }

                if (item.context == '#') {
                    this.errorModal()
                    clearInterval(Soceboard.time)
                }
            }
        }
    }

    // 辅助扫雷函数
    helpCheckLei(layoutArr: any,x: number,y: number): number{
        let flagNumber: number = 0;
        // @ts-ignore
        if(x >= 0 && x < (this.chessboard.current.clientHeight / 35) && y >= 0 && y < (this.chessboard.current.clientWidth / 35)) {
            if(!layoutArr[x][y].flag){
                layoutArr[x][y].coverBackColor = '#34a5af'
                setTimeout(()=>{
                    layoutArr[x][y].coverBackColor = '#e1e1e1'
                    this.forceUpdate()
                },150)
                this.forceUpdate()
            }else {
                flagNumber++
            }
        }
        return flagNumber
    }

    // 点击了鼠标中键
    clickMoseMiddle(item: any,row: number,col: number){
        console.log("您点击了鼠标中键！",item,row,col);
        let layoutArr = this.state.layout
        let i = row
        let j = col
        let flagNumber: number = 0;
        flagNumber += this.helpCheckLei(layoutArr,i-1,j);
        flagNumber += this.helpCheckLei(layoutArr,i-1,j-1);
        flagNumber += this.helpCheckLei(layoutArr,i-1,j+1);
        flagNumber += this.helpCheckLei(layoutArr,i,j-1);
        flagNumber += this.helpCheckLei(layoutArr,i,j+1);
        flagNumber += this.helpCheckLei(layoutArr,i+1,j);
        flagNumber += this.helpCheckLei(layoutArr,i+1,j-1);
        flagNumber += this.helpCheckLei(layoutArr,i+1,j+1);
        this.helpCheckLei(layoutArr,i,j)
        if(item.context != '#' && flagNumber > 0 && flagNumber >= item.context){
            // @ts-ignore
            if(i - 1 >= 0 && i - 1 < (this.chessboard.current.clientHeight / 35) && j >= 0 && j < (this.chessboard.current.clientWidth / 35)) {
                this.clickMoseLeft(layoutArr[i-1][j],i-1,j);
            }
            // @ts-ignore
            if(i - 1 >= 0 && i - 1 < (this.chessboard.current.clientHeight / 35) && j - 1 >= 0 && j - 1 < (this.chessboard.current.clientWidth / 35)) {
                this.clickMoseLeft(layoutArr[i-1][j-1],i-1,j-1);
            }
            // @ts-ignore
            if(i - 1 >= 0 && i - 1 < (this.chessboard.current.clientHeight / 35) && j + 1 >= 0 && j + 1 < (this.chessboard.current.clientWidth / 35)) {
                this.clickMoseLeft(layoutArr[i-1][j+1],i-1,j+1);
            }
            // @ts-ignore
            if(i >= 0 && i < (this.chessboard.current.clientHeight / 35) && j - 1 >= 0 && j - 1 < (this.chessboard.current.clientWidth / 35)) {
                this.clickMoseLeft(layoutArr[i][j-1],i,j-1);
            }
            // @ts-ignore
            if(i >= 0 && i < (this.chessboard.current.clientHeight / 35) && j + 1 >= 0 && j + 1 < (this.chessboard.current.clientWidth / 35)) {
                this.clickMoseLeft(layoutArr[i][j+1],i,j+1);
            }
            // @ts-ignore
            if(i + 1 >= 0 && i + 1 < (this.chessboard.current.clientHeight / 35) && j >= 0 && j < (this.chessboard.current.clientWidth / 35)) {
                this.clickMoseLeft(layoutArr[i+1][j],i+1,j);
            }
            // @ts-ignore
            if(i + 1 >= 0 && i + 1 < (this.chessboard.current.clientHeight / 35) && j - 1 >= 0 && j - 1 < (this.chessboard.current.clientWidth / 35)) {
                this.clickMoseLeft(layoutArr[i+1][j-1],i+1,j-1);
            }
            // @ts-ignore
            if(i + 1 >= 0 && i + 1 < (this.chessboard.current.clientHeight / 35) && j + 1 >= 0 && j + 1 < (this.chessboard.current.clientWidth / 35)) {
                this.clickMoseLeft(layoutArr[i+1][j+1],i+1,j+1);
            }
        }
    }

    componentDidMount() {
        this.initGame();
    }


    render() {
        return (
            <div className='chessboard' ref={this.chessboard}>
                {this.state.layout.map((item: any, index: number)=>{
                    return item.map((item1: any, index1: React.Key | any)=>{
                        return <TouchBox
                            key={index1}
                            // @ts-ignore
                            style={{top:`calc(${index*34}px + ${this.state.topBorder}px)`,left:`calc(${index1*34}px + ${this.state.leftBorder}px)`}}
                            isHealthBox={item1.context !== '#'}
                            haveLei={item1.context}
                            coverStyle={{opacity:item1.coverOpt,backgroundColor:item1.coverBackColor}}
                            coverFlag={item1.flag}
                            onMouseDown={(e: MouseEvent)=>{
                                e.preventDefault();
                                let btnNum = e.button;
                                if(btnNum==0){
                                    this.clickMoseLeft(item1, index, index1);
                                }else if(btnNum==1){
                                    this.clickMoseMiddle(item1, index, index1);
                                }else if(btnNum==2){
                                    if(item1.coverOpt == 1){
                                        this.setState((state: any)=>{
                                            state.layout[index][index1].flag = !state.layout[index][index1].flag
                                        },()=>{
                                            let flags: number = 0;
                                            let leis: number = 0;
                                            let arr: any[] = [];
                                            let haveLei: number = 0;
                                            this.state.layout.map((item: any)=>{
                                                flags += item.map((item: any)=>item.flag).filter((item: any)=>item == true).length
                                                leis += item.map((item: any)=>item.context).filter((item: any)=>item == '#').length
                                                arr.push(item.filter((item: any)=>item.context == '#'))
                                            })
                                            haveLei = leis
                                            arr.map((item: any)=>{
                                                item.map((item: any)=>{
                                                    if(item.flag){
                                                        haveLei--
                                                    }
                                                })
                                            })
                                            Soceboard.leiReallyNum = leis
                                            Soceboard.bjNum = flags
                                            if(haveLei == 0){
                                                this.successModal()
                                            }
                                        })
                                        this.forceUpdate();
                                    }
                                }
                            }}
                        />
                    })
                })}
            </div>
        );
    }
}

export default Chessboard;