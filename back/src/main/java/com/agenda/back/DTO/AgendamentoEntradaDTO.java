package com.agenda.back.DTO;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AgendamentoEntradaDTO {

    private String titulo;
    private String descricao;
    private LocalDateTime dataHora;
    private String local;

}



