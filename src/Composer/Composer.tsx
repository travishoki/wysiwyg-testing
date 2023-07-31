import React from "react";

import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

const theme = {
  // Theme styling goes here
};

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
  console.error(error);
}

const initialConfig = {
  namespace: "MyEditor",
  theme,
  onError,
};

export const Composer = () => {
  return (
    <div className="editor-wrapper">
      <LexicalComposer initialConfig={initialConfig}>
        <PlainTextPlugin
          contentEditable={<ContentEditable className="content-editable" />}
          placeholder={<div className="placeholder">Enter some text...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
      </LexicalComposer>
    </div>
  );
};
