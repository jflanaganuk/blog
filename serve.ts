import express from 'express';
import MarkdownIt from 'markdown-it';
import fs from 'fs';
import Wrapper from './src/ssrWrapper';

const app = express();
const md = new MarkdownIt();

app.get('/posts/*', (req, res) => {
    fs.readFile(__dirname + req.url + '.md', (err, data) => {
        const result = err ? '<p>No file</p>' : md.render(String(data));
        const styles = fs.readFileSync(__dirname + '/src/style.css');
        const dir = sanitizeMDFiles(
            fs.readdirSync(__dirname + '/posts')
        );
        res.send(Wrapper({
            meta: '',
            title: "JFlagg's Blog",
            styles: String(styles),
            content: result,
            files: filterPostsAfterCurrentDate(dir),
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
    <div class="vertical">
    ${filterPostsAfterCurrentDate(dir).slice().reverse().reduce((acc, file) => `${acc}<a href="/blog/posts/${file}">${new Date(file).toLocaleDateString("en-GB")}</a>`, "")}
    </div>`
    res.send(Wrapper({
        meta: '',
        title: "JFlagg's Blog",
        styles: String(styles),
        content: result,
        files: filterPostsAfterCurrentDate(dir),
    }))
})

app.get('/', (_req, res) => {
    const styles = fs.readFileSync(__dirname + '/src/style.css');
    const dir = sanitizeMDFiles(
        fs.readdirSync(__dirname + '/posts')
    );
    const posts = filterPostsAfterCurrentDate(dir).slice().reverse().reduce((acc, post) => {
        return `${acc}${fs.readFileSync(__dirname + '/posts/' + post + '.md')}
******
`;
    }, "")
    const result = md.render(String(posts));
    res.send(Wrapper({
        meta: '',
        title: "JFlagg's Blog",
        styles: String(styles),
        content: result,
        files: filterPostsAfterCurrentDate(dir),
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
        files: filterPostsAfterCurrentDate(dir),
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

function filterPostsAfterCurrentDate(input: string[]): string[] {
    return input.filter(date => {
        const dateObject = new Date(date).getTime();
        const nowObject = new Date().getTime();
        return nowObject > dateObject;
    })
}
