import React from 'react';

interface InfoIconProps {
  onClick: () => void;
  className?: string;
}

const InfoIcon: React.FC<InfoIconProps> = ({ onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`info-icon ${className}`}
      style={{
        background: 'none',
        border: '1px solid hsl(var(--border))',
        borderRadius: '50%',
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: 'hsl(var(--muted-foreground))',
        fontSize: '0.75rem',
        fontWeight: '600',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        marginLeft: '0.5rem'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'hsl(var(--accent))';
        e.currentTarget.style.color = 'hsl(var(--accent-foreground))';
        e.currentTarget.style.borderColor = 'hsl(var(--accent))';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.color = 'hsl(var(--muted-foreground))';
        e.currentTarget.style.borderColor = 'hsl(var(--border))';
      }}
      title="Clique para ver informações sobre esta criptografia"
    >
      ?
    </button>
  );
};

export default InfoIcon;