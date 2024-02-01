const fs = require('fs');
const ejs = require('ejs');
const express = require('express');
const app = express();
app.use('/static', express.static('static'));
/*app.get('/admin/:name/:password', (req, res)=>{
    let admin = readJSON('./data/admin.json');
    if(admin[req.params.name] == req.params.password) res.end('login !');
    else res.end('bad !');
});*/
app.get('/user/:username/:password', (req, res)=>{
    let user = readJSON('./data/users.json')[req.params.username];
    if(req.params.password == user['pw']) {
        res.end(ejs.render(fs.readFileSync('./ejs/home.ejs', 'utf-8'), 
            {isMobile: isMobile(req), call: user['call']}));
    }else{
        res.end('Oh, dear, Please enter correct password!');
    }
});
app.listen(5419, ()=>{
    console.log('5419');
});
function isMobile(req) {
    const userAgent = req.headers['user-agent'];
    return (/iPhone|iPad|iPod|Android/i.test(userAgent));
}
function readJSON(filename) {
    const data = fs.readFileSync(filename, 'utf8');
    return JSON.parse(data);
}