class Despesa{
    constructor(dia, mes, ano, tipo, descricao, valor){
        this.dia = dia;
        this.mes = mes;
        this.ano = ano;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
    }

    checkData(){
        if (this.dia == "" || this.mes == "" || this.ano == "" || this.tipo == "" || this.descricao == "" || this.valor == "")
            return false;
        else
            return true;
    }
};

class Bd{
    constructor(){
        let id = localStorage.getItem("id");
        if(id == null){localStorage.setItem("id", 0);}
    }
    gravarDespesa(despesa){
        localStorage.setItem(this.getNextId(), JSON.stringify(despesa));
    }
    getNextId(){
        let nextId = parseInt(localStorage.getItem("id")) + 1;
        localStorage.setItem("id", nextId);
        return nextId;
    }
    
    recuperaDados(){
        let id = localStorage.getItem("id");
        let despesas_vec = Array();

        for(let i=1; i<=id; i++){
            let despesa = JSON.parse(localStorage.getItem(i));
            if(despesa != null){
                despesa.id = i;
                despesas_vec.push(despesa);
            }
        }
        return despesas_vec;
    }

    pesquisar(despesa){
        let despesas_filtradas = this.recuperaDados();

        despesas_filtradas = despesas_filtradas.filter((d) =>{
            if(despesa.ano == '' || d.ano == despesa.ano){return true;}
            else{return false;}
        })
        despesas_filtradas = despesas_filtradas.filter((d) =>{
            if(despesa.mes == '' || d.mes == despesa.mes){return true;}
            else{return false;}
        })
        despesas_filtradas = despesas_filtradas.filter((d) =>{
            if(despesa.dia == '' || d.dia == despesa.dia){return true;}
            else{return false;}
        })
        despesas_filtradas = despesas_filtradas.filter((d) =>{
            if(despesa.tipo == '' || d.tipo == despesa.tipo){return true;}
            else{return false;}
        })
        despesas_filtradas = despesas_filtradas.filter((d) =>{
            if(despesa.descricao == '' || d.descricao == despesa.descricao){return true;}
            else{return false;}
        })
        despesas_filtradas = despesas_filtradas.filter((d) =>{
            if(despesa.valor == '' || d.valor == despesa.valor){return true;}
            else{return false;}
        })

        return despesas_filtradas;
    }

    remover(id){
        localStorage.removeItem(id);
    }
};

let bd = new Bd();

function cadastrarDespesa(){
    let dia = document.getElementById("dia");
    let mes = document.getElementById("mes");
    let ano = document.getElementById("ano");
    let tipo = document.getElementById("tipo");
    let descricao = document.getElementById("descricao")
    let valor = document.getElementById("valor");

    let desp = new Despesa(dia.value, mes.value, ano.value, tipo.value, descricao.value, valor.value);
    
    if(desp.checkData() == true){
        bd.gravarDespesa(desp); 
        alert('Dados inseridos com sucesso!');

        dia.value = '';
        mes.value = '';
        ano.value = '';
        tipo.value = '';
        descricao.value = '';
        valor.value = '';
    }
    else{alert('Dados inseridos incorretamente!');}
}   

function carregaDespesas(despesas = Array(), filtro=false){
    if (despesas.length == 0 && filtro == false){despesas = bd.recuperaDados(); } //Apresenta objetos genéricos, e não da classe Despesa.
    let lista_despesas = document.getElementById("lista-despesas"); lista_despesas.innerHTML = '';
    
    
    for(let i=0; i<despesas.length; i++){
        let linha = lista_despesas.insertRow();
        linha.insertCell(0).innerHTML = `${despesas[i].dia}/${despesas[i].mes}/${despesas[i].ano}`;
        switch(parseInt(despesas[i].tipo)){
            case 1:{linha.insertCell(1).innerHTML = "Alimentação";} break;
            case 2:{linha.insertCell(1).innerHTML = "Educação";} break;
            case 3:{linha.insertCell(1).innerHTML = "Lazer";} break;
            case 4:{linha.insertCell(1).innerHTML = "Saúde";} break;
            case 5:{linha.insertCell(1).innerHTML = "Transporte";} break;
        } 
        linha.insertCell(2).innerHTML = despesas[i].descricao;
        linha.insertCell(3).innerHTML = despesas[i].valor;

        let btn = document.createElement("button");
        btn.className = 'btn btn-danger';
        btn.innerHTML = '<i class="fa fa-times"></i>';
        btn.id = 'id_despesa_' + despesas[i].id;
        btn.onclick = () => {
            let id = btn.id.replace('id_despesa_', '')
            bd.remover(id);
            window.location.reload();
        }
        linha.insertCell(4).append(btn);
    }
}

function pesquisarDespesas(){
    let dia = document.getElementById("dia").value;
    let mes = document.getElementById("mes").value;
    let ano = document.getElementById("ano").value;
    let tipo = document.getElementById("tipo").value;
    let descricao = document.getElementById("descricao").value;
    let valor = document.getElementById("valor").value;

    let despesa = new Despesa(dia, mes, ano, tipo, descricao, valor);
    
    let despesas = bd.pesquisar(despesa); //Apresenta objetos genéricos, e não da classe Despesa.
    carregaDespesas(despesas, true);
}