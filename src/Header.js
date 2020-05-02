import React from 'react';
import Info from "./info";

function Header({count}) {
    return (
        <header>
            <a href="https://github.com/techie448/covid19"></a>
            <span>COVID-19 Dashboard</span>
            <Info count={count}/>

        </header>
    );
}

export default Header;