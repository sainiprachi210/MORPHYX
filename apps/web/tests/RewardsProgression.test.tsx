// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, renderHook, act } from '@testing-library/react';
import { MissionProvider, useMissionSystem } from '../src/game/missions/MissionContext';
import { calculateLevelInfo, LEVEL_THRESHOLDS } from '../src/game/missions/levelProgression';
import { CityHUD } from '../src/game/hud/CityHUD';
import { MissionNotification } from '../src/game/hud/MissionNotification';
import { BrowserRouter } from 'react-router-dom';

describe('MORPHYX XP, Coins and Level Progression Rewards System', () => {
  beforeEach(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.clear();
    }
  });

  // 1. Level progression math verification
  it('correctly calculates levels and progress based on specified XP thresholds', () => {
    // Level 1: 0 XP
    const lvl1 = calculateLevelInfo(0);
    expect(lvl1.level).toBe(1);
    expect(lvl1.baseXp).toBe(0);
    expect(lvl1.targetXp).toBe(200);
    expect(lvl1.currentLevelXp).toBe(0);
    expect(lvl1.nextLevelXp).toBe(200);
    expect(lvl1.progressPercent).toBe(0);
    expect(lvl1.xpToNextLevel).toBe(200);

    // 100 XP: Still Level 1, 50% to Level 2
    const lvl1Mid = calculateLevelInfo(100);
    expect(lvl1Mid.level).toBe(1);
    expect(lvl1Mid.currentLevelXp).toBe(100);
    expect(lvl1Mid.progressPercent).toBe(50);
    expect(lvl1Mid.xpToNextLevel).toBe(100);

    // Level 2: 200 XP
    const lvl2 = calculateLevelInfo(200);
    expect(lvl2.level).toBe(2);
    expect(lvl2.baseXp).toBe(200);
    expect(lvl2.targetXp).toBe(500);
    expect(lvl2.currentLevelXp).toBe(0);
    expect(lvl2.nextLevelXp).toBe(300);
    expect(lvl2.progressPercent).toBe(0);
    expect(lvl2.xpToNextLevel).toBe(300);

    // Level 3: 500 XP
    const lvl3 = calculateLevelInfo(500);
    expect(lvl3.level).toBe(3);
    expect(lvl3.baseXp).toBe(500);
    expect(lvl3.targetXp).toBe(900);
    expect(lvl3.currentLevelXp).toBe(0);
    expect(lvl3.nextLevelXp).toBe(400);

    // Level 4: 900 XP
    const lvl4 = calculateLevelInfo(900);
    expect(lvl4.level).toBe(4);
    expect(lvl4.baseXp).toBe(900);
    expect(lvl4.targetXp).toBe(1400);
    expect(lvl4.currentLevelXp).toBe(0);
    expect(lvl4.nextLevelXp).toBe(500);

    // Extended levels continue with reasonable quadratic requirements
    expect(LEVEL_THRESHOLDS[4]).toBe(1400); // Level 5
    expect(LEVEL_THRESHOLDS[5]).toBe(2000); // Level 6
    expect(LEVEL_THRESHOLDS[6]).toBe(2700); // Level 7
  });

  // 2. XP & Coins rewards awarded upon mission completion
  it('awards exact specified XP (100, 150, 200) and coins upon completion', () => {
    const { result } = renderHook(() => useMissionSystem(), {
      wrapper: ({ children }) => <MissionProvider>{children}</MissionProvider>,
    });

    // Initial state: Level 1, 0 XP, 0 Coins
    expect(result.current.playerStats.xp).toBe(0);
    expect(result.current.playerStats.coins).toBe(0);
    expect(result.current.playerStats.level).toBe(1);

    // Complete Mission 1: Inbox Zero (100 XP, 50 Coins)
    act(() => {
      result.current.completeMission('inbox-zero');
    });

    expect(result.current.playerStats.xp).toBe(100);
    expect(result.current.playerStats.coins).toBe(50);
    expect(result.current.playerStats.level).toBe(1);
    expect(result.current.levelInfo.progressPercent).toBe(50);
    expect(result.current.missions['inbox-zero'].status).toBe('COMPLETED');

    // Complete Mission 2: Budget Master (150 XP, 75 Coins)
    act(() => {
      result.current.completeMission('budget-master');
    });

    // 100 + 150 = 250 XP -> reached Level 2 (starts at 200)
    expect(result.current.playerStats.xp).toBe(250);
    expect(result.current.playerStats.coins).toBe(125);
    expect(result.current.playerStats.level).toBe(2);
    expect(result.current.levelInfo.currentLevelXp).toBe(50); // 250 - 200 = 50 in Level 2
    expect(result.current.missions['budget-master'].status).toBe('COMPLETED');

    // Complete Mission 3: File Organizer (200 XP, 100 Coins)
    act(() => {
      result.current.completeMission('file-organizer');
    });

    // 250 + 200 = 450 XP -> still Level 2 (Level 3 requires 500)
    expect(result.current.playerStats.xp).toBe(450);
    expect(result.current.playerStats.coins).toBe(225);
    expect(result.current.playerStats.level).toBe(2);
    expect(result.current.levelInfo.xpToNextLevel).toBe(50); // 500 - 450 = 50 XP to Level 3
    expect(result.current.missions['file-organizer'].status).toBe('COMPLETED');
  });

  // 3. Duplicate reward prevention
  it('prevents accidental duplicate rewards for the same mission', () => {
    const { result } = renderHook(() => useMissionSystem(), {
      wrapper: ({ children }) => <MissionProvider>{children}</MissionProvider>,
    });

    // Complete once
    act(() => {
      result.current.completeMission('inbox-zero');
    });

    const xpAfterFirst = result.current.playerStats.xp;
    const coinsAfterFirst = result.current.playerStats.coins;
    expect(xpAfterFirst).toBe(100);
    expect(coinsAfterFirst).toBe(50);

    // Attempt second completion immediately
    act(() => {
      result.current.completeMission('inbox-zero');
    });

    // Stats should NOT have increased
    expect(result.current.playerStats.xp).toBe(xpAfterFirst);
    expect(result.current.playerStats.coins).toBe(coinsAfterFirst);
    expect(result.current.playerStats.completedMissionsCount).toBe(1);

    // Attempt third completion
    act(() => {
      result.current.completeMission('inbox-zero');
    });

    expect(result.current.playerStats.xp).toBe(100);
    expect(result.current.playerStats.coins).toBe(50);
  });

  // 4. Deliberate replay support
  it('supports deliberate replay through replayMission without duplicate exploit', () => {
    const { result } = renderHook(() => useMissionSystem(), {
      wrapper: ({ children }) => <MissionProvider>{children}</MissionProvider>,
    });

    act(() => {
      result.current.completeMission('inbox-zero');
    });
    expect(result.current.playerStats.xp).toBe(100);

    // Trigger deliberate replay
    act(() => {
      result.current.replayMission('inbox-zero');
    });

    // Status is reset to AVAILABLE, progress to 0
    expect(result.current.missions['inbox-zero'].status).toBe('AVAILABLE');
    expect(result.current.missions['inbox-zero'].currentProgress).toBe(0);

    // Player completes again through legitimate deliberate replay
    act(() => {
      result.current.completeMission('inbox-zero');
    });

    expect(result.current.playerStats.xp).toBe(200);
    expect(result.current.playerStats.coins).toBe(100);
    expect(result.current.playerStats.level).toBe(2);
  });

  // 5. LocalStorage persistence across refresh
  it('persists XP, coins, level, and completed status across simulated browser reload', () => {
    // Session 1: Complete 2 missions
    const { result: session1 } = renderHook(() => useMissionSystem(), {
      wrapper: ({ children }) => <MissionProvider>{children}</MissionProvider>,
    });

    act(() => {
      session1.current.completeMission('inbox-zero'); // +100 XP, +50 Coins
      session1.current.completeMission('budget-master'); // +150 XP, +75 Coins
    });

    expect(session1.current.playerStats.xp).toBe(250);
    expect(session1.current.playerStats.coins).toBe(125);
    expect(session1.current.playerStats.level).toBe(2);

    // Session 2: Fresh mount reading from localStorage (simulates browser refresh)
    const { result: session2 } = renderHook(() => useMissionSystem(), {
      wrapper: ({ children }) => <MissionProvider>{children}</MissionProvider>,
    });

    expect(session2.current.playerStats.xp).toBe(250);
    expect(session2.current.playerStats.coins).toBe(125);
    expect(session2.current.playerStats.level).toBe(2);
    expect(session2.current.levelInfo.level).toBe(2);
    expect(session2.current.levelInfo.currentLevelXp).toBe(50);
    expect(session2.current.missions['inbox-zero'].status).toBe('COMPLETED');
    expect(session2.current.missions['budget-master'].status).toBe('COMPLETED');
    expect(session2.current.missions['file-organizer'].status).toBe('AVAILABLE');
  });

  // 6. HUD rendering: Level, XP progress bar, and Coin balance
  it('renders level, XP progress bar, and coin balance cleanly in CityHUD', () => {
    render(
      <BrowserRouter>
        <MissionProvider>
          <CityHUD playerPos={[0, 0, 0]} />
        </MissionProvider>
      </BrowserRouter>
    );

    // Level badge
    expect(screen.getByText('LVL 1')).toBeDefined();

    // XP
    expect(screen.getByText('0 XP')).toBeDefined();

    // XP progress label
    expect(screen.getByText('0/200 XP')).toBeDefined();

    // Coins balance
    expect(screen.getByText('COINS')).toBeDefined();
    expect(screen.getByText('0')).toBeDefined();
  });

  // 7. Notification displays earned rewards and Level Up banner
  it('displays rewards toast and level up announcement when mission completes', () => {
    const TestComponent = () => {
      const { completeMission } = useMissionSystem();
      return (
        <div>
          <button onClick={() => completeMission('inbox-zero')}>Complete Inbox Zero</button>
          <button onClick={() => completeMission('budget-master')}>Complete Budget Master</button>
          <MissionNotification />
        </div>
      );
    };

    render(
      <MissionProvider>
        <TestComponent />
      </MissionProvider>
    );

    // Complete Inbox Zero: +100 XP, +50 Coins
    fireEvent.click(screen.getByText('Complete Inbox Zero'));

    expect(screen.getByText('MISSION ACCOMPLISHED')).toBeDefined();
    expect(screen.getByText('Inbox Zero')).toBeDefined();
    expect(screen.getByText('+100 XP')).toBeDefined();
    expect(screen.getByText('+50 Coins')).toBeDefined();

    // Complete Budget Master: brings XP from 100 to 250 -> Level Up to Level 2!
    fireEvent.click(screen.getByText('Complete Budget Master'));

    expect(screen.getByText('Budget Master')).toBeDefined();
    expect(screen.getByText('+150 XP')).toBeDefined();
    expect(screen.getByText('+75 Coins')).toBeDefined();
    expect(screen.getByText(/LEVEL UP! PROMOTED TO LEVEL 2/i)).toBeDefined();
  });
});
