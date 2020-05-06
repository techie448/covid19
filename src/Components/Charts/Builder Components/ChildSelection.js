import React from 'react';

function ChildSelection({types, btnClick, selected}) {


    return (
        <div className='buttons'>
            {types.map((val, index) => (
                    <button key={index} onClick={btnClick} value={val} className={
                        (selected === val) ? (
                            (val === 'confirmed') ? 'blueBtn' : (val === 'deaths') ? 'redBtn' : (val === 'recovered') ? 'greenBtn' : ''
                        ) : ''

                    }>{val}</button>
                )
            )}
        </div>
    );
}

export default ChildSelection;