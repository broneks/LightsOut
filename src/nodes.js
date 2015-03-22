define({
  body               : document.body,
  main               : document.getElementById( 'game-container' ),
  pointsScreen       : document.getElementById( 'points-screen' ),
  pointsEarned       : document.getElementById( 'points-earned' ),
  movesMade          : document.getElementById( 'moves-made' ),
  levelName          : document.getElementById( 'level-name' ),
  controls           : document.getElementById( 'game-controls' ),
  moves              : document.getElementById( 'moves' ),
  score              : document.getElementById( 'score' ),
  controlsButtons    : document.getElementById( 'controls-buttons' ),
  resetButton        : document.getElementById( 'reset-game' ),
  themeSelect        : document.getElementById( 'theme-select' ),
  optionsToggle      : document.getElementById( 'options-toggle' ),
  options            : document.getElementById( 'options' ),
  saveButton         : document.getElementById( 'save-game' ),
  loadButton         : document.getElementById( 'load-game' ),
  lastSavedDate      : document.getElementById( 'last-saved-date' ),
  togglePointsScreen : document.getElementById( 'toggle-points-screen' ),
  togglePointsLabel  : document.getElementById( 'toggle-points-screen-label' ),
  togglePointsState  : document.getElementById( 'toggle-points-screen-state' ),
  rowClass           : 'grid-row',
  cellClass          : 'grid-cell',
  lightCellClass     : 'light-cell',
  btnClass           : 'btn',
  btnAlphaClass      : 'btn-alpha',
  btnBetaClass       : 'btn-beta'
});