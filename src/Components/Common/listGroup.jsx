import React from 'react';
import {Link} from 'react-router-dom'

const ListGroup = (props) => {
    const { items, onItemSelect, selectedItem } = props;
    const length = items.length;
    const sliceditems=items.slice(0,10)
    
    return (
        <div>

            <ul className="list-group" style={{"cursor": "pointer"}}>
                {sliceditems.map((item) => {
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
                        <li className="list-group-item" >
                            <Link to="/searchjobs?jobname=" >See all</Link>

                        </li>
                    </React.Fragment>}


            </ul>
            <ul className="list-group">
            </ul>
        </div>
    );

}
export default ListGroup;