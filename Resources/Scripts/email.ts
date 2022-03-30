import axios from 'axios'

export function initEmail() {
    axios as any

    const contactForm = document.getElementById('contactForm') as HTMLFormElement
    const fullNameEl = document.getElementById('fullName') as HTMLInputElement
    const phoneEl = document.getElementById('phone') as HTMLInputElement
    const mailEl = document.getElementById('email') as HTMLInputElement
    const messageEl = document.getElementById('msg') as HTMLTextAreaElement
    const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement
    const formValidation = document.getElementById('formValidation') as HTMLDivElement

    const azureFncUrl = 'https://dlcafsendgrid20220328153355.azurewebsites.net/api/SendEmail'

    let fullName = ''
    let email = ''
    let phone = ''
    let message = ''
    let website = 'ctscorp.cz'

    function validateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return true
        }
        console.log("%cYou have entered an invalid email address!", 'color:red;')
        return false
    }

    function showSuccess(){
        formValidation.style.display = 'block'
    }

    function setDisabled(el){
        el.setAttribute('disabled', '')
    }

    function setEnabled(el){
        el.removeAttribute('disabled')
    }

    function setEmailContent() {
        if (fullNameEl.value) {
            fullName = fullNameEl.value
        }
        if (phoneEl.value) {
            phone = phoneEl.value.replace('+', '00')
        }

        if (validateEmail(mailEl.value)) {
            email = mailEl.value
        }

        if (messageEl.value) {
            message = messageEl.value
        }

        return fullName + phone + email + message
    }

    function axiosPost() {
        let formData = new FormData()

        formData.append('fullName', fullName)
        formData.append('email', email)
        formData.append('phone', phone)
        formData.append('body', message)
        formData.append('website', website)

        axios({
            method: "post",
            url: azureFncUrl,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then(response => {
             showSuccess()
             setEnabled(submitBtn)
              console.log(response);
            })
            .catch(response => {
              setEnabled(submitBtn)
              console.log(response);
            });
    }

    submitBtn.addEventListener('click', () => {
        setEmailContent()

        if (fullName != '' && email != '' && message != '') {
            setDisabled(submitBtn)
            axiosPost()  
            contactForm.reset()
        }

        else console.log('%cPlease fill in the required fields!', 'color:red;')
    })
}