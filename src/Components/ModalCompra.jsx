import './ModalCompra.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalCompra(props) {

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className='modal-container'
            >
                <Modal.Header className='modal-header' closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Compra por transferencia
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-body-container'>
                    <h4>Selecciona una opcion:</h4>
                    <div className='modal-body-compra'>
                        <Button className='boton-transferencia' variant='none' onClick={() =>  navigator.clipboard.writeText('0000003100099152831444')}><img src="https://icongr.am/jam/pin.svg?size=30&color=288BA8" alt="Icono de copia" />CVU</Button>
                        <Button className='boton-transferencia' variant='none' onClick={() =>  navigator.clipboard.writeText('Taurie')}><img src="https://icongr.am/jam/pin.svg?size=30&color=288BA8" alt="Icono de copia" />Alias</Button>
                    </div>
                    <a target="blank" href="https://wa.me/543815768548?text=Buenos%20días,%20vengo%20desde%20la%20pagina%20web%20para%20realizar%20un%20pago.%20"><img loading='lazy' className='whatsapp-compra' src="https://icongr.am/fontawesome/whatsapp.svg?size=30&color=1dcd3b" alt="Logo de whatsapp" /></a>
                    <h5 style={{color: "var(--decoraciones)", fontWeight: "bold"}}>Pasos a seguir:</h5>
                    <ol>
                        <li>Presionar cualquiera de los 2 botones para copiar a portapapeles.</li>
                        <li>Luego presionar el botón de Whatsapp y adjuntar el comprobante.</li>
                        <li>Una vez adjuntado el comprobante se procedera a organizar el envio.</li>
                    </ol>
                    <p className='aviso-compra'>SI NO SE ADJUNTA EL COMPROBANTE POR MAS QUE SE HAYA REALIZADO LA TRANSFERENCIA NO SE LLEVARA A CABO LA ENTREGA DEL PRODUCTO.
                        <br /><br />EN TAL CASO SE DEBERA COMUNICAR DIRECTAMENTE AL MISMO NUMERO.
                    </p>
                </Modal.Body>
                <Modal.Footer className='modal-footer'>
                    <Button style={{ border: "1px solid var(--decoraciones)", color: "white" }} variant='none' onClick={props.onHide}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalCompra