"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

export type InputFieldProps = React.ComponentPropsWithoutRef<"input"> & {
  wrapperClassName?: string;
  error?: boolean;
};

const PASSWORD_CHAR = "\u2022";

let measureCanvas: HTMLCanvasElement | null = null;
let measureCtx: CanvasRenderingContext2D | null = null;

function getSubtextWidth(text: string, input: HTMLInputElement): number {
  if (!text) return 0;
  if (typeof window === "undefined") return text.length * 8;

  if (!measureCanvas) {
    measureCanvas = document.createElement("canvas");
    measureCtx = measureCanvas.getContext("2d");
  }

  if (!measureCtx) return text.length * 8;

  try {
    const computed = window.getComputedStyle(input);
    measureCtx.font = `${computed.fontStyle} ${computed.fontWeight} ${computed.fontSize} ${computed.fontFamily}`;
    return measureCtx.measureText(text).width;
  } catch {
    return text.length * 8;
  }
}

export const Input = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      className,
      wrapperClassName,
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      onKeyUp,
      onClick,
      onSelect,
      type = "text",
      placeholder,
      style,
      disabled,
      error,
      ...props
    },
    forwardedRef
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasSelection, setHasSelection] = useState(false);

    const caretX = useMotionValue(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const prefersReducedMotion = useReducedMotion();

    const springConfig = prefersReducedMotion
      ? { stiffness: 10000, damping: 100, mass: 0.1 }
      : { stiffness: 520, damping: 30, mass: 0.35 };

    const springCaretX = useSpring(caretX, springConfig);

    const updateCaret = useCallback(() => {
      const input = inputRef.current;
      if (!input) return;

      const selStart = input.selectionStart ?? 0;
      const selEnd = input.selectionEnd ?? 0;
      setHasSelection(selStart !== selEnd);

      const caretIdx =
        input.selectionDirection === "backward" ? selStart : selEnd;

      const isPassword = input.type === "password";
      const val = input.value || "";
      const textBefore = isPassword
        ? PASSWORD_CHAR.repeat(caretIdx)
        : val.slice(0, caretIdx);

      const textWidth = getSubtextWidth(textBefore, input);
      const scrollLeft = input.scrollLeft || 0;
      const xPos = textWidth - scrollLeft;

      const maxVisible = Math.max(0, input.clientWidth - 2);
      const clampedX = Math.max(0, Math.min(xPos, maxVisible));

      caretX.set(clampedX);
    }, [caretX]);

    const setRefs = useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;
        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          (forwardedRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
        }
      },
      [forwardedRef]
    );

    useEffect(() => {
      updateCaret();
    }, [value, defaultValue, updateCaret]);

    useEffect(() => {
      if (typeof document !== "undefined" && document.fonts) {
        document.fonts.ready.then(updateCaret).catch(() => {});
      }
    }, [updateCaret]);

    return (
      <div
        className={cn(
          "relative flex items-center w-full rounded-xl border border-slate-border/90 bg-white px-4 text-sm text-navy transition-all dark:bg-navy-dark dark:border-navy-light dark:text-cream shadow-2xs cursor-text min-h-[2.75rem]",
          "focus-within:border-copper focus-within:ring-2 focus-within:ring-copper/20",
          error && "border-rose-500 focus-within:border-rose-500 focus-within:ring-rose-200",
          disabled && "opacity-50 cursor-not-allowed",
          wrapperClassName
        )}
        onClick={() => inputRef.current?.focus()}
      >
        <div
          ref={containerRef}
          className="relative flex items-center w-full h-full cursor-text"
        >
          <input
            {...props}
            ref={setRefs}
            type={type}
            disabled={disabled}
            placeholder={placeholder}
            style={{
              caretColor: isFocused ? "transparent" : "inherit",
              ...style,
            }}
            {...(value !== undefined ? { value } : { defaultValue })}
            className={cn(
              "w-full bg-transparent border-0 border-none p-0 m-0 outline-none focus:outline-none focus:ring-0 focus:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:border-none shadow-none ring-0 placeholder:text-slate/50 text-sm text-inherit cursor-text leading-normal",
              className
            )}
            onChange={(e) => {
              onChange?.(e);
              updateCaret();
            }}
            onInput={() => {
              updateCaret();
            }}
            onFocus={(e) => {
              setIsFocused(true);
              updateCaret();
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            onClick={(e) => {
              updateCaret();
              onClick?.(e);
            }}
            onKeyDown={(e) => {
              requestAnimationFrame(updateCaret);
              onKeyDown?.(e);
            }}
            onKeyUp={(e) => {
              updateCaret();
              onKeyUp?.(e);
            }}
            onSelect={(e) => {
              updateCaret();
              onSelect?.(e);
            }}
          />

          {/* High-visibility Smooth Spring Caret with Copper Glow */}
          <motion.div
            aria-hidden="true"
            className="bg-copper pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-[1.35em] max-h-[22px] min-h-[16px] rounded-full z-20 shadow-[0_0_8px_rgba(200,109,81,0.7)]"
            style={{ x: springCaretX }}
            animate={{
              opacity: isFocused && !hasSelection ? 1 : 0,
            }}
            transition={{ duration: 0.12 }}
          />
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

export const SmoothInput = Input;

export const Skiper106 = () => {
  return (
    <div className="flex w-full flex-col items-center space-y-4 p-4">
      <Input placeholder="Type to experience smooth caret..." />
    </div>
  );
};
