import prompt from "prompt-sync";
import {Banco} from "./Banco.js"
import {Conta, Poupanca} from "./Conta.js"
import { AplicacaoError, EntradaDeCaracteresDeTexto, EntradaNumerica, EntradaVazia,ContaInexistenteError } from "./Excecoes.js";

//>>>>>>>>>>>>>>>>>>MENU APP.JS<<<<<<<<<<<<<<<<<<<<<<

let input = prompt();

function validarTexto(texto:string){
    if(texto==""){
        throw new EntradaVazia("nao ha caracteres digitados!!!")
    }
    if(isNaN(Number(texto))==false){
        throw new EntradaNumerica("Entrada de texto invalida!")
    }
}

function validarNumero(numero:string){
    
    if(isNaN(Number(numero))){
        throw new EntradaDeCaracteresDeTexto("Entrada contem caracteres que nao sao numericos!")
    }
}


// FUNCAO DA OPCAO 1
export function cadrastrar(banco:Banco): void {
    try {
    console.log("\nCadastrar conta\n");
    let numero =input('Digite o número da conta:');
    validarNumero(numero)
    let titular=input('Digite o nome do(a) titular da conta: ')
    validarTexto(titular)
    let saldo=Number(input('Digite o saldo da conta (R$): '));
    validarNumero(""+saldo)
    let tipo_da_conta=Number(input('Digite o tipo da conta=> 0-Conta  1-Poupança:  '));
    validarNumero(""+tipo_da_conta)
    let conta: Conta;

    if(tipo_da_conta==0) conta=new Conta(numero,titular,Number(saldo))
    else                 conta=new Poupanca(numero,titular,Number(saldo),0)
   
    banco.inserir(conta)
    console.log("\n")
    console.log(banco)
    console.log("\n")
    banco.salvarEmArquivo()

    } catch (error:any) {
        console.log(error.message)
        cadrastrar(banco)
    }

    
}
   

// FUNCAO DA OPCAO 2

export function consultar(banco:Banco){
    let numero_da_conta=input("Digite o numero da conta:")
    let conta!:Conta
    
    for (const conta_atual of banco.getContas()) {
        if(conta_atual.getNumero()==numero_da_conta){
            conta=conta_atual
        }
    }
    if(conta==null){
       throw new ContaInexistenteError("A Conta consultada nao existe!!!")
    }

    return conta
}

// FUNCAO DA OPCAO 3

export function sacar(banco:Banco){
    try {
        let id_conta_saque=input("Digite o id da conta: ")
        validarNumero(id_conta_saque)
        let valor_saque=Number(input("Digite o valor do saque (R$): "))
        validarNumero(""+valor_saque)
        let conta_pesquisada=banco.consultar(id_conta_saque)
        conta_pesquisada.sacar(valor_saque)

    } catch (error:any) {
        console.log(error.message)
        sacar(banco)
    }
      
}


// FUNCAO DA OPCAO 4

export function depositar(banco:Banco){
    try {
        let id_conta_deposito=input("Digite o id da conta: ")
        validarNumero(id_conta_deposito)
        let valor_deposito=Number(input("Digite o valor do deposito (R$): "))
        validarNumero(""+valor_deposito)
        let conta_pesquisada=banco.consultar(id_conta_deposito)
        conta_pesquisada.depositar(valor_deposito)
    
    } catch (error:any) {
        console.log(error.message)
        sacar(banco)
    }
}


// FUNCAO DA OPCAO 5

export function excluir_conta(banco:Banco){
    try {
        let id_conta_a_ser_excluida=input("Digite o id da conta: ")
        banco.consultar(id_conta_a_ser_excluida)
        banco.excluir(id_conta_a_ser_excluida)
    } catch (error:any){
        console.log(error.message)
        sacar(banco)
    }
    
}


// FUNCAO DA OPCAO 6

export function realizar_deposito(banco:Banco){
    try {
        let id_conta_origem=input("Digite o id da conta origem: ")
        validarNumero(id_conta_origem)
        let id_conta_destino=input("Digite o id da conta destino: ")
       validarNumero(id_conta_destino)
       let valor_da_transferencia=Number(input("Digite o valor a ser transferido (R$): "))
       validarNumero(""+valor_da_transferencia)

       let conta_origem=banco.consultar(id_conta_origem)
       let conta_destino=banco.consultar(id_conta_destino)
       conta_origem.sacar(valor_da_transferencia)
       conta_destino.depositar(valor_da_transferencia)
    } catch (error:any) {
        console.log(error.message)
        realizar_deposito(banco)
    }
    
}


// FUNCAO DA OPCAO 7

export function somar_dos_valores_das_contas_existentes(banco:Banco){

    return banco.somar_saldo_de_todas_as_contas()
}

// FUNCAO DA OPCAO 8

export function render_juros_em_uma_conta_poupanca(banco:Banco){
    try {
        let numero_da_conta_poupanca=input("Digite o numero da conta poupanca que sera aplicado os juros: ")
        validarNumero(numero_da_conta_poupanca)
        banco.renderJuros(numero_da_conta_poupanca)
        console.log(`Operacao de render juros na conta de numero ${numero_da_conta_poupanca} foi realizada com sucesso!!!`)
    } catch (error:any) {
        console.log(error.message)
    }
}

// FUNCAO DA OPCAO 9

export function salvar_os_dados_no_arquivo(banco:Banco){
    try {
        banco.salvarEmArquivo()

    } catch (error:any) {
        console.log(error.message)
    }
 }

// FUNCAO DA OPCAO 10

export function carregar_os_dados_a_partir_do_arquivo(banco:Banco){
    try {
        banco.carregarDeArquivo()
    } catch (error:any) {
        console.log(error.message)
    }
    
}
