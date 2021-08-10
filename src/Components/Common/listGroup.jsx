import React from 'react'

const ListGroup = (props) => {
    const { items, onItemSelect, selectedItem } = props;
    const length = items.length;
    return (
        <div>
            <ul className="list-group">
                {items.map((item) => {
                    return (
                        <React.Fragment>
                            <li onClick={() => onItemSelect(item['jobtype'])}
                                key={item['_id']}
                                className={(selectedItem === item['jobtype']) ? "list-group-item active" : "list-group-item"}>
                                {item['jobtype']}
                            </li>
                        </React.Fragment>

                    );
                }


                )}

                {length > 12 &&
                    <React.Fragment>
                        <li className="list-group-item" >See all</li>
                    </React.Fragment>}


            </ul>
            <ul className="list-group">
            </ul>
        </div>
    );

}
export default ListGroup;