import { v4 as uuid } from 'uuid';
import * as first from 'lodash/first';
import * as sprintf from 'sprintf-js';
import { ConfigService } from '@nestjs/config';

import { Direction } from '../enums/direction.enum';
import { DnaConfigType } from '../../application/config/dna.type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DnaServiceHelper {
  private config: DnaConfigType;

  constructor(private readonly configService: ConfigService) {
    this.config = configService.get<DnaConfigType>('dna');
  }

  public getMutations(
    table: string[],
    chars: string[] = this.config.chars,
    charsCount: number = this.config.thresholds.charsCount,
  ) {
    return table.filter((row) => this.getMutation(row, chars, charsCount));
  }

  public getMutation(row: string, chars: string[], charsCount: number) {
    const regexStringPattern = '([%s]{%d})';
    const regexPatternBuilt = chars
      .map((char) => sprintf.vsprintf(regexStringPattern, [char, charsCount]))
      .join('|');

    const dnaRegEx = new RegExp(regexPatternBuilt);
    const matches = row.match(dnaRegEx);
    return matches ? first(matches) : null;
  }

  public isValidTable(table: string[]): boolean {
    return !table.some((row) => row.length !== table.length);
  }

  public getRightToLeft(table: string[]) {
    return table;
  }

  public getTopToBottom(table: string[]) {
    return table.map((row, index) => {
      return Array.from(Array(table.length).keys())
        .map((i) => table[i][index])
        .join('');
    });
  }

  public getDiagonals(table: string[]) {
    const diagonals = new Map<string, string>();
    const directions = [Direction.LEFT_TO_RIGHT, Direction.TOP_TO_BOTTOM];
    table.map((_row, i) => {
      return directions.map((direction) => {
        const chars = Array.from(Array(table.length).keys())
          .map((x) => {
            const isLtr = direction === Direction.LEFT_TO_RIGHT;
            const y = isLtr ? x + i : x - i;
            return table[x][y];
          })
          .join('');

        const middleExists =
          direction === Direction.TOP_TO_BOTTOM && diagonals.size === 1;

        if (!middleExists && chars.length > 1) {
          diagonals.set(uuid(), chars);
        }
      });
    });

    return Array.from(diagonals.values());
  }

  public reverseColumns(table: string[]) {
    return table.map((chars) => Array.from(chars).reverse().join(''));
  }
}
