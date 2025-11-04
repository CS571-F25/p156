import { Link } from "react-router";

function NoMatch() {
    return (
        <div className="p-5">
            <h2>404</h2>
            <p>The page you requested was not found on the server</p>
            <p>
                <Link to="/">Go Home</Link>
            </p>
        </div>
    );
}

export default NoMatch;
