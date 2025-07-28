package com.agenda.back.Service;

import com.agenda.back.DTO.AgendamentoEntradaDTO;
import com.agenda.back.DTO.AgendamentoSaidaDTO;
import com.agenda.back.Entity.Agendamento;
import com.agenda.back.Repository.AgendamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AgendamentoService {
    @Autowired
    private AgendamentoRepository repository;

    // CREATE
    public AgendamentoSaidaDTO criar(AgendamentoEntradaDTO dto) {
        Agendamento agendamento = new Agendamento();
        agendamento.setTitulo(dto.getTitulo());
        agendamento.setDescricao(dto.getDescricao());
        agendamento.setDataHora(dto.getDataHora());
        agendamento.setLocal(dto.getLocal());

        Agendamento salvo = repository.save(agendamento);
        return toDTO(salvo);
    }

    // READ ALL
    public List<AgendamentoSaidaDTO> listarTodos() {
        return repository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // READ BY ID
    public Optional<AgendamentoSaidaDTO> buscarPorId(Long id) {
        return repository.findById(id).map(this::toDTO);
    }

    // UPDATE
    public Optional<AgendamentoSaidaDTO> atualizar(Long id, AgendamentoEntradaDTO dto) {
        Optional<Agendamento> optional = repository.findById(id);
        if (optional.isPresent()) {
            Agendamento agendamento = optional.get();
            agendamento.setTitulo(dto.getTitulo());
            agendamento.setDescricao(dto.getDescricao());
            agendamento.setDataHora(dto.getDataHora());
            agendamento.setLocal(dto.getLocal());

            Agendamento atualizado = repository.save(agendamento);
            return Optional.of(toDTO(atualizado));
        } else {
            return Optional.empty();
        }
    }

    // DELETE
    public boolean deletar(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    // Conversor Entity -> DTO
    private AgendamentoSaidaDTO toDTO(Agendamento agendamento) {
        AgendamentoSaidaDTO dto = new AgendamentoSaidaDTO();
        dto.setId(agendamento.getId());
        dto.setTitulo(agendamento.getTitulo());
        dto.setDescricao(agendamento.getDescricao());
        dto.setDataHora(agendamento.getDataHora());
        dto.setLocal(agendamento.getLocal());
        return dto;
    }
}
