import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
} from '@mui/icons-material';
import {
  Autocomplete,
  Button,
  ButtonGroup,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback, useEffect, useState } from 'react';
import { ControlComponent } from '.';

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

export const FontControl: ControlComponent = ({ clock, setClock }) => {
  const fonts = useFonts();

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
      </ButtonGroup>
    </div>
  );
};
