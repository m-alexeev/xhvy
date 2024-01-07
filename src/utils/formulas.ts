const brzyckiFormula = (weight: number, reps: number): number => {
  return Math.abs(Math.round(weight / (1.0278 - (0.0278 * reps))));
};

const epleyFormula = (weight: number, reps: number): number => {
  return Math.round(weight * (1 + 0.0333 * reps));
};

const landersFormula = (weight: number, reps: number): number => {
  return Math.abs(Math.round((100 * weight) / (101.3 - (2.67123 * reps))));
};

export { brzyckiFormula, epleyFormula, landersFormula };
