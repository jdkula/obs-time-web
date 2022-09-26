import { Css, Download } from '@mui/icons-material';
import {
  AppBar,
  Button,
  ButtonGroup,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  FormLabel,
  IconButton,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Controls } from '~/components/controls';
import { CssDialogueContent } from '~/components/Dialogs';
import {
  ClockState,
  OBSClock,
  OBSClockDefinition,
} from '~/components/OBSClock';

const Home: NextPage = () => {
  const [clock, setClock] = useState<OBSClockDefinition>();
  const [state, setState] = useState<ClockState>({ id: Date.now().toString() });
  const [importing, setImporting] = useState(false);
  const [importValue, setImportValue] = useState('');
  const [cssInfoOpen, setShowCssInfo] = useState(false);

  useEffect(() => {
    try {
      const url = new URL(importValue);
      const config = url.searchParams.get('config');
      if (!config) return;
      const parsed = JSON.parse(config);
      setClock(parsed);
      setImporting(false);
      setImportValue('');
    } catch (e) {
      // ignore
    }
  }, [importValue]);

  useEffect(() => {
    setState({ id: Date.now().toString() });
  }, [clock?.type]);

  const hook = (defaultClock: OBSClockDefinition) => {
    return {
      onClick: () => setClock(defaultClock),
      variant:
        clock?.type === defaultClock.type ? ('contained' as const) : undefined,
    };
  };

  return (
    <div>
      <Dialog open={importing} onClose={() => setImporting(false)}>
        <DialogTitle>Import</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Paste the link from OBS to edit its settings:
          </Typography>
          <TextField
            fullWidth
            value={importValue}
            onChange={(e) => setImportValue(e.target.value)}
            label="OBS Link"
          />
        </DialogContent>
      </Dialog>
      <Dialog
        open={cssInfoOpen}
        onClose={() => setShowCssInfo(false)}
        maxWidth="xs"
      >
        <CssDialogueContent />
      </Dialog>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            OBS Clock
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: { xs: 'stretch', md: 'space-around' },
            margin: '2rem',
            '& > div': {
              padding: '2rem',
              border: '1px solid gray',
              flexGrow: 1,
              width: {
                md: '2%',
              },
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="overline"
              sx={{ borderBottom: '1px solid gray', marginBottom: '1rem' }}
            >
              Controls
            </Typography>
            <ButtonGroup
              variant="outlined"
              aria-labelledby="type-label"
              fullWidth
            >
              <Button {...hook({ type: 'clock' })} fullWidth>
                Clock
              </Button>
              <Button
                {...hook({
                  type: 'stopwatch',
                  startMs: 0,
                  autoStart: true,
                  resetAfter: 3600 * 1000,
                })}
                fullWidth
              >
                Stopwatch
              </Button>
              <Button
                {...hook({
                  type: 'timer',
                  durationMs: 60 * 1000,
                  autoStart: true,
                  resetAfter: 3600 * 1000,
                })}
                fullWidth
              >
                Timer
              </Button>
              <Button sx={{ width: '40px' }} onClick={() => setImporting(true)}>
                <Download fontSize="small" />
              </Button>
            </ButtonGroup>
            <Box
              sx={{
                '& > div': { marginTop: '1rem', marginBottom: '1rem' },
                width: '100%',
              }}
            >
              {clock && <Controls clock={clock} setClock={setClock} />}
            </Box>
            {clock && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  marginTop: '1rem',
                }}
              >
                <FormLabel sx={{ marginRight: '0.5rem' }}>
                  URL for OBS:
                </FormLabel>
                <TextField
                  sx={{ flexGrow: 1 }}
                  size="small"
                  value={
                    typeof window === 'undefined'
                      ? ''
                      : `${window.location.protocol}//${
                          window.location.host
                        }/obs?id=${encodeURIComponent(
                          state.id
                        )}&config=${encodeURIComponent(JSON.stringify(clock))}`
                  }
                />
                <Tooltip title="CSS Info" arrow placement="top">
                  <IconButton
                    sx={{ marginLeft: '8px' }}
                    onClick={() => setShowCssInfo(true)}
                  >
                    <Css />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="overline"
              sx={{ borderBottom: '1px solid gray', marginBottom: '1rem' }}
            >
              Preview
            </Typography>
            <Box sx={{ flexGrow: 1, alignSelf: 'stretch' }}>
              <Box
                sx={{
                  height: '100%',
                  width: '100%',
                  border: '1px solid #333',
                  background: 'black',
                  backgroundImage:
                    'linear-gradient(45deg, #333 25%, transparent 25%), linear-gradient(-45deg, #333 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #333 75%), linear-gradient(-45deg, transparent 75%, #333 75%)',
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                }}
              >
                {clock && (
                  <OBSClock clock={clock} state={state} setState={setState} />
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Home;
