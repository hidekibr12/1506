const atividades = require("../models/atividades");
module.exports = (app) => {
  app.post("/atividades", async (req, res) => {
    var dados = req.body;
    // return console.log(dados)
    //conectar o database
    const database = require("../config/database")();
    const atividades = require("../models/atividades");
    var gravar = await new atividades({
      data: dados.data,
      tipo: dados.tipo,
      entrega: dados.entrega,
      disciplina: dados.disciplina,
      usuario: dados.id,
      instrucoes: dados.orientacoes,
      titulo: dados.titulo,
    }).save();
    //buscar as atividades do usuario
    var buscar = await atividades.find({ usuario: dados.id })
    //recarregar a pagina de atividades
    res.redirect("/atividades?id=" + dados.id)
  })
  app.get("/atividades", async (req, res) => {
    //listar todas as ativades do usuario logado
    var user = req.query.id
    if (!user) {
      res.redirect("/login")
    }
    var usuario = require("../models/usuarios")
    var atividades = require("../models/atividades")
    var dadosUser = await usuario.findOne({ _id: user })
    var dadosAberto = await atividades.find({ usuario: user,status:"0" }).sort({data:1})
    var dadosEntregue = await atividades.find({ usuario: user,status:"1" }).sort({data:1})
    var dadosExcluido = await atividades.find({ usuario: user,status:"2" }).sort({data:1})

    res.render("atividades.ejs", {nome: dadosUser.nome,id: dadosUser._id,dadosAberto,dadosEntregue,dadosExcluido})
    //res.render("atividades.ejs", {nome: dadosUser.nome,id: dadosUser._id,lista: dadosAtividades,})
  })
  app.get("/excluir", async (req, res) => {
    //qual documento sera excluido da colletion ativadades??
    var doc = req.query.id
    // excluir o documento
    var excluir = await atividades.findOneAndUpdate(
      {_id:doc},
      {status:"2"}
    )
    //voltar para a lista de atividades
    res.redirect("/atividades?id=" + excluir.usuario)
    
  })

  //rota desfazer
  app.get('/desfazer', async (req, res) => {
    //qual documento sera  da colletion ativadades??
    var doc = req.query.id
    // excluir o documento
    var desfazer = await atividades.findOneAndUpdate(
      {_id:doc},
      {status:"0"}
    )
    //voltar para a lista de atividades
    res.redirect('/atividades?id=' + desfazer.usuario)
    
  })
}
