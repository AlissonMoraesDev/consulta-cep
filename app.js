var submitButton = document.querySelector('#app form button')
var zipCodeField = document.querySelector('#app form input')
var content = document.querySelector('#app main')

zipCodeField.focus()

submitButton.addEventListener('click', run)

function run(event) {
    event.preventDefault()

    var zipCode = zipCodeField.value
    zipCode = zipCode.replace(' ', '')
    zipCode = zipCode.replace('.', '')
    zipCode = zipCode.trim()

    axios.get(`https://viacep.com.br/ws/${zipCode}/json`)
        .then(function(response) {
            if (response.data.erro) {
                throw new Error('CEP inválido')
            }
            content.innerHTML = ''
            createLine(response.data.logradouro)
            createLine(`${response.data.localidade}/${response.data.uf}`)
            createLine(response.data.bairro)
        })
        .catch(function(error) {
            content.innerHTML = ''
            createLine('Verifique o CEP, por favor!')
            content
        })
}

function createLine(text) {
    var line = document.createElement('p')
    var text = document.createTextNode(text)

    line.appendChild(text)
    content.appendChild(line)
}