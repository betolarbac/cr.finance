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


const Transactions = [ {

    id: 1,
    description: 'luz',
    amount: -50000,
    data: '23/01/2021'
},
 {

    id: 2,
    description: 'agua',
    amount: -20000,
    data: '23/01/2021'
},
{

    id: 3,
    description: 'website',
    amount: 500000,
    data: '23/01/2021'
}
]


const Transaction = {
    all:Transactions,

    add(Transaction){
        Transaction.all.push(Transaction)

        App.reload()
    },

    remove(index) {

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
            tr.innerHTML = DOM.innerHTMLTransaction(Transaction)

            DOM.TransactionsContainer.appendChild(tr)
        },

        innerHTMLTransaction(Transaction) {
            const CSSclass = Transaction.amount > 0 ? "income" : "expense" // amount é maior que 0 se sim então adicione a classe income se não coloque a classe expense

            const amount = Utils.formatCurrency(Transaction.amount)

        const html = `
        
                        <td class="description">${Transaction.description}</td>
                        <td class="${CSSclass}">${amount}</td>
                        <td class="date">${Transaction.data}</td>
                        <td>
                            <img src="./assets/minus.svg" alt="Remover trasação">
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


const App = {
    init() {
        Transactions.forEach(Transaction => {
            DOM.addTransaction(Transaction)
        }) /*para cada elemento ele executa uma funcionalidade*///funcionalidade usada para objetos tipos array 
        
        DOM.updateBalance()
    },

    reload() {
        DOM.clearTransactions()
        App.init()
    },
}

App.init()

Transaction.add({
    id:39,
    description: 'alo',
    amount: 200,
    data: '23/01/2021'

})