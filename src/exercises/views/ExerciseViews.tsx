import { useParams } from "wouter";
import AppLayout from "../../common/layouts/AppLayout/AppLayout";
import ExerciseContent from "../components/ExerciseContent";

export default function ExerciseViews() {
  const { unitId } = useParams();
  return (
    <AppLayout>
      <ExerciseContent unitId={Number(unitId)} />
    </AppLayout>
  );
}
