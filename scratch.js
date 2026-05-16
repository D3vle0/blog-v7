const React = require('react');
const firstPChild = "[!WARNING] 전체 페이지 암호화 workflow\n1. Hugo로 렌더링된 최종 HTML을 CLI 입력으로 사용해 암호화 페이로드를 생성한다.";
const match = firstPChild.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*([^\n]*)/i);
console.log("match[0]:", match[0]);
console.log("match[2]:", match[2]);
let newFirstPChild = firstPChild.slice(match[0].length).replace(/^\s*(?:\r\n|\r|\n)\s*/, "");
console.log("newFirstPChild:", newFirstPChild);
