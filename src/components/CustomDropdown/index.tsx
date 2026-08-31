import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  value: string;
  onChange: (val: string) => void;
  options: Option[];
  style?: React.CSSProperties;
}

const DropdownWrapper = styled.div`
  position: relative;
  min-width: 180px;
`;

const DropdownTrigger = styled.div<{ $open: boolean }>`
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border: 1.5px solid ${p => p.$open ? '#2a4a7f' : '#1F2B45'};
  border-radius: 999px;
  padding: 0.55rem 1.1rem;
  font-size: 0.88rem;
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  color: ${p => p.$open ? '#2a4a7f' : '#1F2B45'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${p => p.$open ? '0 0 0 3px rgba(31, 43, 69, 0.15)' : '0 2px 8px rgba(31, 43, 69, 0.08)'};
  user-select: none;

  &:hover {
    border-color: #2a4a7f;
    background: #f0f4fa;
    color: #2a4a7f;
    box-shadow: 0 4px 12px rgba(31, 43, 69, 0.15);
  }
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: linear-gradient(160deg, #ffffff 0%, #f8fafc 100%);
  border: 1.5px solid #d4dbe6;
  border-radius: 22px;
  padding: 0.5rem;
  z-index: 100;
  box-shadow: 0 12px 32px rgba(31, 43, 69, 0.14), 0 2px 6px rgba(31, 43, 69, 0.06);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  overflow: hidden;
  backdrop-filter: blur(8px);
`;

const DropdownItem = styled.div<{ $selected: boolean }>`
  padding: 0.55rem 1.1rem;
  border-radius: 999px;
  font-size: 0.84rem;
  font-family: 'Rubik', sans-serif;
  font-weight: ${p => p.$selected ? 600 : 500};
  color: ${p => p.$selected ? '#1F2B45' : '#475569'};
  background: ${p => p.$selected
    ? 'linear-gradient(135deg, #e8edf5 0%, #dce4f0 100%)'
    : 'transparent'};
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
  border: 1.5px solid ${p => p.$selected ? 'rgba(31, 43, 69, 0.12)' : 'transparent'};
  letter-spacing: 0.01em;

  &:hover {
    background: ${p => p.$selected
      ? 'linear-gradient(135deg, #dce4f0 0%, #d0daea 100%)'
      : 'linear-gradient(135deg, #eef2f9 0%, #e4eaf4 100%)'};
    color: #1F2B45;
    border-color: rgba(31, 43, 69, 0.15);
    transform: translateX(2px);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const CustomDropdown: React.FC<CustomDropdownProps> = ({ value, onChange, options, style }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(o => o.value === value) || options[0];

  return (
    <DropdownWrapper ref={ref} style={style}>
      <DropdownTrigger $open={open} onClick={() => setOpen(!open)}>
        <span>{selectedOption?.label}</span>
        <ChevronDown size={14} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: '0.3s cubic-bezier(0.4, 0, 0.2, 1)' }} />
      </DropdownTrigger>
      
      <AnimatePresence>
        {open && (
          <DropdownMenu
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            {options.map(o => (
              <DropdownItem
                key={o.value}
                $selected={o.value === value}
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
              >
                {o.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        )}
      </AnimatePresence>
    </DropdownWrapper>
  );
};

export default CustomDropdown;
