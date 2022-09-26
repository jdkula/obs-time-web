const indexStyles = {
  controlsFrame: {
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
  },
  controlsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  exportContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: '1rem',
  },
  previewContainer: {
    height: '100%',
    width: '100%',
    border: '1px solid #333',
    background: 'black',
    backgroundImage:
      'linear-gradient(45deg, #333 25%, transparent 25%), linear-gradient(-45deg, #333 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #333 75%), linear-gradient(-45deg, transparent 75%, #333 75%)',
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
  },
};

export default indexStyles;