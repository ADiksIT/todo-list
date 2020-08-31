import React from 'react';
import {useSelector} from 'react-redux';
import {Item} from './Item';
import {Droppable} from 'react-beautiful-dnd';
import {useTranslation} from "react-i18next";

export const List = () => {
  const list = useSelector((state) => state.list);
  const {t} = useTranslation('common');

  return (
      <Droppable droppableId={Date.now().toString()}>
        {(provided) => (
            <ul
                className="collection with-header"
                {...provided.droppableProps}
                ref={provided.innerRef}
            >
              {list?.length ? (
                  list.map((todo, i) => <Item index={i} todo={todo} key={todo?.id || i}/>)
              ) : (
                  <h5>{t('list.clear_list')}</h5>
              )}
              {provided.placeholder}
            </ul>
        )}
      </Droppable>
  );
};
