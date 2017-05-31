import Express from 'express';
import router from '../api_router'

let app = Express();

app.listen(4000, () => {
    console.log('server running http://localhost:4000');
});

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Content-Length, Authorization, Accept, X-Requested-With'
    );
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method == 'OPTIONS') {
        res.send(200); //options快速响应
    }
    else {
        next();
    } 
});


app.use('/', router);
