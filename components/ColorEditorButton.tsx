import { Button, getLuminance, Popover } from '@mui/material';
import { useRef, useState } from 'react';
import { SketchPicker } from 'react-color';

export function ColorEditorButton({
  label,
  color,
  onChange,
}: {
  label: string;
  color: string | null;
  onChange: (color: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const buttonRef = useRef<HTMLElement | null>(null);
  return (
    <>
      <Button
        onClick={() => setEditing(true)}
        ref={buttonRef as any}
        sx={
          color
            ? {
                backgroundColor: color,
                color: getLuminance(color) > 0.5 ? '#000' : '#fff',
              }
            : {}
        }
        variant={color ? 'contained' : 'outlined'}
      >
        {label}
      </Button>
      <Popover
        open={editing}
        onClose={() => setEditing(false)}
        anchorEl={buttonRef.current}
      >
        <SketchPicker
          color={color ?? '#fff'}
          onChange={(color) => onChange(color.hex)}
        />
      </Popover>
    </>
  );
}
