import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

interface Option {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export interface CustomDropdownProps {
  value: string;
  onChange: (val: string) => void;
  options: Option[];
  style?: React.CSSProperties;
  disabled?: boolean;
  size?: "default" | "compact" | "small";
  minWidth?: string;
  menuDirection?: "down" | "up";
  menuAlign?: "left" | "right";
  placeholder?: string;
  ariaLabel?: string;
  fullWidth?: boolean;
  leadingIcon?: React.ReactNode;
}

const DropdownWrapper = styled.div<{
  $minWidth?: string;
  $size?: string;
  $fullWidth?: boolean;
}>`
  position: relative;
  min-width: ${(p) =>
    p.$fullWidth
      ? "100%"
      : p.$minWidth || (p.$size === "compact" ? "64px" : "auto")};
  max-width: 100%;
  width: ${(p) => (p.$fullWidth ? "100%" : "auto")};
  display: ${(p) => (p.$fullWidth ? "block" : "inline-block")};
  flex-shrink: 0;
`;

const DropdownTrigger = styled.div<{
  $open: boolean;
  $disabled?: boolean;
  $size?: string;
  $fullWidth?: boolean;
}>`
  width: ${(p) => (p.$fullWidth ? "100%" : "auto")};
  min-width: 0;
  box-sizing: border-box;
  background: ${(p) => (p.$disabled ? "#f1f5f9" : "#ffffff")};
  border: 1.5px solid ${(p) => (p.$open ? "#1F2B45" : "#cbd5e1")};
  border-radius: 999px;
  height: ${(p) => (p.$size === "compact" ? "36px" : "42px")};
  padding: ${(p) => (p.$size === "compact" ? "0 0.7rem" : "0 0.95rem")};
  font-size: ${(p) => (p.$size === "compact" ? "0.8125rem" : "0.875rem")};
  font-family: "Rubik", sans-serif;
  font-weight: 500;
  color: ${(p) =>
    p.$disabled ? "#94a3b8" : p.$open ? "#1F2B45" : "#334155"};
  cursor: ${(p) => (p.$disabled ? "not-allowed" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${(p) => (p.$size === "compact" ? "0.3rem" : "0.45rem")};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${(p) =>
    p.$open
      ? "0 0 0 3px rgba(31, 43, 69, 0.1)"
      : "0 1px 2px rgba(15, 23, 42, 0.04)"};
  user-select: none;
  opacity: ${(p) => (p.$disabled ? 0.6 : 1)};
  white-space: nowrap;

  &:hover {
    border-color: ${(p) => (p.$disabled ? "#cbd5e1" : "#94a3b8")};
    background: ${(p) => (p.$disabled ? "#f1f5f9" : "#f8fafc")};
    color: ${(p) => (p.$disabled ? "#94a3b8" : "#1F2B45")};
  }

  span.label-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    min-width: 0;
  }

  span.leading-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: #1e293b;
  }

  @media (max-width: 767px) {
    height: ${(p) => (p.$size === "compact" ? "34px" : "40px")};
    padding: ${(p) => (p.$size === "compact" ? "0 0.6rem" : "0 0.85rem")};
    font-size: 0.8125rem;
    gap: 0.35rem;

    span.label-text {
      gap: 0.35rem;
    }
  }
`;

const DropdownMenu = styled(motion.div)`
  position: fixed;
  box-sizing: border-box;
  background: #ffffff;
  border: 1.5px solid #d4dbe6;
  border-radius: 18px;
  padding: 0.35rem;
  z-index: 9999;
  box-shadow:
    0 12px 32px rgba(31, 43, 69, 0.18),
    0 2px 8px rgba(31, 43, 69, 0.08);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  overflow-y: auto;
  max-height: 250px;
  backdrop-filter: blur(8px);

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }
`;

const DropdownItem = styled.div<{ $selected: boolean; $size?: string }>`
  padding: ${(p) =>
    p.$size === "compact" ? "0.45rem 0.75rem" : "0.55rem 0.95rem"};
  border-radius: 10px;
  font-size: ${(p) => (p.$size === "compact" ? "0.875rem" : "0.9375rem")};
  font-family: "Rubik", sans-serif;
  font-weight: ${(p) => (p.$selected ? 600 : 500)};
  color: ${(p) => (p.$selected ? "#1F2B45" : "#475569")};
  background: ${(p) => (p.$selected ? "#eef2f9" : "transparent")};
  cursor: pointer;
  transition: all 0.18s ease;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  white-space: normal;
  line-height: 1.35;
  word-break: break-word;

  &:hover {
    background: ${(p) => (p.$selected ? "#e2e8f4" : "#f8fafc")};
    color: #1f2b45;
  }

  &:active {
    transform: scale(0.98);
  }

  svg {
    flex-shrink: 0;
    color: #1f2b45;
  }
`;

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  value,
  onChange,
  options,
  style,
  disabled = false,
  size = "default",
  minWidth,
  menuDirection = "down",
  menuAlign = "left",
  placeholder,
  ariaLabel,
  fullWidth = false,
  leadingIcon,
}) => {
  const [open, setOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});
  const ref = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const isUp = menuDirection === "up";

  const updateMenuPosition = useCallback(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;
    const isMobile = viewportW < 768;

    const nextStyle: React.CSSProperties = {
      minWidth: Math.max(rect.width, 180),
      maxWidth: isMobile ? Math.max(rect.width, viewportW - 24) : Math.min(450, viewportW - 24),
    };

    if (fullWidth || isMobile) {
      nextStyle.width = rect.width;
      nextStyle.maxWidth = Math.max(rect.width, viewportW - 24);
    }

    if (isUp) {
      nextStyle.bottom = viewportH - rect.top + 6;
    } else {
      nextStyle.top = rect.bottom + 6;
    }

    if (menuAlign === "right" || rect.left + 220 > viewportW) {
      nextStyle.right = Math.max(12, viewportW - rect.right);
    } else {
      nextStyle.left = Math.max(12, rect.left);
    }

    setMenuStyle(nextStyle);
  }, [fullWidth, isUp, menuAlign]);

  useEffect(() => {
    if (!open) return;
    updateMenuPosition();

    const handleScrollOrResize = () => {
      updateMenuPosition();
    };

    window.addEventListener("scroll", handleScrollOrResize, true);
    window.addEventListener("resize", handleScrollOrResize);
    return () => {
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [open, updateMenuPosition]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        ref.current &&
        !ref.current.contains(target) &&
        (!menuRef.current || !menuRef.current.contains(target))
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((o) => o.value === value) || options[0];
  const triggerIcon = selectedOption?.icon ?? leadingIcon;

  const handleToggle = () => {
    if (!disabled) {
      if (!open) {
        updateMenuPosition();
      }
      setOpen((prev) => !prev);
    }
  };

  return (
    <DropdownWrapper
      ref={ref}
      style={style}
      $minWidth={minWidth}
      $size={size}
      $fullWidth={fullWidth}
      aria-label={ariaLabel}
    >
      <DropdownTrigger
        $open={open}
        $disabled={disabled}
        $size={size}
        $fullWidth={fullWidth}
        onClick={handleToggle}
      >
        <span className="label-text">
          {triggerIcon && <span className="leading-icon">{triggerIcon}</span>}
          <span
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {selectedOption ? selectedOption.label : placeholder || ""}
          </span>
        </span>
        <ChevronDown
          size={size === "compact" ? 13 : 14}
          style={{
            transform: open ? "rotate(180deg)" : "none",
            transition: "0.25s cubic-bezier(0.4, 0, 0.2, 1)",
            flexShrink: 0,
          }}
        />
      </DropdownTrigger>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && !disabled && (
              <DropdownMenu
                ref={menuRef}
                style={menuStyle}
                initial={{ opacity: 0, y: isUp ? 8 : -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: isUp ? 8 : -8, scale: 0.96 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                {options.map((o) => {
                  const isSelected = o.value === value;
                  return (
                    <DropdownItem
                      key={o.value}
                      $selected={isSelected}
                      $size={size}
                      onClick={() => {
                        onChange(o.value);
                        setOpen(false);
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.45rem",
                        }}
                      >
                        {o.icon}
                        {o.label}
                      </span>
                      {isSelected && <Check size={13} strokeWidth={2.4} />}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </DropdownWrapper>
  );
};

export default CustomDropdown;
