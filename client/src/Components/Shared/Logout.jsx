
import React, { useRef, useState } from 'react';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Navigate, useNavigate } from 'react-router-dom';

export default function DeclarativeDemo() {
    const navigate = useNavigate()

    const [visible, setVisible] = useState(false);
    const toast = useRef(null);
    const buttonEl = useRef(null);
    const accessToken = useRef(JSON.parse(localStorage.getItem("accessToken")))

    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'יצאת מהחשבון', detail: '', life: 3000 });
        localStorage.removeItem("accessToken")
        navigate("../Login_Register")
    };

    const reject = () => {
        // toast.current.show({ severity: 'warn', summary: 'Rejected', detail: '', life: 3000 });
    };


    return (
        <>
            <Toast ref={toast} position='top-center' />
             <ConfirmPopup target={buttonEl.current} visible={visible} onHide={() => setVisible(false)}
                message="?האם אתה בטוח שברצונך לצאת מהחשבון" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} /> 
            <div className="card flex justify-content-center">
                <Button ref={buttonEl} onClick={() => setVisible(true)} icon="pi pi-sign-out" label="" className='innav' />
            </div>
        </>
    )
}



// import React, { useState, useRef } from 'react';
// import { Avatar } from 'primereact/avatar';

// import { Button } from 'primereact/button';
// import { Toast } from 'primereact/toast';
// import { Navigate, useNavigate } from 'react-router-dom';

// export default function Logout() {
//     const [visible, setVisible] = useState(false);
//     const toastBC = useRef(null);
//     const navigate = useNavigate()
//     const clear = () => {
//         localStorage.removeItem("accessToken")
//         toastBC.current.clear();
//         setVisible(false);
//         navigate("../Login_Register")
//     };

//     const confirm = () => {
//         if (!visible) {
//             setVisible(true);
//             toastBC.current.clear();
//             toastBC.current.show({
//                 severity: 'success',
//                 summary: '?האם אתה בטוח שברצונך לצאת',
//                 sticky: true,
//                 content: (props) => (
//                     <div className="flex flex-column align-items-left"
//                         style={{ flex: '1' }}>
//                         <div className="flex align-items-center gap-2">
//                             <Avatar image="/images/avatar/amyelsner.png" shape="circle" />
//                             <span className="font-bold text-900"></span>
//                         </div>
//                         <div className="font-medium text-lg my-3 text-900">{props.message.summary}</div>
//                         <Button className="p-button-sm flex" label="אישור" severity="success" onClick={clear}></Button>
//                     </div>
//                 )
//             });
//         }
//     };

//     return (
//         <div className="card flex justify-content-center index">
//             <Toast ref={toastBC} position="top-center" baseZIndex={1000} onRemove={clear} />
//             <Button icon="pi pi-sign-out" onClick={confirm}
//                 className='innav' />
//         </div>
//     )
// }
