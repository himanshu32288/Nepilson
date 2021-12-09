import React from 'react';

const Navbar = props => {
    return (<>
        <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Nepilson</a>
               <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#collapsable" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
               </button>
                <div className="collapse navbar-collapse" id="collapsable">
                    <div className="navbar-nav">
                        <a className="nav-link active" aria-current="page" href="/">NFA TO DFA</a>
                    </div>
                </div>
            </div>
        </nav>
    </>
    );
}

export default Navbar;
