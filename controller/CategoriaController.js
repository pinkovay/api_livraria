const express = require("express");

const categoriaModel = require("../model/Categoria");
const Categoria = require("../model/Categoria");

// Classe do express, gerenciador de rotas, permite que crie e gerencie minhas rotas
const router = express.Router();


//ROTA DE INSERÇÃO DE CATEGORIA

router.post("/categoria/cadastrarCategoria", (req, res) => {

    let { nome_categoria } = req.body;

    //console.log(req.body)

    categoriaModel.create({ nome_categoria })
        .then(() => {
            return res.status(201).json({
                errorStatus: false,
                messageStatus: `Categoria ${nome_categoria} inserida com sucesso!`
            })
        })
        .catch(((error) => {
            return res.status(500).json({
                errorStatus: true,
                messageStatus: `ERRO ENCONTRADO: ${error}`
            });
        }));
});

// ROTA DE LISTAR CATEGORIA
router.get("/categoria/listarCategoria", (req, res) => {
    categoriaModel.findAll()
        .then(
            (categorias) => {
                return res.status(200).json(categorias);
            }
        )
        .catch(((error) => {
            return res.status(500).json({
                errorStatus: true,
                messageStatus: `ERRO ENCONTRADO: ${error}`
            });
        }));
});

// ROTA DE BUSCA
router.get("/categoria/listarID/:codigo_categoria", (req, res) => {

    let { codigo_categoria } = req.params;

    categoriaModel.findByPk(codigo_categoria)
        .then(
            (categoria) => {
                return res.status(200).json(
                    `O código [${codigo_categoria}] faz referência a categoria: ${categoria.nome_categoria}`
                )
            }
        )
        .catch(((error) => {
            return res.status(500).json({
                errorStatus: true,
                messageStatus: `ERRO ENCONTRADO: ${error}`
            });
        }));
});


//ROTA DE ALTERAÇÃO DE CATEGORIA

router.put('/categoria/alterarCategoria', (req, res) => {

    let { codigo_categoria, nome_categoria } = req.body;

    categoriaModel.update(
        { nome_categoria },
        { where: { codigo_categoria } }
    )
        .then(
            () => {
                return res.status(200).json({
                    errorStatus: false,
                    messageStatus: "Categoria alterada com sucesso"
                })
            })
        .catch(
            (error) => {
                return res.status(500).json({
                    errorStatus: true,
                    messageStatus: error
                });
            });
});


//ROTA DE EXCLUSÃO DE CATEGORIA

    router.delete('/categoria/excluirCategoria/:codigo_categoria', (req, res)=>{

        let{codigo_categoria} = req.params;

        categoriaModel.destroy(
            {where:{codigo_categoria}}
        )
        .then(
            ()=>{
                return res.status(200).json({
                    errorStatus:false,
                    messageStatus: "Categoria excluída com sucesso!"
                })
            })
        .catch(
            (error)=>{
                return res.status(500).json({
                    errorStatus:true,
                    messageStatus: error
                });
            });

    });

 
module.exports = router;