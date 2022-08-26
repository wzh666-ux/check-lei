import React from "react";
import '../common.less';
import './flagbox.less';

// 外部图标库
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag } from '@fortawesome/free-solid-svg-icons'

class FlagBox extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className='touch-box flag-box'>
                <FontAwesomeIcon icon={faFlag} color='#FC5531' size='xs'/>
            </div>
        );
    }
}

export default FlagBox;