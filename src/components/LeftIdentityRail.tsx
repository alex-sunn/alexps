import { Check, Copy, ExternalLink, FileDown, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import type { NavItem, NavSectionId, ProfileIdentity, ThemeMode } from '../types/portfolio';

interface LeftIdentityRailProps {
  identity: ProfileIdentity;
  navItems: readonly NavItem[];
  activeSection: NavSectionId;
  theme: ThemeMode;
  onSelectSection: (section: NavSectionId) => void;
  onToggleTheme: () => void;
}

export function LeftIdentityRail({
  identity,
  navItems,
  activeSection,
  theme,
  onSelectSection,
  onToggleTheme,
}: LeftIdentityRailProps) {
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);

  const handleCopy = async (value: string, field: 'email' | 'phone') => {
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(value);
      }
    } catch {
      // Clipboard API may be unavailable in restricted contexts
    }
    setCopiedField(field);
    window.setTimeout(() => {
      setCopiedField((prev) => (prev === field ? null : prev));
    }, 1800);
  };

  return (
    <header className="identity" role="banner">
      <div className="identity-top">
        <button
          type="button"
          className="site-title-btn"
          onClick={() => onSelectSection('overview')}
          aria-label="Alex Sun — return to overview"
        >
          {identity.name}
        </button>

        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-pressed={theme === 'dark'}
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          title="Toggle Light / Dark theme (Shortcut: T)"
        >
          {theme === 'light' ? (
            <>
              <Moon size={12} aria-hidden="true" />
              <span>Dark</span>
            </>
          ) : (
            <>
              <Sun size={12} aria-hidden="true" />
              <span>Light</span>
            </>
          )}
        </button>
      </div>

      <div className="identity-tagline">{identity.roleTagline}</div>

      <div className="email-row">
        <a href={`mailto:${identity.email}`} className="email-link">
          {identity.email}
        </a>
        <button
          type="button"
          className="icon-copy-btn"
          onClick={() => void handleCopy(identity.email, 'email')}
          aria-label={`Copy email ${identity.email}`}
        >
          {copiedField === 'email' ? (
            <>
              <Check size={12} aria-hidden="true" />
              <span>Copied</span>
            </>
          ) : (
            <Copy size={13} aria-hidden="true" />
          )}
        </button>
      </div>

      <nav className="main-nav" aria-label="Primary navigation">
        {navItems.map((item) => {
          const isCurrent = item.id === activeSection;
          return (
            <button
              key={item.id}
              type="button"
              className="main-nav-btn"
              aria-current={isCurrent ? 'page' : undefined}
              onClick={() => onSelectSection(item.id)}
            >
              <span className="main-nav-num">{item.code}</span>
              <span className="main-nav-label">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="identity-links">
        <div className="identity-link-item">
          <span className="identity-link-label">
            <span>GitHub</span>
            <ExternalLink size={12} aria-hidden="true" />
          </span>
          <a
            href={identity.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="identity-link-sub"
          >
            {identity.githubLabel}
          </a>
        </div>

        <div className="identity-link-item">
          <span className="identity-link-label">
            <span>LinkedIn</span>
            <ExternalLink size={12} aria-hidden="true" />
          </span>
          <a
            href={identity.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="identity-link-sub"
          >
            {identity.linkedinLabel}
          </a>
        </div>

        <div className="identity-link-item">
          <span className="identity-link-label">Phone</span>
          <button
            type="button"
            className="icon-copy-btn"
            style={{ padding: 0, fontSize: '13px', fontFamily: 'var(--grot)' }}
            onClick={() => void handleCopy(identity.phone, 'phone')}
            aria-label={`Copy phone ${identity.phone}`}
          >
            <span className="identity-link-sub num">{identity.phone}</span>
            {copiedField === 'phone' && (
              <span style={{ color: 'var(--accent)', fontSize: '11px' }}>Copied</span>
            )}
          </button>
        </div>

        <div>
          <a
            href={identity.resumePdfUrl}
            target="_blank"
            rel="noreferrer"
            download="Alex_Sun_Resume.pdf"
            className="print-link-btn"
          >
            <FileDown size={12} aria-hidden="true" />
            <span>Resume PDF</span>
          </a>
        </div>
      </div>
    </header>
  );
}
