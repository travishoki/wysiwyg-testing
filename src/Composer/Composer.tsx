import React from "react";

import { LexicalComposer } from "@lexical/react/LexicalComposer";

import { Editor } from "../Editor.tsx";
import "./Composer.css";

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
  namespace: "document-composer",
  theme,
  onError,
};

export const Composer = () => {
  return (
    <div className="editor-wrapper">
      <LexicalComposer initialConfig={initialConfig}>
        <Editor />
      </LexicalComposer>
    </div>
  );
};
