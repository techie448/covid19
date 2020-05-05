import React from 'react';
import Info from "./info";
import {ReactComponent as Bat} from "./bat.svg";

function Header({count}) {
    return (
        <header>
            <a href="https://github.com/techie448/covid19" className='icon'>

            </a>
            <div className='heading'>
                <Bat className="bat"/>
                COVID-19 Dashboard
                <blockquote>
                    When something bad happens you have three choices. You can either let it define you, let it destroy
                    you, or you can let it <strong>strengthen</strong> you.
                </blockquote>
                <figcaption>
                    &mdash; Dr. Seuss
                </figcaption>
            </div>
            <Info count={count}/>

        </header>
    );
}

export default Header;