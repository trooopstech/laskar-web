import {
  Editor,
  Transforms,
  Range,
  Point,
  Element as SlateElement,
} from "slate";
import { ImageElement, ParagraphElement } from "types/editor";
import { isUrl } from "./element";

const SHORTCUTS = {
  "*": "list-item",
  "-": "list-item",
  "+": "list-item",
  ">": "block-quote",
  "#": "heading-one",
  "##": "heading-two",
  "###": "heading-three",
  "####": "heading-four",
  "#####": "heading-five",
  "######": "heading-six",
};

const EMPTY_PARAGRAHP: ParagraphElement = {
  type: "paragraph",
  children: [{ text: "" }],
};

// @ts-ignore
export const withShortcuts = (editor) => {
  const { deleteBackward, insertText } = editor;

  // @ts-ignore
  editor.insertText = (text) => {
    const { selection, children } = editor;

    if (text === " " && selection && Range.isCollapsed(selection)) {
      const { anchor } = selection;
      const block = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });
      const path = block ? block[1] : [];
      const start = Editor.start(editor, path);
      const range = { anchor, focus: start };
      const beforeText = Editor.string(editor, range);
      // @ts-ignore
      const type = SHORTCUTS[beforeText];

      if (type) {
        Transforms.select(editor, range);
        Transforms.delete(editor);
        const newProperties: Partial<SlateElement> = {
          type,
        };
        Transforms.setNodes(editor, newProperties, {
          match: (n) => Editor.isBlock(editor, n),
        });

        if (type === "list-item") {
          // @ts-ignore
          const list: BulletedListElement = {
            type: "bulleted-list",
            children: [],
          };
          Transforms.wrapNodes(editor, list, {
            match: (n) =>
              !Editor.isEditor(n) &&
              SlateElement.isElement(n) &&
              n.type === "list-item",
          });
        }

        return;
      }
    }

    insertText(text);
  };

  // @ts-ignore
  editor.deleteBackward = (...args) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });

      if (match) {
        const [block, path] = match;
        const start = Editor.start(editor, path);

        if (
          !Editor.isEditor(block) &&
          SlateElement.isElement(block) &&
          block.type !== "paragraph" &&
          Point.equals(selection.anchor, start)
        ) {
          const newProperties: Partial<SlateElement> = {
            type: "paragraph",
          };
          Transforms.setNodes(editor, newProperties);

          if (block.type === "list-item") {
            Transforms.unwrapNodes(editor, {
              match: (n) =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                n.type === "bulleted-list",
              split: true,
            });
          }

          return;
        }
      }

      deleteBackward(...args);
    }
  };

  return editor;
};

// @ts-ignore
export const withAttachment = (editor) => {
  const { isVoid } = editor;

  editor.isVoid = (element: { type: string }) => {
    return element.type === "image" || element.type === "attachment"
      ? true
      : isVoid(element);
  };

  return editor;
};

// @ts-ignore
export const insertImage = (editor, url, key) => {
  const text = { text: "" };
  // @ts-ignore
  const image: ImageElement = { type: "image", url, key, children: [text] };
  Transforms.insertNodes(editor, [image, EMPTY_PARAGRAHP]);
};

// @ts-ignore
export const insertAttachment = (editor, url, key) => {
  const text = { text: "" };
  // @ts-ignore
  const attachment = { type: "attachment", url, key, children: [text] };
  // @ts-ignore
  Transforms.insertNodes(editor, [attachment, EMPTY_PARAGRAHP]);
};
