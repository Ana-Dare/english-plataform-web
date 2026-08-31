import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ChevronDown } from 'lucide-react';

export interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  error?: boolean;
  icon?: React.ReactNode;
}

const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SelectHeader = styled.div<{ $isOpen: boolean; $error?: boolean; $empty?: boolean; $hasIcon?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: ${({ $hasIcon }) => ($hasIcon ? "0.62rem 0.95rem 0.62rem 2.4rem" : "0.62rem 0.95rem")};
  border: 1.5px solid ${({ $error }) => ($error ? "#d93025" : "#8d8d8d")};
  border-radius: 12px;
  font-family: 'Rubik', sans-serif;
  font-size: 0.9rem;
  color: ${({ $empty }) => ($empty ? "#888" : "#1F2B45")};
  background: #fff;
  cursor: pointer;
  transition: all 0.2s;
  min-height: 42px;
  box-sizing: border-box;

  ${({ $isOpen, $error }) => $isOpen && `
    border-color: ${$error ? "#d93025" : "#C57A67"};
    box-shadow: 0 0 0 3px ${$error ? "rgba(217, 48, 37, 0.12)" : "rgba(197, 122, 103, 0.12)"};
  `}

  &:hover {
    border-color: ${({ $error }) => ($error ? "#d93025" : "#6b6b6b")};
  }
`;

const SelectIcon = styled.span`
  position: absolute;
  left: 0.85rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  color: #6b6b6b;
  pointer-events: none;
  z-index: 1;
`;

const OptionsList = styled.ul`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  background: #fff;
  border-radius: 12px;
  border: 1.5px solid #8d8d8d;
  box-shadow: 0 10px 28px rgba(31, 43, 69, 0.14);
  list-style: none;
  padding: 0.4rem;
  margin: 0;
  max-height: 200px;
  overflow-y: auto;
  z-index: 100;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #c4c4c4;
    border-radius: 10px;
  }
`;

const OptionItem = styled.li<{ $isSelected: boolean }>`
  padding: 0.55rem 0.9rem;
  font-family: 'Rubik', sans-serif;
  font-size: 0.88rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
  font-weight: ${({ $isSelected }) => ($isSelected ? 600 : 500)};
  background: ${({ $isSelected }) => ($isSelected ? "#eef1f6" : "transparent")};
  color: #1F2B45;

  &:hover {
    background: ${({ $isSelected }) => ($isSelected ? "#e8edf5" : "#f4f4f5")};
  }
`;

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  placeholder,
  error,
  icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <SelectContainer ref={containerRef}>
      {icon && <SelectIcon>{icon}</SelectIcon>}
      <SelectHeader
        $isOpen={isOpen}
        $error={error}
        $empty={!selectedOption}
        $hasIcon={!!icon}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption ? selectedOption.label : (placeholder || 'Selecione...')}</span>
        <ChevronDown
          size={16}
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'transform 0.2s',
            flexShrink: 0,
          }}
        />
      </SelectHeader>

      {isOpen && (
        <OptionsList>
          {options.map((opt) => (
            <OptionItem
              key={opt.value}
              $isSelected={opt.value === value}
              onClick={(e) => {
                e.stopPropagation();
                onChange(opt.value);
                setIsOpen(false);
              }}
            >
              {opt.label}
            </OptionItem>
          ))}
        </OptionsList>
      )}
    </SelectContainer>
  );
};

export default CustomSelect;
