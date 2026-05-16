const React = require('react');
const ReactMarkdown = require('react-markdown').default || require('react-markdown');
const { renderToStaticMarkup } = require('react-dom/server');

const md = `
> [!WARNING] 전체 페이지 암호화 workflow
> 1. Hugo로 렌더링된 최종 HTML을 CLI 입력으로 사용해 암호화 페이로드를 생성한다.
`;

function CustomBlockquote({ children, ...props }) {
  const childrenArray = React.Children.toArray(children);
  const firstElementIndex = childrenArray.findIndex(child => React.isValidElement(child) && child.type === 'p');
  
  if (firstElementIndex !== -1) {
    const firstElement = childrenArray[firstElementIndex];
    const pChildren = React.Children.toArray(firstElement.props.children);
    const firstPChild = pChildren[0];

    if (typeof firstPChild === "string") {
      const match = firstPChild.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*([^\n]*)/i);
      
      if (match) {
        let newFirstPChild = firstPChild.slice(match[0].length).replace(/^\s*(?:\r\n|\r|\n)\s*/, "");
        
        const newPChildren = [...pChildren];
        if (newFirstPChild.trim() === "") {
          newPChildren.shift();
          if (React.isValidElement(newPChildren[0]) && newPChildren[0].type === "br") {
            newPChildren.shift();
          }
        } else {
          newPChildren[0] = newFirstPChild;
        }

        const newFirstElement = React.createElement('p', { className: firstElement.props.className }, ...newPChildren);
        const newChildren = [...childrenArray];
        newChildren[firstElementIndex] = newFirstElement;

        return React.createElement('div', { className: 'alert' }, newChildren);
      }
    }
  }
  return React.createElement('blockquote', null, children);
}

const element = React.createElement(ReactMarkdown, {
  children: md,
  components: {
    blockquote: CustomBlockquote
  }
});

console.log(renderToStaticMarkup(element));
