import prompt from "prompt-sync";
import {Banco} from "./Banco.js"
import {Conta} from "./Conta.js"
import { AplicacaoError } from "./Excecoes.js";
import {cadrastrar,carregar_os_dados_a_partir_do_arquivo,consultar, depositar, excluir_conta, realizar_deposito, render_juros_em_uma_conta_poupanca, sacar, salvar_os_dados_no_arquivo, somar_dos_valores_das_contas_existentes} from './funcoes_auxiliares_app.js'



//criacao do input
let input = prompt();
var banco:Banco=banco= new Banco();
//criacao do banco
try {
    banco.carregarDeArquivo()
} catch (error:any) {
   console.log(error.message)   
}
//MENU DE OPCOES
let opcao: String = '';



            do {

            console.log(` 
            >>>>>>>>>>>>>>Bem vindo<<<<<<<<<<<< 
            -Digite uma opção:
            
            `)
            console.log(`
            1 - Cadastrar 
            2 - Consultar 
            3 - Sacar
            4 - Depositar 
            5 - Excluir 
            6 - Transferir
            7 – Totalizações
            8-Render Juros
            9-Salvar em arquivo
            10-Carregar arquivo
            0 - Sair  \n`)
            opcao = input("Opção:");
            
            try{
                switch (opcao) {
                    
                    case "1":
                        cadrastrar(banco);
                    break

                    case "2":
                        let controle_pesquisa_de_contas:boolean=true
                        while(controle_pesquisa_de_contas){

                            try {
                                let conta_pesquisada=consultar(banco);
                                console.log(conta_pesquisada)
                                console.log("\n")
                            
                            } catch (error:any) {
                                console.log(error.message)
                            }
                            finally{
                                
                            }
                            
                            let pergunta=Number( input(`\n deseja pesquisar novamente? (1-SIM 0-NAO): \n`) )

                            if (pergunta==1) continue
                            else controle_pesquisa_de_contas=false
                                
                        }
                        

                        break;
                    case "3":
                        sacar(banco)                                   
                    break

                    case "4":
                       depositar(banco)                                 
                    break

                    case "5":
                        excluir_conta(banco)                                 
                    break

                    case "6":
                        
                        realizar_deposito(banco)
                                                
                    break

                    case "7":
                        console.log(`
                            Totalizacao dos valores (R$): ${somar_dos_valores_das_contas_existentes(banco)}
                        `)
                    break
                    case "8":
                        render_juros_em_uma_conta_poupanca(banco)
                        
                    break
                    case "9":
                        salvar_os_dados_no_arquivo(banco)
                    break

                    case "10":
                        carregar_os_dados_a_partir_do_arquivo(banco)
                    break

                    case "0":
                        salvar_os_dados_no_arquivo(banco)
                    break
                    
                }
            //...
            }
            catch(erro){
                if(erro instanceof AplicacaoError){
                  console.log(erro.message)
                }
                else{
                    console.log("Ocorreu um erro.contate o administrador!!!")
                }
                continue
            }
            finally{
                input("Operação finalizada. Digite <enter>");
            }
           
            } while (opcao != "0");

            banco.salvarEmArquivo()
            console.log("Aplicação encerrada");



