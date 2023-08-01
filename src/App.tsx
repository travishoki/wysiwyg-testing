import React from "react";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { SharedHistoryContext } from "./context/SharedHistoryContext";
import { TableContext } from "./plugins/TablePlugin";
import { SharedAutocompleteContext } from "./context/SharedAutocompleteContext";
import PlaygroundNodes from "./nodes/PlaygroundNodes";

import Editor from "./Editor";
import "./App.css";

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
  nodes: [...PlaygroundNodes],
};

export const App = () => {
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <SharedHistoryContext>
        <TableContext>
          <SharedAutocompleteContext>
            <Editor />
          </SharedAutocompleteContext>
        </TableContext>
      </SharedHistoryContext>
    </LexicalComposer>
  );
};
