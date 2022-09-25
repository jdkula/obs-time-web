import { NoSsr } from '@mui/material';
import { useRouter } from 'next/router';
import { ClockState, OBSClock } from '~/components/OBSClock';
import { useLocalStorage } from '~/lib/useLocalStorage';

const ObsViewImpl = ({
  configStr,
  idStr,
}: {
  configStr: string;
  idStr: string;
}) => {
  const config = JSON.parse(decodeURIComponent(configStr));
  const id = decodeURIComponent(idStr);
  const [state, setState] = useLocalStorage<ClockState>(`CLOCK_${id}`, { id });
  return <OBSClock clock={config} state={state} setState={setState} />;
};

export default function ObsView() {
  const router = useRouter();
  const configStr = router.query['config'] as string;
  const idStr = router.query['id'] as string;

  if (!configStr || !idStr) {
    return null;
  }

  return (
    <NoSsr>
      <style>{`
        html, body, #__next {
          height: 100%;
          width: 100%;
          background: transparent;
          color: black;
        }
      `}</style>
      <ObsViewImpl {...{ configStr, idStr }} />
    </NoSsr>
  );
}
