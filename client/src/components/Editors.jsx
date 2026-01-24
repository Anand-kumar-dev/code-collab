import React, { useRef } from 'react'
import Editor from '@monaco-editor/react';



function Editors({ handleMount}) {

  return (

    <div className="h-screen w-screen overflow-hidden">
      <Editor
        onMount={handleMount}
        options={{ automaticLayout: true }}
        language="javascript"
        theme="light"
      />
    </div>

  )
}

export default Editors