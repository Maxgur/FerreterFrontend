import { Modal } from "flowbite-react";
import "./ModalImageProduct.css";
import {  useEffect, useState } from "react";

function ModalImageProduct({ onClose, image, description,name }) {
    const [arrayDesc, setarrayDesc] = useState([])
    useEffect(()=>{
        if (description){
            setarrayDesc(description.split("\r\n"))

        }
    },[description])
    return (
        
        <>
            <Modal show={true} size="4xl" onClose={onClose} popup>
                <Modal.Header className="italic">{name}</Modal.Header>
                <Modal.Body>
                    <div className="flex">
                        <div >
                            <img src={image} alt="Selected Product" style={{width:350}}/>
                        </div>
                        <div className="div-description">
                        <h3 className="text-xl pb-1 ml-2 italic font-bold">Característica</h3>
                        <ul className="list-disc list-inside pl-8">
                           {
                            arrayDesc
                            .map((el,idx)=>(
                                <li key={idx} className="pl-2 pb-2 leading-8">{el}</li>
                            ))
                           }
                        </ul>
                            
                        </div>
                    </div>

                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalImageProduct;