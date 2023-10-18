const express = require('express');

const app = express();
const router = express.Router();

// const upload = require('../helpers/upload/uploadImagem');
// const deleteImage = require('../helpers/upload/deleteImagem');
const livro = require('../model/Livro');

router.post('/livro/cadastrarLivro', (req, res)=>{

    const { titulo, preco, imagem_peq, imagem_grd, detalhes, codigo_categoria } = req.body;

    livro.create(
        {
            titulo,
            preco,
            imagem_peq,
            imagem_grd,
            detalhes,
            codigo_categoria

        }
    ).then(
        ()=>{
            return res.status(201).json({
                erroStatus:false,
                mensagemStatus:'Livro inserido com sucesso.'
            });      
        }
    ).catch((erro)=>{
        return res.status(400).json({
            erroStatus: true,
            erroMensagem: erro
        });
    });

});

router.get('/livro/listarLivro', (req, res)=>{

    livro.findAll()
        .then((livros)=>{
            return res.status(200).json(livros)
        }).catch((erro)=>{
            return res.status(400).json({
                erroStatus: true,
                erroMensagem: erro
            });
        });
});

router.get('/livro/listarLivroCodigo/:codigo_livro', (req, res)=>{

    const { codigo_livro } = req.params

    livro.findByPk(codigo_livro)
        .then((livro)=>{
            return res.status(200).json(livro)
        }).catch((erro)=>{
            return res.status(400).json({
                erroStatus: true,
                erroMensagem: erro
            });
        });
});

router.delete('/livro/excluirLivro/:codigo_livro', (req, res)=>{

    const { codigo_livro } = req.params;


            livro.destroy({
                where:{codigo_livro}
            }).then(
                ()=>{
                    
                    return res.status(200).json({
                        erroStatus:false,
                        mensagemStatus:'Livro excluído com sucesso.'
                    });

                }).catch((erro)=>{
                    return res.status(400).json({
                        erroStatus: true,
                        erroMensagem: erro
                    });
                });

});

router.put('/livro/editarLivro', (req, res)=>{

    const { titulo, preco, detalhes, codigo_categoria, imagem_peq, imagem_grd, codigo_livro } = req.body;

       

        

            /** UPDATE SEM IMAGEM **/
            livro.update(
                {titulo,
                preco,
                detalhes,
                imagem_peq,
                imagem_grd,
                codigo_categoria},
                {where: {codigo_livro}}
            ).then(
                ()=>{
                    return res.status(200).json({
                        erroStatus:false,
                        mensagemStatus:'Livro alterado com sucesso.'
                    });
                }).catch((erro)=>{
                    return res.status(400).json({
                        erroStatus: true,
                        erroMensagem: erro
                    });
                });
        

});

module.exports = router;