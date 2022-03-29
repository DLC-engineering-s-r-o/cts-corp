export function initEmail() {
    const fullNameEl = document.getElementById('fullName') as HTMLInputElement
    const phoneEl = document.getElementById('phone') as HTMLInputElement
    const mailEl = document.getElementById('email') as HTMLInputElement
    const messageEl = document.getElementById('msg') as HTMLTextAreaElement
    const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement

    let fullName = ''
    let email = ''
    let phone = ''
    let message = ''
    let website = 'ctscorp.cz'

    function httpGet(theUrl) {
        var xmlHttp = new XMLHttpRequest()
        xmlHttp.open( "GET", theUrl, false ) // false for synchronous request
        xmlHttp.send( null )
        return xmlHttp.responseText
    }

    function setEmailContent() {

        if (fullNameEl.value) {
            fullName = fullNameEl.value
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

        return fullName + phone + email + message
    }

    submitBtn.addEventListener('click', () => {
        setEmailContent()

        if (fullName != '' && email != '' && message != '') {
            httpGet(`https://dlcafsendgrid20220328153355.azurewebsites.net/api/SendEmail?sender=${fullName}&body=${message}`)
            console.log(`https://dlcafsendgrid20220328153355.azurewebsites.net/api/SendEmail?sender=${fullName}&body=${message}`)
        }

        else console.log('%cPlease fill in the required fields!', 'color:red;')
    })
}