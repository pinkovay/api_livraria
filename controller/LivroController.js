const express = require('express');

const { initializeApp } = require('firebase/app')


// Importação dos pacotes do firebase;
const {
    getStorage,
    ref,
    getDownloadURL,
    uploadBytes,
    listAll,
    deleteObject
} = require('firebase/storage');



const app = express();
const router = express.Router();

const livros = require('../model/Livro')
const upload = require('../helpers/upload/uploadimagem')
const deleteImage = require('../helpers/upload/deleteImagem')


require("dotenv").config()

// FIREBASE: CONEXÃO E CONFIGURAÇÃO
const firebaseConfig = require('../Config/firebase')
// INICIALIZAR O FIREBASE;
const firebaseApp = initializeApp(firebaseConfig);

// CONECTANDO COM O STORAGE;
const storage = getStorage(firebaseApp);
// const deleteImage = require('../helpers/upload/deleteImagem');
const livro = require('../model/Livro');
// const { SNAPSHOT } = require('sequelize/types/table-hints');

router.post('/livro/cadastrarLivro', upload.array('files', 2), (req, res) => {

    const {
        titulo,
        preco,
        detalhes,
        codigo_categoria } = req.body;

    const files = req.files

    let imagem_peq_url;
    let imagem_peq;
    let imagem_grd_url;
    let imagem_grd;
    let cont = 0;

    files.forEach(file=>{

        // cont++;
        // console.log('ARQUIVO ' + cont);
        const fileName = Date.now().toString() + "-" + file.originalname;

        const fileRef = ref(storage, fileName);
        
        uploadBytes(fileRef, file.buffer)
            .then(
                (snapshot)=>{
                    imageRef = ref(storage, snapshot.metadata.name)
                    getDownloadURL(imageRef)
                        .then(
                            (urlFinal)=>{
                                if(cont == 0){
                                    // imagem pequena

                                    imagem_peq = fileName;
                                    imagem_peq_url = urlFinal;

                                    cont++

                                    console.log(`\nNOME DA IMAGEM PQN.: ${imagem_peq}`)
                                    console.log(`URL DA IMAGEM PQN.: ${imagem_peq_url}`)
                                } else{
                                    // imagem grande
                                    imagem_grd = fileName;
                                    imagem_grd_url = urlFinal;

                                    console.log(`\nNOME DA IMAGEM GRD.: ${imagem_grd}`)
                                    console.log(`URL DA IMAGEM GRD.: ${imagem_grd_url}`)
                                }

                                if(imagem_peq && imagem_grd){
                                    // FRAVAÇÃO DO LIVRO NO BANCO DE DADOS
                                    livro.create(
                                        {
                                            titulo,
                                            preco,
                                            imagem_grd,
                                            imagem_grd_url,
                                            imagem_peq,
                                            imagem_peq_url,
                                            detalhes,
                                            codigo_categoria
                                        }
                                    ).then(
                                        () => {
                                            return res.status(201).json({
                                                erroStatus: false,
                                                mensagemStatus: 'Livro inserido com sucesso.'
                                            });
                                        }
                                    ).catch((erro) => {
                                        return res.status(400).json({
                                            erroStatus: true,
                                            erroMensagem: erro
                                        });
                                    });

                                }
                            }
                        )
                }
            )
            .catch(
                (error)=>{
                    res.send(`ERRO: ${error}`)
                }
            )


});
});

router.get('/livro/listarLivro', (req, res) => {

    livro.findAll()
        .then((livros) => {
            return res.status(200).json(livros)
        }).catch((erro) => {
            return res.status(400).json({
                erroStatus: true,
                erroMensagem: erro
            });
        });
});

router.get('/livro/listarLivroCodigo/:codigo_livro', (req, res) => {

    const { codigo_livro } = req.params

    livro.findByPk(codigo_livro)
        .then((livro) => {
            return res.status(200).json(livro)
        }).catch((erro) => {
            return res.status(400).json({
                erroStatus: true,
                erroMensagem: erro
            });
        });
});

router.delete('/livro/excluirLivro/:codigo_livro', (req, res) => {

    const { codigo_livro } = req.params;

    livro.findByPk(codigo_livro)
        .then(
            (livro)=>{
                // console.log('IMAGEM PEQUENA' + livro.imagem_peq)
                // console.log('IMAGEM GRANDE' + livro.imagem_grd)
                deleteImage(livro.imagem_peq)
                deleteImage(livro.imagem_grd)
                livro.destroy({
                    where: { codigo_livro }
                }).then(
                    () => {
                        return res.status(200).json({
                            erroStatus: false,
                            mensagemStatus: 'Livro excluído com sucesso.'
                        });
                    }).catch((erro) => {
                        return res.status(400).json({
                            erroStatus: true,
                            erroMensagem: erro
                        });
                    });
            })

    // livro.destroy({
    //     where: { codigo_livro }
    // }).then(
    //     () => {

    //         return res.status(200).json({
    //             erroStatus: false,
    //             mensagemStatus: 'Livro excluído com sucesso.'
    //         });

    //     }).catch((erro) => {
    //         return res.status(400).json({
    //             erroStatus: true,
    //             erroMensagem: erro
    //         });
    //     });

});

router.put('/livro/editarLivro', (req, res) => {

    const { titulo, preco, detalhes, codigo_categoria, imagem_peq, imagem_grd, codigo_livro } = req.body;





    /** UPDATE SEM IMAGEM **/
    livro.update(
        {
            titulo,
            preco,
            detalhes,
            imagem_peq,
            imagem_grd,
            codigo_categoria
        },
        { where: { codigo_livro } }
    ).then(
        () => {
            return res.status(200).json({
                erroStatus: false,
                mensagemStatus: 'Livro alterado com sucesso.'
            });
        }).catch((erro) => {
            return res.status(400).json({
                erroStatus: true,
                erroMensagem: erro
            });
        });


});

module.exports = router;