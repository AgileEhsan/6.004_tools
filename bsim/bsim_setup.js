$(function () {
    var bsim_html = '\
    <div class="xblock-6004" style="width: 100%; height: 99%; margin:5px;">\
      <div class="masthead">\
        <ul class="pull-left nav nav-pills split-controls">\
          <li class="active" id="maximise_editor"><a>Editor</a></li>\
          <li id="split_pane"><a>Split</a></li>\
          <li id="maximise_simulation"><a>Simulation</a></li>\
        </ul>\
        <div id="header-alert-holder"></div>\
        <ul class="pull-right nav nav-pills global-controls"></ul>\
      </div>\
      <div id="split-container">\
        <div id="editor-pane">\
          <div id="editor"></div>\
        </div>\
        <div id="simulation-pane">\
          <div id="programmer-view">\
            <div class="program-controls"></div>\
            <div class="cache-wrapper"><div class="cache-information">\
              <table style="border-collapse: separate; border-spacing: 3px 0px;">\
                <tr>\
                  <td align="right">Cache:</td>\
                  <td>\
                    <select class="cache-select" id="cache-status">\
                      <option>on</option>\
                      <option selected>off</option>\
                    </select>\
                  </td>\
                  <td class="cache-column cache-sep">&nbsp;</td>\
                  <td class="cache-column">tag</td>\
                  <td class="cache-column">index</td>\
                  <td class="cache-column">offset</td>\
                  <td class="cache-column cache-sep"><i>event</i></td>\
                  <td class="cache-column"><i>Ifetch</i></td>\
                  <td class="cache-column"><i>Dread</i></td>\
                  <td class="cache-column"><i>Dwrite</i></td>\
                  <td class="cache-column"><i>total</i></td>\
                </tr>\
                <tr>\
                  <td align="right">Total words:</td>\
                  <td>\
                    <select class="cache-select" id="total-words" disabled>\
                      <option >4</option>\
                      <option>8</option>\
                      <option>16</option>\
                      <option>32</option>\
                      <option selected>64</option>\
                      <option>128</option>\
                      <option>256</option>\
                      <option>512</option>\
                      <option>1024</option>\
                      <option>2048</option>\
                      <option>4096</option>\
                      <option>8192</option>\
                      <option>16384</option>\
                    </select>\
                  </td>\
                  <td class="cache-column cache-sep">Address bits:</td>\
                  <td class="cache-stats"><span class="cache-num" id="tag-bits"></span></td>\
                  <td class="cache-stats"><span class="cache-num" id="index-bits"></span></td>\
                  <td class="cache-stats"><span class="cache-num" id="offset-bits"></span></td>\
                  <td class="cache-column cache-sep">hits</td>\
                  <td class="cache-stats"><span class="cache-num" id="fetch-hits"></span></td>\
                  <td class="cache-stats"><span class="cache-num" id="read-hits"></span></td>\
                  <td class="cache-stats"><span class="cache-num" id="write-hits"></span></td>\
                  <td class="cache-stats"><span class="cache-num" id="total-hits"></span></td>\
                </tr>\
                <tr>\
                  <td align="right">Words/line:</td>\
                  <td>\
                    <select class="cache-select" id="line-size" disabled>\
                      <option selected>1</option>\
                      <option>2</option>\
                      <option>4</option>\
                      <option>8</option>\
                      <option>16</option>\
                      <option>32</option>\
                    </select>\
                  </td>\
                  <td class="cache-column cache-sep">Mem size:</td>\
                  <td class="cache-stats" colspan="3"><span class="cache-val" id="mem-size"></span></td>\
                  <td class="cache-column cache-sep">misses</td>\
                  <td class="cache-stats"><span class="cache-num" id="fetch-misses"></span></td>\
                  <td class="cache-stats"><span class="cache-num" id="read-misses"></span></td>\
                  <td class="cache-stats"><span class="cache-num" id="write-misses"></span></td>\
                  <td class="cache-stats"><span class="cache-num" id="total-misses"></span></td>\
                </tr>\
                <tr>\
                  <td align="right">Associativity:</td>\
                  <td>\
                    <select class="cache-select" id="associativity" disabled>\
                      <option selected>direct mapped</option>\
                      <option>2-way</option>\
                      <option>4-way</option>\
                      <option>8-way</option>\
                      <option>fully associative</option>\
                    </select>\
                  </td>\
                  <td class="cache-column cache-sep">Comparator bits:</td>\
                  <td class="cache-stats" colspan="3"><span class="cache-val" id="comparator-bits"></span></td>\
                  <td class="cache-column cache-sep">totals</td>\
                  <td class="cache-stats"><span class="cache-num" id="fetch-total"></span></td>\
                  <td class="cache-stats"><span class="cache-num" id="read-total"></span></td>\
                  <td class="cache-stats"><span class="cache-num" id="write-total"></span></td>\
                  <td class="cache-stats"><span class="cache-num" id="total-total"></span></td>\
                </tr>\
                <tr>\
                  <td align="right">Replacement:</td>\
                  <td>\
                    <select class="cache-select" id="replacement-strategy" disabled>\
                      <option selected>LRU</option>\
                      <option>FIFO</option>\
                      <option>Random</option>\
                      <option>Cycle</option>\
                    </select>\
                  </td>\
                  <td class="cache-column cache-sep">2-to-1 MUX bits:</td>\
                  <td class="cache-stats" colspan="3"><span class="cache-val" id="mux-bits"></span></td>\
                  <td class="cache-column cache-sep">hit ratio</td>\
                  <td class="cache-stats"><span class="cache-num" id="fetch-ratio"></span></td>\
                  <td class="cache-stats"><span class="cache-num" id="read-ratio"></span></td>\
                  <td class="cache-stats"><span class="cache-num" id="write-ratio"></span></td>\
                  <td class="cache-stats"><span class="cache-num" id="total-ratio"></span></td>\
                </tr>\
                <tr>\
                  <td align="right">Write strategy:</td>\
                  <td>\
                    <select class="cache-select" id="write-strategy" disabled>\
                      <option selected>write-back</option>\
                      <option>write-through</option>\
                    </select>\
                  </td>\
                  <td class="cache-column cache-sep">Total cost:</td>\
                  <td class="cache-stats" colspan="3"><span class="cache-val" id="total-cost"></span></td>\
                  <td class="cache-column cache-sep">cycles</td>\
                  <td class="cache-column">&nbsp;</td>\
                  <td class="cache-column">&nbsp;</td>\
                  <td class="cache-column">&nbsp;</td>\
                  <td class="cache-stats"><span class="cache-num" id="total-cycles"></span></td>\
                </tr>\
              </table>\
            </div></div>\
            <div class="content">\
              Registers\
              <div class="regfile"></div>\
              Disassembly [cycle: <span id="cycle_count">0</span>]\
              <div class="disassembly"></div>\
              <div class="memory-holder">\
                Memory\
                <div class="memory" data-height="398"></div>\
                <div class="memory-key">\
                  <ul>\
                    <li><span class="read"></span> Recent reads</li>\
                  </ul>\
                </div>\
              </div>\
              <div class="stack-holder">\
                Stack\
                <div class="stack" data-height="398"></div>\
                <div class="memory-key">\
                  <ul>\
                    <li><span class="write"></span> Recent writes</li>\
                  </ul>\
                </div>\
              </div>\
              Console\
              <div class="tty"></div>\
              <div id="checkoff-failure"></div>\
            </div>\
          </div>\
          <div id="schematic-view" style="display: none;">\
            <div class="program-controls"></div>\
            <div style="position: relative" id="schematic-holder">\
              <svg height="600" width="940" class="schematic">\
                <g class="mux pcsel permanent" transform="translate(10, 25)">\
                  <g class="mux-selector">\
                    <text style="text-anchor: end;" x="50" y="11">PCSEL=<tspan id="pcsel-value">3</tspan></text>\
                    <polyline points="50,7 60,7" />\
                    <polyline points="53,3 60,7 53,11" />\
                  </g>\
                  <polygon points="60,0 180,0 175,15 65,15" />\
                </g>\
                <g class="pcsel4 path" transform="translate(15)">\
                  <text x="65" y="10" class="path-target">8</text>\
                  <polyline points="65,10 65,25" />\
                  <polyline points="61,18 65,25 69,18" />\
                  <text x="65" y="37" class="path-target">4</text>\
                </g>\
                <g class="pcsel3 path" transform="translate(40)">\
                  <text x="65" y="10" class="path-target">4</text>\
                  <polyline points="65,10 65,25" />\
                  <polyline points="61,18 65,25 69,18" />\
                  <text x="65" y="37" class="path-target">3</text>\
                </g>\
                <g class="pcsel2 path" transform="translate(65)">\
                  <text x="65" y="10" class="path-target">JT</text>\
                  <polyline points="65,10 65,25" />\
                  <polyline points="61,18 65,25 69,18" />\
                  <text x="65" y="37" class="path-target">2</text>\
                </g>\
                <g class="pcsel1 path" transform="translate(90)">\
                  <polyline points="140,86 140,1 65,1 65,25" />\
                  <polyline points="140,91 140,148" />\
                  <polyline points="140,152 140,195" />\
                  <polyline points="61,18 65,25 69,18" />\
                  <text x="65" y="37" class="path-target">1</text>\
                </g>\
                <g class="pcsel0 path" transform="translate(115)">\
                  <polyline points="100,86 100,10 65,10 65,25" />\
                  <polyline points="100,91, 100,150" />\
                  <polyline points="61,18 65,25 69,18" />\
                  <text x="65" y="37" class="path-target">0</text>\
                </g>\
                <g class="pc permanent" transform="translate(90, 40)">\
                  <polyline points="45,0 45,15" />\
                  <polyline points="41,8 45,15 49,8" />\
                  <rect x="-5" y="15" width="100" height="20" class="border" />\
                  <foreignObject x="-5" y="15" width="100" height="20">\
                    <p style="text-align: center;"><span class="pc-label">PC:</span><span class="pc-value">00000000</span></p>\
                  </foreignObject>\
                  <text x="50" y="12" class="path-value pcsel-out-value">80000010</text>\
                </g>\
                <g class="instructions permanent" transform="translate(135,55)">\
                  <!-- HTML is absolutely positioned over this. -->\
                  <polyline points="0,33 115,33" />\
                  <polyline points="108,29 115,33 108,37" />\
                  <rect x="115" y="0" height="66" width="320" class="border" />\
                  <polyline points="235,66 235,86" />\
                  <text x="238" y="80" class="path-value instruction-value">73FF0003</text>\
                  <polyline points="235,86 435,86 445,96 445,133" />\
                  <polyline points="441,126 445,133 449,126" />\
                  <text x="435" y="100" style="text-anchor: end;">RA:[20:16]</text>\
                  <text x="450" y="133" style="text-anchor: start;" class="path-value raa-value">1F</text>\
                </g>\
                <g class="path asel1 pcsel1 bsel1 wasel0" transform="translate(135,55)">\
                  <polyline points="235,86 235,140" />\
                </g>\
                <g class="path asel1 bsel1 wasel0" transform="translate(135,55)">\
                  <polyline points="235,140 235,150" />\
                </g>\
                <g class="mux ra2sel1 ra2sel0 ra2sel" transform="translate(710, 160)">\
                  <g class="mux-selector">\
                    <text style="text-anchor: end;" x="0" y="11">RA2SEL=<tspan id="ra2sel-value">-</tspan></text>\
                    <polyline points="0,7 10,7" />\
                    <polyline points="4,3 10,7 4,11" />\
                  </g>\
                  <polygon points="10,0 70,0 65,15 15,15" />\
                  <polyline points="40,15 40,30" />\
                  <polyline points="36,23 40,30 44,23" />\
                  <text x="45" y="28" class="path-value rab-value" style="text-anchor: start;">1F</text>\
                </g>\
                <g class="path ra2sel0" transform="translate(570,141)">\
                  <text x="150" y="12" style="text-anchor: end;">RB:[15:11]</text>\
                  <polyline points="150,0 160,10 160,17" />\
                  <polyline points="156,10 160,17 164,10" />\
                  <text x="160" y="31">0</text>\
                </g>\
                <g class="path ra2sel1" transform="translate(570,141)">\
                  <text x="204" y="12" style="text-anchor: start;">RC:[25:21]</text>\
                  <polyline points="150,0 190,0 200,10 200,17" />\
                  <polyline points="196,10 200,17 204,10" />\
                  <text x="200" y="31">1</text>\
                </g>\
                <g class="path ra2sel0 ra2sel1" transform="translate(570,141)">\
                  <polyline points="0,0 150,0" />\
                </g>\
                <g class="mux wasel werf1" transform="translate(435,200)">\
                  <polygon points="0,0 20,10 20,50 0,60" />\
                  <g class="mux-selector">\
                    <text x="10" y="77" style="text-anchor: middle;">WASEL=<tspan id="wasel-value">1</tspan></text>\
                    <polyline points="10,56 10,66" />\
                    <polyline points="6,63 10,56 14,63" />\
                  </g>\
                  <polyline points="20,30 45,30" />\
                  <polyline points="37,26 45,30 37,34" />\
                  <text x="21" y="28" class="path-value raw-value">1F</text>\
                </g>\
                <g class="path wasel0" transform="translate(370,205)">\
                  <polyline points="0,0 10,10 65,10" />\
                  <polyline points="58,6 65,10 58,14" />\
                  <text x="8" y="6" style="text-anchor: start;">[25:21]</text>\
                  <text x="72" y="15">0</text>\
                </g>\
                <g class="path wasel1" transform="translate(410,237)">\
                  <text x="15" y="12" style="text-anchor: end;">XP</text>\
                  <polyline points="15,8 25,8" />\
                  <polyline points="18,4 25,8 18,12" />\
                  <text x="32" y="12">1</text>\
                </g>\
                <g class="address-adder asel1 pcsel1 process" transform="translate(250, 150)">\
                  <polyline points="-35,0 55,0 55,37 36,37" />\
                  <polyline points="43,33 36,37 43,41" />\
                  <polyline points="-21,45 0,45" />\
                  <polyline points="36,54 110,54 120,44" />\
                  <polyline points="43,50 36,54 43,58" />\
                  <text x="80" y="50">[15:0]*4</text>\
                  <rect x="0" y="30" width="36" height="30" />\
                  <text x="18" y="51" class="process-label">+</text>\
                  <text class="path-value address-adder-value" x="-25" y="48" style="text-anchor: end;">hello</text>\
                </g>\
                <g class="plus4 process permanent" transform="translate(117, 75)">\
                  <polyline class="permanent" points="18,0 18,30" />\
                  <polyline class="permanent" points="14,23 18,30 22,23" />\
                  <rect x="0" y="30" width="36" height="30" />\
                  <text x="18" y="51" class="process-label">+4</text>\
                  <text x="23" y="73" class="path-value pc-plus4-value">80000004</text>\
                </g>\
                <g class="path pcsel0 pcsel1 asel1 wdsel0" transform="translate(135,150)">\
                  <polyline points="0,-14 0,0" />\
                </g>\
                <g class="path pcsel0 pcsel1 asel1" transform="translate(135,150)">\
                  <polyline points="0,0 80,0" />\
                </g>\
                <g class="mux wdsel werf1" transform="translate(585,561)">\
                  <g class="mux-selector">\
                    <text style="text-anchor: end;" x="0" y="11">WDSEL=<tspan id="wdsel-value">0</tspan></text>\
                    <polyline points="0,7 10,7" />\
                    <polyline points="4,3 10,7 4,11" />\
                  </g>\
                  <polygon points="10,0 90,0 85,15 15,15" />\
                </g>\
                <g class="wdsel0 path" transform="translate(135,235)">\
                  <polyline points="0,-86 0,310 470,310 470,325" />\
                  <polyline points="466,318 470,325 474,318" />\
                  <text x="468" y="306" class="path-value pc-plus4-value" style="text-anchor: end;">80000004</text>\
                  <text x="470" y="338" class="path-target">0</text>\
                </g>\
                <g class="regfile permanent" transform="translate(481,190)">\
                  <rect x="0" y="0" width="358" height="178" />\
                  <foreignObject x="0" y="0" width="358" height="178">\
                    <div class="regfile"></div>\
                  </foreignObject>\
                  <!-- WERF input -->\
                  <g class="mux-selector">\
                    <polyline points="359,100 370,100" />\
                    <polyline points="366,96 359,100 366,104" />\
                    <text x="371" y="104" style="text-anchor: start;">WERF=<tspan id="werf-value">1</tspan></text>\
                  </g>\
                </g>\
                <g class="alu wdsel1 wdsel2 wr1" transform="translate(545,480)">\
                  <polygon points="0,0 80,0 90,10 100,0 180,0 160,30 20,30" />\
                  <text x="90" y="25">ALU</text>\
                  <text x="85" y="42" class="path-value alu-out-value" style="text-anchor: end;">hello</text>\
                  <polyline points="90,30 90,40" />\
                  <g class="mux-selector">\
                    <text x="7" y="20" style="text-anchor: end;">ALUFN="<tspan id="alufn-value"></tspan>"</text>\
                  </g>\
                </g>\
                <!-- Regfile output B -->\
                <g class="mux wdsel1 wdsel2 wr1 bsel" transform="translate(685, 430)">\
                  <g class="mux-selector">\
                    <text style="text-anchor: end;" x="0" y="11">BSEL=<tspan id="bsel-value">1</tspan></text>\
                    <polyline points="0,7 10,7" />\
                    <polyline points="4,3 10,7 4,11" />\
                  </g>\
                  <polygon points="10,0 70,0 65,15 15,15" />\
                  <polyline points="40,15 40,30 0,30 0,50" />\
                  <polyline points="-4,43 0,50 4,43" />\
                  <text x="5" y="47" class="path-value alub-value" style="text-anchor: start;">hello</text>\
                  <text x="0" y="62">B</text>\
                </g>\
                <g class="path bsel1" transform="translate(135,55)">\
                  <polyline points="235,150 235,352 442,352" />\
                  <polyline points="448,352 570,352 570,374" />\
                  <polyline points="566,367 570,374 574,367" />\
                  <text x="570" y="387">1</text>\
                  <text x="565" y="347" class="path-value bsel1-value" style="text-anchor: end;">hello</text>\
                  <text x="240" y="348" style="text-anchor: start;">C:[15:0]</text>\
                </g>\
                <g class="path bsel0 wr1" transform="translate(745, 369)">\
                  <polyline points="0,0 0,38" />\
                  <text class="path-value rdb-value" x="2" y="12" style="text-anchor: start;">hello</text>\
                </g>\
                <g class="path bsel0" transform="translate(745, 369)">\
                  <polyline points="0,38 0,60" />\
                  <polyline points="-4,53 0,60 4,53" />\
                  <text x="0" y="73">0</text>\
                </g>\
                <g class="path wr1" transform="translate(745, 369)">\
                  <polyline points="0,38 90,38 90,90" />\
                  <polyline points="86,83 90,90 94,83" />\
                  <text x="85" y="88" style="text-anchor: end;">MWD</text>\
                </g>\
                <!-- Regfile output A -->\
                <g class="mux wdsel1 wdsel2 wr1 asel" transform="translate(520, 430)">\
                  <g class="mux-selector">\
                    <text style="text-anchor: end;" x="0" y="11">ASEL=<tspan id="asel-value">0</tspan></text>\
                    <polyline points="0,7 10,7" />\
                    <polyline points="4,3 10,7 4,11" />\
                  </g>\
                  <polygon points="10,0 70,0 65,15 15,15" />\
                  <polyline points="40,15 40,30 65,30 65,50" />\
                  <polyline points="61,43 65,50 69,43" />\
                  <text x="60" y="47" class="path-value alua-value" style="text-anchor: end;">hello</text>\
                  <text x="65" y="62">A</text>\
                </g>\
                <g class="path pcsel2 z asel0" transform="translate(580, 369)">\
                  <polyline points="0,0 0,8" />\
                  <text class="path-value rda-value" x="2" y="12" style="text-anchor: start;">hello</text>\
                </g>\
                <g class="path pcsel2" transform="translate(580, 369)">\
                  <polyline points="0,7 -45,7" />\
                  <polyline points="-38,3 -45,7 -38,11" />\
                  <text x="-47" y="11" style="text-anchor: end;">JT</text>\
                </g>\
                <g class="path z asel0" transform="translate(580, 369)">\
                  <polyline points="0,8 0,21" />\
                </g>\
                <g class="path z process" transform="translate(580, 370)">\
                  <polyline points="0,19 -10,19" />\
                  <polyline points="-3,15 -10,19 -3,23" />\
                  <rect x="-35" y="12" height="15" width="25" />\
                  <text x="-22.5" y="24">0?</text>\
                  <g class="mux-selector">\
                    <polyline points="-35,19 -45,19" />\
                    <polyline points="-38,15 -45,19 -38,23" />\
                    <text x="-47" y="23" style="text-anchor: end;">Z=<tspan id="z-value">0</tspan></text>\
                  </g>\
                </g>\
                <g class="path asel0" transform="translate(580,369)">\
                  <polyline points="0,21 0,60" />\
                  <text x="0" y="73">0</text>\
                </g>\
                <g class="asel1 path" transform="translate(130,45)">\
                  <polyline points="100,150 100,375 410,375 410,384" />\
                  <polyline points="406,377 410,384 414,377" />\
                  <text x="410" y="397">1</text>\
                </g>\
                <g class="alu wdsel1" transform="translate(545,480)">\
                  <polyline points="90,40 90,80" />\
                  <polyline points="86,73 90,80 94,73" />\
                  <text x="90" y="93">1</text>\
                </g>\
                <g class="alu wdsel2 wr1" transform="translate(545,480)">\
                  <polyline points="90,40 215,40" />\
                  <polyline points="208,36 215,40 208,44" />\
                  <text x="214" y="35" style="text-anchor: end;">MA</text>\
                </g>\
                <g class="memory-group permanent" transform="translate(760,460)">\
                  <!-- HTML is absolutely positioned over this. -->\
                  <rect x="0" y="0" width="140" height="110" />\
                  <!-- WR -->\
                  <g class="mux-selector">\
                    <polyline points="110,-20 110,0" />\
                    <polyline points="106,-7 110,0 114,-7" />\
                    <text x="110" y="-21">WR=<tspan id="wr-value">1</tspan></text>\
                  </g>\
                </g>\
                <g class="path wdsel2" transform="translate(760,460)">\
                  <text x="-1" y="97" style="text-anchor: end;">MRD</text>\
                  <polyline points="0,85 -95,85 -95,100" />\
                  <polyline points="-99,93 -95,100 -91,93" />\
                  <text x="-95" y="113">2</text>\
                </g>\
                <g class="path werf1" transform="translate(585,561)">\
                  <polyline points="50,15 50,30 350,30 350,-300 254,-300" />\
                  <polyline points="261,-304 254,-300 261,-296" />\
                  <text x="255" y="-305" class="path-value rdw-value">80000CF4</text>\
                </g>\
              </svg>\
              <!-- These had to be moved out here because SVG <foreignObject> is very broken in WebKit -->\
              <!-- Memory -->\
              <div style="position: absolute; top: 460px; left: 760px; width: 140px; height: 110px; overflow: hidden;">\
                <div class="memory" data-height="110"></div>\
              </div>\
              <!-- Instructions -->\
              <div style="position: absolute; top: 55px; left: 250px; width: 320px; height: 66px; overflow: hidden;">\
                <div class="disassembly" data-height="66" data-width="320"></div>\
              </div>\
            </div>\
          </div>\
        </div>\
    </div>';
    $('.bsim').html(bsim_html);
});
