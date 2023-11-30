
## 1. Enumere os 3 tipos mais comuns de tratamento de erros e exemplifique com códigos seus ou pesquisados na internet.

## 2) Explique por que cada um dos 3 métodos acima possui limitações de uso.

>>1. DESCONSIDERAR A OPERAÇÃO
 public tranferir(contaOrigem:Conta,contaDestino:Conta,valor_a_ser_transferido:number){
        //consulta pela existencia das contas
        let consulta_pela_existencia_da_conta_origem=this.consultarPorIndice(contaOrigem.getNumero())
        let consulta_pela_existencia_da_conta_destino=this.consultarPorIndice(contaDestino.getNumero())
       
        //verifica se as 2 contas existem ao mesmo tempo
        let verificar_se_as_duas_contas_existem:boolean=consulta_pela_existencia_da_conta_origem!=-1 && consulta_pela_existencia_da_conta_destino!=-1 
        
        if(verificar_se_as_duas_contas_existem){
           contaOrigem.transferir(contaDestino,valor_a_ser_transferido)
            
        }
    }

**Limitacoes: não há como saber se a operacao funcionou**


>>2. EXIBIR UMA MENSAGEM DE ERRO.
 public tranferir(contaOrigem:Conta,contaDestino:Conta,valor_a_ser_transferido:number){
        //consulta pela existencia das contas
        let consulta_pela_existencia_da_conta_origem=this.consultarPorIndice(contaOrigem.getNumero())
        let consulta_pela_existencia_da_conta_destino=this.consultarPorIndice(contaDestino.getNumero())
       
        //verifica se as 2 contas existem ao mesmo tempo
        let verificar_se_as_duas_contas_existem:boolean=consulta_pela_existencia_da_conta_origem!=-1 && consulta_pela_existencia_da_conta_destino!=-1 
        
        if(verificar_se_as_duas_contas_existem){
           contaOrigem.transferir(contaDestino,valor_a_ser_transferido)
            
        }
        else{
             console.log("Erro ao realizar a transferencia")
        }
    }

**Limitacoes: informacao limitada a interface do console de texto ou interface gráfica**

>>3. RETORNAR UM CÓDIGO DE ERRO.
   transferir(contaDestino: Conta, valor: number): boolean {

        if (!this.sacar(valor)) {
            return false;
        }

        contaDestino.depositar(valor);
        return true;
    }
**Limitacoes: nescessidade de reservar valores para o retorno e conflitos em saber se o valor retornado eh um erro ou um valor calculado na funcao**



