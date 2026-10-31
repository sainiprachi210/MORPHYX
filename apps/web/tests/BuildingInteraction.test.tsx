// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { BuildingModal } from '../src/game/hud/BuildingModal';
import { InteractionPrompt } from '../src/game/hud/InteractionPrompt';
import { MissionProvider } from '../src/game/missions/MissionContext';
import {
  ALL_INTERACTIVE_BUILDINGS,
} from '../src/game/constants/cityLayout';

describe('MORPHYX Building Interaction & Modal System', () => {
  beforeEach(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.clear();
    }
  });

  afterEach(() => {
    cleanup();
  });

  const getBuilding = (id: string) => {
    const found = ALL_INTERACTIVE_BUILDINGS.find(b => b.id === id);
    if (!found) throw new Error(`Building ${id} not found`);
    return found;
  };

  // 1. Post Office -> Inbox Zero Mission
  it('opens Inbox Zero mission in Post Office with Accept, Decline, 5 tasks, progress, and rewards', () => {
    const postOffice = getBuilding('metro-post');
    const onClose = vi.fn();

    render(
      <MissionProvider>
        <BuildingModal building={postOffice} onClose={onClose} />
      </MissionProvider>
    );

    // Verify building name and role
    expect(screen.getAllByText('Post Office (Metro Post)').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Inbox Zero')).toBeDefined();
    expect(
      screen.getByText(/Organize your inbox by categorizing 5 incoming communications/)
    ).toBeDefined();

    // Verify Accept and Decline buttons are present
    expect(screen.getByRole('button', { name: /accept mission/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /decline/i })).toBeDefined();

    // Verify Progress is displayed
    expect(screen.getByText(/0 \/ 5 Organized/i)).toBeDefined();

    // Verify 5 sample email tasks are present with category buttons: Work, Personal, Important
    expect(screen.getByText('Lead Architect <arch@morphyx.internal>')).toBeDefined();
    expect(screen.getByText('Security Operations <sec-ops@sentinel.net>')).toBeDefined();
    expect(screen.getByText('Elena Vance <elena.vance@personal.io>')).toBeDefined();
    expect(screen.getByText('Developer Digest <digest@spatial-dev.org>')).toBeDefined();
    expect(screen.getByText('Family Circle <family@network.org>')).toBeDefined();

    const workButtons = screen.getAllByRole('button', { name: /^Work/i });
    expect(workButtons.length).toBe(5);

    // Click category for first email
    fireEvent.click(workButtons[0]);
    expect(screen.getByText(/1 \/ 5 Organized/i)).toBeDefined();

    // Close button & Return to City
    const closeBtn = screen.getByRole('button', { name: /^Close/i });
    expect(closeBtn).toBeDefined();
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalled();

    const returnBtn = screen.getByRole('button', { name: /return to city/i });
    expect(returnBtn).toBeDefined();
    fireEvent.click(returnBtn);
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  // 2. Bank -> Budget Master Mission
  it('opens Budget Master mission in Bank with Accept, Decline, 5 expenses, spending summary, and rewards', () => {
    const bank = getBuilding('apex-bank');
    const onClose = vi.fn();

    render(
      <MissionProvider>
        <BuildingModal building={bank} onClose={onClose} />
      </MissionProvider>
    );

    // Verify building name and title
    expect(screen.getAllByText('Bank (Apex Vault)').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Budget Master')).toBeDefined();
    expect(
      screen.getByText(/Audit and categorize 5 business expenses and review the spending summary/)
    ).toBeDefined();

    // Verify Accept and Decline buttons
    expect(screen.getByRole('button', { name: /accept mission/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /decline/i })).toBeDefined();

    // Verify Spending Summary Audit is displayed
    expect(screen.getByText('SPENDING SUMMARY AUDIT')).toBeDefined();
    expect(screen.getByText(/Total Ledger:/i)).toBeDefined();

    // Verify Progress is displayed
    expect(screen.getByText(/0 \/ 5 Categorized/i)).toBeDefined();

    // Verify 5 expenses are present
    expect(screen.getByText('Vercel & AWS Cloud Compute')).toBeDefined();
    expect(screen.getByText('GitHub Copilot Enterprise')).toBeDefined();
    expect(screen.getByText('Ergonomic 4K Ultrawide Monitor')).toBeDefined();
    expect(screen.getByText('Metro Transit Pass & Regional Train')).toBeDefined();
    expect(screen.getByText('Fiber Gigabit Internet & Office Utilities')).toBeDefined();

    const opButtons = screen.getAllByRole('button', { name: /^Operations/i });
    expect(opButtons.length).toBe(5);

    // Categorize one item
    fireEvent.click(opButtons[0]);
    expect(screen.getByText(/1 \/ 5 Categorized/i)).toBeDefined();

    // Close buttons
    expect(screen.getByRole('button', { name: /^Close/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /return to city/i })).toBeDefined();
  });

  // 3. Tech Office -> File Organizer Mission
  it('opens File Organizer mission in Tech Office with Accept, Decline, 5 files, and destination buttons', () => {
    const techOffice = getBuilding('cybercore-tech');
    const onClose = vi.fn();

    render(
      <MissionProvider>
        <BuildingModal building={techOffice} onClose={onClose} />
      </MissionProvider>
    );

    // Verify building name and title
    expect(screen.getAllByText('Tech Office (CyberCore Tech)').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('File Organizer')).toBeDefined();
    expect(
      screen.getByText(/Sort 5 unorganized repository files into the correct project directories/)
    ).toBeDefined();

    // Verify Accept and Decline buttons
    expect(screen.getByRole('button', { name: /accept mission/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /decline/i })).toBeDefined();

    // Verify Progress
    expect(screen.getByText(/0 \/ 5 Files Sorted/i)).toBeDefined();

    // Verify 5 files
    expect(screen.getByText('PlayerMovement.ts')).toBeDefined();
    expect(screen.getByText('Architecture_Specification.md')).toBeDefined();
    expect(screen.getByText('DistrictHeroSkyline.png')).toBeDefined();
    expect(screen.getByText('PhysicsEngine.test.ts')).toBeDefined();
    expect(screen.getByText('DatabaseSchema_v2.sql')).toBeDefined();

    // Destination buttons (/src, /docs, /assets, /tests, /config)
    const srcButtons = screen.getAllByRole('button', { name: /^\/src/i });
    expect(srcButtons.length).toBe(5);

    // Sort one file
    fireEvent.click(srcButtons[0]);
    expect(screen.getByText(/1 \/ 5 Files Sorted/i)).toBeDefined();

    // Close buttons
    expect(screen.getByRole('button', { name: /^Close/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /return to city/i })).toBeDefined();
  });

  // 4. Nexus Central Obelisk -> Achievements & Leaderboard ONLY
  it('opens achievements and leaderboard panel ONLY for Nexus Central Obelisk', () => {
    const obelisk = getBuilding('nexus-plaza');
    const onClose = vi.fn();

    render(
      <MissionProvider>
        <BuildingModal building={obelisk} onClose={onClose} />
      </MissionProvider>
    );

    expect(screen.getAllByText('Nexus Central Obelisk').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('COMMUNITY ACHIEVEMENTS & MILESTONES')).toBeDefined();
    expect(screen.getByText('GLOBAL SPRINT OPERATIVE STANDINGS')).toBeDefined();
    expect(screen.getByText('City Pioneer')).toBeDefined();
    expect(screen.getByText('Zero Trust Guard')).toBeDefined();
    expect(screen.getByText('Sprint Champion')).toBeDefined();
    expect(screen.getByText('Century Builder')).toBeDefined();
  });

  // 5. Other Buildings -> Their own relevant information panel, NEVER Obelisk panel
  it('opens relevant district information panel for other buildings and NEVER the Obelisk panel', () => {
    const cyberCafe = getBuilding('east-shop-1');
    const onClose = vi.fn();

    render(
      <MissionProvider>
        <BuildingModal building={cyberCafe} onClose={onClose} />
      </MissionProvider>
    );

    // Shows Byte & Brew Cyber Cafe information
    const cafeElements = screen.getAllByText('Byte & Brew Cyber Cafe');
    expect(cafeElements.length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getByText(/High-caffeine espresso bar, ergonomic focus booths/)
    ).toBeDefined();
    expect(screen.getByText(/DISTRICT CLASSIFICATION: COMMERCIAL/i)).toBeDefined();

    // CRITICAL: NEVER SHOWS ACHIEVEMENTS OR LEADERBOARD FOR OTHER BUILDINGS!
    expect(screen.queryByText('COMMUNITY ACHIEVEMENTS & MILESTONES')).toBeNull();
    expect(screen.queryByText('GLOBAL SPRINT OPERATIVE STANDINGS')).toBeNull();
    expect(screen.queryByText('City Pioneer')).toBeNull();

    // Visible Close and Return to City buttons
    expect(screen.getByRole('button', { name: /^Close/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /return to city/i })).toBeDefined();
  });

  // 6. Proximity InteractionPrompt shows building name and 'Press E to interact'
  it('displays the building name and clear "Press E to interact" message in proximity prompt', () => {
    const postOffice = getBuilding('metro-post');
    const onInteract = vi.fn();

    render(
      <MissionProvider>
        <InteractionPrompt building={postOffice} onInteract={onInteract} />
      </MissionProvider>
    );

    // Verify building name is clearly displayed
    expect(screen.getAllByText('Post Office (Metro Post)').length).toBeGreaterThanOrEqual(1);

    // Verify clear "Press E to interact" button
    const interactButton = screen.getByRole('button', { name: /press e to interact/i });
    expect(interactButton).toBeDefined();

    // Clicking button triggers onInteract
    fireEvent.click(interactButton);
    expect(onInteract).toHaveBeenCalled();
  });
});
