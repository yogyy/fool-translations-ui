import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';
import type { Editor } from '@tiptap/core';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
  y?: number;
  x?: number;
  start?: number;
  duration?: number;
};

export const flyAndScale = (
  node: Element,
  params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
  const style = getComputedStyle(node);
  const transform = style.transform === 'none' ? '' : style.transform;

  const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
    const [minA, maxA] = scaleA;
    const [minB, maxB] = scaleB;

    const percentage = (valueA - minA) / (maxA - minA);
    const valueB = percentage * (maxB - minB) + minB;

    return valueB;
  };

  const styleToString = (style: Record<string, number | string | undefined>): string => {
    return Object.keys(style).reduce((str, key) => {
      if (style[key] === undefined) return str;
      return str + `${key}:${style[key]};`;
    }, '');
  };

  return {
    duration: params.duration ?? 200,
    delay: 0,
    css: (t) => {
      const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
      const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
      const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

      return styleToString({
        transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
        opacity: t
      });
    },
    easing: cubicOut
  };
};

export interface SlideHorizontalParams {
  x?: number; // How far to translate on x (e.g. -300 for left sidebar, 300 for right sidebar)
  duration?: number;
}

export const slideHorizontal = (
  node: Element,
  params: SlideHorizontalParams = { x: 300, duration: 200 }
): TransitionConfig => {
  const style = getComputedStyle(node);
  const transform = style.transform === 'none' ? '' : style.transform;

  const styleToString = (style: Record<string, number | string | undefined>): string => {
    return Object.keys(style).reduce((str, key) => {
      if (style[key] === undefined) return str;
      return str + `${key}:${style[key]};`;
    }, '');
  };

  return {
    duration: params.duration ?? 200,
    delay: 0,
    css: (t) => {
      const x = (params.x ?? 300) * (1 - t); // Animate from `x` to 0
      return styleToString({
        transform: `${transform} translate3d(${x}px, 0, 0)`,
        opacity: t
      });
    },
    easing: cubicOut
  };
};

export function focusEditor(editor: Editor | undefined, event?: MouseEvent | KeyboardEvent) {
  if (!editor) return;
  // Check if there is a text selection already (i.e. a non-empty selection)
  const selection = window.getSelection();
  if (selection && selection.toString().length > 0) {
    // Focus the editor without modifying selection
    editor.chain().focus().run();
    return;
  }
  if (event instanceof MouseEvent) {
    const { clientX, clientY } = event;
    const pos = editor.view.posAtCoords({ left: clientX, top: clientY })?.pos;
    if (pos == null) {
      // If not a valid position, move cursor to the end of the document
      const endPos = editor.state.doc.content.size;
      editor.chain().focus().setTextSelection(endPos).run();
    } else {
      editor.chain().focus().setTextSelection(pos).run();
    }
  } else {
    editor.chain().focus().run();
  }
}
