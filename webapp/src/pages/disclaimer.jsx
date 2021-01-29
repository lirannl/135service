// @ts-nocheck
import React from 'react';
import { Link } from 'react-router-dom';

export function Disclaimer(props){
    return <React.Fragment>
        <div className="pageContent">
            <p className="fullDetails"><b>Disclaimer:</b><br/>
            This Website represents a project done for fun and is not intended for any kind of commercial use or security use. We strive to keep our Website safe, secure, and functioning properly, but we cannot guarantee the continuous operation of or access to our Website. Furthermore, we may change the functionality of any part of our website at any time without notice.
You agree that you are making use of our Website at your own risk, and that the Website and its functionality is available for use on an “AS IS” and “AS AVAILABLE” basis. Accordingly, to the fullest extent permitted by applicable law, we accept no liability for any damages, direct, indirect or consequential, arising out of any kind of usage of or reliance upon this Website or the functionality contained within.</p>
        </div>
        <Link to="/">To homepage</Link>
    </React.Fragment>
}