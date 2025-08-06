import mongoose from 'mongoose';

const UrlSchema = new mongoose.Schema(
{

    orignam_url:{
        type: String,
        required: true
    },
    short_url: {
        type: Number,
        required: true,
        unique: true,
        autoIncrement: true        
    },
}

);

let Url = mongoose.model('Url', UrlSchema);

export default Url;