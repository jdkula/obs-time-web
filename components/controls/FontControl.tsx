import {
  FormatAlignCenter,
  FormatAlignJustify,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatItalic,
  FormatSize,
  FormatUnderlined,
} from '@mui/icons-material';
import {
  Autocomplete,
  Button,
  ButtonGroup,
  Popover,
  Slider,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useRef, useState } from 'react';
import { ControlComponent } from '.';
import { OBSClockDefinition } from '../OBSClock';

const kIncludedFonts = [
  'Roboto',
  'Lato',
  'Montserrat',
  'Fira Sans',
  'Bungee',
  'Fredoka One',
  'Fugaz One',
  'Monoton',
  'Rubik Dirt',
  'Smokum',
  'Nabla',
  'Kalam',
  'Leckerli One',
  'Sriracha',
];

const kFontList = new Set([
  // Windows 10
  'Arial',
  'Arial Black',
  'Bahnschrift',
  'Calibri',
  'Cambria',
  'Cambria Math',
  'Candara',
  'Comic Sans MS',
  'Consolas',
  'Constantia',
  'Corbel',
  'Courier New',
  'Ebrima',
  'Franklin Gothic Medium',
  'Gabriola',
  'Gadugi',
  'Georgia',
  'HoloLens MDL2 Assets',
  'Impact',
  'Ink Free',
  'Javanese Text',
  'Leelawadee UI',
  'Lucida Console',
  'Lucida Sans Unicode',
  'Malgun Gothic',
  'Marlett',
  'Microsoft Himalaya',
  'Microsoft JhengHei',
  'Microsoft New Tai Lue',
  'Microsoft PhagsPa',
  'Microsoft Sans Serif',
  'Microsoft Tai Le',
  'Microsoft YaHei',
  'Microsoft Yi Baiti',
  'MingLiU-ExtB',
  'Mongolian Baiti',
  'MS Gothic',
  'MV Boli',
  'Myanmar Text',
  'Nirmala UI',
  'Palatino Linotype',
  'Segoe MDL2 Assets',
  'Segoe Print',
  'Segoe Script',
  'Segoe UI',
  'Segoe UI Historic',
  'Segoe UI Emoji',
  'Segoe UI Symbol',
  'SimSun',
  'Sitka',
  'Sylfaen',
  'Symbol',
  'Tahoma',
  'Times New Roman',
  'Trebuchet MS',
  'Verdana',
  'Webdings',
  'Wingdings',
  'Yu Gothic',
  // MacOS
  'American Typewriter',
  'Andale Mono',
  'Arial',
  'Arial Black',
  'Arial Narrow',
  'Arial Rounded MT Bold',
  'Arial Unicode MS',
  'Avenir',
  'Avenir Next',
  'Avenir Next Condensed',
  'Baskerville',
  'Big Caslon',
  'Bodoni 72',
  'Bodoni 72 Oldstyle',
  'Bodoni 72 Smallcaps',
  'Bradley Hand',
  'Brush Script MT',
  'Chalkboard',
  'Chalkboard SE',
  'Chalkduster',
  'Charter',
  'Cochin',
  'Comic Sans MS',
  'Copperplate',
  'Courier',
  'Courier New',
  'Didot',
  'DIN Alternate',
  'DIN Condensed',
  'Futura',
  'Geneva',
  'Georgia',
  'Gill Sans',
  'Helvetica',
  'Helvetica Neue',
  'Herculanum',
  'Hoefler Text',
  'Impact',
  'Lucida Grande',
  'Luminari',
  'Marker Felt',
  'Menlo',
  'Microsoft Sans Serif',
  'Monaco',
  'Noteworthy',
  'Optima',
  'Palatino',
  'Papyrus',
  'Phosphate',
  'Rockwell',
  'Savoye LET',
  'SignPainter',
  'Skia',
  'Snell Roundhand',
  'Tahoma',
  'Times',
  'Times New Roman',
  'Trattatello',
  'Trebuchet MS',
  'Verdana',
  'Zapfino',
]);

function useFonts(): string[] {
  const [fonts, setFonts] = useState<string[]>([...kIncludedFonts]);

  useEffect(() => {
    (async () => {
      const fonts = await document.fonts?.ready;
      if (!fonts) return;

      const filtered: string[] = [...kIncludedFonts];
      kFontList.forEach((font) => {
        if (fonts.check(`12px '${font}'`)) {
          filtered.push(font);
        }
      });

      setFonts(filtered);
    })();
  }, []);

  return fonts;
}

const FormatAlignButton = ({
  formatAlign,
}: {
  formatAlign: OBSClockDefinition['font']['alignment'];
}) => {
  if (formatAlign === 'left') return <FormatAlignLeft fontSize="small" />;
  if (formatAlign === 'center') return <FormatAlignCenter fontSize="small" />;
  if (formatAlign === 'right') return <FormatAlignRight fontSize="small" />;
  if (formatAlign === 'justify') return <FormatAlignJustify fontSize="small" />;

  throw new Error('Invalid format alignment ' + formatAlign);
};

export const FontControl: ControlComponent = ({ clock, setClock }) => {
  const fonts = useFonts();
  const alignButtonRef = useRef<any>();
  const sizeButtonRef = useRef<any>();

  const [alignOpen, setAlignOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);

  return (
    <div>
      <Autocomplete
        fullWidth
        value={clock.font.family}
        onInputChange={(_, value) =>
          setClock({ ...clock, font: { ...clock.font, family: value } })
        }
        renderInput={(params) => (
          <TextField {...params} label="Font Family" placeholder="Roboto" />
        )}
        renderOption={(props, option) => (
          <li style={{ fontFamily: option }} {...props}>
            {option}
          </li>
        )}
        options={fonts}
        freeSolo
        disableClearable
      />
      <Box sx={{ margin: '1rem' }} />
      <ButtonGroup variant="outlined">
        <Button
          variant={clock.font?.bold ? 'contained' : 'outlined'}
          onClick={() =>
            setClock({
              ...clock,
              font: { ...clock.font, bold: !clock.font.bold },
            })
          }
        >
          <FormatBold />
        </Button>
        <Button
          variant={clock.font.italic ? 'contained' : 'outlined'}
          onClick={() =>
            setClock({
              ...clock,
              font: { ...clock.font, italic: !clock.font.italic },
            })
          }
        >
          <FormatItalic />
        </Button>
        <Button
          variant={clock.font.underline ? 'contained' : 'outlined'}
          onClick={() =>
            setClock({
              ...clock,
              font: { ...clock.font, underline: !clock.font.underline },
            })
          }
        >
          <FormatUnderlined />
        </Button>
        <Button
          sx={{ width: '40px' }}
          ref={sizeButtonRef}
          size="small"
          onClick={() => setSizeOpen(true)}
        >
          <FormatSize fontSize="small" />
        </Button>
        <Button
          sx={{ width: '40px' }}
          size="small"
          ref={alignButtonRef}
          onClick={() => setAlignOpen(true)}
        >
          <FormatAlignButton formatAlign={clock.font.alignment} />
        </Button>
      </ButtonGroup>
      <Popover
        open={sizeOpen}
        onClose={() => setSizeOpen(false)}
        anchorEl={sizeButtonRef.current}
      >
        <Slider
          orientation="vertical"
          value={clock.font.sizeMultiplier}
          min={0}
          max={3}
          step={null}
          marks={[
            { value: 0, label: '0.2×' },
            { value: 0.5, label: '0.5×' },
            { value: 1, label: 'Default' },
            { value: 1.5 },
            { value: 2, label: '2×' },
            { value: 2.5 },
            { value: 3, label: '3×' },
          ]}
          onChange={(_, value) =>
            setClock({
              ...clock,
              font: {
                ...clock.font,
                sizeMultiplier: (value || 0.2) as number,
              },
            })
          }
          sx={{
            minHeight: '100px',
            minWidth: '20px',
            marginTop: '20px',
            marginBottom: '20px',
          }}
        />
      </Popover>
      <Popover
        open={alignOpen}
        onClose={() => setAlignOpen(false)}
        anchorEl={alignButtonRef.current}
      >
        <ButtonGroup variant="outlined">
          <Button
            sx={{ width: '40px' }}
            variant={clock.font.alignment === 'left' ? 'contained' : 'outlined'}
            onClick={() =>
              setClock({
                ...clock,
                font: { ...clock.font, alignment: 'left' },
              })
            }
          >
            <FormatAlignLeft />
          </Button>
          <Button
            sx={{ width: '40px' }}
            variant={
              clock.font.alignment === 'center' ? 'contained' : 'outlined'
            }
            onClick={() =>
              setClock({
                ...clock,
                font: { ...clock.font, alignment: 'center' },
              })
            }
          >
            <FormatAlignCenter />
          </Button>
          <Button
            sx={{ width: '40px' }}
            variant={
              clock.font.alignment === 'right' ? 'contained' : 'outlined'
            }
            onClick={() =>
              setClock({
                ...clock,
                font: { ...clock.font, alignment: 'right' },
              })
            }
          >
            <FormatAlignRight />
          </Button>
          <Button
            sx={{ width: '40px' }}
            variant={
              clock.font.alignment === 'justify' ? 'contained' : 'outlined'
            }
            onClick={() =>
              setClock({
                ...clock,
                font: { ...clock.font, alignment: 'justify' },
              })
            }
          >
            <FormatAlignJustify />
          </Button>
        </ButtonGroup>
      </Popover>
    </div>
  );
};
