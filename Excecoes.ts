export class AplicacaoError extends Error {
    constructor(message: string) {
    super(message);
    }
   
}
export class ContaInexistenteError extends AplicacaoError {
    constructor(message: string) {
    super(message);
    }
   
}

export class SaldoInsuficienteError extends AplicacaoError {
    constructor(message: string) {
    super(message);
    }
   
}

export class ValorInvalidoError extends AplicacaoError {
    constructor(message: string) {
    super(message);
    }
   
}

export class PoupancaInvalidaError extends AplicacaoError {
    constructor(message: string) {
    super(message);
    }
   
}



//>>>>>>>>>>>>>>>>>>>>>>>>VALIDACAO
export class EntradaVazia extends AplicacaoError {
    constructor(message: string) {
    super(message);
    }
   
}
export class EntradaDeCaracteresDeTexto extends AplicacaoError {
    constructor(message: string) {
    super(message);
    }
   
}
export class EntradaNumerica extends AplicacaoError {
    constructor(message: string) {
    super(message);
    }
   
}

//>>>>>>>>>>>>>>>>>>>>>>ARQUIVOS 
export class SalvarEmArquivoError extends AplicacaoError {
    constructor(message: string) {
    super(message);
    }
   
}
export class CarregarArquivoError extends AplicacaoError {
    constructor(message: string) {
    super(message);
    }
   
}




