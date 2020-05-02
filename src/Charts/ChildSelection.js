import React from 'react';

function ChildSelection({types, btnClick}) {
    return (
        <div>
            {types.map((val, index) => (
                    <button key={index} onClick={btnClick} value={val}>{val}</button>
                )
            )}
        </div>
    );
}

export default ChildSelection;