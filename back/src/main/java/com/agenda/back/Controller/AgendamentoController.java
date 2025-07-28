package com.agenda.back.Controller;

import com.agenda.back.DTO.AgendamentoEntradaDTO;
import com.agenda.back.DTO.AgendamentoSaidaDTO;
import com.agenda.back.Service.AgendamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/agendamentos")
public class AgendamentoController {
    @Autowired
    private AgendamentoService service;

    @PostMapping
    public ResponseEntity<AgendamentoSaidaDTO> criar(@RequestBody AgendamentoEntradaDTO dto) {
        AgendamentoSaidaDTO novo = service.criar(dto);
        return ResponseEntity.ok(novo);
    }

    @GetMapping
    public ResponseEntity<List<AgendamentoSaidaDTO>> listarTodos() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AgendamentoSaidaDTO> buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AgendamentoSaidaDTO> atualizar(@PathVariable Long id,
                                                         @RequestBody AgendamentoEntradaDTO dto) {
        return service.atualizar(id, dto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (service.deletar(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
