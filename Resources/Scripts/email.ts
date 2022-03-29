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

    function validateEmail(mail) 
    {
     if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
      {
        return true
      }
        console.log("%cYou have entered an invalid email address!", 'color:red;')
        return false
    }

    function setEmailContent() {

        if (fullNameEl.value) {
            fullName = fullNameEl.value
        }
        if (phoneEl.value) {
            phone = phoneEl.value
        }

        if (validateEmail(mailEl.value)) {
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
            window.location.href = `https://dlcafsendgrid20220328153355.azurewebsites.net/api/SendEmail?fullName=${fullName}&email=${email}&phone=${phone}&body=${message}&website=${website}`
        }

        else console.log('%cPlease fill in the required fields!', 'color:red;')
    })
}