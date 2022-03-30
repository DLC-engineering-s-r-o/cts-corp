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

    function postEmailData() {
        let xhr = new XMLHttpRequest()
        let formData = new FormData()

        formData.append('fullName', fullName)
        formData.append('email', email)
        formData.append('phone', phone)
        formData.append('body', message)
        formData.append('website', website)

        xhr.open("POST", azureFncUrl, true)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        xhr.send(formData)
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
            .then(function (response) {
              //handle success
              console.log(response);
            })
            .catch(function (response) {
              //handle error
              console.log(response);
            });
    }

    submitBtn.addEventListener('click', () => {
        setEmailContent()

        if (fullName != '' && email != '' && message != '') {
            axiosPost()
        }

        else console.log('%cPlease fill in the required fields!', 'color:red;')
    })


}