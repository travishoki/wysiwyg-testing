import React from "react";

import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";

import { Placeholder } from "./Placeholder/Placeholder";
import ToolbarPlugin from "./plugins/ToolbarPlugin";

export const Editor = () => {
  return (
    <>
      <RichTextPlugin
        contentEditable={<ContentEditable className="content-editable" />}
        placeholder={<Placeholder />}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <ToolbarPlugin />
    </>
  );
};
