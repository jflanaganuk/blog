import express from 'express';
import MarkdownIt from 'markdown-it';
import fs from 'fs';
import Wrapper from './src/ssrWrapper';

const app = express();
const md = new MarkdownIt();

app.get('/posts/*', (req, res) => {
    fs.readFile(__dirname + req.url + '.md', (err, data) => {
        if (err) return res.send('<p>No file</p>');
        const result = md.render(String(data));
        const styles = fs.readFileSync(__dirname + '/src/style.css');
        const dir = sanitizeMDFiles(
            fs.readdirSync(__dirname + '/posts')
        );
        res.send(Wrapper({
            meta: '',
            title: "JFlagg's Blog",
            styles: String(styles),
            content: result,
            files: dir,
        }))
    });
})

app.get('/posts', (_req, res) => {
    const styles = fs.readFileSync(__dirname + '/src/style.css');
    const dir = sanitizeMDFiles(
        fs.readdirSync(__dirname + '/posts')
    );
    const result = `
    <h2>All Posts</h2>
    ${dir.slice().reverse().reduce((acc, file) => `${acc}<a href="/posts/${file}">${new Date(file).toLocaleDateString("en-GB")}</a>`, "")}`
    res.send(Wrapper({
        meta: '',
        title: "JFlagg's Blog",
        styles: String(styles),
        content: result,
        files: dir,
    }))
})

app.get('/', (_req, res) => {
    const styles = fs.readFileSync(__dirname + '/src/style.css');
    const dir = sanitizeMDFiles(
        fs.readdirSync(__dirname + '/posts')
    );
    const initialPost = fs.readFileSync(__dirname + '/posts/' + dir[0] + '.md')
    const result = md.render(String(initialPost));
    res.send(Wrapper({
        meta: '',
        title: "JFlagg's Blog",
        styles: String(styles),
        content: result,
        files: dir,
    }))
})

app.use('/', express.static(__dirname + '/public'))
app.use(function (_req, res) {
    const styles = fs.readFileSync(__dirname + '/src/style.css');
    const dir = sanitizeMDFiles(
        fs.readdirSync(__dirname + '/posts')
    );
    res.send(Wrapper({
        meta: '',
        title: "JFlagg's Blog",
        styles: String(styles),
        content: "404: Page Not Found",
        files: dir,
    }))
});

app.listen(5000, () => {
    console.log("====-====[Listening on port 5000]====-====");
    setTimeout(() => {
        console.log("Visit site at: http://localhost:5000")
    }, 5000)
})

function sanitizeMDFiles(input: string[]): string[] {
    return input.map(filename => filename.split('.')[0]);
}
