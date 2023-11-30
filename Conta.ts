import { PoupancaInvalidaError ,ValorInvalidoError} from "./Excecoes.js";

export class Conta {
    private numero: string;
    private nome: string
    private saldo: number;

    constructor(numero: string, nome: string, saldo: number=0) {
        this.numero = numero;
        this.nome = nome;
       // if(saldo<0){
           //throw new SaldoInsuficienteError("valor de saldo inicial invalido!");

       // }
        this.saldo=0
        this.saldo = this.depositar(saldo) || 0;
    }

    private validar_valor(valor:number){
        if(valor<0){
            throw new ValorInvalidoError("Valor invalido!");
            
        }
    }
    depositar(valor: number) {
        /*
        if(valor<0){
            throw new ValorInvalidoError("valor de deposito invalido!");
            
        }
        */
       this.validar_valor(valor)
       return this.saldo = this.saldo + valor;
    }

    //>>>>>>>>>>>>>>   QUESTAO 03
    sacar(valor: number):void{
      /*  
      if (this.saldo - valor < 0) {
            throw new SaldoInsuficienteError("Saldo insuficiente!");
       }
        */
        this.saldo = this.saldo - valor;
    }

    consultarSaldo(): number {
        return this.saldo;
    }

    //>>>>>>>>>>>>>>>>>>>> QUESTAO 04 - FOI LANÇADO UMA EXCECAO POR CAUSA DO SALDO INSUFICIENTE
    transferir(contaDestino: Conta, valor: number) {
        contaDestino.depositar(valor);
    
    }

    // ATRIBUTO  NUMEROS
    getNumero():string{
        return this.numero
    }
    setNumero(novo_numero:string){
       this.numero=novo_numero
    }

    // ATRIBUTO  NOME
    getNome():string{
        return this.nome
    }
    setNome(novo_nome:string){
       this.nome=novo_nome
    }

    // ATRIBUTO  SALDO
    getSaldo():number{
        return this.saldo
    }
    setSaldo(novo_saldo:number){
       this.saldo=novo_saldo
    }
}


export class Poupanca extends Conta{
    private taxaJuros: number=0;

    constructor(numero: string,nome:string, saldo: number,taxaJuros: number ) {
        super(numero,nome,saldo);

        this.taxaJuros = taxaJuros;
    }

    public renderJuros(): void {
        this.depositar(this.getSaldo() * this.taxaJuros/100);
    }

    public getTaxaJuros():number{
        return this.taxaJuros
    }
    public setTaxaJuros(nova_taxa_juros:number):void{
        this.taxaJuros=nova_taxa_juros
    }

}

export class ContaImposto extends Conta{
    private _taxaDesconto: number;
    constructor(numero: string,nome:string, saldo: number,taxaDeDesconto: number) {

        super(numero,nome,saldo);
        this._taxaDesconto = taxaDeDesconto;
    }

    getTaxaImposto(){
        return this._taxaDesconto
    }
}