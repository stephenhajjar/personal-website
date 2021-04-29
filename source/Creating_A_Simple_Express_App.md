In this tutorial we will show you how to create a simple Express app. Setting one up is easy and you can build some pretty amazing applications with Express!

### First Steps
Create your folders directory, I tend to like them in my `home` folder:
```sh
mkdir example-express-app
```

You'll then want to create an npm package in this repository. This will allow you to install all your dependencies.

```sh
npm init
```

Answer each question carefully

### Let's get started

Once you're done, do:
```sh
npm install express
```

We can then write our `server.js` file like so:
```
const express = require('express'),
      app     = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
```

That's it! Happy coding!