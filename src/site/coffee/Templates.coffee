

T = window.Templates = {}


T.tableOfContents =
  """
  <div>
    <ul>
      <li><a href="#game">Game</a></li>
      <li><a href="https://github.com/benjaminjackman/space-blast">GitHub Repo</a></li>
      <li><a href="/cron.html">Cron</a></li>
    </ul>
  </div>
  """

T.game =
  """
  <div id="cr-stage">
      <div id="interface">
          <div class="panel transparent bottom"></div>
          <div class="panel transparent"></div>
          <div class="lives text left"></div>
          <div class="level text center"></div>
          <div class="score text right"></div>
          <div class="bars bottom left" >
              <div id="hp" ><span class="text"></span></div>
          </div>
          <div class="bars bottom"  style="left:50%;margin-left:-89px">
              <div id="shield" ><span class="text"></span></div>
          </div>
          <div class="bars bottom right" >
              <div id="heat" ><span class="text"></span></div>
          </div>
          <div class="alert"></div>
      </div>
      <div id="loading">
           <div class="button" >Play Game</div>

          <div class="bars bottom">
              <div id="load" ><span class="text"></span></div>
          </div>
      </div>
  </div>
  """
