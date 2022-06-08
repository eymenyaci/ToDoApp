import React from "react";

function Header({ title }) {
    return(
        <>
            <header className="header">
                <div className="container">
                    <h1 className="header-title">{title}</h1>
                </div>
            </header>
        </>
    );
}

export default Header;