import React from 'react';

export const GroupBtnTodo = ( {data, className} ) => (
    <div className={className}>
      {data.map((btn, i) => <i className="material-icons" onClick={() => btn.onClick()} key={i}> {btn.text} </i>)}
    </div>
);

