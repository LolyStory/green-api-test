import { useCallback, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles.css";

export const LoginWindow = () => {
    const location = useLocation();

    const [idInstance, setIdInstance] = useState(
        location.state?.idInstance || ""
    );
    const [apiTokenInstance, setApiTokenInstance] = useState(
        location.state?.apiTokenInstance || ""
    );

    return (
        <div className="LoginWindow">
            <div className="LoginIdInstance">
                <div className="textDiv">Enter IdInstance: </div>
                <input
                    className="inputLogin"
                    type="text"
                    value={idInstance}
                    onChange={(event) => setIdInstance(event.target.value)}
                />
            </div>
            <div className="LoginApiTokenInstance">
                <div className="textDiv"> Enter ApiTokenInstance: </div>
                <input
                    className="inputLogin"
                    type="text"
                    value={apiTokenInstance}
                    onChange={(event) =>
                        setApiTokenInstance(event.target.value)
                    }
                />
            </div>
            <Link
                className="LoginButton"
                to="/chat"
                state={{ idInstance, apiTokenInstance }}
            >
                Login
            </Link>
        </div>
    );
};

// var request = require("request");
// var options = {
//     method: "GET",
//     url: "https://api.green-api.com/waInstance1101822772/getStateInstance/be271bbc0a894c9eb563345369c4845807c34fcc512d4d3a9a",
//     headers: {},
// };
// request(options, function (error, response) {
//     if (error) throw new Error(error);
//     console.log(response.body);
// });
