export function areaColors(color: string) {
  return {
    firstColor: `var(--color-area-${color})`,
    secondColor: `color-mix(in srgb, var(--color-area-${color}) 20%, transparent)`,
  };
}
