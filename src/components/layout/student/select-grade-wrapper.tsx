import { getAllGradeLevelAction } from '@/actions/grade-level';
import { SelectGradeLevel } from './select-grade-level';

const SelectGradeWrapper = async () => {
  const res = await getAllGradeLevelAction();
  return <SelectGradeLevel items={res} />;
};

export { SelectGradeWrapper };
