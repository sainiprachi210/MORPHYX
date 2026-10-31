import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

// Mock 3D Canvas in unit test to avoid headless WebGL initialization in JSDOM
vi.mock('../src/components/canvas/HeroScene', () => ({
  HeroScene: () => <div data-testid="mock-3d-hero-scene">3D Core Canvas Active</div>,
  default: () => <div data-testid="mock-3d-hero-scene">3D Core Canvas Active</div>,
}));

describe('MORPHYX Web Application', () => {
  it('renders landing page brand name and headline', () => {
    render(<App />);

    // Check Brand in Navbar
    const brandTitles = screen.getAllByText('MORPHYX');
    expect(brandTitles.length).toBeGreaterThan(0);

    // Check Hero Headline H1
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/PRODUCTIVITY/i);
    expect(heading).toHaveTextContent(/REFORGED IN 3D/i);

    // Check Mocked 3D scene placeholder
    expect(screen.getByTestId('mock-3d-hero-scene')).toBeInTheDocument();

    // Check Features Section
    expect(screen.getByText(/FOUR PILLARS OF/i)).toBeInTheDocument();

    // Check Architecture Section
    expect(screen.getByText(/MODULAR FULL-STACK/i)).toBeInTheDocument();
  });

  it('renders action buttons and live telemetry panel', () => {
    render(<App />);

    expect(screen.getByText(/Initiate Mission/i)).toBeInTheDocument();
    expect(screen.getByText(/Explore Architecture/i)).toBeInTheDocument();
    expect(screen.getByText(/LIVE TELEMETRY & HEALTH ORCHESTRATION/i)).toBeInTheDocument();
  });
});
