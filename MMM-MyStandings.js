'use strict'

Module.register('MMM-MyStandings', {
  // Default module config.
  defaults: {
    updateInterval: 2 * 60 * 60 * 1000, // every 2 hours
    rotateInterval: 1 * 60 * 1000, // every 1 minute
    lang: config.language,
    sports: [
      { league: 'MLB', groups: ['American League East'] },
      { league: 'NFL', groups: ['AFC North'] },
      { league: 'NHL', groups: ['Metropolitan Division'] },
      { league: 'NCAAF', groups: ['Mountain West Conference'] },
      { league: 'NCAAM', groups: ['Conference USA'] },
      { league: 'NCAAW Rankings', groups: ['AP Top 25'] },
    ],
    nameStyle: 'short', // "abbreviation", "full", or "short"
    showLogos: true,
    useLocalLogos: true, // true, then display logos from folder.  false, then display logos from the ESPN url
    showByDivision: true, // true, then display one division at a time.  false, display all divisions per sport
    fadeSpeed: 750,
    rankingLength: 25,
    addLeagueToTitle: true,
    colored: true, // false -- removes color from the entire table. Included for backwards compatibility, use the individual flags for more control
    coloredLogo: true,
    coloredHeader: true,
    coloredRank: true,
    highlightTeams: [],
  },

  url: 'https://site.api.espn.com/apis/v2/sports/',
  urlRanking: 'https://site.api.espn.com/apis/site/v2/sports/',

  SOCCER_LEAGUE_PATHS: {
    'AFC Champions League Two': 'soccer/afc.cup', 'AFC Asian Cup Qualifiers': 'soccer/afc.cupq', 'ASEAN Championship': 'soccer/aff.championship', 'Africa Cup of Nations': 'soccer/caf.nations', 'Africa Cup of Nations Qualifying': 'soccer/caf.nations_qual', 'African Nations Championship': 'soccer/caf.championship', 'Copa América': 'soccer/conmebol.america', 'FIFA Club World Cup': 'soccer/fifa.cwc', 'FIFA Confederations Cup': 'soccer/fifa.confederations', 'Men\'s Olympic Soccer Tournament': 'soccer/fifa.olympics', 'Women\'s Olympic Soccer Tournament': 'soccer/fifa.w.olympics', 'FIFA Women\'s World Cup': 'soccer/fifa.wwc', 'FIFA World Cup': 'soccer/fifa.world', 'FIFA World Cup Qualifying - AFC': 'soccer/fifa.worldq.afc', 'FIFA World Cup Qualifying - CAF': 'soccer/fifa.worldq.caf', 'FIFA World Cup Qualifying - Concacaf': 'soccer/fifa.worldq.concacaf', 'FIFA World Cup Qualifying - CONMEBOL': 'soccer/fifa.worldq.conmebol', 'FIFA World Cup Qualifying - OFC': 'soccer/fifa.worldq.ofc', 'FIFA World Cup Qualifying - UEFA': 'soccer/fifa.worldq.uefa', 'FIFA Under-17 World Cup': 'soccer/fifa.world.u17', 'FIFA Under-20 World Cup': 'soccer/fifa.world.u20', 'UEFA Champions League': 'soccer/uefa.champions', 'UEFA Conference League': 'soccer/uefa.europa.conf', 'UEFA Europa League': 'soccer/uefa.europa', 'UEFA European Championship': 'soccer/uefa.euro', 'UEFA European Championship Qualifying': 'soccer/uefa.euroq', 'UEFA European Under-19 Championship': 'soccer/uefa.euro.u19', 'UEFA European Under-21 Championship': 'soccer/uefa.euro_u21', 'UEFA Nations League': 'soccer/uefa.nations', 'SAFF Championship': 'soccer/afc.saff.championship', 'UEFA Women\'s European Championship': 'soccer/uefa.weuro', 'English League Championship': 'soccer/eng.2', 'English EFL Trophy': 'soccer/eng.trophy', 'English League One': 'soccer/eng.3', 'English League Two': 'soccer/eng.4', 'English National League': 'soccer/eng.5', 'English Premier League': 'soccer/eng.1', 'Irish Premier Division': 'soccer/irl.1', 'Northern Irish Premiership': 'soccer/nir.1', 'Scottish League Cup': 'soccer/sco.cis', 'Scottish Championship': 'soccer/sco.2', 'Scottish League One': 'soccer/sco.3', 'Scottish League Two': 'soccer/sco.4', 'Scottish Premiership': 'soccer/sco.1', 'Welsh Premier League': 'soccer/wal.1', 'English Women\'s Super League': 'soccer/eng.w.1', 'Austrian Bundesliga': 'soccer/aut.1', 'Belgian Pro League': 'soccer/bel.1', 'Danish Superliga': 'soccer/den.1', 'Spanish LALIGA': 'soccer/esp.1', 'Spanish LALIGA 2': 'soccer/esp.2', 'French Ligue 1': 'soccer/fra.1', 'French Ligue 2': 'soccer/fra.2', 'German 2. Bundesliga': 'soccer/ger.2', 'German Bundesliga': 'soccer/ger.1', 'Greek Super League': 'soccer/gre.1', 'Israeli Premier League': 'soccer/isr.1', 'Italian Serie A': 'soccer/ita.1', 'Italian Serie B': 'soccer/ita.2', 'Maltese Premier League': 'soccer/mlt.1', 'Dutch Keuken Kampioen Divisie': 'soccer/ned.2', 'Dutch Eredivisie': 'soccer/ned.1', 'Norwegian Eliteserien': 'soccer/nor.1', 'Portuguese Primeira Liga': 'soccer/por.1', 'Romanian Liga 1': 'soccer/rou.1', 'Russian Premier League': 'soccer/rus.1', 'Swiss Super League': 'soccer/sui.1', 'Swedish Allsvenskan': 'soccer/swe.1', 'Turkish Super Lig': 'soccer/tur.1', 'Copa Argentina': 'soccer/arg.copa', 'Argentine Nacional B': 'soccer/arg.2', 'Argentine Primera B': 'soccer/arg.3', 'Argentine Primera C': 'soccer/arg.4', 'Argentine Primera D': 'soccer/arg.5', 'Argentine Liga Profesional de Fútbol': 'soccer/arg.1', 'Bolivian Liga Profesional': 'soccer/bol.1', 'Brazilian Campeonato Carioca': 'soccer/bra.camp.carioca', 'Brazilian Campeonato Gaucho': 'soccer/bra.camp.gaucho', 'Brazilian Campeonato Mineiro': 'soccer/bra.camp.mineiro', 'Brazilian Campeonato Paulista': 'soccer/bra.camp.paulista', 'Brazilian Serie A': 'soccer/bra.1', 'Brazilian Serie B': 'soccer/bra.2', 'Brazilian Serie C': 'soccer/bra.3', 'Chilean Primera División': 'soccer/chi.1', 'Colombian Primera A': 'soccer/col.1', 'Colombian Primera B': 'soccer/col.2', 'CONMEBOL Libertadores': 'soccer/conmebol.libertadores', 'CONMEBOL Sudamericana': 'soccer/conmebol.sudamericana', 'LigaPro Ecuador': 'soccer/ecu.1', 'Paraguayan Primera División': 'soccer/par.1', 'Peruvian Liga 1': 'soccer/per.1', 'Liga UAF Uruguaya': 'soccer/uru.1', 'Venezuelan Primera División': 'soccer/ven.1', 'Concacaf Gold Cup': 'soccer/concacaf.gold', 'Concacaf Nations League': 'soccer/concacaf.nations.league', 'Concacaf Nations League Qualifying': 'soccer/concacaf.nations.league_qual', 'Concacaf W Championship': 'soccer/concacaf.womens.championship', 'Costa Rican Primera Division': 'soccer/crc.1', 'Guatemalan Liga Nacional': 'soccer/gua.1', 'Honduran Liga Nacional': 'soccer/hon.1', 'Jamaican Premier League': 'soccer/jam.1', 'Mexican Liga de Expansión MX': 'soccer/mex.2', 'Mexican Copa MX': 'soccer/mex.copa_mx', 'Mexican Liga BBVA MX': 'soccer/mex.1', 'Salvadoran Primera Division': 'soccer/slv.1', 'MLS': 'soccer/usa.1', 'NCAA Men\'s Soccer': 'soccer/usa.ncaa.m.1', 'NCAA Women\'s Soccer': 'soccer/usa.ncaa.w.1', 'North American Soccer League': 'soccer/usa.nasl', 'NWSL': 'soccer/usa.nwsl', 'U.S. Open Cup': 'soccer/usa.open', 'USL Championship': 'soccer/usa.usl.1', 'AFC Champions League Elite': 'soccer/afc.champions', 'Australian A-League Men': 'soccer/aus.1', 'Australian A-League Women': 'soccer/aus.w.1', 'Chinese Super League': 'soccer/chn.1', 'Indonesian Liga 1': 'soccer/idn.1', 'Indian I-League': 'soccer/ind.2', 'Indian Super League': 'soccer/ind.1', 'Japanese J.League': 'soccer/jpn.1', 'Malaysian Super League': 'soccer/mys.1', 'Singaporean Premier League': 'soccer/sgp.1', 'Thai League 1': 'soccer/tha.1', 'CAF Champions League': 'soccer/caf.champions', 'CAF Confederation Cup': 'soccer/caf.confed', 'Ghanaian Premier League': 'soccer/gha.1', 'Kenyan Premier League': 'soccer/ken.1', 'Nigerian Professional League': 'soccer/nga.1', 'South African First Division': 'soccer/rsa.2', 'South African Premier Division': 'soccer/rsa.1', 'Ugandan Premier League': 'soccer/uga.1', 'Zambian Super League': 'soccer/zam.1', 'Zimbabwean Premier Soccer League': 'soccer/zim.1', 'Premiership Rugby': 'rugby/267979', 'Rugby World Cup': 'rugby/164205', 'Six Nations': 'rugby/180659', 'The Rugby Championship': 'rugby/244293', 'European Rugby Champions Cup': 'rugby/271937', 'United Rugby Championship': 'rugby/270557', 'Super Rugby Pacific': 'rugby/242041', 'Olympic Men\'s 7s': 'rugby/282', 'Olympic Women\'s Rugby Sevens': 'rugby/283', 'International Test Match': 'rugby/289234', 'URBA Top 12': 'rugby/289279', 'Mitre 10 Cup': 'rugby/270563',
    // Legacy
    'AFC_ASIAN_CUP': 'soccer/afc.cup', 'AFC_ASIAN_CUP_Q': 'soccer/afc.cupq', 'AFF_CUP': 'soccer/aff.championship', 'AFR_NATIONS_CUP': 'soccer/caf.nations', 'AFR_NATIONS_CUP_Q': 'soccer/caf.nations_qual', 'AFR_NATIONS_CHAMPIONSHIP': 'soccer/caf.championship', 'CONMEBOL_COPA_AMERICA': 'soccer/conmebol.america', 'FIFA_CLUB_WORLD_CUP': 'soccer/fifa.cwc', 'FIFA_CONFEDERATIONS_CUP': 'soccer/fifa.confederations', 'FIFA_MENS_OLYMPICS': 'soccer/fifa.olympics', 'FIFA_WOMENS_OLYMPICS': 'soccer/fifa.w.olympics', 'FIFA_WOMENS_WORLD_CUP': 'soccer/fifa.wwc', 'FIFA_WORLD_CUP': 'soccer/fifa.world', 'FIFA_WORLD_CUP_Q_AFC': 'soccer/fifa.worldq.afc', 'FIFA_WORLD_CUP_Q_CAF': 'soccer/fifa.worldq.caf', 'FIFA_WORLD_CUP_Q_CONCACAF': 'soccer/fifa.worldq.concacaf', 'FIFA_WORLD_CUP_Q_CONMEBOL': 'soccer/fifa.worldq.conmebol', 'FIFA_WORLD_CUP_Q_OFC': 'soccer/fifa.worldq.ofc', 'FIFA_WORLD_CUP_Q_UEFA': 'soccer/fifa.worldq.uefa', 'FIFA_WORLD_U17': 'soccer/fifa.world.u17', 'FIFA_WORLD_U20': 'soccer/fifa.world.u20', 'UEFA_CHAMPIONS': 'soccer/uefa.champions', 'UEFA_CONFERENCE_LEAGUE': 'soccer/uefa.europa.conf', 'UEFA_EUROPA': 'soccer/uefa.europa', 'UEFA_EUROPEAN_CHAMPIONSHIP': 'soccer/uefa.euro', 'UEFA_EUROPEAN_CHAMPIONSHIP_Q': 'soccer/uefa.euroq', 'UEFA_EUROPEAN_CHAMPIONSHIP_U19': 'soccer/uefa.euro.u19', 'UEFA_EUROPEAN_CHAMPIONSHIP_U21': 'soccer/uefa.euro_u21', 'UEFA_NATIONS': 'soccer/uefa.nations', 'SAFF_CHAMPIONSHIP': 'soccer/afc.saff.championship', 'WOMENS_EUROPEAN_CHAMPIONSHIP': 'soccer/uefa.weuro', 'ENG_CHAMPIONSHIP': 'soccer/eng.2', 'ENG_EFL': 'soccer/eng.trophy', 'ENG_LEAGUE_1': 'soccer/eng.3', 'ENG_LEAGUE_2': 'soccer/eng.4', 'ENG_NATIONAL': 'soccer/eng.5', 'ENG_PREMIERE_LEAGUE': 'soccer/eng.1', 'IRL_PREM': 'soccer/irl.1', 'NIR_PREM': 'soccer/nir.1', 'SCO_CIS': 'soccer/sco.cis', 'SCO_CHAMPIONSHIP': 'soccer/sco.2', 'SCO_LEAGUE_1': 'soccer/sco.3', 'SCO_LEAGUE_2': 'soccer/sco.4', 'SCO_PREM': 'soccer/sco.1', 'WAL_PREM': 'soccer/wal.1', 'AUT_BUNDESLIGA': 'soccer/aut.1', 'BEL_DIV_A': 'soccer/bel.1', 'DEN_SAS_LIGAEN': 'soccer/den.1', 'ESP_LALIGA': 'soccer/esp.1', 'ESP_SEGUNDA_DIV': 'soccer/esp.2', 'FRA_LIGUE_1': 'soccer/fra.1', 'FRA_LIGUE_2': 'soccer/fra.2', 'GER_2_BUNDESLIGA': 'soccer/ger.2', 'GER_BUNDESLIGA': 'soccer/ger.1', 'GRE_SUPER_LEAGUE': 'soccer/gre.1', 'ISR_PREMIER_LEAGUE': 'soccer/isr.1', 'ITA_SERIE_A': 'soccer/ita.1', 'ITA_SERIE_B': 'soccer/ita.2', 'MLT_PREMIER_LEAGUE': 'soccer/mlt.1', 'NED_EERSTE_DIVISIE': 'soccer/ned.2', 'NED_EREDIVISIE': 'soccer/ned.1', 'NOR_ELITESERIEN': 'soccer/nor.1', 'POR_LIGA': 'soccer/por.1', 'ROU_FIRST_DIV': 'soccer/rou.1', 'RUS_PREMIER_LEAGUE': 'soccer/rus.1', 'SUI_SUPER_LEAGUE': 'soccer/sui.1', 'SWE_ALLSVENSKANLIGA': 'soccer/swe.1', 'TUR_SUPER_LIG': 'soccer/tur.1', 'ARG_COPA': 'soccer/arg.copa', 'ARG_NACIONAL_B': 'soccer/arg.2', 'ARG_PRIMERA_DIV_B': 'soccer/arg.3', 'ARG_PRIMERA_DIV_C': 'soccer/arg.4', 'ARG_PRIMERA_DIV_D': 'soccer/arg.5', 'ARG_SUPERLIGA': 'soccer/arg.1', 'BOL_LIGA_PRO': 'soccer/bol.1', 'BRA_CAMP_CARIOCA': 'soccer/bra.camp.carioca', 'BRA_CAMP_GAUCHO': 'soccer/bra.camp.gaucho', 'BRA_CAMP_MINEIRO': 'soccer/bra.camp.mineiro', 'BRA_CAMP_PAULISTA': 'soccer/bra.camp.paulista', 'BRA_SERIE_A': 'soccer/bra.1', 'BRA_SERIE_B': 'soccer/bra.2', 'BRA_SERIE_C': 'soccer/bra.3', 'CHI_PRIMERA_DIV': 'soccer/chi.1', 'COL_PRIMERA_A': 'soccer/col.1', 'COL_PRIMERA_B': 'soccer/col.2', 'CONMEBOL_COPA_LIBERTADORES': 'soccer/conmebol.libertadores', 'CONMEBOL_COPA_SUDAMERICANA': 'soccer/conmebol.sudamericana', 'ECU_PRIMERA_A': 'soccer/ecu.1', 'PAR_PRIMERA_DIV': 'soccer/par.1', 'PER_PRIMERA_PRO': 'soccer/per.1', 'URU_PRIMERA_DIV': 'soccer/uru.1', 'VEN_PRIMERA_PRO': 'soccer/ven.1', 'CONCACAF_GOLD_CUP': 'soccer/concacaf.gold', 'CONCACAF_NATIONS_LEAGUE': 'soccer/concacaf.nations.league', 'CONCACAF_NATIONS_Q': 'soccer/concacaf.nations.league_qual', 'CONCACAF_WOMENS_CHAMPIONSHIP': 'soccer/concacaf.womens.championship', 'CRC_PRIMERA_DIV': 'soccer/crc.1', 'GUA_LIGA_NACIONAL': 'soccer/gua.1', 'HON_PRIMERA_DIV': 'soccer/hon.1', 'JAM_PREMIER_LEAGUE': 'soccer/jam.1', 'MEX_ASCENSO_MX': 'soccer/mex.2', 'MEX_COPA_MX': 'soccer/mex.copa_mx', 'MEX_LIGA_BANCOMER': 'soccer/mex.1', 'SLV_PRIMERA_DIV': 'soccer/slv.1', 'USA_MLS': 'soccer/usa.1', 'USA_NCAA_SL_M': 'soccer/usa.ncaa.m.1', 'USA_NCAA_SL_W': 'soccer/usa.ncaa.w.1', 'USA_NASL': 'soccer/usa.nasl', 'USA_NWSL': 'soccer/usa.nwsl', 'USA_OPEN': 'soccer/usa.open', 'USA_USL': 'soccer/usa.usl.1', 'AFC_CHAMPIONS': 'soccer/afc.champions', 'AUS_A_LEAGUE': 'soccer/aus.1', 'CHN_SUPER_LEAGUE': 'soccer/chn.1', 'IDN_SUPER_LEAGUE': 'soccer/idn.1', 'IND_I_LEAGUE': 'soccer/ind.2', 'IND_SUPER_LEAGUE': 'soccer/ind.1', 'JPN_J_LEAGUE': 'soccer/jpn.1', 'MYS_SUPER_LEAGUE': 'soccer/mys.1', 'SGP_PREMIER_LEAGUE': 'soccer/sgp.1', 'THA_PREMIER_LEAGUE': 'soccer/tha.1', 'CAF_CHAMPIONS': 'soccer/caf.champions', 'CAF_CONFED_CUP': 'soccer/caf.confed', 'GHA_PREMIERE_LEAGUE': 'soccer/gha.1', 'KEN_PREMIERE_LEAGUE': 'soccer/ken.1', 'NGA_PRO_LEAGUE': 'soccer/nga.1', 'RSA_FIRST_DIV': 'soccer/rsa.2', 'RSA_PREMIERSHIP': 'soccer/rsa.1', 'UGA_SUPER_LEAGUE': 'soccer/uga.1', 'ZAM_SUPER_LEAGUE': 'soccer/zam.1', 'ZIM_PREMIER_LEAGUE': 'soccer/zim.1', 'Six Nations Rugby': 'rugby/180659', 'Olympic Men\'s 7s Rugby': 'rugby/282', 'International Test Match Rugby': 'rugby/289234', 'URBA Top 12 Rugby': 'rugby/289279', 'Mitre 10 Cup Rugby': 'rugby/270563',
  },

  // Module properties.
  standings: null,
  standingsInfo: [],
  standingsSportInfo: [],
  ctRotate: 0,
  ctDivision: 0,
  currentSport: null,
  currentDivision: null,
  ignoreDivision: false,
  isLoaded: false,
  hasMoreDivisions: false,
  localLogos: {},
  localLogosCustom: {},

  // Options for different sports
  nba_l1: ['National Basketball Association'],
  nba_l2: ['Western Conference', 'Eastern Conference'],
  nba_l3: ['Atlantic', 'Central', 'Southeast', 'Northwest', 'Pacific', 'Southwest'],
  mlb_l1: ['Major League Baseball'],
  mlb_l2: ['American League', 'National League'],
  mlb_l3: ['American League East', 'American League Central', 'American League West', 'National League East', 'National League Central', 'National League West'],
  mlb_wc: ['AL Wild Card', 'NL Wild Card'],
  mlb_po: ['AL Playoffs', 'NL Playoffs'],
  nfl_l1: ['National Football League'],
  nfl_l2: ['American Football Conference', 'National Football Conference'],
  nfl_l3: ['AFC East', 'AFC North', 'AFC South', 'AFC West', 'NFC East', 'NFC North', 'NFC South', 'NFC West'],
  nfl_po: ['AFC Playoffs', 'NFC Playoffs'],
  nhl_l1: ['National Hockey League'],
  nhl_l2: ['Western Conference', 'Eastern Conference'],
  nhl_l3: ['Atlantic Division', 'Metropolitan Division', 'Central Division', 'Pacific Division'],
  nhl_wc: ['West Wild Card', 'East Wild Card'],
  nhl_po: ['West Playoffs', 'East Playoffs'],
  wnba_l1: ['Women\'s National Basketball Assoc.'],
  wnba_l2: ['Eastern Conference', 'Western Conference'],
  nbag_l1: ['NBA Development League'],
  nbag_l2: ['Eastern Conference', 'Western Conference'],

  defaultSNETGroups: {
    Olympics: ['Total', 'Gold', 'Silver', 'Bronze'],
    CFL: ['West Division', 'East Division'],
  },

  playoffFieldSize: {},
  shortNameLookup: {},

  // Start the module.
  start: function () {
    Log.info('Starting module: ' + this.name)
    // Set Playoff Field Sizes
    this.config.playoffFieldSize = {}
    this.config.playoffFieldSize['NFL_PLAYOFFS'] = 7
    this.config.playoffFieldSize['MLB_WILDCARD'] = 3
    this.config.playoffFieldSize['MLB_PLAYOFFS'] = 6
    this.config.playoffFieldSize['NBA'] = 6
    this.config.playoffFieldSize['NBA_PLAYIN'] = 10
    this.config.playoffFieldSize['NHL'] = 3
    this.config.playoffFieldSize['NHL_WILDCARD'] = 2
    this.config.playoffFieldSize['NHL_PLAYOFFS'] = 8
    this.config.playoffFieldSize['MLS'] = 9
    this.config.playoffFieldSize['NWSL'] = 8

    // Set Short Name dictionary
    this.config.shortNameLookup = {}
    this.config.shortNameLookup['National Football Conference'] = 'NFC'
    this.config.shortNameLookup['American Football Conference'] = 'AFC'
    this.config.shortNameLookup['National Hockey League'] = 'NHL'
    this.config.shortNameLookup['American League'] = 'American League'
    this.config.shortNameLookup['National League'] = 'National League'

    if (this.config.useLocalLogos) {
      this.sendSocketNotification('MMM-MYSTANDINGS-GET-LOCAL-LOGOS', { uniqueID: this.identifier })
    }

    // Get initial API data
    this.getData(false)

    // Schedule the first UI load
    this.rotateStandings()

    // Schedule the UI load based on normal interval
    var self = this
    setInterval(function () {
      self.rotateStandings()
    }, this.config.rotateInterval)
  },

  // Define required styles.
  getStyles: function () {
    return ['MMM-MyStandings.css']
  },

  // Select the template depending on the display type.
  getTemplate: function () {
    return 'standings.njk'
  },

  // Add all the data to the template.
  getTemplateData: function () {
    // base data returned to template
    const data = {
      config: this.config,
      standings: this.standings,
      currentSport: this.currentSport,
      currentDivision: this.currentDivision,
      ignoreDivision: this.ignoreDivision,
    };

    let league = data.currentSport; // current league/sport
    if (!league) {
      return;
    } else if (league.toUpperCase().includes("RANKINGS")) { //rankings not standings
      if (data.standings.length === 0) {
        return;
      }

      let polls = data.standings;
      polls.forEach(poll => {
        let rankings = poll.ranks;
        rankings.forEach(team => {
          let rules = this.config.highlightTeams;
          // Check if this team should be highlighted
          if (Array.isArray(rules)) {
            rules.forEach(rule => {
              if (league.toUpperCase().includes(rule.league.toUpperCase()) &&
                  rule.teamAbbreviation.toUpperCase() === team.team?.abbreviation?.toUpperCase()) {
                team.highlightClass = "highlight-" + rule.league.toLowerCase() + "-" + team.team.abbreviation.toLowerCase();
                team.bgColor = rule.bgColor;
                team.fgColor = rule.fgColor;
              }
            });
          }
        });
      });
    } else if (data.standings) {
      data.standings.forEach(division => {
        let teams = division.standings?.entries;
        if (!teams) return;
        teams.forEach(team => {
          let rules = this.config.highlightTeams;
          // Check if this team should be highlighted
          if (Array.isArray(rules)) {
            rules.forEach(rule => {
              if (league.toUpperCase().includes(rule.league.toUpperCase()) &&
                  rule.teamAbbreviation.toUpperCase() === team.team?.abbreviation?.toUpperCase()) {
                team.highlightClass = "highlight-" + league.toLowerCase() + "-" + team.team.abbreviation.toLowerCase();
                team.bgColor = rule.bgColor;
                team.fgColor = rule.fgColor;
              }
            });
          }
        });
      });
    }
    return data;
  },

  getData: function (clearAll) {
    // When we want to refresh data from the API call
    if (clearAll === true) {
      this.standingsInfo = []
      this.standingsSportInfo = []
      this.isLoaded = false
    }

    for (var i = 0; i < this.config.sports.length; i++) {
      var sportUrls = []
      switch (this.config.sports[i].league) {
        case 'MLB':
          if (this.config.sports[i].groups && this.mlb_l1.some(item => this.config.sports[i].groups.includes(item))) {
            sportUrls.push(this.url + 'baseball/mlb/standings?level=1&sort=gamesbehind:asc,winpercent:desc,playoffseed:asc')
          }
          if (this.config.sports[i].groups && this.mlb_l2.some(item => this.config.sports[i].groups.includes(item))) {
            sportUrls.push(this.url + 'baseball/mlb/standings?level=2&sort=gamesbehind:asc,winpercent:desc,playoffseed:asc')
          }
          if (this.config.sports[i].groups && this.mlb_wc.some(item => this.config.sports[i].groups.includes(item))) {
            sportUrls.push(this.url + 'baseball/mlb/standings?view=wild-card&type=1&level=2&sort=gamesbehind:asc,winpercent:desc,playoffseed:asc&startingseason=2024&seasontype=2')
          }
          if (this.config.sports[i].groups && this.mlb_po.some(item => this.config.sports[i].groups.includes(item))) {
            sportUrls.push(this.url + 'baseball/mlb/standings?view=playoff&level=2&sort=playoffseed:asc')
          }
          if (!this.config.sports[i].groups || this.mlb_l3.some(item => this.config.sports[i].groups.includes(item))) {
            sportUrls.push(this.url + 'baseball/mlb/standings?level=3&sort=gamesbehind:asc,winpercent:desc')
          }
          break
        case 'NBA':
          if (this.config.sports[i].groups && this.nba_l1.some(item => this.config.sports[i].groups.includes(item))) {
            sportUrls.push(this.url + 'basketball/nba/standings?level=1&sort=gamesbehind:asc,winpercent:desc')
          }
          if (this.config.sports[i].groups && this.nba_l2.some(item => this.config.sports[i].groups.includes(item))) {
            sportUrls.push(this.url + 'basketball/nba/standings?level=2&sort=gamesbehind:asc,winpercent:desc,playoffseed:asc')
          }
          if (!this.config.sports[i].groups || this.nba_l3.some(item => this.config.sports[i].groups.includes(item))) {
            sportUrls.push(this.url + 'basketball/nba/standings?level=3&sort=gamesbehind:asc,winpercent:desc')
          }
          break
        case 'NFL':
          if (this.config.sports[i].groups && this.nfl_l1.some(item => this.config.sports[i].groups.includes(item))) {
            sportUrls.push(this.url + 'football/nfl/standings?level=1&sort=winpercent:desc,playoffseed:asc')
          }
          if (this.config.sports[i].groups && this.nfl_l2.some(item => this.config.sports[i].groups.includes(item))) {
            sportUrls.push(this.url + 'football/nfl/standings?level=2&sort=winpercent:desc,playoffseed:asc')
          }
          if (this.config.sports[i].groups && this.nfl_po.some(item => this.config.sports[i].groups.includes(item))) {
            sportUrls.push(this.url + 'football/nfl/standings?view=playoff&sort=playoffseed:asc')
          }
          if (!this.config.sports[i].groups || this.nfl_l3.some(item => this.config.sports[i].groups.includes(item))) {
            sportUrls.push(this.url + 'football/nfl/standings?level=3&sort=winpercent:desc,playoffseed:asc')
          }
          break
        case 'NHL':
          if (this.config.sports[i].groups && this.nhl_l1.some(item => this.config.sports[i].groups.includes(item))) {
            sportUrls.push(this.url + 'hockey/nhl/standings?level=1&sort=points:desc,winpercent:desc,playoffseed:asc')
          }
          if (this.config.sports[i].groups && this.nhl_l2.some(item => this.config.sports[i].groups.includes(item))) {
            sportUrls.push(this.url + 'hockey/nhl/standings?level=2&sort=points:desc,winpercent:desc,playoffseed:asc')
          }
          if (this.config.sports[i].groups && this.nhl_wc.some(item => this.config.sports[i].groups.includes(item))) {
            sportUrls.push(this.url + 'hockey/nhl/standings?view=wild-card&type=3&level=2&sort=playoffseed%3Aasc%2Cpoints%3Adesc%2Cgamesplayed%3Aasc%2Crotwins%3Adesc&seasontype=2')
          }
          if (this.config.sports[i].groups && this.nhl_po.some(item => this.config.sports[i].groups.includes(item))) {
            sportUrls.push(this.url + 'hockey/nhl/standings?view=playoff&level=2&sort=playoffseed:asc')
          }
          if (!this.config.sports[i].groups || this.nhl_l3.some(item => this.config.sports[i].groups.includes(item))) {
            sportUrls.push(this.url + 'hockey/nhl/standings?level=3&sort=points:desc,winpercent:desc,playoffseed:asc')
          }
          break
        case 'MLS':
          sportUrls.push(this.url + 'soccer/usa.1/standings?sort=rank:asc')
          break
        case 'NCAAF':
          sportUrls.push(this.url + 'football/college-football/standings?group=80&level=3&sort=leaguewinpercent:desc,vsconf_wins:desc,vsconf_gamesbehind:asc,vsconf_playoffseed:asc,wins:desc,losses:desc,playoffseed:asc,alpha:asc')
          break
        case 'NCAAM':
          sportUrls.push(this.url + 'basketball/mens-college-basketball/standings?group=50&sort=playoffseed:asc,vsconf_winpercent:desc,vsconf_wins:desc,vsconf_losses:asc,vsconf_gamesbehind:asc&includestats=playoffseed,vsconf,vsconf_gamesbehind,vsconf_winpercent,total,winpercent,home,road,streak,vsaprankedteams,vsusarankedteams')
          break
        case 'NCAAW':
          sportUrls.push(this.url + 'basketball/womens-college-basketball/standings?group=50&sort=playoffseed:asc,vsconf_winpercent:desc,vsconf_wins:desc,vsconf_losses:asc,vsconf_gamesbehind:asc&includestats=playoffseed,vsconf,vsconf_gamesbehind,vsconf_winpercent,total,winpercent,home,road,streak,vsaprankedteams,vsusarankedteams')
          break
        case 'NCAAF Rankings':
          sportUrls.push(this.urlRanking + 'football/college-football/rankings')
          break
        case 'NCAAM Rankings':
          sportUrls.push(this.urlRanking + 'basketball/mens-college-basketball/rankings')
          break
        case 'NCAAW Rankings':
          sportUrls.push(this.urlRanking + 'basketball/womens-college-basketball/rankings')
          break
        case 'WNBA':
          if (this.config.sports[i].groups && this.wnba_l1.some(item => this.config.sports[i].groups.includes(item))) {
            sportUrls.push(this.url + 'basketball/wnba/standings?level=1&sort=gamesbehind:asc,winpercent:desc')
          }
          if (!this.config.sports[i].groups || this.wnba_l2.some(item => this.config.sports[i].groups.includes(item))) {
            sportUrls.push(this.url + 'basketball/wnba/standings?level=2&sort=gamesbehind:asc,winpercent:desc,playoffseed:asc')
          }
          break
        case 'NBAG':
          if (this.config.sports[i].groups && this.nbag_l1.some(item => this.config.sports[i].groups.includes(item))) {
            sportUrls.push(this.url + 'basketball/nba-development/standings?level=1&sort=gamesbehind:asc,winpercent:desc')
          }
          if (!this.config.sports[i].groups || this.nbag_l2.some(item => this.config.sports[i].groups.includes(item))) {
            sportUrls.push(this.url + 'basketball/nba-development/standings?level=2&sort=gamesbehind:asc,winpercent:desc,playoffseed:asc')
          }
          break
        case 'AFL':
          sportUrls.push(this.url + 'australian-football/afl/standings?&sort=rank:asc')
          break
        case 'PLL':
          sportUrls.push(this.url + 'lacrosse/pll/standings?sort=winPercentage:desc')
          break
        case 'NLL':
          sportUrls.push(this.url + 'lacrosse/nll/standings?sort=winPercentage:desc')
          break
        case 'Olympics':
          sportUrls.push(`https://stats-api.sportsnet.ca/web_standings?league=oly&season_year=${new Date().getFullYear()}`)
          break
        case 'CFL':
          sportUrls.push(`https://stats-api.sportsnet.ca/web_standings?league=cfl&season_year=${new Date().getFullYear()}`)
          break
        default: // soccer & rugby
          sportUrls.push(this.url + this.SOCCER_LEAGUE_PATHS[this.config.sports[i].league] + '/standings?sort=rank:asc')
          break
      }

      for (var j = 0; j < sportUrls.length; j++) {
        var notificationSuffix = ''
        if (sportUrls[j].includes('view=playoff')) {
          notificationSuffix = '_PLAYOFFS'
        }
        else if (sportUrls[j].includes('view=wild-card')) {
          notificationSuffix = '_WILDCARD'
        }
        this.sendSocketNotification(
          'STANDINGS_RESULT_ESPN-' + this.config.sports[i].league + notificationSuffix,
          {
            url: sportUrls[j],
            uniqueID: this.identifier,
          },
        )
      }
    }

    var nextLoad = this.config.updateInterval
    if (this.standings === null) {
      nextLoad = 60 * 1000
    }

    var self = this
    setTimeout(function () {
      self.getData(true)
    }, nextLoad)
  },

  socketNotificationReceived: function (notification, payload) {
    var receivedLeague = notification.split('-')[1]
    if (notification.includes('Rankings') && payload.uniqueID == this.identifier) {
      var sInfo = this.cleanupRankings(payload.result.rankings, receivedLeague)
      if (sInfo.length != 0) {
        this.standingsInfo.push(sInfo)
        this.standingsSportInfo.push(receivedLeague)
      }
    }
    else if (notification.startsWith('STANDINGS_RESULT') && payload.uniqueID == this.identifier) {
      if (notification.startsWith('STANDINGS_RESULT_SNET')) {
        this.standingsInfo.push(this.cleanupSNETData(payload.result, receivedLeague))
      }
      else if (payload.result.standings) {
        this.standingsInfo.push(this.cleanupData(payload.result, receivedLeague))
      }
      else {
        this.standingsInfo.push(this.cleanupData(payload.result.children, receivedLeague))
      }
      if (this.standingsInfo.at(-1).length === 0) {
        this.standingsInfo.pop()
      }
      else {
        this.standingsSportInfo.push(receivedLeague)
      }
    }
    else if (notification === 'MMM-MYSTANDINGS-LOCAL-LOGO-LIST' && payload.uniqueID == this.identifier) {
      this.localLogos = payload.logos
      this.localLogosCustom = payload.logosCustom
    }
    if (this.standings === null) {
      this.rotateStandings()
    }
  },

  // This function helps rotate through different configured sports and rotate through divisions if that is configured
  rotateStandings: function () {
    // If we do not have any data, do not try to load the UI
    if (this.standingsInfo === undefined || this.standingsInfo === null || this.standingsInfo.length === 0) {
      return
    }

    // If we reached the end of the array, start over at 0
    if (this.ctRotate >= this.standingsInfo.length) {
      this.ctRotate = 0
    }

    this.standings = this.standingsInfo[this.ctRotate]
    this.currentSport = this.standingsSportInfo[this.ctRotate]

    if (this.config.showByDivision) {
      // If we only have 1 sport and 1 division, load it once and then do not try re loading again.
      if (this.isLoaded === true && this.standingsInfo.length === 1 && this.ctDivision === 0 && this.hasMoreDivisions === false) {
        return
      }

      var isLastDivisionInSport = false
      this.ignoreDivision = false

      // Determine if we have more divisions/groups for this sport
      if (this.standingsInfo[this.ctRotate].length > 0) {
        this.currentDivision = this.standingsInfo[this.ctRotate][this.ctDivision].name

        if (this.ctDivision === this.standingsInfo[this.ctRotate].length - 1) {
          isLastDivisionInSport = true
        }
        if (this.standingsInfo[this.ctRotate].length > 1) {
          this.hasMoreDivisions = true
        }
      }

      this.updateDom(this.config.fadeSpeed)
      this.isLoaded = true
      this.ctDivision = this.ctDivision + 1

      // Reset the division and increment the rotate when we reach the last division in a sport
      if (isLastDivisionInSport) {
        this.ctDivision = 0
        this.ctRotate = this.ctRotate + 1
      }
    }
    else {
      // If we only have 1 sport, load it once and then do not try re loading again.
      if (this.isLoaded === true && this.standingsInfo.length === 1) {
        return
      }

      this.updateDom(this.config.fadeSpeed)
      this.isLoaded = true
      this.ctRotate = this.ctRotate + 1
    }
  },

  // For sake of size of the arrays, let us remove items that we do not particularly care about
  cleanupData: function (standingsObject, sport) {
    var g, h, i, j
    var formattedStandingsObject = []
    /* var isSoccer = false */

    if (standingsObject.standings !== undefined) {
      formattedStandingsObject.push(standingsObject)
    }
    else {
      for (g = 0; g < standingsObject.length; g++) {
        if (standingsObject[g].standings === undefined) {
          // for league or conference data, extract out the division
          for (h = 0; h < standingsObject[g].children.length; h++) {
            formattedStandingsObject.push(standingsObject[g].children[h])
          }
        }
        else if (standingsObject[g].standings !== undefined) {
          formattedStandingsObject.push(standingsObject[g])
        }
      }
    }

    if (formattedStandingsObject.length === 0) {
      formattedStandingsObject = standingsObject
    }

    // division
    for (h = 0; h < formattedStandingsObject.length; h++) {
      var hasMatch = false

      // We only want to show divisions/groups that we have configured
      for (var leagueIdx in this.config.sports) {
        if (this.config.sports[leagueIdx].league === sport) {
          if ((this.config.sports[leagueIdx].groups !== undefined && this.config.sports[leagueIdx].groups.includes(formattedStandingsObject[h].name)) || this.config.sports[leagueIdx].groups === undefined) {
            hasMatch = true
          }
          else {
            // Soccer is the only sport where we do not really need to look for divisions/groups
            // We must have found a match for all other non-soccer sports
            // For soccer, if there is a group defined in the config, only do those divisions/groups
            /* if (isSoccer) {
              hasMatch = true
            } */
            // else {
            formattedStandingsObject[h] = null // remove the division from memory to save space
            // }
          }
        }
        else if (this.config.sports[leagueIdx].league + '_PLAYOFFS' === sport) {
          if (this.config.sports[leagueIdx].groups.includes(formattedStandingsObject[h].abbreviation + ' Playoffs')) {
            hasMatch = true
            formattedStandingsObject[h].name = formattedStandingsObject[h].abbreviation + ' Playoffs'
            formattedStandingsObject[h].shortName = formattedStandingsObject[h].abbreviation + ' Playoffs'
          }
        }
        else if (this.config.sports[leagueIdx].league + '_WILDCARD' === sport) {
          if (this.config.sports[leagueIdx].groups.includes(formattedStandingsObject[h].abbreviation + ' Wild Card')) {
            hasMatch = true
            formattedStandingsObject[h].name = formattedStandingsObject[h].abbreviation + ' Wild Card'
            formattedStandingsObject[h].shortName = formattedStandingsObject[h].abbreviation + ' Wild Card'
          }
        }
      }
      if (formattedStandingsObject[h] !== null) {
        if (this.config.shortNameLookup[formattedStandingsObject[h].name] !== undefined) {
          formattedStandingsObject[h].shortName = this.config.shortNameLookup[formattedStandingsObject[h].name]
        }
        else if (formattedStandingsObject[h].shortName === undefined) {
          formattedStandingsObject[h].shortName = formattedStandingsObject[h].name
        }
        if (!formattedStandingsObject[h].shortName.includes(sport) && this.config.addLeagueToTitle) {
          formattedStandingsObject[h].shortName = sport.replace(' Rankings', '').replace('_PLAYOFFS', '').replace('_WILDCARD', '') + ' ' + formattedStandingsObject[h].shortName
        }
      }

      // Check to see if we have standings entries
      if (hasMatch === false || formattedStandingsObject[h] === null || formattedStandingsObject[h].standings === undefined || formattedStandingsObject[h].standings.entries === undefined) {
        formattedStandingsObject[h] = null
        continue
      }

      // teams
      var eliminatedPos = 100
      team_cycle:
      for (i = 0; i < formattedStandingsObject[h].standings.entries.length; i++) {
        if (this.config.useLocalLogos === true) {
          var team = formattedStandingsObject[h].standings.entries[i].team
          var leagueForLogoPath = sport.replace('_PLAYOFFS', '').replace('_WILDCARD', '')
          if (leagueForLogoPath.startsWith('NCAA')) {
            leagueForLogoPath = 'NCAA'
          }
          if (this.localLogosCustom[leagueForLogoPath]) {
            if (this.localLogosCustom[leagueForLogoPath].indexOf(team.abbreviation + '.svg') !== -1) {
              team.logos[0].href = this.file('logos_custom/' + leagueForLogoPath + '/' + team.abbreviation + '.svg')
            }
            else if (this.localLogosCustom[leagueForLogoPath].indexOf(team.abbreviation + '.png') !== -1) {
              team.logos[0].href = this.file('logos_custom/' + leagueForLogoPath + '/' + team.abbreviation + '.png')
            }
          }
          else if (this.localLogos[leagueForLogoPath]) {
            if (this.localLogos[leagueForLogoPath].indexOf(team.abbreviation + '.svg') !== -1) {
              team.logos[0].href = this.file('logos/' + leagueForLogoPath + '/' + team.abbreviation + '.svg')
            }
            else if (this.localLogos[leagueForLogoPath].indexOf(team.abbreviation + '.png') !== -1) {
              team.logos[0].href = this.file('logos/' + leagueForLogoPath + '/' + team.abbreviation + '.png')
            }
          }
        }

        var newStats = []
        // records
        for (j = 0; j < formattedStandingsObject[h].standings.entries[i].stats.length; j++) {
          var newEntry = []
          var entry = formattedStandingsObject[h].standings.entries[i].stats[j]

          if (sport === 'NHL') {
            if (newStats.length === 4) {
              break
            }
            switch (entry.name) {
              case 'wins':
                newEntry.name = entry.name
                newEntry.value = entry.value
                newStats.push({
                  key: 1,
                  value: newEntry,
                })
                break
              case 'losses':
                newEntry.name = entry.name
                newEntry.value = entry.value
                newStats.push({
                  key: 2,
                  value: newEntry,
                })
                break
              case 'otLosses':
                newEntry.name = entry.name
                newEntry.value = entry.value
                newStats.push({
                  key: 3,
                  value: newEntry,
                })
                break
              case 'points':
                newEntry.name = entry.name
                newEntry.value = entry.value
                newStats.push({
                  key: 4,
                  value: newEntry,
                })
                break
            }
          }
          else if (sport === 'NHL_PLAYOFFS' || sport === 'NHL_WILDCARD') {
            if (entry.name === 'clincher' && entry.displayValue === 'e') {
              eliminatedPos = i
              break team_cycle
            }
            if (newStats.length === 4) {
              break
            }
            switch (entry.name) {
              case 'wins':
                newEntry.name = entry.name
                newEntry.value = entry.value
                newStats.push({
                  key: 1,
                  value: newEntry,
                })
                break
              case 'losses':
                newEntry.name = entry.name
                newEntry.value = entry.value
                newStats.push({
                  key: 2,
                  value: newEntry,
                })
                break
              case 'otLosses':
                newEntry.name = entry.name
                newEntry.value = entry.value
                newStats.push({
                  key: 3,
                  value: newEntry,
                })
                break
              case 'points':
                newEntry.name = entry.name
                newEntry.value = entry.value
                newStats.push({
                  key: 4,
                  value: newEntry,
                })
                break
            }
          }
          else if (sport === 'MLB') {
            if (newStats.length === 3) {
              break
            }
            switch (entry.name) {
              case 'wins':
                newEntry.name = entry.name
                newEntry.value = entry.value
                newStats.push({
                  key: 1,
                  value: newEntry,
                })
                break
              case 'losses':
                newEntry.name = entry.name
                newEntry.value = entry.value
                newStats.push({
                  key: 2,
                  value: newEntry,
                })
                break
              case 'gamesBehind':
                newEntry.name = entry.name
                newEntry.value = entry.displayValue
                newStats.push({
                  key: 3,
                  value: newEntry,
                })
                break
            }
          }
          else if (sport === 'MLB_PLAYOFFS' || sport === 'MLB_WILDCARD') {
            if (entry.name === 'clincher' && entry.displayValue === 'e') {
              eliminatedPos = i
              break team_cycle
            }
            if (newStats.length === 3) {
              break
            }
            switch (entry.name) {
              case 'wins':
                newEntry.name = entry.name
                newEntry.value = entry.value
                newStats.push({
                  key: 1,
                  value: newEntry,
                })
                break
              case 'losses':
                newEntry.name = entry.name
                newEntry.value = entry.value
                newStats.push({
                  key: 2,
                  value: newEntry,
                })
                break
              case 'gamesBehind':
                newEntry.name = entry.name
                newEntry.value = entry.displayValue
                newStats.push({
                  key: 3,
                  value: newEntry,
                })
                break
            }
          }
          else if (sport === 'NBA' || sport === 'WNBA' || sport === 'NBAG') {
            if (newStats.length === 3) {
              break
            }
            switch (entry.name) {
              case 'wins':
                newEntry.name = entry.name
                newEntry.value = entry.value
                newStats.push({
                  key: 1,
                  value: newEntry,
                })
                break
              case 'losses':
                newEntry.name = entry.name
                newEntry.value = entry.value
                newStats.push({
                  key: 2,
                  value: newEntry,
                })
                break
              case 'gamesBehind':
                newEntry.name = entry.name
                newEntry.value = entry.displayValue
                newStats.push({
                  key: 3,
                  value: newEntry,
                })
                break
            }
          }
          else if (sport === 'NFL') {
            if (newStats.length === 3) {
              break
            }
            switch (entry.name) {
              case 'wins':
                newEntry.name = entry.name
                newEntry.value = entry.value
                newStats.push({
                  key: 1,
                  value: newEntry,
                })
                break
              case 'losses':
                newEntry.name = entry.name
                newEntry.value = entry.value
                newStats.push({
                  key: 2,
                  value: newEntry,
                })
                break
              case 'ties':
                newEntry.name = entry.name
                newEntry.value = entry.value
                newStats.push({
                  key: 3,
                  value: newEntry,
                })
                break
            }
          }
          else if (sport === 'NFL_PLAYOFFS') {
            if (entry.name === 'clincher' && entry.displayValue === 'e') {
              eliminatedPos = i
              break team_cycle
            }
            if (newStats.length === 3) {
              break
            }
            switch (entry.name) {
              case 'wins':
                newEntry.name = entry.name
                newEntry.value = entry.value
                newStats.push({
                  key: 1,
                  value: newEntry,
                })
                break
              case 'losses':
                newEntry.name = entry.name
                newEntry.value = entry.value
                newStats.push({
                  key: 2,
                  value: newEntry,
                })
                break
              case 'ties':
                newEntry.name = entry.name
                newEntry.value = entry.value
                newStats.push({
                  key: 3,
                  value: newEntry,
                })
                break
            }
          }
          else if (sport === 'MLS') {
            if (newStats.length === 4) {
              break
            }
            switch (entry.name) {
              case 'wins':
                newEntry.name = entry.name
                newEntry.value = entry.value
                newStats.push({
                  key: 1,
                  value: newEntry,
                })
                break
              case 'ties':
                newEntry.name = entry.name
                newEntry.value = entry.value
                newStats.push({
                  key: 2,
                  value: newEntry,
                })
                break
              case 'losses':
                newEntry.name = entry.name
                newEntry.value = entry.value
                newStats.push({
                  key: 3,
                  value: newEntry,
                })
                break
              case 'points':
                newEntry.name = entry.name
                newEntry.value = entry.value
                newStats.push({
                  key: 4,
                  value: newEntry,
                })
                break
            }
          }
          else if (sport === 'NCAAF') {
            if (newStats.length === 2) {
              break
            }
            switch (entry.name) {
              case 'vs. Conf.':
                newEntry.name = entry.displayName
                newEntry.value = entry.displayValue
                newStats.push({
                  key: 1,
                  value: newEntry,
                })
                break
              case 'overall':
                newEntry.name = entry.displayName
                newEntry.value = entry.displayValue
                newStats.push({
                  key: 2,
                  value: newEntry,
                })
                break
            }
          }
          else if (sport === 'NCAAM' || sport === 'NCAAW') {
            if (newStats.length === 2) {
              break
            }
            switch (entry.name) {
              case 'vs. Conf.':
                newEntry.name = entry.displayName
                newEntry.value = entry.displayValue
                newStats.push({
                  key: 1,
                  value: newEntry,
                })
                break
              case 'overall':
                newEntry.name = entry.displayName
                newEntry.value = entry.displayValue
                newStats.push({
                  key: 2,
                  value: newEntry,
                })
                break
            }
          }
          else if (sport.includes('Rugby')) {
            if (newStats.length === 4) {
              break
            }
            switch (entry.name) {
              case 'gamesWon':
                newEntry.name = entry.name
                newEntry.value = entry.value
                newStats.push({
                  key: 1,
                  value: newEntry,
                })
                break
              case 'gamesDrawn':
                newEntry.name = entry.name
                newEntry.value = entry.value
                newStats.push({
                  key: 2,
                  value: newEntry,
                })
                break
              case 'gamesLost':
                newEntry.name = entry.name
                newEntry.value = entry.value
                newStats.push({
                  key: 3,
                  value: newEntry,
                })
                break
              case 'points':
                newEntry.name = entry.name
                newEntry.value = entry.value
                newStats.push({
                  key: 4,
                  value: newEntry,
                })
                break
            }
          }
          else if (sport === 'AFL') {
            if (newStats.length === 4) {
              break
            }
            switch (entry.name) {
              case 'wins':
                newEntry.name = entry.name
                newEntry.value = entry.value
                newStats.push({
                  key: 1,
                  value: newEntry,
                })
                break
              case 'losses':
                newEntry.name = entry.name
                newEntry.value = entry.value
                newStats.push({
                  key: 2,
                  value: newEntry,
                })
                break
              case 'ties':
                newEntry.name = entry.name
                newEntry.value = entry.value
                newStats.push({
                  key: 3,
                  value: newEntry,
                })
                break
              case 'points':
                newEntry.name = entry.name
                newEntry.value = entry.value
                newStats.push({
                  key: 4,
                  value: newEntry,
                })
                break
            }
          }
          else if (sport === 'PLL' || sport === 'NLL') {
            if (newStats.length === 3) {
              break
            }
            switch (entry.name) {
              case 'wins':
                newEntry.name = entry.name
                newEntry.value = entry.value
                newStats.push({
                  key: 1,
                  value: newEntry,
                })
                break
              case 'losses':
                newEntry.name = entry.name
                newEntry.value = entry.value
                newStats.push({
                  key: 2,
                  value: newEntry,
                })
                break
            }
          }
          else {
            // soccer
            if (newStats.length === 4) {
              break
            }
            switch (entry.name) {
              case 'wins':
                newEntry.name = entry.name
                newEntry.value = entry.value
                newStats.push({
                  key: 1,
                  value: newEntry,
                })
                break
              case 'ties':
                newEntry.name = entry.name
                newEntry.value = entry.value
                newStats.push({
                  key: 2,
                  value: newEntry,
                })
                break
              case 'losses':
                newEntry.name = entry.name
                newEntry.value = entry.value
                newStats.push({
                  key: 3,
                  value: newEntry,
                })
                break
              case 'points':
                newEntry.name = entry.name
                newEntry.value = entry.value
                newStats.push({
                  key: 4,
                  value: newEntry,
                })
                break
            }
          }
        }

        // Sort these to help display in the correct order
        function sortByKey(array, key) {
          return array.sort(function (a, b) {
            var x = a[key]
            var y = b[key]
            return ((x < y) ? -1 : ((x > y) ? 1 : 0))
          })
        }

        newStats = sortByKey(newStats, 'key')

        var finalValues = []
        for (var key in newStats) {
          finalValues.push(newStats[key].value)
        }

        formattedStandingsObject[h].standings.entries[i].stats = finalValues
      }
      formattedStandingsObject[h].standings.entries.splice(eliminatedPos, 100)
    }

    return formattedStandingsObject.filter(Boolean)
  },

  // For sake of size of the arrays, let us remove items that we do not particularly care about (NCAA Rankings version)
  cleanupRankings: function (formattedStandingsObject, sport) {
    var poll, teamNo

    // Filter polls
    for (poll = 0; poll < formattedStandingsObject.length; poll++) {
      var hasMatch = false

      // We only want to show divisions/groups that we have configured
      for (var league in this.config.sports) {
        if (this.config.sports[league].league === sport) {
          if (this.config.sports[league].groups !== undefined && this.config.sports[league].groups.includes(formattedStandingsObject[poll].name)) {
            hasMatch = true
          }
          else {
            formattedStandingsObject[poll] = null
          }
        }
      }
      if (formattedStandingsObject[poll] !== null) {
        if (this.config.shortNameLookup[formattedStandingsObject[poll].name] !== undefined) {
          formattedStandingsObject[poll].shortName = this.config.shortNameLookup[formattedStandingsObject[poll].name]
        }
        else if (formattedStandingsObject[poll].shortName === undefined) {
          formattedStandingsObject[poll].shortName = formattedStandingsObject[poll].name
        }
        if (!formattedStandingsObject[poll].shortName.startsWith(sport)) {
          formattedStandingsObject[poll].shortName = sport.replace(' Rankings', '').replace('_PLAYOFFS', '') + ' ' + formattedStandingsObject[poll].shortName
        }
      }

      // Check to see if we have standings entries
      if (hasMatch === false || formattedStandingsObject[poll] === null || formattedStandingsObject[poll].ranks === undefined) {
        formattedStandingsObject[poll] = null
        continue
      }

      // Use local logos
      for (teamNo = 0; teamNo < formattedStandingsObject[poll].ranks.length; teamNo++) {
        if (this.config.useLocalLogos === true) {
          var team = formattedStandingsObject[poll].ranks[teamNo].team
          var leagueForLogoPath = sport
          if (leagueForLogoPath.startsWith('NCAA')) {
            leagueForLogoPath = 'NCAA'
          }
          if (this.localLogosCustom[leagueForLogoPath]) {
            if (this.localLogosCustom[leagueForLogoPath].indexOf(team.abbreviation + '.svg') !== -1) {
              team.logos[0].href = this.file('logos_custom/' + leagueForLogoPath + '/' + team.abbreviation + '.svg')
            }
            else if (this.localLogosCustom[leagueForLogoPath].indexOf(team.abbreviation + '.png') !== -1) {
              team.logos[0].href = this.file('logos_custom/' + leagueForLogoPath + '/' + team.abbreviation + '.png')
            }
          }
          else if (this.localLogos[leagueForLogoPath]) {
            if (this.localLogos[leagueForLogoPath].indexOf(team.abbreviation + '.svg') !== -1) {
              team.logos[0].href = this.file('logos/' + leagueForLogoPath + '/' + team.abbreviation + '.svg')
            }
            else if (this.localLogos[leagueForLogoPath].indexOf(team.abbreviation + '.png') !== -1) {
              team.logos[0].href = this.file('logos/' + leagueForLogoPath + '/' + team.abbreviation + '.png')
            }
          }
        }
      }
    }

    return formattedStandingsObject.filter(Boolean)
  },

  // For sake of size of the arrays, let us remove items that we do not particularly care about (Olympics version)
  cleanupSNETData: function (StandingsObject, sport) {
    var teamNo

    for (var league in this.config.sports) {
      if (this.config.sports[league].league === sport.split('_')[1]) {
        var groups = this.config.sports[league].groups
      }
    }
    var formattedStandingsObject = []
    for (var groupNo in groups) {
      formattedStandingsObject.push({})
      formattedStandingsObject[groupNo].shortName = `${sport.replace('_', ' ')} - ${groups[groupNo]}`
      formattedStandingsObject[groupNo].name = `${sport.replace('_', ' ')} - ${groups[groupNo]}`
      formattedStandingsObject[groupNo].standings = {}
      formattedStandingsObject[groupNo].standings.entries = []

      // Sort data
      if (sport.split('_')[1] == 'Olympics') {
        StandingsObject.sort(function (a, b) {
          return b[groups[groupNo].toLowerCase()] - a[groups[groupNo].toLowerCase()]
        })
      }
      else {
        StandingsObject.sort(function (a, b) {
          return a.division.rank - b.division.rank
        })
      }

      // Set data
      for (teamNo = 0; teamNo < StandingsObject.length; teamNo++) {
        formattedStandingsObject[groupNo].standings.entries[teamNo] = {}
        formattedStandingsObject[groupNo].standings.entries[teamNo].team = {}
        formattedStandingsObject[groupNo].standings.entries[teamNo].team.abbreviation = StandingsObject[teamNo].short_name
        if (StandingsObject[teamNo].city !== undefined) {
          formattedStandingsObject[groupNo].standings.entries[teamNo].team.displayName = `${StandingsObject[teamNo].city} ${StandingsObject[teamNo].name}`
        }
        else {
          formattedStandingsObject[groupNo].standings.entries[teamNo].team.displayName = StandingsObject[teamNo].name
        }

        formattedStandingsObject[groupNo].standings.entries[teamNo].team.shortDisplayName = StandingsObject[teamNo].short_name
        formattedStandingsObject[groupNo].standings.entries[teamNo].team.logos = []
        formattedStandingsObject[groupNo].standings.entries[teamNo].team.logos[0] = {}
        formattedStandingsObject[groupNo].standings.entries[teamNo].stats = []

        switch (sport.split('_')[1]) {
          case 'CFL':
            if (StandingsObject[teamNo].division.name === groups[groupNo]) {
              formattedStandingsObject[groupNo].standings.entries[teamNo].stats[0] = []
              formattedStandingsObject[groupNo].standings.entries[teamNo].stats[0].name = 'wins'
              formattedStandingsObject[groupNo].standings.entries[teamNo].stats[0].value = StandingsObject[teamNo].stats.wins
              formattedStandingsObject[groupNo].standings.entries[teamNo].stats[1] = []
              formattedStandingsObject[groupNo].standings.entries[teamNo].stats[1].name = 'losses'
              formattedStandingsObject[groupNo].standings.entries[teamNo].stats[1].value = StandingsObject[teamNo].stats.losses
              formattedStandingsObject[groupNo].standings.entries[teamNo].stats[2] = []
              formattedStandingsObject[groupNo].standings.entries[teamNo].stats[2].name = 'ties'
              formattedStandingsObject[groupNo].standings.entries[teamNo].stats[2].value = StandingsObject[teamNo].stats.ties
              formattedStandingsObject[groupNo].standings.entries[teamNo].stats[3] = []
              formattedStandingsObject[groupNo].standings.entries[teamNo].stats[3].name = 'points'
              formattedStandingsObject[groupNo].standings.entries[teamNo].stats[3].value = StandingsObject[teamNo].stats.points
              formattedStandingsObject[groupNo].standings.entries[teamNo].team.logos[0].href = StandingsObject[teamNo].image_url_25
            }
            else {
              formattedStandingsObject[groupNo].standings.entries.pop()
            }
            break
          case 'Olympics':
            formattedStandingsObject[groupNo].standings.entries[teamNo].stats[0] = []
            formattedStandingsObject[groupNo].standings.entries[teamNo].stats[0].name = 'gold'
            formattedStandingsObject[groupNo].standings.entries[teamNo].stats[0].value = StandingsObject[teamNo].gold
            formattedStandingsObject[groupNo].standings.entries[teamNo].stats[1] = []
            formattedStandingsObject[groupNo].standings.entries[teamNo].stats[1].name = 'silver'
            formattedStandingsObject[groupNo].standings.entries[teamNo].stats[1].value = StandingsObject[teamNo].silver
            formattedStandingsObject[groupNo].standings.entries[teamNo].stats[2] = []
            formattedStandingsObject[groupNo].standings.entries[teamNo].stats[2].name = 'bronze'
            formattedStandingsObject[groupNo].standings.entries[teamNo].stats[2].value = StandingsObject[teamNo].bronze
            formattedStandingsObject[groupNo].standings.entries[teamNo].stats[3] = []
            formattedStandingsObject[groupNo].standings.entries[teamNo].stats[3].name = 'total'
            formattedStandingsObject[groupNo].standings.entries[teamNo].stats[3].value = StandingsObject[teamNo].total
            formattedStandingsObject[groupNo].standings.entries[teamNo].team.logos[0].href = StandingsObject[teamNo].flag_url
        }

        if (this.config.useLocalLogos === true) {
          var leagueForLogoPath = sport.split('_')[1]
          if (this.localLogos[leagueForLogoPath] && this.localLogos[leagueForLogoPath].indexOf(formattedStandingsObject[groupNo].standings.entries[teamNo].team.abbreviation + '.svg') !== -1) {
            formattedStandingsObject[groupNo].standings.entries[teamNo].team.logos[0].href = this.file('logos/' + leagueForLogoPath + '/' + formattedStandingsObject[groupNo].standings.entries[teamNo].team.abbreviation + '.svg')
          }
          else if (this.localLogos[leagueForLogoPath] && this.localLogos[leagueForLogoPath].indexOf(formattedStandingsObject[groupNo].standings.entries[teamNo].team.abbreviation + '.png') !== -1) {
            formattedStandingsObject[groupNo].standings.entries[teamNo].team.logos[0].href = this.file('logos/' + leagueForLogoPath + '/' + formattedStandingsObject[groupNo].standings.entries[teamNo].team.abbreviation + '.png')
          }
        }
      }
      formattedStandingsObject[groupNo].standings.entries = formattedStandingsObject[groupNo].standings.entries.filter(Boolean)
      formattedStandingsObject[groupNo].standings.entries = formattedStandingsObject[groupNo].standings.entries.slice(0, this.config.rankingLength)
    }
    return formattedStandingsObject.filter(Boolean)
  },

  // Returns true when the sport is not found in the config (means that it's from one of the long list of soccer leagues)
/*   isSoccerLeague: function (sportToCheck) {
    for (var sport in this.defaults.sports) {
      if (this.defaults.sports[sport].league === sportToCheck) {
        return false
      }
    }

    return true
  }, */
})
