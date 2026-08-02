import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import './gridOperations.js';

interface LegacyCell {
  position: number;
  cellValue: number;
  remotePositions: number[];
}

interface LegacyProcessLog {
  attempts: number;
}

declare global {
  interface Window {
    makeInitialGrid?: () => LegacyCell[];
    findSolutions?: (
      processLog: LegacyProcessLog,
      solutions: LegacyCell[][],
      grid: LegacyCell[],
      highestValue: number,
    ) => void;
  }
}

@Component({
  selector: 'app-aarons-game',
  imports: [CommonModule],
  templateUrl: './aarons-game.html',
  styleUrl: './aarons-game.scss',
})
export class AaronsGame implements OnInit {
  attempts = signal(0);
  solutions = signal<LegacyCell[][]>([]);

  ngOnInit(): void {
    this.runLegacySolver();
  }

  private runLegacySolver(): void {
    const solutions: LegacyCell[][] = [];
    const processLog: LegacyProcessLog = { attempts: 0 };

    const grid = window.makeInitialGrid?.();
    if (!grid) {
      throw new Error('Legacy solver could not initialize the grid.');
    }

    window.findSolutions?.(processLog, solutions, grid, 0);

    this.attempts.set(processLog.attempts);
    this.solutions.set(solutions);
  }
}
