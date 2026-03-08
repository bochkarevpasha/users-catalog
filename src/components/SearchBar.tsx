import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  label = 'Поиск по имени',
  placeholder = 'Например: Emily, John...',
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="search-container">
      <label className="search-label" htmlFor="search">
        {label}
      </label>
      <input
        id="search"
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

