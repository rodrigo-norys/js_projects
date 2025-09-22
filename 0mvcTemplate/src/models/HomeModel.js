import mongoose from "mongoose";

// Definindo a "tabela".
const HomeSchema = new mongoose.Schema({
    titulo: { type:String, required: true},
    descricao: { type:String }
});

// Vai me permitir executar queries.
const HomeModel = mongoose.model('Home', HomeSchema);

export default class Home {

}