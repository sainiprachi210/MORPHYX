import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';

// Mock 3D CityPage to prevent WebGL / ResizeObserver initialization errors in headless JSDOM
vi.mock('../src/pages/CityPage', () => ({
  CityPage: () => <div data-testid="mock-city-page">3D City Page Active</div>,
  default: () => <div data-testid="mock-city-page">3D City Page Active</div>,
}));

describe('MORPHYX Simplified First Page & Navigation', () => {
  beforeEach(() => {
    window.history.pushState({}, 'Test', '/');
    if (typeof window !== 'undefined') {
      window.localStorage.clear();
    }
  });

  it('renders clean welcoming landing screen with MORPHYX title and subtitle', () => {
    render(<App />);

    // Brand Title H1
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('MORPHYX');

    // Subtitle tagline
    expect(screen.getByText(/Your city\. Your missions\. Your progress\./i)).toBeInTheDocument();
  });

  it('displays the three primary options: PLAY GAME, HOW TO PLAY, and SETTINGS', () => {
    render(<App />);

    const playButton = screen.getByRole('button', { name: /PLAY GAME/i });
    const howToPlayButton = screen.getByRole('button', { name: /HOW TO PLAY/i });
    const settingsButton = screen.getByRole('button', { name: /SETTINGS/i });

    expect(playButton).toBeInTheDocument();
    expect(howToPlayButton).toBeInTheDocument();
    expect(settingsButton).toBeInTheDocument();
  });

  it('opens and closes the HOW TO PLAY modal on button click', () => {
    render(<App />);

    const howToPlayButton = screen.getByRole('button', { name: /HOW TO PLAY/i });
    fireEvent.click(howToPlayButton);

    // Modal should now be visible
    expect(screen.getByText(/HOW TO PLAY MORPHYX/i)).toBeInTheDocument();
    expect(screen.getByText(/W A S D \/ Arrows/i)).toBeInTheDocument();
    expect(screen.getByText(/Post Office → Inbox Zero/i)).toBeInTheDocument();
    expect(screen.getByText(/Bank → Budget Master/i)).toBeInTheDocument();
    expect(screen.getByText(/Tech Office → File Organizer/i)).toBeInTheDocument();

    // Close button works
    const closeButton = screen.getByTitle('Close (Esc)');
    fireEvent.click(closeButton);

    expect(screen.queryByText(/HOW TO PLAY MORPHYX/i)).not.toBeInTheDocument();
  });

  it('opens and interacts with the SETTINGS modal', () => {
    render(<App />);

    const settingsButton = screen.getByRole('button', { name: /SETTINGS/i });
    fireEvent.click(settingsButton);

    // Modal should be visible
    expect(screen.getByText(/GAME SETTINGS/i)).toBeInTheDocument();
    expect(screen.getByText(/Ambient City Sounds/i)).toBeInTheDocument();

    // Toggle sound
    const soundToggle = screen.getByRole('button', { name: /ENABLED/i });
    fireEvent.click(soundToggle);
    expect(screen.getByRole('button', { name: /MUTED/i })).toBeInTheDocument();

    // Sensitivity selection
    const fastButton = screen.getByRole('button', { name: /Fast/i });
    fireEvent.click(fastButton);

    // Done button closes modal
    const doneButton = screen.getByRole('button', { name: /Done/i });
    fireEvent.click(doneButton);
    expect(screen.queryByText(/GAME SETTINGS/i)).not.toBeInTheDocument();
  });

  it('navigates to the 3D City scene when PLAY GAME is clicked', () => {
    render(<App />);

    const playButton = screen.getByRole('button', { name: /PLAY GAME/i });
    fireEvent.click(playButton);

    // Confirms city page mounts
    expect(screen.getByTestId('mock-city-page')).toBeInTheDocument();
    expect(window.location.pathname).toBe('/city');
  });
});
