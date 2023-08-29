let { identificadorAula, instrutores, aulas } = require('../bancodedados');

const cadastrarAula = (req, res) => {
    const { idInstrutor } = req.params;
    const { titulo, descricao } = req.body;

    if (!titulo) {
        return res.status(400).json({ mensagem: 'O título é necessário' })
    }

    if (!descricao) {
        return res.status(400).json({ mensagem: 'A descrição é necessário' })
    }

    const instrutor = instrutores.find((instrutor) => {
        return instrutor.id === Number(idInstrutor);

    })

    if (!instrutor) {
        return res.status(404).json({ mensagem: 'O instrutor não existe' });
    };

    const aula = {
        id: identificadorAula++,
        instrutor_id: Number(idInstrutor),
        titulo,
        descricao
    }

    aulas.push(aula)

    return res.status(201).json(aula);

}

const listarAulas = (req, res) => {
    return res.status(200).json(aulas);

}

const obterAula = (req, res) => {
    const { id } = req.params;

    const aula = aulas.find((aula) => {
        return aula.id === Number(id);
    });

    if (!aula) {
        return res.status(404).json({ mensagem: 'aula não existe' });
    }
    return res.status(200).json(aula);


}

const obterAulasInstrutor = (req, res) => {
    const { idInstrutor } = req.params;

    const instrutor = instrutores.find((instrutor) => {
        return instrutor.id === Number(idInstrutor);

    })

    if (!instrutor) {
        return res.status(404).json({ mensagem: 'O instrutor não existe' });
    };


    const aulasEncontradas = aulas.filter((aulas) => {
        return aulas.instrutor_id === instrutor.id;
    });

    return res.status(200).json(aulasEncontradas);


}

module.exports = {
    cadastrarAula,
    listarAulas,
    obterAula,
    obterAulasInstrutor

}
