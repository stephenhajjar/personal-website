
const express = require('express'),
      path    = require('path'),
      fs      = require('fs'),
      readdir = require('fs/promises').readdir,
      Handlebars = require('handlebars'),
      exphbs  = require('express-handlebars')

const app = express(),
      hbs = exphbs.create({ /* config */ });


const render = (filename, data) => {
    const source = fs.readFileSync(filename, 'utf-8').toString()
    const template = Handlebars.compile(source)
    return template(data)
}

const blogs = []
const readCompiledMd = async () => {
    const files = await readdir('./build')
    files.forEach(file => {
        let title = file.split('.')[0].split('_').join(' ')
        let content = render(`./build/${file}`, {})
        let preview = 'A blog post written by Stephen Hajjar' 
        blogs.push({
            title,
            content,
            preview
        })
    })
}

// Register `hbs.engine` with the Express app.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(`${__dirname}/public`))


app.get('/', (req, res) => {
    res.render('home')
})
app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/blog', (req, res) => {
    res.render('blog', { blogs: blogs})
})

app.get('/blog/:id', (req, res) => {
    const id = req.params.id
    const blog = blogs[id]
    if (blog) {
        res.render('id', {blog})
    } else {
        res.render('error')
    }
})
readCompiledMd().then(() => {
    app.listen(3000, async () => {
        console.log('Started app on port 3000')
    })
})
