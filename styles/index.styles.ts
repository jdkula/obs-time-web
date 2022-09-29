const indexStyles = {
  controlsFrame: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'stretch',
    margin: '2rem',
    '& > div': {
      padding: '2rem',
      border: '1px solid gray',
      flexGrow: 1,
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
    height: '200px',
    width: '100%',
    border: '1px solid #333',
    background: 'black',
    backgroundImage:
      'linear-gradient(45deg, #333 25%, transparent 25%), linear-gradient(-45deg, #333 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #333 75%), linear-gradient(-45deg, transparent 75%, #333 75%)',
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
    '& iframe': {
      border: 0,
      width: '100%',
      height: '100%',
    },
  },
};

export default indexStyles;
