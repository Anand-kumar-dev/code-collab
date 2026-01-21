import React from 'react'
import Editor from '@monaco-editor/react';
function Editors() {
  return (
    
   <div className="h-screen w-screen overflow-hidden">
  <Editor
    options={{ automaticLayout: true }}
    language="javascript"
    theme="light"
  />
</div>

  )
}

export default Editors