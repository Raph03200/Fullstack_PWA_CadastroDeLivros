const express = require('express');
const router = express.Router();
const Livro = require('../models/Livro');

// Criar uma nova reclamação
router.post('/', async (req, res) => {
    const { titulo, autor, anoLancamento, genero } = req.body;
    const newLivro = new Livro({ titulo, autor, anoLancamento, genero  });
    await newLivro.save();
    res.json(newLivro);
});

// Listar todas as reclamações
router.get('/', async (req, res) => {
    const livros = await Livro.find();
    res.json(livros);
});

// Atualizar uma reclamação
router.put('/:id', async (req, res) => {
    const { titulo, autor, anoLancamento, genero  } = req.body;
    const updatedLivro = await Livro.findByIdAndUpdate(req.params.id, { titulo, autor, anoLancamento, genero  }, { new: true });
    res.json(updatedLivro);
});

// Deletar uma reclamação
router.delete('/:id', async (req, res) => {
    await Livro.findByIdAndDelete(req.params.id);
    res.json({ message: 'Livro deletado com sucesso!' });
});

module.exports = router;
