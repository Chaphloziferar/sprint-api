import app from "./app.js";
import './database';

app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}`);
});