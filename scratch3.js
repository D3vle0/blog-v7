const React = require('react');
const ReactMarkdown = require('react-markdown').default || require('react-markdown');
const remarkGfm = require('remark-gfm').default || require('remark-gfm');
const rehypeRaw = require('rehype-raw').default || require('rehype-raw');
const { renderToStaticMarkup } = require('react-dom/server');

const md = `
> [!WARNING] 전체 페이지 암호화 workflow
> 1. Hugo로 렌더링된 최종 HTML을 CLI 입력으로 사용해 암호화 페이로드를 생성한다.
> 2. 생성된 페이로드를 front matter의 \`protector_full_page_payload\`에 추가하고 레이아웃에서 \`protector/full_page.html\` partial을 호출한다.
> 3. 배포본에는 암호문과 스크립트만 남고, 방문 시 전면 오버레이가 비밀번호를 요구한 뒤 복호화된 HTML을 \`<main>\` 등에 삽입해 렌더링한다.
> 
> 블로그 markdown 코드까지 암호화하는 것이 아니라, Hugo가 생성한 최종 HTML을 암호화 대상으로 삼아야 한다는 점에 유의한다.
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
  remarkPlugins: [remarkGfm],
  rehypePlugins: [rehypeRaw],
  components: {
    blockquote: CustomBlockquote
  }
});

console.log(renderToStaticMarkup(element));
