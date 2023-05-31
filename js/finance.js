class Finance {
    constructor() {
        this.modal = document.querySelector('.modal-overlay').classList;
        this.modalEdit = document.querySelector('#modalEdit').classList;
        this.indexArray = 0;
        this.all = this.getStorage();
        this.transactionContainer = document.querySelector('#data-table tbody');
        this.description = document.querySelector('input#description');
        this.descriptionEdit = document.querySelector('input#descriptionEdit');
        this.amount = document.querySelector('input#amount');
        this.amountEdit = document.querySelector('input#amountEdit');
        this.date = document.querySelector('select#AcabamentoName');
        this.dateEdit = document.querySelector('input#dateEdit');
    }

    init() {
        const finance = this;
        finance.all.forEach(finance.addTransaction);
        finance.updateBalance();
        finance.setStorage(finance.all);
    }

    reload() {
        const finance = this;
        finance.clearTransaction();
        finance.init();
    }

    toggleModal() {
        const finance = this;
        finance.modal.toggle('active');
    }

    toggleModalEdit() {
        const finance = this;
        finance.modalEdit.toggle('active');
    }

    getStorage() {
        return JSON.parse(localStorage.getItem('transaction')) || [];
    }

    setStorage(transaction) {
        localStorage.setItem('transaction', JSON.stringify(transaction));
    }

    addEdit(transaction) {
        const finance = this;
        const editTransaction = transaction;
        const novoAll = finance.all.map((transaction, indice) => {
            if (finance.indexArray === indice) {
                transaction.description = editTransaction.description;
                transaction.amount = editTransaction.amount;
                transaction.date = editTransaction.date;
            }
            return transaction;
        });
        finance.all = novoAll;
        finance.reload();
    }

    edit(index) {
        const finance = this;
        const splittedDate = finance.all[index].date.split('/');
        finance.indexArray = index;
        finance.toggleModalEdit();
        finance.descriptionEdit.value = finance.all[index].description;
        finance.amountEdit.value = finance.all[index].amount;
        finance.dateEdit.value = `${splittedDate[2]}-${splittedDate[1]}-${splittedDate[0]}`;
    }

    remove(index) {
        const finance = this;
        finance.all.splice(index, 1);
        finance.reload();
    }

    incomes() {
        const finance = this;
        let income = 0;
        finance.all.forEach(transaction => {
            if (transaction.amount > 0) {
                income += transaction.amount;
            }
        });
        return income;
    }

    expenses() {
        const finance = this;
        let expense = 0;
        finance.all.forEach(transaction => {
            if (transaction.amount < 0) {
                expense += transaction.amount;
            }
        });
        return expense;
    }

    total() {
        const finance = this;
        return finance.incomes() + finance.expenses();
    }

    innerHtmlTBody(transaction, index) {
        const finance = this;
        const cssClass = transaction.amount > 0 ? 'income' : 'expense';
        const amount = finance.formatCurrency(transaction.amount);
        const html = `<td class="description">${transaction.description}</td>
        <td class="${cssClass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img class="pointer" src="images/edit.png" alt="Editar Transação" onclick="finance.edit(${index})">
        </td>
        <td>
            <img class="pointer" src="images/minus.svg" alt="Remover Transação" onclick="finance.remove(${index})">
        </td>`;
        return html;
    }

    updateBalance() {
        const finance = this;
        //document.getElementById('incomeDisplay').innerHTML = finance.formatCurrency(finance.incomes());
        //document.getElementById('expenseDisplay').innerHTML = finance.formatCurrency(finance.expenses());
        //document.getElementById('totalDisplay').innerHTML = finance.formatCurrency(finance.total());
    }

    clearTransaction() {
        const finance = this;
        finance.transactionContainer.innerHTML = '';
    }

    formatCurrency(value) {
        const signal = Number(value) < 0 ? '-' : '';
        value = String(value).replace(/\D/g, '');
        value = Number(value) / 100;
        value = value.toLocaleString("pt-br", { style: 'currency', currency: 'BRL' });
        return signal + value;
    }

    formatAmount(value) {
        const signal = value < '0' ? '-' : '';
        value = String(value).replace(/\D/g, '');
        value = Number(signal + value);
        return Math.round(value);
    }

    formatDate(date) {
        const splittedDate = date.split('-');
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
    }

    getValues() {
        const finance = this;
        return {
            description: finance.description.value,
            amount: finance.amount.value,
            date: finance.date.value
        };
    }

    getValuesEdit() {
        const finance = this;
        return {
            description: finance.descriptionEdit.value,
            amount: finance.amountEdit.value,
            date: finance.dateEdit.value,
        };
    }

    add(transaction) {
        const finance = this;

        finance.all.push(transaction);
        finance.reload();
    }

    addTransaction(transaction, index) {

        console.log(index);
        const finance = new Finance();

        const tr = document.createElement('tr');

        tr.innerHTML = finance.innerHtmlTBody(transaction, index);
        tr.dataset.index = index;
        finance.transactionContainer.appendChild(tr);
    }

    submit(event) {

        function ConvertDecimal(value) {
            const formattedValue = value.toFixed(2);
            return formattedValue;
        }

        const finance = this;
        event.preventDefault();

        // Seleciona a Largura
        const selectedLargura = document.getElementById("decimalInputLargura").value;
        console.log(selectedLargura);

        // Seleciona a Altura
        const selectedAltura = document.getElementById("decimalInputAltura").value;
        console.log(selectedAltura);

        // Seleciona o Tecido
        var selectedTecido = document.getElementById("TecidoName").value;

        if (selectedTecido == "Linho Voil Flame")
            var priceTecido = 42;
        if (selectedTecido == "Linho Rustico")
            var priceTecido = 64;
        if (selectedTecido == "Voil Suico")
            var priceTecido = 30;
        if (selectedTecido == "Voil Liso")
            var priceTecido = 17;
        if (selectedTecido == "Glace")
            var priceTecido = 32;

        var resposta = confirm("Você deseja inverter o Tecido?");

        if (resposta) {
            var ConvetTecido = 1;
        } else {
            var ConvetTecido = 0;
        }

        // Converter o Tecido
        if (ConvetTecido == 1) {
            var TecidoConvertido = selectedLargura * 3
            TecidoConvertido = TecidoConvertido / 2.80;

            var resposta2 = prompt("A conversão deu: " + TecidoConvertido + "<br> Deseja inverter para quanto?");

            if (resposta2 == 0)
                alert("Ocorreu um erro. Por favor, tente novamente.");


            var TecidoAltura = parseFloat(selectedAltura) + 0.40;
            TecidoConvertido = resposta2 * TecidoAltura;

            console.log(TecidoConvertido);
        }

        // Nâo Converter Tecido
        if (ConvetTecido == 0) {
            var TecidoConvertido = selectedLargura * 3
        }

        // Seleciona o Forro
        var selectedForro = document.getElementById("ForroName").value;
        if (selectedForro == "Microfibra") {
            var priceForro = 19;
        }

        var priceForroFinal = priceForro * TecidoConvertido;

        // Seleciona o Blackout
        var selectedBK = document.getElementById("BlackoutEscolhido").value;

        if (selectedBK == "SemBk") {
            var priceBK = 0;
        }
        if (selectedBK == "Blackout 100%") {
            var priceBK = 72;
        }
        if (selectedBK == "Blackout 70%") {
            var priceBK = 58;
        }
        if (selectedBK == "Blackout PVC") {
            var priceBK = 27;
        }

        if (selectedBK != "SemBk") {

            var resposta3 = confirm("Você deseja inverter o Blackout?");

            if (resposta3) {
                var ConvetBlackout = 1;
            } else {
                var ConvetBlackout = 0;
            }
        }

        var BKConvertido = 0;

        // Converter o BK
        if (ConvetBlackout == 1) {

            if (selectedBK == "Blackout PVC") {

                var BKConvertido = parseFloat(selectedLargura) + 1
                BKConvertido = BKConvertido / 1.40;

                var resposta3 = prompt("A conversão deu: " + BKConvertido + "<br> Deseja inverter para quanto?");

                if (resposta3 == 0)
                    alert("Ocorreu um erro. Por favor, tente novamente.");

                var BKAltura = parseFloat(selectedAltura) + 0.20;
                BKConvertido = resposta3 * BKAltura;
            }


            if (selectedBK == "Blackout 100%" || selectedBK == "Blackout 70%") {

                var BKConvertido = parseFloat(selectedLargura) + 1
                BKConvertido = BKConvertido / 2.80;

                var resposta3 = prompt("A conversão deu: " + BKConvertido + "<br> Deseja inverter para quanto?");

                if (resposta3 == 0)
                    alert("Ocorreu um erro. Por favor, tente novamente.");

                var BKAltura = parseFloat(selectedAltura) + 0.20;
                BKConvertido = resposta3 * BKAltura;
            }
        }

        // Nâo Converter BK
        if (ConvetBlackout == 0) {
            var BKConvertido = parseFloat(selectedLargura) + 1;
        }


        // Seleciona se é Separado ou Junto e o terminal
        var AcabamentoBK = document.getElementById("BkJuntoSeparado").value;
        var QntPonteiraTerminal = 2;
        var PriceTerminal = 2.00;
        var PriceCostureira = 42.00;
        var QntdeTrilhoBastao;

        if (AcabamentoBK == "BkSeparado") {

            QntdeTrilhoBastao = selectedLargura * 2;
            QntPonteiraTerminal = 4;
            PriceCostureira = 60.00;
        }

        if (AcabamentoBK == "SemBk")
        QntdeTrilhoBastao = selectedLargura;

        if (AcabamentoBK == "BkJunto")
        QntdeTrilhoBastao = selectedLargura;

        // Seleciona o Acabamento
        var selectedAcabamento = document.getElementById("AcabamentoName").value;

        if (selectedAcabamento == "Trilho") {
            var AcabamentoPrice = 18;
            var NameAcabamento = "Terminal"
        }

        if (selectedAcabamento == "Bastao 28") {
            var AcabamentoPrice = 25;
            var NameAcabamento = "Ponteira";

            var nomeSuporte = "Suporte";
            var PriceSuporte = 22;

            if (selectedLargura < 2)
                var QntSuporte = 2;

            if (selectedLargura > 2)
                var QntSuporte = Math.round(selectedLargura);

            if (AcabamentoBK == "BkSeparado") {
                QntSuporte = QntSuporte * 2;
            }
        }

        if (selectedAcabamento == "Bastão 19") {
            var AcabamentoPrice = 22;
            var NameAcabamento = "Ponteira";

            var nomeSuporte = "Suporte";
            var PriceSuporte = 22;

            if (selectedLargura <= 2)
                var QntSuporte = 2;

            if (selectedLargura > 2)
                var QntSuporte = Math.round(selectedLargura);

            if (AcabamentoBK == "BkSeparado") {
                QntSuporte = QntSuporte * 2;
            }
        }

        // Calcula o Rodizio

        var PriceRodizio = 0.35;
        var QntRodizio = TecidoConvertido + BKConvertido;
        QntRodizio = QntRodizio / 0.12;
        //QntRodizio = QntRodizio * PriceRodizio;

        // Calcula Entretela
        var PriceEntretela = 4.00;
        var QntEntretela = TecidoConvertido;

        // Calcular Instalação

        var PriceInstalação = 50.00;

        if (selectedLargura > 4.00) {
            PriceInstalação = 150.00
        }

        //Parte das Informações
        document.getElementById('totalDisplay').innerHTML = "Altura: " + selectedAltura + "<br> Largura: " + selectedLargura;


        // Tabela de orçamento
        const tbody = document.getElementById('transactionBody');

        const tbodyContent = `

        <tr>
    <td>${selectedAcabamento}</td>
    <td>${ConvertDecimal(AcabamentoPrice)}</td>
    <td>${QntdeTrilhoBastao}</td>
    <td>${ConvertDecimal(AcabamentoPrice * QntdeTrilhoBastao)}</td>
    </tr>

    <tr id="nome-suporte">
    <td>${nomeSuporte}</td>
    <td>${PriceSuporte}</td>
    <td>${QntSuporte}</td>
    <td>${ConvertDecimal(QntSuporte * PriceSuporte)}</td>
    </tr>

    <tr>
    <td>${selectedTecido}</td>
    <td>${ConvertDecimal(priceTecido)}</td>
    <td>${TecidoConvertido}</td>
    <td>${ConvertDecimal(TecidoConvertido * priceTecido)}</td>
    </tr>
    
    <tr>
    <td>${selectedForro}</td>
    <td>${ConvertDecimal(priceForro)}</td>
    <td>${TecidoConvertido}</td>
    <td>${ConvertDecimal(priceForroFinal)}</td>
    </tr>

    <tr id="Select-BK">
    <td>${selectedBK}</td>
    <td>${ConvertDecimal(priceBK)}</td>
    <td>${ConvertDecimal(BKConvertido)}</td>
    <td>${ConvertDecimal(priceBK * BKConvertido)}</td>
    </tr>

    <tr>
    <td>Rodizio</td>
    <td>${ConvertDecimal(PriceRodizio)}</td>
    <td>${ConvertDecimal(QntRodizio)}</td>
    <td>${ConvertDecimal(QntRodizio * PriceRodizio)}</td>
    </tr>

    <td>Entretela</td>
    <td>${ConvertDecimal(PriceEntretela)}</td>
    <td>${QntEntretela}</td>
    <td>${ConvertDecimal(QntEntretela * PriceEntretela)}</td>
    </tr>

    <td>${NameAcabamento}</td>
    <td>${ConvertDecimal(PriceTerminal)}</td>
    <td>${QntPonteiraTerminal}</td>
    <td>${ConvertDecimal(QntPonteiraTerminal * PriceTerminal)}</td>
    </tr>

    <td>Instalação</td>
    <td>${ConvertDecimal(PriceInstalação)}</td>
    <td>1</td>
    <td>${ConvertDecimal(PriceInstalação)}</td>
    </tr>

    <td>Costureira</td>
    <td>${ConvertDecimal(PriceCostureira)}</td>
    <td>1</td>
    <td>${ConvertDecimal(PriceCostureira * selectedLargura)}</td>
    </tr>
    
    `;

        tbody.innerHTML = tbodyContent;

        if (selectedAcabamento == "Trilho") {
            // Obtém a referência para a linha <tr> que deseja ocultar
            var linha = document.getElementById('nome-suporte');

            // Define a propriedade de estilo display como 'none' para ocultar a linha
            linha.style.display = 'none';
        }

        if (selectedBK == "SemBk") {
            // Obtém a referência para a linha <tr> que deseja ocultar
            var linha = document.getElementById('Select-BK');

            // Define a propriedade de estilo display como 'none' para ocultar a linha
            linha.style.display = 'none';
        }

        // Valor a prazo
        var Total = AcabamentoPrice * QntdeTrilhoBastao;
        Total = Total + (TecidoConvertido * priceTecido);
        Total = Total + priceForroFinal;

        if (selectedBK != "SemBk") {
            Total = Total + (priceBK * BKConvertido);
        }

        Total = Total + (QntRodizio * PriceRodizio);
        Total = Total + (QntEntretela * PriceEntretela);
        Total = Total + (QntPonteiraTerminal * PriceTerminal);
        Total = Total + PriceInstalação;
        Total = Total + (PriceCostureira * selectedLargura);

        if (selectedAcabamento != "Trilho") {
            Total = Total + (QntSuporte * PriceSuporte);
        }

        document.getElementById('incomeDisplay').innerHTML = Total.toFixed(2);

        var TotalComDesconto = Total - ((Total * 10) / 100);
        document.getElementById('expenseDisplay').innerHTML = TotalComDesconto.toFixed(2);

        finance.modal.toggle('active');

    }

    submitEdit(event) {
        const finance = this;
        event.preventDefault();

        try {
            finance.validateFieldsEdit();
            const transaction = finance.formatDataEdit();
            finance.addEdit(transaction);
            finance.toggleModalEdit();
        } catch (error) {
            alert(error.message);
        }
    }

    validateFields() {
        const finance = this;
        const { description, amount, date } = finance.getValues();
        if (description.trim() === '' || amount.trim() === '' || date.trim() === '') {
            throw new Error('Por favor, preencha todos os campos!');
        }
    }

    validateFieldsEdit() {
        const finance = this;
        const { description, amount, date } = finance.getValuesEdit();
        if (description.trim() === '' || amount.trim() === '' || date.trim() === '') {
            throw new Error('Por favor, preencha todos os campos!');
        }
    }

    formatData() {
        const finance = this;
        let { description, amount, date } = finance.getValues();
        amount = finance.formatAmount(amount);
        date = finance.formatDate(date);
        return {
            description,
            amount,
            date
        };
    }

    formatDataEdit() {
        const finance = this;
        let { description, amount, date } = finance.getValuesEdit();
        amount = finance.formatAmount(amount);
        date = finance.formatDate(date);
        return {
            description,
            amount,
            date
        };
    }

    clearFields() {
        const finance = this;
        finance.description.value = '';
        finance.amount.value = '';
        finance.date.value = '';
    }
}

const finance = new Finance();
finance.init();