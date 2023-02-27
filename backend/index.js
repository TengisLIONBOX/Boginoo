const port = process.env.PORT || 3333;
const { connectDatabse } = require('./databasee/database');
const app = require('./node');

app.get('/', (req, res) => {
    res.send('Service running');
});

const startServer = async () => {
    await connectDatabse();
    app.listen(port, () => {
        console.log(`server is running at localhost:${port}`);
    });
};

startServer();
