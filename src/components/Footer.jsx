import React from "react";

const date = new Date();

function Footer(){
    return <footer>
        <p>
        Copyright © {date.getFullYear()} Rabin Pun
        </p>
    </footer>

}

export default Footer;