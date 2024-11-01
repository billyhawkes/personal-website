import * as migration_20241101_171242 from './20241101_171242';

export const migrations = [
  {
    up: migration_20241101_171242.up,
    down: migration_20241101_171242.down,
    name: '20241101_171242'
  },
];
