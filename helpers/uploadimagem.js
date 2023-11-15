const multer = require('multer');


const fileFilter = (req, file, cb) => {
    // Verificando se os tipos da imagem correspondem ao permitido pela aplicação.
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        // callback
        cb(null, true);
    } else {
        cb(null, false)
    }
};


// DEFINIÇÃO DE USO DO MULTER
const upload = multer({
    // ONDE O ARQUIVO SERÁ GUARDADO ENQUANTO ESTIVER SENDO MANIPULADO;
    storage: multer.memoryStorage(),
    // Limitando a 5mb de dados disponiveis para envio de cada unidade (fotos).
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: fileFilter
});

module.exports = upload