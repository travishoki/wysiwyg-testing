import React from "react";

import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";

import { OnChangePlugin } from "../plugins/OnChangePlugin.ts";
import { Placeholder } from "./Placeholder/Placeholder.tsx";

export const Editor = () => {
  const onChange = () => {};

  return (
    <>
      <RichTextPlugin
        contentEditable={<ContentEditable className="content-editable" />}
        placeholder={<Placeholder />}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <OnChangePlugin onChange={onChange} />
    </>
  );
};
