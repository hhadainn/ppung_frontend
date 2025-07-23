import Swal from 'sweetalert2'

const AlertConfirm = ({title = '알림', type= '', desc = '', text, warnDesc, isConfirmed, isDenied, isAfter, isColor, isCheckbox, isClose, confirmLabel = '확인', cancelLabel = '취소', isCS = false}) => {
    let titleText = !warnDesc ? title :  `<div>${title}<div style='font-size:12px;margin-top:5px;color:#d4554f'>${warnDesc}</div></div>`;
    if(desc){
        text = `<p style="">${text}</p><p style="font-size: 12px;">${desc}</p>`
    }
    if(isCS){
        text += `<p style="display:inline-block">문의 : 제제소프트 <p style="color: #ff7197;margin-left: 5px; display: inline-block"> fundlounge@jejesoft.com</p></p>`
    }
    if(type == 'remove'){
        title = '삭제 알림'
    }
    else if(type == 'delete'){
        title = '복구 불가'
    }
	else if(type == 'invalid'){
		title = '해당 안됨'
	}
	else if(type == 'GP_change'){
		title = 'GP 변경'
	}
    else if(type == 'no_user'){
        title= '조합원이 없습니다'
    }
	else if(type == 'remain'){
		title = '탭 명이 바뀌면 기존 명단 이름 아래의 협력사들은 삭제됩니다.'
	}
    else if(type == 'save'){
        title = '저장'
    }
	else if(type == 'no_section'){
		title = '항목이 없습니다'
	}
    else if(type == 'exist'){
        title = '등록 불가'
    }
    else if(type == 'not_save'){
        title = '저장 불가'
    }
    else if(type == 'not_delete'){
        title = '삭제 불가'
    }
    else if(type == 'not_create'){
        title = '생성 불가'
    }
    else if(type == 'apply_ccoc'){
        title = '발급 신청'
    }
    else if(type == 'success_ccoc'){
        title = '발급 신청 완료'
    }
    else if(type == 'not_complete'){
        title = '완료 불가'
    }
    else if(type == 'not_login'){
        title = '로그인 불가'
    }
    else if(type == 'add'){
        title = '추가'
    }
    else if(type == 'register'){
        title = '가입 심사 중'
    }
    else if(type == 'create_report'){
        title = '보고서 생성'
    }
	else if(type == 'auto_calc'){
		title = '자동수식'
	}
    else if(type == 'join_inquiry'){
        text = `
        <div style="display:block">
            <span>
            로그인 후 사용이 가능합니다. <br/>
            </span>
            <span>
            가입 문의 : 제제소프트 <p style="color: #ff7197;margin-left: 5px;margin-right: 3px; display: inline-block"> nsight@jejesoft.com </p>(070-4213-4650)
            </span>

        </div>`

    }
    else if(type == 'fail'){
        title ='실패'
    }
	const item = {
        title: title,
        html: text,
        showCancelButton: (isDenied) ? true : false,
        confirmButtonText: confirmLabel,
        cancelButtonText:cancelLabel,
        allowEnterKey: true,
        reverseButtons: true,
        customClass:{
            container: 'swal-confirm-wrap ' + (isColor ? 'swal-text-color' : '') ,
            popup: ('swal-confirm-container '+ (!isDenied ? ' single' : '')),
            title: 'swal-confirm-title',
            confirmButton: 'swal-confirm-btn',
            cancelButton: 'swal-confirm-cancel'
        },
        buttonsStyling: false,
        showCloseButton: true,
        closeButtonHtml: '<div class="swal-confirm-close-btn"></div>'
	}
	if(isCheckbox){
		item.input = 'checkbox'
		item.inputValue = 1
		item.inputPlaceholder = '다시 보지 않기'
	}
    Swal.fire(item).then(async(result) => {
        if(isAfter) isAfter()
        if(result.isConfirmed) {
            if(isConfirmed) isConfirmed(result.value);
        } 
        else if (result.isDismissed && result.dismiss == 'cancel') {
            if(isDenied) isDenied();
        }
		else if(result.isDismissed && (result.dismiss == 'close' || result.dismiss == 'backdrop')){
			if(isClose) isClose()
		}
    })
}
export default AlertConfirm;