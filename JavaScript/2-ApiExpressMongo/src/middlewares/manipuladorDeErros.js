import mongoose from "mongoose";
import ErroBase from "../errors/ErroBase.js";
import RequisicaoIncorreta from "../errors/RequisicaoIncorreta.js";
import ErroValidacao from "../errors/ErroValidacao.js";

function manipuladorDeErros(erro, req, res, next) {
    console.log(erro);

    if (erro instanceof mongoose.Error.CastError)
        new RequisicaoIncorreta().enviarResposta(res);
    else if (erro instanceof mongoose.Error.ValidationError)
        new ErroValidacao(erro).enviarResposta(res);
    else if (erro instanceof ErroBase)
        erro.enviarResposta(res);
    else
        new ErroBase().enviarResposta(res);
}

export default manipuladorDeErros;