const express =require('express');
const hbs =require('hbs');
const fs =require('fs');

let app =express();



app.use((req,res,next)=>{
    let now =new Date().toString();
    var log =`${now}:${req.method}.${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err){
            console.log('unable to append server log');
        }
    })
    next();
});

app.use((req,res,next)=>{
    res.render('maintaince',{
        pageTitle:"maintaince page",
        msg:"page under maintaince"
    })
});
app.use(express.static(__dirname+'/public'));
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
});
hbs.registerHelper('ScreemIt',(text)=>{
    return text.toUpperCase();
});
app.set('view engine','hbs');

app.get('/',(req,res)=>{
   // res.send('hello express');
   //console.log(req.connection.remoteAddress);
   //console.log(req);
res.render('welcome.hbs',{
    pageTitle:'homepage',
    welcomeMsg:'welcome to our site',    
    myData:[
                   'sdasda',
                   'sadasdasdasd'
               ]
})
//    res.send({
//        name:"praveen",
//        my:[
//            'sdasda',
//            'sadasdasdasd'
//        ]
//    })
});

app.get('/about',(req,res)=>{
    //res.send('<h1>inside about </h1>');
    res.render('about.hbs',{
        pageTitle:'about page'       
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMsg:'route not found'
    })
})

app.listen(3000,()=>{
    console.log("server is up and running on port 3000")
});