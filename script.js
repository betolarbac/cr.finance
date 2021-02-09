const Modal = {
    open(){
        //abrir modal 
        //adicionar classe active
        document.querySelector('.modal-overlay')//procurando uma propriedade no css 
        .classList.add('active')//pegou toda lista de classes e add uma nova classe ao modal
    },

    close(){
        //fechar modal
        //retirar classe active
        document.querySelector('.modal-overlay')
        .classList.remove('active')//pegou toda lista de classes e removeu uma classe do modal
    }
}

const Storage = {
    get () {
        return JSON.parse(localStorage.getItem("cr.finances:transactions")) || []
    },

    set (transactions) {
    localStorage.setItem("cr.finances:transactions", 
    JSON.stringify(transactions))// transforma uma array em string
    },
}// guarda dados no local storage do navegador do cliente 

const Transaction = {
    all: Storage.get(),

    add(transaction){
        Transaction.all.push(transaction)

        App.reload()
    },

    remove(index) {
        Transaction.all.splice(index, 1)

        App.reload()
    },

    income(){
        let income = 0;
        //pegar todas as transações 
        //para cada transacao, 
        Transaction.all.forEach(Transaction => {
            //se ela fro maior que zero 
            if( Transaction.amount > 0 ){
             // somar a uma variavel e retorna a variavel 
            income += Transaction.amount;
            }
        }) 
       
      return income;
    },

    expenses(){

            let expense = 0;
            
            Transaction.all.forEach(Transaction => {
                //se ela for menor que zero
                if( Transaction.amount < 0 ){
                // somar a uma variavel e retorna a variavel 
                expense += Transaction.amount;
                }
            }) 
       return expense;
    },

    total(){
      return  Transaction.income() + Transaction.expenses();
    }
}

const DOM = {
        TransactionsContainer: document.querySelector('#data-table tbody'),
        addTransaction(Transaction, index) {
            const tr = document.createElement('tr')
            tr.innerHTML = DOM.innerHTMLTransaction(Transaction, index)
            tr.dataset.index = index

            DOM.TransactionsContainer.appendChild(tr)
        },

        innerHTMLTransaction(Transaction, index) {
            const CSSclass = Transaction.amount > 0 ? "income" : "expense" // amount é maior que 0 se sim então adicione a classe income se não coloque a classe expense

            const amount = Utils.formatCurrency(Transaction.amount)

        const html = `
        
                        <td class="description">${Transaction.description}</td>
                        <td class="${CSSclass}">${amount}</td>
                        <td class="date">${Transaction.date}</td>
                        <td>
                            <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover trasação">
                        </td>
                    
        
        `

        return html
    },

    updateBalance() {
        document.getElementById('incomeDisplay').innerHTML= Utils.formatCurrency(Transaction.income())
        document.getElementById('expenseDisplay').innerHTML= Utils.formatCurrency(Transaction.expenses())
        document.getElementById('totalDisplay').innerHTML= Utils.formatCurrency(Transaction.total())
    },

    clearTransactions() {
        DOM.TransactionsContainer.innerHTML = ""
    }

}

const Utils = {
    formatAmount(value) {
        value = value * 100

        return Math.round(value)
    },

    formatDate(date) {
        const splittedDate = date.split("-")
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },

    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100 //dividindo o value por 100 

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })//localidade e formatação da moeda brasileira 

        return signal + value
    }

}// algumas coisas que serão uteis no programa 

const Form = {

    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getvalues(){
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value,
        }
    },

    
    validateFields(){

        const { description, amount, date } = Form.getvalues()

        if( description.trim() === "" || 
            amount.trim() === "" || 
            date.trim() === "" ) {
                throw new Error("Por favor, preencha todos os campos")
        }

    },

    formatValues(){
        let { description, amount, date } = Form.getvalues()

        amount = Utils.formatAmount(amount)

        date = Utils.formatDate(date)
        
        return {
            description,
            amount,
            date,
        }
       
    },

    saveTransaction(transaction) {
        Transaction.add(transaction)
    },

    clearFields(){
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },

    submit(event) {
        event.preventDefault()// não faça o comportamento padrao que é enviar o formulario com monte de informação


        try {
        //verificar se todas informaçoes foram preenchidas 
        Form.validateFields()
        //formatar os dados para salvar 
        const transaction = Form.formatValues()
        //salvar
        Form.saveTransaction(transaction)
        //apagar os dados do formulario 
        Form.clearFields()
        //modal feche 
        Modal.close()

        } catch (error) {
            alert(error.message)
        } 



    }
}

const App = {
    init() {

        Transaction.all.forEach((transaction, index) => {
            DOM.addTransaction(transaction, index)
        }) /*para cada elemento ele executa uma funcionalidade*///funcionalidade usada para objetos tipos array 
        DOM.updateBalance()

        Storage.set(Transaction.all)
    },

    reload() {
        DOM.clearTransactions()
        App.init()
    },
}

App.init()


