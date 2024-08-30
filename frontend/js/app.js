const API_URL = 'http://localhost:3000/api/livro';

document.getElementById('livroForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const anoLancamento = document.getElementById('anoLancamento').value;
    const genero = document.getElementById('genero').value;

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ titulo, autor, anoLancamento, genero })
    });

    const livro = await response.json();
    appendLivro(livro);

    document.getElementById('titulo').value = '';
    document.getElementById('autor').value = '';
    document.getElementById('anoLancamento').value = '';
    document.getElementById('genero').value = '';
});

async function loadLivros() {
    const response = await fetch(API_URL);
    const livros = await response.json();
    livros.forEach(appendLivro);
}

function appendLivro(livro) {
    const li = document.createElement('li');
    li.innerHTML = `
        <strong>${livro.titulo}</strong>
        <p>${livro.autor}</p>
        <p>${livro.anoLancamento}</p>
        <p>${livro.genero}</p>
        <button onclick="deleteLivro('${livro._id}')">Deletar</button>
    `;
    document.getElementById('livroList').appendChild(li);
}

async function deleteLivro(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    document.location.reload();
}

loadLivros();
