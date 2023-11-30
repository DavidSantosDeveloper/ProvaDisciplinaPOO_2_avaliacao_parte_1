import {Conta, Poupanca,ContaImposto} from "./Conta.js"
import { CarregarArquivoError, ContaInexistenteError, PoupancaInvalidaError, SalvarEmArquivoError } from "./Excecoes.js";
import * as fs from 'fs';


export class Banco {
   private contas: Conta[] = []
   private CAMINHO_ARQUIVO: string = "../contas.txt";

   constructor(){
     
   }

    public inserir(conta: Conta): void {
        try {
            let retorno_da_pesquisa_pelo_numero_da_conta=this.consultar(conta.getNumero())
            
        } catch (error) {
             
            this.contas.push(conta);
            console.log(`Conta cadastrada!!!`)
            //this.salvarEmArquivo()
        }
      
    }
    

    public consultar(numero: string): Conta {
        let contaProcurada!: Conta;

        for (let i: number = 0; i < this.contas.length; i++) {
            if (this.contas[i].getNumero() == numero) {
                contaProcurada = this.contas[i];
                break;
            }
        }
        if(contaProcurada==null){
            throw new ContaInexistenteError("Conta nao encontrada!")
        }

        return contaProcurada;
    }

    private consultarPorIndice(numero: string): number {
        let indiceProcurado: number = -1;

        for (let i: number = 0; i < this.contas.length; i++) {
            if (this.contas[i].getNumero()== numero) {
                indiceProcurado = i;
                break;
            }
        }

        if(indiceProcurado==-1){
            throw new ContaInexistenteError("Conta nao encontrada!")
        }


        return indiceProcurado;
    }

    public alterar(conta: Conta): void {
        let indiceProcurado: number =this.consultarPorIndice(conta.getNumero());
        
        this.contas[indiceProcurado] = conta;
    }

    public excluir(numero: string): void {
        let indiceProcurado = this.consultarPorIndice(numero);

            for (let i = indiceProcurado; i < this.contas.length; i++) {
                this.contas[i] = this.contas[i+1];
            }
            this.contas.pop();
    }

    public sacar(numero: string, valor: number): void {
        let indiceProcurado: number = this.consultarPorIndice(numero);
         let conta: Conta = this.contas[indiceProcurado];
        conta.sacar(valor);
    }

    public tranferir(contaOrigem:Conta,contaDestino:Conta,valor_a_ser_transferido:number){
        //consulta pela existencia das contas
        let consulta_pela_existencia_da_conta_origem=this.consultarPorIndice(contaOrigem.getNumero())
        let consulta_pela_existencia_da_conta_destino=this.consultarPorIndice(contaDestino.getNumero())
        contaOrigem.transferir(contaDestino,valor_a_ser_transferido)
    }

    public renderJuros(numero_da_conta_poupanca:string):number{
        let resultado_da_consulta_pela_conta:Conta=this.consultar(numero_da_conta_poupanca)

        if(resultado_da_consulta_pela_conta instanceof Poupanca==false) {
            throw new PoupancaInvalidaError("A conta nao eh poupanca!!!");
            
        }
        else{
          let saldo_da_conta_antes_dos_juros=resultado_da_consulta_pela_conta.getSaldo()
          let conta_convertida_para_poupanca=(<Poupanca> resultado_da_consulta_pela_conta).renderJuros()
          let valor_dos_juros=resultado_da_consulta_pela_conta.getSaldo()-saldo_da_conta_antes_dos_juros
          return valor_dos_juros
        }
    }

    public contar_quantidade_de_contas():number{
        return this.contas.length
    }

    public somar_saldo_de_todas_as_contas(): number{
        let soma_saldo:number=0

        for (const conta_atual of this.contas) {
            soma_saldo+=conta_atual.getSaldo()
        }

        return soma_saldo
    }

    public calcular_media_dos_saldos_das_contas():number{

        return this.somar_saldo_de_todas_as_contas() / this.contar_quantidade_de_contas()
    }


    public getContas(){
        return this.contas
    }
    public setContas(novas_contas:Conta[]){
        this.contas=novas_contas
    }

    public carregarDeArquivo() {
		
        try {
            const arquivo: string = fs.readFileSync(this.CAMINHO_ARQUIVO, 'utf-8');
            if(arquivo!=""){
            const linhas: string[] = arquivo.split('\r\n');
		    console.log("Iniciando leitura de arquivo");
            for (let i: number = 0; i < linhas.length; i++) {
			let linhaConta: string[] = linhas[i].split(";");
			let conta!: Conta;
			let tipo: string  = linhaConta[3];
			if (tipo == 'C') {
				conta = new Conta(linhaConta[0],linhaConta[1], Number(linhaConta[2]));
			} else if (tipo == 'CP') {
				conta = new Poupanca(linhaConta[0],linhaConta[1], Number(linhaConta[2]),Number(linhaConta[4]));
			} else if (tipo == 'CI') {
				conta = new ContaImposto(linhaConta[0],linhaConta[1], Number(linhaConta[1]),Number(linhaConta[4]));
			}

			this.inserir(conta);
			console.log(`Conta ${conta.getNumero()} carregada`);
            }
            console.log("fim do arquivo")
		    //const linhas: string[] = arquivo.split('\n');
		    
		}
        
        } catch (error) {
            throw new CarregarArquivoError("Erro ao carregar o arquivo!!!")
        }
	}

	public salvarEmArquivo() {
        try {
		console.log("Iniciando a gravação de contas em arquivo.")
		let stringContas: string = "";
		let linha: string = "";

		for (let conta of this.contas) {
			if (conta instanceof Poupanca) {
				linha = `${conta.getNumero()};${conta.getNome()};${conta.getSaldo()};CP;${conta.getTaxaJuros()}\r\n`;
			} else if ((conta instanceof ContaImposto)) {
				linha = `${conta.getNumero()};${conta.getNome()};${conta.getSaldo()};CI;${conta.getTaxaImposto()}\r\n`;
			} else {
				linha = `${conta.getNumero()};${conta.getNome()};${conta.getSaldo()};C\r\n`;
			}

			stringContas += linha;
		}
		//deleta os últimos \r\n da string que vai pro arquivo, evitando que grave uma linha vazia
		stringContas = stringContas.slice(0,stringContas.length-2);

		fs.writeFileSync(this.CAMINHO_ARQUIVO, stringContas,'utf-8');
		console.log("Contas salvas em arquivo.")
	    }

       catch (error) {
            throw new SalvarEmArquivoError("Erro ao salvar os dados no arquivo!!!")
       }
}

}
