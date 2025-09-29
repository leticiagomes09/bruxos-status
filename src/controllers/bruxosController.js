import dados from "./../models/dados.js";
const { bruxos } = dados;

const getAllBruxos = (req, res) => {
 const { casa } = req.query;
    let resultado = bruxos;

    // Filtro por casa (busca parcial)
    if (casa) {
        resultado = resultado.filter(bruxo => 
            bruxo.casa.toLowerCase().includes(casa.toLowerCase())
        );
    }

    res.status(200).json({
        total: resultado.length,
        bruxos: resultado,
        message: "Lista de bruxos convocada com sucesso!"
    })
}

const getBruxosById = (req, res) => {
    let id = parseInt(req.params.id);

    const bruxo = bruxos.find(b => b.id === id);


if(!bruxo) {
     return res.status(404).json({
            success: false,
            message: "“Nenhum bruxo foi encontrado no Beco Diagonal!"
        });
}

    res.status(200).json({
        success: true,
        bruxo: bruxo
    });
}

const createBruxo = (req, res) => {
    const { nome, ano, varinha, mascote, patrono, especialidade, vivo, casa } = req.body;

    if (!nome || !casa) {
        return res.status(400).json({
        message: "Feitiço mal executado! Verifique os ingredientes."
        });
    }

    const novoBruxo = {
        id: bruxos.length + 1,
        nome: nome,
        casa: casa,
        ano: ano,
        especialidade: especialidade,
        varinha: varinha,
        vivo: vivo,
        mascote: mascote,
        patrono: patrono
    }

    bruxos.push(novoBruxo);

    res.status(201).json({
        success: true,
        message: "Novo bruxo matriculado em Hogwarts!",
        bruxo: novoBruxo
    });
}

const deleteBruxo = (req, res) => {
    let id = parseInt(req.parms.id);

    const bruxoPararemover = bruxos.find(b => b.id === id);

    if (!bruxoPararemover) {
        return res.status(404).json({
            success: false,
            message: "Este bruxo não existe!"
        });
    }

 const bruxosFiltrados = bruxos.filter(bruxo => bruxo.id !== id);

 bruxos.splice(0, bruxos.length, ...bruxosFiltrados);

 res.status(200).json({
    success: true,
    message: "O bruxo foi removido com sucesso!",
    bruxoRemovido: bruxoPararemover
 })

}

const updateBruxo = (req, res) => {
    const { id } = req.params;
    
    const {  nome, ano, varinha, mascote, patrono, especialidade, vivo, casa } = req.body;
   // Validar ID
   if (isNaN(id)) {
    return res.status(400).json({
        success: false,
        message: "ID deve ser um número válido!"
    });
}

const idParaEditar = parseInt(id);

   // Verificar se bruxo existe
    const BruxoExiste = bruxos.find(b => b.id === idParaEditar);
    if (!BruxoExiste) {
        return res.status(404).json({
            success: false,
            message: "Não é possível reparar o que não existe!"
        });
    }

    // Atualizar bruxo usando map
    const bruxosAtualizados = bruxos.map(bruxos => 
        bruxos.id === idParaEditar 
            ? { 
                ...bruxos, 
                ...(nome && { nome }),
                ...(casa && { casa }),
                ...(ano&& { ano: parseInt(ano)}),
                ...(varinha && { varinha }),
                ...(mascote && { mascote }),
                ...(patrono && { patrono }),
                ...(especialidade && { especialidade }),
                ...(vivo && { vivo }),
               
              }
            : bruxos
    );

    // Atualizar array global
    bruxos.splice(0, bruxos.length, ...bruxosAtualizados);

    // Buscar bruxos atualizados para retorno
    const bruxoAtualizado = bruxos.find(b => b.id === idParaEditar);

    res.status(200).json({
        success: true,
        message: "Bruxo atualizado com sucesso!",
        bruxo: bruxoAtualizado
    });
};
export { getAllBruxos, getBruxosById, createBruxo, deleteBruxo, updateBruxo };