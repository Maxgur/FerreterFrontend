import { Loginlm } from "../components/Login/Login";
import "./Login.css";

export function Loggin() {
    return (
        <>
            <div className="container">
                <div className="left-side"><Loginlm /></div>
                <div className="right-side"><Loginlm/></div>
            </div>

        </>
    )
}