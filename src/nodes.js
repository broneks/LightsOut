define({
  body               : document.body,
  main               : document.getElementById( 'game-container' ),
  levelName          : document.getElementById( 'level-name' ),

  pointsScreen       : document.getElementById( 'points-screen' ),
  pointsEarned       : document.getElementById( 'points-earned' ),
  movesMade          : document.getElementById( 'moves-made' ),

  moves              : document.getElementById( 'moves' ),
  score              : document.getElementById( 'score' ),

  controls           : document.getElementById( 'game-controls' ),
  controlsButtons    : document.getElementById( 'controls-buttons' ),
  resetButton        : document.getElementById( 'reset-game' ),
  options            : document.getElementById( 'options' ),

  themeSelect        : document.getElementById( 'theme-select' ),
  optionsToggle      : document.getElementById( 'options-toggle' ),
  saveButton         : document.getElementById( 'save-game' ),
  loadButton         : document.getElementById( 'load-game' ),

  savedInfo          : document.getElementById( 'saved-info' ),
  lastSavedDate      : document.getElementById( 'last-saved-date' ),
  lastSavedLevel     : document.getElementById( 'last-saved-level' ),

  togglePointsScreen : document.getElementById( 'toggle-points-screen' ),
  togglePointsLabel  : document.getElementById( 'toggle-points-screen-label' ),
  togglePointsState  : document.getElementById( 'toggle-points-screen-state' ),

  rowClass           : 'grid-row',
  cellClass          : 'grid-cell',
  lightCellClass     : 'light-cell',

  btnClass           : 'btn',
  btnAlphaClass      : 'btn-alpha',
  btnBetaClass       : 'btn-beta',

  initLoadClass         : 'init-load-wrapper',
  initLoadButtonClass   : 'init-load-game',
  initCancelButtonClass : 'init-cancel-load',

  activeStorageClass : 'active-storage',
  toggleOptionsClass : 'opened',
  toggleLabelClass   : 'active',
  highlightClass     : 'highlight',

  loadingClass       : 'loading-message'
});
