import LegalPage from "@/components/LegalPage";
import { Suspense } from "react";

type Props = {
  params: Promise<{ handle: string }>;
};

export default async function Legals(props: Props) {
  const params = await props.params;

  return (
    <Suspense>
      <LegalPage handle={params.handle} />
    </Suspense>
  );
}
