require.config({
  paths: {
    'firebase': '../game/lib/firebase/firebase'
  },

  shim: {
    'firebase': {
      'exports': 'Firebase'
    }
  }
});
