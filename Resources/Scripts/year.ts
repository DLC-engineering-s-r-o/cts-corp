export function setCurentYear(){

    const years = document.querySelectorAll('time.year')

    years.forEach(year => {
        year.innerHTML = new Date().getFullYear().toString()
    })
}