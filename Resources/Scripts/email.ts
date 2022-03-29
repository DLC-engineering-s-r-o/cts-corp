import axios from 'axios'

export function initEmail() {
    axios as any

    const fullNameEl = document.getElementById('fullName') as HTMLInputElement
    const phoneEl = document.getElementById('phone') as HTMLInputElement
    const mailEl = document.getElementById('email') as HTMLInputElement
    const messageEl = document.getElementById('msg') as HTMLTextAreaElement
    const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement    

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

    function postEmailData(){
        let formData = new FormData()
        let request = new XMLHttpRequest()

        formData.append('fullName', fullName)
        formData.append('email', email)
        formData.append('phone', phone)
        formData.append('body', message)
        formData.append('website', website)
          
        request.open("POST", azureFncUrl)
        request.send(formData)
    }

    function axiosPost() {
        axios.post(azureFncUrl, {
                fullName: fullName,
                email: email,
                phone: phone,
                body: message,
                website: website
        }).then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
    }

    submitBtn.addEventListener('click', () => {
        setEmailContent()

        if (fullName != '' && email != '' && message != '') {
            // postEmailData()
            axiosPost()
        }

        else console.log('%cPlease fill in the required fields!', 'color:red;')
    })
}