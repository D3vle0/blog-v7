const React = require('react');
const ReactMarkdown = require('react-markdown').default || require('react-markdown');
const { renderToStaticMarkup } = require('react-dom/server');

const md = "This is `inline` code.\n\n```\nblock code\n```";

function CodeBlock(props) {
  console.log("Props for code:", { inline: props.inline, className: props.className });
  return React.createElement('code', null, props.children);
}

const element = React.createElement(ReactMarkdown, {
  children: md,
  components: {
    code: CodeBlock
  }
});

renderToStaticMarkup(element);
