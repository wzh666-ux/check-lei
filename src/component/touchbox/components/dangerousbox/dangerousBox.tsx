import React from "react";
import '../common.less';

// 外部图标库
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBiohazard } from '@fortawesome/free-solid-svg-icons'

class DangerousBox extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className='touch-box'>
                <FontAwesomeIcon size='xs' icon={faBiohazard} color='#000'/>
            </div>
        );
    }
}

export default DangerousBox;