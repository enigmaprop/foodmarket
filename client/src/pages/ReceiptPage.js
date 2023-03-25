import React from "react";
import Receipt from "../components/Receipt";
import { useParams } from "react-router-dom";

const ReceiptPage = (parms)=>{
        const id = useParams().id
        return(
            <div>
                <section className="ml-12 mt-12"><Receipt id={id} url={parms.url} pubkey={parms.pubkey} cartName={parms.cartName} formOrder={parms.formOrder}/></section>
            </div>
        );

}

export default ReceiptPage