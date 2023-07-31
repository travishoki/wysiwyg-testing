import React, { useState } from "react";
import {
  FORMAT_ELEMENT_COMMAND,
  INDENT_CONTENT_COMMAND,
  OUTDENT_CONTENT_COMMAND,
} from "lexical";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import DropDown, { DropDownItem } from "../../ui/DropDown";

function Divider(): JSX.Element {
  return <div className="divider" />;
}

export default function ToolbarPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const [isRTL, setIsRTL] = useState(false);

  return (
    <DropDown
      buttonLabel="Align"
      buttonIconClassName="icon left-align"
      buttonClassName="toolbar-item spaced alignment"
      buttonAriaLabel="Formatting options for text alignment"
    >
      <DropDownItem
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
        }}
        className="item"
      >
        <i className="icon left-align" />
        <span className="text">Left Align</span>
      </DropDownItem>
      <DropDownItem
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
        }}
        className="item"
      >
        <i className="icon center-align" />
        <span className="text">Center Align</span>
      </DropDownItem>
      <DropDownItem
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
        }}
        className="item"
      >
        <i className="icon right-align" />
        <span className="text">Right Align</span>
      </DropDownItem>
      <DropDownItem
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
        }}
        className="item"
      >
        <i className="icon justify-align" />
        <span className="text">Justify Align</span>
      </DropDownItem>
      <Divider />
      <DropDownItem
        onClick={() => {
          activeEditor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
        }}
        className="item"
      >
        <i className={"icon " + (isRTL ? "indent" : "outdent")} />
        <span className="text">Outdent</span>
      </DropDownItem>
      <DropDownItem
        onClick={() => {
          activeEditor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
        }}
        className="item"
      >
        <i className={"icon " + (isRTL ? "outdent" : "indent")} />
        <span className="text">Indent</span>
      </DropDownItem>
    </DropDown>
  );
}
