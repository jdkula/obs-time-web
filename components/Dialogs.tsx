import { DialogTitle, DialogContent, Typography, Paper } from '@mui/material';

export const CssDialogueContent = () => (
  <>
    <DialogTitle>CSS Classes</DialogTitle>
    <DialogContent>
      <Typography paragraph>
        You can further customize the look of the timer using the following CSS
        classes in OBS. All of them are applied to the same element (
        <code>.clock</code>), so you can write transitions and animations if you
        wish!
      </Typography>
      <Paper>
        <code>
          {[
            ['.clock', 'Clock container'],
            ['.clock-stopped', 'Before the clock is initially started'],
            ['.clock-running', 'Clock has started'],
            ['.clock-paused', 'Clock was running but is paused'],
            [
              '.clock-zero',
              'Timer mode with stop at zero enabled: timer is done',
            ],
            [
              '.clock-negative',
              'Timer mode with stop at zero disabled: timer has elapsed',
            ],
            ['.text', 'Style for all text'],
            ['.number', 'Style for numbers and AM/PM/time zones/etc'],
            ['.colon', 'Colon style'],
            ['.colon-hidden', 'Applied to colons when they should be hidden'],
          ].map(([cls, desc], i, arr) => (
            <div
              key={cls}
              style={{
                display: 'flex',
                marginBottom: i === arr.length - 1 ? 'inherit' : '1rem',
              }}
            >
              <div
                style={{
                  color: 'white',
                  marginRight: '1rem',
                  whiteSpace: 'nowrap',
                }}
              >
                {cls}
              </div>
              <div style={{ color: 'gray' }}>{'/*'}&nbsp;</div>
              <div style={{ color: 'gray' }}>
                {desc} {'*/'}
              </div>
            </div>
          ))}
        </code>
      </Paper>
    </DialogContent>
  </>
);
