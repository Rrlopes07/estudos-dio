package br.com.clean.codechella.infra.gateways;

import br.com.clean.codechella.domain.entities.usuario.Usuario;
import br.com.clean.codechella.infra.persistency.UsuarioEntity;

public class UsuarioEntityMapper {

    public UsuarioEntity toEntity(Usuario usuario) {
        return new UsuarioEntity(usuario.getCpf(), usuario.getNome(), usuario.getNascimento(), usuario.getEmail());
    }

    public Usuario toDomain(UsuarioEntity entity) {
        return new Usuario(entity.getCpf(), entity.getNome(), entity.getNascimento(), entity.getEmail());
    }

}
