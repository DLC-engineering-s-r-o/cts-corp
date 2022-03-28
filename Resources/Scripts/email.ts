export function initEmail() {
    const fNameEl = document.getElementById('fName') as HTMLInputElement
    const lNameEl = document.getElementById('lName') as HTMLInputElement
    const phoneEl = document.getElementById('phone') as HTMLInputElement
    const mailEl = document.getElementById('email') as HTMLInputElement
    const messageEl = document.getElementById('msg') as HTMLTextAreaElement
    const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement

    let fName = ''
    let lName = ''
    let email = ''
    let phone = ''
    let message = ''

    function setEmailContent() {

        if (fNameEl.value) {
            fName = fNameEl.value
        }

        if (lNameEl.value) {
            lName = lNameEl.value
        }

        if (phoneEl.value) {
            phone = phoneEl.value
        }

        if (mailEl.value) {
            email = mailEl.value
        }

        if (messageEl.value) {
            message = messageEl.value
        }

        return fName + lName + phone + email + message
    }

    submitBtn.addEventListener('click', () => {
        setEmailContent()

        if (fName != '' && lName != '' && email != '' && message != '') {
            console.log(fName + ' ' + lName + ' ' + email + ' ' + phone + ' ' + message)
        }

        else console.log('%cPlease fill in the required fields!', 'color:red;')
    })
}