const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const apiRoutes = require('./routes/api');
const uiRoutes = require('./routes/UI');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/resources', express.static(path.join(__dirname, 'resources')));

app.use('/api', api);
app.use('/UI', UI);

app.get('/', (req, res) => {
    res.redirect('/UI/registrations/register');
});

app.listen(port);
