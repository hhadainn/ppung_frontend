import React from 'react';
import Swal from 'sweetalert2'
import { ToastContainer, toast, Slide, cssTransition } from 'react-toastify';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const CustomToastComp = ({content, type}) => {
    return (
      <div style={{display: 'flex', alignItems: 'center', fontSize: 16}}>
          {type == 'success' &&
          <CheckCircleIcon style={{color: '#fff', marginRight: '1rem', fontSize: 26}}/>
          }
          
          {content}
        </div>
    );
};

const AlertToast = ({ text, isWarnIcon = false,  toastId = 'test', type ='info'}) => {
    toast.dismiss()
    setTimeout(() => {
        toast(<CustomToastComp content={text} type={type}/>, {
            toastId: toastId ,
            position: "top-center",
            className: 'alerttoast' + (type == 'success' ? ' toast-success ' : '') + (type == 'warn' ? ' toast-warn ' : '') ,  
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            transition: Slide,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            closeButton: false,
            type: type,
            icon: ({theme, type}) => {
                if(isWarnIcon){
                    return <WarningIcon/>
                }
                else return null
            }
        });
    }, 0);
}
export default AlertToast;