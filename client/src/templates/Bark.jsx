import { Link } from 'react-router-dom';
import { Paper } from '@material-ui/core';

function Bark({ object, children }) {
    const { _id, title, body } = object;

    const postStyle = {
    };

    const linkStyle = {
    };

    return (
        <Paper style={postStyle}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h1>{title}</h1>
                {children}
            </div>
            <p>{body}</p>
        </Paper>
    );
    /*
  return (
        <Paper style={postStyle}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Link to={`/${_id}`} style={linkStyle}>
                    <h1>{title}</h1>
                </Link>
                {children}
            </div>
            <p>{body}</p>
        </Paper>
    );
    */
}

export default Bark;