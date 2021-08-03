import React from 'react'

const ListGroup = (props) =>{
    const { items, onItemSelect, selectedItem } = props;
  
    return (
        <div>
    <ul className="list-group">
        {items.map((item) => {
            return (
                <React.Fragment>
                    <li onClick={() => onItemSelect(item)}
                        key={item}
                        className={ (selectedItem === item)? "list-group-item active" :"list-group-item" }>
                        {item}
                    </li>
                </React.Fragment>

            );
            })}
        
  
</ul>
            <ul className="list-group">
            </ul>
        </div>
    );

}
export default ListGroup;