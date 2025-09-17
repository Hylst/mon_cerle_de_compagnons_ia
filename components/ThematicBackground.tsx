/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { AgentTheme } from '../lib/presets/agents';
import cn from 'classnames';

type ThematicBackgroundProps = {
  theme: AgentTheme;
};

export default function ThematicBackground({ theme }: ThematicBackgroundProps) {
  const patternClass = theme.pattern ? `pattern-${theme.pattern}` : '';

  return (
    <div
      className={cn('thematic-background', patternClass)}
      style={{ background: theme.gradient }}
    />
  );
}