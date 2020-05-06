import React from 'react';
import {ReactComponent as Love} from "./SVG/loving.svg";
import {ReactComponent as ReactLogo} from "./SVG/react.svg";
import {ReactComponent as D3Logo} from "./SVG/d3.svg";

function Footer(props) {
    return (
        <footer>
            <div className={'intro'}>Crafted with <Love/> using <a href='https://reactjs.org/'
                                                                   title={'React'}><ReactLogo/></a> & <a
                href={'https://d3js.org/'} title={'D3'}><D3Logo/></a> by Rishabh Kharbanda
            </div>
            <div className={'data'}>Data Source :
                <a href={'https://github.com/CSSEGISandData/COVID-19'}> CSSE at JHU</a> | API :
                <a href={'https://github.com/pomber/covid19'}> Rodrigo Pombo</a>
            </div>
        </footer>
    )
}

export default Footer;