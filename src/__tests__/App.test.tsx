import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from '../App';

describe('Alex Sun Portfolio App (Overview Landing, Quick-Jump & Deep Links)', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.location.hash = '';
    document.documentElement.dataset.theme = 'light';
  });

  it('lands on 01 Overview in Light Mode with personal photo, GitHub, PDF resume, proof stats, and directory', () => {
    render(<App />);

    expect(document.documentElement.dataset.theme).toBe('light');
    expect(document.getElementById('gl-backdrop')).toBeInTheDocument();
    expect(document.getElementById('click-fx')).toBeInTheDocument();

    const photo = screen.getByRole('img', { name: /Alex Sun with his dog in Toronto/i });
    expect(photo).toHaveAttribute('src', '/alex-sun.jpg');

    const githubLink = screen.getByRole('link', { name: /github\.com\/alex-sunn/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/alex-sunn');

    const resumeLink = screen.getByRole('link', { name: /Resume PDF/i });
    expect(resumeLink).toHaveAttribute('href', '/Alex_Sun_Resume.pdf');

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Real Estate Investments, Equity Research & AI Systems/i,
      }),
    ).toBeInTheDocument();

    const proofStrip = screen.getByRole('list', { name: /Key quantifiable proof points/i });
    expect(within(proofStrip).getAllByRole('button')).toHaveLength(4);

    const directory = screen.getByRole('region', { name: /Quick navigation directory/i });
    expect(within(directory).getByText(/Recent Experience \(3\)/i)).toBeInTheDocument();
    expect(within(directory).getByText(/Flagship Projects \(4\)/i)).toBeInTheDocument();
  });

  it('supports instant 1-click jumps from Overview to Experience and Private Projects with walkthrough request', async () => {
    const user = userEvent.setup();
    render(<App />);

    const directory = screen.getByRole('region', { name: /Quick navigation directory/i });

    // Jump directly to QuadReal Property Group from Overview
    await user.click(within(directory).getByRole('button', { name: /QuadReal Property Group/i }));
    expect(
      screen.getByRole('heading', { level: 1, name: /QuadReal Property Group/i }),
    ).toBeInTheDocument();
    expect(window.location.hash).toBe('#experience/quadreal');

    // Return to 01 Overview and jump directly to DealFlow AI
    const nav = screen.getByRole('navigation', { name: 'Primary navigation' });
    await user.click(within(nav).getByRole('button', { name: /01.*Overview/i }));

    const directoryAgain = screen.getByRole('region', { name: /Quick navigation directory/i });
    await user.click(within(directoryAgain).getByRole('button', { name: /DealFlow AI/i }));
    expect(
      screen.getByRole('heading', { level: 1, name: /^DealFlow AI$/i }),
    ).toBeInTheDocument();
    expect(window.location.hash).toBe('#projects/dealflow-ai');
    expect(screen.getByText('02 / 04')).toBeInTheDocument();
    expect(screen.getByText(/Private Repository/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Request Walkthrough/i })).toHaveAttribute(
      'href',
      'mailto:alex.sun@torontomu.ca?subject=Walkthrough%20Request%3A%20DealFlow%20AI',
    );
    expect(screen.queryByText(/workspace\//i)).not.toBeInTheDocument();

    const browseProjectsRail = screen.getByRole('complementary', { name: /Browse projects/i });
    expect(
      within(browseProjectsRail).getByText(/Wholesaling Automation Radar/i),
    ).toBeInTheDocument();
    expect(
      within(browseProjectsRail).getByText(/Financial Terminal & DCF Suite/i),
    ).toBeInTheDocument();
    expect(within(browseProjectsRail).getByText(/Finance & Quant/i)).toBeInTheDocument();

    // Project media gallery starts with seamless looping inline video, expands to lightbox with controls, and cycles with arrows
    const gallery = screen.getByRole('figure', { name: /DealFlow AI walkthrough and screenshots/i });
    const inlineVideo = gallery.querySelector('video');
    expect(inlineVideo).toBeInTheDocument();
    expect(inlineVideo).not.toHaveAttribute('controls');

    await user.click(within(gallery).getByRole('button', { name: /Inspect Motion Demo full screen/i }));
    const lightbox = screen.getByRole('dialog', { name: /DealFlow AI media viewer/i });
    expect(lightbox).toBeInTheDocument();
    expect(lightbox.querySelector('video')).toHaveAttribute('controls');

    await user.keyboard('{ArrowRight}');
    expect(within(lightbox).getByText(/DealFlow AI \/ CRM Overview/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: /^DealFlow AI$/i })).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog', { name: /DealFlow AI media viewer/i })).not.toBeInTheDocument();

    // Pager advances cleanly to Financial Terminal & DCF Suite
    await user.click(screen.getByRole('button', { name: /Next project/i }));
    expect(
      screen.getByRole('heading', { level: 1, name: /Financial Terminal & DCF Suite/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('03 / 04')).toBeInTheDocument();
  });

  it('toggles Dark/Light mode, navigates to 04 Awards, and copies email', async () => {
    const user = userEvent.setup();
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: writeTextMock },
    });

    render(<App />);

    // Dark Mode toggle and back to Light
    const darkBtn = screen.getByRole('button', { name: /Switch to dark mode/i });
    await user.click(darkBtn);
    expect(document.documentElement.dataset.theme).toBe('dark');

    const lightBtn = screen.getByRole('button', { name: /Switch to light mode/i });
    await user.click(lightBtn);
    expect(document.documentElement.dataset.theme).toBe('light');

    // Navigate to 04 Awards without timeline/benchmarks chart
    const nav = screen.getByRole('navigation', { name: 'Primary navigation' });
    await user.click(within(nav).getByRole('button', { name: /04.*Awards/i }));
    expect(
      screen.getByRole('heading', { level: 1, name: /^Awards$/i }),
    ).toBeInTheDocument();
    const awardsRegion = screen.getByRole('region', { name: /Accomplishments and honors/i });
    expect(
      within(awardsRegion).getByText(/TRSM Top 10% & TMU Academic Achievement Scholarship/i),
    ).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Benchmarks' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Trajectory' })).not.toBeInTheDocument();
    expect(document.querySelector('canvas.tcv')).toBeNull();

    // Email copy chip
    await user.click(screen.getByRole('button', { name: /Copy email alex\.sun@torontomu\.ca/i }));
    expect(writeTextMock).toHaveBeenCalledWith('alex.sun@torontomu.ca');
    expect(screen.getByText(/Copied/i)).toBeInTheDocument();
  });
});
