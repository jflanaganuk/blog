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
    <meta name="description" content="A blog for a web developer to ramble into">
    <!-- Primary Meta Tags -->
    <title>${props.title || 'title'}</title>
    <meta name="title" content="🖥️JFlagg's Blog">
    <meta name="description" content="A blog for a web developer to ramble into">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://www.uploadr.co.uk/blog">
    <meta property="og:title" content="🖥️JFlagg's Blog">
    <meta property="og:description" content="A blog for a web developer to ramble into">
    <meta property="og:image" content="https://avatars.githubusercontent.com/u/23509159?v=4">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://www.uploadr.co.uk/blog">
    <meta property="twitter:title" content="🖥️JFlagg's Blog">
    <meta property="twitter:description" content="A blog for a web developer to ramble into">
    <meta property="twitter:image" content="https://avatars.githubusercontent.com/u/23509159?v=4">
    ${props.meta}
    <style>${props.styles}</style>
</head>
<body>
    <header>
        <a href="/blog"><h1>🖥️JFlagg's Blog</h1></a>
        ${props.files.slice().reverse().slice(0, 2).reduce((acc, file) => `${acc}<a href="/blog/posts/${file}">${new Date(file).toLocaleDateString("en-GB")}</a>`, "")}
        <a href="/blog/posts">View All</a>
    </header>
    ${props.content}
    <!-- begin wwww.htmlcommentbox.com -->
 <div id="HCB_comment_box"><a href="http://www.htmlcommentbox.com">Comment Form</a> is loading comments...</div>
 <link rel="stylesheet" type="text/css" href="https://www.htmlcommentbox.com/static/skins/bootstrap/twitter-bootstrap.css?v=0" />
 <script type="text/javascript" id="hcb"> /*<!--*/ if(!window.hcb_user){hcb_user={};} (function(){var s=document.createElement("script"), l=hcb_user.PAGE || (""+window.location).replace(/'/g,"%27"), h="https://www.htmlcommentbox.com";s.setAttribute("type","text/javascript");s.setAttribute("src", h+"/jread?page="+encodeURIComponent(l).replace("+","%2B")+"&mod=%241%24wq1rdBcg%24w9d.12AwL9CCqVKzY3PBH."+"&opts=16862&num=10&ts=1622413332227");if (typeof s!="undefined") document.getElementsByTagName("head")[0].appendChild(s);})(); /*-->*/ </script>
<!-- end www.htmlcommentbox.com -->
</body>
</html>`
    )
}

export default Wrapper;
