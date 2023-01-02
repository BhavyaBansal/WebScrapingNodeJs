const express = require('express');
const app = express();
const getRoutes = require('./routes/getRoutes');
const ngrok = require('ngrok');
const PORT = 3000;
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended:false}));
app.use('/api/v1',getRoutes);
app.listen(PORT,()=>{
    console.log('Server is running'); 
});
//NODEMON
//To keep track of changes we use nodemon
// It Keeps tracks and restart the server at every change
//NGROK
// ngrok is used to share the code without pushing it on any server
// it connects your localhost and make it public for sometime
// (async function(){
//     const url = await ngrok.connect({
//         proto:'http',
//         addr:PORT,
//         authtoken:""
//     });
//     console.log(url);
// })()//self calling function of JS