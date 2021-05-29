interface HtmlProps {
    meta: string;
    title: string;
    styles: string;
    content: string;
    files: string[];
}

Date.prototype.toLocaleDateString = function () {
    return `${formatZeroOntoNumber(this.getDate())}/${formatZeroOntoNumber(this.getMonth() + 1)}/${this.getFullYear()}`;
};

function formatZeroOntoNumber(input: number): string {
    if (input < 10) return `0${input}`;
    return String(input);
}

const Wrapper = (props: HtmlProps) => {
    return (
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta type="description" content="A blog for a web developer to ramble into">
    ${props.meta}
    <title>${props.title || 'title'}</title>
    <style>${props.styles}</style>
</head>
<body>
    <header>
        <a href="/blog"><h1>🖥️JFlagg's Blog</h1></a>
        ${props.files.slice().reverse().slice(0, 2).reduce((acc, file) => `${acc}<a href="/blog/posts/${file}">${new Date(file).toLocaleDateString("en-GB")}</a>`, "")}
        <a href="/blog/posts">View All</a>
    </header>
    ${props.content}
</body>
</html>`
    )
}

export default Wrapper;
