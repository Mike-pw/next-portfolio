import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const SyntaxHighlight = {
  
    code({node, inline, className,...props}) {
     // Set code language declared in code block: ```lang
      //const match = /language-(\w+)/.exec(className || '')
      return !inline ? (
        <SyntaxHighlighter
          style={materialDark}
          language="markup"
          PreTag="pre"
          className="codeStyle"
          {...props}
        />
      ) : (
        <code className={className} {...props} />
      )
    }
  }
  
  export default SyntaxHighlight