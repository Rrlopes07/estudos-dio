package com.estudo.med.api.domain.consulta.validacoes;

import com.estudo.med.api.domain.ValidacaoException;
import com.estudo.med.api.domain.consulta.DadosAgendamentoConsulta;
import org.springframework.stereotype.Component;

import java.time.DayOfWeek;

@Component
public class ValidadorHorarioFuncionamentoClinica implements ValidadorAgendamentoDeConsultas{

    public void validar(DadosAgendamentoConsulta dados) {
        var dataConsulta = dados.data();

        var domingo = dataConsulta.getDayOfWeek().equals(DayOfWeek.SUNDAY);
        var antesAberturaClinica = dataConsulta.getHour() < 7;
        var depoisEncerramentoClinica = dataConsulta.getHour() > 18;

        if (domingo || antesAberturaClinica || depoisEncerramentoClinica)
            throw new ValidacaoException("Consulta fora do horário de funcionamento da clínica!");
    }

}