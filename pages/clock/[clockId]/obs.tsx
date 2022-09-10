import { doc } from "firebase/firestore";
import { useRouter } from "next/router";
import { Clock, clocks, CountDown, CountUp } from "../../../lib/collection";
import { useDocumentData } from "react-firebase-hooks/firestore";

export default function ClockConfig() {
  const router = useRouter();
  const clockId = router.query["clockId"] as string | undefined;

  const [raw, loading, err] = useDocumentData(
    clockId ? doc(clocks, clockId) : null
  );
  const data: Clock | CountDown | CountUp = raw ?? {
    type: "clock",
    style: "",
    time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };

  return (
    <div>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  );
}
