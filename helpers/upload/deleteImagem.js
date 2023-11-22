const {initializeApp}  = require('firebase/app');
const { getStorage, ref, deleteObject} = require('firebase/storage');



/* DADOS DE ACESSO AO FIREBASE */
const firebaseConfig = require('../../Config/firebase')
/* INICIALIZAÇÃO DO FIREBASE */
const firebaseApp = initializeApp(firebaseConfig);

/* INICIALIZAÇÃO DO STORAGE DO FIREBASE */
const storage = getStorage(firebaseApp);

const deleteImage = (imagem)=>{

    const deleteRef = ref(storage, imagem);

    deleteObject(deleteRef)
    .then(()=>{
        console.log('IMAGEM EXCLUÍDA COM SUCESSO!');
    })
    .catch((error)=>{
        console.log('ERRO AO EXCLUIR IMAGEM!');
    });

}

module.exports = deleteImage;