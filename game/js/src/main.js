/*! LightsOut ~ copyright 2015 ~ by Bronek Szulc @ github.com/bszulc */

define("settings",{levelNameLabel:"Level",maxPoints:1800,minPoints:200,pointsModifier:45,advanceLevelDelay:400,pointsScreenDelay:1500,saveHighlightDelay:2e3,showPointsScreen:!0,colourThemes:{green:"green-theme",red:"red-theme",blue:"blue-theme",purple:"purple-theme",black:"black-theme","cats!?":"cats-theme"},currentTheme:"green"}),define("util",[],function(){var e={},t=Object.prototype.toString;return e.exists=function(e){return typeof e!="undefined"&&e!==null},e.notExists=function(t){return!e.exists(t)},e.isNumber=function(e){return e===e&&t.call(e)==="[object Number]"},e.cloneArray=function(e){if(!Array.isArray(e))return;return e.slice(0)},e.greaterNumber=function(e,t){var n;return this.isNumber(e)&&this.isNumber(t)&&(n=e>t?e:t),n},e.timeout=function(e,t,n){return function(){var r=arguments;window.setTimeout(function(){e.apply(n,r)},t)}},e.getDateAndTime=function(){var e=["Jan","Feb","March","April","May","June","July","Aug","Sept","Oct","Nov","Dec"];return function(n){if(t.call(n)!=="[object Date]")return;var r=e[n.getMonth()],i=n.getDate(),s=(n.getHours()<10?"0":"")+n.getHours(),o=(n.getMinutes()<10?"0":"")+n.getMinutes(),u=r+" "+i+" at "+s+":"+o;return u}}(),e.getKey=function(e,t){var n;for(n in e)if(e[n]===t)return n},e.addAttrs=function(e,t){return Array.isArray(t)&&t.forEach(function(t){var n=Object.keys(t),r=null;n&&(r=t[n],r&&e.setAttribute(n,r))}),e},e.addClass=function(e,t){return Array.isArray(t)?t.forEach(function(t){e.classList.add(t)}):e.classList.add(t),e},e.hasClass=function(e,t){return e.classList.contains(t)},e.removeClass=function(e,t){return t===!0&&(e.className=""),Array.isArray(t)?t.forEach(function(t){e.classList.remove(t)}):e.classList.remove(t),e},e.toggleClass=function(e,t){return e.classList.contains(t)?(this.removeClass(e,t),!1):(this.addClass(e,t),!0)},e.text=function(e,t,n){var r=document.createTextNode(t);n?e.innerHTML=t:this.append(e,r)},e.elt=function(e,t,n,r){var i=document.createElement(e);return this.exists(t)&&this.addClass(i,t),this.exists(n)&&this.addAttrs(i,n),this.exists(r)&&this.text(i,r),i},e.append=function(e,t){Array.isArray(t)?t.forEach(function(t){e.appendChild(t)}):e.appendChild(t)},e.remove=function(e,t){e.removeChild(t)},e.addEvent=function(e,t,n,r,i){var s=i?n.bind(i):n;e.addEventListener(t,s,r)},e.getByClass=function(e,t){var n=document.getElementsByClassName(e);return t?Array.prototype.slice.call(n):n},e.getById=function(e){return document.getElementById(e)},e}),define("nodes",{body:document.body,main:document.getElementById("game-container"),levelName:document.getElementById("level-name"),pointsScreen:document.getElementById("points-screen"),pointsEarned:document.getElementById("points-earned"),movesMade:document.getElementById("moves-made"),moves:document.getElementById("moves"),score:document.getElementById("score"),controls:document.getElementById("game-controls"),controlsButtons:document.getElementById("controls-buttons"),resetButton:document.getElementById("reset-game"),options:document.getElementById("options"),themeSelect:document.getElementById("theme-select"),optionsToggle:document.getElementById("options-toggle"),saveButton:document.getElementById("save-game"),loadButton:document.getElementById("load-game"),savedInfo:document.getElementById("saved-info"),lastSavedDate:document.getElementById("last-saved-date"),lastSavedLevel:document.getElementById("last-saved-level"),togglePointsScreen:document.getElementById("toggle-points-screen"),togglePointsLabel:document.getElementById("toggle-points-screen-label"),togglePointsState:document.getElementById("toggle-points-screen-state"),rowClass:"grid-row",cellClass:"grid-cell",lightCellClass:"light-cell",btnClass:"btn",btnAlphaClass:"btn-alpha",btnBetaClass:"btn-beta",initLoadClass:"init-load-wrapper",initLoadButtonClass:"init-load-game",initCancelButtonClass:"init-cancel-load",activeStorageClass:"active-storage",toggleOptionsClass:"opened",toggleLabelClass:"active",highlightClass:"highlight"}),define("levels",[],function(){var e=[{blueprint:[[0,0,0,0,0],[0,0,1,0,0],[0,1,1,1,0],[0,0,1,0,0],[0,0,0,0,0]],minMoves:1},{blueprint:[[0,0,0,0,0],[0,0,1,0,0],[0,1,1,1,0],[0,1,1,0,0],[1,1,1,0,0]],minMoves:2},{blueprint:[[1,0,0,0,0],[1,1,0,0,0],[1,0,0,0,1],[0,0,0,1,1],[0,0,0,0,1]],minMoves:2},{blueprint:[[0,1,0,0,0],[1,1,0,0,0],[0,1,1,1,0],[1,1,0,0,0],[0,1,0,0,0]],minMoves:3},{blueprint:[[1,1,0,1,1],[0,1,1,1,0],[0,1,1,1,0],[0,0,1,0,0],[0,0,0,0,0]],minMoves:3},{blueprint:[[1,0,0,0,1],[0,1,0,1,0],[0,1,0,1,0],[0,0,0,0,0],[0,0,0,0,0]],minMoves:4},{blueprint:[[1,1,1,0,0],[1,1,1,0,0],[1,0,1,1,0],[1,1,1,0,0],[1,1,1,0,0]],minMoves:4},{blueprint:[[1,1,0,0,0],[0,0,1,1,0],[0,0,1,0,0],[0,1,0,1,0],[1,1,0,1,1]],minMoves:4},{blueprint:[[0,0,1,0,0],[0,0,1,0,0],[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1]],minMoves:5},{blueprint:[[1,0,0,1,1],[0,1,1,1,1],[0,0,0,0,1],[0,0,1,1,0],[0,1,0,0,1]],minMoves:5},{blueprint:[[0,0,0,0,0],[0,1,1,1,0],[0,0,1,0,0],[1,0,1,0,1],[1,0,0,0,1]],minMoves:5},{blueprint:[[1,0,0,0,1],[0,1,0,1,0],[0,1,0,1,0],[0,1,0,0,0],[1,1,1,0,0]],minMoves:5},{blueprint:[[1,0,1,0,1],[1,1,1,0,1],[1,1,0,1,0],[1,0,1,0,0],[1,0,1,0,0]],minMoves:5},{blueprint:[[1,1,1,1,0],[0,0,1,0,1],[1,0,0,0,1],[1,0,1,0,0],[0,1,1,1,1]],minMoves:6},{blueprint:[[0,1,0,1,0],[1,0,0,0,1],[1,1,0,1,1],[1,0,0,0,1],[0,1,0,1,0]],minMoves:6},{blueprint:[[1,1,0,0,1],[1,1,1,1,0],[0,0,0,0,0],[1,1,1,1,0],[1,1,0,0,1]],minMoves:6},{blueprint:[[1,1,0,1,1],[0,0,0,0,0],[1,0,0,0,1],[1,1,0,1,1],[0,1,0,1,0]],minMoves:6},{blueprint:[[1,0,0,0,1],[1,0,0,0,1],[0,1,0,1,0],[0,0,0,0,0],[1,1,0,1,1]],minMoves:6},{blueprint:[[1,0,1,0,1],[0,0,1,0,0],[0,1,0,1,0],[1,1,1,1,1],[0,0,1,0,0]],minMoves:6},{blueprint:[[1,1,1,1,0],[1,1,0,0,1],[0,1,0,1,0],[1,0,0,1,1],[0,1,1,1,1]],minMoves:6},{blueprint:[[0,0,1,1,0],[0,1,1,0,0],[0,0,0,0,0],[0,1,1,0,0],[0,0,1,1,0]],minMoves:6},{blueprint:[[0,1,1,1,0],[1,0,1,0,1],[1,1,1,0,0],[1,0,1,0,1],[0,1,1,1,0]],minMoves:7},{blueprint:[[1,1,0,1,1],[0,0,1,0,0],[1,1,0,0,0],[0,0,1,0,0],[1,1,0,1,1]],minMoves:7},{blueprint:[[1,0,0,0,0],[1,1,1,1,0],[0,1,1,1,0],[1,1,1,1,0],[1,0,0,0,0]],minMoves:7},{blueprint:[[1,0,1,0,1],[0,1,1,1,0],[1,0,1,0,1],[1,1,0,1,1],[0,0,0,0,0]],minMoves:7},{blueprint:[[0,0,0,0,1],[1,0,0,1,0],[1,1,1,0,0],[1,0,0,1,0],[0,0,0,0,1]],minMoves:7},{blueprint:[[1,0,0,0,0],[0,0,1,1,0],[1,1,1,1,1],[0,1,0,0,0],[1,0,1,0,0]],minMoves:7},{blueprint:[[1,1,0,0,0],[1,0,0,1,1],[1,0,1,0,1],[1,1,0,0,1],[0,0,0,1,1]],minMoves:7},{blueprint:[[0,1,1,1,0],[0,0,1,0,0],[0,0,1,0,0],[0,1,0,1,0],[1,0,0,0,1]],minMoves:7},{blueprint:[[1,0,0,0,0],[1,1,0,1,0],[0,0,0,1,0],[1,1,1,0,1],[1,0,0,1,0]],minMoves:7},{blueprint:[[0,1,0,1,1],[0,1,0,0,1],[1,1,1,0,0],[0,1,0,0,1],[0,1,0,1,1]],minMoves:7},{blueprint:[[0,1,0,1,0],[1,0,0,0,1],[1,0,0,0,0],[0,0,0,1,1],[1,1,0,1,0]],minMoves:7},{blueprint:[[1,1,1,1,1],[0,1,1,1,0],[1,0,1,0,1],[1,0,0,0,1],[0,1,0,1,0]],minMoves:7},{blueprint:[[1,0,0,0,0],[1,0,1,0,1],[0,0,0,0,0],[1,0,1,0,0],[1,0,0,1,1]],minMoves:13},{blueprint:[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],minMoves:10},{blueprint:[[1,0,0,1,1],[1,1,0,0,0],[0,0,1,0,0],[0,1,0,1,1],[0,0,1,0,1]],minMoves:7},{blueprint:[[1,1,0,1,1],[1,1,0,1,1],[1,0,1,0,0],[0,0,1,1,1],[0,1,1,1,1]],minMoves:12},{blueprint:[[0,1,0,1,0],[0,0,0,1,0],[0,0,0,1,1],[0,1,1,0,0],[0,1,1,1,0]],minMoves:8},{blueprint:[[0,0,0,0,1],[1,0,1,1,1],[0,0,0,0,0],[1,0,1,1,1],[0,0,0,0,1]],minMoves:8},{blueprint:[[0,1,1,1,1],[0,1,1,0,1],[0,1,1,1,1],[1,1,0,1,1],[0,0,0,0,0]],minMoves:8},{blueprint:[[0,1,0,1,0],[1,0,1,0,0],[0,0,0,0,0],[0,0,1,0,1],[0,1,0,1,0]],minMoves:11}];return e}),define("Cell",["util","nodes"],function(e,t){function n(n,r,i){var s=this,o=function(){var n=r!==0?[t.cellClass,t.lightCellClass]:t.cellClass,i=e.elt("div",n);return e.addEvent(i,"click",s.click,!1,s),i};this.level=n,this.controls=n.controls,this.state=r,this.rowPos=i[0],this.cellPos=i[1],this.cellNode=o()}return n.prototype.constructor=n,n.prototype.getCellNode=function(){return this.cellNode},n.prototype.detectSurroundingCells=function(){var e=[],t=this.level.size,n=this.level.cells,r=this.rowPos-1>-1?[this.rowPos-1,this.cellPos]:!1,i=this.cellPos-1>-1?[this.rowPos,this.cellPos-1]:!1,s=this.rowPos+1<t?[this.rowPos+1,this.cellPos]:!1,o=this.cellPos+1<t?[this.rowPos,this.cellPos+1]:!1;return r&&e.push(n[r[0]][r[1]]),i&&e.push(n[i[0]][i[1]]),s&&e.push(n[s[0]][s[1]]),o&&e.push(n[o[0]][o[1]]),e},n.prototype.updateState=function(){this.state=!this.state,this.state?e.addClass(this.cellNode,t.lightCellClass):e.removeClass(this.cellNode,t.lightCellClass)},n.prototype.click=function(){if(this.level.completed)return;var e=this.detectSurroundingCells();e.forEach(function(e){e.updateState()}),this.updateState(),this.level.update()},n.prototype.delete=function(){e.remove(this.cellNode.parentNode,this.cellNode),this.level=null,this.controls=null,this.state=null,this.rowPos=null,this.cellPos=null,this.cellNode=null},n}),define("Controls",["settings","util","nodes"],function(e,t,n){function r(e){var r=this;t.addEvent(n.resetButton,"click",r.reset,!1,r),this.level=e,this.score=0,this.moves=0}return r.prototype.constructor=r,r.prototype.displayScore=function(){t.text(n.score,this.score,!0)},r.prototype.updateScore=function(){var n;return this.level.completed&&(this.moves<=this.level.minMoves?n=e.maxPoints:n=t.greaterNumber(e.maxPoints-this.moves*e.pointsModifier,e.minPoints),this.score+=n,this.displayScore()),n},r.prototype.updateMoves=function(){t.text(n.moves,this.moves,!0)},r.prototype.resetMoves=function(){this.moves=0,this.updateMoves()},r.prototype.countMoves=function(){this.moves+=1,this.updateMoves()},r.prototype.showPointsScreen=function(){var r=this.updateScore(),i=this.moves;this.resetMoves(),t.text(n.pointsEarned,r,!0),t.text(n.movesMade,i,!0),t.addClass(n.pointsScreen,"show"),t.timeout(this.hidePointsScreen,e.pointsScreenDelay,this)()},r.prototype.hidePointsScreen=function(){t.text(n.pointsEarned,"",!0),t.text(n.movesMade,"",!0),t.removeClass(n.pointsScreen,"show")},r.prototype.reset=function(){if(this.moves===0||this.level.completed)return;this.resetMoves(),this.level.render(this.level.number)},r}),define("storage",[],function(){var e={},t="lights-out",n="|";return e.save=function(e){var r={},i={},s=e.join(n),o=Math.random().toString(36).substr(2,5);return r.i=this.cipher(s,o),r.k=o,r.d=Date.now(),localStorage.setItem(t,JSON.stringify(r)),i.date=new Date(r.d),i.level=parseInt(e[3]),i},e.load=function(){var e,r,i;try{e=JSON.parse(localStorage.getItem(t))}catch(s){this.clear()}return e&&(r=this.cipher(e.i,e.k).split(n),r&&r.length===4?(i={},i.date=new Date(e.d),i.theme=r[0],i.showScreen=r[1]==="true",i.score=parseInt(r[2]),i.level=parseInt(r[3])):this.clear()),i},e.clear=function(){localStorage.removeItem(t),console.error("There was a problem with loading your saved game. \n\n Sorry about that! \n\n :/")},e.cipher=function(e,t){var n,r=String.fromCharCode;return!e||!t?"":(n=t.length,e.replace(/[\s\S]/g,function(e,i){return r(t.charCodeAt(i%n)^e.charCodeAt(0))}))},e}),define("Options",["settings","util","nodes","storage"],function(e,t,n,r){function i(i){var s=this,o=r.load();t.addEvent(n.optionsToggle,"click",s.toggleOptions,!1,s),t.addEvent(n.themeSelect,"click",s.updateTheme,!1,s),t.addEvent(n.togglePointsScreen,"click",s.togglePointsScreen,!1,s),t.addEvent(n.saveButton,"click",s.saveGame,!1,s),t.addEvent(n.loadButton,"click",s.loadGame,!1,s),o&&(this.setLastSavedInfo(o),this.createLoadGameOverlay(),t.addClass(n.options,n.activeStorageClass)),this.populateThemeSelect(),this.setToggleLabel(e.showPointsScreen,n.togglePointsLabel,n.togglePointsState),this.level=i,this.controls=i.controls,this.optionsState=!1}return i.prototype.constructor=i,i.prototype.createLoadGameOverlay=function(){var e=this,r=t.elt("button",n.initLoadButtonClass,null,"Load Game"),i=t.elt("button",n.initCancelButtonClass,null,"Cancel");t.addEvent(r,"click",e.loadGame,!1,e),t.addEvent(i,"click",e.removeLoadGameOverlay,!1,e),this.loadGameWrapper=t.elt("div",n.initLoadClass),t.append(this.loadGameWrapper,[r,i]),t.append(n.main,this.loadGameWrapper)},i.prototype.removeLoadGameOverlay=function(){t.exists(this.loadGameWrapper)&&(t.remove(n.main,this.loadGameWrapper),this.loadGameWrapper=null)},i.prototype.populateThemeSelect=function(){var r,i,s;for(r in e.colourThemes)i=[{value:e.colourThemes[r]}],r===e.currentTheme&&i.push({selected:!0}),s=t.elt("option",null,i,r),t.append(n.themeSelect,s);this.updateTheme()},i.prototype.updateTheme=function(r,i){var s=e.colourThemes[e.currentTheme],o;r&&r.target.tagName&&(s=r.target.value,e.currentTheme=t.getKey(e.colourThemes,s)),i&&(o=Object.keys(e.colourThemes).indexOf(e.currentTheme),n.themeSelect.selectedIndex=o),t.hasClass(n.body,s)||(t.removeClass(n.body,!0),t.addClass(n.body,s))},i.prototype.toggleOptions=function(e){e.preventDefault(),e.stopPropagation(),this.optionsState=t.toggleClass(n.options,n.toggleOptionsClass)},i.prototype.closeOptions=function(){this.optionsState&&t.removeClass(n.options,n.toggleOptionsClass)},i.prototype.setToggleLabel=function(e,r,i){var s;e?(s="On",t.addClass(r,n.toggleLabelClass)):(s="Off",t.removeClass(r,n.toggleLabelClass)),t.text(i,s,!0)},i.prototype.togglePointsScreen=function(){e.showPointsScreen=!e.showPointsScreen,this.setToggleLabel(e.showPointsScreen,n.togglePointsLabel,n.togglePointsState)},i.prototype.saveGame=function(){if(!this.controls.score)return;var i=[e.currentTheme,e.showPointsScreen,this.controls.score,this.level.number],s=r.save(i);this.setLastSavedInfo(s),t.addClass(n.options,n.activeStorageClass)},i.prototype.loadGame=function(){var t=r.load();t&&(e.currentTheme=t.theme,e.showPointsScreen=t.showScreen,this.controls.score=t.score,this.updateTheme(null,!0),this.setToggleLabel(e.showPointsScreen,n.togglePointsLabel,n.togglePointsState),this.controls.displayScore(),this.level.loadLevel(t.level)),this.removeLoadGameOverlay()},i.prototype.setLastSavedInfo=function(r){var i=t.exists(r.date),s=t.exists(r.level);i&&t.text(n.lastSavedDate,t.getDateAndTime(r.date),!0),s&&t.text(n.lastSavedLevel,e.levelNameLabel+" "+(r.level+1),!0);if(i||s)t.addClass(n.savedInfo,n.highlightClass),t.timeout(function(){t.removeClass(n.savedInfo,n.highlightClass)},e.saveHighlightDelay)()},i}),define("Level",["settings","util","nodes","levels","Cell","Controls","Options"],function(e,t,n,r,i,s,o){function u(){this.number=null,this.size=null,this.blueprint=null,this.minMoves=null,this.cells=[],this.grid=[],this.completed=!1,this.controls=new s(this),this.options=new o(this)}return u.prototype.constructor=u,u.prototype.startGame=function(){this.render(0)},u.prototype.generateGrid=function(){this.grid=this.cells.map(function(e){return e.map(function(e){return e.state?1:0})})},u.prototype.visualizeBlueprint=function(e){var r=this;e.forEach(function(e,s){var o=[],u=t.elt("div",n.rowClass);e.forEach(function(e,n){var a=[s,n],f=new i(r,e,a),l=f.getCellNode();o.push(f),t.append(u,l)}),r.cells.push(o),t.append(n.main,u)}),this.generateGrid()},u.prototype.render=function(i){var s;this.resetCells();if(this.number===r.length-1&&i===r.length){t.text(n.levelName,"You Beat the Game!",!0);return}if(this.number!==i&&t.notExists(this.blueprint)){s=r[i];if(t.notExists(s)){t.text(n.levelName,"Level Not Found...",!0);return}this.number=i,this.size=s.blueprint.length,this.blueprint=s.blueprint,this.minMoves=r[i].minMoves,this.completed=!1,t.text(n.levelName,e.levelNameLabel+" "+(i+1),!0)}this.visualizeBlueprint(this.blueprint)},u.prototype.update=function(){this.controls.countMoves(),this.options.removeLoadGameOverlay(),this.options.closeOptions(),this.generateGrid(),this.isCompleted()&&t.timeout(this.advanceLevel,e.advanceLevelDelay,this)()},u.prototype.isCompleted=function(){var e=t.cloneArray(this.grid),n=e.reduce(function(e,t){return e.concat(t)}).reduce(function(e,t){return e+t});return this.completed=n===0},u.prototype.resetCells=function(){var e=t.getByClass(n.rowClass,!0);this.cells.forEach(function(e){e.forEach(function(e){e.delete()})}),e.forEach(function(e){t.remove(n.main,e)}),this.cells=[],this.grid=[]},u.prototype.resetBlueprint=function(){this.blueprint=null,this.size=null,this.minMoves=null},u.prototype.loadLevel=function(e){e!==this.number&&this.resetBlueprint(),this.controls.resetMoves(),this.render(e)},u.prototype.advanceLevel=function(){var n=this,r=function(){n.resetBlueprint(),n.render(n.number+1)};e.showPointsScreen?(this.controls.showPointsScreen(),t.timeout(r,e.pointsScreenDelay,this)()):(this.controls.updateScore(),this.controls.resetMoves(),r())},u}),require(["Level"],function(e){var t=new e;t.startGame()}),define("main",function(){});