const React = require('react');
const ReactMarkdown = require('react-markdown').default || require('react-markdown');
const remarkGfm = require('remark-gfm').default || require('remark-gfm');
const { renderToStaticMarkup } = require('react-dom/server');

const md = `
> [!WARNING] 전체 페이지 암호화 workflow
> 1. Hugo로 렌더링된 최종 HTML을 CLI 입력으로 사용해 암호화 페이로드를 생성한다.
`;

const element = React.createElement(ReactMarkdown, {
  children: md,
  remarkPlugins: [remarkGfm]
});

console.log(renderToStaticMarkup(element));
