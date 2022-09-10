import {
  doc,
  DocumentReference,
  updateDoc,
  addDoc,
  setDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { Clock, clocks, CountDown, CountUp } from "../../../lib/collection";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useCallback, useEffect, useState } from "react";

function useClock() {
  const router = useRouter();
  const clockId = router.query["clockId"] as string | undefined;
  const docref = clockId ? doc(clocks, clockId) : null;

  return [...useDocumentData(docref), docref] as const;
}

function getDefault(desiredType: "clock"): Clock;
function getDefault(desiredType: "countup"): CountUp;
function getDefault(desiredType: "countdown"): CountDown;
function getDefault(
  desiredType: "clock" | "countup" | "countdown"
): Clock | CountUp | CountDown;
function getDefault(
  desiredType: "clock" | "countup" | "countdown"
): Clock | CountUp | CountDown {
  switch (desiredType) {
    case "clock": {
      return {
        type: "clock",
        style: "",
        time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };
    }
    case "countdown": {
      const now = Date.now();
      return {
        type: "countdown",
        style: "",
        pause_time: now,
        start_time: now,
        duration: 0,
      };
    }
    case "countup": {
      const now = Date.now();
      return {
        type: "countup",
        pause_time: now,
        start_time: now,
        style: "",
      };
    }
  }
}

export default function ClockConfig() {
  const [raw, loading, err, _, docref] = useClock();

  const [desiredType, setDesiredType] = useState<
    "clock" | "countup" | "countdown"
  >("clock");

  const data: Clock | CountDown | CountUp =
    !!raw && raw.type === desiredType ? raw : getDefault(desiredType);

  useEffect(() => {
    if (raw?.type) {
      setDesiredType(raw.type);
    }
  }, [raw?.type]);

  if (!docref) return null;

  return (
    <div>
      {data.type !== "clock" && (
        <button onClick={() => setDesiredType("clock")}>
          Change type to clock
        </button>
      )}
      {data.type !== "countup" && (
        <button onClick={() => setDesiredType("countup")}>
          Change type to countup
        </button>
      )}
      {data.type !== "countdown" && (
        <button onClick={() => setDesiredType("countdown")}>
          Change type to countdown
        </button>
      )}
      {data.type === "clock" && (
        <TimeClockConfig
          data={data}
          docref={docref as DocumentReference<Clock>}
        />
      )}
      {data.type === "countup" && (
        <CountUpConfig
          data={data}
          docref={docref as DocumentReference<CountUp>}
        />
      )}
      {data.type === "countdown" && (
        <CountDownConfig
          data={data}
          docref={docref as DocumentReference<CountDown>}
        />
      )}
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  );
}

function TimeClockConfig({
  data,
  docref,
}: {
  data: Clock;
  docref: DocumentReference<Clock>;
}) {
  const [style, setStyle] = useState("");

  useEffect(() => {
    if (data?.style) {
      setStyle(data.style);
    }
  }, [data?.style]);

  const save = useCallback(
    (newData: Partial<Clock>) => {
      setDoc(docref, { ...data, ...newData });
    },
    [data, docref]
  );

  if (!data || !docref) {
    return null;
  }

  return (
    <div>
      <textarea value={style} onChange={(e) => setStyle(e.target.value)} />
      <button onClick={() => save({ style })}>Save Style</button>
      <div>
        Your Time Zone: {Intl.DateTimeFormat().resolvedOptions().timeZone}{" "}
        <button
          onClick={() =>
            save({
              time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            })
          }
        >
          Save Time Zone
        </button>
      </div>
    </div>
  );
}

function CountUpConfig({
  data,
  docref,
}: {
  data: CountUp;
  docref: DocumentReference<CountUp>;
}) {
  const [style, setStyle] = useState("");

  useEffect(() => {
    if (data?.style) {
      setStyle(data.style);
    }
  }, [data?.style]);

  const save = useCallback(
    (newData: Partial<CountUp>) => {
      setDoc(docref, { ...data, ...newData });
    },
    [data, docref]
  );

  const start = () => {
    if (data.start_time === data.pause_time) {
      save({
        start_time: Date.now(),
        pause_time: null,
      });
    } else if (data.pause_time) {
      const elapsed = data.pause_time - data.start_time;
      save({
        start_time: Date.now() - elapsed,
        pause_time: null,
      });
    }
  };

  const pause = () => {
    save({
      pause_time: Date.now(),
    });
  };

  const reset = () => {
    const now = Date.now();
    save({
      start_time: now,
      pause_time: now,
    });
  };

  if (!data || !docref) {
    return null;
  }

  return (
    <div>
      <textarea value={style} onChange={(e) => setStyle(e.target.value)} />
      <button onClick={() => save({ style })}>Save Style</button>

      {data.pause_time !== null && <button onClick={start}>Start</button>}
      {data.pause_time === null && <button onClick={pause}>Pause</button>}
      {data.pause_time === null && <button onClick={reset}>Reset</button>}
    </div>
  );
}

function CountDownConfig({
  data,
  docref,
}: {
  data: CountDown;
  docref: DocumentReference<CountDown>;
}) {
  const [style, setStyle] = useState("");
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (data?.style) {
      setStyle(data.style);
    }
  }, [data?.style]);

  useEffect(() => {
    if (data?.duration) {
      setDuration(data.duration);
    }
  }, [data?.duration]);

  const save = useCallback(
    (newData: Partial<CountDown>) => {
      setDoc(docref, { ...data, ...newData });
    },
    [data, docref]
  );

  const start = () => {
    if (data.start_time === data.pause_time) {
      save({
        start_time: Date.now(),
        pause_time: null,
      });
    } else if (data.pause_time) {
      const elapsed = data.pause_time - data.start_time;
      save({
        start_time: Date.now() - elapsed,
        pause_time: null,
      });
    }
  };

  const pause = () => {
    save({
      pause_time: Date.now(),
    });
  };

  const reset = () => {
    const now = Date.now();
    save({
      start_time: now,
      pause_time: now,
    });
  };

  if (!data || !docref) {
    return null;
  }

  return (
    <div>
      <textarea value={style} onChange={(e) => setStyle(e.target.value)} />
      <button onClick={() => save({ style })}>Save Style</button>

      <input
        type="number"
        value={duration}
        onChange={(e) => setDuration(e.target.valueAsNumber)}
      />
      <button onClick={() => save({ duration })}>
        Save Duration (seconds)
      </button>

      {data.pause_time !== null && <button onClick={start}>Start</button>}
      {data.pause_time === null && <button onClick={pause}>Pause</button>}
      {data.pause_time === null && <button onClick={reset}>Reset</button>}
    </div>
  );
}
