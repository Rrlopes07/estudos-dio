import NaoEncontrado from '../errors/NaoEncontrado.js';
import { autores, livros } from '../models/index.js';

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const buscaLivros = await livros.find();

      req.result = buscaLivros;

      next();
    } catch (erro) {
      next(erro);
    }
  }

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultados = await livros
        .findById(id, {}, { autopopulate: false })
        .populate("autor");

      if (livroResultados !== null)
        res.status(200).send(livroResultados);
      else
        next(new NaoEncontrado('Id do livro não localizado'));
    } catch (erro) {
      next(erro);
    }
  }

  static cadastrarLivro = async (req, res, next) => {
    try {
      const livro = new livros(req.body);

      const livroResultado = await livro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  }

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndUpdate(id, { $set: req.body });

      if (livroResultado !== null)
        res.status(200).send({ message: 'Livro atualizado com sucesso' });
      else
        next(new NaoEncontrado('Id do livro não localizado'));
    } catch (erro) {
      next(erro);
    }
  }

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndDelete(id);

      if (livroResultado !== null)
        res.status(200).send({ message: 'Livro removido com sucesso' });
      else
        next(new NaoEncontrado('Id do livro não localizado'));
    } catch (erro) {
      next(erro);
    }
  }

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const livrosResultado = await livros.find(busca);

        req.result = livrosResultado;

        next();
      } else {
        res.status(200).send([]);
      }
    } catch (erro) {
      next(erro);
    }
  }

}

async function processaBusca(parametros) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;

  let busca = {};

  if (minPaginas || maxPaginas) busca.numeroPaginas = {};

  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };
  if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
  if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;
  if (nomeAutor) {
    const autor = await autores.findOne({ nome: new RegExp(nomeAutor, "i") });

    if (autor !== null)
      busca.autor = autor._id;
    else
      busca = null;
  }

  return busca;
}

export default LivroController;
